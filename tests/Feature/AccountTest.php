<?php

use App\Models\Account;
use App\Models\User;
use App\Services\PasswordCipher;
use Illuminate\Support\Facades\RateLimiter;

test('guests cannot manage accounts', function () {
    $account = Account::factory()->create();

    $this->post(route('accounts.store'), [
        'platform' => 'GitHub',
        'username' => 'dev@example.com',
        'email' => 'dev@example.com',
        'password' => 'super-secret',
    ])->assertRedirect(route('login'));

    $this->put(route('accounts.update', $account), [
        'platform' => 'GitHub',
        'username' => 'dev@example.com',
        'email' => 'dev@example.com',
        'password' => 'super-secret',
    ])->assertRedirect(route('login'));

    $this->delete(route('accounts.destroy', $account))
        ->assertRedirect(route('login'));

    // A JSON request gets a 401, not a redirect to the login page.
    $this->postJson(route('accounts.reveal', $account), [
        'master_password' => 'password',
    ])->assertUnauthorized();
});

test('a user can create an account', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('accounts.store'), [
        'platform' => 'GitHub',
        'username' => 'dev@example.com',
        'email' => 'dev@example.com',
        'password' => 'super-secret-123',
    ]);

    $response->assertSessionHasNoErrors()->assertRedirect();

    $account = Account::sole();

    expect($account->user_id)->toBe($user->id)
        ->and($account->platform)->toBe('GitHub')
        ->and($account->email)->toBe('dev@example.com');

    // The stored password is encrypted, never the plain value.
    expect($account->password)->not->toBe('super-secret-123');
    expect(PasswordCipher::isEncrypted($account->password))->toBeTrue();
    expect(PasswordCipher::decrypt($account->password))->toBe('super-secret-123');
});

test('platform, username, email and password are required to create an account', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('accounts.store'), []);

    $response->assertSessionHasErrors(['platform', 'username', 'email', 'password']);
    expect(Account::count())->toBe(0);
});

test('email must be a valid email address to create an account', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('accounts.store'), [
        'platform' => 'GitHub',
        'username' => 'dev',
        'email' => 'not-an-email',
        'password' => 'super-secret-123',
    ]);

    $response->assertSessionHasErrors('email');
    expect(Account::count())->toBe(0);
});

test('the owner can update their account', function () {
    $user = User::factory()->create();
    $account = Account::factory()->for($user)->create([
        'platform' => 'GitHub',
    ]);

    $response = $this->actingAs($user)->put(route('accounts.update', $account), [
        'platform' => 'GitLab',
        'username' => 'updated@example.com',
        'email' => 'updated@example.com',
        'password' => 'new-super-secret',
    ]);

    $response->assertSessionHasNoErrors()->assertRedirect();

    $account->refresh();

    expect($account->platform)->toBe('GitLab')
        ->and($account->email)->toBe('updated@example.com');
    expect(PasswordCipher::decrypt($account->password))->toBe('new-super-secret');
});

test('a user cannot update another user\'s account', function () {
    $owner = User::factory()->create();
    $intruder = User::factory()->create();
    $account = Account::factory()->for($owner)->create([
        'platform' => 'GitHub',
    ]);

    $response = $this->actingAs($intruder)->put(route('accounts.update', $account), [
        'platform' => 'Hijacked',
        'username' => 'hacker@example.com',
        'email' => 'hacker@example.com',
        'password' => 'whatever',
    ]);

    $response->assertForbidden();
    expect($account->refresh()->platform)->toBe('GitHub');
});

test('the owner can delete their account', function () {
    $user = User::factory()->create();
    $account = Account::factory()->for($user)->create();

    $response = $this->actingAs($user)->delete(route('accounts.destroy', $account));

    $response->assertSessionHasNoErrors()->assertRedirect();
    expect(Account::find($account->id))->toBeNull();
});

test('a user cannot delete another user\'s account', function () {
    $owner = User::factory()->create();
    $intruder = User::factory()->create();
    $account = Account::factory()->for($owner)->create();

    $response = $this->actingAs($intruder)->delete(route('accounts.destroy', $account));

    $response->assertForbidden();
    expect(Account::find($account->id))->not->toBeNull();
});

test('the owner can reveal their password with the correct master password', function () {
    $user = User::factory()->create(); // password: 'password'
    $account = Account::factory()->for($user)->create([
        'password' => PasswordCipher::encrypt('the-real-password'),
    ]);

    $response = $this->actingAs($user)->postJson(route('accounts.reveal', $account), [
        'master_password' => 'password',
    ]);

    $response->assertSuccessful()->assertJson(['password' => 'the-real-password']);
});

test('revealing a password fails with the wrong master password', function () {
    $user = User::factory()->create(); // password: 'password'
    $account = Account::factory()->for($user)->create([
        'password' => PasswordCipher::encrypt('the-real-password'),
    ]);

    $response = $this->actingAs($user)->postJson(route('accounts.reveal', $account), [
        'master_password' => 'definitely-wrong',
    ]);

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors('master_password');
    $response->assertJsonMissingPath('password');
});

test('a user cannot reveal another user\'s password', function () {
    $owner = User::factory()->create();
    $intruder = User::factory()->create(); // password: 'password'
    $account = Account::factory()->for($owner)->create([
        'password' => PasswordCipher::encrypt('the-real-password'),
    ]);

    $response = $this->actingAs($intruder)->postJson(route('accounts.reveal', $account), [
        'master_password' => 'password',
    ]);

    $response->assertForbidden();
});

test('revealing a password still works for accounts encrypted before the cipher migration', function () {
    $user = User::factory()->create(); // password: 'password'
    $account = Account::factory()->for($user)->create([
        'password' => encrypt('legacy-password'),
    ]);

    $response = $this->actingAs($user)->postJson(route('accounts.reveal', $account), [
        'master_password' => 'password',
    ]);

    $response->assertSuccessful()->assertJson(['password' => 'legacy-password']);
});

test('reveal attempts are rate limited per user', function () {
    $user = User::factory()->create(); // password: 'password'
    $account = Account::factory()->for($user)->create([
        'password' => PasswordCipher::encrypt('the-real-password'),
    ]);

    RateLimiter::increment(md5('vault-reveal'.$user->id), amount: 10);

    $response = $this->actingAs($user)->postJson(route('accounts.reveal', $account), [
        'master_password' => 'password',
    ]);

    $response->assertTooManyRequests();
});
