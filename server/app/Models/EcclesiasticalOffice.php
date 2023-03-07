<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static create()
 */
class EcclesiasticalOffice extends MinisterialPosition
{
    use HasFactory;

    protected $table = "ecclesiastical_office";

}
