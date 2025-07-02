import { useEffect, useState } from 'react';

type PlayerData = {
  name?: string;
  kd?: number;
  // Add other expected fields based on Deadlock API response
  [key: string]: any;
};

function App() {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const steamId = '260148293'; // Optional: make this dynamic later

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await fetch(`/api/player?steamid=${steamId}`);
        if (!res.ok) throw new Error('Failed to fetch player data');
        const data = await res.json();
        setPlayerData(data);
      } catch (err: any) {
        console.error('API error:', err);
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [steamId]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Deadlock Player Card</h1>

      {loading && <p>Loading player data...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {playerData && !error && (
        <pre style={{ background: '#FFFFF', padding: '1rem', borderRadius: '8px' }}>
          {JSON.stringify(playerData, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
