import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FlaskConical, 
  Search, 
  Filter, 
  Clock, 
  ChevronRight, 
  Beaker, 
  TestTube, 
  Atom, 
  Microscope, 
  Activity,
  LayoutGrid,
  List,
  Sparkles,
  ShieldAlert,
  ClipboardCheck,
  BarChart3,
  Database,
  Lock,
  Unlock,
  KeyRound,
  LogOut
} from 'lucide-react';
import { TP_DATA, TP, getRelevantPictograms, MINISTERE_LOGO, MINISTERE_LOGO_AR } from './constants';
import { TPDetails } from './components/TPDetails';
import { SafetyGuide } from './components/SafetyGuide';
import { SDSDatabase } from './components/SDSDatabase';
import { SafetyRoom } from './components/SafetyRoom';
import { TeacherChecklist } from './components/TeacherChecklist';
import { SessionPackGenerator } from './components/SessionPackGenerator';
import { SessionPackViewer } from './components/SessionPackViewer';
import { Dashboard } from './components/Dashboard';
import { SecondStageForm, UserProfile } from './components/SecondStageForm';

type Tab = 'home' | 'sds' | 'safety' | 'checklist' | 'packs' | 'dashboard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('site_access_token') === 'CHIMIE2004';
  });
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const raw = sessionStorage.getItem('user_profile_data');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [selectedLevel, setSelectedLevel] = useState<string>('Tous');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTP, setSelectedTP] = useState<TP | null>(null);
  const [sessionPackData, setSessionPackData] = useState<string | null>(null);

  const isStudent = userProfile?.role === 'élève';

  React.useEffect(() => {
    if (isStudent && !['home', 'sds', 'safety'].includes(currentTab)) {
      setCurrentTab('home');
    }
  }, [isStudent, currentTab]);

  // Auto-switch based on URL parameters (e.g. from physical QR codes)
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('sds')) {
      setCurrentTab('sds');
      setSelectedTP(null);
    } else if (params.has('tp')) {
      const tpId = params.get('tp');
      const foundTP = TP_DATA.find(t => t.id === tpId);
      if (foundTP) {
        setSelectedTP(foundTP);
      }
    } else if (params.has('session_pack')) {
      const data = params.get('session_pack');
      if (data) {
        setSessionPackData(data);
      }
    }
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(TP_DATA.map(tp => tp.category)));
    return ['Tous', ...cats];
  }, []);

  const levels = ['Tous', 'Tronc Commun', '1ère Bac', '2ème Bac'];

  const filteredTPs = useMemo(() => {
    return TP_DATA.filter(tp => {
      const matchesSearch = tp.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            tp.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Tous' || tp.category === selectedCategory;
      const matchesLevel = selectedLevel === 'Tous' || tp.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchTerm, selectedCategory, selectedLevel]);

  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'Chimie analytique': return <Search className="w-4 h-4" />;
      case 'Chimie organique': return <Sparkles className="w-4 h-4" />;
      case 'Chimie physique': return <Activity className="w-4 h-4" />;
      case 'Chimie minérale': return <Atom className="w-4 h-4" />;
      case 'Techniques de base': return <Beaker className="w-4 h-4" />;
      case 'Électrochimie': return <Activity className="w-4 h-4" />;
      case 'Chimie générale': return <FlaskConical className="w-4 h-4" />;
      default: return <FlaskConical className="w-4 h-4" />;
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError(false);
    
    setTimeout(() => {
      if (passwordInput.trim().toUpperCase() === 'CHIMIE2004') {
        sessionStorage.setItem('site_access_token', 'CHIMIE2004');
        setIsAuthenticated(true);
        setPasswordInput('');
      } else {
        setAuthError(true);
      }
      setIsSubmitting(false);
    }, 600);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Animated Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute top-10 right-10 w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none"></div>
        
        {/* Ministry of Education Logo & Header */}
        <div className="mb-6 flex flex-col items-center text-center max-w-md z-10">
          <motion.img 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            src={MINISTERE_LOGO_AR}
            alt="Ministère de l'Éducation Nationale" 
            className="h-24 sm:h-28 w-auto object-contain mb-4 filter drop-shadow-[0_10px_10px_rgba(99,102,241,0.15)] brightness-110"
            referrerPolicy="no-referrer"
          />
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-black tracking-tight text-white font-display uppercase"
          >
            PORTAIL LABORATOIRE
          </motion.h2>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1"
          >
            Physique-Chimie Expérimentale
          </motion.span>
        </div>

        {/* Auth Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`bg-slate-950/80 backdrop-blur-2xl border ${authError ? 'border-rose-500/40 shadow-rose-950/10' : 'border-indigo-500/20 shadow-indigo-950/20'} rounded-[32px] p-8 max-w-sm w-full shadow-2xl relative z-10 transition-colors duration-300`}
        >
          <div className="flex flex-col items-center mb-6 text-center">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${authError ? 'bg-rose-500/10 text-rose-400 ring-4 ring-rose-500/10' : 'bg-indigo-500/10 text-indigo-400 ring-4 ring-indigo-500/10'}`}>
              <Lock className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight uppercase">Accès Protégé</h3>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Ce portail est sécurisé. Veuillez saisir le code d'accès de l'expérience de laboratoire pour continuer.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Code d'accès requis</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                  <KeyRound className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrez le code..."
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setAuthError(false);
                  }}
                  className={`w-full pl-11 pr-24 py-3 bg-slate-900 border ${authError ? 'border-rose-500 text-rose-200 focus:ring-rose-500/20' : 'border-slate-800 text-white focus:ring-indigo-500/20'} rounded-2xl text-sm focus:ring-4 outline-none transition-all placeholder:text-slate-650 font-mono tracking-widest`}
                  disabled={isSubmitting}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? "Masquer" : "Afficher"}
                </button>
              </div>
              {authError && (
                <p className="text-rose-400 text-xs font-semibold mt-2 flex items-center gap-1.5 animate-pulse">
                  ⚠️ Code d'accès incorrect.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:opacity-50 py-3.5 rounded-2xl transition-all shadow-lg shadow-indigo-600/10 active:scale-95 group"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.11 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Validation...
                </>
              ) : (
                <>
                  Se connecter <Unlock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Footer info lock style */}
        <div className="mt-8 text-center text-[9px] text-slate-500 z-10 max-w-xs leading-relaxed uppercase tracking-wider font-semibold">
          © 2026 Azzeddine Atibi — Physique-Chimie Expérimentale
        </div>
      </div>
    );
  }

  if (isAuthenticated && !userProfile) {
    return (
      <SecondStageForm 
        onSuccess={(profile) => {
          sessionStorage.setItem('user_profile_data', JSON.stringify(profile));
          setUserProfile(profile);
        }}
        onGoBack={() => {
          sessionStorage.removeItem('site_access_token');
          setIsAuthenticated(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-200 selection:text-indigo-900 flex flex-col relative overflow-hidden">
      {/* Decorative High-End Ambient Science Glowing Orbs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-200/40 blur-[130px] pointer-events-none animate-ambient-glow-1 z-0"></div>
      <div className="absolute top-1/2 -right-40 w-[700px] h-[700px] rounded-full bg-violet-200/30 blur-[140px] pointer-events-none animate-ambient-glow-2 z-0"></div>
      
      {/* Header Navigation with subtle glass blur */}
      <nav className="min-h-24 sm:h-32 bg-white/80 backdrop-blur-lg border-b border-indigo-50 sticky top-0 z-50 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-10 py-3 sm:py-0 flex-shrink-0 shadow-lg shadow-indigo-100/10 relative gap-4">
        <div 
          onClick={() => { setSelectedTP(null); setCurrentTab('home'); scrollTop(); }}
          className="flex items-center gap-4 sm:gap-8 cursor-pointer shrink-0 z-10"
        >
          <img 
            src={MINISTERE_LOGO_AR}
            alt="Ministère de l'Éducation Nationale" 
            className="h-16 sm:h-28 w-auto object-contain transform hover:scale-105 hover:rotate-1 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
          <div className="h-16 w-px bg-slate-200 hidden sm:block"></div>
          <div className="flex flex-col">
            <h1 className="text-sm sm:text-xl font-bold tracking-tight text-indigo-950 font-display">AZZEDDINE ATIBI</h1>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">Physique-Chimie Expérimentale</span>
          </div>
        </div>
        
        <div className="flex-1 max-w-[160px] sm:max-w-md mx-2 sm:mx-8 z-10">
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="text"
              placeholder="Rechercher des expériences..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (selectedTP) setSelectedTP(null);
                if (currentTab !== 'home') setCurrentTab('home');
              }}
              className="w-full pl-11 pr-4 py-2 sm:py-3 bg-indigo-50/40 border border-indigo-100 rounded-2xl text-base focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-600 focus:bg-white transition-all outline-none text-slate-900 font-medium placeholder:text-indigo-300 shadow-inner"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-6 z-10">
          <div className="hidden lg:flex gap-4 md:gap-8 text-sm font-bold text-slate-700">
            <span 
              onClick={() => { setSelectedTP(null); setCurrentTab('home'); scrollTop(); }}
              className={`h-24 flex items-center cursor-pointer font-display transition-all border-b-4 tracking-wide font-semibold ${currentTab === 'home' ? 'text-indigo-700 border-indigo-700' : 'text-slate-500 border-transparent hover:text-indigo-600'}`}
            >
              Banque de TPs
            </span>
            <span 
              onClick={() => { setSelectedTP(null); setCurrentTab('sds'); scrollTop(); }}
              className={`h-24 flex items-center cursor-pointer font-display transition-all border-b-4 tracking-wide font-semibold ${currentTab === 'sds' ? 'text-indigo-700 border-indigo-700' : 'text-slate-500 border-transparent hover:text-indigo-600'}`}
            >
              Base SDS
            </span>
            <span 
              onClick={() => { setSelectedTP(null); setCurrentTab('safety'); scrollTop(); }}
              className={`h-24 flex items-center cursor-pointer font-display transition-all border-b-4 gap-2 tracking-wide font-semibold ${currentTab === 'safety' ? 'text-indigo-700 border-indigo-700' : 'text-slate-500 border-transparent hover:text-indigo-600'}`}
            >
              <ShieldAlert className="w-5 h-5 text-rose-500" /> Salle Sécurité
            </span>
            {!isStudent && (
              <>
                <span 
                  onClick={() => { setSelectedTP(null); setCurrentTab('checklist'); scrollTop(); }}
                  className={`h-24 flex items-center cursor-pointer font-display transition-all border-b-4 gap-2 tracking-wide font-semibold ${currentTab === 'checklist' ? 'text-indigo-700 border-indigo-700' : 'text-slate-500 border-transparent hover:text-indigo-600'}`}
                >
                  <ClipboardCheck className="w-5 h-5 text-emerald-500" /> Checklist
                </span>
                <span 
                  onClick={() => { setSelectedTP(null); setCurrentTab('packs'); scrollTop(); }}
                  className={`h-24 flex items-center cursor-pointer font-display transition-all border-b-4 gap-2 tracking-wide font-semibold ${currentTab === 'packs' ? 'text-indigo-700 border-indigo-700' : 'text-slate-500 border-transparent hover:text-indigo-600'}`}
                >
                  <FlaskConical className="w-5 h-5 text-indigo-500" /> Générateur de Packs
                </span>
                <span 
                  onClick={() => { setSelectedTP(null); setCurrentTab('dashboard'); scrollTop(); }}
                  className={`h-24 flex items-center cursor-pointer font-display transition-all border-b-4 gap-2 tracking-wide font-semibold ${currentTab === 'dashboard' ? 'text-indigo-700 border-indigo-700' : 'text-slate-500 border-transparent hover:text-indigo-600'}`}
                >
                  <BarChart3 className="w-5 h-5 text-violet-500" /> Suivi Labo
                </span>

              </>
            )}
          </div>
          
          <button 
            onClick={() => { setSelectedTP(null); setCurrentTab('safety'); scrollTop(); }}
            className="lg:hidden p-2.5 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
          >
            <ShieldAlert className="w-7 h-7" />
          </button>

          {userProfile && (
            <div className="hidden sm:flex flex-col text-right mr-3 shrink-0">
              <span className="text-xs font-extrabold text-slate-800 leading-tight">
                {userProfile.firstName} {userProfile.lastName}
              </span>
              <span className="text-[9px] font-black text-indigo-600 uppercase tracking-wider mt-0.5">
                {userProfile.role === 'élève' 
                  ? `Élève • ${userProfile.studentClass}` 
                  : userProfile.role === 'enseignant' 
                    ? 'Enseignant' 
                    : 'Admin'}
              </span>
            </div>
          )}

          <button 
            onClick={() => {
              sessionStorage.removeItem('site_access_token');
              sessionStorage.removeItem('user_profile_data');
              setIsAuthenticated(false);
              setUserProfile(null);
            }}
            className="flex items-center gap-2 text-rose-600 hover:text-white hover:bg-rose-600 bg-rose-50/80 border border-rose-100 rounded-xl px-4 py-2 sm:py-2.5 transition-all text-xs font-black uppercase tracking-widest cursor-pointer hover:shadow-lg hover:shadow-rose-500/10 active:scale-95 shrink-0"
            title="Verrouiller le portail"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Verrouiller</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-10 max-w-7xl mx-auto w-full relative z-10">
        <AnimatePresence mode="wait">
          {sessionPackData ? (
            <SessionPackViewer 
              key="viewer"
              encodedData={sessionPackData}
              onExit={() => {
                setSessionPackData(null);
                const url = new URL(window.location.href);
                url.searchParams.delete('session_pack');
                window.history.replaceState({}, '', url.toString());
                setCurrentTab('home');
                scrollTop();
              }}
            />
          ) : selectedTP ? (
            <TPDetails 
              key="details"
              tp={selectedTP} 
              onBack={() => {
                setSelectedTP(null);
                scrollTop();
              }} 
            />
          ) : currentTab === 'sds' ? (
            <motion.div
              key="sds"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SDSDatabase />
            </motion.div>
          ) : currentTab === 'safety' ? (
            <motion.div
              key="safety"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SafetyRoom />
            </motion.div>
          ) : currentTab === 'checklist' ? (
            <motion.div
              key="checklist"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <TeacherChecklist />
            </motion.div>
          ) : currentTab === 'packs' ? (
            <motion.div
              key="packs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SessionPackGenerator />
            </motion.div>
          ) : currentTab === 'dashboard' ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Dashboard />
            </motion.div>

          ) : (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Promo Banner for Safety - Rich Neon Gradients */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => { 
                    setCurrentTab('safety');
                    scrollTop();
                  }}
                  className="mb-6 bg-gradient-to-r from-rose-600 via-rose-700 to-amber-600 border border-white/25 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer hover:shadow-xl hover:shadow-rose-500/10 hover:scale-[1.01] transition-all group shadow-md relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none"></div>
                  
                  <div className="flex items-center gap-4 sm:gap-6 relative z-10 transition-transform group-hover:translate-x-1 duration-300">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-rose-600 shadow-md group-hover:scale-110 transition-transform ring-2 ring-rose-200/50">
                      <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-white tracking-tight group-hover:text-rose-50 transition-colors font-display uppercase">ESPACE SÉCURITÉ LABORATOIRE</h3>
                      <p className="text-rose-100 text-xs mt-1 font-medium">Consignes obligatoires, symboles de danger SGH et règles de manipulation.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-white font-bold text-xs uppercase tracking-wider bg-white/15 px-4 py-2 rounded-xl border border-white/20 backdrop-blur-md relative z-10 hover:bg-white hover:text-rose-700 transition-colors duration-200">
                    Accéder <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>

              {/* Interactive Scientific Glassmorphic Hero Card */}
              <div className="flex flex-col items-center text-center gap-6 mb-16 p-8 sm:p-14 bg-white/70 backdrop-blur-md rounded-[32px] border border-indigo-100/45 shadow-xl shadow-indigo-100/10 relative overflow-hidden">
                {/* Decorative circuit or chemical backdrop styling */}
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-70"></div>
                <div className="absolute -top-12 -left-12 w-44 h-44 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center gap-5">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse text-indigo-500" /> Physique & Chimie Expérimentale
                  </div>
                  <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl sm:text-6xl font-black text-slate-900 tracking-tight uppercase font-display"
                  >
                    Banque de TPs
                  </motion.h2>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="h-1.5 w-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-md"
                  ></motion.div>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-600 max-w-3xl text-base sm:text-xl leading-relaxed font-semibold font-sans mt-2"
                  >
                    Découvrez une sélection rigoureuse de fiches de Travaux Pratiques interactives conçues pour stimuler l'esprit d'investigation scientifique au lycée.
                  </motion.p>
                </div>
              </div>

        {/* View Switcher & Filters inside a sleek laboratory dashboard deck */}
        <div className="flex flex-col gap-8 mb-16 bg-white/40 p-4 sm:p-6 rounded-3xl border border-indigo-100/50 backdrop-blur-sm shadow-sm relative z-20">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-indigo-900 font-bold uppercase tracking-wider text-xs px-2.5 py-1.5 bg-indigo-50 rounded-xl border border-indigo-100 shrink-0">
                <Filter className="w-4 h-4 text-indigo-600" />
                <span>Niveau :</span>
              </div>
              {levels.map((lvl) => {
                const isActive = selectedLevel === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-5 py-3 rounded-2xl text-[12px] uppercase font-bold tracking-wider transition-all shadow-sm active:scale-95 flex items-center gap-2 border-2 ${
                      isActive
                        ? lvl === 'Tronc Commun' ? 'bg-gradient-to-r from-teal-600 to-emerald-500 text-white border-teal-600 shadow-md shadow-teal-600/10' :
                          lvl === '1ère Bac' ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white border-blue-600 shadow-md shadow-blue-600/10' :
                          lvl === '2ème Bac' ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white border-purple-600 shadow-md shadow-purple-600/10' :
                          'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white border-indigo-50/50 hover:border-indigo-200 text-slate-700 hover:text-indigo-900'
                    }`}
                  >
                    {/* Visual pulse indicator dot */}
                    <span className={`w-2 h-2 rounded-full ${
                      lvl === 'Tous' ? 'bg-indigo-400' :
                      lvl === 'Tronc Commun' ? 'bg-teal-400' :
                      lvl === '1ère Bac' ? 'bg-blue-400' :
                      'bg-purple-400'
                    } ${isActive ? 'animate-ping' : ''}`}></span>
                    {lvl}
                  </button>
                );
              })}
            </div>
            
            <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200/60 shadow-inner sm:self-end lg:self-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${viewMode === 'grid' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-400 hover:bg-slate-50'}`}
                title="Affichage en Grille"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Grille</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition-all flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-400 hover:bg-slate-50'}`}
                title="Affichage en Liste"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">Liste</span>
              </button>
            </div>
          </div>
        </div>

        {/* The Grid of TPs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              : "flex flex-col gap-6"
          }
        >
          <AnimatePresence mode="popLayout">
            {filteredTPs.map((tp) => (
              <motion.div
                key={tp.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                className={`group bg-white border border-indigo-100/60 rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-650/5 hover:-translate-y-1.5 transition-all duration-300 flex ${
                  viewMode === 'list' ? 'flex-row h-56' : 'flex-col'
                }`}
              >
                {/* Visual Area with subtle image dimming and overlay blur */}
                <div className={`relative overflow-hidden flex-shrink-0 bg-slate-100 ${
                  viewMode === 'list' ? 'w-[280px] h-full border-r border-indigo-50' : 'h-52'
                }`}>
                  <img
                    src={tp.image}
                    alt={tp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.93] group-hover:brightness-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-4 left-4 flex flex-col gap-2.5 z-10">
                    <div className="bg-indigo-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider text-white shadow-md border border-white/10 w-fit">
                      {tp.category}
                    </div>
                  </div>
                </div>

                {/* Content Area with refined spacings */}
                <div className="p-7 sm:p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {tp.difficulty === 'Débutant' ? (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-100/80 font-bold text-[11px] uppercase tracking-wider rounded-xl flex items-center gap-1.5 px-3 py-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-sm"></span>
                          {tp.difficulty}
                        </span>
                      ) : tp.difficulty === 'Intermédiaire' ? (
                        <span className="bg-amber-50 text-amber-700 border border-amber-100/80 font-bold text-[11px] uppercase tracking-wider rounded-xl flex items-center gap-1.5 px-3 py-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-sm"></span>
                          {tp.difficulty}
                        </span>
                      ) : (
                        <span className="bg-rose-50 text-rose-700 border border-rose-100/80 font-bold text-[11px] uppercase tracking-wider rounded-xl flex items-center gap-1.5 px-3 py-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shadow-sm"></span>
                          {tp.difficulty}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-indigo-500 font-bold text-xs tracking-wide">
                      <Clock className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
                      {tp.duration}
                    </div>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight group-hover:text-indigo-650 transition-colors mb-3 font-sans">
                    {tp.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal mb-5">
                    {tp.description}
                  </p>

                  <div className="mt-auto pt-5 flex items-center justify-between border-t border-indigo-50/75">
                    <div className="flex items-center gap-2.5 text-slate-500">
                      <div className="p-2 bg-indigo-50/50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner border border-indigo-50/30">
                        {getIconForCategory(tp.category)}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-indigo-900 transition-colors">{tp.level}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedTP(tp);
                        scrollTop();
                      }}
                      className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-2xl transition-all shadow-md shadow-indigo-200/40 hover:shadow-lg active:scale-95 group/btn"
                    >
                      Détails 
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 duration-200" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredTPs.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-slate-100">
            <FlaskConical className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight">Aucun résultat</h3>
            <p className="text-slate-400 text-sm mt-1">Ajustez vos filtres pour voir d'autres TPs.</p>
          </div>
        )}

              {/* Bottom Glossy Stats Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-16 bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-950 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-around text-white gap-8 md:gap-0 border border-slate-800 shadow-xl shadow-slate-900/10 relative overflow-hidden"
              >
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="text-center relative z-10 hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl sm:text-5xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-white">{TP_DATA.length}</div>
                  <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-slate-400 font-bold mt-2">Expériences rédigées</div>
                </div>
                <div className="hidden md:block w-px h-14 bg-gradient-to-b from-transparent via-slate-700 to-transparent"></div>
                <div className="text-center relative z-10 hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl sm:text-5xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-white">{categories.length - 1}</div>
                  <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-slate-400 font-bold mt-2">Domaines d'études</div>
                </div>
                <div className="hidden md:block w-px h-14 bg-gradient-to-b from-transparent via-slate-700 to-transparent"></div>
                <div className="text-center relative z-10 hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl sm:text-5xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-white">100%</div>
                  <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-slate-400 font-bold mt-2">Normes FDS & SGH</div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Decorative */}
      <footer className="py-12 bg-white border-t border-slate-100 flex flex-col items-center justify-center px-4 sm:px-10 text-[10px] text-slate-500 mt-10 sm:mt-20 pb-24 sm:pb-12">
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-widest uppercase">AZZEDDINE ATIBI</span>
          </div>
        </div>
        <p className="mb-4 text-center opacity-80">PASSIONNÉ PAR L'INNOVATION PÉDAGOGIQUE ET LE PROGRÈS DES ÉLÈVES</p>
        <div className="flex items-center gap-4">
          <span className="uppercase tracking-widest">© 2026 TOUS DROITS RÉSERVÉS</span>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[95%] max-w-[500px]">
        <div className="bg-slate-900 shadow-2xl shadow-indigo-300/40 rounded-[24px] p-2 border-2 border-slate-800 backdrop-blur-xl flex items-center justify-around gap-1 overflow-x-auto scrollbar-none max-w-full">
          <button 
            onClick={() => { setSelectedTP(null); setCurrentTab('home'); scrollTop(); }}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2.5 rounded-xl transition-all shrink-0 ${currentTab === 'home' ? 'text-white bg-indigo-600 shadow-xl scale-105' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-tight">Banque</span>
          </button>
          <button 
            onClick={() => { setSelectedTP(null); setCurrentTab('sds'); scrollTop(); }}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2.5 rounded-xl transition-all shrink-0 ${currentTab === 'sds' ? 'text-white bg-indigo-600 shadow-xl scale-105' : 'text-slate-400 hover:text-slate-100'}`}
          >
            <Beaker className="w-5 h-5" />
            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-tight">SDS</span>
          </button>
          <button 
            onClick={() => { setSelectedTP(null); setCurrentTab('safety'); scrollTop(); }}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2.5 rounded-xl transition-all shrink-0 ${currentTab === 'safety' ? 'text-white bg-indigo-600 shadow-xl scale-105' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <ShieldAlert className="w-5 h-5" />
            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-tight">Sécurité</span>
          </button>
          {!isStudent && (
            <>
              <button 
                onClick={() => { setSelectedTP(null); setCurrentTab('checklist'); scrollTop(); }}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2.5 rounded-xl transition-all shrink-0 ${currentTab === 'checklist' ? 'text-white bg-indigo-600 shadow-xl scale-105' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <ClipboardCheck className="w-5 h-5" />
                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-tight">Checklist</span>
              </button>
              <button 
                onClick={() => { setSelectedTP(null); setCurrentTab('packs'); scrollTop(); }}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2.5 rounded-xl transition-all shrink-0 ${currentTab === 'packs' ? 'text-white bg-indigo-600 shadow-xl scale-105' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <FlaskConical className="w-5 h-5" />
                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-tight">Packs</span>
              </button>
              <button 
                onClick={() => { setSelectedTP(null); setCurrentTab('dashboard'); scrollTop(); }}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2.5 rounded-xl transition-all shrink-0 ${currentTab === 'dashboard' ? 'text-white bg-indigo-600 shadow-xl scale-105' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <BarChart3 className="w-5 h-5" />
                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-tight">Suivi</span>
              </button>

            </>
          )}
        </div>
      </div>
    </div>
  );
}
