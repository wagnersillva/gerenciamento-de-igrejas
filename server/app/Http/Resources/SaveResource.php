<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SaveResource extends JsonResource
{
    public function with($request)
    {
        return [
            "message" => "Registro criado com sucesso!"
        ];
    }
}
