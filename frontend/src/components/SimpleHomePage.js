import React, { useState } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import AnimatedCounter from './AnimatedCounter';

const SimpleHomePage = ({ onRoleSelect }) => {
  const { language, changeLanguage, t } = useLanguage();
  const [showPortalDropdown, setShowPortalDropdown] = useState(false);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="navbar bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="navbar-brand w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg p-1">
                <img 
                  src="https://www.madhyamam.com/h-upload/2023/05/25/1987330-health-department-logo.jpg" 
                  alt="Kerala Health Department" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
                <p className="text-sm text-blue-700 font-bold">"Bridging Health, Empowering Lives"</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-8">
                <button onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap">{t('home')}</button>
                <button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap">{t('aboutUs')}</button>
                <button onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap">{t('services')}</button>
                <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap">{t('contact')}</button>
              </div>
              
              <select 
                value={language} 
                onChange={(e) => changeLanguage(e.target.value)}
                className="px-4 py-2 border-2 border-blue-300 rounded-lg text-sm bg-blue-50 font-medium text-blue-800 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="ml">മലയാളം</option>
              </select>
              
              <div className="relative">
                <button
                  onClick={() => setShowPortalDropdown(!showPortalDropdown)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 whitespace-nowrap"
                >
                  <span>{t('choosePortal')}</span>
                  <svg className={`w-4 h-4 transition-transform ${showPortalDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                  
                  {showPortalDropdown && (
                    <div className="absolute top-full mt-2 right-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                      <div className="py-2">
                        <button
                          onClick={() => { onRoleSelect('doctor'); setShowPortalDropdown(false); }}
                          className="w-full px-6 py-4 text-left hover:bg-blue-50 transition-colors flex items-center space-x-4"
                        >
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 font-bold">DR</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">Doctor Dashboard</div>
                            <div className="text-sm text-gray-500">Access patient records & prescriptions</div>
                          </div>
                        </button>
                        
                        <button
                          onClick={() => { onRoleSelect('worker'); setShowPortalDropdown(false); }}
                          className="w-full px-6 py-4 text-left hover:bg-green-50 transition-colors flex items-center space-x-4"
                        >
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <span className="text-green-600 font-bold">WR</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{t('workerPortal')}</div>
                            <div className="text-sm text-gray-500">Scan QR codes & access records</div>
                          </div>
                        </button>
                        
                        <button
                          onClick={() => { onRoleSelect('hospital'); setShowPortalDropdown(false); }}
                          className="w-full px-6 py-4 text-left hover:bg-teal-50 transition-colors flex items-center space-x-4"
                        >
                          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                            <span className="text-teal-600 font-bold">HP</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{t('hospitalPortal')}</div>
                            <div className="text-sm text-gray-500">Register workers & manage records</div>
                          </div>
                        </button>
                        
                        <button
                          onClick={() => { onRoleSelect('health-dept'); setShowPortalDropdown(false); }}
                          className="w-full px-6 py-4 text-left hover:bg-purple-50 transition-colors flex items-center space-x-4"
                        >
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <span className="text-purple-600 font-bold">HD</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{t('healthDept')}</div>
                            <div className="text-sm text-gray-500">View analytics & generate reports</div>
                          </div>
                        </button>
                        
                        <button
                          onClick={() => { onRoleSelect('pharmacy'); setShowPortalDropdown(false); }}
                          className="w-full px-6 py-4 text-left hover:bg-orange-50 transition-colors flex items-center space-x-4"
                        >
                          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <span className="text-orange-600 font-bold">PH</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">Pharmacy Portal</div>
                            <div className="text-sm text-gray-500">Access medical history & prescriptions</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-9 py-3 rounded-lg border border-blue-200 flex items-center justify-center space-x-2">
                <img 
                  src="https://www.madhyamam.com/h-upload/2023/05/25/1987330-health-department-logo.jpg" 
                  alt="Kerala Health Department" 
                  className="w-8 h-8 object-contain"
                />
                <div>
                  <p className="text-sm font-bold text-gray-900 whitespace-nowrap">Government of Kerala</p>
                  <p className="text-xs text-blue-600 font-medium whitespace-nowrap">Health Department</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-semibold text-blue-600 mb-8 shadow-lg">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Live Healthcare Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-8 leading-tight pb-4">
            {t('subtitle')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed overflow-visible">
            Empowering healthcare access through secure, digital health records and QR-based identification system across Kerala
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => setShowPortalDropdown(!showPortalDropdown)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              {t('getStarted')}
            </button>
            <button 
              onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-blue-600 text-blue-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              {t('learnMore')}
            </button>
          </div>
        </div>
      </section>

      {/* Mission Statistics Section */}
      <section className="py-24 bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100 relative">
        <div className="absolute inset-0 bg-white/30"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-sm font-bold text-green-600 mb-6 shadow-lg">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Real-time Impact
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-6">Our Impact in Numbers</h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">Real-time statistics showcasing our mission to digitize healthcare for migrant workers</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
                <AnimatedCounter end={12500} suffix="+" duration={3000} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Workers Registered</h3>
              <p className="text-sm text-gray-600">Migrant workers with digital health IDs</p>
            </div>
            
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
                <AnimatedCounter end={85} suffix="+" duration={2500} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Hospitals Connected</h3>
              <p className="text-sm text-gray-600">Healthcare facilities in our network</p>
            </div>
            
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-2">
                <AnimatedCounter end={45600} suffix="+" duration={3500} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Health Records</h3>
              <p className="text-sm text-gray-600">Digital health records maintained</p>
            </div>
            
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent mb-2">
                <AnimatedCounter end={750} suffix="+" duration={2800} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Healthcare Providers</h3>
              <p className="text-sm text-gray-600">Doctors and medical professionals</p>
            </div>
          </div>
          
          <div className="text-center mt-20">
            <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-xl border border-white/20">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-800 font-bold text-lg">Live Statistics - Updated in Real Time</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('whyChoose')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('whyChooseDesc')}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('secure')}</h3>
              <p className="text-gray-600">{t('secureDesc')}</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('fast')}</h3>
              <p className="text-gray-600">{t('fastDesc')}</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('multiLang')}</h3>
              <p className="text-gray-600">{t('multiLangDesc')}</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('support')}</h3>
              <p className="text-gray-600">{t('supportDesc')}</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
{t('contactTeam')}
            </button>
          </div>
        </div>
      </section>
      
      {/* About Us Section */}
      <section id="about" className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/40"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-sm font-bold text-blue-600 mb-6 shadow-lg">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              About MigoHealth
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-6 pb-3">{t('aboutTitle')}</h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">{t('aboutDesc')}</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">{t('ourMission')}</h3>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {t('missionDesc')}
              </p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-md transition-all duration-300">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-700">
                      <AnimatedCounter end={12500} suffix="+" duration={2500} />
                    </div>
                    <span className="text-gray-700 font-semibold">{t('workersRegistered')}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-300">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-700">
                      <AnimatedCounter end={750} suffix="+" duration={2200} />
                    </div>
                    <span className="text-gray-700 font-semibold">{t('healthcareProviders')}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-300">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-700">
                      <AnimatedCounter end={85} suffix="+" duration={1800} />
                    </div>
                    <span className="text-gray-700 font-semibold">{t('hospitalsConnected')}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <svg className="w-20 h-20 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">{t('govInitiative')}</h4>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {t('govDesc')}
              </p>
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                Trusted State Initiative
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('ourServices')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('servicesDesc')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('workerRegistration')}</h3>
              <p className="text-gray-600 mb-6">{t('workerRegDesc')}</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Aadhar/Passport verification</li>
                <li>• Digital health ID cards</li>
                <li>• Multi-language support</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('healthRecords')}</h3>
              <p className="text-gray-600 mb-6">{t('healthRecordsDesc')}</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Encrypted data storage</li>
                <li>• Real-time synchronization</li>
                <li>• Prescription management</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('analyticsDashboard')}</h3>
              <p className="text-gray-600 mb-6">{t('analyticsDesc')}</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Real-time statistics</li>
                <li>• Health trend analysis</li>
                <li>• Custom reports</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('getInTouch')}</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">{t('touchDesc')}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t('phoneSupport')}</h3>
              <p className="text-gray-600 text-sm mb-3">{t('phoneSupportDesc')}</p>
              <div className="space-y-1">
                <p className="text-gray-800 font-bold text-sm">Helpline: +91-471-2518471</p>
                <p className="text-gray-800 font-bold text-sm">Emergency: 108</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-3">Get detailed assistance via email</p>
              <div className="space-y-1">
                <p className="text-gray-800 font-bold text-sm">support@migohealth.kerala.gov.in</p>
                <p className="text-gray-800 font-bold text-sm">info@health.kerala.gov.in</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Office Hours</h3>
              <p className="text-gray-600 text-sm mb-3">Visit us during working hours</p>
              <div className="space-y-1">
                <p className="text-gray-800 font-bold text-sm">Mon-Fri: 9:00 AM - 5:00 PM</p>
                <p className="text-gray-800 font-bold text-sm">Sat: 9:00 AM - 1:00 PM</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 text-sm mb-3">Kerala Health Department Office</p>
              <div className="space-y-1">
                <p className="text-gray-800 font-bold text-sm">Directorate of Health Services</p>
                <p className="text-gray-800 font-bold text-sm">Thiruvananthapuram - 695001</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Immediate Assistance?</h3>
                <p className="text-gray-600 mb-6">For urgent health record access or emergency situations, contact our dedicated support team available 24/7.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all">
                    Call Emergency Line
                  </button>
                  <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-all">
                    Live Chat Support
                  </button>
                </div>
              </div>
              <div className="text-center">
                <img 
                  src="https://www.madhyamam.com/h-upload/2023/05/25/1987330-health-department-logo.jpg" 
                  alt="Kerala Health Department" 
                  className="w-32 h-32 mx-auto mb-4 object-contain bg-gray-100 rounded-full p-4"
                />
                <h4 className="text-xl font-bold text-gray-900 mb-2">Kerala Health Department</h4>
                <p className="text-gray-600">Official Government Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="https://www.madhyamam.com/h-upload/2023/05/25/1987330-health-department-logo.jpg" 
                  alt="Kerala Health Department" 
                  className="w-8 h-8 object-contain"
                />
                <span className="text-xl font-bold">MigoHealth</span>
              </div>
              <p className="text-gray-400 mb-4">Digital health records for migrant workers across Kerala.</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors text-left">About Us</button></li>
                <li><button onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors text-left">Services</button></li>
                <li><button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors text-left">Contact</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Portals</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => onRoleSelect('doctor')} className="hover:text-white transition-colors text-left">Doctor Dashboard</button></li>
                <li><button onClick={() => onRoleSelect('worker')} className="hover:text-white transition-colors text-left">Worker Portal</button></li>
                <li><button onClick={() => onRoleSelect('hospital')} className="hover:text-white transition-colors text-left">Hospital Portal</button></li>
                <li><button onClick={() => onRoleSelect('health-dept')} className="hover:text-white transition-colors text-left">Health Department</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Kerala Health Department</li>
                <li>Thiruvananthapuram, Kerala</li>
                <li>Phone: +91-471-XXXXXXX</li>
                <li>Email: info@migohealth.kerala.gov.in</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© 2025 Government of Kerala. All rights reserved.</p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SimpleHomePage;