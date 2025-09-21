import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import HealthStatusBadge from './HealthStatusBadge';

const HealthCard = ({ worker, onBack }) => {
  const qrRef = useRef();
  const cardRef = useRef();

  useEffect(() => {
    if (worker && qrRef.current) {
      const qrData = `Name: ${worker.name}\nHealth ID: ${worker.healthId}\nAge: ${worker.age}\nGender: ${worker.gender}\nOrigin: ${worker.originState}\nIssued by: Kerala Health Dept`;
      
      QRCode.toCanvas(qrRef.current, qrData, {
        width: 150,
        margin: 1,
        errorCorrectionLevel: 'M',
        type: 'image/png',
        quality: 0.92,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }).catch(err => {
        console.error('QR Code generation failed:', err);
      });
    }
  }, [worker]);

  const downloadCard = () => {
    // Convert canvas to image
    const qrDataURL = qrRef.current ? qrRef.current.toDataURL() : '';
    
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Health ID Card - ${worker.name}</title>
          <style>
            body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
            .health-card { max-width: 400px; margin: 0 auto; background: linear-gradient(to bottom right, #eff6ff, #e0e7ff); padding: 1.5rem; border-radius: 0.5rem; border: 2px solid #bfdbfe; }
            .text-center { text-align: center; }
            .mb-4 { margin-bottom: 1rem; }
            .text-lg { font-size: 1.125rem; }
            .font-bold { font-weight: 700; }
            .text-blue-800 { color: #1e40af; }
            .text-md { font-size: 1rem; }
            .font-semibold { font-weight: 600; }
            .text-blue-700 { color: #1d4ed8; }
            .flex { display: flex; }
            .items-start { align-items: flex-start; }
            .space-x-4 > * + * { margin-left: 1rem; }
            .passport-photo { width: 80px; height: 96px; object-fit: cover; border: 2px solid #93c5fd; border-radius: 4px; }
            .flex-1 { flex: 1; }
            .text-gray-800 { color: #1f2937; }
            .text-sm { font-size: 0.875rem; }
            .text-gray-600 { color: #4b5563; }
            .font-medium { font-weight: 500; }
            .text-gray-700 { color: #374151; }
            .mb-2 { margin-bottom: 0.5rem; }
            .bg-white { background-color: white; }
            .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
            .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
            .rounded { border-radius: 0.25rem; }
            .border { border: 1px solid #d1d5db; }
            .justify-center { justify-content: center; }
            .mt-4 { margin-top: 1rem; }
            .text-xs { font-size: 0.75rem; }
            .text-gray-500 { color: #6b7280; }
            .qr-image { width: 120px; height: 120px; border: 1px solid #d1d5db; border-radius: 0.25rem; }
          </style>
        </head>
        <body>
          <div class="health-card" style="width: 420px; min-height: 280px; background: white; border-radius: 12px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); overflow: hidden;">
            <!-- Header -->
            <div style="background: linear-gradient(to right, #059669, #0f766e); padding: 1rem 1.5rem; position: relative;">
              <div style="position: absolute; top: 0; right: 0; width: 8rem; height: 8rem; background: white; opacity: 0.1; border-radius: 50%; margin-right: -4rem; margin-top: -4rem;"></div>
              <div style="position: relative; z-index: 10;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div>
                    <h2 style="color: white; font-size: 1.125rem; font-weight: bold; margin: 0;">KERALA HEALTH ID</h2>
                    <p style="color: #a7f3d0; font-size: 0.75rem; margin: 0;">Digital Health Record System</p>
                  </div>
                  <div style="width: 3rem; height: 3rem; background: white; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center;">
                    <span style="color: #059669; font-weight: bold; font-size: 0.875rem;">KL</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 1.5rem;">
              <div style="display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.5rem;">
                <!-- Photo -->
                <div style="flex-shrink: 0;">
                  ${worker.photoUrl ? `<img src="${worker.photoUrl}" alt="${worker.name}" style="width: 5rem; height: 6rem; object-fit: cover; border-radius: 0.5rem; border: 2px solid #a7f3d0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);" />` : `<div style="width: 5rem; height: 6rem; background: #f3f4f6; border-radius: 0.5rem; border: 2px solid #a7f3d0; display: flex; align-items: center; justify-content: center;"><span style="color: #9ca3af; font-size: 0.75rem;">Photo</span></div>`}
                </div>
                
                <!-- Details -->
                <div style="flex: 1;">
                  <h3 style="font-size: 1.25rem; font-weight: bold; color: #111827; margin: 0 0 0.25rem 0;">${worker.name}</h3>
                  <div style="margin-bottom: 0.25rem;">
                    <span style="font-size: 0.875rem; color: #4b5563;">Age: <span style="font-weight: 500; color: #1f2937;">${worker.age}</span></span>
                    <span style="font-size: 0.875rem; color: #4b5563; margin-left: 1rem;">Gender: <span style="font-weight: 500; color: #1f2937;">${worker.gender}</span></span>
                  </div>
                  <p style="font-size: 0.875rem; color: #4b5563; margin: 0;">Origin: <span style="font-weight: 500; color: #1f2937;">${worker.originState}</span></p>
                </div>
                
                <!-- QR Code -->
                <div style="flex-shrink: 0; text-align: center;">
                  <img src="${qrDataURL}" style="width: 150px; height: 150px; border: 1px solid #e5e7eb; border-radius: 0.5rem; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); margin-bottom: 0.25rem; image-rendering: pixelated;" alt="QR Code" />
                  <p style="font-size: 0.75rem; color: #6b7280; margin: 0;">Scan QR</p>
                </div>
              </div>
              
              <!-- Health ID -->
              <div style="background: linear-gradient(to right, #ecfdf5, #f0fdfa); border-radius: 0.5rem; padding: 1rem; border: 1px solid #a7f3d0;">
                <div style="text-align: center;">
                  <p style="font-size: 0.75rem; font-weight: 500; color: #047857; margin: 0 0 0.25rem 0;">HEALTH ID NUMBER</p>
                  <p style="font-size: 1.125rem; font-family: monospace; font-weight: bold; color: #065f46; letter-spacing: 0.05em; margin: 0;">${worker.healthId}</p>
                </div>
              </div>
              
              <!-- Footer -->
              <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid #e5e7eb;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <p style="font-size: 0.75rem; color: #6b7280; margin: 0;">Government of Kerala</p>
                  <p style="font-size: 0.75rem; color: #6b7280; margin: 0;">Health Department</p>
                </div>
              </div>
            </div>
          </div>
          <script>window.print(); window.close();</script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  };

  if (!worker) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Health ID Card</h2>
            <div className="flex space-x-2">
              <button
                onClick={downloadCard}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
              >
                Print/Save Card
              </button>
              <button onClick={onBack} className="text-gray-600 hover:text-gray-800">← Back</button>
            </div>
          </div>

          <div ref={cardRef} className="health-card bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg border-2 border-blue-200">
            <div className="text-center mb-4">
              <img 
                src="https://www.madhyamam.com/h-upload/2023/05/25/1987330-health-department-logo.jpg" 
                alt="Kerala Health Department" 
                className="w-16 h-16 mx-auto mb-2 object-contain"
              />
              <h3 className="text-lg font-bold text-blue-800">Kerala Migrant Worker</h3>
              <h4 className="text-md font-semibold text-blue-700">Digital Health ID</h4>
            </div>

            <div className="flex items-start space-x-4 mb-4">
              {worker.photoUrl && (
                <img
                  src={worker.photoUrl}
                  alt={worker.name}
                  className="passport-photo"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-800">{worker.name}</h3>
                  <HealthStatusBadge status={worker.healthStatus} size="sm" />
                </div>
                <p className="text-sm text-gray-600">Age: {worker.age} | {worker.gender}</p>
                <p className="text-sm text-gray-600">From: {worker.originState}</p>
              </div>
            </div>

            <div className="text-center mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Health ID</p>
              <p className="text-lg font-bold text-blue-800 bg-white px-3 py-1 rounded border">
                {worker.healthId}
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Scan QR Code</p>
              <div className="flex justify-center">
                <canvas ref={qrRef} className="border border-gray-300 rounded" style={{imageRendering: 'pixelated'}}></canvas>
              </div>
            </div>

            <div className="mt-4 text-center flex items-center justify-center space-x-2">
              <img 
                src="https://www.madhyamam.com/h-upload/2023/05/25/1987330-health-department-logo.jpg" 
                alt="Kerala Health Department" 
                className="w-4 h-4 object-contain"
              />
              <p className="text-xs text-gray-500">
                Government of Kerala | Health Department
              </p>
            </div>
          </div>

          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-green-800 font-medium">Registration Successful</span>
            </div>
            <p className="text-green-700 text-sm mt-1">
              Health ID card generated successfully. Save this QR code for future use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthCard;