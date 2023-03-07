<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\RegisterNotFoundException;
use App\Exceptions\UnauthorizedException;
use App\Http\Controllers\CrudController;
use App\Http\Requests\Role\RoleStoreRequest;
use App\Http\Requests\Role\RoleUpdateRequest;
use App\Http\Resources\Role\PermissionResource;
use App\Http\Resources\Role\RolePrepareEdit;
use App\Http\Resources\Role\RolePrepareSave;
use App\Http\Resources\Role\RoleResource;
use App\Http\Resources\Role\RoleSaveSuccessResource;
use App\Http\Resources\Role\RoleUpdateSuccessResource;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;


// CONTROLLER DESCONTINUADO POR TEMPO INDETERMINADO -> EM BREVE O CÓDIGO SERÁ REMOVITO

class RoleController extends CrudController
{

    public function __construct()
    {
        parent::__construct('App\Models\Role');
    }

    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     * @throws AuthorizationException
     * @throws UnauthorizedException
     */
    public function index(Request $request)
    {
        $this->checkPermission('read-role');
        $params = $request->all();
        $page = $params['page'] ?? 1;
        $roles = $this->getQuery($params)->paginate(10, ['*'], 'page', $page);
        return RoleResource::collection($roles)->additional([ "total" => $roles->total()]);
    }


    function additionalQuery(Builder $query): Builder
    {
        return $query;
    }

    private function modelPrepare(){
        $roles = Permission::all();

        return [
            "permissions" => PermissionResource::collection($roles),
        ];
    }

    /**
     * @throws AuthorizationException
     * @throws RegisterNotFoundException
     */
    public function prepareEdit($id): RolePrepareEdit
    {
        $this->authorize('edit-role');

        $role = Role::find($id);

        if(!$role){
            throw new RegisterNotFoundException("Role Not Found for id [$id]");
        }

        $model = $this->modelPrepare();
        $model["role"] = new RoleResource($role);

        return new RolePrepareEdit($model);
    }

    public function prepareSave(): RolePrepareSave
    {
        $this->authorize('create-role');

        $model = $this->modelPrepare();

        return new RolePrepareSave($model);
    }

    //criar Role Store Request
    public function store(RoleStoreRequest $request)
    {
        $this->authorize('create-role');

        $request->validated();
        $all = $request->all();

        $role = Role::create($all);

        $role->permissions()->sync($all['permissions']);


        return new RoleSaveSuccessResource($role);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return RoleResource
     * @throws UnauthorizedException
     */
    public function show(int $id): RoleResource
    {
        $role = Role::find($id);

        if(!$role){
            abort(404, "Perfil não encontrado para o id [$id]");
        }

        return new RoleResource($role);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(RoleUpdateRequest $request, $id)
    {
        $this->authorize('edit-role');

        $role = Role::find($id);
        $all = $request->all();

        if(!$role){
            abort(404, "Perfil não encontrado para o id [$id]");
        }

        $role->permissions()->sync($all['permissions']);

        $role->update($all);

        return new RoleUpdateSuccessResource(Role::find($id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        $this->authorize('delete-role');

        $role = Role::find($id);

        if(!$role){
            abort(404, "Perfil não encontrado para o id [$id]");
        }

        if($role->delete()){
            return response()->json(['message' => 'Perfil deletado com sucesso!' ], 200);
        } else {
            abort(409, "Erro ao tentar deletar perfil");
        }
    }

}
