<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Destinacija;

class HotelFactory extends Factory
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
            'name' => $this->faker->company,
            'location' => $this->faker->address,
            'price' => $this->faker->randomFloat(2, 25, 500),
            'number_of_stars' => $this->faker->numberBetween(1, 5),
            'destination_id' => function () {
                return Destinacija::inRandomOrder()->first()->id;
            }
        ];
    }
}
