<?php

namespace App\Http\Resources\User;

use App\Http\Resources\Role\PermissionResource;
use Illuminate\Http\Resources\Json\JsonResource;

class RoleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
//        $model = parent::toArray($request);
        $model["disabledDelete"] = $this->is_removable == 0;
        $model["disabledUpdate"] = $this->is_admin == 1 || $this->is_secretary == 1;
        $model['name'] = $this->key;
        $model['key'] = $this->key;
        $model['id'] = $this->id;
        $model['permissions'] = PermissionResource::collection($this->permissions);

        return $model;

    }
}
