# Business Specification
# Interactive E-Learning — Pemanasan Global

## 1. Project Overview

### Project Name
Interactive E-Learning Pemanasan Global

### Project Type
Web-based interactive learning media embedded into Moodle.

### Client
Dewi Anggun Afyna — Pendidikan IPA

### Project Purpose

Membangun media pembelajaran interaktif berbasis web yang digunakan sebagai bagian dari e-learning Moodle.

Media dirancang untuk membantu pembelajaran materi **Pemanasan Global** dengan pendekatan **multirepresentasi** dan digunakan untuk mendukung pengukuran **Creative Problem Solving (CPS)** siswa.

Media terdiri dari 4 bagian pembelajaran yang saling berkaitan.

Web bukan pengganti Moodle.

Moodle tetap digunakan sebagai LMS utama, terutama untuk:
- identitas siswa;
- forum diskusi;
- pengumpulan tugas;
- aktivitas LMS lainnya.

Web yang dibuat berfungsi sebagai media pembelajaran interaktif yang di-embed ke dalam Moodle.


---

# 2. Business Goals

Sistem harus memungkinkan:

1. Siswa mempelajari materi pemanasan global melalui aktivitas interaktif.
2. Siswa mendapatkan beberapa bentuk representasi dalam setiap bagian pembelajaran.
3. Siswa dapat mengerjakan aktivitas dan memberikan jawaban/feedback.
4. Jawaban siswa tersimpan dan dapat diakses oleh guru.
5. Guru dapat melihat jawaban siswa untuk kebutuhan analisis penelitian.
6. Media dapat digunakan dari dalam Moodle melalui embed.
7. Aktivitas yang memang membutuhkan fitur Moodle tetap dilakukan menggunakan Moodle.
8. Media dapat digunakan dalam 4 bagian pembelajaran yang telah dirancang client.


---

# 3. Target Users

## 3.1 Student

Siswa menggunakan media untuk:

- membaca materi;
- melihat gambar;
- melihat grafik;
- menonton video;
- melihat animasi/simulasi;
- mengerjakan quiz;
- menjawab pertanyaan;
- melakukan drag & drop;
- memberikan refleksi;
- membuat penjelasan;
- menyusun solusi;
- menyusun rencana aksi.

Setiap jawaban/aktivitas siswa yang dikerjakan melalui web perlu dapat disimpan.


## 3.2 Teacher

Guru menggunakan Mode Guru untuk:

- mengakses jawaban siswa;
- melihat jawaban berdasarkan siswa;
- melihat jawaban dari setiap aktivitas;
- menggunakan hasil jawaban untuk kebutuhan analisis penelitian.

Mode Guru tidak ditujukan sebagai sistem administrasi Moodle penuh.

Tidak ada kebutuhan yang telah ditentukan untuk:
- mengedit akun siswa;
- mengelola course;
- mengelola nilai Moodle;
- mengelola forum;
- mengelola assignment.


---

# 4. Moodle Relationship

Moodle tetap menjadi LMS utama.

Web interaktif akan menjadi media eksternal yang ditampilkan di dalam Moodle.

Struktur penggunaan:

Moodle
→ Bagian 1
→ Embedded Web

Moodle
→ Bagian 2
→ Embedded Web

Moodle
→ Bagian 3
→ Embedded Web

Moodle
→ Bagian 4
→ Embedded Web

Dengan demikian terdapat 4 bagian/link embed yang dapat digunakan pada Moodle.


---

# 5. Moodle Responsibilities

Fitur berikut tetap menggunakan Moodle:

- autentikasi/login siswa;
- identitas siswa jika memungkinkan melalui integrasi;
- pembagian kelompok;
- forum diskusi;
- pengumpulan tugas;
- assignment;
- pengelolaan course;
- fitur LMS lainnya.


## 5.1 Bagian 3

Forum diskusi dilakukan menggunakan Forum Moodle.

Web hanya perlu:

1. menyelesaikan aktivitas persiapan diskusi;
2. menyimpan hasil diskusi jika diperlukan;
3. mengarahkan siswa ke Forum Moodle;
4. siswa mengunggah hasil diskusi melalui Moodle.


## 5.2 Bagian 4

Pengumpulan rencana aksi dilakukan menggunakan Assignment Moodle.

Web hanya perlu:

1. membantu siswa menyusun rencana aksi;
2. menampilkan hasil akhir;
3. mengarahkan siswa ke Assignment Moodle;
4. siswa mengunggah hasil melalui Moodle.


---

# 6. Learning Structure

Media terdiri dari 4 bagian.


## Bagian 1
### Menelusuri Efek Rumah Kaca dan Pemanasan Global

Tujuan utama:

- mengamati perubahan suhu Bumi;
- menelusuri pergerakan energi antara Matahari, Bumi, dan atmosfer;
- mengamati peran gas rumah kaca;
- membandingkan dua kondisi atmosfer;
- menyusun penjelasan berdasarkan fakta;
- menguji miskonsepsi mengenai efek rumah kaca dan lapisan ozon.

Aktivitas utama:

- pengenalan;
- mode siswa/guru;
- materi pengantar;
- pengamatan grafik dan gambar;
- pemilihan fakta;
- penyusunan kartu proses;
- video/animasi;
- pertanyaan berdasarkan video/animasi;
- perbandingan kondisi atmosfer;
- penyusunan diagram;
- penjelasan tertulis;
- uji miskonsepsi.

Hasil tertentu dapat diarahkan untuk dikumpulkan melalui Assignment Moodle.


---

## Bagian 2
### Gas Rumah Kaca, Penyebab, dan Bukti Pemanasan Global

Tujuan utama:

- mengenali beberapa gas rumah kaca;
- mengetahui sumber gas rumah kaca;
- membandingkan pengaruh beberapa gas;
- membaca bukti dari grafik;
- mengenali kebiasaan sehari-hari yang berkaitan dengan emisi.

Aktivitas utama:

- eksplorasi kartu CO2, CH4, dan N2O;
- eksplorasi sumber gas rumah kaca;
- aktivitas berbasis gambar/interaktif;
- perbandingan pengaruh gas;
- animasi perbandingan;
- analisis grafik;
- pertanyaan tertulis;
- refleksi kebiasaan;
- uji pemahaman.


## Bagian 3
### Dampak Pemanasan Global bagi Lingkungan dan Manusia

Bagian ini berbeda dari Bagian 1 dan 2.

Fokus utama:

- studi kasus;
- kerja kelompok;
- analisis informasi;
- diskusi;
- berbagi hasil melalui Forum Moodle.

Topik kelompok dapat meliputi:

1. Gelombang panas dan kesehatan manusia
2. Kekeringan dan ketersediaan air
3. Banjir dan perubahan curah hujan
4. Kebakaran hutan dan kerusakan ekosistem
5. Pencairan es dan kenaikan muka laut
6. Gangguan pangan, pertanian, dan ekonomi

Media studi kasus dapat terdiri dari:

- foto;
- video;
- animasi;
- grafik;
- data;
- penjelasan.

Siswa mengisi lembar diskusi yang mencakup:

- fakta utama;
- penyebab/pemicu;
- dampak terhadap lingkungan;
- dampak terhadap manusia;
- kelompok rentan;
- data pendukung;
- kesimpulan.

Setelah selesai, siswa diarahkan ke Forum Moodle untuk membagikan hasil.


---

## Bagian 4
### Mitigasi, Adaptasi, dan Solusi Pemanasan Global

Bagian ini menggunakan hasil dari aktivitas sebelumnya.

Tujuan utama:

- memahami mitigasi dan adaptasi;
- memilih masalah;
- menghasilkan ide solusi;
- membandingkan solusi;
- membuat rencana aksi sederhana.

Aktivitas utama:

- klasifikasi mitigasi/adaptasi;
- memilih masalah;
- membuat tiga ide solusi;
- membandingkan solusi;
- memilih solusi terbaik;
- membuat rencana aksi;
- memeriksa rencana;
- mengumpulkan melalui Assignment Moodle.


---

# 7. Required Representations

Setiap bagian harus menggunakan beberapa bentuk representasi pembelajaran.

Representasi yang harus muncul dalam keseluruhan media meliputi:

- teks;
- gambar;
- grafik;
- video;
- animasi dan/atau simulasi.

Representasi tidak harus diwujudkan dengan komponen UI yang sama pada setiap bagian.

Bentuk aktivitas dapat disesuaikan dengan kebutuhan pembelajaran selama representasi yang diperlukan tetap muncul.

Indikator Creative Problem Solving tidak harus muncul seluruhnya pada setiap bagian.


---

# 8. Interactive Activities

Sistem perlu mendukung berbagai bentuk aktivitas, sesuai kebutuhan masing-masing bagian.

Contoh:

- pilihan ganda;
- pilihan Ya/Tidak;
- memilih beberapa jawaban;
- drag & drop;
- menyusun urutan;
- klik objek;
- pertanyaan terbuka;
- input teks;
- refleksi;
- penilaian sederhana;
- penyusunan solusi;
- penyusunan rencana aksi;
- feedback otomatis.

Tidak semua aktivitas harus menggunakan:
- popup;
- drag & drop;
- animasi kompleks;
- efek visual khusus.

