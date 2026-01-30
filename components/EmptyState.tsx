import React from 'react';

interface Props {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState: React.FC<Props> = ({ 
  icon = 'inbox', 
  title, 
  description, 
  action 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-slate-200 border-dashed rounded-xl h-full">
      <div className="bg-slate-50 p-4 rounded-full mb-4">
        <span className="material-symbols-outlined text-slate-400 text-4xl">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
      {description && <p className="text-slate-500 max-w-sm mb-6 text-sm">{description}</p>}
      {action}
    </div>
  );
};

export default EmptyState;