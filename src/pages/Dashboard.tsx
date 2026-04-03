import { useAuthStore } from '../store/authStore';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { Activity, Users, Calendar, TrendingUp, AlertCircle, FileText } from 'lucide-react';

const patientData = [
  { name: 'Mon', bp: 120, hr: 72 },
  { name: 'Tue', bp: 118, hr: 75 },
  { name: 'Wed', bp: 122, hr: 71 },
  { name: 'Thu', bp: 119, hr: 74 },
  { name: 'Fri', bp: 121, hr: 73 },
  { name: 'Sat', bp: 117, hr: 70 },
  { name: 'Sun', bp: 120, hr: 72 },
];

const adminData = [
  { name: 'Jan', patients: 400, appointments: 240 },
  { name: 'Feb', patients: 430, appointments: 260 },
  { name: 'Mar', patients: 480, appointments: 300 },
  { name: 'Apr', patients: 510, appointments: 280 },
  { name: 'May', patients: 550, appointments: 350 },
  { name: 'Jun', patients: 620, appointments: 400 },
];

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <div className="glass-card p-6 border-l-4" style={{ borderLeftColor: color }}>
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl`} style={{ backgroundColor: `${color}20`, color: color }}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div className="flex items-center gap-2 text-sm">
      <TrendingUp className="w-4 h-4 text-primary-500" />
      <span className="text-primary-600 font-medium">{trend}</span>
      <span className="text-slate-400">vs last month</span>
    </div>
  </div>
);

const PatientDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Upcoming Appointments" value="2" icon={Calendar} trend="+1" color="#3498db" />
      <StatCard title="Recent Reports" value="5" icon={FileText} trend="+2" color="#2ecc71" />
      <StatCard title="Health Score" value="92/100" icon={Activity} trend="+5%" color="#1abc9c" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 glass-card p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-6 font-poppins">Health Vitals Trends</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={patientData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
              <RechartsTooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              />
              <Line type="monotone" dataKey="bp" name="Blood Pressure" stroke="#3498db" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="hr" name="Heart Rate" stroke="#1abc9c" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="glass-card p-6 flex flex-col">
        <h3 className="text-lg font-bold text-slate-800 mb-6 font-poppins">AI Recommendations</h3>
        <div className="flex-1 space-y-4">
          <div className="p-4 rounded-xl bg-primary-50 border border-primary-100 flex items-start gap-3">
            <Activity className="w-5 h-5 text-primary-500 mt-0.5" />
            <div>
              <p className="font-semibold text-primary-900 text-sm">Great job staying active!</p>
              <p className="text-xs text-primary-700 mt-1">Your heart rate averages are optimal. Keep up the daily walks.</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900 text-sm">Hydration Reminder</p>
              <p className="text-xs text-amber-700 mt-1">Based on recent logs, try to increase your water intake today.</p>
            </div>
          </div>
        </div>
        <button className="mt-4 w-full py-3 rounded-xl bg-gradient-brand text-white font-semibold shadow-md hover:shadow-lg transition-shadow">
          Chat with CareSync AI
        </button>
      </div>
    </div>
  </div>
);

const DoctorDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Today's Patients" value="12" icon={Users} trend="+3" color="#3498db" />
      <StatCard title="Pending Reports" value="8" icon={FileText} trend="-2" color="#f59e0b" />
      <StatCard title="Consultation Hours" value="6.5h" icon={Activity} trend="+0.5h" color="#1abc9c" />
    </div>
    
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800 font-poppins">Today's Schedule</h3>
        <button className="text-sm font-semibold text-primary-600 hover:text-primary-700">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm text-slate-500 border-b border-slate-200">
              <th className="pb-3 font-medium">Time</th>
              <th className="pb-3 font-medium">Patient Name</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700">
            {[
              { time: '09:00 AM', name: 'John Doe', type: 'General Checkup', status: 'Completed', color: 'text-green-600 bg-green-50' },
              { time: '10:30 AM', name: 'Sarah Jenkins', type: 'Follow up', status: 'In Progress', color: 'text-blue-600 bg-blue-50' },
              { time: '11:15 AM', name: 'Michael Smith', type: 'Consultation', status: 'Waiting', color: 'text-amber-600 bg-amber-50' },
              { time: '02:00 PM', name: 'Emma Wilson', type: 'Test Results', status: 'Scheduled', color: 'text-slate-600 bg-slate-100' },
            ].map((row, i) => (
              <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                <td className="py-4 font-medium">{row.time}</td>
                <td className="py-4 flex items-center gap-3">
                  <img src={`https://i.pravatar.cc/150?u=${row.name}`} alt="" className="w-8 h-8 rounded-full" />
                  {row.name}
                </td>
                <td className="py-4 text-slate-500">{row.type}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${row.color}`}>
                    {row.status}
                  </span>
                </td>
                <td className="py-4">
                  <button className="text-primary-600 hover:text-primary-800 font-medium">View Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard title="Total Users" value="2,451" icon={Users} trend="+12%" color="#3498db" />
      <StatCard title="Active Doctors" value="124" icon={Activity} trend="+4%" color="#2ecc71" />
      <StatCard title="Appointments (M)" value="8,234" icon={Calendar} trend="+18%" color="#1abc9c" />
      <StatCard title="System Health" value="99.9%" icon={AlertCircle} trend="0%" color="#8b5cf6" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-6 font-poppins">Platform Growth</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={adminData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
              <RechartsTooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="patients" name="New Patients" fill="#3498db" radius={[4, 4, 0, 0]} />
              <Bar dataKey="appointments" name="Appointments" fill="#1abc9c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-6 font-poppins">Recent System Alerts</h3>
        <div className="space-y-4">
          {[
            { msg: 'High load on Database Replica A', time: '10 mins ago', type: 'warning' },
            { msg: 'Successfully backed up daily records', time: '2 hours ago', type: 'success' },
            { msg: 'New Doctor registration pending approval', time: '4 hours ago', type: 'info' },
            { msg: 'Failed API calls to Calendar Sync', time: '1 day ago', type: 'error' },
          ].map((alert, i) => (
            <div key={i} className={`p-4 rounded-xl border flex items-start gap-3 ${
              alert.type === 'warning' ? 'bg-amber-50 border-amber-100 text-amber-800' :
              alert.type === 'error' ? 'bg-red-50 border-red-100 text-red-800' :
              alert.type === 'success' ? 'bg-green-50 border-green-100 text-green-800' :
              'bg-blue-50 border-blue-100 text-blue-800'
            }`}>
              <AlertCircle className="w-5 h-5 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold">{alert.msg}</p>
                <p className="text-xs opacity-75 mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const { user } = useAuthStore();
  
  return (
    <div className="h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 font-poppins">
          <span className="text-gradient">Dashboard Overview</span>
        </h1>
        <p className="text-slate-500 mt-2">Here's what's happening with your account today.</p>
      </div>
      
      {user?.role === 'patient' && <PatientDashboard />}
      {user?.role === 'doctor' && <DoctorDashboard />}
      {user?.role === 'admin' && <AdminDashboard />}
    </div>
  );
}
