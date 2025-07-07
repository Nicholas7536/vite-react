import { useEffect, useState } from 'react';

type PlayerData = {
  name?: string;
  kd?: number;
  // Add other expected fields based on Deadlock API response
  [key: string]: any;
};

function App() {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [steamId, setSteamId] = useState('');
  const [inputSteamId, setInputSteamId] = useState('');

  const fetchPlayer = async (id: string) => {
    setLoading(true);
    setError(null);
    setPlayerData(null);
    try {
      const res = await fetch(`/api/player?steamid=${id}`);
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

  useEffect(() => {
    if (steamId) {
      fetchPlayer(steamId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steamId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputSteamId.trim()) {
      setSteamId(inputSteamId.trim());
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Deadlock Player Card</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={inputSteamId}
          onChange={e => setInputSteamId(e.target.value)}
          placeholder="Enter Steam ID"
          style={{ padding: '0.5rem', fontSize: '1rem', marginRight: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Fetch Player
        </button>
      </form>
      {loading && <p>Loading player data...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {playerData && !error && (
        <pre style={{ padding: '1rem', borderRadius: '8px' }}>
          {JSON.stringify(playerData, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
