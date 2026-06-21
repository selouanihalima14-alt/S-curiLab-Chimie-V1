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
        Schema::create('materiels_travaux_pratiques', function (Blueprint $table) {
            $table->foreignId('travaux_pratiques_id')
                  ->comment('Référence au TP.')
                  ->constrained('travaux_pratiques')
                  ->onDelete('cascade');
                  
            $table->foreignId('equipement_id')
                  ->comment('Référence à la verrerie / équipement.')
                  ->constrained('equipements_de_laboratoire')
                  ->onDelete('cascade');
                  
            $table->integer('quantite_requise')->comment("Nombre unitaire requis par poste d'expérience.");
            
            // Primary key compound
            $table->primary(['travaux_pratiques_id', 'equipement_id'], 'pk_materiels_tp');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materiels_travaux_pratiques');
    }
};
