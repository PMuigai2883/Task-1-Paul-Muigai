# 🚀 Design System - Quick Reference Guide

## Color Variables

### Semantic Use
```css
--bg-primary       /* Main backgrounds */
--bg-secondary     /* Secondary backgrounds */
--bg-tertiary      /* Tertiary backgrounds */
--text-primary     /* Main text */
--text-secondary   /* Secondary text */
--text-tertiary    /* Tertiary text */
--border-color     /* Borders */
```

### Brand Colors
```css
--primary-dark       /* #6B5344 */
--primary-medium     /* #A5856F */
--primary-light      /* #D4B5A0 */
--primary-lighter    /* #F2F0EA */
```

### Accent Colors
```css
--accent-primary     /* #667eea - Main accent */
--accent-secondary   /* #764ba2 - Hover state */
--accent-light       /* #8B9FFF - Disabled state */
```

### Status Colors
```css
--success-color      /* #27ae60 - Success */
--error-color        /* #e74c3c - Error */
--warning-color      /* #f39c12 - Warning */
--info-color         /* #3498db - Information */
```

---

## Typography Quick Reference

### Font Sizes
```css
--font-size-xs    /* 0.75rem (12px) */
--font-size-sm    /* 0.875rem (14px) */
--font-size-base  /* 1rem (16px) - Default */
--font-size-lg    /* 1.125rem (18px) */
--font-size-xl    /* 1.25rem (20px) */
--font-size-2xl   /* 1.5rem (24px) */
--font-size-3xl   /* 1.875rem (30px) */
--font-size-4xl   /* 2.25rem (36px) */
--font-size-5xl   /* 3rem (48px) */
```

### Font Weights
```css
--font-weight-light      /* 300 */
--font-weight-normal     /* 400 */
--font-weight-medium     /* 500 */
--font-weight-semibold   /* 600 - Headings */
--font-weight-bold       /* 700 - Emphasis */
```

### Line Heights
```css
--line-height-tight      /* 1.2 - Headings */
--line-height-normal     /* 1.5 - Body */
--line-height-relaxed    /* 1.75 - Long content */
```

---

## Spacing Quick Reference

```css
--space-xs   /* 0.25rem (4px) */
--space-sm   /* 0.5rem (8px) */
--space-md   /* 1rem (16px) */
--space-lg   /* 1.5rem (24px) */
--space-xl   /* 2rem (32px) */
--space-2xl  /* 3rem (48px) */
--space-3xl  /* 4rem (64px) */
```

### Common Usage
```css
padding: var(--space-md);        /* 16px padding */
margin-bottom: var(--space-lg);  /* 24px margin */
gap: var(--space-sm);            /* 8px gap */
```

---

## Border Radius

```css
--radius-sm    /* 4px - Small elements */
--radius-md    /* 8px - Buttons, inputs */
--radius-lg    /* 12px - Cards, containers */
--radius-xl    /* 16px - Modals, large cards */
--radius-full  /* 9999px - Circles, pills */
```

---

## Shadows

```css
--shadow-sm  /* Subtle: 0 2px 4px */
--shadow-md  /* Medium: 0 4px 12px */
--shadow-lg  /* Large: 0 8px 20px */
--shadow-xl  /* Extra Large: 0 12px 28px */
```

### Usage
```css
box-shadow: var(--shadow-md);  /* Medium shadow */
```

---

## Transitions

```css
--transition-fast  /* 150ms ease-in-out */
--transition-base  /* 250ms ease-in-out - Default */
--transition-slow  /* 350ms ease-in-out */
```

### Usage
```css
transition: all var(--transition-base);
```

---

## Z-Index Scale

```css
--z-dropdown: 100
--z-sticky: 200
--z-fixed: 300
--z-modal-backdrop: 400
--z-modal: 500
--z-popover: 600
--z-tooltip: 700
--z-notification: 800
```

---

## Button Classes

### Primary Button
```html
<button class="btn-primary">Click Me</button>
```
- Gradient blue background
- White text
- Shadow effect

