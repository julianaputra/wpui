# Modal

Menampilkan konten dalam dialog overlay. Ringan, tanpa framework, tanpa dependency.

---

## Preview

Lihat file demo untuk melihat modal langsung di browser:

```
examples/modal-demo.html
```

---

## HTML

```html
<div data-wpui="modal" id="my-modal" class="wpui-modal">

  <button data-open class="wpui-btn">
    Open Modal
  </button>

  <div class="wpui-modal__backdrop" data-backdrop>

    <div class="wpui-modal__panel" data-panel
      role="dialog"
      aria-modal="true"
      aria-hidden="true"
      aria-labelledby="my-modal-title">

      <button data-close class="wpui-modal__close" aria-label="Close modal">
        &times;
      </button>

      <h2 id="my-modal-title">Modal Title</h2>
      <p>Modal content goes here.</p>

    </div>

  </div>

</div>
```

---

## CSS

```css
.wpui-modal__backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, .5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;

    opacity: 0;
    visibility: hidden;
    transition: opacity .25s ease, visibility .25s ease;
}

.wpui-modal--open .wpui-modal__backdrop {
    opacity: 1;
    visibility: visible;
}

.wpui-modal__panel {
    background: white;
    padding: 32px;
    width: 90%;
    max-width: 500px;
    border-radius: 8px;
    position: relative;

    transform: translateY(20px);
    opacity: 0;
    transition: transform .25s ease, opacity .25s ease;
}

.wpui-modal--open .wpui-modal__panel {
    transform: translateY(0);
    opacity: 1;
}

.wpui-modal__close {
    position: absolute;
    right: 12px;
    top: 12px;
    width: 32px;
    height: 32px;
    border: none;
    background: none;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
    border-radius: 4px;
    color: #555;
    display: flex;
    align-items: center;
    justify-content: center;
}

.wpui-modal__close:hover {
    background: #f0f0f0;
    color: #000;
}

.wpui-modal__close:focus-visible {
    outline: 2px solid #000;
    outline-offset: 2px;
}
```

---

## JavaScript

```js
(function () {

  const FOCUSABLE = [
    'a[href]',
    'button:not([disabled])',
    'textarea',
    'input',
    'select',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',')

  const modals = {}

  const initModal = (root) => {

    const id = root.id
    const openBtn = root.querySelector('[data-open]')
    const closeBtn = root.querySelector('[data-close]')
    const backdrop = root.querySelector('[data-backdrop]')
    const panel = root.querySelector('[data-panel]')

    let focusable = []
    let first, last, opener

    const updateFocusable = () => {
      focusable = Array.from(panel.querySelectorAll(FOCUSABLE))
      first = focusable[0]
      last = focusable[focusable.length - 1]
    }

    const open = (trigger) => {
      opener = trigger || openBtn || document.activeElement

      root.classList.add('wpui-modal--open')
      panel.setAttribute('aria-hidden', 'false')
      document.body.style.overflow = 'hidden'

      updateFocusable()

      setTimeout(() => {
        first?.focus()
      }, 50)
    }

    const close = () => {
      root.classList.remove('wpui-modal--open')
      panel.setAttribute('aria-hidden', 'true')
      document.body.style.overflow = ''

      opener?.focus()
      opener = null
    }

    openBtn?.addEventListener('click', () => open(openBtn))

    closeBtn?.addEventListener('click', close)

    backdrop?.addEventListener('click', (e) => {
      if (!panel.contains(e.target)) close()
    })

    document.addEventListener('keydown', (e) => {
      if (!root.classList.contains('wpui-modal--open')) return

      if (e.key === 'Escape') {
        close()
        return
      }

      if (e.key === 'Tab') {
        updateFocusable()

        if (focusable.length === 0) {
          e.preventDefault()
          return
        }

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    })

    if (id) modals[id] = { open, close }

  }

  document.querySelectorAll('[data-wpui="modal"]').forEach(initModal)

  // External trigger: <button data-modal="modal-id">Open</button>
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-modal]')
    if (!trigger) return
    e.preventDefault()
    const id = trigger.dataset.modal
    modals[id]?.open(trigger)
  })

})()
```

