# CI/CD Setup Guide

GitHub Actions telah dikonfigurasi untuk proyek ini.

## Files
1. **CI (`.github/workflows/ci.yml`)**:
   - Berjalan pada setiap `push` dan `pull_request` ke `main`.
   - Melakukan instalasi, linting, dan build check.
   - Berguna untuk memastikan kode aman sebelum di-merge.

2. **CD (`.github/workflows/cd.yml`)**:
   - Berjalan otomatis saat ada `push` ke `main` (misal setelah merge PR).
   - Melakukan deployment otomatis ke Vercel (Production).

## Setup Required (Secrets)

Agar fitur Deployment otomatis berfungsi, Anda harus menambahkan **Repository Secrets** di GitHub:
Masuk ke `Settings` -> `Secrets and variables` -> `Actions` -> `New repository secret`, lalu tambahkan:

- `VERCEL_TOKEN`: Token API dari akun Vercel Anda (Settings -> Tokens).
- `VERCEL_ORG_ID`: ID Organisasi Vercel (dapat dilihat di file `.vercel/project.json` jika sudah link lokal, atau di Dashboard Vercel).
- `VERCEL_PROJECT_ID`: ID Project Vercel.

Jika Anda lebih memilih menggunakan integrasi Git bawaan Vercel (tanpa GitHub Actions untuk deploy), Anda bisa menghapus file `.github/workflows/cd.yml`. Vercel akan otomatis mendeteksi perubahan di repo asal.
