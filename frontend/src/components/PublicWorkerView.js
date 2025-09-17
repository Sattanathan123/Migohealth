import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PublicWorkerView = () => {
  const { healthId } = useParams();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/workers/${healthId}`);
        if (response.ok) {
          const workerData = await response.json();
          setWorker(workerData);
        } else {
          setError('Worker not found');
        }
      } catch (err) {
        setError('Unable to load worker data');
      } finally {
        setLoading(false);
      }
    };

    if (healthId) {
      fetchWorker();
    }
  }, [healthId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading worker information...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
          <div className="text-center">
            <div className="text-red-600 text-lg font-semibold mb-2">Error</div>
            <div className="text-gray-600">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!worker) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Kerala Migrant Worker</h1>
            <h2 className="text-lg font-semibold text-blue-600">Digital Health Record</h2>
          </div>

          <div className="text-center mb-6">
            {worker.photoUrl && (
              <img
                src={worker.photoUrl}
                alt={worker.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-blue-300"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
            <h3 className="text-xl font-semibold text-gray-800">{worker.name}</h3>
            <p className="text-gray-600">Health ID: {worker.healthId}</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium text-gray-600">Age:</span>
              <span className="text-gray-800">{worker.age} years</span>
            </div>
            
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium text-gray-600">Gender:</span>
              <span className="text-gray-800">{worker.gender}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium text-gray-600">Origin State:</span>
              <span className="text-gray-800">{worker.originState}</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-green-800 font-medium">Verified Health Record</span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                This is an official digital health record issued by Kerala Health Department.
              </p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Government of Kerala | Health Department
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicWorkerView;