import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Search from "./components/Search";
import CategoryFilter from "./components/CategoryFilter";
import LeagueCard from "./components/LeagueCard";
import Sidebar from "./components/Sidebar";

function App() {
  const [allLeagues, setAllLeagues] = useState<any[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const [loadingBadgeId, setLoadingBadgeId] = useState<string | null>(null);
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["leagues"],
    queryFn: () =>
      fetch("https://www.thesportsdb.com/api/v1/json/3/all_leagues.php").then(
        (res) => res.json()
      ),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data?.leagues) {
      const uniqueCategories = Array.from(
        new Set(
          data.leagues.map((league: any) => league.strSport).filter(Boolean)
        )
      );
      setAllCategories(uniqueCategories);
    }
  }, [data]);

  useEffect(() => {
    if (!data?.leagues) return;

    let filtered = [...data.leagues];

    if (searchTerm) {
      filtered = filtered.filter((league: any) =>
        league.strLeague.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (league: any) => league.strSport === selectedCategory
      );
    }

    setAllLeagues(filtered);
  }, [searchTerm, selectedCategory, data]);

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
      console.error("Failed to fetch season badge:", error);
      setSelectedBadge(null);
    } finally {
      setLoadingBadgeId(null);
    }
  };

  if (isLoading)
    return <div className="text-center mt-10">Loading leagues...</div>;
  if (isError)
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load leagues.
      </div>
    );

  const handleInputChange = (searchInput: string) => {
    setSearchInput(searchInput);
  };

  const handleSearch = () => {
    setSearchTerm(searchInput.trim());
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchTerm("");
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen bg-gray-100">
      <main className="flex-1 p-6 pb-24 lg:pb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Select a League
        </h1>

        <Search
          searchTerm={searchTerm}
          searchInput={searchInput}
          onInputChange={handleInputChange}
          onSearch={handleSearch}
          onClearSearch={handleClearSearch}
          disabledSubmit={isLoading}
        />

        <CategoryFilter
          allCategories={allCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {allLeagues.length === 0 && (
            <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center text-gray-500">
              No leagues found for the selected criteria.
            </div>
          )}
          {allLeagues.map((league) => (
            <LeagueCard
              key={league.idLeague}
              league={league}
              isLoadingBadge={loadingBadgeId === league.idLeague}
              onClick={handleLeagueClick}
            />
          ))}
        </div>
      </main>

      <Sidebar
        selectedBadge={selectedBadge}
        selectedLeagueId={selectedLeagueId}
        allLeagues={allLeagues}
      />
    </div>
  );
}

export default App;
