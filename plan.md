## Vision Project

**WPUI**

Copy-paste UI components for fast WordPress themes.

Prinsip utama:

```
No framework
No jQuery
No install
Accessible
Copy-paste friendly
```

Developer cukup ambil kode yang mereka butuhkan. Tidak ada bundle besar yang harus dimuat seperti **Bootstrap** atau dependency seperti **jQuery**.

---

# Phase 1 — Foundation

Durasi: 1 minggu

Tujuan fase ini: membuat **fondasi teknis WPUI** supaya semua component konsisten.

### Struktur repo

```
wpui

/docs
/components
   modal
   dropdown
   accordion
   tabs
   tooltip
   mobile-nav

/assets
   wpui.css
   wpui.js
```

Tapi ingat konsep utama: **component bisa berdiri sendiri**.

Artinya developer bisa copy hanya:

```
modal.html
modal.css
modal.js
```

tanpa perlu file lain.

---

### Pattern HTML

Semua component menggunakan pola attribute yang konsisten.

Contoh:

```
data-ui="modal"
data-ui="dropdown"
data-ui="tabs"
```

Contoh modal:

```html
<div data-ui="modal">
  <button data-open>Open</button>

  <div data-panel>
    Modal content
    <button data-close>Close</button>
  </div>
</div>
```

JS selalu mencari `[data-ui="component"]`.

Ini menjaga konsistensi.

---

### Pattern JavaScript

Semua component menggunakan pola init yang sama.

Contoh:

```jsx
document.querySelectorAll('[data-ui="modal"]').forEach((modal) => {

  const open = modal.querySelector('[data-open]')
  const close = modal.querySelector('[data-close]')
  const panel = modal.querySelector('[data-panel]')

  open.addEventListener('click', () => {
    panel.classList.add('open')
  })

  close.addEventListener('click', () => {
    panel.classList.remove('open')
  })

})
```

Tidak ada global framework.

Browser sudah cukup pintar.

---

# Phase 2 — Build Core Components

Durasi: 2–3 minggu

Kita fokus hanya 6 komponen. Itu sudah mencakup hampir semua website WordPress.

---

## 1. Modal

Fitur minimal:

- open / close
- ESC close
- backdrop
- focus trap

Use case:

- contact popup
- gallery
- alert dialog

---

## 2. Dropdown

Fitur:

- toggle
- close ketika klik di luar
- keyboard support

Use case:

- navigation
- user menu

---

## 3. Accordion

Fitur:

- open close
- multiple atau single mode

Use case:

- FAQ
- sidebar menu

---

## 4. Tabs

Fitur:

- switch tab
- aria attributes

Use case:

- content grouping
- product detail

---

## 5. Tooltip

Fitur:

- hover
- focus accessibility
- posisi otomatis

Use case:

- icon info
- form help

---

## 6. Mobile Navigation

Fitur:

- hamburger toggle
- overlay menu
- body scroll lock

Use case:

- responsive navigation

Ini salah satu komponen paling sering dipakai WordPress theme.

---

# Phase 3 — Documentation Website

Durasi: 1–2 minggu

Ini bagian paling penting. Banyak project gagal karena dokumentasi buruk.

Struktur dokumentasi:

```
Home
Components
   Modal
   Dropdown
   Accordion
   Tabs
   Tooltip
   Mobile Navigation
Philosophy
WordPress usage
```

Setiap halaman component harus memiliki:

```
Preview
Copy HTML
Copy CSS
Copy JS
Explanation
Accessibility notes
```

Developer harus bisa:

1. lihat preview
2. copy kode
3. selesai

Tidak perlu membaca novel teknis.

---

# Phase 4 — WordPress Integration Guide

Durasi: 1 minggu

Tambahkan halaman khusus:

**Using WPUI in WordPress**

Contoh penggunaan di theme:

```php
<?php get_header(); ?>

<button data-open>Open modal</button>

<?php get_footer(); ?>
```

Tambahkan script lewat `functions.php`.

Developer WordPress akan merasa ini dibuat khusus untuk mereka.

---

# Phase 5 — Launch

Durasi: 1 minggu

Langkah peluncuran:

1. publish GitHub repo
2. publish documentation site
3. buat artikel dev

Contoh artikel:

```
Building a Fast WordPress Theme Without jQuery
```

Developer yang peduli performance akan langsung tertarik.

---

# Timeline Realistis

Total waktu sekitar **5–6 minggu** jika dikerjakan santai setelah kerja.

Week 1

foundation architecture

Week 2

modal + dropdown

Week 3

accordion + tabs

Week 4

tooltip + mobile navigation

Week 5

documentation site

Week 6

launch

---

# Target Performance

WPUI harus ringan.

Target:

```
per component JS: <1kb
total optional bundle: <6kb
dependency: 0
```

Angka kecil seperti ini sangat menarik bagi developer yang lelah melihat website marketing memuat JS seperti aplikasi NASA.

---

# Future Roadmap (optional)

Jika project mulai dipakai orang, bisa tambah:

```
popover
toast
offcanvas
scroll reveal
copy button
```

Tapi jangan buru-buru. Fokus dulu ke 6 komponen inti.

---

Sekarang insight terakhir yang cukup penting.

Project seperti **WPUI** tidak akan viral seperti framework baru. Tapi kalau dokumentasinya bagus, ia bisa menjadi **resource yang sering dibuka developer WordPress**. Semacam “toolbox kecil” yang mereka bookmark.

Dan kalau eksekusinya benar, ada kemungkinan developer membuka situs WPUI lebih sering daripada dokumentasi **Bootstrap** yang mereka pakai selama ini hanya untuk mengambil satu modal saja.