<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PlanPutovanja;

class PlanPutovanjaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        PlanPutovanja::factory()->count(10)->create();
    }
}
