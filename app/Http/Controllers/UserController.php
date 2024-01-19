<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $users = User::all();
        return UserResource::collection($users);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'email'=> 'required|string|email|max:255|unique:users',
            'password'=>'required|string|min:8',
            'address'=> 'required|string|max:100',
            'phone_number'=> 'required|string|min:10',
            'role_name' => 'required|string' // Add validation for role_name
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }
         // Find the role by name
         $role = Role::where('role_name', $request->role_name)->first();

         if (!$role) {
            return response()->json(['error' => 'Uloga ne postoji.'], 404);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
            'role_id' => $role->id // Use the retrieved role_id
        ]);

        

        return response()->json(['Korisnik je sacuvan', new UserResource($user)]);
    
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($user_id)
    {
        //
        $user = User::find($user_id);
        if (is_null($user)) {
            return response()->json('Korisnik nije pronadjen', 404);
        }
        return new UserResource($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $user_id)
    {
        //
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'email'=> 'required|string|email|max:255|unique:users',
            'password'=>'required|string|min:8',
            'address'=> 'required|string|max:100',
            'phone_number'=> 'required|string|min:10',
            'role_name' => 'required|string' // Add validation for role_name
        ]);

        if($validator->fails()){
            return response()->json(["Validacija nije uspesna",$validator->errors()]);
        }

        $user = User::find($user_id);
     
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->address = $request->address;
        $user->phone_number = $request->phone_number;
        $user->role = $request->role;

        $user->save();
     
        return response()->json(['Korisnik je azuriran', new UserResource($user)]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($user_id)
    {
        //
        $user = User::find($user_id);
        if (!$user) {
            return response()->json('Korisnik nije pronadjen.', 404);
        }
        $user->delete();
 
        return response()->json(['Korisnik je uspesno obrisan.', 204]);
    }
}
