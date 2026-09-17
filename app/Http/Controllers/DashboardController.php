<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
