<?php

use App\Models\Account;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
});

test('the dashboard only lists the current user\'s accounts', function () {
    $user = User::factory()->create();
    $ownAccount = Account::factory()->for($user)->create(['platform' => 'GitHub']);
    Account::factory()->create(['platform' => 'Someone Else']);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->has('accounts', 1)
            ->where('accounts.0.id', $ownAccount->id)
            ->where('accounts.0.platform', 'GitHub')
        );
});

test('the dashboard never sends the encrypted password to the browser', function () {
    $user = User::factory()->create();
    Account::factory()->for($user)->create();

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->has('accounts.0', fn (Assert $account) => $account
                ->hasAll(['id', 'platform', 'username', 'email', 'created_at', 'updated_at'])
                ->missing('password')
            )
        );
});
