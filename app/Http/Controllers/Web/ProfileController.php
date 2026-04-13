<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function show()
    {
        $user = Auth::user()->load([
            'establishment.complex.region',
        ]);

        return Inertia::render('Profile', [
            'user' => $user,
        ]);
    }

    public function edit()
    {
        $user = Auth::user()->load([
            'establishment.complex.region',
        ]);

        return Inertia::render('Profile/Edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $rules = [
            'first_name'         => ['sometimes', 'required', 'string', 'max:255'],
            'last_name'          => ['sometimes', 'required', 'string', 'max:255'],
            'cin'                => ['sometimes', 'nullable', 'string', 'max:255', 'unique:users,cin,'.$user->id],
            'marital_status'     => ['sometimes', 'nullable', 'in:single,married,divorced,widowed'],
            'children'           => ['sometimes', 'nullable', 'integer', 'min:0'],
            'email'              => ['sometimes', 'required', 'email', 'max:255', 'unique:users,email,'.$user->id],
            'phone'              => ['sometimes', 'nullable', 'string', 'max:255'],
            'address'            => ['sometimes', 'nullable', 'string', 'max:255'],
            'date_of_birth'      => ['sometimes', 'nullable', 'date'],
            'date_of_recruitment' => ['sometimes', 'nullable', 'date'],
            'diploma'            => ['sometimes', 'nullable', 'string', 'max:255'],
            'rank'               => ['sometimes', 'nullable', 'in:A1,A2,A3'],
            'role_label'   => ['sometimes', 'nullable', 'string', 'max:255'],
        ];

        $validated = $request->validate($rules);

        $user->update($validated);

        return back();
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password'      => ['required', 'string'],
            'password'              => ['required', 'string', Password::defaults(), 'confirmed'],
            'password_confirmation' => ['required', 'string'],
        ]);

        $user = $request->user();

        abort_unless(Hash::check($request->current_password, $user->password), 422, 'Le mot de passe actuel est incorrect.');

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return back();
    }
}
