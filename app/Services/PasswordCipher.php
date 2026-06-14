<?php

namespace App\Services;

use InvalidArgumentException;

class PasswordCipher
{
    private const PREFIX = 'CPF1:';
    private const ALPHABET = '0123456789ABCDEF';
    private const CAESAR_SHIFT = 3;
    private const PLAYFAIR_KEY = 'CYBERSECURITY2026';

    public static function encrypt(string $password): string
    {
        $hex = strtoupper(bin2hex($password));
        $caesar = self::caesar($hex, self::CAESAR_SHIFT);

        return self::PREFIX.self::playfairEncrypt($caesar);
    }

    public static function decrypt(string $encryptedPassword): string
    {
        if (! str_starts_with($encryptedPassword, self::PREFIX)) {
            throw new InvalidArgumentException('Unsupported password cipher.');
        }

        $payload = substr($encryptedPassword, strlen(self::PREFIX));
        $caesar = self::playfairDecrypt($payload);
        $hex = self::caesar($caesar, -self::CAESAR_SHIFT);
        $password = hex2bin($hex);

        if ($password === false) {
            throw new InvalidArgumentException('Invalid password payload.');
        }

        return $password;
    }

    public static function isEncrypted(string $password): bool
    {
        return str_starts_with($password, self::PREFIX);
    }

    private static function caesar(string $value, int $shift): string
    {
        $alphabet = str_split(self::ALPHABET);
        $length = count($alphabet);
        $result = '';

        foreach (str_split($value) as $character) {
            $index = array_search($character, $alphabet, true);

            if ($index === false) {
                throw new InvalidArgumentException('Value contains characters outside cipher alphabet.');
            }

            $shiftedIndex = ($index + $shift) % $length;

            if ($shiftedIndex < 0) {
                $shiftedIndex += $length;
            }

            $result .= $alphabet[$shiftedIndex];
        }

        return $result;
    }

    private static function playfairEncrypt(string $value): string
    {
        return self::playfair($value, true);
    }

    private static function playfairDecrypt(string $value): string
    {
        return self::playfair($value, false);
    }

    private static function playfair(string $value, bool $encrypt): string
    {
        if (strlen($value) % 2 !== 0) {
            throw new InvalidArgumentException('Playfair payload must contain an even number of characters.');
        }

        [$square, $positions] = self::playfairSquare();
        $result = '';
        $direction = $encrypt ? 1 : -1;

        for ($i = 0; $i < strlen($value); $i += 2) {
            $first = $value[$i];
            $second = $value[$i + 1];

            if (! isset($positions[$first], $positions[$second])) {
                throw new InvalidArgumentException('Playfair payload contains invalid characters.');
            }

            [$firstRow, $firstColumn] = $positions[$first];
            [$secondRow, $secondColumn] = $positions[$second];

            if ($firstRow === $secondRow) {
                $result .= $square[$firstRow][self::wrap($firstColumn + $direction)];
                $result .= $square[$secondRow][self::wrap($secondColumn + $direction)];

                continue;
            }

            if ($firstColumn === $secondColumn) {
                $result .= $square[self::wrap($firstRow + $direction)][$firstColumn];
                $result .= $square[self::wrap($secondRow + $direction)][$secondColumn];

                continue;
            }

            $result .= $square[$firstRow][$secondColumn];
            $result .= $square[$secondRow][$firstColumn];
        }

        return $result;
    }

    private static function playfairSquare(): array
    {
        $characters = [];

        foreach (str_split(strtoupper(self::PLAYFAIR_KEY).self::ALPHABET) as $character) {
            if (str_contains(self::ALPHABET, $character) && ! in_array($character, $characters, true)) {
                $characters[] = $character;
            }
        }

        $square = array_chunk($characters, 4);
        $positions = [];

        foreach ($square as $row => $columns) {
            foreach ($columns as $column => $character) {
                $positions[$character] = [$row, $column];
            }
        }

        return [$square, $positions];
    }

    private static function wrap(int $value): int
    {
        $wrapped = $value % 4;

        return $wrapped < 0 ? $wrapped + 4 : $wrapped;
    }
}
