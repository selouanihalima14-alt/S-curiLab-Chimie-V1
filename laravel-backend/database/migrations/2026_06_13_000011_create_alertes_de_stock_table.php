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
        Schema::create('alertes_de_stock', function (Blueprint $table) {
            $table->id();
            $table->enum('type_alerte', ['Faible', 'Expiré', 'Expiration Proche'])->comment("Type d'alerte.");
            $table->enum('type_element', ['chemical', 'equipment'])->comment("Cible de l'alerte.");
            
            // Relational target links
            $table->foreignId('produit_id')
                  ->nullable()
                  ->comment('Produit chimique (optionnel).')
                  ->constrained('produits_chimiques')
                  ->onDelete('cascade');
                  
            $table->foreignId('equipement_id')
                  ->nullable()
                  ->comment('Verrerie ou machine (optionnel).')
                  ->constrained('equipements_de_laboratoire')
                  ->onDelete('cascade');
                  
            $table->text('message')->comment("Raison claire de l'alerte.");
            $table->tinyInteger('est_resolue')->default(0)->comment("Si l'alerte a été réglée.");
            
            $table->foreignId('resolu_par_utilisateur_id')
                  ->nullable()
                  ->comment("L'utilisateur qui a réglé l'alerte.")
                  ->constrained('utilisateurs')
                  ->onDelete('cascade');
                  
            $table->timestamp('cree_le')->nullable();
            $table->timestamp('mis_a_jour_le')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alertes_de_stock');
    }
};
