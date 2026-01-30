import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useTranslation } from '../hooks/useTranslation';

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.tickets);
  const { t } = useTranslation();

  const myTickets = user?.role === 'admin' 
    ? items 
    : items.filter(t => t.createdById === user?.id);
    
  const total = myTickets.length;
  const open = myTickets.filter(t => t.status === 'Open').length;
  const closed = myTickets.filter(t => t.status === 'Closed').length;
  const resolving = myTickets.filter(t => t.status === 'Resolving').length;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-800">{t('profile')}</h1>

      {/* User Info Kartı */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-700"></div>
        <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
                 <img 
                    src={user?.avatar} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-2xl border-4 border-white shadow-md bg-white"
                />
                 <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200">
                    {user?.role}
                 </span>
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900">{user?.name}</h2>
            <p className="text-slate-500">{user?.email}</p>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <span className="material-symbols-outlined text-3xl">list_alt</span>
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500 uppercase">{t('totalTickets')}</p>
                <p className="text-3xl font-bold text-slate-800">{total}</p>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                 <span className="material-symbols-outlined text-3xl">pending_actions</span>
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500 uppercase">{t('openTickets')}</p>
                <p className="text-3xl font-bold text-slate-800">{open + resolving}</p>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                 <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500 uppercase">{t('closedTickets')}</p>
                <p className="text-3xl font-bold text-slate-800">{closed}</p>
            </div>
        </div>
      </div>

      {/* Aktivite Grafiği*/}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">{t('ticketDistribution')}</h3>
        <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex">
            {total > 0 ? (
                <>
                    <div style={{ width: `${(open/total)*100}%` }} className="bg-blue-500 h-full" title="Open"></div>
                    <div style={{ width: `${(resolving/total)*100}%` }} className="bg-amber-500 h-full" title="Resolving"></div>
                    <div style={{ width: `${(closed/total)*100}%` }} className="bg-emerald-500 h-full" title="Closed"></div>
                </>
            ) : (
                <div className="w-full bg-slate-100 h-full"></div>
            )}
        </div>
        <div className="flex gap-4 mt-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span> Open
            </div>
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span> Resolving
            </div>
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Closed
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;