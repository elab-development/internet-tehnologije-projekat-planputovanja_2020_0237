<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Znamenitost;
use App\Models\Hotel;

use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            RoleSeeder::class,
           ]);

        User::factory(10)->create();
        $this->call([
            DestinacijaSeeder::class,
            ZnamenitostSeeder::class,
            HotelSeeder::class,
            PlanPutovanjaSeeder::class
        ]);
        
        
       
        
    }
}
