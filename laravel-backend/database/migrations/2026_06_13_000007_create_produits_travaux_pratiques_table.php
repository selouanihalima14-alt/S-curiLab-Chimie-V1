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
        Schema::create('produits_travaux_pratiques', function (Blueprint $table) {
            $table->foreignId('travaux_pratiques_id')
                  ->comment('Référence au TP.')
                  ->constrained('travaux_pratiques')
                  ->onDelete('cascade');
                  
            $table->foreignId('produit_id')
                  ->comment('Référence au produit chimique.')
                  ->constrained('produits_chimiques')
                  ->onDelete('cascade');
                  
            $table->string('concentration_requise', 100)->nullable()->comment('Concentration indicative.');
            $table->decimal('volume_requis_ml', 8, 2)->nullable()->comment('Volume estimé par poste.');
            
            $table->primary(['travaux_pratiques_id', 'produit_id'], 'pk_produits_tp');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produits_travaux_pratiques');
    }
};
