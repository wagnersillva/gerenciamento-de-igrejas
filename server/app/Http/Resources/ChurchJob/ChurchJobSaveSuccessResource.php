<?php

namespace App\Http\Resources\ChurchJob;

use App\Http\Resources\SaveResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ChurchJobSaveSuccessResource extends SaveResource
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
