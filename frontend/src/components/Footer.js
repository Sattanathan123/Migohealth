import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© 2025 MigoHealth. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#privacy" className="text-sm text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="text-sm text-gray-300 hover:text-white transition-colors">Terms of Service</a>
            <a href="#contact" className="text-sm text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;