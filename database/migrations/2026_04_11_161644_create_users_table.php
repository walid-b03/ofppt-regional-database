<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('cin')->nullable();
            $table->enum('marital_status', ['single', 'married', 'divorced', 'widowed'])->nullable();
            $table->unsignedInteger('children')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->date('date_of_recruitment')->nullable();
            $table->string('site_of_recruitment')->nullable();
            $table->string('diploma')->nullable();
            $table->enum('rank', ['A1', 'A2', 'A3'])->nullable();
            $table->enum('role', ['admin', 'DRRG', 'DRCX', 'DRPD', 'AGAD', 'FRMT'])->nullable();
            $table->string('role_label')->nullable();
            $table->string('password');
            $table->foreignId('establishment_id')->nullable()->constrained()->nullOnDelete();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
