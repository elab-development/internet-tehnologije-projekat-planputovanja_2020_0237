<?php

namespace Database\Seeders;

use App\Models\Destinacija;
use Illuminate\Database\Seeder;

class DestinacijaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Destinacija::insert([
            ['name'=>'Pariz',
             'country'=>'Francuska'],

             ['name'=>'Istanbul',
             'country'=>'Turska'],

             ['name'=>'Rim',
             'country'=>'Italija'],

             ['name'=>'New York',
             'country'=>'USA'],

             ['name'=>'Amsterdam',
             'country'=>'Holandija'],

             ['name'=>'Beč',
             'country'=>'Austrija'],

             ['name'=>'Budimpešta',
             'country'=>'Mađarska'],

             ['name'=>'Prag',
             'country'=>'Češka'],

             ['name'=>'Madrid',
             'country'=>'Španija'],

             ['name'=>'Barselona',
             'country'=>'Španija']

        ]);
    }
}
