import React, { useState, useEffect } from 'react';
import PrescriptionUpload from './PrescriptionUpload';
import PrescriptionViewer from './PrescriptionViewer';
import WorkerSearch from './WorkerSearch';
import WorkerHistory from './WorkerHistory';
import DoctorQRScanner from './DoctorQRScanner';
import PatientDetailsModal from './PatientDetailsModal';
import { getDoctorStats } from '../utils/api';

const DoctorDashboard = ({ doctor, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [doctorStats, setDoctorStats] = useState({
    totalPatients: 0,
    prescriptions: 0,
    consultations: 0
  });
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'scan', name: 'Scan Patient', icon: '📱' },
    { id: 'upload', name: 'Upload Prescription', icon: '📝' },
    { id: 'prescriptions', name: 'View Prescriptions', icon: '📋' },
    { id: 'workers', name: 'Worker History', icon: '👥' },
    { id: 'profile', name: 'Profile', icon: '👨‍⚕️' }
  ];

  useEffect(() => {
    if (doctor && doctor.doctorId) {
      fetchDoctorStats();
    }
  }, [doctor]);

  const fetchDoctorStats = async () => {
    try {
      const stats = await getDoctorStats(doctor.doctorId);
      setDoctorStats({
        totalPatients: stats.totalPatients || 0,
        prescriptions: stats.prescriptions || 0,
        consultations: stats.consultations || 0
      });
    } catch (error) {
      console.error('Failed to fetch doctor stats:', error);
    }
  };

  const handleQRScan = (healthId) => {
    setShowQRScanner(false);
    setSelectedPatientId(healthId);
  };

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
                <span className="text-white font-bold text-2xl">Dr</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Doctor Dashboard</h1>
                <p className="text-lg text-gray-700 font-medium">Welcome back, Dr. {doctor.name}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-semibold">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Navigation</h3>
              <p className="text-sm text-gray-600">Manage your medical practice</p>
            </div>
            <nav className="space-y-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-blue-50 hover:shadow-md'
                  }`}
                >
                  <span className="font-semibold">{tab.name}</span>
                  {activeTab === tab.id && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </nav>
            
            <div className="mt-8 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <span className="font-semibold text-green-800">Quick Tip</span>
              </div>
              <p className="text-sm text-green-700">Use the QR scanner to quickly access patient records during consultations.</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dashboard Overview</h2>
                      <p className="text-gray-600 mt-2">Your medical practice at a glance</p>
                    </div>
                    <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-semibold text-sm">Live Data</span>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-2xl">{doctorStats.totalPatients}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-blue-700">{doctorStats.totalPatients}</p>
                          <p className="text-sm text-blue-600 font-semibold">+3 this week</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-800">Total Patients</p>
                        <p className="text-sm text-gray-600">Active patient records</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-xl">{doctorStats.prescriptions}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-green-700">{doctorStats.prescriptions}</p>
                          <p className="text-sm text-green-600 font-semibold">+12 today</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-800">Prescriptions</p>
                        <p className="text-sm text-gray-600">Total issued</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-8 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-2xl">{doctorStats.consultations}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-purple-700">{doctorStats.consultations}</p>
                          <p className="text-sm text-purple-600 font-semibold">This month</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-800">Consultations</p>
                        <p className="text-sm text-gray-600">Monthly total</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">P</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">New patient registered</p>
                          <p className="text-sm text-gray-600">Worker ID: MH2024001</p>
                        </div>
                        <span className="text-xs text-gray-500">2 min ago</span>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">R</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">Prescription uploaded</p>
                          <p className="text-sm text-gray-600">Patient: Raj Kumar</p>
                        </div>
                        <span className="text-xs text-gray-500">15 min ago</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => setActiveTab('upload')}
                        className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <div className="font-bold text-lg text-yellow-300">Upload Prescription</div>
                      </button>
                      <button 
                        onClick={() => setShowQRScanner(true)}
                        className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <div className="font-bold text-lg text-yellow-300">Scan Patient</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'scan' && (
              <WorkerSearch />
            )}

            {activeTab === 'upload' && (
              <PrescriptionUpload doctorId={doctor.doctorId} />
            )}

            {activeTab === 'prescriptions' && (
              <PrescriptionViewer />
            )}

            {activeTab === 'workers' && (
              <WorkerHistory doctorId={doctor.doctorId} />
            )}

            {activeTab === 'profile' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">Doctor Profile</h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border border-blue-200">
                      <label className="block text-sm font-bold text-blue-700 mb-2">Doctor ID</label>
                      <p className="text-2xl font-bold text-gray-800">{doctor.doctorId}</p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl border border-green-200">
                      <label className="block text-sm font-bold text-green-700 mb-2">Full Name</label>
                      <p className="text-2xl font-bold text-gray-800">Dr. {doctor.name}</p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl border border-purple-200">
                      <label className="block text-sm font-bold text-purple-700 mb-2">Specialization</label>
                      <p className="text-xl font-semibold text-gray-800">General Medicine</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                        <span className="text-white font-bold text-4xl">Dr</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Medical Professional</h3>
                      <p className="text-gray-600">Certified Healthcare Provider</p>
                      <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mt-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-green-700 font-semibold text-sm">Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* QR Scanner Modal */}
      {showQRScanner && (
        <DoctorQRScanner
          onScanSuccess={handleQRScan}
          onClose={() => setShowQRScanner(false)}
        />
      )}
      
      {/* Patient Details Modal */}
      {selectedPatientId && (
        <PatientDetailsModal
          healthId={selectedPatientId}
          onClose={() => setSelectedPatientId(null)}
        />
      )}
    </div>
  );
};

export default DoctorDashboard;