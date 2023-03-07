<?php

namespace App\Http\Controllers;

use App\Exceptions\UnauthorizedException;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function response(int $code, $data): \Illuminate\Http\JsonResponse
    {
        return response()->json(['data' => $data ], $code);
    }

    /**
     * @throws UnauthorizedException
     */

    function userLogged(){
        return User::find(auth()->user()->id);
    }

    /**
     * @throws UnauthorizedException
     */
    function checkPermission($permission){
        $user = $this->userLogged();

        if($user->cannot($permission)){
            throw new UnauthorizedException();
        }
    }

    function userLoggedIsGeneralAdmin(){
        return $this->userLogged()->is_general_admin;
    }

    function userLoggedIsAdmin(){
        return $this->userLogged()->isAdmin();
    }

    function userLoggedIsSecretary(){
        return $this->userLogged()->isSecretary();
    }

    function userLoggedIsTreasure(){
        return $this->userLogged()->isTreasure();
    }

    function userLoggedIsEducationalCoordinator(){
        return $this->userLogged()->isEducationalCoordinator();
    }

    /**
     * @throws UnauthorizedException
     */
    function canViewUser($id){
        $user = $this->userLogged();

        if($id == $user->id || $this->userLoggedIsAdmin()) return true;

        $this->checkPermission('read-user-details');
    }

    /**
     * @throws UnauthorizedException
     */
    function canEditUser($id){
        $user = $this->userLogged();

        if($id == $user->id || $this->userLoggedIsAdmin()) return true;

        $this->checkPermission('edit-user');
    }
}
