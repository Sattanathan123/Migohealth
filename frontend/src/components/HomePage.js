import React from 'react';

const HomePage = ({ onRoleSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-green-400 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-orange-400 rounded-full opacity-25 animate-pulse"></div>
      <div className="absolute bottom-40 right-10 w-28 h-28 bg-cyan-400 rounded-full opacity-20 animate-bounce"></div>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">MH</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white drop-shadow-lg">MigoHealth</h1>
                <p className="text-yellow-100 text-lg font-medium">Digital Health Records System</p>
              </div>
            </div>
            <div className="text-right bg-white bg-opacity-20 rounded-xl p-4">
              <p className="text-white text-lg font-bold">Government of Kerala</p>
              <p className="text-yellow-100 text-sm">Health Department</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-bold text-white mb-8 drop-shadow-2xl">
            Digital Health Records for
            <span className="text-yellow-300 animate-pulse"> Migrant Workers</span>
          </h2>
          <p className="text-2xl text-white max-w-4xl mx-auto font-medium drop-shadow-lg">
            Secure, colorful, and accessible healthcare management system
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-10 mb-20">
          {/* Doctor Dashboard */}
          <div className="group cursor-pointer transform hover:scale-110 hover:rotate-2 transition-all duration-500" onClick={() => onRoleSelect('doctor')}>
            <div className="bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-3xl p-8 shadow-2xl border-4 border-white hover:shadow-3xl">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <span className="text-white font-bold text-2xl">DR</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Doctor Dashboard</h3>
                <p className="text-white text-lg mb-6 font-medium">Access patient records, upload prescriptions, manage health data</p>
                <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                  Login to Dashboard
                </div>
              </div>
            </div>
          </div>

          {/* Worker Portal */}
          <div className="group cursor-pointer transform hover:scale-110 hover:rotate-2 transition-all duration-500" onClick={() => onRoleSelect('worker')}>
            <div className="bg-gradient-to-br from-green-400 via-teal-500 to-blue-500 rounded-3xl p-8 shadow-2xl border-4 border-white hover:shadow-3xl">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <span className="text-white font-bold text-2xl">WR</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Worker Portal</h3>
                <p className="text-white text-lg mb-6 font-medium">Register for health ID, scan QR codes, access records</p>
                <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                  Access Portal
                </div>
              </div>
            </div>
          </div>

          {/* Health Department */}
          <div className="group cursor-pointer transform hover:scale-110 hover:rotate-2 transition-all duration-500" onClick={() => onRoleSelect('health-dept')}>
            <div className="bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-3xl p-8 shadow-2xl border-4 border-white hover:shadow-3xl">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <span className="text-white font-bold text-2xl">HD</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Health Department</h3>
                <p className="text-white text-lg mb-6 font-medium">View analytics, generate reports, monitor performance</p>
                <div className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                  View Dashboard
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">SEC</span>
            </div>
            <h4 className="font-bold mb-2 text-white text-xl">Super Secure</h4>
            <p className="text-white font-medium">End-to-end encryption</p>
          </div>
          <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">MOB</span>
            </div>
            <h4 className="font-bold mb-2 text-white text-xl">Mobile Ready</h4>
            <p className="text-white font-medium">QR code scanning</p>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">ACC</span>
            </div>
            <h4 className="font-bold mb-2 text-white text-xl">Accessible</h4>
            <p className="text-white font-medium">Multi-language support</p>
          </div>
          <div className="bg-gradient-to-br from-pink-400 to-red-500 rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">FAST</span>
            </div>
            <h4 className="font-bold mb-2 text-white text-xl">Lightning Fast</h4>
            <p className="text-white font-medium">Real-time updates</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;