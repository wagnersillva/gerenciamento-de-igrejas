<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;

class ChurchResourceTemplate extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $isMatriz = $this->matriz_id == null;

        $model['name'] = $this->name;
        $model['description'] = $this->description;
        $model["is_matriz"] = $isMatriz;

        return $model;
    }

}
