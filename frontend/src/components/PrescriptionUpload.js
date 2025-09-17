import React, { useState } from 'react';

const PrescriptionUpload = ({ doctorId }) => {
  const [formData, setFormData] = useState({
    workerHealthId: '',
    prescriptionText: '',
    imageFile: null
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const uploadData = {
        doctorId: doctorId,
        prescriptionText: formData.prescriptionText,
        imageUrl: formData.imageFile ? 'uploaded-image.jpg' : ''
      };

      const response = await fetch(`http://localhost:8081/api/prescriptions/upload/${formData.workerHealthId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData)
      });

      if (response.ok) {
        setSuccess('Prescription uploaded successfully!');
        setFormData({
          workerHealthId: '',
          prescriptionText: '',
          imageFile: null
        });
      } else {
        setError('Failed to upload prescription');
      }
    } catch (err) {
      setError('Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'imageFile') {
      setFormData({
        ...formData,
        imageFile: e.target.files[0]
      });
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
            OCR will automatically extract text from uploaded image
          </p>
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