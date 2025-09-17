import React from 'react';

const SimpleHomePage = ({ onRoleSelect }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="navbar bg-white shadow-lg border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="navbar-brand w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">MH</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MigoHealth</h1>
                <p className="text-sm text-gray-600 font-medium">Digital Health Records System</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="navbar-link text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg font-medium">Home</a>
              <a href="#" className="navbar-link text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg font-medium">About</a>
              <a href="#" className="navbar-link text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg font-medium">Services</a>
              <a href="#" className="navbar-link text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg font-medium">Contact</a>
            </nav>
            <div className="text-right bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-lg border border-blue-200">
              <p className="text-sm font-bold text-gray-900">Government of Kerala</p>
              <p className="text-xs text-blue-600 font-medium">Health Department</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Digital Health Record System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Connecting Doctors, Migrant Workers, and Health Departments securely
          </p>
        </div>
      </section>

      {/* Role Cards - Horizontal Layout */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Portal</h2>
            <p className="text-lg text-gray-600">Select your role to access the appropriate services</p>
          </div>

          <div className="portal-cards flex flex-col lg:flex-row gap-8">
            {/* Doctor Card */}
            <div 
              onClick={() => onRoleSelect('doctor')}
              className="portal-card flex-1 cursor-pointer bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-500 hover:shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mr-6">
                  <span className="text-blue-600 font-bold text-xl">DR</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h3>
                  <p className="text-blue-600 font-medium">Healthcare Providers</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Access patient records, upload prescriptions, and manage worker health data
              </p>
              <div className="portal-button bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-center hover:from-blue-700 hover:to-blue-800">
                Access Portal
              </div>
            </div>

            {/* Worker Card */}
            <div 
              onClick={() => onRoleSelect('worker')}
              className="portal-card flex-1 cursor-pointer bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-green-500 hover:shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mr-6">
                  <span className="text-green-600 font-bold text-xl">WR</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Worker Portal</h3>
                  <p className="text-green-600 font-medium">Migrant Workers</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Register for health ID, scan QR codes, and access your medical records
              </p>
              <div className="portal-button bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold text-center hover:from-green-700 hover:to-green-800">
                Access Portal
              </div>
            </div>

            {/* Health Department Card */}
            <div 
              onClick={() => onRoleSelect('health-dept')}
              className="portal-card flex-1 cursor-pointer bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-purple-500 hover:shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mr-6">
                  <span className="text-purple-600 font-bold text-xl">HD</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Health Department</h3>
                  <p className="text-purple-600 font-medium">Government Officials</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                View analytics, generate reports, and monitor system performance
              </p>
              <div className="portal-button bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg font-semibold text-center hover:from-purple-700 hover:to-purple-800">
                View Dashboard
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">© 2025 Government of Kerala. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-gray-300">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300">Terms of Service</a>
              <a href="#" className="hover:text-gray-300">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SimpleHomePage;