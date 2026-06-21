export interface ReactantProduct {
  name: string;
  role: string;
  safety: string;
}

export interface FormulaDetails {
  title: string;
  formula: string;
  explanation: string;
  example: string;
}

export interface LabReportTemplate {
  tpId: string;
  generalTitle: string;
  introduction: string;
  drawingInstructions: string[];
  materialsAndReactants: ReactantProduct[];
  equationsAndCalculations: FormulaDetails[];
  expectedObservations: string;
  expectedModelResults: string;
  commonErrors: string[];
  modelQuestions: Array<{ question: string; answer: string }>;
  conclusionTemplate: string;
}

export const REPORT_TEMPLATES: Record<string, LabReportTemplate> = {
  '1': {
    tpId: '1',
    generalTitle: 'Compte-Rendu Modèle : Titrage Acide-Base',
    introduction: 'Déterminer avec une grande précision la concentration molaire inconnue Ca d\'une solution d\'acide chlorhydrique (HCl) par un titrage pH-métrique ou colorimétrique en présence de phénolphtaléine en utilisant une solution étalon d\'hydroxyde de sodium (NaOH) de concentration Cb connue.',
    drawingInstructions: [
      'Schématiser un dispositif de titrage complet : support universel, burette graduée fixée par une pince.',
      'Dessiner l\'erlenmeyer ou bécher posé sur l\'agitateur magnétique.',
      'Flécher de manière soignée : la burette contenant le réactif titrant (Soude Cb, Vb), l\'erlenmeyer contenant le réactif titré (Acide chlorhydrique Ca, Va = 10,0 mL, et 3 gouttes d\'indicateur coloré).',
      'Mentionner l\'agitateur magnétique muni de son turbulent (barreau aimanté).'
    ],
    materialsAndReactants: [
      { name: 'Acide Chlorhydrique (HCl)', role: 'Réactif titré de concentration inconnue Ca à déterminer.', safety: 'Substance irritante. Diluée : lunettes et blouse obligatoires.' },
      { name: 'Hydroxyde de Sodium (NaOH)', role: 'Réactif titrant de concentration standardisée Cb = 0,10 mol/L.', safety: 'Corrosif. Provoque de graves brûlures cutanées. Gants impératifs.' },
      { name: 'Phénolphtaléine', role: 'Indicateur coloré de fin de réaction (zone de virage 8,2 - 10,0).', safety: 'Solution alcoolique inflammable, suspectée cancérigène (manipuler avec soin).' }
    ],
    equationsAndCalculations: [
      {
        title: 'Équation de la Réaction Chimique du Titrage',
        formula: 'H3O⁺(aq) + OH⁻(aq) ⟶ 2 H2O(l)',
        explanation: 'Réaction totale, rapide et univoque entre l\'ion oxonium de l\'acide fort et l\'ion hydroxyde de la base forte.',
        example: 'À chaque ajout de NaOH, les ions hydroxyde neutralisent instantanément les ions oxonium.'
      },
      {
        title: 'Formule Fondamentale à l\'Équivalence',
        formula: 'Ca × Va = Cb × Ve  ⟶  Ca = (Cb × Ve) / Va',
        explanation: 'À l\'équivalence, les réactifs titré et titrant ont été introduits dans les proportions stœchiométriques.',
        example: 'Pour Cb = 0,10 mol/L, Va = 10,0 mL, et un volume équivalent mesuré expérimentalement de Ve = 10,2 mL, on obtient : Ca = (0,10 × 10,2) / 10,0 = 0,102 mol/L.'
      }
    ],
    expectedObservations: 'La solution titrée est initialement incolore. À l\'approche de l\'équivalence, une coloration rose fugace apparaît. À l\'équivalence exacte, l\'ajout d\'une seule goutte de soude fait virer la solution de manière persistante (au moins 30s) au rose très pâle.',
    expectedModelResults: 'Le volume équivalent théorique attendu se situe entre 9,8 mL et 10,5 mL en fonction de la solution d\'acide fournie. La concentration Ca obtenue doit être présentée avec une marge d\'erreur incertitude-type absolue de +/- 0,002 mol/L.',
    commonErrors: [
      'Mauvaise évacuation de la bulle d\'air sous le robinet de la burette graduée avant de commencer (fausse la valeur de Ve lue de 0,1 à 0,3 mL).',
      'Dépassement du point d\'équivalence (coloration rose fuchsia trop foncée qui indique un excès de soude, faussant la concentration Ca à la hausse).',
      'Erreur de parallaxe lors de la lecture du ménisque sur la burette (toujours lire le bas du ménisque au niveau des yeux).'
    ],
    modelQuestions: [
      {
        question: 'Pourquoi l\'ajout d\'eau distillée dans l\'erlenmeyer pour immerger les sondes ou diluer la solution ne modifie-t-il pas le résultat du titrage ?',
        answer: 'L\'ajout d\'eau distillée modifie le volume total de la solution dans l\'erlenmeyer, mais il n\'altère pas la quantité de matière iniciale na d\'ions H3O+ présente qui provient uniquement du prélèvement précis Va effectué à la fiole ou pipette jaugée. Le volume Ve versé dépend uniquement de na et de Cb.'
      },
      {
        question: 'Quel est l\'intérêt d\'effectuer un dosage rapide avant de réaliser le dosage précis ?',
        answer: 'Le dosage rapide permet de situer grossièrement le volume équivalent à 1 mL près. Cela fait gagner du temps lors du titrage précis où l\'on peut verser rapidement le titrant jusqu\'à (Ve - 2) mL, puis continuer lentement goutte à goutte pour capter l\'équivalence exacte.'
      }
    ],
    conclusionTemplate: 'En conclusion, nous avons déterminé avec succès la concentration de la solution d\'acide chlorhydrique qui s\'élève à Ca = [Entrer la valeur] mol/L. Cette valeur est en excellent accord avec les tolérances attendues. La manipulation a démontré l\'importance capitale de l\'exactitude des rinçages et des prélèvements volumétriques en analyse chimique quantitatives.'
  },
  '2': {
    tpId: '2',
    generalTitle: 'Compte-Rendu Modèle : Extraction de la caféine du thé',
    introduction: 'Mettre en œuvre une méthode physique et chimique d\'isolement en extrayant par hydrodistillation ou décoction puis par extraction liquide-liquide sélective de la caféine contenue dans des feuilles de thé.',
    drawingInstructions: [
      'Schématiser le montage de chauffage à reflux : ballon, chauffe-ballon, support élévateur (boy), réfrigérant à boules (avec flèches d\'entrée d\'eau froide en bas et de sortie en haut).',
      'Dessiner l\'ampoule à décanter sur son anneau de support avec les deux phases séparées, légendées de manière claire.'
    ],
    materialsAndReactants: [
      { name: 'Dichlorométhane (DCM)', role: 'Solvant d\'extraction sélective de la caféine (la caféine y est nettement plus soluble que dans l\'eau à froid).', safety: 'Volatile, toxique et suspecté cancérogène. Travailler exclusivement sous hotte ventilée active avec double paire de gants.' },
      { name: 'Carbonate de Sodium (Na2CO3)', role: 'Rend le milieu basique pour transformer les tanins acides en sels solubles dans la phase aqueuse, laissant la caféine libre en phase organique.', safety: 'Poudre très irritante pour les yeux et les voies respiratoires.' },
      { name: 'Feuilles de Thé', role: 'Matière première végétale brute contenant environ 2% à 4% de caféine en masse sèche.', safety: 'Aucun risque.' }
    ],
    equationsAndCalculations: [
      {
        title: 'Calcul du Rendement de l\'Extraction',
        formula: 'Rendement (%) = (m_cafeine_isolee / m_the_depart) × 100',
        explanation: 'Permet de quantifier l\'efficacité du protocole de décoction et d\'extraction sélective de la caféine brute.',
        example: 'Pour 20,0 g de thé sec traités et une masse de caféine purifiée obtenue de m = 0,18 g : Rendement = (0,18 / 20,0) × 100 = 0,90%.'
      }
    ],
    expectedObservations: 'Lors de la décoction, l\'eau devient brun foncé. Après ajout du dichlorométhane dans l\'ampoule à décanter, deux phases bien distinctes apparaissent. La phase organique s\'accumule en bas car le dichlorométhane a une densité supérieure (1,33 g/mL). Elle est limpide et légèrement colorée. Après évaporation du solvant sous hotte ou étuve, des cristaux blanc/jaunâtre de caféine se déposent.',
    expectedModelResults: 'Masse de caféine attendue : entre 0,10 g et 0,30 g à partir de 20 g de thé de bonne qualité. Point de fusion mesuré de la caféine purifiée : environ 234°C - 236°C.',
    commonErrors: [
      'Oubli de dégazage lors de l\'agitation de l\'ampoule à décanter, entraînant une surpression de vapeurs de DCM dangereuse.',
      'Formation d\'une émulsion stable lors de l\'agitation de l\'ampoule si l\'agitation est trop vigoureuse (remède : ajouter un peu de sel NaCl pour saturer l\'eau ou attendre patiemment).',
      'Perte de solvant et de produit par filtration hâtive d\'un système encore trop tiède.'
    ],
    modelQuestions: [
      {
        question: 'Quel est le rôle précis de l\'ajout de Carbonate de Sodium lors de l\'étape d\'ébullition ?',
        answer: 'Le carbonate de sodium hydrolyse et basifie le milieu (pH ~ 9). Sous ces conditions basiques, les tanins (molécules polyphénoliques acides présentes dans le thé) sont entièrement déprotonés sous forme saline hydrosoluble. Ils restent ainsi prisonniers de la phase aqueuse lors de l\'extraction, évitant de co-extraire ces impuretés avec la caféine.'
      },
      {
        question: 'Pourquoi la caféine se retrouve-t-elle majoritairement dans la phase inférieure dans l\'ampoule ?',
        answer: 'La caféine possède un coefficient de partage très favorable envers le dichlorométhane comparé à l\'eau à température ambiante. Le dichlorométhane ayant une densité de 1,33 (nettement supérieure à l\'eau), il constitue la phase inférieure. La caféine s\'y solubilise préférentiellement et s\'accumule en bas.'
      }
    ],
    conclusionTemplate: 'En conclusion, nous avons extrait la caféine du thé avec un rendement de [Entrer le rendement]% de caféine brute. Les cristaux identifiés ont montré des propriétés caractéristiques proches de la caféine pure. Les précautions sanitaires liées au dichlorométhane ont été scrupuleusement appliquées.'
  },
  '3': {
    tpId: '3',
    generalTitle: 'Compte-Rendu Modèle : Estérification et Hydrolyse',
    introduction: 'Synthétiser un ester aromatique (éthanoate d\'éthyle) par réaction directe entre un acide carboxylique et un alcool. Étudier l\'équilibre chimique et le rôle cinétique de l\'acide sulfurique en tant que catalyseur de cette réaction réversible.',
    drawingInstructions: [
      'Dessiner un montage à reflux classique : ballon, chauffe-ballon, support élévateur mécanique, réfrigérant à boules vertical sans bouchon supérieure.',
      'Indiquer l\'arrivée d\'eau froide par le bas du réfrigérant et la sortie d\'eau par le haut.'
    ],
    materialsAndReactants: [
      { name: 'Acide Éthanoïque Glacial', role: 'Réactif acide carboxylique pour la synthèse.', safety: 'Corrosif et inflammable (H226, H314). Manipuler sous hotte protectrice.' },
      { name: 'Éthanol Absolu', role: 'Réactif alcool pour la réaction d\'estérification.', safety: 'Substance hautement inflammable (H225). Tenir éloigné de tout point chaud.' },
      { name: 'Acide Sulfurique (H2SO4)', role: 'Catalyseur de la réaction (indispensable pour accélérer la cinétique).', safety: 'Extrêmement corrosif, réaction violente et exothermique avec l\'eau (H314).' }
    ],
    equationsAndCalculations: [
      {
        title: 'Équation Bilan de l\'Estérification',
        formula: 'CH3COOH(l) + CH3CH2OH(l) ⇄ CH3COOCH2CH3(l) + H2O(l)',
        explanation: 'Réaction équilibrée de condensation produisant l\'ester (éthanoate d\'éthyle) et de l\'eau. Limite cinétique et thermodynamique à respecter.',
        example: 'Un mélange équimolaire de départ s\'arrête spontanément à un taux d\'avancement maximal de 67%.'
      },
      {
        title: 'Formule du Rendement de la Synthèse',
        formula: 'R (%) = (n_ester_obtenu / n_theorique_max) × 100',
        explanation: 'Rapport entre la quantité d\'ester purifié isolé et la quantité maximale attendue en cas d\'avancement total.',
        example: 'Pour une quantité théorique max de 0,25 mol d\'ester, si on obtient expérimentalement m = 14,8 g (M = 88,1 g/mol, soit n = 0,168 mol) : Rendement = (0,168 / 0,25) × 100 = 67,2%.'
      }
    ],
    expectedObservations: 'Pendant le chauffage à reflux, des gouttes condensées se détachent du réfrigérant de manière stable, prouvant le recyclage continu des réactifs volatils. Lors de l\'introduction dans l\'ampoule à décanter avec de l\'eau salée, l\'ester d\'odeur parfumée fruitée agréable distincte se sépare en phase supérieure limpide.',
    expectedModelResults: 'Le rendement modèle d\'une estérification équimolaire se situe entre 60% et 67%. La pureté peut être évaluée par mesure de densité ou d\'indice de réfraction.',
    commonErrors: [
      'Chauffage trop violent provoquant une fuite des vapeurs d\'ester très inflammables par le sommet du réfrigérant.',
      'Oubli d\'ajouter les grains de pierre ponce pour réguler l\'ébullition, provoquant des soubresauts dangereux.',
      'Rinçages insuffisants de la phase organique avec le bicarbonate de sodium, laissant l\'ester acide et impur.'
    ],
    modelQuestions: [
      {
        question: 'Quel est le rôle exact de l\'acide sulfurique inséré au début de la synthèse ?',
        answer: 'L\'acide sulfurique agit comme catalyseur. Les ions H+ qu\'il libère accélèrent la vitesse de la réaction d\'estérification (et de l\'hydrolyse inverse) en augmentant l\'électrophilie du carbone carbonyle de l\'acide carboxylique. Il n\'influe pas sur la position de l\'équilibre final.'
      },
      {
        question: 'Comment peut-on déplacer l\'équilibre chimique pour obtenir un rendement proche de 100% ?',
        answer: 'On peut déplacer l\'équilibre soit en utilisant un des réactifs en large excès (par exemple l\'alcool peu coûteux), soit en éliminant en continu un produit au fur et à mesure de sa formation (par exemple en distillant l\'ester ou l\'eau à l\'aide d\'un montage de Dean-Stark).'
      }
    ],
    conclusionTemplate: 'En conclusion, nous avons synthétisé de l\'éthanoate d\'éthyle avec un rendement de [Entrer]%. Le chauffage à reflux a permis un gain de temps précieux de manière totalement sécurisée. L\'étude a validé la limite thermodynamique de l\'estérification directe.'
  },
  '4': {
    tpId: '4',
    generalTitle: 'Compte-Rendu Modèle : Hydrodistillation de la Lavande',
    introduction: 'Extraire l\'huile essentielle contenue dans les fleurs de lavande par le principe d\'entraînement à la vapeur (hydrodistillation), puis isoler sélectivement cette huile organique par relargage et séchage.',
    drawingInstructions: [
      'Schématiser le montage d\'hydrodistillation complet : chauffe-ballon, ballon bicol ou ballon rond simple.',
      'Dessiner la tête de distillation reliant le ballon au réfrigérant à eau incliné.',
      'Flécher l\'alimentation en eau froide (à contre-courant, par le bas) et la sortie vers l\'évier (par le haut).',
      'Dessiner l\'éprouvette de recueil du distillat sous le tube de sortie.'
    ],
    materialsAndReactants: [
      { name: 'Fleurs de Lavande', role: 'Source végétale naturelle d\'acétate de linalyle et de linalol (principes actifs de l\'huile).', safety: 'Aucune dangerosité particulière.' },
      { name: 'Eau Distillée', role: 'Générateur de vapeur nécessaire à l\'entraînement et à la distillation du mélange à température modérée (<100°C).', safety: 'Risque de projection d\'eau bouillante.' },
      { name: 'Chlorure de Sodium (NaCl)', role: 'Utilisé pour l\'étape finale de relargage dans l\'éprouvette ou l\'ampoule à décanter.', safety: 'Sel inoffensif.' }
    ],
    equationsAndCalculations: [
      {
        title: 'Température d\'Ébullition du Mélange Hétérogène',
        formula: 'P_totale = P_vapeur_eau + P_vapeur_huile = P_atmospherique',
        explanation: 'Le mélange distille à une température inférieure aux points d\'ébullition respectifs de l\'eau pure (100°C) et de l\'huile essentielle (environ 200°C).',
        example: 'Cela permet d\'extraire les huiles thermolabiles sans les dégrader par une chaleur trop élevée.'
      }
    ],
    expectedObservations: 'Dès le début de l\'ébullition, une odeur intense de lavande emplit l\'espace. Le distillat recueilli n\'est pas limpide mais trouble (émulsion hétérogène blanche d\'huile dans l\'eau). Lors de l\'ajout de sel, l\'émulsion se résorbe et une fine couche limpide hétérogène de couleur jaune très pâle surnage nettement en surface à cause de sa densité inférieure à l\'eau.',
    expectedModelResults: 'À partir de 20 g de lavande séchée de bonne qualité, le volume d\'huile essentielle isolée est généralement de l\'ordre de 0,5 à 1,5 mL.',
    commonErrors: [
      'Fermeture hermétique du haut du récepteur de distillat, ce qui met tout le montage en surpression et risque de le faire exploser.',
      'Absence de surveillance du débit d\'eau froide dans le réfrigérant, ce qui laisse s\'échapper des vapeurs d\'huile brûlantes non condensées.',
      'Chauffage excessif en fin de manipulation provoquant la calcination des fleurs au fond du ballon (les odeurs de brûlé polluent le produit).'
    ],
    modelQuestions: [
      {
        question: 'Quel est le rôle scientifique de la technique de "Relargage" par ajout de NaCl ?',
        answer: 'L\'huile essentielle (majoritairement l\'acétate de linalyle) est très légèrement soluble dans l\'eau pure. En saturant la phase aqueuse en sel (NaCl), la force ionique du solvant augmente drastiquement. L\'eau hautement polaire solvatise de préférence les ions Na+ et Cl-, expulsant les molécules organiques hydrophobes et peu polaires de l\'huile, ce qui maximise la séparation et le rendement.'
      },
      {
        question: 'Pourquoi l\'hydrodistillation permet-elle d\'isoler des huiles essentielles sans les détruire par la chaleur ?',
        answer: 'Les molécules aromatiques constituant l\'huile ont des points d\'ébullition très élevés (souvent > 200°C) qui les dégraderaient si elles étaient chauffées directement à sec. L\'hydrodistillation crée un azéotrope hétérogène où la co-distillation se fait sous pression atmosphérique à une température obligatoirement inférieure à 100°C (température d\'ébullition de l\'eau), protégeant les molécules thermolabiles.'
      }
    ],
    conclusionTemplate: 'En conclusion, nous avons extrait l\'huile essentielle de lavande de manière propre et sélective. Le distillat hétérogène traité par relargage a permis d\'isoler environ [Entrer volume] mL d\'huile parfumée. Les principes de sécurité des récipients ouverts ont été bien suivis.'
  },
  '5': {
    tpId: '5',
    generalTitle: 'Compte-Rendu Modèle : Spectrophotométrie UV-Visible',
    introduction: 'Déterminer la concentration inconnue d\'une solution aqueuse fortement colorée de Permanganate de Potassium (KMnO4) par l\'établissement d\'une droite d\'étalonnage en mesurant l\'absorbance de solutions filles de concentrations connues conformément à la loi de Beer-Lambert.',
    drawingInstructions: [
      'Dessiner un graphique propre représentant la courbe d\'étalonnage Absorbance A (sans unité) en ordonnée en fonction de la concentration C ou de la concentration massique Cm de permanganate en abscisse.',
      'Dessiner une fiole jaugée fléchée de préparation par dilution d\'une solution fille.',
      'Inclure la boîte du spectrophotomètre avec la fente de cuve et le trajet du faisceau lumineux monochromatique.'
    ],
    materialsAndReactants: [
      { name: 'Permanganate de Potassium (KMnO4)', role: 'Espèce colorée étalon dont l\'absorbance est suivie à 525 nm.', safety: 'Substance oxydante et irritante. Tache fortement la peau et les tissus en brun.' },
      { name: 'Eau Distillée', role: 'Solvant utilisé pour faire le "Blanc" (zéro de référence d\'absorption du solvant) et préparer la gamme de dilutions.', safety: 'Aucun risque.' }
    ],
    equationsAndCalculations: [
      {
        title: 'Formule de Dilution Moléculaire',
        formula: 'C_mere × V_mere = C_fille × V_fille  ⟶  V_mere = (C_fille × V_fille) / C_mere',
        explanation: 'Permet de calculer le volume précis de solution mère à prélever à l\'aide d\'une pipette pour préparer les flacons de la gamme d\'étalonnage.',
        example: 'Pour préparer 50,0 mL de solution fille à C = 2,0 × 10⁻⁴ mol/L à partir d\'une solution mère C0 = 1,0 × 10⁻³ mol/L : Vmère = (2,0×10⁻⁴ × 50) / 1,0×10⁻³ = 10,0 mL.'
      },
      {
        title: 'Expression de la Loi de Beer-Lambert',
        formula: 'A = ε × l × C = k × C',
        explanation: 'Montre la proportionnalité stricte entre l\'absorbance A et la concentration C de l\'espèce absorbante à longueur d\'onde constante.',
        example: 'Si la constante d\'étalonnage k obtenue par régression linéaire de la droite est de 2200 L/mol, et pour un échantillon d\'absorbance Ax = 0,44 : Cx = 0,44 / 2200 = 2,0 × 10⁻⁴ mol/L.'
      }
    ],
    expectedObservations: 'La solution mère de KMnO4 possède une couleur violette extrêmement intense. Les solutions filles de la gamme présentent une dégradation linéaire de la nuance de couleur violette, devenant de plus en plus claires. La valeur d\'absorbance croît régulièrement de manière visuelle avec la concentration.',
    expectedModelResults: 'La longueur d\'onde de travail doit être sélectivement validée à λ = 525 nm (maximum de bande d\'absorption du KMnO4 dans le vert). Le coefficient de corrélation linéaire r² de la droite régression graphique doit idéalement être supérieur à 0,995.',
    commonErrors: [
      'Oubli de réaliser le blanc (zéro d\'absorbance) avec l\'eau distillée, provoquant un décalage vertical systématique de toutes les mesures.',
      'Traces de doigts ou micro-gouttes d\'eau sur les faces transparentes de la cuve (toujours manipuler les cuves par leurs faces dépolies et essuyer les faces transparentes avec du papier optique doux).',
      'Utilisation de solutions trop concentrées pour lesquelles l\'absorbance dépasse 1,5 ou 2, sortant du domaine de linéarité de la loi de Beer-Lambert en raison d\'interactions moléculaires.'
    ],
    modelQuestions: [
      {
        question: 'Pourquoi choisit-on la longueur d\'onde de transmittance minimale (ou d\'absorbance maximale) à λ = 525 nm pour ce dosage ?',
        answer: 'Travailler au maximum d\'absorption (λmax) présente un double intérêt majeur : d\'une part, cela maximise la sensibilité du dosage (une faible variation de concentration engendre une variation d\'absorbance maximale mesurable) ; d\'autre part, la variation d\'absorbance en fonction de la longueur d\'onde y est minimale, ce qui réduit considérablement les erreurs de mesure si l\'appareil dérive légèrement.'
      },
      {
        question: 'En quoi consiste l\'étape du "Blanc" et en quoi est-elle fondamentale pour la précision de la mesure ?',
        answer: 'L\'étape du "blanc" consiste à mesurer l\'absorbance d\'une cuve contenant uniquement le solvant d\'étalonnage (ici l\'eau distillée). L\'appareil soustrait ainsi l\'intensité lumineuse réfléchie ou absorbée par le verre de la cuve, par l\'eau distillée et par l\'atmosphère ambiante. L\'absorbance mesurée ultérieurement correspondra uniquement à l\'espèce chimique d\'intérêt (KMnO4).'
      }
    ],
    conclusionTemplate: 'En conclusion, nous avons tracé la droite d\'étalonnage conforme à la loi de Beer-Lambert (avec un r² de [Entrer r²]). Grâce à cette régression linéaire, la concentration de la solution inconnue de KMnO4 a été déterminée à Cx = [Entrer] mol/L de manière hautement reproductible.'
  },
  '6': {
    tpId: '6',
    generalTitle: 'Compte-Rendu Modèle : Cinétique Chimique Iode-Acétone',
    introduction: 'Étudier la vitesse cinétique de la réaction de substitution d\'halogénation de l\'acétone par le diiode (I2) catalysée par les ions acide (H+), et exploiter les variations d\'absorbance ou les dosages par trempe pour déterminer l\'ordre partiel de la réaction chimique.',
    drawingInstructions: [
      'Schématiser l\'allure de la courbe de concentration en diiode [I2] en fonction du temps t.',
      'Pour une réaction d\'ordre 0 par rapport à I2, la représentation graphique doit être une droite descendante de pente constante négative (pente = -k).',
      'Dessiner le schéma de la trempe chimique : ajouter de l\'eau glacée et du NaHCO3 solide dans le bécher de prélèvement.'
    ],
    materialsAndReactants: [
      { name: 'Diiode (I2) en solution', role: 'Espèce d\'intérêt dont on suit la disparition progressive (couleur jaune/brune).', safety: 'Tache fortement la peau et les vêtements, toxique à haute dose.' },
      { name: 'Acétone (Propanone)', role: 'Réactif organique en grand excès par rapport au diiode.', safety: 'Substance extrêmement inflammable (H225). Provoque de fortes irritations oculaires et somnolence.' },
      { name: 'Acide Chlorhydrique (HCl)', role: 'Source d\'ions H+ agissant comme catalyseur indispensable de la cinétique.', safety: 'Irritant respiratoire et cutané.' }
    ],
    equationsAndCalculations: [
      {
        title: 'Équation Bilan de la Réaction Cinétique',
        formula: 'CH3COCH3(aq) + I2(aq) ⟶ CH3COCH2I(aq) + I⁻(aq) + H⁺(aq)',
        explanation: 'La propanone est iodée. Les ions H+ sont également produits, traduisant une réaction autocatalytique à long terme.',
        example: 'Le diiode brun disparaît au cours de la réaction pour donner de l\'iodoacétone incolore.'
      },
      {
        title: 'Calcul de la Vitesse de Réaction',
        formula: 'Vitesse v = - d[I2]/dt = k × [Acétone]^p × [H+]^q × [I2]^r',
        explanation: 'Relation liant la vitesse de disparition du diiode aux ordres partiels par rapport aux réactifs et à la température.',
        example: 'Pour une réaction d\'ordre 0 par rapport à I2, la vitesse v = constante, ce qui donne une droite de concentration en fonction du temps.'
      }
    ],
    expectedObservations: 'Le mélange initial possède une coloration brune ou jaune caractéristique à cause du diiode libre. Au cours du temps (quelques minutes), on observe de manière limpide une décoloration progressive régulière et lente du mélange qui devient totalement incolore, marquant la fin de la consommation complète du diiode.',
    expectedModelResults: 'Le graphe [I2] = f(t) montre une régression parfaitement linéaire avec le temps, confirmant un ordre de réaction r = 0 par rapport au diiode. Les ordres partiels par rapport à l\'acide chlorhydrique (catalyseur) et à l\'acétone s\'avèrent être égaux à 1 (déduction faite en doublant leurs concentrations initiales).',
    commonErrors: [
      'Mauvaise maîtrise du déclenchement du chronomètre au moment du mélange initial des trois réactifs.',
      'Trempe insuffisante si l\'eau n\'est pas glacée ou si le carbonate de sodium n\'est pas inséré en quantité suffisante pour stopper la réaction de manière quantitative.',
      'Élévation de température durant le suivi qui accélère anormalement la vitesse de réaction.'
    ],
    modelQuestions: [
      {
        question: 'En quoi consiste l\'étape essentielle appelée "Trempe Chimique" avant chaque dosage de diiode restant ?',
        answer: 'La trempe chimique a pour but de stopper ou d\'inhiber instantanément la réaction de manière quantitative à l\'instant t précis du prélèvement. Ici, on réalise d\'une part une trempe thermique en ajoutant de l\'eau glacée pour geler la cinétique, et d\'autre part une trempe chimique en ajoutant du bicarbonate de sodium (NaHCO3) qui neutralise quantitativement le catalyseur acide H+ indispensable à la réaction.'
      },
      {
        question: 'Comment déduit-on graphiquement que la réaction est d\'ordre 0 par rapport au diiode à partir de la courbe d\'absorbance ?',
        answer: 'L\'absorbance A de la solution est directement proportionnelle à la concentration en diiode [I2] par la loi de Beer-Lambert. La courbe A = f(t) est une droite descendante de pente constante négative. Comme la vitesse de réaction v (dérivée de la courbe) est constante et ne dépend pas de la concentration restante en diiode, on en déduit que l\'ordre partiel r est égal à 0.'
      }
    ],
    conclusionTemplate: 'En conclusion, l\'étude cinétique de l\'iodation de la propanone a permis de caractériser une loi de vitesse de réaction de type d\'ordre global égal à 2. Les ordres partiels s\'établissent à r=0 pour le diiode, p=1 pour l\'acétone et q=1 pour le catalyseur. Les consignes de sécurité anti-flammes ont été pleinement respectées.'
  },
  '7': {
    tpId: '7',
    generalTitle: 'Compte-Rendu Modèle : Préparation du Sulfate de Cuivre Pentahydraté',
    introduction: 'Réaliser la synthèse minérale quantitative du sulfate de cuivre pentahydraté (CuSO4 . 5H2O) par attaque de l\'oxyde de cuivre (II) solide par une solution chaude diluée d\'acide sulfurique, suivie d\'une étape de cristallisation lente par refroidissement contrôlé.',
    drawingInstructions: [
      'Schématiser le montage de filtration sur papier entonnoir (support, entonnoir, papier plié en cône ou plissé, bécher récupérateur).',
      'Dessiner l\'appareil de filtration sous vide sur entonnoir Büchner (fiole à vide reliée à la trompe à eau) favorisant l\'essorage rapide des cristaux obtenus.'
    ],
    materialsAndReactants: [
      { name: 'Oxyde de Cuivre (II) (CuO)', role: 'Solide noir réactif limitant, introduit en léger excès pour s\'assurer de la disparition totale de l\'acide.', safety: 'Nocif par ingestion.' },
      { name: 'Acide Sulfurique dilué (H2SO4)', role: 'Solvant d\'attaque acide permettant l\'apport d\'ions H+ et SO4^2- pour la réaction.', safety: 'Corrosif (H314). Provoque des brûlures profondes.' },
      { name: 'Sulfate de Cuivre Pentahydraté', role: 'Produit bleu pur sous forme de beaux cristaux en forme de losanges.', safety: 'Toxique pour l\'environnement et irritant.' }
    ],
    equationsAndCalculations: [
      {
        title: 'Équation de la Synthèse Minérale d\'Attaque Acide',
        formula: 'CuO(s) + 2 H⁺(aq) + SO4²⁻(aq) ⟶ [Cu(H2O)6]²⁺(aq) + SO4²⁻(aq)',
        explanation: 'L\'oxyde de cuivre noir réagit avec l\'acide sulfurique pour former des ions cuivre (II) hydratés de couleur bleu azur.',
        example: 'La solution verte/noire initiale s\'éclaircit de manière spectaculaire pour devenir d\'un bleu de cobalt limpide.'
      },
      {
        title: 'Calcul de la Masse Théorique Attendue (m_theo)',
        formula: 'm_theo = n_limitant_acide × M_CuSO4_5H2O',
        explanation: 'Masse maximale de sel hydraté cristallisé que l\'on peut obtenir si le rendement de chauffage et de précipitation est total.',
        example: 'Pour 30 mL d\'acide à 2,0 mol/L, la quantité max d\'acide est n = 0,06 mol. La stœchiométrie limite donne n_sel = 0,03 mol. M(sel) = 249,7 g/mol, soit m_théo = 0,03 × 249,7 = 7,49 g.'
      }
    ],
    expectedObservations: 'L\'oxyde de cuivre est une poudre noire dense insoluble à froid. Dès le début du chauffage doux sous agitation dans l\'acide sulfurique, le noir disparaît progressivement et la solution prend une teinte verte puis virant au bleu cyan limpide magnifique. Après filtration du CuO en excès à chaud et refroidissement lent du filtrat dans un cristallisoir, de grands cristaux bleus translucides réguliers apparaissent en forme d\'aiguilles.',
    expectedModelResults: 'Masse théorique de cristaux attendue : environ 7,5 g. Le rendement de cristallisation final après filtration sous vide s\'établit logiquement entre 65% et 80% (une fraction du sulfate restant solubilisée à froid dans l\'eau résiduelle).',
    commonErrors: [
      'Chauffage excessif jusqu\'à ébullition vigoureuse provoquant des projections toxiques d\'acide sulfurique concentré en fin d\'évaporation.',
      'Lavage à chaud des cristaux bleus sur le Büchner avec de l\'eau tiède qui dissout instantanément tout le produit synthétisé (toujours rincer avec de l\'eau distillée glacée ou de l\'éthanol à froid).',
      'Filtration hâtive avant refroidissement complet du cristallisoir, ce qui laisse une grande part de sel dissous dans la solution.'
    ],
    modelQuestions: [
      {
        question: 'Pourquoi l\'oxyde de cuivre (II) noir CuO est-il introduit en léger excès par rapport à l\'acide sulfurique ?',
        answer: 'L\'oxyde de cuivre CuO est introduit en léger excès pour garantir que tous les ions H3O+ corrosifs de l\'acide sulfurique ont réagi et ont été consommés. Comme de l\'acide non réagi serait dangereux à évaporer et brûlerait nos cristaux bleus lors du séchage, l\'excès de CuO insoluble est tout simplement éliminé par une étape ultra-simple de filtration sur papier.'
      },
      {
        question: 'Pourquoi rince-t-on les cristaux lavés sur le Büchner uniquement avec de l\'eau glacée ou de l\'éthanol ?',
        answer: 'Le sulfate de cuivre pentahydraté possède une solubilité extrêmement élevée dans l\'eau à température ambiante ou chaude. Si l\'on rinçait à l\'eau tiède, tous nos cristaux synthétisés seraient dissous et perdus dans la fiole à vide. L\'eau glacée ou l\'éthanol (dans lequel le sulfate est insoluble) lavent les impuretés superficielles sans détruire le produit.'
      }
    ],
    conclusionTemplate: 'En conclusion, nous avons synthétisé [Entrer masse] g de sulfate de cuivre avec un rendement satisfaisant de [Entrer rendement]%. Les précautions quant à la toxicité environnementale aquatique ont été strictement résolues par une collecte rigoureuse des filtrats.'
  },
  '8': {
    tpId: '8',
    generalTitle: 'Compte-Rendu Modèle : Complexométrie (Dureté de l\'Eau)',
    introduction: 'Déterminer la dureté d\'une eau (concentration en ions Ca2+ et Mg2+) par titrage complexométrique en utilisant une solution d\'acide éthylènediatétradétraacétique (EDTA) de concentration connue en présence de Noir Ériochrome T (NET) à pH maintenu constant à 10 par une solution tampon ammoniacale.',
    drawingInstructions: [
      'Schématiser le montage de dosage : support, burette graduée contenant la solution d\'EDTA de concentration 0,01 mol/L.',
      'Dessiner l\'erlenmeyer contenant 10,0 mL d\'eau d\'échantillon, 5 mL de solution tampon pH=10 ammoniaquée, et la pincée de NET visible de couleur rouge-violacée.'
    ],
    materialsAndReactants: [
      { name: 'EDTA (Sel Disodique)', role: 'Ligand hexadenté formant un complexe hautement stable et chélatant de stœchiométrie 1:1 avec les ions d\'intérêt.', safety: 'Substance irritante pour les yeux.' },
      { name: 'Noir Ériochrome T (NET)', role: 'Indicateur métallochromique dont la couleur libre (bleu) diffère de la forme complexée avec le magnésium (rose).', safety: 'Colorant organique à manipuler sous sa forme diluée.' },
      { name: 'Solution Tampon pH 10', role: 'Mélange d\'ammoniac et de chlorure d\'ammonium indispensable pour bloquer le pH à 10.', safety: 'Odeur d\'ammoniac extrêmement forte et irritante pour les poumons. Gants et hotte nécessaires.' }
    ],
    equationsAndCalculations: [
      {
        title: 'Équation Fondamentale du Titrage Complexométrique',
        formula: 'Ca²⁺(aq) + Y⁴⁻(aq) ⟶ [CaY]²⁻(aq)',
        explanation: 'L\'EDTA (noté Y4-) forme un complexe chélaté unitaire extrêmement stable et incolore avec l\'ion calcium.',
        example: 'La réaction est quantitative et extrêmement rapide, rendant le dosage stœchiométrique très précis.'
      },
      {
        title: 'Détermination du Titre Hydrotimétrique (TH)',
        formula: 'Titre Hydrotimétrique (°f) = [Ca²⁺ + Mg²⁺] (mmol/L) × 10',
        explanation: 'En France, un degré français de dureté (°f) équivaut à une concentration en ions de 0,1 mmol/L.',
        example: 'Pour un volume équivalent mesuré Ve = 15,2 mL de solution d\'EDTA à C = 0,01 mol/L sur un prélèvement d\'eau Va = 100 mL : [Ca2+] = (0,01 × 15,2) / 100 = 1,52 mmol/L. TH = 1,52 × 10 = 15,2 °f (Eau moyennement dure).'
      }
    ],
    expectedObservations: 'À l\'introduction initiale de l\'échantillon d\'eau et du tampon avec le NET, la solution est rose fuchsia violacé stable. Durant le versage de l\'EDTA, la teinte s\'éclaircit de manière lente. À l\'équivalence exacte, l\'ajout d\'une seule goutte provoque un changement de coloration instantané et spectaculaire vers le bleu ciel franc métallique durable sans reflet violacé.',
    expectedModelResults: 'Le volume équivalent Ve théorique varie grandement selon le TH de l\'eau minérale choisie de départ (par exemple, la Contrex ou Vittel donne un Ve élevé, l\'eau du robinet un Ve plus modéré). Le virage doit être caractérisé à pH = 10,0 net.',
    commonErrors: [
      'Oubli de verser la solution tampon ammoniaquée pH 10 qui bloque le pH, ce qui empêche le virage de se produire (ou donne un virage incomplet à mauvaise équivalence car les complexes ne sont plus stables sous pH acide).',
      'Lecture erronée du volume de la burette due aux conditions d\'agitation trop vigoureuse.',
      'Surdosage par incapacité à distinguer la disparition complète de la nuance violette.'
    ],
    modelQuestions: [
      {
        question: 'Pourquoi la solution tampon de pH = 10 est-elle absolument essentielle à la réussite de ce titrage ?',
        answer: 'Le pH influe directement sur deux critères fondamentaux : la forme prédominante de l\'EDTA et la stabilité des complexes. À pH < 9, l\'EDTA est protoné sous des formes moins basiques et se complexe mal avec les ions alcalino-terreux. À pH > 11, le magnésium précipite sous forme d\'hydroxyde de magnésium Mg(OH)2 insoluble. Le pH 10 ammoniaqué constitue le compromis optimal pour capter la somme totale Ca2+ et Mg2+.'
      },
      {
        question: 'Détailler les étapes physico-chimiques provoquant le virage de couleur au point d\'équivalence ?',
        answer: 'Au début, les ions Ca2+ réagissent avec l\'EDTA. Parallèlement, une petite fraction d\'ions Mg2+ est piégée par l\'indicateur NET sous forme d\'ion complexe [Mg-NET]- de couleur rose. Lorsque tous les ions Ca2+ et Mg2+ libres ont été consommés par l\'EDTA, l\'EDTA déloge le Mg2+ complexé par le NET grâce à sa constante de stabilité supérieure. Le NET libéré se décolore et retrouve sa coloration fondamentale bleue à pH 10, marquant l\'équivalence.'
      }
    ],
    conclusionTemplate: 'En conclusion, nous avons déterminé la dureté hydrotimétrique de l\'eau analysée à TH = [Entrer] °f. Cette valeur classe l\'échantillon dans la catégorie des eaux [Douces / Moyennement dures / Très dures]. La précision a validé le principe d\'utilisation des indicateurs métallochromiques.'
  },
  '9': {
    tpId: '9',
    generalTitle: 'Compte-Rendu Modèle : Synthèse de l\'Aspirine',
    introduction: 'Réaliser la synthèse organique quantitative de l\'acide acétylsalicylique (aspirine commerciale) par une réaction d\'acétylation du groupe hydroxyle de l\'acide salicylique par l\'anhydride acétique catalysée par l\'acide sulfurique, suivie d\'une étape de purification par cristallisation et caractérisation de sa pureté sur banc Köfler.',
    drawingInstructions: [
      'Schématiser le montage de chauffage au bain-marie à 60°C : erlenmeyer ou ballon contenant le mélange, immergé dans un cristallisoir d\'eau chaude sur plaque chauffante.',
      'Flécher le thermomètre inséré dans l\'eau.',
      'Ajouter le schéma de la filtration sous vide Büchner avec les cristaux d\'aspirine.'
    ],
    materialsAndReactants: [
      { name: 'Acide Salicylique', role: 'Phénol organique réactif limitant de la synthèse.', safety: 'Nocif par ingestion et suspecté toxique pour la reproduction (H302, H361d). Porter des gants.' },
      { name: 'Anhydride Acétique', role: 'Agent d\'acétylation liquide introduit en large excès pour s\'assurer de l\'avancement total.', safety: 'Liquide très corrosif et volatile (H314). Vapeurs fortement irritantes et lacrymogènes. Utiliser obligatoirement sous hotte active.' },
      { name: 'Acide Sulfurique (H2SO4)', role: 'Catalyseur permettant d\'activer la protonation de l\'anhydride acétique.', safety: 'Extrêmement corrosif, risque de brûlures sérieuses.' }
    ],
    equationsAndCalculations: [
      {
        title: 'Équation Chimique de l\'Acétylation Totale',
        formula: '$C_{7}H_{6}O_{3}(s) + C_{4}H_{6}O_{3}(l) \\longrightarrow C_{9}H_{8}O_{4}(s) + CH_{3}COOH(aq)$',
        explanation: 'Réaction totale et irréversible qui produit l\'acide acétylsalicylique solide blanc et de l\'acide acétique comme sous-produit.',
        example: 'L\'utilisation de l\'anhydride acétique à la place de l\'acide acétique permet d\'obtenir un avancement total très rapide sans équilibre thermodynamique limitant.'
      },
      {
        title: 'Calcul de la Masse Théorique Attendue d\'Aspirine',
        formula: '$m_{théo} = n_{acide~salicylique} \\times M_{aspirine}$',
        explanation: 'Masse théorique maximale d\'aspirine cristallisée attendue en cas d\'avancement de 100%.',
        example: 'Pour 2,0 g d\'acide salicylique (M = 138,1 g/mol, soit n = 0,0145 mol) et sachant que M(aspirine) = 180,2 g/mol : m_théo = 0,0145 × 180,2 = 2,61 g d\'aspirine.'
      }
    ],
    expectedObservations: 'À l\'introduction des réactifs dans l\'erlenmeyer parfaitement sec, l\'acide salicylique forme une suspension blanche insoluble. Dès l\'ajout des gouttes d\'acide sulfurique et du chauffage doux, l\'acide salicylique se dissout entièrement pour livrer une solution limpide incolore. Lors de l\'ajout d\'eau froide glacée, une réaction d\'hydrolyse vigoureuse mais sûre se produit, et de gros cristaux d\'aspirine blanche précipitent de manière généreuse en refroidissant dans la glace.',
    expectedModelResults: 'Masse d\'aspirine brute obtenue : entre 2,1 g et 2,4 g. Le rendement modèle brut se situe souvent entre 80% et 90%. Après recristallisation, le point de fusion attendu au banc Köfler s\'établit à 135°C +/- 1°C.',
    commonErrors: [
      'Présence d\'eau dans le matériel ou l\'erlenmeyer initial, provoquant l\'hydrolyse prématurée de l\'anhydride acétique en acide acétique et anéantissant l\'avancement de la synthèse.',
      'Lavage hâtif des cristaux avec de l\'eau distillée à température ambiante qui dissout une part importante de l\'aspirine (l\'aspirine est soluble dans l\'eau chaude, n\'utiliser que de l\'eau glacée pour le rinçage).',
      'Mesure du point de fusion sur un échantillon d\'aspirine encore humide d\'eau glacée.'
    ],
    modelQuestions: [
      {
        question: 'Pourquoi utilise-t-on l\'anhydride acétique plutôt que l\'acide acétique pour synthétiser l\'aspirine en TP ?',
        answer: 'L\'utilisation d\'un anhydride d\'acide à la place d\'un acide carboxylique permet d\'éviter la barrière thermodynamique de la réaction réversible d\'estérification (qui se limiterait à un rendement faible de ~60%). L\'acétylation par l\'anhydride acétique est une réaction totale, extrêmement rapide sous chauffage doux et totalement non réversible, ce qui donne d\'excellents rendements.'
      },
      {
        question: 'Pourquoi ajoute-t-on lentement de l\'eau distillée glacée en fin de chauffage dans le ballon ?',
        answer: 'L\'ajout d\'eau distillée glacée en excès sert à neutraliser de manière contrôlée l\'excédent d\'anhydride acétique qui n\'a pas réagi. L\'anhydride est hydrolysé de manière violente mais catalysée en deux molécules d\'acide acétique solubles. De plus, l\'apport de solvant aqueux froid abaisse radicalement la solubilité de l\'aspirine qui est très hydrophobe à froid, forçant son dépôt sous forme de précipité solide cristallin limpide.'
      }
    ],
    conclusionTemplate: 'En conclusion, nous avons complété la synthèse de l\'aspirine avec une masse de [Entrer] g de solide blanc purifié (rendement [Entrer]%). La température de fusion au banc Köfler a révélé un point de fusion de [Entrer]°C qui confirme la bonne pureté du produit.'
  },
  '10': {
    tpId: '10',
    generalTitle: 'Compte-Rendu : Chromatographie sur Couche Mince (CCM)',
    introduction: 'Mettre en œuvre la technique analytique de micro-séparation par chromatographie sur couche mince (CCM) pour analyser la composition de divers échantillons organiques, de principes actifs de médicaments ou pour suivre l\'avancement d\'une synthèse organique.',
    drawingInstructions: [
      'Dessiner de manière rectiligne la plaque chromatographique avec la ligne de dépôts tracée au crayon de papier à 1 cm du bas.',
      'Représenter la ligne de front atteinte par l\'éluant en haut de la plaque.',
      'Placer les taches témoins et échantillons légendées séparément (par exemple A : Aspirine, S : Acide salicylique, E : Échantillon purifié).'
    ],
    materialsAndReactants: [
      { name: 'Plaque de Silice sur Support', role: 'Phase stationnaire polaire adsorbante sur laquelle migrent les espèces.', safety: 'Aucune dangerosité particulière. Manipuler uniquement par les bords.' },
      { name: 'Éluant Organique', role: 'Phase mobile qui emporte les substances par capillarité selon leur solubilité respective.', safety: 'Souvent inflammable et volatil. Maintenir la cuve hermétiquement bouchée.' }
    ],
    equationsAndCalculations: [
      {
        title: 'Formule Fondamentale du Rapport Frontal (Rf)',
        formula: 'Rf = d / D',
        explanation: 'Grandeur physique caractéristique d\'une espèce chimique dans un couple (phase fixe, éluant) donné.',
        example: 'Si la tache migre d\'une distance d = 3,5 cm par rapport à la ligne de dépôt, et que l\'éluant a migré d\'une distance totale D = 7,0 cm : Rf = 3,5 / 7,0 = 0,50 (sans unité).'
      }
    ],
    expectedObservations: 'La cuve de migration doit être saturée en vapeurs de solvant. Lors de l\'introduction de la plaque, l\'éluant remonte rapidement de manière régulière par capillarité. Après séchage et révélation sous lampe UV (254 nm), les taches invisibles de départ s\'allument sous forme d\'ombres sombres violettes circulaires nettes et contrastées.',
    expectedModelResults: 'Le rapport frontal Rf de l\'aspirine est généralement plus élevé que celui de l\'acide salicylique de départ en raison de sa moindre polarité avec la silice adsorbante. L\'analyse de la plaque permet d\'établir le diagnostic de pureté.',
    commonErrors: [
      'Avoir tracé la ligne de dépôts au stylo à bille plutôt qu\'au crayon de papier (l\'encre du stylo migre avec l\'éluant et détruit l\'analyse).',
      'Concentration excessive ou taches trop grosses lors des dépôts capillaires, provoquant des "traînées" verticales de silice saturée impossibles à identifier.',
      'Niveau d\'éluant trop haut dans le fond de la cuve (au-dessus de la ligne de dépôt), provoquant la dissolution immédiate des échantillons directement dans le bain de solvant.'
    ],
    modelQuestions: [
      {
        question: 'Détailler les forces physiques régissant la migration différentielle des molécules sur la plaque adsorbante ?',
        answer: 'La migration dépend de la compétition permanente entre l\'adsorption sur la phase stationnaire et la solubilité dans la phase mobile (l\'éluant). La silice de la plaque est extrêmement polaire et retient fortement par liaisons hydrogène les molécules les plus polaires (migration lente, faible Rf). Les molécules moins polaires restent en solution dans l\'éluant non polaire et migrent plus haut par entraînement capillaire (migration rapide, Rf élevé).'
      },
      {
        question: 'Pourquoi sature-t-on la cuve fermée hermétiquement de vapeurs d\'éluant avant de réaliser la migration ?',
        answer: 'La saturation de la cuve est fondamentale pour éviter l\'évaporation continue de l\'éluant volatile à la surface de la plaque de silice pendant la remontée capillaire. Sans cette atmosphère saturée, le front de l\'éluant ralentirait anormalement, la ligne de front serait déformée et cela fausserait de manière significative la reproductibilité des calculs de rapports frontaux Rf.'
      }
    ],
    conclusionTemplate: 'En conclusion, la chromatographie sur couche mince a permis de vérifier quantitativement le succès de la séparation avec des rapports frontaux Rf de [Entrer Rf1] et [Entrer Rf2] respectivement. Elle s\'avère être une technique analytique fiable, rapide et peu coûteuse.'
  },
  '11': {
    tpId: '11',
    generalTitle: 'Compte-Rendu : Synthèse d\'un Savon (Saponification)',
    introduction: 'Réaliser la synthèse organique d\'un savon par réaction d\'hydrolyse basique à chaud d\'un corps gras (triester ou triglycéride d\'huile végétale) par une solution d\'hydroxyde de sodium concentrée en présence d\'éthanol, suivie d\'un relargage.',
    drawingInstructions: [
      'Représenter le montage d\'agitation thermique à reflux : ballon, chauffage, réfrigérant à eau vertical.',
      'Dessiner un schéma simplifié du sel inséré pour le relargage cristallin.'
    ],
    materialsAndReactants: [
      { name: 'Huile Végétale (Huile d\'Olive)', role: 'Source de triglycérides (triesters d\'acide oléique essentiellement) servant de corps gras de départ.', safety: 'Aucun danger.' },
      { name: 'Soude Concentrée (NaOH)', role: 'Réactif basique fournissant les ions hydroxyde OH- responsables de la coupure de la fonction ester.', safety: 'Extrêmement corrosif pour les yeux, porter obligatoirement des gants et lunettes étanches.' },
      { name: 'Éthanol Absolu', role: 'Utilisé comme cosolvant pour émulsionner l\'huile hydrophobe et la soude hydrosoluble.', safety: 'Très inflammable. Travailler loin de toute flamme ou arc électrique.' }
    ],
    equationsAndCalculations: [
      {
        title: 'Équation Bilan de la Saponification',
        formula: 'Triglycéride(l) + 3 NaOH(aq) ⟶ Glycérol(aq) + 3 Savon(s)',
        explanation: 'Réaction totale mais lente à froid de rupture des trois liaisons ester d\'une molécule de gras par les bases solides.',
        example: 'Le stéarate de sodium ou l\'oléate de sodium constitue la molécule active tensio-active du savon.'
      },
      {
        title: 'Formule du Rendement de Saponification',
        formula: 'R (%) = (m_savon_obtenu / m_theorique_max) × 100',
        explanation: 'Rapport quantitatif permettant de vérifier l\'efficacité du relargage dans l\'eau salée.',
        example: 'Pour une masse théorique maximale attendue calculée par stœchiométrie à 12,0 g de savon sec, si on obtient expérimentalement 9,6 g : Rendement = (9,6 / 12,0) × 100 = 80,0%.'
      }
    ],
    expectedObservations: 'Au démarrage du chauffage, l\'huile et la soude forment un système biphasique hétérogène insoluble. Dès l\'échauffement sous reflux avec l\'éthanol intermédiaire, le mélange s\'homogénéise pour donner une émulsion visqueuse jaunâtre et mousseuse. Après introduction de cette émulsion visqueuse dans une grande quantité d\'eau saturée de sel à froid (bain de glace), le savon brut se rassemble instantanément sous forme d\'un précipité solide crémeux blanchâtre abondant.',
    expectedModelResults: 'Le rendement modèle brut de fabrication d\'un savon s\'établit logiquement entre 70% et 85% selon le taux d\'essorage et la température de séchage adoptée.',
    commonErrors: [
      'Chauffage insuffisant ou trop court (la saponification requiert au moins 30 minutes de maintien d\'ébullition sous reflux pour atteindre un avancement satisfaisant et consommer les triglycérides).',
      'Concentration de soude insuffisante due à des rinçages non rigoureux.',
      'Séchage non conforme laissant le savon pâteux et gonflé d\'eau résiduelle.'
    ],
    modelQuestions: [
      {
        question: 'Quel est l\'intérêt fondamental d\'ajouter de l\'éthanol au milieu réactionnel initial de saponification ?',
        answer: 'L\'huile végétale hydrophobe et la solution de soude très hydrophile possèdent une solubilité mutuelle nulle, ce qui limite considérablement la vitesse de réaction en raison d\'une surface de contact trop faible. L\'éthanol sert de cosolvant intermédiaire : il dissout à la fois l\'huile et la soude aqueuse, créant une phase homogène qui accélère considérablement la cinétique.'
      },
      {
        question: 'Pourquoi le savon précipite-t-il spécifiquement lors du versement dans l\'eau salée saturée ?',
        answer: 'Le savon est un sel organique amphiphile (carboxylate de sodium). Dans l\'eau salée saturée de sel (NaCl), la concentration extrême en ions Na+ déplace l\'équilibre de dissolution par effet d\'ion commun. De plus, la force ionique élevée de l\'eau disturbe la solubilisation des molécules de savon qui s\'agrègent pour précipiter instantanément (relargage), tandis que le glycérol très soluble reste en solution.'
      }
    ],
    conclusionTemplate: 'En conclusion, nous avons synthétisé de manière traditionnelle un savon à partir d\'huile d\'olive avec un excellent rendement de [Entrer]% après cristallisation saline. Les tests d\'odeur et d\'onctuosité confirment les propriétés tensio-actives attendues.'
  },
  '12': {
    tpId: '12',
    generalTitle: 'Compte-Rendu : Conductimétrie Étalonnage',
    introduction: 'Déterminer la concentration inconnue d\'une solution de chlorure de sodium (NaCl) commercial en établissant une courbe de conductivité en fonction de la concentration de solutions de référence connues, conformément à la loi de Kohlrausch.',
    drawingInstructions: [
      'Tracer le graphe de conductivité σ (en mS/cm ou µS/cm) en fonction de la concentration molaire C de sel chlorure.',
      'Indiquer la position de la cellule conductimétrique composée de deux plaques parallèles immergées dans le bécher contenant le réactif.'
    ],
    materialsAndReactants: [
      { name: 'Chlorure de Sodium (NaCl)', role: 'Sel servant de référence pour étalonner la constante de cellule.', safety: 'Substance inoffensive pour la santé.' },
      { name: 'Conductimètre portable', role: 'Appareil de mesure précis mesurant la conductance G de la solution.', safety: 'Éviter les torsions du câble de la sonde.' }
    ],
    equationsAndCalculations: [
      {
        title: 'Loi de Kohlrausch pour les Solutions Diluées',
        formula: 'Conductivité σ = λ_Na+ × [Na+] + λ_Cl- × [Cl-] = k × C',
        explanation: 'Dans de faibles concentrations, la conductivité est rigoureusement proportionnelle à la concentration totale de sel.',
        example: 'Pour une fiole à C = 0,005 mol/L de conductivité σ = 0,63 mS/cm, la constante k de proportionnalité vaut k = 126 mS.L/mol.'
      }
    ],
    expectedObservations: 'La conductivité mesurée monte de manière parfaitement régulière et croissante lors du passage successif des solutions filles de la plus diluée à la plus concentrée.',
    expectedModelResults: 'Le graphe d\'étalonnage σ = f(C) est une droite rectiligne parfaite passant par l\'origine avec un coefficient r² s\'établissant au-dessus de 0,999. On y déduit simplement Cx de l\'absorbance ou conductivité mesurée de l\'inconnu.',
    commonErrors: [
      'Cellule mal nettoyée, polluée de dépôts salins résiduels antérieurs (rinçage obligatoire à l\'eau distillée entre chaque mesure de fiole).',
      'Présence de micro-bulles d\'air piégées entre les électrodes de la cellule de conductimétrie, ce qui diminue drastiquement la surface utile des plaques.',
      'Sonde non immergée sur toute sa surface utile.'
    ],
    modelQuestions: [
      {
        question: 'Pourquoi la loi de Kohlrausch n\'est-elle plus vérifiée pour des concentrations trop élevées en sel ?',
        answer: 'L\'activité des ions l\'emporte sur leur concentration réelle à de fortes concentrations. Les ions trop proches s\'attirent mutuellement et se freinent les uns les autres dans leur migration sous l\'effet du champ électrique (effet d\'atmosphère ionique). La courbe de conductivité s\'affaisse alors et ne suit plus une droite linéaire proportionnelle.'
      },
      {
        question: 'Comment influe la température de la pièce sur la conductivité mesurée de la solution ?',
        answer: 'La conductivité augmente de manière notable avec la température (environ 2% par degré Celsius). En effet, l\'élévation de température diminue la viscosité de l\'eau, ce qui accroît la mobilité ionique et accélère leur déplacement. C\'est pourquoi l\'appareil doit être thermostaté ou compensé en température.'
      }
    ],
    conclusionTemplate: 'En conclusion, l\'étalonnage conductimétrique a validé la loi de Kohlrausch avec un r² de [Entrer r²]. La concentration saline de l\'inconnu s\'établit de manière fiable à Cx = [Entrer] mol/L.'
  },
  '13': {
    tpId: '13',
    generalTitle: 'Compte-Rendu : Les Piles Électrochimiques',
    introduction: 'Étudier la conversion d\'énergie chimique en électricité en concevant et caractérisant une pile de type Daniell (Zinc/Cuivre), mesurer et interpréter sa force électromotrice de repos en fonction de la concentration molaire pour valider les règles de thermodynamique.',
    drawingInstructions: [
      'Schématiser de manière de deux béchers côte à côte : à gauche, la lame de Zinc dans la solution de sulfate de zinc, à droite, la plaque de Cuivre dans la solution de sulfate de cuivre.',
      'Flécher le pont salin reliant les deux solutions.',
      'Inclure le voltmètre connecté en série.'
    ],
    materialsAndReactants: [
      { name: 'Électrode de Cuivre (Cu) et Zinc (Zn)', role: 'Demi-piles d\'oxydoréduction agissant comme capteurs électroniques métalliques.', safety: 'Substances métalliques inoffensives.' },
      { name: 'Pont Salin (Nitrure de Potassium ou Gel)', role: 'Ferme le circuit de courant et assure l\'équilibrage des charges de la pile.', safety: 'Aucun danger.' }
    ],
    equationsAndCalculations: [
      {
        title: 'Demi-Réactions Chimiques aux Électrodes',
        formula: 'Anode (-) : Zn(s) ⇄ Zn²⁺(aq) + 2e⁻  ∥  Cathode (+) : Cu²⁺(aq) + 2e⁻ ⇄ Cu(s)',
        explanation: 'Oxydation à l\'anode de zinc libérant des électrons, et réduction à la cathode réceptrice de cuivre.',
        example: 'Le zinc se consomme tandis qu\'un dépôt brillant de cuivre se forme sur l\'électrode de cuivre.'
      },
      {
        title: 'Force Électromotrice standard par différence de potentiel',
        formula: 'E_standard_pile = E0(Cu²⁺/Cu) - E0(Zn²⁺/Zn)',
        explanation: 'Différence théorique de potentiel mesurée au repos par un voltmètre de haute impédance à concentration de base.',
        example: 'Pour E0(Cu2+/Cu) = 0,34 V et E0(Zn2+/Zn) = -0,76 V : Epile = 0,34 - (-0,76) = 1,10 V.'
      }
    ],
    expectedObservations: 'Le voltmètre branché avec la borne COM de l\'appareil branchée sur le zinc et la borne V branchée sur le cuivre affiche une valeur positive proche de 1,1 V. Dès que la pile débite sur une lampe de test, l\'électrode de Zinc s\'érode lentement tandis que l\'électrode de Cuivre se cuivrenette brillante.',
    expectedModelResults: 'La force électromotrice (F.E.M.) initiale lue au voltmètre de repos doit s\'établir entre 1,05 V et 1,12 V selon l\'usure et la propreté décapée des lames métalliques de départ.',
    commonErrors: [
      'Pont salin sec ou mal inséré, coupant instantanément la circulation ionique interne et donnant une F.E.M. fluctuante ou stérile de 0,0 V.',
      'Sondes de voltmètre inversées (le voltmètre affiche une valeur négative (COM = pôle positif)).',
      'Plaques de métal polluées de couches protectrices d\'oxydes (toujours frotter énergiquement les métaux au papier abrasif avant usage).'
    ],
    modelQuestions: [
      {
        question: 'Quel est le rôle double et fondamental joué par le Pont Salin au sein de la pile électrochimique ?',
        answer: 'Le pont salin (contenant par exemple K+ et NO3-) possède deux fonctions indispensables : il ferme physiquement le circuit électrique interne en permettant la conduction par migration ionique, et il assure la neutralité électrique constante des deux compartiments de demi-piles en injectant des cations dans le bécher qui consomme les charges positives et des anions là où apparaissent les ions Zn2+.'
      },
      {
        question: 'Expliquer l\'évolution de la force électromotrice de la pile au cours de son fonctionnement et à son épuisement ?',
        answer: 'Au repos et à l\'équilibre de départ, la force électromotrice est maximale. Dès que le circuit se referme, la pile débite un courant spontané. Au cours de la décharge, la concentration en ions Zn2+ monte et celle en Cu2+ s\'effondre, de sorte que la D.D.P. diminue progressivement par la loi de Nernst. À l\'épuisement, la pile atteint l\'équilibre thermodynamique stable où la tension s\'effondre à 0,0 V.'
      }
    ],
    conclusionTemplate: 'En conclusion, nous avons construit une pile Daniell d\'une tension de repos mesurée de [Entrer] V, confirmant la validité des potentiels standards d\'oxydoréduction. Le rôle de la neutralité électrique assurée par le pont salin a été rigoureusement analysé.'
  },
  '14': {
    tpId: '14',
    generalTitle: 'Compte-Rendu : Méthode de Mohr (Précipitation)',
    introduction: 'Déterminer la concentration en ions chlorure (Cl-) d\'un échantillon liquide par un titrage par précipitation directe en utilisant une solution d\'ions nitrate d\'argent (Ag+) calibrée de concentration connue en présence d\'ions chromate de potassium agissant comme indicateur coloré spécifique de fin de réaction.',
    drawingInstructions: [
      'Dessiner l\'appareil de burette supportant la solution de nitrate d\'argent.',
      'Dessiner le bécher d\'erlenmeyer contenant les ions chlorure et les gouttes jaunes de chromate de potassium.'
    ],
    materialsAndReactants: [
      { name: 'Nitrate d\'Argent (AgNO3)', role: 'Solution titrante fournissant les ions Ag+ précipitants.', safety: 'Photosensible. Tache la peau en noir. Très toxique pour le milieu aquatique.' },
      { name: 'Chromate de Potassium (K2CrO4)', role: 'Indicateur coloré soluble formant un précipité rouge-brique stable en fin de réaction.', safety: 'Substance CMR toxique cancérogène majeure (H350i). Porter impérativement des doubles gants sous hotte.' }
    ],
    equationsAndCalculations: [
      {
        title: 'Équation du dosage par précipitation',
        formula: 'Ag⁺(aq) + Cl⁻(aq) ⟶ AgCl (s)',
        explanation: 'Formation immédiate d\'un précipité blanc dense peu soluble de chlorure d\'argent devenant grisâtre sous la lumière.',
        example: 'Cette réaction consomme tous les ions chlorures libres jusqu\'à atteindre le point d\'équivalence.'
      },
      {
        title: 'Formule Stœchiométrique de Mohr',
        formula: 'Ca × Va = C_Ag × Ve  ⟶  Ca = (C_Ag × Ve) / Va',
        explanation: 'À l\'équivalence stœchiométrique du dosage par Mohr, la quantité d\'ions Argent ajoutés est exactement égale à la quantité d\'ions Chlorures consommés.',
        example: 'Pour une solution de nitrate d\'argent à 0,05 mol/L, sur un prélèvement d\'eau saline de 10,0 mL, avec un volume équivalent mesuré Ve = 8,4 mL : Concentration [Cl-] = (0,05 × 8,4) / 10,0 = 0,042 mol/L.'
      }
    ],
    expectedObservations: 'Dès les premiers ajouts de nitrate d\'argent dans la solution jaune de départ, un précipité laiteux blanc floconneux de chlorure d\'argent (AgCl) apparaît et persiste immédiatement sous agitation. À l\'équivalence exacte, l\'excédent d\'ions Ag+ versé réagit avec l\'indicateur chromate de potassium pour donner un solide rouge-brique de chromate d\'argent persistant, modifiant brusquement la couleur globale de la solution vers l\'orangé/brun de brique.',
    expectedModelResults: 'Le volume équivalent Ve attendu fluctue entre 6,0 mL et 10,0 mL selon la concentration de l\'échantillon d\'eau de robinet ou d\'eau physiologique titré.',
    commonErrors: [
      'Erreur de pH du milieu réactionnel (la méthode de Mohr nécessite impérativement un pH neutre compris entre 6,5 et 10,0). Si le pH est trop acide, l\'ion chromate est protoné en dichromate et le virage rouge-brique n\'a plus lieu.',
      'Séchage non conforme et manque d\'agitation vigoureuse, masquant la formation hâtive du précipité d\'argent métallique grisâtre.',
      'Incapacité à identifier le premier changement de nuance orange pâle initial.'
    ],
    modelQuestions: [
      {
        question: 'Pourquoi le contrôle rigoureux du pH de la solution de titrage est-il de première importance pour l\'analyse par Mohr ?',
        answer: 'Le pH influe directement sur l\'indicateur de fin de titrage. À pH trop acide (pH < 6,5), les ions chromates insolubles s\'hydrolysent en ions hydrogénochromates de couleur orange qui ne peuvent plus former le précipité rouge-brique révélateur d\'Ag2CrO4 à l\'équivalence. À pH trop basique (pH > 10,5), les ions argent précipitent spontanément en oxyde d\'argent Ag2O de couleur brune sombre, détruisant tout le dosage.'
      },
      {
        question: 'Pourquoi l\'argent réagit-il d\'abord avec les ions chlorure plutôt qu\'avec les chromates de l\'indicateur coloré ?',
        answer: 'Cette chronologie sélective s\'explique par la loi du produit de solubilité Ks des deux composés d\'argent. Le produit de solubilité du chlorure d\'argent AgCl est nettement inférieur à celui du chromate d\'argent. Ainsi, tant qu\'il reste des ions Cl- libres dans le milieu, tout ion Ag+ introduit est consommé pour précipiter en AgCl blanc. La précipitation d\'Ag2CrO4 ne débute que lorsque la concentration de Cl- est devenue extrêmement négligeable.'
      }
    ],
    conclusionTemplate: 'En conclusion, nous avons dosé avec succès la concentration en ions chlorure d\'un échantillon liquide à Ca = [Entrer] mol/L par le procédé argentométrique de Mohr. La précision a été optimisée par le maintien soigné du pH de la solution.'
  }
};
