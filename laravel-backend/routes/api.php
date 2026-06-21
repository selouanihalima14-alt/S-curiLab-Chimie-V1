<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProduitChimiqueController;
use App\Http\Controllers\Api\TravauxPratiquesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Ici se configurent les endpoints de l'application Chimie Lab Management.
| Les requêtes sont préfixées automatiquement par "/api".
|
*/

// ================= PRIVATE / AUTHENTICATION ENDPOINTS =================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ================= PROTECTED ENDPOINTS (Requièrent le Token d'autorisation) =================
Route::middleware('auth:sanctum')->group(function () {
    
    // User Profile
    Route::get('/user', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // --- PRODUITS CHIMIQUES & FLACONS SGH ---
    Route::apiResource('produits', ProduitChimiqueController::class);
    
    // Scan QR Code physique avec UUID unique
    Route::get('qr/{uuid}/scan', [ProduitChimiqueController::class, 'scanQrCode']);

    // --- TRAVAUX PRATIQUES & PROTOCOLES ---
    Route::apiResource('travaux-pratiques', TravauxPratiquesController::class);
    
    // Soumettre une résolution d'évaluation de TP (Quiz)
    Route::post('travaux-pratiques/{id}/quiz/soumettre', [TravauxPratiquesController::class, 'soumettreResultatQuiz']);

    // --- ALERTS ---
    Route::get('/alertes', function () {
        return response()->json([
            'status' => 'success',
            'data' => \App\Models\AlerteDeStock::with(['produit', 'equipement', 'resoluPar'])
                        ->orderBy('est_resolue', 'asc')
                        ->orderBy('cree_le', 'desc')
                        ->get()
        ]);
    });

    Route::post('/alertes/{id}/resoudre', function ($id) {
        $alerte = \App\Models\AlerteDeStock::find($id);
        if (!$alerte) {
            return response()->json(['status' => 'error', 'message' => 'Alerte introuvable'], 404);
        }
        $alerte->resoudre(auth()->id() ?? 1); // Résoudre
        
        \App\Models\StatistiqueUtilisation::log(
            'resolve_alert',
            "Résolution de l'alerte ID #{$id} par " . (auth()->user()->nom ?? 'Technicien'),
            auth()->id()
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Alerte résolue avec succès',
            'data' => $alerte
        ]);
    });

    // --- AUDIT TRAIL / LOGS D'ACTIVITÉ ---
    Route::get('/audit-logs', function () {
        return response()->json([
            'status' => 'success',
            'data' => \App\Models\StatistiqueUtilisation::with('utilisateur')
                        ->orderBy('cree_le', 'desc')
                        ->get()
        ]);
    });
});
