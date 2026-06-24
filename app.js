const CONFIG = {
  appVersion: "2.09",
  storageKey: "mylife_planner_v1_events",
  langKey: "mylife_planner_v1_lang",
  appearanceKey: "mylife_planner_v1_appearance",
  themeKey: "mylife_planner_v1_theme",
  radiusKey: "mylife_planner_v1_radius",
  defaultCategoryKey: "mylife_planner_v1_default_category",
  customCategoriesKey: "mylife_planner_v1_custom_categories",
  defaultPriorityKey: "mylife_planner_v1_default_priority",
  defaultReminderKey: "mylife_planner_v1_default_reminder",
  agendaLimitKey: "mylife_planner_v1_agenda_limit",
  onboardingDoneKey: "mylife_planner_v1_onboarding_done",
  weatherEnabledKey: "mylife_planner_v1_weather_enabled",
  notificationsEnabledKey: "mylife_planner_v1_notifications_enabled",
  themes: ["lavender", "ocean", "forest", "pistachio", "rainbow", "sunset", "rose", "graphite"],
  radii: ["soft", "medium", "square"],
  recurrenceLimits: {
    daily: 90,
    weekly: 104,
    biweekly: 104,
    monthly: 36,
    quarterly: 24,
    semiannual: 16,
    yearly: 10
  },
  sentNotificationsKey: "mylife_planner_v1_sent_notifications",
  reminderCheckIntervalMs: 60000,
  mobileClockIntervalMs: 30000,
  weatherRefreshMs: 1800000
};

const ICON_PATHS = {
  today: ["M12 3.5v2", "M12 18.5v2", "M3.5 12h2", "M18.5 12h2", "M6.7 6.7l1.4 1.4", "M15.9 15.9l1.4 1.4", "M17.3 6.7l-1.4 1.4", "M8.1 15.9l-1.4 1.4"],
  bell: ["M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9", "M10 21h4"],
  plus: ["M12 7v10", "M7 12h10"],
  bolt: ["M13 2 4 14h7l-1 8 10-13h-7l0-7z"],
  history: ["M12 8v4l2.5 1.5"],
  agenda: ["M5 6h8", "M5 10h6", "M5 14h5", "M16.5 13a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z", "M16.5 15v2.1l1.4.9"],
  finance: ["M4 19V5", "M4 19h16", "M8 16v-5", "M12 16V8", "M16 16v-3"],
  family: ["M4 11 12 4l8 7", "M6 10v10h12V10", "M10 20v-6h4v6"],
  office: ["M4 21h16", "M6 21V7l6-4 6 4v14", "M9 10h.01", "M12 10h.01", "M15 10h.01", "M9 14h.01", "M12 14h.01", "M15 14h.01"],
  car: ["M5 17h14", "M6 17l1-6 2-4h6l2 4 1 6", "M8 17v2", "M16 17v2", "M8 13h8"],
  other: ["M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 3z"],
  list: ["M8 8h8", "M8 12h8", "M8 16h8", "M5 8h.01", "M5 12h.01", "M5 16h.01"],
  reminder: ["M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9", "M10 21h4"],
  actionEdit: ["M4 20l4.2-.9L18.8 8.5a2.2 2.2 0 0 0-3.1-3.1L5.1 16 4 20z", "M14.6 6.4l3 3"],
  actionCopy: ["M8 8h10v10H8z", "M6 16H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"],
  actionShare: ["M12 15V4", "M8 8l4-4 4 4", "M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"],
  actionDone: ["M5 12.5l4 4L19 6.5"],
  actionDelete: ["M5 7h14", "M10 11v6", "M14 11v6", "M8 7l1-3h6l1 3", "M7 7l1 13h8l1-13"],
  actionRestore: ["M12 6a6 6 0 1 1-5.2 3", "M6.8 9H4.2V6.4"],
  actionSeries: ["M4.5 12a4 4 0 0 1 4-4h5.8", "M11.8 5.5 14.3 8l-2.5 2.5", "M19.5 12a4 4 0 0 1-4 4H9.7", "M12.2 18.5 9.7 16l2.5-2.5"],
  actionSeriesDelete: ["M4.5 12a4 4 0 0 1 4-4h5.8", "M11.8 5.5 14.3 8l-2.5 2.5", "M19.5 12a4 4 0 0 1-4 4H9.7", "M12.2 18.5 9.7 16l2.5-2.5"],
  weatherSun: ["M12 3v2", "M12 19v2", "M3 12h2", "M19 12h2", "M5.6 5.6 7 7", "M17 17l1.4 1.4", "M18.4 5.6 17 7", "M7 17l-1.4 1.4"],
  weatherCloud: ["M6.5 18h10.2a4.3 4.3 0 0 0 .7-8.5 5.8 5.8 0 0 0-11.1 1.7A3.5 3.5 0 0 0 6.5 18z"],
  weatherFog: ["M4 10h16", "M3 14h18", "M5 18h14"],
  weatherRain: ["M6.5 15h10.2a4.3 4.3 0 0 0 .7-8.5 5.8 5.8 0 0 0-11.1 1.7A3.5 3.5 0 0 0 6.5 15z", "M8 19l-1 2", "M12 19l-1 2", "M16 19l-1 2"],
  weatherSnow: ["M12 3v18", "M4.2 7.5l15.6 9", "M19.8 7.5l-15.6 9"],
  weatherStorm: ["M6.5 15h10.2a4.3 4.3 0 0 0 .7-8.5 5.8 5.8 0 0 0-11.1 1.7A3.5 3.5 0 0 0 6.5 15z", "M13 15l-3 5h3l-1 3 4-6h-3l1-2"]
};

const QUICK_TASK_CATEGORY = "Szybka sprawa";
const DEFAULT_CATEGORIES = ["Rodzina", "Finanse", "Urzędy", "Zdrowie", "Auto", "Praca", QUICK_TASK_CATEGORY, "Inne"];

const ICON_EXTRA = {
  today: '<circle cx="12" cy="12" r="4"/>',
  history: '<circle cx="12" cy="12" r="6"/>',
  calendar: '<rect x="7" y="6" width="10" height="11" rx="2"/><path d="M9 5v3"/><path d="M15 5v3"/><path d="M7 10h10"/>',
  health: '<rect x="3" y="3" width="18" height="18" rx="5"/>',
  work: '<rect x="4" y="7" width="16" height="12" rx="2"/><path d="M9 7V5h6v2"/><path d="M4 12h16"/>',
  brand: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4.2c2.1 2.2 2.1 4.1 0 5.8-2.1-1.7-2.1-3.6 0-5.8z"/><path d="M19.8 12c-2.2 2.1-4.1 2.1-5.8 0 1.7-2.1 3.6-2.1 5.8 0z"/><path d="M12 19.8c-2.1-2.2-2.1-4.1 0-5.8 2.1 1.7 2.1 3.6 0 5.8z"/><path d="M4.2 12c2.2-2.1 4.1-2.1 5.8 0-1.7 2.1-3.6 2.1-5.8 0z"/>',
  weatherSun: '<circle cx="12" cy="12" r="4"/>',
  settings: '<g transform="translate(12 12) scale(.86) translate(-12 -12)"><path d="M9.7 2.9h4.6l.5 2.2c.6.2 1.2.5 1.7.9l2.1-.7 2.3 4-1.6 1.5c.1.4.1.8.1 1.2s0 .8-.1 1.2l1.6 1.5-2.3 4-2.1-.7c-.5.4-1.1.7-1.7.9l-.5 2.2H9.7l-.5-2.2c-.6-.2-1.2-.5-1.7-.9l-2.1.7-2.3-4 1.6-1.5a7.5 7.5 0 0 1 0-2.4L3.1 9.3l2.3-4 2.1.7c.5-.4 1.1-.7 1.7-.9l.5-2.2z"/><circle cx="12" cy="12" r="3.2"/></g>'
};

