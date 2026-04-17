<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LoadAuthUserRelations
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($user = auth()->user()) {
            $user->load([
                'establishment.complex.region',
                'headedEstablishment.complex.region',
                'headedComplex.region',
                'headedRegion',
            ]);
        }

        return $next($request);
    }
}
