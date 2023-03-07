<?php

namespace App\Models;

use App\Utils\Conditions;
use App\Utils\CustomBuilder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * @method static find(int $id)
 */
class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = "users";

    protected $guarded = ['id'];

//    protected $fillable = [
//        'first_name',
//        'last_name',
//        'mother',
//        'father',
//        'baptism_date',
//        'birth',
//        'email',
//        'password',
//        'password_changed',
//        'church_job_id',
//        'marital_status_id',
//        'is_general_admin',
//        'username',
//        'phone',
//        'gender'
//    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'church_job_id'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    static function fields_ilike(): array
    {
        return ['first_name', 'last_name', 'mother', 'father', 'email'];
    }

    static function fields_between(): array
    {
        return ['birth_between', 'baptism_date_between'];
    }

    static function fields_default(): array
    {
        return [
            'ministerial_position_id',
            'marital_status_id',
            'birth'
        ];
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_user');
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'user_id', 'id');
    }


    public function address()
    {
        return $this->hasMany(Address::class, 'user_id', 'id');
    }

    public function ministerialPosition()
    {
        return $this->belongsTo(MinisterialPosition::class, 'ministerial_position_id', 'id');
    }

    public function ecclesiasticalOffices()
    {
        return $this->belongsToMany(EcclesiasticalOffice::class, 'ecclesiastical_office_users', '', '');
    }

    public function church()
    {
        return $this->belongsTo(Church::class, 'church_id');
    }

    public function getChurches(){
        $church = $this->church;
        $churchList = [];

        if(($church->matriz_id == null) && ($this->isAdmin())){
            $churchList = $church->filiais->all();
        }

        array_unshift($churchList, $church);

        return $churchList;
    }

    public function getPermissionsLabels()
    {
        $permissions = [];

        foreach ($this->roles as $role){
            foreach ($role->permissions as $permission){

                $permissions[] = $permission->key;
            }
        }

        return array_values(array_unique($permissions));
    }

    public function isOnlyUser(){
        return $this->roles->count() == 1 && $this->roles->filter(function($role){ return $role->key == 'user'; })->count() != 0;
    }

    public function isAdmin(){
        return $this->roles->filter(function($role){ return $role->key == 'admin'; })->count() != 0;
    }

    public function isSecretary(){
        return $this->roles->filter(function($role){ return $role->key == 'secretary'; })->count() != 0;
    }

    public function isTreasure(){
        return $this->roles->filter(function($role){ return $role->key == 'treasure'; })->count() != 0;
    }

    public function isEducationalCoordinator(){
        return $this->roles->filter(function($role){ return $role->key == 'educational-coordinator'; })->count() != 0;
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
