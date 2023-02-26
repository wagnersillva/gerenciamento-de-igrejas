<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\RegisterNotFoundException;
use App\Http\Controllers\CrudController;
use App\Http\Requests\ChurchJob\ChurchJobStoreRequest;
use App\Http\Resources\ChurchJob\ChurchJobResourcePrepareEdit;
use App\Http\Resources\ChurchJob\ChurchJobSaveSuccessResource;
use App\Http\Resources\ChurchJob\ChurchJobUpdateSuccessResource;
use App\Http\Resources\User\ChurchJobResource;
use App\Models\ChurchJob;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ChurchJobController extends CrudController
{

    public function __construct()
    {
        parent::__construct('App\Models\ChurchJob');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->checkPermission('read-church-job');

        $params = $request->all();
        $page = $params['page'] ?? 1;
        $churchJob = $this->getQuery($params)->paginate(10, ['*'], 'page', $page);
        return ChurchJobResource::collection($churchJob)->additional([ "total" => $churchJob->total()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ChurchJobStoreRequest $request)
    {
        $this->checkPermission('create-church-job');

        $request->validated();
        $churchJob = ChurchJob::create($request->all());
        return new ChurchJobSaveSuccessResource($churchJob);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id): ChurchJobResource
    {
        $user = ChurchJob::find($id);

        if(!$user){
            abort(404, "Church job Not Found for id [$id]");
        }

        return new ChurchJobResource($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->checkPermission('edit-church-job');

        $church = ChurchJob::find($id);

        if(!$church){
            abort(404, "Church job Not Found for id [$id]");
        }

        $church->update($request->all());

        return new ChurchJobUpdateSuccessResource($church);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $this->checkPermission('delete-church-job');

        $church = ChurchJob::find($id);

        if(!$church){
            abort(404, "Cargo não encontrado com o id [$id]");
        }

        if($church->delete()){
            return response()->json(['message' => 'Cargo deletado com sucesso!' ], 200);
        } else {
            abort(409, "Erro ao tentar deletar cargo");
        }
    }

    public function prepareEdit($id)
    {
        $this->checkPermission('edit-church-job');

        $church = ChurchJob::find($id);

        if(!$church){
            throw new RegisterNotFoundException("Cargo não encontrado com o id [$id]");
        }

        $model["churchJob"] = new ChurchJobResource($church);

        return new ChurchJobResourcePrepareEdit($model);
    }

    function additionalQuery(Builder $query): Builder
    {
        return $query;
    }



}
