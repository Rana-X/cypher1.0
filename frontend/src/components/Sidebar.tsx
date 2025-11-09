import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  BarChart3,
  Users,
  Mail,
  Bot,
  Shield,
  Settings,
  Bell,
  FileText,
  Plus,
} from 'lucide-react';
import { Button } from './ui/button';

const navItems = [
  {
    name: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'Bots',
    path: '/bots',
    icon: Bot,
  },
  {
    name: 'Training',
    path: '/training',
    icon: GraduationCap,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: Settings,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm z-50">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Shield className="w-8 h-8 text-blue-600" />
            <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur-md -z-10"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Cypher</h1>
            <p className="text-xs text-slate-500">Security Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-3 space-y-1">
          {/* Add Bot Button */}
          <Button
            onClick={() => navigate('/bots/create')}
            className="w-full justify-start gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm mb-3"
          >
            <Plus className="w-4 h-4" />
            Add bot
          </Button>

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span className="text-sm">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-slate-900 truncate">Admin User</div>
            <div className="text-xs text-slate-500 truncate">admin@cypher.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
