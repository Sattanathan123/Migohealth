import React, { useState } from 'react';
import DiseaseSurveillanceMap from './DiseaseSurveillanceMap';
import InteractiveOutbreakMap from './InteractiveOutbreakMap';
import HealthDeptLogin from './HealthDeptLogin';
import HealthDeptRegistration from './HealthDeptRegistration';
import { useLanguage } from '../utils/LanguageContext';

const HealthDeptDashboard = ({ onBack }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [healthDept, setHealthDept] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistration, setShowRegistration] = useState(true);

  const handleHealthDeptLogin = (deptData) => {
    setHealthDept(deptData);
    setShowLogin(false);
    setShowRegistration(false);
  };

  const handleRegistrationSuccess = () => {
    setShowRegistration(false);
    setShowLogin(true);
  };

  const handleLogout = () => {
    setHealthDept(null);
    setShowLogin(false);
    setShowRegistration(true);
    localStorage.removeItem('healthDeptToken');
  };

  const getFilteredData = (data) => {
    if (!healthDept || healthDept.district === 'all' || healthDept.role === 'admin') {
      return data;
    }
    // Filter data based on user's district
    return Object.fromEntries(
      Object.entries(data).filter(([district]) => district === healthDept.district)
    );
  };

  const hasPermission = (action) => {
    if (!healthDept) return false;
    switch (action) {
      case 'view_all_districts':
        return healthDept.role === 'admin' || healthDept.district === 'all';
      case 'manage_data':
        return healthDept.role === 'admin' || healthDept.role === 'officer';
      case 'export_reports':
        return healthDept.role === 'admin' || healthDept.role === 'officer';
      default:
        return true;
    }
  };

  if (showRegistration) {
    return (
      <HealthDeptRegistration 
        onRegistrationSuccess={handleRegistrationSuccess}
        onBack={onBack}
        onSwitchToLogin={() => { setShowRegistration(false); setShowLogin(true); }}
      />
    );
  }

  if (showLogin) {
    return (
      <HealthDeptLogin 
        onLoginSuccess={handleHealthDeptLogin}
        onBack={onBack}
        onSwitchToRegister={() => { setShowLogin(false); setShowRegistration(true); }}
      />
    );
  }

  if (!healthDept) {
    return null;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">HD</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  {healthDept.district === 'all' ? 'Kerala State' : healthDept.district} Health Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  {healthDept.name} - {healthDept.role.charAt(0).toUpperCase() + healthDept.role.slice(1)}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="text-right mr-4">
                <p className="text-sm font-medium text-gray-800">{healthDept.department}</p>
                <p className="text-xs text-gray-600">Access Level: {healthDept.role.toUpperCase()}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
              <button
                onClick={onBack}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 lg:py-6">
        {/* Sidebar Navigation */}
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-64 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-lg shadow-lg p-4 mb-6 lg:mb-0 lg:mr-6 border border-emerald-200">
            <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 lg:space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="font-medium">Analytics</span>
              </button>
              
              <button
                onClick={() => setActiveTab('surveillance')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'surveillance'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span className="font-medium">Disease Surveillance</span>
              </button>
              
              <button
                onClick={() => setActiveTab('workers')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'workers'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <span className="font-medium">Migrant Workers</span>
              </button>
              
              <button
                onClick={() => setActiveTab('pharmacies')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'pharmacies'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <span className="font-medium">Pharmacies</span>
              </button>
              
              <button
                onClick={() => setActiveTab('alerts')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'alerts'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="font-medium">Alerts</span>
              </button>
              
              {hasPermission('export_reports') && (
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'reports'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium">Reports</span>
                </button>
              )}
            </nav>
            
            {/* Access Level Indicator */}
            <div className="mt-6 p-3 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg border border-emerald-300">
              <div className="text-xs text-emerald-700 font-medium">Access Level</div>
              <div className="text-sm font-bold text-emerald-900">{healthDept.role.toUpperCase()}</div>
              <div className="text-xs text-emerald-700 mt-1">
                {healthDept.district === 'all' ? 'All Districts' : healthDept.district}
              </div>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            {activeTab === 'surveillance' && (
              <div className="space-y-6">
                <InteractiveOutbreakMap />
                <DiseaseSurveillanceMap />
              </div>
            )}
        
            {activeTab === 'overview' && (
          <div>
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">W</span>
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
                <span className="text-white text-xl">D</span>
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
                <span className="text-white text-xl">P</span>
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
                <span className="text-white text-xl">H</span>
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
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Registration Trends</h3>
            <div className="h-64 p-4 border border-gray-200 rounded-lg">
              <div className="flex items-end justify-around h-48 space-x-2">
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-blue-500 rounded-t mb-2" style={{height: '120px'}}></div>
                  <span className="text-xs text-gray-600">Jan</span>
                  <span className="text-xs font-medium">89</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-blue-500 rounded-t mb-2" style={{height: '150px'}}></div>
                  <span className="text-xs text-gray-600">Feb</span>
                  <span className="text-xs font-medium">112</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-blue-500 rounded-t mb-2" style={{height: '170px'}}></div>
                  <span className="text-xs text-gray-600">Mar</span>
                  <span className="text-xs font-medium">134</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-blue-500 rounded-t mb-2" style={{height: '140px'}}></div>
                  <span className="text-xs text-gray-600">Apr</span>
                  <span className="text-xs font-medium">98</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-blue-500 rounded-t mb-2" style={{height: '180px'}}></div>
                  <span className="text-xs text-gray-600">May</span>
                  <span className="text-xs font-medium">156</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-green-500 rounded-t mb-2" style={{height: '192px'}}></div>
                  <span className="text-xs text-gray-600">Jun</span>
                  <span className="text-xs font-medium">178</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Workers by Origin State</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                  <span className="text-sm text-gray-600">Bihar</span>
                </div>
                <div className="flex items-center">
                  <div className="w-24 h-2 bg-gray-200 rounded mr-3">
                    <div className="w-3/4 h-2 bg-red-500 rounded"></div>
                  </div>
                  <span className="text-sm font-medium">456</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                  <span className="text-sm text-gray-600">Uttar Pradesh</span>
                </div>
                <div className="flex items-center">
                  <div className="w-24 h-2 bg-gray-200 rounded mr-3">
                    <div className="w-2/3 h-2 bg-blue-500 rounded"></div>
                  </div>
                  <span className="text-sm font-medium">324</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                  <span className="text-sm text-gray-600">West Bengal</span>
                </div>
                <div className="flex items-center">
                  <div className="w-24 h-2 bg-gray-200 rounded mr-3">
                    <div className="w-1/2 h-2 bg-green-500 rounded"></div>
                  </div>
                  <span className="text-sm font-medium">267</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                  <span className="text-sm text-gray-600">Jharkhand</span>
                </div>
                <div className="flex items-center">
                  <div className="w-24 h-2 bg-gray-200 rounded mr-3">
                    <div className="w-1/3 h-2 bg-yellow-500 rounded"></div>
                  </div>
                  <span className="text-sm font-medium">156</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-500 rounded mr-3"></div>
                  <span className="text-sm text-gray-600">Others</span>
                </div>
                <div className="flex items-center">
                  <div className="w-24 h-2 bg-gray-200 rounded mr-3">
                    <div className="w-1/4 h-2 bg-purple-500 rounded"></div>
                  </div>
                  <span className="text-sm font-medium">44</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Registration Sources</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto relative border-8 border-blue-500 rounded-full">
                  <div className="absolute top-0 right-0 w-16 h-16 border-8 border-green-500 rounded-full" style={{borderLeftColor: 'transparent', borderBottomColor: 'transparent'}}></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-8 border-yellow-500 rounded-full" style={{borderTopColor: 'transparent', borderRightColor: 'transparent'}}></div>
                  <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-800">1,247</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                    <span className="text-sm">Self (50%)</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                    <span className="text-sm">Hospital (25%)</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                    <span className="text-sm">Health Dept (25%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Health Records by District</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Thiruvananthapuram</span>
                <span className="text-sm font-medium text-gray-800">324</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Kochi</span>
                <span className="text-sm font-medium text-gray-800">298</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Kozhikode</span>
                <span className="text-sm font-medium text-gray-800">267</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Thrissur</span>
                <span className="text-sm font-medium text-gray-800">189</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Others</span>
                <span className="text-sm font-medium text-gray-800">169</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm text-gray-800">23 new registrations</p>
                  <p className="text-xs text-gray-500">Today</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm text-gray-800">156 prescriptions uploaded</p>
                  <p className="text-xs text-gray-500">Today</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm text-gray-800">3 new doctors registered</p>
                  <p className="text-xs text-gray-500">This week</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm text-gray-800">2 hospitals connected</p>
                  <p className="text-xs text-gray-500">This month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
        )}
        
            {activeTab === 'analytics' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Advanced Analytics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Disease Trends</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">COVID-19</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded">
                        <div className="w-3/4 h-2 bg-red-500 rounded"></div>
                      </div>
                      <span className="text-sm font-medium text-red-600">↑ 12%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Dengue</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded">
                        <div className="w-1/2 h-2 bg-yellow-500 rounded"></div>
                      </div>
                      <span className="text-sm font-medium text-green-600">↓ 5%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Malaria</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded">
                        <div className="w-1/4 h-2 bg-green-500 rounded"></div>
                      </div>
                      <span className="text-sm font-medium text-green-600">↓ 8%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Assessment</h3>
                <div className="space-y-3">
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium text-red-800">High Risk Areas: 3</span>
                    </div>
                    <p className="text-xs text-red-700 mt-1">Palakkad, Kozhikode, Ernakulam</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium text-yellow-800">Medium Risk Areas: 7</span>
                    </div>
                    <p className="text-xs text-yellow-700 mt-1">Requires monitoring</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-800">Low Risk Areas: 4</span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">Stable conditions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
            )}
            
            {activeTab === 'workers' && (
              <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6">Migrant Workers Management</h2>
                <div className="mb-4">
                  <p className="text-gray-600">Access Level: {healthDept.role === 'staff' ? 'View Only' : 'Full Access'}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  <div className="bg-blue-50 p-4 lg:p-6 rounded-lg">
                    <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-2">Total Workers</h3>
                    <p className="text-2xl lg:text-3xl font-bold text-blue-600">1,247</p>
                    <p className="text-sm text-gray-600">In your jurisdiction</p>
                  </div>
                  <div className="bg-green-50 p-4 lg:p-6 rounded-lg">
                    <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-2">Health Records</h3>
                    <p className="text-2xl lg:text-3xl font-bold text-green-600">98%</p>
                    <p className="text-sm text-gray-600">Completion rate</p>
                  </div>
                  <div className="bg-yellow-50 p-4 lg:p-6 rounded-lg">
                    <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-2">Recent Scans</h3>
                    <p className="text-2xl lg:text-3xl font-bold text-yellow-600">156</p>
                    <p className="text-sm text-gray-600">Last 24 hours</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'pharmacies' && (
              <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6">Pharmacy Reports</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Prescription Activity</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Prescriptions</span>
                        <span className="font-bold">3,456</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Today</span>
                        <span className="font-bold text-green-600">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">This Week</span>
                        <span className="font-bold text-blue-600">892</span>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Medicine Demand</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Paracetamol</span>
                        <span className="font-bold">45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Antibiotics</span>
                        <span className="font-bold">32%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vitamins</span>
                        <span className="font-bold">23%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'alerts' && (
              <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6">Critical Alerts</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 bg-red-50 p-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="text-sm font-medium text-red-800">High Outbreak Risk</h4>
                        <p className="text-sm text-red-700">Palakkad district showing 134 COVID-19 cases</p>
                        <p className="text-xs text-red-600">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="text-sm font-medium text-yellow-800">Medicine Shortage</h4>
                        <p className="text-sm text-yellow-700">Low stock of essential medicines in 3 pharmacies</p>
                        <p className="text-xs text-yellow-600">4 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reports' && hasPermission('export_reports') && (
              <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6">Reports & Analytics</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Generate Reports</h3>
                    <div className="space-y-3">
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Export Worker Data (CSV)
                      </button>
                      <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                        Disease Report (PDF)
                      </button>
                      <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                        Pharmacy Analytics (Excel)
                      </button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Exports</h3>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">Worker_Data_2025_01.csv - Today</div>
                      <div className="text-sm text-gray-600">Disease_Report_Jan.pdf - Yesterday</div>
                      <div className="text-sm text-gray-600">Pharmacy_Analytics.xlsx - 2 days ago</div>
                    </div>
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

export default HealthDeptDashboard;