const TRANSLATIONS = {
  pl: {
    appName: "MyLife Planner",
    versionText: "Kalendarz i organizer",
    brandTagline: "Kalendarz i organizer",
    appVersionLabel: "Wersja",
    navBrand: "Info",
    aboutPurposeTitle: "O aplikacji",
    aboutPurposeText: "MyLife Planner pomaga uporządkować codzienne sprawy, terminy, płatności, wizyty i przypomnienia w jednym spokojnym miejscu.",
    aboutCreatorTitle: "Autor",
    aboutCreatorText: "Aplikacja została stworzona przez Dariusza Kaniewskiego jako praktyczny organizer do codziennego życia.",
    aboutFeaturesTitle: "Cechy",
    aboutFeatureCalendar: "Kalendarz z oznaczeniem ważnych i pilnych dni.",
    aboutFeatureRecurring: "Sprawy cykliczne i edycja całych serii.",
    aboutFeatureNotifications: "Powiadomienia i przypomnienia.",
    aboutFeatureBackup: "Eksport i import kopii zapasowej.",
    aboutBenefitsTitle: "Zalety",
    aboutBenefitsText: "Aplikacja jest lekka, działa lokalnie w przeglądarce i pozwala szybko wrócić do tego, co naprawdę trzeba załatwić.",
    aboutPrivacyTitle: "Prywatność i dane",
    aboutPrivacyText: "Twoje wydarzenia są zapisywane lokalnie w tej przeglądarce. Aplikacja nie wysyła ich na serwer. Możesz wykonać kopię zapasową albo usunąć dane z przeglądarki.",
    aboutChangesTitle: "Ostatnie zmiany",
    aboutChange209: "2.09 · Dodano ciemną ikonę aplikacji spójną z iPhone.",
    aboutChange208: "2.08 · Poprawiono listę ostatnich zmian w Info.",
    aboutChange207: "2.07 · Uproszczono ikonę przywracania.",
    aboutCopyright: "© 2026 D.K. Wszelkie prawa zastrzeżone.",
    navToday: "Dzisiaj",
    navAdd: "Dodaj",
    navCalendar: "Kalendarz",
    navAgenda: "Agenda",
    navAll: "Wszystkie",
    navHistory: "Historia",
    navSettings: "Ustawienia",
    settingsSectionPreferences: "Preferencje aplikacji",
    settingsSectionAppearance: "Wygląd i styl",
    settingsSectionDefaults: "Nowe sprawy",
    settingsSectionData: "Dane i import",
    onboardingSettingsLabel: "Pierwsze uruchomienie",
    onboardingAutoLabel: "Kreator przy starcie",
    onboardingAutoOn: "Włącz",
    onboardingAutoOff: "Wyłącz",
    onboardingOpen: "Uruchom teraz",
    onboardingSettingsNote: "Włącz, jeśli kreator ma pojawić się przy następnym uruchomieniu. Możesz go też uruchomić ręcznie.",
    onboardingTitle: "Witaj w MyLife Planner",
    onboardingIntro: "Ustaw kilka rzeczy i zacznij korzystać z organizera po swojemu.",
    onboardingWeather: "Włącz pogodę w nagłówku",
    onboardingWeatherNote: "Lokalizacja służy tylko do pobrania temperatury i nie jest zapisywana.",
    onboardingNotifications: "Włącz powiadomienia",
    onboardingSkip: "Pomiń",
    onboardingStart: "Zapisz",
    onboardingDone: "Kreator zakończony",
    todayPanel: "Dzisiaj i zaległe",
    quickTaskPlaceholder: "Wpisz szybką sprawę...",
    quickTaskAdd: "Dodaj szybką sprawę",
    quickTaskSaved: "Dodano szybką sprawę",
    upcomingPanel: "Nadchodzące",
    agendaTitle: "Agenda",
    agendaToday: "Dzisiaj",
    agendaTomorrow: "Jutro",
    agendaWeek: "Ten tydzień",
    agendaLater: "Później",
    agendaLimitLabel: "Liczba wpisów",
    agendaLimitAll: "Wszystkie",
    printAgenda: "Drukuj",
    agendaMore: "Pokazano {shown} z {total} spraw. Zmień limit, aby zobaczyć więcej.",
    agendaEmptyToday: "Na dzisiaj nie ma żadnych spraw.",
    agendaEmptyTomorrow: "Na jutro nie ma żadnych spraw.",
    agendaEmptyWeek: "W tym tygodniu nie ma kolejnych spraw.",
    agendaEmptyLater: "Brak późniejszych spraw.",
    addTitle: "Dodaj ważną sprawę",
    quickTitle: "Szybkie dodawanie",
    titleLabel: "Tytuł",
    dateLabel: "Data",
    timeLabel: "Godzina opcjonalnie",
    categoryLabel: "Kategoria",
    customCategoriesLabel: "Własne kategorie",
    customCategoryPlaceholder: "np. Wycieczki, Dom, Hobby",
    addCategory: "Dodaj kategorię",
    customCategoriesNote: "Własne kategorie pojawią się w formularzu, filtrach i kreatorze.",
    customCategoriesEmpty: "Nie dodano własnych kategorii.",
    categoryAdded: "Dodano kategorię",
    categoryExists: "Taka kategoria już istnieje",
    categoryRemoved: "Usunięto kategorię",
    priorityLabel: "Priorytet",
    priorityNormal: "Normalne",
    priorityImportant: "Ważne",
    priorityUrgent: "Pilne",
    reminderLabel: "Przypomnienie",
    recurrenceLabel: "Powtarzanie",
    recurrenceNone: "Nie powtarzaj",
    recurrenceDaily: "Codziennie",
    recurrenceWeekly: "Co tydzień",
    recurrenceBiweekly: "Co 2 tygodnie",
    recurrenceMonthly: "Co miesiąc",
    recurrenceQuarterly: "Co 3 miesiące",
    recurrenceSemiannual: "Co 6 miesięcy",
    recurrenceYearly: "Co rok",
    repeatUntilLabel: "Powtarzaj do opcjonalnie",
    noteLabel: "Notatka opcjonalnie",
    saveEvent: "Zapisz wydarzenie",
    updateEvent: "Zapisz zmiany",
    updateSeries: "Zapisz serię",
    cancelEdit: "Anuluj edycję",
    editEvent: "Edytuj",
    editSeries: "Edytuj serię",
    duplicateEvent: "Duplikuj",
    shareEvent: "Udostępnij",
    deleteEvent: "Usuń",
    restoreEvent: "Przywróć",
    eventRestored: "Przywrócono sprawę",
    deleteSeries: "Usuń serię",
    deleteSeriesConfirm: "Usunąć całą serię cykliczną?",
    seriesDeleted: "Usunięto serię",
    eventUpdated: "Zapisano zmiany",
    seriesUpdated: "Zapisano serię",
    duplicateReady: "Kopia gotowa do zapisania",
    recurringBadge: "Cykliczne",
    demoButton: "Dodaj przykładowe wydarzenia",
    removeDemoButton: "Usuń przykładowe dane",
    removeDemoConfirm: "Usunąć wszystkie przykładowe dane z aplikacji?",
    demoRemoved: "Usunięto przykładowe dane",
    demoNotFound: "Nie znaleziono przykładowych danych",
    notifyButton: "Włącz / wyłącz powiadomienia",
    notificationsEnabled: "Powiadomienia włączone",
    notificationsAlreadyEnabled: "Powiadomienia są już włączone",
    notificationsDisabled: "Powiadomienia wyłączone w aplikacji",
    notificationsUnsupported: "Ta przeglądarka nie obsługuje powiadomień",
    notificationsBlocked: "Powiadomienia nie zostały włączone",
    allTitle: "Wszystkie aktywne sprawy",
    searchLabel: "Szukaj",
    searchPlaceholder: "Tytuł, notatka, kategoria...",
    filterCategoryLabel: "Kategoria",
    filterPriorityLabel: "Priorytet",
    filterTimeLabel: "Termin",
    filterAll: "Wszystkie",
    filterOverdue: "Zaległe",
    filterToday: "Dzisiaj",
    filterUpcoming: "Nadchodzące",
    filteredEmpty: "Nie znaleziono spraw pasujących do filtrów.",
    historyTitle: "Historia zakończonych",
    clearHistory: "Wyczyść historię zakończonych",
    settingsTitle: "Ustawienia",
    languageLabel: "Język aplikacji",
    languageNote: "Wybrany język zostanie zapamiętany w tej przeglądarce.",
    appearanceLabel: "Wygląd",
    appearanceLight: "Jasny",
    appearanceDark: "Ciemny",
    appearanceSystem: "Systemowy",
    appearanceNote: "Tryb systemowy dopasowuje planner do ustawień urządzenia.",
    themeLabel: "Motyw kolorystyczny",
    themeNote: "Motyw pozwala dopasować organizer do własnego stylu.",
    radiusLabel: "Styl okien",
    radiusSoft: "Zaokrąglone",
    radiusMedium: "Lekko zaokrąglone",
    radiusSquare: "Proste",
    radiusNote: "Miękkie okna wyglądają przyjaźnie, a proste bardziej technicznie.",
    defaultsLabel: "Domyślne dla nowych spraw",
    defaultsNote: "Te wartości będą ustawiane automatycznie przy dodawaniu nowej sprawy.",
    backupLabel: "Kopia zapasowa",
    exportBackup: "Eksportuj dane",
    importBackup: "Importuj dane",
    backupNote: "Zapisz kopię wydarzeń na komputerze albo przywróć ją z pliku.",
    resetDataLabel: "Dane aplikacji",
    resetData: "Usuń wszystkie dane",
    resetDataNote: "Usuwa wydarzenia, historię, ustawienia wyglądu i zapisane przypomnienia z tej przeglądarki.",
    resetDataConfirm: "Ta operacja usunie wszystkie wydarzenia, historię i ustawienia aplikacji z tej przeglądarki. Kontynuować?",
    resetDataDone: "Dane aplikacji zostały usunięte",
    backupExported: "Kopia zapasowa zapisana",
    backupImported: "Kopia zapasowa przywrócona",
    backupInvalid: "Ten plik nie wygląda jak kopia MyLife Planner",
    backupImportConfirm: "Import zastąpi obecne wydarzenia danymi z pliku. Kontynuować?",
    calendarTransferLabel: "Kalendarz .ics",
    exportIcs: "Eksportuj .ics",
    importIcs: "Importuj .ics",
    calendarTransferNote: "Importuj wydarzenia z Google, Outlooka lub Apple Calendar albo wyeksportuj je do pliku kalendarza.",
    icsExported: "Kalendarz .ics zapisany",
    icsImported: "Zaimportowano wydarzenia",
    icsInvalid: "Ten plik nie wygląda jak kalendarz .ics",
    icsImportEmpty: "Nie znaleziono nowych wydarzeń do importu",
    icsImportConfirm: "Dodać wydarzenia z pliku .ics? Duplikaty zostaną pominięte.",
    icsShareTitle: "Wydarzenie MyLife Planner",
    icsShared: "Wydarzenie gotowe do udostępnienia",
    icsShareTargetReady: "Odebrano plik .ics",
    confirmTitle: "Potwierdzenie",
    confirmOk: "OK",
    confirmCancel: "Anuluj",
    deleteEventConfirm: "Usunąć tę sprawę?",
    clearHistoryConfirm: "Wyczyścić całą historię zakończonych spraw?",
    todayCount: "dzisiaj",
    weekCount: "w tygodniu",
    overdueCount: "zaległe"
  },
  en: {
    appName: "MyLife Planner",
    versionText: "Calendar and organizer",
    brandTagline: "Calendar and organizer",
    appVersionLabel: "Version",
    navBrand: "Info",
    aboutPurposeTitle: "About the app",
    aboutPurposeText: "MyLife Planner helps organize everyday tasks, dates, payments, appointments, and reminders in one calm place.",
    aboutCreatorTitle: "Creator",
    aboutCreatorText: "The app was created by Dariusz Kaniewski as a practical organizer for everyday life.",
    aboutFeaturesTitle: "Features",
    aboutFeatureCalendar: "Calendar with important and urgent day markers.",
    aboutFeatureRecurring: "Recurring items and full series editing.",
    aboutFeatureNotifications: "Notifications and reminders.",
    aboutFeatureBackup: "Backup export and import.",
    aboutBenefitsTitle: "Benefits",
    aboutBenefitsText: "The app is lightweight, works locally in the browser, and helps you quickly return to what needs to be handled.",
    aboutPrivacyTitle: "Privacy and data",
    aboutPrivacyText: "Your events are saved locally in this browser. The app does not send them to a server. You can create a backup or remove the data from the browser.",
    aboutChangesTitle: "Latest changes",
    aboutChange209: "2.09 · Added a dark app icon matching iPhone themes.",
    aboutChange208: "2.08 · Fixed the latest changes list in Info.",
    aboutChange207: "2.07 · Simplified the restore icon.",
    aboutCopyright: "© 2026 D.K. All rights reserved.",
    navToday: "Today",
    navAdd: "Add",
    navCalendar: "Calendar",
    navAgenda: "Agenda",
    navAll: "All",
    navHistory: "History",
    navSettings: "Settings",
    settingsSectionPreferences: "App preferences",
    settingsSectionAppearance: "Appearance and style",
    settingsSectionDefaults: "New items",
    settingsSectionData: "Data and import",
    onboardingSettingsLabel: "First launch",
    onboardingAutoLabel: "Setup on startup",
    onboardingAutoOn: "On",
    onboardingAutoOff: "Off",
    onboardingOpen: "Open now",
    onboardingSettingsNote: "Turn on if setup should appear on the next launch. You can also open it manually.",
    onboardingTitle: "Welcome to MyLife Planner",
    onboardingIntro: "Set a few things and start using the organizer your way.",
    onboardingWeather: "Enable weather in the header",
    onboardingWeatherNote: "Location is used only to fetch temperature and is not saved.",
    onboardingNotifications: "Enable notifications",
    onboardingSkip: "Skip",
    onboardingStart: "Save",
    onboardingDone: "Setup complete",
    todayPanel: "Today and overdue",
    quickTaskPlaceholder: "Type a quick task...",
    quickTaskAdd: "Add quick task",
    quickTaskSaved: "Quick task added",
    upcomingPanel: "Upcoming",
    agendaTitle: "Agenda",
    agendaToday: "Today",
    agendaTomorrow: "Tomorrow",
    agendaWeek: "This week",
    agendaLater: "Later",
    agendaLimitLabel: "Items shown",
    agendaLimitAll: "All",
    printAgenda: "Print",
    agendaMore: "Showing {shown} of {total} items. Change the limit to see more.",
    agendaEmptyToday: "No tasks for today.",
    agendaEmptyTomorrow: "No tasks for tomorrow.",
    agendaEmptyWeek: "No more tasks this week.",
    agendaEmptyLater: "No later tasks.",
    addTitle: "Add an important item",
    quickTitle: "Quick add",
    titleLabel: "Title",
    dateLabel: "Date",
    timeLabel: "Optional time",
    categoryLabel: "Category",
    customCategoriesLabel: "Custom categories",
    customCategoryPlaceholder: "e.g. Trips, Home, Hobby",
    addCategory: "Add category",
    customCategoriesNote: "Custom categories will appear in the form, filters, and setup.",
    customCategoriesEmpty: "No custom categories added.",
    categoryAdded: "Category added",
    categoryExists: "This category already exists",
    categoryRemoved: "Category removed",
    priorityLabel: "Priority",
    priorityNormal: "Normal",
    priorityImportant: "Important",
    priorityUrgent: "Urgent",
    reminderLabel: "Reminder",
    recurrenceLabel: "Repeat",
    recurrenceNone: "Do not repeat",
    recurrenceDaily: "Daily",
    recurrenceWeekly: "Weekly",
    recurrenceBiweekly: "Every 2 weeks",
    recurrenceMonthly: "Monthly",
    recurrenceQuarterly: "Every 3 months",
    recurrenceSemiannual: "Every 6 months",
    recurrenceYearly: "Yearly",
    repeatUntilLabel: "Repeat until optional",
    noteLabel: "Optional note",
    saveEvent: "Save event",
    updateEvent: "Save changes",
    updateSeries: "Save series",
    cancelEdit: "Cancel edit",
    editEvent: "Edit",
    editSeries: "Edit series",
    duplicateEvent: "Duplicate",
    shareEvent: "Share",
    deleteEvent: "Delete",
    restoreEvent: "Restore",
    eventRestored: "Task restored",
    deleteSeries: "Delete series",
    deleteSeriesConfirm: "Delete the whole recurring series?",
    seriesDeleted: "Series deleted",
    eventUpdated: "Changes saved",
    seriesUpdated: "Series saved",
    duplicateReady: "Copy ready to save",
    recurringBadge: "Recurring",
    demoButton: "Add sample events",
    removeDemoButton: "Remove sample data",
    removeDemoConfirm: "Remove all sample data from the app?",
    demoRemoved: "Sample data removed",
    demoNotFound: "No sample data found",
    notifyButton: "Enable / disable notifications",
    notificationsEnabled: "Notifications enabled",
    notificationsAlreadyEnabled: "Notifications are already enabled",
    notificationsDisabled: "Notifications disabled in the app",
    notificationsUnsupported: "Notifications are not supported",
    notificationsBlocked: "Notifications were not enabled",
    allTitle: "All active items",
    searchLabel: "Search",
    searchPlaceholder: "Title, note, category...",
    filterCategoryLabel: "Category",
    filterPriorityLabel: "Priority",
    filterTimeLabel: "Due",
    filterAll: "All",
    filterOverdue: "Overdue",
    filterToday: "Today",
    filterUpcoming: "Upcoming",
    filteredEmpty: "No items match these filters.",
    historyTitle: "Completed history",
    clearHistory: "Clear completed history",
    settingsTitle: "Settings",
    languageLabel: "App language",
    languageNote: "The selected language will be saved in this browser.",
    appearanceLabel: "Appearance",
    appearanceLight: "Light",
    appearanceDark: "Dark",
    appearanceSystem: "System",
    appearanceNote: "System mode follows this device's appearance setting.",
    themeLabel: "Color theme",
    themeNote: "The theme lets you adjust the organizer to your style.",
    radiusLabel: "Window style",
    radiusSoft: "Rounded",
    radiusMedium: "Slightly rounded",
    radiusSquare: "Straight",
    radiusNote: "Soft windows feel friendly, while straight ones look more technical.",
    defaultsLabel: "Defaults for new items",
    defaultsNote: "These values will be applied automatically when adding a new item.",
    backupLabel: "Backup",
    exportBackup: "Export data",
    importBackup: "Import data",
    backupNote: "Save a copy of your events or restore them from a file.",
    resetDataLabel: "App data",
    resetData: "Delete all data",
    resetDataNote: "Removes events, history, appearance settings, and saved reminders from this browser.",
    resetDataConfirm: "This will remove all events, history, and app settings from this browser. Continue?",
    resetDataDone: "App data deleted",
    backupExported: "Backup saved",
    backupImported: "Backup restored",
    backupInvalid: "This file does not look like a MyLife Planner backup",
    backupImportConfirm: "Import will replace current events with data from the file. Continue?",
    calendarTransferLabel: ".ics calendar",
    exportIcs: "Export .ics",
    importIcs: "Import .ics",
    calendarTransferNote: "Import events from Google, Outlook, or Apple Calendar, or export them to a calendar file.",
    icsExported: ".ics calendar saved",
    icsImported: "Events imported",
    icsInvalid: "This file does not look like an .ics calendar",
    icsImportEmpty: "No new events found to import",
    icsImportConfirm: "Add events from the .ics file? Duplicates will be skipped.",
    icsShareTitle: "MyLife Planner event",
    icsShared: "Event ready to share",
    icsShareTargetReady: ".ics file received",
    confirmTitle: "Confirmation",
    confirmOk: "OK",
    confirmCancel: "Cancel",
    deleteEventConfirm: "Delete this item?",
    clearHistoryConfirm: "Clear completed history?",
    todayCount: "today",
    weekCount: "this week",
    overdueCount: "overdue"
  }
};

