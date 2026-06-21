import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  User, 
  Briefcase, 
  ShieldCheck, 
  KeyRound, 
  ArrowLeft, 
  ChevronRight,
  School,
  Lock
} from 'lucide-react';
import { MINISTERE_LOGO_AR } from '../constants';

export interface UserProfile {
  role: 'élève' | 'enseignant' | 'admin';
  firstName: string;
  lastName: string;
  studentClass?: string;
}

interface SecondStageFormProps {
  onSuccess: (profile: UserProfile) => void;
  onGoBack: () => void;
}

export function SecondStageForm({ onSuccess, onGoBack }: SecondStageFormProps) {
  const [role, setRole] = useState<'élève' | 'enseignant' | 'admin'>('élève');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentClass, setStudentClass] = useState('2ème Bac - PC');
  const [customClass, setCustomClass] = useState('');
  const [secondaryCode, setSecondaryCode] = useState('');
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const classesList = [
    'Tronc Commun',
    '1ère Bac - Sciences Exp',
    '1ère Bac - Sciences Maths',
    '2ème Bac - PC',
    '2ème Bac - SVT',
    '2ème Bac - SM',
    'Autre...'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorStatus(null);

    // Form validation
    if (!firstName.trim()) {
      setErrorStatus("Veuillez saisir votre prénom.");
      return;
    }
    if (!lastName.trim()) {
      setErrorStatus("Veuillez saisir votre nom.");
      return;
    }

    const activeClass = role === 'élève' 
      ? (studentClass === 'Autre...' ? customClass.trim() : studentClass) 
      : undefined;

    if (role === 'élève' && !activeClass) {
      setErrorStatus("Veuillez renseigner ou sélectionner votre classe.");
      return;
    }

    // Secondary Access Code validation
    let expectedCode = '';
    if (role === 'élève') expectedCode = '1111';
    else if (role === 'enseignant') expectedCode = '2222';
    else if (role === 'admin') expectedCode = '3333';

    if (secondaryCode.trim() !== expectedCode) {
      setErrorStatus(`Le code d'accès est incorrect pour le rôle ${role.toUpperCase()}.`);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      onSuccess({
        role,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        studentClass: activeClass
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Ambient glowing background circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none"></div>
      <div className="absolute top-10 left-10 w-[250px] h-[250px] rounded-full bg-violet-500/5 blur-[90px] pointer-events-none"></div>

      {/* Ministry Logo & Header */}
      <div className="mb-6 flex flex-col items-center text-center max-w-md z-10">
        <motion.img 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          src={MINISTERE_LOGO_AR}
          alt="Ministère de l'Éducation Nationale" 
          className="h-20 sm:h-24 w-auto object-contain mb-4 filter drop-shadow-[0_10px_10px_rgba(99,102,241,0.15)] brightness-110"
          referrerPolicy="no-referrer"
        />
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-lg font-black tracking-tight text-white font-display uppercase"
        >
          Configuration du Profil
        </motion.h2>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mt-1"
        >
          Étape 2 : Vos informations d'accès
        </motion.span>
      </div>

      {/* Profile Form Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-950/80 backdrop-blur-2xl border border-indigo-500/25 rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl relative z-10 transition-colors duration-300"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Action Header bar inside form */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
            <button
              type="button"
              onClick={onGoBack}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Retour
            </button>
            <span className="text-[10px] bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
              Identité académique
            </span>
          </div>

          {/* Role selector field */}
          <div>
            <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2.5">
              Sélectionnez votre fonction
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'élève', label: 'Élève', icon: GraduationCap },
                { id: 'enseignant', label: 'Enseignant', icon: School },
                { id: 'admin', label: 'Admin', icon: ShieldCheck }
              ].map((item) => {
                const IconComponent = item.icon;
                const isSelected = role === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setRole(item.id as any);
                      setErrorStatus(null);
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                      isSelected 
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/10' 
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                    <span className="text-xs font-bold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* First Name & Last Name in same grid */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                Prénom
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Prénom"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setErrorStatus(null);
                  }}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 text-white focus:ring-indigo-500/20 rounded-xl text-xs sm:text-sm focus:ring-4 outline-none transition-all placeholder:text-slate-650 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                Nom
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Nom"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setErrorStatus(null);
                  }}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 text-white focus:ring-indigo-500/20 rounded-xl text-xs sm:text-sm focus:ring-4 outline-none transition-all placeholder:text-slate-650 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Conditionally display student class selector */}
          {role === 'élève' && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                  Votre Classe
                </label>
                <select
                  value={studentClass}
                  onChange={(e) => {
                    setStudentClass(e.target.value);
                    setErrorStatus(null);
                  }}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 text-white focus:ring-indigo-500/20 rounded-xl text-xs sm:text-sm focus:ring-4 outline-none transition-all font-semibold"
                >
                  {classesList.map((cls) => (
                    <option key={cls} value={cls} className="bg-slate-950 text-white">
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              {studentClass === 'Autre...' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                    Saisir votre classe personnalisée
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 1ère Bac Sc Physique"
                    value={customClass}
                    onChange={(e) => {
                      setCustomClass(e.target.value);
                      setErrorStatus(null);
                    }}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 text-white focus:ring-indigo-500/20 rounded-xl text-xs sm:text-sm focus:ring-4 outline-none transition-all font-semibold"
                  />
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Secondary Code access validation */}
          <div>
            <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
              Code d'accès spécifique requis
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                placeholder={
                  role === 'élève' 
                    ? "Saisir le code d'accès élève" 
                    : role === 'enseignant' 
                      ? "Saisir le code d'accès enseignant" 
                      : "Saisir le code d'accès administrateur"
                }
                value={secondaryCode}
                onChange={(e) => {
                  setSecondaryCode(e.target.value);
                  setErrorStatus(null);
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 text-white focus:ring-indigo-500/20 rounded-xl text-xs sm:text-sm focus:ring-4 outline-none transition-all placeholder:text-slate-650 font-mono tracking-widest"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5 italic">
              Veuillez saisir le code d'accès sécurisé requis pour votre rôle.
            </p>
          </div>

          {/* Validation error state */}
          {errorStatus && (
            <div className="bg-rose-500/10 border border-rose-500/25 p-3 rounded-2xl text-rose-400 text-xs font-semibold animate-pulse">
              ⚠️ {errorStatus}
            </div>
          )}

          {/* Master Submit button */}
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
                Création du profil...
              </>
            ) : (
              <>
                Accéder au portail <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Footer copyright */}
      <div className="mt-8 text-center text-[9px] text-slate-500 z-10 max-w-xs leading-relaxed uppercase tracking-wider font-semibold">
        © 2026 Azzeddine Atibi — Physique-Chimie Expérimentale
      </div>
    </div>
  );
}
