<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChurchesController;
use App\Http\Controllers\Api\ChurchJobController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\TestesController;

Route::post('/auth/register', [AuthController::class, 'createUser']);
Route::post('/auth/login', [AuthController::class, 'loginUser']);

Route::group(['middleware' => 'auth:sanctum', 'cors'], function(){
    Route::get('/auth/check', [AuthController::class, 'checkToken']);
    Route::get('/auth/permissions', [AuthController::class, 'permissions']);
    Route::put('/auth/changed-password/{id}', [AuthController::class, 'changedPassword']);
    Route::put('/auth/change-church', [AuthController::class, 'changeChurch']);

    Route::get('users/prepare-edit/{id}', [UserController::class, 'prepareEdit']);
    Route::get('users/prepare-save', [UserController::class, 'prepareSave']);
    Route::resource('users', UserController::class);

    Route::get('churchJobs/prepare-edit/{id}', [ChurchJobController::class, 'prepareEdit']);
    Route::resource('churchJobs', ChurchJobController::class);

    Route::get('roles/prepare-edit/{id}', [RoleController::class, 'prepareEdit']);
    Route::get('roles/prepare-save', [RoleController::class, 'prepareSave']);
    Route::resource('roles', RoleController::class);

    Route::get('churches/prepare-edit/{id}', [ChurchesController::class, 'prepareEdit']);
    Route::resource('churches', ChurchesController::class);
});


