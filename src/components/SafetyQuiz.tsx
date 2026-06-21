import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RefreshCw, CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Timer, PartyPopper, ArrowRight, Download, FileText } from 'lucide-react';
import { SAFETY_GRAND_QUIZ } from '../constants';
import confetti from 'canvas-confetti';
import { downloadQuizAsHTML } from '../utils/quizDownloader';

export const SafetyQuiz: React.FC = () => {
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);

  useEffect(() => {
    if (showResult && score === SAFETY_GRAND_QUIZ.length) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 40, spread: 360, ticks: 100, zIndex: 100 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 70 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [showResult, score]);

  useEffect(() => {
    if (showResult) {
      try {
        const rawProfile = sessionStorage.getItem('user_profile_data');
        if (rawProfile) {
          const profile = JSON.parse(rawProfile);
          const studentName = `${profile.firstName || 'Élève'} ${profile.lastName || 'Anonyme'}`;
          const classGroup = profile.studentClass || 'Classe Inconnue';
          
          const rawResults = localStorage.getItem('lab_quiz_results');
          let currentResults = [];
          if (rawResults) {
            currentResults = JSON.parse(rawResults);
          } else {
            currentResults = [
              { id: 'q1', studentName: 'Yassine El Amrani', classGroup: '2ème Bac SM-A', tpTitle: 'Titrage acide-base — NaOH / HCl', score: 9, totalQuestions: 10, date: '2026-05-28', passed: true },
              { id: 'q2', studentName: 'Amine Benjelloun', classGroup: '1ère Bac SX-1', tpTitle: 'Sécurité Générale du Labo', score: 10, totalQuestions: 10, date: '2026-05-29', passed: true },
              { id: 'q3', studentName: 'Fatima-Zahra Alaoui', classGroup: '2ème Bac SM-A', tpTitle: 'Titrage acide-base — NaOH / HCl', score: 5, totalQuestions: 10, date: '2026-05-28', passed: false },
              { id: 'q4', studentName: 'Salma El Fassi', classGroup: 'Tronc Commun Sc-2', tpTitle: 'Quiz SGH - Pictogrammes', score: 8, totalQuestions: 10, date: '2026-05-30', passed: true },
              { id: 'q5', studentName: 'Omar Bouazzaoui', classGroup: '1ère Bac SX-2', tpTitle: 'Extraction de la caféine', score: 4, totalQuestions: 10, date: '2026-05-30', passed: false },
              { id: 'q6', studentName: 'Sofia Bensouda', classGroup: '2ème Bac SM-B', tpTitle: 'Suivi cinétique par spectrophotométrie', score: 9, totalQuestions: 10, date: '2026-05-31', passed: true }
            ];
          }

          const newResult = {
            id: `q_real_${Date.now()}`,
            studentName: studentName,
            classGroup: classGroup,
            tpTitle: "Grand Quiz de Sécurité",
            score: score,
            totalQuestions: SAFETY_GRAND_QUIZ.length,
            date: new Date().toISOString().split('T')[0],
            passed: score >= (SAFETY_GRAND_QUIZ.length * 0.6)
          };

          currentResults.unshift(newResult);
          localStorage.setItem('lab_quiz_results', JSON.stringify(currentResults));
        }
      } catch (err) {
        console.error("Error saving safety quiz result to localStorage:", err);
      }
    }
  }, [showResult, score]);

  const handleStartQuiz = () => {
    setIsQuizActive(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setUserAnswer(null);
  };

  const handleAnswer = (index: number) => {
    if (userAnswer !== null) return;
    
    setUserAnswer(index);
    if (index === SAFETY_GRAND_QUIZ[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < SAFETY_GRAND_QUIZ.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setIsQuizActive(false);
    setUserAnswer(null);
  };

  const currentQuestion = SAFETY_GRAND_QUIZ[currentQuestionIndex];

  if (!isQuizActive) {
    return (
      <div className="bg-indigo-900 rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-200">
              <ShieldCheck className="w-3.5 h-3.5" /> Certification de Sécurité
            </div>
            <h3 className="text-lg sm:text-2xl font-serif font-bold leading-tight">
              Testez vos connaissances en sécurité laboratoire
            </h3>
            <p className="text-indigo-100/70 text-sm max-w-xl">
              Relevez le défi de {SAFETY_GRAND_QUIZ.length} questions sur les pictogrammes, les dangers chimiques et les protocoles de protection au laboratoire.
            </p>
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-2 text-indigo-200">
                <Timer className="w-4 h-4" /> ~10 minutes
              </div>
              <div className="flex items-center gap-2 text-indigo-200">
                <AlertTriangle className="w-4 h-4" /> Niveau : Complet
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                id="btn-safety-quiz-start"
                onClick={handleStartQuiz}
                className="px-6 py-3 bg-white text-indigo-900 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-indigo-50 transition-all shadow-md active:scale-95"
              >
                Commencer le Grand Quiz
              </button>
              <button
                onClick={() => downloadQuizAsHTML(SAFETY_GRAND_QUIZ, { includeAnswers: false, tpTitle: "Grand Quiz de Sécurité" })}
                className="px-4 py-3 bg-indigo-800 hover:bg-indigo-750 text-indigo-100 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                title="Télécharger le sujet vide"
              >
                <Download className="w-3.5 h-3.5" /> Sujet (.HTML)
              </button>
              <button
                onClick={() => downloadQuizAsHTML(SAFETY_GRAND_QUIZ, { includeAnswers: true, tpTitle: "Grand Quiz de Sécurité" })}
                className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                title="Télécharger le corrigé complet"
              >
                <FileText className="w-3.5 h-3.5" /> Corrigé (.HTML)
              </button>
            </div>
          </div>
          <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center border border-white/10 animate-pulse">
            <Trophy className="w-16 h-16 text-indigo-400 opacity-40" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="quiz-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden"
          >
            <div className="p-8 bg-indigo-600 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-80">Challenge de Sécurité</p>
                <h3 className="text-xl font-bold">Certification Labo</h3>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => downloadQuizAsHTML(SAFETY_GRAND_QUIZ, { includeAnswers: false, tpTitle: "Grand Quiz de Sécurité" })}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold text-white bg-indigo-700/50 border border-indigo-500/30 hover:bg-indigo-500/40 transition-colors cursor-pointer"
                    title="Télécharger le sujet"
                  >
                    <Download className="w-3.5 h-3.5" /> Sujet
                  </button>
                  <button
                    onClick={() => downloadQuizAsHTML(SAFETY_GRAND_QUIZ, { includeAnswers: true, tpTitle: "Grand Quiz de Sécurité" })}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold text-white bg-indigo-800 border border-indigo-500/40 hover:bg-indigo-700 transition-colors cursor-pointer"
                    title="Télécharger le corrigé"
                  >
                    <FileText className="w-3.5 h-3.5" /> Corrigé
                  </button>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-xl text-xs font-bold font-mono">
                  QUESTION {currentQuestionIndex + 1} / {SAFETY_GRAND_QUIZ.length}
                </div>
              </div>
            </div>

            <div className="p-8 sm:p-12 min-h-[400px] flex flex-col justify-center">
              {/* Type Badge */}
              <div className="mb-4">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
                  {currentQuestion.type === 'qcm' && 'ℹ️ Questionnaire (QCM)'}
                  {currentQuestion.type === 'vrai_faux' && '⚖️ Vrai ou Faux'}
                  {currentQuestion.type === 'texte_a_trous' && '✏️ Complétez la phrase'}
                </span>
              </div>

              {/* Display Pictogram Image if available */}
              {currentQuestion.pictogramUrl && (
                <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center max-w-xs mx-auto">
                  <img
                    src={currentQuestion.pictogramUrl}
                    alt={currentQuestion.pictogramName || "Pictogramme"}
                    className="h-32 w-32 object-contain"
                  />
                  {currentQuestion.pictogramName && (
                    <span className="text-xs text-slate-450 font-mono mt-2 font-bold">{currentQuestion.pictogramName}</span>
                  )}
                </div>
              )}

              <h4 className="text-2xl font-serif text-slate-900 mb-8 leading-tight">
                {currentQuestion.question}
              </h4>
              
              <div className="grid grid-cols-1 gap-4">
                {currentQuestion.options.map((option, idx) => {
                  const isCorrectAnswer = idx === currentQuestion.correctAnswer;
                  const isUserSelection = userAnswer === idx;

                  let optionStyle = 'bg-slate-50 hover:bg-indigo-50 border-slate-100 hover:border-indigo-200 text-slate-700';
                  if (userAnswer !== null) {
                    if (isCorrectAnswer) {
                      optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800';
                    } else if (isUserSelection) {
                      optionStyle = 'bg-rose-50 border-rose-500 text-rose-800';
                    } else {
                      optionStyle = 'bg-slate-50 border-slate-100 opacity-50';
                    }
                  }

                  return (
                    <button
                      id={`opt-btn-${idx}`}
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={userAnswer !== null}
                      className={`w-full p-6 rounded-2xl text-left text-lg transition-all flex items-center justify-between border-2 ${optionStyle}`}
                    >
                      <span className="font-medium">{option}</span>
                      {userAnswer !== null && isCorrectAnswer && (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 ml-3" />
                      )}
                      {userAnswer !== null && isUserSelection && !isCorrectAnswer && (
                        <XCircle className="w-6 h-6 text-rose-500 shrink-0 ml-3" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Answer Explanation Display */}
              {userAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-8 p-6 rounded-2xl border ${
                    userAnswer === currentQuestion.correctAnswer
                      ? 'bg-emerald-50/50 border-emerald-100 text-emerald-950'
                      : 'bg-rose-50/50 border-rose-100 text-rose-950'
                  }`}
                >
                  <h5 className="font-bold mb-2 flex items-center gap-2">
                    {userAnswer === currentQuestion.correctAnswer ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Bonne réponse ! Explication :</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-600" />
                        <span>Mauvaise réponse. Explication :</span>
                      </>
                    )}
                  </h5>
                  <p className="text-sm leading-relaxed">{currentQuestion.explanation}</p>

                  <div className="mt-6 flex justify-end">
                    <button
                      id="btn-safety-quiz-next"
                      onClick={handleNext}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 active:scale-95"
                    >
                      <span>
                        {currentQuestionIndex < SAFETY_GRAND_QUIZ.length - 1 ? 'Question suivante' : 'Voir mon résultat'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="p-8 border-t border-slate-100 flex items-center justify-between">
              <button
                id="btn-quit-quiz"
                onClick={resetQuiz}
                className="text-sm font-bold text-slate-400 hover:text-rose-500 transition-colors"
              >
                Quitter le test
              </button>
              <div className="flex-1 max-w-sm mx-8 h-3 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestionIndex + 1) / SAFETY_GRAND_QUIZ.length) * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-[3rem] p-12 sm:p-20 shadow-2xl text-center flex flex-col items-center space-y-10 relative overflow-hidden transition-all duration-700 ${
              score === SAFETY_GRAND_QUIZ.length 
                ? 'bg-slate-900 border-4 border-indigo-500 shadow-indigo-500/50 scale-105' 
                : 'bg-white border border-slate-100'
            }`}
          >
            {score === SAFETY_GRAND_QUIZ.length && (
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
                <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-500 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>
              </div>
            )}

            <div className="relative z-10 space-y-8 flex flex-col items-center">
              <motion.div 
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", damping: 10, stiffness: 100 }}
                className={`w-40 h-40 rounded-full flex items-center justify-center shadow-2xl ring-8 ${
                  score === SAFETY_GRAND_QUIZ.length 
                    ? 'bg-white text-indigo-900 ring-indigo-500/30' 
                    : score >= SAFETY_GRAND_QUIZ.length * 0.7 
                      ? 'bg-emerald-100 text-emerald-600 ring-emerald-50' 
                      : 'bg-amber-100 text-amber-600 ring-amber-50'
                }`}
              >
                {score === SAFETY_GRAND_QUIZ.length ? (
                  <PartyPopper className="w-24 h-24" />
                ) : (
                  <Trophy className="w-24 h-24" />
                )}
              </motion.div>
              
              <div className="space-y-3">
                {score === SAFETY_GRAND_QUIZ.length ? (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-5xl font-black text-white tracking-tighter uppercase">Extraordinaire !</h3>
                    <h3 className="text-6xl font-black text-indigo-400 tracking-widest uppercase">Bravo !</h3>
                  </div>
                ) : (
                  <>
                    <h3 className="text-4xl font-bold text-slate-900 leading-tight">Test Terminé !</h3>
                    <p className="text-slate-400 text-lg font-bold">Votre score total de sécurité</p>
                  </>
                )}
              </div>

              <div className={`text-9xl font-black tracking-tighter ${score === SAFETY_GRAND_QUIZ.length ? 'text-white' : 'text-indigo-600'}`}>
                {score} <span className={`text-4xl font-normal ${score === SAFETY_GRAND_QUIZ.length ? 'text-indigo-400' : 'text-slate-300'}`}>/ {SAFETY_GRAND_QUIZ.length}</span>
              </div>

              <div className={`max-w-md p-8 rounded-3xl border-2 leading-relaxed text-lg font-bold italic shadow-inner ${
                score === SAFETY_GRAND_QUIZ.length 
                  ? 'bg-white/10 border-white/20 text-indigo-100' 
                  : 'bg-slate-50 border-slate-100 text-slate-700'
              }`}>
                {score === SAFETY_GRAND_QUIZ.length
                  ? "INCROYABLE ! Vous avez un sens aigu de la sécurité. Vous êtes désormais officiellement certifié EXPERT Labo. BRAVO !"
                  : score >= SAFETY_GRAND_QUIZ.length * 0.9
                  ? "Excellent ! Vous êtes un expert en sécurité laboratoire. Vous pouvez travailler sereinement."
                  : score >= SAFETY_GRAND_QUIZ.length * 0.6
                  ? "Bon résultat ! La plupart des concepts sont acquis, mais une révision serait bénéfique."
                  : "Attention ! Vos connaissances en sécurité sont insuffisantes. Relisez attentivement les guides."}
              </div>

              <div className="flex flex-wrap justify-center gap-6 pt-4">
                <button
                  id="btn-safety-quiz-restart"
                  onClick={handleStartQuiz}
                  className={`flex items-center gap-3 px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 ${
                    score === SAFETY_GRAND_QUIZ.length 
                      ? 'bg-white text-indigo-900 hover:bg-indigo-50' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  <RefreshCw className="w-6 h-6 font-black" /> Recommencer
                </button>
                <button
                  onClick={() => downloadQuizAsHTML(SAFETY_GRAND_QUIZ, { includeAnswers: false, tpTitle: "Grand Quiz de Sécurité" })}
                  className={`flex items-center gap-3 px-8 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 ${
                    score === SAFETY_GRAND_QUIZ.length 
                      ? 'bg-slate-800 text-slate-100 hover:bg-slate-700' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Download className="w-6 h-6" /> Sujet
                </button>
                <button
                  onClick={() => downloadQuizAsHTML(SAFETY_GRAND_QUIZ, { includeAnswers: true, tpTitle: "Grand Quiz de Sécurité" })}
                  className={`flex items-center gap-3 px-8 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 ${
                    score === SAFETY_GRAND_QUIZ.length 
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                      : 'bg-emerald-500 text-white hover:bg-emerald-600'
                  }`}
                >
                  <FileText className="w-6 h-6" /> Corrigé
                </button>
                <button
                  id="btn-safety-quiz-back"
                  onClick={resetQuiz}
                  className={`px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all ${
                    score === SAFETY_GRAND_QUIZ.length 
                      ? 'bg-white/10 text-white hover:bg-white/20' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Retour
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
