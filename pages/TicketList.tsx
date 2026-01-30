import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchTickets } from '../store/ticketsSlice';
import { Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import { Input, Select } from '../components/ui/Input';
import Button from '../components/ui/Button';
import { TicketCategory, TicketStatus } from '../types';
import { useTranslation } from '../hooks/useTranslation';

const TicketList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.tickets);
  const { user } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();

  const [filterStatus, setFilterStatus] = useState<TicketStatus | 'All'>('All');
  const [filterCategory, setFilterCategory] = useState<TicketCategory | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const filteredTickets = items.filter(ticket => {
    const isOwner = user?.role === 'admin' ? true : ticket.createdById === user?.id;
    const matchesStatus = filterStatus === 'All' || ticket.status === filterStatus;
    const matchesCategory = filterCategory === 'All' || ticket.category === filterCategory;
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return isOwner && matchesStatus && matchesCategory && matchesSearch;
  });

  const getCategoryLabel = (cat: TicketCategory) => {
    const map = {
        'Technical': t('catTechnical'),
        'Billing': t('catBilling'),
        'Feature': t('catFeature'),
        'Access': t('catAccess'),
    };
    return map[cat] || cat;
  };

  const getPriorityLabel = (prio: string) => {
    const map: any = { 'High': t('prioHigh'), 'Medium': t('prioMedium'), 'Low': t('prioLow') };
    return map[prio] || prio;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">{t('tickets')}</h1>
        {user?.role === 'user' && (
          <Link to="/new-request">
            <Button icon="add">{t('createTicket')}</Button>
          </Link>
        )}
      </div>

      {/* Filtre */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
            <Input 
                fullWidth
                placeholder={t('searchPlaceholder')} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <Select 
            fullWidth
            options={[
                { value: 'All', label: `${t('all')} ${t('situations')}` },
                { value: 'Open', label: t('statOpen') },
                { value: 'Resolving', label: t('statResolving') },
                { value: 'Closed', label: t('statClosed') },
            ]}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
        />
        <Select 
            fullWidth
            options={[
                { value: 'All', label: `${t('all')} ${t('categories')}` },
                { value: 'Technical', label: t('catTechnical') },
                { value: 'Billing', label: t('catBilling') },
                { value: 'Feature', label: t('catFeature') },
                { value: 'Access', label: t('catAccess') },
            ]}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as any)}
        />
      </div>

      {/* İçerik */}
      <div className="min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-slate-500 gap-2">
             <span className="material-symbols-outlined animate-spin">progress_activity</span>
             {t('loading')}
          </div>
        ) : filteredTickets.length === 0 ? (
          <EmptyState 
            title={t('noTickets')} 
            description={t('noTicketsDesc')}
            action={user?.role === 'user' ? (
                <Link to="/new-request" className="mt-2 inline-block">
                     <Button variant="secondary" icon="add">{t('createTicket')}</Button>
                </Link>
            ) : undefined}
          />
        ) : (
          <>
            {/* Masaüstü Görünüm */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                    <th className="px-6 py-4">{t('subject')}</th>
                    <th className="px-6 py-4">{t('category')}</th>
                    <th className="px-6 py-4">{t('priority')}</th>
                    <th className="px-6 py-4">{t('status')}</th>
                    <th className="px-6 py-4 text-right">{t('details')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                          <div className="font-medium text-slate-900">{ticket.subject}</div>
                          <div className="text-xs text-slate-500 mt-1">ID: {ticket.id} • {new Date(ticket.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                              {getCategoryLabel(ticket.category)}
                          </span>
                      </td>
                      <td className="px-6 py-4">
                          <span className={`text-xs font-semibold ${
                              ticket.priority === 'High' ? 'text-red-600' : 
                              ticket.priority === 'Medium' ? 'text-amber-600' : 'text-blue-600'
                          }`}>
                              {getPriorityLabel(ticket.priority)}
                          </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={ticket.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link to={`/requests/${ticket.id}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                          {t('details')}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobil Görünüm */}
            <div className="md:hidden space-y-4">
                {filteredTickets.map((ticket) => (
                    <div key={ticket.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex justify-between items-start mb-3">
                             <div>
                                <h3 className="font-semibold text-slate-900 line-clamp-1">{ticket.subject}</h3>
                                <p className="text-xs text-slate-500">#{ticket.id}</p>
                             </div>
                             <StatusBadge status={ticket.status} />
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4">
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                              {getCategoryLabel(ticket.category)}
                            </span>
                            <span className={`text-xs font-semibold ${
                              ticket.priority === 'High' ? 'text-red-600' : 
                              ticket.priority === 'Medium' ? 'text-amber-600' : 'text-blue-600'
                            }`}>
                              {getPriorityLabel(ticket.priority)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                            <span className="text-xs text-slate-500">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                            <Link to={`/requests/${ticket.id}`}>
                                <Button variant="ghost" className="!p-0 text-blue-600 hover:bg-transparent">
                                    {t('details')} &rarr;
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TicketList;