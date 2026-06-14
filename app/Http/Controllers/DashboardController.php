<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $accounts = Account::query()
            ->whereBelongsTo($request->user())
            ->latest()
            ->get(['id', 'platform', 'username', 'email', 'created_at', 'updated_at']);

        return Inertia::render('dashboard', [
            'accounts' => $accounts,
        ]);
    }
}
