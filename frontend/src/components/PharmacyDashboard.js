import React, { useState } from 'react';
import PharmacistLogin from './PharmacistLogin';
import PharmacistRegistration from './PharmacistRegistration';
import PharmacyQRScanner from './PharmacyQRScanner';
import WorkerMedicalHistory from './WorkerMedicalHistory';
import { useLanguage } from '../utils/LanguageContext';

const PharmacyDashboard = ({ onBack }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [pharmacist, setPharmacist] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistration, setShowRegistration] = useState(true);
  const [showScanner, setShowScanner] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [scannedWorkerData, setScannedWorkerData] = useState(null);

  // Mock data for migrant workers who visited pharmacy
  const visitedWorkers = [
    { healthId: 'GH-TVM-023-MW-045', name: 'Ramesh Kumar', lastVisit: '2024-01-15' },
    { healthId: 'GH-KCH-012-MW-089', name: 'Priya Sharma', lastVisit: '2024-01-14' },
    { healthId: 'GH-EKM-045-MW-123', name: 'Suresh Yadav', lastVisit: '2024-01-13' }
  ];

  const handlePharmacistLogin = (pharmacistData) => {
    setPharmacist(pharmacistData);
    setShowLogin(false);
    setShowRegistration(false);
  };

  const handleRegistrationSuccess = () => {
    setShowRegistration(false);
    setShowLogin(true);
  };

  const handleScanSuccess = (workerData) => {
    setScannedWorkerData(workerData);
    setShowScanner(false);
    setActiveTab('medical-history');
  };

  const handleLogout = () => {
    setPharmacist(null);
    setShowLogin(false);
    setShowRegistration(true);
    setScannedWorkerData(null);
    localStorage.removeItem('pharmacistToken');
  };

  if (showRegistration) {
    return (
      <PharmacistRegistration 
        onRegistrationSuccess={handleRegistrationSuccess}
        onBack={onBack}
        onSwitchToLogin={() => { setShowRegistration(false); setShowLogin(true); }}
      />
    );
  }

  if (showLogin) {
    return (
      <PharmacistLogin 
        onLoginSuccess={handlePharmacistLogin}
        onBack={onBack}
        onSwitchToRegister={() => { setShowLogin(false); setShowRegistration(true); }}
      />
    );
  }

  if (showScanner) {
    return (
      <PharmacyQRScanner 
        onScanSuccess={handleScanSuccess}
        onBack={() => setShowScanner(false)}
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
                <span className="text-white font-bold">PH</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Pharmacy Portal</h1>
                <p className="text-sm text-gray-600">Welcome, {pharmacist?.name} - {pharmacist?.pharmacyName}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleLogout}
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
                onClick={() => setActiveTab('inventory')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'inventory'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                <span className="font-medium">Inventory</span>
              </button>
              <button
                onClick={() => setActiveTab('migrant-access')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'migrant-access'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                <span className="font-medium">Migrant Access</span>
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'notifications'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                <span className="font-medium">Notifications</span>
              </button>
              {scannedWorkerData && (
                <button
                  onClick={() => setActiveTab('medical-history')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'medical-history'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <span className="font-medium">Medical History</span>
                </button>
              )}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Pharmacy Dashboard</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-white text-xl">M</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Migrant Visitors</p>
                        <p className="text-2xl font-bold text-gray-800">{visitedWorkers.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-white text-xl">P</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Prescriptions</p>
                        <p className="text-2xl font-bold text-gray-800">24</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-white text-xl">T</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Today's Sales</p>
                        <p className="text-2xl font-bold text-gray-800">12</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'inventory' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Inventory Management</h2>
                <p className="text-gray-600">Inventory management features coming soon...</p>
              </div>
            )}

            {activeTab === 'migrant-access' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Migrant Worker Access</h2>
                <div className="mb-4">
                  <button
                    onClick={() => setShowScanner(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Scan QR Code
                  </button>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Visitors</h3>
                  {visitedWorkers.map((worker) => (
                    <div key={worker.healthId} className="border rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">{worker.name}</p>
                        <p className="text-sm text-gray-600">Health ID: {worker.healthId}</p>
                        <p className="text-xs text-gray-500">Last visit: {worker.lastVisit}</p>
                      </div>
                      <button
                        onClick={() => setShowScanner(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Scan QR
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4">
                    <p className="text-sm font-medium text-yellow-800">Drug Interaction Alert</p>
                    <p className="text-xs text-yellow-700">Check for interactions before dispensing</p>
                  </div>
                  <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                    <p className="text-sm font-medium text-blue-800">System Update</p>
                    <p className="text-xs text-blue-700">New features available in pharmacy portal</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'medical-history' && scannedWorkerData && (
              <WorkerMedicalHistory 
                worker={scannedWorkerData}
                onBack={() => setActiveTab('migrant-access')}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDashboard;