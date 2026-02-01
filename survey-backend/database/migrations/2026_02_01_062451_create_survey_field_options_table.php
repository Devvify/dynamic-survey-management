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
        Schema::create('survey_field_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('field_id')
                ->constrained('survey_fields')
                ->cascadeOnDelete();
            $table->string('label');
            $table->string('value');
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['field_id', 'value']);
            $table->index(['field_id', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('survey_field_options');
    }
};
