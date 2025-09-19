import React, { useState } from 'react';
import PrescriptionUpload from './PrescriptionUpload';

const DoctorDashboard = ({ doctor, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'upload', name: 'Upload Prescription' },
    { id: 'workers', name: 'Worker History' },
    { id: 'profile', name: 'Profile' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">Dr</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Doctor Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome, Dr. {doctor.name}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-sm p-4 mr-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-white text-xl">P</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Patients</p>
                        <p className="text-2xl font-bold text-gray-800">24</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-white text-xl">R</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Prescriptions</p>
                        <p className="text-2xl font-bold text-gray-800">156</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-white text-xl">M</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">This Month</p>
                        <p className="text-2xl font-bold text-gray-800">42</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'upload' && (
              <PrescriptionUpload doctorId={doctor.doctorId} />
            )}

            {activeTab === 'workers' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Worker History</h2>
                <p className="text-gray-600">Worker history management coming soon...</p>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Doctor Profile</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Doctor ID</label>
                    <p className="text-gray-800">{doctor.doctorId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="text-gray-800">{doctor.name}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;