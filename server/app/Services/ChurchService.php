<?php

namespace App\Services;

use App\Exceptions\RegisterNotCreate;
use App\Exceptions\RegisterNotFoundException;
use App\Http\Resources\Churches\ChurchResource;
use App\Http\Resources\Churches\ChurchSaveSuccessResource;
use App\Http\Resources\Churches\ChurchUpdateSuccessResource;
use App\Http\Resources\User\UserResource;
use App\Http\Resources\User\UserSaveSuccessResource;
use App\Http\Resources\User\UserUpdateSuccessResource;
use App\Models\Address;
use App\Models\Church;
use App\Models\Document;
use App\Models\User;
use App\Repositories\impl\ChurchRepository;
use App\Repositories\impl\UserRepository;
use Exception;
use Illuminate\Support\Facades\Hash;

class ChurchService
{

    protected $repository;

    public function __construct()
    {
        $this->repository = new ChurchRepository(new Church());
    }

    public function findAll(?array $params = null)
    {
        $list = $this->repository->findAll($params);
        return ChurchResource::collection($list)->additional([ "total" => $list->total()]);
    }

    public function findByName(String $name): ChurchResource
    {
        return new ChurchResource($this->repository->findByName($name));
    }

    public function findById(int $id): ?\Illuminate\Database\Eloquent\Model
    {
        return $this->repository->findById($id);
    }

    /**
     * @throws Exception
     */
    public function save(array $attr): ChurchSaveSuccessResource
    {
        $user = User::find(auth()->user()->id);

        $attr['address_id'] = $this->saveAddress($attr);
        $attr['matriz_id'] = $user->church_id;

        $church = Church::create($attr);

        return new ChurchSaveSuccessResource($church);
    }

    public function update(array $attr, Church $church): ChurchUpdateSuccessResource
    {
        $attr['address_id'] = $this->saveAddress($attr, $church->address);
        $church->update($attr);
        return new ChurchUpdateSuccessResource(Church::find($church->id));
    }


    private function saveAddress($attr, $currenatAddress = null)
    {
        $isEdit = $currenatAddress != null;
        $address = null;
        $addressAttr = $attr['address'] ?? null;

        if($addressAttr){
            if($isEdit) {
                $currenatAddress->update($addressAttr);
                $address = $currenatAddress;
            } else {
                $address = Address::create($addressAttr);
            }
        }

        return $address ? $address->id : null;
    }

    /**
     * @throws RegisterNotFoundException
     */
    public function delete(int $id){
        return $this->repository->delete($id);
    }

}
