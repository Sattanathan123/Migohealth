import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GovLandingPage = ({ onRoleSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Government Header */}
      <header className="bg-white border-b-4 border-orange-500">
        <div className="bg-gradient-to-r from-green-600 via-white to-orange-500 h-2"></div>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/api/placeholder/60/60" alt="Kerala Govt" className="w-15 h-15" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Government of Kerala</h1>
                <p className="text-sm text-gray-600">Health & Family Welfare Department</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-6">
                <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
                <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium">Services</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
              </nav>
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 flex items-center space-x-2"
                >
                  <span>Login Portal</span>
                  <svg className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border z-50">
                    <div className="py-2">
                      <button
                        onClick={() => { onRoleSelect('doctor'); setShowDropdown(false); }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3"
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">DR</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">Doctor Login</div>
                          <div className="text-xs text-gray-500">Healthcare Providers</div>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => { onRoleSelect('worker'); setShowDropdown(false); }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3"
                      >
                        <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                          <span className="text-green-600 font-bold text-sm">WR</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">Worker Portal</div>
                          <div className="text-xs text-gray-500">Migrant Workers</div>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => { onRoleSelect('health-dept'); setShowDropdown(false); }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3"
                      >
                        <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                          <span className="text-orange-600 font-bold text-sm">HD</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">Health Department</div>
                          <div className="text-xs text-gray-500">Government Officials</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Digital Health Record Management System
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              A comprehensive digital platform for managing health records of migrant workers in Kerala, 
              ensuring accessible healthcare services across the state.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 text-white px-8 py-3 rounded font-semibold hover:bg-blue-700"
              >
                Explore Services
              </button>
              <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded font-semibold hover:bg-blue-50">
                Download Guidelines
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Digital Health Services</h2>
            <p className="text-xl text-gray-600">Choose your portal to access government health services</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Doctor Portal */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => onRoleSelect('doctor')}
              className="cursor-pointer flex-1 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-xl transition-all"
            >
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center mr-6">
                  <span className="text-white font-bold text-2xl">DR</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Healthcare Provider</h3>
                  <p className="text-blue-600 font-semibold">Medical Professionals Portal</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Secure access for registered medical practitioners to manage patient records, 
                upload prescriptions, and access comprehensive health analytics.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  ✓ Patient Records<br/>
                  ✓ Prescription Upload<br/>
                  ✓ Health Analytics
                </div>
                <div className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Access Portal →
                </div>
              </div>
            </motion.div>

            {/* Worker Portal */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => onRoleSelect('worker')}
              className="cursor-pointer flex-1 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-8 hover:border-green-400 hover:shadow-xl transition-all"
            >
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-green-600 rounded-xl flex items-center justify-center mr-6">
                  <span className="text-white font-bold text-2xl">WR</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Migrant Worker</h3>
                  <p className="text-green-600 font-semibold">Worker Services Portal</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Digital health ID registration, QR code-based health record access, 
                and comprehensive medical history management for migrant workers.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  ✓ Health ID Registration<br/>
                  ✓ QR Code Access<br/>
                  ✓ Medical History
                </div>
                <div className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Register/Access →
                </div>
              </div>
            </motion.div>

            {/* Health Department */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => onRoleSelect('health-dept')}
              className="cursor-pointer flex-1 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-2xl p-8 hover:border-orange-400 hover:shadow-xl transition-all"
            >
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-orange-600 rounded-xl flex items-center justify-center mr-6">
                  <span className="text-white font-bold text-2xl">HD</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Health Department</h3>
                  <p className="text-orange-600 font-semibold">Administrative Dashboard</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Administrative access for health department officials to monitor system performance, 
                generate reports, and oversee healthcare delivery across Kerala.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  ✓ System Analytics<br/>
                  ✓ Performance Reports<br/>
                  ✓ Policy Oversight
                </div>
                <div className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                  Admin Access →
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">System Features</h2>
            <p className="text-lg text-gray-600">Robust and secure digital health infrastructure</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Secure Data", desc: "Government-grade security protocols", icon: "🔒" },
              { title: "QR Technology", desc: "Quick access via QR code scanning", icon: "📱" },
              { title: "Multi-language", desc: "Available in Malayalam and English", icon: "🌐" },
              { title: "24/7 Access", desc: "Round-the-clock system availability", icon: "⏰" }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Government of Kerala</h4>
              <p className="text-gray-400 text-sm mb-4">
                Health & Family Welfare Department<br/>
                Secretariat, Thiruvananthapuram<br/>
                Kerala - 695001
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Kerala.gov.in</a></li>
                <li><a href="#" className="hover:text-white">Health Department</a></li>
                <li><a href="#" className="hover:text-white">Citizen Services</a></li>
                <li><a href="#" className="hover:text-white">RTI Portal</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Help & Support</a></li>
                <li><a href="#" className="hover:text-white">User Manual</a></li>
                <li><a href="#" className="hover:text-white">Technical Support</a></li>
                <li><a href="#" className="hover:text-white">Feedback</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="text-gray-400 text-sm space-y-2">
                <p>📞 0471-2518471</p>
                <p>📧 health@kerala.gov.in</p>
                <p>🕒 Mon-Fri: 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Government of Kerala. All rights reserved.
            </p>
            <div className="flex space-x-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Use</a>
              <a href="#" className="hover:text-white">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GovLandingPage;