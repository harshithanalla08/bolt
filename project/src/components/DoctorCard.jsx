import React from 'react';
import { Video, Building2, MapPin, GraduationCap, Clock } from 'lucide-react';

const DoctorCard = ({ doctor }) => {
  // Array of professional doctor profile images
  const doctorImages = [
    "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg",
    "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg",
    "https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg",
    "https://images.pexels.com/photos/5452291/pexels-photo-5452291.jpeg"
  ];

  // Get a consistent image for each doctor based on their ID
  const getProfileImage = (id) => {
    const index = parseInt(id.replace(/[^0-9]/g, '')) % doctorImages.length;
    return doctorImages[index];
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 mb-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.01]"
      data-testid="doctor-card"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex items-start">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
            <img 
              src={getProfileImage(doctor.id)}
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h2 className="text-xl font-bold text-blue-800" data-testid="doctor-name">{doctor.name}</h2>
            <span className="text-lg font-semibold text-green-600" data-testid="doctor-fee">₹{doctor.fees}</span>
          </div>
          
          <div className="mt-2 flex items-center gap-2" data-testid="doctor-specialty">
            {doctor.specialties.map((specialty, index) => (
              <span key={index} className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {specialty}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <div className="flex items-center gap-2" data-testid="doctor-experience">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">{doctor.experience} years experience</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">{doctor.education || 'MBBS'}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">{doctor.location || 'Not specified'}</span>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-4">
            {doctor.video_consult && (
              <span className="inline-flex items-center gap-1 text-green-700 text-sm bg-green-50 px-3 py-1 rounded-full">
                <Video className="w-4 h-4" />
                Video Consult
              </span>
            )}
            
            {doctor.in_clinic && (
              <span className="inline-flex items-center gap-1 text-blue-700 text-sm bg-blue-50 px-3 py-1 rounded-full">
                <Building2 className="w-4 h-4" />
                In-Clinic
              </span>
            )}
          </div>
          
          <button className="mt-4 w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;