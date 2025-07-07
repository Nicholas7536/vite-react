import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  const steamId = req.query.steamid;
  if (!steamId) {
    return res.status(400).json({ error: 'Missing steamid parameter' });
  }
  const redisKey = `player:${steamId}`;

  try {
    // 1. Try to get cached data from Redis
    const cached = await redis.get(redisKey);
    if (cached) {
      console.log('Cache hit for', steamId);
      return res.status(200).json(cached);
    }

    // 2. Fetch from Deadlock API if not cached
    console.log('Cache miss. Fetching from Deadlock API for', steamId);
    const response = await fetch(`https://api.deadlock-api.com/v1/players/${steamId}/card`);
    const data = await response.json();

    // 3. Store result in Redis with a TTL (e.g., 24 hours)
    await redis.set(redisKey, data, { ex: 86400 }); // 86400 seconds = 24 hours

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching or caching:', error);
    return res.status(500).json({ error: 'Failed to retrieve player data' });
  }
}
