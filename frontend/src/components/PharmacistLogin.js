import React, { useState } from 'react';
import { useLanguage } from '../utils/LanguageContext';

const PharmacistLogin = ({ onLoginSuccess, onBack, onSwitchToRegister }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    uniqueId: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check stored registration data
      const storedData = localStorage.getItem('pharmacistData');
      if (storedData) {
        const pharmacistData = JSON.parse(storedData);
        if (pharmacistData.uniqueId === formData.uniqueId.trim() && pharmacistData.password === formData.password) {
          localStorage.setItem('pharmacistToken', 'pharmacy-token-123');
          onLoginSuccess(pharmacistData);
        } else {
          setError('Invalid Pharmacy ID or password');
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">PH</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Pharmacist Login</h2>
          <p className="mt-2 text-sm text-gray-600">Use your generated Pharmacy ID to login</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Pharmacy ID</label>
              <input
                name="uniqueId"
                type="text"
                required
                value={formData.uniqueId}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                placeholder="Enter your generated Pharmacy ID"
              />
              <p className="text-xs text-gray-500 mt-1">Enter the exact ID generated during registration</p>
              <button
                type="button"
                onClick={() => {
                  const stored = localStorage.getItem('pharmacistData');
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

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
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

          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              Need to register? Sign up here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PharmacistLogin;