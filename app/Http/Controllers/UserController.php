<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

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
        return $users;
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
            'role' => 'required|string|max:100'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
            'role' => $request->role,
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
        return $user;
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
            'role' => 'required|string|max:100'
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
        $user->delete();
 
        return response()->json(['Korisnik je uspesno obrisan.', 204]);
    }
}
