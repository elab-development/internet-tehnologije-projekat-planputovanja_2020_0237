<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Znamenitost;

class ZnamenitostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Znamenitost::factory(50)->create();
    }
}
