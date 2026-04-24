<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'cin' => $this->cin,
            'marital_status' => $this->marital_status,
            'children' => $this->children,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'date_of_birth' => $this->date_of_birth,
            'date_of_recruitment' => $this->date_of_recruitment,
            'diploma' => $this->diploma,
            'rank' => $this->rank,
            'role' => $this->role,
            'role_label' => $this->role_label,
            'password' => $this->password,
            'establishment_id' => $this->establishment_id,
        ];
    }
}
