import React, { useState, useEffect } from 'react';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already dismissed
  if (localStorage.getItem('pwa-install-dismissed') === 'true') {
    return null;
  }

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm mx-auto">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1">Install MigoHealth</h3>
          <p className="text-xs text-blue-100 mb-3">
            Install our app for quick access to your health records
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleInstallClick}
              className="bg-white text-blue-600 px-3 py-1 rounded text-xs font-medium hover:bg-blue-50"
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="text-blue-100 px-3 py-1 rounded text-xs hover:text-white"
            >
              Not now
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-blue-100 hover:text-white ml-2"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;