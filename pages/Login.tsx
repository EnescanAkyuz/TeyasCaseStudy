import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setLanguage, clearError } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { useTranslation } from '../hooks/useTranslation';
import { Input } from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language: currentLang, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
        navigate('/requests');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, role, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-8 text-center">
            <div className="inline-flex p-3 bg-white/10 rounded-xl mb-4 text-white">
                <span className="material-symbols-outlined text-4xl">support_agent</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{t('loginTitle')}</h2>
            <p className="text-blue-100">{t('loginSubtitle')}</p>
        </div>

        <div className="p-8">
            {/* Dil Değişme */}
            <div className="flex justify-center mb-6">
                 <div className="bg-slate-100 p-1 rounded-lg flex text-sm font-medium">
                    <button 
                        onClick={() => dispatch(setLanguage('en'))}
                        className={`px-4 py-1.5 rounded-md transition-all cursor-pointer ${currentLang === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                    >
                        English
                    </button>
                    <button 
                        onClick={() => dispatch(setLanguage('tr'))}
                        className={`px-4 py-1.5 rounded-md transition-all cursor-pointer ${currentLang === 'tr' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                    >
                        Türkçe
                    </button>
                 </div>
            </div>

            {/* Error Mesajı */}
            {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-center gap-2 animate-pulse">
                    <span className="material-symbols-outlined text-lg">error</span>
                    {t(error as any)}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('role')}</label>
                    <div className="grid grid-cols-2 gap-4">
                        <label className={`cursor-pointer border rounded-lg p-3 flex flex-col items-center gap-2 transition-all ${role === 'user' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:bg-slate-50'}`}>
                            <input type="radio" name="role" className="hidden" checked={role === 'user'} onChange={() => setRole('user')} />
                            <span className="material-symbols-outlined text-slate-600">person</span>
                            <span className={`text-sm font-medium ${role === 'user' ? 'text-blue-700' : 'text-slate-600'}`}>{t('user')}</span>
                        </label>
                        <label className={`cursor-pointer border rounded-lg p-3 flex flex-col items-center gap-2 transition-all ${role === 'admin' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:bg-slate-50'}`}>
                            <input type="radio" name="role" className="hidden" checked={role === 'admin'} onChange={() => setRole('admin')} />
                            <span className="material-symbols-outlined text-slate-600">admin_panel_settings</span>
                            <span className={`text-sm font-medium ${role === 'admin' ? 'text-blue-700' : 'text-slate-600'}`}>{t('admin')}</span>
                        </label>
                    </div>
                </div>

                <Input 
                    label={t('username')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={role === 'user' ? 'user' : 'admin'}
                    required
                />

                <Input 
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="123"
                    required
                />
                
                <Button type="submit" fullWidth>
                    {t('loginBtn')}
                </Button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Login;