const today = new Date();
const todayISO = toISO(today);
const savedTheme = localStorage.getItem(CONFIG.themeKey);
const state = {
  lang: localStorage.getItem(CONFIG.langKey) || "pl",
  appearance: localStorage.getItem(CONFIG.appearanceKey) || "light",
  theme: savedTheme === "amber" ? "lavender" : (savedTheme || "lavender"),
  radius: localStorage.getItem(CONFIG.radiusKey) || "soft",
  customCategories: readCustomCategories(),
  defaultCategory: localStorage.getItem(CONFIG.defaultCategoryKey) || "Inne",
  defaultPriority: localStorage.getItem(CONFIG.defaultPriorityKey) || "normal",
  defaultReminder: localStorage.getItem(CONFIG.defaultReminderKey) || "0",
  agendaLimit: localStorage.getItem(CONFIG.agendaLimitKey) || "20",
  weatherEnabled: localStorage.getItem(CONFIG.weatherEnabledKey) === "true",
  notificationsEnabled: localStorage.getItem(CONFIG.notificationsEnabledKey) === "true",
  events: readEvents(),
  calendarDate: new Date(),
  selectedDateISO: todayISO,
  editingId: null,
  editingMode: "single",
  onboardingSnapshot: null,
  filters: {
    query: "",
    category: "all",
    priority: "all",
    time: "all"
  }
};

const $ = id => document.getElementById(id);

function svgIcon(name, className = "icon") {
  const paths = (ICON_PATHS[name] || []).map(path => `<path d="${path}"/>`).join("");
  return `<span class="${className}"><svg viewBox="0 0 24 24">${paths}${ICON_EXTRA[name] || ""}</svg></span>`;
}

function text(key) {
  return TRANSLATIONS[state.lang][key] || TRANSLATIONS.pl[key] || key;
}

function navIconFor(view) {
  return {
    dashboard: "today",
    calendar: "calendar",
    agenda: "agenda",
    add: "plus",
    all: "list",
    done: "history",
    settings: "settings"
  }[view] || "other";
}

function updateNavLabels() {
  document.querySelectorAll("[data-nav-key]").forEach(button => {
    const label = text(button.dataset.navKey);
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
    const labelElement = button.querySelector(".sr-only");
    if (labelElement) labelElement.textContent = label;
  });
  document.querySelectorAll(".brand-nav").forEach(button => {
    button.setAttribute("aria-label", text("navBrand"));
    button.setAttribute("title", text("navBrand"));
    const labelElement = button.querySelector(".sr-only");
    if (labelElement) labelElement.textContent = text("navBrand");
  });
}

function updateVersionText() {
  $("aboutFooterText").textContent = `${text("aboutCopyright")} · ${text("appVersionLabel")} ${CONFIG.appVersion}`;
}

function mountNavIcons() {
  document.querySelectorAll(".icon-nav[data-view]").forEach(button => {
    const iconName = navIconFor(button.dataset.view);
    button.innerHTML = `${svgIcon(iconName, "nav-icon")}<span class="sr-only"></span>`;
  });
  document.querySelectorAll(".brand-nav").forEach(button => {
    button.innerHTML = `${svgIcon("brand", "nav-icon")}<span class="sr-only"></span>`;
  });
  $("aboutMark").innerHTML = document.querySelector(".brand-mark").innerHTML;
  $("onboardingMark").innerHTML = document.querySelector(".brand-mark").innerHTML;
  updateNavLabels();
  updateVersionText();
}

function setAboutOpen(open) {
  $("aboutLayer").classList.toggle("hidden", !open);
  document.querySelectorAll(".brand-nav").forEach(button => {
    button.classList.toggle("active", open);
    button.setAttribute("aria-expanded", String(open));
  });
  if (open) $("aboutClose").focus();
}

function toggleAboutDialog() {
  setAboutOpen($("aboutLayer").classList.contains("hidden"));
}

function syncOnboardingControls() {
  $("onboardingAppearance").value = state.appearance;
  $("onboardingTheme").value = state.theme;
  $("onboardingRadius").value = state.radius;
  $("onboardingCategory").value = state.defaultCategory;
  $("onboardingPriority").value = state.defaultPriority;
  $("onboardingReminder").value = state.defaultReminder;
  $("onboardingWeather").checked = state.weatherEnabled;
  $("onboardingNotifications").checked = state.notificationsEnabled;
}

function syncOnboardingAutoControls() {
  const autoEnabled = localStorage.getItem(CONFIG.onboardingDoneKey) !== "true";
  document.querySelectorAll(".onboarding-auto-btn").forEach(button => {
    button.classList.toggle("active", String(autoEnabled) === button.dataset.onboardingAuto);
  });
}

function captureOnboardingSnapshot() {
  state.onboardingSnapshot = {
    appearance: state.appearance,
    theme: state.theme,
    radius: state.radius
  };
}

function applyOnboardingPreview() {
  state.appearance = $("onboardingAppearance").value;
  state.theme = $("onboardingTheme").value;
  state.radius = $("onboardingRadius").value;
  applyAppearance();
  applyTheme();
  applyRadius();
}

function restoreOnboardingPreview() {
  if (!state.onboardingSnapshot) return;
  state.appearance = state.onboardingSnapshot.appearance;
  state.theme = state.onboardingSnapshot.theme;
  state.radius = state.onboardingSnapshot.radius;
  state.onboardingSnapshot = null;
  applyAppearance();
  applyTheme();
  applyRadius();
}

function setOnboardingOpen(open) {
  $("onboardingLayer").classList.toggle("hidden", !open);
  if (open) {
    captureOnboardingSnapshot();
    syncOnboardingControls();
    $("onboardingStart").focus();
  }
}

function finishOnboarding() {
  savePreference(CONFIG.onboardingDoneKey, "true");
  state.onboardingSnapshot = null;
  syncOnboardingAutoControls();
  setOnboardingOpen(false);
}

function cancelOnboarding(markDone = false) {
  restoreOnboardingPreview();
  if (markDone) savePreference(CONFIG.onboardingDoneKey, "true");
  syncOnboardingAutoControls();
  setOnboardingOpen(false);
}

function setOnboardingAuto(enabled) {
  if (enabled) localStorage.removeItem(CONFIG.onboardingDoneKey);
  else savePreference(CONFIG.onboardingDoneKey, "true");
  syncOnboardingAutoControls();
  showToast(enabled
    ? (state.lang === "pl" ? "Kreator pokaże się przy starcie" : "Setup will show on startup")
    : (state.lang === "pl" ? "Kreator przy starcie wyłączony" : "Startup setup disabled")
  );
}

function locale() {
  return state.lang === "pl" ? "pl-PL" : "en-GB";
}

