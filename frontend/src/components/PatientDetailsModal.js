import React, { useState, useEffect } from 'react';
import HealthStatusBadge from './HealthStatusBadge';

const PatientDetailsModal = ({ healthId, onClose }) => {
  const [worker, setWorker] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    if (healthId) {
      fetchWorkerData();
      fetchPrescriptions();
    }
  }, [healthId]);

  const fetchWorkerData = async () => {
    try {
      const response = await fetch(`http://localhost:8085/api/workers/${healthId}`);
      if (response.ok) {
        const text = await response.text();
        const data = text ? JSON.parse(text) : null;
        setWorker(data);
      }
    } catch (error) {
      console.error('Failed to fetch worker data:', error);
    }
  };

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch(`http://localhost:8085/api/workers/${healthId}/prescriptions`);
      if (response.ok) {
        const text = await response.text();
        const data = text ? JSON.parse(text) : [];
        setPrescriptions(data);
      }
    } catch (error) {
      console.error('Failed to fetch prescriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">Loading patient data...</p>
        </div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <h3 className="text-xl font-bold text-red-600 mb-4">Patient Not Found</h3>
          <p className="text-gray-600 mb-6">No patient found with Health ID: {healthId}</p>
          <button
            onClick={onClose}
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl font-bold">{worker.name}</h2>
                <HealthStatusBadge status={worker.healthStatus} size="sm" />
              </div>
              <p className="text-blue-100">Health ID: {worker.healthId}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-3xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'details'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Patient Details
            </button>
            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'prescriptions'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Prescriptions ({prescriptions.length})
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'details' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-blue-700 mb-1">Full Name</label>
                  <p className="text-lg font-semibold text-gray-800">{worker.name}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-green-700 mb-1">Age</label>
                  <p className="text-lg font-semibold text-gray-800">{worker.age} years</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-purple-700 mb-1">Gender</label>
                  <p className="text-lg font-semibold text-gray-800">{worker.gender}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-orange-700 mb-1">Origin State</label>
                  <p className="text-lg font-semibold text-gray-800">{worker.originState}</p>
                </div>
              </div>
              <div className="space-y-4">
                {worker.phoneNumber && (
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-indigo-700 mb-1">Phone Number</label>
                    <p className="text-lg font-semibold text-gray-800">{worker.phoneNumber}</p>
                  </div>
                )}
                {worker.emergencyContact && (
                  <div className="bg-red-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-red-700 mb-1">Emergency Contact</label>
                    <p className="text-lg font-semibold text-gray-800">{worker.emergencyContact}</p>
                  </div>
                )}
                {worker.bloodGroup && (
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-pink-700 mb-1">Blood Group</label>
                    <p className="text-lg font-semibold text-gray-800">{worker.bloodGroup}</p>
                  </div>
                )}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registration Date</label>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(worker.registrationDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'prescriptions' && (
            <div className="space-y-4">
              {prescriptions.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-500 text-2xl">📋</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No Prescriptions Found</h3>
                  <p className="text-gray-600">This patient has no prescription history.</p>
                </div>
              ) : (
                prescriptions.map((prescription, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-800">Dr. {prescription.doctorName}</h4>
                        <p className="text-sm text-gray-600">Doctor ID: {prescription.doctorId}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {new Date(prescription.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(prescription.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h5 className="font-medium text-gray-800 mb-2">Prescription Details:</h5>
                      <p className="text-gray-700 whitespace-pre-wrap">{prescription.prescriptionText}</p>
                    </div>
                    {prescription.notes && (
                      <div className="mt-3 bg-blue-50 p-3 rounded-lg">
                        <h5 className="font-medium text-blue-800 mb-1">Notes:</h5>
                        <p className="text-blue-700">{prescription.notes}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsModal;