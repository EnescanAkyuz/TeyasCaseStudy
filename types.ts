export type Role = 'user' | 'admin';
export type TicketStatus = 'Open' | 'Resolving' | 'Closed';
export type TicketPriority = 'Low' | 'Medium' | 'High';
export type TicketCategory = 'Technical' | 'Billing' | 'Feature' | 'Access';

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  password?: string;
  role: Role;
  avatar: string;
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  createdAt: string;
  isInternal?: boolean; // For admin internal notes (optional feature)
}

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  createdById: string;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  language: 'en' | 'tr';
  error: string | null;
}

export interface TicketState {
  items: Ticket[];
  loading: boolean;
  error: string | null;
}