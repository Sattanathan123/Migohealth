import React, { useState } from 'react';
import WorkerRegistration from './WorkerRegistration';
import HealthCard from './HealthCard';
import HospitalStaffLogin from './HospitalStaffLogin';
import HospitalStaffRegistration from './HospitalStaffRegistration';
import HealthStatusBadge from './HealthStatusBadge';

const HospitalDashboard = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showRegistration, setShowRegistration] = useState(false);
  const [registeredWorker, setRegisteredWorker] = useState(null);
  const [hospitalStaff, setHospitalStaff] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showStaffRegistration, setShowStaffRegistration] = useState(true);

  const handleRegistrationSuccess = (worker) => {
    setRegisteredWorker(worker);
    setShowRegistration(false);
  };

  const handleCardBack = () => {
    setRegisteredWorker(null);
    setActiveTab('overview');
  };

  const handleStaffLogin = (staff) => {
    setHospitalStaff(staff);
    setShowLogin(false);
    setShowStaffRegistration(false);
  };

  const handleStaffRegistrationSuccess = () => {
    setShowStaffRegistration(false);
    setShowLogin(true);
  };

  const handleSwitchToLogin = () => {
    setShowStaffRegistration(false);
    setShowLogin(true);
  };

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowStaffRegistration(true);
  };

  const handleStaffLogout = () => {
    setHospitalStaff(null);
    setShowLogin(false);
    setShowStaffRegistration(true);
    localStorage.removeItem('hospitalStaffToken');
    localStorage.removeItem('hospitalStaffId');
    localStorage.removeItem('hospitalStaffName');
  };

  if (showStaffRegistration) {
    return (
      <HospitalStaffRegistration 
        onRegistrationSuccess={handleStaffRegistrationSuccess}
        onBack={onBack}
        onSwitchToLogin={handleSwitchToLogin}
      />
    );
  }

  if (showLogin) {
    return (
      <HospitalStaffLogin 
        onLoginSuccess={handleStaffLogin}
        onBack={onBack}
        onSwitchToRegister={handleSwitchToRegister}
      />
    );
  }

  if (showRegistration) {
    return (
      <WorkerRegistration 
        onRegistrationSuccess={handleRegistrationSuccess}
        onBack={() => setShowRegistration(false)}
      />
    );
  }

  if (registeredWorker) {
    return (
      <HealthCard 
        worker={registeredWorker}
        onBack={handleCardBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">HP</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Hospital Portal</h1>
                <p className="text-sm text-gray-600">Welcome, {hospitalStaff?.name} - {hospitalStaff?.hospitalName}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleStaffLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
              <button
                onClick={onBack}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-sm p-4 mr-6">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                <span className="font-medium">Overview</span>
              </button>
              <button
                onClick={() => setShowRegistration(true)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-gray-700 hover:bg-blue-50"
              >
                <span className="font-medium">Register Worker</span>
              </button>
              <button
                onClick={() => setActiveTab('search')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'search'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                <span className="font-medium">Search Workers</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Hospital Dashboard</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-white text-xl">W</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Registered Workers</p>
                        <p className="text-2xl font-bold text-gray-800">156</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border">
                    <h4 className="text-sm font-medium text-gray-600 mb-3">Health Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <HealthStatusBadge status="GREEN" size="sm" />
                        <span className="text-sm font-medium">112</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <HealthStatusBadge status="ORANGE" size="sm" />
                        <span className="text-sm font-medium">33</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <HealthStatusBadge status="RED" size="sm" />
                        <span className="text-sm font-medium">11</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-white text-xl">T</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Today's Registrations</p>
                        <p className="text-2xl font-bold text-gray-800">12</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-white text-xl">M</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">This Month</p>
                        <p className="text-2xl font-bold text-gray-800">89</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setShowRegistration(true)}
                      className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 text-left transition-colors"
                    >
                      <h4 className="font-semibold">Register New Worker</h4>
                      <p className="text-sm opacity-90">Add a new migrant worker to the system</p>
                    </button>
                    <button
                      onClick={() => setActiveTab('search')}
                      className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 text-left transition-colors"
                    >
                      <h4 className="font-semibold">Search Workers</h4>
                      <p className="text-sm opacity-90">Find existing worker records</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'search' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Search Workers</h2>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter Health ID to search..."
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Search
                </button>
                <div className="mt-6">
                  <p className="text-gray-600">Enter a Health ID to search for worker records</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;