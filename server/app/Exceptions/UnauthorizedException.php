<?php

namespace App\Exceptions;

use Exception;

class UnauthorizedException extends Exception
{
    public function __construct($message = "Acesso não permitido")
    {
        parent::__construct($message);
    }

    public function render()
    {
        return response()->json(['message' =>  $this->message], 403);;
    }
}
