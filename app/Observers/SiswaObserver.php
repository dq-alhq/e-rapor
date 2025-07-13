<?php

namespace App\Observers;

use App\Models\Siswa;
use App\Models\User;

class SiswaObserver
{
    /**
     * Handle the Siswa "created" event.
     */
    public function created(Siswa $siswa): void
    {
        $siswa->update([
            'user_id' => User::factory()->create([
                'name' => $name = removeGelar($siswa->nama),
                'username' => $username = str($name)->slug(),
                'email' => $siswa->email ?? $username . '@gmail.com'
            ])->id
        ]);
    }

    /**
     * Handle the Siswa "updated" event.
     */
    public function updated(Siswa $siswa): void
    {
        $siswa->user->update([
            'name' => $name = removeGelar($siswa->nama),
            'email' => $siswa->email ?? str($name)->slug() . '@gmail.com'
        ]);
    }

    /**
     * Handle the Siswa "deleted" event.
     */
    public function deleted(Siswa $siswa): void
    {
        $siswa->user->delete();
    }

    /**
     * Handle the Siswa "restored" event.
     */
    public function restored(Siswa $siswa): void
    {
        $siswa->user->restore();
    }

    /**
     * Handle the Siswa "force deleted" event.
     */
    public function forceDeleted(Siswa $siswa): void
    {
        $siswa->user->forceDelete();
    }
}
