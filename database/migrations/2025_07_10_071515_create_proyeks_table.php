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

        Schema::create('proyeks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('koordinator_id')->constrained('gurus');
            $table->foreignId('tapel_id')->constrained();
            $table->string('tema');
            $table->string('nama');
            $table->string('deskripsi')->nullable();
            $table->json('elemen');
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proyeks');
    }
};
