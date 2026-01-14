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
        Schema::create('offers', function (Blueprint $table) {

            $table->id();

            $table->string('offer_code')->unique();
            $table->string('title');
            $table->string('slug')->unique();

            $table->foreignId('governorate_id')->constrained()->cascadeOnDelete();
            $table->foreignId('trip_type_id')->constrained()->cascadeOnDelete();
            $table->foreignId('company_id')->nullable()
                ->constrained('tour_companies')->nullOnDelete();

            $table->integer('duration_days');
            $table->decimal('price', 10, 2);
            $table->string('airline')->nullable();
            $table->text('program');

            $table->foreignId('hotel_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();


            $table->enum('tour_level', [
                'economical',
                'standard',
                'luxury',
                'vip'
            ])->default('economical');

            $table->boolean('is_special_offer')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_popular')->default(false);
            $table->boolean('is_active')->default(true);

            $table->date('start_date');
            $table->date('end_date');
            $table->integer('available_places');

            $table->string('whatsapp_number');

            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        Schema::dropIfExists('offers');
    }
};
