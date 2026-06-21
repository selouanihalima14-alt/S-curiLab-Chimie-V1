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
        Schema::create('equipements_de_laboratoire', function (Blueprint $table) {
            $table->id();
            $table->string('nom')->comment('Désignation du matériel (e.g., Burette graduée de 25 mL).');
            $table->string('categorie', 150)->comment('Catégorie fonctionnelle (e.g., Verrerie, Matériel thermique).');
            $table->integer('stock_disponible')->comment('Nombre de pièces intactes utilisables.');
            $table->integer('seuil_stock_critique')->comment("Seuil d'alerte d'équipement critique.");
            $table->string('emplacement_stockage')->nullable()->comment('Armoire, tiroir, ou étagère spécifique.');
            $table->enum('etat_usure', ['Excellent', 'Bon', 'Endommagé', 'Hors service'])->comment('Indicateur physique opérationnel.');
            
            $table->timestamp('cree_le')->nullable();
            $table->timestamp('mis_a_jour_le')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipements_de_laboratoire');
    }
};
