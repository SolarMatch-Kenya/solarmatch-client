import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', 'CO2 Reduced': 4000 },
  { name: 'Feb', 'CO2 Reduced': 3000 },
  { name: 'Mar', 'CO2 Reduced': 2000 },
  { name: 'Apr', 'CO2 Reduced': 2780 },
  { name: 'May', 'CO2 Reduced': 1890 },
  { name: 'Jun', 'CO2 Reduced': 2390 },
  { name: 'Jul', 'CO2 Reduced': 3490 },
];

const CO2ReductionChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">CO2 Reduction</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="CO2 Reduced" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CO2ReductionChart;
