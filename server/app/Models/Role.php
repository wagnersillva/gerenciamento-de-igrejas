<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'is_admin',
        'is_secretary',
        'is_removable'
    ];

    public function permissions()
    {
        return $this->belongsToMany(Permission::class);
    }

}
