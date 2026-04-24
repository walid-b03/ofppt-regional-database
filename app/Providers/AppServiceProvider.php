<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;
use App\Events\DataSyncEvent;
use App\Listeners\PushDataToSatellite;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Event::listen(
            DataSyncEvent::class,
            PushDataToSatellite::class
        );
    }
}
