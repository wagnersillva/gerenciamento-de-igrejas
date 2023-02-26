<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {

        $this->renderable(function (AccessDeniedHttpException $e) {
            return $this->responseModel("messages.error.usuario.acessoNegado.label", $e->getStatusCode());
        });

        $this->renderable(function (AuthenticationException $e) {
            return $this->responseModel("messages.error.usuario.naoAutenticado.label", 401);
        });

        $this->renderable(function (RegisterNotFoundException $e) {
            return $this->responseModel($e->getMessage(), 404);
        });

//        $this->renderable(function (HttpException $e) {
//            return $this->responseModel('messages.error.padrao.label', 500);
//        });

        $this->renderable(function (ValidationException $e, $request) {
            $values = array_values($e->errors());
            $valuesToUniqueArray = array_merge(...$values);
            $valuesArrayToString = implode(". ", $valuesToUniqueArray);
            return $this->responseModel($valuesArrayToString , 422);
        });
    }

    private function responseModel($message, $code): \Illuminate\Http\JsonResponse
    {
        $data = [
            "error" => [
                "message" => __($message) ?? $message
            ]
        ];

        return response()->json($data, $code);
    }

}
