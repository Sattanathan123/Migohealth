import React from 'react';
import { useLanguage } from '../utils/LanguageContext';

const HealthStatusBadge = ({ status, size = 'md' }) => {
  const { t } = useLanguage();
  
  const getStatusConfig = (status) => {
    switch (status?.toUpperCase()) {
      case 'GREEN':
        return {
          color: 'bg-green-500',
          textColor: 'text-white',
          label: t('healthStatus.healthy'),
          emoji: '🟢'
        };
      case 'ORANGE':
        return {
          color: 'bg-orange-500',
          textColor: 'text-white',
          label: t('healthStatus.moderate'),
          emoji: '🟠'
        };
      case 'RED':
        return {
          color: 'bg-red-500',
          textColor: 'text-white',
          label: t('healthStatus.critical'),
          emoji: '🔴'
        };
      default:
        return {
          color: 'bg-gray-500',
          textColor: 'text-white',
          label: t('healthStatus.unknown'),
          emoji: '⚪'
        };
    }
  };

  const getSizeClasses = (size) => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'lg':
        return 'px-4 py-2 text-base';
      default:
        return 'px-3 py-1 text-sm';
    }
  };

  const config = getStatusConfig(status);
  const sizeClasses = getSizeClasses(size);

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${config.color} ${config.textColor} ${sizeClasses}`}>
      <span className="mr-1">{config.emoji}</span>
      {config.label}
    </span>
  );
};

export default HealthStatusBadge;