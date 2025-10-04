import React from 'react';
import StatisticCard from './StatisticCard';

const WildlifeStatistics = () => {
  // Using emojis for icons as seen in the image for simplicity
  const statistics = [
    { icon: '🐯', count: 163, label: 'Tiger' },
    { icon: '🦏', count: 67, label: 'Mammal' },
    { icon: '🐦', count: 450, label: 'Bird Species' },
  ];

  return (
    <div className="wildlife-stats-panel">
      {statistics.map((stat, index) => (
        <StatisticCard
          key={index}
          icon={stat.icon}
          count={stat.count}
          label={stat.label}
        />
      ))}
    </div>
  );
};

export default WildlifeStatistics;