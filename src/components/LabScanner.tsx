import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  QrCode, 
  Camera, 
  Sparkles, 
  Scan, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  HelpCircle,
  Clock,
  ShieldAlert,
  Beaker,
  TestTube,
  CheckCircle2,
  Atom,
  ChevronRight,
  Info
} from 'lucide-react';
import { TP_DATA, SDS_DATA, SAFETY_PICTOGRAMS } from '../constants';

interface LabScannerProps {
  onSelectTP: (tp: any) => void;
  onSelectSDS: (sds: any) => void;
  userMode: 'student' | 'teacher';
}

export const LabScanner: React.FC<LabScannerProps> = ({ onSelectTP, onSelectSDS, userMode }) => {
  const [activeTab, setActiveTab] = useState<'scan' | 'gallery'>('scan');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [useMuted, setUseMuted] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scannerType, setScannerType] = useState<'all' | 'tp' | 'sds'>('all');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Play a beautiful synthesized laboratory scan successful beep sound!
  const playBeep = () => {
    if (useMuted) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const audioCtx = new AudioContext();
      
      // Dual-tone high-frequency positive chime
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      osc1.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.12); // E6 note
      
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(440, audioCtx.currentTime); // A4 note
      
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      
      osc1.start();
      osc2.start();
      osc1.stop(audioCtx.currentTime + 0.16);
      osc2.stop(audioCtx.currentTime + 0.16);
    } catch (e) {
      console.log('Web Audio blocked or unsupported');
    }
  };

  // Safe camera stream activation
  const startCamera = async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err) {
      console.warn('Camera access denied or unsupported inside parent iframe');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Trigger simulated successful scan
  const triggerScan = (type: 'tp' | 'sds', id: string, name: string) => {
    playBeep();
    setScanResult(`Détection de l'étiquette : ${name}`);
    
    setTimeout(() => {
      setScanResult(null);
      if (type === 'tp') {
        const found = TP_DATA.find(t => t.id === id);
        if (found) onSelectTP(found);
      } else {
        const found = SDS_DATA.find(s => s.id === id);
        if (found) onSelectSDS(found);
      }
    }, 900);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-[32px] border border-indigo-100/60 p-4 sm:p-8 shadow-xl max-w-4xl mx-auto overflow-hidden">
      {/* Upper header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-[10px] font-bold uppercase tracking-wider mb-2">
            <QrCode className="w-3.5 h-3.5 animate-pulse text-indigo-500" />
            <span>Optique mobile optimisée</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
            Lecteur de QR Codes de Laboratoire
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Reconstitution interactive pour flacons chimiques et fiches de manipulation sur paillasse.
          </p>
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200/50 self-start sm:self-auto shrink-0">
          <button
            onClick={() => { setActiveTab('scan'); stopCamera(); }}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'scan' ? 'bg-white text-indigo-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Scan className="w-4 h-4" />
            Viseur
          </button>
          <button
            onClick={() => { setActiveTab('gallery'); stopCamera(); }}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'gallery' ? 'bg-white text-indigo-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Beaker className="w-4 h-4" />
            Flacons & fiches
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'scan' ? (
          <motion.div
            key="scan-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* The holographic display camera frame */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="relative w-full aspect-[4/3] max-w-md sm:max-w-lg bg-slate-950 rounded-[32px] overflow-hidden border-4 border-slate-900 shadow-2xl flex flex-col justify-between p-6">
                
                {/* Simulated Lens background or actual browser stream */}
                {isCameraActive ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-15 bg-slate-950 pointer-events-none" />
                )}

                {/* Laser animation */}
                <div className="absolute inset-x-0 w-full h-1 bg-red-500 shadow-[0_0_12px_#ef4444] animate-bounce top-1/2 left-0 z-20 pointer-events-none" />

                {/* Simulated holographic status line */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900/80 border border-white/10 text-white font-mono text-[8px] uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>OPTIQUE ACTIVE</span>
                  </div>
                  <button 
                    onClick={() => setUseMuted(!useMuted)}
                    className="p-1 px-2 rounded bg-slate-900/80 hover:bg-slate-800/80 border border-white/10 text-white font-mono text-[8px]"
                  >
                    {useMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                </div>

                {/* Crosshairs & Guide Box for scanning */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-12">
                  <div className="w-48 h-48 border-2 border-dashed border-indigo-400/80 rounded-[24px] relative flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.25)]">
                    {/* Corners details */}
                    <div className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-indigo-500 rounded-tl-lg" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-indigo-500 rounded-tr-lg" />
                    <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-indigo-500 rounded-bl-lg" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-indigo-500 rounded-br-lg" />
                    
                    <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-200/90 bg-indigo-950/80 px-2 py-0.5 rounded">
                      Centrer le code
                    </span>
                  </div>
                </div>

                {/* Audio indicators & real camera trigger */}
                <div className="absolute bottom-4 inset-x-4 flex items-center justify-between z-10">
                  <button 
                    onClick={() => {
                      if (!isCameraActive) startCamera();
                      else stopCamera();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[9px] uppercase tracking-wider shadow"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    {isCameraActive ? "Désactiver Caméra" : "Activer Vraie Caméra"}
                  </button>

                  <span className="text-white/60 font-mono text-[8px] uppercase tracking-widest">
                    Zoom 1.0X
                  </span>
                </div>

                <AnimatePresence>
                  {scanResult && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute bottom-16 inset-x-6 bg-slate-900 border border-white/20 p-4 rounded-2xl flex items-center gap-3 shadow-xl z-30"
                    >
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                      <div>
                        <p className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest">Lecture réussie !</p>
                        <p className="text-white font-bold text-xs">{scanResult}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

            {/* Quick click simulation sidebar */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-3 rounded bg-indigo-600"></span>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Cliquez pour simuler un scan
                  </p>
                </div>

                <div className="flex gap-2 p-1 bg-slate-50 rounded-xl border border-slate-100">
                  <button
                    onClick={() => setScannerType('all')}
                    className={`flex-1 py-1 rounded-lg text-[9px] font-bold uppercase transition-all ${
                      scannerType === 'all' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Tout
                  </button>
                  <button
                    onClick={() => setScannerType('tp')}
                    className={`flex-1 py-1 rounded-lg text-[9px] font-bold uppercase transition-all ${
                      scannerType === 'tp' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Fiches TP
                  </button>
                  <button
                    onClick={() => setScannerType('sds')}
                    className={`flex-1 py-1 rounded-lg text-[9px] font-bold uppercase transition-all ${
                      scannerType === 'sds' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Flacons SDS
                  </button>
                </div>

                <div className="max-h-[220px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  {scannerType !== 'sds' && TP_DATA.map(tp => (
                    <button
                      key={`sim-tp-${tp.id}`}
                      onClick={() => triggerScan('tp', tp.id, tp.title)}
                      className="w-full p-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/40 rounded-xl text-left transition-all flex items-center justify-between group active:scale-95"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-indigo-100/80 text-indigo-700 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[8px] text-indigo-600 font-extrabold uppercase tracking-wide">Fiche TP {tp.level}</p>
                          <p className="text-xs font-bold text-slate-800 truncate">{tp.title}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </button>
                  ))}

                  {scannerType !== 'tp' && SDS_DATA.map(sds => (
                    <button
                      key={`sim-sds-${sds.id}`}
                      onClick={() => triggerScan('sds', sds.id, sds.name)}
                      className="w-full p-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/40 rounded-xl text-left transition-all flex items-center justify-between group active:scale-95"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-rose-100/80 text-rose-700 flex items-center justify-center shrink-0">
                          <Beaker className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[8px] text-rose-600 font-extrabold uppercase tracking-wide">ÉTIQUETTE BOTTLE SDS</p>
                          <p className="text-xs font-bold text-slate-800 truncate">{sds.name}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Informative advice */}
              <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/60 text-xs text-indigo-900 font-medium leading-relaxed">
                <p className="flex items-center gap-1.5 font-bold mb-1">
                  <Info className="w-4 h-4 text-indigo-600" />
                  <span>Scanner physique en classe</span>
                </p>
                Vous pouvez également scanner les QR codes imprimés sur vos fiches ou flacons de labo réels avec votre appareil photo habituel pour ouvrir automatiquement la ressource ici !
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="gallery-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Descriptive gallery with instant click buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-indigo-50/35 border border-indigo-150/40 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">Fiches TP</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Cliquez sur l'une des fiches ci-dessous pour l'ouvrir immédiatement et afficher son guide de manipulation et son quiz de sécurité.
                  </p>
                </div>
                <div className="grid gap-2 mt-4 text-left">
                  {TP_DATA.slice(0, 4).map(tp => (
                    <button
                      key={`gal-tp-${tp.id}`}
                      onClick={() => triggerScan('tp', tp.id, tp.title)}
                      className="text-xs font-bold text-indigo-700 hover:text-indigo-850 truncate py-1.5 border-b border-indigo-100 flex items-center justify-between"
                    >
                      <span>• {tp.title}</span>
                      <ChevronRight className="w-3 h-3 text-indigo-400" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/35 border border-emerald-150/40 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">Matériaux Chimiques SDS</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Révèle toutes les signalisations omiques, pictogrammes et règles de premiers secours indispensables pour vos bouteilles.
                  </p>
                </div>
                <div className="grid gap-2 mt-4 text-left">
                  {SDS_DATA.slice(0, 4).map(sds => (
                    <button
                      key={`gal-sds-${sds.id}`}
                      onClick={() => triggerScan('sds', sds.id, sds.name)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-850 truncate py-1.5 border-b border-emerald-100 flex items-center justify-between"
                    >
                      <span>• {sds.name}</span>
                      <ChevronRight className="w-3 h-3 text-emerald-400" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/35 border border-amber-150/40 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">Utilisation Pédagogique</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Les élèves scannent le QR collé sur le flacon avant la séance pratique pour obtenir l'habilitation et répondre au quiz obligatoire d'entrée en TP.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2 p-2 bg-amber-100/50 rounded-xl border border-amber-200/50">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                  <span className="text-[10px] uppercase font-bold text-amber-800">Pratique Recommandée</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
