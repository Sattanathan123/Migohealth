import React, { useState, useEffect } from 'react';

const PrescriptionViewer = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchHealthId, setSearchHealthId] = useState('');

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const loadPrescriptions = () => {
    const stored = JSON.parse(localStorage.getItem('prescriptions') || '[]');
    setPrescriptions(stored.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  };

  const filteredPrescriptions = prescriptions.filter(p => 
    !searchHealthId || p.workerHealthId.toLowerCase().includes(searchHealthId.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Uploaded Prescriptions</h2>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Health ID..."
          value={searchHealthId}
          onChange={(e) => setSearchHealthId(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
      </div>

      {filteredPrescriptions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No prescriptions found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPrescriptions.map((prescription) => (
            <div key={prescription.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-blue-600">
                    Health ID: {prescription.workerHealthId}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Doctor: {prescription.doctorId} | 
                    Date: {new Date(prescription.timestamp).toLocaleString()}
                  </p>
                </div>
                {prescription.imageFile && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    📷 Image: {prescription.imageFile}
                  </span>
                )}
              </div>
              
              <div className="bg-gray-50 p-3 rounded border-l-4 border-blue-500">
                <h4 className="font-medium text-gray-700 mb-2">Prescription Details:</h4>
                <p className="text-gray-800 whitespace-pre-wrap">{prescription.prescriptionText}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-6 text-center">
        <button
          onClick={loadPrescriptions}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Refresh List
        </button>
      </div>
    </div>
  );
};

export default PrescriptionViewer;