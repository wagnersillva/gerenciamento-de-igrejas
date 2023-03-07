<?php

namespace App\Services;

use App\Exceptions\RegisterNotCreate;
use App\Exceptions\RegisterNotFoundException;
use App\Http\Resources\User\UserResource;
use App\Http\Resources\User\UserSaveSuccessResource;
use App\Http\Resources\User\UserUpdateSuccessResource;
use App\Models\Address;
use App\Models\Document;
use App\Models\User;
use App\Repositories\impl\UserRepository;
use Exception;
use Illuminate\Support\Facades\Hash;

class UserService
{

    protected $repository;

    public function __construct()
    {
        $this->repository = new UserRepository(new User());
    }

    public function findAll(?array $params = null): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $listUsers = $this->repository->findAll($params);
        return UserResource::collection($listUsers)->additional([ "total" => $listUsers->total()]);
    }

    public function findByUsername(String $name): UserResource
    {
        return new UserResource($this->repository->findByUsername($name));
    }

    public function findById(int $id): ?\Illuminate\Database\Eloquent\Model
    {
        return $this->repository->findById($id);
    }

    public function findAllByRole(string $roleName): \Illuminate\Support\Collection
    {
        return $this->repository->findAllByRole($roleName);
    }

    public function findAllByChurchJob(string $roleName): \Illuminate\Support\Collection
    {
        return $this->repository->findAllByChurchJob($roleName);
    }

    public function findAllOnChurchJobIsShepherd(): \Illuminate\Support\Collection
    {
        return $this->findAllByChurchJob('Pastor');
    }

    /**
     * @throws Exception
     */
    public function save(array $attr): UserSaveSuccessResource
    {
        $currentUser = User::find(auth()->user()->id);;
        $attr = $this->formatAttrs($attr);
        $attr['church_id'] = $currentUser->church_logged ?? $currentUser->church_id;

        $user = User::create($attr);


        try {
            $this->saveAnyRelations($user, $attr);
            return new UserSaveSuccessResource($user);
        } catch (Exception $ex){
            $user->delete();
            throw new RegisterNotCreate($ex->getMessage());
        }
    }

    public function update(array $attr, User $user): UserUpdateSuccessResource
    {
        $attr = $this->formatAttrs($attr, false);
        $this->saveAnyRelations($user, $attr);
        $user->update($attr);
        return new UserUpdateSuccessResource(User::find($user->id));
    }

    private function formatAttrs($attr, bool $newRegister = true)
    {
        if($newRegister){
            $attr['password'] = Hash::make('12345678');
        }

        $attr['church_job_id'] = $attr['church_job'] ?? null;
        $attr['marital_status_id'] = $attr['marital_status'] ?? 1;
        return $attr;
    }

    private function saveAnyRelations(User $user, $attr, bool $newRegister = true)
    {
        if(!$newRegister){
            $user->documents->map->delete();
            $user->address->map->delete();
            $user->roles()->sync([]);
            $user->ecclesiasticalOffices()->sync([]);
        }

        $this->saveUserAddress($user, $attr);
        $this->saveUserDocuments($user, $attr);
        $this->updateUserRoles($user, $attr);
        $this->updateEcclesiasticalOffices($user, $attr);
    }

    private function saveUserAddress(User $user, $attr): void
    {
        $address = $attr['address'] ?? null;

        if($address){
            $address['user_id'] = $user->id;
            Address::create($address);
        }
    }

    public function saveUserDocuments(User $user, $attr): void
    {
        $documents = $attr['documents'] ?? null;

        if($documents){
            foreach ($documents as $document){
                $model = $document;
                $model['user_id'] = $user->id;
                Document::create($model);
            }
        }
    }

    public function updateUserRoles(User $user, $attr)
    {
        $roles = $attr['roles'] ?? null;

        if($roles){
            $user->roles()->sync($roles);
        }
    }

    public function updateEcclesiasticalOffices(User $user, $attr)
    {
        $roles = $attr['ecclesiastical_offices'] ?? null;

        if($roles){
            $user->ecclesiasticalOffices()->sync($roles);
        }
    }

    /**
     * @throws RegisterNotFoundException
     */
    public function delete(int $id){
        return $this->repository->delete($id);
    }

}
