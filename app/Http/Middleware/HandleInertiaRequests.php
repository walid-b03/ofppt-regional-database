<?php

namespace App\Http\Middleware;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => fn() => $request->user() ? [
                'user' => tap($request->user()->load([
                    'establishment.complex.region',
                    'headedEstablishment.complex.region',
                    'headedComplex.region',
                    'headedRegion',
                ]), function ($user) {
                    $user->makeHidden([
                        'password', 'remember_token', 'deleted_at',
                        'email_verified_at', 'two_factor_secret',
                        'two_factor_recovery_codes', 'two_factor_confirmed_at',
                    ])->append([]);
                }),
            ] : null,
        ];
    }
}
