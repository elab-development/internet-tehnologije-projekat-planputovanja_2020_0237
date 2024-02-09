<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Destinacija;

class PlanPutovanjaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id'  => User::inRandomOrder()->first()->id,
            'destination_id' => Destinacija::inRandomOrder()->first()->id,
            'duration' => $this->faker->numberBetween(1, 14), // Primer: Trajanje od 1 do 14 dana
            'budget' => $this->faker->randomFloat(2, 100, 5000), // Primer: Budžet od 100 do 5000
            'date' => $this->faker->dateTimeBetween('now', '+1 year')->format('Y-m-d H:i:s')
        ];
    }
}
