<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class RoomController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Room::class);

        $rooms = Room::forUser($request->user())->get();

        return response()->json([
            'message' => 'Salles récupérées avec succès.',
            'payload' => RoomResource::collection($rooms),
        ], 200);
    }

    public function show(Request $request, Room $room)
    {
        $this->authorize('view', $room);

        $room->load(['establishment:id,code,name,head_id,complex_id']);

        return response()->json([
            'message' => 'Salle récupérée avec succès.',
            'payload' => new RoomResource($room),
        ], 200);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Room::class);

        $room = Room::create($request->validate([
            'code' => ['required', 'string', 'max:255', 'unique:rooms,code'],
            'name' => ['required', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:255'],
            'establishment_id' => ['required', 'exists:establishments,id'],
        ]));

        $room->load(['establishment:id,code,name,head_id,complex_id']);

        return response()->json([
            'message' => 'Salle créée avec succès.',
            'payload' => new RoomResource($room),
        ], 201);
    }

    public function update(Request $request, Room $room)
    {
        $this->authorize('update', $room);

        $room->update($request->validate([
            'code' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('rooms')->ignore($room->id)],
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:255'],
            'establishment_id' => ['sometimes', 'required', 'exists:establishments,id'],
        ]));

        $room->load(['establishment:id,code,name,head_id,complex_id']);

        return response()->json([
            'message' => 'Salle mise à jour avec succès.',
            'payload' => new RoomResource($room),
        ], 200);
    }
}
