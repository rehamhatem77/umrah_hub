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
        Schema::create('admin_about_us', function (Blueprint $table) {

            $table->id();
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->text('seo_keywords')->nullable();



            $table->string('hero_title');
            $table->string('hero_badge_title')->nullable();
            $table->text('hero_description');
            $table->string('hero_image');

            $table->string('intro_title');
            $table->text('intro_description');
            $table->text('intro_description_long')->nullable();
            $table->text('intro_badge');
            $table->text('intro_badge_sub')->nullable();
            $table->string('intro_image');
            

            $table->string('vision_mission_title');
            $table->text('vision_mission_description');
            $table->string('mission_title');
            $table->text('mission_description');
            $table->string('vision_title');
            $table->text('vision_description');

            $table->string('why_choose_us_title');
            $table->string('why_choose_us_card_one_title');
            $table->string('why_choose_us_card_two_title');
            $table->string('why_choose_us_card_three_title');
            $table->text('why_choose_us_card_one_description');
            $table->text('why_choose_us_card_two_description');
            $table->text('why_choose_us_card_three_description');
            $table->string('why_choose_us_card_one_icon')->nullable();
            $table->string('why_choose_us_card_two_icon')->nullable();
            $table->string('why_choose_us_card_three_icon')->nullable();

            $table->integer('statistic_one_number');
            $table->integer('statistic_two_number');
            $table->integer('statistic_three_number');
            $table->string('statistic_one_desc');
            $table->string('statistic_two_desc');
            $table->string('statistic_three_desc');
            $table->string('statistic_one_prefix')->nullable();
            $table->string('statistic_two_prefix')->nullable();
            $table->string('statistic_three_prefix')->nullable();

            $table->string('action_title')->nullable();
            $table->string('action_desc')->nullable();
            $table->string('action_btn_txt')->nullable();





            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_about_us');
    }
};
