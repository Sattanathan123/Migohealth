import React, { useState } from 'react';

const HospitalStaffRegistration = ({ onRegistrationSuccess, onBack, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    hospitalName: '',
    designation: ''
  });
  const [generatedStaffId, setGeneratedStaffId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateStaffId = () => {
    const hospitalCode = formData.hospitalName.split(' ')[0].substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 4).toUpperCase();
    return `HS-${hospitalCode}-${timestamp}-${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const staffId = generateStaffId();
      const registrationData = { ...formData, staffId };
      
      const response = await fetch('http://localhost:8085/api/hospital-staff/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      });

      if (response.ok) {
        const staff = await response.json();
        setGeneratedStaffId(staffId);
      } else if (response.status === 409) {
        setError('Registration failed. Please try again.');
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Hospital Staff Registration</h2>
            <button onClick={onBack} className="text-gray-600 hover:text-gray-800">← Back</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {generatedStaffId && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <label className="block text-sm font-medium text-green-700 mb-1">Generated Staff ID</label>
                <div className="text-lg font-mono text-green-800">{generatedStaffId}</div>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
              <select
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Hospital</option>
                <optgroup label="Government Hospitals">
                  <option value="Government Medical College, Thiruvananthapuram">Government Medical College, Thiruvananthapuram</option>
                  <option value="Government Medical College, Kottayam">Government Medical College, Kottayam</option>
                  <option value="Government Medical College, Kozhikode">Government Medical College, Kozhikode</option>
                  <option value="Government Medical College, Thrissur">Government Medical College, Thrissur</option>
                  <option value="Government Medical College, Kannur">Government Medical College, Kannur</option>
                  <option value="Government Medical College, Alappuzha">Government Medical College, Alappuzha</option>
                  <option value="Government Medical College, Palakkad">Government Medical College, Palakkad</option>
                  <option value="Government Medical College, Kollam">Government Medical College, Kollam</option>
                  <option value="Government Medical College, Manjeri">Government Medical College, Manjeri</option>
                  <option value="Government Medical College, Pariyaram">Government Medical College, Pariyaram</option>
                  <option value="Regional Cancer Centre, Thiruvananthapuram">Regional Cancer Centre, Thiruvananthapuram</option>
                  <option value="Sree Chitra Tirunal Institute, Thiruvananthapuram">Sree Chitra Tirunal Institute, Thiruvananthapuram</option>
                  <option value="District Hospital, Ernakulam">District Hospital, Ernakulam</option>
                  <option value="District Hospital, Pathanamthitta">District Hospital, Pathanamthitta</option>
                  <option value="District Hospital, Idukki">District Hospital, Idukki</option>
                  <option value="District Hospital, Wayanad">District Hospital, Wayanad</option>
                  <option value="District Hospital, Kasaragod">District Hospital, Kasaragod</option>
                </optgroup>
                <optgroup label="Private Hospitals">
                  <option value="Amrita Institute of Medical Sciences, Kochi">Amrita Institute of Medical Sciences, Kochi</option>
                  <option value="Aster Medcity, Kochi">Aster Medcity, Kochi</option>
                  <option value="Lakeshore Hospital, Kochi">Lakeshore Hospital, Kochi</option>
                  <option value="Rajagiri Hospital, Aluva">Rajagiri Hospital, Aluva</option>
                  <option value="VPS Lakeshore, Kochi">VPS Lakeshore, Kochi</option>
                  <option value="Lisie Hospital, Kochi">Lisie Hospital, Kochi</option>
                  <option value="Medical Trust Hospital, Kochi">Medical Trust Hospital, Kochi</option>
                  <option value="KIMS Hospital, Thiruvananthapuram">KIMS Hospital, Thiruvananthapuram</option>
                  <option value="Cosmopolitan Hospital, Thiruvananthapuram">Cosmopolitan Hospital, Thiruvananthapuram</option>
                  <option value="SUT Hospital, Thiruvananthapuram">SUT Hospital, Thiruvananthapuram</option>
                  <option value="Ananthapuri Hospitals, Thiruvananthapuram">Ananthapuri Hospitals, Thiruvananthapuram</option>
                  <option value="Baby Memorial Hospital, Kozhikode">Baby Memorial Hospital, Kozhikode</option>
                  <option value="Aster MIMS, Kozhikode">Aster MIMS, Kozhikode</option>
                  <option value="Beach & Hills Hospital, Kozhikode">Beach & Hills Hospital, Kozhikode</option>
                  <option value="Jubilee Mission Hospital, Thrissur">Jubilee Mission Hospital, Thrissur</option>
                  <option value="Elite Mission Hospital, Thrissur">Elite Mission Hospital, Thrissur</option>
                  <option value="Caritas Hospital, Kottayam">Caritas Hospital, Kottayam</option>
                  <option value="Pushpagiri Medical Centre, Tiruvalla">Pushpagiri Medical Centre, Tiruvalla</option>
                  <option value="Mar Sleeva Medicity, Palai">Mar Sleeva Medicity, Palai</option>
                  <option value="Believers Church Medical College, Thiruvalla">Believers Church Medical College, Thiruvalla</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Designation</option>
                <option value="Staff Nurse">Staff Nurse</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Medical Assistant">Medical Assistant</option>
                <option value="Lab Technician">Lab Technician</option>
                <option value="Pharmacist">Pharmacist</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || generatedStaffId}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Generating ID...' : generatedStaffId ? 'Registration Complete' : 'Generate Staff ID'}
            </button>
          </form>

          {generatedStaffId && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6">
              <div className="text-center">
                <svg className="w-12 h-12 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="text-lg font-bold text-green-800 mb-3">Registration Successful!</h4>
                <p className="text-sm text-green-700 mb-4">Your unique Staff ID has been generated:</p>
                <div className="bg-white border-2 border-green-400 rounded-lg px-4 py-3 font-mono text-lg font-bold text-green-800 mb-4 select-all">
                  {generatedStaffId}
                </div>
                <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mb-4">
                  <p className="text-xs text-yellow-800 font-semibold">⚠️ IMPORTANT: Save this ID securely!</p>
                  <p className="text-xs text-yellow-700 mt-1">You will need this ID to login to the system. Copy it now.</p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedStaffId);
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

export default HospitalStaffRegistration;