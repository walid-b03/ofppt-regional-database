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
            'email'         => 'bmkh@ofppt.ma',
            'phone'         => '+212 5 23 45 67 01',
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);

        $complexId = DB::table('complexes')->insertGetId([
            'code'          => 'CFP1',
            'name'          => 'Complexe de Formation Professionnelle Béni Mellal 2',
            'email'         => 'cfp1@ofppt.ma',
            'phone'         => '+212 5 23 45 67 02',
            'city'          => 'Béni Mellal',
            'region_id'     => $regionId,
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);

        $establishmentId = DB::table('establishments')->insertGetId([
            'code'          => 'ISTANTIC-BM',
            'name'          => 'Institut Spécialisé de Technologie Appliquée NTIC Béni Mellal',
            'sector'        => 'Digital et Intelligence Artificielle',
            'type'          => 'Etablissement de Formation',
            'email'         => 'istantbm@ofppt.ma',
            'phone'         => '+212 5 23 45 67 03',
            'address'       => 'Avenue Hassan II, Béni Mellal',
            'complex_id'    => $complexId,
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);

        $drrg = User::create([
            'code'                  => 'DRRG002',
            'first_name'            => 'Hassan',
            'last_name'             => 'Belkadi',
            'cin'                   => 'HB456789',
            'marital_status'        => 'married',
            'children'              => 2,
            'email'                 => 'hassan.belkadi@ofppt.ma',
            'phone'                 => '+212 6 12 34 56 78',
            'address'               => 'Rue Mohammed V, Béni Mellal',
            'date_of_birth'         => '1975-03-12',
            'date_of_recruitment'   => '2000-09-01',
            'site_of_recruitment'   => 'Béni Mellal',
            'diploma'               => 'Doctorat en Gestion',
            'rank'                  => 'A1',
            'role'                  => 'DRRG',
            'password'              => 'password',
            'establishment_id'      => $establishmentId,
        ]);

        $drcx = User::create([
            'code'                  => 'DRCX002',
            'first_name'            => 'Khadija',
            'last_name'             => 'Fikri',
            'cin'                   => 'KF123456',
            'marital_status'        => 'married',
            'children'              => 1,
            'email'                 => 'khadija.fikri@ofppt.ma',
            'phone'                 => '+212 6 23 45 67 89',
            'address'               => 'Quartier administratif, Béni Mellal',
            'date_of_birth'         => '1980-07-22',
            'date_of_recruitment'   => '2003-02-15',
            'site_of_recruitment'   => 'Béni Mellal',
            'diploma'               => 'Master en Management',
            'rank'                  => 'A1',
            'role'                  => 'DRCX',
            'password'              => 'password',
            'establishment_id'      => $establishmentId,
        ]);

        $drpd = User::create([
            'code'                  => 'DRPD002',
            'first_name'            => 'Younes',
            'last_name'             => 'Amghar',
            'cin'                   => 'YA789012',
            'marital_status'        => 'single',
            'children'              => 0,
            'email'                 => 'younes.amghar@ofppt.ma',
            'phone'                 => '+212 6 34 56 78 90',
            'address'               => 'Av. Hassan I, Béni Mellal',
            'date_of_birth'         => '1985-11-05',
            'date_of_recruitment'   => '2008-09-15',
            'site_of_recruitment'   => 'Casablanca',
            'diploma'               => 'Master en Sciences de l\'Éducation',
            'rank'                  => 'A2',
            'role'                  => 'DRPD',
            'password'              => 'password',
            'establishment_id'      => $establishmentId,
        ]);

        $agad = User::create([
            'code'                  => 'AGAD002',
            'first_name'            => 'Mounia',
            'last_name'             => 'Srhir',
            'cin'                   => 'MS345678',
            'marital_status'        => 'married',
            'children'              => 3,
            'email'                 => 'mounia.srhir@ofppt.ma',
            'phone'                 => '+212 6 45 67 89 01',
            'address'               => 'Rue Atlas, Béni Mellal',
            'date_of_birth'         => '1990-04-18',
            'date_of_recruitment'   => '2013-01-10',
            'site_of_recruitment'   => 'Béni Mellal',
            'diploma'               => 'Licence en Administration',
            'rank'                  => 'A3',
            'role'                  => 'AGAD',
            'password'              => 'password',
            'establishment_id'      => $establishmentId,
        ]);

        $frmt = User::create([
            'code'                  => 'FRMT002',
            'first_name'            => 'Abdelali',
            'last_name'             => 'Ouahbi',
            'cin'                   => 'AO901234',
            'marital_status'        => 'single',
            'children'              => 0,
            'email'                 => 'abdelali.ouahbi@ofppt.ma',
            'phone'                 => '+212 6 56 78 90 12',
            'address'               => 'Quartier Irfane, Béni Mellal',
            'date_of_birth'         => '1988-09-30',
            'date_of_recruitment'   => '2015-10-01',
            'site_of_recruitment'   => 'Fès',
            'diploma'               => 'Master en Génie Logiciel',
            'rank'                  => 'A2',
            'role'                  => 'FRMT',
            'password'              => 'password',
            'establishment_id'      => $establishmentId,
        ]);

        User::create([
            'code'                  => 'admin',
            'first_name'            => 'Administrateur',
            'last_name'             => 'Système',
            'cin'                   => 'ADMIN01',
            'email'                 => 'admin@ofppt.ma',
            'phone'                 => '+212 6 00 00 00 00',
            'role'                  => 'admin',
            'password'              => 'admin',
            'establishment_id'      => null,
        ]);

        DB::table('regions')->where('id', $regionId)->update(['head_id' => $drrg->id]);
        DB::table('complexes')->where('id', $complexId)->update(['head_id' => $drcx->id]);
        DB::table('establishments')->where('id', $establishmentId)->update(['head_id' => $drpd->id]);

        $this->command->info('Seeded: 1 region (Béni Mellal-Khénifra), 1 complex (CFP1), 1 establishment (ISTA NTIC Beni Mellal), 5 users (DRRG, DRCX, DRPD, AGAD, FRMT) + admin');
    }
}
