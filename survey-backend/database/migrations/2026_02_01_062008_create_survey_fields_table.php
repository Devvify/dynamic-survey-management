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
        Schema::create('survey_fields', function (Blueprint $table) {
            $table->id();
            $table->foreignId('survey_id')
                ->constrained('surveys')
                ->cascadeOnDelete();
            $table->string('key', 64);
            $table->string('label');
            $table->enum('type', ['text', 'checkbox', 'radio', 'select']);
            $table->boolean('is_required')->default(false);
            $table->string('help_text')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['survey_id', 'key']);
            $table->index(['survey_id', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('survey_fields');
    }
};
