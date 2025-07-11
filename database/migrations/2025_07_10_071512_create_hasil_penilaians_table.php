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

        Schema::create('hasil_penilaians', function (Blueprint $table) {
            $table->id();
            $table->foreignId('anggota_kelas_id')->constrained('anggota_kelas');
            $table->foreignId('penilaian_id')->constrained();
            $table->decimal('nilai', 5, 2)->nullable();
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_penilaians');
    }
};
