import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Ticket, TicketState, Message, TicketStatus } from '../types';
import { MOCK_TICKETS } from '../services/mockData';

const STORAGE_KEY = 'supportDesk_tickets';

// save to local storage
const saveToStorage = (items: Ticket[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save tickets to local storage', e);
  }
};

// asenkron ticket fetch işlemi
export const fetchTickets = createAsyncThunk('tickets/fetch', async () => {
  // API gecikmesini simüle etme
  await new Promise(resolve => setTimeout(resolve, 500));

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Ticket[];
    }
  } catch (e) {
    console.error('Failed to load from local storage', e);
  }
  
  // Storege boşsa mock veriyi döndür
  return MOCK_TICKETS;
});

const initialState: TicketState = {
  items: [],
  loading: false,
  error: null,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    createTicket: (state, action: PayloadAction<Ticket>) => {
      state.items.unshift(action.payload);
      saveToStorage(state.items);
    },
    updateTicketStatus: (state, action: PayloadAction<{ ticketId: string; status: TicketStatus }>) => {
      const ticket = state.items.find(t => t.id === action.payload.ticketId);
      if (ticket) {
        ticket.status = action.payload.status;
        ticket.updatedAt = new Date().toISOString();
        saveToStorage(state.items);
      }
    },
    addMessage: (state, action: PayloadAction<{ ticketId: string; message: Message }>) => {
      const ticket = state.items.find(t => t.id === action.payload.ticketId);
      if (ticket) {
        ticket.messages.push(action.payload.message);
        ticket.updatedAt = new Date().toISOString();
        saveToStorage(state.items);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        saveToStorage(state.items);
      })
      .addCase(fetchTickets.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch tickets';
      });
  },
});

export const { createTicket, updateTicketStatus, addMessage } = ticketsSlice.actions;
export default ticketsSlice.reducer;