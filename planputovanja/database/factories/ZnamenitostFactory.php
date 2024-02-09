<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Destinacija;

class ZnamenitostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            //
        'name' => $this->faker->name,
        'description' => $this->faker->paragraph,
        'location' => $this->faker->address, // Korišćenje address metode za unos konkretnih adresa
        'price' => $this->faker->randomFloat(2, 0, 25),
        'destination_id' => Destinacija::inRandomOrder()->first()->id,
        ];
    }
}
