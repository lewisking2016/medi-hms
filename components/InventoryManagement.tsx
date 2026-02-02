
import React, { useState } from 'react';
import { InventoryItem } from '../types';
import { Search, PackagePlus, AlertTriangle, Pill, Stethoscope, Scissors } from 'lucide-react';

interface InventoryManagementProps {
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}

const InventoryManagement: React.FC<InventoryManagementProps> = ({ inventory, setInventory }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Medicine' | 'Equipment' | 'Supply'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = inventory.filter(item => {
    const matchesTab = activeTab === 'All' || item.category === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getIcon = (category: string) => {
    switch (category) {
      case 'Medicine': return <Pill className="text-blue-500" />;
      case 'Equipment': return <Stethoscope className="text-purple-500" />;
      case 'Supply': return <Scissors className="text-emerald-500" />;
      default: return <PackagePlus className="text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Pharmacy & Inventory</h2>
          <p className="text-slate-500">Manage hospital supplies and medicine stock</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search stock..." 
              className="bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium shadow-sm transition-colors flex items-center gap-2">
            <PackagePlus size={18} />
            Add Item
          </button>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-slate-100 rounded-xl w-fit">
        {['All', 'Medicine', 'Equipment', 'Supply'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => {
          const isLow = item.stock <= item.minStock;
          const percentage = Math.min((item.stock / (item.minStock * 4)) * 100, 100);

          return (
            <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              {isLow && (
                <div className="absolute top-0 right-0 p-2">
                  <AlertTriangle className="text-orange-500 animate-pulse" size={20} />
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getIcon(item.category)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 leading-tight">{item.name}</h4>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mt-0.5">{item.category}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-slate-800">{item.stock}</p>
                    <p className="text-xs text-slate-500 uppercase font-medium">{item.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 font-medium">MIN: {item.minStock}</p>
                    <p className={`text-xs font-bold ${isLow ? 'text-red-500' : 'text-emerald-500'}`}>
                      {isLow ? 'Low Stock' : 'Optimal'}
                    </p>
                  </div>
                </div>

                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${isLow ? 'bg-orange-500' : 'bg-blue-500'}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-2">
                <button className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-lg transition-colors">
                  Edit Details
                </button>
                <button className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold rounded-lg transition-colors">
                  Restock
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InventoryManagement;
