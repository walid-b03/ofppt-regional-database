<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Establishment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $users = User::forSuperior($user)
            ->with(['establishment:id,code,name', 'headedEstablishment', 'headedComplex', 'headedRegion'])
            ->get();

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        $user = Auth::user();

        $establishments = match (true) {
            $user->isAdmin() => Establishment::all(),
            $user->isDRRG()  => Establishment::whereHas('complex', fn($q) => $q->where('region_id', $user->headedRegion->id))->get(),
            $user->isDRCX()  => Establishment::where('complex_id', $user->headedComplex->id)->get(),
            $user->isDRPD()  => collect([$user->headedEstablishment]),
            default          => collect(),
        };

        return Inertia::render('Users/Create', [
            'establishments' => $establishments,
            'availableRoles' => $this->availableRoles($user),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code'              => ['required', 'string', 'max:255', 'unique:users,code'],
            'first_name'        => ['required', 'string', 'max:255'],
            'last_name'         => ['required', 'string', 'max:255'],
            'cin'               => ['nullable', 'string', 'max:255', 'unique:users,cin'],
            'marital_status'    => ['nullable', 'in:single,married,divorced,widowed'],
            'children'          => ['nullable', 'integer', 'min:0'],
            'email'             => ['nullable', 'email', 'max:255', 'unique:users,email'],
            'phone'             => ['nullable', 'string', 'max:255'],
            'address'           => ['nullable', 'string', 'max:255'],
            'date_of_birth'     => ['nullable', 'date'],
            'date_of_recruitment' => ['nullable', 'date'],
            'diploma'           => ['nullable', 'string', 'max:255'],
            'rank'              => ['nullable', 'in:A1,A2,A3'],
            'role'              => ['required', 'in:admin,DRRG,DRCX,DRPD,AGAD,FRMT'],
            'password'          => ['required', 'string', 'min:8', 'confirmed'],
            'password_confirmation' => ['required', 'string'],
            'establishment_id'  => ['nullable', 'exists:establishments,id'],
        ]);

        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return back();
    }

    public function show(User $user)
    {
        $this->authorize('view', $user);

        $user->load(['establishment:id,code,name', 'headedEstablishment', 'headedComplex', 'headedRegion']);

        return Inertia::render('Users/Show', [
            'user' => $user,
        ]);
    }

    public function edit(User $user)
    {
        $this->authorize('update', $user);

        $authUser = Auth::user();

        $establishments = match (true) {
            $authUser->isAdmin() => Establishment::all(),
            $authUser->isDRRG()  => Establishment::whereHas('complex', fn($q) => $q->where('region_id', $authUser->headedRegion->id))->get(),
            $authUser->isDRCX()  => Establishment::where('complex_id', $authUser->headedComplex->id)->get(),
            $authUser->isDRPD()  => collect([$authUser->headedEstablishment]),
            default              => collect(),
        };

        $user->load(['establishment:id,code,name']);

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'establishments' => $establishments,
            'availableRoles' => $this->availableRoles($authUser),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $this->authorize('update', $user);

        $validated = $request->validate([
            'code'              => ['sometimes', 'required', 'string', 'max:255', 'unique:users,code,'.$user->id],
            'first_name'        => ['sometimes', 'required', 'string', 'max:255'],
            'last_name'         => ['sometimes', 'required', 'string', 'max:255'],
            'cin'               => ['nullable', 'string', 'max:255', 'unique:users,cin,'.$user->id],
            'marital_status'    => ['nullable', 'in:single,married,divorced,widowed'],
            'children'          => ['nullable', 'integer', 'min:0'],
            'email'             => ['nullable', 'email', 'max:255', 'unique:users,email,'.$user->id],
            'phone'             => ['nullable', 'string', 'max:255'],
            'address'           => ['nullable', 'string', 'max:255'],
            'date_of_birth'     => ['nullable', 'date'],
            'date_of_recruitment' => ['nullable', 'date'],
            'diploma'           => ['nullable', 'string', 'max:255'],
            'rank'              => ['nullable', 'in:A1,A2,A3'],
            'role'              => ['sometimes', 'required', 'in:admin,DRRG,DRCX,DRPD,AGAD,FRMT'],
            'establishment_id'  => ['nullable', 'exists:establishments,id'],
        ]);

        $user->update($validated);

        return back();
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

        $validated = $request->validate([
            'password'              => ['required', 'string', Password::defaults(), 'confirmed'],
            'password_confirmation' => ['required', 'string'],
        ]);

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back();
    }

    private function availableRoles(User $authUser): array
    {
        return match (true) {
            $authUser->isAdmin() => ['admin', 'DRRG', 'DRCX', 'DRPD', 'AGAD', 'FRMT'],
            $authUser->isDRRG()  => ['DRCX', 'DRPD', 'AGAD', 'FRMT'],
            $authUser->isDRCX()  => ['DRPD', 'AGAD', 'FRMT'],
            $authUser->isDRPD()  => ['AGAD', 'FRMT'],
            default              => [],
        };
    }
}
