
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { installerService } from "../../services/installerService";
import Loader from "../../components/common/Loader";
import Card from "../../components/ui/OnboardingCard";

const CustomerLeads = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerLeads = async () => {
      if (!user) return;
      try {
        setLoading(true);
        // const data = await installerService.getCustomerLeads(user.id);
        // setLeads(data);

        // Mock data for now
        setTimeout(() => {
          setLeads([
            {
              id: "1",
              name: "John Doe",
              location: "Nairobi",
              potential: "High",
              status: "New",
              contact: "john.doe@example.com",
            },
            {
              id: "2",
              name: "Jane Smith",
              location: "Mombasa",
              potential: "Medium",
              status: "Contacted",
              contact: "jane.smith@example.com",
            },
            {
              id: "3",
              name: "Peter Jones",
              location: "Kisumu",
              potential: "Low",
              status: "Qualified",
              contact: "peter.jones@example.com",
            },
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch customer leads.");
        console.error(err);
        setLoading(false);
      }
    };

    fetchCustomerLeads();
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Customer Leads</h2>
      <Card>
        <CardHeader>
          <CardTitle>Your Leads</CardTitle>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <p>No customer leads available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Potential
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
                      Contact
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {lead.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {lead.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {lead.potential}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {lead.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {lead.contact}
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

export default CustomerLeads;
