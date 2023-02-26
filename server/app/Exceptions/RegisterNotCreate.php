<?php

namespace App\Exceptions;

use Exception;

class RegisterNotCreate extends Exception
{
    public function __construct($message = "Erro ao tentar salvar registro")
    {
        parent::__construct($message);
    }

    public function render()
    {
        $model = [
            "message" => __($this->message) ?? $this->message
        ];

        return response()->json(['error' => $model ], 400);
    }
}
