import React, { useState } from 'react';
import { useLanguage } from '../utils/LanguageContext';

const PharmacistRegistration = ({ onRegistrationSuccess, onBack, onSwitchToLogin }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    licenseNumber: '',
    pharmacyName: '',
    contact: '',
    email: '',
    password: ''
  });
  const [generatedId, setGeneratedId] = useState('');
  const [loading, setLoading] = useState(false);

  const generateUniqueId = () => {
    const prefix = 'PH-KL';
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
      
      localStorage.setItem('pharmacistData', JSON.stringify(registrationData));
      setGeneratedId(uniqueId);
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">PH</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Pharmacist Registration</h2>
          <p className="mt-2 text-sm text-gray-600">Register to access migrant health records</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
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
              <label className="block text-sm font-medium text-gray-700">License Number</label>
              <input
                name="licenseNumber"
                type="text"
                required
                value={formData.licenseNumber}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Pharmacy license number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Pharmacy Name</label>
              <input
                name="pharmacyName"
                type="text"
                required
                value={formData.pharmacyName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name of your pharmacy"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                name="contact"
                type="tel"
                required
                value={formData.contact}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your contact number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your.email@example.com"
              />
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
                placeholder="Create a secure password"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading || generatedId}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Generating ID...' : generatedId ? 'Registration Complete' : 'Generate Pharmacy ID'}
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
                <p className="text-sm text-green-700 mb-4">Your unique Pharmacy ID has been generated:</p>
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
              Already registered? Login here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PharmacistRegistration;