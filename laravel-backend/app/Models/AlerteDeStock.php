<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlerteDeStock extends Model
{
    use HasFactory;

    protected $table = 'alertes_de_stock';

    protected $fillable = [
        'type_alerte',
        'type_element',
        'produit_id',
        'equipement_id',
        'message',
        'est_resolue',
        'resolu_par_utilisateur_id',
    ];

    protected $casts = [
        'est_resolue' => 'boolean',
    ];

    const CREATED_AT = 'cree_le';
    const UPDATED_AT = 'mis_a_jour_le';

    /**
     * Relation vers le produit concerné si type_element == 'chemical'.
     */
    public function produit()
    {
        return $this->belongsTo(ProduitChimique::class, 'produit_id');
    }

    /**
     * Relation vers l'équipement concerné si type_element == 'equipment'.
     */
    public function equipement()
    {
        return $this->belongsTo(EquipementDeLaboratoire::class, 'equipement_id');
    }

    /**
     * Relation vers l'utilisateur (généralement Technicien ou Admin) qui a résolu l'alerte.
     */
    public function resoluPar()
    {
        return $this->belongsTo(Utilisateur::class, 'resolu_par_utilisateur_id');
    }

    /**
     * Marquer l'alerte comme résolue par un utilisateur donné.
     */
    public function resoudre(int $userId): void
    {
        $this->update([
            'est_resolue' => true,
            'resolu_par_utilisateur_id' => $userId,
        ]);
    }
}
