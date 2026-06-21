<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquipementDeLaboratoire extends Model
{
    use HasFactory;

    protected $table = 'equipements_de_laboratoire';

    protected $fillable = [
        'nom',
        'categorie',
        'stock_disponible',
        'seuil_stock_critique',
        'emplacement_stockage',
        'etat_usure',
    ];

    protected $casts = [
        'stock_disponible' => 'integer',
        'seuil_stock_critique' => 'integer',
    ];

    const CREATED_AT = 'cree_le';
    const UPDATED_AT = 'mis_a_jour_le';

    /**
     * Relation Many-to-Many vers les fiches de Travaux Pratiques (TP).
     */
    public function travauxPratiques()
    {
        return $this->belongsToMany(
            TravauxPratiques::class,
            'materiels_travaux_pratiques',
            'equipement_id',
            'travaux_pratiques_id'
        )->withPivot('quantite_requise');
    }

    /**
     * Relation One-to-Many vers les alertes d'équipements émises.
     */
    public function alertes()
    {
        return $this->hasMany(AlerteDeStock::class, 'equipement_id');
    }

    /**
     * Détermine si le stock de matériel a franchi un niveau critique nécessitant commande.
     */
    public function estSousSeuilCritique(): bool
    {
        return $this->stock_disponible <= $this->seuil_stock_critique;
    }
}
