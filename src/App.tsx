import './App.css';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

function App() {
  const [allLeagues, setAllLeagues] = useState<any[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const [loadingBadgeId, setLoadingBadgeId] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ['leagues'],
    queryFn: () =>
      fetch('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php').then(res =>
        res.json()
      ),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data?.leagues) {
      setAllLeagues(data.leagues);
    }
  }, [data]);

  const handleLeagueClick = async (leagueId: string) => {
    console.log('Fetching badge for league:', leagueId);
    setSelectedBadge(null);
    setLoadingBadgeId(leagueId);

    try {
      const res = await fetch(
        `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${leagueId}`
      );
      const seasonData = await res.json();

      const firstSeasonWithBadge = seasonData.seasons?.find(
        (season: any) => season.strBadge
      );

      if (firstSeasonWithBadge?.strBadge) {
        setSelectedBadge(firstSeasonWithBadge.strBadge);
      } else {
        setSelectedBadge(null);
      }
    } catch (error) {
      console.error('Failed to fetch season badge:', error);
      setSelectedBadge(null);
    } finally {
      setLoadingBadgeId(null);
    }
  };

  if (isLoading) return <div>Loading leagues...</div>;
  if (isError) return <div>Failed to load leagues.</div>;

  return (
    <div className="App">
      <h1>Leagues</h1>
      <ul>
        {allLeagues.map((league, index) => (
          <li
            key={index}
            style={{ cursor: 'pointer', marginBottom: '8px' }}
            onClick={() => handleLeagueClick(league.idLeague)}
          >
            {league.strLeague} ({league.strSport})
            {loadingBadgeId === league.idLeague && ' 🔄'}
          </li>
        ))}
      </ul>

      {selectedBadge && (
        <div>
          <h2>Season Badge</h2>
          <img src={selectedBadge} alt="Season Badge" style={{ height: '100px' }} />
        </div>
      )}
    </div>
  );
}

export default App;
