<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Throwable;

class PwnedPasswordChecker
{
    /**
     * Check how many times a password appears in known breaches, using the
     * Have I Been Pwned k-anonymity range API: only the first 5 characters
     * of the password's SHA-1 hash ever leave the server.
     *
     * Returns null when the check could not be completed (network/API
     * failure), so callers can tell "not breached" apart from "unknown".
     */
    public function timesSeen(string $password): ?int
    {
        $hash = strtoupper(sha1($password));
        $prefix = substr($hash, 0, 5);
        $suffix = substr($hash, 5);

        try {
            $response = Http::timeout(5)->get("https://api.pwnedpasswords.com/range/{$prefix}");
        } catch (Throwable) {
            return null;
        }

        if ($response->failed()) {
            return null;
        }

        foreach (explode("\n", trim($response->body())) as $line) {
            [$lineSuffix, $count] = array_pad(explode(':', trim($line)), 2, '0');

            if (strcasecmp($lineSuffix, $suffix) === 0) {
                return (int) $count;
            }
        }

        return 0;
    }
}
