<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'survey.create',
            'survey.update',
            'survey.delete',
            'survey.view',
            'submission.view',
            'submission.create',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }

        $admin = Role::firstOrCreate(['name' => 'admin']);
        $officer = Role::firstOrCreate(['name' => 'officer']);

        $admin->syncPermissions([
            'survey.create','survey.update','survey.delete','survey.view','submission.view'
        ]);

        $officer->syncPermissions([
            'survey.view','submission.create'
        ]);
    }
}
