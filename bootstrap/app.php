<?php

use App\Http\Middleware\GuruMiddleware;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\KepsekMiddleware;
use App\Http\Middleware\OperatorMiddleware;
use App\Http\Middleware\SiswaMiddleware;
use App\Http\Middleware\TapelMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
            TapelMiddleware::class
        ]);

        $middleware->alias([
            'kepsek' => KepsekMiddleware::class,
            'guru' => GuruMiddleware::class,
            'siswa' => SiswaMiddleware::class,
            'operator' => OperatorMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
//        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
//            if (!app()->environment(['local', 'testing']) && in_array($response->getStatusCode(), [500, 503, 404, 403])) {
//                return \Inertia\Inertia::render('errors', ['status' => $response->getStatusCode()])
//                    ->toResponse($request)
//                    ->setStatusCode($response->getStatusCode());
//            } elseif ($response->getStatusCode() === 419) {
//                return back()->with([
//                    'message' => 'The page expired, please try again.',
//                ]);
//            }
//            return $response;
//        });
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            if (in_array($response->getStatusCode(), [500, 503, 404, 403])) {
                return inertia('errors', ['status' => $response->getStatusCode(), 'message' => $exception->getMessage()])
                    ->toResponse($request)
                    ->setStatusCode($response->getStatusCode());
            } elseif ($response->getStatusCode() === 419) {
                toast('The page expired, please try again.', 'error');
                return back();
            }
            return $response;
        });
    })->create();
