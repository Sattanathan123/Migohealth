import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ModernGovPage = ({ onRoleSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="bg-gradient-to-r from-green-600 via-white to-orange-500 h-1"></div>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">KL</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Government of Kerala</h1>
                <p className="text-sm text-gray-600">Health & Family Welfare Department</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Services</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-1"
                >
                  <span>Login</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                    <button
                      onClick={() => { onRoleSelect('doctor'); setShowDropdown(false); }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                    >
                      Doctor Login
                    </button>
                    <button
                      onClick={() => { onRoleSelect('worker'); setShowDropdown(false); }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                    >
                      Worker Portal
                    </button>
                    <button
                      onClick={() => { onRoleSelect('health-dept'); setShowDropdown(false); }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                    >
                      Health Department
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Digital Health Record System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive digital healthcare management for migrant workers in Kerala
          </p>
          <button 
            onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Access Services
          </button>
        </div>
      </section>

      {/* Services Cards */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Digital Services</h2>
            <p className="text-lg text-gray-600">Select your portal to access health services</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Doctor Card */}
            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => onRoleSelect('doctor')}
              className="cursor-pointer bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Healthcare Provider</h3>
                <p className="text-gray-600 mb-6">
                  Access patient records, manage prescriptions, and view health analytics
                </p>
                <div className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">
                  Access Portal
                </div>
              </div>
            </motion.div>

            {/* Worker Card */}
            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => onRoleSelect('worker')}
              className="cursor-pointer bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Migrant Worker</h3>
                <p className="text-gray-600 mb-6">
                  Register for health ID, scan QR codes, and access medical records
                </p>
                <div className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium">
                  Register/Access
                </div>
              </div>
            </motion.div>

            {/* Health Dept Card */}
            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => onRoleSelect('health-dept')}
              className="cursor-pointer bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Health Department</h3>
                <p className="text-gray-600 mb-6">
                  Monitor system performance, generate reports, and view analytics
                </p>
                <div className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium">
                  Admin Access
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">System Features</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">🔒</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Secure</h3>
              <p className="text-gray-600 text-sm">Government-grade security</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">📱</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Mobile</h3>
              <p className="text-gray-600 text-sm">QR code access</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">🌐</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Accessible</h3>
              <p className="text-gray-600 text-sm">Multi-language support</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold">⚡</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Fast</h3>
              <p className="text-gray-600 text-sm">Real-time updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">© 2025 Government of Kerala. All rights reserved.</p>
            </div>
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

export default ModernGovPage;