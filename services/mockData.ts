import { Ticket, User } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Ali Müşteri',
    email: 'ali@sirket.com',
    username: 'user',
    password: 'user123',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?u=alex'
  },
  {
    id: 'a1',
    name: 'Ayşe Admin',
    email: 'ayse@destek.com',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  }
];

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 'TCK-1001',
    subject: 'Chrome tarayıcısında giriş hatası',
    description: 'Chrome v90 kullanırken panele giriş yapamıyorum. Firefox üzerinde çalışıyor.',
    category: 'Technical',
    priority: 'High',
    status: 'Open',
    createdById: 'u1',
    createdByName: 'Ali Müşteri',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    messages: [
      {
        id: 'm1',
        text: 'Merhaba, giriş yaparken sorun yaşıyorum.',
        senderId: 'u1',
        senderName: 'Ali Müşteri',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      }
    ]
  },
  {
    id: 'TCK-1002',
    subject: 'Son fatura hakkında açıklama',
    description: 'Ekim ayı fatura tutarı planıma göre hatalı görünüyor.',
    category: 'Billing',
    priority: 'Medium',
    status: 'Resolving',
    createdById: 'u1',
    createdByName: 'Ali Müşteri',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    messages: [
      {
        id: 'm2',
        text: 'Ekstra ücretlendirmeyi açıklayabilir misiniz?',
        senderId: 'u1',
        senderName: 'Ali Müşteri',
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      },
      {
        id: 'm3',
        text: 'Merhaba Ali, şu an inceliyorum.',
        senderId: 'a1',
        senderName: 'Ayşe Admin',
        createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
      }
    ]
  },
  {
    id: 'TCK-1003',
    subject: 'Özellik İsteği: Karanlık Mod',
    description: 'Geceleri gözlerim ağrıyor. Lütfen karanlık mod ekleyin.',
    category: 'Feature',
    priority: 'Low',
    status: 'Closed',
    createdById: 'u1',
    createdByName: 'Ali Müşteri',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    messages: []
  }
];