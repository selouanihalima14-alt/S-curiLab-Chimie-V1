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
        Schema::create('fiches_de_securite', function (Blueprint $table) {
            $table->id();
            
            // 1-to-1 Strict design with unique cascade key
            $table->foreignId('produit_id')
                  ->unique()
                  ->comment('Clé étrangère reliant à la molécule chimique spécifique (1-to-1 strict).')
                  ->constrained('produits_chimiques')
                  ->onDelete('cascade');
                  
            $table->enum('mention_avertissement', ['Danger', 'Attention', 'Aucun'])->comment("Mention d'avertissement réglementaire.");
            $table->json('mentions_danger_h')->comment('Tableau des Mentions de danger H (e.g., ["H302", "H314"]).');
            $table->json('conseils_prudence_p')->comment('Tableau des Conseils de prudence P (e.g., ["P280", "P305+P351+P338"]).');
            $table->text('premiers_secours')->comment('Mesures médicales immédiates de premiers secours à dispenser.');
            $table->json('equipements_protection_epi')->comment('Liste des EPI indispensables (Blouse, Lunettes, Gants, Hotte).');
            $table->string('url_pdf_fds', 2048)->nullable()->comment("Lien d'hébergement de la fiche FDS PDF officielle complète.");
            
            $table->timestamp('cree_le')->nullable();
            $table->timestamp('mis_a_jour_le')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fiches_de_securite');
    }
};
