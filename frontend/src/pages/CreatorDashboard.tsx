import React, { useEffect, useState } from 'react';
import { productApi } from '../services/api';
import { LayoutDashboard, Package, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

// Define the shape of our dashboard stats
interface DashboardStats {
  totalRevenue: number;
  activeListings: number;
  salesGrowth: string;
  lowStockCount: number;
}

const CreatorDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real scenario, you'd have a specific /stats endpoint
        // For now, we simulate aggregate data from the inventory
        const { data } = await productApi.fetchInventory();
        setStats({
          totalRevenue: 12450.00,
          activeListings: data.length,
          salesGrowth: "+12.5%",
          lowStockCount: 3
        });
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading Palace Intelligence...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 1. Main Content Area */}
      <div className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Creator Dashboard</h1>
          <p className="text-gray-600">Overview of your performance in the Palace.</p>
        </header>

        {/* 2. Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Revenue" value={`$${stats?.totalRevenue}`} icon={<DollarSign className="text-green-600" />} />
          <StatCard title="Active Listings" value={stats?.activeListings} icon={<Package className="text-blue-600" />} />
          <StatCard title="Sales Growth" value={stats?.salesGrowth} icon={<TrendingUp className="text-purple-600" />} />
          <StatCard title="Low Stock" value={stats?.lowStockCount} icon={<AlertCircle className="text-red-600" />} color="bg-red-50" />
        </div>

        {/* 3. Visualized Data Placeholder */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Sales Performance (30 Days)</h3>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-400 italic">
            [Chart Component Integration (e.g., Recharts or ApexCharts)]
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for clean organization
const StatCard = ({ title, value, icon, color = "bg-white" }: any) => (
  <div className={`${color} p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between`}>
    <div>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
    <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
  </div>
);

export default CreatorDashboard;
