<?php

namespace App\Http\Controllers;

use App\Repositories\SqlConditions;
use Illuminate\Database\Eloquent\Builder;

abstract class CrudController extends Controller
{
    public $class_name;

    public function __construct($class)
    {
        $this->class_name = $class;
    }

    abstract function additionalQuery(Builder $query);

    public function getQuery($filter): Builder
    {
        $class_name = $this->class_name;
        $query = SqlConditions::customQuery($class_name, $filter);
        return $this->additionalQuery($query);
    }

}
