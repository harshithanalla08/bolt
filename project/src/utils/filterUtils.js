// Filter doctors based on search term
export const filterBySearch = (doctors, searchTerm) => {
  if (!searchTerm) return doctors;
  
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(lowerCaseSearchTerm) ||
    (Array.isArray(doctor.specialties) && doctor.specialties.some(specialty => 
      specialty.toLowerCase().includes(lowerCaseSearchTerm)
    )) ||
    doctor.location?.toLowerCase().includes(lowerCaseSearchTerm) ||
    doctor.education?.toLowerCase().includes(lowerCaseSearchTerm)
  );
};

// Get search suggestions based on search term
export const getSearchSuggestions = (doctors, searchTerm, limit = 3) => {
  if (!searchTerm) return [];
  
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  const suggestions = new Set();

  doctors.forEach(doctor => {
    // Add doctor name if it matches
    if (doctor.name.toLowerCase().includes(lowerCaseSearchTerm)) {
      suggestions.add(doctor.name);
    }
    
    // Add matching specialties
    if (Array.isArray(doctor.specialties)) {
      doctor.specialties.forEach(specialty => {
        if (specialty.toLowerCase().includes(lowerCaseSearchTerm)) {
          suggestions.add(specialty);
        }
      });
    }
    
    // Add matching locations
    if (doctor.location?.toLowerCase().includes(lowerCaseSearchTerm)) {
      suggestions.add(doctor.location);
    }
  });

  return Array.from(suggestions).slice(0, limit);
};

// Filter doctors by consultation type
export const filterByConsultationType = (doctors, consultationType) => {
  if (!consultationType || consultationType === 'all') return doctors;
  
  return doctors.filter(doctor => {
    if (consultationType === 'video') {
      return doctor.video_consult;
    } else if (consultationType === 'clinic') {
      return doctor.in_clinic;
    }
    return true;
  });
};

// Filter doctors by specialties
export const filterBySpecialties = (doctors, selectedSpecialties) => {
  if (!selectedSpecialties || selectedSpecialties.length === 0) return doctors;
  
  return doctors.filter(doctor => {
    return Array.isArray(doctor.specialties) && selectedSpecialties.some(specialty => 
      doctor.specialties.includes(specialty)
    );
  });
};

// Sort doctors by criteria
export const sortDoctors = (doctors, sortBy) => {
  if (!sortBy) return doctors;
  
  const sortedDoctors = [...doctors];
  
  switch (sortBy) {
    case 'fees':
      return sortedDoctors.sort((a, b) => a.fees - b.fees);
    case 'experience':
      return sortedDoctors.sort((a, b) => b.experience - a.experience);
    default:
      return sortedDoctors;
  }
};

// Get all unique specialties from doctors
export const getAllSpecialties = (doctors) => {
  const specialtiesSet = new Set();
  
  doctors.forEach(doctor => {
    if (Array.isArray(doctor.specialties)) {
      doctor.specialties.forEach(specialty => {
        specialtiesSet.add(specialty);
      });
    }
  });
  
  return Array.from(specialtiesSet).sort();
};

// Apply all filters and sorting
export const applyFiltersAndSort = (doctors, filters) => {
  let filteredDoctors = [...doctors];
  
  // Apply search filter
  if (filters.searchTerm) {
    filteredDoctors = filterBySearch(filteredDoctors, filters.searchTerm);
  }
  
  // Apply consultation type filter
  if (filters.consultationType) {
    filteredDoctors = filterByConsultationType(filteredDoctors, filters.consultationType);
  }
  
  // Apply specialties filter
  if (filters.specialties && filters.specialties.length > 0) {
    filteredDoctors = filterBySpecialties(filteredDoctors, filters.specialties);
  }
  
  // Apply sorting
  if (filters.sortBy) {
    filteredDoctors = sortDoctors(filteredDoctors, filters.sortBy);
  }
  
  return filteredDoctors;
};