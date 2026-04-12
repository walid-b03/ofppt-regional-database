<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    protected array $roleMethods = [
        'admin'  => 'isAdmin',
        'DRRG'   => 'isDRRG',
        'DRCX'   => 'isDRCX',
        'DRPD'   => 'isDRPD',
        'AGAD'   => 'isAGAD',
        'FRMT'   => 'isFRMT',
    ];

    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (! $user) {
            abort(401);
        }

        foreach ($roles as $role) {
            $method = $this->roleMethods[$role];

            if (!isset($method)) abort(403, "Unknown role: {$role}");

            if ($user->{$method}()) return $next($request);
        }

        abort(403, 'Unauthorized role.');
    }
}
