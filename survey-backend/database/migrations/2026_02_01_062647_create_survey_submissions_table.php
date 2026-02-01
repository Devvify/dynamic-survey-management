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
        Schema::create('survey_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('survey_id')
                ->constrained('surveys')
                ->restrictOnDelete();
            $table->foreignId('submitted_by')
                ->constrained('users')
                ->restrictOnDelete();
            $table->timestamps();

            $table->index(['survey_id', 'created_at']);
            $table->index('submitted_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('survey_submissions');
    }
};
