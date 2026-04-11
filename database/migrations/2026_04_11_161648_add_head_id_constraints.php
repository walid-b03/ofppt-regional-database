<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('regions', function (Blueprint $table) {
            $table->foreign('head_id')->references('id')->on('users')->nullOnDelete();
        });

        Schema::table('complexes', function (Blueprint $table) {
            $table->foreign('head_id')->references('id')->on('users')->nullOnDelete();
        });

        Schema::table('establishments', function (Blueprint $table) {
            $table->foreign('head_id')->references('id')->on('users')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('regions', function (Blueprint $table) {
            $table->dropForeign(['head_id']);
        });

        Schema::table('complexes', function (Blueprint $table) {
            $table->dropForeign(['head_id']);
        });

        Schema::table('establishments', function (Blueprint $table) {
            $table->dropForeign(['head_id']);
        });
    }
};
