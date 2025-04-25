import React from 'react';

const SortFilter = ({ sortBy, setSortBy }) => {
  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3" data-testid="filter-header-sort">Sort By</h3>
      <div className="space-y-2">
        <div className="flex items-center">
          <input
            type="radio"
            id="sort-fees"
            name="sort"
            className="w-4 h-4 text-blue-600"
            checked={sortBy === 'fees'}
            onChange={() => handleSortChange('fees')}
            data-testid="sort-fees"
          />
          <label htmlFor="sort-fees" className="ml-2 text-gray-700">
            Fees (Low to High)
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="radio"
            id="sort-experience"
            name="sort"
            className="w-4 h-4 text-blue-600"
            checked={sortBy === 'experience'}
            onChange={() => handleSortChange('experience')}
            data-testid="sort-experience"
          />
          <label htmlFor="sort-experience" className="ml-2 text-gray-700">
            Experience (High to Low)
          </label>
        </div>
        
        {sortBy && (
          <div className="flex items-center mt-2">
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() => handleSortChange('')}
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortFilter;