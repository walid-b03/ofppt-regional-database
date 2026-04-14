<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Establishment;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $rooms = Room::forUser($user)
            ->with(['establishment:id,code,name'])
            ->get();

        return Inertia::render('Rooms/Index', [
            'rooms' => $rooms,
        ]);
    }

    public function create()
    {
        $user = Auth::user();

        $establishments = match (true) {
            $user->isAdmin() => Establishment::all(),
            $user->isDRRG()  => Establishment::whereHas('complex', fn($q) => $q->where('region_id', $user->headedRegion->id))->get(),
            $user->isDRCX()  => Establishment::where('complex_id', $user->headedComplex->id)->get(),
            $user->isDRPD() || $user->isAGAD() => collect([$user->headedEstablishment]),
            default          => collect(),
        };

        return Inertia::render('Rooms/Create', [
            'establishments' => $establishments,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code'             => ['required', 'string', 'max:255', 'unique:rooms,code'],
            'name'             => ['required', 'string', 'max:255'],
            'type'             => ['nullable', 'string', 'max:255'],
            'establishment_id' => ['required', 'exists:establishments,id'],
        ]);

        Room::create($validated);

        return redirect()->route(str_replace('.store', '.index', Route::currentRouteName()));
    }

    public function show(Room $room)
    {
        $this->authorize('view', $room);

        $room->load(['establishment:id,code,name']);

        return Inertia::render('Rooms/Show', [
            'room' => $room,
        ]);
    }

    public function edit(Room $room)
    {
        $this->authorize('update', $room);

        $user = Auth::user();

        $establishments = match (true) {
            $user->isAdmin() => Establishment::all(),
            $user->isDRRG()  => Establishment::whereHas('complex', fn($q) => $q->where('region_id', $user->headedRegion->id))->get(),
            $user->isDRCX()  => Establishment::where('complex_id', $user->headedComplex->id)->get(),
            $user->isDRPD() || $user->isAGAD() => collect([$user->headedEstablishment]),
            default          => collect(),
        };

        $room->load(['establishment:id,code,name']);

        return Inertia::render('Rooms/Edit', [
            'room' => $room,
            'establishments' => $establishments,
        ]);
    }

    public function update(Request $request, Room $room)
    {
        $this->authorize('update', $room);

        $validated = $request->validate([
            'code'             => ['sometimes', 'required', 'string', 'max:255', 'unique:rooms,code,'.$room->id],
            'name'             => ['sometimes', 'required', 'string', 'max:255'],
            'type'             => ['nullable', 'string', 'max:255'],
            'establishment_id' => ['sometimes', 'required', 'exists:establishments,id'],
        ]);

        $room->update($validated);

        return redirect()->route(str_replace('.update', '.index', Route::currentRouteName()));
    }

    public function destroy(Room $room)
    {
        $this->authorize('delete', $room);

        $room->delete();

        return back();
    }
}
