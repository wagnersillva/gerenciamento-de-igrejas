<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionSeeder extends Seeder
{

    private $defaultKeysPrefix = ['read', 'edit', 'create', 'delete'];

    // user, read-user-details, ministerial-position, ecclesiastical-office, secretary, study, role, church, dashboard, dashboard-user, dashboard-finance, dashboard-study

    private $keys = array(
        array(
            "key" => "user",
            "permissionAdditional" => [
                "read-user-details"
            ]
        ),
        array("key" => "ministerial-position"), // será modificado para ministerial-position - cargos ministeriais
        array("key" => "ecclesiastical-office"), // cargos eclesiasticos
        array("key" => "secretary"),
        array("key" => "finance"),
        array("key" => "study"),
        array("key" => "role"),
        array("key" => "church"),

        array("key" => "dashboard"),
        array("key" => "dashboard-user"),
        array("key" => "dashboard-finance"),
        array("key" => "dashboard-study"),
    );

    private function updateNamePermission(String $currentKey, String $newKey): void
    {
        $permission = Permission::query()->where('key', $currentKey)->first();

        if($permission){
            $permission->update(['key' => $newKey]);
        }

    }

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


    private function addPermissionsInRole($roleKey, $permissionsForRole, $additionalPermissions = []){
        $role = Role::query()->where('key', $roleKey)->first();
        $completePermissionsForRole = [];

        foreach ($this->defaultKeysPrefix as $keyPrefix){
            foreach ($permissionsForRole as $permission){
                $completePermissionsForRole[] = "$keyPrefix-$permission";
            }
        }

        $completePermissionsForRole = array_merge_recursive_distinct($completePermissionsForRole, $additionalPermissions);

        if($role){
            $ids = [];
            $listpermissions = Permission::query()->whereIn('key', $completePermissionsForRole)->get();

            foreach ($listpermissions as $permission){
                $ids[] = $permission->id;
            }

            $role->permissions()->sync($ids);
            $role->update();
        }

    }

    private function addPermissionInAdmin(){
        $permissionsAdmin = ['user', 'ministerial-position', 'ecclesiastical-office', 'secretary', 'study', 'finance', 'role', 'church', 'dashboard', 'dashboard-user', 'dashboard-finance', 'dashboard-study'];
        $this->addPermissionsInRole('admin', $permissionsAdmin, ['read-user-details']);
    }

    private function addPermissionInSecretary(){
        $permissionsAdmin = ['user', 'ministerial-position', 'ecclesiastical-office', 'church', 'dashboard', 'dashboard-user'];
        $this->addPermissionsInRole('secretary', $permissionsAdmin);
    }

    private function addPermissionInUser(){
        $permissionsAdmin = ['user', 'dashboard', 'dashboard-user'];
        $this->addPermissionsInRole('secretary', $permissionsAdmin, ['read-user-details']);
    }

    private function addPermissionInTreasure(){
        $permissionsAdmin = ['finance', 'dashboard', 'dashboard-finance'];
        $this->addPermissionsInRole('treasure', $permissionsAdmin);
    }

    private function addPermissionInEducationalCoordinator(){
        $permissionsForRole = ['study', 'dashboard-study', 'dashboard'];
        $this->addPermissionsInRole('educational-coordinator', $permissionsForRole);
    }

    public function run()
    {

        $this->updateNamePermission('church-job', 'ministerial-position');

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

        $this->addPermissionInAdmin();
        $this->addPermissionInSecretary();
        $this->addPermissionInTreasure();
        $this->addPermissionInEducationalCoordinator();
        $this->addPermissionInUser();

    }
}
