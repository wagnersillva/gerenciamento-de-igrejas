<?php

namespace App\Repositories\impl;

use App\Models\User;
use App\Repositories\SqlConditions;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class UserRepository extends BaseRepository
{

    public function __construct(Model $model)
    {
        parent::__construct($model);
    }

    public function findByUsername(String $name){
        return $this->model->where("username", 'rlike', $name)->first();
    }

    public function findAllByRole(string $role): \Illuminate\Support\Collection
    {
        return $this->DB
                    ->join('role_user', 'users.id', '=', 'role_user.user_id')
                    ->join('roles', 'role_user.role_id', '=', 'roles.id')
                    ->where('key', $role)
                    ->get();
    }

    public function findAllByChurchJob(string $churchJob): \Illuminate\Support\Collection
    {
        return $this->DB
                    ->join('church_jobs', 'users.church_job_id', '=', 'church_jobs.id')
                    ->where('church_jobs.title', $churchJob)
                    ->get();
    }

    function additionalQuery(Builder $query, string $class_name): Builder
    {
        if(isset($filter['name'])){
            $value = $filter['name'];
            $query = SqlConditions::getFilterWhere($class_name, $query, 'first_name', $value);
            $query = SqlConditions::getFilterWhere($class_name, $query, 'last_name', $value, true);
        }

        $userLogged = User::find(auth()->user()->id);
        $churchLogged = $userLogged->church_logged ?? $userLogged->church_id;

        $query->where('church_id', $churchLogged);

        return $query;
    }
}
