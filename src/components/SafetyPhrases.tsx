import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import { SAFETY_H_PHRASES, SAFETY_P_PHRASES } from '../constants';

const SafetyPhrases: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'H' | 'P'>('H');

  const filteredH = SAFETY_H_PHRASES.filter(p => 
    p.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredP = SAFETY_P_PHRASES.filter(p => 
    p.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-sm border border-slate-100" id="safety-phrases">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Mentions de Danger et Prudence</h2>
          <p className="text-slate-600">Consultez la liste complète des phrases H (Dangers) et P (Précautions).</p>
        </div>

        <div className="relative group max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Rechercher par code (ex: H314) ou mot-clé..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2 mb-8 p-1 bg-slate-100 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('H')}
          className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
            activeTab === 'H' 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Phrases H (Dangers)
        </button>
        <button
          onClick={() => setActiveTab('P')}
          className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
            activeTab === 'P' 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Phrases P (Prudence)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {(activeTab === 'H' ? filteredH : filteredP).map((phrase) => (
            <motion.div
              key={phrase.code}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`p-5 rounded-2xl border transition-all hover:shadow-md ${
                activeTab === 'H' 
                  ? 'bg-red-50/30 border-red-100 hover:border-red-200' 
                  : 'bg-emerald-50/30 border-emerald-100 hover:border-emerald-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg shrink-0 ${
                  activeTab === 'H' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  {activeTab === 'H' ? <AlertTriangle className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                </div>
                <div>
                  <span className={`text-sm font-bold uppercase tracking-wider mb-1 block ${
                    activeTab === 'H' ? 'text-red-500' : 'text-emerald-600'
                  }`}>
                    {phrase.code}
                  </span>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {phrase.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {(activeTab === 'H' ? filteredH : filteredP).length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
          <Info className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Aucune phrase trouvée pour "{searchTerm}"</p>
          <button 
            onClick={() => setSearchTerm('')}
            className="mt-4 text-indigo-600 font-semibold hover:underline"
          >
            Réinitialiser la recherche
          </button>
        </div>
      )}

      <div className="mt-12 p-6 bg-slate-50 rounded-3xl border border-slate-200 flex flex-col sm:flex-row items-center gap-6">
        <div className="p-4 bg-white rounded-2xl shadow-sm italic text-indigo-600 font-serif text-3xl font-bold">
          !
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-1">Note Importante</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            Les mentions de danger (H) décrivent la nature des dangers d'une substance. 
            Les conseils de prudence (P) décrivent les mesures recommandées pour minimiser ou prévenir les effets néfastes. 
            Référez-vous toujours à la FDS (Fiche de Données de Sécurité) spécifique d'un produit.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SafetyPhrases;
