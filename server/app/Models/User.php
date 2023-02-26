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
        return ['first_name', 'last_name', 'mother', 'father', 'email', 'username'];
    }

    static function fields_between(): array
    {
        return ['birth_between', 'baptism_date_between'];
    }

    static function fields_default(): array
    {
        return [
            'church_job_id',
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

    public function churchJob()
    {
        return $this->belongsTo(ChurchJob::class, 'church_job_id', 'id');
    }

    public function church()
    {
        return $this->belongsTo(Church::class, 'church_id');
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

    public function isAdmin(){
        $superAdmin = $this->is_general_admin;
        $hasRoleAdmin = $this->roles->filter(function($role){ return $role->is_admin; })->count() != 0;
        return $superAdmin || $hasRoleAdmin;
    }

    public function isSecretary(){
        return $this->roles->filter(function($role){ return $role->is_secretary; })->count() != 0;
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
