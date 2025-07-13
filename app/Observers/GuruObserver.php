<?php

namespace App\Observers;

use App\Models\Guru;
use App\Models\User;

class GuruObserver
{
    /**
     * Handle the Guru "created" event.
     */
    public function created(Guru $guru): void
    {
        $guru->update([
            'user_id' => User::factory()->create([
                'name' => $name = removeGelar($guru->nama),
                'username' => $username = str($name)->slug(),
                'email' => $guru->email ?? $username . '@gmail.com'
            ])->id
        ]);
    }

    /**
     * Handle the Guru "updated" event.
     */
    public function updated(Guru $guru): void
    {
        $guru->user->update([
            'name' => $name = removeGelar($guru->nama),
            'email' => $guru->email ?? str($name)->slug() . '@gmail.com'
        ]);
    }

    /**
     * Handle the Guru "deleted" event.
     */
    public function deleted(Guru $guru): void
    {
        $guru->user->delete();
    }

    /**
     * Handle the Guru "restored" event.
     */
    public function restored(Guru $guru): void
    {
        $guru->user->restore();
    }

    /**
     * Handle the Guru "force deleted" event.
     */
    public function forceDeleted(Guru $guru): void
    {
        $guru->user->forceDelete();
    }
}
