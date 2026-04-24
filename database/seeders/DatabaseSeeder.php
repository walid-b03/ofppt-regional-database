<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('users')->truncate();
        DB::table('establishments')->truncate();
        DB::table('complexes')->truncate();
        DB::table('regions')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $regionId = DB::table('regions')->insertGetId([
            'code'       => 'BMKH',
            'name'       => 'Béni Mellal-Khénifra',
            'email'      => 'bmkh@ofppt.ma',
            'phone'      => '+212 5 23 45 67 01',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $complexId = DB::table('complexes')->insertGetId([
            'code'       => 'CFP1',
            'name'      => 'Complexe de Formation Professionnelle 1',
            'email'     => 'cfp1@ofppt.ma',
            'phone'     => '+212 5 23 45 67 02',
            'city'      => 'Beni Mellal',
            'region_id' => $regionId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $establishmentId = DB::table('establishments')->insertGetId([
            'code'       => 'ISTANTICBM',
            'name'       => 'Institut Spécialisé de Technologie Appliquée NTIC Beni Mellal',
            'email'      => 'istantbm@ofppt.ma',
            'phone'      => '+212 5 23 45 67 03',
            'complex_id' => $complexId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $drrgId = DB::table('users')->insertGetId([
            'code'               => 'DRRG002',
            'first_name'         => 'Hassan',
            'last_name'          => 'Belkadi',
            'cin'                => 'HB456789',
            'email'             => 'hassan.belkadi@ofppt.ma',
            'phone'             => '+212 6 12 34 56 78',
            'role'               => 'DRRG',
            'role_label'         => 'Directeur Régional',
            'password'          => password_hash('password', PASSWORD_BCRYPT),
            'establishment_id'  => $establishmentId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $drcxId = DB::table('users')->insertGetId([
            'code'               => 'DRCX002',
            'first_name'         => 'Khadija',
            'last_name'          => 'Fikri',
            'cin'                => 'KF123456',
            'email'             => 'khadija.fikri@ofppt.ma',
            'phone'             => '+212 6 23 45 67 89',
            'role'               => 'DRCX',
            'role_label'         => 'Directeur de Complexe',
            'password'          => password_hash('password', PASSWORD_BCRYPT),
            'establishment_id'  => $establishmentId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $drpdId = DB::table('users')->insertGetId([
            'code'               => 'DRPD002',
            'first_name'         => 'Younes',
            'last_name'          => 'Amghar',
            'cin'                => 'YA789012',
            'email'             => 'younes.amghar@ofppt.ma',
            'phone'             => '+212 6 34 56 78 90',
            'role'               => 'DRPD',
            'role_label'         => 'Directeur Pédagogique',
            'password'          => password_hash('password', PASSWORD_BCRYPT),
            'establishment_id'  => $establishmentId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $agadId = DB::table('users')->insertGetId([
            'code'               => 'AGAD002',
            'first_name'         => 'Mounia',
            'last_name'          => 'Srhir',
            'cin'                => 'MS345678',
            'email'             => 'mounia.srhir@ofppt.ma',
            'phone'             => '+212 6 45 67 89 01',
            'role'               => 'AGAD',
            'role_label'         => 'Agent Administratif',
            'password'          => password_hash('password', PASSWORD_BCRYPT),
            'establishment_id'  => $establishmentId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $frmtId = DB::table('users')->insertGetId([
            'code'               => 'FRMT002',
            'first_name'         => 'Abdelali',
            'last_name'          => 'Ouahbi',
            'cin'                => 'AO901234',
            'email'             => 'abdelali.ouahbi@ofppt.ma',
            'phone'             => '+212 6 56 78 90 12',
            'role'               => 'FRMT',
            'role_label'         => 'Formateur',
            'password'          => password_hash('password', PASSWORD_BCRYPT),
            'establishment_id'  => $establishmentId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('users')->insert([
            'code'               => 'admin',
            'first_name'         => 'Administrateur',
            'last_name'          => 'Système',
            'cin'                => 'ADMIN01',
            'email'             => 'admin@ofppt.ma',
            'phone'             => '+212 6 00 00 00 00',
            'role'               => 'admin',
            'role_label'        => 'Administrateur',
            'password'          => password_hash('admin', PASSWORD_BCRYPT),
            'establishment_id'  => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('regions')->where('id', $regionId)->update(['head_id' => $drrgId]);
        DB::table('complexes')->where('id', $complexId)->update(['head_id' => $drcxId]);
        DB::table('establishments')->where('id', $establishmentId)->update(['head_id' => $drpdId]);

        $this->command->info('Seeded: 1 region (Béni Mellal-Khénifra), 1 complex (CFP1), 1 establishment (ISTA NTIC Beni Mellal), 5 users (DRRG, DRCX, DRPD, AGAD, FRMT) + admin');
    }
}
