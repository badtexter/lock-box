<?php

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
                    try {
                        Crypt::decryptString($account->password);

                        continue;
                    } catch (DecryptException) {
                        DB::table('accounts')
                            ->where('id', $account->id)
                            ->update(['password' => Crypt::encryptString($account->password)]);
                    }
                }
            });
    }

    public function down(): void
    {
        //
    }
};
