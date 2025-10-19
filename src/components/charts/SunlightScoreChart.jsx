import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  { subject: 'North', A: 120, B: 110, fullMark: 150 },
  { subject: 'East', A: 98, B: 130, fullMark: 150 },
  { subject: 'South', A: 86, B: 130, fullMark: 150 },
  { subject: 'West', A: 99, B: 100, fullMark: 150 },
  { subject: 'Roof Angle', A: 85, B: 90, fullMark: 150 },
  { subject: 'Shading', A: 65, B: 85, fullMark: 150 },
];

const SunlightScoreChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Sunlight Score</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Score" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SunlightScoreChart;
