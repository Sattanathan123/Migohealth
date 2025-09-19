import React, { useState, useRef, useEffect } from 'react';
import KeralaMapSVG from './KeralaMapSVG';
import { useLanguage } from '../utils/LanguageContext';

const InteractiveOutbreakMap = ({ highlightedDistrict = null, onDistrictSelect }) => {
  const { t } = useLanguage();
  const mapRef = useRef(null);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDisease, setSelectedDisease] = useState('COVID-19');
  const [timePeriod, setTimePeriod] = useState('7days');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Enhanced district data with coordinates for better positioning
  const allDistrictData = {
    'COVID-19': {
      'Thiruvananthapuram': { cases: 45, severity: 'medium', workers: 324, x: 20, y: 85 },
      'Kollam': { cases: 23, severity: 'low', workers: 156, x: 25, y: 75 },
      'Pathanamthitta': { cases: 12, severity: 'low', workers: 89, x: 35, y: 70 },
      'Alappuzha': { cases: 67, severity: 'medium', workers: 234, x: 40, y: 65 },
      'Kottayam': { cases: 34, severity: 'medium', workers: 178, x: 45, y: 60 },
      'Idukki': { cases: 18, severity: 'low', workers: 67, x: 55, y: 55 },
      'Ernakulam': { cases: 89, severity: 'high', workers: 445, x: 50, y: 50 },
      'Thrissur': { cases: 56, severity: 'medium', workers: 298, x: 45, y: 40 },
      'Palakkad': { cases: 134, severity: 'critical', workers: 389, x: 55, y: 35 },
      'Malappuram': { cases: 78, severity: 'medium', workers: 267, x: 50, y: 30 },
      'Kozhikode': { cases: 92, severity: 'high', workers: 356, x: 45, y: 25 },
      'Wayanad': { cases: 29, severity: 'low', workers: 123, x: 60, y: 20 },
      'Kannur': { cases: 67, severity: 'medium', workers: 234, x: 55, y: 15 },
      'Kasaragod': { cases: 41, severity: 'medium', workers: 189, x: 60, y: 10 }
    },
    'Dengue': {
      'Thiruvananthapuram': { cases: 23, severity: 'low', workers: 324, x: 20, y: 85 },
      'Kollam': { cases: 45, severity: 'medium', workers: 156, x: 25, y: 75 },
      'Ernakulam': { cases: 67, severity: 'medium', workers: 445, x: 50, y: 50 },
      'Thrissur': { cases: 89, severity: 'high', workers: 298, x: 45, y: 40 },
      'Palakkad': { cases: 34, severity: 'medium', workers: 389, x: 55, y: 35 },
      'Kozhikode': { cases: 56, severity: 'medium', workers: 356, x: 45, y: 25 },
      'Kannur': { cases: 12, severity: 'low', workers: 234, x: 55, y: 15 }
    },
    'Malaria': {
      'Wayanad': { cases: 45, severity: 'medium', workers: 123, x: 60, y: 20 },
      'Idukki': { cases: 67, severity: 'medium', workers: 67, x: 55, y: 55 },
      'Pathanamthitta': { cases: 23, severity: 'low', workers: 89, x: 35, y: 70 },
      'Kasaragod': { cases: 34, severity: 'medium', workers: 189, x: 60, y: 10 }
    }
  };

  const getFilteredData = () => {
    const diseaseData = allDistrictData[selectedDisease] || {};
    return selectedDistrict && selectedDistrict in diseaseData 
      ? { [selectedDistrict]: diseaseData[selectedDistrict] }
      : diseaseData;
  };

  const districtData = getFilteredData();

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#F97316';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getSeverityLabel = (cases) => {
    if (cases <= 29) return 'Low';
    if (cases <= 79) return 'Medium';
    if (cases <= 129) return 'High';
    return 'Critical';
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoom = (delta) => {
    const newZoom = Math.max(0.5, Math.min(3, zoomLevel + delta));
    setZoomLevel(newZoom);
  };

  const resetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleDistrictClick = (district) => {
    setSelectedDistrict(selectedDistrict === district ? '' : district);
    if (onDistrictSelect) {
      onDistrictSelect(district);
    }
  };

  const totalCases = Object.values(districtData).reduce((sum, district) => sum + district.cases, 0);
  const criticalZones = Object.values(districtData).filter(d => d.severity === 'critical').length;
  const activeRegions = Object.keys(districtData).length;

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

  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragStart, panOffset]);

  return (
    <div className="bg-gray-900 rounded-lg shadow-sm p-6 text-white">
      {/* Header with Live Indicator */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Disease Surveillance Dashboard</h2>
          <div className="flex items-center space-x-2 mt-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">LIVE - Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">District/Area</label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Districts</option>
            {Object.keys(allDistrictData[selectedDisease] || {}).map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Disease Type</label>
          <select
            value={selectedDisease}
            onChange={(e) => setSelectedDisease(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="COVID-19">COVID-19</option>
            <option value="Dengue">Dengue</option>
            <option value="Malaria">Malaria</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Time Period</label>
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="24hours">Last 24 hours</option>
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Interactive Map */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800 rounded-lg p-4 relative overflow-hidden" style={{ height: '500px' }}>
            {/* Map Controls */}
            <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
              <button
                onClick={() => handleZoom(0.2)}
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
                title="Zoom In"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button
                onClick={() => handleZoom(-0.2)}
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
                title="Zoom Out"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                </svg>
              </button>
              <button
                onClick={resetView}
                className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700 transition-colors"
                title="Reset View"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {/* Map Container */}
            <div
              ref={mapRef}
              className="w-full h-full cursor-move relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg"
              onMouseDown={handleMouseDown}
              style={{
                transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                transformOrigin: 'center center'
              }}
            >
              <KeralaMapSVG 
                districtData={districtData}
                onDistrictClick={handleDistrictClick}
                highlightedDistrict={highlightedDistrict}
                getSeverityColor={getSeverityColor}
              />
              
              {/* Tooltips for districts */}
              {Object.entries(districtData).map(([district, data]) => (
                <div
                  key={`tooltip-${district}`}
                  className="absolute group pointer-events-none"
                  style={{
                    left: `${data.x || 50}%`,
                    top: `${data.y || 50}%`,
                    transform: 'translate(-50%, -100%)'
                  }}
                >
                  <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <div className="font-medium">{district}</div>
                    <div>{data.cases} {selectedDisease} cases</div>
                    <div>{getSeverityLabel(data.cases)} Risk</div>
                    <div>{data.workers} migrant workers</div>
                    {highlightedDistrict === district && (
                      <div className="text-yellow-400 font-medium">📍 Scanned Worker Location</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-gray-900 bg-opacity-90 rounded-lg p-3">
              <div className="text-xs font-medium text-gray-300 mb-2">Risk Levels</div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-300">Low (0-29)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-gray-300">Medium (30-79)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-xs text-gray-300">High (80-129)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-300">Critical (130+)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="bg-blue-900 p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-blue-300">Total Cases</p>
              <p className="text-3xl font-bold text-white">{totalCases}</p>
            </div>
          </div>

          <div className="bg-red-900 p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-red-300">Critical Zones</p>
              <p className="text-3xl font-bold text-white">{criticalZones}</p>
            </div>
          </div>

          <div className="bg-green-900 p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-green-300">Active Regions</p>
              <p className="text-3xl font-bold text-white">{activeRegions}</p>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Recent Alerts</h4>
            <div className="space-y-2">
              {getRecentAlerts().slice(0, 3).map((alert, index) => (
                <div key={index} className="text-xs p-2 rounded" style={{ backgroundColor: getSeverityColor(alert.severity) + '20' }}>
                  <div className="font-medium text-white">{alert.district}</div>
                  <div className="text-gray-300">{alert.cases} cases - {alert.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveOutbreakMap;