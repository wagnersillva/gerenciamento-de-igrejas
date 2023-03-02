<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class DefaultResource extends JsonResource
{
    protected function userLogged()
    {
        return User::find(auth()->user()->id);
    }

    protected function isSameUser()
    {
        return $this->userLogged()->id == $this->id;
    }

    protected function getPermissionsUserLogged()
    {
        return $this->userLogged()->getPermissionsLabels();
    }
}
