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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store registration data
      localStorage.setItem('pharmacistData', JSON.stringify(formData));
      
      onRegistrationSuccess();
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
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
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