import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shirt, Eye, Hand, Shield, Footprints, CheckCircle2, AlertCircle } from 'lucide-react';

const blouseImg = '/src/assets/images/blouse_protection_1782000942662.jpg';
const gogglesImg = '/src/assets/images/goggles_lab_1782000256119.jpg';
const gantsImg = '/src/assets/images/gants_lab_1782000267995.jpg';
const masqueImg = '/src/assets/images/masque_lab_1782000281383.jpg';
const chaussuresImg = '/src/assets/images/chaussures_lab_1782000292453.jpg';

interface EPIItem {
  id: string;
  name: string;
  category: string;
  importance: string;
  rules: string[];
  tips: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  image: string;
  imagePlaceholder: string;
}

const EPI_DATA: EPIItem[] = [
  {
    id: 'blouse',
    name: 'Blouse en Coton (100%)',
    category: 'Protection du Corps',
    importance: 'La blouse protège vos vêtements et votre peau contre les projections chimiques directes et limite les risques de brûlures.',
    rules: [
      'Disposer d\'un tissu 100% coton (ne fond pas sous la chaleur)',
      'Garder les manches longues déroulées jusqu\'au poignet',
      'Porter la blouse entièrement boutonnée en toute circonstance',
      'La retirer immédiatement en dehors de la salle de travaux pratiques'
    ],
    tips: 'Le coton réagit beaucoup moins vite aux flammes que les fibres synthétiques.',
    icon: Shirt,
    color: 'text-indigo-600',
    borderColor: 'border-indigo-100',
    bgColor: 'bg-indigo-50/50',
    textColor: 'text-indigo-900',
    image: blouseImg,
    imagePlaceholder: 'Blouse de chimie réglementaire blanche'
  },
  {
    id: 'lunettes',
    name: 'Lunettes de Protection',
    category: 'Protection Oculaire',
    importance: 'Les yeux sont extrêmement vulnérables aux éclaboussures d\'acides, de bases fortes ou de solvants.',
    rules: [
      'Obligatoires dès l\'entrée du laboratoire, même si vous portez des lunettes de vue',
      'Doivent posséder des protections latérales enveloppantes',
      'Ne jamais les enlever pendant le nettoyage ou la vaisselle du matériel'
    ],
    tips: 'Les lunettes de vue personnelles ne remplacent pas les lunettes de protection réglementaires !',
    icon: Eye,
    color: 'text-sky-600',
    borderColor: 'border-sky-100',
    bgColor: 'bg-sky-50/50',
    textColor: 'text-sky-900',
    image: gogglesImg,
    imagePlaceholder: 'Lunettes de sécurité enveloppantes avec protections latérales'
  },
  {
    id: 'gants',
    name: 'Gants de Sécurité Nitrile',
    category: 'Protection des Mains',
    importance: 'Protègent les mains de la corrosion et de l\'absorption cutanée de certaines substances toxiques.',
    rules: [
      'Choisir l\'épaisseur et le matériau recommandés par la FDS (généralement nitrile)',
      'Changer de gants dès qu\'ils sont souillés ou s\'ils présentent une micro-déchirure',
      'Ne pas toucher de surfaces communes (poignées, téléphones) avec des gants'
    ],
    tips: 'Retirez toujours vos gants "en canard" pour ne pas toucher l\'extérieur contaminé.',
    icon: Hand,
    color: 'text-emerald-600',
    borderColor: 'border-emerald-100',
    bgColor: 'bg-emerald-50/50',
    textColor: 'text-emerald-900',
    image: gantsImg,
    imagePlaceholder: 'Gants de protection jetables en nitrile bleu'
  },
  {
    id: 'masque',
    name: 'Masque Respiratoire / Hotte',
    category: 'Protection Voies Respiratoires',
    importance: 'Empêche l\'inhalation de vapeurs nocives, de gaz toxiques ou de poussières irritantes.',
    rules: [
      'Manipuler obligatoirement sous hotte aspirante ventilée (EPC)',
      'Porter un masque à filtre adapté (FFP2 ou cartouches spéciales) si indiqué par la FDS',
      'Vérifier l\'ajustement étanche du masque sur le visage'
    ],
    tips: 'Une hotte ventilée doit être tirée vers le bas lors de la manipulation.',
    icon: Shield,
    color: 'text-amber-600',
    borderColor: 'border-amber-100',
    bgColor: 'bg-amber-50/50',
    textColor: 'text-amber-900',
    image: masqueImg,
    imagePlaceholder: 'Masque à cartouche respiratoire filtrant de sécurité'
  },
  {
    id: 'chaussures',
    name: 'Chaussures de Sécurité Fermées',
    category: 'Protection des Pieds',
    importance: 'Évitent les traumatismes en cas de chute de flacon en verre lourd ou de contact acide direct.',
    rules: [
      'Chaussures montantes ou plates complètement fermées obligatoires (pas de tongs ou sandales)',
      'Matériau solide résistant aux liquides corrosifs',
      'Éviter les chaussures en toile fine hautement absorbantes'
    ],
    tips: 'Le cuir ou les synthétiques épais ralentissent efficacement le passage d\'un liquide chaud ou acide.',
    icon: Footprints,
    color: 'text-rose-600',
    borderColor: 'border-rose-100',
    bgColor: 'bg-rose-50/50',
    textColor: 'text-rose-900',
    image: chaussuresImg,
    imagePlaceholder: 'Chaussures de travail fermées et robustes'
  }
];

