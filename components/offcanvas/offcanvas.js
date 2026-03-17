(function () {

  const FOCUSABLE = [
    'a[href]',
    'button:not([disabled])',
    'textarea',
    'input',
    'select',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',')

  const panels = {}

  const initOffcanvas = (root) => {

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

      root.classList.add('wpui-offcanvas--open')
      panel.setAttribute('aria-hidden', 'false')
      document.body.style.overflow = 'hidden'

      updateFocusable()
      setTimeout(() => first?.focus(), 50)
    }

    const close = () => {
      root.classList.remove('wpui-offcanvas--open')
      panel.setAttribute('aria-hidden', 'true')
      document.body.style.overflow = ''

      opener?.focus()
      opener = null
    }

    openBtn?.addEventListener('click', () => open(openBtn))
    closeBtn?.addEventListener('click', close)

    backdrop?.addEventListener('click', close)

    document.addEventListener('keydown', (e) => {
      if (!root.classList.contains('wpui-offcanvas--open')) return

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

    if (id) panels[id] = { open, close }

  }

  document.querySelectorAll('[data-wpui="offcanvas"]').forEach(initOffcanvas)

  // External trigger: <button data-offcanvas="id">Open</button>
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-offcanvas]')
    if (!trigger) return
    e.preventDefault()
    const id = trigger.dataset.offcanvas
    panels[id]?.open(trigger)
  })

})()
