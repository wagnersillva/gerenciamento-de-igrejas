<?php

namespace App\Repositories\impl;

use App\Repositories\SqlConditions;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class ChurchRepository extends BaseRepository
{

    public function __construct(Model $model)
    {
        parent::__construct($model);
    }

    public function findByName(String $name){
        return $this->model->where("name", 'rlike', $name)->first();
    }

    function additionalQuery(Builder $query, string $class_name): Builder
    {
        return $query;
    }
}
