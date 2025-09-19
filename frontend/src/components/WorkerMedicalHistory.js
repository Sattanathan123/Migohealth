import React, { useState } from 'react';
import WorkerRiskAssessment from './WorkerRiskAssessment';
import InteractiveOutbreakMap from './InteractiveOutbreakMap';
import { useLanguage } from '../utils/LanguageContext';

const WorkerMedicalHistory = ({ worker, onBack }) => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('prescriptions');

  const getWorkerDistrict = (healthId) => {
    const districtCode = healthId.split('-')[1];
    const districtMap = {
      'TVM': 'Thiruvananthapuram',
      'KCH': 'Ernakulam',
      'EKM': 'Ernakulam',
      'PLK': 'Palakkad',
      'KZK': 'Kozhikode',
      'TSR': 'Thrissur'
    };
    return districtMap[districtCode] || null;
  };

  const workerDistrict = getWorkerDistrict(worker.healthId);

  const checkDrugInteractions = (medicines) => {
    // Simple drug interaction check
    const interactions = [];
    if (medicines.includes('Paracetamol 500mg') && medicines.includes('Warfarin')) {
      interactions.push('Paracetamol may increase bleeding risk with Warfarin');
    }
    return interactions;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Medical History</h2>
          <p className="text-gray-600">Patient: {worker.name} | Health ID: {worker.healthId}</p>
        </div>
        <button
          onClick={onBack}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
      </div>

      {/* Risk Assessment */}
      <WorkerRiskAssessment worker={worker} />
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <div>
              <p className="text-sm font-medium text-blue-800">View Regional Outbreak Map</p>
              <p className="text-xs text-blue-600">See outbreak status for worker's location: {workerDistrict || 'Unknown'}</p>
            </div>
          </div>
          <button
            onClick={() => setActiveSection('map')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            View Map
          </button>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-4 mb-6 border-b">
        <button
          onClick={() => setActiveSection('prescriptions')}
          className={`pb-2 px-1 border-b-2 transition-colors ${
            activeSection === 'prescriptions'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Prescriptions
        </button>
        <button
          onClick={() => setActiveSection('history')}
          className={`pb-2 px-1 border-b-2 transition-colors ${
            activeSection === 'history'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Medical History
        </button>
        <button
          onClick={() => setActiveSection('ongoing')}
          className={`pb-2 px-1 border-b-2 transition-colors ${
            activeSection === 'ongoing'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Ongoing Treatment
        </button>
        <button
          onClick={() => setActiveSection('alerts')}
          className={`pb-2 px-1 border-b-2 transition-colors ${
            activeSection === 'alerts'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Alerts
        </button>
        <button
          onClick={() => setActiveSection('map')}
          className={`pb-2 px-1 border-b-2 transition-colors ${
            activeSection === 'map'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Regional Map
        </button>
      </div>

      {/* Prescriptions Section */}
      {activeSection === 'prescriptions' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Previous Prescriptions</h3>
          {worker.prescriptions?.map((prescription, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-800">Dr. {prescription.doctor}</p>
                  <p className="text-sm text-gray-600">{prescription.date}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  Prescription #{index + 1}
                </span>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">Medicines:</p>
                  <ul className="text-sm text-gray-600 ml-4">
                    {prescription.medicines.map((medicine, idx) => (
                      <li key={idx} className="list-disc">{medicine}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Dosage:</p>
                  <p className="text-sm text-gray-600">{prescription.dosage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Medical History Section */}
      {activeSection === 'history' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Medical History</h3>
          {worker.medicalHistory?.map((record, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{record.condition}</p>
                  <p className="text-sm text-gray-600">{record.date}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  record.status === 'Treated' ? 'bg-green-100 text-green-800' :
                  record.status === 'Recovered' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {record.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ongoing Treatment Section */}
      {activeSection === 'ongoing' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Ongoing Treatment</h3>
          <div className="border rounded-lg p-4">
            <p className="text-gray-800">{worker.ongoingTreatment || 'No ongoing treatment'}</p>
          </div>
          
          {worker.allergies && worker.allergies.length > 0 && (
            <div>
              <h4 className="text-md font-semibold text-gray-800 mb-2">Known Allergies</h4>
              <div className="flex flex-wrap gap-2">
                {worker.allergies.map((allergy, index) => (
                  <span key={index} className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full">
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Alerts Section */}
      {activeSection === 'alerts' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Drug Interaction Alerts</h3>
          
          {worker.prescriptions?.map((prescription, index) => {
            const interactions = checkDrugInteractions(prescription.medicines);
            return interactions.length > 0 ? (
              <div key={index} className="border-l-4 border-red-500 bg-red-50 p-4">
                <div className="flex">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-medium text-red-800">Drug Interaction Warning</h4>
                    {interactions.map((interaction, idx) => (
                      <p key={idx} className="text-sm text-red-700 mt-1">{interaction}</p>
                    ))}
                  </div>
                </div>
              </div>
            ) : null;
          })}

          {worker.allergies && worker.allergies.length > 0 && (
            <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4">
              <div className="flex">
                <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">Allergy Alert</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Patient is allergic to: {worker.allergies.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
            <div className="flex">
              <svg className="w-5 h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-blue-800">Information</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Always verify patient identity and check for drug interactions before dispensing.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'map' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Regional Outbreak Map</h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  Worker Location: {workerDistrict || 'Unknown District'}
                </p>
                <p className="text-xs text-yellow-700">
                  The highlighted area shows the worker's registered location and current outbreak status
                </p>
              </div>
            </div>
          </div>
          <InteractiveOutbreakMap 
            highlightedDistrict={workerDistrict}
            onDistrictSelect={(district) => console.log('Selected district:', district)}
          />
        </div>
      )}
    </div>
  );
};

export default WorkerMedicalHistory;