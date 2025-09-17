import React, { useState } from 'react';

const WorkerRegistration = ({ onRegistrationSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    originState: '',
    photoUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateHealthId = (originState) => {
    const stateCode = {
      'Bihar': 'BHR',
      'Uttar Pradesh': 'UP',
      'Jharkhand': 'JHR',
      'West Bengal': 'WB',
      'Odisha': 'ODS'
    }[originState] || 'OTH';
    
    const timestamp = Date.now();
    const sequence = Math.floor(Math.random() * 999) + 1;
    return `GH-${stateCode}-${String(sequence).padStart(3, '0')}-MW-${String(timestamp % 1000).padStart(3, '0')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Generate health ID on frontend
      const healthId = generateHealthId(formData.originState);
      
      // Create worker object
      const worker = {
        id: Date.now(),
        healthId: healthId,
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender,
        originState: formData.originState,
        photoUrl: formData.photoUrl || null
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onRegistrationSuccess(worker);
    } catch (err) {
      setError('Registration failed');
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Worker Registration</h2>
            <button onClick={onBack} className="text-gray-600 hover:text-gray-800">← Back</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Origin State</label>
              <select
                name="originState"
                value={formData.originState}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select State</option>
                <option value="Bihar">Bihar</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Odisha">Odisha</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL (Optional)</label>
              <input
                type="url"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
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
              {loading ? 'Registering...' : 'Register Worker'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkerRegistration;