import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  Beaker, 
  ClipboardList, 
  AlertTriangle, 
  Calendar, 
  GraduationCap, 
  Clock, 
  Plus, 
  RefreshCw, 
  Filter, 
  ShieldAlert, 
  CheckCircle, 
  XCircle, 
  Search,
  Package,
  Wrench,
  UserCheck
} from 'lucide-react';
import { SDS_DATA, SDSMaterial, TP_DATA } from '../constants';

// Initial Mock Stock Data with Expiration Dates & Stock Levels for High-End Interactive Experience
interface ChemicalStock {
  id: string;
  name: string;
  formula: string;
  quantity: number; // in Liters / Grams
  unit: string;
  minLimit: number; // threshold for stock alerts
  expirationDate: string; // YYYY-MM-DD
  isExpired: boolean;
  usageCount: number; // how many times used in TPs
  shelfLocation: string; // Storage compartment
}

// Initial Mock Quiz Results for Students
interface QuizResultLog {
  id: string;
  studentName: string;
  classGroup: string;
  tpTitle: string;
  score: number;
  totalQuestions: number;
  date: string;
  passed: boolean;
}

const INITIAL_STOCKS: ChemicalStock[] = [
  { id: 'hcl', name: 'Acide chlorhydrique (HCl)', formula: 'HCl', quantity: 0.8, unit: 'L', minLimit: 1.5, expirationDate: '2027-05-15', isExpired: false, usageCount: 22, shelfLocation: 'Armoire A - Acides' },
  { id: 'naoh', name: 'Hydroxyde de sodium', formula: 'NaOH', quantity: 2.5, unit: 'kg', minLimit: 1.0, expirationDate: '2026-11-20', isExpired: false, usageCount: 18, shelfLocation: 'Armoire B - Bases' },
  { id: 'kmno4', name: 'Permanganate de potassium', formula: 'KMnO₄', quantity: 0.2, unit: 'kg', minLimit: 0.5, expirationDate: '2025-12-10', isExpired: true, usageCount: 14, shelfLocation: 'Armoire C - Oxydants' },
  { id: 'ethanol', name: 'Éthanol à 96%', formula: 'C₂H₅OH', quantity: 4.0, unit: 'L', minLimit: 2.0, expirationDate: '2028-02-28', isExpired: false, usageCount: 35, shelfLocation: 'Hotte Solvants' },
  { id: 'h2so4', name: 'Acide sulfurique concentré', formula: 'H₂SO₄', quantity: 0.4, unit: 'L', minLimit: 1.0, expirationDate: '2027-08-01', isExpired: false, usageCount: 26, shelfLocation: 'Armoire A - Acides' },
  { id: 'acetone', name: 'Acétone pure', formula: 'CH₃COCH₃', quantity: 1.2, unit: 'L', minLimit: 2.5, expirationDate: '2025-03-14', isExpired: true, usageCount: 40, shelfLocation: 'Hotte Solvants' },
  { id: 'agno3', name: 'Nitrate d\'argent', formula: 'AgNO₃', quantity: 0.05, unit: 'kg', minLimit: 0.1, expirationDate: '2026-09-05', isExpired: false, usageCount: 12, shelfLocation: 'Zone Sécurisée - Métaux' },
  { id: 'cuso4', name: 'Sulfate de cuivre anhydre', formula: 'CuSO₄', quantity: 1.8, unit: 'kg', minLimit: 0.8, expirationDate: '2028-10-12', isExpired: false, usageCount: 31, shelfLocation: 'Étagère Sels' },
  { id: 'ch2cl2', name: 'Dichlorométhane', formula: 'CH₂Cl₂', quantity: 0.15, unit: 'L', minLimit: 1.0, expirationDate: '2025-01-10', isExpired: true, usageCount: 9, shelfLocation: 'Hotte Organique' }
];

