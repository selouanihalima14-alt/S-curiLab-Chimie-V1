import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, FileText, Info, Shield, AlertCircle, QrCode, CheckCircle2, XCircle, RefreshCw, Trophy, ChevronRight, Atom, Archive, Download, Plus } from 'lucide-react';
import { SDS_DATA, SDSMaterial, SAFETY_PICTOGRAMS, QuizQuestion } from '../constants';
import { LocalQRCode } from './LocalQRCode';

// Helper to shuffle quiz options and correct answer
const shuffleQuestionOptions = (q: QuizQuestion): QuizQuestion => {
  const correctAnswerStr = q.options[q.correctAnswer];
  const shuffledOptions = [...q.options];
  for (let i = shuffledOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
  }
  const newCorrectIndex = shuffledOptions.indexOf(correctAnswerStr);
  return {
    ...q,
    options: shuffledOptions,
    correctAnswer: newCorrectIndex === -1 ? 0 : newCorrectIndex
  };
};

// Generate an exact 10-question educational safety quiz for any SDSMaterial (standard or newly added)
const generateProductQuiz = (material: SDSMaterial): QuizQuestion[] => {
  const name = material.name;
  const fullName = material.fullName || material.name;
  const formula = material.formula || 'N/A';
  const molarMass = material.molarMass || 'N/A';
  const signalWord = material.signalWord || 'Attention';
  const hStatements = material.hStatements && material.hStatements.length > 0
    ? material.hStatements
    : ['H315 : Provoque une irritation cutanée'];
  const pStatements = material.pStatements && material.pStatements.length > 0
    ? material.pStatements
    : ['P280 : Porter des gants de protection/des vêtements de protection'];
  const ppeRequired = material.ppeRequired && material.ppeRequired.length > 0
    ? material.ppeRequired
    : ['Blouse de laboratoire', 'Lunettes de protection de sécurité'];
  const firstAid = material.firstAid && material.firstAid.length > 0
    ? material.firstAid
    : ['Rincer immédiatement à l\'eau claire en cas de contact accidentel'];
  const storage = material.storageConditions || 'Conserver dans un endroit frais et sec dans son emballage d\'origine.';
  const state = material.physicalState || 'Liquide ou solide de laboratoire';
  const appearance = material.appearance || 'Incolore ou blanc';
  const ph = material.ph || '';

  // Find GHS pictograms for the material
  const picIds = material.safetyPictograms || [];
  const activePics = picIds.map(id => SAFETY_PICTOGRAMS.find(p => p.id === id)).filter(Boolean);

  const rawQuestions: QuizQuestion[] = [];

  // ==========================================
  // QUESTIONS 1 & 2: PICTOGRAMMES & SYMBOLES
  // ==========================================
  
  // Question 1: GHS Pictogram 1
  if (activePics[0]) {
    const pic1 = activePics[0];
    const otherPics = SAFETY_PICTOGRAMS.filter(p => p.id !== pic1.id);
    const shuffledOthers = [...otherPics].sort(() => 0.5 - Math.random());
    const alt1 = shuffledOthers[0] || SAFETY_PICTOGRAMS[0];
    const alt2 = shuffledOthers[1] || SAFETY_PICTOGRAMS[1];

    rawQuestions.push({
      question: `Le flacon de "${name}" porte le pictogramme de danger SGH illustré ci-dessous. Quelle est sa signification réglementaire ?`,
      options: [
        `Le danger "${pic1.name}" : ${pic1.description}`,
        `Le danger "${alt1.name}" : ${alt1.description}`,
        `Le danger "${alt2.name}" : ${alt2.description}`
      ],
      correctAnswer: 0,
      pictogramUrl: pic1.image,
      pictogramName: pic1.name
    });
  } else {
    rawQuestions.push({
      question: `L'absence de pictogramme de danger SGH spécifique sur le flacon de "${name}" signifie :`,
      options: [
        `Que les dangers intrinsèques de cette substance sont minimes si l'on applique les règles ordinaires d'hygiène de laboratoire.`,
        `Que le produit est classé secret militaire et qu'aucune précaution n'est nécessaire.`,
        `Que son étiquette a été imprimée par erreur sans logos informatifs.`
      ],
      correctAnswer: 0
    });
  }

  // Question 2: GHS Pictogram 2 or Signal Word
  if (activePics[1]) {
    const pic2 = activePics[1];
    const otherPics = SAFETY_PICTOGRAMS.filter(p => p.id !== pic2.id);
    const shuffledOthers = [...otherPics].sort(() => 0.5 - Math.random());
    const alt1 = shuffledOthers[0] || SAFETY_PICTOGRAMS[0];
    const alt2 = shuffledOthers[1] || SAFETY_PICTOGRAMS[1];

    rawQuestions.push({
      question: `Ce deuxième pictogramme ci-dessous figure également sur le flacon de "${name}". Quel risque signale-t-il ?`,
      options: [
        `Le danger "${pic2.name}" : ${pic2.description}`,
        `Le danger "${alt1.name}" : ${alt1.description}`,
        `Le danger "${alt2.name}" : ${alt2.description}`
      ],
      correctAnswer: 0,
      pictogramUrl: pic2.image,
      pictogramName: pic2.name
    });
  } else {
    rawQuestions.push({
      question: `L'étiquette de "${name}" affiche la mention d'avertissement réglementaire "${signalWord}". Quelle est la portée de cette indication ?`,
      options: [
        signalWord === 'Danger'
          ? `Elle désigne les scénarios de risques les plus sévères (par ex. corrosif ou hautement toxique) exigeant des consignes strictes.`
          : `Elle signale un niveau de risque modéré nécessitant d'être vigilant et d'appliquer de bonnes pratiques de laboratoire.`,
        `C'est une mention de garantie indiquant la pureté à 100% du produit d'origine.`,
        `Elle indique uniquement que le produit doit être éliminé dans la poubelle papier après le TP.`
      ],
      correctAnswer: 0
    });
  }

  // ==========================================
  // QUESTIONS 3, 4 & 5: PHRASES DE DANGER (H)
  // ==========================================

  // Question 3: First Hazard statement (Phrase H)
  rawQuestions.push({
    question: `La fiche SDS du produit "${name}" répertorie la mention de danger "${hStatements[0]}". Ciblez sa signification exacte :`,
    options: [
      `Elle indique un danger physique ou sanitaire inhérent au produit : "${hStatements[0].split(':').slice(1).join(':').trim() || hStatements[0]}".`,
      `Elle certifie un niveau de non-toxicité par évaporation lente au contact de l'air ambiant.`,
      `C'est un code de tarification et d'importation douanière propre aux produits chimiques de l'Union.`
    ],
    correctAnswer: 0
  });

  // Question 4: Second Hazard statement (Phrase H) or general properties
  const h2 = hStatements[1] || hStatements[0];
  rawQuestions.push({
    question: `L'icône réglementaire est associée à la phrase de danger : "${h2}". En séance de TP, quelle menace cela décrit-il ?`,
    options: [
      `Le risque pratique de : "${h2.split(':').slice(1).join(':').trim() || h2}".`,
      `Une baisse éventuelle du rendement moléculaire ou de la conductivité de la solution en fin de réaction.`,
      `Une modification neutre de la température de stockage ou simplement une odeur fruitée légère.`
    ],
    correctAnswer: 0
  });

  // Question 5: Physiological or physical impact
  let physiologyCorrect = `Des lésions corporelles ou des risques d'irritations, d'incendies ou d'agressions cutanées/oculaires irréversibles selon l'étiquetage.`;
  if (material.id === 'hcl' || material.id === 'h2so4' || material.id === 'naoh') {
    physiologyCorrect = `Provoquer des brûlures chimiques profondes et des lésions destructrices graves immédiates de la peau et des yeux en cas de contact.`;
  } else if (material.safetyPictograms.includes('ghs02')) {
    physiologyCorrect = `Prendre feu instantanément en présence d'une étincelle, d'une flamme ou d'une source de chaleur dans la pièce.`;
  }
  rawQuestions.push({
    question: `En faisant la synthèse de toutes les phrases H (danger) de "${name}", à quel risque principal l'étudiant s'expose-t-il lors de la manipulation ?`,
    options: [
      physiologyCorrect,
      `Uniquement à une coloration inoffensive mais tenace de la peau des doigts pendant plusieurs heures.`,
      `Aucun risque notable, les solutions de lycée étant entièrement désactivées et inoffensives avant l'usage.`
    ],
    correctAnswer: 0
  });

  // ==========================================
  // QUESTIONS 6, 7 & 8: PRÉCAUTIONS (P) & EPI
  // ==========================================

  // Question 6: First Precaution statement (Phrase P)
  rawQuestions.push({
    question: `La fiche SDS exige le conseil de prudence obligatoire "${pStatements[0]}". Quel geste pratique cela vous impose-t-il ?`,
    options: [
      `La précaution d'action suivante : "${pStatements[0].split(':').slice(1).join(':').trim() || pStatements[0]}".`,
      `Ajouter de l'eau froide directement sur l'échantillon liquide pour l'activer avant de l'injecter.`,
      `Laisser le flacon de produit ouvert sur la paillasse tout au long de la séance pour qu'il s'aère.`
    ],
    correctAnswer: 0
  });

  // Question 7: Second Precaution statement (Phrase P) or alternative
  const p2 = pStatements[1] || pStatements[0];
  rawQuestions.push({
    question: `Le conseil de prudence "${p2}" est également stipulé réglementairement. Comment l'étudiant doit-il agir ?`,
    options: [
      `En appliquant scrupuleusement la consigne pratique : "${p2.split(':').slice(1).join(':').trim() || p2}".`,
      `En chauffant la substance au rouge avec un bec bunsen ouvert pour détruire les impuretés chimiques.`,
      `En jetant sans rinçage le tube d'essai usagé directement dans la poubelle ménagère de la classe.`
    ],
    correctAnswer: 0
  });

  // Question 8: EPI Required (PPE)
  rawQuestions.push({
    question: `Afin de se conformer aux consignes des phrases P pour "${name}", quels Équipements de Protection Individuelle (EPI) sont strictement requis ?`,
    options: [
      `Les équipements exigés par la SDS du produit : ${material.ppeRequired ? material.ppeRequired.join(', ') : ppeRequired.join(', ')}.`,
      `Une tenue vestimentaire habituelle sans lunettes ni blouse suffit si l'on opère de manière lente et prudente.`,
      `Uniquement un masque à poussières jetable en cellulose, sans gants étanches ni lunettes enveloppantes.`
    ],
    correctAnswer: 0
  });

  // ==========================================
  // QUESTION 9: CONDITIONS DE STOCKAGE
  // ==========================================

  // Question 9: Proper Storage Conditions
  rawQuestions.push({
    question: `Quelles consignes strictes de stockage et de conservation la fiche de sécurité (SDS) impose-t-elle pour le produit "${name}" ?`,
    options: [
      `Consigne de stockage officielle : "${storage}"`,
      `Disposer les flacons débouchés ou mal obturés à côté direct d'autres acides forts ou de matières hautement comburantes.`,
      `Stocker la solution à la chaleur ou en contact d'emballages en verre fragiles ou ouverts au soleil direct.`
    ],
    correctAnswer: 0
  });

  // ==========================================
  // QUESTION 10: PREMIERS SECOURS (FIRST AID)
  // ==========================================

  // Question 10: In case of Emergency / First Aid
  rawQuestions.push({
    question: `Si un accident ou contact corporel se produit avec "${name}" (sur la peau, les yeux ou par ingestion accidentelle), que faire en urgence ?`,
    options: [
      `Le protocole d'urgence : "${firstAid.join(' | ')}" et appeler immédiatement les secours ou informer l'enseignant.`,
      `Se précipiter pour verser un produit chimique fortement acide ou basique inverse pour tenter une réaction de neutralisation cutanée.`,
      `Ne rien faire et attendre en observant l'évolution des symptômes cutanés pendant une demi-heure de TP.`
    ],
    correctAnswer: 0
  });

  // Ensure precisely 10 questions (just in case)
  const finalQuestions = rawQuestions.slice(0, 10);

  // Shuffle option order for each constructed question to prevent "A" always being the correct answer!
  return finalQuestions.map(shuffleQuestionOptions);
};

