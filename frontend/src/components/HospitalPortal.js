import React, { useState } from 'react';

const HospitalPortal = ({ onBack }) => {
  const [activeAction, setActiveAction] = useState(null);
  const [registeredWorker, setRegisteredWorker] = useState(null);

  if (activeAction === 'register') {
    const HospitalRegistration = require('./HospitalRegistration').default;
    return (
      <HospitalRegistration 
        onBack={() => setActiveAction(null)}
        onRegistrationSuccess={(worker) => {
          setActiveAction('show-card');
          setRegisteredWorker(worker);
        }}
      />
    );
  }

  if (activeAction === 'show-card') {
    const HealthCard = require('./HealthCard').default;
    return (
      <HealthCard 
        worker={registeredWorker}
        onBack={() => setActiveAction(null)}
      />
    );
  }

  if (activeAction === 'search') {
    const QRScanner = require('./QRScanner').default;
    return (
      <QRScanner 
        onBack={() => setActiveAction(null)}
        onScanSuccess={(worker) => {
          alert(`Worker found: ${worker.name}`);
          setActiveAction(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Hospital Portal</h2>
            <button onClick={onBack} className="text-gray-600 hover:text-gray-800">← Back</button>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setActiveAction('register')}
              className="w-full bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 text-left"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">+</span>
                </div>
                <div>
                  <h3 className="font-semibold">Register New Worker</h3>
                  <p className="text-sm text-green-100">Register unregistered migrant workers</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveAction('search')}
              className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 text-left"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">🔍</span>
                </div>
                <div>
                  <h3 className="font-semibold">Search Worker</h3>
                  <p className="text-sm text-blue-100">Find existing worker records</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalPortal;