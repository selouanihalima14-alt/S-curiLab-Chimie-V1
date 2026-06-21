import { QuizQuestion } from '../constants';

const SCIENTIFIC_QUIZZES_DB: Record<string, QuizQuestion[]> = {
  '13': [
    {
      question: "Par quelle relation théorique calcule-t-on le potentiel d'oxydoréduction $E$ d'une électrode en fonction des concentrations active des espèces ?",
      options: [
        "La loi de Beer-Lambert",
        "La loi de Nernst ($E = E^\\circ + \\frac{0,06}{n}\\log\\frac{[Ox]}{[Red]}$)",
        "L'équation d'Arrhenius",
        "La formule de Clapeyron"
      ],
      correctAnswer: 1,
      explanation: "La loi de Nernst exprime le potentiel d'un couple redox en solution en fonction de son potentiel standard $E^\\circ$ et des concentrations des formes oxydée ($Ox$) et réduite ($Red$)."
    },
    {
      question: "Dans un bécher contenant le couple $Cu^{2+}/Cu$, si la concentration en ions $Cu^{2+}$ augmente fortement, comment évolue le potentiel de cette demi-pile selon la formule de Nernst ?",
      options: [
        "Il reste rigoureusement constant",
        "Il augmente",
        "Il diminue",
        "Il s'annule complètement"
      ],
      correctAnswer: 1,
      explanation: "Puisque $[Cu^{2+}]$ est au numérateur du terme logarithmique de la formule de Nernst ($E = E^\\circ + 0,03\\log[Cu^{2+}]$), une augmentation de sa concentration augmente le potentiel d'électrode."
    },
    {
      question: "Dans la pile Daniell, quel est le sens de circulation conventionnel du courant électrique $I$ dans le circuit externe relié aux métaux ?",
      options: [
        "Du pôle négatif (lame de zinc) vers le pôle positif (lame de cuivre)",
        "Du pôle positif (lame de cuivre) vers le pôle négatif (lame de zinc)",
        "Uniquement à l'intérieur du pont salin",
        "Il n'y a aucun passage de courant à l'extérieur"
      ],
      correctAnswer: 1,
      explanation: "Le courant électrique conventionnel circule du pôle positif (cathode) vers le pôle négatif (anode), soit du cuivre vers le zinc à l'extérieur."
    },
    {
      question: "Dans quel sens se déplacent les électrons libres dans le fil conducteur reliant les deux plaques métalliques de la pile Daniell ?",
      options: [
        "Du cuivre (cathode, +) vers le zinc (anode, -)",
        "Du zinc (anode, -) vers le cuivre (cathode, +)",
        "Ils traversent le pont salin à haute vitesse",
        "Ils tournent en rond autour du voltmètre"
      ],
      correctAnswer: 1,
      explanation: "Les électrons, chargés négativement, sont libérés à l'anode par l'oxydation du zinc et migrent vers la cathode à travers le conducteur métallique externe."
    },
    {
      question: "Lors de la décharge d'une pile active, vers quel pôle de la pile les cations (chargés positivement) du pont salin migrent-ils pour compenser les charges ?",
      options: [
        "Vers le compartiment cathodique (pôle positif) pour compenser la disparition des ions $Cu^{2+}$",
        "Vers le compartiment anodique (pôle négatif)",
        "Ils s'évaporent au-dessus des béchers",
        "Ils s'accumulent au centre exact du filtre"
      ],
      correctAnswer: 0,
      explanation: "Dans la cathode, la réduction consomme les cations $Cu^{2+}$, créant un déficit de charge positive. Les cations du pont salin ($K^+$) migrent donc vers la cathode pour préserver la neutralité."
    },
    {
      question: "Pourquoi la force électromotrice mesurée d'une pile Daniell diminue-t-elle progressivement à zéro au cours d'une décharge prolongée ?",
      options: [
        "Parce que le voltmètre consomme tout le fluide acide",
        "Le système chimique atteint son état d'équilibre thermodynamique, où le quotient de réaction $Qr$ devient égal à la constante d'équilibre $K$",
        "Parce que les métaux s'évaporent par effet Joule",
        "Parce que le pont salin est détruit par la lumière"
      ],
      correctAnswer: 1,
      explanation: "À l'équilibre chimique, la différence de potentiel s'annule ($E = 0$). Les concentrations ne varient plus, la pile est considérée comme 'morte'."
    },
    {
      question: "Quelle est l'unité internationale de charge électrique transportée par une mole d'électrons, représentée par la constante d'intégration de Faraday ($F$) ?",
      options: [
        "Le Joule par mole ($J\\cdot mol^{-1}$)",
        "Le Coulomb ($C$) ou Coulomb par mole ($C\\cdot mol^{-1}$)",
        "Le Volt ($V$)",
        "L'Ampère par seconde ($A\\cdot s^{-1}$)"
      ],
      correctAnswer: 1,
      explanation: "Un Faraday représente la charge d'une mole de charges élémentaires, soit environ $96500\\text{ C/mol}$."
    },
    {
      question: "Quelle relation relie la capacité électrique maximale de la pile $Q_{max}$ à la quantité de matière d'électrons échangés $n(e^-)$ ?",
      options: [
        "$Q_{max} = n(e^-) \\times F$",
        "$Q_{max} = \\frac{n(e^-)}{F}$",
        "$Q_{max} = n(e^-) \\times E_{fem}$",
        "$Q_{max} = I \\times U$"
      ],
      correctAnswer: 0,
      explanation: "La charge totale transportée $Q$ est égale au nombre de moles d'électrons transférés que multiplie la charge d'une mole d'électrons ($F$)."
    },
    {
      question: "Quelle demi-équation traduisant un phénomène de réduction se produit à la cathode de la pile Daniell ?",
      options: [
        "$Zn^{2+}_{(aq)} + 2e^- \\rightarrow Zn_{(s)}$",
        "$Zn_{(s)} \\rightarrow Zn^{2+}_{(aq)} + 2e^-$",
        "$Cu_{(s)} \\rightarrow CuSO_4$",
        "$Cu^{2+}_{(aq)} + 2e^- \\rightarrow Cu_{(s)}$"
      ],
      correctAnswer: 3,
      explanation: "C'est la réduction des ions cuivre (II) dissous en cuivre solide sur la plaque."
    },
    {
      question: "Quel métal constitue l'anode réactive dans la pile Daniell classique ?",
      options: [
        "Le cuivre (Cu)",
        "Le zinc (Zn)",
        "Le fer (Fe)",
        "Le platine (Pt)"
      ],
      correctAnswer: 1,
      explanation: "Le zinc réagit pour perdre des électrons, c'est donc l'anode."
    },
    {
      question: "Dans une pile de type Daniell, comment appelle-t-on le compartiment contenant l'électrode et sa solution ionique ?",
      options: [
        "Une demi-pile",
        "Un pont inter-ions",
        "Un alternateur",
        "Un fusible de protection"
      ],
      correctAnswer: 0,
      explanation: "Chaque bécher contenant une électrode métallique plongée dans une solution contenant ses propres ions constitue une demi-pile."
    }
  ],
  '14': [
    {
      question: "Dans le titrage de Mohr, pourquoi observe-t-on d'abord la formation d'un précipité blanc de chlorure d'argent ($AgCl$) avant celle du précipité rouge de chromate d'argent ($Ag_2CrO_4$) ?",
      options: [
        "Parce que le chlorure d'argent a un produit de solubilité $Ks$ beaucoup plus faible, le rendant moins soluble et précipitant en premier",
        "Parce que le nitrate d'argent rejette les ions chromates",
        "Car le milieu est trop acide au début",
        "Parce que le chromate de potassium est un gaz volatil"
      ],
      correctAnswer: 0,
      explanation: "Bien que les stœchiométries diffèrent, $AgCl$ ($Ks \\approx 1,8\\cdot 10^{-10}$) est nettement moins soluble que $Ag_2CrO_4$ ($Ks \\approx 1,1\\cdot 10^{-12}$). $AgCl$ précipite donc dès les premières gouttes d'Ag⁺."
    },
    {
      question: "De quelle couleur est le précipité de chlorure d'argent ($AgCl$) qui se forme en cours de titrage avant l'équivalence ?",
      options: [
        "Bleu clair transparent",
        "Blanc laiteux ou insoluble blanc",
        "Jaune vif fluorescent",
        "Gris métallique brillant"
      ],
      correctAnswer: 1,
      explanation: "La réaction de précipitation produit une suspension colloïdale blanche de chlorure d'argent ($Ag^+ + Cl^- \\rightarrow AgCl_{(s)}$)."
    },
    {
      question: "Quelle est la stœchiométrie de la réaction de précipitation de l'indicateur coloré (chromate d'argent) à l'équivalence ?",
      options: [
        "$Ag^+ + CrO_4^{2-} \\rightarrow AgCrO_4$",
        "$2Ag^+ + CrO_4^{2-} \\rightarrow Ag_2CrO_4$",
        "$Ag^{2+} + CrO_4^{2-} \\rightarrow AgCrO_4$",
        "$3Ag^+ + CrO_4^{3-} \\rightarrow Ag_3CrO_4$"
      ],
      correctAnswer: 1,
      explanation: "Deux ions argent réagissent avec un ion chromate divalent pour former le complexe solide rouge brique neutre de formule $Ag_2CrO_4$."
    },
    {
      question: "Si le volume équivalent obtenu est $V_E = 12,0\\text{ mL}$ avec $[Ag^+] = 0,05\\text{ mol/L}$ pour un échantillon de $V_{Cl^-} = 10,0\\text{ mL}$, quelle est la concentration $[Cl^-]$ ?",
      options: [
        "$0,042\\text{ mol/L}$",
        "$0,060\\text{ mol/L}$ (calculé par : $\\frac{0,05 \\times 12,0}{10,0}$)",
        "$0,050\\text{ mol/L}$",
        "$0,120\\text{ mol/L}$"
      ],
      correctAnswer: 1,
      explanation: "À l'équivalence, la relation de stœchiométrie donne $C_{Cl^-} \\times V_{Cl^-} = C_{Ag^+} \\times V_E$, d'où $C_{Cl^-} = 0,060\\text{ mol/L}$."
    },
    {
      question: "Quelle est la définition thermodynamique du produit de solubilité $K_s$ d'un sel solide de formule minimale $XY$ en équilibre avec ses ions dissous ?",
      options: [
        "$K_s = [X^+] + [Y^-]$",
        "$K_s = [X^+] \\times [Y^-]$",
        "$K_s = \\frac{[X^+]}{[Y^-]}$",
        "$K_s = -\\log([X^+] \\times [Y^-])$"
      ],
      correctAnswer: 1,
      explanation: "Le produit de solubilité $K_s$ est la constante d'équilibre associée à la dissolution du solide : sa valeur dépend uniquement de la température."
    },
    {
      question: "Dans le titrage de Mohr, à quel moment précis observe-t-on le virage persistant du jaune clair au rouge brique ?",
      options: [
        "Dès le début de l'ajout de nitrate d'argent",
        "À l'équivalence exacte, dès que tous les ions chlorures ont précipité et qu'une micro-goutte de nitrate d'argent en excès réagit avec le chromate",
        "Après une heure de forte ébullition",
        "Uniquement après évaporation totale de l'eau"
      ],
      correctAnswer: 1,
      explanation: "Tant qu'il reste des ions $Cl^-$, l'ion $Ag^+$ réagit pour former du $AgCl$ blanc. Dès épuisement des chlorures, l'excès d'Ag⁺ précipite avec le chromate en $Ag_2CrO_4$ rouge permanent."
    },
    {
      question: "Pourquoi la méthode de Mohr est-elle qualifiée de méthode de titrage de précipitation directe ?",
      options: [
        "Parce qu'on mesure le volume de gaz produit",
        "On verse directement le réactif titrant jusqu'à précipitation quantitative de l'espèce à doser sans réaction de retour",
        "Elle implique une hydrolyse enzymatique",
        "On dose par pesée du filtre sec"
      ],
      correctAnswer: 1,
      explanation: "Le nitrate d'argent de concentration connue est versé directement sur la solution à tester pour former un solide stable insoluble."
    },
    {
      question: "Quelle est l'unité de la solubilité molaire $s$ d'un composé ionique dissous dans l'eau ?",
      options: [
        "Gramme par millilitre ($g/mL$)",
        "Mole par litre ($mol/L$)",
        "Gramme par mole ($g/mol$)",
        "Sans unité"
      ],
      correctAnswer: 1,
      explanation: "La solubilité molaire exprime la quantité maximale (en moles) d'un soluté solide saturant un litre de solution saturée."
    },
    {
      question: "Quelle est la formule chimique du chromate d'argent précipité rouge ?",
      options: [
        "$AgCl$",
        "$Ag_2CrO_4$",
        "$K_2CrO_4$",
        "$AgNO_3$"
      ],
      correctAnswer: 1,
      explanation: "Le chromate d'argent est de formule chimique $Ag_2CrO_4$."
    },
    {
      question: "Quel est le rôle de l'ion chromate ($CrO_4^{2-}$) dans la méthode de Mohr ?",
      options: [
        "C'est l'espèce chimique titrée",
        "C'est l'indicateur coloré de fin de réaction par précipitation",
        "C'est le catalyseur",
        "C'est le solvant"
      ],
      correctAnswer: 1,
      explanation: "L'ion chromate forme un précipité rouge brique avec les premiers ions argent en excès."
    }
  ]
};

