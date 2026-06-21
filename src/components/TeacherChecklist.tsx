import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardCheck, AlertCircle, CheckCircle2, XCircle, Slash, FileSignature, Save, ListChecks, ArrowRight } from 'lucide-react';

const CHECKLIST_ITEMS = [
  "Tous les réactifs sont disponibles",
  "Le matériel est présent et en bon état",
  "Les EPI (blouse, gants, lunettes) sont à disposition",
  "Les pictogrammes de sécurité sont affichés",
  "Les fiches de données de sécurité (FDS) sont accessibles",
  "Le QR code du pack TP est généré et testé",
  "Les élèves ont scanné le QR et lu les consignes",
  "Tous les élèves ont réussi le mini-quiz",
  "Les solutions de neutralisation / premiers secours sont prêtes",
  "L’exutoire (eau, ventilation) fonctionne"
];

type Choice = 'Oui' | 'Non' | 'N/A';

export const TeacherChecklist: React.FC = () => {
  const [selections, setSelections] = useState<Record<number, Choice>>(
    CHECKLIST_ITEMS.reduce((acc, _, i) => ({ ...acc, [i]: 'N/A' }), {})
  );
  const [observations, setObservations] = useState('');
  const [status, setStatus] = useState<'Autorisé' | 'Reporté'>('Autorisé');
  const [motif, setMotif] = useState('');
  const [signature, setSignature] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  const handleChoice = (index: number, choice: Choice) => {
    setSelections(prev => ({ ...prev, [index]: choice }));
  };

  const handleValidate = () => {
    setShowSummary(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto py-6 px-4"
    >
      <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-900 p-4 sm:p-5 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-900 mx-auto mb-3 shadow-md"
          >
            <ClipboardCheck className="w-6 h-6" />
          </motion.div>
          <h1 className="text-base sm:text-lg font-black text-white tracking-tighter uppercase italic mb-1">Checklist Enseignant – Avant TP de chimie</h1>
          <p className="text-indigo-200 text-xs font-bold italic">Vérification obligatoire avant tout TP de chimie</p>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          {/* Items List */}
          <div className="space-y-3">
            {CHECKLIST_ITEMS.map((item, index) => (
              <div 
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-all group"
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-0">
                  <span className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-slate-900 font-bold italic leading-tight">{item}</span>
                </div>

                <div className="flex gap-1.5">
                  {(['Oui', 'Non', 'N/A'] as Choice[]).map((choice) => (
                    <button
                      key={choice}
                      onClick={() => handleChoice(index, choice)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                        selections[index] === choice
                          ? choice === 'Oui' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200' :
                            choice === 'Non' ? 'bg-rose-600 text-white shadow-md shadow-rose-200' :
                            'bg-slate-900 text-white'
                          : 'bg-white border border-slate-200 text-slate-400 hover:border-indigo-400'
                      }`}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t-2 border-slate-50">
            {/* Observations */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-indigo-900 pb-1">
                <AlertCircle className="w-4 h-4" /> Observations
              </label>
              <textarea 
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Remarques éventuelles sur l'état du matériel ou des réactifs..."
                className="w-full h-32 p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all font-bold text-slate-800 placeholder:text-slate-300"
              />
            </div>

            {/* Authorization Status */}
            <div className="space-y-6">
              <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-indigo-900 pb-1">
                <ListChecks className="w-4 h-4" /> Décision Finale
              </label>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setStatus('Autorisé')}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                    status === 'Autorisé' 
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-black' 
                    : 'bg-white border-slate-200 text-slate-400 hover:border-emerald-200'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6" /> TP AUTORISÉ
                  </span>
                  <div className={`w-6 h-6 rounded-full border-4 flex items-center justify-center transition-all ${status === 'Autorisé' ? 'border-emerald-600 bg-emerald-600' : 'border-slate-200'}`}>
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </button>
                <button
                  onClick={() => setStatus('Reporté')}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                    status === 'Reporté' 
                    ? 'bg-rose-50 border-rose-600 text-rose-900 font-black' 
                    : 'bg-white border-slate-200 text-slate-400 hover:border-rose-200'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <XCircle className="w-6 h-6" /> TP REPORTÉ
                  </span>
                  <div className={`w-6 h-6 rounded-full border-4 flex items-center justify-center transition-all ${status === 'Reporté' ? 'border-rose-600 bg-rose-600' : 'border-slate-200'}`}>
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </button>
              </div>

              <AnimatePresence>
                {status === 'Reporté' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <input 
                      type="text"
                      value={motif}
                      onChange={(e) => setMotif(e.target.value)}
                      placeholder="Indiquez le motif du report obligatoire..."
                      className="w-full p-4 bg-rose-50 border-2 border-rose-200 rounded-2xl outline-none focus:border-rose-600 transition-all font-bold text-rose-900 placeholder:text-rose-200"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Signature & Validation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-indigo-900 pb-1">
                <FileSignature className="w-4 h-4" /> Signature Enseignant
              </label>
              <input 
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Votre nom complet..."
                className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:border-indigo-600 transition-all font-black text-slate-900"
              />
            </div>
            <button
              onClick={handleValidate}
              className="group flex items-center justify-center gap-3 w-full p-5 bg-indigo-600 text-white rounded-3xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Save className="w-6 h-6" /> Valider et Enregistrer
            </button>
          </div>
        </div>
      </div>

      {/* Summary Modal */}
      <AnimatePresence>
        {showSummary && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSummary(false)}
              className="absolute inset-0 bg-indigo-950/80 backdrop-blur-md"
            ></motion.div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[40px] w-full max-w-2xl p-8 sm:p-12 shadow-2xl relative z-10 border-4 border-white/20"
            >
              <div className="flex flex-col items-center text-center mb-10">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-xl ${
                  status === 'Autorisé' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                }`}>
                  {status === 'Autorisé' ? <CheckCircle2 className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
                </div>
                <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">
                  Résumé de la Checklist
                </h3>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">Validation effectuée avec succès</p>
              </div>

              <div className="space-y-6 mb-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-6 rounded-3xl">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Statut Final</span>
                    <span className={`text-xl font-black uppercase italic ${status === 'Autorisé' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {status}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Items Validés</span>
                    <span className="text-xl font-black text-indigo-600 italic">
                      {Object.values(selections).filter(v => v === 'Oui').length} / {CHECKLIST_ITEMS.length}
                    </span>
                  </div>
                </div>

                <div className="bg-indigo-50 p-3.5 rounded-xl border border-indigo-100">
                  <div className="flex items-center gap-2 mb-1.5 text-indigo-900">
                    <FileSignature className="w-4 h-4" />
                    <span className="text-xs font-black uppercase tracking-widest">Signature</span>
                  </div>
                  <p className="text-sm font-black text-indigo-600 italic">{signature || "Non spécifié"}</p>
                </div>

                {status === 'Reporté' && (
                  <div className="bg-rose-50 p-3.5 rounded-xl border border-rose-100">
                    <div className="flex items-center gap-2 mb-1.5 text-rose-900">
                      <Slash className="w-4 h-4" />
                      <span className="text-xs font-black uppercase tracking-widest">Motif du Report</span>
                    </div>
                    <p className="text-rose-600 font-bold italic">{motif || "Aucun motif précisé"}</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowSummary(false)}
                className="flex items-center justify-center gap-2 w-full p-3.5 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest shadow-md hover:scale-[1.02] active:scale-95 transition-all"
              >
                Tout est correct <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
