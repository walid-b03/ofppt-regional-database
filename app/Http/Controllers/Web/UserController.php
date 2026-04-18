<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Establishment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', User::class);

        return Inertia::render('Users/Index', [
            'users' => User::forSuperior(auth()->user())->get(),
        ]);
    }

    public function create()
    {
        $this->authorize('create', User::class);

        return Inertia::render('Users/Create', [
            'availableRoles'            => auth()->user()->availableRoles(),
            'availableEstablishments'   => Establishment::forHead(auth()->user())->get(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', User::class);

        User::create($request->validate([
            'code'                => ['required', 'string', 'max:255', 'unique:users,code'],
            'first_name'          => ['required', 'string', 'max:255'],
            'last_name'           => ['required', 'string', 'max:255'],
            'cin'                 => ['nullable', 'string', 'max:255', 'unique:users,cin'],
            'marital_status'      => ['nullable', 'in:single,married,divorced,widowed'],
            'children'            => ['nullable', 'integer', 'min:0'],
            'email'               => ['nullable', 'email', 'max:255', 'unique:users,email'],
            'phone'               => ['nullable', 'string', 'max:255'],
            'address'             => ['nullable', 'string', 'max:255'],
            'date_of_birth'       => ['nullable', 'date', 'before:today'],
            'date_of_recruitment' => ['nullable', 'date', 'before_or_equal:today'],
            'diploma'             => ['nullable', 'string', 'max:255'],
            'rank'                => ['nullable', 'in:A1,A2,A3'],
            'role'                => ['required', Rule::in(auth()->user()->availableRoles())],
            'password'            => ['required', 'string', 'min:8', 'confirmed'],
            'establishment_id'    => [
                'required_if:role,DRRG,DRCX,DRPD,AGAD,FRMT',
                'exists:establishments,id',
            ],
        ]));

        return redirect()->action([UserController::class, 'index']);
    }

    public function show(User $user)
    {
        $this->authorize('view', $user);

        return Inertia::render('Users/Show', [
            'user' => $user->load([
                'establishment:id,code,name,head_id,complex_id',
                'headedEstablishment:id,code,name,head_id,complex_id',
                'headedComplex:id,code,name,head_id,region_id',
                'headedRegion:id,code,name,head_id',
            ]),
        ]);
    }

    public function edit(User $user)
    {
        $this->authorize('update', $user);

        return Inertia::render('Users/Edit', [
            'availableRoles'          => auth()->user()->availableRoles(),
            'availableEstablishments' => Establishment::forHead(auth()->user())->get(),
            'user'                    => $user->load([
                'establishment:id,code,name,head_id,complex_id',
                'headedEstablishment:id,code,name,head_id,complex_id',
                'headedComplex:id,code,name,head_id,region_id',
                'headedRegion:id,code,name,head_id',
            ]),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $this->authorize('update', $user);

        $user->update($request->validate([
            'code'                => ['sometimes', 'required', 'string', 'max:255', Rule::unique('users')->ignore($user->id)],
            'first_name'          => ['sometimes', 'required', 'string', 'max:255'],
            'last_name'           => ['sometimes', 'required', 'string', 'max:255'],
            'cin'                 => ['nullable', 'string', 'max:255', Rule::unique('users')->ignore($user->id)],
            'marital_status'      => ['nullable', 'in:single,married,divorced,widowed'],
            'children'            => ['nullable', 'integer', 'min:0'],
            'email'               => ['nullable', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'phone'               => ['nullable', 'string', 'max:255'],
            'address'             => ['nullable', 'string', 'max:255'],
            'date_of_birth'       => ['nullable', 'date', 'before:today'],
            'date_of_recruitment' => ['nullable', 'date', 'before_or_equal:today'],
            'diploma'             => ['nullable', 'string', 'max:255'],
            'rank'                => ['nullable', 'in:A1,A2,A3'],
            'role'                => ['sometimes', 'required', Rule::in(auth()->user()->availableRoles())],
            'establishment_id'    => [
                'sometimes',
                'required_if:role,DRRG,DRCX,DRPD,AGAD,FRMT',
                'exists:establishments,id',
            ],
        ]));

        return redirect()->action([UserController::class, 'index']);
    }

    public function destroy(User $user)
    {
        $this->authorize('delete', $user);

        $user->delete();

        return back();
    }

    public function updatePassword(Request $request, User $user)
    {
        $this->authorize('update', $user);

        $rules = [
            'password' => ['required', 'string', Password::defaults(), 'confirmed'],
        ];

        if ($user->id === auth()->id()) {
            $rules['current_password'] = [
                'required',
                'string',
                function($fail) use ($user) {
                    if (!Hash::check(request('current_password'), $user->password)) {
                        $fail('The current password is incorrect.');
                    }
                },
            ];
        }

        $user->update($request->validate($rules));

        return back();
    }
}
