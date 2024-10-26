Saya akan membantu membuat README.md yang terstruktur dengan daftar isi dan pembatas horizontal (hr) dari konten yang Anda berikan.



# File Manager CLI 📁🔧

file-manager-cli adalah aplikasi Command-Line Interface (CLI) untuk manajemen file dan folder, menyediakan fitur untuk membuat folder, membuat file, mengurutkan file berdasarkan ekstensi, membaca isi folder, dan membaca isi file teks.

---

## 📑 Daftar Isi
- [Fitur](#-fitur)
- [Instalasi](#️-instalasi)
- [Penggunaan](#-penggunaan)
  - [Membuat Folder](#1-membuat-folder)
  - [Membuat File](#2-membuat-file)
  - [Pengurutan Berdasarkan Ekstensi](#3-pengurutan-berdasarkan-ekstensi)
  - [Membaca Isi Folder](#4-membaca-isi-folder)
  - [Membaca Isi File](#5-membaca-isi-file)
- [Alternatif Penggunaan dengan npm run](#-alternatif-penggunaan-dengan-npm-run)

---

## ✨ Fitur
- **Pembuatan Folder**: Membuat folder baru dengan nama yang diinput pengguna.
- **Pembuatan File**: Membuat file baru dengan nama dan isi yang diinput pengguna.
- **Pengurutan Berdasarkan Ekstensi**: Mengurutkan file dalam folder yang tidak terorganisir ke dalam folder target sesuai dengan ekstensi file.
- **Pembacaan Isi Folder**: Membaca dan menampilkan detail file di dalam folder, termasuk tipe file, ukuran, dan tanggal pembuatan.
- **Pembacaan Isi File**: Membaca isi dari file teks.

---

## ⚙️ Instalasi
Untuk menjalankan aplikasi ini, pastikan Anda sudah memiliki Node.js versi terbaru. Lalu, ikuti langkah-langkah berikut:

1. Kloning repository:
```bash
git clone https://github.com/username/file-manager-cli.git
```

2. Masuk ke direktori proyek dan install dependencies:
```bash
cd file-manager-cli
npm install
```

3. Instal secara global (opsional):
```bash
npm install -g .
```
Untuk menggunakan file-manager-cli di seluruh sistem Anda, install secara global.

---

## 🚀 Penggunaan
Setelah diinstal, jalankan aplikasi dengan perintah `file-manager-cli` diikuti salah satu perintah berikut:

### 1. Membuat Folder
```bash
file-manager-cli make-folder
```
**Catatan**: Ikuti prompt untuk memasukkan nama folder yang akan dibuat.

### 2. Membuat File
```bash
file-manager-cli make-file
```
**Catatan**: Ikuti prompt untuk memasukkan nama file (dengan ekstensi) dan isi file tersebut.

### 3. Pengurutan Berdasarkan Ekstensi
```bash
file-manager-cli ext-sorter
```
**Catatan**: Masukkan path folder sumber (misalnya, unorganized_folder), dan aplikasi akan memindahkan file berdasarkan ekstensi ke dalam folder images, texts, atau others.

### 4. Membaca Isi Folder
```bash
file-manager-cli read-folder
```
**Catatan**: Masukkan nama folder yang ingin dibaca, dan aplikasi akan menampilkan informasi file di dalam folder, seperti nama file, ekstensi, jenis, ukuran, dan tanggal pembuatan.

### 5. Membaca Isi File
```bash
file-manager-cli read-file
```
**Catatan**: Masukkan nama file yang ingin dibaca, dan aplikasi akan menampilkan isi file tersebut.

---

## 🔄 Alternatif Penggunaan dengan npm run
Jika aplikasi belum diinstal secara global, Anda bisa menggunakan perintah berikut di dalam direktori proyek:

```bash
npm run make-folder
npm run make-file
npm run ext-sorter
npm run read-folder
npm run read-file
```
