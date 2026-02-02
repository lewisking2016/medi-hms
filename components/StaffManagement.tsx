
import React from 'react';
import { Staff } from '../types';
import { Phone, Mail, Calendar, MapPin, ChevronRight, UserCircle } from 'lucide-react';

interface StaffManagementProps {
  staff: Staff[];
  setStaff: React.Dispatch<React.SetStateAction<Staff[]>>;
}

const StaffManagement: React.FC<StaffManagementProps> = ({ staff, setStaff }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Hospital Workforce</h2>
          <p className="text-slate-500">Manage doctors, nurses, and administrative personnel</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            Staff Schedule
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm">
            Onboard Staff
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {staff.map((member) => (
          <div key={member.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all border-l-4 border-l-blue-500">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img 
                    src={`https://picsum.photos/seed/${member.id}/80/80`} 
                    className="w-16 h-16 rounded-2xl object-cover shadow-sm" 
                    alt={member.name} 
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    member.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'
                  }`} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800">{member.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-blue-600">{member.role}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span className="text-sm text-slate-500">{member.department}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-600 text-sm">
                  <Calendar size={16} className="text-slate-400" />
                  <span>Shift: <strong>{member.shift}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 text-sm">
                  <Phone size={16} className="text-slate-400" />
                  <span>{member.contact}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                  member.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {member.status}
                </span>
                <button className="text-slate-400 hover:text-blue-600 transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="text-3xl font-bold mb-4">Optimized Workforce Scheduling</h3>
            <p className="text-slate-400 mb-6">Automate shift planning, leave management, and task distribution across departments with AI-driven resource allocation.</p>
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all shadow-xl shadow-blue-500/20">
              Open Smart Scheduler
            </button>
          </div>
          <div className="w-full lg:w-96 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <UserCircle size={18} className="text-blue-400" />
              Duty Roster - Next 24h
            </h4>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="w-8 h-8 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center text-xs font-bold">
                    {8 + i}:00
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Department Handover</p>
                    <p className="text-xs text-slate-400">Cardiology → Surgery</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default StaffManagement;
