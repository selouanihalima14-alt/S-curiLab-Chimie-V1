import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Info, ShieldCheck, ChevronRight, AlertTriangle } from 'lucide-react';
import { SAFETY_PICTOGRAMS } from '../constants';

export const SafetyGuide: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto py-12 px-4"
    >
    <div className="text-center mb-10 px-4 bg-indigo-900 py-8 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-14 h-14 bg-rose-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-xl ring-2 ring-rose-350"
        >
          <ShieldAlert className="w-8 h-8" />
        </motion.div>
        <h1 className="text-2xl sm:text-4xl font-black text-white mb-4 tracking-tighter uppercase italic">Guide Sécurité</h1>
        <p className="text-sm sm:text-lg text-rose-100 max-w-xl mx-auto font-black leading-relaxed italic border-b-2 border-rose-500 pb-2 inline-block">
          La compréhension des pictogrammes est obligatoire.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAFETY_PICTOGRAMS.map((pic, index) => (
          <motion.div
            key={pic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-md hover:shadow-lg hover:border-indigo-500 transition-all duration-300 flex flex-col ring-offset-2 hover:ring-2 ring-indigo-50"
          >
            <div className="bg-slate-50 rounded-xl p-4 mb-4 flex items-center justify-center group-hover:bg-white transition-colors duration-300 border border-slate-200 group-hover:border-indigo-400 relative overflow-hidden shadow-inner">
              <div className="absolute top-2 right-2 bg-slate-900 text-white text-[10px] font-black px-2.5 py-1 rounded-lg opacity-100 uppercase tracking-widest shadow-md z-10">
                {pic.code}
              </div>
              <img 
                src={pic.image} 
                alt={pic.name} 
                className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-indigo-900 mb-2 group-hover:text-indigo-600 transition-colors uppercase tracking-widest leading-none italic">
                {pic.name}
              </h3>
              <p className="text-sm sm:text-base text-slate-900 leading-tight font-black mb-4 min-h-[40px] italic">
                {pic.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-black text-rose-600 uppercase tracking-widest">
                  <AlertTriangle className="w-3 h-3" /> Principaux Dangers
                </div>
                <ul className="space-y-1">
                  {pic.hazards.map((hazard, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5 leading-relaxed">
                      <ChevronRight className="w-3 h-3 text-indigo-400 mt-0.5 flex-shrink-0" />
                      {hazard}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-md shadow-indigo-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold tracking-tight">Règles d'Or au Labo</h2>
          </div>
          <ul className="space-y-3">
            {[
              "Toujours porter sa blouse boutonnée et des lunettes de protection.",
              "Lire l'étiquette et la fiche de sécurité (FDS) avant utilisation.",
              "Manipuler sous hotte ventilée les produits volatils ou toxiques.",
              "Ne jamais boire, manger ou fumer dans le laboratoire.",
              "Reporter immédiatement tout accident ou bris de verrerie."
            ].map((rule, i) => (
              <li key={i} className="flex gap-2.5 text-indigo-100 text-xs leading-relaxed">
                <span className="w-4.5 h-4.5 rounded-full bg-white/20 flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-md shadow-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-lg">
                <Info className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-bold tracking-tight">Le Système GHS</h2>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Le SGH (Système Général Harmonisé) est un système international de classification et d'étiquetage des produits chimiques. Il permet de standardiser les informations de sécurité dans le monde entier.
            </p>
          </div>
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
            <p className="text-[10px] italic text-slate-500">
              Note : Ces informations sont données à titre indicatif pour l'enseignement. Référez-vous toujours aux consignes de votre professeur et aux étiquettes réelles des produits.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
