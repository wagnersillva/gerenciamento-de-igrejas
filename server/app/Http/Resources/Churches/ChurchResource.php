<?php

namespace App\Http\Resources\Churches;

use Illuminate\Http\Resources\Json\JsonResource;

class ChurchResource extends JsonResource
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
        $model['name'] = $this->name;
        $model["is_matriz"] = $this->matriz_id == null;
        $model["address"] = $this->address;

        return $model;
    }

}
