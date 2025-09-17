import React, { useState } from 'react';

const DoctorRegistration = ({ onRegistrationSuccess, onBack, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    nmsNumber: '',
    name: '',
    password: '',
    specialization: '',
    hospital: ''
  });
  const [generatedDoctorId, setGeneratedDoctorId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8085/api/doctors/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const doctor = await response.json();
        setGeneratedDoctorId(doctor.doctorId);
        setTimeout(() => {
          onRegistrationSuccess(doctor);
        }, 3000);
      } else if (response.status === 409) {
        setError('NMS number already registered. Please use a different NMS number.');
      } else if (response.status === 500) {
        setError('Server error. Please check if backend is running.');
      } else {
        setError(`Registration failed. Status: ${response.status}`);
      }
    } catch (err) {
      setError('Unable to connect to server');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Doctor Registration</h2>
            <button onClick={onBack} className="text-gray-600 hover:text-gray-800">← Back</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NMS Number</label>
              <input
                type="text"
                name="nmsNumber"
                value={formData.nmsNumber}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your NMS registration number"
              />
            </div>

            {generatedDoctorId && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <label className="block text-sm font-medium text-green-700 mb-1">Generated Doctor ID</label>
                <div className="text-lg font-mono text-green-800">{generatedDoctorId}</div>
                <p className="text-xs text-green-600 mt-1">Use this ID to login after registration</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
                placeholder="e.g., General Medicine"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hospital</label>
              <input
                type="text"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
                placeholder="Hospital name"
              />
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegistration;