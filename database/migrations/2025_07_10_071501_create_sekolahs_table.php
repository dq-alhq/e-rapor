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

        Schema::create('sekolahs', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('jenjang');
            $table->string('npsn')->nullable();
            $table->string('nis')->nullable();
            $table->string('nss')->nullable();
            $table->string('nds')->nullable();
            $table->string('alamat')->nullable();
            $table->foreignId('wilayah_id')->nullable()->constrained();
            $table->string('kodepos')->nullable();
            $table->string('telepon')->nullable();
            $table->string('email')->nullable();
            $table->string('logo')->nullable();
            $table->foreignId('kepsek_id')->nullable()->constrained('gurus', 'id');
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sekolahs');
    }
};
