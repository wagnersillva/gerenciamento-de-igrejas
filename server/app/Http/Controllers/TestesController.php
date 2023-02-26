<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UserStoreRequest;
use App\Services\UserService;
use Exception;
use Illuminate\Http\Request;

class TestesController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function teste(Request $request)
    {
        return $this->userService->findAll($request->all());
    }

    /**
     * @throws Exception
     */
    public function testeSave(UserStoreRequest $request)
    {
        return $this->userService->save($request->all());
    }
}
