<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static create()
 */
class MinisterialPosition extends Model
{
    use HasFactory;

    protected $table = "ministerial_position";

    protected $fillable = [
        'title',
        'description'
    ];

}
