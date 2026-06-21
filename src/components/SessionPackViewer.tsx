import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle, 
  FlaskConical, 
  Layers, 
  FileSignature, 
  Calendar, 
  MapPin, 
  Check, 
  AlertTriangle, 
  Flame, 
  Biohazard, 
  Info,
  ChevronLeft,
  Printer,
  ShieldCheck,
  ClipboardList
} from 'lucide-react';
import { SDS_DATA, SAFETY_PICTOGRAMS, SDSMaterial } from '../constants';

const ALL_STANDARD_EQUIPMENTS = [
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
  { id: 'm01', name: 'pH-mètre étalonné', category: 'Appareils de Mesure' },
  { id: 'm02', name: 'Sonde thermométrique', category: 'Appareils de Mesure' },
  { id: 'm03', name: 'Conductimètre', category: 'Appareils de Mesure' },
  { id: 'm04', name: 'Balance analytique (2 décimales)', category: 'Appareils de Mesure' },
  { id: 'm05', name: 'Spectrophotomètre d\'absorption', category: 'Appareils de Mesure' },
  { id: 'm06', name: 'Chronomètre numérique', category: 'Appareils de Mesure' },
  { id: 'm07', name: 'Colorimètre', category: 'Appareils de Mesure' },
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

interface DecodedPack {
  t?: string;
  teach?: string;
  l?: string;
  r?: string;
  d?: string;
  chems?: string[];
  custChems?: CustomReactant[];
  mats?: string[];
  custMats?: string[];
}

interface SessionPackViewerProps {
  encodedData: string;
  onExit: () => void;
}

export const SessionPackViewer: React.FC<SessionPackViewerProps> = ({ encodedData, onExit }) => {
  const pack: DecodedPack | null = useMemo(() => {
    try {
      // Restore standard base64 from URL-safe format and handle spaces converted from '+'
      let normalized = encodedData.replace(/-/g, '+').replace(/_/g, '/').replace(/ /g, '+');
      
      // Restore padding if stripped
      const padLength = (4 - (normalized.length % 4)) % 4;
      if (padLength > 0) {
        normalized += '='.repeat(padLength);
      }
      
      return JSON.parse(decodeURIComponent(atob(normalized)));
    } catch (e) {
      console.error("Failed to decode session pack parameters", e);
      return null;
    }
  }, [encodedData]);

  // Checklist of equipment
  const [checkedEquipments, setCheckedEquipments] = useState<Record<string, boolean>>({});

  const toggleEquipmentCheck = (key: string) => {
    setCheckedEquipments(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Safe checks
  if (!pack) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-rose-55 rounded-2xl flex items-center justify-center text-rose-600 mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-800 uppercase italic">Échec de décodage</h2>
        <p className="text-slate-500 font-bold">Le pack de séance partagé est corrompu ou incomplet. Veuillez redemander le QR Code valide à votre enseignant.</p>
        <button
          onClick={onExit}
          className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-indigo-700 transition-all text-xs uppercase"
        >
          Retourner au Menu Principal
        </button>
      </div>
    );
  }

  // Materials parsing
  const matchingMaterials = ALL_STANDARD_EQUIPMENTS.filter(m => pack.mats?.includes(m.id));
  const customMaterials = pack.custMats || [];
  const totalMatsCount = matchingMaterials.length + customMaterials.length;
  const checkedCount = Object.values(checkedEquipments).filter(Boolean).length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-16">
      {/* Return control */}
      <button
        onClick={onExit}
        className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 font-bold uppercase tracking-wider transition-colors print:hidden"
      >
        <ChevronLeft className="w-4 h-4" /> Retour aux TPs d'Azzeddine
      </button>

      {/* Main Glassmorphic Panel */}
      <div className="bg-white rounded-[40px] shadow-2xl border-4 border-emerald-550/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-50 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none"></div>

        {/* Brand Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-indigo-800 p-8 sm:p-12 text-white relative">
          <div className="absolute top-4 right-4 bg-white/10 border border-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hidden sm:block">
            Accès Élève SGH
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-xl shrink-0 leading-none">
              <ShieldCheck className="w-9 h-9" />
            </div>
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="bg-emerald-500/30 text-emerald-100 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-500/20">
                Fiche de Séance validée et sécurisée
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight uppercase italic font-display leading-tight">
                {pack.t || 'Fiche Technique de Séance'}
              </h1>
              <p className="text-[12px] text-emerald-150 font-bold uppercase tracking-widest">
                Portail de conformité expérimentale • Académie du Maroc
              </p>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-10 space-y-10">
          
          {/* Metadata Grid */}
          <div className="bg-slate-50 border border-slate-150 rounded-3xl p-5 grid grid-cols-2 gap-4 text-xs font-bold text-slate-800">
            <div className="space-y-1">
              <span className="text-slate-400 block uppercase tracking-wider text-[8px] font-black">Professeur Responsable :</span>
              <span className="text-slate-800 font-extrabold flex items-center gap-1.5">
                <FileSignature className="w-3.5 h-3.5 text-emerald-600" /> {pack.teach || 'A. Atibi'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 block uppercase tracking-wider text-[8px] font-black">Niveau de l'Évaluation :</span>
              <span className="text-slate-800 font-extrabold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-600" /> {pack.l || 'Baccalauréat'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 block uppercase tracking-wider text-[8px] font-black">Laboratoire / Salle :</span>
              <span className="text-slate-800 font-extrabold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {pack.r || 'Salle de Chimie'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 block uppercase tracking-wider text-[8px] font-black">Date de la Manipulation :</span>
              <span className="text-slate-800 font-extrabold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" /> {pack.d || 'Aujourd\'hui'}
              </span>
            </div>
          </div>

          {/* CHECKLIST DE VERRERIE ET MATERIEL */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                  Checklist Verrerie & Matériel de votre paillasse
                </h3>
              </div>
              <span className="bg-emerald-55 text-emerald-800 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                {checkedCount} / {totalMatsCount} vérifiés
              </span>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
              Avant de commencer les expériences de chimie, assurez-vous que tout le matériel listé ci-dessous est bien propre et disposé sur votre table. Cochez-les au fur et à mesure :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 font-bold text-xs">
              {matchingMaterials.map(m => {
                const checked = !!checkedEquipments[m.id];
                return (
                  <div
                    key={m.id}
                    onClick={() => toggleEquipmentCheck(m.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer select-none transition-all flex items-center gap-3 ${
                      checked 
                        ? 'bg-emerald-50/50 border-emerald-500 text-slate-800 font-bold' 
                        : 'bg-slate-50 border-slate-100 hover:border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      checked ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                    }`}>
                      {checked && <Check className="w-3 h-3 stroke-[3px]" />}
                    </div>
                    <span className={checked ? 'line-through text-slate-400 font-medium' : ''}>{m.name}</span>
                    <span className="ml-auto text-[8px] px-1.5 py-0.5 rounded uppercase tracking-wider bg-white/80 border text-slate-400">
                      {m.category === 'Verrerie' ? 'VERRE' : 'ENGIN'}
                    </span>
                  </div>
                );
              })}

              {customMaterials.map((mat, idx) => {
                const key = `custom-${idx}`;
                const checked = !!checkedEquipments[key];
                return (
                  <div
                    key={key}
                    onClick={() => toggleEquipmentCheck(key)}
                    className={`p-3.5 rounded-2xl border cursor-pointer select-none transition-all flex items-center gap-3 ${
                      checked 
                        ? 'bg-emerald-50/50 border-emerald-500 text-slate-800 font-bold' 
                        : 'bg-slate-50 border-slate-100 hover:border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      checked ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                    }`}>
                      {checked && <Check className="w-3 h-3 stroke-[3px]" />}
                    </div>
                    <span className={checked ? 'line-through text-slate-400 font-medium' : ''}>{mat}</span>
                    <span className="ml-auto text-[8px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider bg-amber-50 border border-amber-200 text-amber-800">
                      PERSO
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FICHE DES REACTIFS ET RISQUES CHIMIQUES (FDS COMPACTE) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <FlaskConical className="w-5 h-5 text-indigo-650" />
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Fiches d'Identification Chimique et de Sécurité
              </h3>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
              Consultez attentivement les propriétés physico-chimiques des corps chimiques présents pour adapter vos Equipements de Protection Individuelle (EPI) :
            </p>

            <div className="space-y-5">
              {/* Database Matched */}
              {SDS_DATA.filter(chem => pack.chems?.includes(chem.id)).map(chem => (
                <div 
                  key={chem.id}
                  className="bg-slate-50 border border-slate-200 rounded-[2rem] p-6 space-y-4 shadow-inner"
                >
                  <div className="flex items-center justify-between gap-3 border-b border-slate-150 pb-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <h4 className="text-lg font-black text-slate-900 leading-tight">{chem.name}</h4>
                    </div>
                    <span className="font-mono text-xs bg-slate-200 font-black px-2.5 py-1 rounded-lg text-indigo-750">
                      {chem.formula}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                    <div className="space-y-1">
                      <span className="text-[9px] text-slate-400 block uppercase font-black">État physique principal :</span>
                      <span className="text-slate-800 font-bold">{chem.physicalState}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] text-slate-400 block uppercase font-black">Indice de pH :</span>
                      <span className={`font-black uppercase px-2 py-0.5 rounded text-[10px] ${
                        chem.ph && parseFloat(chem.ph) < 3 ? 'bg-rose-100 text-rose-800' :
                        chem.ph && parseFloat(chem.ph) > 11 ? 'bg-orange-100 text-orange-850' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {chem.ph ? `pH: ${chem.ph}` : 'pH non alcalin / neutre'}
                      </span>
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <span className="text-[9px] text-slate-400 block uppercase font-black">Dangers & Pictogrammes de Sécurité :</span>
                      <div className="flex items-center gap-4 flex-wrap mt-1">
                        <div className="flex gap-2.5 items-center flex-wrap">
                          {chem.safetyPictograms.map(picId => {
                            const pic = SAFETY_PICTOGRAMS.find(p => p.id === picId);
                            return pic ? (
                              <div key={picId} className="w-10 h-10 p-1 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center shrink-0" title={`${pic.name}: ${pic.description}`}>
                                <img src={pic.image} alt={pic.name} className="w-full h-full object-contain" />
                              </div>
                            ) : null;
                          })}
                        </div>
                        <div className="space-y-0.5 flex-1 leading-normal">
                          <span className="text-rose-700 font-black block uppercase text-[10px]">{chem.signalWord}</span>
                          <span className="text-[10px] text-slate-500 font-bold leading-tight">{chem.healthHazards.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 sm:col-span-2 bg-indigo-50/40 p-4 rounded-xl border border-indigo-100/50">
                      <span className="text-[9px] text-indigo-700 block uppercase font-black">Équipements de Protection Requis :</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {chem.ppeRequired.map((ppe, i) => (
                          <span key={i} className="px-2.5 py-1 bg-white border border-indigo-100/60 text-indigo-800 rounded-full text-[10px] font-bold">
                            {ppe}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Custom Products Matched */}
              {(pack.custChems || []).map((chem, idx) => (
                <div 
                  key={idx}
                  className="bg-amber-50/10 border border-amber-250 rounded-[2rem] p-6 space-y-4 shadow-inner"
                >
                  <div className="flex items-center justify-between gap-3 border-b border-amber-200 pb-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                      <h4 className="text-lg font-black text-slate-900 leading-tight">{chem.name} <span className="text-xs font-black text-amber-700 uppercase">(Perso)</span></h4>
                    </div>
                    {chem.formula && (
                      <span className="font-mono text-xs bg-amber-100 font-black px-2.5 py-1 rounded-lg text-amber-900">
                        {chem.formula}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                    <div className="space-y-1">
                      <span className="text-[9px] text-slate-400 block uppercase font-black">État physique principal :</span>
                      <span className="text-slate-800 font-bold">{chem.physicalState}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] text-slate-400 block uppercase font-black">Indice de pH déclaré :</span>
                      <span className="text-slate-800 font-bold">pH: {chem.ph}</span>
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <span className="text-[9px] text-slate-400 block uppercase font-black">Inflammabilité déclarée :</span>
                      <span className="text-slate-800 font-bold">{chem.inflammability}</span>
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <span className="text-[9px] text-rose-800 block uppercase font-black">Toxicité déclaration scientifique :</span>
                      <span className="text-slate-700 font-bold leading-normal">{chem.toxicity}</span>
                    </div>

                    {chem.hzPictogramIds && chem.hzPictogramIds.length > 0 && (
                      <div className="space-y-1 sm:col-span-2">
                        <span className="text-[9px] text-slate-400 block uppercase font-black">Dangers GHS :</span>
                        <div className="flex gap-2.5 items-center flex-wrap mt-1">
                          {chem.hzPictogramIds.map(picId => {
                            const pic = SAFETY_PICTOGRAMS.find(p => p.id === picId);
                            return pic ? (
                              <div key={picId} className="w-10 h-10 p-1 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center shrink-0" title={pic.name}>
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
          </div>

          {/* BOTTOM NOTICE INFOS */}
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center gap-6 text-[11px] text-slate-500 font-semibold print:hidden">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <p className="leading-relaxed">
                Ce pack d'expérimentation pédagogique a été conçu dans le respect strict des chartes de sécurité des sciences physiques. Si vous observez un matériel défectueux ou un flacon mal étiqueté, veuillez en avertir immédiatement votre enseignant <span className="font-extrabold text-slate-700">{pack.teach || 'Azzeddine Atibi'}</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 print:hidden">
        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center gap-2 bg-slate-900 border hover:bg-black text-white px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all"
        >
          <Printer className="w-4 h-4" /> Imprimer / Exporter en Fiche Papier
        </button>
      </div>
    </div>
  );
};
