import React from 'react';

const HealthDeptDashboard = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">HD</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Health Department Dashboard</h1>
                <p className="text-sm text-gray-600">Kerala State Health Analytics</p>
              </div>
            </div>
            <button
              onClick={onBack}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">👥</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Workers</p>
                <p className="text-2xl font-bold text-gray-800">1,247</p>
                <p className="text-xs text-green-600">+12% this month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">👨⚕️</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Registered Doctors</p>
                <p className="text-2xl font-bold text-gray-800">89</p>
                <p className="text-xs text-green-600">+3 this week</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">📋</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Prescriptions</p>
                <p className="text-2xl font-bold text-gray-800">3,456</p>
                <p className="text-xs text-green-600">+156 today</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🏥</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Hospitals</p>
                <p className="text-2xl font-bold text-gray-800">45</p>
                <p className="text-xs text-gray-500">Across Kerala</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Reports */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Worker Registration Trends</h3>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Chart visualization coming soon</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Health Records by District</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Thiruvananthapuram</span>
                <span className="text-sm font-medium text-gray-800">324 workers</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Kochi</span>
                <span className="text-sm font-medium text-gray-800">298 workers</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Kozhikode</span>
                <span className="text-sm font-medium text-gray-800">267 workers</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Thrissur</span>
                <span className="text-sm font-medium text-gray-800">189 workers</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Others</span>
                <span className="text-sm font-medium text-gray-800">169 workers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDeptDashboard;