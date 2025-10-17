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
        Schema::create('translations', function (Blueprint $table) {
            $table->id();
            $table->string('translatable_type'); // Model class name (e.g., 'App\Models\User')
            $table->unsignedBigInteger('translatable_id'); // ID of the model instance
            $table->string('field_name'); // Field name to translate (e.g., 'name', 'description')
            $table->string('locale', 5); // Language code (e.g., 'th', 'en', 'zh')
            $table->text('value'); // Translated value
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['translatable_type', 'translatable_id', 'field_name']);
            $table->index(['translatable_type', 'translatable_id', 'locale']);
            $table->unique(['translatable_type', 'translatable_id', 'field_name', 'locale'], 'unique_translation');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('translations');
    }
};
