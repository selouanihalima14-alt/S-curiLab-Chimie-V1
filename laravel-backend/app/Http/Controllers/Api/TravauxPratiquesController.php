<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TravauxPratiques;
use App\Models\ResultatDeQuiz;
use App\Models\Quiz;
use App\Models\StatistiqueUtilisation;
use Illuminate\Http\Request;

class TravauxPratiquesController extends Controller
{
    /**
     * Récupérer la liste complète des protocoles de TPs du lycée.
     */
    public function index()
    {
        $tps = TravauxPratiques::withCount(['produitsChimiques', 'equipements'])
                                ->with(['quiz'])
                                ->get();
        return response()->json([
            'status' => 'success',
            'data' => $tps,
        ]);
    }

    /**
     * Création d'un nouveau protocole ou d'une nouvelle fiche expérimentale.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'categorie' => 'required|string|max:150',
            'difficulte' => 'required|string|in:Débutant,Intermédiaire,Avancé',
            'duree_minutes' => 'required|integer|min:0',
            'niveau_scolaire' => 'required|string|max:100',
            'etapes_protocole' => 'required|array', // Enregistré en JSON
        ]);

        $tp = TravauxPratiques::create($validated);

        StatistiqueUtilisation::log(
            'create_tp',
            "Création de la fiche de TP '{$tp->titre}' ({$tp->niveau_scolaire}).",
            auth()->id()
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Fiche de Travaux Pratiques créée avec succès',
            'data' => $tp,
        ], 211);
    }

    /**
     * Voir le détail d'un TP, ses étapes interactives, ses réactifs et matériels requis de manières optimisée.
     */
    public function show($id)
    {
        // Chargement immédiat (Eager loading) pour empêcher le problème d'écroulement réseau N+1
        $tp = TravauxPratiques::with([
            'produitsChimiques', 
            'equipements', 
            'quiz'
        ])->find($id);

        if (!$tp) {
            return response()->json([
                'status' => 'error',
                'message' => 'Fiche de TP introuvable.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $tp,
        ]);
    }

    /**
     * Mettre à jour une fiche de protocole.
     */
    public function update(Request $request, $id)
    {
        $tp = TravauxPratiques::find($id);

        if (!$tp) {
            return response()->json([
                'status' => 'error',
                'message' => 'Fiche de TP introuvable.'
            ], 404);
        }

        $validated = $request->validate([
            'titre' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'categorie' => 'sometimes|string|max:150',
            'difficulte' => 'sometimes|string|in:Débutant,Intermédiaire,Avancé',
            'duree_minutes' => 'sometimes|integer|min:0',
            'niveau_scolaire' => 'sometimes|string|max:100',
            'etapes_protocole' => 'sometimes|array',
        ]);

        $tp->update($validated);

        StatistiqueUtilisation::log(
            'update_tp',
            "Mise à jour de la fiche de TP #{$tp->id} ({$tp->titre}).",
            auth()->id()
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Protocole mis à jour avec succès',
            'data' => $tp,
        ]);
    }

    /**
     * Supprimer un TP de la base de données.
     */
    public function destroy($id)
    {
        $tp = TravauxPratiques::find($id);

        if (!$tp) {
            return response()->json([
                'status' => 'error',
                'message' => 'Fiche de TP introuvable.'
            ], 404);
        }

        $titre = $tp->titre;
        $tp->delete();

        StatistiqueUtilisation::log(
            'delete_tp',
            "Suppression du protocole TP '{$titre}'.",
            auth()->id()
        );

        return response()->json([
            'status' => 'success',
            'message' => "Le protocole '{$titre}' a été supprimé à tout jamais.",
        ]);
    }

    /**
     * Recevoir et enregistrer le score de quiz d'un lycéen rattaché à ce TP.
     */
    public function soumettreResultatQuiz(Request $request, $id)
    {
        $request->validate([
            'score' => 'required|numeric|min:0',
            'total_questions' => 'required|integer|min:1',
            'reussi' => 'required|boolean',
        ]);

        $tp = TravauxPratiques::find($id);
        if (!$tp) {
            return response()->json(['status' => 'error', 'message' => "TP introuvable"], 404);
        }

        $quiz = Quiz::where('travaux_pratiques_id', $tp->id)->first();
        if (!$quiz) {
            return response()->json(['status' => 'error', 'message' => "Aucun quiz d'évaluation n'est configuré pour ce TP."], 404);
        }

        // L'étudiant authentifié
        $etudiantId = auth()->id() ?? 3; // Récupère l'ID ou 3 (étudiant par défaut)

        $resultat = ResultatDeQuiz::create([
            'quiz_id' => $quiz->id,
            'etudiant_id' => $etudiantId,
            'score' => $request->score,
            'total_questions' => $request->total_questions,
            'reussi' => $request->reussi,
            'complete_le' => now(),
        ]);

        // Logging d'incident de sécurité ou de réussite de quiz
        $statut = $request->reussi ? 'Succès' : 'Échec';
        StatistiqueUtilisation::log(
            'quiz_pass',
            "L'étudiant #{$etudiantId} a complété le quiz '{$quiz->titre}' avec un score de {$request->score}/{$request->total_questions} ({$statut}).",
            $etudiantId
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Score enregistré avec succès ! Félicitations pour votre validation.',
            'data' => $resultat,
        ]);
    }
}
