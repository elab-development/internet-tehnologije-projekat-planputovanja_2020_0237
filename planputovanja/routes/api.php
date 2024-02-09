<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\API\AuthController;

use App\Http\Controllers\CacheController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DestinacijaController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\PDFExportController;
use App\Http\Controllers\PlanPutovanjaController;
use App\Http\Controllers\ZnamenitostController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\FileUploadController;

use Illuminate\Auth\Events\PasswordReset;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
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


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/forgotpassword', [AuthController::class, 'forgotpassword']);
Route::post('/resetpassword', [AuthController::class, 'resetpassword']);
Route::get('/hotel', [HotelController::class, 'index']);

Route::get('/znamenitost/{destination_id}', [ZnamenitostController::class, 'index']);
//samo za ulogovane
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });
    
   
   Route::get('/users', [UserController::class, 'index'])->middleware('accessControl:1');
   Route::get('/users/{id}', [UserController::class, 'show'])->middleware('accessControl:1');
   Route::delete('/users/{id}', [UserController::class, 'destroy']);

   //admin moze da dodaje i brise destinacije
   Route::resource('/destinacija', DestinacijaController::class)->only(['store','destroy'])->middleware('accessControl:1');
   
   //admin moze da dodaje i brise znamenitosti
   Route::resource('/znamenitost', ZnamenitostController::class)->only(['store','destroy'])->middleware('accessControl:1');

   //admin moze da dodaje i brise hotele
   Route::resource('/hotel', HotelController::class)->only(['store','destroy'])->middleware('accessControl:1');
   Route::get('/hotel/count-by-destination', [HotelController::class,'countByDestination'])->middleware('accessControl:1');;
   //Prikaz korisniku svih destinacija
   Route::get('/destinacija', [DestinacijaController::class, 'index'])->middleware('accessControl:2');
   Route::get('/destinacija/{id}', [DestinacijaController::class, 'show'])->middleware('accessControl:2');
  
   
   //Eksport podataka u pdf-u
   Route::get('/export-pdf', [PDFExportController::class, 'exportPDF'])->middleware('accessControl:2');

   //Ulogovan korisnik moze da vidi, kreira, izmenjuje i brise svoja putovanja
   Route::get('/planPutovanja', [PlanPutovanjaController::class, 'index'])->middleware('accessControl:2');
   Route::post('/storePlanPutovanja', [PlanPutovanjaController::class, 'store'])->middleware('accessControl:2');
   Route::put('/updatePlanPutovanja/{id}', [PlanPutovanjaController::class, 'update'])->middleware('accessControl:2');
   Route::delete('/deletePlanPutovanja/{id}', [PlanPutovanjaController::class, 'destroy'])->middleware('accessControl:2');
   Route::get('/planPutovanja/{name}', [PlanPutovanjaController::class, 'getByDestination'])->middleware('accessControl:2');
  // Route::get('/planPutovanja/page/{page}/perPage/{perPage}', [PlanPutovanjaController::class, 'getPlansByPage'])->middleware('accessControl:2');

   Route::get('/file', [FileUploadController::class, 'getFiles'])->middleware('accessControl:1');;
   Route::post('/logout', [AuthController::class, 'logout']);

});
//zaboravljena lozinka
Route::post('forgot/password',[AuthController::class,'forgotPassword']);
// data caching
Route::get('/cache', [CacheController::class, 'index']);
Route::post('/upload', [FileUploadController::class, 'upload']);
