<?php

namespace App\Policies;

use App\Models\Account;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class AccountPolicy
{
    use HandlesAuthorization;

    public function view(User $user, Account $account): bool
    {
        return $account->user_id === $user->id;
    }

    public function update(User $user, Account $account): bool
    {
        return $account->user_id === $user->id;
    }

    public function delete(User $user, Account $account): bool
    {
        return $account->user_id === $user->id;
    }
}