function toISO(date) {
  const pad = value => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function fromISO(dateISO) {
  return new Date(`${dateISO}T00:00`);
}

function lastDayOfMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function addClampedMonths(date, months, anchorDay = date.getDate()) {
  const next = new Date(date);
  next.setDate(1);
  next.setMonth(next.getMonth() + months);
  next.setDate(Math.min(anchorDay, lastDayOfMonth(next.getFullYear(), next.getMonth())));
  return next;
}

function addClampedYears(date, years, anchorDay = date.getDate()) {
  const next = new Date(date);
  next.setDate(1);
  next.setFullYear(next.getFullYear() + years);
  next.setDate(Math.min(anchorDay, lastDayOfMonth(next.getFullYear(), next.getMonth())));
  return next;
}

function sanitize(value) {
  return String(value || "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[char]));
}

function readEvents() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CONFIG.storageKey) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function normalizeCategoryName(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function categoryKey(value) {
  return normalizeCategoryName(value).toLocaleLowerCase("pl-PL");
}

function uniqueCategories(categories) {
  const seen = new Set();
  return categories
    .map(normalizeCategoryName)
    .filter(Boolean)
    .filter(category => {
      const key = categoryKey(category);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function readCustomCategories() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CONFIG.customCategoriesKey) || "[]");
    if (!Array.isArray(parsed)) return [];
    const defaultKeys = new Set(DEFAULT_CATEGORIES.map(categoryKey));
    return uniqueCategories(parsed).filter(category => !defaultKeys.has(categoryKey(category)));
  } catch {
    return [];
  }
}

function saveEvents() {
  localStorage.setItem(CONFIG.storageKey, JSON.stringify(state.events));
}

function savePreference(key, value) {
  localStorage.setItem(key, value);
}

function saveCustomCategories() {
  localStorage.setItem(CONFIG.customCategoriesKey, JSON.stringify(state.customCategories));
}

function backupPayload() {
  return {
    app: "MyLife Planner",
    version: 1,
    exportedAt: new Date().toISOString(),
    events: state.events,
    preferences: {
      lang: state.lang,
      appearance: state.appearance,
      theme: state.theme,
      radius: state.radius,
      customCategories: state.customCategories,
      defaultCategory: state.defaultCategory,
      defaultPriority: state.defaultPriority,
      defaultReminder: state.defaultReminder,
      agendaLimit: state.agendaLimit,
      weatherEnabled: state.weatherEnabled,
      notificationsEnabled: state.notificationsEnabled
    }
  };
}

function downloadBackup() {
  const blob = new Blob([JSON.stringify(backupPayload(), null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `mylife-planner-backup-${toISO(new Date())}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
  showToast(text("backupExported"));
}

function normalizeImportedEvents(payload) {
  const events = Array.isArray(payload) ? payload : payload?.events;
  if (!Array.isArray(events)) throw new Error("Invalid backup");
  return events.map(event => ({
    id: String(event.id || crypto.randomUUID()),
    title: String(event.title || "").trim(),
    date: String(event.date || ""),
    time: String(event.time || ""),
    category: String(event.category || "Inne"),
    priority: ["normal", "important", "urgent"].includes(event.priority) ? event.priority : "normal",
    reminder: String(event.reminder ?? "0"),
    reminderText: String(event.reminderText || ""),
    note: String(event.note || ""),
    done: Boolean(event.done),
    createdAt: String(event.createdAt || new Date().toISOString()),
    seriesId: event.seriesId ? String(event.seriesId) : null,
    occurrenceIndex: Number(event.occurrenceIndex || 0),
    recurrence: String(event.recurrence || "none"),
    recurrenceText: String(event.recurrenceText || "")
  })).filter(event => event.title && /^\d{4}-\d{2}-\d{2}$/.test(event.date));
}

function applyImportedPreferences(preferences = {}) {
  if (["pl", "en"].includes(preferences.lang)) state.lang = preferences.lang;
  if (["light", "dark", "system"].includes(preferences.appearance)) state.appearance = preferences.appearance;
  if (CONFIG.themes.includes(preferences.theme)) state.theme = preferences.theme;
  if (CONFIG.radii.includes(preferences.radius)) state.radius = preferences.radius;
  if (Array.isArray(preferences.customCategories)) {
    const defaultKeys = new Set(DEFAULT_CATEGORIES.map(categoryKey));
    state.customCategories = uniqueCategories(preferences.customCategories)
      .filter(category => !defaultKeys.has(categoryKey(category)));
  }
  if (eventCategoryOptions().includes(preferences.defaultCategory)) state.defaultCategory = preferences.defaultCategory;
  if (["normal", "important", "urgent"].includes(preferences.defaultPriority)) state.defaultPriority = preferences.defaultPriority;
  if (["0", "1", "3", "7", "14"].includes(String(preferences.defaultReminder))) state.defaultReminder = String(preferences.defaultReminder);
  if (["10", "20", "50", "all"].includes(String(preferences.agendaLimit))) state.agendaLimit = String(preferences.agendaLimit);
  if (typeof preferences.weatherEnabled === "boolean") state.weatherEnabled = preferences.weatherEnabled;
  if (typeof preferences.notificationsEnabled === "boolean") state.notificationsEnabled = preferences.notificationsEnabled;

  savePreference(CONFIG.langKey, state.lang);
  savePreference(CONFIG.appearanceKey, state.appearance);
  savePreference(CONFIG.themeKey, state.theme);
  savePreference(CONFIG.radiusKey, state.radius);
  savePreference(CONFIG.defaultCategoryKey, state.defaultCategory);
  savePreference(CONFIG.defaultPriorityKey, state.defaultPriority);
  savePreference(CONFIG.defaultReminderKey, state.defaultReminder);
  savePreference(CONFIG.agendaLimitKey, state.agendaLimit);
  savePreference(CONFIG.weatherEnabledKey, String(state.weatherEnabled));
  savePreference(CONFIG.notificationsEnabledKey, String(state.notificationsEnabled));
}

function restoreDefaultState() {
  state.lang = "pl";
  state.appearance = "light";
  state.theme = "lavender";
  state.radius = "soft";
  state.customCategories = [];
  state.defaultCategory = "Inne";
  state.defaultPriority = "normal";
  state.defaultReminder = "0";
  state.agendaLimit = "20";
  state.weatherEnabled = false;
  state.notificationsEnabled = false;
  state.events = [];
  state.calendarDate = new Date();
  state.selectedDateISO = todayISO;
  state.editingId = null;
  state.editingMode = "single";
  state.filters = { query: "", category: "all", priority: "all", time: "all" };
}

function clearStoredAppData() {
  [
    CONFIG.storageKey,
    CONFIG.langKey,
    CONFIG.appearanceKey,
    CONFIG.themeKey,
    CONFIG.radiusKey,
    CONFIG.customCategoriesKey,
    CONFIG.defaultCategoryKey,
    CONFIG.defaultPriorityKey,
    CONFIG.defaultReminderKey,
    CONFIG.agendaLimitKey,
    CONFIG.onboardingDoneKey,
    CONFIG.weatherEnabledKey,
    CONFIG.notificationsEnabledKey,
    CONFIG.sentNotificationsKey
  ].forEach(key => localStorage.removeItem(key));
}

async function resetAppData() {
  if (!await showConfirm(text("resetDataConfirm"), { icon: "history" })) return;
  clearStoredAppData();
  restoreDefaultState();
  resetEventForm();
  applyLanguage();
  applyAppearance();
  applyTheme();
  applyRadius();
  $("headerWeather").classList.add("hidden");
  render();
  setView("dashboard");
  showToast(text("resetDataDone"));
}

async function importBackupFile(file) {
  if (!file) return;
  try {
    const payload = JSON.parse(await file.text());
    const importedEvents = normalizeImportedEvents(payload);
    if (!await showConfirm(text("backupImportConfirm"), { icon: "history" })) return;
    state.events = importedEvents;
    applyImportedPreferences(payload.preferences);
    saveEvents();
    applyAppearance();
    applyTheme();
    applyRadius();
    applyLanguage();
    if (state.weatherEnabled) loadHeaderWeather();
    else $("headerWeather").classList.add("hidden");
    render();
    showToast(text("backupImported"));
  } catch {
    showToast(text("backupInvalid"));
  } finally {
    $("backupFile").value = "";
  }
}

function icsEscape(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function icsUnescape(value) {
  return String(value || "")
    .replace(/\\n/gi, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\")
    .trim();
}

function foldIcsLine(line) {
  const chunks = [];
  let rest = line;
  while (rest.length > 74) {
    chunks.push(rest.slice(0, 74));
    rest = ` ${rest.slice(74)}`;
  }
  chunks.push(rest);
  return chunks.join("\r\n");
}

function icsDate(event) {
  return String(event.date || "").replaceAll("-", "");
}

function icsDateTime(event) {
  const date = icsDate(event);
  const time = String(event.time || "00:00").replace(":", "");
  return `${date}T${time}00`;
}

function icsPriority(priority) {
  if (priority === "urgent") return "1";
  if (priority === "important") return "5";
  return "9";
}

function priorityFromIcs(value) {
  const priority = Number(value);
  if (priority >= 1 && priority <= 3) return "urgent";
  if (priority >= 4 && priority <= 6) return "important";
  return "normal";
}

function rruleFromEvent(event, count) {
  const rule = {
    daily: "FREQ=DAILY",
    weekly: "FREQ=WEEKLY",
    biweekly: "FREQ=WEEKLY;INTERVAL=2",
    monthly: "FREQ=MONTHLY",
    quarterly: "FREQ=MONTHLY;INTERVAL=3",
    semiannual: "FREQ=MONTHLY;INTERVAL=6",
    yearly: "FREQ=YEARLY"
  }[event.recurrence];
  return rule ? rule + (count > 1 ? `;COUNT=${count}` : "") : "";
}

function recurrenceFromRrule(rrule) {
  const parts = Object.fromEntries(String(rrule || "").split(";").map(part => {
    const [key, value] = part.split("=");
    return [key?.toUpperCase(), value?.toUpperCase()];
  }));
  const interval = Number(parts.INTERVAL || 1);
  if (parts.FREQ === "DAILY" && interval === 1) return "daily";
  if (parts.FREQ === "WEEKLY" && interval === 1) return "weekly";
  if (parts.FREQ === "WEEKLY" && interval === 2) return "biweekly";
  if (parts.FREQ === "MONTHLY" && interval === 1) return "monthly";
  if (parts.FREQ === "MONTHLY" && interval === 3) return "quarterly";
  if (parts.FREQ === "MONTHLY" && interval === 6) return "semiannual";
  if (parts.FREQ === "YEARLY" && interval === 1) return "yearly";
  return null;
}

function rruleCount(rrule) {
  const match = String(rrule || "").match(/(?:^|;)COUNT=(\d+)/i);
  return match ? Number(match[1]) : null;
}

function rruleUntil(rrule) {
  const match = String(rrule || "").match(/(?:^|;)UNTIL=([^;]+)/i);
  const parsed = match ? parseIcsDate(match[1], false) : null;
  return parsed?.date || "";
}

function extractIcsMetadata(description, values) {
  const lines = String(description || "").split(/\n+/);
  let category = icsUnescape(values["X-MYLIFE-CATEGORY"]?.value || "");
  let reminder = icsUnescape(values["X-MYLIFE-REMINDER"]?.value || "0");
  let reminderText = icsUnescape(values["X-MYLIFE-REMINDER-TEXT"]?.value || "");
  const keptLines = [];

  lines.forEach(line => {
    const trimmed = line.trim();
    const categoryMatch = trimmed.match(/^(Kategoria|Category):\s*(.+)$/i);
    const reminderMatch = trimmed.match(/^(Przypomnienie|Reminder):\s*(.+)$/i);
    if (categoryMatch) {
      category = category || categoryMatch[2].trim();
      return;
    }
    if (reminderMatch) {
      reminderText = reminderText || reminderMatch[2].trim();
      return;
    }
    keptLines.push(line);
  });

  return {
    category: category || "Inne",
    reminder: reminder || "0",
    reminderText,
    note: keptLines.join("\n").trim()
  };
}

function exportableIcsEvents(events) {
  const exported = [];
  const handledSeries = new Set();

  events
    .filter(event => event.title && event.date)
    .forEach(event => {
      if (!event.seriesId || event.recurrence === "none") {
        exported.push({ event, count: 1 });
        return;
      }
      if (handledSeries.has(event.seriesId)) return;
      const series = events
        .filter(item => item.seriesId === event.seriesId)
        .sort((a, b) => a.date.localeCompare(b.date));
      handledSeries.add(event.seriesId);
      exported.push({ event: series[0] || event, count: series.length || 1 });
    });

  return exported;
}

function buildIcsContent(events) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MyLife Planner//Calendar Export//PL",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH"
  ];

  exportableIcsEvents(events).forEach(({ event, count }) => {
    const description = [
      event.note,
      event.category ? `${text("categoryLabel")}: ${event.category}` : "",
      event.priority && event.priority !== "normal" ? `${text("priorityLabel")}: ${priorityLabel(event.priority)}` : "",
      event.reminderText ? `${text("reminderLabel")}: ${event.reminderText}` : ""
    ].filter(Boolean).join("\n");

    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${icsEscape(event.id || crypto.randomUUID())}@mylife-planner`);
    lines.push(`DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")}`);
    if (event.time) lines.push(`DTSTART:${icsDateTime(event)}`);
    else lines.push(`DTSTART;VALUE=DATE:${icsDate(event)}`);
    lines.push(`SUMMARY:${icsEscape(event.title)}`);
    lines.push(`PRIORITY:${icsPriority(event.priority)}`);
    if (event.category) lines.push(`X-MYLIFE-CATEGORY:${icsEscape(event.category)}`);
    if (event.reminder) lines.push(`X-MYLIFE-REMINDER:${icsEscape(event.reminder)}`);
    if (event.reminderText) lines.push(`X-MYLIFE-REMINDER-TEXT:${icsEscape(event.reminderText)}`);
    const rrule = event.seriesId && event.recurrence && event.recurrence !== "none"
      ? rruleFromEvent(event, count)
      : "";
    if (rrule) {
      lines.push(`RRULE:${rrule}`);
    }
    if (description) lines.push(`DESCRIPTION:${icsEscape(description)}`);
    if (event.done) lines.push("STATUS:COMPLETED");
    lines.push("END:VEVENT");
  });

  lines.push("END:VCALENDAR");
  return lines.map(foldIcsLine).join("\r\n");
}

function downloadBlob(blob, filename) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

function icsFilename(event) {
  const cleanTitle = normalizedMatchValue(event.title)
    .replace(/[^a-z0-9ąćęłńóśźż-]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "wydarzenie";
  return `mylife-${cleanTitle}-${event.date}.ics`;
}

function downloadIcsCalendar() {
  const blob = new Blob([buildIcsContent(state.events)], { type: "text/calendar;charset=utf-8" });
  downloadBlob(blob, `mylife-planner-calendar-${toISO(new Date())}.ics`);
  showToast(text("icsExported"));
}

async function shareEvent(id) {
  const event = state.events.find(item => item.id === id);
  if (!event) return;
  const blob = new Blob([buildIcsContent([event])], { type: "text/calendar;charset=utf-8" });
  const file = new File([blob], icsFilename(event), { type: "text/calendar" });

  if (navigator.canShare && navigator.share && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        title: text("icsShareTitle"),
        text: event.title,
        files: [file]
      });
      showToast(text("icsShared"));
      return;
    } catch (error) {
      if (error?.name === "AbortError") return;
    }
  }

  downloadBlob(blob, file.name);
  showToast(text("icsShared"));
}

