<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('trainings', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->enum('type', ['Diplomante', 'Qualifiante'])->nullable();
            $table->enum('level', ['Qualification', 'Spécialisation', 'Technicien', 'Technicien Spécialisé'])->nullable();
            $table->boolean('is_trunk')->nullable();
            $table->unsignedInteger('duration')->nullable(); // in months
            $table->text('description')->nullable();
            $table->foreignId('establishment_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trainings');
    }
};
