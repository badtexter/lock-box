<?php

test('every response carries baseline security headers', function () {
    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertHeader('X-Content-Type-Options', 'nosniff');
    $response->assertHeader('X-Frame-Options', 'DENY');
    $response->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    $response->assertHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
});

test('content security policy is skipped in local/testing environments to avoid breaking Vite', function () {
    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertHeaderMissing('Content-Security-Policy');
    $response->assertHeaderMissing('Strict-Transport-Security');
});