const INITIAL_QUIZ_RESULTS: QuizResultLog[] = [
  { id: 'q1', studentName: 'Yassine El Amrani', classGroup: '2ème Bac SM-A', tpTitle: 'Titrage acide-base — NaOH / HCl', score: 9, totalQuestions: 10, date: '2026-05-28', passed: true },
  { id: 'q2', studentName: 'Amine Benjelloun', classGroup: '1ère Bac SX-1', tpTitle: 'Sécurité Générale du Labo', score: 10, totalQuestions: 10, date: '2026-05-29', passed: true },
  { id: 'q3', studentName: 'Fatima-Zahra Alaoui', classGroup: '2ème Bac SM-A', tpTitle: 'Titrage acide-base — NaOH / HCl', score: 5, totalQuestions: 10, date: '2026-05-28', passed: false },
  { id: 'q4', studentName: 'Salma El Fassi', classGroup: 'Tronc Commun Sc-2', tpTitle: 'Quiz SGH - Pictogrammes', score: 8, totalQuestions: 10, date: '2026-05-30', passed: true },
  { id: 'q5', studentName: 'Omar Bouazzaoui', classGroup: '1ère Bac SX-2', tpTitle: 'Extraction de la caféine', score: 4, totalQuestions: 10, date: '2026-05-30', passed: false },
  { id: 'q6', studentName: 'Sofia Bensouda', classGroup: '2ème Bac SM-B', tpTitle: 'Suivi cinétique par spectrophotométrie', score: 9, totalQuestions: 10, date: '2026-05-31', passed: true }
];

