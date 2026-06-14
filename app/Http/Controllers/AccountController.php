<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'platform' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            // Passwords are required, but they are not validated. I want to encourage users to use strong passwords, 
            // but I don't want to force them to use a specific format. 
            // I want to allow users to use any password they want.
            'password' => ['required', 'string', 'max:255'],
        ]);

        Account::create($validated);

        return back();
    }
}
