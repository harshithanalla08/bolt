// Function to fetch doctors data from the API
export const fetchDoctors = async () => {
  try {
    const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
    
    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }
    
    const data = await response.json();
    
    // Transform the data to match our expected format
    return data.map((doctor, index) => ({
      id: `doc-${index + 1}`,
      name: doctor.name || 'Dr. John Doe',
      specialties: doctor.specialties || ['General Medicine'],
      experience: doctor.experience || Math.floor(Math.random() * 15) + 5,
      education: doctor.education || 'MBBS',
      location: doctor.location || 'Mumbai',
      fees: doctor.fees || Math.floor(Math.random() * 1000) + 500,
      video_consult: doctor.video_consult !== undefined ? doctor.video_consult : true,
      in_clinic: doctor.in_clinic !== undefined ? doctor.in_clinic : true
    }));
  } catch (error) {
    console.error('Error fetching doctors:', error);
    // Return sample data in case of error
    return [
      {
        id: 'doc-1',
        name: 'Dr. Sarah Johnson',
        specialties: ['Cardiology', 'Internal Medicine'],
        experience: 12,
        education: 'MBBS, MD',
        location: 'Mumbai',
        fees: 1000,
        video_consult: true,
        in_clinic: true
      },
      {
        id: 'doc-2',
        name: 'Dr. Michael Chen',
        specialties: ['Pediatrics'],
        experience: 8,
        education: 'MBBS, DCH',
        location: 'Delhi',
        fees: 800,
        video_consult: true,
        in_clinic: true
      },
      {
        id: 'doc-3',
        name: 'Dr. Priya Patel',
        specialties: ['Dermatology'],
        experience: 15,
        education: 'MBBS, MD (Dermatology)',
        location: 'Bangalore',
        fees: 1200,
        video_consult: true,
        in_clinic: false
      }
    ];
  }
};