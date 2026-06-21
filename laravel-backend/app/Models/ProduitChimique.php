<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProduitChimique extends Model
{
    use HasFactory;

    protected $table = 'produits_chimiques';

    protected $fillable = [
        'nom',
        'formule_chimique',
        'masse_molaire',
        'ph',
        'densite',
        'point_eclair',
        'temperature_stockage',
        'pictogrammes_danger',
        'date_expiration',
        'stock_disponible',
        'unite_stock',
        'seuil_stock_critique',
    ];

    /**
     * Conversion automatique de la colonne JSON en tableaux PHP natifs.
     */
    protected $casts = [
        'pictogrammes_danger' => 'array',
        'masse_molaire' => 'decimal:2',
        'ph' => 'decimal:2',
        'densite' => 'decimal:3',
        'point_eclair' => 'decimal:2',
        'stock_disponible' => 'decimal:2',
        'seuil_stock_critique' => 'decimal:2',
        'date_expiration' => 'date',
    ];

    const CREATED_AT = 'cree_le';
    const UPDATED_AT = 'mis_a_jour_le';

    /**
     * Relation One-to-One vers la Fiche de Données de Sécurité (FDS).
     */
    public function ficheDeSecurite()
    {
        return $this->hasOne(FicheDeSecurite::class, 'produit_id');
    }

    /**
     * Relation One-to-One vers l'identification par QR Code unique.
     */
    public function qrCode()
    {
        return $this->hasOne(QrCodeChimique::class, 'produit_id');
    }

    /**
     * Relation Many-to-Many vers les fiches de Travaux Pratiques (TP).
     * Lié via la table pivot "produits_travaux_pratiques".
     */
    public function travauxPratiques()
    {
        return $this->belongsToMany(
            TravauxPratiques::class,
            'produits_travaux_pratiques',
            'produit_id',
            'travaux_pratiques_id'
        )->withPivot('concentration_requise', 'volume_requis_ml');
    }

    /**
     * Relation One-to-Many vers les alertes émises sur ce produit.
     */
    public function alertes()
    {
        return $this->hasMany(AlerteDeStock::class, 'produit_id');
    }

    /**
     * Vérifie si le stock disponible est inférieur au seuil critique déclaré.
     */
    public function estEnRuptureStock(): bool
    {
        return $this->stock_disponible <= $this->seuil_stock_critique;
    }

    /**
     * Vérifie si le réactif a dépassé sa date limite d'expiration.
     */
    public function estExpire(): bool
    {
        return $this->date_expiration && $this->date_expiration->isPast();
    }
}
