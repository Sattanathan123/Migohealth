import React, { useState } from 'react';
import SimpleHomePage from './components/SimpleHomePage';
import WorkerPortal from './components/WorkerPortal';
import QRScanner from './components/QRScanner';
import WorkerDetails from './components/WorkerDetails';
import WorkerRegistration from './components/WorkerRegistration';
import HealthCard from './components/HealthCard';
import DoctorLogin from './components/DoctorLogin';
import DoctorRegistration from './components/DoctorRegistration';
import DoctorDashboard from './components/DoctorDashboard';
import HealthDeptDashboard from './components/HealthDeptDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [workerData, setWorkerData] = useState(null);
  const [doctorData, setDoctorData] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === 'doctor') {
      setCurrentPage('doctor-register');
    } else if (role === 'worker') {
      setCurrentPage('worker-portal');
    } else if (role === 'health-dept') {
      setCurrentPage('health-dept');
    }
  };

  const handleWorkerPortalSelect = (action) => {
    if (action === 'scan') {
      setCurrentPage('scanner');
    } else if (action === 'register') {
      setCurrentPage('register');
    }
  };

  const handleScanSuccess = (data) => {
    setWorkerData(data);
    setCurrentPage('details');
  };

  const handleRegistrationSuccess = (data) => {
    setWorkerData(data);
    setCurrentPage('health-card');
  };

  const handleDoctorRegistrationSuccess = (doctor) => {
    setCurrentPage('doctor-login');
  };

  const handleDoctorLoginSuccess = (doctor) => {
    setDoctorData(doctor);
    setCurrentPage('doctor-dashboard');
  };

  const handleSwitchToLogin = () => {
    setCurrentPage('doctor-login');
  };

  const handleSwitchToRegister = () => {
    setCurrentPage('doctor-register');
  };

  const handleDoctorLogout = () => {
    setDoctorData(null);
    localStorage.removeItem('doctorToken');
    localStorage.removeItem('doctorId');
    localStorage.removeItem('doctorName');
    setCurrentPage('home');
  };

  const handleBack = () => {
    setCurrentPage('home');
    setWorkerData(null);
    setDoctorData(null);
    setSelectedRole('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'home' && <SimpleHomePage onRoleSelect={handleRoleSelect} />}
      {currentPage === 'worker-portal' && <WorkerPortal onActionSelect={handleWorkerPortalSelect} onBack={handleBack} />}
      {currentPage === 'scanner' && <QRScanner onScanSuccess={handleScanSuccess} onBack={handleBack} />}
      {currentPage === 'details' && <WorkerDetails worker={workerData} onBack={handleBack} />}
      {currentPage === 'register' && <WorkerRegistration onRegistrationSuccess={handleRegistrationSuccess} onBack={handleBack} />}
      {currentPage === 'health-card' && <HealthCard worker={workerData} onBack={handleBack} />}
      {currentPage === 'doctor-register' && <DoctorRegistration onRegistrationSuccess={handleDoctorRegistrationSuccess} onBack={handleBack} onSwitchToLogin={handleSwitchToLogin} />}
      {currentPage === 'doctor-login' && <DoctorLogin onLoginSuccess={handleDoctorLoginSuccess} onBack={handleBack} onSwitchToRegister={handleSwitchToRegister} />}
      {currentPage === 'doctor-dashboard' && <DoctorDashboard doctor={doctorData} onLogout={handleDoctorLogout} />}
      {currentPage === 'health-dept' && <HealthDeptDashboard onBack={handleBack} />}
    </div>
  );
}

export default App;