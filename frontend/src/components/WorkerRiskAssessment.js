import React from 'react';
import { useLanguage } from '../utils/LanguageContext';

const WorkerRiskAssessment = ({ worker }) => {
  const { t } = useLanguage();

  // Mock risk data based on worker's location
  const getRiskAssessment = (healthId) => {
    // Extract district from health ID (simplified logic)
    const districtCode = healthId.split('-')[1];
    const riskData = {
      'TVM': { district: 'Thiruvananthapuram', risk: 'medium', cases: 45, color: 'yellow' },
      'KCH': { district: 'Kochi', risk: 'high', cases: 89, color: 'orange' },
      'EKM': { district: 'Ernakulam', risk: 'high', cases: 89, color: 'orange' },
      'PLK': { district: 'Palakkad', risk: 'critical', cases: 134, color: 'red' },
      'KZK': { district: 'Kozhikode', risk: 'high', cases: 92, color: 'orange' },
      'TSR': { district: 'Thrissur', risk: 'medium', cases: 56, color: 'yellow' }
    };

    return riskData[districtCode] || { district: 'Unknown', risk: 'low', cases: 0, color: 'green' };
  };

  const riskInfo = getRiskAssessment(worker.healthId);

  const getRiskColor = (color) => {
    switch (color) {
      case 'green': return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800' };
      case 'yellow': return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800' };
      case 'orange': return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800' };
      case 'red': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800' };
      default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-800' };
    }
  };

  const colorClasses = getRiskColor(riskInfo.color);

  const getRiskIcon = () => {
    if (riskInfo.risk === 'critical') {
      return (
        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
    } else if (riskInfo.risk === 'high') {
      return (
        <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    }
  };

  const getRecommendations = () => {
    switch (riskInfo.risk) {
      case 'critical':
        return [
          'Immediate health screening recommended',
          'Monitor for symptoms closely',
          'Consider isolation if symptomatic',
          'Report any symptoms immediately'
        ];
      case 'high':
        return [
          'Enhanced health monitoring',
          'Regular temperature checks',
          'Maintain social distancing',
          'Use protective equipment'
        ];
      case 'medium':
        return [
          'Standard health precautions',
          'Regular hand hygiene',
          'Monitor for symptoms',
          'Follow local guidelines'
        ];
      default:
        return [
          'Continue standard precautions',
          'Maintain good hygiene',
          'Stay informed of updates'
        ];
    }
  };

  return (
    <div className={`${colorClasses.bg} ${colorClasses.border} border rounded-lg p-4 mb-4`}>
      <div className="flex items-center space-x-3 mb-3">
        {getRiskIcon()}
        <div>
          <h3 className={`text-lg font-semibold ${colorClasses.text}`}>
            Regional Risk Assessment
          </h3>
          <p className="text-sm text-gray-600">
            Based on current outbreak data for {riskInfo.district}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Risk Level:</span>
            <span className={`text-sm font-bold ${colorClasses.text} uppercase`}>
              {riskInfo.risk}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Active Cases:</span>
            <span className="text-sm font-bold text-gray-800">{riskInfo.cases}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">District:</span>
            <span className="text-sm font-bold text-gray-800">{riskInfo.district}</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            {getRecommendations().map((rec, index) => (
              <li key={index} className="flex items-start space-x-1">
                <span className="text-gray-400">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {riskInfo.risk === 'critical' && (
        <div className="bg-red-100 border border-red-300 rounded-lg p-3 mt-3">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-red-800">
              CRITICAL ALERT: High outbreak activity in worker's region
            </span>
          </div>
          <p className="text-xs text-red-700 mt-1">
            Exercise extreme caution. Consider additional screening and protective measures.
          </p>
        </div>
      )}

      <div className="text-xs text-gray-500 mt-3 text-center">
        Last updated: {new Date().toLocaleString()} | Data from Kerala Health Department
      </div>
    </div>
  );
};

export default WorkerRiskAssessment;