function parseIcsDate(value, dateOnly) {
  const raw = String(value || "").trim();
  const match = raw.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?(Z)?)?/);
  if (!match) return null;
  const [, year, month, day, hour = "00", minute = "00", second = "00", utc] = match;

  if (utc) {
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second)));
    return {
      date: toISO(date),
      time: dateOnly ? "" : `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
    };
  }

  return {
    date: `${year}-${month}-${day}`,
    time: dateOnly || !raw.includes("T") ? "" : `${hour}:${minute}`
  };
}

function parseIcsEvents(content) {
  const unfolded = String(content || "").replace(/\r?\n[ \t]/g, "");
  const blocks = unfolded.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) || [];
  return blocks.flatMap(block => {
    const values = {};
    block.split(/\r?\n/).forEach(line => {
      const separator = line.indexOf(":");
      if (separator === -1) return;
      const keyPart = line.slice(0, separator);
      const value = line.slice(separator + 1);
      const [name, ...params] = keyPart.split(";");
      const key = name.toUpperCase();
      if (!values[key]) values[key] = { value, params };
    });

    const dtStart = values.DTSTART;
    const parsedDate = parseIcsDate(dtStart?.value, dtStart?.params.some(param => param.toUpperCase() === "VALUE=DATE"));
    if (!parsedDate) return null;

    const location = icsUnescape(values.LOCATION?.value || "");
    const description = icsUnescape(values.DESCRIPTION?.value || "");
    const metadata = extractIcsMetadata(description, values);
    const note = [metadata.note, location ? `${state.lang === "pl" ? "Miejsce" : "Location"}: ${location}` : ""]
      .filter(Boolean)
      .join("\n");

    const baseEvent = {
      title: icsUnescape(values.SUMMARY?.value || values.UID?.value || ""),
      date: parsedDate.date,
      time: parsedDate.time,
      category: metadata.category,
      priority: priorityFromIcs(values.PRIORITY?.value),
      reminder: metadata.reminder,
      reminderText: metadata.reminderText,
      note,
      done: String(values.STATUS?.value || "").toUpperCase() === "COMPLETED"
    };

    const recurrence = recurrenceFromRrule(values.RRULE?.value);
    if (!recurrence) return [baseEvent];

    const count = rruleCount(values.RRULE.value);
    const repeatUntil = rruleUntil(values.RRULE.value);
    return buildRecurringEvents(baseEvent, recurrence, repeatUntil)
      .slice(0, count || undefined)
      .map(event => ({ ...event, done: baseEvent.done }));
  }).filter(event => event?.title && event.date);
}

async function importIcsContent(content, cleanup = () => {}) {
  try {
    const imported = parseIcsEvents(content);
    if (!imported.length) {
      showToast(text("icsImportEmpty"));
      return;
    }

    const existingSignatures = new Set(state.events.map(icsEventSignature));
    const uniqueEvents = imported.filter(event => {
      const signature = icsEventSignature(event);
      if (existingSignatures.has(signature)) return false;
      existingSignatures.add(signature);
      return true;
    });

    if (!uniqueEvents.length) {
      showToast(text("icsImportEmpty"));
      return;
    }

    const skipped = imported.length - uniqueEvents.length;
    const message = `${text("icsImportConfirm")}\n\n${state.lang === "pl" ? "Nowe wydarzenia" : "New events"}: ${uniqueEvents.length}${skipped ? `, ${state.lang === "pl" ? "pominięte duplikaty" : "skipped duplicates"}: ${skipped}` : ""}`;
    if (!await showConfirm(message, { icon: "calendar" })) return;

    state.events.push(...uniqueEvents.map(createEventRecord));
    saveEvents();
    render();
    setView("all");
    showToast(`${text("icsImported")}: ${uniqueEvents.length}`);
  } catch {
    showToast(text("icsInvalid"));
  } finally {
    await cleanup();
  }
}

async function importIcsFile(file) {
  if (!file) return;
  try {
    await importIcsContent(await file.text(), () => {
      $("icsFile").value = "";
    });
  } catch {
    showToast(text("icsInvalid"));
    $("icsFile").value = "";
  }
}

async function clearSharedIcsPayload() {
  if (!("caches" in window)) return;
  const keys = await caches.keys();
  await Promise.all(keys.map(async key => {
    const cache = await caches.open(key);
    await cache.delete("shared-ics.json");
  }));
}

async function handleSharedIcsLaunch() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("shareTarget") !== "ics" || !("caches" in window)) return;

  try {
    const keys = await caches.keys();
    let response = null;
    for (const key of keys) {
      const cache = await caches.open(key);
      response = await cache.match("shared-ics.json");
      if (response) break;
    }
    if (!response) return;

    const payload = await response.json();
    showToast(text("icsShareTargetReady"));
    await importIcsContent(payload.content || "", clearSharedIcsPayload);
  } catch {
    showToast(text("icsInvalid"));
    await clearSharedIcsPayload();
  } finally {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

function prefersDark() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function showConfirm(message, options = {}) {
  return new Promise(resolve => {
    const layer = $("confirmLayer");
    const okButton = $("confirmOk");
    const cancelButton = $("confirmCancel");
    const title = $("confirmTitle");
    const content = $("confirmMessage");
    const icon = $("confirmIcon");

    title.textContent = options.title || text("confirmTitle");
    content.textContent = message;
    icon.innerHTML = svgIcon(options.icon || "bell", "cat-icon");
    okButton.textContent = options.okText || text("confirmOk");
    cancelButton.textContent = options.cancelText || text("confirmCancel");
    layer.classList.remove("hidden");
    okButton.focus();

    const close = result => {
      layer.classList.add("hidden");
      okButton.removeEventListener("click", onOk);
      cancelButton.removeEventListener("click", onCancel);
      layer.removeEventListener("click", onBackdrop);
      document.removeEventListener("keydown", onKeyDown);
      resolve(result);
    };
    const onOk = () => close(true);
    const onCancel = () => close(false);
    const onBackdrop = event => {
      if (event.target === layer) close(false);
    };
    const onKeyDown = event => {
      if (event.key === "Escape") close(false);
      if (event.key === "Enter") close(true);
    };

    okButton.addEventListener("click", onOk);
    cancelButton.addEventListener("click", onCancel);
    layer.addEventListener("click", onBackdrop);
    document.addEventListener("keydown", onKeyDown);
  });
}

function applyTheme() {
  document.body.classList.remove(...CONFIG.themes.map(theme => `theme-${theme}`));
  document.body.classList.add(`theme-${state.theme}`);
  document.querySelectorAll(".theme-btn").forEach(button => {
    button.classList.toggle("active", button.dataset.theme === state.theme);
  });
}

function applyAppearance() {
  const isDark = state.appearance === "dark" || (state.appearance === "system" && prefersDark());
  document.body.classList.toggle("appearance-dark", isDark);
  document.querySelectorAll(".appearance-btn").forEach(button => {
    button.classList.toggle("active", button.dataset.appearance === state.appearance);
  });
}

function applyRadius() {
  document.body.classList.remove(...CONFIG.radii.map(radius => `radius-${radius}`));
  document.body.classList.add(`radius-${state.radius}`);
  document.querySelectorAll(".radius-btn").forEach(button => {
    button.classList.toggle("active", button.dataset.radius === state.radius);
  });
}

function syncDefaultControls() {
  $("defaultCategory").value = state.defaultCategory;
  $("defaultPriority").value = state.defaultPriority;
  $("defaultReminder").value = state.defaultReminder;
}

function applyLanguage() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = text(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    element.placeholder = text(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(element => {
    const label = text(element.dataset.i18nAria);
    element.setAttribute("aria-label", label);
    element.setAttribute("title", label);
  });
  updateNavLabels();
  updateVersionText();
  document.querySelectorAll(".language-btn").forEach(button => {
    button.classList.toggle("active", button.dataset.lang === state.lang);
  });
  syncOnboardingAutoControls();
  document.querySelectorAll(".appearance-btn").forEach(button => {
    button.classList.toggle("active", button.dataset.appearance === state.appearance);
  });
  refreshCategoryControls();
  syncDefaultControls();
  renderHeaderDateTime();
  setEditingMode(Boolean(state.editingId));
}

function daysBetween(dateISO) {
  const start = new Date(`${todayISO}T00:00`);
  const target = new Date(`${dateISO}T00:00`);
  return Math.round((target - start) / 86400000);
}

function formatDate(event) {
  const date = new Date(`${event.date}T00:00`);
  const formattedDate = date.toLocaleDateString(locale(), {
    weekday: "short",
    day: "numeric",
    month: "short"
  });
  return event.time ? `${formattedDate}, ${event.time}` : formattedDate;
}

function relativeDateLabel(dateISO) {
  const diff = daysBetween(dateISO);
  if (state.lang === "pl") {
    if (diff === 0) return "Dzisiaj";
    if (diff === 1) return "Jutro";
    if (diff < 0) return `${Math.abs(diff)} dni po terminie`;
    return `Za ${diff} dni`;
  }
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff < 0) return `${Math.abs(diff)} days overdue`;
  return `In ${diff} days`;
}

function recurrenceLabel(recurrence) {
  if (!recurrence || recurrence === "none") return "";
  return text(`recurrence${recurrence[0].toUpperCase()}${recurrence.slice(1)}`);
}

function priorityLabel(priority) {
  if (priority === "urgent") return text("priorityUrgent");
  if (priority === "important") return text("priorityImportant");
  return text("priorityNormal");
}

function priorityRank(priority) {
  if (priority === "urgent") return 0;
  if (priority === "important") return 1;
  return 2;
}

function priorityPrefix(priority) {
  if (priority === "urgent") return priorityLabel(priority);
  if (priority === "important") return priorityLabel(priority);
  return "";
}

function highestPriority(events) {
  if (events.some(event => event.priority === "urgent")) return "urgent";
  if (events.some(event => event.priority === "important")) return "important";
  return "normal";
}

function eventCategoryOptions() {
  return uniqueCategories([
    ...DEFAULT_CATEGORIES,
    ...state.customCategories,
    state.defaultCategory,
    ...state.events.map(event => event.category)
  ]);
}

function renderCategorySelect(selectId, selectedValue, includeAll = false) {
  const options = eventCategoryOptions();
  const allOption = includeAll ? `<option value="all" data-i18n="filterAll">${sanitize(text("filterAll"))}</option>` : "";
  const value = selectedValue && (selectedValue === "all" || options.includes(selectedValue))
    ? selectedValue
    : (includeAll ? "all" : options[0]);
  $(selectId).innerHTML = `${allOption}${options.map(category =>
    `<option value="${sanitize(category)}">${sanitize(category)}</option>`
  ).join("")}`;
  $(selectId).value = value || (includeAll ? "all" : options[0]);
  if (selectId === "filterCategory") state.filters.category = $(selectId).value;
}

function renderCustomCategories() {
  const list = $("customCategoryList");
  if (!state.customCategories.length) {
    list.innerHTML = `<div class="empty compact-empty">${text("customCategoriesEmpty")}</div>`;
    return;
  }
  list.innerHTML = state.customCategories.map(category => `
    <div class="category-chip">
      <span>${sanitize(category)}</span>
      <button type="button" data-category-delete="${sanitize(category)}" aria-label="${sanitize(text("deleteEvent"))}">×</button>
    </div>
  `).join("");
}

function refreshCategoryControls() {
  renderCategorySelect("category", $("category").value || state.defaultCategory);
  renderCategorySelect("defaultCategory", state.defaultCategory);
  renderCategorySelect("onboardingCategory", $("onboardingCategory").value || state.defaultCategory);
  renderCategorySelect("filterCategory", state.filters.category, true);
  renderCustomCategories();
}

function addCustomCategory() {
  const input = $("customCategoryInput");
  const category = normalizeCategoryName(input.value);
  if (!category) return;
  if (eventCategoryOptions().some(existing => categoryKey(existing) === categoryKey(category))) {
    showToast(text("categoryExists"));
    return;
  }
  state.customCategories.push(category);
  state.customCategories = uniqueCategories(state.customCategories);
  saveCustomCategories();
  input.value = "";
  refreshCategoryControls();
  showToast(text("categoryAdded"));
}

function deleteCustomCategory(category) {
  state.customCategories = state.customCategories.filter(item => categoryKey(item) !== categoryKey(category));
  if (categoryKey(state.defaultCategory) === categoryKey(category)) {
    state.defaultCategory = "Inne";
    savePreference(CONFIG.defaultCategoryKey, state.defaultCategory);
  }
  saveCustomCategories();
  refreshCategoryControls();
  render();
  showToast(text("categoryRemoved"));
}

function categoryIcon(category) {
  const normalized = String(category || "").toLowerCase();
  if (normalized.includes("fin")) return svgIcon("finance", "cat-icon");
  if (normalized.includes("rodz") || normalized.includes("family")) return svgIcon("family", "cat-icon");
  if (normalized.includes("urz") || normalized.includes("office")) return svgIcon("office", "cat-icon");
  if (normalized.includes("zdrow") || normalized.includes("health")) return svgIcon("health", "cat-icon");
  if (normalized.includes("auto") || normalized.includes("car")) return svgIcon("car", "cat-icon");
  if (normalized.includes("prac") || normalized.includes("work")) return svgIcon("work", "cat-icon");
  if (normalized.includes("szyb") || normalized.includes("quick")) return svgIcon("plus", "cat-icon");
  return svgIcon("other", "cat-icon");
}

function renderEvent(event) {
  const note = event.note ? `<div class="event-note">${sanitize(event.note)}</div>` : "";
  const priority = event.priority || "normal";
  const priorityBadge = priority !== "normal"
    ? `<span class="priority-badge priority-${sanitize(priority)}">${sanitize(priorityLabel(priority))}</span>`
    : "";
  const doneLabel = sanitize(text("confirmOk"));
  const restoreLabel = sanitize(text("restoreEvent"));
  const deleteLabel = sanitize(text("deleteEvent"));
  const editLabel = sanitize(text("editEvent"));
  const editSeriesLabel = sanitize(text("editSeries"));
  const duplicateLabel = sanitize(text("duplicateEvent"));
  const shareLabel = sanitize(text("shareEvent"));
  const deleteSeriesLabel = sanitize(text("deleteSeries"));
  const doneButton = event.done ? "" : `<button class="mini-action done" type="button" data-action="done" data-id="${sanitize(event.id)}" aria-label="${doneLabel}" title="${doneLabel}">${svgIcon("actionDone", "action-icon")}</button>`;
  const restoreButton = event.done ? `<button class="mini-action restore" type="button" data-action="restore" data-id="${sanitize(event.id)}" aria-label="${restoreLabel}" title="${restoreLabel}">${svgIcon("actionRestore", "action-icon")}</button>` : "";
  const editButton = event.done ? "" : `<button class="mini-action edit" type="button" data-action="edit" data-id="${sanitize(event.id)}" aria-label="${editLabel}" title="${editLabel}">${svgIcon("actionEdit", "action-icon")}</button>`;
  const editSeriesButton = event.done || !event.seriesId ? "" : `<button class="mini-action series-edit" type="button" data-action="edit-series" data-id="${sanitize(event.id)}" aria-label="${editSeriesLabel}" title="${editSeriesLabel}">${svgIcon("actionSeries", "action-icon")}</button>`;
  const duplicateButton = event.done ? "" : `<button class="mini-action duplicate" type="button" data-action="duplicate" data-id="${sanitize(event.id)}" aria-label="${duplicateLabel}" title="${duplicateLabel}">${svgIcon("actionCopy", "action-icon")}</button>`;
  const shareButton = `<button class="mini-action share" type="button" data-action="share" data-id="${sanitize(event.id)}" aria-label="${shareLabel}" title="${shareLabel}">${svgIcon("actionShare", "action-icon")}</button>`;
  const deleteSeriesButton = event.done || !event.seriesId ? "" : `<button class="mini-action series-delete" type="button" data-action="delete-series" data-id="${sanitize(event.id)}" aria-label="${deleteSeriesLabel}" title="${deleteSeriesLabel}">${svgIcon("actionSeriesDelete", "action-icon")}</button>`;
  const recurrence = event.recurrence && event.recurrence !== "none"
    ? `<span>${sanitize(recurrenceLabel(event.recurrence) || event.recurrenceText || text("recurringBadge"))}</span>`
    : "";
  return `
    <div class="event priority-card-${sanitize(priority)}">
      <div class="event-dot"></div>
      <div>
        <div class="event-title">${sanitize(event.title)}</div>
        <div class="event-meta">
          <span class="badge">${categoryIcon(event.category)}${sanitize(event.category)}</span>
          <span>${formatDate(event)}</span>
          ${priorityBadge}
          <span>${relativeDateLabel(event.date)}</span>
          <span>${svgIcon("reminder", "cat-icon")}${sanitize(event.reminderText)}</span>
          ${recurrence}
        </div>
        ${note}
      </div>
      <div class="event-actions">
        <div class="event-action-group primary-actions">
          ${editButton}
          ${duplicateButton}
          ${shareButton}
          ${restoreButton}
          ${doneButton}
          <button class="mini-action delete" type="button" data-action="delete" data-id="${sanitize(event.id)}" aria-label="${deleteLabel}" title="${deleteLabel}">${svgIcon("actionDelete", "action-icon")}</button>
        </div>
        ${event.seriesId ? `
          <div class="event-action-group series-actions">
            ${editSeriesButton}
            ${deleteSeriesButton}
          </div>
        ` : ""}
      </div>
    </div>
  `;
}

function renderList(id, list, emptyText) {
  $(id).innerHTML = list.length ? list.map(renderEvent).join("") : `<div class="empty">${emptyText}</div>`;
}

function filteredActiveEvents(events) {
  const query = state.filters.query.trim().toLowerCase();
  return events.filter(event => {
    const haystack = `${event.title} ${event.note || ""} ${event.category}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesCategory = state.filters.category === "all" || event.category === state.filters.category;
    const matchesPriority = state.filters.priority === "all" || (event.priority || "normal") === state.filters.priority;
    const diff = daysBetween(event.date);
    const matchesTime =
      state.filters.time === "all" ||
      (state.filters.time === "overdue" && diff < 0) ||
      (state.filters.time === "today" && diff === 0) ||
      (state.filters.time === "upcoming" && diff > 0);
    return matchesQuery && matchesCategory && matchesPriority && matchesTime;
  });
}

