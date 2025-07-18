<?php

namespace App\Http\Middleware;

use App\Http\Resources\AuthUserResource;
use App\Http\Resources\SekolahResource;
use App\Models\Sekolah;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

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
            'sekolah' => fn() => SekolahResource::make(Sekolah::query()->with(['wilayah', 'kepsek'])->first()),
            'tapel_aktif' => fn() => $request->session()->get('tapel') ?? null,
            'auth' => [
                'user' => $request->user() ? AuthUserResource::make($request->user()) : null,
            ],
            'ziggy' => fn(): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
                'prev_url' => $request->headers->get('referer') == $request->url() ? null : $request->headers->get('referer'),
            ],
            'toast' => fn() => [
                'message' => $request->session()->get('message'),
                'type' => $request->session()->get('type') ?? 'success',
            ],
        ];
    }
}
