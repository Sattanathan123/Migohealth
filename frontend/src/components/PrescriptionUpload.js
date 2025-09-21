import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const PrescriptionUpload = ({ doctorId }) => {
  const [formData, setFormData] = useState({
    workerHealthId: '',
    prescriptionText: '',
    imageFile: null
  });
  const [loading, setLoading] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store prescription data locally
      const prescriptionData = {
        id: Date.now(),
        doctorId: doctorId,
        workerHealthId: formData.workerHealthId,
        prescriptionText: formData.prescriptionText,
        imageFile: formData.imageFile ? formData.imageFile.name : null,
        timestamp: new Date().toISOString()
      };
      
      // Save to localStorage
      const existingPrescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');
      existingPrescriptions.push(prescriptionData);
      localStorage.setItem('prescriptions', JSON.stringify(existingPrescriptions));
      
      setSuccess('✅ Prescription uploaded successfully!');
      setFormData({
        workerHealthId: '',
        prescriptionText: '',
        imageFile: null
      });
      
    } catch (err) {
      setError('❌ Failed to upload prescription');
    } finally {
      setLoading(false);
    }
  };

  const runOCR = async (imageFile) => {
    console.log('Starting OCR for file:', imageFile.name, 'Size:', imageFile.size, 'Type:', imageFile.type);
    
    // Validate file type
    if (!imageFile.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, etc.)');
      return;
    }
    
    // Validate file size (max 10MB)
    if (imageFile.size > 10 * 1024 * 1024) {
      setError('Image file is too large. Please select a file smaller than 10MB.');
      return;
    }
    
    setOcrLoading(true);
    setOcrProgress(0);
    setError('');
    setSuccess('');
    
    try {
      console.log('Initializing Tesseract...');
      const result = await Tesseract.recognize(
        imageFile,
        'eng',
        {
          logger: m => {
            console.log('OCR Status:', m.status, 'Progress:', m.progress);
            if (m.status === 'recognizing text') {
              setOcrProgress(Math.round(m.progress * 100));
            } else if (m.status === 'loading tesseract core') {
              setOcrProgress(10);
            } else if (m.status === 'initializing tesseract') {
              setOcrProgress(20);
            } else if (m.status === 'loading language traineddata') {
              setOcrProgress(30);
            } else if (m.status === 'initializing api') {
              setOcrProgress(40);
            }
          }
        }
      );
      
      console.log('OCR Complete. Full result:', result);
      console.log('Extracted text:', result.data.text);
      
      const extractedText = result.data.text.trim();
      
      if (extractedText && extractedText.length > 3) {
        setFormData(prev => ({
          ...prev,
          prescriptionText: extractedText
        }));
        setSuccess(`✅ Text extracted successfully! Found ${extractedText.length} characters.`);
      } else {
        setError('⚠️ No readable text found. Try: 1) Better lighting 2) Higher resolution 3) Clearer text');
      }
    } catch (err) {
      console.error('OCR Error Details:', err);
      setError(`❌ OCR failed: ${err.message || 'Unknown error'}. Check console for details.`);
    } finally {
      setOcrLoading(false);
      setOcrProgress(0);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'imageFile') {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        imageFile: file
      });
      
      if (file) {
        runOCR(file);
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Prescription</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Worker Health ID</label>
          <input
            type="text"
            name="workerHealthId"
            value={formData.workerHealthId}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
            placeholder="Enter worker's health ID (e.g., GH-BHR-001-MW-001)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Prescription Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              name="imageFile"
              onChange={handleChange}
              accept="image/*"
              className="hidden"
              id="prescription-upload"
            />
            <label htmlFor="prescription-upload" className="cursor-pointer">
              <div className="text-gray-400 mb-2">
                <span className="text-4xl">📷</span>
              </div>
              <p className="text-sm text-gray-600">
                Click to upload prescription image
              </p>
              {formData.imageFile && (
                <p className="text-sm text-green-600 mt-2">
                  Selected: {formData.imageFile.name}
                </p>
              )}
            </label>
          </div>
          
          {/* OCR Progress Bar - Outside upload area */}
          {ocrLoading && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-800">Processing Image with OCR</span>
                <span className="text-sm text-blue-600">{ocrProgress}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                  style={{width: `${ocrProgress}%`}}
                ></div>
              </div>
              <p className="text-xs text-blue-600 mt-2">Extracting text from prescription image...</p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Prescription Text</label>
          <textarea
            name="prescriptionText"
            value={formData.prescriptionText}
            onChange={handleChange}
            required
            rows="6"
            className="w-full p-3 border rounded-lg"
            placeholder="Enter prescription details or extracted OCR text..."
          />
          <p className="text-xs text-gray-500 mt-1">
            {ocrLoading ? 'Extracting text from image...' : 'OCR will automatically extract text from uploaded image'}
          </p>
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() => formData.imageFile && runOCR(formData.imageFile)}
              disabled={!formData.imageFile || ocrLoading}
              className="text-sm bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 disabled:bg-gray-400"
            >
              {ocrLoading ? 'Processing...' : 'Re-extract Text'}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  prescriptionText: 'Sample prescription text: Take Paracetamol 500mg twice daily for 3 days. Rest and drink plenty of fluids.'
                }));
                setSuccess('Sample text added for testing!');
              }}
              className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Add Sample Text
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Uploading...' : 'Upload Prescription'}
        </button>
      </form>
    </div>
  );
};

export default PrescriptionUpload;