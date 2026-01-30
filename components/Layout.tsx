import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/authSlice';
import { useTranslation } from '../hooks/useTranslation';

const Layout: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
             <span className="material-symbols-outlined">support_agent</span>
          </div>
          <span className="font-bold text-xl text-slate-800">SupportDesk</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <NavLink 
            to="/requests" 
            end 
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <span className="material-symbols-outlined">list_alt</span>
            {t('tickets')}
          </NavLink>
          
          {user?.role === 'user' && (
            <NavLink 
              to="/new-request" 
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <span className="material-symbols-outlined">add_circle</span>
              {t('createTicket')}
            </NavLink>
          )}

          <NavLink 
            to="/profile" 
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <span className="material-symbols-outlined">person</span>
            {t('profile')}
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <img src={user?.avatar} alt="User" className="w-10 h-10 rounded-full border border-slate-200" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate capitalize">{user?.role}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            {t('logout')}
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="bg-blue-600 text-white p-1.5 rounded">
                    <span className="material-symbols-outlined text-sm">support_agent</span>
                </div>
                <span className="font-bold text-slate-800">SupportDesk</span>
            </div>
            <button onClick={handleLogout} className="text-slate-500">
                <span className="material-symbols-outlined">logout</span>
            </button>
        </header>

        {/* İçerik */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <Outlet />
            </div>
        </main>
        
        {/* Mobile Bottom Nav */}
        <nav className="md:hidden bg-white border-t border-slate-200 flex justify-around p-3">
            <NavLink to="/requests" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
                <span className="material-symbols-outlined">list_alt</span>
                <span className="text-xs">{t('tickets')}</span>
            </NavLink>
            {user?.role === 'user' && (
                <NavLink to="/new-request" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
                    <span className="material-symbols-outlined">add_circle</span>
                    <span className="text-xs">New</span>
                </NavLink>
            )}
             <NavLink to="/profile" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
                <span className="material-symbols-outlined">person</span>
                <span className="text-xs">{t('profile')}</span>
            </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