Bentuk interaksi dipilih berdasarkan kebutuhan pembelajaran.


---

# 9. Student Answer Data

Semua aktivitas yang dijawab siswa melalui web perlu dapat disimpan.

Contoh data yang perlu dapat disimpan:

- pilihan jawaban;
- hasil drag & drop;
- urutan kartu;
- jawaban teks;
- refleksi;
- pilihan solusi;
- penilaian solusi;
- rencana aksi;
- aktivitas interaktif lainnya.

Tujuan penyimpanan:

> Guru dapat mengakses seluruh jawaban siswa untuk kebutuhan analisis penelitian.


---

# 10. Student Identity

Idealnya identitas siswa dapat diketahui tanpa siswa harus mengetik nama berulang kali.

Prioritas:

1. Menggunakan identitas siswa dari Moodle jika memungkinkan.
2. Jika integrasi tersebut tidak memungkinkan secara realistis, siswa dapat mengisi identitas satu kali pada awal pembelajaran.

Siswa tidak seharusnya diminta mengisi nama berulang kali pada setiap bagian.

Mekanisme teknis identitas belum ditentukan dalam business specification.


---

# 11. Teacher Mode

Teacher Mode digunakan untuk melihat data jawaban siswa.

Minimal guru harus dapat:

- melihat daftar siswa;
- memilih siswa;
- melihat jawaban siswa;
- melihat jawaban berdasarkan aktivitas;
- melihat jawaban dari setiap bagian.

Teacher Mode harus mendukung kebutuhan analisis penelitian.

Belum ada requirement untuk sistem grading kompleks.


---

# 12. Content Responsibility

## Client

Client menyediakan:

- alur pembelajaran;
- materi utama;
- bahan yang sudah tersedia;
- arahan isi dari dosen pembimbing;
- validasi kesesuaian materi;
- aset yang sudah dimiliki.

Client akan memberikan konten secara bertahap.


## Developer

Developer bertanggung jawab terhadap:

- pengembangan media interaktif;
- implementasi aktivitas;
- penyimpanan jawaban;
- Teacher Mode;
- deployment;
- integrasi/embedding ke Moodle;
- membantu menyusun feedback;
- membantu mencari referensi pendukung;
- membantu mencari sumber gambar/grafik/konten jika diperlukan.


## Shared Responsibility

Developer dan client dapat bekerja sama dalam:

- penyusunan feedback;
- pencarian referensi jurnal;
- pencarian sumber gambar;
- penyusunan konten yang belum tersedia;
- penyesuaian konten berdasarkan feedback dosen.


---

# 13. Content Sources

Konten pembelajaran dapat menggunakan:

- materi yang diberikan client;
- jurnal ilmiah;
- sumber akademik;
- gambar dengan sumber yang jelas;
- grafik dengan sumber yang jelas;
- sumber pendukung lain yang relevan.

Konten yang digunakan harus dapat dipertanggungjawabkan secara akademik.

Sumber/referensi perlu dicatat sehingga dapat dicantumkan pada media jika diperlukan.


---

# 14. Content Editing

Client menginginkan kemungkinan untuk mengubah atau menambahkan isi konten.

Idealnya perubahan konten seperti:

- teks;
- materi;
- feedback;
- gambar;
- sumber;

tidak selalu membutuhkan perubahan kode program.

Namun tingkat kemampuan editing akan ditentukan dalam desain teknis.

Developer tidak boleh menjanjikan CMS/content editor penuh sebelum kebutuhan teknis ditentukan.


---

# 15. UI / Design

Client telah memiliki gambaran/desain pembelajaran dan contoh tampilan dari Lumi.

Tampilan web harus mempertahankan struktur pembelajaran yang telah dirancang client.

Setiap bagian memiliki pola umum:

1. Halaman awal
2. Pilihan Mode Guru / Mode Siswa
3. Mulai
4. Materi
5. Aktivitas
6. Feedback
7. Aktivitas berikutnya
8. Penyelesaian bagian

Detail UI dapat disesuaikan selama tidak mengubah alur pembelajaran.


---

# 16. Scope — Included

Termasuk dalam pekerjaan:

- web interaktif untuk 4 bagian;
- halaman yang dapat di-embed ke Moodle;
- aktivitas interaktif;
- penyimpanan jawaban siswa;
- Teacher Mode;
- deployment web;
- integrasi dengan Moodle sejauh diperlukan untuk penggunaan media;
- pengarahan siswa ke Forum Moodle;
- pengarahan siswa ke Assignment Moodle;
- membantu menyusun feedback;
- membantu mencari referensi dan aset pendukung;
- penyesuaian media berdasarkan feedback dosen selama masih dalam scope.


---

