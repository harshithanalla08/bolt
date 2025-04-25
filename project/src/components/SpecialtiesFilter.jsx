import React from 'react';

const SpecialtiesFilter = ({ specialties, selectedSpecialties, setSelectedSpecialties }) => {
  const handleSpecialtyChange = (specialty) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter(item => item !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  const getTestId = (specialty) => {
    // Convert specialty to the format required for data-testid
    return `filter-specialty-${specialty.replace(/\//g, '-')}`;
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3" data-testid="filter-header-speciality">Speciality</h3>
      <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
        {specialties.map((specialty) => (
          <div key={specialty} className="flex items-center">
            <input
              type="checkbox"
              id={`specialty-${specialty}`}
              className="w-4 h-4 text-blue-600 rounded"
              checked={selectedSpecialties.includes(specialty)}
              onChange={() => handleSpecialtyChange(specialty)}
              data-testid={getTestId(specialty)}
            />
            <label htmlFor={`specialty-${specialty}`} className="ml-2 text-gray-700">
              {specialty}
            </label>
          </div>
        ))}
      </div>
      
      {selectedSpecialties.length > 0 && (
        <div className="flex items-center mt-3">
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={() => setSelectedSpecialties([])}
          >
            Clear Specialties
          </button>
        </div>
      )}
    </div>
  );
};

export default SpecialtiesFilter;