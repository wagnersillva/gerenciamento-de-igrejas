<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\RegisterNotFoundException;
use App\Exceptions\UnauthorizedException;
use App\Http\Controllers\CrudController;
use App\Http\Requests\Churches\ChurchStoreRequest;
use App\Http\Requests\User\UserStoreRequest;
use App\Http\Resources\Churches\ChurchPrepareEdit;
use App\Http\Resources\Churches\ChurchPrepareSave;
use App\Http\Resources\Churches\ChurchResource;
use App\Http\Resources\Churches\ChurchSaveSuccessResource;
use App\Http\Resources\Churches\ChurchUpdateSuccessResource;
use App\Http\Resources\Role\RoleResource;
use App\Http\Resources\User\ChurchJobResource;
use App\Http\Resources\User\MaritalStatusResource;
use App\Models\Church;
use App\Models\MinisterialPosition;
use App\Models\MaritalStatus;
use App\Models\Role;
use App\Models\User;
use App\Services\ChurchService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ChurchesController extends CrudController
{

    protected $churchService;

    public function __construct(ChurchService $churchService)
    {
        $this->churchService = $churchService;
        parent::__construct('App\Models\Church');
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
        $this->checkPermission('read-church');
        return $this->churchService->findAll($request->all());
    }

    /**
     * @throws Exception
     */
    public function store(ChurchStoreRequest $request): ChurchSaveSuccessResource
    {
        $request->validated();
        return $this->churchService->save($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return ChurchResource
     * @throws UnauthorizedException
     */
    public function show(int $id): ChurchResource
    {
        $user = $this->churchService->findById($id);

        $this->canViewUser($id);

        if(!$user){
            abort(404, "User Not Found for id [$id]");
        }

        return new ChurchResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return ChurchUpdateSuccessResource
     * @throws AuthorizationException|UnauthorizedException
     */
    public function update(Request $request, int $id): ChurchUpdateSuccessResource
    {
        $this->authorize('edit-church');

        $church = Church::find($id);
        $all = $request->all();

        if(!$church) abort(404, "Igreja não encontrada com o id: $id");

        return $this->churchService->update($all, $church);
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
        $this->authorize('delete-church');

        if($this->churchService->delete($id)){
            return response()->json(['message' => 'igreja deletada com sucesso!' ], 200);
        } else {
            abort(409, "Erro ao tentar deletar igreja");
        }
    }

    /**
     * @throws RegisterNotFoundException
     * @throws UnauthorizedException
     */
    public function prepareEdit($id): ChurchPrepareEdit
    {
        $this->authorize('edit-church');

        $church = Church::find($id);

        if(!$church){
            throw new RegisterNotFoundException("Igreja não encontrada para o id [$id]");
        }

        $model["church"] = new ChurchResource($church);

        return new ChurchPrepareEdit($model);
    }

    function additionalQuery(Builder $query)
    {
       return $query;
    }
}
