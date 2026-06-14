<?php

use App\Services\PasswordCipher;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('accounts')
            ->select(['id', 'password'])
            ->orderBy('id')
            ->chunkById(100, function ($accounts) {
                foreach ($accounts as $account) {
                    $password = (string) $account->password;

                    if (PasswordCipher::isEncrypted($password)) {
                        continue;
                    }

                    try {
                        $plainPassword = Crypt::decryptString($password);
                    } catch (DecryptException) {
                        $plainPassword = $password;
                    }

                    DB::table('accounts')
                        ->where('id', $account->id)
                        ->update(['password' => PasswordCipher::encrypt($plainPassword)]);
                }
            });
    }

    public function down(): void
    {
        //
    }
};