const GENERAL_CHEMISTRY_POOL: QuizQuestion[] = [
  {
    question: "Quelle est l'unité internationale de la concentration molaire d'une espèce chimique ?",
    options: ["g/L", "mol/L", "mol", "Pa"],
    correctAnswer: 1,
    explanation: "La concentration molaire s'exprime en moles de soluté dissous par litre de solution (mol/L)."
  },
  {
    question: "La formule du pH d'une solution diluée en fonction des ions hydronium $[H_3O^+]$ est :",
    options: ["$pH = \\ln[H_3O^+]$", "$pH = -\\log[H_3O^+]$", "$pH = 14 - \\log[OH^-]$", "$pH = [H_3O^+]^2$"],
    correctAnswer: 1,
    explanation: "Le pH est le cologarithme décimal de l'activité des ions hydronium : $pH = -\\log_{10}[H_3O^+]$."
  },
  {
    question: "Quel est le pH d'une solution neutre à la température de 25 °C ?",
    options: ["0", "14", "7", "1"],
    correctAnswer: 2,
    explanation: "À 25 °C, l'eau pure a un pH neutre de 7 correspond à $[H_3O^+] = 10^{-7} \\text{ mol/L}$."
  },
  {
    question: "Quel est le but principal de l'étalonnage d'un pH-mètre avant des mesures de précision ?",
    options: [
      "Pour refroidir la sonde de mesure",
      "Étalonner la réponse de l'appareil à l'aide de solutions tampons de pH connus",
      "Ajuster la pression atmosphérique locale",
      "Vider la solution d'hydroxyde de sodium de sa burette"
    ],
    correctAnswer: 1,
    explanation: "L'étalonnage permet au pH-mètre d'ajuster sa pente de réponse électrique à l'aide de tampons (souvent de pH 4, 7 ou 10)."
  },
  {
    question: "Quel type d'électrode de référence est couramment utilisé comme référence de potentiel stable ?",
    options: [
      "Une électrode en bois de chêne",
      "L'électrode au calomel saturé (ECS) ou argent/chlorure d'argent ($Ag/AgCl$)",
      "Une boussole électrolytique",
      "Une électrode de verre poreux sans métal"
    ],
    correctAnswer: 1,
    explanation: "L'électrode au calomel saturé (ECS) ou l'électrode Ag/AgCl fournit un potentiel de référence parfaitement stable et reproductible."
  }
];

