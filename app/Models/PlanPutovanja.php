<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanPutovanja extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'destination_id', 'duration', 'budget', 'date', 'description'];

     // Relacija sa znamenitostima
    public function znamenitosti()
    {
        return $this->belongsToMany(Znamenitost::class); // Veza Many-to-Many
    }

    // Relacija sa hotelima
    public function hoteli()
    {
        return $this->belongsToMany(Hotel::class); // Veza Many-to-Many
    }

    // Relacija sa korisnikom
    public function korisnik()
    {
        return $this->belongsTo(User::class);
    }

    // Relacija sa destinacijom (jedan plan putovanja pripada jednoj destinaciji)
    public function destinacija()
    {
        return $this->belongsTo(Destinacija::class);
    }
}
