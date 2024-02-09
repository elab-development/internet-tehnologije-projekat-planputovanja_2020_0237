<?php

namespace App\Http\Controllers\API;


use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Password;
use App\Mail\ResetPasswordMail;
use App\Mail\ForgotPasswordNotification;


class AuthController extends Controller
{
    //
    public function register(Request $request){
    $validator = Validator::make($request->all(),[

        'name' => 'required |string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8',
        'role_name'=>'string|max:40'
    ]);
    if($validator->fails()){
        return response()->json($validator->errors());
    }
   if($request->has('role_name')){
    $role = Role::where('role_name', $request->role_name)->first();
    if (!$role) {
        return response()->json(['error' => 'Uloga nije pronadjena.'], 404);
    }
    }else {
        // Postavljanje defaultne uloge ako 'role_name' nije postavljen
        $role = Role::where('role_name', 'neulogovan')->first();
        if (!$role) {
            return response()->json(['error' => 'Defaultna uloga nije pronadjena.'], 404);
        }
    }
    $user = User::create([

        'name' => $request->name,
        'email' =>$request->email,
        'password' => Hash::make($request ->password),
        'role_id'=>$role->id
    ]);
        

    $token = $user->createToken('auth_token') ->plainTextToken;

    return response() ->json([ 'data' => $user, 'access_token' => $token, 'token_type' =>
'Bearer', ]);
    }
    public function login(Request $request){
        if(!Auth::attempt($request->only('email', 'password'))){
            return response()->json(['success'=>false,'message' => 'Unathorized'],401);
        }
        
        $user= User::where('email', $request['email'])->firstOrFail();

        if($user->role_id !== 1 && $user->role_id !== 2){
            $user->update(['role_id'=>'2']);
        }


        $token= $user->createToken('auth_token')->plainTextToken;

        return response()
            ->json(['success'=>true, 'message' => 'Hi ' .$user->name.', welcome to home','user' => $user,'access_token'=> $token, 'token_type' => 'Bearer', ]);
    }

    public function logout(Request $request){

        $id=Auth::id();
        $user = Auth::user();

        if ($user->role_id !== 1 && $user->role_id !== 3) {
            $user->update(['role_id' => '3']);
        }
       $request->user()->tokens()->delete();
       return response()->json(['message'=> 'Uspesno izlogovan!']);
    }

    public function forgotPassword(Request $request)
{   
    $request->validate([
        'email' => 'required',
        'password' => 'required|string|min:8'
    ]);

    $user = User::where('email', $request->email)->first();
    if (!$user) {
        return response()->json(['error' => 'Korisnik nije pronadjen!'], 404);
    }

    // Ažuriranje lozinke
    if ($request->email === $user->email) {
        $user->password = Hash::make($request->password);
        $user->save();

        // Slanje e-pošte obaveštenja
        $user->notify(new ForgotPasswordNotification($user));
    }
    
    return response()->json($user);
}

    
    public function forgottpassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);
    
        $user = User::where('email', $request->email)->first();
    
        if (is_null($user)) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        $token = Password::createToken($user);
    
        Mail::to($user->email)->send(new \App\Mail\ResetPasswordMail($token));
    
        return response()->json(['message' => 'Email with password reset link sent']);
    }
    
    public function resetpassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:9',
            'password_confirmation' => 'required|string|same:password',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
    
        $user = User::where('email', $request->email)->first();
    
        if (is_null($user)) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        $user->password = Hash::make($request->password);
        $user->save();
    
        return response()->json(['message' => 'Password changed successfully: ' . $user->email]);
    }
}
    