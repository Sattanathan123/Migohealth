import React, { useState } from 'react';
import { useLanguage } from '../utils/LanguageContext';

const DiseaseSurveillanceMap = () => {
  const { t } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDisease, setSelectedDisease] = useState('COVID-19');
  const [timePeriod, setTimePeriod] = useState('7days');

  // Mock district data with outbreak information by disease
  const allDistrictData = {
    'COVID-19': {
      'Thiruvananthapuram': { cases: 45, severity: 'medium', workers: 324 },
      'Kollam': { cases: 23, severity: 'low', workers: 156 },
      'Pathanamthitta': { cases: 12, severity: 'low', workers: 89 },
      'Alappuzha': { cases: 67, severity: 'medium', workers: 234 },
      'Kottayam': { cases: 34, severity: 'medium', workers: 178 },
      'Idukki': { cases: 18, severity: 'low', workers: 67 },
      'Ernakulam': { cases: 89, severity: 'high', workers: 445 },
      'Thrissur': { cases: 56, severity: 'medium', workers: 298 },
      'Palakkad': { cases: 134, severity: 'critical', workers: 389 },
      'Malappuram': { cases: 78, severity: 'medium', workers: 267 },
      'Kozhikode': { cases: 92, severity: 'high', workers: 356 },
      'Wayanad': { cases: 29, severity: 'low', workers: 123 },
      'Kannur': { cases: 67, severity: 'medium', workers: 234 },
      'Kasaragod': { cases: 41, severity: 'medium', workers: 189 }
    },
    'Dengue': {
      'Thiruvananthapuram': { cases: 23, severity: 'low', workers: 324 },
      'Kollam': { cases: 45, severity: 'medium', workers: 156 },
      'Ernakulam': { cases: 67, severity: 'medium', workers: 445 },
      'Thrissur': { cases: 89, severity: 'high', workers: 298 },
      'Palakkad': { cases: 34, severity: 'medium', workers: 389 },
      'Kozhikode': { cases: 56, severity: 'medium', workers: 356 },
      'Kannur': { cases: 12, severity: 'low', workers: 234 }
    },
    'Malaria': {
      'Wayanad': { cases: 45, severity: 'medium', workers: 123 },
      'Idukki': { cases: 67, severity: 'medium', workers: 67 },
      'Pathanamthitta': { cases: 23, severity: 'low', workers: 89 },
      'Kasaragod': { cases: 34, severity: 'medium', workers: 189 }
    },
    'Chikungunya': {
      'Alappuzha': { cases: 56, severity: 'medium', workers: 234 },
      'Kottayam': { cases: 78, severity: 'medium', workers: 178 },
      'Malappuram': { cases: 34, severity: 'medium', workers: 267 }
    }
  };

  // Get filtered data based on selected disease and district
  const getFilteredData = () => {
    const diseaseData = allDistrictData[selectedDisease] || {};
    
    if (selectedDistrict) {
      // Show only selected district
      return selectedDistrict in diseaseData 
        ? { [selectedDistrict]: diseaseData[selectedDistrict] }
        : {};
    }
    
    return diseaseData;
  };

  const districtData = getFilteredData();

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return '#10B981'; // Green
      case 'medium': return '#F59E0B'; // Yellow
      case 'high': return '#F97316'; // Orange
      case 'critical': return '#EF4444'; // Red
      default: return '#6B7280';
    }
  };

  const getSeverityLabel = (cases) => {
    if (cases <= 29) return 'Low';
    if (cases <= 79) return 'Medium';
    if (cases <= 129) return 'High';
    return 'Critical';
  };

  const totalCases = Object.values(districtData).reduce((sum, district) => sum + district.cases, 0);
  const criticalZones = Object.values(districtData).filter(d => d.severity === 'critical').length;
  const activeRegions = Object.keys(districtData).length;

  // Generate recent alerts based on filtered data
  const getRecentAlerts = () => {
    const alerts = Object.entries(districtData)
      .filter(([_, data]) => data.severity === 'critical' || data.severity === 'high')
      .sort((a, b) => b[1].cases - a[1].cases)
      .slice(0, 3)
      .map(([district, data], index) => ({
        district,
        cases: data.cases,
        severity: data.severity,
        time: `${(index + 1) * 2} hours ago`
      }));
    
    return alerts.length > 0 ? alerts : [
      { district: 'No alerts', cases: 0, severity: 'low', time: 'Current period' }
    ];
  };

  const recentAlerts = getRecentAlerts();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header with Live Indicator */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Disease Surveillance Dashboard</h2>
          <div className="flex items-center space-x-2 mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">LIVE - Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">District/Area</label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Districts</option>
            {Object.keys(allDistrictData[selectedDisease] || {}).map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Disease Type</label>
          <select
            value={selectedDisease}
            onChange={(e) => setSelectedDisease(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="COVID-19">COVID-19</option>
            <option value="Dengue">Dengue</option>
            <option value="Malaria">Malaria</option>
            <option value="Chikungunya">Chikungunya</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="24hours">Last 24 hours</option>
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-lg p-6 h-96">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {selectedDistrict ? `${selectedDistrict} - ` : 'Kerala Districts - '}{selectedDisease} Outbreak Map
            </h3>
            
            {/* Results Display */}
            {Object.keys(districtData).length === 0 ? (
              <div className="flex items-center justify-center h-80 bg-gray-100 rounded-lg">
                <div className="text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.1-5.291-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <p className="text-gray-600">No {selectedDisease} cases found</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedDistrict ? `in ${selectedDistrict}` : 'for selected criteria'}
                  </p>
                </div>
              </div>
            ) : (
              <div className={`grid gap-2 h-80 ${selectedDistrict ? 'grid-cols-1' : 'grid-cols-4'}`}>
                {Object.entries(districtData).map(([district, data]) => (
                  <div
                    key={district}
                    className={`relative group cursor-pointer rounded-lg p-4 text-center transition-all hover:scale-105 ${
                      selectedDistrict ? 'h-full flex flex-col justify-center' : ''
                    }`}
                    style={{ backgroundColor: getSeverityColor(data.severity) + '20', border: `2px solid ${getSeverityColor(data.severity)}` }}
                    onClick={() => selectedDistrict ? setSelectedDistrict('') : setSelectedDistrict(district)}
                  >
                    <div className={`font-medium text-gray-800 ${selectedDistrict ? 'text-xl mb-2' : 'text-xs'}`}>
                      {district}
                    </div>
                    <div className={`font-bold ${selectedDistrict ? 'text-4xl mb-2' : 'text-lg'}`} style={{ color: getSeverityColor(data.severity) }}>
                      {data.cases}
                    </div>
                    <div className={`text-gray-600 ${selectedDistrict ? 'text-base mb-4' : 'text-xs'}`}>
                      {data.workers} migrant workers
                    </div>
                    {selectedDistrict && (
                      <div className="space-y-2">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium`} 
                             style={{ backgroundColor: getSeverityColor(data.severity), color: 'white' }}>
                          {getSeverityLabel(data.cases)} Risk
                        </div>
                        <div className="text-sm text-gray-600">
                          Disease: {selectedDisease}
                        </div>
                        <div className="text-sm text-gray-600">
                          Period: {timePeriod === '24hours' ? 'Last 24 hours' : timePeriod === '7days' ? 'Last 7 days' : 'Last 30 days'}
                        </div>
                      </div>
                    )}
                    
                    {/* Tooltip for grid view */}
                    {!selectedDistrict && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <div>{district}</div>
                        <div>{data.cases} cases - {getSeverityLabel(data.cases)}</div>
                        <div>{data.workers} migrant workers</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Low (0-29)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-sm">Medium (30-79)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-sm">High (80-129)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm">Critical (130+)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Total Cases</p>
                  <p className="text-2xl font-bold text-blue-800">{totalCases}</p>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">T</span>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600">Critical Zones</p>
                  <p className="text-2xl font-bold text-red-800">{criticalZones}</p>
                </div>
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">!</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Active Regions</p>
                  <p className="text-2xl font-bold text-green-800">{activeRegions}</p>
                </div>
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">A</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Recent Alerts</h4>
            <div className="space-y-3">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="border-l-4 p-3 rounded-r-lg" style={{ borderColor: getSeverityColor(alert.severity), backgroundColor: getSeverityColor(alert.severity) + '10' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">{alert.district}</p>
                      {alert.cases > 0 ? (
                        <p className="text-sm text-gray-600">{alert.cases} {selectedDisease} cases - {getSeverityLabel(alert.cases)} risk</p>
                      ) : (
                        <p className="text-sm text-gray-600">No high-risk alerts for current selection</p>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Worker Risk Assessment */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">Migrant Worker Risk</h4>
            <p className="text-xs text-yellow-700">
              {Object.values(districtData).reduce((sum, d) => sum + d.workers, 0)} migrant workers 
              {selectedDistrict ? `in ${selectedDistrict}` : 'in monitored areas'}
            </p>
            <div className="mt-2">
              <div className="text-xs text-yellow-700">
                High-risk areas: {Object.entries(districtData)
                  .filter(([_, data]) => data.severity === 'critical' || data.severity === 'high')
                  .reduce((sum, [_, data]) => sum + data.workers, 0)} workers
              </div>
              {selectedDistrict && (
                <div className="text-xs text-yellow-700 mt-1">
                  Showing data for {selectedDisease} in {selectedDistrict}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseSurveillanceMap;