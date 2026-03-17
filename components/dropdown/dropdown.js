(function () {

  const initDropdown = (root) => {

    const trigger = root.querySelector('[data-trigger]')
    const menu = root.querySelector('[data-menu]')

    if (!trigger || !menu) return

    const getItems = () =>
      Array.from(menu.querySelectorAll('[role="menuitem"]:not([disabled])'))

    const isOpen = () => root.classList.contains('wpui-dropdown--open')

    const open = () => {
      root.classList.add('wpui-dropdown--open')
      trigger.setAttribute('aria-expanded', 'true')
      menu.removeAttribute('aria-hidden')

      const items = getItems()
      setTimeout(() => items[0]?.focus(), 50)
    }

    const close = () => {
      root.classList.remove('wpui-dropdown--open')
      trigger.setAttribute('aria-expanded', 'false')
      menu.setAttribute('aria-hidden', 'true')
    }

    const toggle = () => isOpen() ? close() : open()

    // Trigger click
    trigger.addEventListener('click', toggle)

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!root.contains(e.target) && isOpen()) close()
    })

    // Keyboard navigation
    root.addEventListener('keydown', (e) => {

      // Open with arrow or space when trigger is focused
      if (!isOpen()) {
        if (e.key === 'ArrowDown' || e.key === ' ') {
          e.preventDefault()
          open()
        }
        return
      }

      const items = getItems()
      const idx = items.indexOf(document.activeElement)

      switch (e.key) {

        case 'Escape':
          e.preventDefault()
          close()
          trigger.focus()
          break

        case 'Tab':
          close()
          break

        case 'ArrowDown':
          e.preventDefault()
          items[(idx + 1) % items.length]?.focus()
          break

        case 'ArrowUp':
          e.preventDefault()
          items[(idx - 1 + items.length) % items.length]?.focus()
          break

        case 'Home':
          e.preventDefault()
          items[0]?.focus()
          break

        case 'End':
          e.preventDefault()
          items[items.length - 1]?.focus()
          break

      }

    })

  }

  document.querySelectorAll('[data-wpui="dropdown"]').forEach(initDropdown)

})()
