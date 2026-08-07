# Implementation Plan

## 1. Goal

Membangun web e-learning interaktif untuk 4 bagian pembelajaran pemanasan global yang:

- dapat di-embed ke Moodle;
- memiliki Student Mode dan Teacher Mode;
- menyediakan aktivitas interaktif;
- menyimpan seluruh jawaban siswa;
- memungkinkan guru melihat jawaban siswa;
- menggunakan Moodle untuk Forum dan Assignment.

Prioritas utama adalah functional MVP. Jangan melakukan overengineering atau membuat fitur di luar scope.


# 2. Development Strategy

Implementasi dilakukan secara bertahap.

Urutan prioritas:

1. Foundation aplikasi.
2. Database dan penyimpanan jawaban.
3. Sistem identitas siswa.
4. Reusable activity system.
5. Student flow.
6. Bagian 1.
7. Bagian 2.
8. Bagian 3.
9. Bagian 4.
10. Teacher Dashboard.
11. Moodle integration.
12. Testing dan deployment.

Jangan mengimplementasikan seluruh bagian sekaligus.

Setelah setiap fase selesai, lakukan pengecekan sebelum melanjutkan.


# 3. Phase 1 — Project Setup

## Goal

Membuat fondasi project yang dapat dijalankan secara lokal.

## Tasks

- Buat project Next.js + TypeScript.
- Konfigurasi Tailwind CSS.
- Konfigurasi Prisma.
- Hubungkan project dengan PostgreSQL.
- Buat struktur folder yang sederhana.
- Konfigurasi environment variables.
- Pastikan project dapat dijalankan secara lokal.

## Output

- Next.js application berjalan.
- PostgreSQL dapat diakses.
- Prisma dapat melakukan koneksi database.

## Checklist

- [ ] Project dapat dijalankan.
- [ ] Database connection berhasil.
- [ ] Prisma berhasil dijalankan.
- [ ] Environment variables digunakan dengan benar.


# 4. Phase 2 — Database & Student Identity

## Goal

Membangun penyimpanan identitas siswa dan jawaban.

## Tasks

Buat model data minimal untuk:

- Student
- Section
- Activity
- Answer

Tambahkan relasi yang diperlukan.

Setiap Answer minimal terkait dengan:

- student;
- section;
- activity;
- answer data;
- timestamp.

Implementasikan mekanisme identitas siswa MVP yang sederhana dan konsisten.

## Output

Sistem dapat:

- membuat/mengenali siswa;
- menyimpan jawaban;
- mengambil jawaban berdasarkan siswa;
- mengambil jawaban berdasarkan section/activity.

## Checklist

- [ ] Student dapat diidentifikasi.
- [ ] Answer tersimpan di database.
- [ ] Answer dapat diambil kembali.
- [ ] Data siswa tidak bercampur.


# 5. Phase 3 — Core Activity System

## Goal

Membuat komponen aktivitas reusable.

## Activities

Minimal support:

- single choice;
- multiple choice;
- true/false;
- text input;
- ordering;
- drag & drop;
- rating/selection jika diperlukan.

Setiap activity harus dapat:

1. menampilkan konten;
2. menerima input;
3. melakukan validasi;
4. menampilkan feedback;
5. menyimpan jawaban.

## Output

Tersedia sistem aktivitas yang dapat digunakan ulang di Bagian 1–4.

## Checklist

- [ ] Choice bekerja.
- [ ] Multiple choice bekerja.
- [ ] True/false bekerja.
- [ ] Text input bekerja.
- [ ] Ordering bekerja.
- [ ] Drag & drop bekerja.
- [ ] Jawaban tersimpan.


# 6. Phase 4 — Student Flow

## Goal

Membuat kerangka navigasi pembelajaran.

## Tasks

Implementasikan:

- section landing page;
- Student Mode;
- navigation;
- progress/completion state;
- activity rendering;
- save answer;
- feedback;
- next/previous navigation.

Struktur section:

