import React from 'react';

const SolarLeaderboard = () => {
  // Dummy data for the leaderboard
  const leaderboardData = [
    { id: 1, county: 'Nairobi', score: 5000 },
    { id: 2, county: 'Mombasa', score: 4500 },
    { id: 3, county: 'Kisumu', score: 4200 },
    { id: 4, county: 'Nakuru', score: 3800 },
    { id: 5, county: 'Eldoret', score: 3500 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Solar Leaderboard</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Rank
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              County
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Score
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {leaderboardData.map((item, index) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.county}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SolarLeaderboard;
