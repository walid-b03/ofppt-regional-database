<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'code'       => 'admin',
            'first_name' => 'Administrateur',
            'last_name'  => 'Système',
            'password'   => Hash::make('admin'),
            'role'       => 'admin',
        ]);
    }
}
