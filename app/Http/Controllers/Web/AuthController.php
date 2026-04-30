<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'code' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        if (!auth()->attempt($credentials, $request->boolean('remember'))) {
            return back()->withErrors([
                'code' => 'Les identifiants fournis sont incorrects.',
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended(
            route('profile.show', absolute: false)
        );
    }

    public function logout(Request $request): RedirectResponse
    {
        auth()->guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');
    }
}
