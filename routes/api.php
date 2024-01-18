<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\UserController;

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



Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{user_id}', [UserController::class, 'show']);
//Route::post('/users/store', [UserController::class, 'store']);
//Route::put('/users/{id}/update', [UserController::class, 'update']);
//Route::delete('/users/{id}', [UserController::class, 'destroy']);


Route::post('/register',[AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//Route::resource('users', UserController::class);
//Route::resource('destinacije', DestinacijaController::class);
//Route::resource('znamenitosti', ZnamenitostController::class);
//Route::resource('hoteli', HotelController::class);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });
   
   
    Route::resource('/planPutovanjas', PlanPutovanjaController::class)->only(['update','store','destroy']);

    // API route for logout user
    Route::post('/logout', [AuthController::class, 'logout']);
});
