import React from 'react';
import { TicketStatus } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface Props {
  status: TicketStatus;
}

const StatusBadge: React.FC<Props> = ({ status }) => {
  const { t } = useTranslation();

  const styles = {
    Open: 'bg-blue-100 text-blue-700 border-blue-200',
    Resolving: 'bg-amber-100 text-amber-700 border-amber-200',
    Closed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };

  const icons = {
    Open: 'circle',
    Resolving: 'timelapse',
    Closed: 'check_circle',
  };

  const labels = {
    Open: t('statOpen'),
    Resolving: t('statResolving'),
    Closed: t('statClosed'),
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      <span className="material-symbols-outlined text-[14px] fill">{icons[status]}</span>
      {labels[status]}
    </span>
  );
};

export default StatusBadge;
