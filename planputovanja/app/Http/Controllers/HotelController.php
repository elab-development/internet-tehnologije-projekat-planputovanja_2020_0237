<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\HotelResource;
use Illuminate\Support\Facades\DB;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $hotels = Hotel::all();
        return HotelResource::collection($hotels);
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
            'location' => 'required|string',
            'price' => 'required|numeric',
            'number_of_stars' => 'required|integer',
            'destination_id' => 'required|exists:destinacijas,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $hotel = Hotel::create([
            'name' => $request->name,
            'location' => $request->location,
            'price' => $request->price,
            'number_of_stars' => $request->number_of_stars,
            'destination_id' => $request->destination_id,
           
        ]);

        return response()->json(['Hotel je uspesno sacuvan.', new HotelResource($hotel)]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Hotel  $hotel
     * @return \Illuminate\Http\Response
     */
    public function show($hotel_id)
    {
        //
        $hotel = Hotel::find($hotel_id);//find vraca 1 podatak

        if(is_null($hotel)){
            return response()->json('Hotel nije pronadjen.', 404);
        }
        return new HotelResource($hotel);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Hotel  $hotel
     * @return \Illuminate\Http\Response
     */
    public function edit(Hotel $hotel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Hotel  $hotel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $hotel_id)
    {
        //
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'location' => 'required|string',
            'price' => 'required|numeric',
            'number_of_stars' => 'required|integer',
            'destination_id' => 'required|exists:destinacijas,id'
        ]);

        if($validator->fails()){
            return response()->json(["Validacija nije uspesna",$validator->errors()]);
        }

        $hotel = Hotel::find($hotel_id);
        
        if (!$hotel) {
            return response()->json('Hotel nije pronadjen.', 404);
        }

        $hotel->name = $request->name;
        $hotel->location = $request->location;
        $hotel->price = $request->price;
        $hotel->number_of_stars = $request->number_of_stars;
        $hotel->destination_id = $request->destination_id;

        $hotel->save();
     
        return response()->json(['Hotel je azuriran.', new HotelResource($hotel)]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Hotel  $hotel
     * @return \Illuminate\Http\Response
     */
    public function destroy($hotel_id)
    {
        //
        $hotel = Hotel::find($hotel_id);
        if (!$hotel) {
            return response()->json('Hotel nije pronadjen.', 404);
        }
        $hotel->delete();
        return response()->json(['Hotel je uspesno obrisan.', 204]);
    }

    public function countByDestination()
{
    $hotelCounts = DB::table('hotels')
                    ->select('destinacijas.name as destination', DB::raw('count(*) as hotel_count'))
                    ->join('destinacijas', 'hotels.destination_id', '=', 'destinacijas.id')
                    ->groupBy('hotels.destination_id', 'destinacijas.name')
                    ->get();

    return response()->json($hotelCounts);
}
}
