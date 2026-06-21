import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RotateCcw, 
  Plus, 
  TrendingUp, 
  Activity, 
  Thermometer,
  Zap,
  CheckCircle,
  Beaker,
  FlaskConical,
  Gauge
} from 'lucide-react';

interface TitrationPoint {
  volume: number;
  pH: number;
}

export const TitrationSimulation: React.FC = () => {
  // Volume of NaOH added in mL (from 0.0 to 20.0 mL)
  const [addedVolume, setAddedVolume] = useState<number>(0);
  // Stirring speed level: 0 (off), 1 (slow), 2 (medium), 3 (fast)
  const [stirringSpeed, setStirringSpeed] = useState<number>(2);
  // Flow animation state
  const [isPouring, setIsPouring] = useState<boolean>(false);
  // History of points for the live plot
  const [history, setHistory] = useState<TitrationPoint[]>([{ volume: 0, pH: 1.1 }]);

  // Exact pH calculations mimicking 10.0 mL of 0.1 M HCl being titrated by 0.1 M NaOH
  const calculatedPH = useMemo(() => {
    const V = addedVolume;
    if (V < 10) {
      // Before equivalence
      const hPlus = (0.1 * 10 - 0.1 * V) / (10 + V);
      // Clamp to ensure starting at ~1.10 and sliding smoothly
      const ph = -Math.log10(Math.max(hPlus, 1e-7));
      return Number(Math.min(Math.max(ph, 1.1), 7.0).toFixed(2));
    } else if (V === 10) {
      return 7.00;
    } else {
      // After equivalence
      const ohMinus = (0.1 * (V - 10)) / (10 + V);
      const poh = -Math.log10(Math.max(ohMinus, 1e-7));
      const ph = 14 - poh;
      return Number(Math.max(Math.min(ph, 12.7), 7.0).toFixed(2));
    }
  }, [addedVolume]);

  // Exact temperature calculation in °C (neutralization of strong acid-base is exothermic!)
  const calculatedTemp = useMemo(() => {
    const V = addedVolume;
    if (V <= 10) {
      // Temp raises linearly with neutralization
      return Number((25.1 + (1.1 * (V / 10))).toFixed(1));
    } else {
      // Temp drops slowly due to dilution with room temp titrant (approx. 24.5 °C)
      return Number((26.2 - (0.4 * ((V - 10) / 10))).toFixed(1));
    }
  }, [addedVolume]);

  // Record history points for graph rendering
  useEffect(() => {
    const newHistory: TitrationPoint[] = [];
    // Generate incremental points to draw a clean curve
    const steps = Math.floor(addedVolume * 10); // 0.1 mL steps
    for (let i = 0; i <= steps; i++) {
      const v = i / 10;
      let ph = 1.1;
      if (v < 10) {
        const hPlus = (0.1 * 10 - 0.1 * v) / (10 + v);
        ph = -Math.log10(Math.max(hPlus, 1e-7));
        ph = Math.min(Math.max(ph, 1.1), 7.0);
      } else if (v === 10) {
        ph = 7.0;
      } else {
        const ohMinus = (0.1 * (v - 10)) / (10 + v);
        ph = 14 + Math.log10(Math.max(ohMinus, 1e-7));
        ph = Math.max(Math.min(ph, 12.7), 7.0);
      }
      newHistory.push({ volume: v, pH: Number(ph.toFixed(2)) });
    }
    
    // Add current exact point if not already added
    if (addedVolume > 0 && (newHistory.length === 0 || newHistory[newHistory.length - 1].volume !== addedVolume)) {
      newHistory.push({ volume: addedVolume, pH: calculatedPH });
    } else if (addedVolume === 0) {
      newHistory.push({ volume: 0, pH: 1.1 });
    }
    
    setHistory(newHistory);
  }, [addedVolume, calculatedPH]);

  // Action methods to add volume
  const handleAddVolume = (amount: number) => {
    setAddedVolume((prev) => {
      const target = Math.min(Math.max(prev + amount, 0), 20);
      return Number(target.toFixed(1));
    });
    
    // Trigger action drop dripping flow animation
    setIsPouring(true);
    const timer = setTimeout(() => setIsPouring(false), 500);
    return () => clearTimeout(timer);
  };

  const handleReset = () => {
    setAddedVolume(0);
    setIsPouring(false);
  };

  // Determine current chemical color of the Phenolphthalein indicator
  // Color transitions from transparent to light pink around 8.2, and goes to deep fuschia above 9.8
  const indicatorColor = useMemo(() => {
    const ph = calculatedPH;
    if (ph < 8.2) {
      return 'rgba(219, 234, 254, 0.15)'; // transparent pale blue water
    } else if (ph >= 8.2 && ph <= 9.6) {
      // Soft translucent pink
      const opacity = 0.2 + (0.5 * ((ph - 8.2) / 1.4));
      return `rgba(244, 63, 94, ${opacity.toFixed(2)})`;
    } else {
      // Deep fuchsia / magenta
      return 'rgba(219, 39, 119, 0.85)';
    }
  }, [calculatedPH]);

  // Generate SVG path for actual titration curve
  const graphSvgPath = useMemo(() => {
    if (history.length < 2) return '';
    const width = 240;
    const height = 140;
    const padding = 15;
    
    return history.map((pt, index) => {
      // Map Volume range [0, 20] to X [padding, width - padding]
      const x = padding + (pt.volume / 20) * (width - 2 * padding);
      // Map pH range [0, 14] to Y [height - padding, padding] (inverted Y axis)
      const y = (height - padding) - (pt.pH / 14) * (height - 2 * padding);
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
  }, [history]);

  // Level of liquid in the burette: 0 mL is y = 50, 20 mL is y = 190
  const liquidY = useMemo(() => {
    return 50 + (addedVolume * 7);
  }, [addedVolume]);

  // Solution height index in Erlenmeyer: level rises as volume accumulates
  const solutionHeightY = useMemo(() => {
    return 358 - (addedVolume * 0.75); // Adjusted base height from 360 to 358 to sit relative to y=395 basis
  }, [addedVolume]);

  const fluidLeftX = useMemo(() => {
    return 185 - ((solutionHeightY - 323) / 72) * 32;
  }, [solutionHeightY]);

  const fluidRightX = useMemo(() => {
    return 215 + ((solutionHeightY - 323) / 72) * 32;
  }, [solutionHeightY]);

  // Depth of the vortex created by magnetic stirring: deeper as speed increases
  const vortexDepth = useMemo(() => {
    return stirringSpeed === 0 ? 0 : stirringSpeed === 1 ? 1.5 : stirringSpeed === 2 ? 4.2 : 7.5;
  }, [stirringSpeed]);

  // Local pink plume due to local base excess before complete neutralization (phenolphthalein local reaction)
  const localPlume = useMemo(() => {
    const V = addedVolume;
    if (V >= 7.0 && V < 10.0) {
      // Closeness factor goes from 0 at 7.0 mL to 1 at 10.0 mL
      const closeness = (V - 7.0) / 3.0;
      // Opacity is higher if stirring is slow or off, since mixing is poor
      const stirringModifier = stirringSpeed === 0 ? 0.95 : stirringSpeed === 1 ? 0.65 : stirringSpeed === 2 ? 0.35 : 0.15;
      const baseOpacity = closeness * 0.8 * stirringModifier;
      // Pouring boost
      const activeOpacity = isPouring ? Math.min(baseOpacity + 0.25, 0.95) : baseOpacity;
      // Plume size gets larger as equivalence is approached
      const scale = 0.4 + closeness * 1.4;
      
      return {
        opacity: activeOpacity,
        scale,
        color: `rgba(219, 39, 119, ${activeOpacity.toFixed(2)})`
      };
    }
    return { opacity: 0, scale: 0, color: 'transparent' };
  }, [addedVolume, isPouring, stirringSpeed]);

  return (
    <div className="bg-white border-2 border-slate-100 rounded-[32px] p-6 sm:p-8 shadow-xl relative overflow-hidden" id="simulation-titrage">
      {/* Decorative glass style background element */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/40 rounded-full translate-x-12 -translate-y-12 blur-3xl pointer-events-none" />
      
      {/* Header of Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-indigo-50/80 pb-5 mb-6 gap-4">
        <div>
          <span className="bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-flex items-center gap-1">
            <Activity className="w-3 h-3 animate-pulse" /> LABORATOIRE INTERACTIF DE CHIMIE
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight mt-1.5 uppercase">
            Dispositif de Dosage Acido-Basique
          </h3>
          <p className="text-slate-500 text-xs font-semibold uppercase mt-1 tracking-wider">
            Visualisation temps réel du pH, de l'indicateur coloré et du matériel physique sur la paillasse
          </p>
        </div>
        
        <div>
          <button 
            onClick={handleReset}
            className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-xl shadow-md active:scale-95 transition-all w-full sm:w-auto justify-center"
          >
            <RotateCcw className="w-4 h-4" /> Réinitialiser le dosage
          </button>
        </div>
      </div>

      {/* Main Grid Layout containing Visual and Control dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left pane: Laboratory Setup Diagram (SVG) - Takes 5 cols on lg */}
        <div className="lg:col-span-5 flex flex-col items-center justify-between p-4 bg-slate-50/80 rounded-3xl border border-slate-100 relative min-h-[500px]">
          
          {/* Scientific Annotation Labels for Equipment & Reagents */}
          <div className="flex flex-wrap gap-1.5 justify-center w-full z-10">
            <span className="bg-white border border-slate-200/80 px-2.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider text-slate-600 shadow-sm leading-none">
              🧪 Burette : NaOH (0,1 M)
            </span>
            <span className="bg-white border border-slate-200/80 px-2.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider text-slate-600 shadow-sm leading-none">
              ⚗️ Erlenmeyer : HCl (10,0 mL)
            </span>
            <span className="bg-white border border-slate-200/80 px-2.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider text-indigo-600 shadow-sm leading-none bg-indigo-50/20">
              🌸 Indicateur : Phénolphtaléine
            </span>
          </div>

          {/* SVG Experimental Setup Container */}
          <svg viewBox="0 0 420 520" className="w-full max-w-[350px] h-auto drop-shadow-sm select-none my-2">
            <defs>
              {/* Metallic Gradients for heavy duty supports and chrome rods */}
              <linearGradient id="metal-chrome-horiz" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="25%" stopColor="#cbd5e1" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="75%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="metal-chrome-vert" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="35%" stopColor="#e2e8f0" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>

              {/* Lab Wood Bench Finish */}
              <linearGradient id="wood-desk-surface" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.4" />
                <stop offset="10%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#a16207" />
              </linearGradient>
              <linearGradient id="wood-desk-thickness" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#854d0e" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>

              {/* Glass Reflection & Highlights for realistic 3D volume */}
              <linearGradient id="glass-gloss" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
                <stop offset="18%" stopColor="#ffffff" stopOpacity="0.65" />
                <stop offset="28%" stopColor="#ffffff" stopOpacity="0.12" />
                <stop offset="75%" stopColor="#ffffff" stopOpacity="0.0" />
                <stop offset="90%" stopColor="#ffffff" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="glass-specular-erlen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="15%" stopColor="#ffffff" stopOpacity="0.0" />
                <stop offset="85%" stopColor="#ffffff" stopOpacity="0.0" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
              </linearGradient>

              {/* Ceramic Hotplate surface gradient */}
              <linearGradient id="ceramic-plate" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="20%" stopColor="#f8fafc" />
                <stop offset="80%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
              <linearGradient id="stirrer-chassis" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="15%" stopColor="#f1f5f9" />
                <stop offset="85%" stopColor="#fafafa" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>

              {/* Multi-stage Circular Knobs */}
              <radialGradient id="knob-metallic-bevel" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#94a3b8" />
                <stop offset="80%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1e293b" />
              </radialGradient>

              {/* Squeeze bottle translucent standard plastic appearance */}
              <linearGradient id="pissette-bottle" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.85" />
                <stop offset="25%" stopColor="#f1f5f9" stopOpacity="0.6" />
                <stop offset="75%" stopColor="#ffffff" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.9" />
              </linearGradient>

              {/* Chemical drop / Local plume pink cloud radial effect close to equivalence */}
              <radialGradient id="pp-puff-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#db2777" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#f43f5e" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
              </radialGradient>
              
              {/* Backlit Display Screen Glow */}
              <linearGradient id="backlite-lcd" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#064e3b" />
                <stop offset="100%" stopColor="#022c22" />
              </linearGradient>

              {/* Dropshadow setup */}
              <filter id="lab-drop-shadow" x="-5%" y="-5%" width="110%" height="110%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.15" />
              </filter>
            </defs>

            {/* LAB BENCH TABLE SURFACE (WOOD TOP & EDGE) */}
            <rect x="12" y="471" width="396" height="15" rx="3" fill="#0f172a" opacity="0.18" filter="url(#lab-drop-shadow)" />
            <rect x="10" y="468" width="400" height="10" rx="1" fill="url(#wood-desk-surface)" stroke="#ca8a04" strokeWidth="0.5" />
            <rect x="10" y="478" width="400" height="34" fill="url(#wood-desk-thickness)" rx="2" />
            <line x1="10" y1="478" x2="410" y2="478" stroke="#fef08a" strokeWidth="0.75" strokeOpacity="0.4" />

            {/* Rubber protective feet beneath the heavy iron plate */}
            <rect x="13" y="460" width="12" height="4" rx="1" fill="#0f172a" />
            <rect x="44" y="460" width="12" height="4" rx="1" fill="#0f172a" />
            <rect x="160" y="460" width="12" height="4" rx="1" fill="#0f172a" />
            <rect x="364" y="460" width="12" height="4" rx="1" fill="#0f172a" />
            
            {/* Main cast iron base standard support */}
            <rect x="35" y="452" width="350" height="9" rx="2.5" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
            <rect x="37" y="453" width="346" height="3" rx="1" fill="#475569" stroke="none" opacity="0.3" />

            {/* Solid chrome-plated support post */}
            <rect x="70" y="24" width="10" height="429" rx="1" fill="url(#metal-chrome-horiz)" stroke="#475569" strokeWidth="1" />
            <rect x="69" y="20" width="12" height="4" rx="1" fill="#0f172a" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.2" />
            
            {/* Metal Bosshead and Clamps with red-sleeved grips */}
            {/* Top clamp */}
            <g id="clamp-top">
              <rect x="67" y="80" width="16" height="18" rx="2.5" fill="#334155" stroke="#0f172a" strokeWidth="1" />
              <rect x="71" y="85" width="8" height="8" rx="1" fill="url(#metal-chrome-vert)" />
              <path d="M 61 84 L 67 84 M 64 81 L 64 87" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="64" cy="84" r="3.5" fill="url(#knob-metallic-bevel)" stroke="#0f172a" strokeWidth="0.5" />
              
              <rect x="83" y="86" width="104" height="6" fill="url(#metal-chrome-vert)" stroke="#475569" strokeWidth="0.5" />
              <path d="M 183 75 C 183 75, 194 72, 194 82 L 194 98 C 194 108, 183 105, 183 105" fill="none" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 187 78 L 191 78 M 187 102 L 191 102" stroke="#b91c1c" strokeWidth="1.5" />
            </g>

            {/* Bottom clamp */}
            <g id="clamp-bottom">
              <rect x="67" y="206" width="16" height="18" rx="2.5" fill="#334155" stroke="#0f172a" strokeWidth="1" />
              <rect x="71" y="211" width="8" height="8" rx="1" fill="url(#metal-chrome-vert)" />
              <path d="M 61 210 L 67 210 M 64 207 L 64 213" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="64" cy="210" r="3.5" fill="url(#knob-metallic-bevel)" stroke="#0f172a" strokeWidth="0.5" />
              
              <rect x="83" y="212" width="104" height="6" fill="url(#metal-chrome-vert)" stroke="#475569" strokeWidth="0.5" />
              <path d="M 183 201 C 183 201, 194 198, 194 208 L 194 224 C 194 234, 183 231, 183 231" fill="none" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 187 204 L 191 204 M 187 228 L 191 228" stroke="#b91c1c" strokeWidth="1.5" />
            </g>
            
            {/* Magnetic Stirrer Base plate & ceramic platform */}
            <g id="stirrer-base" filter="url(#lab-drop-shadow)">
              <rect x="135" y="445" width="130" height="15" rx="6" fill="#94a3b8" />
              <rect x="135" y="399" width="130" height="56" rx="10" fill="url(#stirrer-chassis)" stroke="#94a3b8" strokeWidth="1.5" />
              <rect x="128" y="389" width="144" height="10" rx="3" fill="url(#ceramic-plate)" stroke="#94a3b8" strokeWidth="1" />
              <rect x="132" y="391" width="136" height="1.5" rx="0.5" fill="#ffffff" opacity="0.9" />
              <line x1="129" y1="398" x2="271" y2="398" stroke="#94a3b8" strokeWidth="0.75" />
              
              {/* Controls screen */}
              <rect x="144" y="411" width="112" height="38" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
              <rect x="148" y="415" width="46" height="15" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.75" />
              <text x="152" y="426" fill="#38bdf8" className="font-mono text-[8px] font-bold tracking-tight">
                {stirringSpeed === 0 ? "OFF" : stirringSpeed === 1 ? "220" : stirringSpeed === 2 ? "600" : "1150"}
              </text>
              <text x="178" y="425" fill="#475569" className="font-mono text-[5.5px]">RPM</text>

              {/* Speed Rotary Knob */}
              <circle cx="212" cy="425" r="9" fill="url(#knob-metallic-bevel)" stroke="#0f172a" strokeWidth="1" />
              <circle cx="212" cy="425" r="6" fill="#0f172a" stroke="#cbd5e1" strokeWidth="0.5" />
              <line 
                x1="212" 
                y1="425" 
                x2={212 + 6 * Math.cos((stirringSpeed * 50 - 90) * Math.PI / 180)} 
                y2={425 + 6 * Math.sin((stirringSpeed * 50 - 90) * Math.PI / 180)} 
                stroke="#ef4444" 
                strokeWidth="2" 
                strokeLinecap="round" 
              />
              <text x="202" y="443" className="text-[5px] font-black fill-slate-300 tracking-wider">SPEED</text>
              
              {/* LED power bulb */}
              <circle cx="242" cy="425" r="3" fill={stirringSpeed > 0 ? '#10b981' : '#f43f5e'} className={stirringSpeed > 0 ? 'animate-pulse' : ''} />
              <text x="233" y="443" className="text-[5px] font-black fill-slate-300 tracking-wider">PWR</text>
              <text x="150" y="444" className="text-[5px] font-black fill-slate-400 tracking-widest">LABTECH AGIT-X</text>
            </g>

            {/* Graduated volumetric Glass Burette containing NaOH */}
            <g id="burette">
              <rect x="193" y="38" width="14" height="202" rx="1.5" fill="rgba(241, 245, 249, 0.2)" stroke="none" />
              {/* Titrant transparent liquid base */}
              <rect 
                x="194.5" 
                y={liquidY} 
                width="11" 
                height={Math.max(240 - liquidY, 0)} 
                fill="url(#pissette-bottle)" 
                stroke="none" 
              />
              <rect 
                x="194.5" 
                y="40" 
                width="11" 
                height={liquidY - 40} 
                fill="rgba(255,255,255,0.05)" 
                stroke="none" 
              />
              {/* Meniscus curvature detail */}
              <path 
                d={`M 194.5 ${liquidY} Q 200 ${liquidY + 2.5} 205.5 ${liquidY}`} 
                fill="none" 
                stroke="#0284c7" 
                strokeWidth="1.75" 
              />
              <path 
                d={`M 194.5 ${liquidY - 0.5} Q 200 ${liquidY + 1.5} 205.5 ${liquidY - 0.5}`} 
                fill="none" 
                stroke="#60a5fa" 
                strokeWidth="0.75" 
                opacity="0.65"
              />

              {/* Glass tubes walls layout */}
              <rect x="193" y="38" width="14" height="202" rx="1.5" fill="none" stroke="rgba(71, 85, 105, 0.45)" strokeWidth="0.75" />
              <rect x="194" y="37" width="12" height="204" rx="1" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="0.5" opacity="0.3" />
              <rect x="195" y="38" width="3" height="200" fill="url(#glass-gloss)" opacity="0.45" pointerEvents="none" />

              {/* Physical Graduation ticks in mL */}
              {Array.from({ length: 21 }).map((_, i) => {
                const tickY = 50 + (i * 9);
                const isMajor = i % 5 === 0;
                return (
                  <g key={i}>
                    <line 
                      x1="193" 
                      y1={tickY} 
                      x2={isMajor ? "198" : "195.5"} 
                      y2={tickY} 
                      stroke="#1e293b" 
                      strokeWidth={isMajor ? 1.25 : 0.75} 
                      opacity={isPouring ? 0.8 : 0.6}
                    />
                    {isMajor && (
                      <text x="210" y={tickY + 2.2} className="text-[6.5px] font-mono font-extrabold fill-slate-700">
                        {i}
                      </text>
                    )}
                  </g>
                );
              })}
              <line x1="193" y1="50" x2="193" y2="230" stroke="#475569" strokeWidth="0.5" opacity="0.5" />
              
              {/* Glass stopcock stop valve */}
              <path d="M 193 240 L 195 249 H 205 L 207 240 Z" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
              <rect x="191" y="248" width="18" height="10" rx="1" fill="#f8fafc" stroke="#475569" strokeWidth="1.2" />
              
              {/* Dynamic Stopcock Handle (Opens 90 degrees on liquid pouring) */}
              <g transform={`translate(200, 253) rotate(${isPouring ? 90 : 0})`}>
                <rect x="-10" y="-3.5" width="20" height="7" rx="1.5" fill="#ef4444" stroke="#0f172a" strokeWidth="1" transform="rotate(0)" />
                <circle cx="0" cy="0" r="3.2" fill="#991b1b" />
              </g>

              {/* Delivery tip */}
              <path d="M 197 258 L 199.2 280 H 200.8 L 203 258 Z" fill="rgba(148, 163, 184, 0.75)" stroke="#64748b" strokeWidth="0.5" />
              <line x1="198.8" y1="274" x2="201.2" y2="274" stroke="#0284c7" strokeWidth="1" />
            </g>

            {/* Micro drip falling down dynamically in real-time */}
            {isPouring && (
              <g id="droplets" className="animate-bounce">
                <path d="M 200 285 C 198.5 288, 198.5 291, 200 293 C 201.5 291, 201.5 288, 200 285 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="0.5" />
                <path d="M 200 297 C 199 299, 199 301, 200 302 C 201 301, 201 299, 200 297 Z" fill="#38bdf8" opacity="0.6" />
              </g>
            )}

            {/* Recipient Conical Erlenmeyer on stirrer plate */}
            <g id="erlenmeyer">
              {/* Fluid Solution changing color based on indicator reaction */}
              <path 
                d={`M ${fluidLeftX} ${solutionHeightY} 
                   Q 200 ${solutionHeightY + vortexDepth} ${fluidRightX} ${solutionHeightY} 
                   L 245 379 
                   C 248 385, 244 388, 235 388 
                   H 165 
                   C 156 388, 152 385, 155 379 
                   Z`} 
                fill={indicatorColor} 
                className="transition-colors duration-500"
              />

              {/* Physical top meniscus ellipse of the HCl fluid */}
              <ellipse 
                cx="200" 
                cy={solutionHeightY} 
                rx={Math.max((fluidRightX - fluidLeftX) / 2, 8)} 
                ry={Math.max(vortexDepth - 0.5, 2)} 
                fill={addedVolume >= 10 ? 'rgba(219, 39, 119, 0.18)' : 'rgba(147, 197, 253, 0.15)'} 
                stroke={addedVolume >= 10 ? '#db2777' : '#93c5fd'} 
                strokeWidth="1.2" 
                opacity="0.8" 
              />
              
              {/* Phenolphthalein local reaction plume (glowing pink cloud when drops hit) */}
              {localPlume.opacity > 0 && (
                <g>
                  <ellipse 
                    cx="200" 
                    cy={solutionHeightY + 12} 
                    rx={22 * localPlume.scale} 
                    ry={8 * localPlume.scale} 
                    fill="url(#pp-puff-gradient)"
                    opacity={localPlume.opacity}
                    className="transition-all duration-300 pointer-events-none"
                  />
                  <path 
                    d={`M 197 ${solutionHeightY + 3} Q ${200 + Math.sin(addedVolume * 5) * 11} ${solutionHeightY + 15} ${200 + Math.cos(addedVolume * 5) * 16} ${solutionHeightY + 26}`}
                    fill="none"
                    stroke={localPlume.color}
                    strokeWidth="3.2"
                    opacity={localPlume.opacity * 0.9}
                    strokeLinecap="round"
                    className="transition-all duration-300 pointer-events-none"
                  />
                </g>
              )}

              {/* Vortex dynamic aeration bubbles on high speed */}
              {stirringSpeed > 0 && (
                <g opacity="0.6">
                  <circle cx={192 + Math.sin(addedVolume) * 8} cy={solutionHeightY + 18 + Math.cos(addedVolume) * 4} r="1.5" fill="#ffffff" opacity="0.7" />
                  <circle cx={184 + Math.sin(addedVolume * 2) * 14} cy={solutionHeightY + 28} r="1.2" fill="#ffffff" opacity="0.5" />
                  <circle cx={208 + Math.cos(addedVolume) * 10} cy={solutionHeightY + 15} r="1" fill="#ffffff" opacity="0.6" />
                  <circle cx={218 + Math.sin(addedVolume * 3) * 6} cy={solutionHeightY + 24} r="1.5" fill="#ffffff" opacity="0.4" />
                </g>
              )}

              {/* Erlenmeyer Glass Walls vector */}
              <path 
                d="M 185 288 
                   H 215 
                   V 318 
                   L 248 381 
                   C 252 388, 248 389, 238 389 
                   H 162 
                   C 152 389, 148 388, 152 381 
                   L 185 318 
                   Z" 
                fill="none" 
                stroke="#64748b" 
                strokeWidth="2.5" 
                strokeLinejoin="round" 
              />
              <path 
                d="M 186.5 289 
                   H 213.5 
                   V 317 
                   L 246 379" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="1" 
                opacity="0.32" 
                pointerEvents="none" 
              />

              {/* 3D Glass highlights */}
              <path 
                d="M 186 290 
                   V 317 
                   L 155 379 
                   C 154 382, 156 385, 160 386 
                   L 188 319 
                   L 188 290" 
                fill="url(#glass-specular-erlen)" 
                opacity="0.35" 
                pointerEvents="none" 
              />
              <path 
                d="M 214 290 
                   V 317 
                   L 245 379 
                   C 246 382, 244 385, 240 386 
                   L 212 319 
                   L 212 290" 
                fill="url(#glass-specular-erlen)" 
                opacity="0.18" 
                pointerEvents="none" 
              />

              {/* Volumetric graduations prints */}
              <line x1="222" y1="363" x2="230" y2="363" stroke="#cbd5e1" strokeWidth="1" opacity="0.65" />
              <text x="233" y="365" className="text-[5.5px] fill-slate-350 font-mono font-black" opacity="0.8">25 mL</text>
              <line x1="215" y1="344" x2="223" y2="344" stroke="#cbd5e1" strokeWidth="1" opacity="0.65" />
              <text x="226" y="346" className="text-[5.5px] fill-slate-350 font-mono font-black" opacity="0.8">50 mL</text>
              <line x1="208" y1="325" x2="216" y2="325" stroke="#cbd5e1" strokeWidth="1" opacity="0.45" />

              {/* Rotating Teflon Magnetic bar inside */}
              {stirringSpeed > 0 ? (
                <g 
                  transform="translate(200, 383)" 
                  className="animate-spin"
                  style={{ 
                    transformOrigin: '200px 383px', 
                    animationDuration: stirringSpeed === 1 ? '1.4s' : stirringSpeed === 2 ? '0.5s' : '0.12s' 
                  }}
                >
                  <rect 
                    x="-9" 
                    y="-3" 
                    width="18" 
                    height="6" 
                    rx="3" 
                    fill="#ffffff" 
                    stroke="#1e293b" 
                    strokeWidth="1.25"
                  />
                  <line x1="-4" y1="0" x2="4" y2="0" stroke="#94a3b8" strokeWidth="1" />
                </g>
              ) : (
                <g transform="translate(200, 383)">
                  <rect 
                    x="-9" 
                    y="-3" 
                    width="18" 
                    height="6" 
                    rx="3" 
                    fill="#ffffff" 
                    stroke="#cbd5e1" 
                    strokeWidth="1.25"
                  />
                </g>
              )}
            </g>

            {/* pH Meter combi-glass Probe diving in solution */}
            <g id="ph-probe">
              <rect x="207" y="252" width="8" height="12" rx="1.5" fill="#0f172a" stroke="#475569" strokeWidth="0.75" />
              <circle cx="211" cy="255" r="1.5" fill="#38bdf8" />
              <rect x="209" y="264" width="4" height="106" rx="1" fill="url(#metal-chrome-horiz)" stroke="#1e293b" strokeWidth="0.5" />
              <rect x="210.2" y="264" width="1.2" height="102" fill="#ffffff" opacity="0.4" />
              <rect x="208.5" y="370" width="5" height="8" rx="1.5" fill="#3b82f6" stroke="#2563eb" strokeWidth="0.75" opacity="0.9" />
              <circle cx="211" cy="375" r="2" fill="#93c5fd" opacity="0.8" />
              
              {/* Probe cable connecting to electronic pH screen box */}
              <path d="M 211 252 Q 255 204 295 345" fill="none" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M 211 252 Q 255 204 295 345" fill="none" stroke="#475569" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            </g>

            {/* Digital Desktop pH Meter console */}
            <g id="device-ph" filter="url(#lab-drop-shadow)">
              <rect x="295" y="337" width="92" height="60" rx="9" fill="#1e293b" stroke="#475569" strokeWidth="2.2" strokeLinejoin="round" />
              <rect x="298" y="340" width="86" height="54" rx="7" fill="url(#stirrer-chassis)" stroke="none" />
              <rect x="303" y="345" width="76" height="28" rx="3" fill="url(#backlite-lcd)" stroke="#475569" strokeWidth="1" />
              <rect x="304" y="346" width="74" height="1" fill="#ffffff" opacity="0.1" />

              {/* Digital screen output */}
              <text x="308" y="361" fill="#34d399" className="font-mono text-[10px] font-black tracking-widest leading-none">
                {calculatedPH.toFixed(2)}
              </text>
              <text x="367" y="361" fill="#059669" className="font-sans text-[5.5px] font-black">pH</text>
              <text x="308" y="370" fill="#fb923c" className="font-mono text-[6px] font-bold">
                {calculatedTemp.toFixed(1)}°C
              </text>
              <text x="345" y="370" fill="#059669" className="font-sans text-[5px] font-extrabold tracking-wider" opacity="0.8">ATC | CAL OK</text>
              
              <rect x="304" y="379" width="12" height="6" rx="1" fill="#334155" stroke="#475569" strokeWidth="0.5" />
              <text x="306" y="384" className="text-[3.5px] font-bold fill-slate-300">CAL</text>
              <rect x="320" y="379" width="12" height="6" rx="1" fill="#334155" stroke="#475569" strokeWidth="0.5" />
              <text x="321.5" y="384" className="text-[3.5px] font-bold fill-slate-300">MODE</text>
              <rect x="336" y="379" width="7" height="6" rx="1" fill="#475569" />
              <path d="M 339.5 380.5 L 337.5 383.5 H 341.5 Z" fill="#ffffff" />
              <rect x="345" y="379" width="7" height="6" rx="1" fill="#475569" />
              <path d="M 348.5 383.5 L 346.5 380.5 H 350.5 Z" fill="#ffffff" />
              <text x="357" y="384" className="text-[4.5px] font-black fill-slate-500 tracking-wider">ION-METER X4</text>
              <circle cx="295" cy="345" r="2.5" fill="#0f172a" />
              <circle cx="295" cy="345" r="1.2" fill="#94a3b8" />
            </g>

            {/* UPGRADED REALISTIC CHEMICAL BOTTLES SITTING ON THE BENCH (Y_trans=424 sits exactly on wood surface) */}
            
            {/* 1. Translucent Distilled Water Squeeze Bottle (H2O) */}
            <g id="wash-bottle" transform="translate(18, 426)" filter="url(#lab-drop-shadow)">
              <rect x="1" y="8" width="24" height="34" rx="4.5" fill="#bae6fd" opacity="0.65" />
              <rect x="0" y="0" width="26" height="42" rx="5" fill="url(#pissette-bottle)" stroke="#94a3b8" strokeWidth="1" />
              <path d="M 1" x="0" y="14" width="24" height="2" fill="#ffffff" opacity="0.4" />
              <path d="M 13 2 L 13 -10 Q 13 -15 0 -19" fill="none" stroke="#475569" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M 13 2 L 13 -10 Q 13 -15 0 -19" fill="none" stroke="#2563eb" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
              <rect x="6" y="-3" width="14" height="5" fill="#2563eb" rx="1.2" stroke="#1d4ed8" strokeWidth="0.5" />
              <text x="5" y="19" className="text-[6px] font-bold fill-slate-600 font-mono">H₂O</text>
              <text x="4" y="26" className="text-[4px] font-extrabold fill-indigo-600 tracking-wide font-sans leading-none" opacity="0.85">EAU DIST.</text>
              <rect x="2" y="31" width="22" height="6" fill="#eff6ff" rx="1" stroke="#bfdbfe" strokeWidth="0.5" />
              <text x="4" y="36" className="text-[3px] font-black fill-blue-700 uppercase tracking-widest">AQUATIQUE</text>
            </g>

            {/* 2. Amber Glass Hydrochloric Acid Sample Bottle (HCl) */}
            <g id="bottle-hcl" transform="translate(56, 424)" filter="url(#lab-drop-shadow)">
              {/* Amber protective glass casing */}
              <rect x="0" y="8" width="30" height="36" rx="5" fill="#7c2d12" stroke="#451a03" strokeWidth="1.2" />
              <path d="M 0 14 L 5 8 H 25 L 30 14 Z" fill="#b45309" opacity="0.4" />
              <rect x="8" y="1" width="14" height="7" fill="#1e293b" rx="1.5" stroke="#0f172a" strokeWidth="0.5" />
              {/* Ridges on screw cap */}
              <line x1="11" y1="1.5" x2="11" y2="7" stroke="#334155" strokeWidth="0.75" />
              <line x1="15" y1="1.5" x2="15" y2="7" stroke="#334155" strokeWidth="0.75" />
              {/* White label */}
              <rect x="2.5" y="15" width="25" height="22" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.75" />
              <text x="4" y="22" className="text-[6.5px] font-extrabold fill-slate-900 leading-none">HCl</text>
              <text x="4" y="28" className="text-[4.5px] font-black fill-red-600 leading-none uppercase">Acide</text>
              <text x="4" y="33" className="text-[3px] font-mono fill-slate-400">CAS 7647-01-0</text>
              {/* Red warning diamond */}
              <rect x="18" y="27" width="5.5" height="5.5" fill="#ffffff" stroke="#dc2626" strokeWidth="0.75" transform="rotate(45 20.75 29.75)" />
              <circle cx="20.75" cy="29.75" r="0.6" fill="#000000" />
            </g>

            {/* 3. Glass Phenolphthalein Indicator Dropper Bottle (PP) */}
            <g id="bottle-pp" transform="translate(278, 434)" filter="url(#lab-drop-shadow)">
              {/* Small clear glass body containing fuchsia active formulation indicator */}
              <rect x="0" y="8" width="22" height="26" rx="3.5" fill="rgba(255,255,255,0.7)" stroke="#64748b" strokeWidth="0.75" />
              <rect x="1" y="16" width="20" height="17" rx="1.5" fill="#ec4899" opacity="0.7" />
              {/* Dropper pipet and rubber teat */}
              <rect x="7" y="1" width="8" height="7" fill="#1e293b" rx="2" stroke="#0f172a" strokeWidth="0.5" />
              <line x1="11" y1="8" x2="11" y2="24" stroke="#e2e8f0" strokeWidth="1.5" opacity="0.9" />
              <circle cx="11" cy="24" r="1.2" fill="#f43f5e" />
              {/* Label */}
              <rect x="1.5" y="18" width="19" height="12" fill="#ffffff" stroke="#f472b6" strokeWidth="0.5" />
              <text x="3.5" y="23" className="text-[4.5px] font-black fill-pink-650 leading-none font-sans">PP</text>
              <text x="3.5" y="27" className="text-[2.8px] font-semibold fill-slate-400 leading-none">Ind. Coloré</text>
            </g>

            {/* 4. HDPE Translucent Sodium Hydroxide Storage Flacon (NaOH) */}
            <g id="bottle-naoh" transform="translate(312, 424)" filter="url(#lab-drop-shadow)">
              <rect x="0" y="8" width="30" height="36" rx="5" fill="url(#pissette-bottle)" stroke="#94a3b8" strokeWidth="1.2" />
              <path d="M 0 14 L 5 8 H 25 L 30 14 Z" fill="#ffffff" opacity="0.3" />
              <rect x="8" y="1" width="14" height="7" fill="#1d4ed8" rx="1.5" stroke="#1e3a8a" strokeWidth="0.5" />
              {/* Cap ridges */}
              <line x1="11" y1="1.5" x2="11" y2="7" stroke="#172554" strokeWidth="0.75" />
              <line x1="15" y1="1.5" x2="15" y2="7" stroke="#172554" strokeWidth="0.75" />
              {/* White paper label */}
              <rect x="2.5" y="15" width="25" height="22" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.75" />
              <text x="4" y="22" className="text-[6.5px] font-extrabold fill-slate-900 leading-none">NaOH</text>
              <text x="4" y="28" className="text-[4.5px] font-black fill-emerald-600 leading-none uppercase">0,1 M</text>
              <text x="4" y="33" className="text-[3px] font-mono fill-slate-400">CAS 1310-73-2</text>
              {/* Red corrosive warnings diamond */}
              <rect x="18" y="27" width="5.5" height="5.5" fill="#ffffff" stroke="#dc2626" strokeWidth="0.75" transform="rotate(45 20.75 29.75)" />
              <line x1="19" y1="29" x2="22.5" y2="30.5" stroke="#000000" strokeWidth="0.7" />
            </g>

          </svg>

          {/* Under-graph caption */}
          <div className="mt-2 px-4 text-center">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-relaxed border-t border-slate-200/60 pt-3">
              « Paillasse expérimentale : Montage complet du Dosage »
            </p>
          </div>
        </div>

        {/* Right pane: Controls, parameters, live plotting curve - Takes 7 cols on lg */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-5">
          
          {/* A. Live parameters card display */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-100 rounded-2xl p-4 flex flex-col justify-center shadow-sm">
              <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-1.5 block">Volume Ajouté (V)</span>
              <div className="flex items-baseline gap-1 text-slate-900">
                <span className="text-3xl font-black leading-none font-mono tracking-tight">{addedVolume.toFixed(1)}</span>
                <span className="text-[11px] font-bold uppercase text-slate-400 font-sans">mL</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-emerald-50/20 border border-slate-100 rounded-2xl p-4 flex flex-col justify-center shadow-sm">
              <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1.5 block">pH Mesuré</span>
              <div className="flex flex-col gap-1.5">
                <span className="text-3xl font-black leading-none font-mono tracking-tight text-emerald-650">{calculatedPH.toFixed(2)}</span>
                <span className={`text-[8.5px] font-black uppercase px-2 py-0.5 rounded-full w-fit ${
                  calculatedPH < 6.8 
                    ? 'text-amber-800 bg-amber-50' 
                    : calculatedPH > 7.2 
                    ? 'text-pink-800 bg-pink-50' 
                    : 'text-emerald-800 bg-emerald-50'
                }`}>
                  {calculatedPH < 6.8 ? 'Acide' : calculatedPH > 7.2 ? 'Basique' : 'Neutre (Equiv. !)'}
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-orange-50/20 border border-slate-100 rounded-2xl p-4 flex flex-col justify-center shadow-sm">
              <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-1.5 block">Température (T)</span>
              <div className="flex flex-wrap items-center gap-1.5 text-slate-900">
                <Thermometer className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-3xl font-black leading-none font-mono tracking-tight text-orange-600">{calculatedTemp}</span>
                <span className="text-[11px] font-bold uppercase text-slate-400 font-sans">°C</span>
              </div>
            </div>

          </div>

          {/* B. Incremental Titration Fluid control unit */}
          <div className="bg-white border-2 border-slate-100 p-5 rounded-2xl shadow-inner space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-indigo-500" /> Commande de la valve de Burette (NaOH)
              </h4>
              <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Solution Titrante</span>
            </div>

            {/* Fast increments controller buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => handleAddVolume(0.1)}
                disabled={addedVolume >= 20}
                className="bg-indigo-50/60 hover:bg-indigo-100 border border-indigo-100/80 text-indigo-700 font-extrabold p-3 rounded-xl transition-all flex flex-col items-center justify-center gap-1 text-xs select-none shadow-sm disabled:opacity-40"
              >
                <span className="flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> +0,1 mL</span>
                <span className="text-[8.5px] font-bold opacity-60 uppercase tracking-wider">(Précis)</span>
              </button>
              <button
                onClick={() => handleAddVolume(0.5)}
                disabled={addedVolume >= 20}
                className="bg-indigo-50/60 hover:bg-indigo-100 border border-indigo-100/80 text-indigo-700 font-extrabold p-3 rounded-xl transition-all flex flex-col items-center justify-center gap-1 text-xs select-none shadow-sm disabled:opacity-40"
              >
                <span className="flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> +0,5 mL</span>
              </button>
              <button
                onClick={() => handleAddVolume(1.0)}
                disabled={addedVolume >= 20}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold p-3 rounded-xl transition-all flex flex-col items-center justify-center gap-1 text-xs select-none shadow-md disabled:opacity-40"
              >
                <span className="flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> +1,0 mL</span>
                <span className="text-[8.5px] font-bold opacity-80 uppercase tracking-wider">(Saut)</span>
              </button>
              <button
                onClick={() => handleAddVolume(5.0)}
                disabled={addedVolume >= 20}
                className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold p-3 rounded-xl transition-all flex flex-col items-center justify-center gap-1 text-xs select-none shadow-md disabled:opacity-40"
              >
                <span className="flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> +5,0 mL</span>
              </button>
            </div>

            {/* Continuous range slider for rapid fluid manipulation */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <span>0,0 mL (Pleine)</span>
                <span className="text-indigo-600 font-black animate-pulse">Inflexion théorique attendue à 10,0 mL</span>
                <span>20,0 mL (Vide)</span>
              </div>
              <input 
                type="range"
                min="0"
                max="20"
                step="0.1"
                value={addedVolume}
                onChange={(e) => {
                  setAddedVolume(Number(parseFloat(e.target.value).toFixed(1)));
                  setIsPouring(true);
                  const timer = setTimeout(() => setIsPouring(false), 500);
                  return () => clearTimeout(timer);
                }}
                className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 border border-slate-200"
              />
            </div>
          </div>

          {/* C. Live Titration Plot graph (SVG plot) */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 relative">
            <span className="absolute top-4 right-4 text-[9px] font-black text-indigo-500 uppercase tracking-widest flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Grapheur d'acquisition pH = f(V)
            </span>
            <h4 className="text-xs font-black text-slate-705 uppercase tracking-widest mb-3">
              COURBE DE TITRAGE EN ENREGISTREMENT CONTINU
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              
              {/* Graphic Plot frame */}
              <div className="md:col-span-6 bg-white border-2 border-slate-200/60 p-3 rounded-xl shadow-inner w-full max-w-[340px] sm:max-w-none mx-auto aspect-[240/140]">
                <svg width="240" height="140" viewBox="0 0 240 140" className="w-full h-full overflow-visible">
                  {/* Grid Lines for reference */}
                  <line x1="15" y1="15" x2="225" y2="15" stroke="#f8fafc" strokeWidth="1" />
                  <line x1="15" y1="46" x2="225" y2="46" stroke="#f8fafc" strokeWidth="1" />
                  <line x1="15" y1="77" x2="225" y2="77" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="15" y1="108" x2="225" y2="108" stroke="#f8fafc" strokeWidth="1" />
                  
                  {/* Vertical grid lines at 5 mL increments */}
                  <line x1="68" y1="15" x2="68" y2="125" stroke="#f8fafc" strokeWidth="1" />
                  <line x1="120" y1="15" x2="120" y2="125" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="172" y1="15" x2="172" y2="125" stroke="#f8fafc" strokeWidth="1" />

                  {/* Axes lines */}
                  <line x1="15" y1="125" x2="225" y2="125" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="15" y1="15" x2="15" y2="125" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Axis labels */}
                  <text x="5" y="18" className="text-[7px] font-black fill-slate-400 font-mono">14</text>
                  <text x="5" y="73" className="text-[7px] font-black fill-slate-400 font-mono">7</text>
                  <text x="5" y="128" className="text-[7px] font-black fill-slate-400 font-mono">0</text>
                  <text x="215" y="137" className="text-[6.5px] font-black fill-slate-400 uppercase tracking-wide">V (mL)</text>
                  <text x="20" y="12" className="text-[6.5px] font-black fill-indigo-500 uppercase tracking-wide">pH</text>

                  {/* X labels */}
                  <text x="63" y="134" className="text-[7px] font-black fill-slate-400 font-mono">5</text>
                  <text x="113" y="134" className="text-[7px] font-black fill-slate-450 font-mono font-bold">10</text>
                  <text x="165" y="134" className="text-[7px] font-black fill-slate-400 font-mono">15</text>

                  {/* Spot highlighted green zone at equivalence */}
                  <circle cx="120" cy="70" r="8" fill="rgba(16, 185, 129, 0.12)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1" strokeDasharray="2,2" />

                  {/* pH curve drawing */}
                  {graphSvgPath && (
                    <path 
                      id="ph-curve-path"
                      d={graphSvgPath} 
                      fill="none" 
                      stroke="#4f46e5" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  )}

                  {/* Current Active Dot Indicator */}
                  {history.length > 0 && (
                    <circle 
                      cx={15 + (addedVolume / 20) * (210)}
                      cy={125 - (calculatedPH / 14) * (110)}
                      r="4"
                      fill="#ef4444"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                  )}
                </svg>
              </div>

              {/* Data interpretation comments right next to the curves in French */}
              <div className="md:col-span-6 space-y-2.5 text-xs text-slate-705 mt-3 md:mt-0 w-full">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-650 inline-block" />
                  <span className="font-extrabold text-[#111827] text-[10px] uppercase tracking-wider">Équation-bilan d'équivalence :</span>
                </div>
                <div className="bg-white px-2.5 py-1.5 rounded-xl border border-slate-100 font-extrabold font-mono text-[11px] text-indigo-700 shadow-sm leading-normal text-center">
                  H₃O⁺ + OH⁻ ➔ 2 H₂O
                </div>

                {addedVolume < 10 && (
                  <p className="font-semibold leading-relaxed text-slate-500">
                    L'acide chlorhydrique (HCl) est en excès. <span className="text-indigo-600 font-black">pH &lt; 7</span>. Le pH monte doucement par capture successive de protons libres.
                  </p>
                )}
                {Math.abs(addedVolume - 10) <= 0.2 && (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 text-emerald-950 font-bold leading-relaxed">
                    <div className="flex items-center gap-1.5 text-emerald-800 text-[9px] font-black uppercase tracking-wider mb-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> ÉQUIVALENCE ATTEINTE !
                    </div>
                    <p className="text-[10px] font-medium text-slate-700 leading-tight">
                      Neutralisation totale de l'acide. L'indicateur vire au fuchsia. Le volume d'équivalence mesuré vaut <strong className="text-indigo-700 font-mono">V_E = 10,0 mL</strong>.
                    </p>
                  </div>
                )}
                {addedVolume > 10.2 && (
                  <p className="font-semibold leading-relaxed text-indigo-950">
                    NaOH est désormais versé en excès. L'accumulation d'ions hydroxydes libres amène le pH à se stabiliser doucement vers <span className="text-pink-600 font-extrabold">12,70</span>.
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* D. Stirrer speed adjustments at bottom block */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-100 pt-5">
            <div className="flex items-center gap-3">
              <span className="text-[9.5px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-slate-400" /> Agitation magnétique :
              </span>
              <div className="flex gap-1 bg-slate-100/60 p-1 rounded-xl border border-slate-100">
                {['Off', 'Lent', 'Moyen', 'Rapide'].map((speed, i) => (
                  <button
                    key={speed}
                    onClick={() => setStirringSpeed(i)}
                    className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
                      stirringSpeed === i
                        ? 'bg-white text-slate-800 shadow-md font-extrabold border border-slate-200/40'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {speed}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 text-[9.5px] font-black tracking-widest text-slate-400 uppercase">
              <span>AZZEDDINE ATIBI</span>
              <span>•</span>
              <span className="text-indigo-650">PAILLASSE PHYSIQUE</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
