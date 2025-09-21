const API_BASE_URL = 'http://localhost:8085';

const getAuthHeaders = () => {
  const token = localStorage.getItem('doctorToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: getAuthHeaders(),
    ...options
  };

  const response = await fetch(url, config);
  return response;
};

export const getDashboardStats = async () => {
  try {
    const response = await apiCall('/api/dashboard/stats');
    if (response.ok) {
      const text = await response.text();
      return text ? JSON.parse(text) : {};
    }
    return {
      totalWorkers: 0,
      totalDoctors: 0,
      totalPrescriptions: 0,
      activeHospitals: 0,
      healthStatusCounts: { GREEN: 0, ORANGE: 0, RED: 0 }
    };
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return {
      totalWorkers: 0,
      totalDoctors: 0,
      totalPrescriptions: 0,
      activeHospitals: 0,
      healthStatusCounts: { GREEN: 0, ORANGE: 0, RED: 0 }
    };
  }
};

export const getDoctorStats = async (doctorId) => {
  try {
    const response = await apiCall(`/api/dashboard/doctor-stats/${doctorId}`);
    if (response.ok) {
      const text = await response.text();
      return text ? JSON.parse(text) : {};
    }
    return { totalPatients: 0, prescriptions: 0, consultations: 0 };
  } catch (error) {
    console.error('Doctor stats error:', error);
    return { totalPatients: 0, prescriptions: 0, consultations: 0 };
  }
};

export default { apiCall, getDashboardStats, getDoctorStats };