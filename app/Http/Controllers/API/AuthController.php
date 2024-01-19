<?php

namespace App\Http\Controllers\API;


use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

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
            return response()->json(['message' => 'Unathorized'],401);
        }
        
        $user= User::where('email', $request['email'])->firstOrFail();

        if($user->role !== 'admin' && $user->role !== 'ulogovan'){
            $user->update(['role_id'=>'2']);
        }


        $token= $user->createToken('auth_token')->plainTextToken;

        return response()
            ->json(['message' => 'Hi ' .$user->name.', welcome to home','access_token'=> $token, 'token_type' => 'Bearer', ]);
    }

    public function logout(Request $request){

        $id=Auth::id();
        $user = Auth::user();

        if ($user->role !== 'admin' && $user->role !== 'neulogovan') {
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

        if ($request->email === $user->email) {
            $user->password = Hash::make($request->password);
            $user->save();
        }
        
        return response()->json($user);
    }
}