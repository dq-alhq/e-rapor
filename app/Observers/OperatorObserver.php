<?php

namespace App\Observers;

use App\Models\Operator;
use App\Models\User;

class OperatorObserver
{
    /**
     * Handle the Operator "created" event.
     */
    public function created(Operator $operator): void
    {
        $operator->update([
            'user_id' => User::factory()->create([
                'name' => $name = removeGelar($operator->nama),
                'username' => $username = str($name)->slug(),
                'email' => $operator->email ?? $username . '@gmail.com'
            ])->id
        ]);
    }

    /**
     * Handle the Operator "updated" event.
     */
    public function updated(Operator $operator): void
    {
        $operator->user->update([
            'name' => $name = removeGelar($operator->nama),
            'email' => $operator->email ?? str($name)->slug() . '@gmail.com'
        ]);
    }

    /**
     * Handle the Operator "deleted" event.
     */
    public function deleted(Operator $operator): void
    {
        $operator->user->delete();
    }

    /**
     * Handle the Operator "restored" event.
     */
    public function restored(Operator $operator): void
    {
        $operator->user->restore();
    }

    /**
     * Handle the Operator "force deleted" event.
     */
    public function forceDeleted(Operator $operator): void
    {
        $operator->user->forceDelete();
    }
}
