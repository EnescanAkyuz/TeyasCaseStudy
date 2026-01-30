import { useSelector } from 'react-redux';
import { RootState } from '../store';

const dictionary = {
  en: {
    dashboard: 'Dashboard',
    tickets: 'Tickets',
    profile: 'Profile',
    logout: 'Logout',
    createTicket: 'Create Ticket',
    status: 'Status',
    situations: 'Situations',
    category: 'Category',
    categories: 'Categories',
    subject: 'Subject',
    priority: 'Priority',
    description: 'Description',
    submit: 'Submit Request',
    messages: 'Messages',
    typeMessage: 'Type your reply...',
    send: 'Send',
    updateStatus: 'Update Status',
    totalTickets: 'Total Tickets',
    openTickets: 'Open Tickets',
    closedTickets: 'Closed Tickets',
    welcome: 'Welcome',
    loginTitle: 'Sign In to SupportDesk',
    loginSubtitle: 'Manage your support tickets efficiently',
    username: 'Username',
    password: 'Password',
    role: 'Login As',
    user: 'User',
    admin: 'Admin',
    loginBtn: 'Sign In',
    noTickets: 'No tickets found.',
    noTicketsDesc: 'You haven\'t created any support tickets yet, or no tickets match your filters.',
    all: 'All',
    loading: 'Loading tickets...',
    searchPlaceholder: 'Search subjects...',
    backToTickets: 'Back to Tickets',
    noMessages: 'No messages yet.',
    noMessagesDesc: 'Be the first to start the conversation.',
    ticketClosedMessage: 'This ticket is closed. Re-open it to send messages.',
    notFound: 'Ticket not found',
    notFoundDesc: 'The ticket you are looking for does not exist or you do not have permission to view it.',
    ticketDistribution: 'Ticket Distribution',
    details: 'Details',
    date: 'Date',
    id: 'ID',
    // Kategoriler
    catTechnical: 'Technical Issue',
    catBilling: 'Billing & Payments',
    catFeature: 'Feature Request',
    catAccess: 'Account Access',
    // Durumlar
    statOpen: 'Open',
    statResolving: 'Resolving',
    statClosed: 'Closed',
    // Öncelikler
    prioLow: 'Low',
    prioMedium: 'Medium',
    prioHigh: 'High',
    // Placeholderlar
    phSubject: 'Brief summary of the issue',
    phDesc: 'Describe the details of your request...',
    // Hata mesajları
    loginError: 'Invalid credentials. Try username: "user" or "admin"',
    fieldRequired: 'This field is required'
  },
  tr: {
    dashboard: 'Kontrol Paneli',
    tickets: 'Talepler',
    profile: 'Profil',
    logout: 'Çıkış Yap',
    createTicket: 'Talep Oluştur',
    status: 'Durum',
    situations: 'Durumlar',
    category: 'Kategori',
    categories: 'Kategoriler',
    subject: 'Konu',
    priority: 'Öncelik',
    description: 'Açıklama',
    submit: 'Talep Gönder',
    messages: 'Mesajlar',
    typeMessage: 'Yanıtınızı yazın...',
    send: 'Gönder',
    updateStatus: 'Durum Güncelle',
    totalTickets: 'Toplam Talep',
    openTickets: 'Açık Talepler',
    closedTickets: 'Kapalı Talepler',
    welcome: 'Hoşgeldiniz',
    loginTitle: 'Destek Masasına Giriş',
    loginSubtitle: 'Destek taleplerinizi verimli bir şekilde yönetin',
    username: 'Kullanıcı Adı',
    password: 'Şifre',
    role: 'Giriş Türü',
    user: 'Kullanıcı',
    admin: 'Yönetici',
    loginBtn: 'Giriş Yap',
    noTickets: 'Talep bulunamadı.',
    noTicketsDesc: 'Henüz bir destek talebi oluşturmadınız veya filtrelerinize uygun talep yok.',
    all: 'Tüm',
    loading: 'Talepler yükleniyor...',
    searchPlaceholder: 'Konularda ara...',
    backToTickets: 'Taleplere Dön',
    noMessages: 'Henüz mesaj yok.',
    noMessagesDesc: 'Konuşmayı başlatan ilk kişi siz olun.',
    ticketClosedMessage: 'Bu talep kapatıldı. Mesaj göndermek için tekrar açın.',
    notFound: 'Talep bulunamadı',
    notFoundDesc: 'Aradığınız talep mevcut değil veya görüntüleme yetkiniz yok.',
    ticketDistribution: 'Talep Dağılımı',
    details: 'Detaylar',
    date: 'Tarih',
    id: 'ID',
    // Kategoriler
    catTechnical: 'Teknik Sorun',
    catBilling: 'Fatura & Ödeme',
    catFeature: 'Özellik İsteği',
    catAccess: 'Hesap Erişimi',
    // Durumlar
    statOpen: 'Açık',
    statResolving: 'Çözümleniyor',
    statClosed: 'Kapalı',
    // Öncelikler
    prioLow: 'Düşük',
    prioMedium: 'Orta',
    prioHigh: 'Yüksek',
    // Placeholderlar
    phSubject: 'Sorunun kısa özeti',
    phDesc: 'Talebini detaylı bir şekilde açıkla...',
    // Hata mesajları
    loginError: 'Geçersiz bilgiler. Kullanıcı adı: "user" veya "admin" deneyin',
    fieldRequired: 'Bu alan zorunludur'
  }
};

export const useTranslation = () => {
  const language = useSelector((state: RootState) => state.auth.language);
  
  const t = (key: keyof typeof dictionary['en']) => {
    return dictionary[language][key] || key;
  };

  return { t, language };
};