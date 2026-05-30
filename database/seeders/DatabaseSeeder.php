<?php

namespace Database\Seeders;

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
            'code'       => 'BMKH',
            'name'       => 'Béni Mellal-Khénifra',
            'email'      => 'region.bmk@ofppt.ma',
            'phone'      => '0523480000',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $complexId = DB::table('complexes')->insertGetId([
            'code'       => 'CFP-BM2',
            'name'       => 'Complexe de Formation Professionnelle Béni Mellal 2',
            'email'      => 'cfp.bm2@ofppt.ma',
            'phone'      => '0523481111',
            'city'       => 'Béni Mellal',
            'region_id'  => $regionId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $establishmentId = DB::table('establishments')->insertGetId([
            'code'       => 'ISTANTIC-BM',
            'name'       => 'Institut Spécialisé de Technologie Appliquée NTIC Béni Mellal',
            'sector'     => 'Digital et Intelligence Artificielle',
            'type'       => 'Etablissement de Formation',
            'email'      => 'ista.ntic.bm@ofppt.ma',
            'phone'      => '0523423768',
            'address'    => 'Av. Mohammed VI, Mghila, Béni Mellal 23000',
            'complex_id' => $complexId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $admin = User::create([
            'code'                => 'ADMIN01',
            'first_name'          => 'Yassine',
            'last_name'           => 'Amrani',
            'cin'                 => 'AB123456',
            'marital_status'      => 'married',
            'children'            => 2,
            'email'               => 'admin@ofppt.ma',
            'phone'               => '0612345678',
            'address'             => '12 Rue Atlas, Béni Mellal',
            'date_of_birth'       => '1985-03-15',
            'date_of_recruitment' => '2010-09-01',
            'site_of_recruitment' => 'Rabat',
            'diploma'             => 'Master en Gestion des Ressources Humaines',
            'rank'                => 'A25',
            'role'                => 'admin',
            'password'            => 'ADMIN01',
        ]);

        $drrg = User::create([
            'code'                => 'DRRG01',
            'first_name'          => 'Karim',
            'last_name'           => 'Bensouda',
            'cin'                 => 'BB234567',
            'marital_status'      => 'married',
            'children'            => 3,
            'email'               => 'k.bensouda@ofppt.ma',
            'phone'               => '0613456789',
            'address'             => '45 Avenue Hassan II, Béni Mellal',
            'date_of_birth'       => '1978-07-22',
            'date_of_recruitment' => '2005-04-15',
            'site_of_recruitment' => 'Casablanca',
            'diploma'             => 'MBA en Management',
            'rank'                => 'A28',
            'role'                => 'DRRG',
            'password'            => 'DRRG01',
        ]);

        $drcx = User::create([
            'code'                => 'DRCX01',
            'first_name'          => 'Nabila',
            'last_name'           => 'Fassi',
            'cin'                 => 'CD345678',
            'marital_status'      => 'married',
            'children'            => 1,
            'email'               => 'n.fassi@ofppt.ma',
            'phone'               => '0614567890',
            'address'             => '8 Rue de la Liberté, Béni Mellal',
            'date_of_birth'       => '1983-11-08',
            'date_of_recruitment' => '2008-02-20',
            'site_of_recruitment' => 'Béni Mellal',
            'diploma'             => 'Master en Sciences de l\'Éducation',
            'rank'                => 'A24',
            'role'                => 'DRCX',
            'password'            => 'DRCX01',
        ]);

        $drpd = User::create([
            'code'                => 'DRPD01',
            'first_name'          => 'Hassan',
            'last_name'           => 'Ouahbi',
            'cin'                 => 'DE456789',
            'marital_status'      => 'married',
            'children'            => 2,
            'email'               => 'h.ouahbi@ofppt.ma',
            'phone'               => '0615678901',
            'address'             => '33 Boulevard Mohammed V, Béni Mellal',
            'date_of_birth'       => '1987-05-30',
            'date_of_recruitment' => '2011-10-01',
            'site_of_recruitment' => 'Béni Mellal',
            'diploma'             => 'Licence en Génie Informatique',
            'rank'                => 'A22',
            'role'                => 'DRPD',
            'password'            => 'DRPD01',
        ]);

        $frmt = User::create([
            'code'                => 'FRMT01',
            'first_name'          => 'Sara',
            'last_name'           => 'El Amrani',
            'cin'                 => 'EF567890',
            'marital_status'      => 'single',
            'children'            => 0,
            'email'               => 's.elamrani@ofppt.ma',
            'phone'               => '0616789012',
            'address'             => '17 Rue Oued El Makhazine, Béni Mellal',
            'date_of_birth'       => '1993-09-14',
            'date_of_recruitment' => '2018-09-01',
            'site_of_recruitment' => 'Béni Mellal',
            'diploma'             => 'Master en Intelligence Artificielle',
            'rank'                => 'E12',
            'role'                => 'FRMT',
            'password'            => 'FRMT01',
        ]);

        $agad = User::create([
            'code'                => 'AGAD01',
            'first_name'          => 'Mohamed',
            'last_name'           => 'Tazi',
            'cin'                 => 'FG678901',
            'marital_status'      => 'married',
            'children'            => 1,
            'email'               => 'm.tazi@ofppt.ma',
            'phone'               => '0617890123',
            'address'             => '5 Rue Al Amal, Béni Mellal',
            'date_of_birth'       => '1990-12-25',
            'date_of_recruitment' => '2016-03-15',
            'site_of_recruitment' => 'Béni Mellal',
            'diploma'             => 'Diplôme de Technicien en Gestion',
            'rank'                => 'D14',
            'role'                => 'AGAD',
            'password'            => 'AGAD01',
        ]);

        DB::table('users')->whereIn('id', [$drrg->id, $drcx->id, $drpd->id, $frmt->id, $agad->id])
            ->update(['establishment_id' => $establishmentId]);

        DB::table('regions')->where('id', $regionId)->update(['head_id' => $drrg->id]);
        DB::table('complexes')->where('id', $complexId)->update(['head_id' => $drcx->id]);
        DB::table('establishments')->where('id', $establishmentId)->update(['head_id' => $drpd->id]);
    }
}
