<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Znamenitost extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'location', 'price', 'destination_id'];
     // Relacija sa destinacijom ako postoji
     public function destinacija()
     {
         return $this->belongsTo(Destinacija::class);
     }
 
     // Relacija sa planovima putovanja (mnoge znamenitosti mogu biti u više planova putovanja)
     public function planoviPutovanja()
     {
         return $this->belongsToMany(PlanPutovanja::class);
     }
}
