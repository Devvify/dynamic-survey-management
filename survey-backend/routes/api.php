<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\SurveyController as AdminSurveyController;
use App\Http\Controllers\Api\Admin\SubmissionController as AdminSubmissionController;
use App\Http\Controllers\Api\Officer\SurveyController as OfficerSurveyController;
use App\Http\Controllers\Api\Officer\SubmissionController as OfficerSubmissionController;

Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // ---------- Admin ----------
    Route::prefix('admin')->middleware('role:admin')->group(function () {
        Route::get('/surveys', [AdminSurveyController::class, 'index']);
        Route::post('/surveys', [AdminSurveyController::class, 'store']);
        Route::get('/surveys/{survey}', [AdminSurveyController::class, 'show']);
        Route::delete('/surveys/{survey}', [AdminSurveyController::class, 'destroy']);

        Route::get('/surveys/{survey}/submissions', [AdminSubmissionController::class, 'index']);
        Route::get('/submissions/{submission}', [AdminSubmissionController::class, 'show']);
    });

    // ---------- Officer ----------
    Route::prefix('officer')->middleware('role:officer')->group(function () {
        Route::get('/surveys', [OfficerSurveyController::class, 'index']);
        Route::get('/surveys/{survey}', [OfficerSurveyController::class, 'show']);
        Route::post('/surveys/{survey}/submit', [OfficerSubmissionController::class, 'store']);
    });
});
