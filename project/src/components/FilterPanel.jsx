import React from 'react';
import ConsultationTypeFilter from './ConsultationTypeFilter';
import SpecialtiesFilter from './SpecialtiesFilter';
import SortFilter from './SortFilter';

const FilterPanel = ({ 
  specialties, 
  filters, 
  updateFilters,
  resetFilters
}) => {
  const handleConsultationTypeChange = (type) => {
    updateFilters({ consultationType: type });
  };

  const handleSpecialtiesChange = (selectedSpecialties) => {
    updateFilters({ specialties: selectedSpecialties });
  };

  const handleSortChange = (sortBy) => {
    updateFilters({ sortBy });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Filters</h2>
        {(filters.consultationType || filters.specialties.length > 0 || filters.sortBy) && (
          <button 
            className="text-sm text-blue-600 hover:underline"
            onClick={resetFilters}
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="divide-y">
        <ConsultationTypeFilter 
          selectedType={filters.consultationType} 
          setSelectedType={handleConsultationTypeChange} 
        />
        
        <SpecialtiesFilter 
          specialties={specialties}
          selectedSpecialties={filters.specialties}
          setSelectedSpecialties={handleSpecialtiesChange}
        />
        
        <SortFilter 
          sortBy={filters.sortBy} 
          setSortBy={handleSortChange} 
        />
      </div>
    </div>
  );
};

export default FilterPanel;