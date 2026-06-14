<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $accounts = Account::latest()->get();

        return Inertia::render('dashboard', [
            'accounts' => $accounts,
        ]);
    }
}
