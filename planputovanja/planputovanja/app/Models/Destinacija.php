<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destinacija extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'country', 'description'];

    // Relacija sa znamenitostima ako postoji
    public function znamenitosti()
    {
        return $this->hasMany(Znamenitost::class); // Veza hasMany
    }

    // Relacija sa hotelima ako postoji (jedna destinacija može imati više hotela)
    public function hoteli()
    {
        return $this->hasMany(Hotel::class);
    }

    // Relacija sa planovima putovanja (jedna destinacija može pripadati više planova putovanja)
    public function planoviPutovanja()
    {
        return $this->hasMany(PlanPutovanja::class);
    }
}