function renderDashboard() {
  const active = sortedEvents(false);
  const done = sortedEvents(true);
  const todayAndOverdue = active.filter(event => daysBetween(event.date) <= 0);
  const upcoming = active.filter(event => daysBetween(event.date) > 0).slice(0, 8);
  const week = active.filter(event => daysBetween(event.date) >= 0 && daysBetween(event.date) <= 7);
  const overdue = active.filter(event => daysBetween(event.date) < 0);

  $("statToday").textContent = active.filter(event => daysBetween(event.date) === 0).length;
  $("statWeek").textContent = week.length;
  $("statOverdue").textContent = overdue.length;
  renderList("todayList", todayAndOverdue, state.lang === "pl" ? "Na dzisiaj nie ma żadnych spraw." : "No tasks for today.");
  renderList("upcomingList", upcoming, state.lang === "pl" ? "Brak nadchodzących spraw." : "No upcoming tasks.");
  renderList("allList", filteredActiveEvents(active), active.length ? text("filteredEmpty") : (state.lang === "pl" ? "Nie masz jeszcze aktywnych wydarzeń." : "You have no active events yet."));
  renderList("doneList", done, state.lang === "pl" ? "Historia jest pusta." : "History is empty.");
}

function renderAgenda() {
  const active = sortedEvents(false);
  const limit = state.agendaLimit === "all" ? active.length : Number(state.agendaLimit || 20);
  const visible = active.slice(0, Number.isFinite(limit) ? limit : 20);
  const groups = {
    today: visible.filter(event => daysBetween(event.date) <= 0),
    tomorrow: visible.filter(event => daysBetween(event.date) === 1),
    week: visible.filter(event => {
      const diff = daysBetween(event.date);
      return diff >= 2 && diff <= 7;
    }),
    later: visible.filter(event => daysBetween(event.date) > 7)
  };

  $("agendaLimit").value = state.agendaLimit;
  renderList("agendaTodayList", groups.today, text("agendaEmptyToday"));
  renderList("agendaTomorrowList", groups.tomorrow, text("agendaEmptyTomorrow"));
  renderList("agendaWeekList", groups.week, text("agendaEmptyWeek"));
  renderList("agendaLaterList", groups.later, text("agendaEmptyLater"));
  const hasMore = visible.length < active.length;
  $("agendaMore").classList.toggle("hidden", !hasMore);
  $("agendaMore").textContent = hasMore
    ? text("agendaMore").replace("{shown}", visible.length).replace("{total}", active.length)
    : "";
}

function printAgenda() {
  setAboutOpen(false);
  document.body.classList.add("print-agenda");
  const cleanup = () => document.body.classList.remove("print-agenda");
  window.addEventListener("afterprint", cleanup, { once: true });
  window.print();
  window.setTimeout(cleanup, 1200);
}

function sortedEvents(done) {
  const direction = done ? -1 : 1;
  return state.events
    .filter(event => Boolean(event.done) === done)
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return direction * dateCompare;
      const priorityCompare = priorityRank(a.priority) - priorityRank(b.priority);
      if (priorityCompare !== 0) return priorityCompare;
      return (a.time || "99:99").localeCompare(b.time || "99:99");
    });
}

