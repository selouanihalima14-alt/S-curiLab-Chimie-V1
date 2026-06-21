import React from 'react';
import { motion } from 'motion/react';
import { Shield, AlertTriangle, AlertCircle, HeartPulse, CheckCircle2 } from 'lucide-react';
import { SAFETY_PICTOGRAMS, FIRST_AID_RULES, GENERAL_LAB_RULES } from '../constants';
import { SafetyGuide } from './SafetyGuide';
import { SafetyQuiz } from './SafetyQuiz';
import SafetyPhrases from './SafetyPhrases';
import { EPISection } from './EPISection';
import LabQRCodes from './LabQRCodes';

export const SafetyRoom: React.FC = () => {
  return (
    <div className="space-y-12 pb-12">
      {/* 1. Introduction & GHS */}
      <section>
        <div className="flex flex-col gap-2 mb-6">
          <h2 className="text-xl font-serif text-slate-900 tracking-tight">Salle de Sécurité</h2>
          <p className="text-slate-500 text-xs max-w-xl leading-relaxed">
            La sécurité est la priorité absolue dans tout laboratoire de chimie. 
            Comprendre le Système Général Harmonisé (GHS) et respecter les règles fondamentales 
            est essentiel pour prévenir les accidents.
          </p>
        </div>

        <SafetyGuide />
      </section>

      {/* 2. Laboratory Rules */}
      <section className="bg-slate-900 rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-base font-bold tracking-tight mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-indigo-400" />
              Règles Générales du Laboratoire
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {GENERAL_LAB_RULES.map((rule, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-3 p-3 bg-white/5 border border-white/10 rounded-xl group hover:bg-white/10 transition-all cursor-default"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs font-medium text-slate-300 leading-snug group-hover:text-white transition-colors">
                    {rule}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="relative mt-4 lg:mt-0 max-w-[200px] sm:max-w-[240px] mx-auto w-full">
            <div className="aspect-square bg-white/5 rounded-full border border-white/10 flex items-center justify-center p-4">
              <div className="aspect-square w-full bg-white/10 rounded-full border border-white/20 flex items-center justify-center p-4">
                <Shield className="w-16 h-16 text-indigo-400/20" />
              </div>
            </div>
            {/* Floating tags */}
            <div className="absolute top-0 left-0 bg-rose-500 text-white px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest -rotate-6 shadow-md">
              Prudence
            </div>
            <div className="absolute bottom-6 right-0 bg-emerald-500 text-white px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest rotate-3 shadow-md">
              Vigilance
            </div>
          </div>
        </div>
      </section>

      {/* 3. First Aid */}
      <section>
        <div className="flex items-center gap-2.5 mb-6">
          <HeartPulse className="w-6 h-6 text-rose-500" />
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Premiers Secours</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FIRST_AID_RULES.map((rule, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border ${
                rule.type === 'danger' ? 'bg-rose-50/80 border-rose-100' : 'bg-amber-50/80 border-amber-100'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${
                rule.type === 'danger' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white'
              }`}>
                {rule.type === 'danger' ? <AlertTriangle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              </div>
              <h4 className={`text-sm font-bold mb-3 ${
                rule.type === 'danger' ? 'text-rose-900' : 'text-amber-900'
              }`}>
                {rule.title}
              </h4>
              <ul className="space-y-2">
                {rule.steps.map((step, j) => (
                  <li key={j} className="flex gap-1.5 text-xs leading-relaxed text-slate-700">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                      rule.type === 'danger' ? 'bg-rose-400' : 'bg-amber-400'
                    }`}></div>
                    {step}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. H & P Phrases */}
      <SafetyPhrases />

      {/* 4.5. Équipements de Protection Individuelle (EPI) */}
      <EPISection />

      {/* 5. Lab QR Codes */}
      <LabQRCodes />

      {/* Grand Quiz de Certification */}
      <section>
        <SafetyQuiz />
      </section>
    </div>
  );
};
