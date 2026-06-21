<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FicheDeSecurite extends Model
{
    use HasFactory;

    protected $table = 'fiches_de_securite';

    protected $fillable = [
        'produit_id',
        'mention_avertissement',
        'mentions_danger_h',
        'conseils_prudence_p',
        'premiers_secours',
        'equipements_protection_epi',
        'url_pdf_fds',
    ];

    protected $casts = [
        'mentions_danger_h' => 'array',
        'conseils_prudence_p' => 'array',
        'equipements_protection_epi' => 'array',
    ];

    const CREATED_AT = 'cree_le';
    const UPDATED_AT = 'mis_a_jour_le';

    /**
     * Relation Inverse One-to-One vers le Produit Chimique originel.
     */
    public function produit()
    {
        return $this->belongsTo(ProduitChimique::class, 'produit_id');
    }
}
