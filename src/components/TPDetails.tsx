import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Beaker, 
  ChevronRight,
  ClipboardList,
  Info,
  Video,
  Award,
  Copy,
  Check,
  Download,
  X
} from 'lucide-react';
import { TP, SAFETY_PICTOGRAMS, getRelevantPictograms } from '../constants';
import { Quiz } from './Quiz';
import { getScientificTPQuiz } from '../utils/scientificQuizzes';
import { REPORT_TEMPLATES } from '../data/reportTemplates';
import { TitrationSimulation } from './TitrationSimulation';
import { renderScienceText } from '../utils/scienceRenderer';

interface TPDetailsProps {
  tp: TP;
  onBack: () => void;
}

export const TPDetails: React.FC<TPDetailsProps> = ({ tp, onBack }) => {
  const relevantPictograms = getRelevantPictograms(tp);
  const [activeSubTab, setActiveSubTab] = React.useState('intro');
  const [copied, setCopied] = React.useState(false);
  const [activeZoomedImage, setActiveZoomedImage] = React.useState<{ src: string; alt: string } | null>(null);
  
  const reportTemplate = REPORT_TEMPLATES[tp.id];

  const handleCopyReport = () => {
    if (!reportTemplate) return;
    const txt = `
=========================================
${reportTemplate.generalTitle.toUpperCase()}
=========================================

1. BUT ET INTRODUCTION DE L'EXPERIENCE :
${reportTemplate.introduction}

2. INSTRUCTIONS DE DESSIN ET SCHEMATISATION :
${reportTemplate.drawingInstructions.map((inst, i) => `- ${inst}`).join('\n')}

3. REACTIFS ET MATERIEL :
${reportTemplate.materialsAndReactants.map(m => `- ${m.name} : ${m.role} (${m.safety})`).join('\n')}

4. EQUATIONS ET CALCULS MODELES :
${reportTemplate.equationsAndCalculations.map(c => `* ${c.title}\n  Formule : ${c.formula}\n  Explication : ${c.explanation}\n  Exemple : ${c.example}`).join('\n\n')}

5. OBSERVATIONS ET MODELES DE RESULTATS :
Observations : ${reportTemplate.expectedObservations}
Valeurs attendues : ${reportTemplate.expectedModelResults}
Erreurs courantes : \n${reportTemplate.commonErrors.map(e => `- ${e}`).join('\n')}

6. QUESTIONS D'EXAMEN TYPE :
${reportTemplate.modelQuestions.map((q, i) => `Q${i+1} : ${q.question}\nRéponse : ${q.answer}`).join('\n\n')}

7. CONCLUSION REDIGEE MODELE :
"${reportTemplate.conclusionTemplate}"
`;
    navigator.clipboard.writeText(txt.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadReport = () => {
    if (!reportTemplate) return;
    const txt = `
=========================================
${reportTemplate.generalTitle.toUpperCase()}
=========================================

1. BUT ET INTRODUCTION DE L'EXPERIENCE :
${reportTemplate.introduction}

2. INSTRUCTIONS DE DESSIN ET SCHEMATISATION :
${reportTemplate.drawingInstructions.map((inst, i) => `- ${inst}`).join('\n')}

3. REACTIFS ET MATERIEL :
${reportTemplate.materialsAndReactants.map(m => `- ${m.name} : ${m.role} (${m.safety})`).join('\n')}

4. EQUATIONS ET CALCULS MODELES :
${reportTemplate.equationsAndCalculations.map(c => `* ${c.title}\n  Formule : ${c.formula}\n  Explication : ${c.explanation}\n  Exemple : ${c.example}`).join('\n\n')}

5. OBSERVATIONS ET MODELES DE RESULTATS :
Observations : ${reportTemplate.expectedObservations}
Valeurs attendues : ${reportTemplate.expectedModelResults}
Erreurs courantes : \n${reportTemplate.commonErrors.map(e => `- ${e}`).join('\n')}

6. QUESTIONS D'EXAMEN TYPE :
${reportTemplate.modelQuestions.map((q, i) => `Q${i+1} : ${q.question}\nRéponse : ${q.answer}`).join('\n\n')}

7. CONCLUSION REDIGEE MODELE :
"${reportTemplate.conclusionTemplate}"
`;
    const element = document.createElement("a");
    const file = new Blob([txt.trim()], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Compte_Rendu_Parfait_TP${tp.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pb-20"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-3 text-indigo-700 hover:text-indigo-900 font-black text-sm sm:text-base uppercase tracking-widest mb-10 transition-colors bg-white px-6 py-3 rounded-2xl shadow-md border-2 border-indigo-100"
      >
        <ArrowLeft className="w-6 h-6" /> Retour à la Banque
      </button>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Section */}
          <div 
            className="relative h-64 sm:h-[32rem] rounded-[40px] overflow-hidden shadow-2xl ring-4 ring-indigo-100 cursor-zoom-in group"
            onClick={() => setActiveZoomedImage({ src: tp.image, alt: tp.title })}
            title="Cliquer pour zoomer"
          >
            <img src={tp.image} alt={tp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
            {/* Hover indicator */}
            <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl border border-white/10 z-20">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
              <span>🔍 Cliquer pour zoomer</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 via-indigo-900/40 to-transparent flex flex-col justify-end p-6 sm:p-16 pointer-events-none">
              <span className={`w-fit px-5 py-2 rounded-xl text-[12px] sm:text-[14px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl ${
                tp.difficulty === 'Débutant' ? 'bg-emerald-500 text-white' :
                tp.difficulty === 'Intermédiaire' ? 'bg-amber-500 text-white' :
                'bg-rose-500 text-white'
              }`}>
                {tp.difficulty}
              </span>
              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter mb-8 uppercase italic leading-none">{tp.title}</h1>
                <div className="flex flex-wrap items-center gap-8 text-white text-sm sm:text-base font-black uppercase tracking-widest">
                  <div className="flex items-center gap-3 bg-white/30 px-4 py-2 rounded-xl backdrop-blur-md text-white border-2 border-white/40 shadow-lg">
                    {tp.level}
                  </div>
                  <div className="flex items-center gap-3 px-2 drop-shadow-lg"><Clock className="w-6 h-6 text-indigo-300" /> {tp.duration}</div>
                  <div className="flex items-center gap-3 px-2 drop-shadow-lg"><Beaker className="w-6 h-6 text-indigo-300" /> {tp.category}</div>
                </div>
            </div>
          </div>

          <section className="bg-white rounded-[40px] p-8 sm:p-14 border-4 border-indigo-100 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="p-4 bg-indigo-600 rounded-2xl text-white font-black shadow-xl shadow-indigo-100">
                <Info className="w-8 h-8" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-indigo-900 tracking-tighter uppercase italic">Objectif du TP</h2>
            </div>
            <p className="text-2xl sm:text-4xl text-slate-900 leading-tight font-black italic border-l-8 border-indigo-600 pl-8 py-4 relative z-10">
              {tp.description}
            </p>
          </section>

          {/* Chemicals Table & Materials */}
          {tp.chemicalTable && (
            <section className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <Beaker className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-bold text-slate-800">Tableau des Propriétés Chimiques</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Nom de la substance</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">État Physique</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Code Hazard (GHS)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {tp.chemicalTable.map((material, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-slate-700">{material.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{material.state}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-rose-50 text-rose-600 text-[10px] font-bold rounded border border-rose-100">
                            {material.hazards}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
          
          {/* Materials, Chemicals & Safety Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Chemicals & Materials Card */}
            <div className="bg-white border-2 border-indigo-50 rounded-[2.5rem] p-8 shadow-xl">
              <h3 className="text-xl font-black uppercase tracking-tight text-indigo-900 mb-6 flex items-center justify-between">
                <span>Matériel & Produits</span> <Beaker className="w-6 h-6 text-indigo-600" />
              </h3>
              
              <div className="grid grid-cols-1 gap-6">
                {tp.chemicals && (
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Produits Chimiques</h4>
                    <ul className="space-y-2">
                       {tp.chemicals.map((item, i) => (
                        <li key={i} className="text-sm text-slate-700 flex items-start gap-2 font-semibold">
                          <ChevronRight className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" /> <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {tp.materials && (
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Matériel</h4>
                    <ul className="space-y-2">
                      {tp.materials.map((item, i) => (
                        <li key={i} className="text-sm text-slate-700 flex items-start gap-2 font-semibold">
                          <ChevronRight className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" /> <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Safety Section Card */}
            <div className="bg-rose-50/75 border-2 border-rose-100 rounded-[2.5rem] p-8 shadow-xl">
              <h3 className="text-xl font-black uppercase tracking-tight text-rose-900 mb-6 flex items-center justify-between">
                <span>Sécurité</span> <ShieldCheck className="w-6 h-6 text-rose-600" />
              </h3>

              <div className="space-y-6">
                {relevantPictograms.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {relevantPictograms.map(pic => (
                      <div 
                        key={pic.id} 
                        className="w-16 h-16 bg-white rounded-2xl p-2 shadow-md border-2 border-rose-100 flex items-center justify-center group relative cursor-help"
                        title={pic.name}
                      >
                        <img 
                          src={pic.image} 
                          alt={pic.name} 
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-rose-600 text-[10px] text-white px-2 py-0.5 rounded-lg font-black tracking-tighter">
                          {pic.code}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {tp.hazards && (
                  <div>
                    <h4 className="text-xs font-black text-rose-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-500" /> Dangers Identifiés
                    </h4>
                    <ul className="space-y-2">
                      {tp.hazards.map((item, i) => (
                        <li key={i} className="text-xs text-rose-800 font-semibold flex items-start gap-1.5 leading-relaxed">
                          <span>•</span> <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {tp.precautions && (
                  <div>
                    <h4 className="text-xs font-black text-emerald-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" /> Précautions à prendre
                    </h4>
                    <ul className="space-y-2">
                      {tp.precautions.map((item, i) => (
                        <li key={i} className="text-xs text-emerald-800 font-semibold flex items-start gap-1.5 leading-relaxed">
                          <span>✓</span> <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-12 -translate-y-12 blur-2xl pointer-events-none" />
            <h3 className="text-lg font-black uppercase tracking-wider mb-2">Conseil Pro</h3>
            <p className="text-sm text-indigo-100 leading-relaxed font-semibold">
              Notez toujours vos observations immédiatement dans votre cahier de labo. Un bon chimiste est un chimiste organisé !
            </p>
          </div>

          {/* Protocol Steps */}
          {tp.protocol && (
            <section className="relative px-2 sm:px-0">
              <div className="flex items-center gap-5 mb-10">
                <div className="p-4 bg-indigo-600 rounded-[20px] text-white shadow-xl shadow-indigo-100">
                  <ClipboardList className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black text-indigo-900 uppercase italic">Protocole</h2>
                  <p className="text-lg text-indigo-400 font-black tracking-tight">Étapes obligatoires de manipulation.</p>
                </div>
              </div>

              <div className="relative space-y-10">
                {/* Connecting Line (Desktop) */}
                <div className="absolute left-10 top-12 bottom-12 w-2 bg-indigo-100 rounded-full hidden sm:block shadow-inner" />
                
                {tp.protocol.map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative flex flex-col sm:flex-row gap-8 p-10 bg-white border-2 border-indigo-50 rounded-[3rem] shadow-xl hover:shadow-2xl hover:border-indigo-400 transition-all group z-10"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-[24px] bg-slate-900 group-hover:bg-indigo-600 text-white flex flex-col items-center justify-center transition-all shadow-2xl shadow-indigo-100 group-hover:shadow-indigo-300 group-hover:-translate-y-2 ring-4 ring-indigo-50">
                        <span className="text-[11px] font-black uppercase tracking-tighter opacity-60">Phase</span>
                        <span className="text-2xl font-black leading-none">{(index + 1).toString().padStart(2, '0')}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6 flex-1">
                      <p className="text-slate-900 leading-relaxed text-xl sm:text-2xl font-black group-hover:text-indigo-900 transition-colors">
                        {step}
                      </p>
                      
                      <div className="flex items-center gap-6 pt-2">
                        <div className="h-2 flex-1 bg-indigo-50 rounded-full overflow-hidden">
                           <div 
                             className="h-full bg-indigo-600 transition-all duration-1000" 
                             style={{ width: `${((index + 1) / tp.protocol.length) * 100}%` }}
                           ></div>
                        </div>
                        <span className="text-[12px] font-black uppercase tracking-widest text-indigo-400">
                          {Math.round(((index + 1) / tp.protocol.length) * 100)}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-slate-200 overflow-hidden relative">
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
                
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                  <ShieldCheck className="w-8 h-8 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Vérification Finale</h4>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    Une fois le protocole terminé, n'oubliez pas de nettoyer votre verrerie et de ranger votre poste de travail. 
                    Un environnement de travail propre est la base de la précision expérimentale.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Guide de Rédaction : Compte-Rendu Parfait */}
          {reportTemplate && (
            <section className="bg-white rounded-[40px] p-8 sm:p-12 border-4 border-indigo-100 shadow-2xl relative overflow-hidden mt-12">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 border-b border-indigo-50 pb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Académie</span>
                    <span className="bg-indigo-100 text-indigo-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Modèle Validé</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight italic">{reportTemplate.generalTitle}</h2>
                  <p className="text-[12px] text-slate-500 font-bold uppercase tracking-wider">Modèle de rédaction complet et réponses attendues pour la note maximale</p>
                </div>
                <div className="flex sm:flex-col lg:flex-row gap-2 shrink-0">
                  <button
                    onClick={handleCopyReport}
                    className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all scale-95 active:scale-90"
                    title="Copier le texte au presse-papiers"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copié !' : 'Copier'}
                  </button>
                  <button
                    onClick={handleDownloadReport}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all scale-95 active:scale-90 shadow-md shadow-indigo-100"
                    title="Télécharger le fichier de rapport complet"
                  >
                    <Download className="w-4 h-4" />
                    Télécharger
                  </button>
                </div>
              </div>

              <div className="bg-amber-50/70 border border-amber-100/80 p-5 rounded-2xl text-xs text-amber-900 leading-relaxed mb-8 flex gap-3">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="font-semibold">
                  <span className="font-black uppercase tracking-wider">Note de rédaction :</span> Ce guide interactif décrit exactement toutes les grandes étapes scientifiques, démonstrations, schémas, et valeurs attendues de votre compte-rendu pour garantir un travail irréprochable.
                </p>
              </div>

              {/* TABS SWITCHER */}
              <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-4 mb-8">
                {[
                  { id: 'intro', label: '1. Introduction & Schéma' },
                  { id: 'reactants', label: '2. Réactifs & Rôles' },
                  { id: 'calculs', label: '3. Formules & Calculs' },
                  { id: 'obs', label: '4. Observations, Résultats' },
                  { id: 'questions', label: '5. Solutions aux Questions de Cours' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                      activeSubTab === tab.id
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB CONTENTS */}
              {activeSubTab === 'intro' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">A. But de la Manipulation (Introduction rédigée)</h3>
                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100 font-medium">
                      {reportTemplate.introduction}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">B. Conseils pour le dessin du Schéma de Montage</h3>
                    <ul className="space-y-3 bg-amber-50/20 p-5 rounded-2xl border border-amber-100 text-xs">
                      {reportTemplate.drawingInstructions.map((inst, i) => (
                        <li key={i} className="text-slate-700 flex items-start gap-2.5 leading-relaxed">
                          <span className="text-amber-500 font-black shrink-0 mt-0.5">✓</span>
                          <span>{inst}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeSubTab === 'reactants' && (
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Tableau Scientifique de Sécurité et Rôles Précis</h3>
                  <div className="overflow-x-auto border border-slate-100 rounded-2xl shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 font-bold text-slate-500 border-b border-slate-100 uppercase tracking-wider text-[10px]">
                          <th className="px-5 py-3">Produit / Matrice</th>
                          <th className="px-5 py-3">Rôle expérimental précis</th>
                          <th className="px-5 py-3">Risques et Sécurité Pictogrammes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {reportTemplate.materialsAndReactants.map((mat, i) => (
                          <tr key={i} className="hover:bg-slate-50/50">
                            <td className="px-5 py-3 font-semibold text-slate-800">{mat.name}</td>
                            <td className="px-5 py-3 text-slate-600 leading-relaxed">{mat.role}</td>
                            <td className="px-5 py-3 text-rose-800 font-medium bg-rose-50/10 whitespace-normal leading-relaxed">{mat.safety}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeSubTab === 'calculs' && (
                <div className="space-y-6">
                  {reportTemplate.equationsAndCalculations.map((calc, i) => (
                    <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px]">{(i+1)}</span>
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">{calc.title}</h4>
                      </div>
                      
                      <div className="p-4 bg-slate-900 text-indigo-300 rounded-xl font-mono text-center text-xs font-black shadow-inner border border-white/10 select-all">
                        {renderScienceText(calc.formula)}
                      </div>
                      
                      <p className="text-xs text-slate-600 leading-relaxed">
                        <span className="font-bold text-slate-700">Démonstration / Explication :</span> {renderScienceText(calc.explanation)}
                      </p>
                      
                      <p className="text-xs text-emerald-950 leading-relaxed bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                        <span className="font-black uppercase tracking-wider text-[10px] text-emerald-800 block mb-1">Exemple de calcul avec données modèles :</span> {renderScienceText(calc.example)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeSubTab === 'obs' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Observations Macroscopiques</h3>
                      <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100 font-medium">
                        {reportTemplate.expectedObservations}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Valeurs Numériques / Résultats de Référence</h3>
                      <p className="text-xs text-slate-700 leading-relaxed bg-emerald-50/20 p-5 rounded-2xl border border-indigo-100 font-medium">
                        {reportTemplate.expectedModelResults}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-rose-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-500" /> Causes d'Erreurs Fréquentes et Justifications Scientifiques
                    </h3>
                    <ul className="space-y-2.5 bg-rose-50/20 p-5 rounded-2xl border border-rose-100 text-xs text-rose-950">
                      {reportTemplate.commonErrors.map((err, i) => (
                        <li key={i} className="flex items-start gap-2.5 leading-relaxed font-medium">
                          <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                          <span>{err}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeSubTab === 'questions' && (
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Correction Complète des Questions Récurrentes</h3>
                  <div className="space-y-6 divide-y divide-slate-100">
                    {reportTemplate.modelQuestions.map((q, i) => (
                      <div key={i} className={`space-y-2.5 ${i > 0 ? 'pt-6' : ''}`}>
                        <p className="text-xs font-black text-slate-800 flex gap-2">
                          <span className="text-indigo-600 shrink-0">Question {i+1} :</span>
                          <span>{renderScienceText(q.question)}</span>
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 pl-5 font-medium">
                          <span className="font-bold text-slate-800 block mb-1">Réponse rédigée :</span> {renderScienceText(q.answer)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <h4 className="text-xs font-black text-indigo-900 uppercase tracking-widest mb-3">Modèle de Conclusion Prête à Recopier :</h4>
                    <p className="text-xs italic text-slate-700 bg-indigo-50/20 p-5 rounded-2xl border border-indigo-100 leading-relaxed font-medium">
                      "{reportTemplate.conclusionTemplate}"
                    </p>
                  </div>
                </div>
              )}
            </section>
          )}
        </div>

      {/* Montage Expérimental / Simulateur virtuel - Placed gracefully to motivate the student */}
      {tp.id === '1' && (
        <section className="mt-16 pt-16 border-t border-slate-100">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
                <Beaker className="w-8 h-8" />
              </div>
              <div>
                <span className="bg-indigo-50 text-indigo-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Phase pratique</span>
                <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight mt-1">1. Simulateur virtuel & Montage interactif</h2>
                <p className="text-sm text-slate-500 font-medium tracking-tight">Manipulez le matériel en direct, visualisez la courbe en continu et validez vos calculs.</p>
              </div>
            </div>

            <div className="bg-white rounded-[40px] shadow-lg relative overflow-hidden">
              <TitrationSimulation />
            </div>
          </div>
        </section>
      )}


      {tp.id !== '1' && tp.setupImage && (
        <section className="mt-16 pt-16 border-t border-slate-100">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
                <Beaker className="w-8 h-8" />
              </div>
              <div>
                <span className="bg-indigo-50 text-indigo-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Schéma technique</span>
                <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight mt-1">Le Schéma de Montage Expérimental</h2>
                <p className="text-sm text-slate-500 font-medium tracking-tight">Visualisez la verrerie, la disposition des appareils et l'installation de laboratoire.</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-6 font-serif">Le Montage Expérimental</h2>
              <div 
                className="rounded-2xl overflow-hidden border-2 border-white shadow-sm bg-white p-4 cursor-zoom-in group relative hover:shadow-md transition-all duration-300"
                onClick={() => setActiveZoomedImage({ src: tp.setupImage!, alt: "Le Montage Expérimental" })}
              >
                <img src={tp.setupImage} alt="Montage TP" className="w-full h-auto rounded-xl group-hover:scale-[1.01] transition-transform duration-300" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/90 backdrop-blur-sm text-slate-800 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider shadow-md border border-slate-100">🔎 Cliquez pour Agrandir</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}


      {/* Video Demonstration Section - Placed before the quiz */}
      {tp.videoUrl && (
        <section className="mt-16 pt-16 border-t border-slate-100">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
                <Video className="w-8 h-8" />
              </div>
              <div>
                <span className="bg-indigo-50 text-indigo-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Démonstration vidéo</span>
                <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight mt-1">Démonstration expérimentale en vidéo</h2>
                <p className="text-sm text-slate-500 font-medium tracking-tight">Regardez les étapes réelles de la manipulation avant de passer au quiz.</p>
              </div>
            </div>

            <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <iframe
                className="w-full h-full"
                src={tp.videoUrl}
                title="Démonstration de l'expérience"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
      )}

      {/* Quiz Section */}
      {tp.quiz && (
        <section className="mt-16 pt-16 border-t border-slate-100">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-amber-500 rounded-2xl text-white shadow-lg shadow-amber-250">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">
                  {tp.id === '1' ? "2. Testez vos connaissances (Quiz)" : "Testez vos connaissances (Quiz)"}
                </h2>
                <p className="text-sm text-slate-500 font-medium tracking-tight">Vérifiez vos acquis scientifiques et théoriques (formules, réactions et calculs) de cette séance.</p>
              </div>
            </div>
            {tp.afterQuizImage && (
              <div className="mb-12 bg-slate-50 rounded-3xl p-8 border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-4 font-serif">Schéma de synthèse : États de coloration et virage du Noir Ériochrome T (NET)</h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  Ce diagramme didactique récapitule de manière schématique les deux phases clés du dosage de dureté hydrotimétrique :
                  <br />
                  • <strong>Avant l'équivalence :</strong> L'excès d'ions divalents Ca²⁺ et Mg²⁺ se complexe avec le Noir Ériochrome T (NET), conférant au milieu réactionnel sa teinte rose/violette caractéristique.
                  <br />
                  • <strong>À l'équivalence :</strong> Tous les ions calciques et magnésiens sont capturés par le puissant ligand chélatant EDTA. L'indicateur NET se trouve alors libéré sous sa forme moléculaire libre, qui présente une intense coloration bleu outremer pure.
                </p>
                <div 
                  className="rounded-2xl overflow-hidden border-2 border-white shadow-sm bg-white p-4 cursor-zoom-in group relative hover:shadow-md transition-all duration-300"
                  onClick={() => setActiveZoomedImage({ src: tp.afterQuizImage!, alt: "Schéma de synthèse : États de coloration et virage du Noir Ériochrome T (NET)" })}
                >
                  <img src={tp.afterQuizImage} alt="Schéma Dosage Complexométrique" className="w-full h-auto rounded-xl group-hover:scale-[1.01] transition-transform duration-300" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-sm text-slate-800 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider shadow-md border border-slate-100">🔎 Cliquez pour Agrandir</span>
                  </div>
                </div>
              </div>
            )}

            <Quiz questions={getScientificTPQuiz(tp.id, tp.quiz)} tpTitle={tp.title} />
          </div>
        </section>
      )}
    </motion.div>

    {/* Lightbox / Image Zoom Modal */}
    <AnimatePresence>
      {activeZoomedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveZoomedImage(null)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 cursor-zoom-out"
        >
          <button
            onClick={() => setActiveZoomedImage(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/25 active:scale-95 text-white rounded-full transition-all border border-white/20 shadow-2xl z-[110] cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>
          
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="max-w-5xl max-h-[85vh] overflow-hidden rounded-3xl bg-white p-2 border border-white/20 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-auto max-h-[72vh] rounded-2xl flex justify-center items-center bg-slate-50">
              <img
                src={activeZoomedImage.src}
                alt={activeZoomedImage.alt}
                className="w-auto h-auto max-w-full max-h-[70vh] rounded-xl object-contain select-none"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl flex items-center justify-between text-slate-800">
              <span className="font-bold text-sm px-2 text-slate-700">{activeZoomedImage.alt}</span>
              <button
                onClick={() => setActiveZoomedImage(null)}
                className="text-xs bg-indigo-600 hover:bg-indigo-750 font-bold uppercase text-white px-4 py-2 rounded-xl tracking-wider transition-all shadow-md cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
  );
};
