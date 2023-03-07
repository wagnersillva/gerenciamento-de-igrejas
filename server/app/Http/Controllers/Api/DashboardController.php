<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function HomeDashboard(){
        $user = $this->userLogged();
        $churches = $user->

        $members = User::all();

    }
}
