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
        Schema::create('utilisateurs', function (Blueprint $table) {
            $table->id()->comment('Clé primaire auto-incrémentée.');
            $table->string('nom')->comment("Nom complet de l'utilisateur.");
            $table->string('email')->unique()->comment('Adresse email unique.');
            $table->string('mot_de_passe')->comment('Mot de passe sécurisé haché (Bcrypt).');
            $table->enum('role', ['Administrateur', 'Enseignant', 'Étudiant', 'Technicien'])->comment("Rôle d'autorisation de l'utilisateur.");
            $table->string('jeton_de_session', 100)->nullable()->comment('Jeton de session persistante pour Laravel (remember_token).');
            
            // Custom French column names for timestamps
            $table->timestamp('cree_le')->nullable();
            $table->timestamp('mis_a_jour_le')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utilisateurs');
    }
};
