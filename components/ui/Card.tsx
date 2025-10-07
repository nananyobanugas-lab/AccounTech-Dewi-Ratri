
import React from 'react';

interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'increase' | 'decrease';
}

const Card: React.FC<CardProps> = ({ title, value, icon, change, changeType }) => {
  const changeColor = changeType === 'increase' ? 'text-green-500' : 'text-red-500';
  const changeIcon = changeType === 'increase' ? '▲' : '▼';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="text-primary-500">{icon}</div>
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        {change && (
          <p className={`text-sm mt-1 ${changeColor} flex items-center`}>
            {changeIcon} {change}
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
