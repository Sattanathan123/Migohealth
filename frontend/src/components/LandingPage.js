import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LandingPage = ({ onRoleSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      {/* Creative Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-2xl sticky top-0 z-50 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
                <span className="text-white font-bold text-xl">MH</span>
              </div>
              <span className="text-3xl font-black text-white drop-shadow-lg">MigoHealth</span>
              <div className="hidden md:block">
                <span className="text-cyan-200 text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  Digital Health Platform
                </span>
              </div>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Services', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white hover:text-cyan-300 transition-colors font-medium relative group"
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 group-hover:w-full transition-all duration-300"></span>
                </motion.a>
              ))}
            </div>
            
            <div className="relative">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center space-x-2"
              >
                <span>Get Started</span>
                <svg className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>
              
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                >
                  <div className="py-2">
                    <button
                      onClick={() => { onRoleSelect('doctor'); setShowDropdown(false); }}
                      className="w-full px-6 py-3 text-left hover:bg-blue-50 transition-colors flex items-center space-x-3"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">DR</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">Doctor Dashboard</div>
                        <div className="text-xs text-gray-500">Access patient records</div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => { onRoleSelect('worker'); setShowDropdown(false); }}
                      className="w-full px-6 py-3 text-left hover:bg-green-50 transition-colors flex items-center space-x-3"
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">WR</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">Worker Portal</div>
                        <div className="text-xs text-gray-500">Scan QR & register</div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => { onRoleSelect('health-dept'); setShowDropdown(false); }}
                      className="w-full px-6 py-3 text-left hover:bg-purple-50 transition-colors flex items-center space-x-3"
                    >
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-sm">HD</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">Health Department</div>
                        <div className="text-xs text-gray-500">View analytics</div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        
        {/* Decorative bottom border */}
        <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"></div>
      </motion.nav>

      {/* Hero Section */}
      <div className="pt-20 pb-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Digital Health Record
            <span className="text-blue-600"> System</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto"
          >
            Connecting Doctors, Migrant Workers, and Health Departments securely.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition-all"
          >
            Get Started Today
          </motion.button>
        </div>
      </div>

      {/* Role Cards Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Portal</h2>
            <p className="text-xl text-gray-600">Select your role to access the appropriate dashboard</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Doctor Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => onRoleSelect('doctor')}
              className="cursor-pointer"
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-blue-600 font-bold text-xl">DR</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Doctor Dashboard</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Access patient records, upload prescriptions, and manage worker health data with advanced medical tools.
                  </p>
                  <div className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Access Dashboard
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Worker Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => onRoleSelect('worker')}
              className="cursor-pointer"
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-green-600 font-bold text-xl">WR</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Worker Portal</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Register for health ID, scan QR codes, access your medical records and health history.
                  </p>
                  <div className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Access Portal
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Health Dept Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => onRoleSelect('health-dept')}
              className="cursor-pointer"
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-purple-600 font-bold text-xl">HD</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Health Department</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    View analytics, generate comprehensive reports, and monitor system performance across Kerala.
                  </p>
                  <div className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                    View Dashboard
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Registered Workers", icon: "👥" },
              { number: "500+", label: "Healthcare Providers", icon: "🏥" },
              { number: "50,000+", label: "Health Records", icon: "📋" },
              { number: "99.9%", label: "System Uptime", icon: "⚡" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-white"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Advanced Healthcare Technology</h2>
            <p className="text-xl text-gray-600">Cutting-edge features designed for modern healthcare management</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                title: "AI-Powered Analytics", 
                desc: "Machine learning algorithms analyze health patterns and provide predictive insights for better patient care.",
                icon: "🤖",
                color: "blue"
              },
              { 
                title: "Blockchain Security", 
                desc: "Immutable health records with military-grade encryption ensuring complete data privacy and security.",
                icon: "🔐",
                color: "green"
              },
              { 
                title: "Real-time Monitoring", 
                desc: "24/7 system monitoring with instant alerts and real-time health data synchronization across platforms.",
                icon: "📊",
                color: "purple"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-xl transition-all"
              >
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Healthcare Professionals</h2>
            <p className="text-xl text-gray-600">See what our users say about MigoHealth</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "MigoHealth has revolutionized how we manage patient records. The QR system is incredibly efficient.",
                author: "Dr. Priya Nair",
                role: "Chief Medical Officer",
                hospital: "Kerala Medical College"
              },
              {
                quote: "As a migrant worker, having my health records accessible anywhere gives me peace of mind.",
                author: "Ramesh Kumar",
                role: "Construction Worker",
                hospital: "Registered User"
              },
              {
                quote: "The analytics dashboard provides invaluable insights for public health policy decisions.",
                author: "Dr. Suresh Menon",
                role: "Health Department Director",
                hospital: "Government of Kerala"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="text-4xl text-blue-600 mb-4">"</div>
                <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">{testimonial.author.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-blue-600">{testimonial.hospital}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Healthcare?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of healthcare professionals already using MigoHealth
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => document.getElementById('roles').scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all"
              >
                Schedule Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">MH</span>
                </div>
                <span className="text-xl font-bold">MigoHealth</span>
              </div>
              <p className="text-gray-400 mb-4">Revolutionizing healthcare management for migrant workers across Kerala.</p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Doctor Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Worker Portal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Health Department</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© 2025 MigoHealth. All rights reserved. Made with ❤️ in Kerala.</p>
            <div className="flex items-center space-x-4 text-gray-400">
              <span>🇮🇳 India</span>
              <span>•</span>
              <span>English</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;