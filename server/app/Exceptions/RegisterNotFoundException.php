<?php

namespace App\Exceptions;

use Exception;

class RegisterNotFoundException extends Exception
{
    public function __construct($message = "Registro não encontrado")
    {
        parent::__construct($message);
    }

    public function render()
    {
        $model = [
            "message" => __($this->message) ?? $this->message
        ];

        return response()->json(['error' => $model ], 404);
    }
}
