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
        Schema::disableForeignKeyConstraints();

        Schema::create('anggota_ekskuls', function (Blueprint $table) {
            $table->id();
            $table->foreignId('anggota_kelas_id')->constrained('anggota_kelas');
            $table->foreignId('ekskul_id')->nullable()->constrained();
            $table->integer('nilai')->nullable();
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anggota_ekskuls');
    }
};
