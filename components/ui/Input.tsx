import React from 'react';

interface BaseProps {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, BaseProps {}
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, BaseProps {}
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>, BaseProps {
    options: { value: string; label: string }[];
}

const baseClasses = "w-full px-4 py-2 border rounded-lg outline-none transition-all focus:ring-2 disabled:bg-slate-100 disabled:text-slate-500";
const normalBorder = "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20";
const errorBorder = "border-red-300 focus:border-red-500 focus:ring-red-500/20";

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => (
  <div className={props.fullWidth ? 'w-full' : ''}>
    {label && <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>}
    <input 
      className={`${baseClasses} ${error ? errorBorder : normalBorder} ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">error</span>{error}</p>}
  </div>
);

export const TextArea: React.FC<TextAreaProps> = ({ label, error, className = '', ...props }) => (
  <div className={props.fullWidth ? 'w-full' : ''}>
    {label && <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>}
    <textarea 
      className={`${baseClasses} ${error ? errorBorder : normalBorder} ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">error</span>{error}</p>}
  </div>
);

export const Select: React.FC<SelectProps> = ({ label, error, options, className = '', ...props }) => (
  <div className={props.fullWidth ? 'w-full' : ''}>
    {label && <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>}
    <div className="relative">
        <select 
        className={`${baseClasses} ${error ? errorBorder : normalBorder} appearance-none bg-white ${className}`}
        {...props}
        >
        {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
    </div>
    {error && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">error</span>{error}</p>}
  </div>
);