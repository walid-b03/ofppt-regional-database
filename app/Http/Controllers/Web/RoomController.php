<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Establishment;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Room::class);

        return Inertia::render('Rooms/Index', [
            'rooms' => Room::forUser(auth()->user())->get(),
        ]);
    }

    public function create()
    {
        $this->authorize('create', Room::class);

        return Inertia::render('Rooms/Create', [
            'availableEstablishments' => Establishment::forHead(auth()->user())->get(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Room::class);

        Room::create($request->validate([
            'code'             => ['required', 'string', 'max:255', 'unique:rooms,code'],
            'name'             => ['required', 'string', 'max:255'],
            'type'             => ['nullable', 'string', 'max:255'],
            'establishment_id' => ['required', 'exists:establishments,id'],
        ]));

        return redirect()->action([RoomController::class, 'index']);
    }

    public function show(Room $room)
    {
        $this->authorize('view', $room);

        return Inertia::render('Rooms/Show', [
            'room' => $room->load(['establishment:id,code,name,head_id,complex_id']),
        ]);
    }

    public function edit(Room $room)
    {
        $this->authorize('update', $room);

        return Inertia::render('Rooms/Edit', [
            'room' => $room->load(['establishment:id,code,name,head_id,complex_id']),
            'availableEstablishments' => Establishment::forHead(auth()->user())->get(),
        ]);
    }

    public function update(Request $request, Room $room)
    {
        $this->authorize('update', $room);

        $room->update($request->validate([
            'code'             => ['sometimes', 'required', 'string', 'max:255', Rule::unique('rooms')->ignore($room->id)],
            'name'             => ['sometimes', 'required', 'string', 'max:255'],
            'type'             => ['nullable', 'string', 'max:255'],
            'establishment_id' => ['sometimes', 'required', 'exists:establishments,id'],
        ]));

        return redirect()->action([RoomController::class, 'index']);
    }

    public function destroy(Room $room)
    {
        $this->authorize('delete', $room);

        $room->delete();

        return back();
    }
}
