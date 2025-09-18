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

export default { apiCall };