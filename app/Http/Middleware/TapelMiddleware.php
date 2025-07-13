<?php

namespace App\Http\Middleware;

use App\Models\Tapel;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TapelMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (session()->has('tapel')) {
            session()->forget('tapel');
        }
        session()->put('tapel', Tapel::query()->where('aktif', true)->first());
        return $next($request);
    }
}
