<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    // Roles
    //   -> user
    //   -> admin -> acesso total
    //   -> secretary -> secretaria / membros
    //   -> educational-coordinator -> módulo educacional
    //   -> treasure(tesoureiro) ->  -> financeiro

    private $listRoles = ['user', 'admin', 'secretary', 'educational-coordinator', 'treasure'];


    private function createOrUpdate(String $keyLabel): void
    {
        $role = Role::query()->where('key', $keyLabel)->first();

        $params = [
            "key" => $keyLabel
        ];

        if($role == null){
            $params['created_at'] = now();
            Role::create($params);
        } else {
            $params['updated_at'] = now();
            $role->update($params);
        }
    }

    public function run()
    {
        $roles = [];

        foreach ($this->listRoles as $currentRole){
            $this->createOrUpdate($currentRole);
            $roles[] = $currentRole;
        }

        Role::query()->whereNotIn('key', $roles)->delete();
    }
}
