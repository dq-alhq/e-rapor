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

        Schema::create('mapels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kelompok_mapel_id')->constrained();
            $table->string('nama');
            $table->string('singkatan');
            $table->integer('urutan')->nullable();
            $table->integer('jpm')->default(0);
            $table->timestamps();

            $table->unique(['kelompok_mapel_id', 'urutan']);
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mapels');
    }
};
