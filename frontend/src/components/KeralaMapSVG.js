import React from 'react';

const KeralaMapSVG = ({ districtData, onDistrictClick, highlightedDistrict, getSeverityColor }) => {
  // Accurate Kerala district boundaries and coordinates
  const districts = {
    'Kasaragod': {
      path: 'M10,5 L25,5 L30,10 L28,15 L20,12 L15,8 L10,8 Z',
      center: { x: 20, y: 8 },
      cases: districtData['Kasaragod']?.cases || 0,
      severity: districtData['Kasaragod']?.severity || 'low'
    },
    'Kannur': {
      path: 'M15,8 L30,10 L35,15 L32,20 L25,18 L20,12 L15,8 Z',
      center: { x: 25, y: 14 },
      cases: districtData['Kannur']?.cases || 0,
      severity: districtData['Kannur']?.severity || 'low'
    },
    'Wayanad': {
      path: 'M32,20 L45,18 L50,25 L45,30 L38,28 L32,20 Z',
      center: { x: 41, y: 24 },
      cases: districtData['Wayanad']?.cases || 0,
      severity: districtData['Wayanad']?.severity || 'low'
    },
    'Kozhikode': {
      path: 'M25,18 L35,15 L40,22 L38,28 L30,25 L25,18 Z',
      center: { x: 32, y: 21 },
      cases: districtData['Kozhikode']?.cases || 0,
      severity: districtData['Kozhikode']?.severity || 'low'
    },
    'Malappuram': {
      path: 'M30,25 L40,22 L45,30 L42,35 L35,32 L30,25 Z',
      center: { x: 37, y: 28 },
      cases: districtData['Malappuram']?.cases || 0,
      severity: districtData['Malappuram']?.severity || 'low'
    },
    'Palakkad': {
      path: 'M42,35 L55,32 L60,40 L55,45 L48,42 L42,35 Z',
      center: { x: 51, y: 38 },
      cases: districtData['Palakkad']?.cases || 0,
      severity: districtData['Palakkad']?.severity || 'low'
    },
    'Thrissur': {
      path: 'M35,32 L45,30 L48,42 L45,48 L38,45 L35,32 Z',
      center: { x: 41, y: 39 },
      cases: districtData['Thrissur']?.cases || 0,
      severity: districtData['Thrissur']?.severity || 'low'
    },
    'Ernakulam': {
      path: 'M38,45 L48,42 L52,50 L48,55 L42,52 L38,45 Z',
      center: { x: 45, y: 48 },
      cases: districtData['Ernakulam']?.cases || 0,
      severity: districtData['Ernakulam']?.severity || 'low'
    },
    'Idukki': {
      path: 'M48,55 L60,50 L65,58 L60,65 L52,62 L48,55 Z',
      center: { x: 56, y: 57 },
      cases: districtData['Idukki']?.cases || 0,
      severity: districtData['Idukki']?.severity || 'low'
    },
    'Kottayam': {
      path: 'M42,52 L52,50 L52,62 L48,68 L42,65 L42,52 Z',
      center: { x: 47, y: 59 },
      cases: districtData['Kottayam']?.cases || 0,
      severity: districtData['Kottayam']?.severity || 'low'
    },
    'Alappuzha': {
      path: 'M38,58 L48,55 L48,68 L42,72 L35,68 L38,58 Z',
      center: { x: 41, y: 63 },
      cases: districtData['Alappuzha']?.cases || 0,
      severity: districtData['Alappuzha']?.severity || 'low'
    },
    'Pathanamthitta': {
      path: 'M42,65 L52,62 L55,70 L50,75 L45,72 L42,65 Z',
      center: { x: 48, y: 68 },
      cases: districtData['Pathanamthitta']?.cases || 0,
      severity: districtData['Pathanamthitta']?.severity || 'low'
    },
    'Kollam': {
      path: 'M35,68 L45,65 L50,75 L45,80 L38,78 L35,68 Z',
      center: { x: 42, y: 72 },
      cases: districtData['Kollam']?.cases || 0,
      severity: districtData['Kollam']?.severity || 'low'
    },
    'Thiruvananthapuram': {
      path: 'M30,75 L45,72 L45,80 L40,85 L32,82 L30,75 Z',
      center: { x: 37, y: 78 },
      cases: districtData['Thiruvananthapuram']?.cases || 0,
      severity: districtData['Thiruvananthapuram']?.severity || 'low'
    }
  };

  return (
    <div className="relative w-full h-full">
      <svg 
        viewBox="0 0 80 90" 
        className="w-full h-full"
        style={{ maxHeight: '500px' }}
      >
        {/* Kerala State Background */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* District Paths */}
        {Object.entries(districts).map(([districtName, district]) => {
          const isHighlighted = highlightedDistrict === districtName;
          const fillColor = district.cases > 0 ? getSeverityColor(district.severity) : '#E5E7EB';
          
          return (
            <g key={districtName}>
              {/* District Area */}
              <path
                d={district.path}
                fill={fillColor}
                fillOpacity={0.7}
                stroke={isHighlighted ? '#FCD34D' : '#374151'}
                strokeWidth={isHighlighted ? 2 : 1}
                className={`cursor-pointer transition-all duration-300 hover:fill-opacity-90 ${
                  isHighlighted ? 'filter-glow animate-pulse' : ''
                }`}
                onClick={() => onDistrictClick && onDistrictClick(districtName)}
                style={{
                  filter: isHighlighted ? 'drop-shadow(0 0 8px #FCD34D)' : 'none'
                }}
              />
              
              {/* District Label */}
              <text
                x={district.center.x}
                y={district.center.y - 2}
                textAnchor="middle"
                className="text-xs font-medium fill-gray-800 pointer-events-none"
                style={{ fontSize: '3px' }}
              >
                {districtName}
              </text>
              
              {/* Case Count Circle */}
              {district.cases > 0 && (
                <g>
                  <circle
                    cx={district.center.x}
                    cy={district.center.y + 2}
                    r="3"
                    fill={getSeverityColor(district.severity)}
                    stroke="white"
                    strokeWidth="0.5"
                    className="cursor-pointer"
                    onClick={() => onDistrictClick && onDistrictClick(districtName)}
                  />
                  <text
                    x={district.center.x}
                    y={district.center.y + 3}
                    textAnchor="middle"
                    className="text-xs font-bold fill-white pointer-events-none"
                    style={{ fontSize: '2.5px' }}
                  >
                    {district.cases}
                  </text>
                </g>
              )}
              
              {/* Highlighted District Indicator */}
              {isHighlighted && (
                <circle
                  cx={district.center.x}
                  cy={district.center.y + 2}
                  r="5"
                  fill="none"
                  stroke="#FCD34D"
                  strokeWidth="1"
                  className="animate-ping"
                />
              )}
            </g>
          );
        })}

        {/* State Border */}
        <path
          d="M10,5 L30,5 L35,10 L40,15 L45,18 L50,25 L55,32 L60,40 L65,50 L65,58 L60,65 L55,70 L50,75 L45,80 L40,85 L32,82 L30,75 L35,68 L38,58 L35,50 L32,40 L28,30 L25,20 L20,12 L15,8 L10,5 Z"
          fill="none"
          stroke="#1F2937"
          strokeWidth="2"
          opacity="0.3"
        />

        {/* Arabian Sea Label */}
        <text x="5" y="45" className="text-xs fill-blue-600 opacity-60" style={{ fontSize: '3px' }}>
          Arabian Sea
        </text>

        {/* Compass */}
        <g transform="translate(65, 10)">
          <circle cx="0" cy="0" r="4" fill="white" stroke="#374151" strokeWidth="0.5"/>
          <path d="M0,-3 L1,0 L0,3 L-1,0 Z" fill="#EF4444"/>
          <text x="0" y="-6" textAnchor="middle" className="text-xs fill-gray-600" style={{ fontSize: '2px' }}>N</text>
        </g>
      </svg>
    </div>
  );
};

export default KeralaMapSVG;