export const SDSDatabase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<SDSMaterial | null>(null);
  
  // Stateful materials list initializing from SDS_DATA enabling custom chemical products addition
  const [materialsList, setMaterialsList] = useState<SDSMaterial[]>(SDS_DATA);
  
  // Custom generated 10-questions dynamic quiz state
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [isFromQR, setIsFromQR] = useState(false);

  // Modal to add custom chemical products state
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);

  // Custom Chemical Form State
  const [newName, setNewName] = useState('');
  const [newFormula, setNewFormula] = useState('');
  const [newPhysicalState, setNewPhysicalState] = useState('');
  const [newMolarMass, setNewMolarMass] = useState('');
  const [newAppearance, setNewAppearance] = useState('');
  const [newStorageConditions, setNewStorageConditions] = useState('');
  const [newSignalWord, setNewSignalWord] = useState<'Danger' | 'Attention' | 'Aucun'>('Attention');
  const [newPh, setNewPh] = useState('');
  const [newDensity, setNewDensity] = useState('');
  const [newBoilingPoint, setNewBoilingPoint] = useState('');
  const [newMeltingPoint, setNewMeltingPoint] = useState('');
  
  // GHS Pictograms selection (list of ids)
  const [selectedGHS, setSelectedGHS] = useState<string[]>([]);
  
  // Lists in custom material with string helpers
  const [hText, setHText] = useState('');
  const [pText, setPText] = useState('');
  const [ppeText, setPpeText] = useState('');
  const [firstAidText, setFirstAidText] = useState('');

  // Handle URL parameters for direct SDS access
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const sdsId = params.get('sds');
      if (sdsId) {
        const material = materialsList.find(m => m.id === sdsId);
        if (material) {
          setSelectedMaterial(material);
          setIsFromQR(true);
        }
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [materialsList]);

  const [downloadUrl, setDownloadUrl] = useState<string>('');

  const downloadQRCode = () => {
    if (!downloadUrl || !selectedMaterial) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${selectedMaterial.id}_qr_code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredMaterials = materialsList.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.formula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartQuiz = () => {
    if (!selectedMaterial) return;
    
    // Force usage of the advanced, image-supported SDS-specific quiz generator
    const questionsList = generateProductQuiz(selectedMaterial);
    
    setQuizQuestions(questionsList);
    setIsQuizActive(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setUserAnswer(null);
  };

  const handleAnswer = (index: number) => {
    if (userAnswer !== null || quizQuestions.length === 0) return;
    
    setUserAnswer(index);
    if (index === quizQuestions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setUserAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setIsQuizActive(false);
    setUserAnswer(null);
    setQuizQuestions([]);
  };

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const generatedId = `custom_${Date.now()}`;
    const ppeList = ppeText.split(',').map(s => s.trim()).filter(Boolean);
    const hList = hText.split('\n').map(s => s.trim()).filter(Boolean);
    const pList = pText.split('\n').map(s => s.trim()).filter(Boolean);
    const firstAidList = firstAidText.split('\n').map(s => s.trim()).filter(Boolean);

    const newMaterial: SDSMaterial = {
      id: generatedId,
      name: newName,
      fullName: newName + (newFormula ? ` (${newFormula})` : ''),
      formula: newFormula || 'N/A',
      molarMass: newMolarMass || 'N/A',
      physicalState: newPhysicalState || 'Liquide',
      appearance: newAppearance || 'Incolore',
      storageConditions: newStorageConditions || 'Conserver dans un endroit frais et sec dans son flacon d\'origine.',
      safetyPictograms: selectedGHS,
      signalWord: newSignalWord,
      hStatements: hList.length > 0 ? hList : ['H302 : Nocif en cas d\'ingestion'],
      pStatements: pList.length > 0 ? pList : ['P280 : Porter des gants/des lunettes de protection'],
      healthHazards: [],
      ppeRequired: ppeList.length > 0 ? ppeList : ['Blouse', 'Lunettes'],
      firstAid: firstAidList.length > 0 ? firstAidList : ['Rincer abondamment à l\'eau claire en cas de contact accidentel'],
      qrCodeUrl: '',
      quiz: [], // will be dynamically generated as exactly 10 questions anyway
      density: newDensity || undefined,
      ph: newPh || undefined,
      boilingPoint: newBoilingPoint || undefined,
      meltingPoint: newMeltingPoint || undefined
    };

    setMaterialsList(prev => [newMaterial, ...prev]);
    setSelectedMaterial(newMaterial);
    setIsQuizActive(false);
    setShowAddMaterialModal(false);

    // Reset Form
    setNewName('');
    setNewFormula('');
    setNewPhysicalState('');
    setNewMolarMass('');
    setNewAppearance('');
    setNewStorageConditions('');
    setNewSignalWord('Attention');
    setSelectedGHS([]);
    setHText('');
    setPText('');
    setPpeText('');
    setFirstAidText('');
    setNewPh('');
    setNewDensity('');
    setNewBoilingPoint('');
    setNewMeltingPoint('');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 bg-indigo-900 p-8 sm:p-14 rounded-[40px] shadow-2xl relative overflow-hidden mb-12">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
        <h2 className="text-4xl sm:text-7xl font-black text-white tracking-widest uppercase italic">Base SDS</h2>
        <p className="text-xl sm:text-3xl text-indigo-100 max-w-2xl leading-tight font-black italic">
          Scannez les QR Codes pour accéder aux fiches de sécurité.
        </p>
        
        <div className="relative max-w-2xl group mt-8">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 text-indigo-400 group-focus-within:text-white transition-all scale-110" />
          <input
            type="text"
            placeholder="NOM DU PRODUIT..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-8 py-6 sm:py-8 bg-white/10 border-4 border-white/20 rounded-[32px] text-xl sm:text-3xl focus:ring-8 focus:ring-white/10 focus:border-white focus:bg-white/20 transition-all outline-none shadow-2xl font-black text-white placeholder:text-white/30 uppercase tracking-widest backdrop-blur-md"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-b border-slate-100">
        <h3 className="text-xl font-black uppercase text-indigo-950 tracking-wider flex items-center gap-2">
          <Atom className="w-6 h-6 text-indigo-600 animate-spin-slow" /> Produits de la banque ({filteredMaterials.length})
        </h3>
        <button
          onClick={() => setShowAddMaterialModal(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-750 text-white rounded-2xl text-xs font-black uppercase tracking-widest cursor-pointer shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="w-4 h-4 text-white" />
          Ajouter un produit personnalisé
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List side - Hidden on mobile when item selected */}
        <div className={`lg:col-span-1 space-y-3 ${selectedMaterial ? 'hidden lg:block' : 'block'}`}>
          {filteredMaterials.map(m => (
            <motion.div
              key={m.id}
              whileHover={{ x: 5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedMaterial(m);
                setIsQuizActive(false);
                setIsFromQR(false);
              }}
              className={`p-5 rounded-3xl cursor-pointer transition-all border-2 relative overflow-hidden group ${
                selectedMaterial?.id === m.id 
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl shadow-indigo-200' 
                  : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:shadow-lg'
              }`}
            >
              {selectedMaterial?.id === m.id && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent pointer-events-none" 
                />
              )}
              <div className="flex items-center justify-between mb-3 relative z-10">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg ${
                  selectedMaterial?.id === m.id ? 'bg-white/30 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {m.formula}
                </span>
                <div className="flex gap-1">
                  {m.safetyPictograms.slice(0, 3).map((pic, i) => (
                    <div key={i} className={`w-5 h-5 rounded-md p-0.5 shadow-sm ${selectedMaterial?.id === m.id ? 'bg-white ring-1 ring-white/50' : 'bg-white ring-1 ring-slate-200'}`}>
                      <img 
                        src={SAFETY_PICTOGRAMS.find(p => p.id === pic)?.image} 
                        alt="picto" 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                  ))}
                </div>
              </div>
              <h4 className="font-bold text-base leading-tight relative z-10 mb-2 truncate pr-4">{m.name}</h4>
              <div className="flex items-center justify-between relative z-10">
                <span className={`text-[9px] font-black uppercase tracking-tighter ${
                  selectedMaterial?.id === m.id ? 'text-indigo-100' : 'text-slate-500'
                }`}>
                  {m.signalWord}
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                  selectedMaterial?.id === m.id ? 'text-white' : 'text-indigo-400'
                }`} />
              </div>
            </motion.div>
          ))}
          {filteredMaterials.length === 0 && (
            <div className="p-8 text-center text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
              Aucun résultat trouvé
            </div>
          )}
        </div>

        {/* Details side */}
        <div className={`lg:col-span-2 ${selectedMaterial ? 'block' : 'hidden lg:block'}`}>
          {selectedMaterial ? (
            <AnimatePresence mode="wait">
              {isQuizActive ? (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden min-h-[500px] flex flex-col"
                >
                  <div className="p-8 bg-indigo-600 text-white border-b border-indigo-700 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest opacity-80 mb-1">Test de sécurité obligatoire (10 questions)</p>
                      <h3 className="text-xl font-bold">{selectedMaterial.name}</h3>
                    </div>
                    <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest font-mono">
                      Question {currentQuestionIndex + 1} / {quizQuestions.length}
                    </div>
                  </div>

                  {!showResult ? (
                    <div className="flex-1 flex flex-col p-8 md:p-12 bg-slate-50">
                      <div className="max-w-xl mx-auto w-full flex-1 flex flex-col justify-center">
                        {quizQuestions[currentQuestionIndex]?.pictogramUrl && (
                          <div className="flex flex-col items-center mb-6">
                            <div className="w-24 h-24 bg-white border-4 border-amber-400 p-3 rounded-2xl shadow-md transform scale-105">
                              <img 
                                src={quizQuestions[currentQuestionIndex].pictogramUrl} 
                                alt={quizQuestions[currentQuestionIndex].pictogramName || "Pictogramme"} 
                                className="w-full h-full object-contain" 
                              />
                            </div>
                            <span className="text-[9px] text-amber-800 font-extrabold uppercase mt-1 px-3 py-0.5 rounded-full bg-amber-100 border border-amber-200">
                              Que signifie ce pictogramme ?
                            </span>
                          </div>
                        )}
                        <p className="text-xl font-serif text-slate-850 mb-8 leading-relaxed italic text-center">
                          "{quizQuestions[currentQuestionIndex]?.question}"
                        </p>
                        <div className="grid gap-3">
                          {quizQuestions[currentQuestionIndex]?.options.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleAnswer(idx)}
                              disabled={userAnswer !== null}
                              className={`w-full p-4.5 rounded-xl text-left text-xs transition-all flex items-center justify-between border-2 ${
                                userAnswer === null
                                  ? 'bg-white hover:bg-indigo-50 hover:border-indigo-600 border-slate-100 shadow-sm'
                                  : idx === quizQuestions[currentQuestionIndex].correctAnswer
                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-inner'
                                    : userAnswer === idx
                                      ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-inner'
                                      : 'bg-slate-50 border-slate-100 opacity-40'
                              }`}
                            >
                              <span className="font-bold">{option}</span>
                              {userAnswer !== null && idx === quizQuestions[currentQuestionIndex].correctAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 ml-4" />}
                              {userAnswer === idx && idx !== quizQuestions[currentQuestionIndex].correctAnswer && <XCircle className="w-4 h-4 text-rose-500 shrink-0 ml-4" />}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-8">
                        <button onClick={resetQuiz} className="text-xs font-bold text-slate-400 hover:text-rose-600 transition-colors uppercase tracking-widest">Abandonner le test</button>
                        <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-indigo-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-8 bg-white">
                      <div className={`w-28 h-28 rounded-full flex items-center justify-center shadow-2xl ${
                        score >= quizQuestions.length / 2 ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}>
                        <Trophy className="w-14 h-14" />
                      </div>
                      <div>
                        <h3 className="text-4xl font-bold text-slate-900 leading-tight">Test Terminé !</h3>
                        <div className="text-7xl font-black text-indigo-600 my-4">{score} / {quizQuestions.length}</div>
                        <p className="text-slate-500 max-w-sm mx-auto leading-relaxed font-medium">
                          {score === quizQuestions.length 
                            ? "Félicitations ! Vous maîtrisez parfaitement la sécurité de ce produit." 
                            : score >= quizQuestions.length * 0.7
                              ? "Bon score. Soyez tout de même vigilant(e) lors de la manipulation."
                              : "Attention ! Nous vous conseillons de relire attentivement la fiche de sécurité avant de manipuler."}
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={handleStartQuiz} className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">Recommencer</button>
                        <button onClick={resetQuiz} className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all">Retour à la fiche</button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-indigo-100/50 overflow-hidden"
                >
                  {/* Back button for mobile/QR */}
                  <div className="p-4 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between">
                    <button 
                      onClick={() => {
                        setSelectedMaterial(null);
                        setIsFromQR(false);
                      }}
                      className="flex items-center gap-2 text-indigo-400 font-bold text-[10px] uppercase tracking-widest hover:text-white transition-colors"
                    >
                      <RefreshCw className="w-3 h-3 rotate-180" />
                      Retour à la banque SDS
                    </button>
                    {isFromQR && (
                      <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest border border-indigo-500/30">
                        Accès QR Code
                      </span>
                    )}
                  </div>

                  <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 bg-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600"></div>
                    {selectedMaterial.signalWord === 'Danger' && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    )}
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">{selectedMaterial.fullName || selectedMaterial.name}</h3>
                      <p className="text-indigo-600 font-mono text-sm mt-1 flex items-center gap-2">
                        <Atom className="w-4 h-4 text-indigo-500" /> {selectedMaterial.formula}
                      </p>
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-2 relative z-10">
                      <div className={`px-6 py-2 rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-sm border-2 ${
                        selectedMaterial.signalWord === 'Danger' 
                          ? 'bg-rose-50 text-rose-600 border-rose-200' 
                          : 'bg-amber-50 text-amber-600 border-amber-200'
                      }`}>
                        {selectedMaterial.signalWord}
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 italic">Fiche Technique de Sécurité</p>
                    </div>
                  </div>

                  <div className="p-10 space-y-12 bg-white">
                    {/* Header: Pictograms & QR Reference */}
                    <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
                      <div className="flex flex-wrap justify-center md:justify-start gap-6 flex-1">
                        {selectedMaterial.safetyPictograms.map(picId => {
                          const pic = SAFETY_PICTOGRAMS.find(p => p.id === picId);
                          return pic ? (
                            <div key={pic.id} className="group relative">
                              <div className="w-24 h-24 bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex items-center justify-center hover:border-indigo-400 hover:shadow-lg transition-all transform hover:-translate-y-1">
                                <img src={pic.image} alt={pic.name} className="w-full h-full object-contain" />
                              </div>
                              <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded-lg font-black border-2 border-white shadow-md">
                                {pic.code}
                              </div>
                              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-3 py-1.5 bg-slate-900 text-white text-[9px] rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-20 font-bold uppercase tracking-widest shadow-xl">
                                {pic.name}
                              </div>
                            </div>
                          ) : null;
                        })}
                      </div>

                      <div className="flex-shrink-0 flex flex-col items-center p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-inner w-full sm:w-48">
                        {selectedMaterial && (
                          <div className="w-28 h-28 flex items-center justify-center bg-white rounded-2xl p-2 border border-slate-100 shadow-sm">
                            <LocalQRCode 
                              text={`${window.location.protocol}//${window.location.host}${window.location.pathname}?sds=${selectedMaterial.id}`}
                              alt="ID QR" 
                              className="w-24 h-24 object-contain"
                              onDataUrlGenerated={setDownloadUrl}
                            />
                          </div>
                        )}
                        <span className="text-[9px] text-slate-400 mt-2 font-bold uppercase tracking-tighter text-center leading-tight mb-4">
                          Référence QR Active<br/>Fiche de Laboratoire
                        </span>
                        <button
                          onClick={downloadQRCode}
                          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:border-indigo-500 hover:text-indigo-600 hover:shadow-sm transition-all cursor-pointer"
                          disabled={!downloadUrl}
                        >
                          <Download className="w-3.5 h-3.5" />
                          Télécharger QR
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* Section: Physical Properties */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                            <Info className="w-4 h-4" />
                          </div>
                          <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500">Données Physico-chimiques</h4>
                        </div>
                        
                        <div className="overflow-hidden border border-slate-100 rounded-2xl shadow-sm bg-white">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-4 py-3 text-xs font-black text-slate-500 uppercase tracking-wider">Propriété</th>
                                <th className="px-4 py-3 text-xs font-black text-slate-500 uppercase tracking-wider text-right">Valeur</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {[
                                { label: 'Masse Molaire', value: selectedMaterial.molarMass, color: 'text-slate-900 font-semibold' },
                                { label: 'État Physique', value: selectedMaterial.physicalState || 'N/A', color: 'text-slate-900' },
                                { label: 'Point de Fusion', value: selectedMaterial.meltingPoint || 'N/A', color: 'text-slate-900' },
                                { label: 'Point d\'ébullition', value: selectedMaterial.boilingPoint || 'N/A', color: 'text-indigo-600' },
                                { label: 'Densité', value: selectedMaterial.density || 'N/A', color: 'text-indigo-600' },
                                { label: 'Apparence', value: selectedMaterial.appearance, color: 'text-slate-700 italic' },
                                ...(selectedMaterial.ph ? [{ label: 'Potentiel Hydrogène (pH)', value: selectedMaterial.ph, color: 'text-rose-600 font-bold bg-rose-50/10' }] : []),
                              ].map((prop, idx) => (
                                <tr key={idx} className={`hover:bg-slate-50/50 transition-colors ${prop.label.includes('pH') ? 'bg-rose-50/10' : ''}`}>
                                  <td className="px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-tight">{prop.label}</td>
                                  <td className={`px-4 py-3.5 text-sm font-black text-right ${prop.color}`}>{prop.value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {selectedMaterial.storageConditions && (
                          <div className="p-5 bg-amber-50/70 rounded-3xl border border-amber-200/60 shadow-sm mt-6">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                                <Archive className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-amber-800">Conditions de Stockage</span>
                            </div>
                            <p className="text-xs text-amber-950 font-bold leading-relaxed">
                              {selectedMaterial.storageConditions}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Section: H & P Statements */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                            <Shield className="w-4 h-4" />
                          </div>
                          <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500">Mentions de Sécurité (GHS)</h4>
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-3">
                            <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest flex items-center gap-2">
                              <XCircle className="w-3 h-3" /> Mentions de Danger (H)
                            </p>
                            <div className="space-y-2">
                              {selectedMaterial.hStatements.map((h, i) => (
                                <div key={i} className="p-4 bg-rose-50/50 border-l-4 border-rose-500 rounded-r-2xl text-xs text-rose-900 font-bold leading-relaxed">
                                  {h}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                              <CheckCircle2 className="w-3 h-3" /> Conseils de Prudence (P)
                            </p>
                            <div className="space-y-2">
                              {selectedMaterial.pStatements?.map((p, i) => (
                                <div key={i} className="p-4 bg-indigo-50/50 border-l-4 border-indigo-500 rounded-r-2xl text-xs text-indigo-900 font-bold leading-relaxed">
                                  {p}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12 border-t border-slate-100">
                      {/* EPI Section */}
                      <div className="space-y-6">
                        <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 flex items-center gap-2">
                          <Shield className="w-4 h-4" /> Équipements Requis (EPI)
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {selectedMaterial.ppeRequired?.map((ppe, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-slate-900 text-white rounded-2xl shadow-lg shadow-slate-200">
                              <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                              <span className="text-[10px] font-black uppercase tracking-widest">{ppe}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* First Aid Section */}
                      <div className="lg:col-span-2 space-y-6">
                        <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" /> Protocole Premiers Secours
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedMaterial.firstAid.map((step, i) => (
                            <div key={i} className="flex gap-4 items-start p-5 bg-emerald-50 border border-emerald-100 rounded-3xl group hover:bg-emerald-100 transition-colors">
                              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                                {i+1}
                              </div>
                              <p className="text-xs text-emerald-900 font-bold leading-relaxed group-hover:text-emerald-950 transition-colors">
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Quiz Invitation */}
                    {selectedMaterial && (
                      <div className="pt-12">
                        <button
                          onClick={handleStartQuiz}
                          className="w-full relative overflow-hidden group p-10 bg-indigo-600 text-white rounded-[3rem] shadow-2xl shadow-indigo-100 hover:shadow-indigo-200 transition-all active:scale-[0.98]"
                        >
                          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700"></div>
                          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left">
                              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-4">Évaluation de Sécurité</p>
                              <h5 className="text-4xl font-black leading-tight tracking-tight">Valider vos connaissances<br/>avant la manipulation</h5>
                            </div>
                            <div className="flex flex-col items-center gap-4">
                              <div className="w-20 h-20 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform h-auto">
                                <Trophy className="w-10 h-10" />
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-widest bg-indigo-500/50 px-4 py-2 rounded-full border border-white/20">Commencer le Test</span>
                            </div>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <div className="h-full min-h-[600px] flex flex-col items-center justify-center p-12 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 text-slate-400 group">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <FileText className="w-10 h-10 opacity-30 group-hover:text-indigo-600 group-hover:opacity-100 transition-all" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight">Consulter une Fiche SDS</h3>
              <p className="text-sm mt-2 max-w-xs text-center opacity-70">Sélectionnez une substance chimique dans la liste latérale pour afficher ses dangers, protections et protocoles de sécurité.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

