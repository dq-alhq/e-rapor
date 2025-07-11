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

        Schema::create('anggota_kelas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained();
            $table->foreignId('kelas_id')->constrained('kelas');
            $table->decimal('nilai_uts', 5, 2)->nullable();
            $table->decimal('rata_uts', 5, 2)->nullable();
            $table->decimal('nilai_akhir', 5, 2)->nullable();
            $table->decimal('rata_akhir', 5, 2)->nullable();
            $table->integer('absensi_alpha')->nullable();
            $table->integer('absensi_izin')->nullable();
            $table->integer('absensi_sakit')->nullable();
            $table->boolean('cek_wali')->default(false);
            $table->boolean('cek_kepsek')->default(false);
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anggota_kelas');
    }
};
