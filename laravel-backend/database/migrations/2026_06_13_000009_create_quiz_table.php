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
        Schema::create('quiz', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('travaux_pratiques_id')
                  ->comment('Clé étrangère reliant le quiz au TP.')
                  ->constrained('travaux_pratiques')
                  ->onDelete('cascade');
                  
            $table->string('titre')->comment('Intitulé du quiz.');
            $table->json('questions')->comment('Structure complète des questions et options.');
            
            $table->timestamp('cree_le')->nullable();
            $table->timestamp('mis_a_jour_le')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quiz');
    }
};
