import React from 'react';
import { motion } from 'framer-motion';

const WorkerPortal = ({ onActionSelect, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🧑🌾</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Worker Portal</h2>
          <p className="text-gray-600">Choose an action to continue</p>
        </div>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onActionSelect('scan')}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            📱 Scan QR Code
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onActionSelect('register')}
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            📝 Register New Worker
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-all"
          >
            ← Back to Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkerPortal;