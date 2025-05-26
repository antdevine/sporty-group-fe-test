import './App.css';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import Search from './components/Search';

function App() {
  const [allLeagues, setAllLeagues] = useState<any[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const [loadingBadgeId, setLoadingBadgeId] = useState<string | null>(null);
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  useEffect(() => {
    if (searchTerm) {
      const filteredLeagues = data?.leagues.filter((league: any) =>
        league.strLeague.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setAllLeagues(filteredLeagues || []);
    } else {
      setAllLeagues(data?.leagues || []);
    }
  }, [searchTerm, data]);

  const handleLeagueClick = async (leagueId: string) => {
    setSelectedBadge(null);
    setSelectedLeagueId(leagueId); 
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
      }
    } catch (error) {
      console.error('Failed to fetch season badge:', error);
      setSelectedBadge(null);
    } finally {
      setLoadingBadgeId(null);
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading leagues...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">Failed to load leagues.</div>;

  const handleInputChange = (searchInput: string) => {
    setSearchInput(searchInput);
  };

  const handleSearch = () => {
    setSearchTerm(searchInput.trim());
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchTerm('');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Select a League</h1>

        <Search
        searchTerm={searchTerm}
        searchInput={searchInput}
        onInputChange={handleInputChange}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
        disabledSubmit={false}
      />
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {allLeagues.map((league) => (
            <div
              key={league.idLeague}
              onClick={() => handleLeagueClick(league.idLeague)}
              className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition cursor-pointer border hover:border-blue-500"
            >
              {league.strSport && (
                <p className="text-sm text-gray-500 mb-2">{league.strSport}</p>
              )}
  
              {league.strLeague && (
                <h2 className="text-lg font-semibold mb-1 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {league.strLeague}
                </h2>
              )}
  
              {league.strLeagueAlternate && (
                <p className="text-sm text-gray-400 italic">
                  ({league.strLeagueAlternate})
                </p>
              )}
  
              {loadingBadgeId === league.idLeague && (
                <p className="text-sm text-blue-500 mt-2">Loading badge...</p>
              )}
            </div>
          ))}
        </div>
      </main>
  
      <aside className="w-auto bg-white shadow-inner border-l border-gray-200 p-6 sticky top-0 h-screen">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Selected League</h2>
  
        {selectedBadge ? (
          <>
            <img
              src={selectedBadge}
              alt="Season Badge"
              className="h-24 mx-auto mb-4 transition-transform duration-300 hover:scale-105"
            />
            <p className="text-center text-gray-700 font-medium">
  {
    allLeagues.find((league) => league.idLeague === selectedLeagueId)?.strLeague ||
    'Click a league to view badge'
  }
</p>

          </>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg h-28 flex items-center justify-center mb-4 p-3">
  <p className="text-gray-400 text-sm text-center">Click a league to view badge</p>
</div>
        )}
      </aside>
    </div>
  );
  
}

export default App;