export const Dashboard: React.FC = () => {
  // Application State
  const [stocks, setStocks] = useState<ChemicalStock[]>(INITIAL_STOCKS);
  const [quizResults, setQuizResults] = useState<QuizResultLog[]>(() => {
    const raw = localStorage.getItem('lab_quiz_results');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (err) {
        return INITIAL_QUIZ_RESULTS;
      }
    }
    localStorage.setItem('lab_quiz_results', JSON.stringify(INITIAL_QUIZ_RESULTS));
    return INITIAL_QUIZ_RESULTS;
  });
  const [stockSearch, setStockSearch] = useState('');

  // Synchronize on mount to capture any quiz completed outside the dashboard
  useEffect(() => {
    const raw = localStorage.getItem('lab_quiz_results');
    if (raw) {
      try {
        setQuizResults(JSON.parse(raw));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);
  const [activeSubTab, setActiveSubTab] = useState<'kpis' | 'stocks' | 'quizzes' | 'stats'>('kpis');
  
  // Interactive simulator inputs for logging mock student data
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentClass, setNewStudentClass] = useState('2ème Bac SM-A');
  const [newQuizTitle, setNewQuizTitle] = useState('Titrage acide-base — NaOH / HCl');
  const [newQuizScore, setNewQuizScore] = useState(8);

  // Stats calculation
  const totalChemicalsCount = SDS_DATA.length; // From real static data
  const totalTPsCount = TP_DATA.length; // From real static data

  // Dynamic values calculated from state to demonstrate real persistence / updates
  const expiredProducts = useMemo(() => stocks.filter(s => s.isExpired), [stocks]);
  const stockAlerts = useMemo(() => stocks.filter(s => s.quantity <= s.minLimit && !s.isExpired), [stocks]);

  const quizStats = useMemo(() => {
    const total = quizResults.length;
    const passed = quizResults.filter(q => q.passed).length;
    const rate = total > 0 ? Math.round((passed / total) * 100) : 0;
    const averageScore = total > 0 ? (quizResults.reduce((acc, q) => acc + q.score, 0) / total).toFixed(1) : '0';
    return { total, passed, rate, averageScore };
  }, [quizResults]);

  // Handle manual simulated restock action
  const handleRestock = (id: string, amount: number) => {
    setStocks(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = parseFloat((item.quantity + amount).toFixed(2));
        return {
          ...item,
          quantity: newQty,
          // If we add quantities and it's expired, let's also assume it has been renewed (set isExpired to false)!
          isExpired: item.isExpired && amount > 1 ? false : item.isExpired
        };
      }
      return item;
    }));
  };

  // Handle manual simulated toggle of expiration date to show dynamic reaction of the system
  const handleToggleExpire = (id: string) => {
    setStocks(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isExpired: !item.isExpired,
          expirationDate: !item.isExpired ? '2025-01-01' : '2027-12-31'
        };
      }
      return item;
    }));
  };

  // Log a new student quiz result directly
  const handleAddQuizResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    const newResult: QuizResultLog = {
      id: `q_sim_${Date.now()}`,
      studentName: newStudentName,
      classGroup: newStudentClass,
      tpTitle: newQuizTitle,
      score: newQuizScore,
      totalQuestions: 10,
      date: new Date().toISOString().split('T')[0],
      passed: newQuizScore >= 6
    };

    const updated = [newResult, ...quizResults];
    setQuizResults(updated);
    localStorage.setItem('lab_quiz_results', JSON.stringify(updated));
    setNewStudentName('');
    setActiveSubTab('quizzes');
  };

  // Filtered stocks for search
  const filteredStocks = stocks.filter(item => 
    item.name.toLowerCase().includes(stockSearch.toLowerCase()) || 
    item.formula.toLowerCase().includes(stockSearch.toLowerCase()) ||
    item.shelfLocation.toLowerCase().includes(stockSearch.toLowerCase())
  );

  return (
    <div className="bg-white border-2 border-indigo-100/50 rounded-[32px] p-6 sm:p-10 shadow-sm relative overflow-hidden" id="lab-dashboard">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      {/* Header section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 pb-6 border-b border-indigo-50">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-3">
            <BarChart3 className="w-3.5 h-3.5 text-indigo-600 animate-pulse" /> Suivi & Administration Réglementaire
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">Tableau de Bord Laboratoire</h2>
          <p className="text-slate-600 text-sm mt-1">
            Indicateurs clés de sécurité, état des stocks de réactifs, résultats des habilitations élèves et statistiques d'usages TP.
          </p>
        </div>

        {/* Dashboard sub tabs navigation */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-full lg:w-auto">
          <button
            onClick={() => setActiveSubTab('kpis')}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all select-none ${activeSubTab === 'kpis' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Vue d'ensemble
          </button>
          <button
            onClick={() => setActiveSubTab('stocks')}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all select-none ${activeSubTab === 'stocks' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Gestion des Stocks ({stocks.length})
          </button>
          <button
            onClick={() => setActiveSubTab('quizzes')}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all select-none ${activeSubTab === 'quizzes' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Quiz Élèves ({quizResults.length})
          </button>
          <button
            onClick={() => setActiveSubTab('stats')}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all select-none ${activeSubTab === 'stats' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Analytiques & Usages
          </button>
        </div>
      </div>

      {/* Main KPI widget sections */}
      <AnimatePresence mode="wait">
        {activeSubTab === 'kpis' && (
          <motion.div
            key="kpis"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-10"
          >
            {/* Quick stats indicators grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Stat 1: Products quantity */}
              <div className="bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all p-6 rounded-2xl shadow-sm hover:shadow-md">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                    <Beaker className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">Référencés</span>
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-black text-slate-800">{totalChemicalsCount}</span>
                  <h3 className="text-slate-700 text-xs font-bold uppercase mt-1">Produits Chimiques</h3>
                  <p className="text-slate-500 text-[11px] mt-1">Habilité conformité FDS complète</p>
                </div>
              </div>

              {/* Stat 2: Practical Works Quantity */}
              <div className="bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all p-6 rounded-2xl shadow-sm hover:shadow-md">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-violet-50 rounded-xl text-violet-600">
                    <ClipboardList className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full uppercase">Actifs</span>
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-black text-slate-800">{totalTPsCount}</span>
                  <h3 className="text-slate-700 text-xs font-bold uppercase mt-1">Travaux Pratiques</h3>
                  <p className="text-slate-500 text-[11px] mt-1">Protocoles et évaluations de sécurité</p>
                </div>
              </div>

              {/* Stat 3: Expired chemicals alerts */}
              <div className={`p-6 rounded-2xl border transition-all shadow-sm hover:shadow-md ${expiredProducts.length > 0 ? 'bg-orange-50 border-orange-200/60' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-xl ${expiredProducts.length > 0 ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'}`}>
                    <Calendar className="w-6 h-6" />
                  </div>
                  {expiredProducts.length > 0 && (
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full uppercase animate-pulse">ATTENTION</span>
                  )}
                </div>
                <div className="mt-4">
                  <span className={`text-3xl font-black ${expiredProducts.length > 0 ? 'text-orange-900' : 'text-slate-800'}`}>
                    {expiredProducts.length}
                  </span>
                  <h3 className="text-slate-700 text-xs font-bold uppercase mt-1">Produits Expirés</h3>
                  <p className="text-[11px] mt-1 text-slate-500">Nécessitent un contrôle ou élimination</p>
                </div>
              </div>

              {/* Stat 4: Low stock alerts */}
              <div className={`p-6 rounded-2xl border transition-all shadow-sm hover:shadow-md ${stockAlerts.length > 0 ? 'bg-rose-50 border-rose-200/60' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-xl ${stockAlerts.length > 0 ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'}`}>
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  {stockAlerts.length > 0 && (
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full uppercase">ALERTE</span>
                  )}
                </div>
                <div className="mt-4">
                  <span className={`text-3xl font-black ${stockAlerts.length > 0 ? 'text-rose-900 animate-pulse' : 'text-slate-800'}`}>
                    {stockAlerts.length}
                  </span>
                  <h3 className="text-slate-700 text-xs font-bold uppercase mt-1">Alertes de Stock</h3>
                  <p className="text-slate-500 text-[11px] mt-1">Quantité sous la limite minimale</p>
                </div>
              </div>
            </div>

            {/* Quick indicators alert banner */}
            {(expiredProducts.length > 0 || stockAlerts.length > 0) && (
              <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-amber-100 text-amber-800 rounded-xl mt-0.5 md:mt-0">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-amber-900 font-bold text-sm uppercase">Fiches d'alertes actives</h3>
                    <p className="text-amber-800 text-xs mt-0.5 font-medium">
                      Le dépôt de chimie réclame {expiredProducts.length} élimination(s) de réactifs périmés et {stockAlerts.length} réapprovisionnement(s) urgent(s) pour la continuité des séances pratiques.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setActiveSubTab('stocks')}
                    className="px-4 py-2 bg-amber-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-amber-950 transition-colors"
                  >
                    Examiner les alertes
                  </button>
                </div>
              </div>
            )}

            {/* Realtime student activity & quiz summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quiz rate card */}
              <div className="lg:col-span-1 bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-slate-800 text-xs font-bold uppercase tracking-wide mb-4">Statistiques habilitations</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-black text-indigo-700">{quizStats.rate}%</span>
                    <span className="text-xs font-extrabold text-slate-400">Taux de réussite</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed font-semibold mt-1">
                    Pourcentage d'élèves validant le quiz de préparation de TP (note minimale requis : 6/10) avant l'autorisation physique de manipulation.
                  </p>
                  <div className="space-y-3 mt-6">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Moyenne générale</span>
                      <span className="font-extrabold text-indigo-700">{quizStats.averageScore} / 10</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${quizStats.rate}%` }}></div>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-slate-500 font-bold">
                      <span>{quizStats.passed} Validations</span>
                      <span>{quizStats.total} Tentatives Totales</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-5 border-t border-slate-200 text-center">
                  <button
                    onClick={() => setActiveSubTab('quizzes')}
                    className="text-xs text-indigo-600 font-bold hover:text-indigo-800"
                  >
                    Voir la feuille d'émargement &rarr;
                  </button>
                </div>
              </div>

              {/* Simulation section: Quick log result log form */}
              <div className="lg:col-span-2 bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <h3 className="text-slate-800 text-xs font-bold uppercase tracking-wide mb-4 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-500" /> Enregistrer un résultat de quiz élève (Simulateur)
                </h3>
                <p className="text-slate-500 text-xs mb-5 font-medium leading-relaxed">
                  Ajoutez les résultats des tests d'aptitude de sécurité récoltés hors-ligne ou sur fiches d'habilitation pour actualiser les graphiques et le registre.
                </p>
                <form onSubmit={handleAddQuizResult} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 text-xs font-bold mb-1">Nom Complet Éléve</label>
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-slate-900 font-semibold text-xs outline-none focus:border-indigo-600"
                      placeholder="Ex: Selma Lamrani"
                      required
                      value={newStudentName}
                      onChange={e => setNewStudentName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-xs font-bold mb-1">Classe / Groupe Académique</label>
                    <select
                      className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-slate-900 font-semibold text-xs outline-none focus:border-indigo-600"
                      value={newStudentClass}
                      onChange={e => setNewStudentClass(e.target.value)}
                    >
                      <option value="Tronc Commun Sc-2">Tronc Commun Sc-2</option>
                      <option value="1ère Bac SX-1">1ère Bac SX-1</option>
                      <option value="1ère Bac SX-2">1ère Bac SX-2</option>
                      <option value="2ème Bac SM-A">2ème Bac SM-A</option>
                      <option value="2ème Bac SM-B">2ème Bac SM-B</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 text-xs font-bold mb-1">Activité ou TP concerné</label>
                    <select
                      className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-slate-900 font-semibold text-xs outline-none"
                      value={newQuizTitle}
                      onChange={e => setNewQuizTitle(e.target.value)}
                    >
                      <option value="Titrage acide-base — NaOH / HCl">Titrage acide-base — NaOH / HCl</option>
                      <option value="Sécurité Générale du Labo">Sécurité Générale du Labo</option>
                      <option value="Quiz SGH - Pictogrammes">Quiz SGH - Pictogrammes</option>
                      <option value="Extraction de la caféine">Extraction de la caféine</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 text-xs font-bold mb-1">Note de validation obtenue</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="10"
                        className="w-full accent-indigo-600"
                        value={newQuizScore}
                        onChange={e => setNewQuizScore(parseInt(e.target.value))}
                      />
                      <span className="w-12 text-center text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2 py-1.5 rounded-xl border border-indigo-100">
                        {newQuizScore}/10
                      </span>
                    </div>
                  </div>
                  <div className="sm:col-span-2 pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                      Enregistrer et calculer les indicateurs
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        )}

        {/* Gestions de Stocks layout with active actions (Restock/Expire simulation) */}
        {activeSubTab === 'stocks' && (
          <motion.div
            key="stocks"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-2">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher un réactif chimique du stock..."
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100"
                  value={stockSearch}
                  onChange={e => setStockSearch(e.target.value)}
                />
              </div>
              <div className="text-slate-500 text-xs font-semibold">
                Affichage de <span className="text-slate-800 font-bold">{filteredStocks.length}</span> produits sur <span className="text-slate-800 font-bold">{stocks.length}</span>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-black uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <th className="p-4">Réactif / Formule</th>
                    <th className="p-4">Emplacement Étagère</th>
                    <th className="p-4">Quantité Active</th>
                    <th className="p-4">Statut Expiration</th>
                    <th className="p-4">Seuil Min.</th>
                    <th className="p-4 text-center">Actions d'Administration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredStocks.map(item => {
                    const isLow = item.quantity <= item.minLimit;
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4">
                          <div className="text-slate-800 font-bold text-xs">{item.name}</div>
                          <div className="text-slate-400 font-mono text-[10px] uppercase">{item.formula}</div>
                        </td>
                        <td className="p-4 text-slate-600 text-xs">
                          {item.shelfLocation}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold text-xs px-2.5 py-1 rounded-xl font-mono ${
                              item.isExpired ? 'bg-orange-100 text-orange-850' :
                              isLow ? 'bg-rose-100 text-rose-800 font-extrabold' : 'bg-emerald-50 text-emerald-700'
                            }`}>
                              {item.quantity} {item.unit}
                            </span>
                            {isLow && !item.isExpired && (
                              <span className="text-[9px] font-black text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded uppercase pulse">Bas</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          {item.isExpired ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-black text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full uppercase">
                              <Calendar className="w-3 h-3" /> Expiré ({item.expirationDate})
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600">
                              Valide ({item.expirationDate})
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-slate-500 text-xs font-mono">{item.minLimit} {item.unit}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            {/* Simulated Quick Replenish */}
                            <button
                              onClick={() => handleRestock(item.id, 1.0)}
                              className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100 rounded-lg text-[10px] font-bold uppercase transition-transform active:scale-95"
                              title="Ajouter du stock (+1L/kg)"
                            >
                              +1.0 {item.unit}
                            </button>
                            <button
                              onClick={() => handleRestock(item.id, 0.2)}
                              className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100 rounded-lg text-[10px] font-bold uppercase transition-transform active:scale-95"
                              title="Ajouter du stock (+0.2L/kg)"
                            >
                              +0.2 {item.unit}
                            </button>
                            {/* Simulated Toggle Expiration for verification */}
                            <button
                              onClick={() => handleToggleExpire(item.id)}
                              className={`px-2.5 py-1.5 border rounded-lg text-[10px] font-bold uppercase transition-all ${
                                item.isExpired ? 'bg-emerald-50 border-emerald-100 text-emerald-700 hover:bg-emerald-100' : 'bg-amber-50 border-amber-100 text-amber-800 hover:bg-amber-100'
                              }`}
                              title="Forcer ou résoudre le statut d'expiration"
                            >
                              {item.isExpired ? "Dé-périmer" : "Périmer"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredStocks.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center p-8 text-slate-400">
                        Aucun réactif ne correspond à votre recherche de stocks.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <p className="text-[10px] text-slate-400 italic">
              * Note administrative : Les réapprovisionnements sont simulés en temps réel dans cette vue. Au laboratoire académique réel, ces actions notifient le gestionnaire délégué aux commandes de l'établissement.
            </p>
          </motion.div>
        )}

        {/* Quiz results registry panel */}
        {activeSubTab === 'quizzes' && (
          <motion.div
            key="quizzes"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-slate-800 text-sm font-bold uppercase">Registre des Aptitudes Pratiques & Quiz</h3>
                <p className="text-slate-500 text-xs font-semibold mt-0.5">Registre de sécurité légal pour l'autorisation d'entrée en salle expérimentale.</p>
              </div>
              <button
                onClick={() => {
                  setQuizResults(INITIAL_QUIZ_RESULTS);
                  localStorage.setItem('lab_quiz_results', JSON.stringify(INITIAL_QUIZ_RESULTS));
                }}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 border border-slate-300 rounded-lg text-[10px] font-bold uppercase tracking-wide flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Réinitialiser
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-black uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <th className="p-4">Élève</th>
                    <th className="p-4">Classe Académique</th>
                    <th className="p-4">Évaluation de TP</th>
                    <th className="p-4">Date du test</th>
                    <th className="p-4">Note / Habilitation</th>
                    <th className="p-4">Autorisation Manipulation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {quizResults.map(q => (
                    <tr key={q.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="text-slate-800 font-bold text-xs flex items-center gap-1.5">
                          <GraduationCap className="w-4 h-4 text-indigo-500" />
                          {q.studentName}
                        </div>
                      </td>
                      <td className="p-4 text-slate-600 text-xs">
                        {q.classGroup}
                      </td>
                      <td className="p-4 text-slate-600 text-xs font-semibold">
                        {q.tpTitle}
                      </td>
                      <td className="p-4 text-slate-500 text-xs font-mono">{q.date}</td>
                      <td className="p-4">
                        <span className={`font-mono text-xs font-extrabold px-2.5 py-1 rounded-xl ${
                          q.passed ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                        }`}>
                          {q.score} / {q.totalQuestions}
                        </span>
                      </td>
                      <td className="p-4">
                        {q.passed ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                            <CheckCircle className="w-3.5 h-3.5" /> Habilité (Vert)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-red-500 bg-rose-100 px-2 py-0.5 rounded-full uppercase">
                            <XCircle className="w-3.5 h-3.5" /> Refusé (Rouge)
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[10px] text-slate-400 italic">
              * Note technique : L'habilitation est délivrée de droit pour tout score supérieur ou égal à 6/10. Les élèves n'ayant pas atteint ce score doivent repasser l'évaluation obligatoire de sécurité avant l'ouverture de leur paillasse d'exercice.
            </p>
          </motion.div>
        )}

        {/* Statistical distribution & analytical usage card components */}
        {activeSubTab === 'stats' && (
          <motion.div
            key="stats"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Visual statistics - chemical storage distribution and consumption stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product usage frequency chart using styling metrics */}
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                <h3 className="text-slate-800 text-xs font-bold uppercase tracking-wide mb-5 flex items-center justify-between">
                  <span>Usage des principaux réactifs</span>
                  <span className="text-[10px] font-bold text-slate-400">En nombre de séances</span>
                </h3>
                
                {/* Simulated lightweight HTML graph bars */}
                <div className="space-y-4">
                  {stocks.slice(0, 6).map(item => {
                    const maxCount = 40; // max value of usage statistics as reference
                    const percent = Math.round((item.usageCount / maxCount) * 100);
                    return (
                      <div key={item.id} className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-700 font-bold">{item.name}</span>
                          <span className="font-mono text-indigo-700 font-extrabold">{item.usageCount} séances</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-indigo-600 h-full rounded-full transition-all duration-700" 
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Lab usage schedule and peaks statistics */}
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <h3 className="text-slate-800 text-xs font-bold uppercase tracking-wide mb-4">Statistiques d'utilisation globaux</h3>
                  <div className="space-y-4 mt-6">
                    <div className="flex justify-between items-center p-3 bg-white border border-slate-200/50 rounded-xl">
                      <div className="flex items-center gap-2.5">
                        <TrendingUp className="w-5 h-5 text-indigo-600" />
                        <div>
                          <div className="text-slate-900 font-bold text-xs">Niveau d'étude à forte demande</div>
                          <div className="text-slate-400 text-[9px] uppercase font-bold">Lycée Marocain</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">2ème Bac SM</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-white border border-slate-200/50 rounded-xl">
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-5 h-5 text-indigo-600" />
                        <div>
                          <div className="text-slate-900 font-bold text-xs">Heure de forte affluence</div>
                          <div className="text-slate-400 text-[9px] uppercase font-bold">Séances Pratiques</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">08h30 - 10h30</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-white border border-slate-200/50 rounded-xl">
                      <div className="flex items-center gap-2.5">
                        <Package className="w-5 h-5 text-indigo-600" />
                        <div>
                          <div className="text-slate-900 font-bold text-xs">Durée cumulée d'exploitation</div>
                          <div className="text-slate-400 text-[9px] uppercase font-bold text-slate-400">Scolaire Mensuel</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">124 Heures TP</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-white border border-slate-200/50 rounded-xl">
                      <div className="flex items-center gap-2.5">
                        <UserCheck className="w-5 h-5 text-indigo-600" />
                        <div>
                          <div className="text-slate-900 font-bold text-xs">Taux d'accès validés SGH</div>
                          <div className="text-slate-400 text-[9px] uppercase font-bold">Conformité Sécurité</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">94.2% Conforme</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-2xl">
              <h3 className="text-indigo-900 font-bold text-xs uppercase flex items-center gap-2">
                <Wrench className="w-4 h-4 text-indigo-600 animate-bounce" /> Synthèse d'Amélioration Décisionnelle
              </h3>
              <p className="text-indigo-800 text-xs font-medium mt-1 leading-relaxed">
                Recommandation Académique : Les stocks de <b>L'Éthanol</b> sont optimaux, tandis que le <b>Dichlorométhane</b> et l'<b>Acide Sulfurique</b> requièrent des ajustements planifiés avant la prochaine session expérimentale de chimie organique de 2ème Bac. Le haut niveau de réussite aux quiz préparatoires démontre une excellente appropriation des consignes SGH par les élèves.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