# 17. Scope — Not Included / External Responsibility

Moodle tetap bertanggung jawab untuk:

- course management;
- student account management;
- group management;
- forum;
- assignment;
- pengumpulan tugas.

Media web bukan pengganti Moodle.

Produksi aset multimedia kompleks seperti:

- produksi video profesional;
- animasi profesional;
- ilustrasi profesional;

tidak dianggap sebagai tanggung jawab utama developer kecuali disepakati secara khusus.


---

# 18. Revision Policy

Revisi yang masih berkaitan dengan:

- perbaikan isi;
- perubahan teks;
- feedback;
- gambar;
- urutan aktivitas;
- penyesuaian terhadap arahan dosen;

dapat dilakukan selama masih dalam scope.

Perubahan besar seperti:

- menambah bagian pembelajaran baru;
- menambah sistem utama baru;
- mengubah arsitektur secara signifikan;
- menambah fitur yang sebelumnya tidak disepakati;

perlu dibicarakan kembali sebelum dikerjakan.


---

# 19. Delivery

Target utama adalah menghasilkan versi yang sudah dapat digunakan untuk kebutuhan bimbingan client.

Client menyampaikan bahwa dosen meminta pekerjaan diusahakan selesai pada minggu tersebut, tetapi target praktis yang dibicarakan kemudian mengarah pada pertengahan Agustus.

Prioritas delivery:

1. Core functionality berjalan.
2. 4 bagian dapat diakses.
3. Aktivitas utama dapat digunakan.
4. Jawaban dapat disimpan.
5. Guru dapat melihat jawaban.
6. Embed ke Moodle dapat digunakan.
7. Media dapat digunakan untuk kebutuhan bimbingan.

Polishing visual dan penyempurnaan minor dilakukan setelah fungsi utama stabil.


---

# 20. Success Criteria

Project dianggap memenuhi kebutuhan utama apabila:

- [ ] 4 bagian pembelajaran tersedia.
- [ ] Setiap bagian dapat diakses melalui Moodle.
- [ ] Web dapat di-embed ke Moodle.
- [ ] Student Mode dapat digunakan.
- [ ] Teacher Mode dapat digunakan.
- [ ] Aktivitas interaktif dapat dikerjakan.
- [ ] Jawaban siswa tersimpan.
- [ ] Guru dapat melihat jawaban siswa.
- [ ] Identitas jawaban dapat dikaitkan dengan siswa.
- [ ] Bagian 3 dapat mengarahkan siswa ke Forum Moodle.
- [ ] Bagian 4 dapat mengarahkan siswa ke Assignment Moodle.
- [ ] Representasi teks, gambar, grafik, video, dan animasi/simulasi digunakan sesuai kebutuhan pembelajaran.
- [ ] Media dapat digunakan untuk kebutuhan bimbingan/penelitian.


---

# 21. Important Constraints

- Deadline relatif dekat.
- Konten dari client belum seluruhnya final.
- Client masih dapat menerima revisi dari dosen pembimbing.
- Developer belum memiliki pengalaman sebelumnya dengan Moodle/Lumi.
- Solusi teknis harus dipilih dengan mempertimbangkan waktu pengerjaan.
- Jangan membangun ulang LMS karena Moodle sudah digunakan oleh client.
- Jangan membuat fitur Moodle yang sebenarnya sudah tersedia di Moodle.
- Prioritaskan functionality over excessive visual polish.
- Hindari overengineering.


---

# 22. Current Project Status

Status saat business specification dibuat:

- [x] Client requirement dikumpulkan.
- [x] Alur Bagian 1–4 tersedia.
- [x] Scope utama disepakati.
- [x] Moodle tersedia.
- [x] Moodle version diketahui: 5.2.1.
- [x] Moodle External Tool tersedia.
- [ ] Mekanisme identitas siswa belum ditentukan.
- [ ] Arsitektur teknis belum ditentukan.
- [ ] Database schema belum dibuat.
- [ ] Konten final belum seluruhnya tersedia.
- [ ] Aset multimedia belum seluruhnya tersedia.
- [ ] Feedback final belum seluruhnya tersedia.
- [ ] Web belum mulai diimplementasikan.


---

# 23. Guiding Principle

Tujuan utama project bukan membuat LMS baru.

Tujuan utama adalah:

> Membuat media pembelajaran interaktif berbasis web yang dapat digunakan di dalam Moodle, mendukung pembelajaran multirepresentasi tentang pemanasan global, menyimpan seluruh respons siswa, dan memungkinkan guru mengakses respons tersebut untuk kebutuhan penelitian.

Semua keputusan teknis harus mendukung tujuan tersebut dan tidak menambah kompleksitas yang tidak diperlukan.