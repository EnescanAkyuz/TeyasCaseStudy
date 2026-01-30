import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../store/ticketsSlice';
import { RootState } from '../store';
import { TicketCategory, TicketPriority } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { Input, Select, TextArea } from '../components/ui/Input';
import Button from '../components/ui/Button';

const CreateTicket: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<TicketCategory>('Technical');
  const [priority, setPriority] = useState<TicketPriority>('Low');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newTicket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject,
      category,
      priority,
      description,
      status: 'Open' as const,
      createdById: user.id,
      createdByName: user.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: []
    };

    dispatch(createTicket(newTicket));
    navigate('/requests');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={() => navigate(-1)} className="md:hidden text-slate-500">
             <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-2xl font-bold text-slate-800">{t('createTicket')}</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label={t('subject')}
            required
            placeholder={t('phSubject')}
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
                label={t('category')}
                options={[
                    { value: 'Technical', label: t('catTechnical') },
                    { value: 'Billing', label: t('catBilling') },
                    { value: 'Feature', label: t('catFeature') },
                    { value: 'Access', label: t('catAccess') },
                ]}
                value={category}
                onChange={e => setCategory(e.target.value as TicketCategory)}
            />
            
            <Select
                label={t('priority')}
                options={[
                    { value: 'Low', label: t('prioLow') },
                    { value: 'Medium', label: t('prioMedium') },
                    { value: 'High', label: t('prioHigh') },
                ]}
                value={priority}
                onChange={e => setPriority(e.target.value as TicketPriority)}
            />
          </div>

          <TextArea
            label={t('description')}
            required
            rows={5}
            placeholder={t('phDesc')}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <div className="pt-4 flex flex-col-reverse md:flex-row justify-end gap-3">
            <Button type="button" variant="secondary" onClick={() => navigate('/requests')}>
                Cancel
            </Button>
            <Button type="submit" icon="send">
                {t('submit')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;