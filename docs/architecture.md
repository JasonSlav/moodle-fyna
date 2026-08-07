# Architecture

## 1. Overview

Sistem terdiri dari:

1. Moodle sebagai LMS utama.
2. Web interaktif sebagai media pembelajaran.
3. PostgreSQL sebagai penyimpanan data jawaban.
4. Teacher Dashboard untuk melihat jawaban siswa.

Moodle tetap menangani:

- akun siswa/guru;
- pembagian kelompok;
- Forum;
- Assignment;
- aktivitas LMS lainnya.

Web interaktif menangani:

- tampilan pembelajaran;
- aktivitas interaktif;
- feedback aktivitas;
- penyimpanan jawaban;
- Teacher Dashboard.


## 2. System Architecture

```text
                    Moodle
                      │
             Embed / External Link
                      │
                      ▼
              Next.js Web App
          ┌───────────┴───────────┐
          │                       │
    Student Interface       Teacher Dashboard
          │                       │
          └───────────┬───────────┘
                      │
                  API / Server
                      │
                      ▼
                 PostgreSQL
3. Technology Stack
Frontend / Backend
Next.js
TypeScript
React
Tailwind CSS

Next.js digunakan sebagai full-stack application agar frontend dan backend berada dalam satu project.

Database
PostgreSQL
Prisma ORM
Hosting
Vercel untuk aplikasi web.
PostgreSQL menggunakan managed PostgreSQL provider.

Provider database dapat ditentukan saat deployment.

4. Application Structure

Aplikasi memiliki dua area utama:

Student
/student
/student/section/1
/student/section/2
/student/section/3
/student/section/4

Student area menangani:

pembelajaran;
aktivitas;
jawaban;
feedback;
progress.
Teacher
/teacher
/teacher/students
/teacher/students/[id]
/teacher/sections/[section]

Teacher area menangani:

daftar siswa;
jawaban siswa;
filter bagian;
detail aktivitas.
5. Learning Content Architecture

Setiap bagian terdiri dari kumpulan aktivitas.

Section
 ├── Activity
 │    ├── content
 │    ├── interaction
 │    ├── answer
 │    └── feedback
 ├── Activity
 └── Activity

Aktivitas harus dibuat dengan struktur yang cukup reusable sehingga jenis aktivitas seperti:

pilihan;
multiple choice;
text input;
drag & drop;
ordering;
reflection;
rating;

tidak perlu dibuat sebagai sistem yang sepenuhnya terpisah.

6. Data Flow
Student Answer
Student
   │
   ▼
Activity
   │
   ▼
Submit Answer
   │
   ▼
Next.js Server
   │
   ▼
PostgreSQL

Setiap jawaban minimal memiliki hubungan dengan:

student;
section;
activity;
answer;
timestamp.
7. Moodle Integration

Moodle tetap menjadi sistem utama untuk aktivitas LMS.

Embedded Content

Setiap bagian web harus dapat ditampilkan melalui Moodle menggunakan embed/iframe atau metode embed yang tersedia.

Contoh:

Moodle Course
   │
   └── Section 1
          │
          └── Embedded Web
                 │
                 └── /student/section/1

Bagian 1–4 dapat memiliki URL/entry point masing-masing.

Forum

Bagian 3 tidak membuat forum sendiri.

Flow:

Web
 ↓
Siswa menyelesaikan hasil diskusi
 ↓
Klik "Bagikan ke Forum Moodle"
 ↓
Moodle Forum
Assignment

Bagian 1 dan Bagian 4 menggunakan Assignment Moodle sesuai alur pembelajaran.

Web hanya mengarahkan siswa ke halaman Assignment yang sesuai.

8. Student Identity
Initial Implementation

Identitas siswa tidak bergantung pada integrasi LTI Moodle pada MVP.

Sistem harus memiliki mekanisme identifikasi siswa yang sederhana dan konsisten.

Student identity digunakan untuk menghubungkan seluruh jawaban siswa dari Bagian 1–4.

Future Integration

Integrasi identitas Moodle dapat ditambahkan kemudian jika diperlukan.

Jangan mengimplementasikan LTI hanya untuk memenuhi kebutuhan MVP apabila mekanisme sederhana sudah cukup.

9. Teacher Access

Teacher Dashboard harus dilindungi.

Siswa tidak boleh dapat mengakses data siswa lain.

Teacher dapat:

melihat daftar siswa;
memilih siswa;
melihat seluruh jawaban siswa;
memfilter berdasarkan bagian;
melihat detail aktivitas.
10. Data Persistence

Jawaban harus disimpan ke database.

Data tidak boleh hanya disimpan di:

localStorage;
session browser;
state React.

LocalStorage/session dapat digunakan sebagai cache sementara jika diperlukan, tetapi database adalah sumber data utama.

11. Cross-Section Data

Data tertentu dapat digunakan oleh bagian berikutnya.

Contoh:

Bagian 2
   │
   └── Refleksi siswa
          │
          ▼
Bagian 4
   │
   └── Pilihan masalah

Sistem harus dapat mengambil data Bagian 2 ketika diperlukan oleh Bagian 4.

12. Deployment

Target deployment:

Git Repository
      │
      ▼
   Vercel
      │
      ├── Next.js Application
      │
      └── Environment Variables
               │
               ▼
        PostgreSQL Database

Secret dan credential tidak boleh disimpan langsung di source code.

Gunakan environment variables.

13. Development Principles

Prioritas implementasi:

Functional MVP terlebih dahulu.
Selesaikan Student Flow.
Pastikan jawaban tersimpan.
Implementasikan Teacher Dashboard.
Integrasikan Moodle.
Baru lakukan polishing UI dan optimasi.

Hindari:

overengineering;
microservices;
backend terpisah tanpa kebutuhan;
CMS kompleks;
LTI integration sebelum dibutuhkan;
abstraction berlebihan untuk aktivitas yang hanya digunakan sekali.
14. Architecture Constraints
Moodle tetap menjadi LMS.
Web hanya menangani media pembelajaran interaktif.
Forum tetap menggunakan Moodle.
Assignment tetap menggunakan Moodle.
Semua jawaban aktivitas web harus tersimpan.
Teacher harus dapat melihat jawaban siswa.
Data siswa harus terisolasi.
Aplikasi harus dapat di-embed ke Moodle.
Architecture harus tetap sederhana agar sesuai dengan deadline project.