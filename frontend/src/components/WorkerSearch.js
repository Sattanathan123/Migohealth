import React, { useState, useEffect } from 'react';
import DoctorQRScanner from './DoctorQRScanner';
import PatientDetailsModal from './PatientDetailsModal';

const WorkerSearch = () => {
  const [searchHealthId, setSearchHealthId] = useState('');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchHealthId.trim()) {
      setError('Please enter a Health ID');
      return;
    }

    setLoading(true);
    setError('');
    setSearchResult(null);

    try {
      const response = await fetch(`http://localhost:8085/api/workers/${searchHealthId}`);
      
      if (response.ok) {
        const worker = await response.json();
        setSearchResult(worker);
        setSelectedPatientId(searchHealthId);
      } else if (response.status === 404) {
        setError(`Worker not found with Health ID: ${searchHealthId}. Please check the ID or register the worker first.`);
      } else {
        setError('Failed to search worker');
      }
    } catch (err) {
      setError('Unable to connect to server. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleQRScan = (healthId) => {
    setShowQRScanner(false);
    setSearchHealthId(healthId);
    setSelectedPatientId(healthId);
  };

  const [sampleHealthIds, setSampleHealthIds] = useState([]);
  
  // Load registered workers from API
  useEffect(() => {
    const loadRegisteredWorkers = async () => {
      try {
        const response = await fetch('http://localhost:8085/api/workers');
        if (response.ok) {
          const workers = await response.json();
          setSampleHealthIds(workers.slice(0, 1).map(w => w.healthId));
        }
      } catch (error) {
        console.error('Failed to load workers:', error);
      }
    };
    loadRegisteredWorkers();
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
        Access Worker Records
      </h2>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Search by Health ID */}
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border border-blue-200">
            <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
              🔍 Search by Health ID
            </h3>
            <p className="text-blue-700 mb-6">Enter the worker's Health ID to access their records</p>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter Health ID (e.g., GH-TVM-023-MW-045)"
                value={searchHealthId}
                onChange={(e) => setSearchHealthId(e.target.value)}
                className="w-full p-4 border-2 border-blue-300 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              
              <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {loading ? 'Searching...' : 'Search Worker'}
              </button>
            </div>
            
            <div className="mt-6">
              {sampleHealthIds.length > 0 ? (
                <>
                  <p className="text-sm text-blue-600 font-semibold mb-2">Registered Workers:</p>
                  <div className="space-y-2">
                    {sampleHealthIds.map(id => (
                      <button
                        key={id}
                        onClick={() => setSearchHealthId(id)}
                        className="block w-full text-left p-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-sm text-blue-800 transition-colors"
                      >
                        {id}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-500 italic">No workers registered yet. Register workers first to search them.</p>
              )}
            </div>
          </div>
        </div>

        {/* QR Scanner */}
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl border border-green-200">
            <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
              📱 Scan QR Code
            </h3>
            <p className="text-green-700 mb-6">Scan the worker's QR code for instant access</p>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white font-bold text-3xl">📷</span>
              </div>
              
              <button
                onClick={() => setShowQRScanner(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start QR Scanner
              </button>
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl border border-purple-200">
            <h4 className="text-lg font-bold text-purple-800 mb-3">Quick Access Features</h4>
            <ul className="space-y-2 text-purple-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                View complete health records
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Access prescription history
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Check health status
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Upload new prescriptions
              </li>
            </ul>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl">
          <div className="flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            <span className="font-semibold">{error}</span>
          </div>
        </div>
      )}

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <DoctorQRScanner
          onScanSuccess={handleQRScan}
          onClose={() => setShowQRScanner(false)}
        />
      )}
      
      {/* Patient Details Modal */}
      {selectedPatientId && (
        <PatientDetailsModal
          healthId={selectedPatientId}
          onClose={() => {
            setSelectedPatientId(null);
            setSearchResult(null);
          }}
        />
      )}
    </div>
  );
};

export default WorkerSearch;