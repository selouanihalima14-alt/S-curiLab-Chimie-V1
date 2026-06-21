import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FlaskConical, 
  Plus, 
  Trash2, 
  QrCode, 
  Printer, 
  Download, 
  ClipboardCheck, 
  Check, 
  Info, 
  Share2, 
  Settings2, 
  Sparkles, 
  ChevronRight,
  Search,
  Filter,
  CheckSquare,
  AlertTriangle,
  FileSignature,
  Calendar,
  Layers,
  MapPin,
  ClipboardList
} from 'lucide-react';
import { SDS_DATA, SAFETY_PICTOGRAMS, SDSMaterial, MINISTERE_LOGO } from '../constants';
import { LocalQRCode } from './LocalQRCode';

const STANDARD_GLASSWARE = [
  { id: 'g01', name: 'Burette graduée (25 mL)', category: 'Verrerie' },
  { id: 'g02', name: 'Erlenmeyer (100 mL)', category: 'Verrerie' },
  { id: 'g03', name: 'Erlenmeyer (250 mL)', category: 'Verrerie' },
  { id: 'g04', name: 'Pipette jaugée (10 mL)', category: 'Verrerie' },
  { id: 'g05', name: 'Pipette jaugée (20 mL)', category: 'Verrerie' },
  { id: 'g06', name: 'Fiole jaugée (50 mL)', category: 'Verrerie' },
  { id: 'g07', name: 'Fiole jaugée (100 mL)', category: 'Verrerie' },
  { id: 'g08', name: 'Fiole jaugée (1000 mL)', category: 'Verrerie' },
  { id: 'g09', name: 'Éprouvette graduée (10 mL)', category: 'Verrerie' },
  { id: 'g10', name: 'Éprouvette graduée (100 mL)', category: 'Verrerie' },
  { id: 'g11', name: 'Bécher (50 mL)', category: 'Verrerie' },
  { id: 'g12', name: 'Bécher (100 mL)', category: 'Verrerie' },
  { id: 'g13', name: 'Bécher (250 mL)', category: 'Verrerie' },
  { id: 'g14', name: 'Tube à essai', category: 'Verrerie' },
  { id: 'g15', name: 'Ampoule à décanter (125 mL)', category: 'Verrerie' },
  { id: 'g16', name: 'Ballon bicol (250 mL)', category: 'Verrerie' },
  { id: 'g17', name: 'Verre de montre', category: 'Verrerie' },
];

const STANDARD_MEASURING_DEVICES = [
  { id: 'm01', name: 'pH-mètre étalonné', category: 'Appareils de Mesure' },
  { id: 'm02', name: 'Sonde thermométrique', category: 'Appareils de Mesure' },
  { id: 'm03', name: 'Conductimètre', category: 'Appareils de Mesure' },
  { id: 'm04', name: 'Balance analytique (2 décimales)', category: 'Appareils de Mesure' },
  { id: 'm05', name: 'Spectrophotomètre d\'absorption', category: 'Appareils de Mesure' },
  { id: 'm06', name: 'Chronomètre numérique', category: 'Appareils de Mesure' },
  { id: 'm07', name: 'Colorimètre', category: 'Appareils de Mesure' },
];

const STANDARD_TOOLS = [
  { id: 't01', name: 'Agitateur magnétique', category: 'Outils & Supports' },
  { id: 't02', name: 'Turbulent (barreau aimanté)', category: 'Outils & Supports' },
  { id: 't03', name: 'Support universel avec pinces', category: 'Outils & Supports' },
  { id: 't04', name: 'Chauffe-ballon électrique', category: 'Outils & Supports' },
  { id: 't05', name: 'Poire à pipeter (propipette)', category: 'Outils & Supports' },
  { id: 't06', name: 'Pissette d\'eau distillée', category: 'Outils & Supports' },
  { id: 't07', name: 'Spatule métallique inox', category: 'Outils & Supports' },
  { id: 't08', name: 'Pince en bois pour tubes', category: 'Outils & Supports' },
  { id: 't09', name: 'Étuve de séchage', category: 'Outils & Supports' },
  { id: 't10', name: 'Filtre büchner & fiole à vide', category: 'Outils & Supports' },
];

interface CustomReactant {
  name: string;
  formula: string;
  physicalState: string;
  ph: string;
  inflammability: string;
  toxicity: string;
  hzPictogramIds: string[];
}

