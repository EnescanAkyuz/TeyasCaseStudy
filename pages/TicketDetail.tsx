import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateTicketStatus, addMessage } from '../store/ticketsSlice';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import Button from '../components/ui/Button';
import { TicketStatus } from '../types';
import { useTranslation } from '../hooks/useTranslation';

const TicketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.tickets);
  const { user } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();
  
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const ticket = items.find(t => t.id === id);

  // Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [ticket?.messages]);

  if (!ticket) {
      return (
          <div className="h-[60vh]">
            <EmptyState 
                title={t('notFound')} 
                description={t('notFoundDesc')}
                action={
                    <Button variant="secondary" onClick={() => navigate('/requests')}>
                        {t('backToTickets')}
                    </Button>
                }
            />
          </div>
      );
  }

  const handleStatusChange = (status: TicketStatus) => {
    dispatch(updateTicketStatus({ ticketId: ticket.id, status }));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    dispatch(addMessage({
      ticketId: ticket.id,
      message: {
        id: `m-${Date.now()}`,
        text: newMessage,
        senderId: user.id,
        senderName: user.name,
        createdAt: new Date().toISOString(),
      }
    }));
    setNewMessage('');
  };

  const getCategoryLabel = (cat: string) => {
    const map: any = { 'Technical': t('catTechnical'), 'Billing': t('catBilling'), 'Feature': t('catFeature'), 'Access': t('catAccess') };
    return map[cat] || cat;
  };

  return (
    <div className="space-y-6 h-[calc(100vh-140px)] md:h-auto flex flex-col md:block">
      {/* Top Nav */}
      <button onClick={() => navigate('/requests')} className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-sm font-medium shrink-0">
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        {t('backToTickets')}
      </button>

      {/* Header Info */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 shrink-0">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
            <div className="min-w-0">
                <div className="flex items-start gap-3 mb-2">
                    <h1 className="text-xl md:text-2xl font-bold text-slate-800 break-words line-clamp-2">{ticket.subject}</h1>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
                        <span className="material-symbols-outlined text-lg">tag</span>
                        {ticket.id}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
                        <span className="material-symbols-outlined text-lg">category</span>
                        {getCategoryLabel(ticket.category)}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
                         <span className="material-symbols-outlined text-lg">person</span>
                         {ticket.createdByName}
                    </span>
                </div>
            </div>

            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-3 border-t md:border-t-0 pt-4 md:pt-0">
                <StatusBadge status={ticket.status} />
                
                {user?.role === 'admin' && (
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-500 uppercase hidden md:inline">{t('updateStatus')}</span>
                        <select 
                            className="bg-white border border-slate-200 text-slate-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-1.5 outline-none"
                            value={ticket.status}
                            onChange={(e) => handleStatusChange(e.target.value as TicketStatus)}
                        >
                            <option value="Open">Open</option>
                            <option value="Resolving">Resolving</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                )}
            </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-slate-700">
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">{t('description')}</h3>
            <p className="whitespace-pre-wrap text-sm md:text-base">{ticket.description}</p>
        </div>
      </div>

      {/* Discussion Area */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col flex-1 min-h-0 overflow-hidden">
        <div className="p-4 border-b border-slate-200 shrink-0">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400">forum</span>
                {t('messages')}
            </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-50">
            {ticket.messages.length === 0 && (
                <EmptyState 
                    icon="chat_bubble_outline"
                    title={t('noMessages')} 
                    description={t('noMessagesDesc')} 
                />
            )}
            {ticket.messages.map((msg) => {
                const isMe = msg.senderId === user?.id;
                return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] md:max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                            <div className="flex items-center gap-2 mb-1 px-1">
                                <span className="text-xs font-bold text-slate-600">{msg.senderName}</span>
                                <span className="text-[10px] text-slate-400">
                                    {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                            </div>
                            <div className={`p-3 md:p-4 rounded-2xl text-sm shadow-sm break-words ${
                                isMe 
                                ? 'bg-blue-600 text-white rounded-tr-none' 
                                : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-slate-200 bg-white rounded-b-xl shrink-0">
            {ticket.status === 'Closed' ? (
                <div className="flex items-center justify-center gap-2 p-3 bg-slate-100 rounded-lg text-slate-500 text-sm">
                    <span className="material-symbols-outlined">lock</span>
                    {t('ticketClosedMessage')}
                </div>
            ) : (
                <form onSubmit={handleSendMessage} className="flex gap-2 md:gap-4">
                    <input 
                        type="text" 
                        className="flex-1 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder={t('typeMessage')}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button 
                        type="submit"
                        disabled={!newMessage.trim()}
                        icon="send"
                    >
                        <span className="hidden md:inline">{t('send')}</span>
                    </Button>
                </form>
            )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;