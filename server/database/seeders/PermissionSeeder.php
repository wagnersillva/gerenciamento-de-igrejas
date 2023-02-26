<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionSeeder extends Seeder
{

    private $defaultKeysPrefix = ['read', 'edit', 'create', 'delete'];

    private $keys = array(
        array(
            "key" => "user",
            "permissionAdditional" => [
                "read-user-details"
            ]
        ),
        array("key" => "church-job"),
        array("key" => "role"),
        array("key" => "church"),
    );

    private function createOrUpdate(String $keyLabel): void
    {
        $permission = Permission::query()->where('key', $keyLabel)->first();

        $params = [
            "key" => $keyLabel
        ];

        if($permission == null){
            $params['created_at'] = now();
            Permission::create($params);
        } else {
            $params['updated_at'] = now();
            $permission->update($params);
        }
    }

    private function addPermissionInAdmin($permissions){
        $role = Role::query()->where('is_admin', 1)->first();

        if($role){
            $ids = [];
            $listpermissions = Permission::query()->whereIn('key', $permissions)->get();

            foreach ($listpermissions as $permission){
                $ids[] = $permission->id;
            }

            $role->permissions()->sync($ids);
            $role->update();
        }
    }

    public function run()
    {

        $keys = [];

        foreach ($this->keys as $keyPermission){
            $key = $keyPermission["key"];
            $permissionAdditional = array_key_exists("permissionAdditional", $keyPermission) ? $keyPermission["permissionAdditional"] : [];

            foreach ($this->defaultKeysPrefix as $keyPrefix){
                $keyLabel = $keyPrefix . "-" . $key;
                $this->createOrUpdate($keyLabel);
                $keys[] = $keyLabel;
            }

            foreach ($permissionAdditional as $keyLabel){
                $this->createOrUpdate($keyLabel);
                $keys[] = $keyLabel;
            }
        }

        Permission::query()->whereNotIn('key', $keys)->delete();
        $this->addPermissionInAdmin($keys);
    }
}
