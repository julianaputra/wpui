(function () {

  const initDropdown = (root) => {

    const trigger = root.querySelector('[data-trigger]')
    const menu = root.querySelector('[data-menu]')

    if (!trigger || !menu) return

    // Hanya items level saat ini, bukan items di dalam submenu
    const getItems = (container) =>
      Array.from(container.querySelectorAll(':scope > li > [role="menuitem"]:not([disabled])'))

    const isOpen = () => root.classList.contains('wpui-dropdown--open')

    // ─── Submenu ───

    const subWrappers = Array.from(menu.querySelectorAll('.wpui-dropdown__item-wrap--has-sub'))
    let hoverTimer = null

    const openSubmenu = (wrapper) => {
      closeAllSubmenus()
      const subTrigger = wrapper.querySelector(':scope > [role="menuitem"]')
      const submenu = wrapper.querySelector(':scope > .wpui-dropdown__submenu')
      wrapper.classList.add('wpui-dropdown__item-wrap--sub-open')
      subTrigger?.setAttribute('aria-expanded', 'true')
      submenu?.removeAttribute('aria-hidden')
    }

    const closeSubmenu = (wrapper) => {
      const subTrigger = wrapper.querySelector(':scope > [role="menuitem"]')
      const submenu = wrapper.querySelector(':scope > .wpui-dropdown__submenu')
      wrapper.classList.remove('wpui-dropdown__item-wrap--sub-open')
      subTrigger?.setAttribute('aria-expanded', 'false')
      submenu?.setAttribute('aria-hidden', 'true')
    }

    const closeAllSubmenus = () => subWrappers.forEach(closeSubmenu)

    subWrappers.forEach((wrapper) => {
      const subTrigger = wrapper.querySelector(':scope > [role="menuitem"]')

      // Hover
      wrapper.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimer)
        openSubmenu(wrapper)
      })

      wrapper.addEventListener('mouseleave', () => {
        hoverTimer = setTimeout(() => closeSubmenu(wrapper), 120)
      })

      // Click toggle
      subTrigger?.addEventListener('click', (e) => {
        e.stopPropagation()
        const isSubOpen = wrapper.classList.contains('wpui-dropdown__item-wrap--sub-open')
        isSubOpen ? closeSubmenu(wrapper) : openSubmenu(wrapper)
      })
    })

    // ─── Main open / close ───

    const open = () => {
      root.classList.add('wpui-dropdown--open')
      trigger.setAttribute('aria-expanded', 'true')
      menu.removeAttribute('aria-hidden')
      setTimeout(() => getItems(menu)[0]?.focus(), 50)
    }

    const close = () => {
      closeAllSubmenus()
      root.classList.remove('wpui-dropdown--open')
      trigger.setAttribute('aria-expanded', 'false')
      menu.setAttribute('aria-hidden', 'true')
    }

    trigger.addEventListener('click', () => isOpen() ? close() : open())

    document.addEventListener('click', (e) => {
      if (!root.contains(e.target) && isOpen()) close()
    })

    // ─── Keyboard ───

    root.addEventListener('keydown', (e) => {

      if (!isOpen()) {
        if (e.key === 'ArrowDown' || e.key === ' ') {
          e.preventDefault()
          open()
        }
        return
      }

      // Cek apakah fokus ada di dalam submenu yang terbuka
      const activeSubWrapper = subWrappers.find((w) =>
        w.classList.contains('wpui-dropdown__item-wrap--sub-open') &&
        w.querySelector('.wpui-dropdown__submenu')?.contains(document.activeElement)
      )

      if (activeSubWrapper) {
        const submenu = activeSubWrapper.querySelector('.wpui-dropdown__submenu')
        const subItems = getItems(submenu)
        const subIdx = subItems.indexOf(document.activeElement)
        const subTriggerEl = activeSubWrapper.querySelector(':scope > [role="menuitem"]')

        switch (e.key) {
          case 'ArrowLeft':
          case 'Escape':
            e.preventDefault()
            closeSubmenu(activeSubWrapper)
            subTriggerEl?.focus()
            break
          case 'ArrowDown':
            e.preventDefault()
            subItems[(subIdx + 1) % subItems.length]?.focus()
            break
          case 'ArrowUp':
            e.preventDefault()
            subItems[(subIdx - 1 + subItems.length) % subItems.length]?.focus()
            break
          case 'Home':
            e.preventDefault()
            subItems[0]?.focus()
            break
          case 'End':
            e.preventDefault()
            subItems[subItems.length - 1]?.focus()
            break
          case 'Tab':
            close()
            break
        }
        return
      }

      // Navigasi menu utama
      const items = getItems(menu)
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
        case 'ArrowRight': {
          // Buka submenu jika item saat ini punya submenu
          const wrapper = items[idx]?.closest('.wpui-dropdown__item-wrap--has-sub')
          if (wrapper) {
            e.preventDefault()
            openSubmenu(wrapper)
            const subItems = getItems(wrapper.querySelector('.wpui-dropdown__submenu'))
            setTimeout(() => subItems[0]?.focus(), 50)
          }
          break
        }
      }

    })

  }

  document.querySelectorAll('[data-wpui="dropdown"]').forEach(initDropdown)

})()
