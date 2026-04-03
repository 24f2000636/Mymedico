import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Video, FileText } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Appointments() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('upcoming');

  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Emily Chen',
      specialty: 'Cardiologist',
      date: 'Oct 24, 2026',
      time: '10:30 AM',
      type: 'Video Consult',
      status: 'upcoming',
      image: 'https://i.pravatar.cc/150?u=emily',
      location: 'Google Meet',
    },
    {
      id: 2,
      doctor: 'Dr. Marcus Johnson',
      specialty: 'General Physician',
      date: 'Nov 02, 2026',
      time: '02:15 PM',
      type: 'In-person',
      status: 'upcoming',
      image: 'https://i.pravatar.cc/150?u=marcus',
      location: 'City Hospital, Block B',
    },
    {
      id: 3,
      doctor: 'Dr. Sarah Smith',
      specialty: 'Dermatologist',
      date: 'Sep 15, 2026',
      time: '11:00 AM',
      type: 'In-person',
      status: 'past',
      image: 'https://i.pravatar.cc/150?u=sarah2',
      location: 'Skin Care Clinic',
    },
  ];

  const filteredApps = appointments.filter(a => a.status === activeTab);

  return (
    <div className="h-full max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 font-poppins">Appointments</h1>
          <p className="text-slate-500 mt-2">Manage your scheduled consultations</p>
        </div>
        
        {user?.role === 'patient' && (
          <button className="bg-gradient-brand text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Book New Appointment
          </button>
        )}
      </div>

      <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200/50">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${
              activeTab === 'upcoming' ? 'text-primary-600 border-b-2 border-primary-500 bg-primary-50/30' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50/50'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${
              activeTab === 'past' ? 'text-primary-600 border-b-2 border-primary-500 bg-primary-50/30' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50/50'
            }`}
          >
            Past History
          </button>
        </div>

        <div className="p-6">
          {filteredApps.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <CalendarIcon className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700">No appointments found</h3>
              <p className="text-slate-500 mt-1">You don't have any {activeTab} appointments.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredApps.map((app) => (
                <div key={app.id} className="group glass-card border-slate-200/60 p-5 hover:border-primary-300 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <img src={app.image} alt={app.doctor} className="w-14 h-14 rounded-full border-2 border-white shadow-sm" />
                      <div>
                        <h4 className="font-bold text-slate-800">{app.doctor}</h4>
                        <p className="text-sm text-primary-600 font-medium">{app.specialty}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                      app.type === 'Video Consult' ? 'bg-purple-50 text-purple-700 border border-purple-100' : 'bg-blue-50 text-blue-700 border border-blue-100'
                    }`}>
                      {app.type === 'Video Consult' ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                      {app.type}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 flex items-center gap-3">
                      <CalendarIcon className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Date</p>
                        <p className="text-sm font-semibold text-slate-700">{app.date}</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 flex items-center gap-3">
                      <Clock className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Time</p>
                        <p className="text-sm font-semibold text-slate-700">{app.time}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate max-w-[150px]">{app.location}</span>
                    </div>
                    
                    {app.status === 'upcoming' ? (
                      <div className="flex gap-2">
                        <button className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors">Cancel</button>
                        <button className="px-4 py-2 text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-lg shadow-sm transition-colors">Reschedule</button>
                      </div>
                    ) : (
                      <button className="px-4 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50 rounded-lg transition-colors flex items-center gap-2">
                        <FileText className="w-4 h-4" /> View Notes
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