export const getScientificTPQuiz = (tpId: string, defaultQuiz: QuizQuestion[]): QuizQuestion[] => {
  const baseQuiz = defaultQuiz || [];
  const extras = SCIENTIFIC_QUIZZES_DB[tpId] || [];
  
  // Merge uniques
  const compiledQuiz = [...baseQuiz];
  for (const q of extras) {
    if (!compiledQuiz.some(item => item.question.trim().toLowerCase() === q.question.trim().toLowerCase())) {
      compiledQuiz.push(q);
    }
  }

  // If still below 20 (for TP 13 & 14 or any other hypothetical cases), pad with general chemistry ones
  if (compiledQuiz.length < 20) {
    const offsetIndex = (parseInt(tpId, 10) || 0) * 3;
    for (let i = 0; i < GENERAL_CHEMISTRY_POOL.length && compiledQuiz.length < 20; i++) {
      const idx = (offsetIndex + i) % GENERAL_CHEMISTRY_POOL.length;
      const candidate = GENERAL_CHEMISTRY_POOL[idx];
      if (!compiledQuiz.some(item => item.question.trim().toLowerCase() === candidate.question.trim().toLowerCase())) {
        compiledQuiz.push(candidate);
      }
    }
  }

  // Ensure if we are still short, make it exactly 20
  while (compiledQuiz.length < 20 && GENERAL_CHEMISTRY_POOL.length > 0) {
    for (const pq of GENERAL_CHEMISTRY_POOL) {
      if (compiledQuiz.length >= 20) break;
      if (!compiledQuiz.some(item => item.question.trim().toLowerCase() === pq.question.trim().toLowerCase())) {
        compiledQuiz.push(pq);
      }
    }
  }

  return compiledQuiz.slice(0, 20);
};
