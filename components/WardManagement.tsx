
import React from 'react';
import { Ward } from '../types';
import { Bed, Users, Thermometer, ShieldCheck, Map, LayoutGrid } from 'lucide-react';

interface WardManagementProps {
  wards: Ward[];
  setWards: React.Dispatch<React.SetStateAction<Ward[]>>;
}

const WardManagement: React.FC<WardManagementProps> = ({ wards, setWards }) => {
  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Ward & Room Allocation</h2>
          <p className="text-slate-500">Real-time bed availability and facility monitoring</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 shadow-sm">
            <LayoutGrid size={20} />
          </button>
          <button className="p-2 bg-blue-50 border border-blue-100 rounded-xl text-blue-600 hover:bg-blue-100 shadow-sm">
            <Map size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {wards.map((ward) => (
          <div key={ward.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-slate-800">{ward.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    ward.type === 'ICU' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {ward.type}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{ward.occupied} Patients</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bed size={14} />
                    <span>{ward.capacity - ward.occupied} Available</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-2xl font-black text-slate-800">{Math.round((ward.occupied / ward.capacity) * 100)}%</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Occupancy</p>
              </div>
            </div>

            <div className="p-6 bg-slate-50/50 flex-1">
              <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
                {ward.beds.map((bed) => (
                  <button
                    key={bed.id}
                    title={`Bed ${bed.id}: ${bed.status}`}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all relative group ${
                      bed.status === 'Available' ? 'bg-white border border-slate-200 text-slate-400 hover:border-blue-500 hover:text-blue-500' :
                      bed.status === 'Occupied' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' :
                      bed.status === 'Cleaning' ? 'bg-amber-100 text-amber-600 border border-amber-200' :
                      'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}
                  >
                    <Bed size={16} />
                    <span className="text-[9px] font-bold mt-1">{bed.id.split('-')[1]}</span>
                    
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-slate-800 text-white text-[10px] p-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                      <p className="font-bold">Bed {bed.id}</p>
                      <p>Status: {bed.status}</p>
                      {bed.patientId && <p>Patient: {bed.patientId}</p>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white grid grid-cols-2 gap-4 border-t border-slate-50">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
                <Thermometer className="text-slate-400" size={18} />
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none">Ambient Temp</p>
                  <p className="text-sm font-bold text-slate-800">22.4°C</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
                <ShieldCheck className="text-emerald-500" size={18} />
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none">Hygiene Level</p>
                  <p className="text-sm font-bold text-emerald-600">Grade A+</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WardManagement;
