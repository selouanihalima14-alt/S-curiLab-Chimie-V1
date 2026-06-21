# Chimie Lab Management - Laravel Backend API

Ce projet est l'API Backend de production pour le système de gestion de laboratoire de chimie du lycée. Il est modélisé et structuré en respectant la Troisième Forme Normale (3NF), l'intégrité référentielle, et la conformité CLP/SGH pour la traçabilité des produits chimiques par QR Code, la gestion des stocks, les alertes en temps réel, et les évaluations pédagogiques (Quiz).

## Fonctionnalités Clés du Backend Laravel

*   **Sécurité et Authentification** : Propulsé par **Laravel Sanctum**. Support des sessions à jeton persistants pour les 4 rôles précis (Administrateur, Enseignant, Étudiant, Technicien).
*   **Intégrité Référentielle 3NF** : Respect de la structure et des types de clés définis dans la modélisation MySQL.
*   **CRUD complets** : Contrôleurs pour toutes les entités (`Produits`, `Fires/Fiches de Sécurité`, `Équipements`, `Séances TPs`, `Quiz`, `Résultats`).
*   **Calculs & Alertes Dynamiques** : Déclenchement automatique d'alertes via des événements et écouteurs d'alertes pour les réactifs proches de l'expiration ou en rupture de stock.
*   **Traçabilité par QR Code** : UUID uniques par flacon permettant un tracking rapide du matériel et des produits.

---

## Structure du Projet Laravel

```text
laravel-backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/
│   │   │       ├── AuthController.php
│   │   │       ├── ProduitChimiqueController.php
│   │   │       ├── FicheDeSecuriteController.php
│   │   │       ├── EquipementController.php
│   │   │       ├── TravauxPratiquesController.php
│   │   │       ├── QuizController.php
│   │   │       └── AlerteController.php
│   │   └── Middleware/
│   └── Models/
│       ├── Utilisateur.php
│       ├── ProduitChimique.php
│       ├── FicheDeSecurite.php
│       ├── EquipementDeLaboratoire.php
│       ├── TravauxPratiques.php
│       ├── QrCodeChimique.php
│       ├── Quiz.php
│       ├── ResultatDeQuiz.php
│       ├── AlerteDeStock.php
│       └── StatistiqueUtilisation.php
├── config/
│   └── database.php
├── database/
│   ├── migrations/
│   │   ├── 2026_06_13_000001_create_utilisateurs_table.php
│   │   ├── 2026_06_13_000002_create_produits_chimiques_table.php
│   │   ├── 2026_06_13_000003_create_fiches_de_securite_table.php
│   │   ├── 2026_06_13_000004_create_equipements_de_laboratoire_table.php
│   │   ├── 2026_06_13_000005_create_travaux_pratiques_table.php
│   │   ├── 2026_06_13_000006_create_materiels_travaux_pratiques_table.php
│   │   ├── 2026_06_13_000007_create_produits_travaux_pratiques_table.php
│   │   ├── 2026_06_13_000008_create_qr_codes_chimiques_table.php
│   │   ├── 2026_06_13_000009_create_quiz_table.php
│   │   ├── 2026_06_13_000010_create_resultats_de_quiz_table.php
│   │   ├── 2026_06_13_000011_create_alertes_de_stock_table.php
│   │   └── 2026_06_13_000012_create_statistiques_utilisation_table.php
│   └── seeders/
│       └── DatabaseSeeder.php
├── routes/
│   └── api.php
└── .env.example
```

---

## Instructions d'Installation & Lancement

### 1. Prérequis
Assurez-vous d'avoir installé sur votre machine s'exécution :
- **PHP 8.2+**
- **Composer** (Gestionnaire de paquets PHP)
- **MySQL 8.0+**

### 2. Initialisation
Placez-vous dans le répertoire du projet backend et exécutez PHP Composer :
```bash
cd laravel-backend
composer install
```

### 3. Configuration de l'environnement
Copiez le fichier d'exemple et configurez vos accès de base de données MySQL :
```bash
cp .env.example .env
```
Éditez ensuite le fichier `.env` avec vos informations MySQL :
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=chimie_lab_db
DB_USERNAME=root
DB_PASSWORD=votre_mot_de_passe_secret
```

### 4. Générer la Clé d'Application & Installer Sanctum
```bash
php artisan key:generate
php artisan sanctum:install
```

### 5. Exécuter les Migrations et Remplir la Base de Données (Seeder)
Cette commande exécute l'ensemble des 12 migrations dans le bon ordre d'intégrité de clés étrangères et peuple les tables avec des données initiales complétées (les 9 produits du SGH, les fiches FDS, les TPs, les matériels et les quiz scientifiques complexes) :
```bash
php artisan migrate --seed
```

### 6. Lancement du Serveur de Développement
Pour écouter sur le port standard et démarrer l'API locale :
```bash
php artisan serve
```
Le serveur sera disponible sur `http://localhost:8000` (ou `http://127.0.0.1:8000`).

---

## Connexion avec le Frontend React (Intégration)

Pour connecter l'application React au backend Laravel, changez l'URL cible de vos requêtes Axios ou Fetch vers `http://localhost:8000/api`.

### Exemple de configuration Axios :
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true // Nécessaire pour les cookies ou l'authentification Sanctum/CORS
});

// Ajouter le token bearer intercepté lors de la connexion
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```
