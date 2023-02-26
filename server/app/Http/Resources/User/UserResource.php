<?php

namespace App\Http\Resources\User;

use App\Http\Resources\DocumentResource;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $model = parent::toArray($request);
//        $model["disabledDelete"] = $this->disabledDelete();
//        $model["disabledUpdate"] = $this->disabledUpdate();
        $model["password_changed"] = $this->password_changed == 1;
        $model["is_general_admin"] = $this->is_general_admin == 1;
        $model['documents'] = DocumentResource::collection($this->documents);
        $model['church_job'] = new ChurchJobResource($this->churchJob);
        $model['roles'] = RoleResource::collection($this->roles);
        $model['church'] = new ChurchResourceTemplate($this->church);

        return $model;
    }

    private function userLogged()
    {
        return User::find(auth()->user()->id);
    }

    private function isSameUser()
    {
        return $this->userLogged()->id == $this->id;
    }

    private function getPermissionsUserLogged()
    {
        return $this->userLogged()->getPermissionsLabels();
    }

    private function disabledUpdate()
    {
        $permissions = $this->getPermissionsUserLogged();
        $sameUser = $this->isSameUser();
        return !$sameUser && ($this->is_general_admin || !in_array('edit-user', $permissions));
    }

    private function disabledDelete()
    {
        $permissions = $this->getPermissionsUserLogged();
        $sameUser = $this->isSameUser();
        return $this->is_general_admin || !in_array('delete-user', $permissions) || $sameUser;
    }

}