export const SessionPackGenerator: React.FC = () => {
  // Session metadata
  const [sessionTitle, setSessionTitle] = useState('Préparation Séance Chimie - Titrage');
  const [teacherName, setTeacherName] = useState('Azzeddine Atibi');
  const [level, setLevel] = useState('1ère Bac');
  const [room, setRoom] = useState('Laboratoire 3');
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);

  // Selected chemicals from database
  const [selectedChemicalIds, setSelectedChemicalIds] = useState<string[]>(['hcl', 'naoh']);
  const [searchChemicalTerm, setSearchChemicalTerm] = useState('');

  // Custom added chemicals
  const [customReactants, setCustomReactants] = useState<CustomReactant[]>([]);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [newReactant, setNewReactant] = useState<CustomReactant>({
    name: '',
    formula: '',
    physicalState: 'Liquide',
    ph: '7',
    inflammability: 'Non inflammable',
    toxicity: 'Nocive à forte concentration',
    hzPictogramIds: []
  });

  // Selected materials
  const [selectedMaterialIds, setSelectedMaterialIds] = useState<string[]>(['g01', 'g02', 'g04', 't01', 't05', 't06']);
  const [customMaterials, setCustomMaterials] = useState<string[]>([]);
  const [newCustomMaterialText, setNewCustomMaterialText] = useState('');

  // Generated Pack Active state
  const [isPackGenerated, setIsPackGenerated] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  // Helper serialization for sharing state in URL
  const shareableUrl = useMemo(() => {
    const packObj = {
      t: sessionTitle,
      teach: teacherName,
      l: level,
      r: room,
      d: sessionDate,
      chems: selectedChemicalIds,
      custChems: customReactants,
      mats: selectedMaterialIds,
      custMats: customMaterials,
    };
    try {
      let b64 = btoa(encodeURIComponent(JSON.stringify(packObj)));
      // Convert to URL-safe Base64 to prevent '+' being parsed as ' ' and '/','=' creating issues
      b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      return `${window.location.origin}${window.location.pathname}?session_pack=${b64}`;
    } catch (e) {
      return window.location.href;
    }
  }, [sessionTitle, teacherName, level, room, sessionDate, selectedChemicalIds, customReactants, selectedMaterialIds, customMaterials]);

  const qrImageUrl = useMemo(() => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(shareableUrl)}`;
  }, [shareableUrl]);

  // Filter chemicals database
  const filteredChemicals = useMemo(() => {
    return SDS_DATA.filter(chem => 
      chem.name.toLowerCase().includes(searchChemicalTerm.toLowerCase()) ||
      chem.fullName.toLowerCase().includes(searchChemicalTerm.toLowerCase()) ||
      chem.formula.toLowerCase().includes(searchChemicalTerm.toLowerCase())
    );
  }, [searchChemicalTerm]);

  // Toggle chemicals from standard list
  const toggleChemical = (id: string) => {
    setSelectedChemicalIds(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  // Toggle materials
  const toggleMaterial = (id: string) => {
    setSelectedMaterialIds(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  // Custom materials handlers
  const handleAddCustomMaterial = () => {
    if (newCustomMaterialText.trim()) {
      setCustomMaterials(prev => [...prev, newCustomMaterialText.trim()]);
      setNewCustomMaterialText('');
    }
  };

  const handleRemoveCustomMaterial = (idx: number) => {
    setCustomMaterials(prev => prev.filter((_, i) => i !== idx));
  };

  // Custom reactant handlers
  const handleAddCustomReactant = () => {
    if (!newReactant.name.trim()) return;
    setCustomReactants(prev => [...prev, { ...newReactant }]);
    // Reset inputs
    setNewReactant({
      name: '',
      formula: '',
      physicalState: 'Liquide',
      ph: '7',
      inflammability: 'Non inflammable',
      toxicity: 'Nocive à forte concentration',
      hzPictogramIds: []
    });
    setShowCustomModal(false);
  };

  const handleTogglePictoForCustomReactant = (picId: string) => {
    setNewReactant(prev => {
      const alreadyHas = prev.hzPictogramIds.includes(picId);
      return {
        ...prev,
        hzPictogramIds: alreadyHas 
          ? prev.hzPictogramIds.filter(id => id !== picId)
          : [...prev.hzPictogramIds, picId]
      };
    });
  };

  const handleRemoveCustomReactant = (idx: number) => {
    setCustomReactants(prev => prev.filter((_, i) => i !== idx));
  };

  // Document formatting generator for plain-text export
  const handleCopyPlainTextReport = () => {
    const reactantsSelected = SDS_DATA.filter(chem => selectedChemicalIds.includes(chem.id));
    const allMaterials = [
      ...STANDARD_GLASSWARE.filter(m => selectedMaterialIds.includes(m.id)).map(m => m.name),
      ...STANDARD_MEASURING_DEVICES.filter(m => selectedMaterialIds.includes(m.id)).map(m => m.name),
      ...STANDARD_TOOLS.filter(m => selectedMaterialIds.includes(m.id)).map(m => m.name),
      ...customMaterials
    ];

    const text = `
=========================================
PACK DE SEANCE PEDAGOGIQUE - ACCÈS DIRECT SÉCURISÉ
=========================================
SÉANCE : ${sessionTitle.toUpperCase()}
ENSEIGNANT : ${teacherName}
NIVEAU : ${level} | SALLE : ${room}
DATE DE PREPARATION : ${sessionDate}
URL DE PARTAGE DIRECT : ${shareableUrl}

