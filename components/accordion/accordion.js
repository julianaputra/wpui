(function () {

  const initAccordion = (root) => {

    const items = Array.from(root.querySelectorAll('.wpui-accordion__item'))
    const mode = root.dataset.mode || 'single' // 'single' | 'multiple'

    const getParts = (item) => ({
      trigger: item.querySelector('[data-trigger]'),
      panel: item.querySelector('[data-panel]'),
    })

    const isOpen = (item) => item.classList.contains('wpui-accordion__item--open')

    const openItem = (item) => {
      const { trigger, panel } = getParts(item)
      item.classList.add('wpui-accordion__item--open')
      trigger.setAttribute('aria-expanded', 'true')
      panel.removeAttribute('aria-hidden')
    }

    const closeItem = (item) => {
      const { trigger, panel } = getParts(item)
      item.classList.remove('wpui-accordion__item--open')
      trigger.setAttribute('aria-expanded', 'false')
      panel.setAttribute('aria-hidden', 'true')
    }

    const toggle = (item) => {
      if (isOpen(item)) {
        closeItem(item)
      } else {
        if (mode === 'single') {
          items.forEach(closeItem)
        }
        openItem(item)
      }
    }

    // Init + bind clicks
    items.forEach((item) => {
      const { trigger, panel } = getParts(item)

      trigger.setAttribute('aria-expanded', 'false')
      panel.setAttribute('aria-hidden', 'true')

      trigger.addEventListener('click', () => toggle(item))
    })

    // Keyboard navigation between triggers
    const triggers = items.map((item) => getParts(item).trigger)

    root.addEventListener('keydown', (e) => {
      const idx = triggers.indexOf(document.activeElement)
      if (idx === -1) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          triggers[(idx + 1) % triggers.length].focus()
          break
        case 'ArrowUp':
          e.preventDefault()
          triggers[(idx - 1 + triggers.length) % triggers.length].focus()
          break
        case 'Home':
          e.preventDefault()
          triggers[0].focus()
          break
        case 'End':
          e.preventDefault()
          triggers[triggers.length - 1].focus()
          break
      }
    })

  }

  document.querySelectorAll('[data-wpui="accordion"]').forEach(initAccordion)

})()
