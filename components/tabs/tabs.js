(function () {

  const initTabs = (root) => {

    const tabs = Array.from(root.querySelectorAll('[role="tab"]'))
    const panels = Array.from(root.querySelectorAll('[role="tabpanel"]'))

    if (!tabs.length || !panels.length) return

    const activate = (tab) => {
      // Deactivate all
      tabs.forEach((t) => {
        t.setAttribute('aria-selected', 'false')
        t.setAttribute('tabindex', '-1')
        t.classList.remove('wpui-tabs__tab--active')
      })

      panels.forEach((p) => {
        p.setAttribute('hidden', '')
        p.classList.remove('wpui-tabs__panel--active')
      })

      // Activate selected
      tab.setAttribute('aria-selected', 'true')
      tab.setAttribute('tabindex', '0')
      tab.classList.add('wpui-tabs__tab--active')

      const panel = root.querySelector('#' + tab.getAttribute('aria-controls'))
      panel?.removeAttribute('hidden')
      panel?.classList.add('wpui-tabs__panel--active')
    }

    // Click
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => activate(tab))
    })

    // Keyboard — arrow keys navigate dan langsung aktivasi
    root.querySelector('[role="tablist"]').addEventListener('keydown', (e) => {

      const idx = tabs.indexOf(document.activeElement)
      if (idx === -1) return

      let next = null

      switch (e.key) {
        case 'ArrowRight':
          next = tabs[(idx + 1) % tabs.length]
          break
        case 'ArrowLeft':
          next = tabs[(idx - 1 + tabs.length) % tabs.length]
          break
        case 'Home':
          next = tabs[0]
          break
        case 'End':
          next = tabs[tabs.length - 1]
          break
        default:
          return
      }

      e.preventDefault()
      next.focus()
      activate(next)

    })

  }

  document.querySelectorAll('[data-wpui="tabs"]').forEach(initTabs)

})()
