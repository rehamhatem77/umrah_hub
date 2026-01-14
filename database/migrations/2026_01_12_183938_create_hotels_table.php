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
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('slug')->unique();
            $table->enum('city', ['makkah', 'madinah']);
            $table->string('address_location')->nullable();

            $table->integer('distance_from_kaaba')->nullable();
            $table->integer('distance_from_nabawi')->nullable();

            $table->integer('stars')->nullable(); 
            $table->text('features')->nullable(); 

            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hotels');
    }
};
