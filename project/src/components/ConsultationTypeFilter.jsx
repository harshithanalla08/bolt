import React from 'react';

const ConsultationTypeFilter = ({ selectedType, setSelectedType }) => {
  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3" data-testid="filter-header-moc">Consultation Mode</h3>
      <div className="space-y-2">
        <div className="flex items-center">
          <input
            type="radio"
            id="video-consult"
            name="consultation-type"
            className="w-4 h-4 text-blue-600"
            checked={selectedType === 'video'}
            onChange={() => handleTypeChange('video')}
            data-testid="filter-video-consult"
          />
          <label htmlFor="video-consult" className="ml-2 text-gray-700">
            Video Consult
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="radio"
            id="in-clinic"
            name="consultation-type"
            className="w-4 h-4 text-blue-600"
            checked={selectedType === 'clinic'}
            onChange={() => handleTypeChange('clinic')}
            data-testid="filter-in-clinic"
          />
          <label htmlFor="in-clinic" className="ml-2 text-gray-700">
            In Clinic
          </label>
        </div>
        
        {selectedType && (
          <div className="flex items-center mt-2">
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() => handleTypeChange('')}
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationTypeFilter;