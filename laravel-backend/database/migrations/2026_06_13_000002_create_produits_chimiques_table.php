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
        Schema::create('produits_chimiques', function (Blueprint $table) {
            $table->id();
            $table->string('nom')->comment('Nom courant en français (e.g., Acide salicylique).');
            $table->string('formule_chimique')->comment('Formule chimique brute (e.g., C7H6O3).');
            $table->decimal('masse_molaire', 8, 2)->comment('Masse molaire en g/mol.');
            $table->decimal('ph', 4, 2)->nullable()->comment('pH de la solution aqueuse de référence.');
            $table->decimal('densite', 5, 3)->nullable()->comment("Densité relative par rapport à l'eau.");
            $table->decimal('point_eclair', 5, 2)->nullable()->comment("Point d'éclair thermique en °C.");
            $table->string('temperature_stockage', 100)->nullable()->comment('Consigne de température de stockage.');
            $table->json('pictogrammes_danger')->comment('Tableau des codes GHS applicables (e.g., ["GHS02", "GHS05"]).');
            $table->date('date_expiration')->comment('Date limite recommandée stable.');
            $table->decimal('stock_disponible', 10, 2)->comment('Quantité courante présente en réserve.');
            $table->string('unite_stock', 50)->comment('Unité de mesure (g, mL, L, kg).');
            $table->decimal('seuil_stock_critique', 10, 2)->comment("Seuil d'alerte de stock critique.");
            
            $table->timestamp('cree_le')->nullable();
            $table->timestamp('mis_a_jour_le')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produits_chimiques');
    }
};
