<?php

namespace Database\Seeders;

use App\Models\Complex;
use App\Models\Establishment;
use App\Models\Region;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
       $regionId = DB::table('regions')->insertGetId([
            'code'          => 'BMKH',
            'name'          => 'Béni Mellal-Khénifra',
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);

        $complexId = DB::table('complexes')->insertGetId([
            'code'          => 'CFP-BM2',
            'name'          => 'Complexe de Formation Professionnelle Béni Mellal 2',
            'region_id'     => $regionId,
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);

        DB::table('establishments')->insertGetId([
            'code'          => 'ISTANTIC-BM',
            'name'          => 'Institut Spécialisé de Technologie Appliquée NTIC Béni Mellal',
            'complex_id'    => $complexId,
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);

        User::create([
            'code'          => 'ADMIN01',
            'first_name'    => 'Administrateur',
            'last_name'     => 'Système',
            'role'          => 'admin',
            'password'      => 'ADMIN01',
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);
    }
}
