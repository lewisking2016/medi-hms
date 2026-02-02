
import React from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Download, Calendar, Filter, FileText } from 'lucide-react';

const Analytics: React.FC = () => {
  const financialData = [
    { month: 'Jan', revenue: 450000, expenses: 380000 },
    { month: 'Feb', revenue: 520000, expenses: 400000 },
    { month: 'Mar', revenue: 480000, expenses: 420000 },
    { month: 'Apr', revenue: 610000, expenses: 450000 },
    { month: 'May', revenue: 550000, expenses: 430000 },
    { month: 'Jun', revenue: 670000, expenses: 480000 },
  ];

  const diagnosisData = [
    { name: 'Infectious', value: 400 },
    { name: 'Chronic', value: 300 },
    { name: 'Surgical', value: 300 },
    { name: 'Trauma', value: 200 },
    { name: 'Other', value: 100 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#6366f1', '#f59e0b', '#94a3b8'];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Insights & Reports</h2>
          <p className="text-slate-500">Comprehensive data analysis for hospital operations</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
            <Calendar size={18} />
            H1 2024
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-medium shadow-sm hover:bg-blue-700 transition-colors">
            <Download size={18} />
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800 text-lg">Financial Performance</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <div className="w-3 h-3 bg-blue-500 rounded-full" /> Revenue
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <div className="w-3 h-3 bg-slate-300 rounded-full" /> Expenses
              </div>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="expenses" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 text-lg mb-8">Clinical Outcomes by Category</h3>
          <div className="h-80 w-full flex flex-col md:flex-row items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={diagnosisData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {diagnosisData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-3 justify-center pr-12">
              {diagnosisData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}} />
                  <span className="text-sm font-medium text-slate-600">{d.name}</span>
                  <span className="text-sm font-bold text-slate-400 ml-auto">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Patient Satisfaction', value: '4.8/5.0', icon: '⭐', color: 'text-amber-500' },
          { label: 'Avg. Recovery Time', value: '4.2 Days', icon: '⏱️', color: 'text-blue-500' },
          { label: 'Infection Rate', value: '0.02%', icon: '🛡️', color: 'text-emerald-500' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="text-slate-500 text-sm font-medium mb-1">{item.label}</p>
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Operational Reports</h3>
          <button className="text-blue-600 text-sm font-bold hover:underline">View All Files</button>
        </div>
        <div className="divide-y divide-slate-50">
          {[
            { name: 'Monthly Financial Audit - May 2024', size: '2.4 MB', type: 'PDF' },
            { name: 'Q2 Staff Performance Appraisal', size: '1.8 MB', type: 'DOCX' },
            { name: 'Ward Occupancy Heatmap', size: '4.1 MB', type: 'XLSX' },
            { name: 'Pharmacy Stock Forecast 2024', size: '0.9 MB', type: 'PDF' },
          ].map((report, i) => (
            <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">{report.name}</p>
                  <p className="text-xs text-slate-400">{report.type} • {report.size}</p>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                <Download size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
