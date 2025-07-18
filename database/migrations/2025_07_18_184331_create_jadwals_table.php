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
        Schema::create('jadwals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tapel_id')->constrained('tapels');
            $table->foreignId('pembelajaran_id')->nullable()->constrained('pembelajarans');
            $table->string('hari');
            $table->integer('jam');
            $table->timestamps();

            $table->unique(['hari', 'jam', 'tapel_id', 'pembelajaran_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jadwals');
    }
};
