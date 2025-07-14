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

        Schema::create('tapels', function (Blueprint $table) {
            $table->id();
            $table->integer('tahun');
            $table->enum('semester', ["1", "2"]);
            $table->string('tempat_rapor')->nullable();
            $table->date('tanggal_rapor')->nullable();
            $table->boolean('aktif')->default(false);
            $table->timestamps();

            $table->unique(['tahun', 'semester']);
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tapels');
    }
};
