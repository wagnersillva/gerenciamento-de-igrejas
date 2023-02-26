<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\RegisterNotFoundException;
use App\Exceptions\UnauthorizedException;
use App\Http\Controllers\CrudController;
use App\Http\Requests\User\UserStoreRequest;
use App\Http\Resources\Role\RoleResource;
use App\Http\Resources\User\ChurchJobResource;
use App\Http\Resources\User\MaritalStatusResource;
use App\Http\Resources\User\UserPrepareEdit;
use App\Http\Resources\User\UserPrepareSave;
use App\Http\Resources\User\UserResource;
use App\Http\Resources\User\UserSaveSuccessResource;
use App\Http\Resources\User\UserUpdateSuccessResource;
use App\Models\ChurchJob;
use App\Models\MaritalStatus;
use App\Models\Role;
use App\Models\User;
use App\Repositories\SqlConditions;
use App\Services\UserService;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserController extends CrudController
{

    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
        parent::__construct('App\Models\User');
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return AnonymousResourceCollection
     * @throws UnauthorizedException
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $this->checkPermission('read-user');
        return $this->userService->findAll($request->all());
    }

    /**
     * @throws Exception
     */
    public function store(UserStoreRequest $request): UserSaveSuccessResource
    {
        $request->validated();
        return $this->userService->save($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return UserResource
     * @throws UnauthorizedException
     */
    public function show(int $id): UserResource
    {
        $user = $this->userService->findById($id);

        $this->canViewUser($id);

        if(!$user){
            abort(404, "User Not Found for id [$id]");
        }

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return UserUpdateSuccessResource
     * @throws AuthorizationException|UnauthorizedException
     */
    public function update(Request $request, int $id): UserUpdateSuccessResource
    {
        $this->authorize('edit-user');
        $this->canEditUser($id);

        $user = User::find($id);
        $all = $request->all();

        if(!$user) abort(404, "Usuário não encontrado com o id: $id");

        return $this->userService->update($all, $user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse|void
     * @throws AuthorizationException
     * @throws RegisterNotFoundException
     */
    public function destroy(int $id)
    {
        $this->authorize('delete-user');

        if($this->userService->delete($id)){
            return response()->json(['message' => 'Usuário deletado com sucesso!' ], 200);
        } else {
            abort(409, "Erro ao tentar deletar usuário");
        }
    }

    private function modelPrepare(): array
    {

        $maritalStatus = MaritalStatus::all();
        $roles = Role::all()->filter(function($role){
            $isAdmin = $this->userLoggedIsAdmin();
            $isSecretary = $this->userLoggedIsSecretary();

            $includeRoleAdmin = $isAdmin && $role->is_admin;
            $includeRoleSecretary = ($isSecretary || $isAdmin) && $role->is_secretary;
            $outherRoles = !$role->is_admin && !$role->is_secretary;

            return $includeRoleAdmin || $includeRoleSecretary || $outherRoles;

        });
        $churchJobs = ChurchJob::all();

        return [
            "marital_status" => MaritalStatusResource::collection($maritalStatus),
            "roles" => RoleResource::collection($roles),
            "church_jobs" => ChurchJobResource::collection($churchJobs)
        ];
    }

    /**
     * @throws RegisterNotFoundException
     * @throws UnauthorizedException
     */
    public function prepareEdit($id): UserPrepareEdit
    {
        $this->canEditUser($id);

        $user = User::find($id);

        if(!$user){
            throw new RegisterNotFoundException("User Not Found for id [$id]");
        }

        $model = $this->modelPrepare();
        $model["user"] = new UserResource($user);

        return new UserPrepareEdit($model);
    }

    /**
     * @throws AuthorizationException
     */
    public function prepareSave(): UserPrepareSave
    {
        $this->authorize('create-user');

        $model = $this->modelPrepare();

        return new UserPrepareSave($model);
    }

    // remover método - não está mais sendo utilizado ( remover do crudController tmb )
    function additionalQuery(Builder $query): Builder
    {
        $class_name = $this->class_name;
        if(isset($filter['name'])){
            $value = $filter['name'];
            $query = SqlConditions::getFilterWhere($class_name, $query, 'first_name', $value);
            $query = SqlConditions::getFilterWhere($class_name, $query, 'last_name', $value, true);
        }

        return $query;
    }
}
