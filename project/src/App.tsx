import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import { fetchDoctors } from './api/fetchDoctors';
import { 
  applyFiltersAndSort, 
  getAllSpecialties 
} from './utils/filterUtils';
import {
  updateUrlWithFilters,
  getFiltersFromUrl
} from './utils/queryParamsUtils';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    consultationType: '',
    specialties: [],
    sortBy: ''
  });

  // Load doctors on initial render
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        const data = await fetchDoctors();
        
        if (Array.isArray(data) && data.length > 0) {
          setDoctors(data);
          
          // Extract unique specialties
          const allSpecialties = getAllSpecialties(data);
          setSpecialties(allSpecialties);
          
          // Get filters from URL
          const urlFilters = getFiltersFromUrl();
          setFilters(urlFilters);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        setError('Failed to load doctors. Please try again later.');
        console.error('Error loading doctors:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadDoctors();
  }, []);

  // Update filtered doctors when filters change
  useEffect(() => {
    if (Array.isArray(doctors) && doctors.length > 0) {
      const newFilteredDoctors = applyFiltersAndSort(doctors, filters);
      setFilteredDoctors(newFilteredDoctors);
      
      // Update URL with current filters
      updateUrlWithFilters(filters);
    }
  }, [doctors, filters]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const urlFilters = getFiltersFromUrl();
      setFilters(urlFilters);
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const updateFilters = (newFilterValues) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilterValues
    }));
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      consultationType: '',
      specialties: [],
      sortBy: ''
    });
  };

  const handleSearch = (searchTerm) => {
    updateFilters({ searchTerm });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">MedConnect</h1>
          </div>
        </div>
      </header>
      
      {/* Search Bar */}
      <div className="bg-blue-700 pb-6">
        <div className="container mx-auto px-4">
          <SearchBar 
            doctors={doctors}
            searchTerm={filters.searchTerm}
            setSearchTerm={(searchTerm) => updateFilters({ searchTerm })}
            onSearch={handleSearch}
          />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4">
            <FilterPanel 
              specialties={specialties}
              filters={filters}
              updateFilters={updateFilters}
              resetFilters={resetFilters}
            />
          </div>
          
          {/* Doctor List */}
          <div className="w-full md:w-3/4">
            <div className="mb-4 bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {loading ? 'Loading doctors...' : `${filteredDoctors.length} Doctor${filteredDoctors.length !== 1 ? 's' : ''} Found`}
                </h2>
              </div>
            </div>
            
            <DoctorList 
              doctors={filteredDoctors} 
              loading={loading} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;