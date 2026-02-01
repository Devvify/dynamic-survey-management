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
        Schema::create('submission_answers', function (Blueprint $table) {
             $table->id();
            $table->foreignId('submission_id')
                ->constrained('survey_submissions')
                ->cascadeOnDelete();
            $table->foreignId('field_id')
                ->constrained('survey_fields')
                ->restrictOnDelete();
            $table->text('value_text')->nullable();
            $table->json('value_json')->nullable();
            $table->timestamps();

            $table->unique(['submission_id', 'field_id']);
            $table->index('submission_id');
            $table->index('field_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submission_answers');
    }
};
