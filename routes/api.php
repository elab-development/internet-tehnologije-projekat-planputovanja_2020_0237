<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DestinacijaController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\PDFExportController;
use App\Http\Controllers\PlanPutovanjaController;
use App\Http\Controllers\ZnamenitostController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::resource('destinacije', DestinacijaController::class)->only(['index','show']);
//Route::resource('znamenitosti', ZnamenitostController::class);
//Route::resource('hoteli', HotelController::class);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


//Route::post('/users/store', [UserController::class, 'store']);
//Route::put('/users/{id}/update', [UserController::class, 'update']);
//Route::delete('/users/{id}', [UserController::class, 'destroy']);

//samo za ulogovane
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });
    
   // Route::get('/user', [UserController::class, 'show']);
   Route::get('/users', [UserController::class, 'index'])->middleware('accessControl:1');
   Route::get('/users/{id}', [UserController::class, 'show'])->middleware('accessControl:1');
   Route::delete('/users/{id}', [UserController::class, 'destroy'])->middleware('accessControl:1');

   Route::get('/planPutovanja', [PlanPutovanjaController::class, 'index'])->middleware('accessControl:1');

   //Login user moze da kreira, izmenjuje i brise svoja putovanja
   Route::post('/storePlanPutovanja', [PlanPutovanjaController::class, 'store'])->middleware('accessControl:2');
   Route::put('/updatePlanPutovanja/{id}', [PlanPutovanjaController::class, 'update'])->middleware('accessControl:2');
   Route::delete('/deletePlanPutovanja/{id}', [PlanPutovanjaController::class, 'destroy'])->middleware('accessControl:2');

   Route::post('/logout', [AuthController::class, 'logout']);

});
Route::post('forgot/password',[AuthController::class,'forgotPassword']);