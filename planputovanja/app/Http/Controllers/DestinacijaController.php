<?php

namespace App\Http\Controllers;

use App\Models\Destinacija;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\DestinacijaResource;

class DestinacijaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $destinacijas = Destinacija::all();
        return DestinacijaResource::collection($destinacijas);
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
            'name' => 'required|string',
            'country' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $destinacija = Destinacija::create([
            'name' => $request->name,
            'country' => $request->country,
           
        ]);

        return response()->json(['Destinacija je sacuvana.', new DestinacijaResource($destinacija)]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Destinacija  $destinacija
     * @return \Illuminate\Http\Response
     */
    public function show($destinacija_id)
    {
        //
        $destinacija = Destinacija::find($destinacija_id);

        if(is_null($destinacija)){
            return response()->json('Destinacija nije pronadjena.', 404);
        }
        //return response()->json($kategorija);
        return new DestinacijaResource($destinacija);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Destinacija  $destinacija
     * @return \Illuminate\Http\Response
     */
    public function edit(Destinacija $destinacija)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Destinacija  $destinacija
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $destinacija_id)
    {
        //
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'country' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $destinacija = Destinacija::find($destinacija_id);
        if (!$destinacija) {
            return response()->json('Destinacija nije pronadjena.', 404);
        }
     
        $destinacija->name = $request->name;
        $destinacija->country = $request->country;

        $destinacija->save();
     
        return response()->json(['Destinacija je azurirana', new DestinacijaResource($destinacija)]); 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Destinacija  $destinacija
     * @return \Illuminate\Http\Response
     */
    public function destroy($destinacija_id)
    {
        //
        $destinacija = Destinacija::find($destinacija_id);
        if (!$destinacija) {
            return response()->json('Destinacija nije pronadjena.', 404);
        }
        $destinacija->delete();
 
        return response()->json(['Destinacija je uspesno obrisana', 204]);
    }
}
