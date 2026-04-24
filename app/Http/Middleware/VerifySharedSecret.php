<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifySharedSecret
{
    public function handle(Request $request, Closure $next): Response
    {
        $sharedSecret = $request->header('X-SHARED-SECRET');

        if (!$sharedSecret) return response()->json(['error' => 'Missing signature'], 403);

        if ($sharedSecret !== config('services.satellite.shared_secret')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
