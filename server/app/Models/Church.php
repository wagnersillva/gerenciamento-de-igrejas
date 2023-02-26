<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Church extends Model
{
    use HasFactory;

    protected $table = "churches";

    protected $guarded = ['id'];

    protected $hidden = [
        'address_id'
    ];

    public function filiais()
    {
        return $this->hasMany(Church::class, 'matriz_id', 'id');
    }

    public function address()
    {
        return $this->belongsTo(Address::class, 'address_id', 'id');
    }

}
