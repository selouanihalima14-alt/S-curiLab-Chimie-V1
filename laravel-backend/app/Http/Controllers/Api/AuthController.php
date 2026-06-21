<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Utilisateur;
use App\Models\StatistiqueUtilisation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Authentification de l'utilisateur et génération du jeton d'accès Sanctum.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email|string',
            'mot_de_passe' => 'required|string',
        ]);

        $user = Utilisateur::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->mot_de_passe, $user->mot_de_passe)) {
            throw ValidationException::withMessages([
                'email' => ['Les identifiants fournis sont incorrects.'],
            ]);
        }

        // Générer le token de session
        $token = $user->createToken('AuthToken')->plainTextToken;

        // Enregistrer dans le journal d'activité
        StatistiqueUtilisation::log(
            'connexion',
            "L'utilisateur '{$user->nom}' ({$user->role}) s'est connecté.",
            $user->id
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Connexion réussie',
            'user' => [
                'id' => $user->id,
                'nom' => $user->nom,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    /**
     * Déconnexion (révocation des jetons actifs).
     */
    public function logout(Request $request)
    {
        $user = $request->user();
        
        if ($user) {
            // Supprimer tous les jetons actifs
            $user->tokens()->delete();

            StatistiqueUtilisation::log(
                'deconnexion',
                "L'utilisateur '{$user->nom}' s'est déconnecté.",
                $user->id
            );
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Déconnexion effectuée avec succès',
        ]);
    }

    /**
     * Récupérer le profil utilisateur actuellement authentifié.
     */
    public function profile(Request $request)
    {
        return response()->json([
            'status' => 'success',
            'user' => $request->user(),
        ]);
    }

    /**
     * Enregistrement d'un nouvel utilisateur (e.g. Enseignant ou Étudiant).
     */
    public function register(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:utilisateurs,email',
            'mot_de_passe' => 'required|string|min:6',
            'role' => 'required|string|in:Administrateur,Enseignant,Étudiant,Technicien',
        ]);

        $user = Utilisateur::create([
            'nom' => $request->nom,
            'email' => $request->email,
            'mot_de_passe' => Hash::make($request->mot_de_passe),
            'role' => $request->role,
        ]);

        $token = $user->createToken('AuthToken')->plainTextToken;

        StatistiqueUtilisation::log(
            'inscription',
            "Nouvel utilisateur créé: {$user->nom} avec le rôle {$user->role}.",
            $user->id
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Utilisateur créé avec succès',
            'user' => [
                'id' => $user->id,
                'nom' => $user->nom,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 211); // Created status
    }
}
