import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
const en = {
  common: {
    welcome: 'Welcome',
    dashboard: 'Dashboard',
    trading: 'Trading',
    portfolio: 'Portfolio',
    analytics: 'Analytics',
    tokenization: 'Tokenization',
    grievances: 'Grievances',
    assistant: 'AI Assistant',
    documents: 'Documents',
    settings: 'Settings',
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    loading: 'Loading...',
    search: 'Search',
    upload: 'Upload',
    download: 'Download',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    language: 'Language'
  },
  auth: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    email: 'Email Address',
    password: 'Password',
    fullName: 'Full Name',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    signInHere: 'Sign in here',
    signUpHere: 'Sign up here',
    checkEmail: 'Please check your email to confirm your account',
    signInSuccess: 'Signed in successfully',
    signOutSuccess: 'Signed out successfully'
  },
  grievances: {
    title: 'Grievances Center',
    fileGrievance: 'File New Grievance',
    myGrievances: 'My Grievances',
    grievanceTitle: 'Title',
    description: 'Description',
    category: 'Category',
    priority: 'Priority',
    status: 'Status',
    categories: {
      fraud: 'Fraud',
      trading: 'Trading Issues',
      platform: 'Platform Issues',
      compliance: 'Compliance',
      other: 'Other'
    },
    priorities: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      urgent: 'Urgent'
    },
    statuses: {
      open: 'Open',
      inProgress: 'In Progress',
      resolved: 'Resolved',
      closed: 'Closed'
    }
  },
  assistant: {
    title: 'AI Assistant',
    subtitle: 'Your intelligent financial compliance companion',
    askQuestion: 'Ask a question...',
    examples: 'Example questions:',
    example1: 'What are SEBI guidelines for retail investors?',
    example2: 'How to identify investment fraud?',
    example3: 'Explain bond investment risks',
    capabilities: {
      compliance: 'Compliance Guidance',
      fraud: 'Fraud Detection',
      translation: 'Document Translation'
    }
  },
  documents: {
    title: 'Document Center',
    upload: 'Upload Document',
    search: 'Search Documents',
    askQuestion: 'Ask question about this document',
    supportedFormats: 'Supported: PDF, DOC, DOCX',
    maxSize: 'Max size: 10MB'
  }
};

// Hindi translations
const hi = {
  common: {
    welcome: 'स्वागत',
    dashboard: 'डैशबोर्ड',
    trading: 'ट्रेडिंग',
    portfolio: 'पोर्टफोलियो',
    analytics: 'एनालिटिक्स',
    tokenization: 'टोकनाइज़ेशन',
    grievances: 'शिकायतें',
    assistant: 'AI सहायक',
    documents: 'दस्तावेज़',
    settings: 'सेटिंग्स',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    register: 'रजिस्टर',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    save: 'सेव करें',
    loading: 'लोड हो रहा है...',
    search: 'खोजें',
    upload: 'अपलोड',
    download: 'डाउनलोड',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    view: 'देखें',
    close: 'बंद करें',
    back: 'वापस',
    next: 'अगला',
    previous: 'पिछला',
    email: 'ईमेल',
    password: 'पासवर्ड',
    fullName: 'पूरा नाम',
    language: 'भाषा'
  },
  auth: {
    signIn: 'साइन इन',
    signUp: 'साइन अप',
    signOut: 'साइन आउट',
    email: 'ईमेल पता',
    password: 'पासवर्ड',
    fullName: 'पूरा नाम',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    forgotPassword: 'पासवर्ड भूल गए?',
    dontHaveAccount: 'खाता नहीं है?',
    alreadyHaveAccount: 'पहले से खाता है?',
    signInHere: 'यहाँ साइन इन करें',
    signUpHere: 'यहाँ साइन अप करें',
    checkEmail: 'कृपया अपना खाता सत्यापित करने के लिए अपना ईमेल देखें',
    signInSuccess: 'सफलतापूर्वक साइन इन',
    signOutSuccess: 'सफलतापूर्वक साइन आउट'
  },
  grievances: {
    title: 'शिकायत केंद्र',
    fileGrievance: 'नई शिकायत दर्ज करें',
    myGrievances: 'मेरी शिकायतें',
    grievanceTitle: 'शीर्षक',
    description: 'विवरण',
    category: 'श्रेणी',
    priority: 'प्राथमिकता',
    status: 'स्थिति',
    categories: {
      fraud: 'धोखाधड़ी',
      trading: 'ट्रेडिंग समस्याएं',
      platform: 'प्लेटफॉर्म समस्याएं',
      compliance: 'अनुपालन',
      other: 'अन्य'
    },
    priorities: {
      low: 'कम',
      medium: 'मध्यम',
      high: 'उच्च',
      urgent: 'तत्काल'
    },
    statuses: {
      open: 'खुला',
      inProgress: 'प्रगति में',
      resolved: 'हल',
      closed: 'बंद'
    }
  },
  assistant: {
    title: 'AI सहायक',
    subtitle: 'आपका बुद्धिमान वित्तीय अनुपालन साथी',
    askQuestion: 'प्रश्न पूछें...',
    examples: 'उदाहरण प्रश्न:',
    example1: 'खुदरा निवेशकों के लिए SEBI दिशानिर्देश क्या हैं?',
    example2: 'निवेश धोखाधड़ी की पहचान कैसे करें?',
    example3: 'बॉन्ड निवेश जोखिमों की व्याख्या करें',
    capabilities: {
      compliance: 'अनुपालन मार्गदर्शन',
      fraud: 'धोखाधड़ी का पता लगाना',
      translation: 'दस्तावेज़ अनुवाद'
    }
  },
  documents: {
    title: 'दस्तावेज़ केंद्र',
    upload: 'दस्तावेज़ अपलोड करें',
    search: 'दस्तावेज़ खोजें',
    askQuestion: 'इस दस्तावेज़ के बारे में प्रश्न पूछें',
    supportedFormats: 'समर्थित: PDF, DOC, DOCX',
    maxSize: 'अधिकतम आकार: 10MB'
  }
};

