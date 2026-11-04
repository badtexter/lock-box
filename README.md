# LockBox

A self-hosted password manager built to show full-stack craft: an encrypted credential vault,
master-password-gated reveals, 2FA, and passwordless sign-in with passkeys — on a Laravel +
Inertia + React stack.

Built as a portfolio project. Not a production password manager — see
[Security notes](#security-notes) before trusting it with anything real.

## Screenshots

| | |
|---|---|
| **Landing page** | **Log in** (split-screen, passkey support) |
| ![Landing page](docs/screenshots/welcome.png) | ![Log in](docs/screenshots/login.png) |
| **Vault — light** | **Vault — dark** |
| ![Vault, light mode](docs/screenshots/dashboard.png) | ![Vault, dark mode](docs/screenshots/dashboard-dark.png) |
| **Profile settings** | **Security — password, 2FA, passkeys** |
| ![Profile settings](docs/screenshots/settings.png) | ![Security settings](docs/screenshots/settings-security.png) |

## Features

- **Encrypted vault** — every credential is encrypted at rest with a custom cipher
  (hex → Caesar shift → Playfair square), never stored or logged in plain text.
- **Master-password-gated reveal** — viewing or copying a stored password re-confirms the
  account's own password before decrypting anything, server-side.
- **Strong password generator** — 20 characters, guaranteed upper/lower/number/symbol mix,
  generated with `crypto.getRandomValues`.
- **Search** — instant client-side filtering by platform or email.
- **Two-factor authentication** — TOTP with QR setup and single-use recovery codes.
- **Passkeys** — WebAuthn-based passwordless sign-in, register/remove multiple passkeys per
  account.
- **Per-user authorization** — every credential is scoped and policy-checked, so one user can
  never view, edit, reveal or delete another's data.
- **Light and dark mode**, responsive down to mobile.

## Tech stack

**Backend** — Laravel 13 · PHP 8.3+ · Laravel Fortify (auth, 2FA) · Laravel Passkeys (WebAuthn)
· SQLite · Pest 4

**Frontend** — Inertia.js v3 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui

**Dev environment** — Laravel Sail (Docker)

## Getting started

Requires Docker (for Sail), PHP 8.3+ and Node 20+ on the host for the initial install step.

```bash
composer install
cp .env.example .env
php artisan key:generate

# Laravel Sail (Docker)
php artisan sail:install --with=mailpit
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate

npm install
npm run build   # or `npm run dev` for hot reload
```

The app is then available at `http://localhost`.

## Testing

```bash
./vendor/bin/sail artisan test --compact
```

Feature tests cover the vault's CRUD and authorization (a user can never touch another user's
credentials), the master-password reveal flow (correct/incorrect password, legacy-cipher
accounts), authentication, 2FA and profile/security settings.

## Security notes

- Credential passwords are encrypted with a from-scratch cipher built for this project — it has
  not been audited and should not be treated as cryptographically strong. Use a real, audited
  password manager for anything that matters.
- The vault's "master password" is the user's own account password, checked server-side on every
  reveal.
- Account passwords (the ones protecting the vault itself) require 14+ characters with mixed
  case, numbers and symbols, and are checked against known-breached passwords on signup.

## Future improvements

- Password breach monitoring (Have I Been Pwned range API)
- Secure password sharing between users
- Browser extension for autofill
