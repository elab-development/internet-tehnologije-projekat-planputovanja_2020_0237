<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'location', 'price', 'number_of_stars', 'destination_id'];

    // Relacija sa destinacijom
    public function destinacija()
    {
        return $this->belongsTo(Destinacija::class);
    }
}
