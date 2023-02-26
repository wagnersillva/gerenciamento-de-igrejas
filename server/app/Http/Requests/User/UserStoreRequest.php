<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => 'required',
            'last_name' => 'required',
            'birth' => 'required|date',
            'email' => 'email|unique:users',
            'marital_status' => 'required'
        ];
    }

    public function messages()
    {
        $model = parent::messages();
        $model["email.unique"] = "Email deve ser único";
        return $model;
    }
}
