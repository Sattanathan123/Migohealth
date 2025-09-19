import React, { useState } from 'react';
import { useLanguage } from '../utils/LanguageContext';

const HealthDeptLogin = ({ onLoginSuccess, onBack, onSwitchToRegister }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    uniqueId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const storedData = localStorage.getItem('healthDeptData');
      if (storedData) {
        const deptData = JSON.parse(storedData);

        if (deptData.uniqueId === formData.uniqueId.trim()) {
          localStorage.setItem('healthDeptToken', 'health-dept-token-123');
          onLoginSuccess(deptData);
        } else {
          setError('Invalid Health Department ID. Please check your registered ID.');
        }
      } else {
        setError('No account found. Please register first.');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
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

  const handleSSO = () => {
    // Mock SSO login
    const mockSSO = {
      uniqueId: 'KL-HD-123456-SSO',
      name: 'Kerala Health Administrator',
      role: 'admin',
      district: 'all',
      department: 'Kerala State Health Department'
    };
    localStorage.setItem('healthDeptToken', 'sso-token-456');
    onLoginSuccess(mockSSO);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <img 
              src="https://www.madhyamam.com/h-upload/2023/05/25/1987330-health-department-logo.jpg" 
              alt="Kerala Health Department" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Health Department Login</h2>
          <p className="mt-2 text-sm text-gray-600">Secure access to health surveillance system</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-800">Health Department ID</label>
              <input
                name="uniqueId"
                type="text"
                required
                value={formData.uniqueId}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                placeholder="Enter your unique Health Department ID"
              />
              <p className="text-xs text-gray-500 mt-1">Enter the exact ID generated during registration</p>
              <button
                type="button"
                onClick={() => {
                  const stored = localStorage.getItem('healthDeptData');
                  if (stored) {
                    const data = JSON.parse(stored);
                    alert(`Your registered ID is: ${data.uniqueId}`);
                  } else {
                    alert('No registration found. Please register first.');
                  }
                }}
                className="text-xs text-blue-600 hover:text-blue-700 mt-1"
              >
                Show my registered ID
              </button>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <button
                type="button"
                onClick={onBack}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSSO}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Login with Government ID</span>
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Don't have an ID? Register here
              </button>
            </div>
          </form>
        </div>

        <div className="text-center text-blue-200 text-xs">
          <p>© 2025 Government of Kerala - Health Department</p>
          <p>Secure access to migrant worker health surveillance system</p>
        </div>
      </div>
    </div>
  );
};

export default HealthDeptLogin;