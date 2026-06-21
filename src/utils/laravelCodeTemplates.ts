export interface LaravelFile {
  name: string;
  path: string;
  code: string;
  language: string;
}

export const LARAVEL_TEMPLATES: Record<string, LaravelFile[]> = {
  readme: [
    {
      name: 'README.md',
      path: 'laravel-backend/README.md',
      language: 'markdown',
      code: `# Chimie Lab Management - Laravel Backend API

Ce projet est l'API Backend de production pour le système de gestion de laboratoire de chimie du lycée.
Il respecte la Troisième Forme Normale (3NF), l'intégrité référentielle, et la conformité CLP/SGH.

## Lancement rapide

1. **Installer les dépendances** :
   \`\`\`bash
   cd laravel-backend
   composer install
   \`\`\`

2. **Établir la configuration MySQL** dans le fichier \`.env\` :
   \`\`\`env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=chimie_lab_db
   DB_USERNAME=root
   DB_PASSWORD=secret
   \`\`\`

3. **Générer les clés & migrer** :
   \`\`\`bash
   php artisan key:generate
   php artisan sanctum:install
   php artisan migrate --seed
   \`\`\`

4. **Démarrer le serveur API** :
   \`\`\`bash
   php artisan serve
   \`\`\``
    }
  ],
  models: [
    {
      name: 'Utilisateur.php',
      path: 'app/Models/Utilisateur.php',
      language: 'php',
      code: `<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Utilisateur extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'utilisateurs';

    protected $fillable = [
        'nom',
        'email',
        'mot_de_passe',
        'role',
        'jeton_de_session',
    ];

    protected $hidden = [
        'mot_de_passe',
        'jeton_de_session',
    ];

    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }

    const CREATED_AT = 'cree_le';
    const UPDATED_AT = 'mis_a_jour_le';

    public function resultatsQuiz()
    {
        return $this->hasMany(ResultatDeQuiz::class, 'etudiant_id');
    }
}`
    },
    {
      name: 'ProduitChimique.php',
      path: 'app/Models/ProduitChimique.php',
      language: 'php',
      code: `<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProduitChimique extends Model
{
    use HasFactory;

    protected $table = 'produits_chimiques';

    protected $fillable = [
        'nom', 'formule_chimique', 'masse_molaire', 'ph', 'densite', 
        'point_eclair', 'temperature_stockage', 'pictogrammes_danger', 
        'date_expiration', 'stock_disponible', 'unite_stock', 'seuil_stock_critique'
    ];

    protected $casts = [
        'pictogrammes_danger' => 'array',
        'masse_molaire' => 'decimal:2',
        'ph' => 'decimal:2',
        'densite' => 'decimal:3',
        'stock_disponible' => 'decimal:2',
        'date_expiration' => 'date',
    ];

    const CREATED_AT = 'cree_le';
    const UPDATED_AT = 'mis_a_jour_le';

    public function ficheDeSecurite()
    {
        return $this->hasOne(FicheDeSecurite::class, 'produit_id');
    }

    public function qrCode()
    {
        return $this->hasOne(QrCodeChimique::class, 'produit_id');
    }

    public function travauxPratiques()
    {
        return $this->belongsToMany(
            TravauxPratiques::class,
            'produits_travaux_pratiques',
            'produit_id',
            'travaux_pratiques_id'
        )->withPivot('concentration_requise', 'volume_requis_ml');
    }
}`
    },
    {
      name: 'FicheDeSecurite.php',
      path: 'app/Models/FicheDeSecurite.php',
      language: 'php',
      code: `<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FicheDeSecurite extends Model
{
    use HasFactory;

    protected $table = 'fiches_de_securite';

    protected $fillable = [
        'produit_id', 'mention_avertissement', 'mentions_danger_h', 
        'conseils_prudence_p', 'premiers_secours', 'equipements_protection_epi', 'url_pdf_fds'
    ];

    protected $casts = [
        'mentions_danger_h' => 'array',
        'conseils_prudence_p' => 'array',
        'equipements_protection_epi' => 'array',
    ];

    const CREATED_AT = 'cree_le';
    const UPDATED_AT = 'mis_a_jour_le';

    public function produit()
    {
        return $this->belongsTo(ProduitChimique::class, 'produit_id');
    }
}`
    },
    {
      name: 'TravauxPratiques.php',
      path: 'app/Models/TravauxPratiques.php',
      language: 'php',
      code: `<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TravauxPratiques extends Model
{
    use HasFactory;

    protected $table = 'travaux_pratiques';

    protected $fillable = [
        'titre', 'description', 'categorie', 'difficulte', 'duree_minutes', 'niveau_scolaire', 'etapes_protocole'
    ];

    protected $casts = [
        'etapes_protocole' => 'array',
        'duree_minutes' => 'integer',
    ];

    const CREATED_AT = 'cree_le';
    const UPDATED_AT = 'mis_a_jour_le';

    public function produitsChimiques()
    {
        return $this->belongsToMany(
            ProduitChimique::class,
            'produits_travaux_pratiques',
            'travaux_pratiques_id',
            'produit_id'
        )->withPivot('concentration_requise', 'volume_requis_ml');
    }

    public function equipements()
    {
        return $this->belongsToMany(
            EquipementDeLaboratoire::class,
            'materiels_travaux_pratiques',
            'travaux_pratiques_id',
            'equipement_id'
        )->withPivot('quantite_requise');
    }

    public function quiz()
    {
        return $this->hasOne(Quiz::class, 'travaux_pratiques_id');
    }
}`
    },
    {
      name: 'AlerteDeStock.php',
      path: 'app/Models/AlerteDeStock.php',
      language: 'php',
      code: `<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlerteDeStock extends Model
{
    use HasFactory;

    protected $table = 'alertes_de_stock';

    protected $fillable = [
        'type_alerte', 'type_element', 'produit_id', 'equipement_id', 'message', 'est_resolue', 'resolu_par_utilisateur_id'
    ];

    protected $casts = [
        'est_resolue' => 'boolean',
    ];

    const CREATED_AT = 'cree_le';
    const UPDATED_AT = 'mis_a_jour_le';

    public function produit()
    {
        return $this->belongsTo(ProduitChimique::class, 'produit_id');
    }

    public function resoudre(int $userId): void
    {
        $this->update([
            'est_resolue' => true,
            'resolu_par_utilisateur_id' => $userId,
        ]);
    }
}`
    }
  ],
  migrations: [
    {
      name: '2026_06_13_000001_create_utilisateurs_table.php',
      path: 'database/migrations/2026_06_13_000001_create_utilisateurs_table.php',
      language: 'php',
      code: `<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('utilisateurs', function (Blueprint $table) {
            $table->id()->comment('Clé primaire auto-incrémentée.');
            $table->string('nom');
            $table->string('email')->unique();
            $table->string('mot_de_passe');
            $table->enum('role', ['Administrateur', 'Enseignant', 'Étudiant', 'Technicien']);
            $table->string('jeton_de_session', 100)->nullable();
            $table->timestamp('cree_le')->nullable();
            $table->timestamp('mis_a_jour_le')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('utilisateurs');
    }
};`
    },
    {
      name: '2026_06_13_000002_create_produits_chimiques_table.php',
      path: 'database/migrations/2026_06_13_000002_create_produits_chimiques_table.php',
      language: 'php',
      code: `<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('produits_chimiques', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('formule_chimique');
            $table->decimal('masse_molaire', 8, 2);
            $table->decimal('ph', 4, 2)->nullable();
            $table->decimal('densite', 5, 3)->nullable();
            $table->decimal('point_eclair', 5, 2)->nullable();
            $table->string('temperature_stockage', 100)->nullable();
            $table->json('pictogrammes_danger');
            $table->date('date_expiration');
            $table->decimal('stock_disponible', 10, 2);
            $table->string('unite_stock', 50);
            $table->decimal('seuil_stock_critique', 10, 2);
            $table->timestamp('cree_le')->nullable();
            $table->timestamp('mis_a_jour_le')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('produits_chimiques');
    }
};`
    },
    {
      name: '2026_06_13_000003_create_fiches_de_securite_table.php',
      path: 'database/migrations/2026_06_13_000003_create_fiches_de_securite_table.php',
      language: 'php',
      code: `<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fiches_de_securite', function (Blueprint $table) {
            $table->id();
            $table->foreignId('produit_id')->unique()->constrained('produits_chimiques')->onDelete('cascade');
            $table->enum('mention_avertissement', ['Danger', 'Attention', 'Aucun']);
            $table->json('mentions_danger_h');
            $table->json('conseils_prudence_p');
            $table->text('premiers_secours');
            $table->json('equipements_protection_epi');
            $table->string('url_pdf_fds', 2048)->nullable();
            $table->timestamp('cree_le')->nullable();
            $table->timestamp('mis_a_jour_le')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fiches_de_securite');
    }
};`
    }
  ],
  controllers: [
    {
      name: 'AuthController.php',
      path: 'app/Http/Controllers/Api/AuthController.php',
      language: 'php',
      code: `<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'mot_de_passe' => 'required',
        ]);

        $user = Utilisateur::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->mot_de_passe, $user->mot_de_passe)) {
            throw ValidationException::withMessages([
                'email' => ['Identifiants de connexion invalides.'],
            ]);
        }

        $token = $user->createToken('AuthToken')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['status' => 'success', 'message' => 'Déconnecté']);
    }
}`
    },
    {
      name: 'ProduitChimiqueController.php',
      path: 'app/Http/Controllers/Api/ProduitChimiqueController.php',
      language: 'php',
      code: `<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProduitChimique;
use App\Models\AlerteDeStock;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProduitChimiqueController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => 'success',
            'data' => ProduitChimique::with(['ficheDeSecurite', 'qrCode'])->get()
        ]);
    }

    public function show($id)
    {
        $produit = ProduitChimique::with(['ficheDeSecurite', 'qrCode'])->find($id);
        if (!$produit) {
            return response()->json(['status' => 'error', 'message' => 'Introuvable'], 404);
        }
        return response()->json(['status' => 'success', 'data' => $produit]);
    }

    public function update(Request $request, $id)
    {
        $produit = ProduitChimique::find($id);
        $produit->update($request->all());

        if ($produit->estEnRuptureStock()) {
            AlerteDeStock::create([
                'type_alerte' => 'Faible',
                'type_element' => 'chemical',
                'produit_id' => $produit->id,
                'message' => "Le stock de {$produit->nom} est en alerte critique.",
                'est_resolue' => false,
            ]);
        }

        return response()->json(['status' => 'success', 'data' => $produit]);
    }
}`
    }
  ],
  routes: [
    {
      name: 'api.php',
      path: 'routes/api.php',
      language: 'php',
      code: `<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProduitChimiqueController;
use App\Http\Controllers\Api\TravauxPratiquesController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // CRUD chimies & TPs
    Route::apiResource('produits', ProduitChimiqueController::class);
    Route::apiResource('travaux-pratiques', TravauxPratiquesController::class);
    Route::post('travaux-pratiques/{id}/quiz/soumettre', [TravauxPratiquesController::class, 'soumettreResultatQuiz']);
    Route::get('qr/{uuid}/scan', [ProduitChimiqueController::class, 'scanQrCode']);
});`
    },
    {
      name: '.env.example',
      path: '.env.example',
      language: 'ini',
      code: `APP_NAME="Chimie Lab Management"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=chimie_lab_db
DB_USERNAME=root
DB_PASSWORD=secret`
    }
  ]
};
