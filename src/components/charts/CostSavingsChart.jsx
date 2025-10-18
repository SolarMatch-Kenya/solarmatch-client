import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', 'Savings': 200 },
  { name: 'Feb', 'Savings': 300 },
  { name: 'Mar', 'Savings': 400 },
  { name: 'Apr', 'Savings': 350 },
  { name: 'May', 'Savings': 500 },
  { name: 'Jun', 'Savings': 450 },
  { name: 'Jul', 'Savings': 600 },
];

const CostSavingsChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Cost Savings</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
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
          <Line type="monotone" dataKey="Savings" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CostSavingsChart;
