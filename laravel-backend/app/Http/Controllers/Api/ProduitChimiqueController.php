<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProduitChimique;
use App\Models\AlerteDeStock;
use App\Models\QrCodeChimique;
use App\Models\StatistiqueUtilisation;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProduitChimiqueController extends Controller
{
    /**
     * Récupérer la liste de tous les produits chimiques en stock.
     */
    public function index()
    {
        $produits = ProduitChimique::with(['ficheDeSecurite', 'qrCode'])->get();
        return response()->json([
            'status' => 'success',
            'count' => $produits->count(),
            'data' => $produits,
        ]);
    }

    /**
     * Enregistrer un nouveau composé chimique ou réactif de laboratoire.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'formule_chimique' => 'required|string|max:255',
            'masse_molaire' => 'required|numeric|min:0',
            'ph' => 'nullable|numeric|between:0,14',
            'densite' => 'nullable|numeric|min:0',
            'point_eclair' => 'nullable|numeric',
            'temperature_stockage' => 'nullable|string|max:100',
            'pictogrammes_danger' => 'required|array', // Reçoit un tableau, converti en JSON
            'date_expiration' => 'required|date',
            'stock_disponible' => 'required|numeric|min:0',
            'unite_stock' => 'required|string|max:50',
            'seuil_stock_critique' => 'required|numeric|min:0',
        ]);

        $produit = ProduitChimique::create($validated);

        // Assigner automatiquement un QR Code de suivi unique
        QrCodeChimique::create([
            'produit_id' => $produit->id,
            'qr_code_uuid' => (string) Str::uuid(),
            'nombre_scans' => 0,
        ]);

        // Vérification automatique des stocks pour alerte
        if ($produit->estEnRuptureStock()) {
            AlerteDeStock::create([
                'type_alerte' => 'Faible',
                'type_element' => 'chemical',
                'produit_id' => $produit->id,
                'message' => "Le produit chimique '{$produit->nom}' a été enregistré sous son seuil d'alerte critique ({$produit->stock_disponible} < {$produit->seuil_stock_critique} {$produit->unite_stock}).",
                'est_resolue' => false,
            ]);
        }

        // Logger la création
        StatistiqueUtilisation::log(
            'create_chemical',
            "Création du produit chimique '{$produit->nom}' ({$produit->formule_chimique}).",
            auth()->id()
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Produit chimique enregistré et étiqueté avec succès',
            'data' => $produit->load(['qrCode']),
        ], 211);
    }

    /**
     * Afficher les détails d'un réactif spécifique avec ses informations SGH/FDS.
     */
    public function show($id)
    {
        $produit = ProduitChimique::with(['ficheDeSecurite', 'qrCode', 'travauxPratiques'])->find($id);

        if (!$produit) {
            return response()->json([
                'status' => 'error',
                'message' => 'Produit chimique introuvable.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $produit,
        ]);
    }

    /**
     * Mettre à jour les informations ou le niveau de stock d'un produit.
     */
    public function update(Request $request, $id)
    {
        $produit = ProduitChimique::find($id);

        if (!$produit) {
            return response()->json([
                'status' => 'error',
                'message' => 'Produit chimique introuvable.'
            ], 404);
        }

        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'formule_chimique' => 'sometimes|string|max:255',
            'masse_molaire' => 'sometimes|numeric|min:0',
            'ph' => 'nullable|numeric|between:0,14',
            'densite' => 'nullable|numeric|min:0',
            'point_eclair' => 'nullable|numeric',
            'temperature_stockage' => 'nullable|string|max:100',
            'pictogrammes_danger' => 'sometimes|array',
            'date_expiration' => 'sometimes|date',
            'stock_disponible' => 'sometimes|numeric|min:0',
            'unite_stock' => 'sometimes|string|max:50',
            'seuil_stock_critique' => 'sometimes|numeric|min:0',
        ]);

        $produit->update($validated);

        // Déclenchement ou actualisation d'une alerte de stock
        if ($produit->estEnRuptureStock()) {
            $alerteExistante = AlerteDeStock::where('produit_id', $produit->id)
                                             ->where('est_resolue', false)
                                             ->first();

            if (!$alerteExistante) {
                AlerteDeStock::create([
                    'type_alerte' => 'Faible',
                    'type_element' => 'chemical',
                    'produit_id' => $produit->id,
                    'message' => "Alerte de réapprovisionnement : Le stock de '{$produit->nom}' est critique : {$produit->stock_disponible} {$produit->unite_stock} restant (Seuil: {$produit->seuil_stock_critique}).",
                    'est_resolue' => false,
                ]);
            }
        }

        StatistiqueUtilisation::log(
            'update_chemical',
            "Mise à jour des informations de '{$produit->nom}'.",
            auth()->id()
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Mise à jour effectuée.',
            'data' => $produit,
        ]);
    }

    /**
     * Supprimer un flacon du stock.
     */
    public function destroy($id)
    {
        $produit = ProduitChimique::find($id);

        if (!$produit) {
            return response()->json([
                'status' => 'error',
                'message' => 'Produit chimique introuvable.'
            ], 404);
        }

        $nom = $produit->nom;
        $produit->delete(); // Déclenche CASCADE migrations pour la FDS et le QR Code

        StatistiqueUtilisation::log(
            'delete_chemical',
            "Retrait définitif de '{$nom}' du stock.",
            auth()->id()
        );

        return response()->json([
            'status' => 'success',
            'message' => "Le produit '{$nom}' a été retiré définitivement des stocks.",
        ]);
    }

    /**
     * Flasher / Scanner un QR code de flacon pour extraire instantanément ses données SGH et sa FDS.
     */
    public function scanQrCode($uuid)
    {
        $qr = QrCodeChimique::where('qr_code_uuid', $uuid)->first();

        if (!$qr) {
            return response()->json([
                'status' => 'error',
                'message' => 'QR Code de laboratoire invalide ou non répertorié.'
            ], 404);
        }

        // Incrémenter les stats de scan
        $qr->incrementScans();

        // Récupérer le composé chimique
        $produit = ProduitChimique::with(['ficheDeSecurite', 'qrCode'])->find($qr->produit_id);

        StatistiqueUtilisation::log(
            'scan_qr',
            "Scan du flacon QR ID '{$uuid}' correspondant à '{$produit->nom}'.",
            auth()->id()
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Scan de traçabilité validé',
            'scan_count' => $qr->nombre_scans,
            'dernier_scan' => $qr->dernier_scan_le,
            'produit' => $produit,
        ]);
    }
}
