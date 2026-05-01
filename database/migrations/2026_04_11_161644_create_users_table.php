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
            $table->enum('rank', [
                'A30', 'A29', 'A28', 'A27', 'A26', 'A25', 'A24', 'A23', 'A22',
                'B21', 'B20', 'B19',
                'C18', 'C17', 'C16',
                'D15', 'D14', 'D13',
                'E12', 'E11', 'E10',
                'F09', 'F08', 'F07',
                'G06', 'G05', 'G04', 'G03', 'G02', 'G01',
            ])->nullable();
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
