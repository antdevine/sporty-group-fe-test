import React from 'react';
import Button from './Button';

interface CategoryFilterProps {
  selectedCategory: string;
  allCategories: string[];
  onCategoryChange: (selectedCategory: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  allCategories,
  onCategoryChange,
}) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(e.target.value);
  };

  return (
    <form className="flex flex-wrap justify-center gap-3 my-8">
      <select
        name="selectCategory"
        id="selectCategory"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="px-3 py-2 text-base rounded-md border border-gray-300 bg-white text-gray-700 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
      >
        <option value="" disabled hidden>
          Filter a Category
        </option>
        {allCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <Button
        type="button"
        variant="secondary"
        disabled={selectedCategory === ''}
        onClick={() => onCategoryChange('')}
      >
        Reset Filter
      </Button>
    </form>
  );
};

export default CategoryFilter;
