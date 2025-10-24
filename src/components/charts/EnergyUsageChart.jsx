import React from 'react';
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', Produced: 590, Consumed: 800, amt: 1400 },
  { name: 'Feb', Produced: 868, Consumed: 967, amt: 1506 },
  { name: 'Mar', Produced: 1397, Consumed: 1098, amt: 989 },
  { name: 'Apr', Produced: 1480, Consumed: 1200, amt: 1228 },
  { name: 'May', Produced: 1520, Consumed: 1108, amt: 1100 },
  { name: 'Jun', Produced: 1400, Consumed: 680, amt: 1700 },
];

const EnergyUsageChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Energy Production vs. Consumption</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 80,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="Consumed" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="Produced" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnergyUsageChart;