// Telugu translations
const te = {
  common: {
    welcome: 'స్వాగతం',
    dashboard: 'డాష్‌బోర్డ్',
    trading: 'ట్రేడింగ్',
    portfolio: 'పోర్ట్‌ఫోలియో',
    analytics: 'అనలిటిక్స్',
    tokenization: 'టోకనైజేషన్',
    grievances: 'ఫిర్యాదులు',
    assistant: 'AI సహాయకుడు',
    documents: 'డాక్యుమెంట్లు',
    settings: 'సెట్టింగ్స్',
    login: 'లాగిన్',
    logout: 'లాగౌట్',
    register: 'రిజిస్టర్',
    submit: 'సమర్పించండి',
    cancel: 'రద్దు చేయండి',
    save: 'సేవ్ చేయండి',
    loading: 'లోడవుతోంది...',
    search: 'శోధించండి',
    upload: 'అప్‌లోడ్',
    download: 'డౌన్‌లోడ్',
    delete: 'తొలగించండి',
    edit: 'ఎడిట్ చేయండి',
    view: 'చూడండి',
    close: 'మూసివేయండి',
    back: 'వెనుకకు',
    next: 'తదుపరి',
    previous: 'మునుపటి',
    email: 'ఇమెయిల్',
    password: 'పాస్‌వర్డ్',
    fullName: 'పూర్తి పేరు',
    language: 'భాష'
  },
  auth: {
    signIn: 'సైన్ ఇన్',
    signUp: 'సైన్ అప్',
    signOut: 'సైన్ అవుట్',
    email: 'ఇమెయిల్ చిరునామా',
    password: 'పాస్‌వర్డ్',
    fullName: 'పూర్తి పేరు',
    confirmPassword: 'పాస్‌వర్డ్ నిర్ధారించండి',
    forgotPassword: 'పాస్‌వర్డ్ మరచిపోయారా?',
    dontHaveAccount: 'ఖాతా లేదా?',
    alreadyHaveAccount: 'ఇప్పటికే ఖాతా ఉందా?',
    signInHere: 'ఇక్కడ సైన్ ఇన్ చేయండి',
    signUpHere: 'ఇక్కడ సైన్ అప్ చేయండి',
    checkEmail: 'దయచేసి మీ ఖాతాను ధృవీకరించడానికి మీ ఇమెయిల్ చూడండి',
    signInSuccess: 'విజయవంతంగా సైన్ ఇన్ అయ్యారు',
    signOutSuccess: 'విజయవంతంగా సైన్ అవుట్ అయ్యారు'
  },
  grievances: {
    title: 'ఫిర్యాదుల కేంద్రం',
    fileGrievance: 'కొత్త ఫిర్యాదు దాఖలు చేయండి',
    myGrievances: 'నా ఫిర్యాదులు',
    grievanceTitle: 'శీర్షిక',
    description: 'వివరణ',
    category: 'వర్గం',
    priority: 'ప్రాధాన్యత',
    status: 'స్థితి',
    categories: {
      fraud: 'మోసం',
      trading: 'ట్రేడింగ్ సమస్యలు',
      platform: 'ప్లాట్‌ఫారమ్ సమస్యలు',
      compliance: 'కంప్లయన్స్',
      other: 'ఇతర'
    },
    priorities: {
      low: 'తక్కువ',
      medium: 'మధ్యమ',
      high: 'అధిక',
      urgent: 'అత్యవసర'
    },
    statuses: {
      open: 'తెరిచిన',
      inProgress: 'ప్రగతిలో',
      resolved: 'పరిష్కరించబడింది',
      closed: 'మూసివేయబడింది'
    }
  },
  assistant: {
    title: 'AI సహాయకుడు',
    subtitle: 'మీ తెలివైన ఆర్థిక కంప్లయన్స్ భాగస్వామి',
    askQuestion: 'ప్రశ్న అడగండి...',
    examples: 'ఉదాహరణ ప్రశ్నలు:',
    example1: 'రిటైల్ పెట్టుబడిదారుల కోసం SEBI మార్గదర్శకాలు ఏమిటి?',
    example2: 'పెట్టుబడి మోసాన్ని ఎలా గుర్తించాలి?',
    example3: 'బాండ్ పెట్టుబడి రిస్క్‌లను వివరించండి',
    capabilities: {
      compliance: 'కంప్లయన్స్ మార్గదర్శకం',
      fraud: 'మోసం గుర్తింపు',
      translation: 'డాక్యుమెంట్ అనువాదం'
    }
  },
  documents: {
    title: 'డాక్యుమెంట్ సెంటర్',
    upload: 'డాక్యుమెంట్ అప్‌లోడ్ చేయండి',
    search: 'డాక్యుమెంట్లను శోధించండి',
    askQuestion: 'ఈ డాక్యుమెంట్ గురించి ప్రశ్న అడగండి',
    supportedFormats: 'మద్దతు: PDF, DOC, DOCX',
    maxSize: 'గరిష్ట పరిమాణం: 10MB'
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      te: { translation: te },
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;