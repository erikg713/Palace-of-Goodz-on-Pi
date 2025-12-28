import { useState, useEffect } from 'react';
import { authApi } from '../services/api';
import { ShoppingBag, ShieldCheck, Heart, Package } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await authApi.getProfile();
        setUser(data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="p-20 text-center text-gray-500">Loading your Palace profile...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* 1. Welcome Header */}
      <header className="bg-brand text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'Guest'}!</h1>
        <p className="opacity-80 mt-2">Manage your orders and security settings.</p>
      </header>

      {/* 2. Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          icon={<Package className="text-blue-500" />} 
          label="Active Orders" 
          value="2" 
        />
        <DashboardCard 
          icon={<Heart className="text-red-500" />} 
          label="Wishlist" 
          value="12" 
        />
        <DashboardCard 
          icon={<ShoppingBag className="text-purple-500" />} 
          label="Total Spent" 
          value="$1,240.50" 
        />
        <DashboardCard 
          icon={<ShieldCheck className="text-green-500" />} 
          label="Security Status" 
          value="Protected" 
        />
      </div>

      {/* 3. Recent Orders Table */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
          <button className="text-accent font-medium hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <OrderRow id="#PG-8821" date="Oct 24, 2025" status="Shipped" amount="$450.00" />
              <OrderRow id="#PG-8790" date="Oct 20, 2025" status="Delivered" amount="$120.00" />
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

// Helper Components
const DashboardCard = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const OrderRow = ({ id, date, status, amount }) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="p-4 font-medium text-gray-700">{id}</td>
    <td className="p-4 text-gray-600">{date}</td>
    <td className="p-4">
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">{status}</span>
    </td>
    <td className="p-4 text-right font-bold text-gray-900">{amount}</td>
  </tr>
);

export default Dashboard;
