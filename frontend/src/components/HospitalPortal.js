import React, { useState } from 'react';

const HospitalPortal = ({ onBack }) => {
  const [activeAction, setActiveAction] = useState(null);
  const [registeredWorker, setRegisteredWorker] = useState(null);

  if (activeAction === 'register') {
    const HospitalRegistration = require('./HospitalRegistration').default;
    return (
      <HospitalRegistration 
        onBack={() => setActiveAction(null)}
        onRegistrationSuccess={(worker) => {
          setActiveAction('show-card');
          setRegisteredWorker(worker);
        }}
      />
    );
  }

  if (activeAction === 'show-card') {
    const HealthCard = require('./HealthCard').default;
    return (
      <HealthCard 
        worker={registeredWorker}
        onBack={() => setActiveAction(null)}
      />
    );
  }

  if (activeAction === 'search') {
    const QRScanner = require('./QRScanner').default;
    return (
      <QRScanner 
        onBack={() => setActiveAction(null)}
        onScanSuccess={(worker) => {
          alert(`Worker found: ${worker.name}`);
          setActiveAction(null);
        }}
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
      
      <div className="relative z-10 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-md shadow-xl border border-white/20 rounded-3xl p-8 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Hospital Portal</h1>
                <p className="text-lg text-gray-700">Manage migrant worker registrations and records</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-semibold">System Online</span>
                </div>
              </div>
              <button 
                onClick={onBack} 
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Back to Home
              </button>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold text-green-600">+</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 text-center mb-3">Register New Worker</h3>
                <p className="text-gray-600 text-center mb-6">Register unregistered migrant workers and create their digital health profiles</p>
              </div>
              <button
                onClick={() => setActiveAction('register')}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Registration
              </button>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold text-blue-600">S</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 text-center mb-3">Search Worker Records</h3>
                <p className="text-gray-600 text-center mb-6">Find and access existing worker health records using QR code scanning</p>
              </div>
              <button
                onClick={() => setActiveAction('search')}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Search Records
              </button>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">Hospital Statistics</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                <div className="text-3xl font-bold text-green-700 mb-2">1,247</div>
                <div className="text-sm font-semibold text-green-600">Workers Registered</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                <div className="text-3xl font-bold text-blue-700 mb-2">89</div>
                <div className="text-sm font-semibold text-blue-600">Records Accessed Today</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border border-purple-200">
                <div className="text-3xl font-bold text-purple-700 mb-2">24/7</div>
                <div className="text-sm font-semibold text-purple-600">System Availability</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalPortal;