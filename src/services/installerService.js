const getOverview = async (installerId) => {
  console.log(`Fetching overview for installer ${installerId}`);
  // Mock data
  return Promise.resolve({
    newLeads: 12,
    pendingInstallations: 5,
    totalEarnings: 4500,
  });
};

const getCustomerLeads = async (installerId) => {
  console.log(`Fetching customer leads for installer ${installerId}`);
  // Mock data
  return Promise.resolve([
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
  ]);
};

const getRoofReports = async (installerId) => {
  console.log(`Fetching roof reports for installer ${installerId}`);
  // Mock data
  return Promise.resolve([
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
  ]);
};

export const installerService = {
  getOverview,
  getCustomerLeads,
  getRoofReports,
};
