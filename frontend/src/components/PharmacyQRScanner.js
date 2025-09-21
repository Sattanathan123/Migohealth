import React, { useState } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import HealthStatusBadge from './HealthStatusBadge';

const PharmacyQRScanner = ({ onScanSuccess, onBack }) => {
  const { t } = useLanguage();
  const [scanning, setScanning] = useState(false);
  const [manualHealthId, setManualHealthId] = useState('');

  // Mock worker data for testing
  const mockWorkerData = {
    'GH-TVM-023-MW-045': {
      healthId: 'GH-TVM-023-MW-045',
      name: 'Ramesh Kumar',
      healthStatus: 'GREEN',
      prescriptions: [
        {
          date: '2024-01-10',
          doctor: 'Dr. Priya Nair',
          medicines: ['Paracetamol 500mg', 'Amoxicillin 250mg'],
          dosage: '2 times daily for 5 days'
        },
        {
          date: '2024-01-05',
          doctor: 'Dr. Suresh Kumar',
          medicines: ['Cough Syrup', 'Vitamin D3'],
          dosage: '3 times daily'
        }
      ],
      medicalHistory: [
        { condition: 'Fever', date: '2024-01-10', status: 'Treated' },
        { condition: 'Common Cold', date: '2024-01-05', status: 'Recovered' }
      ],
      allergies: ['Penicillin'],
      ongoingTreatment: 'Vitamin D3 supplement'
    }
  };

  const handleScan = () => {
    setScanning(true);
    // Simulate QR scan delay
    setTimeout(() => {
      const workerData = mockWorkerData['GH-TVM-023-MW-045'];
      if (workerData) {
        onScanSuccess(workerData);
      }
      setScanning(false);
    }, 2000);
  };

  const handleManualEntry = () => {
    const workerData = mockWorkerData[manualHealthId];
    if (workerData) {
      onScanSuccess(workerData);
    } else {
      alert('Worker not found. Please scan QR code or check Health ID.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Scan Health ID QR Code</h2>
          <p className="mt-2 text-sm text-gray-600">Scan migrant worker's QR code to access medical history</p>
        </div>

        <div className="space-y-6">
          {/* QR Scanner Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            {scanning ? (
              <div className="space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600">Scanning QR Code...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                <p className="text-gray-600">Position QR code within the frame</p>
                <button
                  onClick={handleScan}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Scanning
                </button>
              </div>
            )}
          </div>

          {/* Manual Entry Option */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Manual Entry</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={manualHealthId}
                onChange={(e) => setManualHealthId(e.target.value)}
                placeholder="Enter Health ID (e.g., GH-TVM-023-MW-045)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleManualEntry}
                disabled={!manualHealthId}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                Access Records
              </button>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={onBack}
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Privacy Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Privacy Notice</h4>
              <p className="text-xs text-yellow-700 mt-1">
                Medical records are confidential. Access is logged and monitored for security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyQRScanner;