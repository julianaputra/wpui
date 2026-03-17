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
      if (!panel.contains(e.target)) {
        close()
      }
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

    if (id) {
      modals[id] = { open, close }
    }

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
