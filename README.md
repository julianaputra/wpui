# WPUI

WPUI is a small collection of copy-paste UI components designed for modern WordPress themes.

No frameworks.
No jQuery.
No installation.

Just copy the HTML, CSS, and JavaScript you need.

---

## Why WPUI?

Many WordPress websites include large UI libraries just to use a few simple components like a modal or dropdown.

WPUI solves this by providing **lightweight components that can be copied directly into your project**.

You only include the code you actually use.

---

## Principles

WPUI follows a few simple rules:

* No framework dependency
* No jQuery
* Copy-paste friendly
* Accessible by default
* Small JavaScript footprint
* Works with any CSS approach (plain CSS, Tailwind, etc.)

---

## Components

Current components included:

* Modal
* Dropdown
* Accordion
* Tabs
* Tooltip
* Mobile Navigation

Each component includes:

* HTML markup
* CSS styles
* Vanilla JavaScript logic
* Accessibility considerations

---

## Usage

1. Open the component you want.
2. Copy the HTML into your template.
3. Copy the CSS into your stylesheet.
4. Copy the JavaScript into your script file.

That's it.

No build step required.

---

## Example

Modal structure:

```html
<div data-ui="modal">
  <button data-open>Open Modal</button>

  <div data-panel>
    <button data-close>Close</button>
    Modal content
  </div>
</div>
```

Basic JavaScript:

```javascript
document.querySelectorAll('[data-ui="modal"]').forEach((modal) => {

  const open = modal.querySelector('[data-open]')
  const close = modal.querySelector('[data-close]')
  const panel = modal.querySelector('[data-panel]')

  open.addEventListener('click', () => {
    modal.classList.add('open')
  })

  close.addEventListener('click', () => {
    modal.classList.remove('open')
  })

})
```

---

## WordPress Usage

WPUI works perfectly with WordPress themes.

Simply include the JavaScript file in your theme and add the HTML markup inside your template files.

Example:

```php
<?php get_header(); ?>

<button data-open>Open Modal</button>

<?php get_footer(); ?>
```

---

## Philosophy

WPUI is not a framework.

It does not try to control your project.

It simply gives you small, well-structured UI components that you can adapt and modify as needed.

---

## License

MIT