function renderCalendar() {
  const grid = $("calendarGrid");
  const weekdays = state.lang === "pl"
    ? ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"]
    : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const year = state.calendarDate.getFullYear();
  const month = state.calendarDate.getMonth();
  const start = (new Date(year, month, 1).getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();

  $("calendarTitle").textContent = state.calendarDate.toLocaleDateString(locale(), {
    month: "long",
    year: "numeric"
  });
  grid.innerHTML = weekdays.map(day => `<div class="weekday">${day}</div>`).join("");

  for (let i = 0; i < start; i += 1) {
    grid.insertAdjacentHTML("beforeend", '<div class="cal-day empty"></div>');
  }

  for (let day = 1; day <= days; day += 1) {
    grid.appendChild(createCalendarDay(year, month, day));
  }
}

function createCalendarDay(year, month, day) {
  const dateISO = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const dayEvents = state.events.filter(event => !event.done && event.date === dateISO);
  const button = document.createElement("button");
  button.type = "button";
  button.className = "cal-day";
  button.dataset.date = dateISO;
  button.setAttribute("aria-label", dateISO);
  button.classList.toggle("today", dateISO === todayISO);
  button.classList.toggle("selected", dateISO === state.selectedDateISO);
  if (dayEvents.length) {
    button.classList.add(`has-${highestPriority(dayEvents)}`);
  }

  const dots = dayEvents
    .slice()
    .sort((a, b) => priorityRank(a.priority) - priorityRank(b.priority))
    .slice(0, 4)
    .map(event => `<span class="cal-dot dot-${sanitize(event.priority || "normal")}"></span>`)
    .join("");
  const more = dayEvents.length > 4 ? `<div class="cal-more">+${dayEvents.length - 4}</div>` : "";
  button.innerHTML = `<div class="cal-num">${day}</div><div class="cal-dots">${dots}</div>${more}`;
  return button;
}

function renderSelectedDay() {
  const selected = new Date(`${state.selectedDateISO}T00:00`);
  const list = state.events
    .filter(event => !event.done && event.date === state.selectedDateISO)
    .sort((a, b) => {
      const priorityCompare = priorityRank(a.priority) - priorityRank(b.priority);
      if (priorityCompare !== 0) return priorityCompare;
      return (a.time || "99:99").localeCompare(b.time || "99:99");
    });
  $("selectedDayTitle").textContent = selected.toLocaleDateString(locale(), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  renderList("selectedDayList", list, state.lang === "pl" ? "Brak wydarzeń w tym dniu." : "No events on this day.");
}

function render() {
  renderDashboard();
  renderAgenda();
  renderCalendar();
  renderSelectedDay();
}

function setView(view) {
  document.querySelectorAll(".view").forEach(section => section.classList.add("hidden"));
  $(view).classList.remove("hidden");
  document.querySelectorAll("[data-view]").forEach(button => {
    button.classList.toggle("active", button.dataset.view === view);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function createEventRecord(eventData) {
  return {
    id: `ev_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    done: false,
    priority: "normal",
    createdAt: new Date().toISOString(),
    ...eventData
  };
}

function eventDataFromForm() {
  const reminder = $("reminder");
  return {
    title: $("title").value.trim(),
    date: $("date").value,
    time: $("time").value,
    category: $("category").value,
    priority: $("priority").value,
    reminder: reminder.value,
    reminderText: reminder.selectedOptions[0]?.textContent || "",
    note: $("note").value.trim()
  };
}

function normalizedTitle(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function selectedReminderText(value) {
  const option = Array.from($("defaultReminder").options).find(item => item.value === String(value));
  return option?.textContent || "";
}

function addQuickTask(event) {
  event.preventDefault();
  const input = $("quickTaskInput");
  const title = normalizedTitle(input.value);
  if (!title) {
    input.focus();
    return;
  }

  state.events.push(createEventRecord({
    title,
    date: todayISO,
    time: "",
    category: QUICK_TASK_CATEGORY,
    priority: state.defaultPriority,
    reminder: state.defaultReminder,
    reminderText: selectedReminderText(state.defaultReminder),
    note: "",
    recurrence: "none",
    recurrenceText: ""
  }));
  input.value = "";
  saveEvents();
  render();
  showToast(text("quickTaskSaved"));
}

function addEvent(eventData) {
  state.events.push(createEventRecord(eventData));
  saveEvents();
  render();
}

function addEvents(eventsData) {
  state.events.push(...eventsData.map(createEventRecord));
  saveEvents();
  render();
}

function normalizedMatchValue(value) {
  return String(value || "").trim().toLowerCase();
}

function eventSignature(event) {
  return [
    normalizedMatchValue(event.title),
    event.date || "",
    event.time || "",
    normalizedMatchValue(event.category)
  ].join("|");
}

function icsEventSignature(event) {
  return [
    normalizedMatchValue(event.title),
    event.date || "",
    event.time || ""
  ].join("|");
}

function isMatchingSeriesDuplicate(event, baseEvent, dates, excludedSeriesId, excludedId) {
  if (event.done) return false;
  if (excludedId && event.id === excludedId) return false;
  if (excludedSeriesId && event.seriesId === excludedSeriesId) return false;
  return dates.has(event.date)
    && normalizedMatchValue(event.title) === normalizedMatchValue(baseEvent.title)
    && normalizedMatchValue(event.category) === normalizedMatchValue(baseEvent.category);
}

function updateEvent(eventData, recurrence, repeatUntil) {
  const index = state.events.findIndex(event => event.id === state.editingId);
  if (index === -1) return;
  const original = state.events[index];
  const originalRecurrence = original.recurrence || "none";
  const recurrenceChanged = recurrence !== originalRecurrence || (recurrence !== "none" && Boolean(repeatUntil));

  if (recurrenceChanged) {
    const replacement = recurrence === "none"
      ? [{
          ...original,
          ...eventData,
          recurrence: "none",
          recurrenceText: "",
          seriesId: null,
          occurrenceIndex: 0
        }]
      : buildRecurringEvents(eventData, recurrence, repeatUntil).map(createEventRecord);
    const replacementDates = new Set(replacement.map(event => event.date));
    state.events = state.events.flatMap((event, eventIndex) => {
      if (eventIndex === index) return replacement;
      return isMatchingSeriesDuplicate(event, eventData, replacementDates, original.seriesId, original.id) ? [] : [event];
    });
    saveEvents();
    resetEventForm();
    render();
    showToast(replacement.length > 1 ? (state.lang === "pl" ? `Zapisano serię: ${replacement.length}` : `Saved series: ${replacement.length}`) : text("eventUpdated"));
    setView("dashboard");
    return;
  }

  state.events[index] = {
    ...original,
    ...eventData,
    recurrence: originalRecurrence,
    recurrenceText: original.recurrenceText || ""
  };
  saveEvents();
  resetEventForm();
  render();
  showToast(text("eventUpdated"));
  setView("dashboard");
}

function updateEventSeries(eventData, recurrence, repeatUntil) {
  const source = state.events.find(event => event.id === state.editingId);
  if (!source?.seriesId) return;
  const seriesEvents = state.events.filter(event => event.seriesId === source.seriesId);
  const fallbackUntil = seriesEvents
    .map(event => event.date)
    .sort()
    .at(-1) || eventData.date;
  const effectiveUntil = repeatUntil || fallbackUntil;
  const replacement = recurrence === "none"
    ? [{
        ...source,
        ...eventData,
        recurrence: "none",
        recurrenceText: "",
        seriesId: null,
        occurrenceIndex: 0
      }]
    : buildRecurringEvents(eventData, recurrence, effectiveUntil).map(createEventRecord);
  const replacementDates = new Set(replacement.map(event => event.date));
  state.events = state.events
    .filter(event => (
      event.seriesId !== source.seriesId
      && !isMatchingSeriesDuplicate(event, eventData, replacementDates, source.seriesId, source.id)
    ))
    .concat(replacement);
  saveEvents();
  resetEventForm();
  render();
  showToast(replacement.length > 1 ? (state.lang === "pl" ? `Zapisano serię: ${replacement.length}` : `Saved series: ${replacement.length}`) : text("seriesUpdated"));
  setView("dashboard");
}

function setEditingMode(enabled, mode = state.editingMode) {
  $("saveEventBtn").textContent = enabled
    ? (mode === "series" ? text("updateSeries") : text("updateEvent"))
    : text("saveEvent");
  $("cancelEditBtn").classList.toggle("hidden", !enabled);
  $("date").disabled = false;
  $("time").disabled = false;
  $("recurrence").disabled = false;
  $("repeatUntil").disabled = false;
}

function resetEventForm() {
  state.editingId = null;
  state.editingMode = "single";
  $("eventForm").reset();
  $("date").value = todayISO;
  $("category").value = state.defaultCategory;
  $("priority").value = state.defaultPriority;
  $("reminder").value = state.defaultReminder;
  $("repeatUntil").min = todayISO;
  setEditingMode(false);
}

function editEvent(id) {
  const event = state.events.find(item => item.id === id);
  if (!event) return;
  state.editingId = id;
  state.editingMode = "single";
  $("title").value = event.title || "";
  $("date").value = event.date || todayISO;
  $("time").value = event.time || "";
  $("category").value = event.category || "Inne";
  $("priority").value = event.priority || "normal";
  $("reminder").value = String(event.reminder ?? "0");
  $("recurrence").value = event.recurrence || "none";
  $("repeatUntil").value = "";
  $("repeatUntil").min = event.date || todayISO;
  $("note").value = event.note || "";
  setEditingMode(true, "single");
  setView("add");
  $("title").focus();
}

function editEventSeries(id) {
  const event = state.events.find(item => item.id === id);
  if (!event?.seriesId) return;
  const seriesEnd = state.events
    .filter(item => item.seriesId === event.seriesId)
    .map(item => item.date)
    .sort()
    .at(-1) || event.date;
  state.editingId = id;
  state.editingMode = "series";
  $("title").value = event.title || "";
  $("date").value = event.date || todayISO;
  $("time").value = event.time || "";
  $("category").value = event.category || "Inne";
  $("priority").value = event.priority || "normal";
  $("reminder").value = String(event.reminder ?? "0");
  $("recurrence").value = event.recurrence || "none";
  $("repeatUntil").value = seriesEnd;
  $("repeatUntil").min = event.date || todayISO;
  $("note").value = event.note || "";
  setEditingMode(true, "series");
  setView("add");
  $("title").focus();
}

function duplicateEvent(id) {
  const event = state.events.find(item => item.id === id);
  if (!event) return;
  state.editingId = null;
  state.editingMode = "single";
  $("title").value = event.title || "";
  $("date").value = event.date || todayISO;
  $("time").value = event.time || "";
  $("category").value = event.category || "Inne";
  $("priority").value = event.priority || "normal";
  $("reminder").value = String(event.reminder ?? "0");
  $("recurrence").value = "none";
  $("repeatUntil").value = "";
  $("repeatUntil").min = event.date || todayISO;
  $("note").value = event.note || "";
  setEditingMode(false);
  setView("add");
  showToast(text("duplicateReady"));
  $("title").focus();
}

function nextRecurringDate(date, recurrence, index, anchorDay) {
  if (recurrence === "daily") {
    const next = new Date(date);
    next.setDate(next.getDate() + 1);
    return next;
  }
  if (recurrence === "weekly") {
    const next = new Date(date);
    next.setDate(next.getDate() + 7);
    return next;
  }
  if (recurrence === "biweekly") {
    const next = new Date(date);
    next.setDate(next.getDate() + 14);
    return next;
  }
  if (recurrence === "monthly") return addClampedMonths(date, 1, anchorDay);
  if (recurrence === "quarterly") return addClampedMonths(date, 3, anchorDay);
  if (recurrence === "semiannual") return addClampedMonths(date, 6, anchorDay);
  if (recurrence === "yearly") return addClampedYears(date, 1, anchorDay);
  return index === 0 ? date : null;
}

function buildRecurringEvents(baseEvent, recurrence, repeatUntil) {
  if (recurrence === "none") return [baseEvent];
  const limit = CONFIG.recurrenceLimits[recurrence] || 1;
  const seriesId = `series_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  const anchorDay = fromISO(baseEvent.date).getDate();
  const untilDate = repeatUntil ? fromISO(repeatUntil) : null;
  const events = [];
  let current = fromISO(baseEvent.date);

  for (let index = 0; index < limit; index += 1) {
    if (untilDate && current > untilDate) break;
    events.push({
      ...baseEvent,
      date: toISO(current),
      recurrence,
      recurrenceText: recurrenceLabel(recurrence),
      seriesId,
      occurrenceIndex: index
    });
    current = nextRecurringDate(current, recurrence, index, anchorDay);
    if (!current) break;
  }
  return events.length ? events : [baseEvent];
}

function markDone(id) {
  state.events = state.events.map(event => (
    event.id === id ? { ...event, done: true, doneAt: new Date().toISOString() } : event
  ));
  saveEvents();
  render();
  showToast(state.lang === "pl" ? "Oznaczono jako zrobione" : "Marked as done");
}

function restoreEvent(id) {
  state.events = state.events.map(event => (
    event.id === id ? { ...event, done: false, doneAt: null } : event
  ));
  saveEvents();
  render();
  showToast(text("eventRestored"));
}

async function deleteEvent(id) {
  if (!await showConfirm(text("deleteEventConfirm"), { icon: "history" })) return;
  state.events = state.events.filter(event => event.id !== id);
  saveEvents();
  render();
  showToast(state.lang === "pl" ? "Usunięto" : "Deleted");
}

async function deleteEventSeries(id) {
  const source = state.events.find(event => event.id === id);
  if (!source?.seriesId) return;
  if (!await showConfirm(text("deleteSeriesConfirm"), { icon: "history" })) return;
  state.events = state.events.filter(event => event.seriesId !== source.seriesId);
  saveEvents();
  render();
  showToast(text("seriesDeleted"));
}

async function handleEventAction(event) {
  const button = event.target.closest("[data-action][data-id]");
  if (!button) return;
  if (button.dataset.action === "edit") editEvent(button.dataset.id);
  if (button.dataset.action === "edit-series") editEventSeries(button.dataset.id);
  if (button.dataset.action === "duplicate") duplicateEvent(button.dataset.id);
  if (button.dataset.action === "share") await shareEvent(button.dataset.id);
  if (button.dataset.action === "delete-series") await deleteEventSeries(button.dataset.id);
  if (button.dataset.action === "done") markDone(button.dataset.id);
  if (button.dataset.action === "restore") restoreEvent(button.dataset.id);
  if (button.dataset.action === "delete") await deleteEvent(button.dataset.id);
}

function handleCalendarClick(event) {
  const button = event.target.closest(".cal-day[data-date]");
  if (!button) return;
  state.selectedDateISO = button.dataset.date;
  renderCalendar();
  renderSelectedDay();
}

async function registerPWA() {
  if (!("serviceWorker" in navigator)) return;
  try {
    await navigator.serviceWorker.register("./service-worker.js");
  } catch {}
}

async function requestNotifications() {
  if (!("Notification" in window)) {
    showToast(text("notificationsUnsupported"));
    return false;
  }

  if (Notification.permission === "granted") {
    state.notificationsEnabled = true;
    savePreference(CONFIG.notificationsEnabledKey, "true");
    checkDueReminders();
    return true;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    showToast(text("notificationsBlocked"));
    return false;
  }

  state.notificationsEnabled = true;
  savePreference(CONFIG.notificationsEnabledKey, "true");
  checkDueReminders();
  return true;
}

async function toggleNotifications() {
  if (state.notificationsEnabled) {
    state.notificationsEnabled = false;
    savePreference(CONFIG.notificationsEnabledKey, "false");
    showToast(text("notificationsDisabled"));
    return;
  }

  const enabled = await requestNotifications();
  if (enabled) showToast(text("notificationsEnabled"));
}

async function completeOnboarding() {
  state.appearance = $("onboardingAppearance").value;
  state.theme = $("onboardingTheme").value;
  state.radius = $("onboardingRadius").value;
  state.defaultCategory = $("onboardingCategory").value;
  state.defaultPriority = $("onboardingPriority").value;
  state.defaultReminder = $("onboardingReminder").value;
  state.weatherEnabled = $("onboardingWeather").checked;

  savePreference(CONFIG.appearanceKey, state.appearance);
  savePreference(CONFIG.themeKey, state.theme);
  savePreference(CONFIG.radiusKey, state.radius);
  saveCustomCategories();
  savePreference(CONFIG.defaultCategoryKey, state.defaultCategory);
  savePreference(CONFIG.defaultPriorityKey, state.defaultPriority);
  savePreference(CONFIG.defaultReminderKey, state.defaultReminder);
  savePreference(CONFIG.weatherEnabledKey, String(state.weatherEnabled));

  applyAppearance();
  applyTheme();
  applyRadius();
  syncDefaultControls();
  if (!state.editingId) {
    $("category").value = state.defaultCategory;
    $("priority").value = state.defaultPriority;
    $("reminder").value = state.defaultReminder;
  }

  if (state.weatherEnabled) loadHeaderWeather();
  else $("headerWeather").classList.add("hidden");

  if ($("onboardingNotifications").checked) {
    const enabled = await requestNotifications();
    if (enabled) showToast(text("notificationsEnabled"));
  }

  finishOnboarding();
  showToast(text("onboardingDone"));
}

function maybeShowOnboarding() {
  if (localStorage.getItem(CONFIG.onboardingDoneKey) === "true") return;
  window.setTimeout(() => setOnboardingOpen(true), 500);
}

function checkDueReminders() {
  if (!state.notificationsEnabled) return;
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  const sent = JSON.parse(localStorage.getItem(CONFIG.sentNotificationsKey) || "{}");
  state.events.filter(event => !event.done).forEach(event => {
    const remindDate = new Date(`${event.date}T00:00`);
    remindDate.setDate(remindDate.getDate() - Number(event.reminder || 0));
    const remindISO = toISO(remindDate);
    const notifyId = `${event.id}_${remindISO}`;
    if (!notificationIsDue(event, remindISO) || sent[notifyId]) return;
    const notification = notificationContent(event);
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification(notification.title, {
        body: notification.body,
        icon: "icon-192.svg",
        badge: "icon-192.svg",
        tag: notifyId
      });
    });
    sent[notifyId] = new Date().toISOString();
  });
  localStorage.setItem(CONFIG.sentNotificationsKey, JSON.stringify(sent));
}

function notificationContent(event) {
  const prefix = priorityPrefix(event.priority);
  const title = prefix
    ? `${prefix}: ${event.title}`
    : `Przypomnienie: ${event.title}`;
  const priorityLine = event.priority && event.priority !== "normal"
    ? `${text("priorityLabel")}: ${priorityLabel(event.priority)}`
    : "";
  const body = [
    `${event.category} - ${formatDate(event)}`,
    priorityLine,
    event.reminderText || ""
  ].filter(Boolean).join(" - ");
  return { title, body };
}

function notificationIsDue(event, remindISO) {
  const now = new Date();
  if (remindISO !== toISO(now)) return false;
  if (!event.time) return true;
  const [hours, minutes] = event.time.split(":").map(Number);
  const eventMinutes = (hours * 60) + minutes;
  const nowMinutes = (now.getHours() * 60) + now.getMinutes();
  return nowMinutes >= eventMinutes;
}

function startReminderWatcher() {
  window.setTimeout(checkDueReminders, 1800);
  window.setInterval(checkDueReminders, CONFIG.reminderCheckIntervalMs);
  window.addEventListener("focus", checkDueReminders);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) checkDueReminders();
  });
}

function renderHeaderDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString(locale(), {
    weekday: "short",
    day: "numeric",
    month: "short"
  });
  const time = now.toLocaleTimeString(locale(), {
    hour: "2-digit",
    minute: "2-digit"
  });
  $("headerDateTime").textContent = `${date} · ${time}`;
}

function weatherIcon(code) {
  if ([0, 1].includes(code)) return "weatherSun";
  if ([2, 3].includes(code)) return "weatherCloud";
  if ([45, 48].includes(code)) return "weatherFog";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "weatherRain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "weatherSnow";
  if ([95, 96, 99].includes(code)) return "weatherStorm";
  return "weatherCloud";
}

