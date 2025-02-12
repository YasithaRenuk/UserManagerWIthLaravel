<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
        public function run(){

            // Create roles
            $adminRole = Role::create(['name' => 'admin']);
            $editorRole = Role::create(['name' => 'editor']);
            $userRole = Role::create(['name' => 'user']);

            // Create permissions
            $createPostPermission = Permission::create(['name' => 'create posts']);
            $editPostPermission = Permission::create(['name' => 'edit posts']);
            $deletePostPermission = Permission::create(['name' => 'delete posts']);

            // Assign permissions to roles
            $adminRole->givePermissionTo([$createPostPermission, $editPostPermission, $deletePostPermission]);
            $editorRole->givePermissionTo([$createPostPermission, $editPostPermission]);
            
        }
}
