import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../types';
import { MOCK_USERS } from '../services/mockData';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  language: 'en',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string; role: 'user' | 'admin'; password?: string }>) => {
      const { username, role, password } = action.payload;
      // check username, role and password
      const mockUser = MOCK_USERS.find(u => u.username === username && u.role === role && u.password === password);
      
      if (mockUser) {
        state.user = mockUser;
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.error = 'loginError';
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setLanguage: (state, action: PayloadAction<'en' | 'tr'>) => {
      state.language = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
});

export const { login, logout, setLanguage, clearError } = authSlice.actions;
export default authSlice.reducer;