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

        Schema::create('anggota_proyeks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('anggota_kelas_id')->constrained('anggota_kelas');
            $table->foreignId('proyek_id')->constrained();
            $table->json('pencapaian');
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anggota_proyeks');
    }
};
