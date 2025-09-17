import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

const QRScanner = ({ onScanSuccess, onBack }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScan = async (data) => {
    if (data && data.text) {
      setLoading(true);
      setError('');
      
      try {
        // Check if it's encoded worker data
        if (data.text.startsWith('HEALTH_ID:')) {
          const jsonData = data.text.replace('HEALTH_ID:', '');
          const workerData = JSON.parse(jsonData);
          onScanSuccess(workerData);
          return;
        }
        
        // Otherwise, treat as health ID and fetch from server
        const response = await fetch(`http://localhost:8081/api/workers/${data.text}`);
        
        if (response.ok) {
          const workerData = await response.json();
          onScanSuccess(workerData);
        } else if (response.status === 404) {
          setError('Worker not found with this Health ID');
        } else {
          setError('Error fetching worker data');
        }
      } catch (err) {
        setError('Invalid QR code or unable to connect to server');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleError = (err) => {
    console.log('QR Scanner Error:', err);
    setError('Camera access denied or not available');
  };

  const testHealthId = async (healthId) => {
    await handleScan(healthId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Scan QR Code</h2>
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back
            </button>
          </div>

          <div className="mb-6">
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%', maxWidth: '400px' }}
              constraints={{
                video: { facingMode: 'environment' }
              }}
            />
          </div>

          {loading && (
            <div className="text-center text-blue-600 mb-4">
              Loading worker data...
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-4">Test with sample Health IDs:</p>
            <div className="space-y-2">
              <button
                onClick={() => testHealthId('GH-TVM-023-MW-045')}
                className="w-full text-left bg-gray-100 p-2 rounded text-sm hover:bg-gray-200"
              >
                GH-TVM-023-MW-045 (Ramesh Kumar)
              </button>
              <button
                onClick={() => testHealthId('GH-KCH-012-MW-089')}
                className="w-full text-left bg-gray-100 p-2 rounded text-sm hover:bg-gray-200"
              >
                GH-KCH-012-MW-089 (Priya Sharma)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;