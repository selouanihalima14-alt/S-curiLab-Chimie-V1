<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TravauxPratiques extends Model
{
    use HasFactory;

    protected $table = 'travaux_pratiques';

    protected $fillable = [
        'titre',
        'description',
        'categorie',
        'difficulte',
        'duree_minutes',
        'niveau_scolaire',
        'etapes_protocole',
    ];

    /**
     * Conversion automatique de la colonne JSON d'étapes en structure PHP.
     */
    protected $casts = [
        'etapes_protocole' => 'array',
        'duree_minutes' => 'integer',
    ];

    const CREATED_AT = 'cree_le';
    const UPDATED_AT = 'mis_a_jour_le';

    /**
     * Relation Many-to-Many vers les réactifs d'expériences requis.
     */
    public function produitsChimiques()
    {
        return $this->belongsToMany(
            ProduitChimique::class,
            'produits_travaux_pratiques',
            'travaux_pratiques_id',
            'produit_id'
        )->withPivot('concentration_requise', 'volume_requis_ml');
    }

    /**
     * Relation Many-to-Many vers les verreries et matériels requis.
     */
    public function equipements()
    {
        return $this->belongsToMany(
            EquipementDeLaboratoire::class,
            'materiels_travaux_pratiques',
            'travaux_pratiques_id',
            'equipement_id'
        )->withPivot('quantite_requise');
    }

    /**
     * Relation One-to-One vers le Quiz théorique/pédagogique de sécurité lié à ce TP.
     */
    public function quiz()
    {
        return $this->hasOne(Quiz::class, 'travaux_pratiques_id');
    }
}
