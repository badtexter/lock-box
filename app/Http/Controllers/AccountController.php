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
            'password' => [
                'required',
                'string',
                'min:14',
                'regex:/[A-Z]/',
                'regex:/[!@#$%^&*()_+\-=[\]{};\'":\\|,.<>\/?]/',
            ],
        ], [
            'password.regex' => 'Hasło musi zawierać dużą literę i znak specjalny.',
        ]);

        Account::create($validated);

        return back();
    }
}
