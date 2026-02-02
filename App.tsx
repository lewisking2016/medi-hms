
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Stethoscope, 
  Bed, 
  BarChart3, 
  MessageSquareHeart,
  Menu,
  X,
  Plus,
  Search,
  Bell,
  User
} from 'lucide-react';
import { View, Patient, InventoryItem, Staff, Ward } from './types';
import { INITIAL_PATIENTS, INITIAL_INVENTORY, INITIAL_STAFF, INITIAL_WARDS } from './constants';
import Dashboard from './components/Dashboard';
import PatientManagement from './components/PatientManagement';
import InventoryManagement from './components/InventoryManagement';
import StaffManagement from './components/StaffManagement';
import WardManagement from './components/WardManagement';
import Analytics from './components/Analytics';
import AiAssistant from './components/AiAssistant';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.Dashboard);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // App State
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [staff, setStaff] = useState<Staff[]>(INITIAL_STAFF);
  const [wards, setWards] = useState<Ward[]>(INITIAL_WARDS);

  const navigation = [
    { name: View.Dashboard, icon: LayoutDashboard },
    { name: View.Patients, icon: Users },
    { name: View.Inventory, icon: Package },
    { name: View.Staff, icon: Stethoscope },
    { name: View.Wards, icon: Bed },
    { name: View.Analytics, icon: BarChart3 },
    { name: View.Assistant, icon: MessageSquareHeart },
  ];

  const renderContent = () => {
    switch (activeView) {
      case View.Dashboard:
        return <Dashboard patients={patients} inventory={inventory} staff={staff} wards={wards} />;
      case View.Patients:
        return <PatientManagement patients={patients} setPatients={setPatients} />;
      case View.Inventory:
        return <InventoryManagement inventory={inventory} setInventory={setInventory} />;
      case View.Staff:
        return <StaffManagement staff={staff} setStaff={setStaff} />;
      case View.Wards:
        return <WardManagement wards={wards} setWards={setWards} />;
      case View.Analytics:
        return <Analytics />;
      case View.Assistant:
        return <AiAssistant patients={patients} />;
      default:
        return <Dashboard patients={patients} inventory={inventory} staff={staff} wards={wards} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col z-30`}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <Stethoscope className="text-white w-5 h-5" />
            </div>
            {isSidebarOpen && <span className="font-bold text-slate-800 text-lg whitespace-nowrap">MediSync</span>}
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-slate-100 rounded text-slate-400"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveView(item.name)}
              className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all ${
                activeView === item.name 
                  ? 'bg-blue-50 text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <item.icon className="shrink-0" size={22} />
              {isSidebarOpen && <span className="font-medium">{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className={`flex items-center gap-3 ${!isSidebarOpen && 'justify-center'}`}>
            <img 
              src="https://picsum.photos/seed/doctor/40/40" 
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm shrink-0" 
              alt="Admin" 
            />
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-slate-800 truncate">Dr. Sarah Wilson</p>
                <p className="text-xs text-slate-500">Chief Administrator</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-20 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-xl font-bold text-slate-800 hidden sm:block">{activeView}</h1>
            <div className="relative max-w-md w-full ml-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search MRN, patient name, or medicine..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
              <Plus size={18} />
              <span className="hidden sm:inline">New Admissions</span>
            </button>
          </div>
        </header>

        {/* Dynamic View Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
