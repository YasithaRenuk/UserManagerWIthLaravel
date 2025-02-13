<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create the admin role if it doesn't exist
        $adminRole = Role::firstOrCreate([
            'name' => 'admin',
        ]);

        // Create the admin user
        $adminUser = User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('123456789'),
        ]);

        // Assign the admin role to the admin user
        $adminUser->roles()->attach($adminRole->id);
    }
}