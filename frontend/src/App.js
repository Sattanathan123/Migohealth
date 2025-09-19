import React, { useState } from 'react';
import { LanguageProvider } from './utils/LanguageContext';
import PWAInstallPrompt from './components/PWAInstallPrompt';
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
import HospitalDashboard from './components/HospitalDashboard';
import PharmacyDashboard from './components/PharmacyDashboard';
import PublicWorkerView from './components/PublicWorkerView';

function App() {
  // Check if URL is for public worker view
  const isPublicWorkerView = window.location.pathname.startsWith('/worker/');
  const [currentPage, setCurrentPage] = useState(isPublicWorkerView ? 'public-worker' : 'simple-home');
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
    } else if (role === 'hospital') {
      setCurrentPage('hospital');
    } else if (role === 'pharmacy') {
      setCurrentPage('pharmacy');
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
    setCurrentPage('simple-home');
  };

  const handleBack = () => {
    setCurrentPage('simple-home');
    setWorkerData(null);
    setDoctorData(null);
    setSelectedRole('');
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
      {currentPage === 'simple-home' && <SimpleHomePage onRoleSelect={handleRoleSelect} />}
      {currentPage === 'worker-portal' && <WorkerPortal onBack={handleBack} />}
      {currentPage === 'scanner' && <QRScanner onScanSuccess={handleScanSuccess} onBack={handleBack} />}
      {currentPage === 'details' && <WorkerDetails worker={workerData} onBack={handleBack} />}
      {currentPage === 'register' && <WorkerRegistration onRegistrationSuccess={handleRegistrationSuccess} onBack={handleBack} />}
      {currentPage === 'health-card' && <HealthCard worker={workerData} onBack={handleBack} />}
      {currentPage === 'doctor-register' && <DoctorRegistration onRegistrationSuccess={handleDoctorRegistrationSuccess} onBack={handleBack} onSwitchToLogin={handleSwitchToLogin} />}
      {currentPage === 'doctor-login' && <DoctorLogin onLoginSuccess={handleDoctorLoginSuccess} onBack={handleBack} onSwitchToRegister={handleSwitchToRegister} />}
      {currentPage === 'doctor-dashboard' && <DoctorDashboard doctor={doctorData} onLogout={handleDoctorLogout} />}
      {currentPage === 'health-dept' && <HealthDeptDashboard onBack={handleBack} />}
      {currentPage === 'hospital' && <HospitalDashboard onBack={handleBack} />}
      {currentPage === 'pharmacy' && <PharmacyDashboard onBack={handleBack} />}
      {currentPage === 'public-worker' && <PublicWorkerView />}
      </div>
      <PWAInstallPrompt />
    </LanguageProvider>
  );
}

export default App;