export const EPISection: React.FC = () => {
  const [selectedEPI, setSelectedEPI] = useState<EPIItem | null>(null);

  return (
    <section className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-sm border border-slate-100" id="epi-section">
      <div className="mb-10 text-center sm:text-left">
        <div className="flex items-center gap-3 justify-center sm:justify-start mb-2">
          <Shield className="w-6 h-6 text-indigo-600 shrink-0" />
          <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">
            Équipement de Protection Individuelle (EPI)
          </h2>
        </div>
        <p className="text-slate-600 font-medium">
          Les équipements indispensables requis pour garantir votre sécurité lors de chaque séance pratique de chimie.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {EPI_DATA.map((epi) => {
          const Icon = epi.icon;
          const isSelected = selectedEPI?.id === epi.id;
          return (
            <motion.div
              key={epi.id}
              whileHover={{ y: -6 }}
              className={`cursor-pointer rounded-3xl p-5 border-2 transition-all flex flex-col justify-between ${
                isSelected 
                  ? 'border-indigo-600 bg-indigo-50/30' 
                  : `${epi.borderColor} ${epi.bgColor} hover:shadow-lg`
              }`}
              onClick={() => setSelectedEPI(isSelected ? null : epi)}
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-4 shadow-sm ${epi.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-black tracking-widest text-slate-400 uppercase block mb-1">
                  {epi.category}
                </span>
                <h3 className="text-sm font-black text-slate-800 leading-tight">
                  {epi.name}
                </h3>
              </div>
              
              <div className="mt-4 pt-3 border-t border-dashed border-slate-200/60 flex items-center justify-between text-indigo-600 font-bold hover:text-indigo-800">
                <span>Détails & règles</span>
                <span>→</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selectedEPI && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-8"
          >
            <div className="bg-slate-50 rounded-[2.5rem] border-2 border-slate-100 p-8">
              <div className="flex flex-col lg:flex-row gap-8 justify-between">
                
                {/* Left info column */}
                <div className="flex-1 space-y-6">
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-indigo-600">
                      Focus équipement : {selectedEPI.category}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-1">
                      {selectedEPI.name}
                    </h3>
                  </div>

                  <p className="text-slate-700 leading-relaxed font-semibold">
                    {selectedEPI.importance}
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600" /> Règles de manipulation :
                    </h4>
                    <ul className="space-y-2">
                      {selectedEPI.rules.map((rule, idx) => (
                        <li key={idx} className="text-sm text-slate-700 font-semibold flex items-start gap-2">
                          <span className="text-indigo-500 mt-1 shrink-0">•</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-bold text-indigo-900">Le Saviez-Vous ?</h4>
                      <p className="text-xs text-slate-600 font-semibold leading-relaxed mt-1">
                        {selectedEPI.tips}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right image/placeholder column */}
                <div className="w-full lg:w-80 shrink-0">
                  <div className="bg-white rounded-3xl border-2 border-slate-200/60 p-4 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-sm">
                    {/* High-quality generated image */}
                    <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 mb-3 group relative">
                      <img 
                        src={selectedEPI.image} 
                        alt={selectedEPI.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 p-1.5 bg-white/95 backdrop-blur-sm rounded-lg shadow-sm border border-slate-100">
                        {React.createElement(selectedEPI.icon, { className: "w-4 h-4 text-indigo-600" })}
                      </div>
                    </div>
                    
                    <h4 className="font-black text-slate-800 leading-tight">
                      {selectedEPI.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 italic px-4 font-semibold">
                      Photo de référence ({selectedEPI.category.toLowerCase()})
                    </p>
                    
                    <div className="w-full mt-3 bg-slate-50 border-t border-slate-100 py-2.5 text-center rounded-xl">
                      <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">
                        {selectedEPI.id.toUpperCase()}-EPI-EN-CLASSE
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
