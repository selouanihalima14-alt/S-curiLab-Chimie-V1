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
        Schema::create('travaux_pratiques', function (Blueprint $table) {
            $table->id();
            $table->string('titre')->comment('Titre abrégé du TP.');
            $table->text('description')->comment('Introduction et problématique scientifique.');
            $table->string('categorie', 150)->comment('Branche majeure (e.g., Chimie organique, Analyse volumétrique).');
            $table->enum('difficulte', ['Débutant', 'Intermédiaire', 'Avancé'])->comment("Niveau d'expérience requis.");
            $table->integer('duree_minutes')->comment('Durée indicative globale de séance.');
            $table->string('niveau_scolaire', 100)->comment("Année concernée (e.g., Tronc Commun, 1ère Bac, 2ème Bac).");
            $table->json('etapes_protocole')->comment('Protocole séquentiel ordonné et légendes détaillées.');
            
            $table->timestamp('cree_le')->nullable();
            $table->timestamp('mis_a_jour_le')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('travaux_pratiques');
    }
};
