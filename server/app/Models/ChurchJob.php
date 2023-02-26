<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static create()
 */
class ChurchJob extends Model
{
    use HasFactory;

    protected $table = "church_jobs";

    protected $fillable = [
        'title',
        'description'
    ];

}
