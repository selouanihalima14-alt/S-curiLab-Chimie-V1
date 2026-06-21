<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Utilisateur extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Nom de la table associée dans la base de données MySQL.
     */
    protected $table = 'utilisateurs';

    /**
     * Les champs autorisés lors des affectations de masse (mass assignment).
     */
    protected $fillable = [
        'nom',
        'email',
        'mot_de_passe',
        'role',
        'jeton_de_session',
    ];

    /**
     * Masquer les attributs pour les réponses JSON sérialisées.
     */
    protected $hidden = [
        'mot_de_passe',
        'jeton_de_session',
    ];

    /**
     * Redéfinir le nom de colonne pour correspondre au mot de passe de la table utilisateurs.
     */
    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }

    /**
     * Constante d'alias pour les dates de création et mise à jour.
     */
    const CREATED_AT = 'cree_le';
    const UPDATED_AT = 'mis_a_jour_le';

    /**
     * Relation One-to-Many vers les résultats d'évaluations (Quiz).
     */
    public function resultatsQuiz()
    {
        return $this->hasMany(ResultatDeQuiz::class, 'etudiant_id');
    }

    /**
     * Relation One-to-Many vers les alertes de stock résolues par cet utilisateur.
     */
    public function alertesResolues()
    {
        return $this->hasMany(AlerteDeStock::class, 'resolu_par_utilisateur_id');
    }

    /**
     * Relation One-to-Many vers les statistiques et audits de sécurité.
     */
    public function logsActivite()
    {
        return $this->hasMany(StatistiqueUtilisation::class, 'utilisateur_id');
    }
}
