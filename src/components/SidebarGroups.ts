export const SIDEBAR_GROUPS = [
  {
    id: 'core',
    label: 'Операційне Ядро',
    items: [
      { id: 'live-analytical-center', label: 'Живе ШІ-Ядро (Live)', badge: 'LIVE', badgeColor: 'emerald' },
      { id: 'dashboard', label: 'Аналітичний Дашборд', badge: 'LIVE', badgeColor: 'emerald' },
      { id: 'osint', label: 'OSINT Пошук', badge: 'RISK', badgeColor: 'rose' },
      { id: 'person-profiler', label: 'Досьє & Портрет Особи', badge: 'НОМІНАЛИ', badgeColor: 'rose' }
    ]
  },
  {
    id: 'specialized',
    label: 'Спеціалізовані Інструменти',
    items: [
      { id: 'maps', label: 'Інтерактивна Карта', badge: 'MAP', badgeColor: 'blue' },
      { id: 'media-forensics', label: 'Media Forensics', badge: 'AI', badgeColor: 'fuchsia' },
      { id: 'sandbox', label: 'Аналітична Пісочниця', badge: 'SANDBOX', badgeColor: 'indigo' },
      { id: 'data-ingestion', label: 'Імпорт Даних', badge: '', badgeColor: '' }
    ]
  },
  {
    id: 'admin',
    label: 'Адміністрування',
    items: [
      { id: 'admin-back-office', label: 'Back Office Консоль', badge: '', badgeColor: '' },
      { id: 'architecture', label: 'Граф залежностей', badge: '', badgeColor: '' },
      { id: 'catalog', label: 'Каталог (Legacy)', badge: '', badgeColor: '' }
    ]
  }
];
