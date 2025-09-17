import React, { useState, useEffect } from 'react';
import { useLanguage } from '../utils/LanguageContext';

const WorkerPortal = ({ onBack }) => {
  const { t } = useLanguage();
  const [worker, setWorker] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [healthId, setHealthId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!healthId.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`http://localhost:8085/api/workers/${healthId}`);
      if (response.ok) {
        const workerData = await response.json();
        setWorker(workerData);
        fetchPrescriptions(workerData.id);
      } else {
        setError('Worker not found with this Health ID');
      }
    } catch (err) {
      setError('Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const fetchPrescriptions = async (workerId) => {
    try {
      const response = await fetch(`http://localhost:8085/api/prescriptions/worker/${workerId}`);
      if (response.ok) {
        const data = await response.json();
        setPrescriptions(data);
      }
    } catch (err) {
      console.error('Error fetching prescriptions:', err);
    }
  };

  if (!worker) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{t('workerPortal')}</h2>
              <button onClick={onBack} className="text-gray-600 hover:text-gray-800">← Back</button>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('healthId')}</label>
                <input
                  type="text"
                  value={healthId}
                  onChange={(e) => setHealthId(e.target.value)}
                  placeholder={t('enterHealthId')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Logging in...' : 'Access Portal'}
              </button>
            </form>
            
            {error && (
              <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Test with sample Health IDs:</p>
              <button
                onClick={() => setHealthId('GH-TVM-023-MW-045')}
                className="text-blue-600 text-sm hover:underline"
              >
                GH-TVM-023-MW-045
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">MH</span>
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-800">Welcome, {worker.name}</h1>
                <p className="text-sm text-gray-600">{worker.healthId}</p>
              </div>
            </div>
            <button
              onClick={() => setWorker(null)}
              className="text-gray-600 hover:text-gray-800"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('myProfile')}
            </button>
            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'prescriptions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('prescriptions')}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('name')}</label>
                <p className="mt-1 text-sm text-gray-900">{worker.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Health ID</label>
                <p className="mt-1 text-sm text-gray-900">{worker.healthId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('age')}</label>
                <p className="mt-1 text-sm text-gray-900">{worker.age} years</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('gender')}</label>
                <p className="mt-1 text-sm text-gray-900">{worker.gender}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Origin State</label>
                <p className="mt-1 text-sm text-gray-900">{worker.originState}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prescriptions' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">My Prescriptions</h2>
            {prescriptions.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">No prescriptions found</p>
              </div>
            ) : (
              prescriptions.map((prescription) => (
                <div key={prescription.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">Dr. {prescription.doctorName}</h3>
                      <p className="text-sm text-gray-600">{prescription.date}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {prescription.status || 'Active'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Medications:</h4>
                    <p className="text-gray-600">{prescription.medications}</p>
                  </div>
                  {prescription.notes && (
                    <div className="mt-3">
                      <h4 className="font-medium text-gray-700 mb-2">Notes:</h4>
                      <p className="text-gray-600">{prescription.notes}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerPortal;