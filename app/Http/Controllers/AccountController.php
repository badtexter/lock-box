<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Services\PasswordCipher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

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

        $validated['password'] = PasswordCipher::encrypt($validated['password']);
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
        $validated['password'] = PasswordCipher::encrypt($validated['password']);
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

    public function reveal(Request $request, Account $account)
    {
        $this->authorize('view', $account);

        $validated = $request->validate([
            'master_password' => ['required', 'string'],
        ]);

        if (! Hash::check($validated['master_password'], $request->user()->password)) {
            throw ValidationException::withMessages([
                'master_password' => 'Podane haslo glowne jest nieprawidlowe.',
            ]);
        }

        try {
            $password = PasswordCipher::isEncrypted($account->password)
                ? PasswordCipher::decrypt($account->password)
                : decrypt($account->password);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Unable to reveal password.'], 400);
        }

        return response()->json(['password' => $password]);
    }
}