-----------------------------------------
1. LISTE DES REACTIFS & PROPRIETES PHYSICO-CHIMIQUES
-----------------------------------------
${reactantsSelected.map((r, i) => `
[${i + 1}] ${r.name} (${r.formula})
    - État physique : ${r.physicalState}
    - pH indicatif   : ${r.ph || 'N/A'}
    - Signalétique   : ${r.signalWord}
    - Toxicité / Risques : ${r.healthHazards.join(', ')}
    - Consignes de Stockage : ${r.storageConditions}
    - FDS Simplifiée : ${r.hStatements.join(' | ')}
    - EPI Requis : ${r.ppeRequired.join(', ')}
`).join('\n')}
${customReactants.map((r, i) => `
[C-${i + 1}] ${r.name} (${r.formula || 'Formule non renseignée'}) [Réactif Perso]
    - État physique : ${r.physicalState}
    - pH indicatif   : ${r.ph}
    - Inflammabilité : ${r.inflammability}
    - Toxicité / Risques : ${r.toxicity}
`).join('\n')}

-----------------------------------------
2. LISTE DU MATERIEL ET DE LA VERRERIE REQUISE
-----------------------------------------
${allMaterials.map((m, i) => `- [ ] ${m}`).join('\n')}

=========================================
Généré automatiquement par l'application Laboratoire d'Azzeddine Atibi.
Scannez le QR Code officiel de la séance pour charger la conformité.
=========================================
`;
    navigator.clipboard.writeText(text.trim());
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto py-4">
      {/* Introduction Badge banner */}
      <div className="bg-indigo-900 rounded-[32px] p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl print:hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-4 text-center md:text-left">
            <span className="bg-indigo-500/30 text-indigo-200 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-indigo-500/25 inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300 animate-pulse" /> Espace Préparateur de Classe
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase italic font-display">
              Générateur automatique de packs
            </h1>
            <p className="text-indigo-200 text-sm sm:text-base max-w-2xl leading-relaxed font-semibold">
              Sélectionnez vos réactifs et votre verrerie de laboratoire. L'application compile automatiquement une fiche de sécurité complète avec propriétés physico-chimiques, tableau de matériels, et produit un QR code unique pour votre séance.
            </p>
          </div>
          <div className="w-20 h-20 bg-white/10 rounded-3xl backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0 leading-none">
            <FlaskConical className="w-10 h-10 animate-bounce text-indigo-100" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Creator inputs */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-8 print:hidden">
          {/* Metadata Section */}
          <div className="bg-white rounded-[32px] border border-indigo-50 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-indigo-50 pb-4">
              <Settings2 className="w-5 h-5 text-indigo-650" />
              <h2 className="text-lg font-black text-slate-800 uppercase tracking-wider font-sans">
                1. Informations Générales
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <div className="space-y-2">
                <label className="text-slate-700">Titre de la Séance / TP</label>
                <input 
                  type="text" 
                  value={sessionTitle}
                  onChange={(e) => setSessionTitle(e.target.value)}
                  className="w-full text-slate-900 bg-slate-50 border-2 border-slate-100 focus:border-indigo-600 focus:bg-white p-3.5 rounded-2xl outline-none transition-all"
                  placeholder="Ex: Dosage de la concentration d'HCl..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-700">Nom de l'Enseignant</label>
                <input 
                  type="text" 
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="w-full text-slate-900 bg-slate-50 border-2 border-slate-100 focus:border-indigo-600 focus:bg-white p-3.5 rounded-2xl outline-none transition-all animate-none"
                  placeholder="Nom complet..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-700">Salles / Localisation</label>
                <input 
                  type="text" 
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full text-slate-900 bg-slate-50 border-2 border-slate-100 focus:border-indigo-600 focus:bg-white p-3.5 rounded-2xl outline-none transition-all"
                  placeholder="Ex: Laboratoire Physique 2..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-700">Date Prévue</label>
                <input 
                  type="date" 
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className="w-full text-slate-900 bg-slate-50 border-2 border-slate-100 focus:border-indigo-600 focus:bg-white p-3.5 rounded-2xl outline-none transition-all"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-slate-700">Niveau de la classe</label>
                <div className="flex flex-wrap gap-2 pt-1 font-bold">
                  {['Tronc Commun', '1ère Bac', '2ème Bac'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setLevel(lvl)}
                      className={`px-5 py-3 rounded-xl transition-all border text-xs uppercase ${
                        level === lvl 
                          ? 'bg-slate-900 border-slate-900 text-white shadow-md' 
                          : 'bg-slate-50 border-slate-250 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reactants picker */}
          <div className="bg-white rounded-[32px] border border-indigo-50 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-indigo-50 pb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-indigo-650" />
                <h2 className="text-lg font-black text-slate-800 uppercase tracking-wider font-sans">
                  2. Sélection des Réactifs Chimiques
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowCustomModal(true)}
                className="bg-amber-100 hover:bg-amber-200 text-amber-900 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" /> Ajouter un Réactif Perso
              </button>
            </div>

            {/* Selected items indicator bar */}
            <div className="bg-indigo-50/40 p-4 rounded-2xl border border-indigo-100 text-xs">
              <p className="font-bold text-slate-500 uppercase tracking-widest mb-2.5">
                Réactifs sélectionnés ({selectedChemicalIds.length + customReactants.length})
              </p>
              {selectedChemicalIds.length === 0 && customReactants.length === 0 ? (
                <p className="text-slate-400 font-semibold italic">Aucun réactif choisi pour cette session. Veuillez en sélectionner ci-dessous.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {SDS_DATA.filter(chem => selectedChemicalIds.includes(chem.id)).map(chem => (
                    <div key={chem.id} className="bg-white border border-indigo-100 rounded-lg p-2 flex items-center gap-2 pr-1.5 shadow-sm">
                      <span className="font-bold text-slate-800">{chem.name}</span>
                      <span className="text-[10px] bg-slate-100 text-indigo-600 px-1.5 py-0.5 rounded font-mono">{chem.formula}</span>
                      <button 
                        onClick={() => toggleChemical(chem.id)}
                        className="p-1 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded"
                        title="Retirer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {customReactants.map((chem, idx) => (
                    <div key={idx} className="bg-amber-55/80 border border-amber-200 rounded-lg p-2 flex items-center gap-2 pr-1.5 shadow-sm">
                      <span className="font-black text-amber-950">{chem.name}</span>
                      {chem.formula && <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono">{chem.formula}</span>}
                      <button 
                        onClick={() => handleRemoveCustomReactant(idx)}
                        className="p-1 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded"
                        title="Retirer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* List and search from database */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
                <input 
                  type="text"
                  placeholder="Rechercher des réactifs dans la Base de Données SDS..."
                  value={searchChemicalTerm}
                  onChange={(e) => setSearchChemicalTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-650 transition-all font-semibold"
                />
              </div>

              <div className="max-h-56 overflow-y-auto border border-slate-100 rounded-2xl divide-y divide-slate-50 select-none">
                {filteredChemicals.map(chem => {
                  const isSelected = selectedChemicalIds.includes(chem.id);
                  return (
                    <div 
                      key={chem.id}
                      onClick={() => toggleChemical(chem.id)}
                      className={`p-3.5 flex items-center justify-between text-xs cursor-pointer transition-colors ${
                        isSelected ? 'bg-indigo-50/50 hover:bg-indigo-50' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="space-y-1 pr-4">
                        <span className="font-bold text-slate-800 text-sm block">{chem.name}</span>
                        <div className="flex items-center gap-2 text-[10px]">
                          <span className="font-mono font-black text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{chem.formula}</span>
                          <span className="text-slate-500 font-semibold">{chem.physicalState}</span>
                          <span className="text-indigo-600 font-bold">pH: {chem.ph || 'N/A'}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-1.5 overflow-hidden">
                          {chem.safetyPictograms.map(picId => {
                            const found = SAFETY_PICTOGRAMS.find(p => p.id === picId);
                            return found ? (
                              <div key={picId} className="w-6 h-6 border-2 border-white rounded-md bg-white p-0.5 shadow-sm">
                                <img src={found.image} alt={found.name} className="w-full h-full object-contain" />
                              </div>
                            ) : null;
                          })}
                        </div>
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                          isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Equipment/Materials Selector */}
          <div className="bg-white rounded-[32px] border border-indigo-50 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-indigo-50 pb-4">
              <div className="flex items-center gap-3">
                <ClipboardList className="w-5 h-5 text-indigo-650" />
                <h2 className="text-lg font-black text-slate-800 uppercase tracking-wider font-sans">
                  3. Matériels, Verrerie et Appareillage
                </h2>
              </div>
            </div>

            {/* Quick pre-filled category grid switcher */}
            <div className="space-y-6">
              {/* Glassware */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">A. Verrerie Précise</h3>
                  <button 
                    type="button"
                    onClick={() => {
                      const allGlassIds = STANDARD_GLASSWARE.map(g => g.id);
                      const allSelected = allGlassIds.every(id => selectedMaterialIds.includes(id));
                      if (allSelected) {
                        setSelectedMaterialIds(prev => prev.filter(id => !allGlassIds.includes(id)));
                      } else {
                        setSelectedMaterialIds(prev => Array.from(new Set([...prev, ...allGlassIds])));
                      }
                    }}
                    className="text-[10px] text-indigo-600 hover:text-indigo-800 font-bold"
                  >
                    Tout basculer
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {STANDARD_GLASSWARE.map(item => {
                    const isSelected = selectedMaterialIds.includes(item.id);
                    return (
                      <div 
                        key={item.id}
                        onClick={() => toggleMaterial(item.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer select-none transition-all text-xs ${
                          isSelected 
                            ? 'border-indigo-600 bg-indigo-50/40 font-bold text-indigo-950' 
                            : 'border-slate-100 hover:border-slate-200 text-slate-700 bg-slate-50/50'
                        }`}
                      >
                        <span>{item.name}</span>
                        <div className={`w-4 border h-4 rounded flex items-center justify-center transition-all shrink-0 ${
                          isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3px]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Measuring and Tools */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">B. Appareils de Mesure</h3>
                  <div className="space-y-2">
                    {STANDARD_MEASURING_DEVICES.map(item => {
                      const isSelected = selectedMaterialIds.includes(item.id);
                      return (
                        <div 
                          key={item.id}
                          onClick={() => toggleMaterial(item.id)}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer select-none transition-all text-xs ${
                            isSelected 
                              ? 'border-indigo-600 bg-indigo-50/40 font-bold text-indigo-950' 
                              : 'border-slate-100 hover:border-slate-200 text-slate-700 bg-slate-50/50'
                          }`}
                        >
                          <span>{item.name}</span>
                          <div className={`w-4 border h-4 rounded flex items-center justify-center transition-all shrink-0 ${
                            isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3px]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">C. Supports & Outils</h3>
                  <div className="space-y-2">
                    {STANDARD_TOOLS.map(item => {
                      const isSelected = selectedMaterialIds.includes(item.id);
                      return (
                        <div 
                          key={item.id}
                          onClick={() => toggleMaterial(item.id)}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer select-none transition-all text-xs ${
                            isSelected 
                              ? 'border-indigo-600 bg-indigo-50/40 font-bold text-indigo-950' 
                              : 'border-slate-100 hover:border-slate-200 text-slate-700 bg-slate-50/50'
                          }`}
                        >
                          <span>{item.name}</span>
                          <div className={`w-4 border h-4 rounded flex items-center justify-center transition-all shrink-0 ${
                            isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3px]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Custom Materials Row */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">D. Autre Matériel Spécifique</h3>
                
                <div className="flex gap-2">
                  <input 
                    type="text"
                    placeholder="Ex: Éprouvettes en plastique jetables, centrifugeuse..."
                    value={newCustomMaterialText}
                    onChange={(e) => setNewCustomMaterialText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomMaterial(); } }}
                    className="flex-1 px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-650 transition-all font-semibold"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomMaterial}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all"
                  >
                    Ajouter
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {customMaterials.map((mat, idx) => (
                    <div key={idx} className="bg-slate-100 border border-slate-200 rounded-lg py-1 px-2.5 flex items-center gap-2 text-xs font-medium text-slate-700">
                      <span>{mat}</span>
                      <button 
                        onClick={() => handleRemoveCustomMaterial(idx)}
                        className="text-slate-400 hover:text-rose-600"
                        title="Retirer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setIsPackGenerated(true);
                // Scroll beautifully to the preview card on desktop
                setTimeout(() => {
                  const target = document.getElementById('generated-pack-session-preview');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
              className="flex items-center gap-3 px-10 py-5 bg-indigo-650 hover:bg-indigo-700 text-white font-black uppercase text-sm tracking-[0.15em] rounded-3xl shadow-xl hover:scale-[1.01] active:scale-95 transition-all w-full md:w-auto"
            >
              <QrCode className="w-5 h-5 animate-pulse" />
              Générer le Pack Automatique
            </button>
          </div>
        </div>

        {/* Right / Generated Column */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-8" id="generated-pack-session-preview">
          {!isPackGenerated ? (
            <div className="bg-slate-100 border-2 border-dashed border-slate-200 rounded-[32px] p-12 text-center text-slate-400 flex flex-col items-center justify-center min-h-[450px] print:hidden">
              <QrCode className="w-16 h-16 text-slate-350 mb-4 animate-pulse" />
              <h3 className="text-xl font-bold uppercase tracking-tight text-slate-600 mb-1">Fiche de Pack non générée</h3>
              <p className="text-xs font-medium max-w-sm leading-relaxed text-slate-500">
                Complétez les formulaires de gauche, puis cliquez sur le bouton <span className="font-bold text-slate-700">"Générer le Pack"</span> pour afficher et partager le document officiel de séance.
              </p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[40px] p-8 md:p-10 border-4 border-slate-900 shadow-2xl relative overflow-hidden print:border-none print:shadow-none print:p-0"
            >
              {/* Outer stamps decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl pointer-events-none print:hidden"></div>
              
              {/* Layout for PDF formatting checks */}
              <div className="print:block space-y-8">
                {/* Academic Header section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 border-b-2 border-slate-900 pb-6">
                  <div className="text-center sm:text-left space-y-3.5">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="bg-amber-100 text-amber-850 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
                        Royaume du Maroc
                      </span>
                      <span className="bg-indigo-100 text-indigo-900 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
                        Validation SGH
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 leading-none font-display">AZZEDDINE ATIBI</h3>
                      <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Physique-Chimie Expérimentale</span>
                    </div>
                  </div>

                  <img 
                    src={MINISTERE_LOGO}
                    alt="Logo Ministère" 
                    className="h-16 w-auto object-contain shrink-0"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Session Identification Info Banner */}
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-4 font-bold text-slate-800 text-xs">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                    <span className="text-indigo-600 font-extrabold uppercase text-[10px] tracking-widest block bg-indigo-50 px-2.5 py-1 rounded-md">Séance validée</span>
                    <h2 className="text-sm font-black text-slate-900 leading-tight flex-1 uppercase tracking-tight italic">
                      {sessionTitle}
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-slate-400 block uppercase tracking-wider text-[9px] font-semibold">Enseignant :</span>
                      <span className="text-slate-800 font-bold flex items-center gap-1.5">
                        <FileSignature className="w-3.5 h-3.5 text-indigo-600" /> {teacherName}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 block uppercase tracking-wider text-[9px] font-semibold">Classe/Niveau :</span>
                      <span className="text-slate-800 font-bold flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-indigo-600" /> {level}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 block uppercase tracking-wider text-[9px] font-semibold">Local de TP :</span>
                      <span className="text-slate-800 font-bold flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-indigo-600" /> {room}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 block uppercase tracking-wider text-[9px] font-semibold">Date d'opération :</span>
                      <span className="text-slate-800 font-bold flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600" /> {sessionDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* QR Code and Quick instruction */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-amber-50/40 border-2 border-amber-500/20 rounded-[2.5rem] p-6 relative">
                  <div className="space-y-2 text-center sm:text-left">
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1.5">
                      <QrCode className="w-4.5 h-4.5 text-amber-600" /> QR Code Unique de séance
                    </h4>
                    <p className="text-[11px] text-amber-950 font-semibold leading-relaxed max-w-xs">
                      Scannez ce QR Code pour afficher instantanément la configuration de conformité, fiches SDS de sécurité et consignes environnementales sur vos smartphones élèves ou tablettes labo.
                    </p>
                  </div>
                  <div 
                    onClick={() => setShowQRModal(true)}
                    className="bg-white p-3 rounded-2xl border-4 border-amber-400/30 hover:border-amber-500 shadow-md flex flex-col items-center justify-center w-48 h-52 shrink-0 cursor-pointer group hover:shadow-xl hover:scale-105 transition-all text-center"
                    title="Cliquer pour afficher en plein écran / agrandir"
                  >
                    <LocalQRCode 
                      text={shareableUrl} 
                      alt="Session custom QR Code" 
                      className="w-32 h-32 mx-auto object-contain"
                    />
                    <span className="text-[9px] text-amber-800 font-black uppercase mt-2 tracking-widest group-hover:text-amber-600">
                      🔍 Cliquer pour AGRANDIR
                    </span>
                  </div>
                </div>

                {/* Reactants List With details */}
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-1.5">
                    Propriétés Physico-Chimiques des Réactifs Choisis
                  </h3>

                  {selectedChemicalIds.length === 0 && customReactants.length === 0 ? (
                    <p className="text-xs font-bold text-rose-500 italic">Aucun réactif sélectionné pour cette session.</p>
                  ) : (
                    <div className="space-y-4">
                      {/* Standard matching */}
                      {SDS_DATA.filter(chem => selectedChemicalIds.includes(chem.id)).map(chem => (
                        <div key={chem.id} className="p-4 bg-slate-50 border border-slate-150 rounded-2xl relative">
                          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1.5 mb-2.5">
                            <span className="font-bold text-xs text-slate-900 text-sm">{chem.name}</span>
                            <span className="font-mono text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded-md font-black">{chem.formula}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-[10px] font-bold text-slate-600">
                            <div>
                              <span className="text-slate-400 block uppercase text-[8px] font-black">État physique :</span>
                              <span className="text-slate-800">{chem.physicalState}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block uppercase text-[8px] font-black">Indice pH :</span>
                              <span className="text-slate-800">{chem.ph || 'N/A'}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block uppercase text-[8px] font-black">Pictogrammes GHS :</span>
                              <div className="flex gap-1.5 mt-1">
                                {chem.safetyPictograms.map(picId => {
                                  const pic = SAFETY_PICTOGRAMS.find(p => p.id === picId);
                                  return pic ? (
                                    <div key={picId} className="w-6 h-6 p-0.5 bg-white border border-slate-200 rounded" title={pic.name}>
                                      <img src={pic.image} alt={pic.name} className="w-full h-full object-contain" />
                                    </div>
                                  ) : null;
                                })}
                              </div>
                            </div>
                            <div>
                              <span className="text-slate-400 block uppercase text-[8px] font-black">Mention & Toxicité :</span>
                              <span className="text-rose-800 font-extrabold">{chem.signalWord}</span>
                              <span className="block text-[8px] text-slate-500 font-normal line-clamp-1">{chem.healthHazards.join(', ')}</span>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Custom inputs */}
                      {customReactants.map((chem, idx) => (
                        <div key={idx} className="p-4 bg-amber-50/20 border border-amber-200/80 rounded-2xl relative">
                          <div className="flex items-center justify-between gap-2 border-b border-amber-100 pb-1.5 mb-2.5">
                            <span className="font-black text-xs text-slate-900 text-sm flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> {chem.name} (Perso)
                            </span>
                            {chem.formula && <span className="font-mono text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-black">{chem.formula}</span>}
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-[10px] font-bold text-slate-600">
                            <div>
                              <span className="text-slate-400 block uppercase text-[8px] font-black">État physique :</span>
                              <span className="text-slate-800">{chem.physicalState}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block uppercase text-[8px] font-black">Indice pH :</span>
                              <span className="text-slate-800">{chem.ph}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block uppercase text-[8px] font-black">Inflammabilité :</span>
                              <span className="text-slate-800">{chem.inflammability}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block uppercase text-[8px] font-black">Toxicité déclarée :</span>
                              <span className="text-rose-900">{chem.toxicity}</span>
                            </div>
                            {chem.hzPictogramIds.length > 0 && (
                              <div className="col-span-2">
                                <span className="text-slate-400 block uppercase text-[8px] font-black mb-1">Dangers GHS :</span>
                                <div className="flex gap-1.5">
                                  {chem.hzPictogramIds.map(picId => {
                                    const pic = SAFETY_PICTOGRAMS.find(p => p.id === picId);
                                    return pic ? (
                                      <div key={picId} className="w-6 h-6 p-0.5 bg-white border border-slate-200 rounded" title={pic.name}>
                                        <img src={pic.image} alt={pic.name} className="w-full h-full object-contain" />
                                      </div>
                                    ) : null;
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Materials List */}
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-1.5">
                    Inventaire du Matériel Requis
                  </h3>

                  {selectedMaterialIds.length === 0 && customMaterials.length === 0 ? (
                    <p className="text-xs font-bold text-rose-500 italic">Aucun matériel ou fiole cochée dans l'inventaire.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-bold text-slate-800">
                      {[
                        ...STANDARD_GLASSWARE.filter(m => selectedMaterialIds.includes(m.id)),
                        ...STANDARD_MEASURING_DEVICES.filter(m => selectedMaterialIds.includes(m.id)),
                        ...STANDARD_TOOLS.filter(m => selectedMaterialIds.includes(m.id)),
                      ].map(item => (
                        <div key={item.id} className="flex items-center gap-2 bg-slate-50/70 py-2 px-3 border border-slate-100 rounded-xl">
                          <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{item.name}</span>
                          <span className="ml-auto text-[8px] text-slate-400 uppercase tracking-widest bg-slate-100 px-1.5 py-0.5 rounded">
                            {item.category === 'Verrerie' ? 'Vre' : item.category === 'Appareils de Mesure' ? 'Mes' : 'Out'}
                          </span>
                        </div>
                      ))}
                      {customMaterials.map((mat, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-amber-50/10 py-2 px-3 border border-amber-100 rounded-xl">
                          <CheckSquare className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>{mat}</span>
                          <span className="ml-auto text-[8px] text-amber-700 uppercase tracking-widest bg-amber-100 px-1.5 py-0.5 rounded font-black">Perso</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Certifications */}
                <div className="border-t border-slate-200 pt-5 text-center text-[10px] text-slate-400 font-semibold space-y-1">
                  <p>DOCUMENT GÉNÉRÉ PAR L'APPLICATION LABORATOIRE AZZEDDINE ATIBI</p>
                  <p className="uppercase tracking-wider">CONFORMITÉ SGH & RÈGLEMENTATIONS ACADÉMIQUES</p>
                </div>
              </div>

              {/* Action Buttons for downloading and exporting */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-2.5 print:hidden">
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={handleCopyShareLink}
                    className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all scale-98 active:scale-95"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    {copiedLink ? 'Lien Copié !' : 'Partager'}
                  </button>
                  <button
                    onClick={handleCopyPlainTextReport}
                    className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all scale-98 active:scale-95"
                    title="Copier le document complet sous forme de texte brut"
                  >
                    {copiedText ? <Check className="w-4 h-4 text-emerald-600" /> : <ClipboardCheck className="w-4 h-4" />}
                    {copiedText ? 'Copié !' : 'Copier Rapport'}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all scale-[1.01] hover:scale-[1.02] shadow-xl"
                >
                  <Printer className="w-4 h-4" /> Imprimer / Télécharger (PDF)
                </button>
                
                <div className="bg-amber-50/70 border border-amber-100/80 p-4 rounded-2xl text-[11px] text-amber-900 leading-relaxed font-semibold flex gap-2.5">
                  <Info className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
                  <p>
                    <span className="font-extrabold block">Note Pédagogique :</span> Ce document respecte les protocoles d'inspection des académies marocaines. Son QR code conserve la session entière en paramètre : n'hésitez pas à le coller sur la paillasse de vos élèves.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ENLARGED QR CODE MODAL FOR CRISP EASY SCANNING */}
      <AnimatePresence>
        {showQRModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQRModal(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            ></motion.div>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[40px] w-full max-w-md p-8 shadow-2xl relative z-10 border-4 border-amber-450/40 text-center space-y-6"
            >
              <div>
                <span className="bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-black uppercase px-3.5 py-1 rounded-full tracking-wider">
                  Projection Haute Résolution
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-3 uppercase tracking-tight">
                  Scannage Grande Distance
                </h3>
                <p className="text-slate-500 text-xs">
                  Agrandissement officiel pour rétroprojecteur ou lecture simultanée en classe.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 shadow-inner flex items-center justify-center w-80 h-80 mx-auto">
                <LocalQRCode 
                  text={shareableUrl} 
                  alt="Enlarged session QR Code" 
                  className="w-72 h-72 object-contain"
                />
              </div>

              <div className="space-y-4">
                <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                  Ce QR Code intègre tous les réactifs choisis ({selectedChemicalIds.length} standard + {customReactants.length} personnalisés) ainsi que l'inventaire matériel de paillasse.
                </p>
                <button
                  type="button"
                  onClick={() => setShowQRModal(false)}
                  className="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-colors"
                >
                  Fermer l'Agrandissement
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CUSTOM REACTANT MODAL */}
      <AnimatePresence>
        {showCustomModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCustomModal(false)}
              className="absolute inset-0 bg-indigo-950/80 backdrop-blur-md"
            ></motion.div>

            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[32px] w-full max-w-lg p-6 sm:p-8 shadow-2xl relative z-10 border-4 border-white/20 text-xs text-slate-600 font-bold max-h-[90vh] overflow-y-auto"
            >
              <div className="border-b border-slate-100 pb-3 mb-5">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight italic">
                  Ajouter un Réactif Personnalisé
                </h3>
                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Entrez l'état et les indicateurs SGH requis</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5 col-span-2">
                  <label className="text-slate-700 uppercase tracking-wider text-[9px] font-black block">Nom du produit / Solution</label>
                  <input 
                    type="text" 
                    value={newReactant.name}
                    onChange={(e) => setNewReactant(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full text-slate-900 bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-indigo-650"
                    placeholder="Ex: Sulfate de cuivre en solution"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-700 uppercase tracking-wider text-[9px] font-black block">Formule chimique</label>
                    <input 
                      type="text" 
                      value={newReactant.formula}
                      onChange={(e) => setNewReactant(prev => ({ ...prev, formula: e.target.value }))}
                      className="w-full text-slate-900 bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none font-mono"
                      placeholder="Ex: CuSO4"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-700 uppercase tracking-wider text-[9px] font-black block">pH approximatif</label>
                    <input 
                      type="text" 
                      value={newReactant.ph}
                      onChange={(e) => setNewReactant(prev => ({ ...prev, ph: e.target.value }))}
                      className="w-full text-slate-900 bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none"
                      placeholder="Ex: 5.5, Neutre, < 2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-700 uppercase tracking-wider text-[9px] font-black block">État physique</label>
                    <select 
                      value={newReactant.physicalState}
                      onChange={(e) => setNewReactant(prev => ({ ...prev, physicalState: e.target.value }))}
                      className="w-full text-slate-900 bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none"
                    >
                      <option value="Liquide">Liquide (Solution)</option>
                      <option value="Solide">Solide (Cristaux/Poudre)</option>
                      <option value="Gaz">Gaz</option>
                      <option value="Gel">Gel</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-700 uppercase tracking-wider text-[9px] font-black block">Indice d'Inflammabilité</label>
                    <input 
                      type="text" 
                      value={newReactant.inflammability}
                      onChange={(e) => setNewReactant(prev => ({ ...prev, inflammability: e.target.value }))}
                      className="w-full text-slate-900 bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none"
                      placeholder="Ex: Non inflammable, Hautement..."
                    />
                  </div>
                </div>

                <div className="space-y-1.5 col-span-2">
                  <label className="text-slate-700 uppercase tracking-wider text-[9px] font-black block">Profil de Toxicité / Dangers majeurs</label>
                  <input 
                    type="text" 
                    value={newReactant.toxicity}
                    onChange={(e) => setNewReactant(prev => ({ ...prev, toxicity: e.target.value }))}
                    className="w-full text-slate-900 bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none"
                    placeholder="Ex: Risques d'irritation, Toxique pour l'environnement"
                  />
                </div>

                <div className="space-y-1.5 col-span-2">
                  <label className="text-slate-700 uppercase tracking-wider text-[9px] font-black block mb-1">Associer Pictogrammes GHS de Danger</label>
                  <div className="grid grid-cols-5 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {SAFETY_PICTOGRAMS.map(pic => {
                      const isChecked = newReactant.hzPictogramIds.includes(pic.id);
                      return (
                        <div 
                          key={pic.id}
                          onClick={() => handleTogglePictoForCustomReactant(pic.id)}
                          className={`p-1.5 rounded-lg border-2 cursor-pointer flex flex-col items-center justify-center transition-all bg-white relative ${
                            isChecked ? 'border-indigo-650 ring-2 ring-indigo-50 shadow-sm' : 'border-slate-100 hover:border-slate-200 opacity-60'
                          }`}
                          title={pic.name}
                        >
                          <img src={pic.image} alt={pic.name} className="w-8 h-8 object-contain" />
                          <span className="text-[7px] text-slate-500 truncate max-w-[50px] font-black block mt-1">{pic.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowCustomModal(false)}
                    className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase transition-all rounded-xl"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={handleAddCustomReactant}
                    className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-wider transition-all rounded-xl"
                  >
                    Ajouter le Réactif
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