### Secondary Button
```html
<button class="btn-secondary">Cancel</button>
```
- Light background
- Dark text
- Border

### Outline Button
```html
<button class="btn-outline">Learn More</button>
```
- Transparent background
- Colored border

### Button Sizes
```html
<button class="btn-primary btn-sm">Small</button>
<button class="btn-primary">Normal</button>
<button class="btn-primary btn-lg">Large</button>
```

### Full Width
```html
<button class="btn-primary btn-block">Full Width</button>
```

---

## Form Elements

```html
<div class="form-group">
    <label for="input">Label</label>
    <input type="text" id="input" placeholder="Enter value">
</div>
```

All form inputs automatically:
- Use design system colors
- Have focus states
- Support dark mode
- Are responsive

---

## Alert Classes

```html
<div class="alert alert-success">Success message</div>
<div class="alert alert-warning">Warning message</div>
<div class="alert alert-error">Error message</div>
<div class="alert alert-info">Info message</div>
```

---

## Badge Classes

```html
<span class="badge">Default</span>
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-error">Error</span>
```

---

## Utility Classes

### Spacing
```html
<div class="mt-lg mb-xl p-md">Content</div>
```
- `mt-*`, `mb-*`, `ml-*`, `mr-*` - Margins
- `p-*` - Padding (all sides)

### Flexbox
```html
<div class="flex flex-center gap-md">
    <button>Button 1</button>
    <button>Button 2</button>
</div>
```
- `flex` - Display flex
- `flex-col` - Flex column
- `flex-center` - Center content
- `gap-*` - Gap between items

### Text
```html
<p class="text-center">Centered text</p>
```
- `text-center`, `text-left`, `text-right`

### Dimensions
```html
<div class="w-full h-full">Full size</div>
```
- `w-full`, `h-full` - Full width/height

---

## Card Structure

```html
<div class="card">
    <div class="card-header">
        <h3>Card Title</h3>
    </div>
    <div class="card-body">
        <p>Card content</p>
    </div>
    <div class="card-footer">
        <button class="btn-primary">Action</button>
    </div>
</div>
```

---

## Dark Mode

Enable dark mode:
```javascript
document.body.classList.add('dark-mode');
```

Disable:
```javascript
document.body.classList.remove('dark-mode');
```

Toggle:
```javascript
document.body.classList.toggle('dark-mode');
```

All CSS variables automatically update!

---

## Common Patterns

### Card with Hover Effect
```css
.card {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    box-shadow: var(--shadow-sm);
    transition: all var(--transition-base);
}

.card:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--accent-primary);
}
```

### Button with Gradient
```css
.button {
    background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
    color: white;
    padding: var(--space-sm) var(--space-lg);
    border-radius: var(--radius-md);
    border: none;
    cursor: pointer;
}

.button:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}
```

### Form Input Focus
```css
input:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
```

---

## Tips & Tricks

1. **Always use variables** - Never hardcode colors or sizes
2. **Use semantic colors** - Use `--text-primary` not `--accent-primary` for text
3. **Respect spacing scale** - Use only defined spacing values
4. **Support dark mode** - All variables automatically adapt
5. **Test responsive** - Check mobile, tablet, desktop
6. **Use shadows subtly** - `--shadow-sm` for most elements
7. **Animate smoothly** - Use `--transition-base` by default
8. **Keep z-index scale** - Use the defined scale, don't create new values

---

## Files Reference

- **Design System:** `Index/design-system.css`
- **Main Styles:** `Index/styles.css`
- **Documentation:** `DESIGN_SYSTEM.md`
- **Implementation Report:** `IMPLEMENTATION_REPORT.md`
- **Quick Reference:** This file

---


## firebase structure

users/
  {userId}/
    commitments/
      {commitmentId}/
        title: ""
        description: ""
        targetDate: ""
        type: ""
        completed: false
        createdDate: ""
        steps/
          {stepId}/
            title: ""

**Last Updated:** 2024
**Version:** 1.0
