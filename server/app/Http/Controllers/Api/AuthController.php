<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserUpdatePasswordRequest;
use App\Http\Resources\User\UserLittleDetailResource;
use App\Http\Resources\User\UserResource;
use App\Http\Resources\User\UserUpdateSuccessResource;
use App\Models\Church;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use function Webmozart\Assert\Tests\StaticAnalysis\inArray;

class AuthController extends Controller
{
    public function createUser(Request $request)
    {
        try {
            //Validated
            $validateUser = Validator::make($request->all(),
                [
                    'name' => 'required',
                    'email' => 'required|email|unique:users,email',
                    'password' => 'required'
                ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            return response()->json([
                'status' => true,
                'message' => 'User Created Successfully'
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function loginUser(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(),
                [
                    'username' => 'required',
                    'password' => 'required'
                ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $credentials = request(['username', 'password']);

            if (! $token = auth()->attempt($credentials)) {
                return response()->json(['error' => ["message" => 'usuário ou senha inválidos.']], 401);
            }

            return $this->respondWithToken($token);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function checkToken(): \Illuminate\Http\JsonResponse
    {
        $valid = auth()->check();
        $model = [
            "tokenValid" => $valid,
            'permissions' => []
        ];

        if($valid){
            $user = User::find(auth()->user()->id);
            $churches = $this->getChurches($user);
            $model['permissions'] = $user->getPermissionsLabels();
            $model['id'] = $user->id;
            $model['is_admin'] = $user->isAdmin();
            $model['is_secretary'] = $user->isSecretary();
            $model['church_logged'] = $user->church_logged;
            $model['churches'] = $churches;
            $model['password_changed'] = $user->password_changed;
        }

        return $this->response(200, [ "data" => $model]);
    }

    public function permissions()
    {
        $user = User::find(auth()->user()->id);
        $model['permissions'] = $user->getPermissionsLabels();

        return response()->json(['data' => $model], 200);
    }

    protected function respondWithToken($token): \Illuminate\Http\JsonResponse
    {
        $user = User::find(auth()->user()->id);
        $churches = $this->getChurches($user);

//        TODO retornar permissões no little detail
        $model = [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => new UserLittleDetailResource($user),
            'churches' => $churches,
            'permissions' => $user->getPermissionsLabels()
        ];

        $this->verifyChurchLogged($user, $churches);

        return response()->json(['data' => $model]);
    }

    protected function verifyChurchLogged($user, $churches): void
    {
        if(count($churches) > 1){
            foreach ($churches  as $church){
                if($church->matriz_id == null){
                    $this->setChurchLogged($user, $church->id);
                }
            }
        } else {
            $this->setChurchLogged($user, $churches[0]->id);
        }
    }

    protected function getChurches($user){
        $church = $user->church;
        $churchList = [];

        if(($church->matriz_id == null) && ($user->isAdmin() || $user->isSecretary())){
            $churchList = $church->filiais->all();
        }

        array_unshift($churchList, $church);

        return $churchList;
    }

    public function changedPassword(UserUpdatePasswordRequest $request, $id){
        $user = User::find($id);
        $all = $request->all();

        $all["password_changed"] = true;
        $all["password"] = Hash::make($all["password"]);

        $user->update($all);

        return new UserUpdateSuccessResource(User::find($user->id));
    }

    public function changeChurch(Request $request){
        $user = User::find(auth()->user()->id);
        $churches = $this->getChurches($user);
        $attr = $request->all();
        $church_id = $attr['churchId'];
        $canToChange = false;

        foreach ($churches as $church){
            if($church->id == $church_id){
                $canToChange = true;
            }
        }

        if ($canToChange){
            $this->setChurchLogged($user, $church_id);
        }

        return response()->json(['message' => 'Igreja alterada com sucesso']);
    }

    protected function setChurchLogged($user, $church_id){
        $user->update(['church_logged' => $church_id]);
    }

}
