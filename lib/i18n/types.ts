export type SupportedLanguage = 'tr' | 'en' | 'de';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  countryCode: 'TR' | 'GB' | 'DE';
  flag?: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', countryCode: 'TR', flag: '🇹🇷' },
  { code: 'en', name: 'English', nativeName: 'English', countryCode: 'GB', flag: '🇬🇧' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', countryCode: 'DE', flag: '🇩🇪' },
];

export interface Dictionary {
  common: {
    adminPanel: string;
    overview: string;
    dashboard: string;
    menuManagement: string;
    products: string;
    categoriesAndOptions: string;
    operations: string;
    settings: string;
    signOut: string;
    language: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    add: string;
    search: string;
    actions: string;
    status: string;
    active: string;
    inactive: string;
    available: string;
    unavailable: string;
    loading: string;
    confirmDelete: string;
    success: string;
    error: string;
    required: string;
    optional: string;
    all: string;
    filter: string;
    back: string;
    copy: string;
    view: string;
    close: string;
    selectLanguage: string;
    multiLanguageContent: string;
  };
  customer: {
    searchPlaceholder: string;
    categories: string;
    recommended: string;
    addToCart: string;
    addToOrder: string;
    customizeOrder: string;
    options: string;
    requiredSelection: string;
    optionalSelection: string;
    specialNotes: string;
    notesPlaceholder: string;
    yourOrder: string;
    emptyCart: string;
    emptyCartDesc: string;
    itemCount: string;
    tableNumber: string;
    tablePlaceholder: string;
    total: string;
    subtotal: string;
    placeOrder: string;
    sendingOrder: string;
    orderSuccess: string;
    orderSuccessDesc: string;
    viewOrderStatus: string;
    wifiDetails: string;
    contactUs: string;
    address: string;
    phone: string;
    workingHours: string;
    menu: string;
    favorites: string;
    noResults: string;
    noResultsDesc: string;
    outOfStock: string;
    clearCart: string;
  };
  nav: {
    dashboard: string;
    products: string;
    categories: string;
    settings: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    totalOrders: string;
    totalRevenue: string;
    activeProducts: string;
    totalCategories: string;
    recentOrders: string;
    orderId: string;
    table: string;
    items: string;
    total: string;
    date: string;
    viewAll: string;
    quickStats: string;
    statusDistribution: string;
    pendingOrders: string;
  };
  products: {
    title: string;
    subtitle: string;
    addProduct: string;
    editProduct: string;
    deleteProduct: string;
    productName: string;
    description: string;
    price: string;
    category: string;
    image: string;
    availability: string;
    sortOrder: string;
    searchPlaceholder: string;
    noProductsFound: string;
    confirmDeleteMessage: string;
    createdSuccess: string;
    updatedSuccess: string;
    deletedSuccess: string;
    uploadImage: string;
  };
  categories: {
    title: string;
    subtitle: string;
    addCategory: string;
    editCategory: string;
    deleteCategory: string;
    categoryName: string;
    slug: string;
    image: string;
    sortOrder: string;
    status: string;
    optionGroups: string;
    addOptionGroup: string;
    editOptionGroup: string;
    deleteOptionGroup: string;
    optionGroupLabel: string;
    isRequired: string;
    options: string;
    addOption: string;
    optionLabel: string;
    confirmDeleteCategory: string;
    confirmDeleteOptionGroup: string;
    noCategoriesFound: string;
  };
  settings: {
    title: string;
    subtitle: string;
    restaurantInfo: string;
    restaurantName: string;
    restaurantDescription: string;
    logo: string;
    contactAndLocation: string;
    phone: string;
    whatsapp: string;
    address: string;
    googleMapsUrl: string;
    instagramUrl: string;
    wifiInfo: string;
    wifiName: string;
    wifiPassword: string;
    currency: string;
    currencySymbol: string;
    savedSuccess: string;
  };
  orders: {
    statusPending: string;
    statusConfirmed: string;
    statusPreparing: string;
    statusReady: string;
    statusCompleted: string;
    statusCancelled: string;
  };
}
