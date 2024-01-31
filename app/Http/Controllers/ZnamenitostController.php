<?php

namespace App\Http\Controllers;

use App\Models\Znamenitost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ZnamenitostResource;

class ZnamenitostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($destination_id)
{
    $znamenitosti = Znamenitost::where('destination_id', $destination_id)->get();
    return ZnamenitostResource::collection($znamenitosti);
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
            'description' => 'required|string',
            'location' => 'required|string',
            'price' => 'required|numeric',
            'destination_id' => 'required|exists:destinacijas,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $znamenitost = Znamenitost::create([
            'name' => $request->name,
            'description' => $request->description,
            'location' => $request->location,
            'price' => $request->price,
            'destination_id' => $request->destination_id,
           
        ]);

        return response()->json(['Znamenitost je uspesno sacuvan.', new ZnamenitostResource($znamenitost)]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Znamenitost  $znamenitost
     * @return \Illuminate\Http\Response
     */
    public function show($znamenitost_id)
    {
        //
        $znamenitost = Znamenitost::find($znamenitost_id);//find vraca 1 podatak

        if(is_null($znamenitost)){
            return response()->json('Znamenitost nije pronadjen.', 404);
        }
        return new ZnamenitostResource($znamenitost);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Znamenitost  $znamenitost
     * @return \Illuminate\Http\Response
     */
    public function edit(Znamenitost $znamenitost)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Znamenitost  $znamenitost
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $znamenitost_id)
    {
        //
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'location' => 'required|string',
            'price' => 'required|numeric',
            'destination_id' => 'required|exists:destinacijas,id'
        ]);

        if($validator->fails()){
            return response()->json(["Validacija nije uspesna",$validator->errors()]);
        }

        $znamenitost = Znamenitost::find($znamenitost_id);
        
        if (!$znamenitost) {
            return response()->json('Znamenitost nije pronadjen.', 404);
        }

        $znamenitost->name = $request->name;
        $znamenitost->description = $request->description;
        $znamenitost->location = $request->location;
        $znamenitost->price = $request->price;
        $znamenitost->destination_id = $request->destination_id;

        $znamenitost->save();
     
        return response()->json(['Znamenitost je azuriran.', new ZnamenitostResource($znamenitost)]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Znamenitost  $znamenitost
     * @return \Illuminate\Http\Response
     */
    public function destroy($znamenitost_id)
    {
        //
        $znamenitost = Znamenitost::find($znamenitost_id);
        if (!$znamenitost) {
            return response()->json('Znamenitost nije pronadjena.', 404);
        }
        $znamenitost->delete();
        return response()->json(['Znamenitost je uspesno obrisana.', 204]);
    }
}
