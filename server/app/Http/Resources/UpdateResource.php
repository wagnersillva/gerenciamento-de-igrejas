<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UpdateResource extends JsonResource
{
    public function with($request)
    {
        return [
            "message" => "Registro alterado com sucesso!"
        ];
    }
}
