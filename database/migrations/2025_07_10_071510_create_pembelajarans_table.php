<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('pembelajarans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kelas_id')->constrained('kelas');
            $table->foreignId('mapel_id')->constrained('mapels');
            $table->foreignId('guru_id')->nullable()->constrained('gurus');
            $table->integer('kkm')->nullable();
            $table->timestamps();

            $table->unique(['kelas_id', 'mapel_id']);
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembelajarans');
    }
};