```text
Section
 ├── Introduction
 ├── Activity
 ├── Activity
 ├── Activity
 └── Completion
Checklist
 Siswa dapat masuk ke section.
 Siswa dapat berpindah aktivitas.
 Jawaban tidak hilang saat berpindah halaman.
 Aktivitas dapat ditandai selesai.
7. Phase 5 — Section 1
Goal

Implementasikan seluruh alur Bagian 1.

Activities
Apa yang Akan Kamu Pelajari?
Fakta 1: Suhu Bumi.
Fakta 2: Bagaimana Energi Bergerak?
Fakta 3: Peran Gas Rumah Kaca.
Membandingkan Dua Kondisi Atmosfer.
Bangun Penjelasanmu.
Uji Miskonsepsi.
Completion.
Special Requirements

Bangun Penjelasanmu harus mendukung:

penyusunan diagram sederhana;
input penjelasan 2–3 kalimat;
penyimpanan hasil.

Pengumpulan final dilakukan melalui Moodle Assignment.

Checklist
 Semua aktivitas tersedia.
 Semua jawaban tersimpan.
 Feedback tersedia.
 Assignment redirect bekerja.
8. Phase 6 — Section 2
Goal

Implementasikan seluruh alur Bagian 2.

Activities
Eksplorasi 1: Kenali Gas Rumah Kaca.
Eksplorasi 2: Dari Mana Gas Itu Berasal?
Eksplorasi 3: Perbandingan Pengaruh Gas.
Eksplorasi 4: Bukti dari Data.
Refleksi: Kebiasaan di Sekitarku.
Uji Pemahaman Singkat.
Completion.
Special Requirements

Hasil refleksi harus disimpan dan dapat digunakan kembali oleh Bagian 4.

Checklist
 Semua aktivitas tersedia.
 Jawaban tersimpan.
 Refleksi tersimpan.
 Data refleksi dapat diakses Bagian 4.
9. Phase 7 — Section 3
Goal

Implementasikan studi kasus dan diskusi kelompok.

Activities
Introduction.
Pembagian Topik Kelompok.
Eksplorasi Studi Kasus.
Lembar Diskusi Kelompok.
Periksa Hasil Kelompok.
Moodle Forum redirect.
Completion.
Special Requirements

Pembagian kelompok dilakukan melalui Moodle.

Web tidak perlu membuat sistem pembagian kelompok.

Forum menggunakan Moodle.

Web hanya mengarahkan siswa ke Forum Moodle setelah hasil diskusi siap.

Checklist
 Studi kasus dapat ditampilkan.
 Form diskusi bekerja.
 Hasil diskusi tersimpan.
 Forum redirect bekerja.
10. Phase 8 — Section 4
Goal

Implementasikan proses penyusunan solusi dan rencana aksi.

Activities
Eksplorasi 1: Mitigasi atau Adaptasi?
Eksplorasi 2: Pilih Masalah.
Eksplorasi 3: Kumpulkan Ide Solusi.
Eksplorasi 4: Bandingkan Pilihan Solusi.
Eksplorasi 5: Susun Rencana Aksi.
Periksa Rencana Aksi.
Moodle Assignment redirect.
Completion.
Special Requirements

Masalah yang ditampilkan harus dapat berasal dari refleksi Bagian 2.

Rencana aksi harus tersimpan sehingga dapat dilihat guru.

Checklist
 Refleksi Bagian 2 dapat digunakan.
 Tiga ide solusi dapat disimpan.
 Solusi dapat dibandingkan.
 Rencana aksi dapat disimpan.
 Assignment redirect bekerja.
11. Phase 9 — Teacher Dashboard
Goal

Membuat Teacher Mode untuk kebutuhan analisis penelitian.

Features

Teacher dapat:

melihat daftar siswa;
memilih siswa;
melihat jawaban siswa;
memfilter berdasarkan section;
melihat aktivitas tertentu;
melihat seluruh tipe jawaban.

Teacher harus dapat melihat seluruh aktivitas yang dijawab siswa, bukan hanya jawaban essay/refleksi.

Checklist
 Teacher access tersedia.
 Daftar siswa tersedia.
 Detail siswa tersedia.
 Filter section tersedia.
 Detail activity tersedia.
 Semua tipe jawaban dapat ditampilkan.
 Siswa tidak dapat mengakses dashboard.
12. Phase 10 — Moodle Integration
Goal

Menghubungkan web dengan Moodle.

Tasks
Deploy web ke public URL.
Pastikan setiap section dapat dibuka melalui URL.
Pastikan web dapat di-embed ke Moodle.
Test iframe/embed.
Tambahkan link redirect ke Forum Moodle.
Tambahkan link redirect ke Assignment Moodle.
Pastikan navigasi kembali ke pembelajaran bekerja.
Important

Jangan mengimplementasikan LTI atau integrasi Moodle yang kompleks kecuali memang diperlukan.

Moodle tetap menjadi LMS utama.

Checklist
 Section 1 dapat di-embed.
 Section 2 dapat di-embed.
 Section 3 dapat di-embed.
 Section 4 dapat di-embed.
 Forum redirect bekerja.
 Assignment redirect bekerja.
13. Phase 11 — Content Integration
Goal

Memasukkan konten final dari client.

Tasks
Integrasikan materi yang diberikan client.
Masukkan gambar/grafik/video/animasi yang tersedia.
Masukkan feedback.
Tambahkan referensi sumber konten jika diperlukan.
Pastikan konten sesuai alur yang telah disepakati.

Konten yang belum final jangan dianggap sebagai requirement teknis final.

Jika terdapat revisi konten, ubah content tanpa mengubah architecture aplikasi jika memungkinkan.

Checklist
 Konten Section 1 masuk.
 Konten Section 2 masuk.
 Konten Section 3 masuk.
 Konten Section 4 masuk.
 Feedback masuk.
 Referensi konten tercatat.
14. Phase 12 — Testing
Functional Testing

Test:

Student flow.
Teacher flow.
Semua tipe aktivitas.
Penyimpanan jawaban.
Identitas siswa.
Progress.
Feedback.
Section completion.
Moodle embed.
Forum redirect.
Assignment redirect.
Data Testing

Pastikan:

jawaban siswa tersimpan;
jawaban tidak tertukar;
jawaban dapat dilihat guru;
data antar-section benar;
refleksi Bagian 2 muncul di Bagian 4.
Responsive Testing

Test minimal:

desktop;
mobile.
Error Testing

Test:

database gagal;
submit gagal;
input kosong;
refresh halaman;
navigasi kembali;
koneksi buruk.
15. Phase 13 — Deployment
Tasks
Deploy application.
Configure production database.
Configure environment variables.
Run database migration.
Test production URL.
Test Moodle embed pada production.
Test seluruh Student Flow.
Test Teacher Dashboard.
Checklist
 Production application berjalan.
 Production database berjalan.
 Environment variables benar.
 Moodle dapat embed production URL.
 Semua critical flow berhasil.
16. Definition of Done

Project dianggap MVP selesai apabila:

 4 section dapat digunakan.
 Student Mode berjalan.
 Teacher Mode berjalan.
 Jawaban seluruh aktivitas tersimpan.
 Jawaban dapat dikaitkan dengan siswa.
 Guru dapat melihat seluruh jawaban.
 Bagian 2 dapat memberikan data ke Bagian 4.
 Bagian 3 menggunakan Moodle Forum.
 Bagian 1 dan 4 menggunakan Moodle Assignment.
 Semua section dapat di-embed ke Moodle.
 Tidak ada critical bug pada alur utama.
 Production deployment berhasil.
17. Development Rules for Coding Agent
Ikuti biz_specs.md, requirements.md, dan architecture.md.
Jangan membuat fitur di luar scope tanpa alasan yang jelas.
Jangan mengubah architecture tanpa menjelaskan alasannya.
Prioritaskan P0/MVP.
Jangan mengimplementasikan seluruh section sekaligus.
Selesaikan dan test satu phase sebelum lanjut ke phase berikutnya.
Gunakan reusable components untuk aktivitas yang memiliki pola sama.
Jangan membuat abstraction yang belum diperlukan.
Jangan hardcode credential atau secret.
Jika requirement ambigu atau bertentangan, berhenti dan tanyakan sebelum mengambil keputusan besar.
Untuk konten yang belum tersedia, gunakan placeholder yang jelas.
Jangan mengarang konten akademik yang belum diberikan client.
Setelah setiap phase selesai, ringkas perubahan dan hasil testing.