import React from 'react';

const CreativeHomePage = ({ onRoleSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Header */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md border-b border-white border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">MigoHealth</h1>
                <p className="text-cyan-200 text-sm">Digital Health Records</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white text-sm font-medium">Kerala Government</p>
              <p className="text-cyan-200 text-xs">Health Department</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Digital Health Records for
            <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent"> Migrant Workers</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Secure, accessible healthcare management system connecting workers, doctors, and health departments across Kerala
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Doctor Dashboard */}
          <div className="group cursor-pointer" onClick={() => onRoleSelect('doctor')}>
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">👨‍⚕️</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Doctor Dashboard</h3>
                <p className="text-gray-300 mb-6">Access patient records, upload prescriptions, and manage worker health data</p>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold group-hover:shadow-lg transition-all">
                  Login to Dashboard
                </div>
              </div>
            </div>
          </div>

          {/* Worker Portal */}
          <div className="group cursor-pointer" onClick={() => onRoleSelect('worker')}>
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🧑‍🌾</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Worker Portal</h3>
                <p className="text-gray-300 mb-6">Register for health ID, scan QR codes, and access your medical records</p>
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold group-hover:shadow-lg transition-all">
                  Access Portal
                </div>
              </div>
            </div>
          </div>

          {/* Health Department */}
          <div className="group cursor-pointer" onClick={() => onRoleSelect('health-dept')}>
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🏥</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Health Department</h3>
                <p className="text-gray-300 mb-6">View analytics, generate reports, and monitor health system performance</p>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold group-hover:shadow-lg transition-all">
                  View Dashboard
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="text-white">
            <div className="text-3xl mb-2">🔒</div>
            <h4 className="font-semibold mb-1">Secure</h4>
            <p className="text-sm text-gray-300">End-to-end encryption</p>
          </div>
          <div className="text-white">
            <div className="text-3xl mb-2">📱</div>
            <h4 className="font-semibold mb-1">Mobile Ready</h4>
            <p className="text-sm text-gray-300">QR code scanning</p>
          </div>
          <div className="text-white">
            <div className="text-3xl mb-2">🌐</div>
            <h4 className="font-semibold mb-1">Accessible</h4>
            <p className="text-sm text-gray-300">Multi-language support</p>
          </div>
          <div className="text-white">
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="font-semibold mb-1">Fast</h4>
            <p className="text-sm text-gray-300">Real-time updates</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeHomePage;