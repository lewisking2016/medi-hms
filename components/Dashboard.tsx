
import React from 'react';
import { 
  Users, 
  Package, 
  Stethoscope, 
  Bed, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Patient, InventoryItem, Staff, Ward } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface DashboardProps {
  patients: Patient[];
  inventory: InventoryItem[];
  staff: Staff[];
  wards: Ward[];
}

const Dashboard: React.FC<DashboardProps> = ({ patients, inventory, staff, wards }) => {
  const totalBeds = wards.reduce((acc, ward) => acc + ward.capacity, 0);
  const occupiedBeds = wards.reduce((acc, ward) => acc + ward.occupied, 0);
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100);
  
  const lowStockItems = inventory.filter(i => i.stock <= i.minStock);

  const stats = [
    { title: 'Total Patients', value: patients.length, icon: Users, color: 'bg-blue-500', trend: '+12% from last week' },
    { title: 'Staff on Duty', value: staff.filter(s => s.status === 'Active').length, icon: Stethoscope, color: 'bg-emerald-500', trend: 'Adequate coverage' },
    { title: 'Bed Occupancy', value: `${occupancyRate}%`, icon: Bed, color: 'bg-purple-500', trend: `${occupiedBeds}/${totalBeds} beds` },
    { title: 'Inventory Alerts', value: lowStockItems.length, icon: AlertCircle, color: 'bg-orange-500', trend: 'Action required' },
  ];

  const patientTrends = [
    { name: 'Mon', count: 12 },
    { name: 'Tue', count: 18 },
    { name: 'Wed', count: 15 },
    { name: 'Thu', count: 24 },
    { name: 'Fri', count: 20 },
    { name: 'Sat', count: 14 },
    { name: 'Sun', count: 10 },
  ];

  const departmentData = [
    { name: 'Cardio', value: 45 },
    { name: 'Pediatrics', value: 30 },
    { name: 'Emergency', value: 75 },
    { name: 'Oncology', value: 25 },
    { name: 'Surgery', value: 55 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className={`${stat.color} p-3 rounded-xl shadow-lg shadow-current/10`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.title}</span>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
              <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                <TrendingUp size={14} className="text-emerald-500" />
                {stat.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Patient Admission Trends</h3>
            <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={patientTrends}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 text-lg mb-6">Patient Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} layout="vertical" margin={{left: 20}}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-lg">Recent Admissions</h3>
            <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-100">
                  <th className="pb-3 text-sm font-semibold text-slate-400">Patient</th>
                  <th className="pb-3 text-sm font-semibold text-slate-400">MRN</th>
                  <th className="pb-3 text-sm font-semibold text-slate-400">Condition</th>
                  <th className="pb-3 text-sm font-semibold text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {patients.slice(0, 4).map((p) => (
                  <tr key={p.id}>
                    <td className="py-4 text-sm font-medium text-slate-800">{p.name}</td>
                    <td className="py-4 text-sm text-slate-500">{p.mrn}</td>
                    <td className="py-4 text-sm text-slate-500">{p.condition}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">Stable</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-lg">Critical Inventory Alerts</h3>
            <button className="text-orange-600 text-sm font-medium hover:underline">Manage Stock</button>
          </div>
          <div className="space-y-4">
            {lowStockItems.length > 0 ? lowStockItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Package className="text-orange-600" size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-red-600">{item.stock} {item.unit} left</p>
                  <p className="text-xs text-slate-500">Min: {item.minStock}</p>
                </div>
              </div>
            )) : (
              <p className="text-slate-500 text-sm py-8 text-center">No critical stock alerts.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
