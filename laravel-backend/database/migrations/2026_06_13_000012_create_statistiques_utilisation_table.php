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
        Schema::create('statistiques_utilisation', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('utilisateur_id')
                  ->nullable()
                  ->comment('Utilisateur.')
                  ->constrained('utilisateurs')
                  ->onDelete('set null');
                  
            $table->string('type_action', 100)->comment("Type d'opération (e.g., scan_qr, quiz_pass, create_sds).");
            $table->text('description')->comment('Détail textuel.');
            $table->string('adresse_ip', 45)->nullable()->comment('Adresse IP.');
            $table->string('agent_utilisateur', 255)->nullable();
            $table->timestamp('cree_le'); // Creation log only
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('statistiques_utilisation');
    }
};
