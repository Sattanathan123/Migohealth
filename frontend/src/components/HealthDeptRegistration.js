import React, { useState } from 'react';
import { useLanguage } from '../utils/LanguageContext';

const HealthDeptRegistration = ({ onRegistrationSuccess, onBack, onSwitchToLogin }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    department: '',
    district: '',
    role: 'staff',
    email: '',
    phone: ''
  });
  const [generatedId, setGeneratedId] = useState('');
  const [loading, setLoading] = useState(false);

  const districts = [
    'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam',
    'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode',
    'Wayanad', 'Kannur', 'Kasaragod'
  ];

  const generateUniqueId = () => {
    const prefix = formData.district === 'all' ? 'KL-HD' : formData.district.substring(0, 3).toUpperCase() + '-HD';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const uniqueId = generateUniqueId();
      const registrationData = { ...formData, uniqueId };
      
      localStorage.setItem('healthDeptData', JSON.stringify(registrationData));
      setGeneratedId(uniqueId);
      // Don't call onRegistrationSuccess immediately, let user see the ID first
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <img 
              src="https://www.madhyamam.com/h-upload/2023/05/25/1987330-health-department-logo.jpg" 
              alt="Kerala Health Department" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Health Department Registration</h2>
          <p className="mt-2 text-sm text-gray-600">Register your department for secure access</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-800">Full Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">Employee ID</label>
                <input
                  name="employeeId"
                  type="text"
                  required
                  value={formData.employeeId}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Official employee ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">Department</label>
                <select
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Department</option>
                  <option value="District Health Office">District Health Office</option>
                  <option value="Primary Health Centre">Primary Health Centre</option>
                  <option value="Community Health Centre">Community Health Centre</option>
                  <option value="Taluk Hospital">Taluk Hospital</option>
                  <option value="District Hospital">District Hospital</option>
                  <option value="Medical College Hospital">Medical College Hospital</option>
                  <option value="State Health Department">State Health Department</option>
                  <option value="Directorate of Health Services">Directorate of Health Services</option>
                  <option value="National Health Mission">National Health Mission</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">District</label>
                <select
                  name="district"
                  required
                  value={formData.district}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select District</option>
                  <option value="all">All Districts (State Level)</option>
                  {districts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">Role</label>
                <select
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="staff">Health Staff</option>
                  <option value="officer">District Officer</option>
                  <option value="admin">State Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="official.email@kerala.gov.in"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contact number"
                />
              </div>


            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <svg className="w-5 h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-blue-800">Unique ID Generation</h4>
                  <p className="text-xs text-blue-700 mt-1">
                    Upon successful registration, a unique Health Department ID will be generated for secure login access.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading || generatedId}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Generating ID...' : generatedId ? 'Registration Complete' : 'Generate Health ID'}
              </button>
              <button
                type="button"
                onClick={onBack}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
            </div>

            {generatedId && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="text-center">
                  <svg className="w-12 h-12 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="text-lg font-bold text-green-800 mb-3">Registration Successful!</h4>
                  <p className="text-sm text-green-700 mb-4">Your unique Health Department ID has been generated:</p>
                  <div className="bg-white border-2 border-green-400 rounded-lg px-4 py-3 font-mono text-lg font-bold text-green-800 mb-4 select-all">
                    {generatedId}
                  </div>
                  <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mb-4">
                    <p className="text-xs text-yellow-800 font-semibold">⚠️ IMPORTANT: Save this ID securely!</p>
                    <p className="text-xs text-yellow-700 mt-1">You will need this ID to login to the system. Copy it now.</p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedId);
                      alert('ID copied to clipboard!');
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-3"
                  >
                    Copy ID
                  </button>
                  <button
                    onClick={onSwitchToLogin}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Proceed to Login
                  </button>
                </div>
              </div>
            )}
            
            <div className="text-center">
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Already have an ID? Login here
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HealthDeptRegistration;