import React from 'react';
import HealthStatusBadge from './HealthStatusBadge';

const WorkerDetails = ({ worker, onBack }) => {
  if (!worker) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Worker Details</h2>
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back
            </button>
          </div>

          <div className="text-center mb-6">
            {worker.photoUrl && (
              <img
                src={worker.photoUrl}
                alt={worker.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            <div className="flex items-center justify-center space-x-3 mb-2">
              <h3 className="text-xl font-semibold text-gray-800">{worker.name}</h3>
              <HealthStatusBadge status={worker.healthStatus} size="sm" />
            </div>
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
                <span className="text-green-800 font-medium">Health Record Found</span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                Worker information successfully retrieved from database.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDetails;