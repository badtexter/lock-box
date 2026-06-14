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
            'password' => ['required', 'string', 'max:255'],
        ]);

        $validated['password'] = encrypt($validated['password']);
        $validated['user_id'] = $request->user()->id;

        Account::create($validated);

        return back();
    }

    public function update(Request $request, Account $account)
    {
        $validated = $request->validate([
            'platform' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'password' => ['required', 'string', 'max:255'],
        ]);

        $this->authorize('update', $account);
        $validated['password'] = encrypt($validated['password']);
        $account->update($validated);

        return back();
    }

    public function destroy(Account $account)
    {
        $this->authorize('delete', $account);
        $account->delete();

        return back();
    }

    public function show(Account $account)
    {
        $this->authorize('view', $account);

        // Don't expose encrypted password in show response
        $data = $account->toArray();
        unset($data['password']);

        return response()->json($data);
    }

    public function reveal(Account $account)
    {
        $this->authorize('view', $account);

        try {
            $password = decrypt($account->password);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Unable to reveal password.'], 400);
        }

        return response()->json(['password' => $password]);
    }
}
