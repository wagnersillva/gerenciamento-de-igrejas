<?php

namespace App\Http\Requests\Churches;

use Illuminate\Foundation\Http\FormRequest;

class ChurchStoreRequest extends FormRequest
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
            'name' => 'required',
        ];
    }

    public function messages()
    {
        $model = parent::messages();
        $model["name.required"] = "Nome é obrigatório";
        return $model;
    }
}
