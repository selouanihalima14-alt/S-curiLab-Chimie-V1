<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $table = 'quiz';

    protected $fillable = [
        'travaux_pratiques_id',
        'titre',
        'questions',
    ];

    protected $casts = [
        'questions' => 'array',
    ];

    const CREATED_AT = 'cree_le';
    const UPDATED_AT = 'mis_a_jour_le';

    /**
     * Relation Inverse One-to-One vers le Travaux Pratiques associé.
     */
    public function travauxPratiques()
    {
        return $this->belongsTo(TravauxPratiques::class, 'travaux_pratiques_id');
    }

    /**
     * Relation One-to-Many vers les résultats d'échantillons validés par les lycéens.
     */
    public function resultats()
    {
        return $this->hasMany(ResultatDeQuiz::class, 'quiz_id');
    }
}
