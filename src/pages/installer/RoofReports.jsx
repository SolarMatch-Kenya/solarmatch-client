
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { installerService } from "../../services/installerService";
import Loader from "../../components/common/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RoofReports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoofReports = async () => {
      if (!user) return;
      try {
        setLoading(true);
        // const data = await installerService.getRoofReports(user.id);
        // setReports(data);

        // Mock data for now
        setTimeout(() => {
          setReports([
            {
              id: "r1",
              customerName: "John Doe",
              address: "123 Main St, Nairobi",
              reportDate: "2023-10-20",
              status: "Completed",
              score: 85,
            },
            {
              id: "r2",
              customerName: "Jane Smith",
              address: "456 Beach Rd, Mombasa",
              reportDate: "2023-10-18",
              status: "Pending Review",
              score: 70,
            },
            {
              id: "r3",
              customerName: "Peter Jones",
              address: "789 Lake View, Kisumu",
              reportDate: "2023-10-15",
              status: "Completed",
              score: 92,
            },
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch roof reports.");
        console.error(err);
        setLoading(false);
      }
    };

    fetchRoofReports();
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Roof Reports</h2>
      <Card>
        <CardHeader>
          <CardTitle>Your Roof Analysis Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {reports.length === 0 ? (
            <p>No roof reports available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Customer Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Report Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Sunlight Score
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {report.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {report.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {report.reportDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {report.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {report.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RoofReports;
