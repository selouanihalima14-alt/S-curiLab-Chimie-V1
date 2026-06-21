<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResultatDeQuiz extends Model
{
    use HasFactory;

    protected $table = 'resultats_de_quiz';

    /**
     * Désactiver les timestamps automatiques standards, car nous utilisons "complete_le".
     */
    public $timestamps = false;

    protected $fillable = [
        'quiz_id',
        'etudiant_id',
        'score',
        'total_questions',
        'reussi',
        'complete_le',
    ];

    protected $casts = [
        'score' => 'decimal:2',
        'total_questions' => 'integer',
        'reussi' => 'boolean',
        'complete_le' => 'datetime',
    ];

    /**
     * Relation vers le Quiz associé.
     */
    public function quiz()
    {
        return $this->belongsTo(Quiz::class, 'quiz_id');
    }

    /**
     * Relation vers l'Étudiant (Utilisateur) qui a répondu au Quiz.
     */
    public function etudiant()
    {
        return $this->belongsTo(Utilisateur::class, 'etudiant_id');
    }
}
