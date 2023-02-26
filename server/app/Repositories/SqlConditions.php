<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Builder;

class SqlConditions
{

    static function getFilterWhere(string $class_name, Builder $query, $field, $value, bool $clausuleOr = false): Builder
    {
        $fields_ilike = $class_name::fields_ilike();
        $fields_between = $class_name::fields_between();
        $fields_default = $class_name::fields_default();

        if(in_array($field, $fields_ilike)){
            return $clausuleOr ? $query->orWhere($field, 'rlike', $value) : $query->where($field, 'rlike', $value);
        } else if(in_array($field, $fields_between)) {
            $field = str_replace('_between', '', $field);
            return $clausuleOr ? $query->orWhereBetween($field, $value) : $query->whereBetween($field, $value);
        } else if(in_array($field, $fields_default)) {
            return $clausuleOr ? $query->orWhere($field, $value) : $query->where($field, $value);
        }

        return $query;
    }

    static function customQuery(string $class_name, $filter): Builder
    {
        $query = $class_name::query();

        if(isset($filter) && count($filter)){
            foreach ($filter as $item => $value){
                $defaultValidate = !stristr($item, 'to');
                if(!!stristr($item, 'from')) {
                    $to = str_replace('from', 'to', $item);
                    $value = [$filter[$item], $filter[$to]];
                    $item = str_replace('from', 'between', $item);
                    $query = SqlConditions::getFilterWhere($class_name, $query, $item, $value);
                } else if($defaultValidate) {
                    $query = SqlConditions::getFilterWhere($class_name, $query, $item, $value);
                }
            }
        }

        return $query;
    }

    static function iLike($field, $value)
    {
        return [$field, 'ilike', "%$value%"];
    }

    static function equals($field, $value)
    {
        return [$field, '=', $value];
    }
}