---

## Penjelasan

### Data attributes

| Attribute | Diletakkan di | Fungsi |
|---|---|---|
| `data-wpui="modal"` | root element | Menandai komponen modal |
| `data-open` | button di dalam root | Membuka modal |
| `data-close` | button di dalam panel | Menutup modal |
| `data-backdrop` | elemen backdrop | Area klik luar untuk menutup |
| `data-panel` | dialog panel | Konten modal |
| `data-modal="id"` | trigger di luar root | External trigger berdasarkan id |

### BEM classes

| Class | Keterangan |
|---|---|
| `wpui-modal` | Block — root wrapper |
| `wpui-modal__backdrop` | Element — overlay gelap |
| `wpui-modal__panel` | Element — kotak dialog |
| `wpui-modal__close` | Element — tombol close |
| `wpui-modal--open` | Modifier — state ketika modal terbuka |

### Cara kerja

Script mencari semua `[data-wpui="modal"]` saat halaman dimuat, lalu menginisialisasi setiap modal secara independen. Setiap modal mengelola state-nya sendiri.

Modal dibuka dengan menambahkan class `wpui-modal--open` ke root element. CSS transition pada `opacity` dan `visibility` menghasilkan animasi fade + slide yang berjalan dua arah (buka dan tutup).

---

## External Trigger

Modal bisa dibuka dari luar wrapper-nya menggunakan `data-modal` yang menunjuk ke `id` modal.

```html
<!-- Trigger di mana saja di halaman -->
<button data-modal="my-modal">Open Modal</button>
<a href="#" data-modal="my-modal">Open Modal</a>

<!-- Modal -->
<div data-wpui="modal" id="my-modal" class="wpui-modal">
  ...
</div>
```

Ketika modal ditutup, fokus akan kembali otomatis ke elemen yang membukanya.

---

## Accessibility

- `role="dialog"` dan `aria-modal="true"` pada panel memberi tahu screen reader bahwa ini adalah dialog
- `aria-labelledby` menghubungkan panel ke judul modal — screen reader akan membacakan judul saat modal dibuka
- `aria-hidden` diupdate secara dinamis: `true` saat tertutup, `false` saat terbuka
- **Focus trap**: Tab dan Shift+Tab dikunci di dalam panel selama modal terbuka
- **Focus return**: fokus kembali ke tombol yang membuka modal setelah ditutup
- **ESC**: menutup modal dari keyboard
- **Klik backdrop**: menutup modal
- Tombol close menggunakan `aria-label="Close modal"` karena labelnya hanya simbol `×`

---

## WordPress Usage

Tambahkan script lewat `functions.php`:

```php
function wpui_enqueue_modal() {
    wp_enqueue_style( 'wpui-modal', get_template_directory_uri() . '/wpui/modal.css' );
    wp_enqueue_script( 'wpui-modal', get_template_directory_uri() . '/wpui/modal.js', [], null, true );
}
add_action( 'wp_enqueue_scripts', 'wpui_enqueue_modal' );
```

Lalu gunakan HTML di template:

```php
<?php get_header(); ?>

<button data-modal="contact-modal">Hubungi Kami</button>

<div data-wpui="modal" id="contact-modal" class="wpui-modal">

  <div class="wpui-modal__backdrop" data-backdrop>

    <div class="wpui-modal__panel" data-panel
      role="dialog"
      aria-modal="true"
      aria-hidden="true"
      aria-labelledby="contact-modal-title">

      <button data-close class="wpui-modal__close" aria-label="Close modal">&times;</button>

      <h2 id="contact-modal-title">Hubungi Kami</h2>
      <?php echo do_shortcode('[contact-form-7 id="1"]'); ?>

    </div>

  </div>

</div>

<?php get_footer(); ?>
```
