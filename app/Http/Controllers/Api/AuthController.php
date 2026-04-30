<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserResource;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'code' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        if (!Auth::attempt($request->only('code', 'password'))) {
            return response()->json([
                'message' => 'Les identifiants fournis sont incorrects.',
            ], 401);
        }

        $user = $request->user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie.',
            'payload' => new UserResource($user->load([
                'establishment',
                'headedEstablishment',
                'headedComplex',
                'headedRegion'
            ])),
            'token' => $token,
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie.',
        ], 200);
    }

    public function user(Request $request)
    {
        return response()->json([
            'message' => 'Profil récupéré avec succès.',
            'payload' => $request->user()->load([
                'establishment',
                'headedEstablishment',
                'headedComplex',
                'headedRegion'
            ]),
        ], 200);
    }
}
