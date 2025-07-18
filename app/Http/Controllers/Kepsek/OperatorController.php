<?php

namespace App\Http\Controllers\Kepsek;

use App\Http\Controllers\Controller;
use App\Http\Requests\OperatorRequest;
use App\Http\Resources\OperatorDetailsResource;
use App\Http\Resources\OperatorResource;
use App\Models\Operator;
use Illuminate\Http\Request;

class OperatorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->q ?? null;
        $perPage = $request->perPage ?? 10;

        $operators = Operator::query()
            ->with(['wilayah'])
            ->when($search, function ($query, $search) {
                return $query->where('nama', 'like', "%$search%");
            })
            ->paginate($perPage);

        return inertia('operator/index', [
                'operators' => fn() => OperatorResource::collection($operators),

                'page_options' => [
                    'search' => $search,
                    'perPage' => $perPage
                ],
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('operator/form', [
            'operator' => new Operator(),
            'form' => [
                'title' => 'Buat Operator Baru',
                'url' => route('operator.store'),
                'method' => 'post'
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OperatorRequest $request)
    {
        $operator = Operator::query()->create($request->validated());

        if ($request->hasFile('avatar')) {
            $operator->user->update([
                'avatar' => $request->file('avatar')->store('operator')
            ]);
        }

        toast('Operator Berhasil Ditambahkan');
        return to_route('operator.show', $operator);
    }

    /**
     * Display the specified resource.
     */
    public function show(Operator $operator)
    {
        return inertia('operator/show', [
            'operator' => OperatorDetailsResource::make($operator->load(['wilayah'])),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Operator $operator)
    {
        return inertia('operator/form', [
            'operator' => OperatorDetailsResource::make($operator->load(['wilayah'])),
            'form' => [
                'title' => 'Edit Operator',
                'url' => route('operator.update', $operator),
                'method' => 'put'
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OperatorRequest $request, Operator $operator)
    {
        $operator->update($request->validated());

        if ($request->hasFile('avatar')) {
            hapusFile($operator->user->avatar);
            $operator->user->update([
                'avatar' => $request->file('avatar')->store('operator')
            ]);
        }

        toast('Data Operator Berhasil Diperbarui');
        return to_route('operator.show', $operator);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Operator $operator)
    {
        //
    }
}
