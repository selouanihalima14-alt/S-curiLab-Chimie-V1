<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatistiqueUtilisation extends Model
{
    use HasFactory;

    protected $table = 'statistiques_utilisation';

    /**
     * Seulement le champ de création est requis pour les logs de statistiques.
     */
    const CREATED_AT = 'cree_le';
    const UPDATED_AT = null;

    protected $fillable = [
        'utilisateur_id',
        'type_action',
        'description',
        'adresse_ip',
        'agent_utilisateur',
    ];

    /**
     * Relation vers l'utilisateur à l'origine du log d'audit.
     */
    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'utilisateur_id');
    }

    /**
     * Méthode utilitaire statique pour enregistrer une action d'audit de sécurité simplement.
     */
    public static function log(string $action, string $description, ?int $userId = null): self
    {
        return self::create([
            'utilisateur_id' => $userId ?? (auth()->check() ? auth()->id() : null),
            'type_action' => $action,
            'description' => $description,
            'adresse_ip' => request()->ip(),
            'agent_utilisateur' => request()->userAgent(),
        ]);
    }
}
