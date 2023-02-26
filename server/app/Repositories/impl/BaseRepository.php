<?php

namespace App\Repositories\impl;

use App\Exceptions\RegisterNotFoundException;
use App\Repositories\BaseRepositoryInterface;
use App\Repositories\SqlConditions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

abstract class BaseRepository implements BaseRepositoryInterface
{

    protected $model;
    protected $class;
    protected $DB;

    public function __construct(Model $model)
    {
        $this->model = $model;
        $this->class = get_class($model);
        $this->DB = DB::table($model->getTable());
    }

    abstract function additionalQuery(Builder $query, string $class_name): Builder;

    public function getQuery(?array $filter = []): Builder
    {
        $query = SqlConditions::customQuery($this->class, $filter);
        return $this->additionalQuery($query, $this->class);
    }

    public function findById(int $id): ?Model
    {
        return $this->model->find($id);
    }

    public function findAll(?array $params): \Illuminate\Contracts\Pagination\LengthAwarePaginator
    {
        $page = $params['page'] ?? 1;
        $perPage = $params['max'] ?? 10;
        return $this->getQuery($params)->paginate($perPage, ['*'], 'page', $page);
    }

    public function save(array $attributes): Model
    {
        $this->model->create($attributes);
    }

    public function update(array $attributes, int $id): Model
    {
        // TODO: Implement update() method.
    }

    /**
     * @throws RegisterNotFoundException
     */
    public function delete(int $id)
    {
        $entity = $this->model->find($id);
        if(!$entity) throw new RegisterNotFoundException();
        return $entity->delete($id);
    }
}
