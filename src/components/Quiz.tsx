import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, RefreshCcw, ArrowRight, Trophy, PartyPopper, Download, FileText } from 'lucide-react';
import { QuizQuestion } from '../constants';
import confetti from 'canvas-confetti';
import { renderScienceText } from '../utils/scienceRenderer';
import { downloadQuizAsHTML } from '../utils/quizDownloader';

interface QuizProps {
  questions: QuizQuestion[];
  tpTitle: string;
}

export const Quiz: React.FC<QuizProps> = ({ questions, tpTitle }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (showResults && score === questions.length) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [showResults, score, questions.length]);

  useEffect(() => {
    if (showResults) {
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
            tpTitle: tpTitle || "Quiz de validation",
            score: score,
            totalQuestions: questions.length,
            date: new Date().toISOString().split('T')[0],
            passed: score >= (questions.length * 0.6)
          };

          currentResults.unshift(newResult);
          localStorage.setItem('lab_quiz_results', JSON.stringify(currentResults));
        }
      } catch (err) {
        console.error("Error saving quiz result to localStorage:", err);
      }
    }
  }, [showResults, score, questions.length, tpTitle]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (showResults) {
    const isPerfect = score === questions.length;
    return (
      <div className={`rounded-3xl p-10 text-center border-4 transition-all duration-500 overflow-hidden relative ${
        isPerfect ? 'bg-indigo-900 border-indigo-400 text-white shadow-2xl scale-105' : 'bg-slate-50 border-slate-100 text-slate-800'
      }`}>
        {isPerfect && (
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>
        )}

        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl font-black shadow-xl ring-4 ${
            isPerfect ? 'bg-white text-indigo-900 ring-indigo-500' : 'bg-indigo-600 text-white ring-indigo-100'
          }`}>
            {score}/{questions.length}
          </div>
          
          {isPerfect ? (
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-4xl font-black tracking-tighter uppercase">Félicitations !</h3>
                <h3 className="text-5xl font-black tracking-widest text-indigo-300 uppercase">Bravo !</h3>
              </div>
              
              <div className="flex items-center justify-center gap-4 text-indigo-400">
                <Trophy className="w-8 h-8" />
                <PartyPopper className="w-8 h-8" />
                <Trophy className="w-8 h-8" />
              </div>

              <p className="text-xl font-bold text-indigo-100 max-w-sm mx-auto leading-relaxed">
                Excellent ! Vous avez répondu correctement à toutes les questions. C'est un sans-faute remarquable !
              </p>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold mb-2">Quiz terminé !</h3>
              <p className="text-slate-500 mb-8 font-medium italic">
                {score >= questions.length / 2 ? 'Bon travail ! Continuez à réviser.' : 
                 'N\'hésitez pas à relire le protocole avant de recommencer.'}
              </p>
            </>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button 
              onClick={resetQuiz}
              className={`flex items-center gap-2 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
                isPerfect ? 'bg-white text-indigo-900 hover:bg-slate-100' : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <RefreshCcw className="w-4 h-4 font-black" /> Recommencer
            </button>
            <button
              onClick={() => downloadQuizAsHTML(questions, { includeAnswers: false, tpTitle: tpTitle || "Quiz de validation scientifique" })}
              className={`flex items-center gap-2 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
                isPerfect 
                  ? 'bg-indigo-800 text-indigo-100 border border-indigo-700 hover:bg-indigo-950' 
                  : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
              }`}
            >
              <Download className="w-4 h-4" /> Sujet (.HTML)
            </button>
            <button
              onClick={() => downloadQuizAsHTML(questions, { includeAnswers: true, tpTitle: tpTitle || "Quiz de validation scientifique" })}
              className={`flex items-center gap-2 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
                isPerfect 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}
            >
              <FileText className="w-4 h-4" /> Corrigé (.HTML)
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 sm:p-8 shadow-md relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
        <div>
          <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600">
            {tpTitle ? "Quiz de validation scientifique" : "Quiz de validation sécurité"}
          </h4>
          <span className="text-xs font-bold text-slate-400">Question {currentQuestionIndex + 1} sur {questions.length}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => downloadQuizAsHTML(questions, { includeAnswers: false, tpTitle: tpTitle || "Quiz de validation scientifique" })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors"
            title="Télécharger le sujet vide"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" /> Sujet (.HTML/PDF)
          </button>
          <button
            onClick={() => downloadQuizAsHTML(questions, { includeAnswers: true, tpTitle: tpTitle || "Quiz de validation scientifique" })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors"
            title="Télécharger le corrigé complet"
          >
            <FileText className="w-3.5 h-3.5" /> Corrigé (.HTML/PDF)
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-800 mb-6 font-sans">{renderScienceText(currentQuestion.question)}</h3>

      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option, index) => {
          let stateClass = "border-slate-200 hover:border-indigo-300";
          const isCorrect = index === currentQuestion.correctAnswer;
          
          if (isAnswered) {
             if (isCorrect) stateClass = "border-emerald-500 bg-emerald-50 text-emerald-700 font-bold";
             else if (index === selectedOption) stateClass = "border-rose-500 bg-rose-50 text-rose-700";
             else stateClass = "border-slate-200 opacity-50";
          } else if (selectedOption === index) {
            stateClass = "border-indigo-600 bg-indigo-50 text-indigo-700";
          }

          return (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium flex items-center justify-between group ${stateClass}`}
            >
              <span>{renderScienceText(option)}</span>
              {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
              {isAnswered && index === selectedOption && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
            </button>
          );
        })}
      </div>

      {isAnswered && currentQuestion.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 mb-6 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-900 text-sm font-medium leading-relaxed"
        >
          <span className="font-extrabold uppercase tracking-wider text-[10px] block text-indigo-700 mb-1">💡 Explication</span>
          {renderScienceText(currentQuestion.explanation)}
        </motion.div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
            isAnswered ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          {currentQuestionIndex === questions.length - 1 ? 'Voir les résultats' : 'Suivant'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

};
