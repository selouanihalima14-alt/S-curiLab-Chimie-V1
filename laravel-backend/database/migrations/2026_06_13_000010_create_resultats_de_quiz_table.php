<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('resultats_de_quiz', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('quiz_id')
                  ->comment('Quiz évalué.')
                  ->constrained('quiz')
                  ->onDelete('cascade');
                  
            $table->foreignId('etudiant_id')
                  ->comment("ID de l'étudiant.")
                  ->constrained('utilisateurs')
                  ->onDelete('cascade');
                  
            $table->decimal('score', 5, 2)->comment("Points validés par l'étudiant.");
            $table->integer('total_questions')->comment('Questions soumises.');
            $table->tinyInteger('reussi')->defaultValue(0)->comment('Drapeau booléen de réussite (0 = échec, 1 = succès).');
            $table->timestamp('complete_le')->comment('Horodatage final.');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resultats_de_quiz');
    }
};
