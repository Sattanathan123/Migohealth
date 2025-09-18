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
    </div>
  );
};

export default HealthDeptDashboard;