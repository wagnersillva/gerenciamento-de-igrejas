<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static create(mixed $model)
 */
class Address extends Model
{
    protected $table = "address";

    use HasFactory;

    protected $fillable = [
        'country',
        'state',
        'street',
        'city',
        'district',
        'number_home',
        'cep',
        'user_id',
        'updated_at',
        'created_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
