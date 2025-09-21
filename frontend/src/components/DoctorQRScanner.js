import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

const DoctorQRScanner = ({ onScanSuccess, onClose }) => {
  const [scanning, setScanning] = useState(true);
  const [error, setError] = useState('');

  const handleScan = (data) => {
    if (data) {
      setScanning(false);
      onScanSuccess(data.text);
    }
  };

  const handleError = (err) => {
    setError('Camera access failed. Please check permissions.');
    console.error(err);
  };

  const testHealthIds = [
    'GH-TVM-023-MW-045',
    'GH-KCH-012-MW-089', 
    'GH-EKM-045-MW-123'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Scan Patient QR Code</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {scanning && (
          <div className="mb-4">
            <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
              <QrScanner
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm mt-2">{error}</p>
            )}
          </div>
        )}

        <div className="space-y-3">
          <p className="text-sm text-gray-600 text-center">
            Or test with sample Health IDs:
          </p>
          <div className="grid gap-2">
            {testHealthIds.map((healthId) => (
              <button
                key={healthId}
                onClick={() => {
                  setScanning(false);
                  onScanSuccess(healthId);
                }}
                className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
              >
                {healthId}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorQRScanner;