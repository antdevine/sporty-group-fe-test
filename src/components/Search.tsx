import React from "react";
import Button from "./Button";

interface SearchProps {
  searchTerm: string;
  searchInput: string;
  onInputChange: (value: string) => void;
  onSearch: (term: string) => void;
  onClearSearch: () => void;
  disabledSubmit?: boolean;
}

const Search: React.FC<SearchProps> = ({
  searchTerm,
  searchInput,
  onInputChange,
  onSearch,
  onClearSearch,
  disabledSubmit = false,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSearch(searchInput.trim());
  };

  const handleClearSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClearSearch();
  };

  return (
    <form className="flex flex-wrap gap-3 mt-8 mb-8 justify-center items-center">
      <input
        type="text"
        placeholder="Search leagues..."
        onChange={handleInputChange}
        value={searchInput}
        className="px-3 py-2 text-base rounded-md border border-gray-300 w-64 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
      />
      <Button
        type="submit"
        variant="primary"
        onClick={handleSearch}
        disabled={disabledSubmit}
      >
        Search
      </Button>

      <Button
        type="button"
        variant="secondary"
        onClick={handleClearSearch}
        disabled={!searchTerm}
      >
        Clear
      </Button>
    </form>
  );
};

export default Search;
