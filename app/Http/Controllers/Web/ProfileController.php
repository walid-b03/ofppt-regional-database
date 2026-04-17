<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function show()
    {
        return Inertia::render('Profile/Show', [
            'user' => auth()->user(),
        ]);
    }

    public function edit()
    {
        return Inertia::render('Profile/Edit', [
            'user' => auth()->user(),
        ]);
    }

    public function update(Request $request)
    {
        $request->user()->update($request->validate([
            'first_name'          => ['sometimes', 'required', 'string', 'max:255'],
            'last_name'           => ['sometimes', 'required', 'string', 'max:255'],
            'cin'                 => ['sometimes', 'nullable', 'string', 'max:255', Rule::unique('users')->ignore($request->user()->id)],
            'marital_status'      => ['sometimes', 'nullable', 'in:single,married,divorced,widowed'],
            'children'            => ['sometimes', 'nullable', 'integer', 'min:0'],
            'email'               => ['sometimes', 'required', 'email', 'max:255', Rule::unique('users')->ignore($request->user()->id)],
            'phone'               => ['sometimes', 'nullable', 'string', 'max:255'],
            'address'             => ['sometimes', 'nullable', 'string', 'max:255'],
            'date_of_birth'       => ['sometimes', 'nullable', 'date', 'before:today'],
            'date_of_recruitment' => ['sometimes', 'nullable', 'date', 'before_or_equal:today'],
            'diploma'             => ['sometimes', 'nullable', 'string', 'max:255'],
            'rank'                => ['sometimes', 'nullable', 'in:A1,A2,A3'],
            'role_label'          => ['sometimes', 'nullable', 'string', 'max:255'],
        ]));

        return back();
    }

    public function updatePassword(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'current_password' => ['required', 'string'],
            'password'         => ['required', 'string', Password::defaults(), 'confirmed'],
        ]);

        if (!Hash::check($validated['current_password'], $user->password)) {
            abort(422, 'Le mot de passe actuel est incorrect.');
        }

        $user->update([
            'password' => $validated['password'],
        ]);

        return back();
    }
}
