<?php

namespace App\Http\Controllers;

use App\Models\PlanPutovanja;
use App\Models\User;
use App\Models\Destinacija;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\PlanPutovanjaResource;

class PlanPutovanjaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();

        // Dohvati planove putovanja povezane s trenutnim korisnikom
        $planputovanjas = PlanPutovanja::where('user_id', $user->id)->get();

        return PlanPutovanjaResource::collection($planputovanjas);
    }

    public function getByDestination($destination)
    {
    $user = Auth::user();

    // Pronađi destination_id na osnovu naziva destinacije
    $destinationId = Destinacija::where('name', $destination)->value('id');

    if (!$destinationId) {
        return response()->json('Destinacija nije pronađena.', 404);
    }

    // Dohvati planove putovanja povezane s trenutnim korisnikom i određenom destinacijom
    $planputovanjas = PlanPutovanja::where('user_id', $user->id)
        ->where('destination_id', $destinationId)
        ->get();

    return PlanPutovanjaResource::collection($planputovanjas);
}
/**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
           // 'user_id' => 'required|exists:users,id',
            'destination_id' => 'required|exists:destinacijas,id',
            'duration' => 'required|numeric',
            'budget' => 'required|numeric',
            'date' => 'required|date'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }    
    
        $user = Auth::user(); // Dohvati trenutno ulogovanog korisnika

        // Konvertujemo datum u odgovarajući format
    $convertedDate = date('Y-m-d H:i:s', strtotime($request->date));

        $planPutovanja = PlanPutovanja::create([
            'user_id' => $user->id,
            'destination_id' => $request->destination_id,
            'duration' => $request->duration,
            'budget' => $request->budget,
            'date' =>  $convertedDate
        ]);

        return response()->json(['PlanPutovanja je uspesno sacuvan.', new PlanPutovanjaResource($planPutovanja)]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $planPutovanja_id
     * @return \Illuminate\Http\Response
     */
    public function show($planPutovanja_id)
    {
        $planPutovanja = PlanPutovanja::find($planPutovanja_id);

        if (is_null($planPutovanja)) {
            return response()->json('Plan putovanja nije pronadjen.', 404);
        }
        return new PlanPutovanjaResource($planPutovanja);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $planPutovanja_id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $planPutovanja_id)
    {
        $validator = Validator::make($request->all(), [
            //'user_id' => 'required|exists:users,id',
            'destination_id' => 'required|exists:destinacijas,id',
            'duration' => 'required|numeric',
            'budget' => 'required|numeric',
            'date' => 'required|date'
        ]);

        if ($validator->fails()) {
            return response()->json(["Validacija nije uspesna", $validator->errors()]);
        }

        $planPutovanja = PlanPutovanja::find($planPutovanja_id);

        if (!$planPutovanja) {
            return response()->json('Plan putovanja nije pronadjen.', 404);
        }
        
        if ($planPutovanja->user_id !== Auth::id()) {
            return response()->json('Nemate dozvolu za ažuriranje ovog plana putovanja.', 403);
        }
        //$planPutovanja->user_id = $request->user_id;
        $planPutovanja->destination_id = $request->destination_id;
        $planPutovanja->duration = $request->duration;
        $planPutovanja->budget = $request->budget;
        $planPutovanja->date = $request->date;

        $planPutovanja->save();

        return response()->json(['PlanPutovanja je azuriran.', new PlanPutovanjaResource($planPutovanja)]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $planPutovanja_id
     * @return \Illuminate\Http\Response
     */
    public function destroy($planPutovanja_id)
    {
        $planPutovanja = PlanPutovanja::find($planPutovanja_id);
        if (!$planPutovanja) {
            return response()->json('Plan putovanja nije pronadjen.', 404);
        }
        
    
        if ($planPutovanja->user_id !== Auth::id()) {
            return response()->json('Nemate dozvolu za brisanje ovog plana putovanja.', 403);
        }

        $planPutovanja->delete();
        return response()->json(['Plan putovanja je uspesno obrisan.', 204]);
    }
    

}
