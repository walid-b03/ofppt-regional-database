<?php

namespace App\Listeners;

use App\Events\DataSyncEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PushDataToSatellite implements ShouldQueue
{
private array $fillableMap = [
        'user' => [
            'id', 'code', 'first_name', 'last_name', 'cin', 'marital_status',
            'children', 'email', 'phone', 'address', 'date_of_birth',
            'date_of_recruitment', 'site_of_recruitment', 'diploma',
            'rank', 'role', 'role_label', 'establishment_id',
        ],
        'region' => ['id', 'code', 'name', 'email', 'phone', 'head_id'],
        'complex' => ['id', 'code', 'name', 'email', 'phone', 'city', 'head_id', 'region_id'],
        'establishment' => ['id', 'code', 'name', 'sector', 'type', 'email', 'phone', 'address', 'head_id', 'complex_id'],
    ];

    public function handle(DataSyncEvent $event): void
    {
        $model = $event->model;
        $type = strtolower(class_basename($model));

        $data = $model->only($this->fillableMap[$type] ?? []);

        if ($type === 'user' && in_array($event->action, ['created', 'updated'], true)) {
            $data['password'] = $model->getRawOriginal('password');
        }

        $payload = [
            'type' => $type,
            'action' => $event->action,
            'timestamp' => now()->toIso8601String(),
            'data' => $data,
        ];

        $payloadJson = json_encode($payload);
        $hmac = hash_hmac('sha256', $payloadJson, config('services.satellite.shared_secret'));

        $response = Http::withHeaders([
            'X-SHARED-SECRET' => $hmac,
        ])->post(config('services.satellite.gest_attest_url') . '/api/webhook/data-sync', $payload);

        if (!$response->successful()) {
            Log::error('Webhook push failed', ['type' => $type, 'id' => $model->id]);
            throw new \Exception('Webhook failed');
        }
    }
}
