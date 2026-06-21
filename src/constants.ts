export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  pictogramUrl?: string;
  pictogramName?: string;
  explanation?: string;
  type?: 'qcm' | 'vrai_faux' | 'texte_a_trous';
  textAfter?: string; // Optional text following text_a_trous gaps
}

export interface TP {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  level: 'Tronc Commun' | '1ère Bac' | '2ème Bac';
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  duration: string;
  setupImage?: string;
  materials?: string[];
  chemicals?: string[];
  protocol?: string[];
  hazards?: string[];
  precautions?: string[];
  quiz?: QuizQuestion[];
  videoUrl?: string;
  chemicalTable?: Array<{ name: string; state: string; hazards: string }>;
  afterQuizImage?: string;
}

export interface SDSMaterial {
  id: string;
  name: string;
  fullName: string; // Nom complet avec formule
  formula: string;
  molarMass: string;
  physicalState: string; // État physique
  meltingPoint: string; // Température de fusion
  commonNames?: string[];
  ph?: string;
  density?: string;
  boilingPoint?: string;
  appearance: string;
  safetyPictograms: string[]; // IDs from SAFETY_PICTOGRAMS
  signalWord: 'Danger' | 'Attention' | 'Aucun';
  hStatements: string[];
  pStatements: string[];
  healthHazards: string[];
  ppeRequired: string[]; // EPI requis
  firstAid: string[];
  qrCodeUrl: string;
  quiz: QuizQuestion[];
  storageConditions: string;
}

export interface SafetyPictogram {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  hazards: string[];
}

export const SAFETY_PICTOGRAMS: SafetyPictogram[] = [
  {
    id: 'ghs01',
    code: 'GHS01',
    name: 'Explosif',
    description: 'Substances et mélanges explosibles, autoréactifs ou peroxydes organiques.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/GHS-pictogram-explos.svg',
    hazards: ['Risque d\'explosion par le feu, le choc ou le frottement', 'Danger de projection de fragments']
  },
  {
    id: 'ghs02',
    code: 'GHS02',
    name: 'Inflammable',
    description: 'Gaz, aérosols, liquides et solides inflammables; substances autoréactives ou pyrophoriques.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/GHS-pictogram-flamme.svg',
    hazards: ['Peut s\'enflammer au contact d\'une flamme, d\'une étincelle ou de la chaleur', 'Peut s\'enflammer spontanément à l\'air']
  },
  {
    id: 'ghs03',
    code: 'GHS03',
    name: 'Comburant',
    description: 'Gaz, liquides et solides comburants.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/GHS-pictogram-rondflam.svg',
    hazards: ['Peut provoquer ou aggraver un incendie', 'Favorise la combustion de matières inflammables']
  },
  {
    id: 'ghs04',
    code: 'GHS04',
    name: 'Gaz sous pression',
    description: 'Gaz comprimés, liquéfiés, dissous ou réfrigérés.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/GHS-pictogram-bottle.svg',
    hazards: ['Peut exploser sous l\'effet de la chaleur', 'Risque de brûlures ou blessures cryogéniques']
  },
  {
    id: 'ghs05',
    code: 'GHS05',
    name: 'Corrosif',
    description: 'Substances corrosives pour les métaux et provoquant des brûlures cutanées graves.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/GHS-pictogram-acid.svg',
    hazards: ['Provoque des brûlures de la peau et des lésions oculaires graves', 'Peut attaquer et détruire les métaux']
  },
  {
    id: 'ghs06',
    code: 'GHS06',
    name: 'Toxique',
    description: 'Toxicité aiguë par voie orale, cutanée ou par inhalation.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/58/GHS-pictogram-skull.svg',
    hazards: ['Mortel ou toxique en cas d\'ingestion', 'Danger grave même à faible dose']
  },
  {
    id: 'ghs07',
    code: 'GHS07',
    name: 'Irritant / Nocif',
    description: 'Toxicité aiguë, sensibilisation cutanée, irritation des yeux ou des voies respiratoires.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/GHS-pictogram-exclam.svg',
    hazards: ['Provoque une irritation de la peau ou des yeux', 'Nocif en cas d\'ingestion ou d\'inhalation']
  },
  {
    id: 'ghs08',
    code: 'GHS08',
    name: 'Danger pour la santé',
    description: 'Cancérogénicité, mutagénicité, toxicité pour la reproduction ou les organes cibles.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/21/GHS-pictogram-silhouette.svg',
    hazards: ['Risque de cancer ou d\'altération génétique', 'Peut nuire à la fertilité ou au fœtus']
  },
  {
    id: 'ghs09',
    code: 'GHS09',
    name: 'Polluant',
    description: 'Danger pour le milieu aquatique (toxicité aiguë ou chronique).',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/GHS-pictogram-pollu.svg',
    hazards: ['Très toxique pour les organismes aquatiques', 'Effets néfastes à long terme sur l\'environnement']
  }
];

export const TP_DATA: TP[] = [
  {
    id: '1',
    title: 'Titrage acide-base — NaOH / HCl',
    description: 'Détermination de la concentration d\'une solution d\'acide chlorhydrique par titrage avec une solution de soude (NaOH) en utilisant la phénolphtaléine comme indicateur coloré.',
    image: '/src/assets/images/titration_lab_setup_1781334328850.jpg',
    category: 'Chimie analytique',
    level: '1ère Bac',
    difficulty: 'Débutant',
    duration: '1h30',
    setupImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Titration_setup.svg/512px-Titration_setup.svg.png',
    materials: ['Burette graduée 25mL', 'Erlenmeyer 100mL', 'Pipette jaugée 10mL', 'Propipette', 'Support et pince'],
    chemicals: ['Acide chlorhydrique (HCl) à concentration inconnue', 'Solution de soude (NaOH) 0,1 mol/L', 'Phénolphtaléine'],
    chemicalTable: [
      { name: 'Acide chlorhydrique', state: 'Liquide', hazards: 'H314, H335' },
      { name: 'Soude (NaOH)', state: 'Liquide', hazards: 'H314, H290' },
      { name: 'Phénolphtaléine', state: 'Solution alcoolique', hazards: 'H225, H350' }
    ],
    protocol: [
      'Préparation de la burette : Rincer la burette avec de l\'eau distillée puis avec la solution de soude (NaOH) à 0,1 mol/L.',
      'Remplissage : Remplir la burette avec la soude et ajuster le ménisque au zéro en s\'assurant de l\'absence de bulles d\'air dans la pointe.',
      'Prélèvement : Prélever exactement 10,0 mL de la solution d\'acide chlorhydrique (HCl) à l\'aide d\'une pipette jaugée munie d\'une propipette.',
      'Transfert : Verser le prélèvement dans un erlenmeyer propre et ajouter environ 20 mL d\'eau distillée pour immerger correctement le barreau aimanté si nécessaire.',
      'Indicateur : Ajouter 3 gouttes de phénolphtaléine dans l\'erlenmeyer. La solution doit rester incolore.',
      'Agitation : Placer l\'erlenmeyer sur un agitateur magnétique et lancer une agitation régulière sans éclaboussures.',
      'Titrage rapide : Effectuer un premier titrage rapide pour déterminer une valeur approchée du volume équivalent (ml par ml).',
      'Titrage précis : Remplir à nouveau la burette et verser la soude goutte à goutte à l\'approche du volume estimé.',
      'Équivalence : Arrêter le versage dès l\'apparition d\'une coloration rose pâle persistante pendant au moins 30 secondes.',
      'Mesure : Lire le volume équivalent Ve sur la graduation de la burette.',
      'Exploitation : Réaliser un deuxième titrage précis pour valider la mesure.'
    ],
    hazards: ['La soude est corrosive et peut causer des lésions oculaires graves', 'L\'acide chlorhydrique est irritant'],
    precautions: ['Porter obligatoirement une blouse boutonnée et des lunettes de protection', 'Rincer immédiatement à l\'eau en cas de contact', 'Gants recommandés pour la manipulation de la soude'],
    quiz: [
      {
        question: "Pourquoi le port de lunettes de protection est-il obligatoire même pour un titrage avec des solutions diluées ?",
        options: [
          "C'est une règle de style",
          "Une projection de soude même diluée peut causer des dommages irréversibles à la cornée par saponification",
          "Pour protéger de la pouissière"
        ],
        correctAnswer: 1,
        explanation: "La soude s'attaque rapidement aux lipides des tissus oculaires via la réaction de saponification, d'où un danger oculaire permanent."
      },
      {
        question: "En cas de projection de soude (NaOH) sur la main, quelle est la première action à réaliser ?",
        options: [
          "Essuyer avec un papier",
          "Rincer immédiatement et abondamment à l'eau courante pendant au moins 15-20 minutes",
          "Mettre du vinaigre pour neutraliser"
        ],
        correctAnswer: 1,
        explanation: "Un lavage prolongé à l'eau courante permet de diluer la base et de la décoller de l'épiderme en limitant sa pénétration profonde."
      },
      {
        question: "Pourquoi est-il strictement interdit de pipeter les solutions à la bouche lors de ce TP ?",
        options: [
          "À cause du mauvais goût",
          "Risque d'ingestion accidentelle de produits corrosifs (acide ou base)",
          "Pour ne pas salir la solution"
        ],
        correctAnswer: 1,
        explanation: "Pipeter à la bouche expose à des risques d'ingestion accidentelle directe d'acides ou bases fortes irritants ou de solvants."
      },
      {
        question: "Que faire si une bulle d'air est présente dans la pointe de la burette remplie de soude ?",
        options: [
          "L'ignorer",
          "L'évacuer en ouvrant brusquement le robinet dans un bécher de récupération car elle fausse la mesure et peut projeter du liquide",
          "Souffler dedans"
        ],
        correctAnswer: 1,
        explanation: "Une bulle logée dans la pointe altère le volume réel rejeté lors du dosage si elle s'échappe au cours de l'équivalence."
      },
      {
        question: "Pourquoi doit-on manipuler la phénolphtaléine avec précaution (H350) ?",
        options: [
          "Elle tache les vêtements",
          "Elle est classée comme potentiellement cancérogène et irritante",
          "Elle est très explosive"
        ],
        correctAnswer: 1,
        explanation: "La phénolphtaléine brute est classée CMR (cancérogène d'après les normes internationales SGH), ce qui nécessite soin et port de gants."
      },
      {
        question: "Quelle est la conduite à tenir en cas de bris de verrerie (bécher ou erlenmeyer) ?",
        options: [
          "Ramasser les morceaux à la main",
          "Avertir le professeur, ramasser avec une balayette et jeter dans le bac à verre spécifique",
          "Laisser sous la paillasse"
        ],
        correctAnswer: 1,
        explanation: "Manipuler du verre brisé à sec à la main augmente les risques de coupures profondes. On emploie pelle, balayette et poubelle sélective."
      },
      {
        question: "Lors du remplissage de la burette, pourquoi utilise-t-on un entonnoir placé au-dessus du niveau des yeux ?",
        options: [
          "Pour verser plus vite",
          "C'est une erreur, le haut de la burette doit être abaissé au niveau des yeux pour éviter les projections sur le visage",
          "Pour ne pas en mettre à côté"
        ],
        correctAnswer: 1,
        explanation: "Garder le goulot à hauteur des yeux évite que de l'acide ou de la soude ne soit accidentellement versé directement sur le visage par gravité."
      },
      {
        question: "Pourquoi est-il important de boucher les flacons de réactifs (NaOH, HCl) immédiatement après usage ?",
        options: [
          "Pour éviter les odeurs",
          "Éviter les chutes, la contamination et l'absorption de CO2 par la soude (carbonatation)",
          "C'est optionnel"
        ],
        correctAnswer: 1,
        explanation: "La soude capte le CO2 atmosphérique pour donner du carbonate de sodium inactif, ce qui diminue graduellement sa concentration efficace."
      },
      {
        question: "À la fin du TP, comment doit-on gérer les restes de solutions de ce titrage ?",
        options: [
          "Les jeter directement à l'évier avec beaucoup d'eau pour neutralisation",
          "Les verser dans un bidon de récupération spécifique \"Acides/Bases\"",
          "Les laisser dans la burette"
        ],
        correctAnswer: 1,
        explanation: "Par mesure de sécurité environnementale, les surplus d'acides et de bases doivent être neutralisés ou versés dans un bidon collecteur approprié."
      },
      {
        question: "Pourquoi doit-on porter une blouse en coton boutonnée durant toute la manipulation ?",
        options: [
          "Pour avoir chaud",
          "Elle constitue une barrière de protection contre les projections et se retire plus vite qu'un vêtement synthétique en cas d'imbibition",
          "Pour ne pas salir ses vêtements"
        ],
        correctAnswer: 1,
        explanation: "Une blouse protège la peau et évite que les fibres synthétiques de vos vêtements d'origine ne fondent au contact d'acides ou de chaleurs brusques."
      },
      {
        question: "Quelle est l'équation chimique de la réaction de dosage entre l'acide chlorhydrique et la soude ?",
        options: [
          "H3O+ + HO- -> 2H2O",
          "Na+ + Cl- -> NaCl",
          "HCl + NaOH -> H2O + NaCl2",
          "H+ + HO- + Na+ + Cl- -> NaCl + H2"
        ],
        correctAnswer: 0,
        explanation: "C'est la réaction de neutralisation acido-basique classique entre l'ion oxonium H3O+ de l'acide fort et l'ion hydroxyde HO- de la base forte."
      },
      {
        question: "Comment définit-on précisément l'équivalence d'un titrage ?",
        options: [
          "Le moment où le pH est égal à 7,0",
          "Le moment où les volumes versés d'acide et de base sont identiques",
          "Le moment où les réactifs titrant et titré ont été introduits dans les proportions stœchiométriques de l'équation",
          "Le moment où la solution devient de couleur incolore"
        ],
        correctAnswer: 2,
        explanation: "L'équivalence marque la consommation complète du réactif à doser par l'espèce titrante correspondante apportée."
      },
      {
        question: "À l'équivalence du titrage d'un acide fort par une base forte à 25 °C, que vaut le pH de la solution ?",
        options: [
          "pH = 1,0",
          "pH = 7,0",
          "pH = 14,0",
          "La solution devient acide"
        ],
        correctAnswer: 1,
        explanation: "Les ions Na+ et Cl- sont spectateurs inertes au plan acido-basique. La neutralisation totale produit de l'eau pure neutre de pH = 7,0."
      },
      {
        question: "Quelle formule permet de calculer la concentration d'acide Ca à partir du volume Va et de Cb, Vbe ?",
        options: [
          "Ca = (Cb * Va) / Vbe",
          "Ca = (Cb * Vbe) / Va",
          "Ca = Cb * Vbe * Va",
          "Ca = Va / (Cb * Vbe)"
        ],
        correctAnswer: 1,
        explanation: "À l'équivalence, on a n(acide) = n(base), soit Ca * Va = Cb * Vbe, d'où Ca = (Cb * Vbe) / Va."
      },
      {
        question: "Pourquoi l'adjonction d'eau distillée dans l'erlenmeyer ne modifie-t-elle pas le volume équivalent ?",
        options: [
          "Car l'eau distillée est basique et neutralise l'acide",
          "Car l'adjonction d'eau ne modifie pas la quantité de matière initiale d'ions H3O+ à titrer dans le récipient",
          "Parce qu'elle accélère l'interactivité de la sonde de pH",
          "Elle modifie au contraire le volume équivalent"
        ],
        correctAnswer: 1,
        explanation: "Ajouter de l'eau modifie le volume total et la concentration de départ, mais le nombre initial de moles d'ions acides reste constant."
      },
      {
        question: "Si Ve = 12,0 mL de NaOH à 0,10 mol/L dose Va = 10,0 mL d'acide, quelle est la concentration Ca ?",
        options: [
          "0,12 mol/L",
          "0,012 mol/L",
          "1,20 mol/L",
          "0,083 mol/L"
        ],
        correctAnswer: 0,
        explanation: "Ca = (Cb * Ve) / Va = (0,10 * 12,0) / 10,0 = 0,12 mol/L."
      },
      {
        question: "Quelle est la définition d'un acide fort selon la théorie de Brønsted ?",
        options: [
          "Un composé qui se dissocie partiellement en libérant des électrons",
          "Un acide qui s'ionise totalement dans l'eau pour libérer un proton H+",
          "Un solvant inerte hydrophile",
          "Un composé basique soluble"
        ],
        correctAnswer: 1,
        explanation: "Les acides forts (ex: HCl, HNO3) se dissocient complètement et instantanément dans l'eau pour produire des ions oxonium H3O+."
      },
      {
        question: "Quelle espèce chimique est responsable du caractère basique d'une solution aqueuse de soude (NaOH) ?",
        options: [
          "L'ion sodium Na+",
          "L'ion hydroxyde HO-",
          "La molécule insoluble NaOH gazeuse",
          "Les ions hydronium H3O+"
        ],
        correctAnswer: 1,
        explanation: "Le caractère basique provient spécifiquement de l'ion hydroxyde HO-, qui capte activement des protons H+."
      },
      {
        question: "Pourquoi la phénolphtaléine vire-t-elle au rose lors du passage à l'équivalence ?",
        options: [
          "Elle vire sous l'action directe de la lumière",
          "L'excès d'une goutte de base forte fait brusquement grimper le pH au-dessus de 8,2, zone de virage de l'indicateur",
          "Parce que la solution refroidit",
          "La couleur change sous l'effet du chlorure de sodium"
        ],
        correctAnswer: 1,
        explanation: "La phénolphtaléine est incolore en milieu acide et neutre, puis vire au rose fuchsia dès que le pH s'établit au-dessus de 8,2."
      },
      {
        question: "Que se passe-t-il si l'on rince l'erlenmeyer avec la solution d'acide chlorhydrique avant de faire le prélèvement ?",
        options: [
          "La mesure est plus propre",
          "Le volume résiduel restant sur les parois faussera la quantité réelle d'acide introduite, surestimant la concentration réelle",
          "Le pH augmente spontanément",
          "Le verre devient plus fragile"
        ],
        correctAnswer: 1,
        explanation: "L'erlenmeyer doit toujours être rincé à l'eau distillée seulement. Tout dépôt acide supplémentaire fausserait la stœchiométrie."
      }
    ]
  },
  {
    id: '2',
    title: 'Extraction de la caféine du thé',
    description: 'Mise en œuvre d\'une extraction solide-liquide à partir de feuilles de thé, suivie d\'une extraction liquide-liquide pour isoler la caféine pure.',
    image: '/src/assets/images/caffeine_extraction_setup_1781340828834.jpg',
    category: 'Chimie organique',
    level: '2ème Bac',
    difficulty: 'Intermédiaire',
    duration: '3h',
    setupImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Reflux_condenser_setup.svg/512px-Reflux_condenser_setup.svg.png',
    videoUrl: 'https://www.youtube.com/embed/7_AOw68oxOw',
    materials: ['Ampoule à décanter', 'Ballon et chauffage', 'Montage à reflux', 'Évaporateur rotatif'],
    chemicals: ['Thé en feuilles', 'Dichlorométhane', 'Carbonate de sodium', 'Sulfate de magnésium anhydre'],
    chemicalTable: [
      { name: 'Dichlorométhane', state: 'Liquide incolore', hazards: 'H315, H319, H336, H351' },
      { name: 'Carbonate de sodium', state: 'Solide blanc', hazards: 'H319' }
    ],
    protocol: [
      'Infusion : Placer les feuilles de thé dans un ballon avec 100 mL d\'eau distillée et 2 g de carbonate de sodium.',
      'Chauffage à reflux : Chauffer le mélange pendant 30 minutes après ébullition pour extraire la caféine et les tanins.',
      'Filtration : Filtrer le mélange encore chaud à l\'aide d\'un entonnoir et d\'un coton ou papier filtre pour éliminer les résidus solides.',
      'Refroidissement : Laisser refroidir le filtrat à température ambiante, puis dans un bain de glace.',
      'Extraction liquide-liquide : Verser le filtrat dans une ampoule à décanter et ajouter 10 mL de dichlorométhane (DCM).',
      'Agitation : Agiter doucement l\'ampoule en dégazant régulièrement pour éviter l\'accumulation de pression due aux vapeurs de solvant.',
      'Décantation : Laisser reposer jusqu\'à séparation nette des deux phases. La phase organique (DCM) est au fond (plus dense).',
      'Récupération : Soutirer la phase organique inférieure dans un erlenmeyer.',
      'Répétition : Répéter l\'extraction deux autres fois avec 10 mL de DCM frais pour maximiser le rendement.',
      'Séchage : Ajouter du sulfate de magnésium anhydre aux phases organiques réunies pour éliminer les traces d\'eau.',
      'Évaporation : Évaporer le dichlorométhane à l\'aide d\'un évaporateur rotatif pour isoler la caféine brute sous forme solide.',
      'Purification (optionnel) : Procéder à une recristallisation ou une sublimation pour obtenir de la caféine pure.'
    ],
    hazards: ['Le dichlorométhane est volatile, nocif et potentiellement cancérogène', 'Les brûlures avec le thé bouillant'],
    precautions: ['Manipuler impérativement sous hotte aspirante ventilée', 'Porter des gants et des lunettes de protection', 'Ouvrir régulièrement le robinet de l\'ampoule à décanter pour dégazer'],
    quiz: [
      {
        question: "Pourquoi l'utilisation du dichlorométhane (DCM) impose-t-elle une manipulation STRICTE sous hotte ventilée ?",
        options: [
          "À cause de son odeur sucrée",
          "Il est hautement volatil, nocif par inhalation et ses vapeurs sont plus denses que l'air",
          "Pour éviter qu'il ne s'évapore trop vite"
        ],
        correctAnswer: 1,
        explanation: "Le DCM possède une tension de vapeur très élevée. Ses vapeurs nocives peuvent induire des intoxications ou maux de tête s'il est respiré."
      },
      {
        question: "Quel est le danger majeur de l'ampoule à décanter lors de l'agitation avec du DCM ?",
        options: [
          "Elle peut glisser des mains",
          "La montée en pression due à la volatilisation du solvant peut provoquer l'explosion de l'ampoule si elle n'est pas dégazée",
          "Les phases ne se séparent pas"
        ],
        correctAnswer: 1,
        explanation: "Secouer augmente la volatilisation du DCM. Sans dégazage régulier via le robinet, la surpression interne peut éjecter le bouchon ou casser le verre."
      },
      {
        question: "Pourquoi doit-on dégazer l'ampoule en la dirigeant vers une zone vide (pas vers un collègue) ?",
        options: [
          "Pour ne pas faire de bruit",
          "Le jet de vapeurs et de liquide peut être projeté violemment par la pression interne",
          "Pour ne pas gâcher de caféine"
        ],
        correctAnswer: 1,
        explanation: "Le dégagement sous pression contient des gouttelettes de DCM corrosif et toxique; le diriger vers un lieu sûr protège d'autres laborantins."
      },
      {
        question: "Quel est le risque de chauffer un ballon (montage à reflux) sans avoir ajouté de grains de pierre ponce ou barreau aimanté ?",
        options: [
          "Le chauffage sera plus long",
          "Risque d'ébullition retardée suivie d'un sursaut violent projetant le mélange bouillant et brisant le montage",
          "Aucun"
        ],
        correctAnswer: 1,
        explanation: "Sans pierre ponce ni aimant, des surchauffes locales se forment. À l'amorçage retardé, une énorme bulle de vapeur surgit brusquement."
      },
      {
        question: "Le dichlorométhane est classé H351, ce qui signifie qu'il est :",
        options: [
          "Un corrosif puissant",
          "Susceptible de provoquer le cancer par exposition répétée",
          "Instable à la lumière"
        ],
        correctAnswer: 1,
        explanation: "La mention H351 signale une suspicion d'effets cancérogènes pour l'homme, d'où l'obligation d'opérer sous hotte fermée."
      },
      {
        question: "En cas de projection de DCM sur des gants en nitrile fins, que faire ?",
        options: [
          "Continuer la manipulation normalement",
          "Retirer immédiatement les gants car le DCM les traverse en quelques secondes (perméation)",
          "Les rincer à l'eau avec les gants"
        ],
        correctAnswer: 1,
        explanation: "Le DCM traverse extrêmement vite le nitrile ordinaire. Il faut ôter le gant pollué, rincer la peau nue, puis remettre des gants neufs."
      },
      {
        question: "Pourquoi le carbonate de sodium solide doit-il être manipulé avec des gants (H319) ?",
        options: [
          "Il colore la peau",
          "Il provoque une sévére irritation des muqueuses et des tissus par son caractère alcalin",
          "Il est radioactif"
        ],
        correctAnswer: 1,
        explanation: "Puisque le carbonate de sodium est basique, il s'avère très irritant pour l'épiderme et douloureux pour les yeux."
      },
      {
        question: "Lors du chauffage à reflux, pourquoi l'ébullition ne doit-elle pas être trop vigoureuse ?",
        options: [
          "Pour économiser l'électricité",
          "Éviter un engorgement du réfrigérant qui pourrait mener à une surpression et une fuite de vapeurs toxiques",
          "Pour que la caféine ne brûle pas"
        ],
        correctAnswer: 1,
        explanation: "Une chauffe excessive fait monter la zone de condensation au-delà du réfrigérant, d'où évaporation et pertes de solvant volatil."
      },
      {
        question: "Que faire si l'on ressent des vertiges ou une somnolence lors de l'usage du solvant (H336) ?",
        options: [
          "Boire un café",
          "Quitter immédiatement la zone hotte, aller à l'air frais et avertir un responsable",
          "S'asseoir à côté du montage"
        ],
        correctAnswer: 1,
        explanation: "H336 indique que les vapeurs inhalées provoquent de la somnolence et affectent le système nerveux. Il faut respirer de l'air sain."
      },
      {
        question: "Comment doit-on éliminer le dichlorométhane après l'extraction ?",
        options: [
          "Le verser à l'évier avec beaucoup d'eau",
          "Le collecter dans un bidon spécifique pour \"solvants chlorés\" (interdiction de mélange avec le non-chloré)",
          "Le laisser s'évaporer sous la hotte"
        ],
        correctAnswer: 1,
        explanation: "Les solvants chlorés subissent un retraitement de destruction distinct pour limiter les polluants atmosphériques acides."
      },
      {
        question: "Quelle est la technique physique majeure d'extraction solide-liquide exécutée lors de l'infusion initiale des feuilles de thé ?",
        options: [
          "L'infusion par macération à chaud dans l'eau bouillante",
          "La sublimation sous vide",
          "La centrifugation haute vitesse",
          "L'hydrodistillation active"
        ],
        correctAnswer: 0,
        explanation: "L'infusion à chaud dissout sélectivement les principes actifs solubles (caféine, tanins) contenus dans la matrice solide du thé."
      },
      {
        question: "Pourquoi ajoute-t-on du carbonate de sodium à l'infusion de thé ?",
        options: [
          "Pour colorer la solution en brun",
          "Pour déprotoner les tanins acides afin de les rendre solubles dans l'eau salée et insolubles dans le DCM, facilitant l'extraction sélective de la caféine",
          "Pour refroidir plus rapidement le ballon",
          "Pour accélérer la décomposition de la caféine"
        ],
        correctAnswer: 1,
        explanation: "Le carbonate de sodium alcalin convertit les tanins acides phénoliques en sels hautement hydrophiles solubles dans l'eau, laissant la caféine neutre migrer seule dans le DCM."
      },
      {
        question: "Quel est le rôle de l'ampoule à décanter lors de la phase liquide-liquide de ce TP ?",
        options: [
          "Filtrer le solide restant sous vide",
          "Séparer deux solvants non miscibles en tirant profit de leur différence de densité",
          "Chauffer le solvant pour le distiller",
          "Mesurer le volume équivalent"
        ],
        correctAnswer: 1,
        explanation: "L'ampoule sépare la phase aqueuse de la phase organique car ces deux phases ne se mélangent pas et se sédimentent par gravité."
      },
      {
        question: "Lors de la décantation eau/dichlorométhane, où se situe la phase organique contenant la caféine, et pourquoi ?",
        options: [
          "En haut, car le DCM flotte sur l'eau",
          "En bas, car le dichlorométhane possède une densité supérieure à celle de l'eau ($d \\approx 1,33$)",
          "Elle disparaît totalement",
          "Elle reste mélangée intimement sous forme gelée"
        ],
        correctAnswer: 1,
        explanation: "Le DCM a une densité de $1,33$, ce qui le rend nettement plus lourd que l'eau, s'accumulant donc par gravité dans la partie inférieure de l'ampoule."
      },
      {
        question: "Pourquoi réalise-t-on trois extractions successives avec 10 mL de DCM plutôt qu'une seule extraction avec 30 mL ?",
        options: [
          "Pour faire durer la séance de TP",
          "Parce que mathématiquement, des extractions répétées de petits volumes extraient une plus grande quantité globale de soluté d'après le coefficient de partage",
          "Parce que l'ampoule à décanter ne peut pas contenir 30 mL",
          "Pour réduire la pureté du produit obtenu"
        ],
        correctAnswer: 1,
        explanation: "La thermodynamique des équilibres de partage démontre que multiplier les extractions avec de faibles rations de solvant frais optimise le rendement d'isolements."
      },
      {
        question: "Quel composé anhydre utilise-t-on pour sécher la phase organique de DCM extraite, et dans quel but ?",
        options: [
          "Le chlorure de sodium humide",
          "Le sulfate de magnésium anhydre ($MgSO_4$) pour éponger les micro-gouttelettes d'eau dissoutes",
          "La silice gélifiée active",
          "Le charbon actif de bois"
        ],
        correctAnswer: 1,
        explanation: "Le sulfate de magnésium anhydre s'hydrate au contact de traces d'eau résiduelles pour former des cristaux hydratés insolubles faciles à filtrer."
      },
      {
        question: "Quel appareil de laboratoire permet d'éliminer rapidement le solvant DCM à basse température sous pression réduite ?",
        options: [
          "L'évaporateur rotatif",
          "Le four à micro-ondes",
          "L'agitateur magnétique chauffant",
          "L'ampoule de coulée"
        ],
        correctAnswer: 0,
        explanation: "L'évaporateur rotatif abaisse la pression interne, ce qui permet à des solvants volatils d'entrer en ébullition à très basse température, protégeant le soluté."
      },
      {
        question: "Quelle technique de purification classique permet d'obtenir des aiguilles blanches de caféine pure à partir du résidu brut ?",
        options: [
          "La filtration sur coton humide",
          "La sublimation directe sous chauffage modéré ou la recristallisation",
          "La précipitation acide",
          "La conductimétrie"
        ],
        correctAnswer: 1,
        explanation: "La caféine solide se sublime facilement à chaud ($178^\\circ C$). Ses vapeurs se condensent directement en aiguilles pures blanches au contact d'une paroi froide."
      },
      {
        question: "Comment qualifie-t-on deux phases liquides qui ne se mélangent pas et se séparent spontanément ?",
        options: [
          "Solutions miscibles",
          "Solutions non miscibles",
          "Complexes insolubles",
          "Émulsions permanentes"
        ],
        correctAnswer: 1,
        explanation: "Des liquides possédant des polarités divergentes (comme le DCM apolaire et l'eau très polaire) ne se mélangent pas et sont dits non miscibles."
      },
      {
        question: "Quelle propriété physico-chimique régit le transfert de la caféine de la phase aqueuse vers la phase organique de DCM ?",
        options: [
          "Le coefficient de partage thermodynamique de la caféine entre ces deux phases",
          "La constante d'acidité $pK_a$ de la molécule",
          "Le spectre de résonance magnétique nucléaire",
          "La conductivité électrique globale"
        ],
        correctAnswer: 0,
        explanation: "La caféine brute non ionisée est chimiquement beaucoup plus soluble dans le dichlorométhane organique à froid que dans l'eau aqueuse."
      }
    ]
  },
  {
    id: '3',
    title: 'Estérification et hydrolyse',
    description: 'Synthèse d\'un ester aromatique et étude du caractère réversible de la transformation.',
    image: '/src/assets/images/esterification_reflux_1781465621381.jpg',
    category: 'Chimie organique',
    level: '1ère Bac',
    difficulty: 'Intermédiaire',
    duration: '3h30',
    setupImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Separatory_funnel.svg/512px-Separatory_funnel.svg.png',
    videoUrl: 'https://www.youtube.com/embed/IQ7g1HWSkU4',
    materials: ['Montage à reflux', 'Ballon monocol', 'Chauffe-ballon', 'Ampoule à décanter'],
    chemicals: ['Acide éthanoïque', 'Éthanol', 'Acide sulfurique (catalyseur)', 'Solution saturée de sel'],
    chemicalTable: [
      { name: 'Acide sulfurique concentré', state: 'Liquide visqueux', hazards: 'H290, H314' },
      { name: 'Acide éthanoïque glacial', state: 'Liquide', hazards: 'H226, H314' },
      { name: 'Éthanol', state: 'Liquide', hazards: 'H225, H319' }
    ],
    protocol: [
      'Préparation : Introduire 20 mL d\'éthanol et 15 mL d\'acide éthanoïque dans un ballon monocol de 250 mL.',
      'Catalyse : Ajouter prudemment, sous agitation, 2 mL d\'acide sulfurique concentré.',
      'Régulation : Introduire quelques grains de pierre ponce pour régulariser l\'ébullition.',
      'Montage : Réaliser un montage à reflux pour éviter les pertes de matière par évaporation.',
      'Réaction : Chauffer le mélange à ébullition douce pendant environ 45 minutes.',
      'Arrêt : Stopper le chauffage et laisser refroidir le ballon à l\'air, puis dans un bain d\'eau froide.',
      'Séparation initiale : Verser le mélange dans une ampoule à décanter contenant 50 mL d\'eau salée saturée.',
      'Lavage acide : Éliminer la phase aqueuse et laver la phase organique avec une solution de carbonate de sodium pour neutraliser l\'acide restant.',
      'Séchage : Récupérer la phase organique supérieure (ester) et la sécher sur du chlorure de calcium anhydre.',
      'Analyse : Caractériser l\'ester par son odeur fruitée caractéristique et éventuellement par son indice de réfraction.'
    ],
    hazards: ['L\'acide sulfurique concentré est extrêmement corrosif et provoque des brûlures profondes', 'L\'éthanol et l\'acide éthanoïque sont inflammables'],
    precautions: ['Port des lunettes de sécurité et d\'une blouse obligatoire', 'Manipulation sous hotte aspirante pour éviter l\'inhalation de vapeurs irritantes', 'Ne jamais ajouter d\'eau dans l\'acide sulfurique concentré'],
    quiz: [
      {
        question: "Pourquoi l'ajout d'acide sulfurique concentré doit-il être fait TRÈS goutte à goutte dans ce mélange (catalyse) ?",
        options: [
          "Pour ne pas rater le ballon",
          "Sa réaction avec le mélange organique est très exothermique et peut provoquer une ébullition brutale s'il est versé trop vite",
          "Pour économiser le produit"
        ],
        correctAnswer: 1,
        explanation: "L'hydratation de l'acide sulfurique ou sa solvatation dégage une chaleur considérable (exothermie), risquant des projections d'acide chaud."
      },
      {
        question: "Pourquoi est-il crucial de ne JAMAIS verser d'eau dans un flacon d'acide sulfurique ?",
        options: [
          "Cela dilue trop l'acide",
          "Le dégagement de chaleur instantané provoque une éjection violente d'acide concentré sur l'opérateur",
          "Cela change la couleur"
        ],
        correctAnswer: 1,
        explanation: "La règle d’or en chimie est d’ajouter de l'acide dans l'eau et non l'inverse. Verser de l’eau provoque une ébullition locale projetant l’acide concentré."
      },
      {
        question: "Lors du montage à reflux, pourquoi ne doit-on JAMAIS boucher hermétiquement le haut du réfrigérant ?",
        options: [
          "Pour laisser s'évaporer les produits",
          "Une montée en température dans un système clos provoquerait une explosion sous l'effet de la pression des vapeurs",
          "Pour que l'air circule"
        ],
        correctAnswer: 1,
        explanation: "Le chauffage dilate les gaz et vaporise le solvant. S'il n'y a pas d'ouverture vers l'atmosphère, la surpression détruira le montage en verre."
      },
      {
        question: "L'acide éthanoïque glacial est classé H226 et H314. Cela signifie qu'il est :",
        options: [
          "Comestible et parfumé",
          "Inflammable et responsable de brûlures chimiques graves",
          "Explosif à l'obscurité"
        ],
        correctAnswer: 1,
        explanation: "La mention H226 indique l'inflammabilité et H314 signale des brûlures cutanées et lésions oculaires graves."
      },
      {
        question: "Quel est le risque de lancer une flamme nue près du montage lors de l'utilisation de l'éthanol ?",
        options: [
          "L'éthanol s'évapore plus vite",
          "Risque d'incendie immédiat car les vapeurs d'éthanol (H225) sont inflammables",
          "Aucun"
        ],
        correctAnswer: 1,
        explanation: "L'éthanol possède un point d'éclair bas ($13^\\circ C$), ce qui signifie qu'il émet des vapeurs hautement inflammables prêtes à s'enflammer."
      },
      {
        question: "Pourquoi utilise-t-on des grains de pierre ponce pour la sécurité du chauffage ?",
        options: [
          "Pour stabiliser le ballon",
          "Pour assurer une ébullition douce et prévenir les projections de liquide bouillant (sursauts)",
          "Pour catalyser la réaction"
        ],
        correctAnswer: 1,
        explanation: "Les micro-cavités de la pierre ponce libèrent de petites bulles d'air régulières, évitant la survenue de bulles géantes violentes."
      },
      {
        question: "Lavage au carbonate de sodium : Pourquoi est-il impératif de dégazer l'ampoule très fréquemment ?",
        options: [
          "Pour évacuer l'odeur d'ester",
          "La réaction de neutralisation produit du CO2 gazeux qui met l'ampoule sous forte pression",
          "Pour que les phases se séparent"
        ],
        correctAnswer: 1,
        explanation: "Les ions carbonates réagissent avec l'acide résiduel pour libérer du dioxyde de carbone gazeux ($CO_2$). Il faut ouvrir le robinet tête en bas pour évacuer ce gaz."
      },
      {
        question: "Que faire en cas de projection d'acide sulfurique sur la blouse et la peau ?",
        options: [
          "Continuer le TP",
          "Retirer immédiatement la blouse et rincer abondamment à l'eau claire pendant 20 min",
          "Mettre du bicarbonate"
        ],
        correctAnswer: 1,
        explanation: "Le rinçage à grand jet d’eau froide doit être immédiat pour stopper la brûlure corrosive qui détruit les tissus cutanés."
      },
      {
        question: "Quelle est la mention de danger H335 associée à l'acide éthanoïque pur ?",
        options: [
          "Très toxique pour les poissons",
          "Irritation sévère des voies respiratoires en cas d'inhalation de vapeurs",
          "Risque de vertiges"
        ],
        correctAnswer: 1,
        explanation: "L'inhalation prolongée de fortes concentrations de vapeurs d'acide acétique provoque une irritation douloureuse des poumons et de la gorge."
      },
      {
        question: "Pourquoi l'eau de refroidissement doit-elle circuler en permanence lors du chauffage à reflux ?",
        options: [
          "Pour refroidir le ballon",
          "Pour condenser les vapeurs de solvants inflammables et corrosifs et les empêcher de s'échapper dans la salle",
          "Pour faire moins de bruit"
        ],
        correctAnswer: 1,
        explanation: "Le fluide réfrigérant intercepte les molécules de solvant gazeux s'échappant du ballon et les recondense sous forme liquide pour qu'elles retombent."
      },
      {
        question: "Quelle est la formule chimique de l'ester synthétisé lors de ce TP (éthanoate d'éthyle) ?",
        options: [
          "CH3-COO-CH2-CH3",
          "CH3-CH2-COO-CH3",
          "H-COO-CH2-CH2-CH3",
          "CH3-O-CH2-CH3"
        ],
        correctAnswer: 0,
        explanation: "L'éthanoate d'éthyle s'écrit CH3-COOCH2-CH3, résultant du greffage du groupe éthyle de l'éthanol sur le carboxyle de l'acide éthanoïque."
      },
      {
        question: "Pourquoi la réaction d'estérification directe entre un acide carboxylique et un alcool est-elle qualifiée de réversible ?",
        options: [
          "Elle tourne en rond indéfiniment",
          "Parce que l'acide se régénère par dissociation lumineuse",
          "Parce que l'ester et l'eau produits réagissent eux-mêmes ensemble pour reformer l'acide et l'alcool d'origine (réaction d'hydrolyse)",
          "Parce qu'elle dépend uniquement de la quantité de sel de table"
        ],
        correctAnswer: 2,
        explanation: "L'estérification et l'hydrolyse sont deux réactions inverses et simultanées qui s'affrontent jusqu'à atteindre un état d'équilibre thermodynamique."
      },
      {
        question: "Quel rôle joue l'acide sulfurique concentré dans cette réaction ?",
        options: [
          "Il sert uniquement de colorant rose",
          "C'est un réactif limitant consommé pendant la réaction",
          "C'est un catalyseur acide qui accélère l'établissement de l'équilibre sans modifier l'état final du système",
          "Il sert d'indicateur coloré"
        ],
        correctAnswer: 2,
        explanation: "Les protons H+ apportés par l'acide fort augmentent la vitesse d'estérification en activant le carbone du groupe carbonyle, mais l'acide est restitué à la fin."
      },
      {
        question: "Quelles sont les trois caractéristiques fondamentales d'une estérification directe à partir d'un acide carboxylique ?",
        options: [
          "Lente, endothermique et totale",
          "Lente, athermique et limitée (équilibre)",
          "Rapide, exothermique et instantanée",
          "Totale, spontanée et réversible"
        ],
        correctAnswer: 1,
        explanation: "L'estérification de Brønsted est lente (nécessite catalyseur et chauffage), athermique (ne dégage pas de chaleur propre) et limitée (rendement d'environ 67% pour un alcool primaire)."
      },
      {
        question: "Comment appelle-t-on le déplacement du système permettant d'augmenter le rendement de l'estérification de manière simple ?",
        options: [
          "L'agitation supersonique",
          "L'élimination par distillation d'un des produits (l'eau ou l'ester) au fur et à mesure de sa formation, ou l'utilisation d'un réactif en excès",
          "L'isolation thermique du réfrigérant",
          "L'usage d'acide chlorhydrique pur à la place"
        ],
        correctAnswer: 1,
        explanation: "Évacuer l'eau ou l'ester perturbe l'équilibre chimique (principe de Le Chatelier), ce qui force le système à réagir pour compenser, maximisant la synthèse."
      },
      {
        question: "Quel est le rendement maximal théorique de l'estérification si l'on part d'un mélange équimolaire d'acide carboxylique et d'alcool primaire ?",
        options: [
          "Environ 33%",
          "Environ 60%",
          "Environ 67%",
          "100% (réaction totale)"
        ],
        correctAnswer: 2,
        explanation: "Pour les alcools primaires (comme l'éthanol), la constante d'équilibre d'estérification vaut environ 4, ce qui correspond à un taux de conversion maximal de 67%."
      },
      {
        question: "Pourquoi rince-t-on la phase organique avec de l'eau salée saturée (relargage) plutôt qu'avec de l'eau pure ?",
        options: [
          "Pour donner du goût à l'ester",
          "Pour réduire fortement la solubilité de l'ester dans la phase aqueuse, maximisant ainsi sa récupération dans la phase supérieure",
          "C'est indispensable pour bloquer la corrosion",
          "Pour diluer l'acide sans risque"
        ],
        correctAnswer: 1,
        explanation: "L'éthanoate d'éthyle est légèrement polaire et un peu soluble dans l'eau. Dans une eau saturée en sel (NaCl), ses molécules s'agrègent et se séparent complètement."
      },
      {
        question: "Quel réactif utilise-t-on de manière classique pour doser l'acide restant après une durée présélectionnée de réaction ?",
        options: [
          "L'eau salée",
          "Une solution aqueuse d'hydroxyde de sodium (soude) en présence de phénolphtaléine",
          "L'indicateur hélianthine",
          "Le sulfate de cuivre bleui"
        ],
        correctAnswer: 1,
        explanation: "L'acide restant (éthanoïque et catalyseur sulfurique) est dosé quantitativement par une base forte pour suivre la cinétique de la réaction."
      },
      {
        question: "Dans quel sens se déplace l'équilibre si l'on ajoute une grande quantité d'eau distillée dans l'ester pur obtenu ?",
        options: [
          "Dans le sens de l'estérification",
          "Le système ne subit aucun changement",
          "Dans le sens de l'hydrolyse, décomposant l'ester en acide et alcool aromatiques",
          "L'ester se solidifie spontanément"
        ],
        correctAnswer: 2,
        explanation: "Ajouter de l'eau (un réactif de l'hydrolyse) augmente sa concentration, déplaçant l'équilibre dans le sens de consommation de l'eau, donc de l'hydrolyse."
      },
      {
        question: "Quelle odeur caractéristique possède l'éthanoate d'éthyle produit s'il est pur ?",
        options: [
          "Une odeur d'oeuf pourri",
          "Une odeur fruitée agréable (rappelant la colle d'écolier ou les dissolvants de vernis à ongles)",
          "Une odeur de poisson gâté",
          "Une odeur mentholée très piquante"
        ],
        correctAnswer: 1,
        explanation: "Les esters à chaîne courte possèdent des fragrances fruitées très prononcées et agréables. Celui-ci est un solvant d'ongles standard."
      }
    ]
  },
  {
    id: '4',
    title: 'Hydrodistillation — lavande',
    description: 'Extraction des principes volatils de fleurs de lavande par entraînement à la vapeur d\'eau.',
    image: '/src/assets/images/lavender_distillation_1781467287348.jpg',
    category: 'Chimie organique',
    level: 'Tronc Commun',
    difficulty: 'Intermédiaire',
    duration: '4h',
    setupImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Steam_distillation.svg/640px-Steam_distillation.svg.png',
    videoUrl: 'https://www.youtube.com/embed/Ojech1LNfdw',
    materials: ['Ballon 250mL', 'Chauffe-ballon', 'Réfrigérant à eau', 'Éprouvette graduée', 'Pierre ponce'],
    chemicals: ['Fleurs de lavande', 'Eau distillée', 'Chlorure de sodium'],
    chemicalTable: [
      { name: 'Huile essentielle de lavande', state: 'Liquide huileux', hazards: 'H317, H319' },
      { name: 'Chlorure de sodium', state: 'Solide cristallin', hazards: 'Aucun' }
    ],
    protocol: [
      'Préparation : Placer 20 g de fleurs de lavande séchées dans un ballon de 250 mL.',
      'Solvancation : Ajouter 150 mL d\'eau distillée et quelques grains de pierre ponce.',
      'Montage : Réaliser le montage d\'hydrodistillation (ballon, chauffe-ballon, tête de distillation, réfrigérant, éprouvette).',
      'Refroidissement : Ouvrir la circulation d\'eau du réfrigérant (entrée par le bas).',
      'Chauffage : Chauffer le mélange jusqu\'à ébullition vigoureuse pour générer de la vapeur.',
      'Distillation : Maintenir l\'ébullition et recueillir environ 50 mL de distillat (mélange trouble eau + huile).',
      'Observation : Noter l\'odeur caractéristique qui se dégage dès les premières gouttes.',
      'Traitement du distillat : Verser le distillat dans une éprouvette ou une ampoule à décanter.',
      'Relargage : Ajouter 5 g de chlorure de sodium (NaCl) et agiter pour saturer la phase aqueuse en sel.',
      'Récupération : Laisser reposer. L\'huile essentielle (moins dense que l\'eau salée) surnage. La prélever délicatement.',
      'Séchage : Ajouter quelques cristaux de sulfate de magnésium anhydre pour parfaire le séchage de l\'huile.'
    ],
    hazards: ['Risques de brûlures thermiques au contact du ballon ou des vapeurs', 'Le montage peut monter en pression s\'il est bouché'],
    precautions: ['Vérifier que le montage n\'est pas hermétiquement clos (mise à l\'air après le réfrigérant)', 'S\'assurer de la bonne circulation d\'eau avant de chauffer', 'Porter des gants pour manipuler le matériel chaud'],
    quiz: [
      {
        question: "Pourquoi faut-il vérifier que le montage d'hydrodistillation n'est JAMAIS hermétiquement clos ?",
        options: [
          "Pour laisser s'échapper l'odeur",
          "L'augmentation de pression dans un système fermé sous chauffage provoquerait une explosion violente du montage",
          "Le liquide ne bouillirait pas"
        ],
        correctAnswer: 1,
        explanation: "Chauffer un liquide génère d'importantes quantités de vapeur. Sans mise à l'air libre, la pression mécanique ferait éclater le verre."
      },
      {
        question: "Quel est le risque de toucher le ballon ou le chauffe-ballon pendant la manipulation ?",
        options: [
          "Aucun",
          "Brûlures thermiques sévères (le ballon peut dépasser 100°C)",
          "On éteint l'appareil"
        ],
        correctAnswer: 1,
        explanation: "Durant la distillation, les températures internes dépassent largement le point d'ébullition de l'eau, entraînant de graves brûlures par contact direct."
      },
      {
        question: "Pourquoi est-il crucial d'alimenter le réfrigérant en eau AVANT de commencer à chauffer ?",
        options: [
          "Pour économiser l'eau",
          "Pour condenser immédiatement les vapeurs chaudes et éviter qu'elles ne s'échappent dans la salle",
          "Pour faire du bruit"
        ],
        correctAnswer: 1,
        explanation: "Si le réfrigérant n'est pas alimenté à temps, les vapeurs de lavande combustibles s'échapperont sous forme gazeuse toxique dans l'atmosphère."
      },
      {
        question: "Que faire si le mélange dans le ballon commence à mousser de manière excessive (priming) ?",
        options: [
          "Boucher le réfrigérant",
          "Baisser immédiatement le chauffage ou écarter le chauffe-ballon pour éviter les projections",
          "Souffler dedans"
        ],
        correctAnswer: 1,
        explanation: "Un moussage incontrôlé projette du liquide impur non distillé directement dans l'éprouvette et engorge le réfrigérant."
      },
      {
        question: "P273 associé aux huiles essentielles signifie qu'il faut éviter :",
        options: [
          "De les sentir",
          "De les rejeter dans l'environnement (milieu aquatique)",
          "De les toucher"
        ],
        correctAnswer: 1,
        explanation: "P273 est un conseil de prudence stipulant d'éviter le rejet de composés toxiques d'hydrocarbures organiques directement dans la nature ou les égouts."
      },
      {
        question: "Pourquoi porte-t-on des lunettes lors du relargage (ajout de sel au distillat) ?",
        options: [
          "Pour le style",
          "Des projections de solution saline ou de gouttelettes d'huile irritantes peuvent survenir lors de l'agitation",
          "C'est inutile"
        ],
        correctAnswer: 1,
        explanation: "Secouer un tube ou une ampoule contenant du distillat chaud ou du sel peut générer des micro-projections nocives pour les yeux."
      },
      {
        question: "Lors du démontage à chaud, quelle est la précaution majeure ?",
        options: [
          "Aller vite",
          "Attendre le refroidissement complet ou manipuler avec des pinces et des gants isolants pour éviter les brûlures",
          "Ne rien faire"
        ],
        correctAnswer: 1,
        explanation: "Le verre conserve de la chaleur pendant longtemps. Démonter précipitamment expose à des brûlures ou des casses de verrerie coûteuses."
      },
      {
        question: "Quel danger présente une fuite de vapeur au niveau d'un rodage mal emboîté ?",
        options: [
          "Perte de rendement seulement",
          "Brûlures graves par jet de vapeur ou inflammation si le produit est combustible",
          "Aucun"
        ],
        correctAnswer: 1,
        explanation: "Les vapeurs chaudes de lavande contiennent des composés volatiles très chauds propices à créer des brûlures par condensation rapide."
      },
      {
        question: "Pourquoi le réfrigérant doit-il être correctement fixé avec des clips ?",
        options: [
          "Pour la décoration",
          "Empêcher que la pression ne désolidarise les éléments, évitant projections et fuites de vapeurs",
          "C'est optionnel"
        ],
        correctAnswer: 1,
        explanation: "Les clips (clams) en plastique maintiennent les pièces rodées unies contre les vibrations légères et les contraintes physiques."
      },
      {
        question: "Comment doit-on manipuler les fleurs de lavande usagées après le TP ?",
        options: [
          "À l'évier",
          "Dans la poubelle pour déchets solides, après refroidissement complet",
          "Les manger"
        ],
        correctAnswer: 1,
        explanation: "Les matières végétales organiques insolubles boucheraient les canalisations de l'évier et doivent donc être jetées au bac à ordures ménagères."
      },
      {
        question: "Quel est le principe physique général de l'hydrodistillation ?",
        options: [
          "Entraîner les constituants volatils grâce aux vapeurs d'eau sous forme d'un mélange hétérogène qui se condense à froid",
          "Séparer des solides cristallisés par centrifugation",
          "Dissoudre l'huile dans le mercure pour l'amalgamer",
          "Brûler la lavande pour en extraire des cendres odorantes"
        ],
        correctAnswer: 0,
        explanation: "La vapeur d'eau traverse la lavande, ouvre les cellules sécrétrices d'arômes et entraîne les molécules volatiles dont le point d'ébullition est abaissé grâce à la notion de co-distillation."
      },
      {
        question: "Comment appelle-t-on le liquide obtenu dans l'éprouvette après condensation dans le réfrigérant ?",
        options: [
          "Le résidu lourd",
          "La solution saline stérile",
          "Le distillat hétérogène",
          "L'infusé concentré"
        ],
        correctAnswer: 2,
        explanation: "Le distillat recueilli comprend deux phases non miscibles : l'eau aromatique (hydrolat) et l'huile essentielle surnageante."
      },
      {
        question: "Pourquoi l'eau froide doit-elle entrer par le bas du réfrigérant et sortir par le haut ?",
        options: [
          "C'est une spécificité esthétique",
          "Pour s'assurer que le réfrigérant soit entièrement rempli d’eau froide, sans bulle d'air dormante, optimisant ainsi l'échange thermique",
          "Pour évacuer l'eau plus rapidement vers la vidange",
          "Pour que l'eau remonte plus vite par gravité"
        ],
        correctAnswer: 1,
        explanation: "Alimenter par le bas remplit intégralement la double enveloppe en chassant l'air vers le haut, ce qui garantit un refroidissement maximal des vapeurs."
      },
      {
        question: "Quel est le but d'ajouter du sel de table (NaCl) dans le distillat récolté (procédé de relargage) ?",
        options: [
          "Pour parfumer l'huile essentielle",
          "Pour saturer la phase aqueuse en sel, réduisant la solubilité des molécules organiques d'huile essentielle dans l'eau et facilitant leur séparation décisive",
          "Pour désinfecter la verrerie",
          "Pour augmenter la densité de l'huile essentielle afin qu'elle coule au fond"
        ],
        correctAnswer: 1,
        explanation: "L'huile essentielle de lavande (linalol, acétate de linalyle) est très peu soluble dans une phase aqueuse saturée en ions chlorure et sodium."
      },
      {
        question: "Quelle est la densité approximative d'une huile essentielle par rapport à l'eau salée ?",
        options: [
          "Elle est supérieure ($d > 1,3$)",
          "Elle est identique ($d = 1,0$)",
          "Elle est inférieure ($d < 1,0$) car elle flotte au-dessus de la phase aqueuse",
          "Elle varie entre 2,0 et 3,5"
        ],
        correctAnswer: 2,
        explanation: "La plupart des huiles essentielles (notamment de lavande) ont une densité proche de $0,89$, ce qui explique pourquoi elles surnagent."
      },
      {
        question: "Quel composé synthétique peut être utilisé pour éliminer les dernières traces microscopiques d'eau prélèvées avec l'huile essentielle ?",
        options: [
          "Le sulfate de magnésium anhydre ($MgSO_4$)",
          "Le carbonate de sodium humide",
          "L'acide chlorhydrique pur",
          "Le glucose hydraté"
        ],
        correctAnswer: 0,
        explanation: "Le sulfate de magnésium anhydre absorbe vigoureusement les molécules d'eau résiduelles en s'hydratant, clarifiant ainsi l'huile."
      },
      {
        question: "Quel est le principal composant aromatique responsable de l'odeur caractéristique de l'huile essentielle de lavande ?",
        options: [
          "L'acide éthanoïque",
          "Le linalol (et l'acétate de linalyle)",
          "L'acide acétylsalicylique",
          "L'éthanol pur"
        ],
        correctAnswer: 1,
        explanation: "Le linalol et son ester associé, l'acétate de linalyle, sont les molécules terpéniques majoritaires qui structurent le parfum de la lavande."
      },
      {
        question: "Comment appelle-t-on la phase aqueuse parfumée résiduelle obtenue après extraction complète de l'huile essentielle de lavande ?",
        options: [
          "L'hydrolat (ou eau florale)",
          "L'élixir mère",
          "L'acide acétique résiduel",
          "La liqueur de Fehling"
        ],
        correctAnswer: 0,
        explanation: "L'hydrolat de lavande est l'eau de distillation ayant conservé une fraction infime de molécules odorantes solubilisées."
      },
      {
        question: "Si l'on remarque que la température en tête de colonne s'établit à une valeur oscillant autour de 100 °C, que distille-t-on majoritairement ?",
        options: [
          "Le linalol pur",
          "Un mélange hétéroazéotropique à forte proportion d'eau",
          "De l'acide sulfurique gazeux",
          "Uniquement de la pierre ponce évaporée"
        ],
        correctAnswer: 1,
        explanation: "L'ébullition conjointe de deux phases liquides non miscibles s'effectue à une température fixe inférieure aux points d'ébullition individuels, proche de $100^\\circ C$."
      },
      {
        question: "Quelle méthode performante permet de vérifier la composition moléculaire exacte et la pureté de votre huile essentielle extraite ?",
        options: [
          "La chromatographie sur couche mince (CCM) ou la chromatographie en phase gazeuse (CPG)",
          "Le dosage pH-métrique à la soude",
          "La mesure directe à la balance romaine",
          "L'électrolyse forcée"
        ],
        correctAnswer: 0,
        explanation: "La CCM et la CPG séparent efficacement les différents constituants de l'huile (linalol, acétate de linalyle) pour analyse comparative avec des témoins."
      }
    ]
  },
  {
    id: '5',
    title: 'Spectrophotométrie UV-Vis',
    description: 'Dosage par étalonnage d\'une solution colorée (KMnO4).',
    image: '/src/assets/images/spectrophotometrie_kmno4_1781468904286.jpg',
    category: 'Chimie analytique',
    level: '2ème Bac',
    difficulty: 'Avancé',
    duration: '2h30',
    setupImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Single_Beam_Spectrophotometer.png/640px-Single_Beam_Spectrophotometer.png',
    materials: ['Spectrophotomètre', 'Cuves', 'Fioles jaugées de 50 mL'],
    chemicals: ['Solution mère de KMnO4', 'Eau distillée'],
    protocol: [
      'Mise sous tension : Allumer le spectrophotomètre et le laisser chauffer pendant 15 minutes.',
      'Choix de la longueur d\'onde : Sélectionner la longueur d\'onde de travail (lambda max) correspondant au maximum d\'absorption de l\'espèce (525 nm pour KMnO4).',
      'Préparation de la gamme : À partir d\'une solution mère de concentration C0, préparer par dilution 5 solutions filles (C1 à C5) dans des fioles jaugées de 50 mL.',
      'Préparation des cuves : Rincer une cuve avec de l\'eau distillée et une autre avec la solution à mesurer.',
      'Le Blanc : Placer la cuve d\'eau distillée (le solvant) dans l\'appareil et faire le "zéro" d\'absorbance (A = 0).',
      'Mesures de la gamme : Mesurer successivement l\'absorbance A de chaque solution fille de la plus diluée à la plus concentrée.',
      'Mesure de l\'inconnu : Mesurer l\'absorbance de la solution de concentration inconnue Cx.',
      'Tracé : Reporter sur papier millimétré ou logiciel la droite d\'étalonnage A = f(C).',
      'Vérification : Vérifier la linéarité (loi de Beer-Lambert) et déterminer le coefficient d\'extinction molaire.',
      'Détermination : Utiliser la droite ou son équation pour trouver Cx à partir de son absorbance Ax.'
    ],
    hazards: ['Le permanganate de potassium est un oxydant puissant et tache les vêtements et la peau', 'Les cuves en quartz sont fragiles et coûteuses'],
    precautions: ['Porter des gants et une blouse', 'Manipuler les cuves uniquement par les faces dépolies', 'Essuyer les faces transparentes avec du papier optique avant chaque mesure'],
    quiz: [
      {
        question: "Quelle loi relie l'absorbance d'une solution à sa concentration et à la longueur de la cuve traversée ?",
        options: [
          "La loi de Raoult",
          "La loi de Beer-Lambert",
          "La loi de Kohlrausch",
          "La loi d'Avogadro"
        ],
        correctAnswer: 1,
        explanation: "La loi de Beer-Lambert modélise la proportionnalité entre l'absorbance A, la concentration molaire C et la longueur de trajet optique l."
      },
      {
        question: "Quelle est la formulation physico-chimique correcte de la loi de Beer-Lambert ?",
        options: [
          "$A = \\epsilon \\cdot l \\cdot C$",
          "$A = \\frac{\\epsilon \\cdot C}{l}$",
          "$A = \\epsilon + l + C$",
          "$A = k \\cdot C^2$"
        ],
        correctAnswer: 0,
        explanation: "$A = \\epsilon \\cdot l \\cdot C$, où $\\epsilon$ est le coefficient d'extinction molaire, l l'épaisseur de solution et C la concentration."
      },
      {
        question: "Quelle est l'unité physique de l'absorbance A mesurée ?",
        options: [
          "Mol, par litre (mol/L)",
          "Elle est sans unité (grandeur adimensionnelle)",
          "En centimètres (cm)",
          "En Siemens par mètre (S/m)"
        ],
        correctAnswer: 1,
        explanation: "L'absorbance exprime le logarithme décimal du rapport de l'intensité lumineuse incidente à l'intensité transmise, c'est donc un nombre pur sans unité."
      },
      {
        question: "Quelle est l'unité du coefficient d'extinction molaire $\\epsilon$ si C est exprimé en mol/L et l en cm ?",
        options: [
          "$L \\cdot mol^{-1} \\cdot cm^{-1}$",
          "$mol \\cdot L^{-1} \\cdot cm$",
          "Sans unité",
          "$cm \\cdot L \\cdot mol^{-1}$"
        ],
        correctAnswer: 0,
        explanation: "Pour assurer la cohérence dimensionnelle d'une absorbance adimensionnelle, $\\epsilon$ doit s'exprimer en $L \\cdot mol^{-1} \\cdot cm^{-1}$."
      },
      {
        question: "Pourquoi effectue-t-on de préférence les mesures analytiques à la longueur d'onde du maximum d'absorption ($\\lambda_{max}$) de l'espèce ?",
        options: [
          "Pour aller plus vite",
          "Car c'est à cette longueur d'onde que la sensibilité de la mesure est maximale et que de petites variations de longueur d'onde affectent le moins l'absorbance (pente nulle)",
          "Pour éviter d'échauffer la solution",
          "Parce que le détecteur s'éteint ailleurs"
        ],
        correctAnswer: 1,
        explanation: "Au sommet de la courbe d'absorption, l'absorbance est maximale (sensibilité optimale) et l'erreur liée à l'incertitude du monochromateur est minimale."
      },
      {
        question: "Une solution aqueuse de permanganate de potassium ($KMnO_4$) absorbe majoritairement à une longueur d'onde de 525 nm (vert). Quelle est alors la couleur perçue de cette solution ?",
        options: [
          "Verte",
          "Blanche",
          "Magenta - Violet (couleur complémentaire du vert)",
          "Jaune fluorescente"
        ],
        correctAnswer: 2,
        explanation: "La couleur perçue par l'œil humain est la somme des longueurs d'ondes transmises, correspondant à la couleur complémentaire de celle qui est absorbée."
      },
      {
        question: "Qu'est-ce que l'étape appelée \"faire le blanc\" en spectrophotométrie ?",
        options: [
          "Laver la cuve avec du savon blanc",
          "Mesurer le rayonnement transmis avec une cuve contenant le solvant seul afin de soustraire les absorbances parasites dues au solvant et à la cuve en verre",
          "Régler la luminosité de la pièce au maximum",
          "Ajouter du sel au permanganate"
        ],
        correctAnswer: 1,
        explanation: "Le Blanc définit le niveau d'absorbance de référence $A = 0$ en retranchant l'absorption propre du solvant, des parois de la cuve et des composants optiques."
      },
      {
        question: "Si une solution A présente une absorbance $A_1 = 0,250$ et une solution B de la même espèce mesurée dans les mêmes conditions présente $A_2 = 0,500$. Que peut-on conclure sur leurs concentrations ?",
        options: [
          "Elles sont identiques",
          "La concentration de B est exactement le double de celle de A",
          "La concentration de B est la moitié de celle de A",
          "Il n'y a aucun lien entre concentration et absorbance"
        ],
        correctAnswer: 1,
        explanation: "La relation étant rigoureusement linéaire d'après la loi de Beer-Lambert, doubler la valeur de l'absorbance correspond à doubler la concentration en soluté poreux."
      },
      {
        question: "Quelle est la limite maximale usuelle de validité de l'absorbance pour laquelle la linéarité est conservée sans déviation ?",
        options: [
          "Aucune limite ($A$ peut valoir $10^5$)",
          "Généralement pour des valeurs d'absorbance inférieures à $1,5$ ou $2,0$ (au-delà, la proportion de lumière transmise devient trop faible pour être quantifiée précisément)",
          "Uniquement pour $A < 0,1$",
          "À partir de $A = 10,0$"
        ],
        correctAnswer: 1,
        explanation: "À des absorbances élevées ($A > 2$, soit moins de 1% de lumière transmise), le bruit de fond instrumental et les déviations chimiques perturbent la linéarité."
      },
      {
        question: "Pour fabriquer une solution fille de concentration $2,0 \\cdot 10^{-5}$ mol/L à partir d'une solution mère commerciale à $2,0 \\cdot 10^{-4}$ mol/L, quel facteur de dilution doit-on appliquer ?",
        options: [
          "Facteur 2",
          "Facteur 10",
          "Facteur 100",
          "Facteur 5"
        ],
        correctAnswer: 1,
        explanation: "Le rapport $C_{mère}/C_{fille} = (2,0 \\cdot 10^{-4}) / (2,0 \\cdot 10^{-5}) = 10$. Le facteur de dilution requis est donc de 10."
      },
      {
        question: "Quels matériels de verrerie caractéristiques doit-on utiliser pour diluer 10 fois une solution de KMnO4 de façon très rigoureuse ?",
        options: [
          "Une éprouvette graduée de 10 mL et un bécher de 100 mL",
          "Une pipette jaugée de 10 mL et une fiole jaugée de 100 mL",
          "Deux fioles d'Erlenmeyer",
          "Une pipette simple en plastique et un verre à pied"
        ],
        correctAnswer: 1,
        explanation: "L'association d'une pipette jaugée (précision du prélèvement) et d'une fiole jaugée (précision du volume dilué) est impérative lors de dosages de dilution."
      },
      {
        question: "Comment évolue théoriquement l'absorbance d'une solution si l'épaisseur de cuve double et que la concentration est divisée par deux ?",
        options: [
          "Elle est multipliée par quatre",
          "Elle est divisée par quatre",
          "Elle reste inchangée",
          "Elle s'annule"
        ],
        correctAnswer: 2,
        explanation: "L'absorbance étant proportionnelle au produit de la longueur optique l et de la concentration C ($2l \\cdot 0,5C = lC$), la valeur d'absorbance finale reste identique."
      },
      {
        question: "Si l'absorbance de la solution de permanganate inconnue dépasse largement celle de la solution étalon la plus concentrée de votre gamme de travail, que faire ?",
        options: [
          "Tracer un axe d'extrapolations arbitraires sur le graphe",
          "Diluer précisément d'un facteur connu la solution inconnue pour ramener son absorbance au milieu de la gamme d'étalonnage, puis réaliser la mesure",
          "Changer de spectrophotomètre",
          "Augmenter l'intensité lumineuse de l'ampoule"
        ],
        correctAnswer: 1,
        explanation: "L'extrapoler hors gamme est une erreur analytique majeure car la linéarité n'est plus garantie. Diluer est l'unique pratique correcte."
      },
      {
        question: "Pourquoi est-il crucial d'essuyer soigneusement les parois de la cuve avec un papier optique doux avant de l'insérer ?",
        options: [
          "Pour éviter de mouiller le compartiment",
          "Les traces de doigts ou d'eau sur la paroi externe de la cuve diffusent ou absorbent la lumière, faussant la valeur d'absorbance affichée",
          "Pour désinfecter la cuve",
          "Pour stimuler le capteur thermique"
        ],
        correctAnswer: 1,
        explanation: "Toute impureté physique fait écran de diffraction sur le trajet optique du faisceau, provoquant une hausse fallacieuse de l'absorbance lue."
      },
      {
        question: "Qu'est-ce que le détecteur mesure au cœur de l'instrument spectrophotométrique ?",
        options: [
          "Le flux thermique dégagé",
          "L'intensité lumineuse transmise par l'échantillon, notée $I$, comparée à l'intensité incidente $I_0$",
          "La concentration directe en masse de KMnO4",
          "La viscosité cinématique de l'eau"
        ],
        correctAnswer: 1,
        explanation: "Le capteur (photomultiplicateur ou photodiode) convertit le flux de photons transmis en un courant électrique proportionnel à l'intensité lumineuse."
      },
      {
        question: "Quel type de cuve est rigoureusement obligatoire pour mesurer des spectres d'absorbance dans le domaine optique des ultraviolets ($\\lambda < 300$ nm) ?",
        options: [
          "Des cuves en plastique standard (polystyrène)",
          "Des cuves en verre borosilicaté classique",
          "Des cuves en quartz (seul matériau ne bloquant pas les longueurs d'ondes UV)",
          "Des cuves métalliques polies"
        ],
        correctAnswer: 2,
        explanation: "Le verre et le plastique absorbent fortement les rayonnements ultraviolets d'énergie élevée. Le quartz transparent est requis pour ces longueurs d'onde."
      },
      {
        question: "Pourquoi une solution de sulfate de cuivre ($Cu^{2+}$) apparaît-elle d'une couleur d'azur (bleu clair) ?",
        options: [
          "Car elle absorbe spécifiquement le bleu",
          "Car elle transmet majoritairement les longueurs d'ondes bleues tout en absorbant les rayonnements chauds complémentaires (jaune - orange)",
          "Car elle émet de l'indigo par phosphorescence",
          "Grâce au permanganate de potassium fondu"
        ],
        correctAnswer: 1,
        explanation: "La solution retient les radiations complémentaires à sa couleur propre. Le bleu est transmis à travers la solution jusqu’à nos récepteurs oculaires."
      },
      {
        question: "Quelle fonction essentielle remplit l'établissement de la droite d'étalonnage pour ce TP ?",
        options: [
          "Trouver la température de fusion",
          "Déterminer la concentration d'une espèce colorée inconnue par corrélation directe de son absorbance mesurée",
          "Modéliser la vitesse de réaction de dissolution",
          "Calculer à quel moment la solution va s'évaporer"
        ],
        correctAnswer: 1,
        explanation: "La droite d'étalonnage $A = f(C)$ sert de repère de référence. Un simple report graphique ou calcul de l'inverse de la pente donne la concentration."
      },
      {
        question: "Que représente physiquement la pente de la droite d'étalonnage $A = f(C)$ tracé selon la loi de Beer-Lambert si la cuve de mesure fait $1$ cm ?",
        options: [
          "La densité absolue du solvant",
          "La conductivité molaire spécifique",
          "Le coefficient d'extinction molaire molaire $\\epsilon$ de l'espèce chimique",
          "Le temps d'allumage du spectrophotomètre"
        ],
        correctAnswer: 2,
        explanation: "Puisque $A = (\\epsilon \\cdot l) \\cdot C$. Pour $l = 1$ cm, la pente est égale à $\\epsilon \\cdot 1 = \\epsilon$."
      },
      {
        question: "Quel facteur chimique peut provoquer des déviations importantes de la proportionnalité de Beer-Lambert à de fortes concentrations molaire ?",
        options: [
          "La modification de l'indice de réfraction de la solution et des interactions électrostatiques directes importantes entre chromophores très rapprochés",
          "Le sens d'insertion de la cuve",
          "La pression atmosphérique ambiante",
          "L'absence totale de protons acides"
        ],
        correctAnswer: 0,
        explanation: "En solution concentrée, les interactions intermoléculaires modifient la structure électronique des solutés, altérant leur coefficient d'absorption $\\epsilon$."
      }
    ]
  },
  {
    id: '6',
    title: 'Cinétique de la réaction iode-acétone',
    description: 'Étude du suivi temporel de la réaction pour déterminer l\'équation de vitesse.',
    image: '/src/assets/images/iodine_acetone_kinetics_1781504646087.jpg',
    category: 'Chimie physique',
    level: '2ème Bac',
    difficulty: 'Avancé',
    duration: '3h',
    setupImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/%C5%9Amier_Spectrophotometer.JPG/640px-%C5%9Amier_Spectrophotometer.JPG',
    materials: ['Chronomètre', 'Béchers', 'Spectrophotomètre'],
    chemicals: ['Solution de diiode', 'Acétone', 'Acide chlorhydrique'],
    protocol: [
      'Préparation des réactifs : Préparer des solutions titrées de diiode I2, d\'acétone et d\'acide chlorhydrique (catalyseur).',
      'Mélange réactionnel : Dans un bécher, mélanger un volume précis d\'acétone et d\'acide chlorhydrique.',
      'Lancement : Ajouter la solution de diiode et déclencher instantanément le chronomètre.',
      'Prélèvements : À intervalles de temps réguliers (toutes les 2 min), prélever une petite quantité du mélange.',
      'Trempe chimique : Verser le prélèvement dans une solution de bicarbonate de sodium pour stopper immédiatement la réaction (neutralisation du catalyseur acide).',
      'Dosage : Doser le diiode restant dans le prélèvement par une solution de thiosulfate de sodium.',
      'Alternative Spectro : Si disponible, placer le mélange directement dans une cuve et suivre l\'absorbance du diiode en continu.',
      'Traitement : Noter l\'absorbance ou le volume de thiosulfate en fonction du temps.',
      'Graphisme : Tracer la courbe de la concentration en I2 au cours du temps.',
      'Ordre de réaction : Déterminer l\'ordre de la réaction par rapport à chaque réactif en modifiant les concentrations initiales.'
    ],
    hazards: ['L\'acétone est très inflammable et ses vapeurs sont irritantes', 'L\'iode est toxique et tache'],
    precautions: ['Travailler loin de toute flamme', 'Utiliser une hotte aspirante', 'Porter des gants et des lunettes'],
    quiz: [
      {
        question: "Quel est l'ordre partiel par rapport au diiode ($I_2$) dans la réaction d'iodation de l'acétone en milieu acide ?",
        options: [
          "D'ordre 1",
          "D'ordre 2",
          "D'ordre 0 (vitesse indépendante de la concentration en diiode)",
          "D'ordre fractionnaire 1/2"
        ],
        correctAnswer: 2,
        explanation: "L'iodation de l'acétone catalysée par les acides est une réaction d'ordre 0 par rapport au diiode : sa disparition se fait à vitesse linéaire constante."
      },
      {
        question: "Quel est le réactif qui joue le rôle indispensable de catalyseur homogène dans cette réaction ?",
        options: [
          "L'ion thiosulfate",
          "Les ions hydronium ($H^+$) apportés par l'acide chlorhydrique",
          "Le solvant organique acétone",
          "L'amidon modifié"
        ],
        correctAnswer: 1,
        explanation: "L'acide chlorhydrique apporte des protons $H^+$ qui augmentent la vitesse de réaction en catalysant l'énolisation de l'acétone."
      },
      {
        question: "Quelle est l'unité de la constante de vitesse globale $k$ pour une cinétique qui s'avère globalement d'ordre 1 ?",
        options: [
          "$mol \\cdot L^{-1} \\cdot s^{-1}$",
          "$L \\cdot mol^{-1} \\cdot s^{-1}$",
          "$s^{-1}$ (seconde réciproque)",
          "Sans unité physique"
        ],
        correctAnswer: 2,
        explanation: "Pour une réaction d'ordre 1, la vitesse $v = k \\cdot [A]$. La constante $k$ s'exprime donc en $s^{-1}$ (ou $min^{-1}$)."
      },
      {
        question: "Dans le suivi temporel d'une cinétique chimique, qu'appelle-t-on une \"trempe chimique\" ?",
        options: [
          "Faire bouillir le mélange pour accélérer la réaction",
          "Bloquer ou arrêter instantanément la réaction à un instant t précis pour pouvoir doser tranquillement les réactifs restants",
          "Ajouter de la glace pour colorer la solution",
          "Introduire un nouvel isomère"
        ],
        correctAnswer: 1,
        explanation: "La trempe inhibe instantanément l'activité cinétique de la réaction, stabilisant les concentrations à l'instant précis du prélèvement."
      },
      {
        question: "Comment réalise-t-on concrètement la trempe chimique de la réaction dans ce TP avant chaque titrage ?",
        options: [
          "Par de l'eau chauffée",
          "En versant le prélèvement dans une solution glacée de bicarbonate de sodium (hydrogénocarbonate de sodium) pour neutraliser le catalyseur acide",
          "En secouant énergiquement le bécher",
          "En y ajoutant de l'acétone pure"
        ],
        correctAnswer: 1,
        explanation: "L'ion hydrogénocarbonate ($HCO_3^-$) élimine les protons $H^+$ libres. Privée de son catalyseur acide fort, la réaction d'iodation se fige spontanément."
      },
      {
        question: "Quel réactif réducteur titrant est employé dans la burette pour doser le diiode résiduel du prélèvement ?",
        options: [
          "L'hydroxyde de sodium",
          "Le thiosulfate de sodium ($Na_2S_2O_3$)",
          "Le permanganate de potassium",
          "L'acide sulfurique"
        ],
        correctAnswer: 1,
        explanation: "Les ions thiosulfate ($S_2O_3^{2-}$) réduisent quantitativement et rapidement le diiode résiduel brun en ions iodures incolores."
      },
      {
        question: "Quel indicateur sensible permet de visualiser précisément l'équivalence lors du titrage du diiode ?",
        options: [
          "L'hélianthine",
          "La phénolphtaléine",
          "L'empois d'amidon (ou thiodène) qui forme un complexe bleu-sombre avec le diiode résiduel",
          "Le bleu de bromothymol"
        ],
        correctAnswer: 2,
        explanation: "L'empois d'amidon s'associe au diiode en créant une coloration bleue très intense, qui vire à l'incolore parfait dès la disparition de la dernière trace d'I2."
      },
      {
        question: "Quelle est l'équation chimique équilibrée du titrage du diiode par les ions thiosulfate ?",
        options: [
          "$I_2 + S_2O_3^{2-} \\rightarrow 2I^- + S_4O_6^{2-}$",
          "$I_2 + 2S_2O_3^{2-} \\rightarrow 2I^- + S_4O_6^{2-}$",
          "$2I^- + S_4O_6^{2-} \\rightarrow I_2 + 2S_2O_3^{2-}$",
          "$I_2 + S_2O_3^{2-} + H_2O \\rightarrow 2HI + SO_4^{2-}$"
        ],
        correctAnswer: 1,
        explanation: "L'équation fait intervenir les couples redox $I_2/I^-$ et $S_4O_6^{2-}/S_2O_3^{2-}$ d'où le coefficient stœchiométrique 2 devant le thiosulfate."
      },
      {
        question: "Dans une réaction d'ordre 0 par rapport au diiode, à quoi ressemble le profil graphique $[I_2] = f(t)$ ?",
        options: [
          "Une droite croissante linéaire",
          "Une courbe exponentielle décroissante tendant vers l'infini",
          "Une droite décroissante de pente constante $-k$",
          "Une parabole orientée vers le haut"
        ],
        correctAnswer: 2,
        explanation: "Pour l'ordre 0, la loi de vitesse intégrée s'écrit $[I_2]_t = [I_2]_0 - k \\cdot t$. C'est l'équation d'une droite décroissante."
      },
      {
        question: "Si l'on préfère réaliser un suivi continu non-destructif par spectrophotométrie, quelle longueur d'onde doit-on retenir ?",
        options: [
          "250 nm (UV lointain)",
          "Environ 450-480 nm (absorption spécifique du diiode en solution aqueuse)",
          "750 nm (rouge profond)",
          "525 nm"
        ],
        correctAnswer: 1,
        explanation: "Le diiode présente une bande d'absorption exploitable dans le haut bleu - violet, le stabilisant à une longueur d'onde proche de 450-480 nm."
      },
      {
        question: "D'après la loi d'Arrhenius, quel est l'effet général d'une élévation de température sur la cinétique d'iodation ?",
        options: [
          "La vitesse diminue",
          "La vitesse reste strictement identique",
          "La constante de vitesse k augmente de façon exponentielle, accélérant fortement la réaction",
          "La réaction s'arrête instantanément"
        ],
        correctAnswer: 2,
        explanation: "Fournir de l'énergie thermique augmente la fraction de collisions efficaces franchissant l'énergie d'activation, accélérant la synthèse."
      },
      {
        question: "La vitesse expérimentale s'écrit $v = k \\cdot [Acétone]^1 \\cdot [H^+]^1 \\cdot [I_2]^0$. Quel est l'ordre global de cette réaction ?",
        options: [
          "Ordre 0",
          "Ordre 1",
          "Ordre 2",
          "Ordre 3"
        ],
        correctAnswer: 2,
        explanation: "L'ordre global est égal à la somme des ordres partiels : $1 + 1 + 0 = 2$."
      },
      {
        question: "Pourquoi introduit-on l'acétone et l'acide chlorhydrique en large excès par rapport au diiode ?",
        options: [
          "Pour gaspiller les produits chimiques du laboratoire",
          "Pour réaliser une dégénérescence de l'ordre : leurs concentrations restent quasi constantes au cours du temps, ce qui simplifie l'étude cinétique de l'iode",
          "Pour rendre la solution incolore dès le départ",
          "Pour ralentir la réaction d'énolisation"
        ],
        correctAnswer: 1,
        explanation: "En grand excès, les concentrations $[Acétone]$ et $[H^+]$ ne varient pratiquement pas, modélisant la vitesse sous la forme apparente $v = k_{app} \\cdot [I_2]^p$."
      },
      {
        question: "Que signifie concrètement une vitesse de réaction indépendante de la concentration d'un réactif ?",
        options: [
          "Que ce réactif n'intervient pas dans l'étape limitante (déterminante) du mécanisme réactionnel complexe",
          "Que ce réactif n'est pas consommé",
          "Que la réaction is infiniment rapide",
          "Que la constante d'équilibre est nulle"
        ],
        correctAnswer: 0,
        explanation: "L'étape limitante lente correspond au passage de l'acétone à sa forme énolique réactive, processus purement catalysé par $H^+$, l'incorporation de l'iode étant ultra-rapide."
      },
      {
        question: "Quel est le produit organique d'halogénation obtenu à la fin de cette réaction ?",
        options: [
          "L'iodoéthanol",
          "La monoiodoacétone ($CH_3-CO-CH_2I$)",
          "Le chloroforme liquide",
          "L'acétate d'éthyle brut"
        ],
        correctAnswer: 1,
        explanation: "Un atome d'hydrogène de l'acétone subit une substitution électrophile par un atome d'Iode, accouchant de la monoiodoacétone."
      },
      {
        question: "Quelle est la définition formelle de la vitesse volumique de disparition d'un réactif R ?",
        options: [
          "$v = - \\frac{d[R]}{dt}$",
          "$v = \\frac{d[R]}{dt}$",
          "$v = [R]_0 - [R]_t$",
          "$v = k \\cdot [R]^2$"
        ],
        correctAnswer: 0,
        explanation: "Par convention, pour que la vitesse volumique soit une grandeur positive, on associe un signe négatif à la dérivée de la concentration du réactif décroissante."
      },
      {
        question: "Comment définit-on le temps de demi-réaction $t_{1/2}$ en cinétique chimique ?",
        options: [
          "La moitié du temps total de la séance de TP",
          "La durée nécessaire pour que la concentration du réactif limitant atteigne la moitié de sa valeur initiale",
          "Le temps d'induction du chauffage",
          "Le moment où le diiode change de couleur"
        ],
        correctAnswer: 1,
        explanation: "À $t = t_{1/2}$ la quantité de réactif limitant consommée équivaut à la moitié de la quantité initiale disponible dans le système."
      },
      {
        question: "Lors du titrage du diiode résiduel par le thiosulfate, quel virage de couleur caractérise le point d'équivalence exact ?",
        options: [
          "De l'incolore au bleu noir",
          "Du bleu-noir foncé à l'incolore limpide",
          "Du vert émeraude au jaune vif",
          "Du rose bonbon à l'orange foncé"
        ],
        correctAnswer: 1,
        explanation: "L'équivalence marque la consommation totale de la dernière molécule de diiode, libérant l'amidon de sa couleur complexe bleu cobalt."
      },
      {
        question: "Pourquoi l'empois d'amidon (ou thiodène) doit-il être introduit au cours du titrage et non au tout début ?",
        options: [
          "Pour ne pas saturer l'amidon en diiode concentré, ce qui formerait un complexe très lent à se détruire (retardant le virage)",
          "Pour économiser l'indicateur",
          "Car il réagit de manière explosive avec l'acétone pure à forte dose",
          "Pour baisser la température"
        ],
        correctAnswer: 0,
        explanation: "Si l'amidon est présent dès le début avec beaucoup d'I2, il emprisonne le diiode au sein de ses hélices géantes de polysaccharide, rendant le virage flou."
      },
      {
        question: "Pour une réaction globale d'ordre global égal à 2, si l'on multiplie toutes les concentrations initiales par 2, par combien est multipliée la vitesse initiale ?",
        options: [
          "Par 2",
          "Par 4 (facteur $2^2$)",
          "Par 8",
          "Elle est divisée par 2"
        ],
        correctAnswer: 1,
        explanation: "La loi de vitesse est $v = k \\cdot [A]^2$. Si $[A]$ est d'où sa valeur cinétique initiale quadruple."
      }
    ]
  },
  {
    id: '7',
    title: 'Préparation du sulfate de cuivre',
    description: 'Synthèse et purification par cristallisation du sulfate de cuivre pentahydraté.',
    image: '/src/assets/images/copper_sulfate_preparation_1781504776969.jpg',
    category: 'Chimie minérale',
    level: 'Tronc Commun',
    difficulty: 'Débutant',
    duration: '2h',
    setupImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/B%C3%BCchner_flask_and_funnel.svg/512px-B%C3%BCchner_flask_and_funnel.svg.png',
    videoUrl: 'https://www.youtube.com/embed/arlYPz3EP7A',
    materials: ['Cristallisoir', 'Filtre', 'Balance', 'Source de chaleur'],
    chemicals: ['Oxyde de cuivre (II)', 'Acide sulfurique dilué', 'Eau distillée'],
    protocol: [
      'Pesée : Peser environ 5 g d\'oxyde de cuivre (II) noir dans une capsule de pesée.',
      'Mesure d\'acide : Mesurer 30 mL d\'acide sulfurique à 2 mol/L dans une éprouvette graduée.',
      'Mélange : Introduire l\'acide dans un bécher de 100 mL et ajouter progressivement l\'oxyde de cuivre sous agitation.',
      'Chauffage : Chauffer doucement le mélange sur une plaque chauffante sans atteindre l\'ébullition pour favoriser la réaction.',
      'Observation : La solution devient bleue intense au fur et à mesure de la formation de CuSO4.',
      'Filtration à chaud : Filtrer le mélange sur papier filtre pour éliminer l\'excès d\'oxyde de cuivre non réagi.',
      'Évaporation : Placer le filtrat bleu limpide dans un cristallisoir et chauffer jusqu\'à apparition d\'une fine pellicule cristalline (début de saturation).',
      'Cristallisation : Laisser refroidir lentement à température ambiante, puis au réfrigérateur pendant 24h.',
      'Récupération : Filtrer les cristaux bleus obtenus sur un entonnoir Büchner.',
      'Séchage : Sécher les cristaux entre deux feuilles de papier filtre ou à l\'étuve à basse température (40°C).',
      'Rendement : Peser les cristaux secs et calculer le rendement de la synthèse.'
    ],
    hazards: ['L\'acide sulfurique est corrosif', 'Le sulfate de cuivre est toxique pour les organismes aquatiques et irritant pour la peau'],
    precautions: ['Porter une blouse, des gants et des lunettes', 'Ne pas jeter les restes de solutions à l\'évier', 'Utiliser une pince pour manipuler les béchers chauds'],
    quiz: [
      {
        question: "Quelle est la formule brute exacte du sulfate de cuivre pentahydraté, les cristaux bleus synthétisés dans ce TP ?",
        options: [
          "$CuSO_4$",
          "$CuSO_4 \\cdot 5H_2O$",
          "$Cu(SO_4)_2$",
          "$Cu_2SO_4 \\cdot H_2O$"
        ],
        correctAnswer: 1,
        explanation: "Les cristaux bleus stables à température ambiante comportent 5 molécules d'eau de cristallisation associées à chaque unité de sulfate de cuivre."
      },
      {
        question: "Quelle est la couleur physique du sulfate de cuivre anhydre ($CuSO_4$) privé de son eau de cristallisation ?",
        options: [
          "Bleu foncé brillant",
          "Vert émeraude",
          "Blanche",
          "Noire métallique"
        ],
        correctAnswer: 2,
        explanation: "La couleur bleue résulte de la complexation de l'ion cuivre (II) par des molécules d'eau. Isolé de l'eau, le sel anhydre est une poudre blanche poreuse."
      },
      {
        question: "Quelle est l'équation chimique équilibrée représentant la synthèse du sulfate de cuivre à partir de l'oxyde de cuivre ($CuO$) noir ?",
        options: [
          "$CuO_{(s)} + H_2SO_{4(aq)} \\rightarrow CuSO_{4(aq)} + H_{2}O_{(l)}$",
          "$Cu_{(s)} + H_2SO_{4(aq)} \\rightarrow CuSO_{4(aq)} + H_{2(g)}$",
          "$2CuO_{(s)} + S_{(s)} + 2O_{2(g)} \\rightarrow 2CuSO_{4(aq)}$",
          "$CuO_{(s)} + SO_{3(g)} \\rightarrow CuSO_{4(aq)}$"
        ],
        correctAnswer: 0,
        explanation: "Il s'agit d'une réaction acido-basique de dissolution de l'oxyde métallique basique CuO par l'acide fort sulfurique $H_2SO_4$."
      },
      {
        question: "Pourquoi ajoute-t-on l'oxyde de cuivre ($CuO$) noir en léger excès par rapport à l'acide sulfurique ?",
        options: [
          "Pour accélérer la réaction en chauffant moins",
          "Pour garantir que tout l'acide sulfurique limitant (corrosif) soit entièrement consommé, facilitant l'isolation de cristaux purs non acides",
          "Parce que le sel de cuivre se dissout mieux dans le CuO solide",
          "Pour donner une couleur noire au produit fini"
        ],
        correctAnswer: 1,
        explanation: "L'excès de CuO insoluble est facilement éliminé par simple filtration, évitant la contamination des cristaux par de l'acide sulfurique résiduel très acide."
      },
      {
        question: "Quelle technique de séparation physique courante permet d'éliminer l'excès de CuO noir qui n'a pas réagi ?",
        options: [
          "Une décantation simple au bécher",
          "Une filtration par gravité sur papier filtre plissé",
          "Une hydrodistillation",
          "Une chromatographie sur couche mince"
        ],
        correctAnswer: 1,
        explanation: "La filtration par gravité retient l'oxyde de cuivre noir résiduel solide sur le filtre et laisse passer le filtrat limpide bleu de sulfate de cuivre."
      },
      {
        question: "Pourquoi est-il primordial de réaliser la première filtration du mélange réactionnel \"à chaud\" ?",
        options: [
          "Pour éviter que le sulfate de cuivre, dont la solubilité diminue fortement à froid, ne cristallise prématurément sur le papier filtre et ne soit perdu",
          "Pour éliminer l'eau par évaporation rapide",
          "Parce que le papier de filtration fond à basse température",
          "Pour polymériser le cuivre"
        ],
        correctAnswer: 0,
        explanation: "La solubilité de $CuSO_4$ dépend de la température. Filtrer à froid provoquerait la précipitation de cristaux bleus sur le filtre, bouchant les pores et ruinant le rendement."
      },
      {
        question: "Lors de la concentration de la solution bleue, qu'est-ce que la \"fleur de sel\" ou le \"début de cristallisation\" ?",
        options: [
          "L'apparition d'une fine pellicule cristalline sur les bords, indiquant que la solution est devenue saturée et prête à refroidir",
          "Une moisissure biologique due à l'acide",
          "Une réaction d'oxydation avec l'azote de l'air",
          "La preuve que tout le solvant s'est évaporé"
        ],
        correctAnswer: 0,
        explanation: "L'apparition d'une fine croûte de cristaux en surface atteste que la limite de solubilité est atteinte à chaud. On arrête alors immédiatement l'évaporation."
      },
      {
        question: "Quelle sera la différence morphologique si la cristallisation s'effectue par refroidissement très lent plutôt que par choc thermique rapide ?",
        options: [
          "Le refroidissement lent produit des cristaux plus volumineux, mieux définis et de plus grande pureté",
          "Le refroidissement lent détruit l'eau de cristallisation",
          "Le choc thermique rapide donne des cristaux géants et parfaits",
          "Il n'y a absolument aucune différence structurale"
        ],
        correctAnswer: 0,
        explanation: "Une baisse de température lente favorise la croissance tranquille du réseau cristallin existant (cristallogenèse), tandis qu'un choc thermique engendre une surfusion ou une précipitation de micro-aiguilles impures."
      },
      {
        question: "Quel appareillage de laboratoire permet d'accélérer l'essorage et le séchage des cristaux sous pression réduite ?",
        options: [
          "Une ampoule à décanter",
          "Une fiole à vide reliée à une trompe à eau (système d'aspiration Büchner)",
          "Un agitateur magnétique chauffant",
          "Un extracteur de Soxhlet"
        ],
        correctAnswer: 1,
        explanation: "La filtration Büchner crée un vide partiel sous le papier filtre, forçant l'eau-mère à s'évacuer rapidement et compactant les cristaux solides d'une grande limpidité."
      },
      {
        question: "Pourquoi rince-t-on de préférence les cristaux de sulfate de cuivre purifiés sur Büchner avec un solvant froid comme l'éthanol ?",
        options: [
          "Parce que le sulfate de cuivre est très miscible dans l'éthanol liquide chaud",
          "Pour dissoudre les impuretés organiques sans dissoudre les cristaux de sulfate de cuivre, très peu solubles dans l'éthanol froid",
          "Pour accélérer la réaction de décomposition",
          "Pour les rendre inflammables"
        ],
        correctAnswer: 1,
        explanation: "Le rinsage élimine l'eau mère adhérant aux cristaux. Utiliser de l'eau dissoudrait le sulfate de cuivre synthétisé. L'éthanol froid n'altère pas le sel."
      },
      {
        question: "Comment varie la solubilité massique du sulfate de cuivre dans l'eau pure en fonction de la température ?",
        options: [
          "Elle est constante à toute température",
          "Elle croît fortement lorsque la température de l'eau augmente",
          "Elle décroît quand la température s'élève",
          "Elle s'annule complètement au-dessus de 50°C"
        ],
        correctAnswer: 1,
        explanation: "La solubilité du sulfate de cuivre passe d'environ 20 g/100 mL à 0°C à plus de 80 g/100 mL à 80°C. C'est la base de la purification par recristallisation."
      },
      {
        question: "Que se passe-t-il physiquement si l'on chauffe intensément du sulfate de cuivre pentahydraté bleu dans un tube à essai sec ?",
        options: [
          "Il fond en dégageant du gaz hydrogène",
          "Il perd successivement ses 5 molécules d'eau coordonnées, se colorant en blanc poudreux avec apparition de buée d'eau sur les parois du tube",
          "Il s'enflamme spontanément",
          "Il se sublime en vapeurs d'iode violettes"
        ],
        correctAnswer: 1,
        explanation: "La chaleur rompt les liaisons de coordination faibles liant l'eau aux ions cuivre. L'eau s'échappe sous forme gazeuse et se condense plus haut."
      },
      {
        question: "Quelle forme cristalline naturelle adopte le réseau du sulfate de cuivre pentahydraté ?",
        options: [
          "Un système cubique parfait",
          "Un système triclinique (prismes rhombiques asymétriques)",
          "Un système hexagonal régulier",
          "Une structure amorphe sans aucune forme géométrique"
        ],
        correctAnswer: 1,
        explanation: "Le sulfate de cuivre cristallise dans le système triclinique, formant des parallélépipèdes biseautés caractéristiques."
      },
      {
        question: "Qu'est-ce que l'eau de cristallisation ?",
        options: [
          "De l'eau ajoutée par erreur lors du séchage",
          "Des molécules d'eau intégrées de façon stœchiométrique et ordonnée au sein du réseau cristallin solide d'un hydrate",
          "De l'eau distillée pure glacée",
          "Le liquide qui reste au fond du cristallisoir après filtration"
        ],
        correctAnswer: 1,
        explanation: "L'eau de cristallisation ou de coordination fait partie intégrante de la structure et stabilise l'arrangement géométrique des ions."
      },
      {
        question: "Calculez la masse molaire moléculaire du sulfate de cuivre pentahydraté ($CuSO_4 \\cdot 5H_2O$) sachant que : $M(Cu)=63,5$; $M(S)=32,1$; $M(O)=16$; $M(H)=1$ g/mol.",
        options: [
          "159,6 g/mol",
          "249,6 g/mol",
          "180,0 g/mol",
          "312,2 g/mol"
        ],
        correctAnswer: 1,
        explanation: "$M(CuSO_4 \\cdot 5H_2O) = 63,5 + 32,1 + (4 \\cdot 16) + 5 \\cdot (2 \\cdot 1 + 16) = 159,6 + 90 = 249,6$ g/mol."
      },
      {
        question: "Si l'on part de 5,0 g d'oxyde de cuivre ($CuO$) réactionnel théoriquement limitant, quelle masse théorique maximale de crystals de $CuSO_4 \\cdot 5H_2O$ obtiendra-t-on si le rendement est de 100% ? ($M(CuO) = 79,5$ g/mol, $M(sel) = 249,6$ g/mol).",
        options: [
          "5,0 g",
          "15,7 g",
          "25,2 g",
          "9,8 g"
        ],
        correctAnswer: 1,
        explanation: "La réaction est mole à mole. $n(CuO) = 5/79,5 = 0,0629$ mol. La masse théorique de produit est $0,0629 \\cdot 249,6 = 15,7$ g."
      },
      {
        question: "Pourquoi maintient-on l'étuve de séchage à une température modérée (autour de 40°C maximum) ?",
        options: [
          "Pour économiser l'électricité du laboratoire",
          "Pour éviter de vaporiser l'eau de cristallisation du sulfate de cuivre pentahydraté, ce qui le transformerait partiellement en poudre anhydre blanche",
          "Parce que le cuivre fond dès 50°C",
          "Pour éliminer l'acide borique"
        ],
        correctAnswer: 1,
        explanation: "À partir de 60-70°C, le pentahydrate commence à perdre des molécules d'eau de coordination pour passer à l'état trihydraté puis monohydraté, perdant sa belle couleur bleue."
      },
      {
        question: "Quelle entité chimique hydratée donne sa couleur bleue au milieu réactionnel et aux cristaux hydratés ?",
        options: [
          "L'ion sulfate libre $SO_4^{2-}$",
          "Le complexe tétraaquacuivre (II) ou hexaaquacuivre (II) $[Cu(H_2O)_6]^{2+}$",
          "L'oxyde de cuivre noir dissous",
          "Les molécules d'acide sulfurique libre"
        ],
        correctAnswer: 1,
        explanation: "C'est la transition d-d des électrons de l'ion métallique de transition $Cu^{2+}$ complexé par ses ligands eau qui engendre l'absorption dans le orange-rouge, diffusant du bleu."
      },
      {
        question: "Comment définit-on le rendement d'une synthèse chimique au laboratoire ?",
        options: [
          "Le rapport de la masse de produit finale obtenue expérimentalement sur la masse théorique maximale attendue stœchiométriquement",
          "La vitesse de formation des cristaux solides",
          "La concentration finale de la solution saturée",
          "La masse totale de solvant évaporé"
        ],
        correctAnswer: 0,
        explanation: "Le rendement exprime le rapport de la quantité de matière réelle isolée sur la quantité idéale calculée selon les équations équilibrées."
      },
      {
        question: "Quelle propriété chimique qualitative justifie l'emploi du sulfate de cuivre anhydre comme détecteur de traces d'eau ?",
        options: [
          "Il réagit de façon explosive avec l'eau pure",
          "Il vire très nettement d'une teinte blanche à une couleur bleue intense dès qu'il est hydraté par une trace d'eau moléculaire",
          "Il est insoluble dans tous les acides connus",
          "Il flotte à la surface de l'eau"
        ],
        correctAnswer: 1,
        explanation: "Le changement de couleur entre sel blanc anhydre et complexe d'eau bleu est une méthode très sensible et historique pour dévoiler la présence d'eau dans les solvants orga."
      }
    ]
  },
  {
    id: '8',
    title: 'Complexométrie — dosage du calcium',
    description: 'Technique de titrage complexométrique pour déterminer la dureté calcique d\'une eau.',
    image: '/src/assets/images/complexometrie_calcium_titration_1781504875910.jpg',
    category: 'Chimie analytique',
    level: '1ère Bac',
    difficulty: 'Intermédiaire',
    duration: '2h',
    setupImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Titration_setup.svg/512px-Titration_setup.svg.png',
    videoUrl: 'https://www.youtube.com/embed/mzJ96CM7YrA',
    materials: ['Burette graduée', 'Erlenmeyer', 'Pipette jaugée'],
    chemicals: ['Solution d\'EDTA', 'NET (indicateur coloré)', 'Solution tampon pH=10'],
    protocol: [
      'Préparation de la burette : Rincer et remplir la burette avec la solution d\'EDTA à 0,01 mol/L.',
      'Prélèvement : Pipeter 10,0 mL de l\'échantillon d\'eau minérale ou du robinet dans un erlenmeyer.',
      'Mise au pH : Ajouter 5 mL de solution tampon de pH = 10 (ammoniacale) pour permettre la stabilité du complexe.',
      'Indicateur : Ajouter une petite pincée ou quelques gouttes de Noir Ériochrome T (NET). La solution devient rose/violacée.',
      'Titrage : Verser lentement l\'EDTA sous agitation jusqu\'à ce que la solution vire au bleu franc (sans trace de violet).',
      'Mesure : Relever le volume de l\'équivalence Ve.',
      'Répétabilité : Effectuer deux titrages concordants.',
      'Dosage des magnésium (Optionnel) : Le dosage au NET donne la somme Ca2+ + Mg2+.',
      'Dosage spécifique Ca2+ : Répéter le dosage à pH = 12 avec de la murexide comme indicateur.',
      'Calcul : Exprimer le résultat en mg/L de calcium ou en degrés français (°f).'
    ],
    hazards: ['La solution tampon ammoniacale est irritante et a une odeur forte', 'L\'EDTA est peu toxique mais irritant'],
    precautions: ['Manipuler le tampon sous hotte ou dans une pièce aérée', 'Utiliser une pipette jaugée pour l\'eau', 'Ne pas respirer les vapeurs d\'ammoniac'],
    quiz: [
      {
        question: "Qu'est-ce que l'EDTA s'agissant de son rôle chimique dans ce titrage ?",
        options: [
          "Un acide carboxylique réducteur",
          "Un ligand polydenté (acide éthylènediaminetétraacétique) capable de former des complexes stables avec les cations métalliques",
          "Un indicateur coloré halochromique",
          "Un solvant boraté non-polaire"
        ],
        correctAnswer: 1,
        explanation: "L'EDTA possède six sites donneurs de doublets (4 carboxylates, 2 amines), ce qui en fait un puissant chélateur de métaux bivalents comme Ca2+."
      },
      {
        question: "Quelle est la stœchiométrie de la réaction de complexation entre l'EDTA ($Y^{4-}$) et un cation métallique comme le calcium ($Ca^{2+}$) ?",
        options: [
          "1:1 (un ion métal réagit avec une seule molécule d'EDTA)",
          "1:2 (un ion métal réagit avec deux molécules d'EDTA)",
          "2:1 (deux ions métaux réagissent avec une seule molécule d'EDTA)",
          "La stœchiométrie varie selon la valence de l'ion"
        ],
        correctAnswer: 0,
        explanation: "Quelle que soit la charge du cation métallique divalents ou trivalents, la chélation par l'EDTA se fait toujours rigoureusement selon un rapport de 1:1."
      },
      {
        question: "Pourquoi est-il obligatoire d'ajouter un tampon ammoniacal pH = 10 avant de démarrer le titrage ?",
        options: [
          "Pour détruire l'eau minérale",
          "Pour déprotoner l'EDTA sous sa forme active complexante ($Y^{4-}$) tout en assurant une zone de pH idéale pour la stabilité et le virage de couleur du NET",
          "Pour faire précipiter le calcium",
          "Pour colorer le milieu en bleu ciel"
        ],
        correctAnswer: 1,
        explanation: "La forme complexante majoritaire de l'EDTA est $Y^{4-}$, favorisée à pH basique. De plus, les complexes formés avec le calcium et le magnésium sont stables à pH = 10."
      },
      {
        question: "Quel rôle s'attribue le Noir Ériochrome T (NET) introduit dans l'Erlenmeyer ?",
        options: [
          "Il joue le rôle de catalyseur d'oxydation",
          "C'est un indicateur métallochromique (sa couleur dépend de sa complexation ou non avec un ion métallique)",
          "Il maintient le pH constant",
          "C'est le solvant d'extraction"
        ],
        correctAnswer: 1,
        explanation: "Le NET se fixe transitoirement aux ions $Mg^{2+}$/$Ca^{2+}$ sous forme d'un complexe coloré rouge-rose sombre. Libre, il est bleu violacé."
      },
      {
        question: "Quel virage de couleur précis observe-t-on à l'équivalence méticuleusement suivie ?",
        options: [
          "Du bleu-vert limpide au rouge carmin",
          "Du rouge-violacé (complexe NET-métal) au bleu franc (indicateur NET libre)",
          "De l'incolore au violet fluo",
          "Du jaune canari au blanc laiteux"
        ],
        correctAnswer: 1,
        explanation: "Lorsqu'on ajoute l'EDTA, celui-ci déplace le NET de ses liaisons avec les métaux car ses complexes sont plus stables. Le NET redevient libre et prend sa couleur de pH 10 : bleu."
      },
      {
        question: "Si l'on dose l'eau minérale à pH = 10 avec le NET, quels cations bivalents dose-t-on globalement ?",
        options: [
          "Uniquement les ions calcium $Ca^{2+}$",
          "Uniquement les ions magnésium $Mg^{2+}$",
          "La somme globale des ions calcium et magnésium ($Ca^{2+} + Mg^{2+}$)",
          "Tous les ions alcalins comme le sodium $Na^+$"
        ],
        correctAnswer: 2,
        explanation: "À pH = 10, l'EDTA complexe indifféremment et simultanément le calcium ($Ca^{2+}$) et le magnésium ($Mg^{2+}$) présents dans l'échantillon."
      },
      {
        question: "Si l'on cherche à doser sélectivement le calcium ($Ca^{2+}$) en présence de magnésium ($Mg^{2+}$), que faire délibérément ?",
        options: [
          "Chauffer le mèlange à 100°C",
          "Précipiter les ions magnésium sous forme d'hydroxyde de magnésium $Mg(OH)_{2(s)}$ en élevant fortement le pH de la solution à 12, puis doser",
          "Filtrer la solution sur papier à charbon actif",
          "Ajouter du chlore liquide"
        ],
        correctAnswer: 1,
        explanation: "À pH supérieur à 12, les ions magnésium se convertissent en précipité d'hydroxyde de magnésium inerte à l'EDTA, laissant le calcium libre pour un dosage exclusif."
      },
      {
        question: "Quel indicateur de fin de réaction emploie-t-on spécifiquement à pH = 12 pour le titrage exclusif du calcium ?",
        options: [
          "Le Noir Ériochrome T",
          "La murexide (ou le calconecarboxylate)",
          "Le bleu de bromothymol",
          "Le méthylorange"
        ],
        correctAnswer: 1,
        explanation: "La murexide se lie spécifiquement au calcium à pH = 12 avec un virage net rose saumon au violet pourpré."
      },
      {
        question: "Quel terme scientifique définit la concentration globale en ions calcium et magnésium d'une eau ?",
        options: [
          "Le titre alcalimétrique complet (TAC)",
          "La dureté totale ou Titre Hydrotimétrique (TH)",
          "La conductivité équivalente",
          "La turbidité"
        ],
        correctAnswer: 1,
        explanation: "Le Titre Hydrotimétrique (TH) quantifie la dureté calcique et magnésienne de l'eau, responsable de l'entartrage et de la non-mousse du savon."
      },
      {
        question: "Comment est définie l'unité quantitative usuelle de dureté en France, le degré français ($1^{\\circ}f$) ?",
        options: [
          "Une concentration de 1,0 mg de calcium par litre d'eau",
          "Une concentration équivalente à $10^{-4}$ mol/L de cations alcalino-terreux ($Ca^{2+}$ et $Mg^{2+}$), soit 10 mg de $CaCO_3$ par litre d'eau",
          "Le volume mort de la burette graduée",
          "La quantité de savon solide à dissoudre"
        ],
        correctAnswer: 1,
        explanation: "Par convention, un degré français d'hydrotimétrie ($1^{\\circ}f$) correspond à $10^{-4}$ mol/L de calcaire (soit 4 mg de calcium ou 2,4 mg de magnésium par litre)."
      },
      {
        question: "Comment qualifie-t-on une eau dont le Titre Hydrotimétrique TH est inférieur à $15^{\\circ}f$ ?",
        options: [
          "Eau douce",
          "Eau moyennement dure",
          "Eau très dure",
          "Eau minérale gazeuse brute"
        ],
        correctAnswer: 0,
        explanation: "Une eau ayant un TH de 0 à $15^{\\circ}f$ est douce (peu de calcaire), une eau de TH supérieur à $30^{\\circ}f$ est considérée comme calcaire ou dure."
      },
      {
        question: "La structure de l'EDTA forme une \"pince\" chimique stable autour de l'ion métallique central. Comment appelle-t-on ce phénomène ?",
        options: [
          "Une saponification",
          "La Chélation (du grec khêlê, pince de crabe)",
          "Un relargage salin",
          "Un effet d'adsorption sélective"
        ],
        correctAnswer: 1,
        explanation: "La chélation caractérise la fixation de ligands polydentés formant au moins deux liaisons de coordination stables autour d'un ion métallique."
      },
      {
        question: "Quelle est la denticité maximale de la molécule de ligand EDTA s'agissant de ses atomes donneurs ?",
        options: [
          "Bidenté",
          "Polydenté hexadenté (6 doublets d'électrons disponibles sur l'azote et l'oxygène)",
          "Tridenté",
          "Monodenté"
        ],
        correctAnswer: 1,
        explanation: "Avec ses deux azotes tertiaires et ses quatre groupements carboxylates deprotonés, l'EDTA est un coordinat hexadenté enserrant parfaitement les métaux."
      },
      {
        question: "Pourquoi le savon ordinaire mousse-t-il très mal dans une eau fortement hydrotimétrique ( TH > $35^{\\circ}f$ ) ?",
        options: [
          "Parce que le calcaire détruit l'eau distillée",
          "Les ions calcium et magnésium précipitent les acides gras du savon sous forme d'isomères insolubles grisâtres (carboxylates de calcium), inhibant son pouvoir tensioactif",
          "Car le savon s'évapore rapidement sous l'influence du pH 10",
          "Pour des raisons de température"
        ],
        correctAnswer: 1,
        explanation: "Les ions calcium s'associent aux carboxylates du savon de sodium pour donner des sels de calcium insolubles. Le savon ne mousse qu'après consommation complète du calcaire."
      },
      {
        question: "Quelle est la particularité thermodynamique qui explique que l'EDTA déplace systématiquement les indicateurs colorés liés au métal ?",
        options: [
          "Une constante globale de stabilité de complexe ($K_f$) beaucoup plus élevée avec l'EDTA qu'avec le Noir Ériochrome T",
          "Une réaction cinétique beaucoup plus lente",
          "La densité volumique ultra-faible de l'EDTA",
          "Une différence de pression de vapeur saturante"
        ],
        correctAnswer: 0,
        explanation: "La constante de dissociation ou stabilité ($K_f$) du complexe $[CaY]^{2-}$ est très grande devant celle du complexe $[CaNET]^{2+}$. L'EDTA capte donc les ions de force."
      },
      {
        question: "Une prise d'eau minérale de $V_{eau} = 10,0$ mL nécessite $V_{E} = 12,0$ mL d'EDTA à $0,010$ mol/L à l'équivalence. Quelle est la concentration molaire en ions calcium totaux de cette eau ?",
        options: [
          "$0,012$ mol/L",
          "$0,0012$ mol/L",
          "$1,20 \\cdot 10^{-4}$ mol/L",
          "$1,20$ mol/L"
        ],
        correctAnswer: 0,
        explanation: "À l'équivalence, $n(métal) = n(EDTA) \\rightarrow C_{métal} \\cdot V_{eau} = C_{EDTA} \\cdot V_E \\rightarrow C_{métal} = (0,010 \\cdot 12)/10 = 0,012$ mol/L."
      },
      {
        question: "Pourquoi rincer l'Erlenmeyer de prélèvement uniquement à l'eau distillée et jamais avec de l'eau du robinet ou du pain de savon ?",
        options: [
          "Pour ne pas saturer l'appareil",
          "L'eau distillée ne remplace pas d'ions calcium ou magnésium dosables, elle n'influe donc pas sur la quantité de matière de cations présente",
          "Car le savon colore la solution en bleu",
          "C'est indispensable pour refroidir le milieu"
        ],
        correctAnswer: 1,
        explanation: "Rincer à l'eau distillée peut diluer le volume total mais conserve la quantité de matière d'analytes inchangée, la mesure finale par la burette restant rigoureuse."
      },
      {
        question: "Si une eau est également caractérisée par des métaux lourds à l'état de trace, comment réagit l'EDTA ?",
        options: [
          "Il les ignore totalement",
          "Il forme des complexes encore plus stables avec le fer, le zinc ou le plomb, ce qui nécessite l'ajout d'agents masquants sélectifs",
          "Il provoque leur dégagement sous forme gazeuse",
          "Il s'évapore"
        ],
        correctAnswer: 1,
        explanation: "La complexométrie EDTA n'est pas spécifique au calcium. Il complexe la plupart des d'ions divalents de transition avec d'immenses constantes de coordination."
      },
      {
        question: "Pourquoi l'EDTA s'achète-t-il communément sous le nom de sel de sodium disodique dihydraté ($Na_2H_2Y \\cdot 2H_2O$) ?",
        options: [
          "Parce qu'il est beaucoup plus acide",
          "La solubilité de l'acide libre EDTA dans l'eau est très faible, tandis que son sel disodique s'y dissout très rapidement",
          "Pour réduire le coût de production",
          "Il permet de remplacer le sel de cuisine"
        ],
        correctAnswer: 1,
        explanation: "L'acide EDTA est difficilement soluble dans l'eau. Pour fabriquer les solutions étalons, on recourt à son sel de sodium disodique soluble et pur."
      },
      {
        question: "Quelle méthode électrochimique sans indicateurs colorés permettrait également de tracer la courbe de ce titrage ?",
        options: [
          "Une gravimétrie différence",
          "Une titrométrie potentiométrique utilisant une électrode indicatrice de calcium sélective (ISE)",
          "Une chromatographie sur couche mince gazeuse",
          "Une réfractométrie optique"
        ],
        correctAnswer: 1,
        explanation: "L'électrode spécifique ausculte directement l'activité des ions libres au cours de l'ajout d'EDTA, offrant un saut de potentiel à l'équivalence d'une grande rigueur."
      }
    ]
  },
  {
    id: '9',
    title: 'Synthèse de l\'aspirine',
    description: 'Synthèse organique par acétylation de l\'acide salicylique à l\'aide d\'anhydride acétique.',
    image: '/src/assets/images/aspirin_synthesis_reflux_setup_1781536729720.jpg',
    category: 'Chimie organique',
    level: '2ème Bac',
    difficulty: 'Intermédiaire',
    duration: '3h',
    setupImage: '/src/assets/images/aspirin_synthesis_multi_1781528457045.jpg',
    videoUrl: 'https://www.youtube.com/embed/3B08cjs-s88',
    materials: ['Ballon bicol 250mL', 'Réfrigérant à boules', 'Dispositif de filtration sous vide (Büchner)', 'Banc Köfler'],
    chemicals: ['Acide salicylique (2,0 g)', 'Anhydride acétique (5 mL)', 'Acide sulfurique concentré'],
    protocol: [
      'Préparation : Dans un ballon bicol de 250 mL parfaitement sec, introduire 2,0 g d\'acide salicylique.',
      'Introduction des réactifs : Ajouter avec précaution 5,0 mL d\'anhydride acétique à l\'aide d\'une éprouvette sèche.',
      'Catalyse : Ajouter 5 gouttes d\'acide sulfurique concentré pour catalyser la réaction.',
      'Installation : Placer le ballon dans un bain-marie à 60°C et adapter un réfrigérant à boules.',
      'Chauffage : Maintenir le chauffage pendant 20 minutes sous agitation magnétique.',
      'Cristallisation : Sortir le ballon du bain-marie et, sans attendre le refroidissement complet, ajouter lentement 50 mL d\'eau glacée par le haut du réfrigérant.',
      'Précipitation : Placer le ballon dans un bain de glace pilée. L\'aspirine (acide acétylsalicylique) précipite sous forme de cristaux blancs.',
      'Filtration : Filtrer les cristaux sous vide à l\'aide d\'un entonnoir Büchner.',
      'Lavage : Rincer abondamment les cristaux avec de l\'eau distillée glacée pour éliminer les restes d\'acides.',
      'Caractérisation : Mesurer le point de fusion sur un banc Köfler pour vérifier la pureté du produit obtenu.'
    ],
    hazards: ['L\'anhydride acétique est corrosif, inflammable et réagit violemment avec l\'eau', 'L\'acide sulfurique est très corrosif', 'L\'aspirine synthétisée n\'est pas destinée à la consommation'],
    precautions: ['Manipulation impérative sous hotte aspirante', 'Port des gants, lunettes et blouse boutonnée', 'Utiliser du matériel parfaitement sec pour éviter l\'hydrolyse de l\'anhydride'],
    quiz: [
      {
        question: "Quelle est l'équation chimique bilan globale de la synthèse de l'aspirine par acétylation de l'acide salicylique ?",
        options: [
          "$\\text{Acide salicylique} + \\text{Acide acétique} \\rightarrow \\text{Aspirine} + \\text{Eau}$",
          "$\\text{Acide salicylique} + \\text{Anhydride acétique} \\rightarrow \\text{Aspirine} + \\text{Acide acétique}$",
          "$\\text{Acide salicylique} + \\text{Ethanol} \\rightarrow \\text{Aspirine}$",
          "$\\text{Salicylate de sodium} + \\text{Anhydride acétique} \\rightarrow \\text{Aspirine} + \\text{Eau}$"
        ],
        correctAnswer: 1,
        explanation: "L'acétylation de la fonction phénol de l'acide salicylique par l'anhydride acétique produit l'acide acétylsalicylique (aspirine) et libère de l'acide acétique."
      },
      {
        question: "Pourquoi utilise-t-on de l'anhydride acétique plutôt que de l'acide acétique pour réaliser cette estérification ?",
        options: [
          "Parce que l'anhydride acétique coûte moins cher à l'achat",
          "L'anhydride acétique est un agent d'acétylation beaucoup plus réactif, ce qui rend la réaction rapide, totale et irréversible (pas d'état d'équilibre)",
          "Parce que l'acide acétique détruit le ballon de verre",
          "Pour réduire le temps de séchage"
        ],
        correctAnswer: 1,
        explanation: "L'estérification d'un phénol par un anhydride d'acide est totale et rapide. Par contre, utiliser un acide carboxylique conduirait à un équilibre limité et lent."
      },
      {
        question: "Quelle fonction chimique de la molecule d'acide salicylique subit la modification lors de cette synthèse ?",
        options: [
          "La fonction acide carboxylique $-COOH$",
          "La fonction phénol $-OH$ (alcool aromatique)",
          "Le cycle benzénique lui-même",
          "La fonction aldéhyde"
        ],
        correctAnswer: 1,
        explanation: "L'acétylation greffe un groupe acétyle $-CO-CH_3$ sur l'oxygène de la fonction phénol de l'acide salicylique pour former la fonction ester de l'aspirine."
      },
      {
        question: "Quel est le rôle cinétique exact des quelques gouttes d'acide sulfurique concentré ajoutées au départ ?",
        options: [
          "C'est un réactif limitant consommé en fin de TP",
          "C'est un catalyseur homogène acide qui augmente fortement la vitesse de réaction en protonant l'anhydride acétique",
          "C'est le solvant de cristallisation",
          "Il sert d'indicateur coloré"
        ],
        correctAnswer: 1,
        explanation: "Les protons $H^+$ libérés par l'acide sulfurique catalysent la réaction en rendant le carbone de l'anhydride plus électrophile, accélérant la synthèse."
      },
      {
        question: "Quel montage de verrerie classique utilise-t-on pour réaliser cette synthèse à 60°C pendant 20 minutes ?",
        options: [
          "Une hydrodistillation simple avec ampoule de coulée",
          "Un montage de chauffage à reflux (muni d'un réfrigérant à boules vertical) permettant de chauffer à pression constante sans perte de matière",
          "Une distillation fractionnée sur colonne de Vigreux",
          "Un montage de filtration sous vide"
        ],
        correctAnswer: 1,
        explanation: "Le réfrigérant à boules condense les vapeurs des réactifs et solvants volatiles qui retombent continuellement dans le ballon, évitant l'évacuation de matière."
      },
      {
        question: "Pourquoi maintient-on la température du chauffage au bain-marie à environ 60°C plutôt qu'à 150°C ?",
        options: [
          "Pour préserver le thermomètre de verre",
          "Pour éviter la décomposition ou la fusion de l'acide salicylique et minimiser la formation de réactions secondaires de polymérisation de l'aspirine",
          "Parce que l'eau du bain-marie bout à 60°C",
          "Pour ne pas irriter les yeux de l'expérimentateur"
        ],
        correctAnswer: 1,
        explanation: "Une température modérée (60°C) suffit largement à mener la synthèse à l'aide de l'anhydride acétique très réactif tout en s'épargnant des réactions d'hydrolyse ou polycondensation gallopantes."
      },
      {
        question: "Quel co-produit acide est libéré dans le ballon de réaction parallèlement à la formation d'aspirine ?",
        options: [
          "L'acide chlorhydrique",
          "L'acide acétique ($CH_3COOH$)",
          "L'acide formique",
          "L'acide nitrique"
        ],
        correctAnswer: 1,
        explanation: "Le bilan stœchiométrique indique que l'attaque du nucléophile phénol sur l'anhydride libère une molécule d'acide acétique pour chaque molécule d'aspirine synthétisée."
      },
      {
        question: "Pourquoi ajoute-t-on prudemment de l'eau glacée dans le ballon chaud à la fin de la période d'agitation ?",
        options: [
          "Pour faire précipiter l'eau distillée",
          "Pour hydrolyser et détruire l'excès d'anhydride acétique n'ayant pas réagi, tout en initiant la précipitation de l'aspirine brute insoluble à froid",
          "Pour acidifier le milieu en profondeur",
          "C'est une étape facultative purement décorative"
        ],
        correctAnswer: 1,
        explanation: "L'anhydride d'acide très réactif réagit violemment avec l'eau pour se transformer en acide acétique soluble. De plus, l'aspirine solide précipite car sa solubilité s'effondre dans l'eau glacée."
      },
      {
        question: "Quelle technique de chimie organique permet d'obtenir des cristaux purs d'aspirine à partir de notre produit brut solide ?",
        options: [
          "Une chromatographie sur couche mince préparative",
          "Une recristallisation (dissolution à chaud dans un mélange ethanol/eau suivie d'un refroidissement lent initiant la cristallisation sélective)",
          "Une hydrodistillation répétée à blanc",
          "Une décantation au Büchner"
        ],
        correctAnswer: 1,
        explanation: "La recristallisation exploite les différences de solubilité à chaud et à froid entre le produit désiré purifié et ses impuretés résiduelles."
      },
      {
        question: "Quel instrument de mesure du laboratoire permet de révéler le point de fusion de nos cristaux d'aspirine secs pour évaluer sa pureté ?",
        options: [
          "Un viscosimètre rotatif",
          "Un banc Kofler (vérification de la température de changement d'état physique solide/liquide)",
          "Un spectrophotomètre d'absorption atomique",
          "Un réfractomètre de poche"
        ],
        correctAnswer: 1,
        explanation: "Le banc Kofler dispose d'un gradient de température linéaire métallique étalonné. Déposer les cristaux permet d'observer la température de fusion caractéristique."
      },
      {
        question: "Quelle est la température de fusion théorique (point de fusion) de l'acide acétylsalicylique (aspirine) pure ?",
        options: [
          "100 °C",
          "135 °C à 136 °C",
          "159 °C à 161 °C",
          "45 °C"
        ],
        correctAnswer: 1,
        explanation: "L'acide acétylsalicylique pur fond à 135-136°C. L'acide salicylique de départ quant à lui fond à une température supérieure d'environ 159°C."
      },
      {
        question: "Si l'on analyse l'aspirine brute obtenue par Chromatographie sur Couche Mince (CCM), qu'indique la présence d'une tache au même niveau que l'acide salicylique de référence ?",
        options: [
          "Que l'aspirine synthétisée est pure à 100%",
          "Que la réaction d'acétylation est incomplète : il subsiste de l'acide salicylique n'ayant pas réagi dans le produit solide brut",
          "Que le solvant d'élution est trop volatil",
          "Que notre silice est dégradée"
        ],
        correctAnswer: 1,
        explanation: "Le phénol de départ et l'aspirine finale ont des rapports frontaux ($R_f$) bien distincts. Une tache commune d'acide salicylique prouve sa présence résiduelle indésirable."
      },
      {
        question: "Quel révélateur ou test chimique coloré permet de déceler instantanément la présence d'acide salicylique de départ dans nos cristaux purifiés ?",
        options: [
          "Une coloration rose provoquée par quelques gouttes de phénolphtaléine",
          "Une coloration violette intense provoquée par l'ion ferrique ($Fe^{3+}$ en solution de FeCl3), témoignant de la persistance de l'hydroxyle phénolique libre",
          "Un dégagement de fumée blanche d'acide chlorhydrique",
          "Une odeur de vinaigre concentré"
        ],
        correctAnswer: 1,
        explanation: "Les phénols forment un complexe violet-pourpre très sensible avec les ions $Fe^{3+}$. L'aspirine pure ne possède plus de fonction phénol libre et donne un test négatif jaune."
      },
      {
        question: "Si l'on fait réagir 2,0 g d'acide salicylique ($M = 138,1$ g/mol) avec un excès d'anhydride acétique. Quelle est la masse théorique attendue d'aspirine ($M = 180,2$ g/mol) pour un rendement parfait ?",
        options: [
          "2,0 g",
          "2,61 g",
          "3,15 g",
          "1,50 g"
        ],
        correctAnswer: 1,
        explanation: "La réaction est stœchiométriquement equimolaire (1:1). $n(\\text{salicylique}) = 2,0/138,1 = 0,0145$ mol. La masse théorique vaut $0,0145 \\cdot 180,2 = 2,61$ g."
      },
      {
        question: "Pourquoi l'aspirine brute synthétisée précipite-t-elle lors de l'ajout d'eau glacée alors que l'acide acétique reste dissous s'il vous plaît ?",
        options: [
          "Parce que l'acide acétique réagit de manière covalente avec la glace",
          "Parce que l'aspirine est une molécule organique hydrophobe cristalline à faible solubilité dans l'eau à basse température, tandis que l'acide acétique y est infiniment miscible",
          "L'aspirine est plus lourde",
          "À cause de la catalyse par l'acide sulfurique"
        ],
        correctAnswer: 1,
        explanation: "La polarité relative de l'acide acétylsalicylique limite sa dispersion aqueuse à froid, forçant l'ordonnancement cristallin. L'acide acétique, très polaire, adore l'eau."
      },
      {
        question: "Qu'est-ce que l'aspirine du point de vue pharmacologique ?",
        options: [
          "Un antibiotique à large spectre",
          "Un anti-inflammatoire non stéroïdien (AINS), analgésique (anti-douleur), antipyrétique (combat la fièvre) et antiagrégant plaquettaire",
          "Un sédatif puissant",
          "Un antiseptique externe"
        ],
        correctAnswer: 1,
        explanation: "L'aspirine agit en inhibant de manière irréversible les enzymes cyclooxygénases (COX-1 et COX-2), régulant la synthèse des prostaglandines médiatrices d'inflammation."
      },
      {
        question: "Pourquoi l'aspirine commerciale est-elle parfois combinée à d'autres sels organiques comme l'acétylsalicylate de lysine au laboratoire ?",
        options: [
          "Pour améliorer son odeur",
          "Pour accroître la solubilité aqueuse de l'aspirine et accélérer son absorption gastrique tout en ménageant la muqueuse de l'estomac",
          "Pour ralentir sa date de péremption",
          "Pour la rendre gazeuse"
        ],
        correctAnswer: 1,
        explanation: "Le sel d'acide cétonique organique polaire de lysine de l'aspirine est ultra-soluble, ce qui permet des préparations injectables ou buvables rapides."
      },
      {
        question: "Pourquoi lave-t-on le gâteau de cristaux sur Büchner à l'eau distillée glacée plutôt qu'à l'eau distillée tiède ?",
        options: [
          "Pour éviter l'évaporation du papier filtre",
          "Pour éliminer l'acide d'adhésion superficiel restant sans dissoudre excessivement le produit pur solide isolé, la solubilité de l'aspirine augmentant avec la température de l'eau",
          "C'est pour accélérer le processus de fusion",
          "L'eau glacée neutralise spontanément l'ester"
        ],
        correctAnswer: 1,
        explanation: "Un rinçage à l'eau tiède dissoudrait une partie importante des cristaux d'aspirine déjà purifiés, dégradant artificiellement le rendement final."
      },
      {
        question: "Quelles sont les deux fonctions organiques caractéristiques greffées sur le noyau benzénique de l'acide acétylsalicylique (aspirine) ?",
        options: [
          "Un ester aromatique et un groupe hydroxyle basique",
          "Un ester (acétyle branché sur l'oxygène aromatique) et un acide carboxylique",
          "Un aldéhyde et une cétone conjuguée",
          "Un phénol et un acide de Lewis"
        ],
        correctAnswer: 1,
        explanation: "L'aspirine préserve la fonction acide carboxylique $-COOH$ historique de l'acide salicylique, alors que la fonction phénol est convertie en ester acéto-salicylique."
      },
      {
        question: "Que se passe-t-il chimiquement à long terme si de l'aspirine est stockée dans un environnement chaud et humide (hydrolyse lente) ?",
        options: [
          "Elle explose spontanément",
          "Elle subit une hydrolyse acide ménagée retournant vers de l'acide acétique (odeur de vinaigre) et de l'acide salicylique d'origine",
          "Elle se transforme en éthanol liquide",
          "Sa constante molale s'annule complètement"
        ],
        correctAnswer: 1,
        explanation: "L'humidité ambiante et la température catalysent l'hydrolyse spontanée de la liaison ester modifiée, libérant l'odorant acide acétique gazeux."
      }
    ]
  },
  {
    id: '10',
    title: 'Chromatographie sur Couche Mince (CCM)',
    description: 'Séparation et identification des composants d\'un mélange par migration différentielle.',
    image: '/src/assets/images/ccm_chromatography_chamber_1781528787686.jpg',
    category: 'Techniques de base',
    level: 'Tronc Commun',
    difficulty: 'Débutant',
    duration: '1h30',
    setupImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Thin_layer_chromatography_diagram.png/400px-Thin_layer_chromatography_diagram.png',
    materials: ['Plaques CCM Silice', 'Cuve de migration', 'Capillaires', 'Lampe UV'],
    chemicals: ['Éluant approprié', 'Solutions de référence'],
    protocol: [
      'Préparation de la cuve : Verser environ 0,5 cm de hauteur d\'éluant dans la cuve à chromatographie et fermer le couvercle pour saturer l\'atmosphère en vapeurs.',
      'Préparation de la plaque : Tracer légèrement au crayon à papier une ligne de dépôt à 1 cm du bord inférieur d\'une plaque de silice.',
      'Dépôts : À l\'aide de capillaires fins, déposer de petites gouttes des solutions à analyser (références et échantillon) sur la ligne, en les espaçant de 1 cm.',
      'Élution : Placer délicatement la plaque dans la cuve (la ligne de dépôt doit être au-dessus du niveau du liquide) et refermer.',
      'Migration : Surveiller la montée de l\'éluant par capillarité. Arrêter la migration quand le front arrive à 1 cm du haut.',
      'Front de solvant : Sortir la plaque et marquer immédiatement au crayon la position du front du solvant.',
      'Séchage : Laisser sécher la plaque sous la hotte.',
      'Révélation UV : Observer la plaque sous lampe UV (254 nm) et entourer les taches apparues au crayon.',
      'Révélation chimique (Optionnelle) : Utiliser un révélateur comme le diiode ou le permanganate si les molécules ne sont pas visibles aux UV.',
      'Analyse : Calculer les rapports frontaux (Rf = h/H) et identifier les constituants par comparaison avec les références.'
    ],
    hazards: ['Les éluants sont souvent inflammables, toxiques et volatiles (ex: cyclohexane, acétate d\'éthyle)', 'Les rayons UV sont dangereux pour les yeux'],
    precautions: ['Manipuler la cuve et les éluants sous hotte', 'Ne jamais regarder directement la lampe UV sans lunettes spécifiques', 'Ne pas toucher la surface active de la plaque avec les doigts'],
    quiz: [
      {
        question: "Sur quoi repose le principe fondamental de la séparation des constituants d'un mélange par Chromatographie sur Couche Mince (CCM) ?",
        options: [
          "Sur la différence de température d'ébullition des analytes",
          "Sur la différence d'affinité ou de partage des constituants d'un mélange entre une phase stationnaire fixe et une phase mobile en mouvement",
          "Sur la gravitation universelle",
          "Sur la décomposition thermique sélective"
        ],
        correctAnswer: 1,
        explanation: "Chaque composé migre à une vitesse propre qui dépend de sa polarité et de son aptitude à s'adsorber sur la phase stationnaire ou à se dissoudre dans l'éluant."
      },
      {
        question: "Quelle est la constitution chimique de la phase stationnaire la plus courante déposée sur les plaques CCM ?",
        options: [
          "Du papier filtre ordinaire compact",
          "Du gel de silice ($SiO_2$), un polymère tridimensionnel polaire riche en groupes silanols ($-Si-OH$)",
          "Du Teflon pur hydrophobe",
          "Du saphir synthétique amorphe"
        ],
        correctAnswer: 1,
        explanation: "Le gel de silice est le support standard de chromatographie normale. Il est très polaire et retient fortement les molécules hydrophiles par liaisons hydrogène."
      },
      {
        question: "Quelle grande propriété physique de la phase mobile (l'éluant) détermine la vitesse relative d'élution des molécules hydrophiles ?",
        options: [
          "La viscosité absolue",
          "La polarité de l'éluant (son pouvoir éluant ou force éluante d'un mélange)",
          "Sa température de congélation",
          "La couleur propre du solvant"
        ],
        correctAnswer: 1,
        explanation: "Plus un éluant est polaire, plus il est capable de déplacer et d'entraîner des composés polaires retenus sur la silice adsorbante."
      },
      {
        question: "Pourquoi est-il obligatoire de saturer l'atmosphère de la cuve en vapeurs d'éluant en fermant hermétiquement le couvercle de verre ?",
        options: [
          "Pour accélérer la gravité terrestre",
          "Pour empêcher l'évaporation locale continue de l'éluant sur la plaque au cours de son ascension, assurant ainsi un front régulier et reproductible",
          "Pour réduire le coût des solvants de 50%",
          "Pour s'épargner d'essuyer la cuve"
        ],
        correctAnswer: 1,
        explanation: "Si la cuve n'est pas fermée, l'éluant s'évapore du support au fur et à mesure de sa montée, ce qui ralentit la migration et fausse la planéité du front."
      },
      {
        question: "Pourquoi la ligne de dépôt au crayon doit-elle impérativement se situer au-dessus du niveau de l'éluant liquide introduit ?",
        options: [
          "Pour ne pas effacer le trait de crayon",
          "Pour empêcher les substances déposées de se dissoudre directement dans le fond de la cuve et de s'y disperser sans migrer sur la plaque",
          "Pour éviter l'éclatement de la plaque",
          "Pour des considérations de tension superficielle magnétique"
        ],
        correctAnswer: 1,
        explanation: "Si le dépôt plonge dans l'éluant, les échantillons s'y dissolvent instantanément et tombent au fond de la cuve. Aucune élution verticale n'est alors possible."
      },
      {
        question: "Par quel phénomène physique l'éluant monte-t-il spontanément le long de la plaque de silice ?",
        options: [
          "Par l'aspiration dynamique",
          "Par capillarité (force d'attraction entre le liquide et les pores microscopiques de la phase stationnaire)",
          "Par gravitation inverse induite",
          "Par effet Venturi moléculaire"
        ],
        correctAnswer: 1,
        explanation: "Le gel de silice est un milieu poreux. Les forces de tension superficielle aspirent le liquide vers le haut dans le lacis des micro-canaux siliceux."
      },
      {
        question: "Pourquoi est-il strictement interdit d'utiliser un stylo à bille ou un feutre coloré pour dessiner la ligne de dépôt ?",
        options: [
          "Car l'encre détruit le gel de silice chimiquement",
          "Les encres de stylos contiennent des pigments et colorants organiques très solubles qui migreraient avec l'éluant, interférant avec l'analyse",
          "Le feutre pèse trop lourd",
          "Pour économiser l'encre"
        ],
        correctAnswer: 1,
        explanation: "L'encre de stylo subirait elle-même une chromatographie parasite. Seul le graphite d'un crayon à papier (carbone inerte insoluble) ne migre pas."
      },
      {
        question: "Quelle est l'expression mathématique exacte permettant de calculer le rapport frontal ($R_f$) d'un spot chromatographié ?",
        options: [
          "$R_f = H_{\\text{front}} + h_{\\text{spot}}$",
          "$R_f = \\frac{h_{\\text{migration du composé}}}{H_{\\text{migration du front de solvant}}}$",
          "$R_f = \\frac{H_{\\text{front de solvant}}}{h_{\\text{migration du composé}}}$",
          "$R_f = d_{\\text{silice}} \\cdot K_d$"
        ],
        correctAnswer: 1,
        explanation: "Le rapport frontal $R_f$ est le rapport adimensionnel de la distance parcourue par le composé sur la distance parcourue par le solvant, mesurées depuis la ligne de dépôt."
      },
      {
        question: "Dans quel intervalle numérique se situe rigoureusement la valeur de tout rapport frontal $R_f$ ?",
        options: [
          "Toujours supérieur à 1.0",
          "Strictement compris entre 0,0 et 1,0 ($0 \\le R_f \\le 1$)",
          "De -1,0 à +1,0",
          "La valeur n'a aucune limite mathématique"
        ],
        correctAnswer: 1,
        explanation: "Un analyte ne peut pas migrer plus vite que la phase mobile eluant elle-même, d'où un rapport maximal de 1,0. Il ne peut pas reculer non plus ($R_f \\ge 0$)."
      },
      {
        question: "Si l'on analyse un composé A polaire et un composé B apolaire sur une plaque de silice classique. Lequel aura le plus grand $R_f$ avec un éluant modérément polaire ?",
        options: [
          "Le composé A polaire car il adhère à l'éluant",
          "Le composé B apolaire car il est moins retenu par la silice polaire et migre plus facilement avec la phase mobile",
          "Les deux auront exactement le même $R_f$",
          "Le composé A migre vers le bas"
        ],
        correctAnswer: 1,
        explanation: "La silice polaire retient fortement les molécules polaires (A) par liaisons hydrogène. Le composé apolaire (B), peu retenu, s'associe à l'éluant et monte vers le haut."
      },
      {
        question: "Comment effectue-t-on la détection des taches formées si les composés analysés sont totalement incolores pour l'œil humain ?",
        options: [
          "En mouillant la plaque à l'eau courante",
          "En procédant à une révélation (exposition à une lampe UV à 254 nm ou pulvérisation d'un réactif chimique chromogène comme le diiode ou le permanganate)",
          "En la plaçant au réfrigérateur",
          "C'est techniquement impossible sans coloration préalable"
        ],
        correctAnswer: 1,
        explanation: "Les inducteurs fluorescents intégrés brillent sous lampe UV : les taches de composés organiques absorbent les UV et apparaissent sombres sur fond vert fluo."
      },
      {
        question: "Comment s'appelle l'effet de voile sombre observé pour des taches absorbant les UV à 254 nm sur plaque fluorescente ?",
        options: [
          "La phosphorescence ionique",
          "L'extinction de fluorescence (les molécules organiques conjuguées bloquent l'excitation de l'indicateur fluorescent de la plaque)",
          "La phosphorescence diffuse",
          "L'activation photochimique"
        ],
        correctAnswer: 1,
        explanation: "La plaque contient du silicate de zinc activé au manganèse qui émet une lueur verte sous UV 254 nm. Les taches aromatiques y font écran et éteignent localement ce signal."
      },
      {
        question: "Quel réactif naturel volatil solide permet de révéler des spots de lipides de façon réversible au laboratoire ?",
        options: [
          "La paraffine fondue",
          "Les vapeurs de diiode solide ($I_{2(g)}$) sublimé qui se dissolvent préférentiellement dans les taches organiques en les colorant en marron-jaune",
          "La chaux liquide",
          "L'acétone glacé"
        ],
        correctAnswer: 1,
        explanation: "Les vapeurs d'iode s'intercalent de façon non covalente et réversible dans les taches hydrophobes de lipides, leur conférant une teinte brune caractéristique."
      },
      {
        question: "Si deux spots de deux échantillons distincts ont le même $R_f$ dans un unique système d'éluant, cela garantit-il obligatoirement qu'ils sont le même corps pur ?",
        options: [
          "Oui, un $R_f$ identique est une preuve absolue d'identité chimique universelle",
          "Non, c'est une forte indication mais fortuite; il faut changer de système d'éluant ou d'analyte pour valider la similitude",
          "Cela dépend du crayon utilisé",
          "Ce résultat est impossible physiquement"
        ],
        correctAnswer: 1,
        explanation: "Plusieurs molécules différentes peuvent coïncider accidentellement sur un $R_f$ avec un solvant. Multiplier les mélanges d'éluant permet de lever le doute."
      },
      {
        question: "Comment appelle-t-on la chromatographie où la phase mobile est polaire (aqueuse) et la phase stationnaire est apolaire (hydrophobe greffée C18) ?",
        options: [
          "La chromatographie d'exclusion stérique",
          "La chromatographie en phase inverse (ou polarité inversée)",
          "La chromatographie ionique gazeuse",
          "La chromatographie chirale sélective"
        ],
        correctAnswer: 1,
        explanation: "Dans le mode 'phase inverse' (RP-CCM), les composés les plus polaires migrent le plus vite car ils ne sont pas retenus par le support carboné apolaire."
      },
      {
        question: "Dans une CCM, le front de solvant migre de 10,0 cm à partir de la ligne de dépôts. Le spot d'aspirine migre de 4,5 cm. Quel est son $R_f$ ?",
        options: [
          "$0,45$",
          "$4,50$",
          "$2,22$",
          "$0,10$"
        ],
        correctAnswer: 0,
        explanation: "$R_f = 4,5 / 10,0 = 0,45$. Ce rapport adimensionnel n'a pas d'unité physique associée."
      },
      {
        question: "Qu'arriverait-il si le front de l'éluant franchissait totalement le bord supérieur de la plaque de silice avant la sortie de cuve ?",
        options: [
          "La plaque s'enflammerait spontanément",
          "Les composés continueraient de s'accumuler au sommet sans qu'on puisse estimer avec certitude la distance reine du front, annulant le calcul du $R_f$",
          "Le calcul du $R_f$ deviendrait supérieur à 2.0",
          "La silice perdrait sa fluorescence"
        ],
        correctAnswer: 1,
        explanation: "Si l'éluant s'épuise ou s'évapore hors du haut de la plaque, les rapports de distance relative sont faussés car le diviseur n'est plus mesurable géométriquement."
      },
      {
        question: "Pourquoi l'utilisation d'une micro-seringue ou d'un capillaire étiré est-elle requise pour effectuer le dépôt d'échantillon ?",
        options: [
          "Pour consommer le moins de produit possible pour des raisons financières",
          "Pour obtenir la tache la plus petite et concentrée possible, empêchant ainsi la diffusion latérale dégradante et la superposition des bandes eluables",
          "C'est la méthode de sécurité réglementaire",
          "Pour accélérer le temps d'attente d'amorçage"
        ],
        correctAnswer: 1,
        explanation: "Un diamètre de dépôt inférieur à 2 mm évite les phénomènes de traînée et permet de distinguer des substances chimiques proches en $R_f$."
      },
      {
        question: "Qu'observe-t-on si le spot de l'échantillon déposé est beaucoup trop concentré en molécules d'intérêt ?",
        options: [
          "Un spot pfaitement carré et brillant",
          "Un phénomène de traînée ('tailing' ou tache en forme d'étoile filante) qui fausse la lecture de la plaque",
          "La décoloration totale de l'échantillon",
          "Une précipitation de calcite sur le support"
        ],
        correctAnswer: 1,
        explanation: "La surcharge de matière dépasse la capacité d'adsorption locale de la silice, entraînant un étalement de la tache (traînée)."
      },
      {
        question: "La température, la saturation de la cuve et le type de silice mis à part, quel paramètre clé définit la sélectivité d'une élution ?",
        options: [
          "La taille du crayon de graphitage",
          "Le choix judicieux de la formule chimique et des proportions volumiques du mèlange d’éluant",
          "Le diamètre exact de la cuve en verre",
          "La tension électrique du laboratoire"
        ],
        correctAnswer: 1,
        explanation: "Ajuster la composition de la phase mobile (ex: mélange polaire/apolaire) permet de moduler les affinités relatives et d'isoler parfaitement les spots proches."
      }
    ]
  },
  {
    id: '11',
    title: 'Saponification — Fabrication d\'un savon',
    description: 'Réaction d\'hydrolyse d\'un ester gras par une base forte pour produire du savon.',
    image: 'https://images.unsplash.com/photo-1605264964528-06403738d6dc?q=80&w=1974&auto=format&fit=crop',
    category: 'Chimie organique',
    level: 'Tronc Commun',
    difficulty: 'Débutant',
    duration: '2h',
    setupImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Reflux_condenser_setup.svg/512px-Reflux_condenser_setup.svg.png',
    videoUrl: 'https://www.youtube.com/embed/KQv_5S84EdM',
    materials: ['Ballon de 250 mL', 'Réfrigérant à reflux', 'Bécher'],
    chemicals: ['Huile végétale', 'Hydroxyde de sodium concentrée', 'Éthanol', 'Solution de NaCl saturée'],
    protocol: [
      'Préparation : Dans un ballon de 250 mL, introduire 20 mL de l\'huile végétale choisie (ex: olive) et 20 mL d\'éthanol.',
      'Action de la base : Ajouter prudemment 20 mL d\'une solution concentrée de soude (NaOH) à 10 mol/L.',
      'Catalyse/Solvant : L\'éthanol sert ici à solubiliser à la fois l\'huile et la soude pour permettre leur contact.',
      'Montage : Adapter un réfrigérant à reflux vertical sur le ballon.',
      'Chauffage : Chauffer le mélange à reflux pendant 30 à 45 minutes. Le mélange doit devenir homogène et changer de consistance.',
      'Test de fin : La réaction est finie quand une goutte du mélange se dissout totalement dans l\'eau (plus de gouttelettes d\'huile).',
      'Relargage : Verser le mélange encore chaud dans un grand bécher contenant 200 mL d\'eau très salée (NaCl saturé).',
      'Précipitation : Le savon, insoluble dans l\'eau salée, précipite et forme une masse solide blanche qui surnage.',
      'Filtration : Filtrer le savon sur un filtre ou une toile, puis le rincer abondamment à l\'eau froide pour éliminer l\'excès de soude.',
      'Séchage : Placer le savon dans un moule et le laisser sécher plusieurs jours à l\'air libre.'
    ],
    hazards: ['La soude concentrée est extrêmement corrosive et peut causer la cécité', 'L\'éthanol est très inflammable'],
    precautions: ['Port obligatoire de lunettes de protection et de gants', 'Manipulation sous hotte si possible', 'Ne jamais toucher le savon brut avant rinçage total (pH très basique)'],
    quiz: [
      {
        question: "Quelle est la définition chimique exacte de la réaction de saponification d'un corps gras ?",
        options: [
          "L'hydrolyse acide réversible d'un ester",
          "L'hydrolyse basique (par une base forte comme NaOH ou KOH) d'un ester à longue chaîne (triglycéride), produisant des ions carboxylates et du glycérol",
          "La déshydratation catalysée d'un alcool",
          "L'oxydation ménagée des phénols"
        ],
        correctAnswer: 1,
        explanation: "La saponification est l'hydrolyse basique à chaud d'un triester de glycérol (corps gras) produisant le savon (carboxylates de sodium) et du propane-1,2,3-triol (glycérol)."
      },
      {
        question: "Quel co-produit alcoolique hydrosoluble est systématiquement libéré lors de la saponification des huiles végétales ?",
        options: [
          "L'éthanol pur",
          "Le glycérol (ou propane-1,2,3-triol)",
          "Le méthanol toxique",
          "Le menthol"
        ],
        correctAnswer: 1,
        explanation: "Chaque molécule de triglycéride saponifiée fournit une molécule de glycérol ainsi que trois molécules de sel d'acide gras (savon)."
      },
      {
        question: "Quelles sont les deux caractéristiques thermodynamiques majeures qui distinguent la saponification de l'hydrolyse d'un ester en milieu acide ?",
        options: [
          "Elle est lente et équilibrée",
          "Elle est rapide à chaud, totale et irréversible",
          "Elle est infiniment lente et athermique",
          "Elle requiert un laser de forte puissance"
        ],
        correctAnswer: 1,
        explanation: "La saponification est totale et irréversible car la réaction d'acide-base finale entre l'acide carboxylique formé et l'ion $OH^-$ est extrêmement favorisée, empêchant le retour en arrière."
      },
      {
        question: "Quel rôle physique joue l'éthanol ajouté au mélange d'huile végétale et de solution aqueuse de soude au départ ?",
        options: [
          "Il joue le rôle de catalyseur enzymatique",
          "C'est un solvant mutuel (médium de transfert) favorisant l'homogénéisation des deux phases incompatibles (huile hydrophobe et soude hydrophile)",
          "Il abaisse le pH à 7.0",
          "Il sert d'aromate odorant"
        ],
        correctAnswer: 1,
        explanation: "L'huile et l'eau salée de la soude ne se mélangent pas. L'éthanol, miscible aux deux, met les réactifs en contact intime pour accélérer considérablement la cinétique."
      },
      {
        question: "Pourquoi est-il crucial d'adapter un réfrigérant à reflux vertical sur notre ballon lors de la saponification à chaud ?",
        options: [
          "Pour purifier l'éthanol par distillation sélective",
          "Pour chauffer à haute température sans perte d'éluant ou d'éthanol volatil par évaporation hors du milieu",
          "Pour abaisser la pression interne du ballon",
          "Pour réduire le volume du savon"
        ],
        correctAnswer: 1,
        explanation: "Le reflux ramène les vapeurs d'éthanol et d'eau sous forme liquide dans le ballon, prévenant la désiccation ou l'assèchement du mélange pendant les 45 minutes de chauffe."
      },
      {
        question: "En quoi consiste l'étape capitale appelée le \"relargage\" du savon en fin de chauffage ?",
        options: [
          "Verser le savon dans de l'acide chlorhydrique pur",
          "Verser le mélange réactionnel contenant le savon libre dans une solution très concentrée en eau salée (NaCl saturé)",
          "Chauffer le produit à sec avec de la pierre ponce",
          "En l'extraction par solvant polaire apolaire"
        ],
        correctAnswer: 1,
        explanation: "Le relargage permet la séparation physique du savon solide. Ce dernier est mis à profit par sa différence drastique de solubilité."
      },
      {
        question: "Pourquoi le savon de sodium précipite-t-il sous forme solide blanche lors du relargage dans l'eau très salée ?",
        options: [
          "Parce que la liaison NaCl détruit l'éthanol par substitution nucléophile",
          "La solubilité des carboxylates de sodium s'effondre en présence d'une haute concentration en ions sodium $Na^+$ (effet d'ion commun) et dans les milieux de forte force ionique",
          "Le sel de table refroidit brusquement le bécher",
          "Parce que le sel réagit chimiquement pour former du chlore"
        ],
        correctAnswer: 1,
        explanation: "En combinant une forte force ionique et l'apport d'ions $Na^+$, l'équilibre de solubilité $R-COONa_{(s)} \\rightleftharpoons R-COO^- + Na^+$ est fortement déplacé vers la droite, provoquant la précipitation."
      },
      {
        question: "Sur le plan structural, de quoi est constitué l'ion carboxylate hydrophile hydrophobe actif du savon ?",
        options: [
          "D'une double hélice de silicium",
          "D'une tête polaire carboxylate hydrophile (qui aime l'eau) et d'une longue queue alkyle hydrocarbonée apolaire hydrophobe (lipophile, qui attrape le gras)",
          "D'une chaîne carbonée cyclique uniquement polaire",
          "De deux noyaux benzéniques chlorés"
        ],
        correctAnswer: 1,
        explanation: "Le pouvoir tensioactif du savon provient de sa nature amphiphile : sa queue lipophile s'insère dans la graisse tandis que sa tête hydrophile se tourne vers l'eau de lavage."
      },
      {
        question: "Quel terme scientifique générique qualifie une telle structure moléculaire bifonctionnelle ?",
        options: [
          "Un composé chiral amorphe",
          "Un tensioactif amphiphile (ou amphipatique)",
          "Un hydrocarbure saturé linéaire",
          "Un solvant protique polaire"
        ],
        correctAnswer: 1,
        explanation: "Une molécule amphiphile comporte à la fois des groupements d'atomes hydrophiles polaires (solubles dans l'eau) et lipophiles apolaires (solubles dans les huiles)."
      },
      {
        question: "Comment nomme-t-on les structures sphériques microscopiques que forment spontanément les ions du savon dans l'eau pour séquestrer les salissures ?",
        options: [
          "Des liposomes bicouches",
          "Des micelles (les queues apolaires à l'intérieur emprisonnant le gras, les têtes polaires à l'extérieur en contact visuel direct avec l'eau)",
          "Des cristaux de calcite",
          "Des gouttelettes de condensation"
        ],
        correctAnswer: 1,
        explanation: "Les micelles enveloppent la saleté hydrophobe (graisse, sébum) et l'isolent sous forme d'une micro-émulsion emportée lors du rinçage à l'eau."
      },
      {
        question: "Qu'entend-on par \"pouvoir émulsionnant\" ou \"émulsifiant\" d'un savon ?",
        options: [
          "Son aptitude à figer l'eau pure sous forme de gel solide",
          "Sa capacité à disperser de fines gouttelettes d'une phase huileuse hydrophobe dans une phase aqueuse continue de façon stable",
          "Sa capacité à dissoudre le verre de la vaisselle",
          "Son effet régulateur de température froide"
        ],
        correctAnswer: 1,
        explanation: "Le savon diminue la tension superficielle de l'eau, lui permettant de mouiller les surfaces graisseuses et de fragmenter les graisses en micro-gouttes émulsionnées stables."
      },
      {
        question: "La saponification d'une mole de trioléine (triglycéride de l'huile d'olive) nécessite au minimum combien de moles de soude (NaOH) ?",
        options: [
          "1 mole",
          "3 moles (une mole de soude par liaison ester du triester)",
          "2 moles",
          "6 moles"
        ],
        correctAnswer: 1,
        explanation: "La trioléine possède trois liaisons ester à hydrolyser. Il faut donc trois ions $OH^-$ pour transformer complètement une mole de triglycéride en une mole de glycérol et trois moles de savon."
      },
      {
        question: "Si l'on remplace l'hydroxyde de sodium (soude, NaOH) par de l'hydroxyde de potassium (potasse, KOH), quelle différence physique aura le savon solide ?",
        options: [
          "Il sera noir fluoré",
          "Les savons de potassium sont mous ou liquides (comme le savon noir), alors que les savons de sodium sont durs et solides",
          "Le savon perdra toute capacité moussante",
          "Le savon sera hautement toxique pour la peau"
        ],
        correctAnswer: 1,
        explanation: "Les cations $K^+$ sont plus volumineux et s'hydratent différemment, limitant l'ordonnancement cristallin dense rencontré avec le cation sodique $Na^+$, d'où une pâte plus fluide."
      },
      {
        question: "Pourquoi est-il exigé de laver abondamment le savon solide brut isolé au Büchner avec de l'eau glacée ?",
        options: [
          "Pour solidifier le glycérol",
          "Pour dissoudre et éliminer l'excès d'hydroxyde de sodium (soude) corrosif emprisonné superfluement dans le gâteau de cristaux sans redissoudre le savon",
          "Pour refroidir la canalisation d'évacuation de la pompe à eau",
          "Pour réduire la déshydratation organique"
        ],
        correctAnswer: 1,
        explanation: "Le savon fabriqué est fortement basique à cause de la soude n'ayant pas réagi. On le lave à l'eau glacée (où sa solubilité est minime) pour s'en débarrasser sans pertes."
      },
      {
        question: "Qu'est-ce que l'indice de saponification d'une matière grasse ?",
        options: [
          "La température exacte de fusion du savon obtenu",
          "La masse en milligrammes de potasse (KOH) requise pour neutraliser les acides gras libres et saponifier 1,0 gramme de cette matière grasse",
          "Le volume total d'éthanol à introduire",
          "Le pourcentage de glycérol récupéré en fin de TP"
        ],
        correctAnswer: 1,
        explanation: "L'indice de saponification (IS) renseigne sur la masse molaire moyenne des acides gras constituant un triglycéride. Plus les chaînes sont courtes, plus l'indice est grand."
      },
      {
        question: "Comment se comporte une solution de savon aqueuse si l'on ajoute un grand excès d'acide chlorhydrique concentré ?",
        options: [
          "Elle mousse encore plus vigoureusement",
          "Les ions carboxylates du savon se reprotonent en acides gras à longue chaîne insolubles, formant un précipité huileux ou solide cireux insoluble perdant tout pouvoir lavant",
          "Elle explose en libérant du chlore gazeux",
          "Il n'y a aucun changement chimique observable"
        ],
        correctAnswer: 1,
        explanation: "Les acides carboxyliques à longue chaîne ($R-COOH$) sont très faibles. En milieu acide fort, ils reprennent leur proton : $R-COO^- + H^+ \\rightarrow R-COOH_{(s)}$ (acide gras libre insoluble)."
      },
      {
        question: "Pourquoi le savon ordinaire est-il inadapté à un lavage minutieux dans de l'eau de mer riche en ions calcium et magnésium ?",
        options: [
          "L'eau salée empêche l'eau de mouiller le savon",
          "Les ions calcium et magnésium précipitent les sels d'acides gras du savon sous forme de carboxylates de calcium insolubles et collants (tartre de savon), annulant l'effet tensioactif",
          "L'eau de mer évapore le savon",
          "Les bulles de savon de mer sont toxiques"
        ],
        correctAnswer: 1,
        explanation: "Les ions divalents précipitent le savon. Dans ces eaux dites dures, on privilégie l'utilisation de détergents synthétiques (sulfonates) dont les sels de calcium restent solubles."
      },
      {
        question: "Quel rôle thermodynamique ou mécanique joue l'introduction de quelques morceaux de pierre ponce dans le ballon avant la chauffe ?",
        options: [
          "De catalyser l'hydrolyse par ses pores de silice",
          "Réguler l'ébullition en évitant les surchauffes locales brusques et en favorisant la formation de bulles régulières pour homogénéiser la température du liquide",
          "De colorer le savon en gris clair poli",
          "D'absorber l'excès de soude toxique"
        ],
        correctAnswer: 1,
        explanation: "La pierre ponce emprisonne des micro-bulles d'air qui servent de sites de nucléation pour la vapeur, assurant une ébullition douce et sécurisante."
      },
      {
        question: "Pourquoi les savons artisanaux fabriqués par saponification à froid doivent-ils subir une \"cure\" de séchage de plusieurs semaines avant utilisation ?",
        options: [
          "Pour éliminer l'excès de glycérol volatil",
          "Pour permettre l'achèvement complet de la réaction chimique de saponification lente et l'évaporation de l'eau libre interne, garantissant un pain sec de pH neutre acceptable",
          "Pour que le parfum s'active par la lumière du soleil",
          "C'est une étape requise pour solidifier le sodium"
        ],
        correctAnswer: 1,
        explanation: "La réaction se poursuit doucement à température ambiante sur 4 à 6 semaines, évitant ainsi d'avoir de l'hydroxyde de sodium agressif non-combiné sous la douche."
      },
      {
        question: "Quel test pH simple permet de s'assurer qualitativement qu'un savon ne présente pas de soude résiduelle corrosive dangereuse ?",
        options: [
          "Le test à la phénolphtaléine en solution alcoolique (si la solution vire au rose vif intense, le savon est trop basique et impropre; elle doit rester incolore ou rose pâle)",
          "Mesurer la conductivité thermique directe",
          "Le test de précipitation par des ions chlorure",
          "Le test de sublimation sous UV à 365 nm"
        ],
        correctAnswer: 0,
        explanation: "La phénolphtaléine vire au rouge-violet au-delà de pH 8,2 - 10. Un savon trop alcalin (pH > 11) doit être retravaillé ou relavé car il abîmerait le film hydrolipidique de l'épiderme."
      }
    ]
  },
  {
    id: '12',
    title: 'Conductimétrie — Dosage par étalonnage',
    description: 'Mesure de la conductivité pour déterminer une concentration inconnue.',
    image: '/src/assets/images/conductimetry_calibration_setup_1781529208892.jpg',
    category: 'Chimie physique',
    level: '2ème Bac',
    difficulty: 'Intermédiaire',
    duration: '2h',
    setupImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Conductivity_meter_setup.png/320px-Conductivity_meter_setup.png',
    materials: ['Sonde de conductivité', 'Conductimètre', 'Béchers'],
    chemicals: ['Solutions étalons de KCl', 'Échantillon inconnu'],
    protocol: [
      'Préparation de la solution mère : Préparer 100 mL d\'une solution de NaCl à 0,1 mol/L.',
      'Gamme d\'étalonnage : Réaliser par dilutions successives une série de 5 solutions de concentrations connues (0,01 à 0,08 mol/L).',
      'Nettoyage : Rincer soigneusement la cellule conductimétrique avec de l\'eau distillée.',
      'Étalonnage : Vérifier le conductimètre avec une solution étalon de KCl dont la conductivité est connue.',
      'Mesures de la gamme : Plonger la cellule dans chaque solution de la gamme, agiter doucement, et noter la valeur stabilisée de la conductivité (Sigma).',
      'Précautions de mesure : Veiller à ce que la cellule soit totalement immergée et à distance des parois du bécher.',
      'Nettoyage intermédiaire : Rincer la cellule à l\'eau distillée entre chaque solution pour éviter les contaminations.',
      'Mesure de l\'inconnu : Mesurer la conductivité de la solution X de concentration inconnue.',
      'Modélisation : Tracer la courbe Sigma = f(C) sur papier ou tableur. On doit obtenir une droite passant par l\'origine.',
      'Détermination : Lire la concentration Cx de l\'échantillon à partir de la droite de régression.'
    ],
    hazards: ['Faible risque chimique avec le sel de table (NaCl)', 'Fragilité de la cellule conductimétrique'],
    precautions: ['Rincer abondamment la cellule après usage', 'Éviter les chocs sur les plaques de platine de la sonde', 'Travailler à température constante car la conductivité varie avec la chaleur'],
    quiz: [
      {
        question: "Quelle est la définition de la conductivité électrique σ d'une solution aqueuse ?",
        options: [
          "La capacité de la solution à bloquer le courant alternatif",
          "La grandeur mesurant l'aptitude de la solution à conduire le courant électrique, proportionnelle au déplacement des ions en solution",
          "La différence de potentiel aux bornes des électrodes",
          "La quantité d'eau évaporée par seconde"
        ],
        correctAnswer: 1,
        explanation: "La conductivité σ caractérise la capacité d'un milieu liquide à laisser circuler les charges électriques sous l'influence d'un champ électrique spontané ou imposé."
      },
      {
        question: "Quelle relation mathématique générale relie la conductance G d'une solution à sa conductivité σ ?",
        options: [
          "G = σ × V",
          "G = σ × (S / L) où S est la surface des électrodes et L la distance les séparant",
          "G = σ × (L / S)",
          "G = σ² / R"
        ],
        correctAnswer: 1,
        explanation: "La conductance G d'une cellule de conductimétrie est proportionnelle à la conductivité σ de la solution, à la surface S des électrodes et inversement proportionnelle à leur écartement L."
      },
      {
        question: "Quelle loi fondamentale stipule que la conductivité d'une solution diluée est la somme des contributions conductrices individuelles de chaque ion ?",
        options: [
          "La loi d'Avogadro",
          "La loi de Kohlrausch : σ = Σ (λ_i × C_i)",
          "La loi de Nernst",
          "La loi de Beer-Lambert"
        ],
        correctAnswer: 1,
        explanation: "La loi de Kohlrausch stipule que pour les solutions d'électrolytes diluées, la conductivité est directement proportionnelle à la somme du produit de la conductivité molaire ionique λ_i par la concentration molaire C_i de chaque ion présent."
      },
      {
        question: "Quelle est l'unité de la conductivité σ dans le Système International d'unités ?",
        options: [
          "Le Ohm par mètre (Ω/m)",
          "Le Siemens par mètre (S/m) ou typiquement exprimé en milliSiemens par centimètre (mS/cm) au laboratoire",
          "Le Volt par Ampère (V/A)",
          "Le Farad par mètre (F/m)"
        ],
        correctAnswer: 1,
        explanation: "Dans le SI, le Siemens (S) est l'unité de conductance (1/Ω). La conductivité s'exprime donc en Siemens par mètre (S/m). Au laboratoire, on manipule souvent les mS/cm ou µS/cm."
      },
      {
        question: "Que représente le terme \"constante de cellule\" k (parfois noté K_c) d'une sonde de conductimétrie ?",
        options: [
          "Le rapport caractéristique entre la distance L et la surface S des plaques (k = L / S) ou son rapport inverse selon le raccordement du conductimètre",
          "La température de fusion des sondes de platine",
          "Le nombre total d'ions adsorbés sur la sonde",
          "La vitesse d'agitation de la solution stabilisée"
        ],
        correctAnswer: 0,
        explanation: "La constante de cellule k = L / S (exprimée en m⁻¹ ou cm⁻¹) fait le pont entre la conductance macroscopique physique brute mesurée G et la conductivité intrinsèque σ par la relation G = σ / k ou σ = k × G selon la convention."
      },
      {
        question: "Pourquoi les ions oxonium H₃O⁺ et hydroxyde OH⁻ possèdent-ils des conductivités molaires ioniques extrêmement élevées par rapport aux autres ions monoatomiques ?",
        options: [
          "Ils ont une masse molaire très élevée",
          "Ils se déplacent par un mécanisme de saut de protons ultra-rapide d'une molécule d'eau à l'autre (mécanisme de Grotthuss) sans transfert physique direct de l'atome entier à travers le solvant",
          "Leur charge électrique est supérieure à +3",
          "Ils n'interagissent pas avec les autres ions de la solution"
        ],
        correctAnswer: 1,
        explanation: "Le mécanisme de Grotthuss permet aux charges positives (H₃O⁺) et négatives (OH⁻) de se propager virtuellement par des réarrangements de liaisons hydrogène successives, rendant leur conduction 3 à 5 fois plus rapide que celle des autres ions."
      },
      {
        question: "Quelle est l'influence d'une augmentation de la température sur la conductivité d'une solution aqueuse ?",
        options: [
          "Elle diminue car la solubilité des ions s'effondre",
          "Elle augmente d'environ 2% par degré Celsius, car la viscosité du solvant baisse, ce qui accroît la mobilité cinétique des ions",
          "Elle reste rigoureusement constante",
          "Elle oscille de façon aléatoire"
        ],
        correctAnswer: 1,
        explanation: "Une température supérieure fluidifie l'eau en diminuant sa viscosité, ce qui facilite les mouvements migrateurs des ions et augmente ainsi la conductivité. C'est pourquoi la température doit être stabilisée ou compensée."
      },
      {
        question: "Pourquoi utilise-t-on impérativement un courant alternatif haute fréquence ou moyenne fréquence plutôt qu'un courant continu pour mesurer la conductance d'une solution ?",
        options: [
          "Pour réduire la facture d'électricité",
          "Pour éviter la polarisation des électrodes et les réactions chimiques d'électrolyse aux surfaces des plaques de platine, qui modifieraient la composition locale",
          "Parce que les ions ne bougent qu'en courant alternatif",
          "Pour chauffer la solution lors de la mesure"
        ],
        correctAnswer: 1,
        explanation: "En courant continu, des phénomènes d'oxydoréduction (électrolyse) se produiraient aux plaques, créant une surtension de polarisation et détériorant les réactifs. L'alternance rapide annule continuellement ces micro-effets."
      },
      {
        question: "Pourquoi la loi de Kohlrausch n'est-elle plus vérifiée pour des concentrations solides d'électrolyte supérieures à 0,1 mol/L ?",
        options: [
          "Les ions se consument complètement",
          "Les interactions électrostatiques inter-ioniques ne sont plus négligeables (effet de freinage asymétrique et d'atmosphère de relaxation) réduisant la mobilité effective des ions",
          "La sonde sature et s'éteint automatiquement",
          "Le solvant s'évapore de façon instantanée"
        ],
        correctAnswer: 1,
        explanation: "Dans une solution trop concentrée, la proximité des charges crée une attraction mutuelle (atmosphère ionique négative entourant chaque cation et vice-versa) qui retarde leur migration sous champ électrique."
      },
      {
        question: "Si l'on dilue une solution aqueuse de chlorure de sodium (NaCl) d'un facteur 10 précis, que devient sa conductivité σ ?",
        options: [
          "Elle est multipliée par 10",
          "Elle est divisée par 10 (dans la limite des faibles concentrations)",
          "Elle reste strictement identique",
          "Elle tombe instantanément à zéro"
        ],
        correctAnswer: 1,
        explanation: "À faible concentration, la conductivité σ est proportionnelle à la concentration (§ de Kohlrausch). Une dilution par 10 divise les concentrations ioniques par 10, divisant la conductivité globale par 10."
      },
      {
        question: "Qu'entend-on par \"conductivité molaire d'un électrolyte\" Λ ?",
        options: [
          "La conductivité totale de la cellule multipliée par la masse volumique du platine",
          "Le rapport de la conductivité de la solution sur la concentration molaire de l'électrolyte (Λ = σ / C)",
          "La température d'ébullition d'une mole de sel",
          "La solubilité maximale d'une mole d'électrolyte par litre"
        ],
        correctAnswer: 1,
        explanation: "La conductivité molaire Λ exprime le pouvoir conducteur des ions générés par l'apport d'une mole de soluté (C). Elle s'exprime couramment en S.m².mol⁻¹."
      },
      {
        question: "Pourquoi la courbe d'étalonnage σ = f(C) tracée dans ce TP doit-elle être une droite passant par l'origine ?",
        options: [
          "Parce que la loi de Beer-Lambert l'exige pour le sel",
          "À faible concentration, les interactions inter-ioniques sont négligeables, faisant de la conductivité une fonction strictement linéaire de la concentration molaire en ions (Loi de Kohlrausch)",
          "Car on utilise des béchers cylindriques",
          "C'est un artefact dû au type de papier millimétré utilisé"
        ],
        correctAnswer: 1,
        explanation: "La linéarité est la conséquence directe de la loi de Kohlrausch pour les faibles concentrations : σ = k × C, où k regroupe les conductivités molaires ioniques λ."
      },
      {
        question: "Pourquoi l'eau distillée du laboratoire possède-t-elle toujours une conductivité mesurable non nulle (aux alentours de 1 à 5 µS/cm) ?",
        options: [
          "Elle contient du glucose",
          "À cause de l'auto-protolyse de l'eau résiduelle et de la dissolution spontanée du dioxyde de carbone ($CO_2$) de l'air formant des ions hydrogénocarbonate ($HCO_3^-$) et oxonium ($H_3O^+$)",
          "Car elle est contaminée par le plastique du bidon",
          "C'est une erreur systématique du conductimètre"
        ],
        correctAnswer: 1,
        explanation: "Le CO₂ ambiant se dissout dans l'eau pure pour donner de l'acide carbonique qui s'ionise partiellement en $H_3O^+$ et $HCO_3^-$. Cela suffit à conférer à l'eau de laboratoire sa conductivité de fond."
      },
      {
        question: "Parmi les ions suivants à concentration molaire équivalente, lequel confère la plus faible conductivité à une solution ?",
        options: [
          "L'ion oxonium $H_3O^+$",
          "L'ion potassium $K^+$",
          "Un gros ion organique volumineux et lourd faiblement hydraté, comme l'ion tétrabutylammonium",
          "L'ion chlorure $Cl^-$"
        ],
        correctAnswer: 2,
        explanation: "La conductivité d'un ion dépend de sa taille hydrodynamique et de sa capacité à migrer vite. Un gros ion volumineux subit des frottements visqueux intenses de la part du solvant, limitant sa vitesse de migration."
      },
      {
        question: "Quelle espèce chimique parmi celles-ci n'apporte aucune contribution à la conductivité d'une solution aqueuse ?",
        options: [
          "L'hydroxyde de sodium ($NaOH$)",
          "Le saccharose (sucre de table, $C_{12}H_{22}O_{11}$)",
          "Le chlorure de sodium ($NaCl$)",
          "L'acide chlorhydrique ($HCl$)"
        ],
        correctAnswer: 1,
        explanation: "Le saccharose est une molécule organique neutre qui se dissout de façon moléculaire sans se dissocier en ions. Ne portant aucune charge électrique, son déplacement ne transporte pas de courant."
      },
      {
        question: "Pour doser efficacement une solution inconnue de NaCl par étalonnage conductimétrique, de quoi doit impérativement être composée la gamme de solutions d'étalonnage ?",
        options: [
          "De solutions de sulfate de cuivre",
          "De solutions connues de chlorure de sodium (NaCl) diluées de façon précise, afin de comparer des ions de même nature",
          "De solutions tampon de pH variées",
          "D'alcool éthylique à différentes concentrations"
        ],
        correctAnswer: 1,
        explanation: "Chaque ion possède sa conductivité molaire ionique propre. Pour faire un dosage comparatif d'une solution de NaCl inconnue, la gamme d'étalonnage doit reproduire les mêmes espèces ioniques ($Na^+$ et $Cl^-$)."
      },
      {
        question: "À concentration et température égales, pourquoi une solution de KCl a-t-elle une conductivité légèrement supérieure à une solution de NaCl ?",
        options: [
          "L'ion potassium pèse plus lourd que l'ion sodium",
          "L'ion potassium ($K^+$), bien que plus gros dans l'ordre atomique, est moins hydraté en solution que l'ion sodium ($Na^+$), ce qui réduit sa sphère d'hydratation et augmente sa mobilité réelle",
          "Parce que le potassium est radioactif",
          "C'est un effet dû à l'abrasion des électrodes"
        ],
        correctAnswer: 1,
        explanation: "Le sodium plus petit possède un champ électrique de surface plus dense qui attire plus de molécules d'eau d'hydratation (couche d'hydratation plus épaisse). Son rayon hydrodynamique réel est donc plus grand que celui du potassium."
      },
      {
        question: "Pourquoi recommande-t-on d'agiter modérément la solution avant chaque relevé de conductivité au laboratoire ?",
        options: [
          "Pour augmenter la température",
          "Pour homogénéiser la concentration ionique au sein de la solution et éviter la formation de zones de polarisation ou de gradients au contact immédiat de la sonde",
          "Pour créer de la mousse",
          "Pour détruire les liaisons covalentes"
        ],
        correctAnswer: 1,
        explanation: "L'agitation rompt les gradients locaux et assure que le fluide entre les électrodes est rigoureusement identique au reste de la solution."
      },
      {
        question: "Si la conductivité de la solution inconnue X dépasse largement la valeur la plus haute de votre courbe d'étalonnage, quelle opération devez-vous faire ?",
        options: [
          "Raccourcir les câbles de mesure du conductimètre",
          "Diluer précisément d'un facteur connu F la solution inconnue X pour replacer sa conductivité au milieu de la gamme linéaire, puis interpoler et multiplier par F",
          "Aucune opération, les valeurs de conductivité restent valables et linéaires à forte concentration",
          "Chauffer l'échantillon à ébullition"
        ],
        correctAnswer: 1,
        explanation: "Sortir de la zone étalonnée ou s'aventurer dans des concentrations fortes brise la linéarité de Kohlrausch. On dilue l'inconnu d'un facteur connu pour faire une lecture dans la zone linéaire."
      },
      {
        question: "Quel métal inerte inattaquable constitue la surface active des plaques de mesure des sondes conductimétriques de laboratoire ?",
        options: [
          "Le cuivre oxydé rutilant",
          "Le platine (plaqué ou recouvert de noir de platine poreux pour augmenter la surface active)",
          "Le zinc métallique fragile",
          "Le fer doux"
        ],
        correctAnswer: 1,
        explanation: "Le platine platiné offre une surface rugueuse très élevée qui minimise les effets de capacité de double couche et de polarisation à l'interface métal-électrolyte."
      }
    ]
  },
  {
    id: '13',
    title: 'Les Piles Électrochimiques',
    description: 'Étude d\'une pile Daniell et de sa force électromotrice.',
    image: '/src/assets/images/daniell_cell_electrochemistry_1781529415505.jpg',
    category: 'Chimie physique',
    level: '2ème Bac',
    difficulty: 'Intermédiaire',
    duration: '2h',
    setupImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Daniell_cell.svg/512px-Daniell_cell.svg.png',
    videoUrl: 'https://www.youtube.com/embed/RorV-Qk6Olg',
    materials: ['Lame de zinc', 'Lame de cuivre', 'Béchers de 100 mL', 'Voltmètre', 'Fils de connexion'],
    chemicals: ['Solution de sulfate de zinc (ZnSO4) à 0,1 mol/L', 'Solution de sulfate de cuivre (CuSO4) à 0,1 mol/L', 'Solution saturée de nitrate de potassium (KNO3) pour le pont salin'],
    protocol: [
      'Préparation du premier compartiment : Verser lentement 50 mL de solution de sulfate de zinc (ZnSO4) à 0,1 mol/L dans un premier bécher de 100 mL.',
      'Préparation du second compartiment : Verser 50 mL de solution de sulfate de cuivre (II) (CuSO4) à 0,1 mol/L dans un second bécher identique.',
      'Mise en place des électrodes : Plonger la lame de zinc dans la solution de ZnSO4 et la lame de cuivre dans la solution de CuSO4.',
      'Préparation du pont salin : Imprégner une bande de papier filtre d\'une solution saturée de nitrate de potassium (KNO3) ou utiliser un pont en tube de verre.',
      'Liaison ionique : Relier les deux béchers en installant le pont salin, en veillant à ce que les deux extrémités trempent bien dans les solutions.',
      'Mesure de la f.e.m. : Relier la borne COM d\'un voltmètre à l\'électrode de zinc (anode) et la borne V à l\'électrode de cuivre (cathode).',
      'Relevé de mesure : Noter la valeur de la tension à vide (force électromotrice) affichée sur le voltmètre.',
      'Polarité : Vérifier que la tension est positive (si négative, inverser les branchements).',
      'Analyse : Observer l\'évolution possible de la tension au cours du temps et interpréter les réactions aux électrodes.'
    ],
    hazards: ['Solutions d\'ions métalliques irritantes', 'Toxique pour l\'environnement aquatique', 'Le nitrate de potassium est un comburant'],
    precautions: ['Ne pas jeter les solutions à l\'évier (utiliser les bacs de récupération)', 'Éviter tout contact cutané', 'Rincer les lames après usage'],
    quiz: [
      {
        question: "Dans une pile Daniell Zn/Cu, quel est le rôle électrochimique fondamental joué par le pont salin ?",
        options: [
          "Permettre le passage exclusif des électrons libres d'un bécher à l'autre",
          "Fermer le circuit électrique en assurant la conduction ionique et maintenir la neutralité électrique des deux compartiments sans mélanger les solutions",
          "Catalyser l'oxydation des ions cuivre en cuivre solide",
          "Fournir de l'énergie thermique complémentaire"
        ],
        correctAnswer: 1,
        explanation: "Le pont salin contient un électrolyte inerte (comme KNO₃). Il sert à fermer le circuit électrique en permettant la migration des ions, maintenant ainsi la neutralité des demi-piles."
      },
      {
        question: "Quel phénomène chimique se déroule systématiquement et de façon exclusive à l'anode d'une pile en fonctionnement ?",
        options: [
          "Une déshydratation catalysée",
          "Une oxydation (perte d'électrons par le réducteur)",
          "Une réduction (gain d'électrons par l'oxydant)",
          "Une précipitation d'hydroxydes"
        ],
        correctAnswer: 1,
        explanation: "L'anode est le siège de la réaction d'oxydation. Dans une pile Daniell, c'est la lame de zinc qui s'oxyde : $Zn_{(s)} \\rightarrow Zn^{2+}_{(aq)} + 2e^-$."
      },
      {
        question: "Quel type de réaction se déroule à la cathode d'une pile électrochimique ?",
        options: [
          "Une substitution nucléophile",
          "Une réduction (gain d'électrons par l'oxydant)",
          "Une oxydation thermique",
          "Une élimination d'atomes"
        ],
        correctAnswer: 1,
        explanation: "La cathode est l'électrode où se produit la réduction. Dans la pile Daniell, les ions cuivre (II) captent des électrons pour se réduire : $Cu^{2+}_{(aq)} + 2e^- \\rightarrow Cu_{(s)}$."
      },
      {
        question: "Quel est le signe de la variation d'enthalpie libre $\\Delta_r G$ associée à la réaction d'oxydoréduction globale au sein d'une pile active débitant du courant ?",
        options: [
          "Strictement positif ($\\Delta_r G > 0$)",
          "Strictement négatif ($\\Delta_r G < 0$) traduisant le caractère thermodynamiquement spontané de la réaction",
          "Régulièrement nul",
          "Infini"
        ],
        correctAnswer: 1,
        explanation: "Pour tout système siège d'une transformation spontanée à température et pression constantes, l'enthalpie libre de réaction doit diminuer, donc $\\Delta_r G = -nFE < 0$."
      },
      {
        question: "Quel est le processus microscopique précis se déroulant à la surface de l'électrode de cuivre ?",
        options: [
          "La lame de cuivre se dissout sous forme d'ions complexes bleus",
          "Les ions $Cu^{2+}$ solvatés de la solution captent les électrons de la lame et se déposent sous forme de cuivre métallique $Cu_{(s)}$ sur l'électrode",
          "Du gaz hydrogène se dégage",
          "Le cuivre réagit avec l'éthanol"
        ],
        correctAnswer: 1,
        explanation: "La réduction $Cu^{2+} + 2e^- \\rightarrow Cu_{(s)}$ conduit au dépôt cristallin d'un voile rose-orangé de cuivre pur métallique sur la lame."
      },
      {
        question: "Pourquoi élimine-t-on la couche d'oxyde des électrodes à l'aide de papier abrasif avant le TP ?",
        options: [
          "Pour réduire le poids des plaques",
          "Pour enlever la couche d'oxyde superficielle isolante et passivante qui ferait barrière au transfert d'électrons entre le métal et la solution",
          "Pour changer l'allotropie cristalline",
          "Pour faire briller le métal sous la caméra de mesure"
        ],
        correctAnswer: 1,
        explanation: "Les métaux s'oxydent spontanément à l'air (couches de patine ou de ZnO). Le polissage met à nu le métal pur, assurant un contact électrique optimal."
      },
      {
        question: "Quel est l'impact d'une forte résistance interne du pont salin sur une pile en circuit fermé débitant un courant notable I ?",
        options: [
          "La f.e.m. à vide augmente",
          "La tension mesurable aux bornes s'effondre en raison de la chute ohmique interne : $U = E_{fem} - r \\times I$",
          "Le courant augmente par effet tunnel",
          "La pile s'auto-recharge"
        ],
        correctAnswer: 1,
        explanation: "Si le pont salin conduit mal les ions (résistance interne r élevée), la tension chute brusquement dès qu'un courant circule, convertissant l'énergie électrique en chaleur indésirable."
      },
      {
        question: "Pourquoi un simple fil métallique de cuivre ne peut-il pas servir de pont interne pour relier les deux béchers de la pile Daniell ?",
        options: [
          "Il est trop cher",
          "La conduction en solution aqueuse doit impérativement s'effectuer par migration d'ions (porteurs de charge mobiles), tandis qu'un fil de métal ne permet pas le transport ionique et créerait des barrières d'électrolyse",
          "Le fil de cuivre fondrait immédiatement",
          "Le cuivre est un isolant électrique"
        ],
        correctAnswer: 1,
        explanation: "Dans les phases liquides, le courant passe uniquement par transport d'ions neutres ou chargés. Un raccord métallique engendrerait de nouvelles interfaces électrode/solution bloquantes."
      },
      {
        question: "Quelle est la f.e.m. standard théorique $E^\\circ_{pile}$ d'une pile Daniell sachant que $E^\\circ(Cu^{2+}/Cu) = +0,34 \\text{ V}$ et $E^\\circ(Zn^{2+}/Zn) = -0,76 \\text{ V}$ ?",
        options: [
          "0,42 V",
          "1,10 V (obtenu par soustraction : $E^\\circ_{cathode} - E^\\circ_{anode} = 0,34 - (-0,76)$)",
          "-0,42 V",
          "-1,10 V"
        ],
        correctAnswer: 1,
        explanation: "La force électromotrice standard se calcule en faisant la différence des potentiels d'oxydoréduction des deux couples réactifs : $E^\\circ = E^\\circ(Cu^{2+}/Cu) - E^\\circ(Zn^{2+}/Zn)$."
      }
    ]
  },
  {
    id: '14',
    title: 'Dosage par précipitation — Méthode de Mohr',
    description: 'Détermination de la teneur en ions chlorure par titrage avec le nitrate d\'argent en présence d\'un indicateur de précipitation.',
    image: '/src/assets/images/mohr_titration_precipitation_setup_1781529655908.jpg',
    category: 'Chimie analytique',
    level: '2ème Bac',
    difficulty: 'Intermédiaire',
    duration: '2h',
    setupImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Titration_setup.svg/512px-Titration_setup.svg.png',
    videoUrl: 'https://www.youtube.com/embed/ODnPyAy-Z54',
    materials: ['Burette graduée', 'Pipette jaugée', 'Erlenmeyer', 'Propipette'],
    chemicals: ['Solution de nitrate d\'argent (AgNO3)', 'Chromate de potassium (K2CrO4)', 'Échantillon d\'ions chlorure'],
    protocol: [
      'Préparation de la burette : Rincer la burette avec de l\'eau distillée, puis avec une petite quantité de la solution de nitrate d\'argent (AgNO3).',
      'Remplissage : Remplir la burette avec la solution de nitrate d\'argent (solution titrante) et ajuster le ménisque au zéro.',
      'Prélèvement : Prélever précisément 10,0 mL de la solution contenant les ions chlorure (solution à doser) à l\'aide d\'une pipette jaugée et d\'une propipette.',
      'Préparation de l\'erlenmeyer : Verser le prélèvement dans un erlenmeyer propre de 100 mL.',
      'Ajout de l\'indicateur : Ajouter environ 1 mL de solution de chromate de potassium (K2CrO4) à 5% dans l\'erlenmeyer. La solution prend une couleur jaune pâle.',
      'Réglage du pH : S\'assurer que le pH de la solution se situe entre 6,5 et 9 (indispensable pour la stabilité du chromate d\'argent).',
      'Phase de titrage : Verser goutte à goutte le nitrate d\'argent dans l\'erlenmeyer tout en maintenant une agitation magnétique constante.',
      'Observation de la réaction : Des précipités blancs de chlorure d\'argent (AgCl) se forment d\'abord.',
      'Équivalence : Continuer le titrage jusqu\'à ce qu\'une goutte de AgNO3 provoque un changement de couleur permanent du jaune clair vers un précipité rouge brique (chromate d\'argent).',
      'Relevé : Noter précisément le volume équivalent Ve sur la burette.',
      'Répétition : Procéder à un second titrage précis pour confirmer le volume équivalent.',
      'Calculs : Utiliser la relation C(Ag+) * Ve = C(Cl-) * V(Cl-) pour déterminer la concentration en chlorures.'
    ],
    hazards: ['Le nitrate d\'argent cause des taches noires indélébiles sur la peau et corrode les muqueuses', 'Le chromate de potassium est cancérogène, mutagène et toxique pour la reproduction (CMR)'],
    precautions: ['Porter des gants, des lunettes et une blouse fermée', 'Manipulation sous hotte si possible', 'Ne jamais pipeter à la bouche', 'Récupérer les deux précipités (AgCl et Ag2CrO4) dans le bidon des sels d\'argent'],
    quiz: [
      { question: 'Pourquoi le nitrate d\'argent est-il classé H314 (Corrosif) ?', options: ['Il tache les vêtements', 'Il provoque des brûlures chimiques et des lésions oculaires graves', 'Il sent mauvais'], correctAnswer: 1 },
      { question: 'Le chromate de potassium (K2CrO4) est classé H340, H350. Qu\'est-ce que cela signifie ?', options: ['Il est très coloré', 'Il est cancérogène, mutagène (produit CMR hautement dangereux)', 'Il est nutritif'], correctAnswer: 1 },
      { question: 'Quelle précaution spécifique impose le caractère CMR du chromate de potassium ?', options: ['Port strict de gants et manipulation impérative sous hotte', 'Rien de particulier', 'Se laver les mains seulement après'], correctAnswer: 0 },
      { question: 'Comment doit-on gérer les déchets contenant des sels d\'argent et de chrome ?', options: ['À l\'évier', 'Collecte impérative dans des bidons de déchets toxiques spécifiques', 'Dans la poubelle de classe'], correctAnswer: 1 },
      { question: 'Pourquoi est-il strictement interdit de pipeter le chromate de potassium à la bouche ?', options: ['C\'est un poison toxique et cancérogène extrêmement grave', 'Il a mauvais goût', 'C\'est interdit par le règlement seulement'], correctAnswer: 0 },
      { question: 'Que faire en cas de projection de nitrate d\'argent sur la peau ?', options: ['Laisser noircir', 'Rincer abondamment à l\'eau courante pour limiter la pénétration et la brûlure', 'Mettre de la crème solaire'], correctAnswer: 1 },
      { question: 'H410 pour les sels d\'argent indique qu\'ils sont :', options: ['Biodégradables', 'Très toxiques pour les organismes aquatiques avec des effets durables', 'Bons pour les plantes'], correctAnswer: 1 },
      { question: 'Pourquoi le nitrate d\'argent doit-il être conservé à l\'abri de la lumière ?', options: ['Pour éviter qu\'il ne chauffe', 'Il est photosensible et se décompose en argent noirceur à la lumière', 'Il devient invisible'], correctAnswer: 1 },
      { question: 'En fin de dosage, quelle est la priorité de sécurité ?', options: ['Nettoyer tout le matériel et se laver les mains soigneusement', 'Partir vite en récréation', 'Vider la burette dans la poubelle'], correctAnswer: 0 },
      { question: 'Porte-t-on des gants pendant toute la durée de ce dosage ?', options: ['Oui, à cause de la toxicité et du caractère CMR et corrosif des produits', 'Non inutile', 'Seulement au début'], correctAnswer: 0 }
    ]
  },
  {
    id: '15',
    title: 'Dosage par oxydoréduction — Permanganate de potassium',
    description: 'Détermination de l\'équivalence et de la concentration d\'une solution de permanganate de potassium (KMnO4) par un titrage d\'oxydoréduction avec une solution étalon d\'ions fer (II).',
    image: '/src/assets/images/permanganate_redox_titration_1781531890358.jpg',
    category: 'Chimie analytique',
    level: '2ème Bac',
    difficulty: 'Avancé',
    duration: '2h',
    materials: ['Burette graduée de 25 mL', 'Pipette jaugée de 10 mL', 'Erlenmeyer de 100 mL', 'Support et pince', 'Propipette', 'Agitateur magnétique'],
    chemicals: ['Solution de permanganate de potassium (KMnO4) à concentration inconnue', 'Solution de sel de Mohr (Fe2+) à 0,10 mol/L', 'Acide sulfurique concentré (pour acidifier)'],
    chemicalTable: [
      { name: 'Permanganate de potassium', state: 'Solution violette', hazards: 'H319, H410' },
      { name: 'Acide sulfurique', state: 'Liquide concentré', hazards: 'H314, H290' },
      { name: 'Sel de Mohr', state: 'Solution incolore', hazards: 'N/A' }
    ],
    protocol: [
      'Préparation de la burette : Rincer la burette avec de l\'eau distillée puis avec la solution de permanganate de potassium.',
      'Ajustement : Remplir la burette avec le permanganate (solution violette intense) et ajuster précisément le ménisque au zéro en lisant sur le haut du ménisque (car la solution est très opaque).',
      'Prélèvement : Prélever exactement 10,0 mL de la solution de sel de Mohr (contenant les ions fer II) à l\'aide d\'une pipette jaugée munie d\'une propipette.',
      'Introduction : Verser le volume prélevé dans un erlenmeyer propre.',
      'Acidification : Ajouter environ 5 mL de solution d\'acide sulfurique diluée pour fournir en excès les ions H+ nécessaires à l\'oxydoréduction.',
      'Titrage : Verser goutte à goutte la solution violette de permanganate de potassium tout en maintenant une agitation magnétique régulière.',
      'Décoloration : Observer la décoloration rapide de la solution de permanganate à son contact avec les ions Fe2+.',
      'Équivalence : Repérer l\'équivalence lorsque la coloration violette/rose pâle persiste pendant plus de 30 secondes.',
      'Mesure : Relever avec précision le volume équivalent Ve sur la burette.'
    ],
    hazards: ['Le permanganate de potassium est un puissant oxydant qui tache fortement la peau et irrite', 'L\'acide sulfurique est très corrosif et peut provoquer des brûlures graves'],
    precautions: ['Porter impérativement blouse, lunettes de protection fermées et gants en nitrile', 'En cas de contact avec l\'acide sulfurique, rincer immédiatement et abondamment à l\'eau courante', 'Manipuler l\'acide sulfurique avec extrême précaution'],
    quiz: [
      {
        question: "Quelle est la demi-équation de réduction du couple MnO4- / Mn2+ en milieu acide ?",
        options: [
          "MnO4- + 8H+ + 5e- = Mn2+ + 4H2O",
          "MnO4- + 4H+ + 3e- = MnO2 + 2H2O",
          "MnO4- + 8H+ + 4e- = Mn2+ + 4H2O",
          "Mn2+ + 4H2O = MnO4- + 8H+ + 5e-"
        ],
        correctAnswer: 0,
        explanation: "En milieu acide, l'ion permanganate (MnO4-) est réduit en ion manganèse (Mn2+) en captant 5 électrons pour équilibrer les degrés d'oxydation (+VII à +II)."
      },
      {
        question: "Quel est le rôle précis des ions H+ apportés par l'acide sulfurique lors du titrage ?",
        options: [
          "Ils servent de solvant pour accélérer visuellement la réaction",
          "Ils sont indispensables comme réactifs pour permettre la réduction complète des ions MnO4- en Mn2+",
          "Ils permettent d'éviter la décomposition de l'eau",
          "Ils neutralisent le sel de Mohr alcalin"
        ],
        correctAnswer: 1,
        explanation: "Les ions H+ sont des réactifs formels de la réduction du permanganate. S'ils manquent, la réaction s'arrête ou produit du dioxyde de manganèse brun (MnO2) insoluble."
      },
      {
        question: "Quel indicateur de fin de réaction ajoute-t-on dans l'erlenmeyer lors de ce dosage ?",
        options: [
          "L'empois d'amidon",
          "La phénolphtaléine",
          "Aucun, car l'ion permanganate MnO4- est un auto-indicateur fortement violet dont la persistance signale l'équivalence",
          "Le bleu de bromothymol"
        ],
        correctAnswer: 2,
        explanation: "L'ion permanganate est intensément violet, tandis que le réactif Fe2+ et le produit Mn2+ sont pratiquement incolores. L'apparition d'un rose persistant indique directement la présence d'un excès de permanganate, après consommation totale de Fe2+."
      },
      {
        question: "Au cours de ce titrage, l'ion ferreux (Fe2+) subit quelle transformation ?",
        options: [
          "Une réduction en fer métallique solide",
          "Une oxydation en ion ferrique Fe3+",
          "Une substitution complexante avec le soufre",
          "Une hydrolyse acide réversible"
        ],
        correctAnswer: 1,
        explanation: "L'oxydation d'un réducteur correspond à une perte d'électron. L'ion Fe2+ perd un électron pour donner de l'ion ferrique Fe3+ : Fe2+ -> Fe3+ + e-."
      },
      {
        question: "Quelle est l'équation globale équilibrée de la réaction d'oxydoréduction de ce dosage ?",
        options: [
          "MnO4- + 5Fe2+ + 8H+ -> Mn2+ + 5Fe3+ + 4H2O",
          "MnO4- + Fe2+ + 8H+ -> Mn2+ + Fe3+ + 4H2O",
          "2MnO4- + 5Fe2+ + 16H+ -> 2Mn2+ + 5Fe3+ + 8H2O",
          "MnO4- + 5Fe2+ -> Mn2+ + 5Fe3+"
        ],
        correctAnswer: 0,
        explanation: "Pour equaliser le transfert d'électrons (5 électrons captés par MnO4- et 1 perdu pour Fe2+), on multiplie la demi-équation du fer par 5, ce qui donne : MnO4- + 5Fe2+ + 8H+ -> Mn2+ + 5Fe3+ + 4H2O."
      },
      {
        question: "Quelle relation stœchiométrique relie les réactifs à l'équivalence du titrage ?",
        options: [
          "n(MnO4-) = n(Fe2+)",
          "n(MnO4-) / 5 = n(Fe2+) / 1",
          "n(MnO4-) / 1 = n(Fe2+) / 5",
          "5 * n(MnO4-) = 8 * n(Fe2+)"
        ],
        correctAnswer: 2,
        explanation: "D'après l'équation bilan stœchiométrique, la disparition de 1 mole de permanganate nécessite 5 moles d'ions Fe2+, ce qui conduit à : n(MnO4-) = n(Fe2+) / 5."
      },
      {
        question: "Comment définit-on scientifiquement un agent réducteur ?",
        options: [
          "Une espèce chimique capable de capter un ou plusieurs protons",
          "Une espèce chimique capable de céder un ou plusieurs électrons",
          "Une espèce chimique capable de capter un ou plusieurs électrons",
          "Une espèce qui abaisse le pH d'une solution"
        ],
        correctAnswer: 1,
        explanation: "Un réducteur est un donneur d'électrons (il subit une oxydation), tandis qu'un oxydant est un accepteur d'électrons (il subit une réduction)."
      },
      {
        question: "Si l'on trouve un volume équivalent de Ve = 12,5 mL de KMnO4 à C1 = 0,020 mol/L pour titrer V2 = 10,0 mL de Fe2+, quelle est la concentration en Fe2+ ?",
        options: [
          "0,025 mol/L",
          "0,125 mol/L",
          "0,500 mol/L",
          "0,050 mol/L"
        ],
        correctAnswer: 1,
        explanation: "On utilise la relation : C2 * V2 = 5 * C1 * Ve. Ce qui donne C2 = 5 * 0,020 * 12,5 / 10,0 = 0,125 mol/L."
      },
      {
        question: "Pourquoi l'acide chlorhydrique (contenant les ions Cl-) ne convient-il pas pour acidifier le titrage ?",
        options: [
          "Parce que c'est un acide faible",
          "Parce que l'ion permanganate risquerait d'oxyder les ions chlorure Cl- en dichlore gazeux toxique Cl2, perturbant la stœchiométrie",
          "Parce qu'il détruit l'indicateur coloré",
          "Parce qu'il réagit violemment avec le fer (II)"
        ],
        correctAnswer: 1,
        explanation: "L'ion chlorure Cl- est un réducteur modéré, mais MnO4- est un oxydant si puissant qu'il l'oxyderait en Cl2. On doit employer l'acide sulfurique car l'ion sulfate SO4(2-) ne s'oxyde pas."
      },
      {
        question: "Quel est le nombre d'oxydation du manganèse dans l'ion permanganate MnO4- ?",
        options: [
          "+II",
          "+IV",
          "+VII",
          "-I"
        ],
        correctAnswer: 2,
        explanation: "Puisque l'oxygène a pour degré d'oxydation classique -II, on a : x + 4 * (-2) = -1 (charge de l'ion), d'où x = +7 (+VII)."
      },
      {
        question: "Quelle est la couleur attendue d'une solution contenant principalement des ions Mn2+ hautement dilués ?",
        options: [
          "Vert forêt",
          "Violet intense",
          "Pratiquement incolore",
          "Jaune or"
        ],
        correctAnswer: 2,
        explanation: "Les ions Mn(2+) en solution diluée sont incolores ou d'un rose extrêmement pâle imperceptible à l'œil, permettant de voir la coloration rose de la moindre goutte de MnO4- en excès."
      },
      {
        question: "Qu'entend-on par équivalence d'un titrage ?",
        options: [
          "Le moment exact où les volumes de réactifs introduits sont identiques",
          "L'état atteint lorsque les réactifs titré et titrant sont mélangés dans des proportions stœchiométriques",
          "Le moment où le pH de la solution s'établit à 7",
          "Le milieu de la courbe de conductivité"
        ],
        correctAnswer: 1,
        explanation: "À l'équivalence, tout le réactif d'intérêt initialement présent a réagi complètement avec le réactif titrant ajouté. Les réactifs sont introduits en proportions stœchiométriques."
      },
      {
        question: "Pourquoi l'acide nitrique (HNO3) n'est-il pas adapté pour acidifier ce type de dosage ?",
        options: [
          "Parce que l'ion nitrate NO3- possède lui-même des propriétés de réduction majeures",
          "Parce que l'ion nitrate NO3- est un oxydant puissant qui entrerait en compétition avec le permanganate en oxydant spontanément le Fe2+",
          "Parce qu'il dissout l'agitateur magnétique",
          "Parce qu'il est instable sous vide"
        ],
        correctAnswer: 1,
        explanation: "L'acide nitrique est lui-même un oxydant thermique vigoureux. Il oxyderait les ions Fe2+ à doser avant l'action du permanganate, faussant irrémédiablement la mesure."
      },
      {
        question: "Quel est le nom du couple redox impliquant l'ion ferreux dosé dans ce TP ?",
        options: [
          "Fe2+ / Fe",
          "Fe3+ / Fe2+",
          "Fe3+ / Fe",
          "Fe / Fe2+"
        ],
        correctAnswer: 1,
        explanation: "L'oxydant s'écrit toujours en premier. Le couple redox liant Fe2+ et son produit oxydé Fe3+ s'écrit Fe3+ / Fe2+."
      },
      {
        question: "Quelle est l'utilité première de l'agitation continue lors du versage de la burette ?",
        options: [
          "Réchauffer uniformément l'erlenmeyer",
          "Permettre une dispersion immédiate de la solution titrante afin d'éviter les surconcentrations locales et d'observer le changement de couleur au plus juste",
          "Dissoudre les parois de verre",
          "Activer magnétiquement les ions"
        ],
        correctAnswer: 1,
        explanation: "L'agitation assure la répartition instantanée du permanganate pour éviter qu'une coloration rose locale n'apparaisse à tort avant l'équivalence réelle globale."
      },
      {
        question: "Quelle observation fait-on lorsqu'on approche tout près du volume d'équivalence ?",
        options: [
          "Un jaillissement de gaz et de la chaleur",
          "La goutte violette qui tombe se décolore de plus en plus lentement, la teinte rose transitoire persistant quelques secondes avant de s'effacer",
          "Des petits éclats solides blancs précipitent",
          "La solution vire au bleu marine"
        ],
        correctAnswer: 1,
        explanation: "À proximité de l'équivalence, la concentration en ions ferreux restant diminue fortement. La vitesse de réaction ralentit, d'où la persistance transitoire temporaire de la teinte violette."
      },
      {
        question: "Quelle verrerie de précision utilise-t-on pour mesurer les 10,0 mL de solution de sel de Mohr ?",
        options: [
          "Un bécher de laboratoire gradué",
          "Une éprouvette graduée en plastique",
          "Une pipette jaugée",
          "Une fiole jaugée"
        ],
        correctAnswer: 2,
        explanation: "Pour insérer un réactif titré à doser avec exactitude, on se sert d'une pipette jaugée, qui garantit un volume extrêmement précis (par rapport à une éprouvette)."
      },
      {
        question: "Que se passe-t-il chimiquement lors d'une oxydation ?",
        options: [
          "Une espèce chimique capte des électrons",
          "Une espèce chimique libère ou perd des électrons",
          "Le nombre d'oxydation diminue",
          "L'atome absorbe des neutrons stables"
        ],
        correctAnswer: 1,
        explanation: "L'oxydation est définie par une perte d'électrons ($Red \rightarrow Ox + n \cdot e^-$), entraînant une augmentation logique du degré d'oxydation."
      },
      {
        question: "Pourquoi privilégie-t-il le sel de Mohr stable Fe(SO4)2(NH4)2 . 6H2O au sulfate de fer II standard pour doser ?",
        options: [
          "Parce qu'il ne contient pas d'impuretés salées",
          "Parce que les cristaux de sel de Mohr résistent beaucoup mieux à l'oxydation spontanée par l'oxygène de l'air que le sulfate ferreux seul",
          "Parce qu'il est soluble dans l'huile",
          "Parce qu'il est déjà coloré en rose"
        ],
        correctAnswer: 1,
        explanation: "Le sel de Mohr solide est une source de Fe(2+) très stable en atmosphère ambiante, préservant la pureté de la teneur en fer pour préparer des solutions étalons fiables."
      },
      {
        question: "La chimie analytique quantitative permet de réaliser quel objectif principal ?",
        options: [
          "Modéliser le mouvement orbital des électrons",
          "Déterminer la quantité ou la concentration précise de substances chimiques dans un échantillon",
          "Synthétiser de nouvelles molécules inexistantes sur Terre",
          "Fabriquer des alliages de titane ultralégers"
        ],
        correctAnswer: 1,
        explanation: "La chimie analytique quantitative se concentre sur les calculs de proportions pour mesurer avec précision la concentration ou la pureté d'un réactif."
      }
    ]
  },
  {
    id: '16',
    title: 'TP Électrolyse — Transformation forcée',
    description: 'Analyse d\'une réaction d\'oxydoréduction forcée et étude du passage du courant électrique dans une solution d\'iodure de potassium (KI) avec électrodes de graphite.',
    image: '/src/assets/images/electrolysis_forced_transformation_1781532101633.jpg',
    category: 'Électrochimie',
    level: '2ème Bac',
    difficulty: 'Intermédiaire',
    duration: '2h',
    materials: ['Tube en U', 'Générateur de tension continue (Géné)', 'Électrodes de graphite (carbone)', 'Fils de connexion électriques', 'Rhéostat et ampèremètre', 'Pinces crocodiles'],
    chemicals: ['Solution d\'iodure de potassium (K+ + I-) à 0,50 mol/L', 'Empois d\'amidon', 'Solution aqueuse de phénolphtaléine'],
    chemicalTable: [
      { name: 'Iodure de potassium', state: 'Solution limpide incolore', hazards: 'H319' },
      { name: 'Phénolphtaléine', state: 'Indicateur coloré soluble', hazards: 'H225, H350' },
      { name: 'Empois d\'amidon', state: 'Indicateur laiteux', hazards: 'N/A' }
    ],
    protocol: [
      'Montage : Fixer le tube en U sur son support métallique.',
      'Remplissage : Verser la solution d\'iodure de potassium (KI) dans le tube en U de manière à remplir les deux branches à mi-hauteur.',
      'Insertion : Plonger une électrode cylindrique de graphite dans chaque branche du tube.',
      'Indicateurs : Ajouter 3 gouttes de phénolphtaléine et 5 gouttes d\'empois d\'amidon dans chacune des deux branches du tube en U.',
      'Raccordement : Relier l\'une des électrodes à la borne positive (+) du générateur continu (c\'est l\'anode), et l\'autre à la borne négative (-) (c\'est la cathode).',
      'Mise sous tension : Allumer le générateur et régler la tension à environ 6V continu.',
      'Analyse Anode : Observer attentivement le virage de couleur à l\'anode vers une teinte jaune, puis noire/bleue (production de diiode I2 révélée par l\'amidon).',
      'Analyse Cathode : Observer à la cathode la production de micro-bulles gazeuses de dihydrogène (H2) et la coloration fuchsia de la phénolphtaléine (vire sous l\'action des ions hydroxyde HO- produits).'
    ],
    hazards: ['Production de diiode qui peut être irritant pour les muqueuses', 'Risque d\'inhalation ou enflammement du gaz H2 à proximité d\'étincelles'],
    precautions: ['Garder le générateur éteint lors des raccordements électriques', 'Porter des lunettes de protection obligatoires pour se protéger des projections', 'Travailler dans une salle aérée'],
    quiz: [
      {
        question: "Qu'est-ce qu'une électrolyse d'un point de vue thermodynamique ?",
        options: [
          "Une réaction d'oxydoréduction spontanée produisant de la tension",
          "Une transformation forcée non spontanée induite par l'apport d'un courant électrique externe",
          "La fusion complète de deux métaux sous haute pression",
          "Le passage moléculaire d'ions inertes sans échange électronique"
        ],
        correctAnswer: 1,
        explanation: "L'électrolyse force le système à évoluer dans le sens inverse de son équilibre naturel ou spontané en consommant de l'énergie électrique."
      },
      {
        question: "À quelle électrode a toujours lieu la réaction d'oxydation ?",
        options: [
          "La cathode",
          "L'anode",
          "Le pont salin intermédiaire",
          "Les fils électriques externes"
        ],
        correctAnswer: 1,
        explanation: "L'oxydation se produit toujours au niveau de l'anode, que ce soit une pile spontanée ou un système d'électrolyse forcée."
      },
      {
        question: "À quel pôle du générateur externe de tension est connectée l'anode d'un électrolyseur ?",
        options: [
          "La borne négative (-)",
          "La borne positive (+)",
          "La borne de mise à la masse",
          "N'importe quelle borne indifféremment"
        ],
        correctAnswer: 1,
        explanation: "Dans l'électrolyse, l'anode est le siège de l'oxydation (qui libère des électrons). Les électrons sont attirés par la borne positive (+) du générateur. L'anode est donc au pôle (+)."
      },
      {
        question: "À quelle électrode s'effectue la réaction de réduction ?",
        options: [
          "L'anode",
          "La cathode",
          "Le commutateur interne",
          "Le fil en platine"
        ],
        correctAnswer: 1,
        explanation: "La réduction, définie par un gain d'électrons par le réactif oxydant, se déroule toujours à l'électrode appelée cathode."
      },
      {
        question: "La cathode est reliée à quelle borne du générateur continu lors de l'électrolyse ?",
        options: [
          "La borne positive (+)",
          "La borne négative (-)",
          "Le pôle alternatif",
          "La masse métallique"
        ],
        correctAnswer: 1,
        explanation: "La cathode apporte les électrons requis pour la réduction. Ces derniers proviennent de la borne négative (-) du générateur de tension."
      },
      {
        question: "Lors de l'électrolyse de la solution d\'iodure de potassium, quelle espèce s'oxyde à l'anode ?",
        options: [
          "Les ions potassium K+",
          "Les ions iodure I- en diiode I2",
          "Les molécules d'eau H2O en dioxygène",
          "Le carbone graphite de l'électrode"
        ],
        correctAnswer: 1,
        explanation: "Les ions iodure négatifs I- migrent vers l'anode positive où ils cèdent leurs électrons : 2I- -> I2 + 2e-. Le diiode formé donne une couleur jaune/marron."
      },
      {
        question: "Quelle est la demi-équation de réduction ayant lieu à la cathode de cette électrolyse aqueuse ?",
        options: [
          "2H2O + 2e- -> H2(g) + 2HO-(aq)",
          "K+ + e- -> K(s)",
          "I2 + 2e- -> 2I-",
          "O2 + 4H+ + 4e- -> 2H2O"
        ],
        correctAnswer: 0,
        explanation: "À la cathode, l'eau se réduit plus facilement que l'ion potassium K+. Le solvant H2O capte des électrons pour produire du dihydrogène H2(g) et des ions hydroxyde basiques HO-."
      },
      {
        question: "Quel rôle joue l'empois d'amidon placé dans le tube en U ?",
        options: [
          "Il épaissit l'eau pour empêcher le mélange des branches",
          "Il réagit comme indicateur très sensible du diiode (I2), créant un complexe bleu-noir intense",
          "Il neutralise les acides forts",
          "Il catalyse l'apport d'ions potassium"
        ],
        correctAnswer: 1,
        explanation: "L'amidon forme un complexe d'inclusion de couleur bleu foncé très caractéristique en présence de traces de diiode libre (I2)."
      },
      {
        question: "Pourquoi observe-t-on l'apparition d'un rose fuchsia intense à la cathode ?",
        options: [
          "Parce que les molécules de potassium deviennent roses",
          "Parce que la réduction de l'eau produit localement des ions hydroxyde HO- basiques, ce qui fait virer la phénolphtaléine",
          "Sous l'influence directe du champ magnétique gazeux",
          "En raison d'une forte élévation locale de température"
        ],
        correctAnswer: 1,
        explanation: "La demi-équation montre l'apparition d'ions HO- (pH basique). La phénolphtaléine est un indicateur de pH dont la couleur vire au rose/fuchsia pour pH supérieur à 8,2."
      },
      {
        question: "Dans quel sens circulent les électrons libres dans le circuit électrique métallique extérieur ?",
        options: [
          "Du pôle positif (+) de l'électrolyseur vers le générateur",
          "De la borne négative (-) du générateur vers la cathode, et de l'anode vers la borne positive (+)",
          "Dans les deux sens alternativement à haute fréquence",
          "Ils longent les parois du tube en U"
        ],
        correctAnswer: 1,
        explanation: "Le courant électrique et les électrons s'écoulent en sens opposés. Les électrons quittent le pôle (-) du générateur pour rejoindre la cathode et retournent du pôle (+) depuis l'anode."
      },
      {
        question: "Comment est transporté le courant à l'intérieur de l'électrolyte (la solution de KI) ?",
        options: [
          "Par un courant d'électrons hydratés libres",
          "Par la migration ordonnée des ions (anions vers l'anode positive, cations vers la cathode négative)",
          "Par des fils invisibles de raccordement",
          "Il n'y a pas de passage de courant dans le liquide"
        ],
        correctAnswer: 1,
        explanation: "Dans une solution conductrice, le courant se concrétise exclusivement par la double migration ordonnée des ions de charges opposées vers les électrodes attractrices."
      },
      {
        question: "Qu'est-ce qu'un cation et vers quelle électrode migre-t-il lors de l'électrolyse ?",
        options: [
          "Un ion positif qui migre vers l'anode",
          "Un ion positif qui se déplace vers la cathode négative (-)",
          "Une molécule neutre stable",
          "Un cristal inerte"
        ],
        correctAnswer: 1,
        explanation: "Les cations sont des ions positifs (ex: K+, Na+, H3O+) attirés par l'électrode chargée négativement, à savoir la cathode."
      },
      {
        question: "Quelle relation mathématique relie la charge totale Q, l'intensité I et la durée de l'électrolyse dt ?",
        options: [
          "Q = I / dt",
          "Q = I * dt",
          "I = Q * dt",
          "Q = I * dt^2"
        ],
        correctAnswer: 1,
        explanation: "La quantité d'électricité globale Q transportée par le courant I pendant l'intervalle de temps dt est définie par : Q = I * dt (exprimée en Coulombs)."
      },
      {
        question: "La constante de Faraday (F = 96500 C/mol) correspond à quoi précisément ?",
        options: [
          "La charge stockée d'une pile bouton",
          "La charge électrique absolue portée par une mole d'électrons",
          "Le rapport volumique de l'hydrogène gazeux",
          "La tension nécessaire pour rompre la molécule d'eau"
        ],
        correctAnswer: 1,
        explanation: "F est le produit de la constante d'Avogadro par la charge élémentaire de l'électron : F = Na * e ≈ 96500 Coulombs par mole d'électrons."
      },
      {
        question: "Lors d'une électrolyse de sulfate de cuivre avec des électrodes de cuivre métallique, que remarque-t-on ?",
        options: [
          "Le cuivre de l'anode se dissout lentement en ions Cu2+ (anode soluble), et du cuivre métallique pur se dépose à la cathode",
          "Les deux électrodes fondent instantanément",
          "La solution perd immédiatement sa couleur bleue",
          "Aucune transformation n'a lieu"
        ],
        correctAnswer: 0,
        explanation: "C'est l'électrolyse à anode soluble : l'oxydation dissout le cuivre solide de l'anode (Cu -> Cu2+ + 2e-) et la réduction dépose ce cuivre sur la cathode (Cu2+ + 2e- -> Cu)."
      },
      {
        question: "Si l'on veut déposer de l'argent métallique sur un objet en fer par électrolyse, où doit-on placer l'objet ?",
        options: [
          "À l'anode, car c'est là que se fait le dépôt",
          "À la cathode, pour que les ions Ag+ volatils y soient réduits en argent solide Ag(s)",
          "Au fond du bêcher, loin des fils conducteurs",
          "Sur l'ampèremètre"
        ],
        correctAnswer: 1,
        explanation: "Le dépôt métallique de protection ou d'embellissement s'effectue par réduction de cations. L'objet constituant le support doit ainsi être disposé à l'électrode réductrice, la cathode (-)."
      },
      {
        question: "Quelle relation lie la quantité d'électrons échangés n(e-) à l'intensité I et la durée dt ?",
        options: [
          "n(e-) = (I * dt) / F",
          "n(e-) = (I * F) / dt",
          "n(e-) = I * dt * F",
          "n(e-) = F / (I * dt)"
        ],
        correctAnswer: 0,
        explanation: "On a Q = I * dt et Q = n(e-) * F, d'où la relation de proportionnalité directe : n(e-) = (I * dt) / F."
      },
      {
        question: "Quel procédé industriel capital repose entièrement sur le principe de l'électrolyse forcée ?",
        options: [
          "La distillation du pétrole brut",
          "La fabrication de l'aluminium métallique pur par électrolyse de l'alumine fondue",
          "La synthèse enzymatique de l'amidon pour le pain",
          "L'agitation du verre en fusion"
        ],
        correctAnswer: 1,
        explanation: "L'aluminium est un réducteur trop fort pour être extrait facilement par réduction chimique classique carbone/CO. On recourt industriellement à l'électrolyse à chaud."
      },
      {
        question: "Qu'annonce le terme d'anion lors de l'étude de l'ionisation du sel ?",
        options: [
          "Un ion négatif enclin à céder de l'oxygène",
          "Un ion chargé négativement qui se déplace vers l'anode positive (+)",
          "Un isotope moléculaire léger",
          "Un ion positif qui reste statique"
        ],
        correctAnswer: 1,
        explanation: "Un anion possède plus d'électrons que de protons (ex: I-, Cl-). Il migre vers le pôle positif de l'électrolyseur, l'anode."
      },
      {
        question: "Pourquoi l'utilisation d'une tension trop élevée en électrolyse aqueuse peut-elle être impropre ?",
        options: [
          "Elle gèle instantanément l'eau du tube",
          "Elle peut déclencher d'autres réactions d'oxydoréduction parasites du solvant ou d'autres ions, altérant la pureté des produits attendus",
          "Elle sature magnétiquement les plaques du graphite",
          "Elle dépolarise le courant continu de manière irréversible"
        ],
        correctAnswer: 1,
        explanation: "Au-delà d'une certaine tension d'électrolyse (surtension), plusieurs couples redox présents peuvent réagir simultanément, générant des mélanges indésirables."
      }
    ]
  },
  {
    id: '17',
    title: 'TP Préparation d\'une solution aqueuse par dissolution',
    description: 'Calculer la masse de soluté requise, peser précisément à la balance automatique et maîtriser la technique de la dissolution dans une fiole jaugée.',
    image: '/src/assets/images/dissolution_colorful_flasks_1781539257569.jpg',
    category: 'Chimie générale',
    level: 'Tronc Commun',
    difficulty: 'Débutant',
    duration: '1h',
    setupImage: '/src/assets/images/aqueous_solution_dissolution_steps_1781534519431.jpg',
    materials: ['Balance électronique de précision', 'Fiole jaugée de 100 mL avec son bouchon', 'Bécher de pesée', 'Spatule métallique', 'Entonnoir à solides', 'Pissette d\'eau distillée', 'Pipette simple (au compte-gouttes)'],
    chemicals: ['Sulfate de cuivre pentahydraté (CuSO4 . 5H2O) ou sel de table (NaCl) solide', 'Eau distillée'],
    chemicalTable: [
      { name: 'Sulfate de cuivre pentahydraté', state: 'Solide cristallisé bleu', hazards: 'H302, H315, H319, H410' },
      { name: 'Eau distillée', state: 'Liquide incolore', hazards: 'N/A' }
    ],
    protocol: [
      'Calcul préliminaire : Calculer la masse m de solide nécessaire pour obtenir une solution à concentration C choisie et volume V (m = C * V * M).',
      'Installation : Mettre sous tension la balance automatique et s\'assurer qu\'elle est stable et sur un plan parfaitement horizontal.',
      'Contenant : Poser le bécher ou le sabot de pesée propre et sec au milieu du plateau de la balance.',
      'Tare : Appuyer sur le bouton "Tare" de la balance pour annuler la masse du récipient vide (lecture de 0,00 g).',
      'Prélèvement : Récupérer délicatement de petites fractions de solide à l\'aide d\'une spatule métallique propre et propre, puis ajuster jusqu\'à lire précisément la valeur m calculée.',
      'Introduction : Placer un entonnoir à solides sur la fiole jaugée de 100 mL et introduire le solide pesé dans la fiole.',
      'Rinçage de sécurité : Rincer scrupuleusement avec de l\'eau distillée les bords intérieurs de l\'entonnoir et du bécher de pesée pour transférer la totalité des grains résiduels dans la fiole.',
      'Dissolution initiale : Remplir la fiole aux deux tiers environ d\'eau distillée. Placer le bouchon plastique et l\'agiter doucement par des mouvements de rotation circulaire pour dissoudre entièrement le soluté.',
      'Alignement : Compléter prudemment la fiole d\'eau distillée puis, à l\'approche du col, utiliser un compte-gouttes ou une pissette lente pour aligner le bas du ménisque courbe sur le trait de jauge.',
      'Homogénéisation : Boucher à nouveau la fiole jaugée et la retourner à 180 degrés à plusieurs reprises pour égaliser parfaitement la concentration.'
    ],
    hazards: ['Pour le sulfate de cuivre : dangereux en cas d\'ingestion spontanée et provoquant des irritations oculaires', 'Poussières solides inhalables ou salissantes'],
    precautions: ['Manipuler le solide avec une spatule sans jamais toucher aux doigts', 'Nettoyer le plateau de la balance après usage en cas de dispersion de cristaux', 'Porter blouse fermée et lunettes enveloppantes de protection'],
    quiz: [
      {
        question: "Quelle équation théorique définit de façon fondamentale la concentration molaire C d'une solution ?",
        options: [
          "C = n * V",
          "C = n / V",
          "n = C / V",
          "C = V / n"
        ],
        correctAnswer: 1,
        explanation: "La concentration molaire (C) représente la quantité de matière de soluté (n en moles) contenue dans un litre de volume de la solution (V)."
      },
      {
        question: "Par quelle relation calcule-t-on la masse m de solide à peser pour une dissolution de volume V et concentration C ?",
        options: [
          "m = C * V * M",
          "m = C / (V * M)",
          "m = C * M / V",
          "m = M * V / C"
        ],
        correctAnswer: 0,
        explanation: "Comme la quantité de matière est n = C * V et que la masse s'écrit m = n * M, on déduit par produit croisé direct : m = C * V * M."
      },
      {
        question: "Pourquoi est-il obligatoire d'utiliser une fiole jaugée (et non un bécher ou éprouvette) pour préparer cette solution ?",
        options: [
          "Parce que c'est le seul récipient résistant à l'eau distillée",
          "Parce que la fiole jaugée est calibrée en usine de façon extrêmement précise pour contenir une fiole à volume unique",
          "Parce qu'elle empêche le solide de précipiter",
          "Pour chauffer la solution plus rapidement"
        ],
        correctAnswer: 1,
        explanation: "La fiole jaugée possède un col très fin permettant d'ajuster le volume final à un niveau de précision analytique, contrairement aux graduations indicatives des éprouvettes ou béchers."
      },
      {
        question: "À quelle action correspond l'appui sur le bouton 'Tare' d'une balance de précision ?",
        options: [
          "Calculer automatiquement la masse molaire",
          "Remettre l'affichage d'écran à zéro avec le contenant déjà sur le plateau, éliminant ainsi sa masse du calcul",
          "Vérifier le calibrage thermique interne",
          "Arrêter l'affichage électrique instantanément"
        ],
        correctAnswer: 1,
        explanation: "Faire la tare permet de ne mesurer exclusivement que la masse de solide ajouté dans le récipient de pesée sans avoir à faire de soustraction manuelle."
      },
      {
        question: "Comment doit-on positionner son regard pour ajuster correctement le niveau au trait de jauge ?",
        options: [
          "Le regard orienté d'en haut pour mieux voir la collerette",
          "L'œil placé horizontalement, exactement à hauteur du trait de jauge pour supprimer l'erreur de parallaxe",
          "Le regard vers le fond incliné de la fiole",
          "L'ajustement peut se faire de manière approximative à distance"
        ],
        correctAnswer: 1,
        explanation: "S'aligner en face du trait de jauge évite l'effet d'optique de parallaxe, qui ferait paraître le niveau correct alors qu'il est trop haut ou trop bas."
      },
      {
        question: "Selon la règle de lecture internationale, quelle partie du ménisque doit effleurer le trait de jauge ?",
        options: [
          "Le haut des bords incurvés de la surface",
          "Le bas du ménisque concave (le creux de la courbe de surface liquide) doit être tangent au trait",
          "Le milieu géométrique exact du volume d'eau",
          "Le liquide doit simplement recouvrir le trait de jauge"
        ],
        correctAnswer: 1,
        explanation: "L'eau forme une surface incurvée concave dans un col de verre fin. La ligne horizontale du jaugeage est calibrée pour être tangente au point le plus bas de cette courbure concave."
      },
      {
        question: "Quel est le but de rincer le bécher de pesée et l'entonnoir à l'eau distillée au-dessus du col ?",
        options: [
          "Pour refroidir la fiole",
          "Assurer le transfert quantitatif total en récupérant toutes les traces et résidus de solide adhérant",
          "Nettoyer la fiole jaugée proprement",
          "Diminuer le pH de l'eau"
        ],
        correctAnswer: 1,
        explanation: "Le moindre cristal resté fixé sur l'entonnoir ou la coupelle de pesée réduirait la masse réelle dissoute, diminuant ainsi la concentration de la solution finale."
      },
      {
        question: "Pourquoi ne doit-on jamais ajouter de solide directement dans une fiole déjà remplie d'eau à ras bord ?",
        options: [
          "L'eau refuserait d'humidifier le solide bleu",
          "On ne pourrait plus agiter efficacement pour dissoudre, et le volume solide augmenterait le niveau, dépassant le trait de jauge",
          "La fiole jaugée casserait sous le poids",
          "Le sel de table s'évaporerait instantanément"
        ],
        correctAnswer: 1,
        explanation: "La dissolution nécessite de l'espace libre pour agiter par retournement ou rotation circulaire. De plus, dissoudre un solide modifie le volume total de façon non linéaire."
      },
      {
        question: "Quelle est l'unité de mesure normalisée de la concentration molaire ?",
        options: [
          "g / L",
          "mol / L",
          "g / mol",
          "mol / g"
        ],
        correctAnswer: 1,
        explanation: "L'unité officielle d'une concentration en quantité de matière molaire s'énonce en mole par litre (mol/L ou mol.L-1)."
      },
      {
        question: "Quelle relation mathématique simple relie la concentration massique (Cm) et la concentration molaire (C) ?",
        options: [
          "Cm = C / M",
          "Cm = C * M",
          "C = Cm * M",
          "Cm = C + M"
        ],
        correctAnswer: 1,
        explanation: "Comme Cm = m/V et n = m/M, on obtient immédiatement Cm = (n * M) / V = C * M, où M est la masse molaire de l'espèce dissoute."
      },
      {
        question: "Dans quel but retourne-t-on à plusieurs reprises la fiole jaugée bouchée à la fin de la préparation ?",
        options: [
          "Pour sécher le goulot extérieur de la fiole",
          "Vérifier la bonne tenue plastique du bouchon",
          "Homogénéiser la concentration de la solution dans tout son volume",
          "Dissoudre d'éventuels gaz insolubles"
        ],
        correctAnswer: 2,
        explanation: "Le fait de rajouter de l'eau distillée pure à la fin engendre des couches de densités hétérogènes. Retourner et secouer doucement uniformise la solution finale."
      },
      {
        question: "Que doit-on faire si on dépasse accidentellement le trait de jauge en complétant avec l'eau distillée ?",
        options: [
          "Retirer un peu d'eau avec une pipette de transfert plastique simple",
          "Laisser ainsi car l'excès d'eau s'évaporera tout seul",
          "Recommencer le TP intégralement (après avoir lavé et rincé la fiole), car la concentration est trop faible",
          "Faire chauffer au bec bunsen pour évaporer l'excédent de solvant"
        ],
        correctAnswer: 2,
        explanation: "Dépasser le trait de jauge se traduit par une dilution excessive irréversible. Retirer du liquide ôterait du soluté déjà dissous. Il faut relaver et recommencer proprement."
      },
      {
        question: "Pour préparer 250 mL d'une solution de NaCl de concentration 0,40 mol/L, quelle quantité de NaCl doit-on peser (M = 58,5 g/mol) ?",
        options: [
          "5,85 g",
          "2,34 g",
          "23,4 g",
          "0,585 g"
        ],
        correctAnswer: 0,
        explanation: "On utilise m = C * V * M. On a V = 0,250 L, donc m = 0,40 * 0,250 * 58,5 = 5,85 g."
      },
      {
        question: "Pourquoi est-il capital de prendre en compte les molécules d'eau dans la formule CuSO4 . 5H2O lors des calculs de pesée ?",
        options: [
          "Parce qu'elles rendent le solide plus acide",
          "Parce que ces molécules d'eau font partie intégrante du réseau cristallin solide et pèsent dans la masse molaire totale à évaluer",
          "Car l'eau de cristallisation s'évapore instantanément",
          "Cela n'est nécessaire que pour les solutions d'acides forts"
        ],
        correctAnswer: 1,
        explanation: "Le sulfate de cuivre pentahydraté contient 5 moles d'eau par mole de sel. Sa masse molaire (249,5 g/mol) est bien supérieure à celle du sulfate anhydre (159,5 g/mol). Ignorer cela induirait une sous-concentration."
      },
      {
        question: "Quelle règle recommande de ne jamais remettre un restant de produit chimique solide prélevé en trop dans son flacon d'origine ?",
        options: [
          "Pour forcer l'usage rapide des matières premières",
          "Pour exclure formellement tout risque de contamination globale du flacon de stockage d'origine par des poussières externes",
          "C'est une interdiction arbitraire",
          "Le produit s'échauffe si on le remet"
        ],
        correctAnswer: 1,
        explanation: "Un réactif remis en flacon d'origine après contact avec une spatule ou exposé à l'air libre peut compromettre l'extrême pureté du lot de stockage général."
      },
      {
        question: "Quel instrument de laboratoire est utilisé pour extraire le solide cristallin de son récipient d'origine ?",
        options: [
          "Une pince en bois de cuisine",
          "Une spatule propre et sèche conçue en métal ou résine inerte",
          "Un agitateur en verre frotté",
          "Le bec d'une ampoule de transfert"
        ],
        correctAnswer: 1,
        explanation: "La spatule métallique ou plastique s'avère idéale pour mesurer de douces fractions de solide sec en éliminant les contacts cutanés toxiques."
      },
      {
        question: "Une solution saturée désigne un mélange liquide où :",
        options: [
          "L'eau bout de façon permanente",
          "Le solvant a dissous le maximum de soluté possible à cette température ; tout ajout supplémentaire se dépose sous forme solide",
          "La molarité finale s'établit à une valeur égale à zéro",
          "La pression de vapeur s'est complètement annulée"
        ],
        correctAnswer: 1,
        explanation: "La saturation de la solution matérialise la limite thermodynamique de dissolution du sel dissous dans le solvant à température donnée."
      },
      {
        question: "Comment varie la vitesse et la quantité de dissolution de la plupart des sels solides avec la température ?",
        options: [
          "Elles sont totalement insensibles aux variations thermiques",
          "Elles diminuent car le froid solidifie le sel",
          "L'augmentation de la température accélère la dissolution et accroît généralement la solubilité limite",
          "La solution gèle sous l'action de la chaleur"
        ],
        correctAnswer: 2,
        explanation: "L'énergie cinétique microscopique (chaleur) affaiblit les liaisons ioniques du cristal solide solide, facilitant la solvatisation des ions."
      },
      {
        question: "En chimie des solutions, le terme d'aqueux indique que le solvant majoritaire est :",
        options: [
          "L'alcool butylique concentré",
          "L'eau pure",
          "L'acide éthanoïque à 90%",
          "Le dichlorométhane chloré"
        ],
        correctAnswer: 1,
        explanation: "Une solution aqueuse dispose de l'eau comme phase de solvant liquide active dans laquelle s'immergent les ions et solutés."
      },
      {
        question: "Pour préparer 100 mL de solution de dextrose (M = 180 g/mol) de concentration 0,050 mol/L, quelle masse peser ?",
        options: [
          "0,90 g",
          "9,00 g",
          "1,80 g",
          "0,18 g"
        ],
        correctAnswer: 0,
        explanation: "On utilise m = C * V * M. m = 0,050 * 0,100 * 180 = 0,90 g."
      }
    ]
  },
  {
    id: '18',
    title: 'TP Dilution d\'une solution aqueuse',
    description: 'Calculer le volume de solution mère à prélever, maîtriser l\'utilisation de la pipette jaugée munie de sa propipette, et préparer précisément la solution fille diluée.',
    image: '/src/assets/images/dilution_concentrated_diluted_1781537685388.jpg',
    category: 'Chimie générale',
    level: '1ère Bac',
    difficulty: 'Débutant',
    duration: '1h',
    setupImage: '/src/assets/images/dilution_steps_exact_user_specification_1781536312549.jpg',
    materials: ['Pipette jaugée de 10 mL (ou graduée)', 'Propipette (poire d\'aspiration)', 'Fiole jaugée de 100 mL', 'Bécher propre pour la solution mère', 'Pissette d\'eau distillée'],
    chemicals: ['Solution mère de concentration connue (ex: sulfate de cuivre hydraté)', 'Eau distillée'],
    chemicalTable: [
      { name: 'Solution mère', state: 'Liquide bleu clair ou rouge', hazards: 'N/A ou H319 selon réactif' },
      { name: 'Eau distillée', state: 'Solvant liquide neutre', hazards: 'N/A' }
    ],
    protocol: [
      'Calcul du volume : Calculer le volume Vm de solution mère à prélever à l\'aide de la loi de conservation de la matière (Vm = Cf * Vf / Cm).',
      'Échantillonnage : Verser une petite quantité de la solution mère de concentration Cm dans un bécher de prélèvement propre et sec.',
      'Rinçage de la pipette : Rincer la pipette jaugée avec une petite quantité de solution mère pour éliminer toute trace d\'eau distillée.',
      'Aspiration : Équiper la pipette jaugée de sa propipette, la plonger verticalement dans le bécher de prélèvement, puis aspirer la solution mère jusqu\'au-dessus du trait de jauge.',
      'Ajustement du ménisque : Abaisser la solution dans la pipette de manière à amener précisément le bas du ménisque sur le trait de jauge supérieur (en ajustant à hauteur des yeux).',
      'Transfert : Introduire la pointe de la pipette dans la fiole jaugée de 100 mL libre, puis laisser s\'écouler la solution mère prélevée par gravité.',
      'Ajout de solvant : Ajouter de l\'eau distillée à la pissette jusqu\'aux deux tiers de la fiole jaugée.',
      'Pré-mélange : Agrémenter d\'une légère agitation par rotation circulaire pour mélanger la solution mère et l\'eau distillée fraîche.',
      'Complétion finale : Remplir la fiole jusqu\'au trait de jauge en ajoutant l\'eau distillée finale goutte à goutte.',
      'Retournement : Boucher la fiole et la retourner au moins trois fois pour bien homogénéiser la concentration de la solution fille finale.'
    ],
    hazards: ['Risque extrêmement minime avec des solutions diluées', 'Bris de verrerie fine fragile sous la manipulation'],
    precautions: ['Ne jamais aspirer ou pipeter les solutions à la bouche', 'Disposer d\'un support à fioles pour éviter les chutes accidentelles', 'Regarder le col à hauteur horizontale'],
    quiz: [
      {
        question: "Quel principe de chimie régit l'ensemble de l'opération de dilution d'une solution ?",
        options: [
          "Le principe de l'augmentation lente du pH",
          "La conservation rigoureuse de la quantité de matière (en moles) de soluté lors de l'adjonction de solvant",
          "La réduction thermique spontanée du volume solide",
          "La création spontanée de molécules de chlorures stables"
        ],
        correctAnswer: 1,
        explanation: "Diluer réside dans l'ajout de solvant seul. Le nombre de moles de soluté initialement prélevé de la fiole mère reste inchangé dans la fiole fille définitive (nm = nf)."
      },
      {
        question: "Quelle équation fondamentales relie les concentrations et volumes des solutions mère et fille ?",
        options: [
          "Cm * Vm = Cf * Vf",
          "Cm / Vm = Cf / Vf",
          "Cm * Cf = Vm * Vf",
          "Cm * Vf = Cf * Vm"
        ],
        correctAnswer: 0,
        explanation: "La conservation de la matière (nm = nf) se traduit directement par l'égalité mathématique classique : Cm * Vm = Cf * Vf."
      },
      {
        question: "Comment s'énonce et s'évalue le facteur de dilution F d'une telle préparation ?",
        options: [
          "La vitesse d'écoulement du liquide dans la pipette",
          "Le rapport des concentrations Cm / Cf (ou des volumes Vf / Vm) précisant combien de fois la solution a été diluée",
          "Le coefficient d'agitation magnétique dans la fiole",
          "Le volume total de solvant ajouté en excès"
        ],
        correctAnswer: 1,
        explanation: "Le facteur F (nombre sans dimension supérieur à 1) correspond au quotient : F = Cm / Cf = Vf / Vm. Diluer par 10 s'exprime par F = 10."
      },
      {
        question: "Quel volume Vm d'une solution mère à 0,50 mol/L prélever pour fabriquer Vf = 100 mL d'une fiole fille à Cf = 0,050 mol/L ?",
        options: [
          "50,0 mL",
          "10,0 mL",
          "25,0 mL",
          "1,0 mL"
        ],
        correctAnswer: 1,
        explanation: "On utilise Vm = (Cf * Vf) / Cm. Vm = (0,050 * 100) / 0,50 = 10,0 mL."
      },
      {
        question: "Quel ustensile assure la plus haute rigueur pour prélever le volume de solution mère ?",
        options: [
          "Une éprouvette graduée de précision moyenne",
          "Une pipette jaugée combinée d'une propipette d'aspiration",
          "Un grand bécher gradué transparent",
          "Une seringue de transfert classique"
        ],
        correctAnswer: 1,
        explanation: "La pipette jaugée, étalonnée spécifiquement pour un volume déterminé, s'impose pour introduire le volume Vm exact requis, minimisant l'incertitude expérimentale."
      },
      {
        question: "Pourquoi est-il indésirable de plonger directement la pipette dans le flacon de stockage mère ?",
        options: [
          "Pour empêcher les vapeurs de boucher la poire de transfert",
          "Pour prévenir tout risque de contamination accidentelle de l'intégralité du flacon mère d'origine par des corps étrangers de la pipette",
          "Parce que la pipette se fragilise sous l'action concentrée du stock",
          "C'est une règle relative uniquement à l'ergonomie"
        ],
        correctAnswer: 1,
        explanation: "Travailler par échantillonnage dans un bécher de prélèvement garantit la propreté absolue du flacon d'origine restant, d'après les Bonnes Pratiques de Laboratoire."
      },
      {
        question: "Si l'on ajoute de l'eau distillée pure à une solution colorée, comment évolue la concentration massique de cette solution ?",
        options: [
          "Elle augmente fortement car l'eau est lourde",
          "Elle décroît proportionnellement à l'apport de solvant",
          "Elle reste parfaitement constante",
          "Elle dépend de la réaction acide-base gazeuse"
        ],
        correctAnswer: 1,
        explanation: "La masse de soluté reste inchangée tandis que le volume de solvant croît. La concentration massique diminue donc."
      },
      {
        question: "Quel est le facteur de dilution d'un mélange constitué d'un prélèvement de Vm = 10,0 mL inséré dans une fiole fille de Vf = 250 mL ?",
        options: [
          "F = 2.5",
          "F = 25",
          "F = 250",
          "F = 0.04"
        ],
        correctAnswer: 1,
        explanation: "Le facteur F équivaut au quotient des volumes final et initial : F = Vf / Vm = 250 / 10 = 25."
      },
      {
        question: "Où prépare-t-on la solution diluée (fille) ?",
        options: [
          "Dans un erlenmeyer gradué de 100 mL",
          "Dans une éprouvette stabilisée en verre",
          "Dans une fiole jaugée de volume correspondant au volume Cf visé",
          "Dans une burette graduée et agitée"
        ],
        correctAnswer: 2,
        explanation: "La solution fille est toujours préparée et ajustée précisément dans une fiole jaugée de volume Vf souhaité de façon à connaître fidèlement la concentration."
      },
      {
        question: "Quel est le but d'humecter et rincer la pipette jaugée avec la solution mère avant de prélever le volume utile ?",
        options: [
          "Pour échauffer les parois en verre de la pipette",
          "Éjecter et neutraliser d'éventuelles traces résiduelles d'eau distillée interne qui causeraient une dilution sauvage injustifiée",
          "Vérifier électroniquement l'état interne de la fiole",
          "Lubrifier l'embout en caoutchouc de la propipette"
        ],
        correctAnswer: 1,
        explanation: "Si des molécules d'eau distillée restent dans la pipette, elles diminueraient à tort la concentration de la solution mère prélevée par rapport à celle du flacon."
      },
      {
        question: "Doit-on chasser la toute dernière goutte de liquide piégée à la pointe d'une pipette jaugée à un seul trait d'usine ?",
        options: [
          "Oui, par impulsion forte pour ne perdre aucune matière",
          "Non, car cette quantité infime de liquide est formellement intégrée dans les calculs d'étalonnage 'ex' de l'outil",
          "Seulement si le liquide est corrosif",
          "Oui, en soufflant énergiquement avec la bouche"
        ],
        correctAnswer: 1,
        explanation: "Les pipettes jaugées de précision sont étalonnées par écoulement libre gravitationnel (calibrage 'ex'). La goutte résiduelle retenue par capillarité est prévue d'origine."
      },
      {
        question: "Quelle propriété moléculaire du soluté demeure inchangée au cours du processus de dilution ?",
        options: [
          "Sa concentration molaire apparente",
          "La structure chimique intrinsèque et la quantité de matière de ses molécules",
          "La densité globale volumique du mélange",
          "L'agitation thermodynamique moyenne"
        ],
        correctAnswer: 1,
        explanation: "Diluer n'introduit aucune modification chimique aux molécules constituant le soluté. Seule leur concentration spatiale au sein de la solution décline."
      },
      {
        question: "On prépare une fiole fille en prélevant 5,0 mL d'une fiole mère concentrée à Cm = 0,20 mol/L, ajustée à Vf = 100 mL. Que vaut Cf ?",
        options: [
          "0,010 mol/L",
          "0,020 mol/L",
          "0,040 mol/L",
          "0,001 mol/L"
        ],
        correctAnswer: 0,
        explanation: "F = Vf / Vm = 100 / 5 = 20. La solution fille est 20 fois diluée, Cf = Cm / F = 0,20 / 20 = 0,010 mol/L."
      },
      {
        question: "Quelle méthode préconise-t-on pour réaliser l'homogénéisation finale de la solution fille ?",
        options: [
          "Secouer très vigoureusement de gauche à droite fiole débouchée",
          "Boucher solidement la fiole jaugée, puis la renverser à plusieurs reprises lentement à 180 degrés",
          "Laisser reposer 24h sans y toucher",
          "Chauffer le bas de la fiole pour créer des courants de convection"
        ],
        correctAnswer: 1,
        explanation: "Le retournement répété de la fiole fermée permet d'équilibrer par gravité les fractions les plus concentrées et le solvant pur ajouté en surface."
      },
      {
        question: "Pourquoi est-il interdit d'employer de la verrerie jaugée ébréchée, rayée ou fêlée ?",
        options: [
          "Pour des questions exclusives de design et de style visuel",
          "Cela compromet l'étanchéité, fausse le volume étalonné exact, et expose l'expérimentateur à un éclatement de l'ustensile",
          "La solution perdrait sa couleur naturelle",
          "Le verre fêlé réagirait chimiquement avec l'eau distillée"
        ],
        correctAnswer: 1,
        explanation: "Le col ou la pointe fêlés de pipettes ou fioles fragilise l'outil sous la contrainte, augmentant les risques de coupures directes d'acide fort ou coupures de verre."
      },
      {
        question: "Si on dilue une solution mère par un facteur 5, et que le prélèvement initial est de Vm = 20 mL, quel volume Vf obtiendra-t-on ?",
        options: [
          "40 mL",
          "100 mL",
          "200 mL",
          "50 mL"
        ],
        correctAnswer: 1,
        explanation: "Puisque F = Vf / Vm = 5, on a Vf = F * Vm = 5 * 20 = 100 mL."
      },
      {
        question: "Dans les rapports expérimentaux, que signifient les lettres 'BPL' ?",
        options: [
          "Béchers en Plastique Souple",
          "Bonnes Pratiques de Laboratoire",
          "Burette de Précision Limitée",
          "Bassin de Pureté Liquide"
        ],
        correctAnswer: 1,
        explanation: "Les 'Bonnes Pratiques de Laboratoire' encadrent le travail expérimental pour s'assurer que les données soient exactes, traçables et manipulées en sécurité."
      },
      {
        question: "Pourquoi doit-on s'assurer que la fiole jaugée fille soit d'une propreté absolue ?",
        options: [
          "Pour réduire la résistance électrique de l'eau distillée",
          "Afin d'exclure toute contamination ou trace chimique antérieure susceptible de s'additionner et d'altérer la molarité fille Cf calculée",
          "Pour maintenir la température de la pièce constante",
          "Pour que le bouchon glisse sans frottement exagéré"
        ],
        correctAnswer: 1,
        explanation: "Toute impureté ou reste de TP antérieur dissous se mélangerait au volume d'eau ajouté, faussant la concentration réelle."
      },
      {
        question: "Quelle propriété physique doit caractériser un solvant employé pour réaliser une dilution de qualité ?",
        options: [
          "Il doit être extrêmement moussant et lourd",
          "Il doit être chimique neutre (inerte) et parfaitement miscible avec la solution d'origine",
          "Il doit s'évaporer rapidement sous vide d'air",
          "Il doit posséder d'importantes propriétés alcalines"
        ],
        correctAnswer: 1,
        explanation: "Pour atténuer la solvatation sans détruire l'équilibre redox ou pH du soluté, le solvant (le plus souvent l'eau distillée neutre) doit être inerte chimiquement."
      },
      {
        question: "Comment varie le volume équivalent Ve d'un titrage si l'on titre une solution qui a été diluée 10 fois au préalable ?",
        options: [
          "Le volume équivalent Ve reste rigoureusement identique",
          "Le volume équivalent Ve sera 10 fois inférieur, car il y a 10 fois moins de molécules de soluté par unité de volume",
          "Le volume équivalent Ve est multiplié par 10",
          "Le volume s'établit de façon totalement instable et non reproductible"
        ],
        correctAnswer: 1,
        explanation: "Comme le réactif à doser est 10 fois plus dilué, la quantité contenue dans le même volume prélevé est 10 fois plus faible. L'équivalence nécessite donc 10 fois moins de solution titrante."
      }
    ]
  },
  {
    id: '19',
    title: 'Détermination de l\'acidité d\'un jus de fruit',
    description: 'Titrage acido-basique de l\'acide citrique présent dans un jus de fruit (citron ou orange) par une solution étalon d\'hydroxyde de sodium (soude) afin de déterminer son acidité totale.',
    image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=2080&auto=format&fit=crop',
    category: 'Chimie analytique',
    level: '2ème Bac',
    difficulty: 'Intermédiaire',
    duration: '2h',
    setupImage: '/src/assets/images/acidity_measurement_setup_1781541809437.jpg',
    materials: ['Burette graduée de 25 mL', 'Pipette jaugée de 10 mL', 'Bécher de 100 mL', 'Agitateur magnétique et barreau aimanté', 'pH-mètre étalonné avec électrode combinée', 'Fiole jaugée de 100 mL (pour la dilution préliminaire)', 'Entonnoir d\'entrainement'],
    chemicals: ['Jus de citron frais pressé et soigneusement filtré', 'Solution d\'hydroxyde de sodium (NaOH) à 0,10 mol/L', 'Eau distillée', 'Solutions tampons d\'étalonnage (pH 4,01 et 7,00)', 'Solution de phénolphtaléine (indicateur coloré)'],
    chemicalTable: [
      { name: 'Hydroxyde de sodium', state: 'Solution aqueuse à 0,10 mol/L', hazards: 'H314, H290' },
      { name: 'Acide citrique (dans le jus)', state: 'Mélange naturel acide', hazards: 'N/A' },
      { name: 'Phénolphtaléine', state: 'Indicateur coloré liquide', hazards: 'H225, H350' }
    ],
    protocol: [
      'Filtration : Presser un citron frais et filtrer le jus obtenu sur du coton ou sur un filtre à café pour éliminer toute trace de pulpe ou d\'impuretés solides.',
      'Dilution préliminaire : Le jus extrait étant trop acide pour une burette classique, procéder à une dilution par 10 : prélever 10,0 mL de jus filtré à l\'aide d\'une pipette jaugée et compléter précisément à 100 mL dans une fiole jaugée avec de l\'eau distillée.',
      'Echantillonnage : Prélever exactement 10,0 mL de cette solution diluée et les verser dans un bécher de 100 mL propre.',
      'Burette : Rincer la burette avec la solution de soude (NaOH) à 0,10 mol/L, la remplir puis ajuster soigneusement au trait de zéro.',
      'Montage : Disposer le bécher sur l\'agitateur magnétique, insérer le barreau aimanté et installer le pH-mètre étalonné en veillant à tremper l\'électrode de verre sans gêner la rotation.',
      'Titrage pH-métrique : Verser la solution d\'hydroxyde de sodium mL par mL initialement, puis par pas de 0,2 mL autour du saut brusque de pH tout en notant la valeur stabilisée pour chaque volume.',
      'Titrage colorimétrique (vérification) : Refaire un dosage rapide en ajoutant 3 gouttes de phénolphtaléine ; l\'équivalence est marquée par un virage franc et persistant d\'incolore au rose pâle.',
      'Traitement : Déterminer le volume équivalent Vbe à l\'aide de la méthode des tangentes ou de la dérivée (dpH/dVb).',
      'Calculs finis : Déduire la concentration en acide citrique du jus en tenant compte du fait que l\'acide citrique est un triacide faible de formule C6H8O7.'
    ],
    hazards: ['La solution d\'hydroxyde de sodium est corrosive et attaque les tissus cutanés ou oculaires', 'La phénolphtaléine est une solution inflammable et classée potentiellement cancérogène'],
    precautions: ['Manipuler impérativement avec lunettes fermées de chimie, gants fins en nitrile et blouse boutonnée', 'Rincer immédiatement à l\'eau courante en cas de projection de soude', 'Garder le flacon d\'indicateur éloigné de toute étincelle ou flamme nue'],
    quiz: [
      {
        question: "Quelle est la formule brute de l'acide citrique, l'acide organique largement majoritaire dans le jus de citron ?",
        options: [
          "C6H8O7",
          "C2H4O2",
          "C6H12O6",
          "C4H6O6"
        ],
        correctAnswer: 0,
        explanation: "L'acide citrique est un acide tricarboxylique de formule semi-développée HOOC-CH2-C(OH)(COOH)-CH2-COOH, dont la formule brute est C6H8O7."
      },
      {
        question: "L'acide citrique est caractérisé chimiquement comme un :",
        options: [
          "Monoacide fort",
          "Triacide faible",
          "Diacide fort",
          "Monoacide faible"
        ],
        correctAnswer: 1,
        explanation: "L'acide citrique possède trois fonctions acide carboxylique séparables, chacune caractérisée par une constante d'acidité distincte. C'est un triacide faible."
      },
      {
        question: "Quelle est l'équation chimique équilibrée modélisant le dosage complet de l'acide citrique (noté H3A) par les ions hydroxyde ?",
        options: [
          "H3A + OH- -> H2A- + H2O",
          "H3A + 3OH- -> A3- + 3H2O",
          "H3A + H2O -> A3- + 3H3O+",
          "H3A + 3Na+ -> Na3A + 3H+"
        ],
        correctAnswer: 1,
        explanation: "Chaque molécule d'acide citrique H3A réagit avec 3 ions hydroxyde HO- de la soude de façon totale pour former de l'eau et l'ion citrate A3-."
      },
      {
        question: "Quelle relation stœchiométrique relie la quantité d'acide citrique initiale (n_acide) à celle de soude versée à l'équivalence (n_soude) ?",
        options: [
          "n_soude = n_acide",
          "n_soude = 3 * n_acide",
          "3 * n_soude = n_acide",
          "n_soude = n_acide / 3"
        ],
        correctAnswer: 1,
        explanation: "D'après les coefficients de l'équation équilibrée, il faut 3 moles d'ions HO- pour neutraliser 1 mole d'acide citrique. À l'équivalence, on a donc : n_soude(versé) = 3 * n_acide(initial danc le bécher)."
      },
      {
        question: "Pour quelle raison pratique dilue-t-on généralement le jus de fruit frais par un facteur 10 avant le titrage ?",
        options: [
          "Pour réduire l'acidité globale, ce qui permet d'obtenir un saut de pH net et d'éviter de vider plusieurs burettes entières de base",
          "Pour purifier l'acide de ses molécules de fructose",
          "Pour élever artificiellement le pKa des fonctions acides",
          "Pour désactiver la conductivité électrique parasite"
        ],
        correctAnswer: 0,
        explanation: "Le jus de citron brut est très concentré en acide citrique (~0,3 mol/L). Sans dilution, il faudrait verser plus de 30 mL de soude de concentration usuelle, ce qui dépasserait la capacité de la burette standard."
      },
      {
        question: "Quel indicateur coloré convient le mieux pour ce titrage colorimétrique (le pH à l'équivalence se situant vers 8,3) ?",
        options: [
          "Hélianthine (zone de virage : 3,1 - 4,4)",
          "Bleu de bromothymol (zone de virage : 6,0 - 7,6)",
          "Phénolphtaléine (zone de virage : 8,2 - 10,0)",
          "Rouge de méthyle (zone de virage : 4,2 - 6,2)"
        ],
        correctAnswer: 2,
        explanation: "L'indicateur coloré idéal pour un titrage acido-basique doit avoir sa zone de virage qui englobe le pH à l'équivalence. Pour un acide faible titré par une base forte, l'équivalence est basique (pH ≈ 8,3), la phénolphtaléine est parfaite."
      },
      {
        question: "Quel changement visuel caractéristique marque l'apparition de l'équivalence avec la phénolphtaléine ?",
        options: [
          "La solution passe instantanément du bleu intense au jaune vif",
          "La solution incolore vire au rose pâle persistant pendant au moins 30 secondes",
          "L'apparition d'un solide blanc laiteux au fond du récipient",
          "La décoloration totale d'une solution initialement rouge sang"
        ],
        correctAnswer: 1,
        explanation: "La phénolphtaléine est rigoureusement incolore sous un pH de 8,2, puis vire au rose fuchsia au-delà. À l'équivalence, l'ajout d'une goutte excédentaire fait franchir cette frontière."
      },
      {
        question: "Quelle méthode visuelle classique utilise-t-on sur le graphe pH = f(Vb) pour situer le point d'équivalence ?",
        options: [
          "La méthode des tangentes parallèles",
          "L'interpolation linéaire des rectangles",
          "La méthode des moindres carrés pondérés",
          "La méthode des asymptotes hyperboliques"
        ],
        correctAnswer: 0,
        explanation: "La méthode des tangentes parallèles permet graphiquement de repérer le centre de symétrie de la courbe pH-métrique, qui coïncide avec le point d'équivalence."
      },
      {
        question: "Si l'on exploite la dérivée dpH/dVb pour repérer l'équivalence, que cherche-t-on sur la courbe dérivée ?",
        options: [
          "Le croisement exact avec l'axe des abscisses",
          "Le maximum ou extremum de la courbe dérivée, qui correspond au point d'inflexion du pH",
          "Une longue portion horizontale de pente nulle",
          "Un minimum inférieur à zéro"
        ],
        correctAnswer: 1,
        explanation: "La courbe dérivée dpH/dVb présente un pic prononcé là où la vitesse de variation du pH est maximale, c'est-à-dire précisément au point d'inflexion à l'équivalence."
      },
      {
        question: "Combien de pKa distincts possède théoriquement l'acide citrique ?",
        options: [
          "Un seul unique de valeur 4,8",
          "Deux pKa corrélés aux fonctions alcools",
          "Trois pKa distincts (respectivement 3,1 ; 4,8 et 6,4)",
          "Quatre pKa basiques"
        ],
        correctAnswer: 2,
        explanation: "En tant que triacide, l'acide citrique possède trois groupements carboxyle (-COOH) qui libèrent successivement leurs protons. Les pKa associés sont 3,1, 4,8 et 6,4."
      },
      {
        question: "Pourquoi n'observe-t-on pas trois sauts de pH séparés lors du titrage pH-métrique de l'acide citrique ?",
        options: [
          "Parce que les valeurs des pKa sont trop rapprochées, ce qui se traduit par des neutralisations simultanées et fusionnées en un unique saut global de pH",
          "Parce que la soude détruit les trois protons instantanément en un seul choc moléculaire",
          "En raison de l'agitation magnétique trop vive",
          "À cause de l'isomérie optique du sel neutre"
        ],
        correctAnswer: 0,
        explanation: "Pour observer des sauts de pH distincts, l'écart entre les pKa successifs doit être supérieur à environ 4 unités. Ici, les valeurs (3,1 ; 4,8 ; 6,4) sont trop proches, l'acide est dosé globalement."
      },
      {
        question: "Quel est l'intérêt d'effectuer une filtration rigoureuse du jus de fruit pressé avant la dilution ?",
        options: [
          "Extraire la vitamine C solide",
          "Éliminer les fibres et la pulpe pour éviter d'entraver la cinétique chimique, d'encrasser le diaphragme poreux de l'électrode et de brouiller l'appréciation colorimétrique",
          "Évaporer les gaz d'acide carbonique dissous",
          "Concentrer l'acide citrique libre"
        ],
        correctAnswer: 1,
        explanation: "La pulpe en suspension altère la clarté visuelle et peut encrasser l'électrode de pH à membrane poreuse, créant des instabilités de lecture et faussant la détection colorée."
      },
      {
        question: "Une solution de jus de fruit pure est caractérisée par quel domaine de pH ?",
        options: [
          "Neutre (pH = 7,00)",
          "Fortement acide (pH compris entre 2,0 et 3,0)",
          "Basique (pH supérieur à 9,00)",
          "Légèrement alcalin (pH = 8,15)"
        ],
        correctAnswer: 1,
        explanation: "Le jus de citron brut contient une concentration significative d'acides organiques (acide citrique et tartrique), conférant un pH très acide situé entre 2 et 3."
      },
      {
        question: "Qu'est-ce qu'une solution tampon, telle que celles employées pour calibrer l'instrument ?",
        options: [
          "Une solution aqueuse dont le pH demeure stable lors d'un ajout limité d'acide ou de base, ou lors d'une dilution",
          "Une solution hautement corrosive réservée à la gravure sur verre",
          "Une eau déminéralisée neutre exempte de sels dissous",
          "Un solvant ininflammable qui dissout les matières plastiques"
        ],
        correctAnswer: 0,
        explanation: "Une solution tampon limite les variations de pH face à des perturbations extérieures acides, basiques ou de concentration, fournissant des références fiables pour l'étalonnage du pH-mètre."
      },
      {
        question: "Si le volume équivalent relevé pour V = 10,0 mL de jus dilué par 10 est Vbe = 9,0 mL de NaOH à 0,10 mol/L, quelle est la quantité de matière d'ions OH- ayant réagi à l'équivalence ?",
        options: [
          "9,0 * 10^-4 mol",
          "9,0 * 10^-3 mol",
          "0,90 mol",
          "90,0 mol"
        ],
        correctAnswer: 0,
        explanation: "La quantité d'ions OH- introduits à l'équivalence est donnée par n(OH-) = C(NaOH) * Vbe = 0,10 * 0,0090 = 9,0 * 10^-4 moles."
      },
      {
        question: "D'après la relation stœchiométrique du triacide, déterminez la concentration en acide citrique libre du jus de citron filtré d'origine (en prenant en compte le facteur de dilution de 10) :",
        options: [
          "0,30 mol/L",
          "0,03 mol/L",
          "0,90 mol/L",
          "0,09 mol/L"
        ],
        correctAnswer: 0,
        explanation: "Dans le bécher dosé, n_acide = n_soude / 3 = 9.0e-4 / 3 = 3.0e-4 mol. Donc la concentration diluée est C_diluée = 3.0e-4 / 0,010 = 0,030 mol/L. La concentration finale du jus brut d'origine (10 fois plus concentré) est 0,030 * 10 = 0,30 mol/L."
      },
      {
        question: "Que se passerait-il si l'on étalonnait le pH-mètre uniquement avec de l'eau distillée du laboratoire ?",
        options: [
          "Les mesures resteraient précises",
          "C'est techniquement impossible, car le calibrage exige d'entrer les tensions de référence de deux pH fixes mémorisés (généralement 4,01 et 7,00) pour modéliser la droite électrochimique d'intensité",
          "L'électrode du pH-mètre exploserait sous l'action du courant de fuite",
          "La valeur du pH affichée serait toujours inversée"
        ],
        correctAnswer: 1,
        explanation: "Le pH-mètre mesure une différence de potentiel électromécanique traduisant une variation logarithmique de [H+]. L'appareil a besoin de deux points fixes tampons pour calculer la pente et l'origine de l'électrode."
      },
      {
        question: "Quel instrument de verrerie classique de laboratoire permet de prélever précisément les 10,0 mL de jus dilué ?",
        options: [
          "Un bécher gradué de précision moyenne",
          "Une éprouvette graduée en polymère inerte",
          "Une pipette jaugée à un ou deux traits munie d'une poire d'aspiration",
          "Une fiole jaugée de 100 mL renversée"
        ],
        correctAnswer: 2,
        explanation: "Le prélèvement du volume à titrer (le réactif titré) exige une précision analytique absolue. On se sert impérativement d'une pipette jaugée munie d'un système d'aspiration sécurisé."
      },
      {
        question: "Pourquoi l'agitation magnétique continue du mélange liquide est-elle capitale pendant toute la durée du versement de la soude ?",
        options: [
          "Pour chauffer la solution par friction mécanique",
          "Pour homogénéiser instantanément le pH et éviter les surconcentrations temporaires de soude locale qui fausseraient la mesure",
          "Pour forcer l'évaporation de l'eau en excès",
          "Pour recharger de manière statique le potentiel de l'électrode"
        ],
        correctAnswer: 1,
        explanation: "L'agitation régulière évite que le pH à proximité immédiate de l'introducteur ne s'envole prématurément, assurant que la mesure pH-métrique ou le virage de couleur reflète le mélange tout entier."
      },
      {
        question: "Dans le secteur agroalimentaire, qu'indique la détermination quantitative de l'acidité totale d'un jus ?",
        options: [
          "Elle permet d'évaluer la qualité organoleptique (fraîcheur, maturité) du fruit et de contrôler la conformité aux normes réglementaires de commercialisation",
          "Elle mesure la vitesse d'altération du plastique d'emballage",
          "Elle quantifie la teneur totale en colorants de synthèse",
          "Elle reflète la dureté de l'eau insérée pour laver les fruits"
        ],
        correctAnswer: 0,
        explanation: "L'acidité d'un jus est un marqueur fort de la maturité des fruits récoltés. Elle permet aux industriels de vérifier le bon taux de sucre/acide garantissant le goût des produits."
      }
    ]
  },
  {
    id: '20',
    title: 'Contrôle de la qualité de l\'eau — Dosage de la dureté',
    description: 'Détermination de la dureté calcaire totale de l\'eau (Titre Hydrotimétrique TH) par dosage complexométrique des ions calcium (Ca2+) et magnésium (Mg2+) à l\'aide de l\'EDTA.',
    image: '/src/assets/images/water_hardness_bottle_1781545052022.jpg',
    category: 'Chimie analytique',
    level: '2ème Bac',
    difficulty: 'Avancé',
    duration: '2h',
    videoUrl: 'https://www.youtube.com/embed/mzJ96CM7YrA',
    afterQuizImage: '/src/assets/images/water_hardness_titration_setup_1781543537847.jpg',
    materials: ['Burette graduée de 25 mL', 'Pipette jaugée de 20 mL', 'Erlenmeyer ou bécher de 150 mL', 'Agitateur magnétique et turbillon', 'Aspirateur de pipette (propipette)'],
    chemicals: ['Solution de sel disodique d\'EDTA à 0,010 mol/L (solution titrante)', 'Solution de Noir Ériochrome T (NET) liquide ou broyé avec NaCl (indicateur métallique)', 'Solution tampon ammoniacale (pH = 10)', 'Échantillon d\'eau minérale de dureté inconnue ou eau du robinet'],
    chemicalTable: [
      { name: 'EDTA (sel disodique)', state: 'Solution limpide à 0,010 mol/L', hazards: 'H319' },
      { name: 'Tampon ammoniacale (pH 10)', state: 'Solution odorante et basique', hazards: 'H314, H335, H411' },
      { name: 'Noir Ériochrome T', state: 'Indicateur solide mélangé', hazards: 'H319' }
    ],
    protocol: [
      'Remplissage : Rincer la burette avec la solution d\'EDTA à 0,010 mol/L, la remplir et ajuster au zéro avec soin.',
      'Mesure : Prélever exactement 20,0 mL d\'échantillon d\'eau à titrer à l\'aide d\'une pipette jaugée propre et les disposer dans un bécher.',
      'Régulation pH : Ajouter 2 mL de solution tampon ammoniacale. Vérifier à l\'aide de papier pH que le pH s\'établit précisément à 10.',
      'Indicateur : Ajouter une pincée ténue de Noir Ériochrome T pulvérulent ou 3 gouttes de sa solution. La couleur de l\'eau prend immédiatement une coloration rose-violette ou rouge vinacée.',
      'Titrage complexométrique : Verser lentement l\'EDTA depuis la burette tout en maintenant une agitation magnétique régulière.',
      'Observation : La persistance de la couleur rose foncée s\'atténue à l\'approche de la fin de la réaction de complexation.',
      'Repérage de l\'équivalence : Déterminer précisément l\'équivalence lorsque la couleur vire brusquement du rose/violet vers un bleu outremer franc exempt de toute nuance violette.',
      'Calcul : Noter le volume équivalent Ve d\'EDTA consommé et calculer instantanément le Titre Hydrotimétrique (TH) de l\'eau exprimé en degrés français (°F).'
    ],
    hazards: ['La solution tampon ammoniacale concentrée irrite fortement les voies respiratoires et pique la peau', 'L\'EDTA en solution est irritant oculaire'],
    precautions: ['Manipuler la solution tampon ammoniacale sous une hotte aspirante bien ventilée', 'Porter lunettes enveloppantes, blouse et gants de protection', 'Ne jamais respirer directement le goulot du tampon'],
    quiz: [
      {
        question: "Qu'indique précisément le Titre Hydrotimétrique (TH) d'une eau ?",
        options: [
          "La teneur globale de l'eau en ions chlorures et sodium",
          "La concentration totale en ions divalents calcium Ca2+ et magnésium Mg2+",
          "La quantité totale de matière de micro-organismes vivants",
          "La tension superficielle de l'eau pure"
        ],
        correctAnswer: 1,
        explanation: "Le Titre Hydrotimétrique (TH) mesure la dureté calcaire totale de l'eau, définie par la concentration totale d'ions carbonates ou sulfates de calcium et de magnésium."
      },
      {
        question: "Quelle est l'équivalence conventionnelle d'un degré de dureté français (°F) ?",
        options: [
          "1 °F = 1,0 mol/L de calcaire actif",
          "1 °F = 10^-4 mol/L d'ions magnésium ou calcium divalents (soit 10 mg/L de CaCO3)",
          "1 °F = 1 gramme de sel pour 10 Litres d'eau courante",
          "1 °F = pH 10 exact"
        ],
        correctAnswer: 1,
        explanation: "Par convention, un degré de dureté français (°F) correspond à une concentration de 10^-4 mol/L d'ions Ca2+ ou Mg2+, ou encore de carbonates équivalents."
      },
      {
        question: "Quelle est la nature chimique fondamentale de l'EDTA, le réactif de titrage utilisé ?",
        options: [
          "Un sel basique de l'acide éthylènediaminetétraacétique, ligand polydenté formant des chélates",
          "Un solvant organique inerte non hydrophile",
          "Un indicateur métallique coloré photosensible",
          "Un mélange de tensioactifs naturels"
        ],
        correctAnswer: 0,
        explanation: "L'EDTA est l'acide éthylènediaminetétraacétique. C'est un ligand hexadenté exceptionnel qui enveloppe les ions métalliques en formant des chélates cycliques très stables."
      },
      {
        question: "Quel rôle thermodynamique joue la réaction chimique exploitée au cours de ce titrage ?",
        options: [
          "C'est une réaction d'oxydoréduction spontanée avec transfert d'oxygène",
          "C'est une réaction acide-base de bronsted pure",
          "C'est une réaction de complexation hautement stable dans un rapport de stœchiométrie 1:1",
          "C'est une transformation forcée exigeant un courant continu de tension"
        ],
        correctAnswer: 2,
        explanation: "L'ion métallique Ca2+ ou Mg2+ joue le rôle d'accepteur d'électrons (acide de Lewis) et réagit avec le donneur de doublets EDTA (ligand) pour donner un complexe neutre stable 1 pour 1."
      },
      {
        question: "Pourquoi est-il crucial d'ajouter un milieu tampon ammoniaque de pH = 10 précis avant de verser l'EDTA ?",
        options: [
          "Pour empêcher l'évaporation de l'eau minérale",
          "Pour s'assurer que l'EDTA se trouve entièrement sous sa forme protonée inactive",
          "Parce que la formation de chélates de calcium et magnésium est optimale et stable uniquement à ce pH basique, garantissant la déprotonation totale de l'EDTA",
          "Pour désinfecter l'échantillon d'eau prélevé"
        ],
        correctAnswer: 2,
        explanation: "L'EDTA libère des protons lors de la complexation. Pour que la réaction soit complète et stable, un pH basique et stable à 10 est requis pour neutraliser ces H+ et maintenir les ions complexes stables."
      },
      {
        question: "Quelle est la coloration de la solution contenant le Noir Ériochrome T (NET) en présence de magnésium libre avant l'équivalence ?",
        options: [
          "Bleu limpide outremer",
          "Rose fuchsia / Rouge violacé",
          "Incolore transparente",
          "Jaune vif fluorescent"
        ],
        correctAnswer: 1,
        explanation: "À pH=10, l'indicateur NET sous sa forme complexée transitoire avec les ions magnésium Mg2+ possède une belle teinte rouge vinacée ou rose-violette."
      },
      {
        question: "Pourquoi la couleur vire-t-elle brusquement au bleu pur après le point d'équivalence ?",
        options: [
          "Parce que l'excès d'EDTA se colore en bleu sous l'agitation",
          "Car l'EDTA détruit l'indicateur par déshydratation",
          "Parce que l'EDTA, s'associant encore plus fortement aux métaux, leur arrache le NET. L'indicateur libre revient à sa couleur originelle qui est le bleu franc à pH 10",
          "Sous l'action d'une baisse dramatique du pH"
        ],
        correctAnswer: 2,
        explanation: "La constante de stabilité du complexe métal-EDTA est supérieure à celle de métal-NET. L'EDTA capte les ions liés au NET. À l'équivalence, tout le NET est libéré sous sa forme naturelle qui est bleue."
      },
      {
        question: "Quel cation métallique parmi Ca2+ et Mg2+ est le premier complexé par l'EDTA au cours du dosage ?",
        options: [
          "Le calcium Ca2+, car la constante Km de son complexe de coordination avec l'EDTA est plus élevée que celle du magnésium",
          "Le magnésium Mg2+, car il est plus petit",
          "Les deux cations indifféremment et de façon chaotique",
          "L'ion fer III contaminant"
        ],
        correctAnswer: 0,
        explanation: "Le complexe Ca-EDTA est thermodynamiquement plus stable (log K = 10,7) que le complexe Mg-EDTA (log K = 8,7). Le calcium réagit donc en premier."
      },
      {
        question: "Si l'on évalue un échantillon d'eau dont le TH mesuré vaut 32 degrés français, comment la classifie-t-on ?",
        options: [
          "Eau extrêmement douce, pauvre en minéraux",
          "Eau dure ou très calcaire",
          "Eau pure déminéralisée",
          "Eau thermale salée et corrosive"
        ],
        correctAnswer: 1,
        explanation: "Une eau possédant un TH supérieur à 30 °F est jugée comme calcaire ou dure. Elle génère du tartre lors du chauffage et nuit au fonctionnement des appareils."
      },
      {
        question: "Si le TH de l'eau collectée s'établit à 6 degrés français, que peut-on en déduire ?",
        options: [
          "C'est une eau très douce, peu calcaire, agréable pour la peau mais potentiellement agressive pour les canalisations métalliques",
          "L'eau est totalement impropre à la consommation",
          "Elle est saturée de calcaire",
          "Elle contient du fer radioactif"
        ],
        correctAnswer: 0,
        explanation: "Une dureté inférieure à 10 °F traduit une eau douce. Elle mousse facilement mais l'absence de dépôt protecteur de carbonate favorise la corrosion des métaux."
      },
      {
        question: "Quel est l'impact majeur à chaud de l'usage d'une eau dure (calcaire) dans l'habitation ?",
        options: [
          "Elle gèle à une température positive élevée",
          "Elle provoque un entartrage des résistances chauffantes par dépôt insoluble de carbonate de calcium",
          "Elle corrode instantanément le PVC",
          "Elle empêche d'obtenir une eau bouillante"
        ],
        correctAnswer: 1,
        explanation: "Dû à l'équilibre calco-carbonique, la solubilité du calcaire baisse à chaud, précipitant sous forme de carbonate de calcium rugueux insoluble appelé tartre."
      },
      {
        question: "Pour doser exclusivement les ions Ca2+ au laboratoire sans intégrer le magnésium, quel artifice de pH choisit-on ?",
        options: [
          "On abaisse le pH à 2,0 à l'aide d'acide chlorhydrique fort",
          "On fait précipiter le magnésium sous forme d'hydroxyde insoluble Mg(OH)2 en élevant très fortement le pH (pH > 12) par ajout de soude",
          "On congèle l'échantillon d'eau",
          "On utilise un agitateur en quartz poli"
        ],
        correctAnswer: 1,
        explanation: "En élevant le pH au-dessus de 12 avec de l'hydroxyde de sodium, l'ion magnésium précipite en Mg(OH)2 insoluble. Il ne participe plus à la complexation avec l'EDTA."
      },
      {
        question: "Quel indicateur de fin de réaction spécifique emploie-t-on lors du dosage exclusif du seul calcium à pH supérieur à 12 ?",
        options: [
          "La murexide (ou indicateur de Patton et Reeder)",
          "Le bleu de bromothymol",
          "La phénolphtaléine",
          "L'empois d'amidon concentré"
        ],
        correctAnswer: 0,
        explanation: "À pH > 12, le NET ne convient pas. On recourt à la murexide, un indicateur métallique spécifique du calcium qui passe d'une teinte rouge violacée à violette."
      },
      {
        question: "Si l'on titre un échantillon de V = 20,0 mL d'eau avec de l'EDTA à 0,010 mol/L et que le volume équivalent vaut Ve = 8,0 mL, déterminez la concentration en cations divalents :",
        options: [
          "4,0 * 10^-3 mol/L",
          "8,0 * 10^-3 mol/L",
          "2,0 * 10^-3 mol/L",
          "4,0 mol/L"
        ],
        correctAnswer: 0,
        explanation: "À l'équivalence de complexation 1:1, on a : C_[ions] * V_eau = C_EDTA * Ve. Donc C_[ions] = 0,010 * 8,0 / 20,0 = 4,0 * 10^-3 mol/L."
      },
      {
        question: "En utilisant la proportion de calcul officielle, quel est le Titre Hydrotimétrique (TH) en degrés français de l'eau analysée dans la question précédente ?",
        options: [
          "4 °F",
          "40 °F",
          "20 °F",
          "8 °F"
        ],
        correctAnswer: 1,
        explanation: "La dureté correspond à la concentration divisée par 10^-4. On a [ions] = 4,0 * 10^-3 mol/L, ce qui donne un TH de 4,0 * 10^-3 / 10^-4 = 40 °F."
      },
      {
        question: "Le dépôt solide blanc ou grisâtre que l'on retrouve au fond des appareils ménagers est constitué de :",
        options: [
          "Fluorure de sodium",
          "Sulfate de magnésium",
          "Carbonate de calcium (CaCO3)",
          "Gel d'hydroxyde d'argent"
        ],
        correctAnswer: 2,
        explanation: "Le tartre calcaire est chimiquement désigné sous la forme de carbonate de calcium solide cristallisé CaCO3."
      },
      {
        question: "Quelle méthode physique simple et non destructive permet de suivre la déminéralisation ou le taux d'ions de l'eau en cours de dosage ?",
        options: [
          "La conductimétrie, en mesurant la conductivité de la solution en continu",
          "La viscosimétrie capillaire",
          "La calorimétrie adiabatique",
          "La chromatographie par perméation de gel"
        ],
        correctAnswer: 0,
        explanation: "Les ions en solution conduisent le courant électrique. Suivre la conductivité de l'eau en continu permet de tracer et suivre l'évolution ionique lors du titrage."
      },
      {
        question: "De quelle manière l'excès de tartre et d'eau calcaire affecte-t-il la conductivité thermique et la facture énergétique des foyers ?",
        options: [
          "Le calcaire conduit mieux la chaleur",
          "Le tartre étant un excellent isolant thermique, son dépôt sur les résistances augmente considérablement la consommation électrique requise pour chauffer l'eau",
          "Il rafraîchit l'eau",
          "Il diminue la consommation de courant"
        ],
        correctAnswer: 1,
        explanation: "Le carbonate de calcium conduit très mal la chaleur. Un dépôt de calcaire oblige la résistance électrique à surchauffer, ce qui dégrade l'appareil et accroît la consommation énergétique."
      },
      {
        question: "Quel appareil ménager est installé sur l'arrivée d'eau pour adoucir une eau trop calcaire ?",
        options: [
          "Un osmoseur inverse",
          "Un adoucisseur à résine échangeuse d'ions (remplaçant les ions Ca2+/Mg2+ par des ions sodium Na+)",
          "Un distillateur à colonne de Vigreux",
          "Un vase d'expansion"
        ],
        correctAnswer: 1,
        explanation: "L'adoucisseur domestique utilise des résines garnies d'ions sodium (Na+). Au passage de l'eau calcaire, ces résines fixent Ca2+ et Mg2+ et libèrent Na+, éliminant la dureté sans détruire le débit."
      },
      {
        question: "Pourquoi est-il déconseillé d'adoucir totalement une eau de consommation destinée à la boisson courante (TH proche de 0 °F) ?",
        options: [
          "Elle devient colorée en violet",
          "L'absence totale d'ions calcium et magnésium est mauvaise pour la santé (carences osseuses) et rend l'eau corrosive pour les métaux des tuyaux",
          "Elle perd tout pouvoir d'hydratation",
          "L'eau prend un arôme amer insupportable"
        ],
        correctAnswer: 1,
        explanation: "L'eau potable doit conserver au moins une dureté résiduelle (entre 8 et 15 °F) pour les apports minéraux osseux nécessaires et pour prévenir toute attaque agressive sur les tuyauteries."
      }
    ]
  }
];

export const SDS_DATA: SDSMaterial[] = [
  {
    id: 'hcl',
    name: 'Acide chlorhydrique',
    fullName: 'Acide chlorhydrique (HCl)',
    formula: 'HCl',
    molarMass: '36.46 g/mol',
    physicalState: 'Liquide (solution aqueuse)',
    meltingPoint: '-30 °C (solution 37%)',
    commonNames: ['Esprit de sel', 'Acide muriatique'],
    ph: '< 1',
    density: '1.18 g/cm³ (pour 37%)',
    boilingPoint: '48 °C (pour 37%)',
    appearance: 'Liquide incolore à jaunâtre, odeur piquante',
    safetyPictograms: ['ghs05', 'ghs07'],
    signalWord: 'Danger',
    hStatements: [
      'H290 : Peut être corrosif pour les métaux',
      'H314 : Provoque de graves brûlures de la peau et des lésions oculaires graves',
      'H335 : Peut irriter les voies respiratoires'
    ],
    pStatements: [
      'P260 : Ne pas respirer les vapeurs',
      'P280 : Porter des gants de protection/des vêtements de protection/un équipement de protection des yeux/du visage',
      'P303+P361+P353 : EN CAS DE CONTACT AVEC LA PEAU : Enlever immédiatement tous les vêtements contaminés. Rincer la peau à l\'eau'
    ],
    healthHazards: ['Corrosion cutanée', 'Lésions oculaires graves', 'Toxicité respiratoire'],
    ppeRequired: ['Blouse en coton', 'Gants en nitrile ou PVC', 'Lunettes de protection étanches'],
    firstAid: [
      'Inhalation : Transporter la personne à l\'air frais. Consulter un médecin en cas de malaise.',
      'Peau : Rincer immédiatement et abondamment à l\'eau pendant au moins 15 minutes.',
      'Yeux : Rincer avec précaution à l\'eau pendant plusieurs minutes. Consulter un ophtalmologiste.',
      'Ingestion : Rincer la bouche. NE PAS faire vomir. Appeler immédiatement un centre antipoison.'
    ],
    storageConditions: 'Conserver dans un endroit frais, sec, à l\'abri du soleil et très bien ventilé. Stocker dans des récipients d\'origine en matière plastique résistante aux acides (PEHD). Tenir à l\'écart des bases fortes, des métaux et des matières comburantes.',
    qrCodeUrl: '', // Will be generated dynamically in component for better accuracy
    quiz: [
      { question: 'Pourquoi la formation de "fumées blanches" au-dessus d\'un flacon de HCl concentré est-elle particulièrement dangereuse pour les yeux et les poumons ?', options: ['C\'est de la vapeur d\'eau inoffensive', 'C\'est du chlorure d\'hydrogène gazeux qui forme instantanément de l\'acide chlorhydrique au contact de l\'humidité des muqueuses', 'C\'est de l\'azote'], correctAnswer: 1 },
      { question: 'Quel gaz extrêmement inflammable et explosif est produit lorsque le HCl réagit avec des métaux tels que le zinc ou le magnésium ?', options: ['Le dioxyde de carbone (CO2)', 'Le dihydrogène (H2)', 'Le dichlore (Cl2)'], correctAnswer: 1 },
      { question: 'En cas de déversement de HCl concentré, pourquoi le bicarbonate de sodium est-il préféré à la soude pour la neutralisation ?', options: ['Il est plus joli', 'Sa réaction est moins violente et il agit comme un tampon amphotère limitant les projections exothermiques', 'Il ne réagit pas'], correctAnswer: 1 },
      { question: 'Pourquoi ne doit-on jamais mélanger HCl avec de l\'eau de Javel au laboratoire ?', options: ['Cela annule le pouvoir nettoyant', 'Cela provoque un dégagement de dichlore (Cl2), un gaz jaune-vert hautement toxique et mortel', 'Cela produit de l\'oxygène explosif'], correctAnswer: 1 },
      { question: 'H314 (Corrosion cutanée) implique quel type de lésion immédiate ?', options: ['Une simple rougeur', 'Des brûlures graves et des lésions oculaires irréversibles par destruction chimique des tissus', 'Une démangeaison'], correctAnswer: 1 },
      { question: 'Quelle est la mesure technique impérative imposée par la mention H335 (Irritation des voies respiratoires) ?', options: ['Aérer la pièce simplement', 'Manipulation obligatoire sous hotte aspirante avec une vitesse d\'air contrôlée', 'Porter un masque en papier'], correctAnswer: 1 },
      { question: 'Quel matériau de gant possède le meilleur temps de percée face au HCl concentré ?', options: ['Latex fin', 'Nitrile ou PVC épais (plus de 0.4mm)', 'Coton'], correctAnswer: 1 },
      { question: 'Quelle est la procédure de stockage correcte pour le HCl par rapport aux substances comburantes ?', options: ['Stockage commun autorisé', 'Incompatible, ils doivent être séparés physiquement pour éviter des réactions violentes en cas de fuite', 'Peu importe'], correctAnswer: 1 },
      { question: 'En cas de projection de HCl dans les yeux, quelle est la durée minimale recommandée pour le rinçage au lave-oeil ?', options: ['2 minutes', '15 à 20 minutes minimum suivies d\'une consultation médicale d\'urgence', 'Jusqu\'à ce qu\'on voie clair'], correctAnswer: 1 },
      { question: 'Lors de la dilution du HCl, quelle est la règle d\'or de sécurité ?', options: ['Verser l\'eau dans l\'acide', 'Verser l\'acide dans l\'eau doucement pour limiter l\'échauffement et les projections', 'Mélanger d\'un coup'], correctAnswer: 1 }
    ]
  },
  {
    id: 'naoh',
    name: 'Hydroxyde de sodium',
    fullName: 'Hydroxyde de sodium (NaOH)',
    formula: 'NaOH',
    molarMass: '40.00 g/mol',
    physicalState: 'Solide (pastilles) ou Liquide (solution)',
    meltingPoint: '318 °C (pur)',
    commonNames: ['Soude caustique'],
    ph: '14',
    appearance: 'Solide blanc ou liquide visqueux',
    safetyPictograms: ['ghs05'],
    signalWord: 'Danger',
    hStatements: [
      'H290 : Peut être corrosif pour les métaux',
      'H314 : Provoque de graves brûlures de la peau et des lésions oculaires graves'
    ],
    pStatements: [
      'P280 : Porter des gants de protection/des vêtements de protection/un équipement de protection des yeux/du visage',
      'P305+P351+P338 : EN CAS DE CONTACT AVEC LES YEUX : Rincer avec précaution à l\'eau pendant plusieurs minutes'
    ],
    healthHazards: ['Destruction tissus profonds', 'Cécité', 'Saponification des graisses cutanées'],
    ppeRequired: ['Blouse en coton', 'Gants en nitrile (protection contre projections)', 'Lunettes de protection enveloppantes'],
    firstAid: [
      'Yeux : Rincer immédiatement et abondamment à l\'eau tiède pendant 20 minutes minimum.',
      'Peau : Retirer les vêtements contaminés. Laver abondamment à l\'eau.',
      'Ingestion : Rincer la bouche. NE PAS faire vomir. Boire un peu d\'eau.'
    ],
    storageConditions: 'Conserver dans un emballage hermétiquement clos (très hygroscopique et absorbe le CO₂ de l\'air). Conserver dans un endroit frais et sec sous clé. Éviter d\'utiliser des flacons munis de bouchons en verre dépoli (risque de soudage permanent). Tenir séparé des acides forts, des métaux (aluminium, zinc) et des emballages en verre fragiles.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Soude (NaOH)\nPICTOS: GHS05\nPHRASES H: H290, H314\nPHRASES P: P280, P305+P351+P338\nEPI: Blouse, Gants Nitrille, Lunettes\nSECOURS: Rincer abondamment 20min.\nNOTE: Provoque des brûlures profondes.")}`,
    quiz: [
      { question: 'Quel type de lésion tissulaire la soude (NaOH) provoque-t-elle spécifiquement sur la peau ou les yeux ?', options: ['Une brûlure acide superficielle', 'Une nécrose de liquéfaction (pénétration profonde et continue par saponification des graisses)', 'Une simple irritation'], correctAnswer: 1 },
      { question: 'Pourquoi la sensation au toucher d\'une solution de soude est-elle "savonneuse" ?', options: ['Le produit contient du savon', 'Elle saponifie instantanément les lipides de votre peau dégradant les tissus', 'Elle est très propre'], correctAnswer: 1 },
      { question: 'Pourquoi le NaOH réagit-il de manière extrêmement dangereuse avec l\'aluminium ou le zinc ?', options: ['Il les fait fondre par chaleur', 'Il produit du dihydrogène (H2), gaz hautement explosif et inflammable', 'Il les ramollit'], correctAnswer: 1 },
      { question: 'Que signifie le caractère "exothermique" lors de la dissolution de NaOH solide dans l\'eau ?', options: ['Le mélange refroidit', 'Le dégagement de chaleur est tel qu\'il peut provoquer l\'ébullition locale et des projections basiques', 'Il n\'y a pas de changement'], correctAnswer: 1 },
      { question: 'Pourquoi doit-on rincer très longuement (20 min min.) une projection de soude sur la peau ?', options: ['Pour refroidir la peau', 'Pour stopper la pénétration profonde de la base qui continue d\'agir même après un rinçage court', 'Pour enlever l\'odeur'], correctAnswer: 1 },
      { question: 'Quelle est l\'incompatibilité majeure de stockage pour NaOH vis-à-vis du verre ?', options: ['Il colore le verre en bleu', 'Il attaque le verre (silice) et peut souder les bouchons en verre dépoli de manière permanente', 'Aucune'], correctAnswer: 1 },
      { question: 'P280 pour la soude impose quel équipement en priorité ?', options: ['Un masque à gaz', 'Lunettes de protection étanches et gants résistants (Neoprène/Nitrile)', 'Un écran solaire'], correctAnswer: 1 },
      { question: 'En cas d\'ingestion de soude, pourquoi est-il strictement interdit de faire vomir ?', options: ['Cela gâche le produit', 'Risque de double brûlure de l\'oesophage et de perforation', 'Cela n\'a aucun effet'], correctAnswer: 1 },
      { question: 'Pourquoi une solution de NaOH se trouble-t-elle si elle est mal fermée ?', options: ['Elle se périme', 'Elle absorbe le CO2 de l\'air pour former du carbonate de sodium (carbonatation)', 'Elle moisit'], correctAnswer: 1 },
      { question: 'Comment neutraliser un petit déversement de soude en toute sécurité ?', options: ['Ajouter de l\'eau de Javel', 'Ajouter prudemment un acide faible (acide citrique ou éthanoïque) jusqu\'à neutralité', 'Essuyer direct avec un chiffon'], correctAnswer: 1 }
    ]
  },
  {
    id: 'kmno4',
    name: 'Permanganate de potassium',
    fullName: 'Permanganate de potassium (KMnO4)',
    formula: 'KMnO4',
    molarMass: '158.03 g/mol',
    physicalState: 'Solide cristallin',
    meltingPoint: '240 °C (décomposition)',
    appearance: 'Cristaux violet foncé (presque noirs)',
    safetyPictograms: ['ghs03', 'ghs07', 'ghs08', 'ghs09'],
    signalWord: 'Danger',
    hStatements: [
      'H272 : Peut aggraver un incendie; comburant',
      'H302 : Nocif en cas d\'ingestion',
      'H410 : Très toxique pour les organismes aquatiques'
    ],
    pStatements: [
      'P210 : Tenir à l\'écart de la chaleur',
      'P273 : Éviter le rejet dans l\'environnement'
    ],
    healthHazards: ['Tache la peau de manière persistante', 'Oxydant puissant'],
    ppeRequired: ['Blouse en coton', 'Gants en nitrile', 'Lunettes de protection'],
    firstAid: [
      'Contact peau : Laver à l\'eau (les taches brunes disparaissent avec le temps).',
      'Ingestion : Consulter un médecin.'
    ],
    storageConditions: 'Stocker dans un endroit frais, sec et très bien ventilé. Conserver à l\'écart des sources de chaleur, étincelles ou flammes nues. Tenir à l\'écart de TOUTE matière combustible, des matières organiques (glycérol, alcools, papier) et des réducteurs puissants (risque d\'inflammation ou d\'explosion spontanée).',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Permanganate de potassium\nPICTOS: GHS03, GHS07, GHS08, GHS09\nPHRASES H: H272, H302, H410\nPHRASES P: P210, P273, P280\nEPI: Blouse, Gants, Lunettes\nSECOURS: Laver à l'eau, consulter médecin.\nNOTE: Oxydant puissant, tache la peau.")}`,
    quiz: [
      { question: 'Pourquoi le KMnO4 est-il classé H272 (Comburant) ?', options: ['Il brûle tout seul', 'Il fournit de l\'oxygène qui peut transformer un petit feu en incendie violent au contact de combustibles', 'Il est explosif'], correctAnswer: 1 },
      { question: 'Quelle est la principale incompatibilité de stockage pour le KMnO4 solide ?', options: ['L\'eau', 'Les matières organiques (Glycérol, alcools, papier) qui peuvent s\'enflammer spontanément à son contact', 'Le sel'], correctAnswer: 1 },
      { question: 'H410 (Très toxique pour les organismes aquatiques) implique quelle gestion des déchets ?', options: ['Dilution massive à l\'évier', 'Collecte impérative dans un bidon de déchets spécifiques pour traitement chimique', 'Jeter dans le jardin'], correctAnswer: 1 },
      { question: 'Pourquoi le KMnO4 tache-t-il la peau en brun-noir de manière persistante ?', options: ['C\'est un colorant alimentaire', 'Réduction en dioxyde de manganèse (MnO2) par les protéines de la peau', 'C\'est de la terre'], correctAnswer: 1 },
      { question: 'Quelle est la réaction entre le KMnO4 solide et le glycérol liquide ?', options: ['Aucune', 'Oxydation différée suivie d\'une ignition spontanée avec flammes violettes', 'Formation de glace'], correctAnswer: 1 },
      { question: 'Quelle précaution prendre lors de la préparation d\'une solution de KMnO4 ?', options: ['Ne pas porter de lunettes', 'Éviter tout contact avec des spatules en acier inoxydable ou en bois (utiliser du plastique ou verre)', 'Le faire dans l\'obscurité totale'], correctAnswer: 1 },
      { question: 'En cas de projection de KMnO4 dans les yeux, quel est le risque ?', options: ['Simple tache rose', 'Brûlure oxydante sévère et risque de lésions de la cornée', 'Nettoyage des yeux'], correctAnswer: 1 },
      { question: 'Un feu impliquant du KMnO4 peut-il être éteint en couvrant simplement avec du tissu ?', options: ['Oui', 'Non, le comburant continue de fournir de l\'oxygène, alimentant le feu même sous un drap', 'Seulement si le tissu est humide'], correctAnswer: 1 },
      { question: 'Que signifie le pictogramme GHS03 présent sur le flacon ?', options: ['Explosif', 'Comburant (flamme sur un cercle)', 'Inflammable'], correctAnswer: 1 },
      { question: 'Quelle est la conduite à tenir pour éliminer les taches de MnO2 sur la verrerie en toute sécurité ?', options: ['Frotter avec du savon', 'Utiliser une solution d\'acide chlorhydrique diluée avec de l\'eau oxygénée ou du bisulfite', 'Jeter la verrerie'], correctAnswer: 1 }
    ]
  },
  {
    id: 'salicylic_acid',
    name: 'Acide Salicylique',
    fullName: 'Acide salicylique (C₇H₆O₃)',
    formula: 'C7H6O3',
    molarMass: '138.12 g/mol',
    physicalState: 'Solide cristallin',
    meltingPoint: '159 °C',
    commonNames: ['Acide 2-hydroxybenzoïque'],
    appearance: 'Solide cristallin blanc',
    safetyPictograms: ['ghs05', 'ghs07'],
    signalWord: 'Danger',
    hStatements: ['H302 : Nocif ingéré', 'H318 : Lésions oculaires graves'],
    pStatements: ['P280 : Protection yeux', 'P305+P351+P338 : Rincer yeux'],
    healthHazards: ['Lésions oculaires', 'Irritation'],
    ppeRequired: ['Blouse', 'Lunettes de protection', 'Gants en nitrile'],
    firstAid: [
      'Yeux : Rincer immédiatement à l\'eau pendant au moins 15 minutes. Consulter un médecin.',
      'Ingestion : Faire boire de l\'eau. Consulter un médecin.'
    ],
    storageConditions: 'Conserver dans des récipients d\'origine hermétiquement clos, à l\'abri de l\'humidité atmosphérique. Stocker au frais, au sec et dans un endroit bien ventilé. Conserver à l\'écart des agents comburants puissants et des alcalis (bases fortes).',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Acide Salicylique\nPICTOS: GHS05, GHS07, GHS08\nPHRASES H: H302, H318, H361d\nPHRASES P: P280, P305+P351+P338\nEPI: Blouse, Lunettes de protection\nSECOURS: Rincer les yeux immédiatement.\nNOTE: Précurseur de l'aspirine.")}`,
    quiz: [
      { question: 'Pourquoi l\'acide salicylique est-il classé H318 (Lésions oculaires graves) ?', options: ['Il est plus fort que l\'acide sulfurique', 'Son acidité et son affinité pour les tissus oculaires provoquent des dommages irréversibles par corrosion chimique', 'Il est radioactif'], correctAnswer: 1 },
      { question: 'Que signifie la mention H361d souvent associée à cet acide ?', options: ['Risque de cancer', 'Susceptible de nuire au fœtus (développement)', 'Provoque des vertiges'], correctAnswer: 1 },
      { question: 'Pourquoi le port de lunettes de protection est-il INDISPENSABLE lors de la manipulation de cette poudre fine ?', options: ['Pour mieux voir', 'Pour éviter que des grains de poudre ne restent coincés dans l\'œil et provoquent une brûlure locale continue', 'C\'est une règle inutile'], correctAnswer: 1 },
      { question: 'Quelle est l\'alternative au rinçage à l\'eau en cas de projection d\'acide salicylique pur sur la peau ?', options: ['Aucune, rincer immédiatement et abondamment à l\'eau car il peut irriter profondément (propriétés kératolytiques)', 'Utiliser de l\'huile', 'Mettre du vinaigre'], correctAnswer: 0 },
      { question: 'H302 indique que l\'ingestion accidentelle est :', options: ['Mortelle à très faible dose', 'Nocive pour la santé', 'Sûre car c\'est comme l\'aspirine'], correctAnswer: 1 },
      { question: 'Pourquoi doit-on éviter de respirer la poussière d\'acide salicylique lors de son pesage ?', options: ['Elle sent mauvais', 'Elle irrite fortement les voies respiratoires et les muqueuses nasales (H335)', 'Elle fait éternuer sans danger'], correctAnswer: 1 },
      { question: 'Lors de la synthèse de l\'aspirine, l\'acide salicylique est mélangé à l\'anhydride acétique. Quel est le danger ajouté ?', options: ['Le mélange devient explosif', 'L\'anhydride acétique est un liquide très corrosif et lacrymogène, rendant la manipulation beaucoup plus risquée', 'Aucun'], correctAnswer: 1 },
      { question: 'Comment doit-on nettoyer une spatule utilisée pour l\'acide salicylique ?', options: ['L\'essuyer avec un papier uniquement', 'La rincer abondamment à l\'eau et la sécher avant rangement', 'La laisser sur la paillasse'], correctAnswer: 1 },
      { question: 'Quel est le pictogramme GHS associé aux lésions oculaires graves de l\'acide salicylique ?', options: ['GHS05 (Corrosif)', 'GHS02 (Inflammable)', 'GHS06 (Toxique)'], correctAnswer: 0 },
      { question: 'Quelle est la précaution de stockage pour éviter la dégradation du produit sur le long terme ?', options: ['Le laisser à la lumière', 'Conserver dans un récipient hermétique à l\'abri de l\'humidité', 'Le mettre dans un bécher ouvert'], correctAnswer: 1 }
    ]
  },
  {
    id: 'ethanol',
    name: 'Éthanol',
    fullName: 'Éthanol (C₂H₅OH)',
    formula: 'C2H5OH',
    molarMass: '46.07 g/mol',
    physicalState: 'Liquide volatil',
    meltingPoint: '-114 °C',
    commonNames: ['Alcool éthylique'],
    appearance: 'Liquide incolore, odeur caractéristique',
    safetyPictograms: ['ghs02', 'ghs07'],
    signalWord: 'Danger',
    hStatements: ['H225 : Liquide et vapeurs très inflammables', 'H319 : Provoque une sévère irritation des yeux'],
    pStatements: ['P210 : Tenir à l\'écart de la chaleur/étincelles', 'P233 : Maintenir le récipient fermé de manière étanche'],
    healthHazards: ['Irritation oculaire', 'Dépression du système nerveux en cas d\'inhalation massive'],
    ppeRequired: ['Blouse en coton', 'Lunettes de protection', 'Gants en nitrile'],
    firstAid: ['Inhalation : Mettre à l\'air frais.', 'Contact yeux : Rincer à l\'eau.'],
    storageConditions: 'Conserver dans un local frais, extrêmement bien ventilé (local de stockage des solvants inflammables). Tenir à l\'écart de toute source d\'ignition, chaleur, étincelles ou flammes nues (point d\'éclair bas de ~13°C). Stocker les récipients d\'origine hermétiquement fermés et à l\'abri des rayons directs du soleil. Tenir éloigné des agents oxydants puissants.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Éthanol\nPICTOS: GHS02, GHS07\nPHRASES H: H225, H319\nPHRASES P: P210, P233\nEPI: Blouse, Lunettes\nSECOURS: Air frais, Rincer les yeux.\nNOTE: Tenir loin des flammes et étincelles.")}`,
    quiz: [
      { question: 'Pourquoi l\'éthanol est-il classé H225 (Liquide et vapeurs très inflammables) ?', options: ['Il explose spontanément', 'Il possède un point d\'éclair bas (~13°C), formant des vapeurs inflammables à température ambiante', 'Il sent l\'alcool'], correctAnswer: 1 },
      { question: 'Quel est le risque majeur d\'une bouteille d\'éthanol à moitié vide stockée près d\'une source de chaleur ?', options: ['L\'alcool va s\'évaporer totalement', 'L\'accumulation de vapeurs inflammables dans l\'espace de tête peut provoquer une explosion au moindre point chaud', 'Aucun'], correctAnswer: 1 },
      { question: 'P210 pour l\'éthanol interdit formellement :', options: ['De boire le produit', 'De fumer ou d\'utiliser des flammes nues/étincelles à proximité', 'De mélanger avec de l\'eau'], correctAnswer: 1 },
      { question: 'Quel type d\'agent d\'extinction est le plus recommandé pour un feu d\'éthanol ?', options: ['L\'eau en jet plein', 'La poudre chimique ou le dioxyde de carbone (CO2)', 'Du sable humide'], correctAnswer: 1 },
      { question: 'Pourquoi l\'éthanol "dénaturé" est-il utilisé en laboratoire plutôt que l\'éthanol pur ?', options: ['Pour le rendre plus puissant', 'Pour le rendre impropre à la consommation et éviter les taxes sur l\'alcool', 'Pour changer sa couleur'], correctAnswer: 1 },
      { question: 'Quel est l\'effet de l\'inhalation prolongée de fortes concentrations de vapeurs d\'éthanol ?', options: ['Irritation des yeux uniquement', 'Somnolence, vertiges et effets narcotiques', 'Amélioration de la respiration'], correctAnswer: 1 },
      { question: 'Pourquoi l\'éthanol se mélange-t-il parfaitement à l\'eau (miscibilité totale) ?', options: ['Grâce à sa chaine carbonée courte et son groupement -OH hydrophile', 'Parce que c\'est un acide', 'Ils ne se mélangent pas'], correctAnswer: 0 },
      { question: 'En cas de projection d\'éthanol dans les yeux (H319) :', options: ['Attendre que ça s\'évapore', 'Rincer abondamment à l\'eau pendant plusieurs minutes', 'Frotter avec un mouchoir'], correctAnswer: 1 },
      { question: 'Quel est le risque de verser de l\'éthanol sur un feu de sodium ou de potassium ?', options: ['Il éteint le feu', 'Il réagit violemment pour produire de l\'hydrogène inflammable, aggravant l\'incendie', 'Il refroidit le métal'], correctAnswer: 1 },
      { question: 'Quelle est la conduite à tenir si de l\'éthanol s\'enflamme dans un bécher ?', options: ['Souffler sur la flamme', 'Couvrir hermétiquement avec un verre de montre pour étouffer le feu', 'Verser de l\'eau dedans'], correctAnswer: 1 }
    ]
  },
  {
    id: 'h2so4',
    name: 'Acide sulfurique',
    fullName: 'Acide sulfurique (H₂SO₄)',
    formula: 'H2SO4',
    molarMass: '98.08 g/mol',
    physicalState: 'Liquide visqueux',
    meltingPoint: '10 °C',
    commonNames: ['Huile de vitriol'],
    ph: '< 1',
    density: '1.84 g/cm³',
    appearance: 'Liquide huileux incolore et inodore',
    safetyPictograms: ['ghs05'],
    signalWord: 'Danger',
    hStatements: ['H290 : Peut être corrosif pour les métaux', 'H314 : Provoque de graves brûlures de la peau et des lésions oculaires graves'],
    pStatements: ['P280 : Porter des gants/vêtements de protection/protection des yeux', 'P301+P330+P331 : EN CAS D\'INGESTION : Rincer la bouche. NE PAS faire vomir'],
    healthHazards: ['Destruction immédiate des tissus par déshydratation', 'Dégagement de chaleur intense au contact de l\'eau'],
    ppeRequired: ['Blouse en coton', 'Gants en néoprène ou nitrile épais', 'Lunettes de protection/Ecran facial'],
    firstAid: ['Contact peau : Rincer abondamment à l\'eau (attention à la réaction exothermique).', 'Contact yeux : Rincer immédiatement pendant 20 minutes.'],
    storageConditions: 'Conserver au sec absolu, l\'acide sulfurique étant extrêmement hygroscopique. Conserver sous clé dans des récipients d\'origine étanches dans une armoire de stockage ventilée résistante aux acides. Ne jamais stocker à proximité de bases fortes, d\'eau ou de métaux (réaction de type acide-métal dégageant du dihydrogène H₂ hautement explosif).',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Acide sulfurique (H2SO4)\nPICTOS: GHS05\nPHRASES H: H290, H314\nPHRASES P: P280, P301+P330+P331\nEPI: Blouse, Gants en néoprène, Lunettes\nSECOURS: Rincer longuement, ne pas vomir.\nNOTE: Réaction violente avec l'eau.")}`,
    quiz: [
      { question: 'Quelle est la cause de l\'extrême chaleur (réaction exothermique) lors du mélange H2SO4 + Eau ?', options: ['La friction des molécules', 'L\'énergie d\'hydratation très élevée des ions H+ et HSO4-', 'Une réaction nucléaire'], correctAnswer: 1 },
      { question: 'Pourquoi l\'acide sulfurique concentré (98%) noircit-il instantanément le sucre ou le papier ?', options: ['C\'est une teinture', 'C\'est un déshydratant puissant qui arrache l\'eau des glucides, laissant du carbone pur', 'Il le brûle par combustion'], correctAnswer: 1 },
      { question: 'Quel est l\'effet du H2SO4 sur les gants en latex fin ?', options: ['Aucun', 'Il les traverse et les dégrade rapidement (carbonisation)', 'Il les renforce'], correctAnswer: 1 },
      { question: 'Lors de la dilution, pourquoi verser "l\'acide dans l\'eau" et non l\'inverse ?', options: ['L\'eau versée dans l\'acide peut bouillir instantanément et projeter de l\'acide', 'C\'est une tradition', 'Pour éviter de gaspiller l\'eau'], correctAnswer: 0 },
      { question: 'H314 pour H2SO4 signifie :', options: ['Irritation légère', 'Brûlures graves de la peau et lésions oculaires graves (nécrose profonde)', 'Pas de danger'], correctAnswer: 1 },
      { question: 'Quelle est la concentration molaire approximative de l\'acide sulfurique commercial (98%, d=1.84) ?', options: ['~18 mol/L', '~1 mol/L', '~10 mol/L'], correctAnswer: 0 },
      { question: 'En cas de projection de H2SO4 sur la peau, quel est le premier réflexe ?', options: ['Chercher une base pour neutraliser', 'Rincer immédiatement et massivement à l\'eau courante pendant 20 minutes', 'Essuyer avec un papier'], correctAnswer: 1 },
      { question: 'Pourquoi le stockage du H2SO4 concentré dans l\'aluminium est-il dangereux sur le long terme ?', options: ['Il s\'évapore', 'Il attaque le métal en dégageant du dihydrogène (H2) explosif', 'Il devient solide'], correctAnswer: 1 },
      { question: 'Que signifie la mention H290 pour cet acide ?', options: ['Corrosif pour les métaux', 'Toxique par inhalation', 'Polluant marin'], correctAnswer: 0 },
      { question: 'Quel EPI est INDISPENSABLE en plus des lunettes lors de la manipulation de grands volumes ?', options: ['Un tablier de cuisine', 'Un écran facial protecteur', 'Un masque à gaz'], correctAnswer: 1 }
    ]
  },
  {
    id: 'acetone',
    name: 'Acétone',
    fullName: 'Acétone (CH₃COCH₃)',
    formula: 'CH3COCH3',
    molarMass: '58.08 g/mol',
    physicalState: 'Liquide volatil',
    meltingPoint: '-95 °C',
    commonNames: ['Propanone'],
    appearance: 'Liquide incolore, odeur fruitée caractéristique',
    safetyPictograms: ['ghs02', 'ghs07'],
    signalWord: 'Danger',
    hStatements: ['H225 : Liquide et vapeurs très inflammables', 'H319 : Provoque une sévère irritation des yeux', 'H336 : Peut provoquer somnolence ou vertiges'],
    pStatements: ['P210 : Tenir à l\'écart des flammes', 'P261 : Éviter de respirer les vapeurs'],
    healthHazards: ['Dégraissant puissant pour la peau', 'Effets narcotiques par inhalation'],
    ppeRequired: ['Blouse', 'Gants en nitrile', 'Lunettes de protection'],
    firstAid: ['Inhalation : Air frais.', 'Contact peau : Laver à l\'eau.'],
    storageConditions: 'Conserver au frais (température < 25°C), au sec et dans un local ventilé conçu pour les liquides hautement inflammables (point d\'éclair extrêmement bas de -20°C). Maintenir le flacon scellé de manière étanche pour prévenir l\'évaporation rapide des vapeurs explosives. Stocker séparément des agents oxydants puissants (KMnO₄, peroxydes). non compatible avec les emballages ou joints en matières plastiques type polystyrène ou acrylique.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Acétone\nPICTOS: GHS02, GHS07\nPHRASES H: H225, H319, H336\nPHRASES P: P210, P261, P305+P351+P338\nEPI: Blouse, Lunettes\nSECOURS: Air frais, Rincer les yeux.\nNOTE: Très inflammable, volatilis.")}`,
    quiz: [
      { question: 'Pourquoi l\'acétone est-elle classée H225 (Très inflammable) ?', options: ['Elle explose seule', 'Son point d\'éclair est très bas (-20°C), ce qui signifie qu\'elle s\'enflamme avec une étincelle même par grand froid', 'Elle est rouge'], correctAnswer: 1 },
      { question: 'H336 indique que l\'inhalation des vapeurs d\'acétone peut provoquer :', options: ['Une force accrue', 'Somnolence ou vertiges (effet narcotique)', 'Une amélioration de la vision'], correctAnswer: 1 },
      { question: 'EUH066 avertit que l\'exposition répétée peut provoquer :', options: ['Dessèchement ou gerçures de la peau par dégraissage des lipides cutanés', 'Un bronzage', 'Une pousse de cheveux'], correctAnswer: 0 },
      { question: 'Pourquoi est-il dangereux de nettoyer ses mains à l\'acétone ?', options: ['C\'est trop cher', 'L\'acétone traverse la barrière cutanée, emporte les impuretés dans le sang et dessèche gravement la peau', 'Cela sent mauvais'], correctAnswer: 1 },
      { question: 'P210 pour l\'acétone interdit :', options: ['La lumière vive', 'Les flammes nues, surfaces chaudes et étincelles', 'Le mélange avec l\'eau'], correctAnswer: 1 },
      { question: 'Quel est le risque de verser de l\'acétone sur certains plastiques (Polystyrène, ABS) ?', options: ['Il les nettoie parfaitement', 'Il les dissout ou les fragilise instantanément par attaque chimique', 'Aucun'], correctAnswer: 1 },
      { question: 'Quelle précaution prendre pour le stockage de l\'acétone vis-à-vis des comburants (KMnO4) ?', options: ['Stockage commun recommandé', 'Séparation stricte (risque d\'inflammation ou d\'explosion au contact)', 'Peu importe'], correctAnswer: 1 },
      { question: 'En cas de feu d\'acétone, quel extincteur utiliser ?', options: ['Jet d\'eau plein (fortement déconseillé car propage le liquide)', 'Poudre ABC ou CO2', 'Couverture en laine'], correctAnswer: 1 },
      { question: 'H319 prévient d\'une sévére irritation de quel type ?', options: ['Respiratoire', 'Oculaire (yeux)', 'Musculaire'], correctAnswer: 1 },
      { question: 'Pourquoi doit-on utiliser l\'acétone sous hotte ou dans un local très ventilé (P403) ?', options: ['Sa volatilité élevée sature rapidement l\'air en vapeurs inflammables et irritantes', 'Pour ne pas sentir l\'odeur', 'Pour refroidir le produit'], correctAnswer: 0 }
    ]
  },
  {
    id: 'agno3',
    name: 'Nitrate d\'argent',
    fullName: 'Nitrate d\'argent (AgNO₃)',
    formula: 'AgNO3',
    molarMass: '169.87 g/mol',
    physicalState: 'Solide cristallin',
    meltingPoint: '212 °C',
    appearance: 'Cristaux incolores ou blancs',
    safetyPictograms: ['ghs03', 'ghs05', 'ghs09'],
    signalWord: 'Danger',
    hStatements: ['H272 : Peut aggraver un incendie; comburant', 'H314 : Provoque de graves brûlures', 'H410 : Très toxique pour les organismes aquatiques'],
    pStatements: ['P273 : Éviter le rejet dans l\'environnement', 'P280 : Porter des gants/lunettes'],
    healthHazards: ['Brûlures chimiques', 'Taches noires indélébiles sur la peau (réduction en argent métallique)'],
    ppeRequired: ['Blouse en coton', 'Gants en nitrile (protection contre les taches)', 'Lunettes de protection'],
    firstAid: ['Peau : Rincer abondamment. Les taches disparaissent avec le renouvellement cutané.', 'Yeux : Rincer 15 min.'],
    storageConditions: 'Conserver à l\'abri de la lumière naturelle ou artificielle (substance hautement photosensible se décomposant en argent métallique noir). Stocker dans des flacons d\'origine en verre ambré ou en plastique opaque, dans un endroit frais et sec. Tenir à l\'écart des matières organiques réductrices et des sources de chaleur.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Nitrate d'argent (AgNO3)\nPICTOS: GHS03, GHS05, GHS09\nPHRASES H: H272, H314, H410\nPHRASES P: P273, P280, P303+P361+P353\nEPI: Blouse, Gants, Lunettes\nSECOURS: Rincer abondamment 15min.\nNOTE: Tache la peau en noir, très polluant.")}`,
    quiz: [
      { question: 'Pourquoi le nitrate d\'argent est-il classé H272 (Comburant) ?', options: ['Il brûle spontanément', 'C\'est un sel oxydant qui peut favoriser la combustion de matières organiques', 'Il dégage de l\'oxygène sous la douche'], correctAnswer: 1 },
      { question: 'Quelle est la réaction chimique responsable du noircissement indélébile de la peau après contact avec AgNO3 ?', options: ['Une brûlure thermique', 'La réduction des ions Ag+ en argent métallique (Ag0) par les protéines et la lumière', 'Une teinture de cheveu'], correctAnswer: 1 },
      { question: 'H314 pour AgNO3 signifie qu\'il est :', options: ['Comestible', 'Corrosif (provoque des brûlures chimiques et des lésions oculaires graves)', 'Inodore'], correctAnswer: 1 },
      { question: 'Pourquoi AgNO3 est-il extrêmement dangereux pour l\'environnement (H410) ?', options: ['Il rend l\'eau violette', 'Les ions Ag+ sont hautement toxiques pour les micro-organismes et la vie aquatique (biocide)', 'Il nourrit les algues'], correctAnswer: 1 },
      { question: 'Quelle est la précaution de stockage indispensable pour préserver la qualité du Nitrate d\'Argent ?', options: ['Le mettre au congélateur', 'Le conserver à l\'abri de la lumière dans un flacon ambré ou opaque', 'Le laisser au soleil'], correctAnswer: 1 },
      { question: 'Comment doit-on éliminer les déchets contenant du nitrate d\'argent ?', options: ['À l\'évier avec beaucoup d\'eau', 'Collecte séparée dans un bidon de déchets de métaux lourds pour traitement spécifique', 'À la poubelle municipale'], correctAnswer: 1 },
      { question: 'Quel est le risque d\'une projection de AgNO3 dans les yeux ?', options: ['Une simple gêne', 'Une brûlure chimique sévère pouvant causer la cécité par précipitation des protéines de la cornée', 'Une amélioration de la vue'], correctAnswer: 1 },
      { question: 'Que signifie une mention P273 sur le flacon de Nitrate d\'argent ?', options: ['Éviter le rejet dans l\'environnement', 'Porter des gants', 'Ne pas manger'], correctAnswer: 0 },
      { question: 'Pourquoi ne faut-il jamais mélanger AgNO3 avec des solutions d\'ammoniac concentrées sans précaution ?', options: ['Risque de mauvaise odeur', 'Formation de fulminate d\'argent, un explosif primaire extrêmement sensible aux chocs', 'Pas de risque'], correctAnswer: 1 },
      { question: 'Quelle est la conduite à tenir en cas de contact cutané avec le Nitrate d\'Argent ?', options: ['Attendre que ça noircisse', 'Rincer immédiatement à l\'eau pour limiter la profondeur de la tâche et de la brûlure', 'Mettre du savon'], correctAnswer: 1 }
    ]
  },
  {
    id: 'cuso4',
    name: 'Sulfate de cuivre (II)',
    fullName: 'Sulfate de cuivre (II) (CuSO₄)',
    formula: 'CuSO4',
    molarMass: '159.61 g/mol',
    physicalState: 'Solide cristallin',
    meltingPoint: '110 °C (déshydratation)',
    appearance: 'Poudre blanche (anhydre) ou cristaux bleus (pentahydraté)',
    safetyPictograms: ['ghs07', 'ghs09', 'ghs08'],
    signalWord: 'Attention',
    hStatements: ['H302 : Nocif en cas d\'ingestion', 'H319 : Provoque une sévère irritation des yeux', 'H410 : Très toxique pour les organismes aquatiques'],
    pStatements: ['P273 : Éviter le rejet dans l\'environnement', 'P280 : Porter des gants/vêtements de protection/protection des yeux', 'P305+P351+P338 : En cas de contact yeux : Rincer'],
    healthHazards: ['Toxicité aiguë', 'Irritation oculaire', 'Pollution aquatique durable'],
    ppeRequired: ['Blouse en coton', 'Gants en nitrile', 'Lunettes de protection'],
    firstAid: ['Yeux : Rincer abondamment à l\'eau.', 'Ingestion : Appeler un centre antipoison.', 'Peau : Laver au savon et à l\'eau.'],
    storageConditions: 'Conserver au sec absolu et dans des récipients étanches (la forme anhydre est très sensible à la moindre trace d\'humidité). Éviter le contact direct avec des récipients métalliques (corrosif pour les métaux en solution aqueuse). Stocker séparément des matières combustibles et des denrées alimentaires.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Sulfate de cuivre (II)\nPICTOS: GHS07, GHS08, GHS09\nPHRASES H: H302, H319, H410\nPHRASES P: P273, P280\nEPI: Blouse, Gants, Lunettes\nSECOURS: Rincer à l'eau, centre antipoison.\nNOTE: Toxique pour l'environnement.")}`,
    quiz: [
      { question: 'Pourquoi le sulfate de cuivre (bleu) est-il classé H410 ?', options: ['Il est radioactif', 'Il est hautement toxique pour les organismes aquatiques avec des effets durables (métal lourd)', 'Il est bon pour les algues'], correctAnswer: 1 },
      { question: 'H319 sur l\'étiquette de CuSO4 prévient d\'un risque pour :', options: ['Les poumons', 'Les yeux (sévère irritation)', 'La peau seule'], correctAnswer: 1 },
      { question: 'Que se passe-t-il si l\'on ingère accidentellement du sulfate de cuivre (H302) ?', options: ['Aucun effet', 'Vomissements violents, douleurs abdominales et risques de lésions hépato-rénales', 'On devient bleu'], correctAnswer: 1 },
      { question: 'Pourquoi est-il interdit de rejeter les restes de solutions de cuivre à l\'évier (P273) ?', options: ['Cela colore les tuyaux', 'Le cuivre ne se dégrade pas et empoisonne les écosystèmes aquatiques', 'C\'est trop cher'], correctAnswer: 1 },
      { question: 'Quelle est la différence de risque entre le sulfate de cuivre anhydre (Blanc) et hydraté (Bleu) ?', options: ['L\'anhydre libère de la chaleur au contact de l\'eau (exothermie), augmentant le risque de projections', 'Aucune', 'Le bleu est inflammable'], correctAnswer: 0 },
      { question: 'H315 indique que le contact prolongé avec la poudre peut :', options: ['Réparer la peau', 'Provoquer une irritation cutanée', 'Bronzer la peau'], correctAnswer: 1 },
      { question: 'P280 pour le sulfate de cuivre impose le port de :', options: ['Gants de protection et lunettes', 'Uniquement une blouse', 'Rien'], correctAnswer: 0 },
      { question: 'Pourquoi doit-on manipuler la poudre de CuSO4 avec précaution pour éviter les poussières ?', options: ['Pour ne pas salir la paillasse', 'L\'inhalation de poussières de cuivre est irritante pour les voies respiratoires', 'La poudre est explosive'], correctAnswer: 1 },
      { question: 'Comment doit-on nettoyer un déversement de sulfate de cuivre solide ?', options: ['Utiliser une serpillère humide direct', 'Récupérer mécaniquement (pelle/balayette) en évitant les poussières et traiter en déchet dangereux', 'Laisser s\'évaporer'], correctAnswer: 1 },
      { question: 'Quelle est la conduite à tenir en cas de projection de solution de cuivre dans les yeux ?', options: ['Attendre 5 min', 'Rincer abondamment à l\'eau immédiatement pendant 15 min et consulter un médecin', 'Mettre du collyre'], correctAnswer: 1 }
    ]
  },
  {
    id: 'dichloromethane',
    name: 'Dichlorométhane',
    fullName: 'Dichlorométhane (CH₂Cl₂)',
    formula: 'CH2Cl2',
    molarMass: '84.93 g/mol',
    physicalState: 'Liquide volatil',
    meltingPoint: '-96.7 °C',
    commonNames: ['Chlorure de méthylène', 'DCM'],
    density: '1.33 g/cm³',
    appearance: 'Liquide incolore, odeur douceâtre',
    safetyPictograms: ['ghs07', 'ghs08'],
    signalWord: 'Attention',
    hStatements: ['H315 : Provoque une irritation cutanée', 'H319 : Provoque une sévère irritation des yeux', 'H336 : Peut provoquer somnolence ou vertiges', 'H351 : Susceptible de provoquer le cancer'],
    pStatements: ['P201 : Se procurer les instructions avant utilisation', 'P261 : Éviter de respirer les vapeurs', 'P280 : Porter des gants/vêtements de protection'],
    healthHazards: ['Effets narcotiques', 'Cancérogène suspecté', 'Irritation sévère'],
    ppeRequired: ['Blouse en coton', 'Gants en alcool polyvinylique (PVA) ou Viton (Le nitrile est peu résistant)', 'Lunettes de protection étanches'],
    firstAid: ['Inhalation : Air frais, repos. Consulter un médecin.', 'Contact peau : Laver abondamment à l\'eau.', 'Contact yeux : Rincer abondamment 15 min.'],
    storageConditions: 'Conserver dans un endroit frais, sec, à l\'abri de l\'exposition directe du soleil et impérativement dans un local ventilé de manière continue (substance extrêmement volatile dégageant de lourdes vapeurs toxiques nocives). Stocker loin des métaux alcalins légers et des oxydants puissants.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Dichlorométhane (CH2Cl2)\nPICTOS: GHS07, GHS08\nPHRASES H: H315, H319, H336, H351\nPHRASES P: P201, P261, P280\nEPI: Blouse, Gants Spécifiques, Lunettes\nSECOURS: Air frais, Rincer abondamment.\nNOTE: Cancérogène suspecté, manipuler sous hotte.")}`,
    quiz: [
      { question: 'Pourquoi le Dichlorométhane (DCM) est-il classé H351 (Susceptible de provoquer le cancer) ?', options: ['Il est radioactif', 'Des études montrent un risque de carcinogénicité lors d\'expositions prolongées ou répétées', 'Il fait tomber les dents'], correctAnswer: 1 },
      { question: 'H336 indique que respirer ses vapeurs provoque :', options: ['Une euphorie illimitée', 'Somnolence ou vertiges (effet narcotique)', 'Une vision nocturne'], correctAnswer: 1 },
      { question: 'Pourquoi la manipulation du DCM est-elle STRICTEMENT obligatoire sous hotte ventilée ?', options: ['Son odeur est trop forte', 'Il est extrêmement volatil et ses vapeurs sont plus denses que l\'air, saturant rapidement la zone de travail', 'Pour refroidir le produit'], correctAnswer: 1 },
      { question: 'Quel est le danger de porter des gants en Latex avec le DCM ?', options: ['Aucun', 'Le DCM traverse le latex en quelques secondes (le latex "fond" ou gonfle), offrant une fausse sécurité', 'Ils deviennent trop glissants'], correctAnswer: 1 },
      { question: 'Quel matériau de gant est recommandé pour une protection optimale contre le DCM ?', options: ['Latex ou Nitrile fin', 'Gants en alcool polyvinylique (PVA) ou Viton (le nitrile offre une protection très limitée)', 'Coton'], correctAnswer: 1 },
      { question: 'En cas de projection cutanée, pourquoi l\'irritation est-elle intense (H315) ?', options: ['C\'est un acide fort', 'Le DCM dissout les lipides protecteurs de la peau provoquant des brûlures et une absorption rapide', 'Il est collant'], correctAnswer: 1 },
      { question: 'Pourquoi le DCM est-il dangereux pour le coeur ?', options: ['Il augmente le cholestérol', 'Son métabolisme produit du monoxyde de carbone (CO) dans le sang, réduisant l\'oxygénation', 'Il n\'est pas dangereux'], correctAnswer: 1 },
      { question: 'Quelle est sa propriété physique majeure favorisant l\'accumulation de vapeurs au sol ?', options: ['Sa couleur', 'Sa densité élevée (~1.33), rendant les vapeurs plus lourdes que l\'air', 'Sa masse molaire'], correctAnswer: 1 },
      { question: 'H319 sur le flacon de DCM prévient de quel risque ?', options: ['Lésions pulmonaires', 'Sévére irritation des yeux', 'Allergie cutanée'], correctAnswer: 1 },
      { question: 'En cas de déversement important de DCM en dehors d\'une hotte, quelle est la procédure ?', options: ['Essuyer avec du papier', 'Évacuer la zone, aérer au maximum et utiliser un kit de secours pour solvants organiques', 'Ne rien faire'], correctAnswer: 1 }
    ]
  },
  {
    id: 'acetic_acid',
    name: 'Acide éthanoïque',
    fullName: 'Acide éthanoïque (CH₃COOH)',
    formula: 'CH3COOH',
    molarMass: '60.05 g/mol',
    physicalState: 'Liquide',
    meltingPoint: '16.6 °C',
    commonNames: ['Acide acétique', 'Acide acétique glacial'],
    appearance: 'Liquide incolore, odeur forte de vinaigre',
    safetyPictograms: ['ghs02', 'ghs05'],
    signalWord: 'Danger',
    hStatements: ['H226 : Liquide et vapeurs inflammables', 'H314 : Provoque de graves brûlures de la peau and des lésions oculaires graves'],
    pStatements: ['P210 : Tenir à l\'écart de la chaleur', 'P280 : Porter des gants/vêtements de protection', 'P303+P361+P353 : En cas de contact peau : rincer'],
    healthHazards: ['Corrosion cutanée', 'Vapeurs très irritantes'],
    ppeRequired: ['Blouse en coton', 'Gants en nitrile ou butyl', 'Lunettes de protection'],
    firstAid: ['Peau : Rincer immédiatement et abondamment.', 'Inhalation : Air frais.'],
    storageConditions: 'Conserver à une température ambiante impérativement supérieure à 17°C pour éviter la solidification/cristallisation spontanée (le point de fusion de l\'acide glacial est de 16.6°C). Stocker dans des récipients d\'origine scellés en matériaux polymères résistants (PEHD) à l\'écart des sources d\'ignition et des agents comburants puissants.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Acide éthanoïque (CH3COOH)\nPICTOS: GHS02, GHS05\nPHRASES H: H226, H314\nPHRASES P: P210, P280, P303+P361+P353\nEPI: Blouse, Gants, Lunettes\nSECOURS: Rincer abondamment, Air frais.\nNOTE: Inflammable et corrosif.")}`,
    quiz: [
      { question: 'Pourquoi l\'acide éthanoïque pur (glacial) est-il classé H314 (Corrosif) ?', options: ['C\'est un acide plus fort que l\'acide sulfurique', 'Concentré, il attaque violemment les tissus et provoque des brûlures chimiques graves', 'Il est juste acide'], correctAnswer: 1 },
      { question: 'Pourquoi l\'appelle-t-on acide éthanoïque "glacial" ?', options: ['Il est conservé au congélateur', 'Il se solidifie à 16.7°C, formant des cristaux ressemblant à de la glace au moindre rafraîchissement', 'Il refroidit les mains'], correctAnswer: 1 },
      { question: 'H226 indique que l\'acide éthanoïque est un :', options: ['Solide explosif', 'Liquide et vapeurs inflammables', 'Gaz sous pression'], correctAnswer: 1 },
      { question: 'Pourquoi la vapeur d\'acide éthanoïque est-elle dangereuse (H335) ?', options: ['Elle sent le vinaigre mais est inoffensive', 'Elle est extrêmement irritante pour les yeux et les voies respiratoires', 'Elle est narcotique'], correctAnswer: 1 },
      { question: 'En cas de projection oculaire d\'acide éthanoïque concentré :', options: ['Rincer à l\'eau tiède pendant 15-20 min et consulter un médecin immédiatement', 'Mettre du bicarbonate direct', 'Attendre que ça passe'], correctAnswer: 0 },
      { question: 'Quel est le risque de mélanger de l\'acide éthanoïque avec des oxydants forts (KMnO4) ?', options: ['Une couleur rose', 'Une réaction exothermique violente avec risque d\'incendie', 'Aucun'], correctAnswer: 1 },
      { question: 'P210 pour l\'acide éthanoïque impose d\'éviter :', options: ['La lumière', 'Les sources d\'étincelles, flammes nues et surfaces chaudes', 'Le sel de table'], correctAnswer: 1 },
      { question: 'Quelle est la différence de danger entre le vinaigre domestique (5%) et l\'acide éthanoïque pur ?', options: ['Aucune', 'Le vinaigre est dilué et sûr, le pur est un produit corrosif et inflammable très dangereux', 'Le vinaigre est plus dangereux'], correctAnswer: 1 },
      { question: 'Quel matériau de gant est recommandé pour manipuler l\'acide glacial ?', options: ['Nitrile (pour projections) ou Butyle de bonne épaisseur', 'Coton', 'Rien'], correctAnswer: 0 },
      { question: 'Comment neutraliser un déversement d\'acide éthanoïque concentré ?', options: ['Mélanger avec de l\'eau de Javel', 'Neutraliser avec du carbonate ou bicarbonate de sodium avec prudence avant nettoyage', 'Laisser s\'évaporer'], correctAnswer: 1 }
    ]
  },
  {
    id: 'sodium_carbonate',
    name: 'Carbonate de sodium',
    fullName: 'Carbonate de sodium (Na₂CO₃)',
    formula: 'Na2CO3',
    molarMass: '105.99 g/mol',
    physicalState: 'Solide (poudre)',
    meltingPoint: '851 °C',
    commonNames: ['Cristaux de soude', 'Soda ash'],
    appearance: 'Poudre blanche inodore',
    safetyPictograms: ['ghs07'],
    signalWord: 'Attention',
    hStatements: ['H319 : Provoque une sévère irritation des yeux'],
    pStatements: ['P264 : Se laver les mains soigneusement après manipulation', 'P305+P351+P338 : En cas de contact yeux : Rincer'],
    healthHazards: ['Irritation oculaire', 'Poussières irritantes'],
    ppeRequired: ['Blouse', 'Lunettes de protection', 'Gants'],
    firstAid: ['Yeux : Rincer avec précaution à l\'eau.'],
    storageConditions: 'Conserver au sec absolu, sous emballage hermétiquement clos pour éviter l\'absorption d\'humidité et la prise en masse (caractère hygroscopique fort). Stocker séparément des acides forts pour éviter toute réaction vive d\'effervescence acide-carbonate dégageant de grandes quantités de CO₂ gazeux sous pression.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Carbonate de sodium (Na2CO3)\nPICTOS: GHS07\nPHRASES H: H319\nPHRASES P: P264, P305+P351+P338\nEPI: Blouse, Lunettes, Gants\nSECOURS: Rincer à l'eau.\nNOTE: Irritant oculaire, base solide.")}`,
    quiz: [
      { question: 'Pourquoi le carbonate de sodium est-il classé H319 (Provoque une sévére irritation des yeux) ?', options: ['Il est très acide', 'C\'est une base solide qui, au contact de l\'humidité de l\'œil, crée un milieu alcalin irritant', 'Il est abrasif'], correctAnswer: 1 },
      { question: 'Quelle est la différence entre le carbonate de sodium et le bicarbonate de sodium pour la sécurité ?', options: ['Le carbonate est plus basique (pH ~11.5) et plus irritant que le bicarbonate (pH ~8)', 'C\'est la même chose', 'Le bicarbonate est plus corrosif'], correctAnswer: 0 },
      { question: 'H319 impose quelle conduite en cas de projection oculaire ?', options: ['Attendre 10 min', 'Rincer immédiatement et abondamment à l\'eau pendant au moins 15-20 min', 'Utiliser du collyre uniquement'], correctAnswer: 1 },
      { question: 'Pourquoi ne faut-il pas manipuler le carbonate de sodium sans gants si on a la peau sensible ?', options: ['Il colore la peau', 'Son caractère alcalin peut causer des irritations cutanées par action chimique', 'Il rend la peau grasse'], correctAnswer: 1 },
      { question: 'Que se passe-t-il si on mélange du carbonate de sodium avec un acide fort ?', options: ['Rien', 'Une réaction effervescente vive avec dégagement massif de dioxyde de carbone (CO2) qui peut projeter le mélange', 'Formation de glace'], correctAnswer: 1 },
      { question: 'P264 préconise de se laver les mains après manipulation. Pourquoi ?', options: ['C\'est une règle de politesse', 'Pour éliminer tout résidu de poussière alcaline irritante sur la peau', 'Pour hydrater la peau'], correctAnswer: 1 },
      { question: 'Quel est le risque de respirer la poussière fine de carbonate de sodium (H335) ?', options: ['Elle donne de l\'énergie', 'Elle irrite fortement les muqueuses nasales et les voies respiratoires', 'Aucun risque'], correctAnswer: 1 },
      { question: 'Le carbonate de sodium est-il hygroscopique ?', options: ['Oui, il absorbe l\'humidité de l\'air et peut se prendre en masse', 'Non', 'Il repousse l\'eau'], correctAnswer: 0 },
      { question: 'En cas de déversement accidentel de poudre au sol, que faire ?', options: ['Laver à grande eau immédiatement', 'Ramasser mécaniquement à sec pour éviter de créer une solution alcaline glissante et irritante', 'Laisser tel quel'], correctAnswer: 1 },
      { question: 'Pourquoi le carbonate de sodium doit-il être stocké à l\'écart des acides ?', options: ['Ils s\'aiment trop', 'Pour éviter une réaction de neutralisation gazeuse accidentelle en cas de rupture de flacon', 'Pour gagner de la place'], correctAnswer: 1 }
    ]
  },
  {
    id: 'acetic_anhydride',
    name: 'Anhydride acétique',
    fullName: 'Anhydride acétique ((CH₃CO)₂O)',
    formula: '(CH3CO)2O',
    molarMass: '102.09 g/mol',
    physicalState: 'Liquide',
    meltingPoint: '-73 °C',
    commonNames: ['Anhydride éthanoïque'],
    appearance: 'Liquide incolore, odeur piquante de vinaigre',
    safetyPictograms: ['ghs02', 'ghs05', 'ghs07'],
    signalWord: 'Danger',
    hStatements: ['H226 : Liquide et vapeurs inflammables', 'H302 : Nocif en cas d\'ingestion', 'H314 : Provoque de graves brûlures de la peau', 'H332 : Nocif par inhalation'],
    pStatements: ['P210 : Tenir à l\'écart de la chaleur', 'P280 : Porter des gants/vêtements de protection', 'P305+P351+P338 : En cas de contact yeux : rincer'],
    healthHazards: ['Corrosion cutanée sévère', 'Lésions oculaires graves', 'Irritation respiratoire lacrymogène'],
    ppeRequired: ['Blouse en coton', 'Gants en butyle ou néoprène', 'Lunettes de protection étanches'],
    firstAid: ['Inhalation : Air frais. Consulter un médecin.', 'Peau : Rincer abondamment à l\'eau.', 'Yeux : Rincer immédiatement pendant 20 min.'],
    storageConditions: 'Conserver dans des récipients parfaitement d\'origine, hermétiquement et rigoureusement étanches (l\'anhydride réagit vivement avec l\'eau et l\'humidité de l\'air pour s\'hydrolyser en acide acétique en libérant de la chaleur). Stocker à l\'écart des sources de chaleur, flammes ou agents oxydants puissants.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Anhydride acétique\nPICTOS: GHS02, GHS05, GHS07\nPHRASES H: H226, H302, H314, H332\nPHRASES P: P210, P280, P305+P351+P338\nEPI: Blouse, Gants Butyle/Néoprène, Lunettes\nSECOURS: Air frais, Rincer 20min.\nNOTE: Lacrymogène, réagit violemment avec l'eau.")}`,
    quiz: [
      { question: 'Pourquoi l\'anhydride acétique est-il considéré comme un produit "lacrymogène" ?', options: ['Il sent bon', 'Ses vapeurs réagissent avec l\'humidité des yeux pour former de l\'acide acétique irritant', 'Il fait rire'], correctAnswer: 1 },
      { question: 'Que se passe-t-il si vous versez de l\'eau directement dans un grand volume d\'anhydride acétique ?', options: ['Le mélange se refroidit', 'Réaction violente et exothermique d\'hydrolyse dégageant des vapeurs brûlantes', 'Rien'], correctAnswer: 1 },
      { question: 'H314 sur l\'étiquette de l\'anhydride acétique signifie qu\'il est :', options: ['Très parfumé', 'Corrosif (provoque des brûlures chimiques graves)', 'Explosif à l\'air'], correctAnswer: 1 },
      { question: 'Quel est le risque de respirer les vapeurs d\'anhydride acétique (H332) ?', options: ['Une meilleure respiration', 'Nocif par inhalation, peut causer des lésions des voies respiratoires', 'Aucun risque'], correctAnswer: 1 },
      { question: 'Pourquoi doit-on utiliser du matériel parfaitement sec lors de sa manipulation (P232) ?', options: ['Pour l\'esthétique', 'L\'anhydride réagit avec l\'eau (hydrolyse), ce qui détruit le réactif et libère de la chaleur', 'Pour que ça pèse moins'], correctAnswer: 1 },
      { question: 'En cas de projection cutanée, pourquoi faut-il rincer pendant au moins 20 minutes ?', options: ['Pour refroidir', 'C\'est le temps nécessaire pour s\'assurer que l\'acide acétique formé est totalement éliminé des tissus', 'C\'est une règle sans fondement'], correctAnswer: 1 },
      { question: 'H226 indique que l\'anhydride acétique est un :', options: ['Solide stable', 'Liquide et vapeurs inflammables', 'Gaz inerte'], correctAnswer: 1 },
      { question: 'Quel type de gant offre la meilleure protection (Butyle ou Néoprène) ?', options: ['Coton', 'Butyle ou Néoprène épais (le latex est déconseillé car peu résistant)', 'Plastique'], correctAnswer: 1 },
      { question: 'Pourquoi faut-il ouvrir le flacon impérativement sous hotte aspirante ?', options: ['Pour ne pas que le flacon tombe', 'Pour éviter d\'inhaler les vapeurs piquantes et corrosives qui s\'échappent au débouchage', 'Pour faire moins de bruit'], correctAnswer: 1 },
      { question: 'Comment doit-on éliminer l\'excès d\'anhydride acétique après la synthèse ?', options: ['À l\'évier', 'Collecte dans le bidon de récupération des déchets organiques, jamais à l\'évier', 'Dans la poubelle banale'], correctAnswer: 1 }
    ]
  },
  {
    id: 'potassium_chromate',
    name: 'Chromate de potassium',
    fullName: 'Chromate de potassium (K₂CrO₄)',
    formula: 'K2CrO4',
    molarMass: '194.19 g/mol',
    physicalState: 'Solide cristallin',
    meltingPoint: '975 °C',
    appearance: 'Cristaux jaunes',
    safetyPictograms: ['ghs07', 'ghs08', 'ghs09'],
    signalWord: 'Danger',
    hStatements: ['H315 : Provoque une irritation cutanée', 'H319 : Provoque une sévère irritation des yeux', 'H340 : Peut induire des anomalies génétiques', 'H350i : Peut provoquer le cancer par inhalation', 'H410 : Très toxique pour les organismes aquatiques'],
    pStatements: ['P201 : Se procurer les instructions avant utilisation', 'P273 : Éviter le rejet dans l\'environnement', 'P280 : Porter des gants/vêtements de protection'],
    healthHazards: ['Cancérogène', 'Mutagène', 'Toxique pour la reproduction'],
    ppeRequired: ['Blouse', 'Gants en nitrile', 'Lunettes de protection étanches'],
    firstAid: ['Inhalation : Air frais. Consulter un médecin.', 'Peau : Laver abondamment.', 'Yeux : Rincer 15 min.'],
    storageConditions: 'Conserver impérativement sous clé dans une armoire de sécurité dédiée aux produits étiquetés CMR (Cancérogène, Mutagène, Reprotoxique). Stocker au frais, au sec, à l\'abri de l\'humidité et entièrement séparé des matières réductrices et des produits chimiques inflammables. Éviter toute création de poussières.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Chromate de potassium (K2CrO4)\nPICTOS: GHS07, GHS08, GHS09\nPHRASES H: H315, H319, H340, H350i, H410\nPHRASES P: P201, P273, P280\nEPI: Blouse, Gants Nitrile, Lunettes éticahes\nSECOURS: Air frais, Rincer abondamment.\nNOTE: PRODUIT CMR (Cancérogène, Mutagène).")}`,
    quiz: [
      { question: 'Pourquoi le chromate de potassium est-il classé comme CMR ?', options: ['Il est corrosif', 'Il est cancérogène, mutagène et toxique pour la reproduction', 'Il est inflammable'], correctAnswer: 1 },
      { question: 'Comment doit-on gérer les résidus de chromate de potassium ?', options: ['À l\'évier', 'Collecte dans un bidon spécifique pour métaux lourds (Chrome VI)', 'Dans la poubelle classique'], correctAnswer: 1 },
      { question: 'Que signifie la mention de danger H340 pour le chromate de potassium ?', options: ['Il est radioactif', 'Il peut induire des anomalies génétiques (Mutagène)', 'Il tache les mains'], correctAnswer: 1 },
      { question: 'H350i indique un risque de cancer par quelle voie d\'exposition ?', options: ['Par ingestion', 'Par inhalation de poussières ou de brouillards', 'Par contact cutané uniquement'], correctAnswer: 1 },
      { question: 'Pourquoi le port de gants en nitrile est-il obligatoire (P280) ?', options: ['Pour éviter de se salir avec la couleur jaune', 'Pour empêcher toute absorption cutanée d\'un produit hautement toxique et CMR', 'Pour le style'], correctAnswer: 1 },
      { question: 'H410 indique que le chromate de potassium est :', options: ['Bénéfique pour les plantes', 'Très toxique pour les organismes aquatiques avec des effets durables', 'Biodégradable'], correctAnswer: 1 },
      { question: 'P201 préconise de se procurer les instructions avant utilisation. Pourquoi ?', options: ['C\'est une perte de temps', 'La manipulation de produits CMR nécessite une formation spécifique et des précautions extrêmes', 'Pour lire les histoires du produit'], correctAnswer: 1 },
      { question: 'En cas de contact avec les yeux (H319), quelle est l\'action immédiate ?', options: ['Rincer 2 minutes', 'Rincer abondamment à l\'eau pendant au moins 15-20 min et consulter d\'urgence', 'Mettre du collyre'], correctAnswer: 1 },
      { question: 'Pourquoi est-il strictement interdit de fumer ou manger lors de sa manipulation (P270) ?', options: ['C\'est impoli', 'Risque majeur d\'ingestion ou d\'inhalation de traces d\'un produit cancérogène', 'Cela change le goût'], correctAnswer: 1 },
      { question: 'Le signal "Danger" sur l\'étiquette par rapport à "Attention" signifie :', options: ['Une dangerosité plus élevée', 'Une couleur plus vive', 'La même chose'], correctAnswer: 0 }
    ]
  },
  {
    id: 'iodine',
    name: 'Diiode',
    fullName: 'Diiode (I₂)',
    formula: 'I2',
    molarMass: '253.81 g/mol',
    physicalState: 'Solide',
    meltingPoint: '113.7 °C',
    appearance: 'Cristaux gris-noir à reflets violets, odeur piquante',
    safetyPictograms: ['ghs07', 'ghs08', 'ghs09'],
    signalWord: 'Danger',
    hStatements: ['H312 : Nocif par contact cutané', 'H315 : Provoque une irritation cutanée', 'H319 : Provoque une sévère irritation des yeux', 'H332 : Nocif par inhalation', 'H372 : Risque avéré d\'effets graves pour les organes (thyroïde)', 'H400 : Très toxique pour les organismes aquatiques'],
    pStatements: ['P273 : Éviter le rejet dans l\'environnement', 'P280 : Porter des gants/vêtements de protection', 'P302+P352 : En cas de contact peau : laver abondamment'],
    healthHazards: ['Effets sur la thyroïde', 'Irritation cutanée et oculaire', 'Tache la peau'],
    ppeRequired: ['Blouse', 'Gants en nitrile (double paire conseillée)', 'Lunettes de protection'],
    firstAid: ['Peau : Laver à l\'eau et au savon (les taches partent avec du thiosulfate)', 'Yeux : Rincer abondamment.'],
    storageConditions: 'Conserver dans des flacons en verre ambré opaque hermétiquement scellés, car le diiode se sublime spontanément à température ambiante en dégageant des vapeurs violettes corrosives et toxiques. Stocker au frais, à l\'écart des métaux (corrosions importantes), des agents réducteurs puissants et de l\'ammoniaque.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Diiode (I2)\nPICTOS: GHS07, GHS08, GHS09\nPHRASES H: H312, H315, H319, H332, H372, H400\nPHRASES P: P273, P280, P302+P352\nEPI: Blouse, Double Gants Nitrile, Lunettes\nSECOURS: Laver savon, Thiosulfate pour taches.\nNOTE: Toxique pour la thyroïde.")}`,
    quiz: [
      { question: 'Quel organe est principalement touché par une exposition chronique au diiode ?', options: ['Le foie', 'La thyroïde', 'Les poumons'], correctAnswer: 1 },
      { question: 'Pourquoi le diiode est-il dangereux pour l\'environnement ?', options: ['Il est radioactif', 'Il est très toxique pour les organismes aquatiques (H400)', 'Il acidifie l\'eau'], correctAnswer: 1 },
      { question: 'H372 pour le diiode signifie qu\'il y a un risque avéré pour les organes lors de :', options: ['Une seule exposition courte', 'Expositions répétées ou prolongées (Thyroïde)', 'Un contact avec le verre'], correctAnswer: 1 },
      { question: 'Pourquoi doit-on éviter de respirer les vapeurs de diiode (H332) ?', options: ['Elles font rire', 'Elles sont nocives par inhalation et irritent fortement les voies respiratoires', 'Elles sont inoffensives'], correctAnswer: 1 },
      { question: 'Quel est l\'effet du contact du diiode solide avec la peau (H312, H315) ?', options: ['Un bronzage', 'Nocif par contact cutané, provoque des irritations et tache profondément', 'Aucun'], correctAnswer: 1 },
      { question: 'P273 pour le diiode conseille d\'éviter :', options: ['La lumière vive', 'Le rejet dans l\'environnement (très polluant)', 'De le manger'], correctAnswer: 1 },
      { question: 'Comment peut-on éliminer efficacement les taches de diiode sur la peau ou la verrerie ?', options: ['Avec de l\'eau pure uniquement', 'Avec une solution de thiosulfate de sodium (réduction de I2 en I- incolore)', 'En grattant'], correctAnswer: 1 },
      { question: 'Pourquoi porte-t-on une double paire de gants lors de la manipulation du diiode pur ?', options: ['Il est très lourd', 'Il possède un fort pouvoir de pénétration à travers les gants fins', 'Pour avoir plus chaud'], correctAnswer: 1 },
      { question: 'Quelle est la précaution de stockage pour le diiode vis-à-vis des métaux ?', options: ['Stockage commun', 'Incompatible car il corrode la plupart des métaux (formation d\'iodures)', 'Aucun risque'], correctAnswer: 1 },
      { question: 'Le signal "Danger" sur le diiode indique :', options: ['Une toxicité avérée et grave', 'Qu\'il est radioactif', 'Qu\'il est périmé'], correctAnswer: 0 }
    ]
  },
  {
    id: 'phenolphthalein',
    name: 'Phénolphtaléine',
    fullName: 'Phénolphtaléine (C₂₀H₁₄O₄)',
    formula: 'C20H14O4',
    molarMass: '318.32 g/mol',
    physicalState: 'Solution (souvent dans l\'éthanol)',
    meltingPoint: '262 °C',
    appearance: 'Poudre blanche ou solution incolore',
    safetyPictograms: ['ghs02', 'ghs07', 'ghs08'],
    signalWord: 'Danger',
    hStatements: ['H225 : Liquide et vapeurs très inflammables', 'H341 : Susceptible d\'induire des anomalies génétiques', 'H350 : Peut provoquer le cancer', 'H361f : Susceptible de nuire à la fertilité'],
    pStatements: ['P201 : Se procurer les instructions avant utilisation', 'P210 : Tenir à l\'écart de la chaleur', 'P280 : Porter des gants/vêtements de protection'],
    healthHazards: ['Cancérogène', 'Mutagène', 'Irritant oculaire'],
    ppeRequired: ['Blouse', 'Gants en nitrile', 'Lunettes de protection'],
    firstAid: ['Inhalation : Air frais.', 'Peau : Laver abondamment.', 'Yeux : Rincer 15 min.'],
    storageConditions: 'S\'agissant d\'une solution préparée dans de l\'éthanol hautement inflammable, conserver à l\'écart de toute source de chaleur, d\'étincelles, de flammes nues ou d\'arcs électriques. Garder le flacon hermétiquement fermé dans une armoire de sécurité ventilée réservée aux solvants ou produits suspectés CMR.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Phénolphtaléine\nPICTOS: GHS02, GHS07, GHS08\nPHRASES H: H225, H341, H350, H361f\nPHRASES P: P201, P210, P280\nEPI: Blouse, Gants Nitrile, Lunettes\nSECOURS: Air frais, Rincer abondamment.\nNOTE: Suspecté CMR, inflammable en solution.")}`,
    quiz: [
      { question: 'Pourquoi la phénolphtaléine est-elle classée GHS08 (Danger pour la santé) ?', options: ['Elle est corrosive', 'Elle est classée comme cancérogène (H350) et mutagène', 'Elle tache les vêtements'], correctAnswer: 1 },
      { question: 'Quel est le risque de la solution de phénolphtaléine utilisée en TP ?', options: ['Elle est explosive', 'Elle est très inflammable car préparée dans l\'éthanol (H225)', 'Elle est inoffensive'], correctAnswer: 1 },
      { question: 'H350 associé à la phénolphtaléine signifie :', options: ['Peut provoquer le cancer', 'Provoque des maux de tête', 'Est un bon colorant'], correctAnswer: 0 },
      { question: 'Que signifie la mention H341 pour ce produit ?', options: ['Il est radioactif', 'Susceptible d\'induire des anomalies génétiques (Mutagène)', 'Il fait pousser les cheveux'], correctAnswer: 1 },
      { question: 'Quel est le risque pour la fertilité associé à la phénolphtaléine (H361f) ?', options: ['Aucun', 'Susceptible de nuire à la fertilité', 'Augmente la fertilité'], correctAnswer: 1 },
      { question: 'P201 préconise avant l\'usage de la phénolphtaléine de :', options: ['Bien l\'agiter', 'Se procurer les instructions avant utilisation en raison de sa toxicité CMR', 'La diluer'], correctAnswer: 1 },
      { question: 'P210 pour la solution de phénolphtaléine impose d\'éloigner :', options: ['Le sel', 'Toute source de chaleur, étincelles ou flammes nues', 'La lumière'], correctAnswer: 1 },
      { question: 'Pourquoi le port de gants est-il nécessaire pour manipuler cet indicateur (P280) ?', options: ['Pour ne pas se colorer les mains', 'Pour éviter toute pénétration cutanée d\'un produit cancérogène', 'C\'est optionnel'], correctAnswer: 1 },
      { question: 'En cas de projection oculaire de la solution alcoolique (H319) :', options: ['Attendre qu\'elle sèche', 'Rincer abondamment à l\'eau pendant plusieurs minutes', 'C\'est inoffensif'], correctAnswer: 1 },
      { question: 'Comment gérer les restes de solution de phénolphtaléine ?', options: ['À l\'évier', 'Collecte dans le bidon de récupération "Déchets organiques"', 'Dans la poubelle'], correctAnswer: 1 }
    ]
  },
  {
    id: 'ammonia',
    name: 'Ammoniaque',
    fullName: 'Ammoniaque (NH₃ en solution)',
    formula: 'NH3',
    molarMass: '17.03 g/mol',
    physicalState: 'Liquide (solution aqueuse)',
    meltingPoint: '-77.7 °C',
    appearance: 'Liquide incolore, odeur suffocante caractéristique',
    safetyPictograms: ['ghs05', 'ghs06', 'ghs09'],
    signalWord: 'Danger',
    hStatements: ['H314 : Provoque de graves brûlures de la peau', 'H331 : Toxique par inhalation', 'H335 : Peut irriter les voies respiratoires', 'H400 : Très toxique pour les organismes aquatiques'],
    pStatements: ['P261 : Éviter de respirer les vapeurs', 'P273 : Éviter le rejet dans l\'environnement', 'P280 : Porter des gants/vêtements de protection'],
    healthHazards: ['Toxicité respiratoire aiguë', 'Brûlures chimiques', 'Lacrymogène'],
    ppeRequired: ['Blouse', 'Gants en nitrile ou butyle', 'Lunettes de protection étanches', 'Manipulation sous hotte'],
    firstAid: ['Inhalation : Air frais immédiat. Consulter un médecin.', 'Peau : Laver abondamment 20 min.', 'Yeux : Rincer abondamment 20 min.'],
    storageConditions: 'Conserver dans des bouteilles d\'origine munies de soupapes ou de bouchons de sécurité étanches (le gaz NH₃ s\'échappe facilement et met la bouteille sous pression à la chaleur). Garder dans un endroit très frais et ventilé (armoire pour corrosifs/toxiques), séparé des acides forts, des métaux (cuivre, zinc) et des halogènes.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Ammoniaque (NH3)\nPICTOS: GHS05, GHS06, GHS09\nPHRASES H: H314, H331, H335, H400\nPHRASES P: P261, P273, P280\nEPI: Blouse, Gants, Lunettes étanches, Hotte\nSECOURS: Air frais immédiat, Rincer 20min.\nNOTE: Gaz toxique et corrosif.")}`,
    quiz: [
      { question: 'Pourquoi l\'ammoniaque doit-il être manipulé impérativement sous hotte ?', options: ['Il sent le poisson', 'Ses vapeurs sont toxiques, très irritantes pour les voies respiratoires et peuvent provoquer un oedème pulmonaire', 'Pour ne pas gâcher le gaz'], correctAnswer: 1 },
      { question: 'Quelle est la réaction de l\'ammoniaque avec les ions cuivre (II) ?', options: ['Formation d\'un précipité blanc', 'Formation d\'un complexe bleu céleste intense (liqueur de Schweitzer)', 'Aucune réaction'], correctAnswer: 1 },
      { question: 'H314 pour l\'ammoniaque signifie qu\'il est :', options: ['Parfumé', 'Corrosif (provoque de graves brûlures de la peau et des yeux)', 'Peu dangereux'], correctAnswer: 1 },
      { question: 'H331 indique que l\'ammoniaque est :', options: ['Radioactif', 'Toxique par inhalation', 'Inoffensif'], correctAnswer: 1 },
      { question: 'Quel est le danger de l\'ammoniaque pour le milieu aquatique (H400) ?', options: ['Il est très riche pour les poissons', 'Très toxique pour les organismes aquatiques', 'Aucun danger'], correctAnswer: 1 },
      { question: 'H335 prévient d\'un risque de :', options: ['Maux de ventre', 'Irritation sévère des voies respiratoires', 'Somnolence'], correctAnswer: 1 },
      { question: 'Pourquoi porte-t-on des gants en butyle ou nitrile (P280) ?', options: ['Pour son odeur', 'Empêcher la corrosion chimique de la peau par la base', 'C\'est optionnel'], correctAnswer: 1 },
      { question: 'En cas de projection oculaire d\'ammoniaque, pourquoi l\'urgence est-elle absolue ?', options: ['Le gaz s\'évapore trop vite', 'C\'est une base qui pénètre très profondément les tissus de l\'œil en les saponifiant', 'C\'est un acide fort'], correctAnswer: 1 },
      { question: 'P261 préconise d\'éviter de :', options: ['Manger', 'Respirer les vapeurs ou les brouillards', 'Le regarder'], correctAnswer: 1 },
      { question: 'Que faire en cas de déversement accidentel d\'un grand volume d\'ammoniaque ?', options: ['Rester pour éponger', 'Évacuer immédiatement la zone à cause du risque de toxicité respiratoire aiguë', 'Ouvrir les fenêtres et attendre'], correctAnswer: 1 }
    ]
  },
  {
    id: 'edta',
    name: 'EDTA',
    fullName: 'EDTA (Sel disodique)',
    formula: 'C10H14N2Na2O8',
    molarMass: '336.21 g/mol',
    physicalState: 'Solide (poudre)',
    meltingPoint: '248 °C',
    appearance: 'Poudre blanche cristalline',
    safetyPictograms: ['ghs07', 'ghs08'],
    signalWord: 'Attention',
    hStatements: ['H332 : Nocif par inhalation (poussières)', 'H373 : Risque présumé d\'effets graves pour les organes (poumons) à la suite d\'expositions répétées'],
    pStatements: ['P260 : Ne pas respirer les poussières', 'P280 : Porter des gants/vêtements de protection'],
    healthHazards: ['Toxicité respiratoire chronique', 'Irritation légère'],
    ppeRequired: ['Blouse', 'Gants', 'Lunettes de protection'],
    firstAid: ['Inhalation : Air frais.', 'Peau : Laver à l\'eau.', 'Yeux : Rincer abondamment.'],
    storageConditions: 'Conserver au sec, au frais et dans des flacons hermétiquement clos pour éviter les émissions ou l\'inhalation de poussières de ligand. Stocker séparément des agents oxydants puissants et à température ambiante.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: EDTA (Sel disodique)\nPICTOS: GHS07, GHS08\nPHRASES H: H332, H373\nPHRASES P: P260, P280\nEPI: Blouse, Gants, Lunettes\nSECOURS: Air frais, Rincer l'eau.\nNOTE: Nocif par inhalation de poussières.")}`,
    quiz: [
      { question: 'Quel est le risque principal associé à la poussière d\'EDTA pur ?', options: ['Elle est explosive', 'Elle est nocive par inhalation et peut causer des lésions pulmonaires à long terme (H373)', 'Elle est sans danger'], correctAnswer: 1 },
      { question: 'Pourquoi utilise-t-on l\'EDTA en complexométrie ?', options: ['C\'est un colorant', 'C\'est un ligand qui forme des complexes très stables avec les ions métalliques', 'Il sert à nettoyer les tubes'], correctAnswer: 1 },
      { question: 'H332 pour l\'EDTA signifie qu\'il est :', options: ['Toxique mortel', 'Nocif par inhalation (vapeurs ou poussières)', 'Parfumé'], correctAnswer: 1 },
      { question: 'H373 indique un risque d\'effets graves pour quels organes ?', options: ['Le coeur', 'Les poumons (suite à une inhalation répétée)', 'Le foie'], correctAnswer: 1 },
      { question: 'Pourquoi ne doit-on pas respirer la poussière d\'EDTA pur (P260) ?', options: ['Elle fait éternuer seulement', 'Elle provoque des lésions pulmonaires chroniques', 'Elle est radioactive'], correctAnswer: 1 },
      { question: 'En cas de contact avec les yeux (H319), quelle est la procédure ?', options: ['Rincer abondamment à l\'eau pendant plusieurs minutes', 'Attendre que ça passe', 'C\'est sans danger'], correctAnswer: 0 },
      { question: 'P280 pour l\'EDTA spécifie le port de :', options: ['Un masque à gaz', 'Gants et lunettes de protection', 'Rien'], correctAnswer: 1 },
      { question: 'Pourquoi est-il interdit de jeter les restes de solutions d\'EDTA à l\'évier (H411) ?', options: ['Cela bouche les tuyaux', 'C\'est un produit persistant et polluant pour le milieu aquatique', 'Pour les réutiliser'], correctAnswer: 1 },
      { question: 'Le sel disodique de l\'EDTA est-il plus soluble que l\'acide libre ?', options: ['Oui, beaucoup plus', 'Non', 'Pareil'], correctAnswer: 0 },
      { question: 'Quel est le rôle du pH dans l\'utilisation de l\'EDTA ?', options: ['Aucun', 'Un pH spécifique est nécessaire pour assurer la stabilité du complexe métal-EDTA', 'Il change la couleur de l\'EDTA'], correctAnswer: 1 }
    ]
  },
  {
    id: 'h2o2',
    name: 'Peroxyde d\'hydrogène',
    fullName: 'Peroxyde d\'hydrogène (Eau oxygénée) (H₂O₂)',
    formula: 'H2O2',
    molarMass: '34.01 g/mol',
    physicalState: 'Liquide ou solution aqueuse',
    meltingPoint: '-0.43 °C (pur)',
    commonNames: ['Eau oxygénée'],
    ph: '2 - 4 (solution commerciale)',
    density: '1.45 g/cm³ (pur)',
    boilingPoint: '150.2 °C',
    appearance: 'Liquide clair, incolore, limpide',
    safetyPictograms: ['ghs03', 'ghs05', 'ghs07'],
    signalWord: 'Danger',
    hStatements: [
      'H271 : Peut provoquer un incendie ou une explosion; comburant puissant',
      'H302 : Nocif en cas d\'ingestion',
      'H314 : Provoque de graves brûlures de la peau et de graves lésions oculaires',
      'H335 : Peut irriter les voies respiratoires'
    ],
    pStatements: [
      'P210 : Tenir à l\'écart de la chaleur, des surfaces chaudes et des étincelles',
      'P280 : Porter des gants de protection/des vêtements de protection/un équipement de protection des yeux',
      'P305+P351+P338 : EN CAS DE CONTACT AVEC LES YEUX : Rincer avec précaution à l\'eau pendant plusieurs minutes'
    ],
    healthHazards: ['Brûlures chimiques sévères', 'Dégagement intensif d\'oxygène gazeux', 'Destruction superficielle de la peau (blanchiment temporaire)'],
    ppeRequired: ['Blouse en coton', 'Gants résistants en nitrile ou néoprène', 'Lunettes de protection étanches (recommandées)'],
    firstAid: [
      'Inhalation : Transporter la personne à l\'air frais et la laisser se reposer.',
      'Peau : Rincer immédiatement à l\'eau claire (les taches blanches superficielles sont des petites bulles d\'oxygène coagulant la peau, elles partent vite).',
      'Yeux : Rincer abondamment à l\'eau courante pendant au moins 15 minutes. Consulter immédiatement un médecin.',
      'Ingestion : Rincer la bouche. Ne pas faire vomir. Boire beaucoup d\'eau s\'il est dilué.'
    ],
    storageConditions: 'Conserver exclusivement dans le flacon d\'origine opaque à l\'abri du soleil et de la chaleur. Le récipient doit obligatoirement posséder un bouchon muni de soupape ou évent de sécurité (le produit se décompose spontanément en dégageant de l\'oxygène gazeux et accumule de la pression). Tenir éloigné des métaux, bases, matières combustibles ou réducteurs puissants.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Peroxyde d'hydrogène (H2O2)\nPICTOS: GHS03, GHS05, GHS07\nPHRASES H: H271, H302, H314, H335\nPHRASES P: P210, P280, P305+P351+P338\nEPI: Blouse, Gants nitrile, Lunettes de protection\nSECOURS: Rincer abondamment, air frais\nNOTE: Dégagement de gaz en présence de catalyseur.")}`,
    quiz: [
      { question: 'Pourquoi l\'eau oxygénée concentrée (H2O2) blanchit-elle instantanément la peau en cas de contact ?', options: ['C\'est un colorant blanc', 'Elle oxyde les lipides et libère du dioxygène sous forme de microbulles piégées dans l\'épiderme', 'Elle lave en profondeur'], correctAnswer: 1 },
      { question: 'Quelle est la réaction chimique appelée "dismutation" de l\'eau oxygénée ?', options: ['Sa décomposition spontanée en dioxygène (O2) et eau (H2O)', 'Sa transformation en acide sulfurique', 'Sa solidification sous forme de glace'], correctAnswer: 0 },
      { question: 'Quel catalyseur très courant permet d\'accélérer de manière spectaculaire la dismutation de H2O2 ?', options: ['Le chlorure de sodium (NaCl)', 'Le dioxyde de manganèse (MnO2) ou les ions fer (III)', 'L\'acide acétique'], correctAnswer: 1 },
      { question: 'Que signifie "Eau oxygénée à 10 volumes" couramment vendue en pharmacie ?', options: ['Elle se conserve pendant 10 ans', 'Un litre de cette solution peut libérer 10 litres de dioxygène gazeux dans les conditions normales de température et de pression', 'Elle contient 10 ingrédients chimiques'], correctAnswer: 1 },
      { question: 'Quel pictogramme GHS explique le risque d\'incendie violent lié à l\'eau oxygénée concentrée ?', options: ['GHS01 (Explosif)', 'GHS03 (Comburant / Flamme sur un cercle)', 'GHS06 (Toxique)'], correctAnswer: 1 },
      { question: 'Pourquoi un flacon d\'eau oxygénée commercial ne doit jamais être muni d\'un couvercle totalement étanche hermétique sans évent ?', options: ['Pour pouvoir la sentir', 'La décomposition lente produit du dioxygène gazeux qui provoquerait l\'explosion mécanique du flacon sous pression', 'Pour que de l\'eau n\'y rentre pas'], correctAnswer: 1 },
      { question: 'Pourquoi l\'utilisation de solutions de H2O2 très concentrées (> 30%) nécessite-t-elle des gants épais au laboratoire ?', options: ['Pour ne pas renverser le flacon', 'Elle provoque instantanément des brûlures chimiques et des douleurs aiguës de la peau par sa force oxydante', 'Pour maintenir la température du flacon'], correctAnswer: 1 },
      { question: 'En cas de projection de peroxyde d\'hydrogène dans les yeux, quel est le risque principal (H314) ?', options: ['Une sensation de fraicheur', 'Des brûlures de la cornée et un risque important de cécité permanente', 'Une amélioration de la vision'], correctAnswer: 1 },
      { question: 'Quelle est la formule chimique du peroxyde d\'hydrogène ?', options: ['HO', 'H2O2', 'H3O+'], correctAnswer: 1 },
      { question: 'Pourquoi le peroxyde d\'hydrogène est-il utilisé comme désinfectant (antiseptique) ?', options: ['Il sent bon', 'Son pouvoir oxydant puissant détruit les parois cellulaires des bactéries', 'Il rafraîchit la plaie'], correctAnswer: 1 }
    ]
  },
  {
    id: 'sodium_thiosulfate',
    name: 'Thiosulfate de sodium',
    fullName: 'Thiosulfate de sodium (Na₂S₂O₃)',
    formula: 'Na2S2O3',
    molarMass: '158.11 g/mol',
    physicalState: 'Solide cristallin ou en solution',
    meltingPoint: '48.3 °C (pentahydraté)',
    commonNames: ['Thiosulfate', 'Hyposulfite de soude'],
    ph: '6.5 - 8.0 (solution aqueuse)',
    density: '1.66 g/cm³',
    appearance: 'Cristaux incolores transparents ou poudre blanche inodore',
    safetyPictograms: ['ghs07'],
    signalWord: 'Attention',
    hStatements: [
      'H315 : Provoque une irritation cutanée',
      'H319 : Provoque une sévère irritation des yeux'
    ],
    pStatements: [
      'P280 : Porter des gants de protection/des vêtements de protection/un équipement de protection des yeux',
      'P302+P352 : EN CAS DE CONTACT AVEC LA PEAU : Laver abondamment à l\'eau et au savon',
      'P305+P351+P338 : EN CAS DE CONTACT AVEC LES YEUX : Rincer avec précaution à l\'eau pendant plusieurs minutes'
    ],
    healthHazards: ['Irritation cutanée légère', 'Irritation oculaire', 'Poussières irritantes pour les voies respiratoires'],
    ppeRequired: ['Blouse en coton', 'Gants de protection en nitrile standard', 'Lunettes de protection standard'],
    firstAid: [
      'Inhalation : Transporter la personne à l\'air frais.',
      'Peau : Laver immédiatement avec du savon et de l\'eau.',
      'Yeux : Rincer abondamment à l\'eau pendant 15 minutes. Consulter un médecin si l\'irritation persiste.',
      'Ingestion : Rincer la bouche. Appeler un médecin ou boire de l\'eau en cas d\'ingestion massive.'
    ],
    storageConditions: 'Conserver dans des récipients d\'origine étanches à l\'abri de l\'humidité au sec et au frais. Éviter tout contact avec des acides forts (car la réaction d\'acidification produit instantanément une dismutation avec dégagement de dioxyde de soufre gazeux irritant SO₂ et de soufre solide colloïdal et blanc-jaunâtre S).',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Thiosulfate de sodium (Na2S2O3)\nPICTOS: GHS07\nPHRASES H: H315, H319\nPHRASES P: P280, P302+P352, P305+P351+P338\nEPI: Blouse, Gants nitrile, Lunettes de protection\nSECOURS: Laver à l'eau, rincer les yeux\nNOTE: Dismutation en milieu acide libérant du SO2.")}`,
    quiz: [
      { question: 'Pourquoi le thiosulfate de sodium est-il couramment utilisé pour les titrages en oxydoréduction au laboratoire ?', options: ['Il est très coloré', 'C\'est un réducteur doux et stable qui réduit quantitativement et rapidement le diiode (I2) en ions iodures (I-) (décoloration totale)', 'C\'est un acide fort'], correctAnswer: 1 },
      { question: 'Que se passe-t-il lorsque l\'on ajoute de l\'acide chlorhydrique (milieu acide) à une solution de thiosulfate de sodium ?', options: ['Le mélange devient limpide', 'Une réaction de dismutation produit un précipité jaune/blanc de soufre (turbidité progressive) et du dioxyde de soufre gazeux (SO2)', 'Il y a une explosion bruyante'], correctAnswer: 1 },
      { question: 'Quel gaz piquant et irritant est dégagé lors de la dismutation du thiosulfate en milieu acide ?', options: ['Le dioxygène (O2)', 'Le dioxyde de soufre (SO2)', 'Le dihydrogène (H2)'], correctAnswer: 1 },
      { question: 'Quelle est la réaction d\'oxydoréduction entre le diiode (I2) et l\'ion thiosulfate (S2O3 2-) ?', options: ['La formation de complexes rouges purs', 'La réduction du diiode en ions iodures (I-) incolores et l\'oxydation du thiosulfate en ion tétrathionate (S4O6 2-)', 'L\'oxydation de l\'eau'], correctAnswer: 1 },
      { question: 'Quelle est la coloration de la solution de thiosulfate de sodium en solution aqueuse ?', options: ['Bleue foncée', 'Incolore et limpide', 'Jaune fluo'], correctAnswer: 1 },
      { question: 'Pourquoi le thiosulfate de sodium est-il qualifié d\'agent neutralisant halogène ?', options: ['Il produit du sel de table', 'Il permet de neutraliser instantanément le dichlore ou le diiode résiduels par réduction chimique', 'Il alcalinise la solution'], correctAnswer: 1 },
      { question: 'En cas de dismutation accidentelle de thiosulfate en milieu acide dans la salle de TP, quelle est la consigne ?', options: ['Manipuler le reste sous hotte car le dioxyde de soufre (SO2) dégagé est très irritant pour les bronches', 'Fermer les portes de la salle', 'Frotter la solution au sol avec du papier sec'], correctAnswer: 0 },
      { question: 'Quelle est la formule chimique brute du thiosulfate de sodium ?', options: ['Na2SO4', 'Na2S2O3', 'NaHSO3'], correctAnswer: 1 },
      { question: 'Le thiosulfate de sodium réagit-il de manière explosive à température ordinaire ?', options: ['Oui', 'Non, c\'est un sel inorganique stable sans propriété explosive intrinsèque', 'Uniquement s\'il est mouillé'], correctAnswer: 1 },
      { question: 'Comment appelle-t-on le point idéal où le diiode a été entièrement réduit par le thiosulfate lors d\'un titrage ?', options: ['L\'équilibre thermique', 'L\'équivalence (repérée par la décoloration totale ou de l\'empois d\'amidon)', 'L\'état de saturation globale'], correctAnswer: 1 }
    ]
  },
  {
    id: 'potassium_iodide',
    name: 'Iodure de potassium',
    fullName: 'Iodure de potassium (KI)',
    formula: 'KI',
    molarMass: '166.00 g/mol',
    physicalState: 'Solide (poudre cristalline)',
    meltingPoint: '681 °C',
    commonNames: ['Iodure', 'Sel iodé concentré'],
    ph: '6.0 - 8.0 (solution aqueuse)',
    density: '3.12 g/cm³',
    boilingPoint: '1330 °C',
    appearance: 'Poudre ou granulés cristallins blancs, inodores',
    safetyPictograms: ['ghs07', 'ghs08'],
    signalWord: 'Attention',
    hStatements: [
      'H315 : Provoque une irritation cutanée',
      'H319 : Provoque une sévère irritation des yeux',
      'H372 : Risque avéré d\'effets graves pour les organes (thyroïde) à la suite d\'expositions répétées ou d\'une exposition prolongée'
    ],
    pStatements: [
      'P260 : Ne pas respirer les poussières/fumes/gaz/brouillards/vapeurs',
      'P280 : Porter des gants de protection/des vêtements de protection/un équipement de protection des yeux',
      'P305+P351+P338 : EN CAS DE CONTACT AVEC LES YEUX : Rincer avec précaution à l\'eau pendant plusieurs minutes'
    ],
    healthHazards: ['Irritation de la peau', 'Irritation oculaire', 'Perturbations de la synthèse hormonale thyroïdienne en cas d\'abus ou d\'exposition chronique'],
    ppeRequired: ['Blouse en coton', 'Gants en nitrile', 'Lunettes de sécurité avec protections latérales (générales)'],
    firstAid: [
      'Inhalation : Transporter la personne à l\'air frais. Consulter si gêne.',
      'Peau : Laver abondamment à l\'eau et au savon.',
      'Yeux : Rincer abondamment à l\'eau courante pendant 15 minutes. Consulter un spécialiste.',
      'Ingestion : Rincer la bouche. Boire de l\'eau. Consulter un médecin si malaise.'
    ],
    storageConditions: 'Conserver dans des pots d\'origine hermétiquement clos, à l\'abri de l\'humidité atmosphérique et surtout de la lumière (les ions iodures KI purs s\'oxydent lentement à l\'air et à la lumière pour libérer des traces de diiode I₂, prenant alors une couleur jaune-brune caractéristique).',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Iodure de potassium (KI)\nPICTOS: GHS07, GHS08\nPHRASES H: H315, H319, H372\nPHRASES P: P260, P280, P305+P351+P338\nEPI: Blouse, Gants nitrile, Lunettes de sécurité\nSECOURS: Rincer à l'eau, protéger la thyroïde\nNOTE: Sensible à l'oxydation progressive à l'air.")}`,
    quiz: [
      { question: 'Pourquoi une solution d\'iodure de potassium (KI) de laboratoire initialement incolore jaunit-elle avec le temps ?', options: ['Elle se périme de façon bénigne', 'Les ions iodure (I-) sont lentement oxydés par l\'oxygène de l\'air en diiode (I2) coloré', 'C\'est l\'action du calcaire de l\'eau'], correctAnswer: 1 },
      { question: 'Quel produit chimique est utilisé conjointement avec KI pour réaliser les célèbres expériences cinétiques de "l\'horloge à iode" ?', options: ['L\'eau oxygénée (H2O2) et des ions thiosulfate', 'L\'acide sulfurique concentré seul', 'Le chlorure de sodium pur'], correctAnswer: 0 },
      { question: 'Quelle est la réaction entre les ions plomb (Pb 2+) et les ions iodures (I-) en solution aqueuse ?', options: ['Un dégagement de chlore gazeux', 'Un précipité jaune d\'or très intense d\'iodure de plomb (PbI2) ("expérience de la pluie d\'or")', 'Aucun résultat observable'], correctAnswer: 1 },
      { question: 'H372 prévient d\'un risque d\'effets graves pour la thyroïde. Quel est le rôle général de l\'iode vis-à-vis de la thyroïde ?', options: ['L\'iode est essentiel pour la synthèse des hormones thyroïdiennes, mais une dose excessive chronique altère le fonctionnement de cette glande', 'L\'iode sert à détruire la glande thyroïde', 'Il n\'y a aucun rapport biologique'], correctAnswer: 0 },
      { question: 'Quelle est l\'alternative d\'usage médical de l\'iodure de potassium en cas d\'accident nucléaire ?', options: ['Il guérit le cancer immédiatement', 'Il sature la thyroïde en iode stable non radioactif pour empêcher l\'accumulation de l\'iode 131 radioactif cancérigène', 'Il neutralise les radiations à la surface de la peau'], correctAnswer: 1 },
      { question: 'Pourquoi utilise-t-on le KI pour fabriquer du "Lugol" ou de la "liqueur de diiode" ?', options: ['Il épaissit l\'eau', 'Le diiode (I2) est peu soluble dans l\'eau pure, mais KI permet la dissolution par formation de complexes triiodure (I3-)', 'Le KI donne de la couleur rouge'], correctAnswer: 1 },
      { question: 'Quel composé chimique est synonyme de la formule KI ?', options: ['Monoxyde d\'iode', 'Iodure de potassium', 'Chlorure de potassium iodé'], correctAnswer: 1 },
      { question: 'En cas de projection cutanée de solution d\'iodure de potassium :', options: ['Rincer immédiatement et abondamment à l\'eau pour éliminer les traces salines', 'Mettre du citron', 'Attendre que ça devienne violet'], correctAnswer: 0 },
      { question: 'Quelle est la propriété importante sur le plan de la texture du KI solide ?', options: ['Il est hydrophobe', 'Il est hygroscopique, il absorbe l\'humidité atmosphérique lentement et prend en bloc', 'Il fond à température ambiante'], correctAnswer: 1 },
      { question: 'Quel est l\'état physique de l\'iodure de potassium pur à température et pression ordinaires ?', options: ['Liquide volatile', 'Solide cristallin blanc', 'Gaz dense transparent'], correctAnswer: 1 }
    ]
  },
  {
    id: 'iron_sulfate',
    name: 'Sulfate de fer (II)',
    fullName: 'Sulfate de fer (II) (FeSO₄)',
    formula: 'FeSO4',
    molarMass: '151.91 g/mol',
    physicalState: 'Solide (cristaux)',
    meltingPoint: '64 °C (monohydraté)',
    commonNames: ['Vitriol vert', 'Couperose verte'],
    ph: '3.0 - 4.0 (solution aqueuse 5%)',
    density: '1.89 g/cm³',
    appearance: 'Cristaux de couleur verte pâle ou poudre inodore',
    safetyPictograms: ['ghs07'],
    signalWord: 'Attention',
    hStatements: [
      'H302 : Nocif en cas d\'ingestion',
      'H315 : Provoque une irritation cutanée',
      'H319 : Provoque une sévère irritation des yeux'
    ],
    pStatements: [
      'P264 : Se laver les mains soigneusement après manipulation',
      'P280 : Porter des gants de protection/un équipement de protection des yeux',
      'P301+P312 : EN CAS D\'INGESTION : Appeler un centre antipoison ou un médecin en cas de malaise'
    ],
    healthHazards: ['Nocif en cas d\'ingestion', 'Irritation cutanée', 'Irritation des muqueuses oculaires'],
    ppeRequired: ['Blouse en coton', 'Gants en nitrile standard', 'Lunettes de protection standard'],
    firstAid: [
      'Inhalation : Transporter la personne à l\'air frais.',
      'Peau : Laver abondamment à l\'eau et au savon.',
      'Yeux : Rincer immédiatement à l\'eau courante pendant 15 minutes. Consulter un médecin si l\'irritation dure.',
      'Ingestion : Rincer la bouche. Faire boire de l\'eau. Appeler une aide médicale d\'urgence.'
    ],
    storageConditions: 'Conserver au sec absolu, à température ambiante dans un emballage étanche. Sensible à l\'oxydation à l\'humidité sous l\'action de l\'air pour exhaler une couche de sulfate basique de fer (III) de texture et de teinte rouille/jaunâtre. Garder à l\'écart des alcalis.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Sulfate de fer (II) (FeSO4)\nPICTOS: GHS07\nPHRASES H: H302, H315, H319\nPHRASES P: P264, P280, P301+P312\nEPI: Blouse, Gants nitrile, Lunettes\nSECOURS: Rincer à l'eau, rincer la bouche\nNOTE: S'oxyde facilement à l'air en fer (III) rouille.")}`,
    quiz: [
      { question: 'Pourquoi les solutions aqueuses de sulfate de fer (II) préparées pour un TP doivent-elles souvent être acidifiées ?', options: ['Pour augmenter l\'acidité seulement', 'Pour empêcher l\'oxydation lente des ions fer (II) en ions fer (III) par le dioxygène dissous et empêcher la précipitation d\'hydroxyde de fer (III) rouille', 'Pour leur donner une bonne odeur'], correctAnswer: 1 },
      { question: 'Quel produit de couleur vert bouteille caractéristique se forme lorsque l\'on ajoute de la soude (NaOH) à une solution de sulfate de fer (II) ?', options: ['Un précipité d\'hydroxyde de fer (II) (Fe(OH)2)', 'Un précipité bleu de rouille liquide', 'Du dioxyde de fer gazeux'], correctAnswer: 0 },
      { question: 'Que se passe-t-il si l\'on ingère accidentellement de grandes quantités de sulfate de fer (II) solide (H302) ?', options: ['Aucun effet dangereux', 'Une intoxication aiguë au fer métallique avec douleurs d\'estomac, vomissements répétés et risques hépatiques', 'On améliore sa force immédiate'], correctAnswer: 1 },
      { question: 'Quelle est la couleur naturelle des cristaux de sulfate de fer (II) heptahydraté pur de laboratoire ?', options: ['Rouge rutilant', 'Bleu-vert pâle', 'Jaune d\'or brillant'], correctAnswer: 1 },
      { question: 'Dans les titrages de redox, quel oxydant fort et violet est très souvent titré par la solution de fer (II) ?', options: ['Le permanganate de potassium (KMnO4)', 'L\'acide acétique glacial', 'La phénolphtaléine'], correctAnswer: 0 },
      { question: 'Quelle est la charge ionique du fer dans le sulfate de fer (II) de formule FeSO4 ?', options: ['Fe 2+', 'Fe 3+', 'Fe+'], correctAnswer: 0 },
      { question: 'Quel est l\'effet de l\'action de l\'humidité et de l\'air de stockage sur le sulfate de fer (II) blanc-vert ?', options: ['Il reste identique', 'Il passe en fer (III) et prend une couleur jaune-rouille superficielle', 'Il fond instantanément'], correctAnswer: 1 },
      { question: 'En cas de déversement de solution de fer (II) sur la blouse en coton blanc, quel est le risque esthétique à long terme ?', options: ['Aucun', 'Formation de taches de rouille tenaces (oxyde ferrique) impossibles à éliminer au lavage classique', 'Une couleur bleu marine indélébile'], correctAnswer: 1 },
      { question: 'Pourquoi utilise-t-on le sulfate de fer (II) dans le traitement des eaux ?', options: ['Comme agent floculant et coagulant', 'Pour saler l\'eau', 'Pour la rendre transparente immédiatement sans filtre'], correctAnswer: 0 },
      { question: 'Quelle précaution de protection des yeux s\'impose pour peser de la poudre fine de FeSO4 ?', options: ['Utiliser une visière à gaz obligatoire', 'Porter des lunettes de protection classiques pour protéger contre les projections de cristaux ou de poussières', 'Ranger les lunettes de vue'], correctAnswer: 1 }
    ]
  },
  {
    id: 'sodium_bicarbonate',
    name: 'Bicarbonate de sodium',
    fullName: 'Bicarbonate de sodium (NaHCO₃)',
    formula: 'NaHCO3',
    molarMass: '84.01 g/mol',
    physicalState: 'Solide (poudre cristalline)',
    meltingPoint: '50 °C (décomposition progressive)',
    commonNames: ['Hydrogénocarbonate de sodium', 'Bicarbonate de soude'],
    ph: '8.3 (solution saturée)',
    density: '2.20 g/cm³',
    appearance: 'Poudre blanche inodore cristalline très douce',
    safetyPictograms: [],
    signalWord: 'Aucun',
    hStatements: [],
    pStatements: [
      'P262 : Éviter le contact avec les yeux',
      'P305+P351+P338 : EN CAS DE CONTACT AVEC LES YEUX : Rincer avec précaution à l\'eau pendant plusieurs minutes'
    ],
    healthHazards: ['Aucun danger majeur pour la santé au laboratoire', 'Peut causer une légère irritation oculaire mécanique par frottement'],
    ppeRequired: ['Blouse en coton', 'Lunettes de protection standard (conseillées)', 'Gants facultatifs pour la manipulation courante'],
    firstAid: [
      'Inhalation : Rejeter la poussière par mouchage doux.',
      'Peau : Rincer à l\'eau pure sans risque particulier.',
      'Yeux : Rincer abondamment sous l\'eau propre pendant 5 minutes. Consulter si gêne.',
      'Ingestion : Non toxique sous faibles volumes (utilisé en alimentation et médecine). Boire un peu d\'eau.'
    ],
    storageConditions: 'Conserver au sec absolu sous emballage fermé. Stable dans les conditions de stockage à température ambiante ordinaire.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Bicarbonate de sodium (NaHCO3)\nPICTOS: Aucun\nPHRASES H: Aucune\nPHRASES P: P262\nEPI: Blouse, Lunettes de protection\nSECOURS: Rincer à l'eau en cas de projection\nNOTE: Produit très sûr, tampon acide-base excellent.")}`,
    quiz: [
      { question: 'Quel type de gaz à forte effervescence est libéré lorsque l\'on ajoute de l\'acide sur du bicarbonate de sodium ?', options: ['Le dioxygène (O2)', 'Le dioxyde de carbone (CO2)', 'Le dichlore (Cl2)'], correctAnswer: 1 },
      { question: 'Quel est l\'effet biochimique majeur qui justifie l\'usage de NaHCO3 pour les brûlures acides superficielles sur la peau au laboratoire ?', options: ['C\'est un déshydratant', 'C\'est une base faible (tampon) qui neutralise en douceur l\'excès d\'acide sans provoquer d\'échauffement thermique excessif', 'Il refroidit la brûlure'], correctAnswer: 1 },
      { question: 'Pourquoi le bicarbonate de sodium est-il préféré au carbonate de sodium (Na2CO3) pour les soins de neutralisation cutanée ?', options: ['Le bicarbonate est beaucoup moins basique (pH de ~8.3) et non corrosif ni irritant', 'Il est plus blanc', 'Il mousse davantage'], correctAnswer: 0 },
      { question: 'Quelle est la formule chimique exacte de l\'hydrogénocarbonate de sodium ?', options: ['Na2CO3', 'NaHCO3', 'NaOH'], correctAnswer: 1 },
      { question: 'Comment se comporte la poudre de bicarbonate de sodium lorsqu\'on la chauffe fortement (au-dessus de 100°C) ?', options: ['Elle fond en un liquide incolore stable', 'Elle se décompose thermiquement en libérant du CO2, du carbonate de sodium (Na2CO3) et de la vapeur d\'eau', 'Elle explose immédiatement'], correctAnswer: 1 },
      { question: 'Pourquoi utilise-t-on de temps en temps le bicarbonate de sodium pour éteindre des feux de graisses ?', options: ['Il s\'évaporerait en refroidissant', 'La chaleur libère du CO2 (gaz inerte) et de l\'eau qui étouffent le foyer', 'Il réagit chimiquement pour faire du savon instantanément'], correctAnswer: 1 },
      { question: 'Pourquoi le bicarbonate de sodium est-il qualifié de composé amphotère modéré ?', options: ['Il aime nager', 'Il possède des propriétés tampons et peut agir comme un acide très faible ou une base faible selon le milieu', 'Il change de couleur'], correctAnswer: 1 },
      { question: 'Dans l\'industrie agroalimentaire, quel est le rôle de la levure chimique qui contient du NaHCO3 ?', options: ['Donner un goût sucré', 'Générer des bulles de gaz CO2 au four pour faire monter la pâte (levage)', 'Conserver le pain frais'], correctAnswer: 1 },
      { question: 'Le contact de la poudre sèche de bicarbonate avec les mains froides présente-t-il un danger ?', options: ['Non, il est sans toxicité systémique et très sûr pour la manipulation courante', 'Oui de graves cloques', 'Il s\'enflamme spontanément'], correctAnswer: 0 },
      { question: 'En cas de rejet accidentel de bicarbonate de sodium déversé dans les canalisations d\'eaux usées :', options: ['C\'est inoffensif, voire bénéfique pour corriger l\'acidité, mais évitez les gaspillages excessifs', 'Il faut évacuer les égouts', 'Cela corrode les canalisations'], correctAnswer: 0 }
    ]
  },
  {
    id: 'methylene_blue',
    name: 'Bleu de méthylène',
    fullName: 'Bleu de méthylène (C₁₆H₁₈ClN₃S)',
    formula: 'C16H18ClN3S',
    molarMass: '319.85 g/mol',
    physicalState: 'Solide (poudre) ou solution aqueuse',
    meltingPoint: '180 °C (décomposition)',
    commonNames: ['Chlorure de méthylthioninium', 'Bleu basique 9'],
    ph: '3.0 - 4.5 (solution aqueuse 1%)',
    density: '1.20 g/cm³',
    appearance: 'Poudre cristalline vert très foncé de reflets bronzes ou solution bleu outremer profond',
    safetyPictograms: ['ghs07'],
    signalWord: 'Attention',
    hStatements: [
      'H302 : Nocif en cas d\'ingestion',
      'H315 : Provoque une irritation cutanée',
      'H319 : Provoque une sévère irritation des yeux'
    ],
    pStatements: [
      'P280 : Porter des gants de protection/un équipement de protection des yeux',
      'P301+P312 : EN CAS D\'INGESTION : Appeler un centre antipoison en cas de malaise',
      'P305+P351+P338 : EN CAS DE CONTACT AVEC LES YEUX : Rincer avec précaution à l\'eau pendant plusieurs minutes'
    ],
    healthHazards: ['Coloration très persistante de la peau et des vêtements', 'Irritation oculaire', 'Irritation cutanée'],
    ppeRequired: ['Blouse de chimie (pour préserver les vêtements d\'une coloration indélébile)', 'Gants en nitrile', 'Lunettes de protection standard'],
    firstAid: [
      'Inhalation : Transporter à l\'air frais.',
      'Peau : Laver immédiatement et abondamment à l\'eau savonneuse (les taches résiduelles bleues partent sous quelques jours).',
      'Yeux : Rincer abondamment à l\'eau courante pendant 15 minutes. Consulter son médecin.',
      'Ingestion : Rincer la bouche. Boire de l\'eau. Appeler le médecin sans faire vomir.'
    ],
    storageConditions: 'Conserver à l\'abri de l\'humidité à température ambiante dans un flacon hermétique. Éviter d\'ajouter des agents réducteurs vigoureux qui détruiraient la teinte bleue en passant à l\'état neutre de leuco-dérivé.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Bleu de méthylène\nPICTOS: GHS07\nPHRASES H: H302, H315, H319\nPHRASES P: P280, P301+P312, P305+P351+P338\nEPI: Blouse, Gants nitrile, Lunettes de protection\nSECOURS: Laver eau savon, rincer yeux\nNOTE: Teinte bleue indélébile sur habits, indicateur redox.")}`,
    quiz: [
      { question: 'Pourquoi la couleur du bleu de méthylène se décolore-t-elle en présence de glucose et de soude (expérience de la bouteille bleue) ?', options: ['Le produit s\'évapore de la bouteille', 'Il subit une réduction réversible par le glucose en sa forme réduite incolore', 'La base détruit l\'iode de la formule'], correctAnswer: 1 },
      { question: 'Comment fait-on réapparaître instantanément la coloration bleue de la bouteille décolorée ?', options: ['On la chauffe au bec Bunsen', 'On agite la bouteille manuellement pour dissoudre le dioxygène de l\'air qui réoxyde le composé', 'On y ajoute du bicarbonate'], correctAnswer: 1 },
      { question: 'Quel rôle important joue le bleu de méthylène en oxydoréduction de TP ?', options: ['Avoir un beau liquide coloré décoratif', 'D\'indicateur redox réversible qui change de couleur selon le potentiel d\'oxydoréduction de la solution', 'De solvant inflammable classique'], correctAnswer: 1 },
      { question: 'Quel est l\'usage historique et classique du bleu de méthylène en biologie de laboratoire ?', options: ['Pour saler les tissus vivants', 'De colorant de contraste pour mettre en évidence les noyaux des cellules (liaisons avec l\'ADN)', 'Pour colorer les larmes'], correctAnswer: 1 },
      { question: 'En cas de projection de poudre de bleu de méthylène sur la peau, quel est le risque majeur ?', options: ['Une coloration bleue intense très persistante qui s\'atténue uniquement au bout de plusieurs jours de renouvellement cutané', 'Un brunissement similaire au bronzage', 'Une pousse soudaine de poils sombres'], correctAnswer: 0 },
      { question: 'D\'où provient l\'aspect de la poudre de bleu de méthylène pur solide commerciale ?', options: ['C\'est une poudre bleu fluo', 'C\'est une poudre vert très foncé, presque noire, possédant des reflets bronze métalliques', 'C\'est une pâte visqueuse jaune'], correctAnswer: 1 },
      { question: 'Pourquoi le port de la blouse est-il obligatoire avec le bleu de méthylène ?', options: ['Pour éviter d\'attraper froid', 'Une seule goutte diluée tache de manière définitive, durable et indélébile la plupart des étoffes', 'Pour la photo de fin de TP'], correctAnswer: 1 },
      { question: 'Quel est le traitement de laboratoire ou ménager conseillé pour décolorer une tache de bleu de méthylène sur de la verrerie ?', options: ['L\'action de l\'eau de Javel ou de solutions acides oxygénées réoxydantes', 'Utiliser du sel de cuisine', 'Garder au congélateur'], correctAnswer: 0 },
      { question: 'Quelle est la formule chimique générale du bleu de méthylène ?', options: ['FeSO4', 'C16H18ClN3S', 'C20H14O4'], correctAnswer: 1 },
      { question: 'En cas d\'ingestion accidentelle massive, outre la nocivité GHS07, quelle est la manifestation urinaire caractéristique ?', options: ['L\'urine prend une couleur orange fluo', 'L\'urine est colorée en bleu ou en vert (excrétion par les reins)', 'Aucune manifestation visible'], correctAnswer: 1 }
    ]
  },
  {
    id: 'bbt',
    name: 'Bleu de bromothymol',
    fullName: 'Bleu de bromothymol (C₂₇H₂₈Br₂O₅S)',
    formula: 'C27H28Br2O5S',
    molarMass: '624.38 g/mol',
    physicalState: 'Solution (généralement hydroalcoolique)',
    meltingPoint: '202 °C',
    commonNames: ['BBT', 'Bromothymol blue'],
    ph: '6.0 - 7.6 (zone de virage)',
    appearance: 'Solution jaune-orangé (acide), verte (neutre) ou bleue (basique)',
    safetyPictograms: ['ghs07', 'ghs02'],
    signalWord: 'Attention',
    hStatements: [
      'H226 : Liquide et vapeurs inflammables (si solvant alcoolique)',
      'H319 : Provoque une sévère irritation des yeux'
    ],
    pStatements: [
      'P210 : Tenir à l\'écart de la chaleur, des étincelles et des flammes nues',
      'P280 : Porter des gants de protection et un équipement de protection des yeux',
      'P305+P351+P338 : EN CAS DE CONTACT AVEC LES YEUX : Rincer prudemment à l\'eau'
    ],
    healthHazards: ['Irritation oculaire', 'Irritation cutanée légère', 'Solvant inflammable'],
    ppeRequired: ['Blouse de chimie', 'Lunettes de protection', 'Gants de protection'],
    firstAid: [
      'Inhalation : Transporter la personne à l\'air frais.',
      'Peau : Rincer abondamment à l\'eau.',
      'Yeux : Rincer à l\'eau avec précaution pendant 15 minutes. Consulter un médecin si l\'irritation persiste.',
      'Ingestion : Rincer la bouche. Consulter un médecin d\'urgence en cas d\'ingestion importante.'
    ],
    storageConditions: 'Conserver dans un flacon hermétique, à l\'abri de la chaleur et des flammes nues (si préparé avec de l\'éthanol). Stocker à température ambiante.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Bleu de bromothymol (BBT)\nPICTOS: GHS02, GHS07\nPHRASES H: H226, H319\nPHRASES P: P210, P280\nEPI: Blouse, Gants, Lunettes\nSECOURS: Rincer à l'eau\nNOTE: Indicateur coloré pH : jaune (acide), vert (neutre), bleu (basique).")}`,
    quiz: [
      { question: 'Quelle est la couleur du bleu de bromothymol (BBT) en milieu fortement basique (pH > 7.6) ?', options: ['Jaune', 'Bleu', 'Vert'], correctAnswer: 1 },
      { question: 'Quelle est la zone de virage du BBT, ce qui en fait un excellent indicateur pour les titrages de neutralisation proche du pH neutre ?', options: ['pH entre 3.1 et 4.4', 'pH entre 6.0 et 7.6', 'pH entre 8.2 et 10.0'], correctAnswer: 1 },
      { question: 'Pourquoi la solution commerciale de BBT est-elle souvent inflammable (H226) ?', options: ['Le BBT solide brûle tout seul', 'Parce qu\'elle est généralement préparée dans un mélange d\'eau et d\'éthanol (alcool inflammable)', 'Elle contient du sodium'], correctAnswer: 1 },
      { question: 'Quelle couleur prend le BBT lorsqu\'il est versé dans de l\'acide chlorhydrique dilué ?', options: ['Jaune', 'Bleu', 'Rose'], correctAnswer: 0 },
      { question: 'Que se passe-t-il si vous soufflez avec une paille dans une solution de BBT initialement verte-bleue ?', options: ['Elle devient jaune en raison du CO₂ expiré qui acidifie l\'eau en formant de l\'acide carbonique', 'Elle reste verte', 'Elle devient violette'], correctAnswer: 0 }
    ]
  },
  {
    id: 'hno3',
    name: 'Acide nitrique',
    fullName: 'Acide nitrique (HNO₃)',
    formula: 'HNO3',
    molarMass: '63.01 g/mol',
    physicalState: 'Liquide',
    meltingPoint: '-42 °C',
    commonNames: ['Acide azotique', 'Eau-forte'],
    ph: '< 1',
    density: '1.41 g/cm³ (solution commerciale 68%)',
    boilingPoint: '121 °C',
    appearance: 'Liquide incolore à légèrement jaune, très fumant, odeur piquante',
    safetyPictograms: ['ghs03', 'ghs05', 'ghs06'],
    signalWord: 'Danger',
    hStatements: [
      'H272 : Peut aggraver un incendie; comburant',
      'H290 : Peut être corrosif pour les métaux',
      'H314 : Provoque de graves brûlures de la peau et des lésions oculaires graves',
      'H330 : Mortel par inhalation'
    ],
    pStatements: [
      'P210 : Tenir à l\'écart de la chaleur, des surfaces chaudes, des étincelles et des flammes nues',
      'P260 : Ne pas respirer les vapeurs ou brouillards',
      'P280 : Porter des gants de protection/des vêtements de protection/un équipement de protection des yeux/du visage',
      'P301+P330+P331 : EN CAS D\'INGESTION : Rincer la bouche. NE PAS faire vomir'
    ],
    healthHazards: ['Nécrose cutanée profonde', 'Vapeurs mortelles', 'Brûlures oculaires irréversibles', 'Effet xanthoprotéique (jaunissement de la peau)'],
    ppeRequired: ['Blouse en coton épais', 'Gants résistants en néoprène ou fluoropolymère', 'Lunettes-masque de protection', 'Manipulation obligatoire sous hotte performante'],
    firstAid: [
      'Inhalation : Evacuer d\'urgence vers l\'air frais. Fournir de l\'oxygène si nécessaire et appeler le SAMU (15).',
      'Peau : Rincer immédiatement et abondamment à l\'eau courante pendant au moins 20 minutes.',
      'Yeux : Rincer à grande eau immédiatement d\'urgence pendant 20 minutes en maintenant les paupières entrouvertes.',
      'Ingestion : Rincer abondamment la bouche. NE PAS faire vomir (danger de perforation digestive). Appeler immédiatement les secours.'
    ],
    storageConditions: 'Conserver exclusivement dans son flacon d\'origine en PEHD ou verre épais, au frais et à l\'écart des matières organiques ou inflammables. L\'acide nitrique est incompatible avec la plupart des métaux et combustibles.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Acide nitrique (HNO3)\nPICTOS: GHS03, GHS05, GHS06\nPHRASES H: H272, H290, H314, H330\nPHRASES P: P210, P260, P280\nEPI: Blouse, Gants Spécifiques, Lunettes étanches, Hotte\nSECOURS: Rincer 20min d'urgence, appeler secours\nNOTE: Jaunit la peau (réaction xanthoprotéique). Vapeurs de NOx extrêmement toxiques.")}`,
    quiz: [
      { question: 'Pourquoi la peau jaunit-elle instantanément au contact d\'une goutte d\'acide nitrique ?', options: ['C\'est une brûlure thermique simple', 'C\'est la réaction xanthoprotéique (nitration des acides aminés aromatiques des protéines de la peau comme la kératine)', 'Il est coloré en jaune naturellement'], correctAnswer: 1 },
      { question: 'Quel gaz toxique de couleur rousse/brune caractéristique (NO₂) se dégage lorsque HNO₃ réagit avec le cuivre ou d\'autres métaux ?', options: ['Le dioxyde d\'azote (NO₂), un gaz hautement irritant et mortel pour les bronches', 'Le dihydrogène (H₂)', 'Le dioxyde de carbone (CO₂)', 'L\'oxygène (O₂)'], correctAnswer: 0 },
      { question: 'Pourquoi l\'acide nitrique est-il étiqueté avec le pictogramme "Comburant" (GHS03) ?', options: ['Il est extrêmement inflammable', 'C\'est un acide très oxydant qui fournit facilement de l\'oxygène et peut enflammer des matières combustibles spontanément', 'Il gèle l\'eau'], correctAnswer: 1 },
      { question: 'Quelle est la conduite à tenir indispensable en cas d\'inhalation de vapeurs rousses provenant d\'une réaction avec HNO₃ ?', options: ['Boire du lait', 'Évacuer immédiatement la pièce, respirer de l\'air frais et consulter d\'urgence en raison du risque d\'œdème pulmonaire retardé', 'S\'allonger et fermer les yeux'], correctAnswer: 1 },
      { question: 'Peut-on stocker l\'acide nitrique concentré dans la même armoire que les solvants organiques (éthanol, acétone) ?', options: ['Oui, car ce sont tous deux des liquides', 'Non, c\'est strictement proscrit car le contact de HNO₃ avec des solvants organiques peut déclencher une réaction explosive et un départ de feu instantané', 'Uniquement s\'ils sont dans des bouteilles plastiques'], correctAnswer: 1 }
    ]
  },
  {
    id: 'zinc',
    name: 'Zinc',
    fullName: 'Zinc (en poudre ou grenaille) (Zn)',
    formula: 'Zn',
    molarMass: '65.38 g/mol',
    physicalState: 'Solide',
    meltingPoint: '419.5 °C',
    commonNames: ['Poudre de zinc', 'Mousse de zinc', 'Zinc métal'],
    density: '7.14 g/cm³',
    appearance: 'Poudre fine grise ou morceaux brillants blanc-bleuâtre',
    safetyPictograms: ['ghs02', 'ghs09'],
    signalWord: 'Attention',
    hStatements: [
      'H228 : Solide inflammable (en poudre fine)',
      'H260 : Dégage des gaz inflammables (H₂) au contact de l\'eau ou de l\'humidité',
      'H410 : Très toxique pour les organismes aquatiques avec des effets à long terme'
    ],
    pStatements: [
      'P210 : Tenir à l\'écart de la chaleur, des surfaces chaudes, des étincelles et des flammes nues',
      'P273 : Éviter le rejet dans l\'environnement',
      'P370+P378 : En cas d\'incendie : Utiliser du sable sec ou de la poudre spéciale (ne jamais utiliser d\'eau)'
    ],
    healthHazards: ['Danger d\'inflammabilité aiguë (poudre)', 'Poussières irritantes', 'Hautement polluant pour les cours d\'eau'],
    ppeRequired: ['Blouse de chimie', 'Lunettes de protection', 'Gants de protection'],
    firstAid: [
      'Inhalation : Mettre à l\'air frais en cas d\'inhalation de poussières.',
      'Peau : Laver à l\'eau et au savon.',
      'Yeux : Rincer à l\'eau courante pendant 15 minutes en écartant les paupières. Consulter un médecin si l\'irritation persiste.',
      'Ingestion : Rincer la bouche. Consulter un centre antipoison.'
    ],
    storageConditions: 'Conserver dans un flacon hermétique très étanche dans un local sec. Tenir à l\'écart de l\'eau, de l\'humidité, des acides forts et des bases fortes (réactions exothermiques intenses dégageant du dihydrogène inflammable et explosif).',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Zinc métal (Zn)\nPICTOS: GHS02, GHS09\nPHRASES H: H228, H260, H410\nPHRASES P: P210, P273, P370+P378\nEPI: Blouse, Gants, Lunettes\nSECOURS: Secouer la poudre, rincer eau.\nNOTE: Très inflammable en poudre fine, réagit violemment avec les acides stables.")}`,
    quiz: [
      { question: 'Quel gaz extrêmement inflammable et explosif est produit lorsque le zinc réagit avec de l\'acide chlorhydrique (HCl) ?', options: ['Le dioxyde de carbone (CO₂)', 'Le dihydrogène (H₂)', 'Le dioxyde d\'azote (NO₂)', 'Le chlore (Cl₂)'], correctAnswer: 1 },
      { question: 'Pourquoi la poudre fine de zinc est-elle étiquetée "GHS02" alors que les blocs de zinc massifs ne le sont généralement pas ?', options: ['La poudre est radioactive', 'Une surface de contact élevée rend la poudre fine hautement inflammable à l\'air libre', 'La poudre est de couleur grise'], correctAnswer: 1 },
      { question: 'Quel agent d\'extinction est STRICTEMENT interdit pour éteindre un feu de poudre de zinc ?', options: ['Le sable sec', 'L\'eau ou les extincteurs à eau (réagit avec le métal chaud pour dégager de l\'hydrogène explosif)', 'La poudre de classe D'], correctAnswer: 1 },
      { question: 'Que signifie le pictogramme environnemental "GHS09" présent sur le flacon de zinc ?', options: ['Le produit est recyclable à l\'égout', 'Il est hautement toxique pour la vie aquatique avec des effets durables, d\'où le traitement obligatoire des résidus de sels de zinc en déchets chimiques stables', 'Il n\'est pas polluant'], correctAnswer: 1 }
    ]
  },
  {
    id: 'nacl',
    name: 'Chlorure de sodium',
    fullName: 'Chlorure de sodium (NaCl)',
    formula: 'NaCl',
    molarMass: '58.44 g/mol',
    physicalState: 'Solide cristallin',
    meltingPoint: '801 °C',
    commonNames: ['Sel de cuisine', 'Sel de table'],
    ph: '7.0 (neutre en solution)',
    density: '2.16 g/cm³',
    appearance: 'Poudre ou cristaux blancs inodores',
    safetyPictograms: [],
    signalWord: 'Aucun',
    hStatements: [],
    pStatements: [
      'P262 : Éviter le contact avec les yeux'
    ],
    healthHazards: ['Aucun danger majeur pour la santé au laboratoire', 'Peut causer une légère irritation oculaire mécanique'],
    ppeRequired: ['Blouse de chimie', 'Lunettes de protection de base'],
    firstAid: [
      'Peau : Laver simple à l\'eau douce.',
      'Yeux : Rincer doucement à l\'eau pendant quelques minutes.',
      'Ingestion : Non toxique sous faibles volumes comestibles.'
    ],
    storageConditions: 'Conserver dans un flacon scellé à l\'abri de l\'humidité pour éviter la prise en masse.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Chlorure de sodium (NaCl)\nPICTOS: Aucun\nPHRASES H: Aucune\nPHRASES P: P262\nEPI: Blouse, Lunettes de protection\nSECOURS: Rincer à l'eau\nNOTE: Produit très sûr sans pictogramme de danger. Utilisé pour le relargage.")}`,
    quiz: [
      { question: 'Quel est le rôle du chlorure de sodium (NaCl) lors de l\'étape du "relargage" d\'une huile essentielle distillée ?', options: ['Il saponifie l\'huile', 'Il augmente la force ionique de la phase aqueuse, réduisant ainsi la solubilité de l\'huile organique pour mieux l\'isoler', 'Il colore la phase aqueuse'], correctAnswer: 1 },
      { question: 'Le chlorure de sodium possède-t-il des pictogrammes de danger GHS obligatoires ?', options: ['Oui, GHS07 (irritant)', 'Non, il est considéré comme une substance non dangereuse au sens du règlement CLP', 'Oui, GHS09 (polluant)'], correctAnswer: 1 },
      { question: 'Pourquoi une solution froide de chlorure de sodium sature-t-elle à environ 360 g/L ?', options: ['À cette limite, l\'excès de cristaux ne peut plus se dissoudre par manque de molécules d\'eau d\'hydratation disponibles', 'Il n\'y a pas de limite physique', 'Le sel s\'évapore'], correctAnswer: 0 }
    ]
  },
  {
    id: 'mgso4',
    name: 'Sulfate de magnésium',
    fullName: 'Sulfate de magnésium (anhydre) (MgSO₄)',
    formula: 'MgSO4',
    molarMass: '120.37 g/mol',
    physicalState: 'Solide',
    meltingPoint: '1124 °C (décomposition)',
    commonNames: ['Sel d\'Epsom anhydre', 'Sulfate de magnésium desséchant'],
    appearance: 'Poudre blanche ou micro-cristaux inodores',
    safetyPictograms: ['ghs07'],
    signalWord: 'Attention',
    hStatements: [
      'H315 : Provoque une irritation cutanée',
      'H319 : Provoque une sévère irritation des yeux'
    ],
    pStatements: [
      'P280 : Porter des gants de protection et un équipement de protection des yeux',
      'P305+P351+P338 : EN CAS DE CONTACT AVEC LES YEUX : Rincer prudemment à l\'eau pendant plusieurs minutes'
    ],
    healthHazards: ['Légère irritation cutanée', 'Irritation oculaire', 'Poussière desséchante pour les muqueuses'],
    ppeRequired: ['Blouse de chimie', 'Lunettes de protection', 'Gants de protection en nitrile'],
    firstAid: [
      'Peau : Laver abondamment à l\'eau et au savon.',
      'Yeux : Rincer immédiatement à l\'eau claire pendant 10 minutes.',
      'Ingestion : Rincer la bouche. Boire de l\'eau. Consulter un médecin si malaise.'
    ],
    storageConditions: 'Conserver impérativement sous emballage hermétique étanche (produit extrêmement hygroscopique utilisé comme agent de séchage / desséchant chimique au laboratoire).',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Sulfate de magnésium anhydre (MgSO4)\nPICTOS: GHS07\nPHRASES H: H315, H319\nPHRASES P: P280, P305+P351+P338\nEPI: Blouse, Gants nitrile, Lunettes\nSECOURS: Rincer à l'eau\nNOTE: Agent desséchant extrêmement avide d'eau.")}`,
    quiz: [
      { question: 'Pourquoi utilise-t-is le sulfate de magnésium anhydre en chimie organique ?', options: ['Comme solvant principal réactif', 'Comme agent desséchant (capte toutes les traces d\'eau résiduelles dans une phase organique d\'extraction)', 'Comme catalyseur acide'], correctAnswer: 1 },
      { question: 'Que signifie le terme "anhydre" pour le sulfate de magnésium (MgSO₄) ?', options: ['Qu\'il est liquide', 'Qu\'il ne contient aucune molécule d\'eau dans sa structure cristalline (très avide d\'eau)', 'Qu\'il est liquide'], correctAnswer: 1 },
      { question: 'Comment sait-on visuellement que le sulfate de magnésium anhydre a capté toute l\'eau résiduelle d\'une solution ?', options: ['La poudre se dissout et disparaît', 'Les cristaux restent mobiles et s\'écoulent de manière fluide sans s\'agglomérer en "paquets" collés au fond', 'Le liquide devient magiquement bleu'], correctAnswer: 1 }
    ]
  },
  {
    id: 'fehling',
    name: 'Liqueur de Fehling',
    fullName: 'Liqueur de Fehling (Fraise / réactif de détection des aldéhydes)',
    formula: 'Cu2+ + NaOH',
    molarMass: 'N/A (Mélange)',
    physicalState: 'Liquide (mélange fraîchement préparé)',
    meltingPoint: '0 °C',
    commonNames: ['Réactif de Fehling', 'Fehling solution'],
    ph: '> 13',
    appearance: 'Solution limpide bleu roi profond',
    safetyPictograms: ['ghs05', 'ghs09'],
    signalWord: 'Danger',
    hStatements: [
      'H314 : Provoque de graves brûlures de la peau et des lésions oculaires graves',
      'H410 : Très toxique pour les organismes aquatiques avec des effets à long terme'
    ],
    pStatements: [
      'P273 : Éviter le rejet dans l\'environnement',
      'P280 : Porter des gants de protection/des vêtements de protection/un équipement de protection des yeux/du visage',
      'P301+P330+P331 : EN CAS D\'INGESTION : Rincer la bouche. NE PAS faire vomir'
    ],
    healthHazards: ['Brûlures chimiques cutanées sévères par alcalinité', 'Corrosion oculaire majeure', 'Hautement polluant pour les écosystèmes aquatiques'],
    ppeRequired: ['Blouse de chimie', 'Lunettes de protection avec protections latérales', 'Gants de protection en nitrile résistants'],
    firstAid: [
      'Peau : Rincer immédiatement à grande eau pendant au moins 15 minutes en retirant les vêtements souillés.',
      'Yeux : Rincer abondamment à l\'eau courante tiède pendant 20 minutes en maintenant les paupières ouvertes, consulter un médecin d\'urgence.',
      'Ingestion : Rincer immédiatement la bouche. Boire de l\'eau fraîche. NE PAS faire vomir.'
    ],
    storageConditions: 'Conserver de préférence sous forme de deux solutions distinctes : Fehling A (solution aqueuse de sulfate de cuivre) et Fehling B (tartrate de sodium et potassium en milieu hydroxyde de sodium). Stocker séparément de tout produit acide.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Liqueur de Fehling\nPICTOS: GHS05, GHS09\nPHRASES H: H314, H410\nPHRASES P: P273, P280\nEPI: Blouse, Gants nitrile, Lunettes\nSECOURS: Rincer abondamment à l'eau 20min\nNOTE: Réactif des sucres réducteurs (précipité rouge brique à chaud).")}`,
    quiz: [
      { question: 'Quel type de sucre la liqueur de Fehling permet-elle d\'identifier par chauffage doux ?', options: ['Les lipides neutres', 'Les sucres réducteurs, comme le glucose (formation d\'un précipité rouge brique d\'oxyde de cuivre I)', 'Toutes les molécules complexes comme la cellulose'], correctAnswer: 1 },
      { question: 'De quelles solutions le mélange fraîchement préparé de la liqueur de Fehling est-il constitué ?', options: ['Fehling A (sulfate de cuivre bleu) et Fehling B (tartrate alcalin transparent)', 'D\'acide citrique et d\'eau distillée', 'De permanganate et de soude'], correctAnswer: 0 },
      { question: 'Pourquoi la liqueur de Fehling est-elle si corrosive pour la peau (H314) ?', options: ['Elle est extrêmement acide', 'Elle possède un pH très élevé (>13) en raison de la présence d\'hydroxyde de sodium concentré dans Fehling B qui saponifie les lipides cellulaires', 'Elle est radioactive'], correctAnswer: 1 }
    ]
  },
  {
    id: 'lugol',
    name: 'Eau iodée (Lugol)',
    fullName: 'Solution de Lugol / Eau iodée (I₂ + KI)',
    formula: 'I2 + KI',
    molarMass: 'N/A (Mélange)',
    physicalState: 'Liquide',
    meltingPoint: '0 °C',
    commonNames: ['Solution de Lugol', 'Liqueur de Lugol', 'Eau iodée'],
    appearance: 'Solution limpide brune ou jaune-orangé sombre, faible odeur d\'iode',
    safetyPictograms: ['ghs07', 'ghs08'],
    signalWord: 'Attention',
    hStatements: [
      'H317 : Peut provoquer une allergie cutanée',
      'H373 : Risque présumé d\'effets graves pour les organes (thyroïde) à la suite d\'expositions répétées ou d\'expositions prolongées'
    ],
    pStatements: [
      'P261 : Éviter de respirer les vapeurs ou aérosols',
      'P280 : Porter des gants de protection/un équipement de protection des yeux'
    ],
    healthHazards: ['Tache la peau de manière très persistante en jaune-brun', 'Sensibilisation cutanée ou allergies', 'Effets perturbateurs sur la glande thyroïde en cas d\'ingestion récurrente'],
    ppeRequired: ['Blouse de chimie ou de SVT', 'Gants de protection en nitrile', 'Lunettes de protection standard'],
    firstAid: [
      'Peau : Laver abondamment à l\'eau courante et au savon ordinaire.',
      'Yeux : Rincer prudemment à l\'eau pendant plusieurs minutes.',
      'Ingestion : Rincer la bouche. Appeler le centre antipoison en cas d\'ingestion importante.'
    ],
    storageConditions: 'Conserver impérativement à l\'abri de la lumière directe du soleil et des fortes chaleurs dans un flacon ambré ou opaque bien clos.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Lugol / Eau iodée\nPICTOS: GHS07, GHS08\nPHRASES H: H317, H373\nPHRASES P: P261, P280\nEPI: Blouse, Gants nitrile, Lunettes de protection\nSECOURS: Laver à l'eau et savon.\nNOTE: Indicateur spécifique de l'amidon (coloration bleu foncé/violette). Sensible à la lumière.")}`,
    quiz: [
      { question: 'Quel polymère organique universel l\'eau iodée (Lugol) permet-elle de purifier ou mettre en lumière par une intense coloration bleu noir ou violette ?', options: ['Les acides aminés', 'L\'amidon (amylose)', 'Le saccharose libre'], correctAnswer: 1 },
      { question: 'Comment éliminer les taches jaunes de diiode de l\'eau iodée sur la peau ou la verrerie ?', options: ['En utilisant du vinaigre d\'alcool', 'En utilisant une solution diluée de thiosulfate de sodium qui réduit le diiode coloré en ions iodure incolores', 'Il n\'existe aucune méthode'], correctAnswer: 1 },
      { question: 'Quel organe vital régule le métabolisme de l\'iode et subit les effets de sa toxicité à long terme (H373) ?', options: ['La rate', 'La glande thyroïde', 'Le foie'], correctAnswer: 1 }
    ]
  },
  {
    id: 'glucose',
    name: 'Glucose',
    fullName: 'D-Glucose monohydraté / dextrose (C₆H₁₂O₆)',
    formula: 'C6H12O6',
    molarMass: '180.16 g/mol',
    physicalState: 'Solide cristallin',
    meltingPoint: '146 °C',
    commonNames: ['Dextrose', 'Sucre de raisin'],
    ph: '5.0 - 7.0 (en solution aqueuse à 10%)',
    appearance: 'Poudre cristalline blanche inodore, douce au goût',
    safetyPictograms: [],
    signalWord: 'Aucun',
    hStatements: [],
    pStatements: [
      'P262 : Éviter le contact direct oculaire mécanique'
    ],
    healthHazards: ['Aucun danger chimique ou toxicologique identifié au sens du CLP/SGH'],
    ppeRequired: ['Blouse de laboratoire classique', 'Lunettes de protection standard'],
    firstAid: [
      'Peau : Rincer abondamment sous l\'eau.',
      'Yeux : Laver à l\'eau claire en cas d\'invasion physique.'
    ],
    storageConditions: 'Conserver au sec pour éviter que la matière ne s\'agglomère, dans un tiroir ou une armoire standard.',
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Glucose (C6H12O6)\nPICTOS: Aucun\nPHRASES H: Aucune\nPHRASES P: Aucune\nEPI: Blouse de laboratoire\nSECOURS: Nettoyage simple\nNOTE: Sucre réducteur neutre, non dangereux. Très utilisé en SVT et biochimie.")}`,
    quiz: [
      { question: 'Le D-glucose pur fait-il l\'objet de restrictions ou d\'une classification GHS sous forme solide ?', options: ['Oui, il est toxique GHS06', 'Non, c\'est un glucide naturel sûr dépourvu de pictogramme d\'alerte ou de sécurité chimique', 'Oui, il est inflammable GHS02'], correctAnswer: 1 },
      { question: 'Quelle est la réaction positive du glucose soumis à une liqueur de Fehling sous un bec bunsen ?', options: ['Virage du liquide au bleu clair sans dépôts', 'Apparition d\'un précipité rouge brique insoluble', 'Dégagement d\'un gaz mousseux blanc'], correctAnswer: 1 }
    ]
  },
  {
    id: 'citric_acid',
    name: 'Acide citrique',
    fullName: 'Acide citrique monohydraté (C₆H₈O₇·H₂O)',
    formula: 'C6H8O7',
    molarMass: '210.14 g/mol',
    physicalState: 'Solide cristallin',
    meltingPoint: '153 °C',
    commonNames: ['Acide de citron', 'Acidifiant 330'],
    ph: '1.8 (à 50 g/L)',
    appearance: 'Cristaux blancs inodores ou granules translucides au goût sur',
    safetyPictograms: ['ghs07'],
    signalWord: 'Attention',
    hStatements: [
      'H319 : Provoque une sévère irritation des yeux',
      'H335 : Peut irriter les voies respiratoires (poussières de cristaux anhydres)'
    ],
    pStatements: [
      'P261 : Éviter de respirer les poussières',
      'P280 : Porter un équipement de protection des yeux/du visage',
      'P305+P351+P338 : EN CAS DE CONTACT AVEC LES YEUX : Rincer prudemment à l\'eau pendant plusieurs minutes'
    ],
    healthHazards: ['Forte irritation mécanique oculaire', 'Irritation passagère cutanée sous forme humide', 'Irritation des muqueuses nasales'],
    ppeRequired: ['Blouse de laboratoire', 'Lunettes de protection enveloppantes', 'Gants de protection en latex ou nitrile'],
    firstAid: [
      'Peau : Laver abondamment à l\'eau froide.',
      'Yeux : Laver immédiatement avec beaucoup d\'eau tiède pendant minimum 12 minutes. Voir un ophtalmologiste si l\'inconfort ou la rougeur subsiste.',
      'Inhalation : Sortir respirer de l\'air pur.'
    ],
    storageConditions: "Conserver à l'abri d'un niveau élevé d'humidité pour prémunir du durcissement en bloc solide hygroscopique.",
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("PRODUIT: Acide citrique (C6H8O7)\nPICTOS: GHS07\nPHRASES H: H319, H335\nPHRASES P: P261, P280, P305+P351+P338\nEPI: Blouse, Gants, Lunettes\nSECOURS: Rincer à l'eau longue durée.\nNOTE: Acide faible d'origine naturelle, fort irritant oculaire.")}`,
    quiz: [
      { question: 'Pourquoi l\'acide citrique est-il souvent utilisé lors de séances pratiques pour remplacer des acides forts en nettoyage de calcaire ?', options: ['C\'est un acide organique s\'avérant biodégradable et plus écoresponsable, diminuant les dangers de corrosion cutanée directe', 'Il est de couleur verte', 'Il nettoie mieux l\'or fin'], correctAnswer: 0 },
      { question: 'Quels risques principaux sont attachés à l\'acide citrique d\'après son étiquetage CLP (H319) ?', options: ['Il cause des mutations génétiques', 'Il s\'avère très irritant et agressif pour la cornée en cas de contact intempestif avec l\'oeil', 'Il détruit le plastique'], correctAnswer: 1 }
    ]
  },
  {
    id: 'sodium_sulfate',
    name: 'Sulfate de sodium',
    fullName: 'Sulfate de sodium anhydre (Na₂SO₄)',
    formula: 'Na2SO4',
    molarMass: '142.04 g/mol',
    physicalState: 'Solide (poudre cristalline)',
    meltingPoint: '884 °C',
    commonNames: ['Sel de Glauber (décahydraté)'],
    ph: '6.0 - 7.5 (solution 50 g/L)',
    appearance: 'Poudre cristalline blanche hygroscopique',
    safetyPictograms: [],
    signalWord: 'Aucun',
    hStatements: [],
    pStatements: [],
    healthHazards: ['Aucun danger significatif'],
    ppeRequired: ['Blouse de laboratoire', 'Lunettes de protection standard'],
    firstAid: [
      'Peau : Rincer à l\'eau.',
      'Yeux : Rincer à l\'eau claire.'
    ],
    storageConditions: 'Conserver au sec dans un récipient étanche pour éviter l\'absorption d\'humidité.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Quel est l\'usage principal du sulfate de sodium anhydre en chimie organique ?', options: ['C\'est un indicateur coloré', 'C\'est un agent desséchant pour éliminer les traces d\'eau d\'une phase organique', 'C\'est un oxydant puissant'], correctAnswer: 1 }
    ]
  },
  {
    id: 'cyclohexane',
    name: 'Cyclohexane',
    fullName: 'Cyclohexane (C₆H₁₂)',
    formula: 'C6H12',
    molarMass: '84.16 g/mol',
    physicalState: 'Liquide',
    meltingPoint: '6.5 °C',
    commonNames: ['Hexanaméthylène'],
    ph: 'Non applicable',
    appearance: 'Liquide incolore, odeur caractéristique d\'hydrocarbure',
    safetyPictograms: ['ghs02', 'ghs07', 'ghs08', 'ghs09'],
    signalWord: 'Danger',
    hStatements: [
      'H225 : Liquide et vapeurs très inflammables',
      'H304 : Peut être mortel en cas d\'ingestion et de pénétration dans les voies respiratoires',
      'H315 : Provoque une irritation cutanée',
      'H336 : Peut provoquer somnolence ou vertiges',
      'H410 : Très toxique pour les organismes aquatiques, entraîne des effets néfastes à long terme'
    ],
    pStatements: [
      'P210 : Tenir à l\'écart de la chaleur, des étincelles, des flammes nues',
      'P273 : Éviter le rejet dans l\'environnement',
      'P301+P310 : EN CAS D\'INGESTION : Appeler immédiatement un CENTRE ANTIPOISON'
    ],
    healthHazards: ['Danger d\'aspiration', 'Irritation cutanée', 'Dépression du système nerveux central'],
    ppeRequired: ['Blouse en coton', 'Gants en nitrile résistant aux solvants', 'Lunettes de protection étanches'],
    firstAid: [
      'Peau : Laver abondamment à l\'eau et au savon.',
      'Yeux : Rincer abondamment à l\'eau.',
      'Ingestion : Ne pas faire vomir en raison du risque d\'aspiration pulmonaire. Appeler d\'urgence un médecin.'
    ],
    storageConditions: 'Conserver dans une armoire pour produits inflammables, à l\'abri de toute source d\'inflammation.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Pourquoi ne faut-il jamais faire vomir une personne ayant avalé du cyclohexane ?', options: ['Cela annule l\'effet du solvant', 'Il y a un risque majeur d\'aspiration du liquide dans les poumons pouvant causer une pneumopathie chimique grave', 'Le cyclohexane réagit avec l\'acide gastrique'], correctAnswer: 1 }
    ]
  },
  {
    id: 'isopropanol',
    name: 'Isopropanol',
    fullName: 'Propan-2-ol (C₃H₈O)',
    formula: 'C3H8O',
    molarMass: '60.10 g/mol',
    physicalState: 'Liquide',
    meltingPoint: '-89 °C',
    commonNames: ['Alcool isopropylique', '2-propanol'],
    ph: 'Neutre',
    appearance: 'Liquide incolore, odeur d\'alcool forte',
    safetyPictograms: ['ghs02', 'ghs07'],
    signalWord: 'Danger',
    hStatements: [
      'H225 : Liquide et vapeurs très inflammables',
      'H319 : Provoque une sévère irritation des yeux',
      'H336 : Peut provoquer somnolence ou vertiges'
    ],
    pStatements: [
      'P210 : Tenir à l\'écart des sources d\'ignition',
      'P261 : Éviter de respirer les vapeurs',
      'P305+P351+P338 : EN CAS DE CONTACT AVEC LES YEUX : Rincer avec précaution à l\'eau'
    ],
    healthHazards: ['Irritation oculaire', 'Vertiges et somnolence par inhalation'],
    ppeRequired: ['Blouse de laboratoire', 'Gants en nitrile', 'Lunettes de protection standard'],
    firstAid: [
      'Peau : Laver à l\'eau.',
      'Yeux : Rincer à l\'eau pendant 10 minutes. Consulter si l\'irritation persiste.',
      'Inhalation : Transporter la personne à l\'air frais.'
    ],
    storageConditions: 'Conserver dans un endroit bien ventilé, à l\'abri de la chaleur et des flammes.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Quelle est la principale différence entre l\'éthanol et l\'isopropanol ?', options: ['L\'isopropanol est un alcool secondaire plus volatil et plus toxique par ingestion', 'L\'éthanol est bleu', 'L\'isopropanol ne brûle pas'], correctAnswer: 0 }
    ]
  },
  {
    id: 'ethyl_acetate',
    name: 'Acétate d’éthyle',
    fullName: 'Acétate d\'éthyle (CH₃COOCH₂CH₃)',
    formula: 'CH3COOCH2CH3',
    molarMass: '88.11 g/mol',
    physicalState: 'Liquide',
    meltingPoint: '-83.6 °C',
    commonNames: ['Éthanoate d\'éthyle'],
    ph: 'Non applicable',
    appearance: 'Liquide incolore, odeur fruitée agréable',
    safetyPictograms: ['ghs02', 'ghs07'],
    signalWord: 'Danger',
    hStatements: [
      'H225 : Liquide et vapeurs très inflammables',
      'H319 : Provoque une sévère irritation des yeux',
      'H336 : Peut provoquer somnolence ou vertiges',
      'EUH066 : L\'exposition répétée peut provoquer dessèchement ou gerçures de la peau'
    ],
    pStatements: [
      'P210 : Tenir à l\'écart des sources de chaleur',
      'P261 : Éviter de respirer les vapeurs',
      'P305+P351+P338 : EN CAS DE CONTACT AVEC LES YEUX : Rincer abondamment à l\'eau'
    ],
    healthHazards: ['Dessèchement cutané', 'Forte irritation des yeux'],
    ppeRequired: ['Blouse en coton', 'Gants en caoutchouc butyle (le nitrile offre une faible résistance fine)', 'Lunettes de protection'],
    firstAid: [
      'Peau : Laver avec de l\'eau et du savon.',
      'Yeux : Laver immédiatement avec beaucoup d\'eau claire.'
    ],
    storageConditions: 'Stocker dans l\'armoire de solvants inflammables.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Pourquoi les gants en nitrile standards sont-ils déconseillés pour de longues manipulations de l\'acétate d\'éthyle pur ?', options: ['Ils fondent de façon explosive', 'L\'acétate d\'éthyle s\'y infiltre très rapidement en raison d\'un temps de percée extrêmement court (quelques secondes)', 'Ils deviennent bleus'], correctAnswer: 1 }
    ]
  },
  {
    id: 'methyl_orange',
    name: 'Méthylorange',
    fullName: 'Héliantine (Méthylorange)',
    formula: 'C14H14N3NaO3S',
    molarMass: '327.33 g/mol',
    physicalState: 'Solide (poudre)',
    meltingPoint: '> 300 °C',
    commonNames: ['Héliantine', 'Orange de méthyle'],
    ph: 'Zone de virage : 3.1 (rouge) - 4.4 (jaune)',
    appearance: 'Poudre fine orangeâtre, inodore',
    safetyPictograms: ['ghs06'],
    signalWord: 'Danger',
    hStatements: [
      'H301 : Toxique en cas d\'ingestion'
    ],
    pStatements: [
      'P264 : Se laver les mains soigneusement après manipulation',
      'P301+P310 : EN CAS D\'INGESTION : Appeler immédiatement un CENTRE ANTIPOISON'
    ],
    healthHazards: ['Toxicité aiguë par voie orale'],
    ppeRequired: ['Blouse de laboratoire', 'Gants en nitrile', 'Lunettes de protection standard'],
    firstAid: [
      'Ingestion : Rincer la bouche. Appeler immédiatement un médecin ou un centre antipoison.'
    ],
    storageConditions: 'Conserver fermé de manière étanche dans l\'armoire des toxiques légers.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Quelle est la couleur du méthylorange à un pH de 2 ?', options: ['Jaune', 'Rouge', 'Vert'], correctAnswer: 1 }
    ]
  },
  {
    id: 'net_indicator',
    name: 'Noir Ériochrome T',
    fullName: 'Noir Ériochrome T (NET)',
    formula: 'C20H12N3NaO7S',
    molarMass: '461.38 g/mol',
    physicalState: 'Solide (poudre noire)',
    meltingPoint: 'Non applicable',
    commonNames: ['NET', 'Mordant Black 11'],
    ph: 'Indicateur de métaux (virage rose à bleu)',
    appearance: 'Poudre brun-noirâtre foncée',
    safetyPictograms: ['ghs07'],
    signalWord: 'Attention',
    hStatements: [
      'H319 : Provoque une sévère irritation des yeux'
    ],
    pStatements: [
      'P280 : Porter un équipement de protection des yeux',
      'P305+P351+P338 : EN CAS DE CONTACT AVEC LES YEUX : Rincer prudemment à l\'eau'
    ],
    healthHazards: ['Irritation des yeux et des voies respiratoires'],
    ppeRequired: ['Blouse', 'Gants de protection', 'Lunettes de protection'],
    firstAid: [
      'Yeux : Rincer abondamment à l\'eau claire.',
      'Peau : Laver la peau.'
    ],
    storageConditions: 'Conserver au sec à l\'abri de la lumière.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Lors d\'un titrage de dureté de l\'eau, pourquoi la solution passe-t-elle du rose au bleu azur à l\'équivalence avec le NET ?', options: ['Le pH descend à 1', 'Les ions calcium et magnésium sont entièrement chélatés par l\'EDTA, libérant le NET sous sa forme non complexée libre bleue', 'Il y a une précipitation d\'EDTA'], correctAnswer: 1 }
    ]
  },
  {
    id: 'magnesium_metal',
    name: 'Magnésium métallique',
    fullName: 'Magnésium métallique (ruban ou tournures) (Mg)',
    formula: 'Mg',
    molarMass: '24.31 g/mol',
    physicalState: 'Solide (ruban ou copeaux métalliques)',
    meltingPoint: '650 °C',
    commonNames: ['Magnésium', 'Ruban de magnésium'],
    ph: 'Non applicable',
    appearance: 'Métal argenté brillant et souple',
    safetyPictograms: ['ghs02'],
    signalWord: 'Danger',
    hStatements: [
      'H228 : Matière solide inflammable',
      'H261 : Dégage au contact de l\'eau des gaz inflammables (si en poudre fine)'
    ],
    pStatements: [
      'P210 : Tenir à l\'écart de la chaleur, des étincelles, des flammes nues',
      'P370+P378 : En cas d\'incendie : Utiliser du sable sec ou de la poudre pour métaux pour l\'extinction. NE JAMAIS UTILISER D\'EAU.'
    ],
    healthHazards: ['Brûlure thermique intense si allumé'],
    ppeRequired: ['Blouse en coton', 'Lunettes filtrantes contre les UV si combustion', 'Gants thermiques si chaud'],
    firstAid: [
      'Peau : Refroidir sous l\'eau froide.',
      'Combustion : Ne pas regarder directement la flamme blanche de magnésium (émission puissante d\'UV).'
    ],
    storageConditions: 'Conserver au sec, éloigné de l\'eau, des acides et des oxydants.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Pourquoi ne faut-il JAMAIS utiliser d\'eau ou de CO₂ pour éteindre un feu de magnésium ?', options: ['Le magnésium réagit violemment avec l\'eau et le CO₂ à haute température pour libérer du dihydrogène explosif et entretenir le feu', 'L\'eau solidifie le magnésium', 'Le sable est plus économique'], correctAnswer: 0 }
    ]
  },
  {
    id: 'copper_metal',
    name: 'Cuivre métallique',
    fullName: 'Cuivre (poudre ou tournures, Cu)',
    formula: 'Cu',
    molarMass: '63.55 g/mol',
    physicalState: 'Solide (tournures, morceaux ou poudre)',
    meltingPoint: '1085 °C',
    commonNames: ['Cuivre métal'],
    ph: 'Non applicable',
    appearance: 'Métal rouge orangé brillant',
    safetyPictograms: ['ghs09'],
    signalWord: 'Attention',
    hStatements: [
      'H410 : Très toxique pour les organismes aquatiques, entraîne des effets néfastes à long terme (sous forme pulvérulente)'
    ],
    pStatements: [
      'P273 : Éviter le rejet dans l\'environnement'
    ],
    healthHazards: ['Peu de danger sous forme massive, les poussières peuvent être irritantes'],
    ppeRequired: ['Blouse de laboratoire', 'Gants doux (manipulation massive)', 'Lunettes standard'],
    firstAid: [
      'Général : Laver à l\'eau.'
    ],
    storageConditions: 'Conserver au sec à l\'abri des acides forts.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Quelle est la réaction du cuivre métallique lorsqu\'il est plongé dans une solution de nitrate d\'argent ?', options: ['Il ne se passe rien', 'Une réaction d\'oxydoréduction se produit : le cuivre s\'oxyde en ions Cu2+ fins bleus et l\'argent métallique se dépose sur le cuivre', 'Le cuivre fond instantanément'], correctAnswer: 1 }
    ]
  },
  {
    id: 'iron_metal',
    name: 'Fer métallique',
    fullName: 'Fer (limaille ou fil, Fe)',
    formula: 'Fe',
    molarMass: '55.85 g/mol',
    physicalState: 'Solide (limaille de fer grise)',
    meltingPoint: '1538 °C',
    commonNames: ['Fer limaille', 'Laine de fer'],
    ph: 'Non applicable',
    appearance: 'Poudre ou filaments gris foncé, magnétiques',
    safetyPictograms: [],
    signalWord: 'Aucun',
    hStatements: [],
    pStatements: [],
    healthHazards: ['Irritation mécanique possible des yeux par les poussières magnétiques'],
    ppeRequired: ['Blouse de laboratoire', 'Lunettes de protection', 'Gants fins'],
    firstAid: [
      'Yeux : Rincer abondamment sous l\'eau. Ne pas frotter pour éviter les rayures de cornée.'
    ],
    storageConditions: 'Conserver hermétiquement fermé dans un endroit sec pour éviter l\'oxydation (rouille).',
    qrCodeUrl: '',
    quiz: [
      { question: 'Comment appelle-t-on le test chimique qualitatif pour prouver la présence d\'ions fer (II) Fe²+ formés après l\'attaque acide du fer métallique ?', options: ['Le test au nitrate d\'argent (précipité blanc)', 'L\'ajout de solution d\'hydroxyde de sodium qui forme un précipité vert d\'hydroxyde de fer(II)', 'Le test à la flamme bleue'], correctAnswer: 1 }
    ]
  },
  {
    id: 'calcium_chloride',
    name: 'Chlorure de calcium',
    fullName: 'Chlorure de calcium anhydre (CaCl₂)',
    formula: 'CaCl2',
    molarMass: '110.98 g/mol',
    physicalState: 'Solide (billes ou granulés)',
    meltingPoint: '772 °C',
    commonNames: ['Chlorure de calcium granulé'],
    ph: '8 - 9 (solution à 10%)',
    appearance: 'Granulés blancs, très déliquescents',
    safetyPictograms: ['ghs07'],
    signalWord: 'Attention',
    hStatements: [
      'H319 : Provoque une sévère irritation des yeux'
    ],
    pStatements: [
      'P264 : Se laver soigneusement après manipulation',
      'P305+P351+P338 : EN CAS DE CONTACT AVEC LES YEUX : Rincer abondamment'
    ],
    healthHazards: ['Forte irritation oculaire, dessèchement de la peau par absorption d\'eau'],
    ppeRequired: ['Blouse', 'Gants en nitrile', 'Lunettes de protection'],
    firstAid: [
      'Peau : Laver à l\'eau.',
      'Yeux : Rincer abondamment.'
    ],
    storageConditions: 'Conserver dans un flacon parfaitement hermétique (absorbe avidement l\'humidité de l\'air).',
    qrCodeUrl: '',
    quiz: [
      { question: 'Pourquoi le chlorure de calcium doit-il toujours être stocké dans des récipients hermétiquement fermés ?', options: ['Il s\'évapore complètement', 'Il est extrêmement hygroscopique et déliquescent, absorbant l\'humidité de l\'air jusqu\'à se dissoudre complètement dans sa propre eau absorbée', 'Il explose à l\'air'], correctAnswer: 1 }
    ]
  },
  {
    id: 'calcium_carbonate',
    name: 'Carbonate de calcium',
    fullName: 'Carbonate de calcium (CaCO₃)',
    formula: 'CaCO3',
    molarMass: '100.09 g/mol',
    physicalState: 'Solide (poudre)',
    meltingPoint: '825 °C (décomposition)',
    commonNames: ['Calcaire', 'Craie', 'Marbre'],
    ph: '9.5 (en suspension aqueuse saturée)',
    appearance: 'Poudre blanche fine ou morceaux rocheux solides',
    safetyPictograms: [],
    signalWord: 'Aucun',
    hStatements: [],
    pStatements: [],
    healthHazards: ['Aucun danger chimique (poussière non toxique)'],
    ppeRequired: ['Blouse de laboratoire', 'Lunettes standard'],
    firstAid: [
      'Général : Rincer la zone affectée à l\'eau claire.'
    ],
    storageConditions: 'Conserver dans un endroit sec.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Quel produit chimique gazeux est libéré lorsque l\'on verse de l\'acide chlorhydrique sur du carbonate de calcium ?', options: ['Le dioxygène (O2)', 'Le dioxyde de carbone (CO2) sous forme d\'une vive effervescence', 'Le gaz ammoniac'], correctAnswer: 1 }
    ]
  },
  {
    id: 'barium_chloride',
    name: 'Chlorure de baryum',
    fullName: 'Chlorure de baryum dihydraté (BaCl₂·2H₂O)',
    formula: 'BaCl2',
    molarMass: '244.26 g/mol',
    physicalState: 'Solide (cristaux)',
    meltingPoint: '962 °C',
    commonNames: ['Barium chloride'],
    ph: '5.2 - 8.2 (solution 50 g/L)',
    appearance: 'Poudre cristalline blanche ou cristaux translucides inodores',
    safetyPictograms: ['ghs06'],
    signalWord: 'Danger',
    hStatements: [
      'H301 : Toxique en cas d\'ingestion',
      'H332 : Nocif par inhalation'
    ],
    pStatements: [
      'P261 : Éviter de respirer les poussières',
      'P301+P310 : EN CAS D\'INGESTION : Appeler immédiatement un CENTRE ANTIPOISON'
    ],
    healthHazards: ['Toxicité aiguë systémique s\'il pénètre dans l\'organisme (bloque les canaux potassiques musculaires)'],
    ppeRequired: ['Blouse en coton', 'Gants en nitrile', 'Lunettes étanches'],
    firstAid: [
      'Ingestion : Provoquer si possible le vomissement uniquement sur avis médical d\'urgence. Appeler les secours.'
    ],
    storageConditions: 'Conserver sous clé dans l\'armoire des substances toxiques.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Quel ion commun du laboratoire le chlorure de baryum permet-il d\'identifier spécifiquement par formation d\'un précipité blanc laiteux très insoluble ?', options: ['L\'ion chlorure (Cl-)', 'L\'ion sulfate (SO4^2-) par formation de sulfate de baryum BaSO4', 'L\'ion nitrate (NO3-)'], correctAnswer: 1 }
    ]
  },
  {
    id: 'ammonium_chloride',
    name: 'Chlorure d’ammonium',
    fullName: 'Chlorure d\'ammonium (NH₄Cl)',
    formula: 'NH4Cl',
    molarMass: '53.49 g/mol',
    physicalState: 'Solide (poudre cristalline)',
    meltingPoint: '338 °C (sublimation)',
    commonNames: ['Sel ammoniac'],
    ph: '4.7 (solution à 5%)',
    appearance: 'Poudre blanche ou petits cristaux inodores',
    safetyPictograms: ['ghs07'],
    signalWord: 'Attention',
    hStatements: [
      'H302 : Nocif en cas d\'ingestion',
      'H319 : Provoque une sévère irritation des yeux'
    ],
    pStatements: [
      'P264 : Se laver les mains soigneusement après manipulation',
      'P305+P351+P338 : EN CAS DE CONTACT AVEC LES YEUX : Rincer abondamment'
    ],
    healthHazards: ['Irritation des muqueuses et des yeux'],
    ppeRequired: ['Blouse', 'Gants de protection en nitrile', 'Lunettes de protection'],
    firstAid: [
      'Yeux : Rincer immédiatement à l\'eau propre.'
    ],
    storageConditions: 'Conserver au sec pour empêcher l\'agglomération.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Pourquoi le chlorure d\'ammonium solide fume-t-il sous l\'action d\'une chaleur forte directe ?', options: ['Il brûle en formant de l\'eau', 'Il se sublime en se dissociant de façon réversible en ammoniac (NH3) gazeux et en chlorure d\'hydrogène (HCl) gazeux', 'Il est radioactif'], correctAnswer: 1 }
    ]
  },
  {
    id: 'zinc_sulfate',
    name: 'Sulfate de zinc',
    fullName: 'Sulfate de zinc heptahydraté (ZnSO₄·7H₂O)',
    formula: 'ZnSO4',
    molarMass: '287.56 g/mol',
    physicalState: 'Solide cristallin',
    meltingPoint: '100 °C (perte d\'eau de cristallisation)',
    commonNames: ['Vitriol blanc'],
    ph: '4.0 - 5.6 (solution 50 g/L)',
    appearance: 'Cristaux blancs efflorescents ou poudre cristalline',
    safetyPictograms: ['ghs05', 'ghs07', 'ghs09'],
    signalWord: 'Danger',
    hStatements: [
      'H302 : Nocif en cas d\'ingestion',
      'H318 : Provoque de graves lésions des yeux',
      'H410 : Très toxique pour les organismes aquatiques, entraîne des effets néfastes à long terme'
    ],
    pStatements: [
      'P273 : Éviter le rejet dans l\'environnement',
      'P280 : Porter des gants de protection/des vêtements de protection/un équipement de protection des yeux/du visage'
    ],
    healthHazards: ['Lésions oculaires irréversibles', 'Écotoxicité élevée'],
    ppeRequired: ['Blouse de laboratoire', 'Gants en nitrile', 'Lunettes de protection étanches'],
    firstAid: [
      'Yeux : Rincer immédiatement et abondamment à l\'eau tiède pendant au moins 15 minutes. Consulter immédiatement un spécialiste.'
    ],
    storageConditions: 'Conserver dans un endroit sec, à l\'abri du gel et éloigné de l\'eau.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Dans une pile Daniell (zinc-cuivre), quel est le rôle de la demi-pile contenant les ions zinc (Zn²+ issus du sulfate de zinc) ?', options: ['C\'est la cathode où a lieu la réduction', 'C\'est l\'anode où a lieu l\'oxydation de l\'électrode de zinc métallique', 'C\'est le pont salin'], correctAnswer: 1 }
    ]
  },
  {
    id: 'aluminum_sulfate',
    name: 'Sulfate de fer III',
    fullName: 'Sulfate de fer(III) (Fe₂(SO₄)₃)',
    formula: 'Fe2(SO4)3',
    molarMass: '399.88 g/mol',
    physicalState: 'Solide',
    meltingPoint: '480 °C (décomposition)',
    commonNames: ['Persulfate de fer jaune'],
    ph: 'Acide en solution aqueuse',
    appearance: 'Poudre ou cristaux de couleur jaune-beige pâle',
    safetyPictograms: ['ghs05', 'ghs07'],
    signalWord: 'Danger',
    hStatements: [
      'H302 : Nocif en cas d\'ingestion',
      'H315 : Provoque une irritation cutanée',
      'H318 : Provoque de graves lésions des yeux'
    ],
    pStatements: [
      'P280 : Porter des lunettes et des gants',
      'P305+P351+P338 : EN CAS DE CONTACT AVEC LES YEUX : Rincer abondamment'
    ],
    healthHazards: ['Lésions oculaires importantes', 'Irritation de la peau'],
    ppeRequired: ['Blouse', 'Gants en latex ou nitrile', 'Lunettes de protection'],
    firstAid: [
      'Yeux : Rincer immédiatement à l\'eau courante pendant 15 minutes.'
    ],
    storageConditions: 'Conserver hermétiquement fermé à l\'abri de l\'humidité.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Quelle coloration prend une solution contenant des ions Fe³+ (présents dans le sulfate de fer III) en présence d\'ions thiocyanate (SCN-) ?', options: ['Coloration bleu de Prusse', 'Coloration rouge sang caractéristique due au complexe [Fe(SCN)]²+', 'Coloration verte intense'], correctAnswer: 1 }
    ]
  },
  {
    id: 'sodium_phosphate',
    name: 'Phosphate de sodium',
    fullName: 'Phosphate trisodique dodécahydraté (Na₃PO₄·12H₂O)',
    formula: 'Na3PO4',
    molarMass: '380.12 g/mol',
    physicalState: 'Solide cristallin',
    meltingPoint: '73.5 °C (perte d\'eau)',
    commonNames: ['Phosphate de sodium tribasique'],
    ph: '11.5 - 12.5 (solution à 10 g/L)',
    appearance: 'Cristaux blancs inodores',
    safetyPictograms: ['ghs05', 'ghs07'],
    signalWord: 'Danger',
    hStatements: [
      'H315 : Provoque une irritation cutanée',
      'H318 : Provoque de graves lésions des yeux',
      'H335 : Peut irriter les voies respiratoires'
    ],
    pStatements: [
      'P261 : Éviter de respirer les poussières',
      'P280 : Porter des gants et lunettes'
    ],
    healthHazards: ['Corrosion cutanée et oculaire localisée à cause d\'un pH fortement basique'],
    ppeRequired: ['Blouse de laboratoire', 'Gants en nitrile', 'Lunettes étanches'],
    firstAid: [
      'Peau : Rincer immédiatement à l\'eau pendant plusieurs minutes.',
      'Yeux : Rincer en continu avec beaucoup d\'eau.'
    ],
    storageConditions: 'Conserver à l\'abri des acides et de l\'humidité.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Pourquoi une solution de phosphate trisodique possède-t-elle un pH très basique (pH > 11) ?', options: ['Parce que l\'ion phosphate PO4^3- est une base forte de Brønsted qui subit une hydrolyse basique importante dans l\'eau', 'Parce qu\'il contient du sodium acide', 'C\'est un sel inerte'], correctAnswer: 0 }
    ]
  },
  {
    id: 'calcium_hydroxide',
    name: 'Hydroxyde de calcium',
    fullName: 'Hydroxyde de calcium (Ca(OH)₂)',
    formula: 'Ca(OH)2',
    molarMass: '74.09 g/mol',
    physicalState: 'Solide (poudre)',
    meltingPoint: '580 °C (décomposition)',
    commonNames: ['Chaux éteinte', 'Eau de chaux (solution saturée)'],
    ph: '12.4 (solution saturée à 20 °C)',
    appearance: 'Poudre blanche fine, inodore',
    safetyPictograms: ['ghs05', 'ghs07'],
    signalWord: 'Danger',
    hStatements: [
      'H315 : Provoque une irritation cutanée',
      'H318 : Provoque de graves lésions des yeux',
      'H335 : Peut irriter les voies respiratoires'
    ],
    pStatements: [
      'P280 : Porter des gants de protection/des vêtements de protection/un équipement de protection des yeux/du visage',
      'P305+P351+P338 : EN CAS DE CONTACT AVEC LES YEUX : Rincer abondamment'
    ],
    healthHazards: ['Lésions corrosives graves aux yeux', 'Irritation intense des voies respiratoires'],
    ppeRequired: ['Blouse', 'Gants en nitrile (en PVC également)', 'Lunettes étanches ou visière'],
    firstAid: [
      'Yeux : Laver immédiatement avec de l\'eau courante pendant au moins 15-20 minutes.'
    ],
    storageConditions: 'Stocker hermétiquement scellé pour éviter sa carbonatation lente due au CO₂ de l\'air ambiant.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Quel trouble visuel se produit lorsque l\'on fait barboter du gaz carbonique (CO₂) dans de l\'eau de chaux limpide ?', options: ['Rien du tout', 'La solution se trouble en blanchissant en raison de la précipitation de carbonate de calcium CaCO3 insoluble', 'Elle devient violette'], correctAnswer: 1 }
    ]
  },
  {
    id: 'nickel_sulfate',
    name: 'Sulfate de nickel',
    fullName: 'Sulfate de nickel(II) hexahydraté (NiSO₄·6H₂O)',
    formula: 'NiSO4',
    molarMass: '262.85 g/mol',
    physicalState: 'Solide (cristaux verts)',
    meltingPoint: '53 °C (perte d\'eau)',
    commonNames: ['Sulfate de nickel'],
    ph: '4.5 (solution à 50 g/L)',
    appearance: 'Cristaux vert émeraude magnifiques, inodores',
    safetyPictograms: ['ghs07', 'ghs08', 'ghs09'],
    signalWord: 'Danger',
    hStatements: [
      'H302+H332 : Nocif en cas d\'ingestion ou d\'inhalation',
      'H315 : Provoque une irritation cutanée',
      'H317 : Peut provoquer une allergie cutanée',
      'H334 : Peut provoquer des symptômes d\'allergie ou d\'asthme par inhalation',
      'H341 : Suscepté d\'induire des anomalies génétiques',
      'H350i : Peut provoquer le cancer par inhalation',
      'H360D : Peut nuire au fœtus',
      'H372 : Risque avéré d\'effets graves pour les organes à la suite d\'expositions répétées',
      'H410 : Très toxique pour les organismes aquatiques, entraîne des effets néfastes à long terme'
    ],
    pStatements: [
      'P201 : Se procurer les instructions spéciales avant utilisation',
      'P273 : Éviter le rejet dans l\'environnement',
      'P280 : Porter des gants de protection/des vêtements de protection/un équipement de protection des yeux/du visage'
    ],
    healthHazards: ['Cancérogène respiratoire', 'Allergène cutané puissant', 'Toxique pour la reproduction'],
    ppeRequired: ['Blouse en coton fermée', 'Gants imperméables épais (gants jetables à changer à la moindre souillure)', 'Lunettes enveloppantes'],
    firstAid: [
      'Peau : Rincer immédiatement abondamment à l\'eau. Consulter en cas d\'allergie.',
      'Yeux : Rincer abondamment.'
    ],
    storageConditions: 'Conserver impérativement sous clé dans l\'armoire des substances CMR.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Quelle est la principale catégorie de danger représentée par le sulfate de nickel NiSO₄ ?', options: ['Liquide inflammable', 'Substance Cancérogène, Mutagène et Toxique pour la reproduction (CMR), nécessitant des mesures de restriction drastiques', 'Gaz sous pression'], correctAnswer: 1 }
    ]
  },
  {
    id: 'potassium_nitrate',
    name: 'Nitrate de potassium',
    fullName: 'Nitrate de potassium (KNO₃)',
    formula: 'KNO3',
    molarMass: '101.10 g/mol',
    physicalState: 'Solide (cristaux ou poudre)',
    meltingPoint: '334 °C',
    commonNames: ['Salpêtre'],
    ph: '5.5 - 8.0 (solution 5%)',
    appearance: 'Poudre cristalline blanche ou granules inodores',
    safetyPictograms: ['ghs03'],
    signalWord: 'Attention',
    hStatements: [
      'H272 : Peut aggraver un incendie; comburant'
    ],
    pStatements: [
      'P210 : Tenir à l\'écart de la chaleur, des surfaces chaudes, des étincelles, des flammes nues',
      'P220 : Tenir/stocker à l\'écart des vêtements et des matières combustibles'
    ],
    healthHazards: ['Comburant puissant, favorise la déflagration des matériaux organiques'],
    ppeRequired: ['Blouse de laboratoire', 'Lunettes de protection standard', 'Gants résistants'],
    firstAid: [
      'Général : Rincer abondamment à l\'eau claire.'
    ],
    storageConditions: 'Stocker à l\'écart absolu des réducteurs, des acides forts, de l\'eau et des matières organiques combustibles.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Pourquoi le nitrate de potassium est-il classé comme comburant (GHS03) ?', options: ['Parce qu\'il s\'agit d\'un gaz liquéfié', 'Parce qu\'il libère facilement de l\'oxygène à haute température, déclenchant ou intensifiant la combustion d\'autres substances en cas de contact', 'Il s\'enflamme spontanément au contact de l\'air'], correctAnswer: 1 }
    ]
  },
  {
    id: 'lead_nitrate',
    name: 'Nitrate de plomb',
    fullName: 'Nitrate de plomb(II) (Pb(NO₃)₂)',
    formula: 'Pb(NO3)2',
    molarMass: '331.21 g/mol',
    physicalState: 'Solide (cristaux)',
    meltingPoint: '270 °C (décomposition)',
    commonNames: ['Plomb nitrate'],
    ph: '3.0 - 4.0 (solution à 50 g/L)',
    appearance: 'Cristaux blancs ou poudre cristalline inodore',
    safetyPictograms: ['ghs03', 'ghs05', 'ghs06', 'ghs08', 'ghs09'],
    signalWord: 'Danger',
    hStatements: [
      'H272 : Peut aggraver un incendie; comburant',
      'H302+H332 : Nocif en cas d\'ingestion ou d\'inhalation',
      'H318 : Provoque de graves lésions des yeux',
      'H360D : Peut nuire au fœtus',
      'H373 : Risque présumé d\'effets graves pour les organes à la suite d\'expositions répétées',
      'H410 : Très toxique pour les organismes aquatiques, entraîne des effets néfastes à long terme'
    ],
    pStatements: [
      'P201 : Se procurer les instructions spéciales avant utilisation',
      'P273 : Éviter le rejet dans l\'environnement',
      'P280 : Porter des gants de protection/un équipement de protection des yeux'
    ],
    healthHazards: ['Plombisme', 'Toxique pour le développement embryonnaire', 'Lésions oculaires graves'],
    ppeRequired: ['Blouse', 'Gants en nitrile robustes', 'Lunettes de protection étanches'],
    firstAid: [
      'Yeux : Rincer immédiatement à l\'eau propre pendant au moins 15-20 minutes. Voir un médecin.'
    ],
    storageConditions: 'Conserver fermé sous clé dans l\'armoire des toxiques lourds. Ne pas éliminer dans l\'évier.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Quel précipité extrêmement dense de couleur jaune vif se forme par réaction entre le nitrate de plomb et l\'iodure de potassium ?', options: ['L\'iodure de plomb PbI2', 'Le nitrate de potassium KNO3', 'Le chromate de plomb'], correctAnswer: 0 }
    ]
  },
  {
    id: 'benzoic_acid',
    name: 'Acide benzoïque',
    fullName: 'Acide benzoïque (C₆H₅COOH)',
    formula: 'C7H6O2',
    molarMass: '122.12 g/mol',
    physicalState: 'Solide (cristaux aciculaires)',
    meltingPoint: '122 °C',
    commonNames: ['Carboxybenzène', 'Acide dracylique'],
    ph: '2.5 - 3.5 (solution aqueuse saturée)',
    appearance: 'Cristaux plats fins, aiguilles ou paillettes blanches satinées d\'odeur piquante',
    safetyPictograms: ['ghs05', 'ghs08'],
    signalWord: 'Danger',
    hStatements: [
      'H315 : Provoque une irritation cutanée',
      'H318 : Provoque de graves lésions des yeux',
      'H372 : Risque avéré d\'effets graves pour les organes à la suite d\'expositions répétées (poumon par inhalation prolongée de poussières)'
    ],
    pStatements: [
      'P260 : Ne pas respirer les poussières',
      'P280 : Porter des gants et un équipement de protection des yeux'
    ],
    healthHazards: ['Lésions irréversibles de la cornée', 'Lésions alvéolaires en cas d\'inhalation prolongée'],
    ppeRequired: ['Blouse de laboratoire', 'Gants de protection', 'Lunettes enveloppantes', 'Masque à poussières si manipulé en masse'],
    firstAid: [
      'Yeux : Rincer doucement à l\'eau pendant 15 minutes. Consulter un médecin d\'urgence.'
    ],
    storageConditions: 'Stocker dans un endroit frais et sec.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Quelle technique robuste de purification en chimie organique permet d\'obtenir de fins cristaux d\'acide benzoïque purs ?', options: ['La distillation sous vide', 'La recristallisation par dissolution à chaud dans l\'eau filtrée suivie d\'un refroidissement contrôlé induisant la cristallisation sélective', 'L\'extraction par solvant volatil'], correctAnswer: 1 }
    ]
  },
  {
    id: 'potassium_aluminum_sulfate',
    name: 'Alun de potassium',
    fullName: 'Alun de potassium dodécahydraté (KAl(SO₄)₂·12H₂O)',
    formula: 'KAl(SO4)2',
    molarMass: '474.39 g/mol',
    physicalState: 'Solide (cristaux ou poudre brute)',
    meltingPoint: '92.5 °C',
    commonNames: ['Alun de potassium', 'Alun'],
    ph: '3.0 - 3.5 (solution 100 g/L)',
    appearance: 'Gros cristaux cubiques clairs ou poudre blanche, inodore',
    safetyPictograms: [],
    signalWord: 'Aucun',
    hStatements: [],
    pStatements: [],
    healthHazards: ['Aucun danger chimique (léger effet astringent doux)'],
    ppeRequired: ['Blouse', 'Lunettes standard'],
    firstAid: [
      'Yeux : Rincer abondamment à l\'eau claire courant.'
    ],
    storageConditions: 'Conserver au sec.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Quelle propriété l\'alun de potassium partage-t-il avec d\'autres coagulants minéraux lors du traitement de potabilisation des eaux troubles ?', options: ['Il accélère la degratation thermique du glucose', 'Il neutralise les charges électrostatiques des colloïdes en suspension, provoquant leur floculation et leur sédimentation rapide', 'Il dissout les plastiques'], correctAnswer: 1 }
    ]
  },
  {
    id: 'oxalic_acid',
    name: 'Acide oxalique',
    fullName: 'Acide oxalique dihydraté (H₂C₂O₄·2H₂O)',
    formula: 'H2C2O4',
    molarMass: '126.07 g/mol',
    physicalState: 'Solide cristallin',
    meltingPoint: '101.5 °C',
    commonNames: ['Acide éthanedioïque'],
    ph: '1.3 (solution à 10%)',
    appearance: 'Poudre cristalline blanche hygroscopique',
    safetyPictograms: ['ghs05', 'ghs07'],
    signalWord: 'Danger',
    hStatements: [
      'H302+H312 : Nocif en cas d\'ingestion ou de contact cutané',
      'H318 : Provoque de graves lésions des yeux'
    ],
    pStatements: [
      'P280 : Porter des gants de protection/des vêtements de protection/un équipement de protection des yeux/du visage',
      'P305+P351+P338 : EN CAS DE CONTACT AVEC LES YEUX : Rincer abondamment avec précaution'
    ],
    healthHazards: ['Cécité par lésions chimiques directs', 'Néphrotoxicité grave s\'il s\'infiltre dans le sang à cause d\'occlusion des microcanaux rénaux'],
    ppeRequired: ['Blouse de laboratoire', 'Gants en nitrile', 'Lunettes de protection étanches'],
    firstAid: [
      'Peau : Retirer les vêtements contaminés. Rincer immédiatement à l\'eau.',
      'Yeux : Laver intensément sous l\'eau.'
    ],
    storageConditions: 'Conserver dans un flacon étanche éloigné des bases alcalines fortes.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Pourquoi l\'acide oxalique est-il couramment employé pour étalonner précisément les solutions aqueuses de permanganate de potassium ?', options: ['C\'est un agent réducteur stable d\'origine organique dont la réaction redox est totale et reproductible sous chauffage léger', 'Il est coloré en bleu', 'Il empêche l\'eau de bouillir'], correctAnswer: 0 }
    ]
  },
  {
    id: 'urea',
    name: 'Urée',
    fullName: 'Urée (CO(NH₂)₂)',
    formula: 'CH4N2O',
    molarMass: '60.06 g/mol',
    physicalState: 'Solide (granulés blancs)',
    meltingPoint: '133 °C',
    commonNames: ['Carbamide'],
    ph: '7.2 (solution à 10%)',
    appearance: 'Petites billes blanches neutres',
    safetyPictograms: [],
    signalWord: 'Aucun',
    hStatements: [],
    pStatements: [],
    healthHazards: ['Aucun danger particulier'],
    ppeRequired: ['Blouse standard'],
    firstAid: [
      'Général : Nettoyer à l\'eau.'
    ],
    storageConditions: 'Conserver hermétiquement scellé au sec.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Quelle découverte historique cruciale pour le développement de la chimie organique moderne est née de la synthèse artificielle de l\'urée par Friedrich Wöhler en 1828 ?', options: ['La théorie polaire', 'L\'invalidation du "vitalisme" par la preuve qu\'un composé organique d\'origine animale peut être synthétisé ex nihilo à partir de molécules minérales', 'La découverte de l\'atome d\'or'], correctAnswer: 1 }
    ]
  },
  {
    id: 'ammonium_sulfate',
    name: 'Sulfate d’ammonium',
    fullName: 'Sulfate d\'ammonium ((NH₄)₂SO₄)',
    formula: 'NH42SO4',
    molarMass: '132.14 g/mol',
    physicalState: 'Solide (poudre cristalline)',
    meltingPoint: '235 °C (décomposition)',
    commonNames: ['Mascagnite', 'Sulfate d\'ammoniaque'],
    ph: '5.0 - 6.0 (solution 0.1 mol/L)',
    appearance: 'Grains ou poudre cristalline blanche inodore',
    safetyPictograms: [],
    signalWord: 'Aucun',
    hStatements: [],
    pStatements: [],
    healthHazards: ['Aucun danger important de toxicité sous conditions classiques'],
    ppeRequired: ['Blouse de laboratoire', 'Lunettes'],
    firstAid: [
      'Yeux : Rincer à l\'eau claire.'
    ],
    storageConditions: 'Conserver au sec.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Pour quelle technique biochimique le sulfate d\'ammonium solide hautement soluble est-il un sel privilégié de l\'analyse des macromolécules ?', options: ['Pour la fermentation alcoolique', 'Pour le "relargage" (salting out) de protéines par déshydratation sélective de leur enveloppe de solvatation', 'Pour la fabrication de plastique biodégradable'], correctAnswer: 1 }
    ]
  },
  {
    id: 'butanol',
    name: 'Butanol-1',
    fullName: 'Butan-1-ol (CH₃(CH₂)₃OH)',
    formula: 'C4H10O',
    molarMass: '74.12 g/mol',
    physicalState: 'Liquide',
    meltingPoint: '-89.8 °C',
    commonNames: ['Alcool butylique', '1-butanol'],
    ph: 'Neutre',
    appearance: 'Liquide incolore d\'odeur caractéristique forte de solvant',
    safetyPictograms: ['ghs02', 'ghs05', 'ghs07'],
    signalWord: 'Danger',
    hStatements: [
      'H226 : Liquide et vapeurs inflammables',
      'H302 : Nocif en cas d\'ingestion',
      'H315 : Provoque une irritation cutanée',
      'H318 : Provoque de graves lésions des yeux',
      'H335 : Peut irriter les voies respiratoires',
      'H336 : Peut provoquer somnolence ou vertiges'
    ],
    pStatements: [
      'P210 : Tenir à l\'écart des flammes',
      'P280 : Porter des lunettes étanches et des gants robustes',
      'P305+P351+P338 : EN CAS DE CONTACT AVEC LES YEUX : Rincer abondamment'
    ],
    healthHazards: ['Lésions graves aux yeux', 'Irritation respiratoire et cutanée directe'],
    ppeRequired: ['Blouse de laboratoire', 'Gants de protection en nitrile robustes ou néoprène', 'Lunettes de protection enveloppantes'],
    firstAid: [
      'Yeux : Rincer abondamment sous l\'eau courante pendant 15 minutes. Consulter sans délai un médecin.'
    ],
    storageConditions: 'Stocker hermétiquement scellé au sein de l\'armoire dédiée aux composés inflammables.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Quelle est la solubilité aqueuse de l\'alcool butan-1-ol par rapport à celle de l\'éthanol à température ambiante ?', options: ['L\'éthanol est totalement miscible à l\'eau alors que le butan-1-ol n\'est que partiellement soluble (~77 g/L) en raison de sa longue chaîne carbonée hydrophobe', 'Le butan-1-ol est plus soluble', 'Ils ont la même solubilité exacte'], correctAnswer: 0 }
    ]
  },
  {
    id: 'methyl_red',
    name: 'Rouge de méthyle',
    fullName: 'Rouge de méthyle (C₁₅H₁₅N₃O₂)',
    formula: 'C15H15N3O2',
    molarMass: '269.30 g/mol',
    physicalState: 'Solide (poudre)',
    meltingPoint: '179 °C',
    commonNames: ['Acid Red 2'],
    ph: 'Zone de virage : 4.4 (rouge) - 6.2 (jaune)',
    appearance: 'Cristaux rouge foncé ou poudre inodore',
    safetyPictograms: [],
    signalWord: 'Aucun',
    hStatements: [],
    pStatements: [],
    healthHazards: ['Aucun danger majeur identifié selon les règlements GHS'],
    ppeRequired: ['Blouse', 'Gants fins', 'Lunettes standard'],
    firstAid: [
      'Yeux : Rincer à l\'eau.'
    ],
    storageConditions: 'Conserver à l\'abri du soleil au sec.',
    qrCodeUrl: '',
    quiz: [
      { question: 'À un pH égal à 5,0, sous quelle couleur l\'indicateur rouge de méthyle se présente-t-il au labo ?', options: ['Rouge', 'Jaune', 'Orange (couleur intermédiaire de transition de sa zone de virage)'], correctAnswer: 2 }
    ]
  },
  {
    id: 'sulfur_powder',
    name: 'Soufre fleur',
    fullName: 'Soufre élémentaire (fleur de soufre, S₈)',
    formula: 'S',
    molarMass: '32.06 g/mol',
    physicalState: 'Solide (poudre fine)',
    meltingPoint: '115 °C',
    commonNames: ['Soufre fleur', 'Brimstone'],
    ph: 'Non applicable',
    appearance: 'Poudre jaune vif caractéristique d\'odeur très faible',
    safetyPictograms: ['ghs07'],
    signalWord: 'Attention',
    hStatements: [
      'H315 : Provoque une irritation cutanée'
    ],
    pStatements: [
      'P280 : Porter des gants de protection',
      'P302+P352 : EN CAS DE CONTACT AVEC LA PEAU : Laver abondamment'
    ],
    healthHazards: ['Irritation de l\'écorce de la peau en cas de frottement prolongé, poussière grasse'],
    ppeRequired: ['Blouse de laboratoire', 'Gants jetables', 'Lunettes de protection standard'],
    firstAid: [
      'Peau : Laver immédiatement à l\'eau savonneuse.',
      'Inhalation : Sortir respirer.'
    ],
    storageConditions: 'Stocker éloigné des sources d\'ignition et des agents oxydants forts.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Quel produit chimique gazeux toxique et irritant d\'odeur piquante suffocante se forme par combustion contrôlée de la poudre de soufre à l\'air ?', options: ['Le dioxyde de soufre (SO2)', 'Le monoxyde de carbone (CO)', 'L\'acide sulfhydrique (H2S)'], correctAnswer: 0 }
    ]
  },
  {
    id: 'sucrose',
    name: 'Saccharose',
    fullName: 'Saccharose cristallisé (C₁₂H₂₂O₁₁)',
    formula: 'C12H22O11',
    molarMass: '342.30 g/mol',
    physicalState: 'Solide cristallin',
    meltingPoint: '186 °C (décomposition lente)',
    commonNames: ['Sucre de canne', 'Sucre de table'],
    ph: 'Neutre',
    appearance: 'Poudre cristalline blanche ou cristaux translucides d\'odeur douce',
    safetyPictograms: [],
    signalWord: 'Aucun',
    hStatements: [],
    pStatements: [],
    healthHazards: ['Aucun danger pour un usage en laboratoire de chimie'],
    ppeRequired: ['Blouse de laboratoire'],
    firstAid: [
      'Général : Rincer.'
    ],
    storageConditions: 'Conserver fermé hermétiquement au sec.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Le saccharose (sucre de table) est-il un sucre réducteur capable de réagir directement avec la liqueur de Fehling chaude ?', options: ['Oui, il réagit spontanément sans traitement préalable', 'Non, c\'est un diholoside non réducteur qui requiert une hydrolyse acide préliminaire pour libérer le glucose et le fructose réducteurs', 'Oui, et l\'ensemble vire au vert'], correctAnswer: 1 }
    ]
  },
  {
    id: 'activated_charcoal',
    name: 'Charbon actif',
    fullName: 'Charbon actif végétal (C)',
    formula: 'C',
    molarMass: '12.01 g/mol',
    physicalState: 'Solide (poudre noire très fine)',
    meltingPoint: '3550 °C',
    commonNames: ['Charbon actif', 'Noir de carbone activé'],
    ph: 'Neutre',
    appearance: 'Poudre noire opaque extrêmement fine et légère, tachant fortement',
    safetyPictograms: [],
    signalWord: 'Aucun',
    hStatements: [],
    pStatements: [],
    healthHazards: ['Aucun danger intrinsèque, mais peut causer une gêne mécanique respiratoire si la poudre s\'envole'],
    ppeRequired: ['Blouse fermée', 'Gants jetables', 'Lunettes anti-poussières', 'Masque de protection de type FFP2 si manipulé à l\'air libre'],
    firstAid: [
      'Peau : Nettoyer au savon.',
      'Yeux : Rincer abondamment.'
    ],
    storageConditions: 'Conserver hermétiquement clos dans une boîte sèche.',
    qrCodeUrl: '',
    quiz: [
      { question: 'Pourquoi le charbon actif est-il un auxiliaire idéal pour décolorer des solutions de produits bruts après une extraction ou synthèse ?', options: ['Il a un pouvoir de blanchiment chimique destructeur', 'Son extraordinaire porosité microscopique lui donne une surface spécifique colossale capable d\'adsorber sélectivement les grosses molécules organiques colorées d\'impuretés', 'Il est acide'], correctAnswer: 1 }
    ]
  }
];

export const getRelevantPictograms = (tp: TP): SafetyPictogram[] => {
  if (!tp.chemicals) return [];
  const lowerChemicals = tp.chemicals.map(c => c.toLowerCase());
  const relevantIds = new Set<string>();
  
  SDS_DATA.forEach(sds => {
    if (lowerChemicals.some(c => 
      c.includes(sds.id) || 
      sds.name.toLowerCase().includes(c) || 
      c.includes(sds.name.toLowerCase()) ||
      (sds.formula && c.includes(sds.formula.toLowerCase()))
    )) {
      sds.safetyPictograms.forEach(id => relevantIds.add(id));
    }
  });

  return SAFETY_PICTOGRAMS.filter(p => relevantIds.has(p.id));
};

export const SAFETY_GRAND_QUIZ: QuizQuestion[] = [
  // 1. Affichage de pictogrammes de sécurité (étiquettes de danger)
  {
    type: 'qcm',
    question: "Ce pictogramme montre des éprouvettes versant du liquide corrosif sur une surface solide et sur une main. Quelle est sa signification réglementaire ?",
    options: [
      "Produit corrosif : Provoque de graves brûlures de la peau et des yeux, et peut attaquer les métaux.",
      "Produit hydratant : Indique une huile ou un solvant inoffensif pour la peau.",
      "Produit explosif : Signale un risque imminent de projection violente d'éclats.",
      "Produit radioactif : Indique des rayonnements nécessitant un blindage en plomb."
    ],
    correctAnswer: 0,
    pictogramUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a1/GHS-pictogram-acid.svg",
    pictogramName: "Corrosif (GHS05)",
    explanation: "Le pictogramme d'acide versé sur une main et un métal (SGH05/GHS05 Corrosif) symbolise une attaque chimique immédiate et destructrice des tissus vivants ainsi que des matériaux solides inertes."
  },
  {
    type: 'vrai_faux',
    question: "Vrai ou Faux : Le pictogramme GHS09 représentant un arbre mort et un poisson mort indique qu'un produit chimique peut être jeté directement dans l'évier s'il est dilué avec beaucoup d'eau.",
    options: [
      "Vrai",
      "Faux"
    ],
    correctAnswer: 1,
    explanation: "C'est Faux ! Le symbole SGH09 (Polluant) indique une toxicité sévère pour les poissons et l'écosystème aquatique. Il ne doit JAMAIS être jeté à l'égout, même dilué. Il doit être trié dans un collecteur spécifique des déchets du laboratoire."
  },
  {
    type: 'texte_a_trous',
    question: "Complétez la règle de sécurité : Le pictogramme SGH02 représentant une flamme ouverte indique un danger de produit ___. On doit l'éloigner absolument de toute source d'étincelles ou de chaleur.",
    options: [
      "inflammable",
      "comburant",
      "explosif",
      "corrosif"
    ],
    correctAnswer: 0,
    pictogramUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6d/GHS-pictogram-flamme.svg",
    pictogramName: "Inflammable (GHS02)",
    explanation: "Le symbole SGH02 (flamme) correspond aux substances inflammables (gaz, liquides ou solides) capables de prendre feu facilement en présence d'une flamme, d'une étincelle ou d'une température élevée."
  },

  // 2. Signification des pictogrammes
  {
    type: 'qcm',
    question: "Que signifie précisément l'utilisation du pictogramme GHS06 représentant une tête de mort sur deux tibias croisés ?",
    options: [
      "Produit inoffensif et sûr à manipuler librement",
      "Toxicité aiguë : Produit hautement toxique ou mortel à faible dose par inhalation, ingestion ou contact cutané.",
      "Produit périmé à jeter immédiatement",
      "Substance radioactive à longue durée de vie"
    ],
    correctAnswer: 1,
    pictogramUrl: "https://upload.wikimedia.org/wikipedia/commons/5/58/GHS-pictogram-skull.svg",
    pictogramName: "Toxique (GHS06)",
    explanation: "La tête de mort (SGH06) symbolise la toxicité aiguë. Elle avertit qu'une exposition directe, une inhalation ou l'absorption d'une quantité minime peut causer la mort ou entraîner de très graves dommages immédiats pour la santé."
  },
  {
    type: 'qcm',
    question: "Quelle est la signification réglementaire du pictogramme GHS03 représentant une flamme au-dessus d'un cercle (Comburant) ?",
    options: [
      "Un produit liquide qui brûle seul sans air",
      "Un produit comburant : Il favorise ou provoque la combustion de matières inflammables en libérant de l'oxygène.",
      "Un produit froid produisant du givre",
      "Un gaz neutre comprimé sous haute pression"
    ],
    correctAnswer: 1,
    pictogramUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e5/GHS-pictogram-rondflam.svg",
    pictogramName: "Comburant (GHS03)",
    explanation: "Un comburant (GHS03) fournit de l’oxygène nécessaire pour alimenter un incendie. Placé à côté d’un combustible inflammable, il peut déclencher une combustion violente, voire explosive."
  },
  {
    type: 'vrai_faux',
    question: "Vrai ou Faux : Le pictogramme GHS07 (un simple point d'exclamation noir) est facultatif et signale qu'un produit chimique est totalement inoffensif pour la santé humaine.",
    options: [
      "Vrai",
      "Faux"
    ],
    correctAnswer: 1,
    explanation: "C'est Faux ! Le point d'exclamation (SGH07) signale des dangers réels mais moins immédiatement mortels : irritation de la peau/yeux, sensibilisation cutanée, somnolence ou toxicité modérée (Nocif). Manipulez-le sous hotte avec les EPI."
  },

  // 3. Conditions de stockage
  {
    type: 'qcm',
    question: "Concernant le stockage sécurisé en laboratoire, quelle consigne est ABSOLUMENT impérative pour les acides forts et les bases fortes ?",
    options: [
      "Les stocker côte à côte sur la même étagère pour simplifier l'accès.",
      "Les séparer physiquement (armoires séparées ou compartimentées imperméables) pour exclure toute neutralisation violente et exothermique en cas de fuite.",
      "Les placer impérativement au congélateur à -20°C.",
      "Les laisser débouchés pour évacuer la pression accumulée."
    ],
    correctAnswer: 1,
    explanation: "La rencontre accidentelle d'un acide fort et d'une base forte déclenche une réaction de neutralisation extrêmement exothermique et violente, capable de projeter du produit corrosif bouillant."
  },
  {
    type: 'texte_a_trous',
    question: "Complétez la règle de sécurité : Un solvant ou produit liquide chimique hautement inflammable (GHS02) doit être impérativement stocké dans une armoire de sécurité ___ construite pour résister au feu.",
    options: [
      "ignifuge",
      "en fer ajouré",
      "en verre transparent",
      "humide et réfrigérée"
    ],
    correctAnswer: 0,
    explanation: "Le stockage dans des armoires de sécurité coupe-feu/ignifuges empêche un début d'incendie dans le laboratoire d'atteindre les réserves de solvants inflammables complexes."
  },
  {
    type: 'vrai_faux',
    question: "Vrai ou Faux : Est-il autorisé de stockage d'un produit chimique volatil acide (contenant des vapeurs agressives) dans une armoire opaque non ventilée ?",
    options: [
      "Oui, car la bouteille bouchée ne laisse s'échapper aucune vapeur.",
      "Non, car des traces de vapeurs s'échappent inévitablement et créent une atmosphère corrosive, toxique ou explosive dangereuse."
    ],
    correctAnswer: 1,
    explanation: "C'est Non (option 1 / Faux) ! Les acides volatils (comme l'acide chlorhydrique) et solvants volatils provoquent une accumulation lente de gaz toxiques et corrosifs dans les volumes clos. Ils doivent aller en armoire ventilée filtrante."
  },

  // 4. Précautions d'emploi
  {
    type: 'qcm',
    question: "Quelle est la tenue de sécurité réglementaire minimale exigée pour manipuler des produits chimiques en travaux pratiques de chimie ?",
    options: [
      "Un t-shirt léger et des sandales confortables.",
      "La blouse blanche en coton boutonnée, des lunettes de sécurité enveloppantes, des gants adaptés, les cheveux attachés et des chaussures fermées.",
      "Un masque chirurgical jetable et un bermuda de ville.",
      "Des vêtements étanches de plongée"
    ],
    correctAnswer: 1,
    explanation: "La blouse en coton ne fond pas à la chaleur (contrairement aux fibres synthétiques), les lunettes protègent des projections oculaires, et les chaussures fermées évitent les brûlures graves si un flacon se brise au sol."
  },
  {
    type: 'texte_a_trous',
    question: "Complétez la consigne pratique de fin de TP : Après vos manipulations et avant de quitter la salle, vous devez jeter vos gants à la poubelle des déchets chimiques puis vous ___ soigneusement les mains avec de l'eau et du savon.",
    options: [
      "laver",
      "sécher",
      "désinfecter uniquement",
      "essuyer doucement"
    ],
    correctAnswer: 0,
    explanation: "Se laver soigneusement les mains élimine toutes traces invisibles de contamination chimique acide ou basique évitant un transfert accidentel vers le visage, les yeux ou les aliments."
  },
  {
    type: 'vrai_faux',
    question: "Vrai ou Faux : Est-il toléré de consommer une boisson ou un aliment (sandwich, café) durant des expériences de chimie tant que l'on reste assis au bureau d'écriture ?",
    options: [
      "Oui, si on fait attention aux miettes.",
      "Non, c'est strictement interdit car les vapeurs et poussières chimiques peuvent se déposer sur les aliments, créant un risque d'ingestion toxique passive."
    ],
    correctAnswer: 1,
    explanation: "Il est strictement interdit de manger, boire ou même mâcher un chewing-gum dans un laboratoire ou magasin chimique pour éviter tout risque de contamination par ingestion."
  },

  // 5. Phrases H (Hazard statements)
  {
    type: 'texte_a_trous',
    question: "Complétez l'affirmation scientifique : Les mentions abrégées par le préfixe 'H' proviennent du concept anglais '___' et décrivent de manière normalisée la nature précise des risques intrinsèques d'un produit (physiques, sanitaires ou environnementaux).",
    options: [
      "Hazard statements",
      "Health warnings",
      "Hazard protection",
      "High danger"
    ],
    correctAnswer: 0,
    explanation: "Les mentions 'H' (Hazard statements, ou mentions de danger en français) spécifient la nature exacte du danger : H2.. (danger physique), H3.. (danger pour la santé), H4.. (danger pour l'environnement)."
  },
  {
    type: 'qcm',
    question: "Si l'étiquette d'un flacon d'acide fort affiche la formule 'H314 : Provoque de graves brûlures de la peau', comment devez-vous adapter votre manipulation ?",
    options: [
      "Manipuler à mains nues pour être plus précis dans les pesées.",
      "Travailler obligatoirement avec une blouse fermée, des lunettes étanches à protection latérale, des gants en nitrile adaptés et sous hotte aspirante opérationnelle.",
      "Verser de l'eau chaude très rapidement pour contrer l'effet rongeur.",
      "Chauffer le produit de suite à l'aide d'un bec bunsen à flamme nue."
    ],
    correctAnswer: 1,
    explanation: "La mention H314 avertit d'une destruction rapide du tissu épidermique. Se protéger de manière hermétique à l'aide de gants couplus et de verres protecteurs is non négociable pour sa sécurité."
  },
  {
    type: 'qcm',
    question: "Que signifie la mention de danger standard 'H302' inscrite sur de nombreux flacons chimiques ?",
    options: [
      "Produit réactif uniquement sous vide d'air",
      "Nocif en cas d'ingestion : l'absorption orale entraîne un risque sanitaire modéré pour les fonctions biologiques.",
      "Le produit n'exerce aucune action nocive ou néfaste sur l'estomac.",
      "Le réactif doit être obligatoirement bu dilué"
    ],
    correctAnswer: 1,
    explanation: "H302 est un libellé officiel de risque pour la santé indiquant une toxicité digestive. En cas d'ingestion accidentelle, il faut immédiatement rincer la bouche et contacter le centre antipoison."
  },

  // 6. Phrases P (Precautionary statements)
  {
    type: 'texte_a_trous',
    question: "Complétez le principe de prévention globale : Les conseils réglementaires précédés de la lettre 'P' proviennent de l'anglais '___' et dictent les comportements et mesures recommandées pour atténuer ou prévenir les risques d'exposition.",
    options: [
      "Precautionary statements",
      "Prevention instructions",
      "Protection advice",
      "Product care"
    ],
    correctAnswer: 0,
    explanation: "Les conseils 'P' (Precautionary statements / conseils de prudence) fournissent les consignes opérationnelles de protection : P1.. (général), P2.. (prévention), P3.. (intervention d'urgence), P4.. (stockage), P5.. (élimination)."
  },
  {
    type: 'qcm',
    question: "Le conseil de prudence standardisé 'P280 : Porter des gants de protection / des vêtements de protection / un équipement de protection des yeux' vous oblige à de quelle action ?",
    options: [
      "Porter de simples vêtements longs ordinaires.",
      "S'équiper intégralement avec des gants résistants de protection chimique homologuée, une blouse en coton fermée et des lunettes étanches de protection.",
      "Ouvrir grand les fenêtres de la pièce en manipulant à mains nues.",
      "Porter simplement un masque à gaz de protection"
    ],
    correctAnswer: 1,
    explanation: "P280 prescrit d'ériger des barrières physiques adéquates et d'éliminer toute surface de peau ou de muqueuse exposée."
  },
  {
    type: 'qcm',
    question: "Face au code d'intervention critique 'P305 + P351 + P338 : EN CAS DE CONTACT AVEC LES YEUX', quel protocole de premiers secours devez-vous engager immédiatement ?",
    options: [
      "Frotter énergiquement l'œil avec une serviette en papier rugueuse.",
      "Rincer abondamment et doucement avec de l'eau claire tiède (au rince-œil) durant de longues minutes, ôter les lentilles si présentes, et continuer à irriguant.",
      "Appliquer une solution acide douce pour espérer neutraliser le liquide basique.",
      "Attendre la fin de la séance de TP afin de consulter calmement un spécialiste."
    ],
    correctAnswer: 1,
    explanation: "En cas d'atteinte oculaire par un produit chimique, chaque seconde compte : un rinçage doux continu à l'eau courante d'au moins 15 minutes est la seule méthode d'urgence efficace avant le transfert médical."
  }
];

export const FIRST_AID_RULES = [
  {
    title: 'Brûlures chimiques',
    steps: [
      'Rincer immédiatement et abondamment à l\'eau tiède pendant au moins 15-20 minutes.',
      'Retirer les vêtements et bijoux contaminés pendant le rinçage.',
      'Ne pas tenter de neutraliser avec un acide ou une base (risque de brûlure thermique accrue).',
      'Consulter un médecin si la brûlure est étendue ou profonde.'
    ],
    type: 'danger'
  },
  {
    title: 'Projection dans les yeux',
    steps: [
      'Utiliser immédiatement le lave-œil ou une source d\'eau propre.',
      'Maintenir les paupières bien ouvertes.',
      'Rincer pendant au moins 20 minutes en dirigeant le jet de l\'angle interne vers l\'externe.',
      'Retirer les lentilles de contact si possible.',
      'Consultation ophtalmologique urgente.'
    ],
    type: 'danger'
  },
  {
    title: 'Coupures',
    steps: [
      'Nettoyer la plaie à l\'eau et au savon.',
      'Désinfecter avec un antiseptique.',
      'Protéger par un pansement stérile.',
      'Vérifier la présence éventuelle de débris de verre.'
    ],
    type: 'warning'
  }
];

export const SAFETY_H_PHRASES = [
  { code: 'H200', text: 'Explosif instable.' },
  { code: 'H220', text: 'Gaz extrêmement inflammable.' },
  { code: 'H225', text: 'Liquide et vapeurs très inflammables.' },
  { code: 'H226', text: 'Liquide et vapeurs inflammables.' },
  { code: 'H270', text: 'Peut provoquer ou aggraver un incendie ; comburant.' },
  { code: 'H272', text: 'Peut aggraver un incendie ; comburant.' },
  { code: 'H290', text: 'Peut être corrosif pour les métaux.' },
  { code: 'H300', text: 'Mortel en cas d\'ingestion.' },
  { code: 'H301', text: 'Toxique en cas d\'ingestion.' },
  { code: 'H302', text: 'Nocif en cas d\'ingestion.' },
  { code: 'H310', text: 'Mortel par contact cutané.' },
  { code: 'H311', text: 'Toxique par contact cutané.' },
  { code: 'H312', text: 'Nocif par contact cutané.' },
  { code: 'H314', text: 'Provoque de graves brûlures de la peau et de graves lésions des yeux.' },
  { code: 'H315', text: 'Provoque une irritation cutanée.' },
  { code: 'H317', text: 'Peut provoquer une allergie cutanée.' },
  { code: 'H318', text: 'Provoque de graves lésions des yeux.' },
  { code: 'H319', text: 'Provoque une sévère irritation des yeux.' },
  { code: 'H330', text: 'Mortel par inhalation.' },
  { code: 'H331', text: 'Toxique par inhalation.' },
  { code: 'H332', text: 'Nocif par inhalation.' },
  { code: 'H334', text: 'Peut provoquer des symptômes allergiques ou d\'asthme ou des difficultés respiratoires par inhalation.' },
  { code: 'H335', text: 'Peut irriter les voies respiratoires.' },
  { code: 'H336', text: 'Peut provoquer somnolence ou vertiges.' },
  { code: 'H340', text: 'Peut induire des anomalies génétiques.' },
  { code: 'H350', text: 'Peut provoquer le cancer.' },
  { code: 'H351', text: 'Susceptible de provoquer le cancer.' },
  { code: 'H360', text: 'Peut nuire à la fertilité ou au fœtus.' },
  { code: 'H370', text: 'Risque avéré d\'effets graves pour les organes.' },
  { code: 'H372', text: 'Risque avéré d\'effets graves pour les organes à la suite d\'expositions répétées ou d\'une exposition prolongée.' },
  { code: 'H400', text: 'Très toxique pour les organismes aquatiques.' },
  { code: 'H410', text: 'Très toxique pour les organismes aquatiques, entraîne des effets néfastes à long terme.' },
  { code: 'H411', text: 'Toxique pour les organismes aquatiques, entraîne des effets néfastes à long terme.' }
];

export const SAFETY_P_PHRASES = [
  { code: 'P102', text: 'Tenir hors de portée des enfants.' },
  { code: 'P210', text: 'Tenir à l\'écart de la chaleur, des surfaces chaudes, des étincelles, des flammes nues et de toute autre source d\'inflammation. Ne pas fumer.' },
  { code: 'P220', text: 'Tenir à l\'écart des vêtements et d\'autres matières combustibles.' },
  { code: 'P233', text: 'Maintenir le récipient fermé de manière étanche.' },
  { code: 'P260', text: 'Ne pas respirer les poussières/fumées/gaz/brouillards/vapeurs/aérosols.' },
  { code: 'P261', text: 'Éviter de respirer les poussières/fumées/gaz/brouillards/vapeurs/aérosols.' },
  { code: 'P264', text: 'Se laver soigneusement après manipulation.' },
  { code: 'P270', text: 'Ne pas manger, boire ou fumer en manipulant ce produit.' },
  { code: 'P273', text: 'Éviter le rejet dans l\'environnement.' },
  { code: 'P280', text: 'Porter des gants de protection/des vêtements de protection/un équipement de protection des yeux/du visage.' },
  { code: 'P301+P310', text: 'EN CAS D\'INGESTION : Appeler immédiatement un CENTRE ANTIPOISON/un médecin.' },
  { code: 'P302+P352', text: 'EN CAS DE CONTACT AVEC LA PEAU : Laver abondamment à l\'eau.' },
  { code: 'P304+P340', text: 'EN CAS D\'INHALATION : transporter la personne à l\'extérieur et la maintenir dans une position où elle peut confortablement respirer.' },
  { code: 'P305+P351+P338', text: 'EN CAS DE CONTACT AVEC LES YEUX : Rincer avec précaution à l\'eau pendant plusieurs minutes. Enlever les lentilles de contact si la victime en porte et si elles peuvent être facilement enlevées. Continuer à rincer.' },
  { code: 'P330', text: 'Rincer la bouche.' },
  { code: 'P331', text: 'NE PAS faire vomir.' },
  { code: 'P333+P313', text: 'En cas d\'irritation ou d\'éruption cutanée : consulter un médecin.' },
  { code: 'P337+P313', text: 'Si l\'irritation oculaire persiste : consulter un médecin.' },
  { code: 'P370+P378', text: 'En cas d\'incendie : Utiliser... pour l\'extinction.' },
  { code: 'P391', text: 'Recueillir le produit répandu.' },
  { code: 'P403', text: 'Stocker dans un endroit bien ventilé.' },
  { code: 'P405', text: 'Garder sous clef.' },
  { code: 'P501', text: 'Éliminer le contenu/récipient conformément à la réglementation locale.' }
];

export const GENERAL_LAB_RULES = [
  'Le port de la blouse en coton, boutonnée, est obligatoire.',
  'Le port de lunettes de protection est obligatoire, même si vous portez des lunettes de vue.',
  'Les cheveux longs doivent être attachés.',
  'Il est strictement interdit de manger, boire ou fumer dans le laboratoire.',
  'Ne jamais pipeter à la bouche : utiliser une propipette (poire aspirante).',
  'Toujours verser l\'acide dans l\'eau, et jamais l\'inverse.',
  'Vérifier l\'etiquetage de chaque flacon avant usage.',
  'En fin de manipulation, nettoyer sa paillasse et se laver les mains.'
];

export const MINISTERE_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgcAAABhCAMAAAClFBMVEX///8AAADo6Oj5+fn39/f8/Pzz8/Pl5eV3d3eqqqrd3d3i4uLHx8e/v7/t7e3W1tZUVFSYmJh+fn6lpaW6urorKytubm6bm5vMzMyJiYmQkJBeXl5JSUlPT0/R0dFEREQ6OjojIyMTExOxsbFkZGQaGhokJCQyMjJhYWE+Pj6Dg4MQEBD1zAD/+/DnLjb///nXsQDivQDlywDtzgDu5tzlvHDgqTfqtk7uvwDhtwDRmyrPmDLKpg4AaI7ttUn/3UHVuxn7ywD26K7w68XZyTbn2Izqyzfz5Z/mwzL/9cbr1T7v40bawEDp0Fj26p341nrUlFv/6ILbwGDkuDXTVT7jVFO+GSLgqEv35anpzWTwy03GQh/TKDK5GwnrvmTt1oGk18e60svIsAf/27DFhib01pDQ6t/319kIZC9GeUjN0ZEAXjyisGCDpnoASQ3KyK30iY7XABU6Zya+xZLUv4zlrHHKZxvqwX/23bbfsmjclxfNxnFRi0nk1WiyYjNqi07D3sTs2saivqyKpmfqpIG9plNKg29Pbi5Yj2iwpmHSg2R1jzMASTDpuZZ0o5CesoBciIrngnXRSgD0qa+2sB6elyG7TSFMcACQewF4fCTfhy/UqUG7cB+cbhTJtYzStW+viyHosptwWjGHcjetgz1ENh2gRldwUF+aZUNRVIoseYsAZ6imjzmDZlx/a1G8tEQ4Un3Zjxi4N0KieD0AXabys3Y2Ynmns0cpcnxXf2uunyq8xE4AV2Siv1GaqS49cFgMi1+22FpGh0x+tmx1nzmHvmsAelbo5DJ1ucsogHs5QyViNjQ6YWlgoatzw8U+j3liOB+FR0YnQyEoVUqfQD0ATUW/KTiylm/BrpKQi1OSjGB1bzO1LHyRAAAgAElEQVR4nO19i2Mbx3nnDIBdvBfvBQEQBEgABB9AieVjCYBrGhQfoizIrsk2lGyFaikruZTyKXGZiIItu6wrX3JWWl8qp07YWLwmqZvIqWrHjWwqjZw4VeKkTuOzYzvXf+a+b3YBLCFQol6RfMHPFrFYzMzuzvzme8x8M0tICy200EILLbTQQgsttNBCCy200EILLbSwE+y60zfQwl2BweydvoMW7jT4ycldU9OTky0q/H6D2zVz366Ze3dzd/pGWrjDyM7uvm/Pnb6JFu449tw3vXf3nb6JFu4ssuV99z/wh4sPHirfZSLBfqdv4PcLe/bNzf/RH39iYXbu1jiPO2g+V8xAnIEO9QtnaJ4oSJ1bT5hEKxHcoZu7uxa2wa7S/gMPPXzwk4vSntKhmy7NEffS8DVTpWmQUOrHQ0skQm1NE3U2FuSjMWKhkZu+xxaueJ/8Kdm/tG9m4PAjR8ihqaUHyaf+5OYK9NNQxNH0F85f7/cR6iNxKuChOxASeXbS2RNL8roMfUCWhrKjICR8N3eDdxY36ZLdFo+O//TA5H/7THbPUml2z58tH83uW1KmBx7978eyn/70TZRqAPHtbXa/Nl337oAmTlB2aOKJowcUgFGknV1bNAFHG1SAKR7jBGq9iZu7LTBH/bVjV7QnEumJGkhPH/C2HQVdMFoTdy4vMtsfrWOY1QjtddiJG1RhwB5e3oiIeL1wkmrBRP3RIJGLbmtz4OFWNze5gL0+iBwvIkdfPZzC5nB++479ODgUubPHvvzGUk6cOSh+wYz8wf/mF2Z44lx4AYuYNMkfgNMPqH+pVckTlr9HqbdPElSi2ALCvocEXdDEdYuwRhvEBJ3HjadiOLSNB2g7YRQuHcvdbEzKp2FRJSyrhDE0ww89aoHsbQRtF7CQBmoiDcAJ0MUi+hM0xg2hwGzh1Ao0l5K2276ro8sHF8Z5rG++c9PzExms+Aw7Bka+cLx/Gp2gGSz2ZMZGeWBgR9ePXvi7I1cwtFcdutlvidAXLXqICIV/I2dn6gVsQUuaifRvhu5pdsJPQ9AyrUl8MGAB3w/HrgobYd25MUUTSX9WAc+HQ+0h2mPG0kMeWCx22w2OxeLw8lwF7FSD29KAFtMScjeA9nNNGo22no7BXKTOFypjMkrePSpxzPgIPCHO56YPDny5KI0+dRfrgIDJoem/gIJuFaRK5WR678A3xGuyW69fmjTq3tQCnxVCZgdbsqHqNNuNhjMDPCJOX2NPDBQx5VC4o7DvkVVBSyRGGE88FJscB/1AnvBOqJVveir2cU6HsBZ5IHaGYyxgDPhT6YIiAaC/cEIFaZmD1EzQerdtHY8Uhkfr4yu8hy//NjQrr98+q8+d+qZxw9N/4/75w598UsP/88/f3Qy8+zpP+WEtROyPC6fYHmGvzwwzA3vrHxXN01X79IZr+l7Y7BfpH2gkIz4HCDdOKJ1oxClASrYuukWRIHwTHOo6YmBycZ+HxHbb7YGbi0SVg+NhEO1/mlVhTZNOmgn8qA96lI7gK2XigIx+nwitYQ8LG2NB9FYB03peNDL6iBlogn86sISXXHMDimdAH9AvOEbVmeRuBPywgm5sh8ODZ966KG//uvjn76f7Nlz4Mm5PfvJoU+v/s1zi/lhtGPWKWFBVnOEuPx1ePy+siJUUJ2Yi0kwThAHrQ5sYnGgU9bHBjdmJO2q22+22+A3Jg+xCUZYXRkaGNa2/qp3/28+u5WZzZzb/vvjY81/d+LszxdKssutvP6v5KVkZsNJxfGG8OD4uj4/JlZ1MTIc1wnbiny5WAyKIeXjSOCgAL+0mrD9Q4k+xXmIK0KsiZcDuRm0Rlstl6rx5U/kWQ7UPxCRTWTwV3SgQuuAkGowi5aEdoT93dGN3RjSxD6JAgI4tPGhjpEqn8VgE+wCys6ZXnQ2HqjCuC8JAdhE69uiJ0dHFNcOJyviqXtP/zQtf/drXvr7+fPmR8tc2/v7vvvGkTvZnVxflYnFhbBwhj8qLO7mc0Wdx06jFa+izWMDTxVMumvKERY8pbOmzRmgP7bEk4YEDmtVs67OkApYGiF0RiyVCvd4kpI94vTSainstNG3y3HXuguYviEmjCAaih4KWSyAPOMaDFLSeMd1DeDfw2J3Yxl+IQn9hPBAdoP1Rnqg88INNIHigsvioll1IBToER1eab3orV8NHowvyGIiDF88ujkKzysdrv2SzA7a/eF5RNjc2XvjGCy9sbCibxf9tHsjWu/1qBbKOAoEWsZDjzYpvAtFpqD4oOb7zDoYnd+8vHz0z9+veXv2XPr2B+ce/v0vPveDP/vL90xd/No9n0Lur8/v3f+/H/p2bvb8v90z8C6m2Tv9sc98bPLUv37q0Vd+pvyffm/o5FfPnP69R3bYg7K5Z4/8v3/n/2H5gW/v23f3I+pPv/idg6dOf/reA3sh9vMv3vN8ee/TMyv3XvhS6f2D9f7+pW/9/tTPT7733O/83XvTpy9gL/7/qA9fe+nscw8ffODR94EPnvvWkffYq6f/8a/vfforHzrHzrHzrHzrHzrHzrHzorHzorHzorHzorHzorHzorHzorzf79D/vszH39v//ff++P/+W7btQ+++//8fe+/ff/b98H//W7A+++/8AgFjS4P6x+sUAAAAASUVORK5CYII=";

export const MINISTERE_LOGO_AR = "https://upload.wikimedia.org/wikipedia/ar/a/af/%D8%B4%D8%B9%D8%A7%D8%B1_%D9%88%D8%B2%D8%A7%D8%B1%D8%A9_%D8%A7%D9%84%D8%AA%D8%B1%D8%A8%D9%8A%D8%A9_%D8%A7%D9%84%D9%88%D8%B7%D9%86%D9%8A%D8%A9_%D9%88%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85_%D8%A7%D9%84%D8%A3%D9%88%D9%84%D9%8A_%D9%88%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6%D8%A9.png";

export const APP_LOGO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEhUQExIWFhUXFSAXFxgYGB0fGxkgGB0WGBUbHx8ZHSggGBolIBgZIz0hJSorLjAvGiAzODMsNygtLisBCgoKDg0OGxAQGzglICUtNy8vLTM3LS01NzUvLy0vKzA1Ky8vMjU1LzItNS8wMzItNy0vKy0rNS8rKzAtNysrNf/AABEIALABHgMBIgACEQEDEQH/xAAcAAEAAwEBAQEBAAAAAAAAAAAABQYHBAMCAQj/xABDEAACAQMDAgQDBQUDCwUBAAABAgMABBEFEiExQQYTIlEHMmEUI3GBkUJSYqGxFcHRM0NTVWNzgpKU4fAWVHKDoiT/AAaAQEAAwEBAQAAAAAAAAAAAAAAAgMEAQUG/8QAMREAAgIBAwIDBgQHAAAAAAAAAAECEQMSITEEQVFh8CJxkaGxwROB0eEFBhQVMjPx/9oADAMBAAIRAxEAPwDcaUpQClKUApSlAKUpQClKUApSlAKUpQClK+JZVUFmIAHJJOAPzPSgPuoPX9caAhRE/JB3+jaVX1SKMuDvwMAEdTxmva81+Bd6q6s6xl8ZGDjtkd/p19uhqhaxLcSQ+asoPr2DzGOU34JbHOUwpGDgYzVU8lcE8cdT3debNMs5zIgcoyZ52vjcPx2kj+de9U3RdTaG4MEsu4Y27i3oXYD8ufyHvVj0/WLeZVaORTu6LkBvw29QfpUozUkRap0d9KUqZwUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpXncTKil2OFAySaN0D7JxzQGss8T+PZWIjiHlkeo85BGGDcghST2TknHTuvt4V8R3ERIkGU7oG3BTtGVB25UqRjHT86xS67HFq+PH9i5YZNeZYdV8YfZ55EeI+XHgs/YDaxJySBwQCSTgAj3qW1ENc2jLGsbM642s2VGcZyVB5HX8RVN0XTzqE73S+mPf62yckE7wi9mwpAzwF3HG7tfx5MEYGVjRfc4A/M96700ss9Tn/j2OZFFVp5KPa3wVRHFbxPIDy8rLtDBuFxngFejDjOOuRu5LiQbgS0Xzo33R3D50IyCvBVSw6fscj97s8aXNvIkSwMq4ds7VCjLcnkgDJOfc9eOtV9LCNuXkcH6Dd/THHP84KNqPso7Te5N2kxTkR2sq5BcM2XAUENjPG9m4HPQdDjJ6tEAnulliijHlH7xWfd5ZYENsI6nofbv3WqpeWyIDiQ7f4iB+QVuvXH/dnnT9P1OzJARkV2AU5G0nHyryBnqcD8aljcZP3HJJpFf/UuXGfkBGBtX0knBPUA9cVOf6Yg+scscsRx6R6h2HQcDoBWejwlrccfnR6hDK0h897WeAbe6k71JYg9cH2Bq9+EPENveI0YyCgX0v3XB6g46bCDjp0qmU8cc3shKTe6+Oxbp96g6Vpt3G0yFshAFTccDcc9SOnHXHvjPtTUrq5fT5o3VllX5mAwNu/G1en7HPt16moPxR4gtfPlsnleF5PuxNu2+gEM2X6YcDbuzgAd8itWfNHHjc3v3Kk9T2KtrF9Z3UskWoxvDb+uRJpUDRttbYgK8uG7hcc7up4I0bw58S9PnjjSKSaWVSVdWRVfPUsV3AbckgADuM9zWV3Udyqf2fcXNpcWhfeHjmVtoYghvVgnjGQCe4Bqz/Dvx3b7WsLmCOeFfTLdQRMUjZRuUSbeFJGfUP/NfGjfDvx3b7WsLmCOeFfTLdQRMUjZRuUSbeFJGfUP/NfGjfDvx3b7WsLmCOeFfTLdQRMUjZRuUSbeFJGfUP/NfhHpbqZAjW6bWlOz07T6X6YIOWUnr/AAr9M1eaoep6oscywzM8B/mNx3kMuxmzkY4ORg9qvekyI0SFSrDb6SB1C9x7r+PtXudBkTyZMe9Kl3XvX7mKcbakvBndSlK9swilKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUArzmZgDtGTtyo7E+9elKk6=";
