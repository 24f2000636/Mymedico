import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Settings, 
  Activity
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const { user, switchRole } = useAuthStore();
  
  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/appointments', label: 'Appointments', icon: Calendar },
    { to: '/records', label: 'Medical Records', icon: FileText },
    { to: '/assistant', label: 'AI Assistant', icon: MessageSquare },
  ];

  return (
    <div className="w-64 h-full glass border-r border-slate-200/50 flex flex-col p-4 shadow-sm bg-white/60">
      <div className="flex items-center gap-3 px-2 py-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary-500/30">
          C
        </div>
        <span className="font-poppins font-bold text-xl text-slate-800 tracking-tight">CareSync<span className="text-primary-500">AI</span></span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive 
                  ? 'bg-white shadow-sm text-primary-600' 
                  : 'text-slate-600 hover:bg-white/50 hover:text-primary-500'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-slate-200/50 space-y-4">
        <div className="px-4 py-3 rounded-xl bg-slate-100/50 border border-slate-200/50 flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Demo Role Switch</span>
          <div className="flex gap-2">
            {['patient', 'doctor', 'admin'].map((role) => (
              <button
                key={role}
                onClick={() => switchRole(role as any)}
                className={`text-[10px] uppercase px-2 py-1 rounded-md font-semibold transition-colors ${
                  user?.role === role ? 'bg-primary-500 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3 px-2">
          <img src={user?.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{user?.name}</p>
            <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Topbar = () => {
  return (
    <header className="h-16 glass border-b border-slate-200/50 flex items-center justify-between px-8 bg-white/40 sticky top-0 z-10">
      <h2 className="text-lg font-semibold text-slate-800 font-poppins">Welcome back 👋</h2>
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-600 hover:bg-white/60 rounded-full transition-colors relative">
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          <Activity className="w-5 h-5" />
        </button>
        <button className="p-2 text-slate-600 hover:bg-white/60 rounded-full transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export const Layout = () => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-inter">
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        {/* Ambient background blur circles */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob pointer-events-none"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 pointer-events-none"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-accent-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 pointer-events-none"></div>

        <Topbar />
        <main className="flex-1 overflow-y-auto p-8 relative z-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};
