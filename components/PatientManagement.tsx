
import React, { useState } from 'react';
import { Patient } from '../types';
import { Search, UserPlus, Filter, MoreVertical, Eye, Edit2, ShieldCheck } from 'lucide-react';

interface PatientManagementProps {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientManagement: React.FC<PatientManagementProps> = ({ patients, setPatients }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.mrn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or MRN..." 
            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-3 rounded-xl font-medium transition-colors">
            <Filter size={18} />
            Filter
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium transition-colors shadow-sm shadow-blue-200">
            <UserPlus size={18} />
            Register Patient
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr className="text-left">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Patient Profile</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">MRN</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Insurance</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((patient) => (
                <tr 
                  key={patient.id} 
                  className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedPatient?.id === patient.id ? 'bg-blue-50/50' : ''}`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{patient.name}</p>
                        <p className="text-xs text-slate-500">{patient.age} yrs • {patient.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-mono">{patient.mrn}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      {patient.insurance}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium border border-emerald-100">
                      Admitted
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredPatients.length === 0 && (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4 text-slate-300">
                <Search size={32} />
              </div>
              <p className="text-slate-500">No patients found matching your search.</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          {selectedPatient ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{selectedPatient.name}</h3>
                  <p className="text-sm text-slate-500">MRN: {selectedPatient.mrn}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm">
                    <Eye size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Blood Group</p>
                  <p className="font-bold text-slate-700">{selectedPatient.bloodGroup}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Contact</p>
                  <p className="font-bold text-slate-700">{selectedPatient.contact}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-3">Current Condition</h4>
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                  <p className="text-blue-800 font-medium text-sm">{selectedPatient.condition}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-3">Medical History</h4>
                <div className="space-y-2">
                  {selectedPatient.history.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition-colors">
                  Create Digital Prescription
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
              <UserPlus size={48} strokeWidth={1} className="mb-4 text-slate-200" />
              <p className="text-sm">Select a patient from the list to view detailed Electronic Health Records (EHR).</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientManagement;
