import React from 'react';

const StatisticCard = ({ icon, count, label }) => {
  return (
    <div className="statistic-card">
      <div className="icon-circle">
        {/* In a real app, 'icon' would be an actual component or image src */}
        <span role="img" aria-label={label.toLowerCase().replace(' ', '-') + ' icon'}>
          {icon}
        </span>
      </div>
      <div className="stat-content">
        <span className="count">{count}</span>
        <span className="label">{label}</span>
      </div>
    </div>
  );
};

export default StatisticCard;