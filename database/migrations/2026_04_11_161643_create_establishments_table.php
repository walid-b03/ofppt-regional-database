<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('establishments', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->enum('sector', [
                'Aéronautique',
                'Agriculture',
                'Agro-Industrie',
                'Artisanat',
                'Arts et Industries Graphiques',
                'Audiovisuel et Cinéma',
                'Bâtiment et Travaux Publics',
                'Cuir',
                'Digital et Intelligence Artificielle',
                'Economie Verte',
                'Froid et Génie Thermique',
                'Génie Electrique',
                'Génie Mécanique',
                'Gestion et Commerce',
                'Industrie Navale',
                'Logistique et Transport',
                'Matériaux de Construction',
                'Métiers de l’Automobile',
                'Métiers du Golf',
                'Métiers Transverses de l’Industrie',
                'Pêche',
                'Plasturgie',
                'Santé',
                'Services à la Personne',
                'Sport Equestre',
                'Textile Habillement',
                'Tourisme Hôtellerie Restauration'
            ])->nullable();
            $table->enum('type', ['Cité des Métiers et des Compétences', 'Etablissement de Formation', 'Centre Conventionné'])->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->foreignId('head_id')->nullable();
            $table->foreignId('complex_id')->constrained();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('establishments');
    }
};
