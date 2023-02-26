<?php

namespace App\Http\Resources\ChurchJob;

use App\Http\Resources\UpdateResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ChurchJobUpdateSuccessResource extends UpdateResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