async function updateHeaderWeather(position) {
  const { latitude, longitude } = position.coords;
  const params = new URLSearchParams({
    latitude: latitude.toFixed(4),
    longitude: longitude.toFixed(4),
    current: "temperature_2m,weather_code",
    timezone: "auto"
  });
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Weather unavailable");
  const data = await response.json();
  const temperature = Math.round(data.current?.temperature_2m);
  if (!Number.isFinite(temperature)) throw new Error("Weather missing");
  $("headerWeather").innerHTML = `${svgIcon(weatherIcon(Number(data.current?.weather_code)), "weather-icon")}<span>${temperature}°C</span>`;
  $("headerWeather").classList.remove("hidden");
}

function loadHeaderWeather() {
  if (!state.weatherEnabled) {
    $("headerWeather").classList.add("hidden");
    return;
  }
  if (!navigator.geolocation || !window.fetch) return;
  navigator.geolocation.getCurrentPosition(
    position => updateHeaderWeather(position).catch(() => $("headerWeather").classList.add("hidden")),
    () => $("headerWeather").classList.add("hidden"),
    { enableHighAccuracy: false, timeout: 6000, maximumAge: CONFIG.weatherRefreshMs }
  );
}

function startHeaderStatus() {
  renderHeaderDateTime();
  window.setInterval(renderHeaderDateTime, CONFIG.mobileClockIntervalMs);
  loadHeaderWeather();
  window.setInterval(loadHeaderWeather, CONFIG.weatherRefreshMs);
}

function bindEvents() {
  document.addEventListener("click", handleEventAction);
  $("calendarGrid").addEventListener("click", handleCalendarClick);

  document.querySelectorAll("[data-view]").forEach(button => {
    button.addEventListener("click", () => {
      if (button.dataset.view === "add" && state.editingId) resetEventForm();
      setAboutOpen(false);
      setView(button.dataset.view);
    });
  });

  document.querySelectorAll(".brand-nav").forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation();
      toggleAboutDialog();
    });
  });

  $("aboutClose").addEventListener("click", () => setAboutOpen(false));
  $("aboutLayer").addEventListener("click", event => {
    if (event.target === $("aboutLayer")) setAboutOpen(false);
  });
  $("openOnboardingBtn").addEventListener("click", () => setOnboardingOpen(true));
  $("onboardingSkip").addEventListener("click", () => {
    cancelOnboarding(true);
    showToast(text("onboardingDone"));
  });
  document.querySelectorAll(".onboarding-auto-btn").forEach(button => {
    button.addEventListener("click", () => setOnboardingAuto(button.dataset.onboardingAuto === "true"));
  });
  $("onboardingAppearance").addEventListener("change", applyOnboardingPreview);
  $("onboardingTheme").addEventListener("change", applyOnboardingPreview);
  $("onboardingRadius").addEventListener("change", applyOnboardingPreview);
  $("onboardingStart").addEventListener("click", completeOnboarding);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      setAboutOpen(false);
      cancelOnboarding(false);
    }
  });

  document.querySelectorAll("[data-template]").forEach(button => {
    button.addEventListener("click", () => {
      resetEventForm();
      $("title").value = button.dataset.template;
      $("category").value = button.dataset.cat;
      setView("add");
      $("title").focus();
    });
  });

  $("eventForm").addEventListener("submit", event => {
    event.preventDefault();
    const eventData = eventDataFromForm();
    const recurrence = $("recurrence").value;
    const repeatUntil = $("repeatUntil").value;
    if (state.editingId) {
      if (state.editingMode === "series") updateEventSeries(eventData, recurrence, repeatUntil);
      else updateEvent(eventData, recurrence, repeatUntil);
      return;
    }
    const eventsToAdd = buildRecurringEvents(eventData, recurrence, repeatUntil);
    addEvents(eventsToAdd);
    resetEventForm();
    showToast(
      eventsToAdd.length > 1
        ? (state.lang === "pl" ? `Zapisano serię: ${eventsToAdd.length}` : `Saved series: ${eventsToAdd.length}`)
        : (state.lang === "pl" ? "Zapisano wydarzenie" : "Event saved")
    );
    setView("dashboard");
  });

  $("quickTaskForm").addEventListener("submit", addQuickTask);

  $("date").addEventListener("change", () => {
    $("repeatUntil").min = $("date").value || todayISO;
  });

  $("clearDone").addEventListener("click", async () => {
    if (!await showConfirm(text("clearHistoryConfirm"), { icon: "history" })) return;
    state.events = state.events.filter(event => !event.done);
    saveEvents();
    render();
    showToast(state.lang === "pl" ? "Historia wyczyszczona" : "History cleared");
  });

  $("demoBtn").addEventListener("click", addDemoEvents);
  $("removeDemoBtn").addEventListener("click", removeDemoEvents);
  $("notifyBtn").addEventListener("click", toggleNotifications);
  $("exportBackup").addEventListener("click", downloadBackup);
  $("importBackup").addEventListener("click", () => $("backupFile").click());
  $("backupFile").addEventListener("change", event => importBackupFile(event.target.files[0]));
  $("exportIcs").addEventListener("click", downloadIcsCalendar);
  $("importIcs").addEventListener("click", () => $("icsFile").click());
  $("icsFile").addEventListener("change", event => importIcsFile(event.target.files[0]));
  $("resetDataBtn").addEventListener("click", resetAppData);
  $("cancelEditBtn").addEventListener("click", resetEventForm);
  $("prevMonth").addEventListener("click", () => changeMonth(-1));
  $("nextMonth").addEventListener("click", () => changeMonth(1));
  $("searchInput").addEventListener("input", event => {
    state.filters.query = event.target.value;
    renderDashboard();
  });
  $("filterCategory").addEventListener("change", event => {
    state.filters.category = event.target.value;
    renderDashboard();
  });
  $("filterPriority").addEventListener("change", event => {
    state.filters.priority = event.target.value;
    renderDashboard();
  });
  $("filterTime").addEventListener("change", event => {
    state.filters.time = event.target.value;
    renderDashboard();
  });

  $("agendaLimit").addEventListener("change", event => {
    state.agendaLimit = event.target.value;
    savePreference(CONFIG.agendaLimitKey, state.agendaLimit);
    renderAgenda();
  });
  $("printAgendaBtn").addEventListener("click", printAgenda);
  $("addCategoryBtn").addEventListener("click", addCustomCategory);
  $("customCategoryInput").addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      addCustomCategory();
    }
  });
  $("customCategoryList").addEventListener("click", event => {
    const button = event.target.closest("[data-category-delete]");
    if (button) deleteCustomCategory(button.dataset.categoryDelete);
  });

  document.querySelectorAll(".language-btn").forEach(button => {
    button.addEventListener("click", () => {
      state.lang = button.dataset.lang;
      savePreference(CONFIG.langKey, state.lang);
      applyLanguage();
      render();
      showToast(state.lang === "pl" ? "Zmieniono język" : "Language changed");
    });
  });

  document.querySelectorAll(".theme-btn").forEach(button => {
    button.addEventListener("click", () => {
      state.theme = button.dataset.theme;
      savePreference(CONFIG.themeKey, state.theme);
      applyTheme();
      showToast(state.lang === "pl" ? "Zmieniono motyw" : "Theme changed");
    });
  });

  document.querySelectorAll(".appearance-btn").forEach(button => {
    button.addEventListener("click", () => {
      state.appearance = button.dataset.appearance;
      savePreference(CONFIG.appearanceKey, state.appearance);
      applyAppearance();
      showToast(state.lang === "pl" ? "Zmieniono wygląd" : "Appearance changed");
    });
  });

  document.querySelectorAll(".radius-btn").forEach(button => {
    button.addEventListener("click", () => {
      state.radius = button.dataset.radius;
      savePreference(CONFIG.radiusKey, state.radius);
      applyRadius();
      showToast(state.lang === "pl" ? "Zmieniono styl okien" : "Window style changed");
    });
  });

  $("defaultCategory").addEventListener("change", event => {
    state.defaultCategory = event.target.value;
    savePreference(CONFIG.defaultCategoryKey, state.defaultCategory);
    if (!state.editingId) $("category").value = state.defaultCategory;
    showToast(state.lang === "pl" ? "Zmieniono domyślną kategorię" : "Default category changed");
  });

  $("defaultPriority").addEventListener("change", event => {
    state.defaultPriority = event.target.value;
    savePreference(CONFIG.defaultPriorityKey, state.defaultPriority);
    if (!state.editingId) $("priority").value = state.defaultPriority;
    showToast(state.lang === "pl" ? "Zmieniono domyślny priorytet" : "Default priority changed");
  });

  $("defaultReminder").addEventListener("change", event => {
    state.defaultReminder = event.target.value;
    savePreference(CONFIG.defaultReminderKey, state.defaultReminder);
    if (!state.editingId) $("reminder").value = state.defaultReminder;
    showToast(state.lang === "pl" ? "Zmieniono domyślne przypomnienie" : "Default reminder changed");
  });

  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (state.appearance === "system") applyAppearance();
    });
  }
}

function demoEventDefinitions() {
  const addDays = days => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return toISO(date);
  };
  return [
    ["800+", addDays(2), "", "Finanse", "Sprawdzić wpływ lub status świadczenia."],
    ["Rata kredytu", addDays(5), "09:00", "Finanse", "Upewnić się, że środki są na koncie."],
    ["Wizyta u lekarza", addDays(8), "14:30", "Zdrowie", "Zabrać dokumenty i wyniki badań."]
  ].map(item => ({
    title: item[0],
    date: item[1],
    time: item[2],
    category: item[3],
    reminder: "1",
    reminderText: "1 dzień wcześniej",
    note: item[4]
  }));
}

function demoIdentity(event) {
  return [
    normalizedMatchValue(event.title),
    event.time || "",
    normalizedMatchValue(event.category),
    normalizedMatchValue(event.note)
  ].join("|");
}

function addDemoEvents() {
  const demoEvents = demoEventDefinitions();

  const demoSignatures = new Set(demoEvents.map(eventSignature));
  const keptSignatures = new Set();
  let removedDuplicates = 0;
  state.events = state.events.filter(event => {
    const signature = eventSignature(event);
    if (!demoSignatures.has(signature)) return true;
    if (keptSignatures.has(signature)) {
      removedDuplicates += 1;
      return false;
    }
    keptSignatures.add(signature);
    return true;
  });

  const existingSignatures = new Set(state.events.map(eventSignature));
  const uniqueEvents = demoEvents.filter(event => {
    const signature = eventSignature(event);
    if (existingSignatures.has(signature)) return false;
    existingSignatures.add(signature);
    return true;
  });
  if (uniqueEvents.length) {
    state.events.push(...uniqueEvents.map(createEventRecord));
  }
  if (uniqueEvents.length || removedDuplicates) {
    saveEvents();
    render();
  }
  const skipped = demoEvents.length - uniqueEvents.length;
  if (removedDuplicates) {
    showToast(state.lang === "pl" ? `Usunięto duplikaty: ${removedDuplicates}` : `Removed duplicates: ${removedDuplicates}`);
  } else if (skipped === demoEvents.length) {
    showToast(state.lang === "pl" ? "Przykłady już istnieją" : "Examples already exist");
  } else if (skipped) {
    showToast(state.lang === "pl" ? `Dodano ${uniqueEvents.length}, pominięto ${skipped}` : `Added ${uniqueEvents.length}, skipped ${skipped}`);
  } else {
    showToast(state.lang === "pl" ? "Dodano przykłady" : "Examples added");
  }
  setView("dashboard");
}

async function removeDemoEvents() {
  if (!await showConfirm(text("removeDemoConfirm"), { icon: "history" })) return;
  const demoIdentities = new Set(demoEventDefinitions().map(demoIdentity));
  const before = state.events.length;
  state.events = state.events.filter(event => !demoIdentities.has(demoIdentity(event)));
  const removed = before - state.events.length;
  if (!removed) {
    showToast(text("demoNotFound"));
    return;
  }
  saveEvents();
  render();
  showToast(`${text("demoRemoved")}: ${removed}`);
  setView("dashboard");
}

function changeMonth(step) {
  state.calendarDate.setMonth(state.calendarDate.getMonth() + step);
  renderCalendar();
}

function mountIcons() {
  const targets = {
    iconTodayHead: "today",
    iconBellHead: "bell",
    iconAgendaHead: "agenda",
    iconPlusHead: "plus",
    iconBoltHead: "bolt",
    iconCalendarHead: "calendar",
    iconHistoryHead: "history",
    iconSettingsHead: "settings",
    iconCalendarDayHead: "calendar"
  };
  Object.entries(targets).forEach(([id, iconName]) => {
    $(id).innerHTML = svgIcon(iconName);
  });
}

function init() {
  mountIcons();
  mountNavIcons();
  bindEvents();
  resetEventForm();
  applyAppearance();
  applyTheme();
  applyRadius();
  applyLanguage();
  render();
  registerPWA();
  startReminderWatcher();
  startHeaderStatus();
  handleSharedIcsLaunch();
  maybeShowOnboarding();
}

init();
