import { create } from 'zustand';

export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatarUrl: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const mockUsers: Record<UserRole, User> = {
  patient: {
    id: 'p1',
    name: 'Sarah Jenkins',
    role: 'patient',
    email: 'sarah.j@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=sarah',
  },
  doctor: {
    id: 'd1',
    name: 'Dr. Emily Chen',
    role: 'doctor',
    email: 'dremily@caresync.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=emily',
  },
  admin: {
    id: 'a1',
    name: 'Admin System',
    role: 'admin',
    email: 'admin@caresync.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=admin',
  },
};

export const useAuthStore = create<AuthState>((set) => ({
  user: mockUsers.patient, // Default role for demo
  isAuthenticated: true,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  switchRole: (role) => set({ user: mockUsers[role] }),
}));
