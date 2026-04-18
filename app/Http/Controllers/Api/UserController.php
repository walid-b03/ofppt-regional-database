<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', User::class);

        $users = User::forSuperior($request->user())->get();

        return response()->json([
            'message' => 'Utilisateurs récupérés avec succès.',
            'payload' => UserResource::collection($users),
        ], 200);
    }

    public function show(Request $request, User $user)
    {
        $this->authorize('view', $user);

        $user->load([
            'establishment:id,code,name,head_id,complex_id',
            'establishment.complex:id,head_id,region_id',
            'headedEstablishment:id,code,name,head_id,complex_id',
            'headedComplex:id,code,name,head_id,region_id',
            'headedRegion:id,code,name,head_id',
        ]);

        return response()->json([
            'message' => 'Utilisateur récupéré avec succès.',
            'payload' => new UserResource($user),
        ], 200);
    }
}
