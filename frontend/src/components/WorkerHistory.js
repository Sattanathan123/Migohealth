import React, { useState, useEffect } from 'react';
import HealthStatusBadge from './HealthStatusBadge';
import PatientDetailsModal from './PatientDetailsModal';

const WorkerHistory = ({ doctorId }) => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadWorkers();
  }, [doctorId]);

  const loadWorkers = async () => {
    try {
      // Get prescriptions uploaded by this doctor from localStorage
      const storedPrescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');
      const doctorPrescriptions = storedPrescriptions.filter(p => p.doctorId === doctorId);
      
      // Get unique worker Health IDs that this doctor has treated
      const treatedWorkerIds = [...new Set(doctorPrescriptions.map(p => p.workerHealthId))];
      
      if (treatedWorkerIds.length === 0) {
        setWorkers([]);
        setLoading(false);
        return;
      }
      
      // Fetch worker details for each treated worker
      const workerPromises = treatedWorkerIds.map(async (healthId) => {
        try {
          const response = await fetch(`http://localhost:8085/api/workers/${healthId}`);
          if (response.ok) {
            return await response.json();
          }
        } catch (error) {
          console.error(`Failed to load worker ${healthId}:`, error);
        }
        return null;
      });
      
      const workersData = await Promise.all(workerPromises);
      const validWorkers = workersData.filter(worker => worker !== null);
      setWorkers(validWorkers);
    } catch (error) {
      console.error('Failed to load workers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkers = workers.filter(worker => 
    worker.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.healthId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.originState?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading worker history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
        Worker History
      </h2>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, Health ID, or origin state..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 border-2 border-gray-300 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-4 flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredWorkers.length} of {workers.length} workers
        </p>
        <button
          onClick={loadWorkers}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Refresh
        </button>
      </div>

      {filteredWorkers.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-gray-500 text-3xl">👥</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">No Patient History</h3>
          <p className="text-gray-600">
            {searchTerm ? 'No workers match your search criteria.' : 'You haven\'t uploaded prescriptions for any workers yet. Upload prescriptions to see your patient history here.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredWorkers.map((worker) => (
            <div
              key={worker.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedPatientId(worker.healthId)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{worker.name}</h3>
                    <HealthStatusBadge status={worker.healthStatus || 'GREEN'} size="sm" />
                  </div>
                  <p className="text-blue-600 font-semibold mb-2">Health ID: {worker.healthId}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Age:</span>
                      <span className="ml-2 font-semibold">{worker.age} years</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Gender:</span>
                      <span className="ml-2 font-semibold">{worker.gender}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Origin:</span>
                      <span className="ml-2 font-semibold">{worker.originState}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Nationality:</span>
                      <span className="ml-2 font-semibold">{worker.nationality || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Patient Details Modal */}
      {selectedPatientId && (
        <PatientDetailsModal
          healthId={selectedPatientId}
          onClose={() => setSelectedPatientId(null)}
        />
      )}
    </div>
  );
};

export default WorkerHistory;