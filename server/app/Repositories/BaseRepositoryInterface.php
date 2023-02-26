<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface BaseRepositoryInterface
{
    public function __construct(Model $model);
    public function findById(int $id);
    public function findAll(array $params);
    public function save(array $attributes);
    public function update(array $attributes, int $id);
    public function delete(int $id);
}
