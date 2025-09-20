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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-xl border-b border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">Rx</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pharmacy Portal</h1>
                <p className="text-lg text-gray-700 font-medium">Welcome, {pharmacist?.name} - {pharmacist?.pharmacyName}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-semibold">System Active</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Logout
              </button>
              <button
                onClick={onBack}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Navigation</h3>
              <p className="text-sm text-gray-600">Manage pharmacy operations</p>
            </div>
            <nav className="space-y-3">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 ${
                  activeTab === 'overview'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-blue-50 hover:shadow-md'
                }`}
              >
                <span className="font-semibold">Overview</span>
                {activeTab === 'overview' && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
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
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">Pharmacy Dashboard</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-700 mb-2">{visitedWorkers.length}</div>
                      <div className="text-lg font-semibold text-gray-800 mb-1">Migrant Visitors</div>
                      <div className="text-sm text-blue-600">This month</div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-100 p-8 rounded-2xl border border-indigo-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-indigo-700 mb-2">24</div>
                      <div className="text-lg font-semibold text-gray-800 mb-1">Prescriptions</div>
                      <div className="text-sm text-indigo-600">Processed today</div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-8 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-700 mb-2">12</div>
                      <div className="text-lg font-semibold text-gray-800 mb-1">Today's Sales</div>
                      <div className="text-sm text-purple-600">Transactions</div>
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