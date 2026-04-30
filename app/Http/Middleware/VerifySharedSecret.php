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

        $hmac = hash_hmac('sha256', $request->fullUrl(), config('services.satellite.shared_secret'));

        if (!hash_equals($hmac, $sharedSecret)) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return $next($request);
    }
}
