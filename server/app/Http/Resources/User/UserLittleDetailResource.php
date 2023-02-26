<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;

class UserLittleDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        return [
            "first_name" => $this->first_name,
            "password_changed" => $this->password_changed,
            "email" => $this->email,
            "id" => $this->id,
            "is_admin" => $this->isAdmin(),
            "is_secretary" => $this->isSecretary(),
            "church_logged" => $this->church_logged,
        ];;
    }
}
