// Update URL with filter params
export const updateUrlWithFilters = (filters) => {
  const searchParams = new URLSearchParams();
  
  if (filters.searchTerm) {
    searchParams.set('search', filters.searchTerm);
  }
  
  if (filters.consultationType) {
    searchParams.set('consult', filters.consultationType);
  }
  
  if (filters.specialties && filters.specialties.length > 0) {
    searchParams.set('specialties', filters.specialties.join(','));
  }
  
  if (filters.sortBy) {
    searchParams.set('sort', filters.sortBy);
  }
  
  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.pushState({ path: newUrl }, '', newUrl);
};

// Get filters from URL params
export const getFiltersFromUrl = () => {
  const searchParams = new URLSearchParams(window.location.search);
  
  const filters = {
    searchTerm: searchParams.get('search') || '',
    consultationType: searchParams.get('consult') || '',
    specialties: searchParams.get('specialties') ? searchParams.get('specialties').split(',') : [],
    sortBy: searchParams.get('sort') || ''
  };
  
  return filters;
};