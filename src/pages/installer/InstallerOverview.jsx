
import React, { useState, useEffect } from "react";
import Card from "../../components/ui/OnboardingCard";
import { DollarSign, Users, Zap } from "lucide-react";
import EnergyUsageChart from "../../components/charts/EnergyUsageChart";
import { useAuth } from "../../context/AuthContext";
import { installerService } from "../../services/installerService";
import Loader from "../../components/common/Loader";

const InstallerOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverviewData = async () => {
      if (!user) return;
      try {
        setLoading(true);
        // const data = await installerService.getOverview(user.id);
        // setStats(data);

        // Mock data for now
        setTimeout(() => {
          setStats({
            newLeads: 12,
            pendingInstallations: 5,
            totalEarnings: 4500,
          });
          setLoading(false);
        }, 1000);

      } catch (err) {
        setError("Failed to fetch overview data.");
        console.error(err);
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!stats) {
    return <div className="p-6">No overview data available.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newLeads}</div>
            <p className="text-xs text-muted-foreground">+5 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Installations
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.pendingInstallations}
            </div>
            <p className="text-xs text-muted-foreground">2 waiting for parts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Earnings (Monthly)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalEarnings}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <EnergyUsageChart />
        </CardContent>
      </Card>
    </div>
  );
};

export default InstallerOverview;
