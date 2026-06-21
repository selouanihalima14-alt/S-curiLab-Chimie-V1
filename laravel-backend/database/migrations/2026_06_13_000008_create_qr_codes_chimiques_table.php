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
        Schema::create('qr_codes_chimiques', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('produit_id')
                  ->unique()
                  ->comment('Clé étrangère 1-to-1 reliant au produit chimique correspondant.')
                  ->constrained('produits_chimiques')
                  ->onDelete('cascade');
                  
            $table->string('qr_code_uuid', 64)->unique()->comment('Code UUID unique matérialisé par le QR Code physique apposé.');
            $table->integer('nombre_scans')->default(0)->comment('Compteur de scans.');
            $table->timestamp('dernier_scan_le')->nullable()->comment('Horodatage du dernier scan.');
            
            $table->timestamp('cree_le')->nullable();
            $table->timestamp('mis_a_jour_le')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('qr_codes_chimiques');
    }
};
