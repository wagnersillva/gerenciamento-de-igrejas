<?php

namespace App\Http\Resources\ChurchJob;

use App\Http\Resources\DefaultResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ChurchJobResource extends DefaultResource
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
        $model["disabledDelete"] = $this->disabledDelete();
        $model["disabledUpdate"] = $this->disabledUpdate();

        return $model;
    }

    private function disabledUpdate()
    {
        return  !in_array('edit-church-job', $this->getPermissionsUserLogged());
    }

    private function disabledDelete()
    {
        return !in_array('delete-church-job', $this->getPermissionsUserLogged());
    }

}
