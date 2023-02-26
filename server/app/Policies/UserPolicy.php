<?php

namespace App\Policies;

use App\Exceptions\UnauthorizedException;
use App\Models\Permission;
use App\Models\User;
use Illuminate\Auth\Access\Gate;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;


    /**
     * @throws UnauthorizedException
     */
    public function canReadUserDetail($id)
    {
        return auth()->user->id == $id;
    }

}
