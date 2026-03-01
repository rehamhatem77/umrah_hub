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
        Schema::create('admin_home_page', function (Blueprint $table) {
            $table->string('hero_title')->nullable();
            $table->text('hero_description')->nullable();
            $table->string('hero_image');

            $table->string('services_title');
            $table->text('services_description');

            $table->string('special_title');
            $table->text('special_description');
            $table->string('special_button_text');

            $table->string('packages_title');
            $table->text('packages_description')->nullable();
            $table->string('packages_button_text');

            $table->string('testimonials_title');
            $table->text('testimonials_description');


            $table->id();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_home_page');
    }
};
