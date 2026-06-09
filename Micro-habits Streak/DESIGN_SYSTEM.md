# 🎨 Micro-Habits Streak - Unified Design System

## Overview

This document outlines the comprehensive design system for the Micro-Habits Streak application. All pages and components should use these standards to ensure consistency, maintainability, and professional appearance.

---

## 📚 Table of Contents

1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Components](#components)
5. [Dark Mode](#dark-mode)
6. [How to Use](#how-to-use)
7. [Best Practices](#best-practices)

---

## 🎨 Color Palette

### Primary Colors (Brand)
```css
--primary-dark: #6B5344;        /* Dark Brown - Headers, Accents */
--primary-medium: #A5856F;      /* Medium Brown - Main Brand Color */
--primary-light: #D4B5A0;       /* Light Brown - Subtle Backgrounds */
--primary-lighter: #F2F0EA;     /* Very Light Beige - Light Backgrounds */
```

### Accent Colors
```css
--accent-primary: #667eea;      /* Purple - Main Accent */
--accent-secondary: #764ba2;    /* Deep Purple - Hover States */
--accent-light: #8B9FFF;        /* Light Purple - Disabled States */
```

### Semantic Colors
```css
--success-color: #27ae60;        /* Green - Success Messages */
--warning-color: #f39c12;        /* Orange - Warnings */
--error-color: #e74c3c;          /* Red - Errors */
--info-color: #3498db;           /* Blue - Information */
```

### Light Mode (Default)
```css
--bg-primary: #ffffff;           /* White - Main backgrounds */
--bg-secondary: #f8f7f5;         /* Off-white - Secondary backgrounds */
--bg-tertiary: #f0ede8;          /* Light Gray - Tertiary backgrounds */
--text-primary: #1a1a1a;         /* Dark Gray - Main text */
--text-secondary: #666666;       /* Medium Gray - Secondary text */
--text-tertiary: #999999;        /* Light Gray - Tertiary text */
--border-color: #e0dcd8;         /* Light Gray - Borders */
```

### Dark Mode
```css
--bg-primary: #1a1a1a;           /* Very Dark Gray - Main backgrounds */
--bg-secondary: #2d2d2d;         /* Dark Gray - Secondary backgrounds */
--bg-tertiary: #3a3a3a;          /* Medium Dark Gray - Tertiary backgrounds */
--text-primary: #ffffff;         /* White - Main text */
--text-secondary: #b0b0b0;       /* Light Gray - Secondary text */
--text-tertiary: #808080;        /* Medium Gray - Tertiary text */
--border-color: #404040;         /* Dark Gray - Borders */
```

---

## 🔤 Typography

### Font Family
```css
--font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-family-mono: 'Monaco', 'Courier New', monospace;
```

### Font Sizes
```css
--font-size-xs: 0.75rem;         /* 12px */
--font-size-sm: 0.875rem;        /* 14px */
--font-size-base: 1rem;          /* 16px - Default */
--font-size-lg: 1.125rem;        /* 18px */
--font-size-xl: 1.25rem;         /* 20px */
--font-size-2xl: 1.5rem;         /* 24px */
--font-size-3xl: 1.875rem;       /* 30px */
--font-size-4xl: 2.25rem;        /* 36px */
--font-size-5xl: 3rem;           /* 48px */
```

### Font Weights
```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Line Heights
```css
--line-height-tight: 1.2;        /* Headings */
--line-height-normal: 1.5;       /* Body text */
--line-height-relaxed: 1.75;     /* Longer content */
```

### Usage Examples
```html
<!-- Heading 1 -->
<h1>Page Title</h1>              <!-- font-size-4xl, font-weight-semibold -->

<!-- Heading 2 -->
<h2>Section Title</h2>           <!-- font-size-3xl, font-weight-semibold -->

<!-- Paragraph -->
<p>Body text content</p>          <!-- font-size-base, line-height-relaxed -->

<!-- Small Text -->
<span class="text-sm">Small</span> <!-- font-size-sm -->
```

---

## 📐 Spacing & Layout

### Spacing Scale
```css
--space-xs: 0.25rem;    /* 4px */
--space-sm: 0.5rem;     /* 8px */
--space-md: 1rem;       /* 16px */
--space-lg: 1.5rem;     /* 24px */
--space-xl: 2rem;       /* 32px */
--space-2xl: 3rem;      /* 48px */
--space-3xl: 4rem;      /* 64px */
```

### Border Radius
```css
--radius-sm: 4px;
--radius-md: 8px;       /* Default for cards, inputs */
--radius-lg: 12px;      /* Default for large cards */
--radius-xl: 16px;      /* For modals, large components */
--radius-full: 9999px;  /* Fully rounded (pills, circles) */
```

### Shadows
```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.08);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);
--shadow-lg: 0 8px 20px rgba(0, 0, 0, 0.15);
--shadow-xl: 0 12px 28px rgba(0, 0, 0, 0.18);
```

### Transitions
```css
--transition-fast: 150ms ease-in-out;
--transition-base: 250ms ease-in-out;  /* Default */
--transition-slow: 350ms ease-in-out;
```

---

## 🧩 Components

### Buttons

#### Primary Button
```html
<button class="btn-primary">Click Me</button>
```
**Usage:** Main actions, form submissions

#### Secondary Button
```html
<button class="btn-secondary">Cancel</button>
```
**Usage:** Secondary actions, back buttons

#### Outline Button
```html
<button class="btn-outline">Learn More</button>
```
**Usage:** Tertiary actions, less emphasis

#### Button Sizes
```html
<button class="btn-primary btn-sm">Small</button>
<button class="btn-primary">Normal</button>
<button class="btn-primary btn-lg">Large</button>
```

#### Full Width Button
```html
<button class="btn-primary btn-block">Full Width</button>
```

---

### Cards

```html
<div class="card">
    <div class="card-header">
        <h3>Card Title</h3>
    </div>
    <div class="card-body">
        <p>Card content goes here</p>
    </div>
    <div class="card-footer">
        <button class="btn-secondary">Action</button>
    </div>
</div>
```

---

### Form Elements

```html
<div class="form-group">
    <label for="email">Email Address</label>
    <input type="email" id="email" placeholder="Enter your email">
</div>

<div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" placeholder="Enter your message"></textarea>
</div>

<div class="form-group">
    <label for="category">Category</label>
    <select id="category">
        <option>Select an option</option>
        <option>Option 1</option>
    </select>
</div>
```

---

### Alerts

```html
<!-- Success Alert -->
<div class="alert alert-success">
    Operation completed successfully!
</div>

<!-- Warning Alert -->
<div class="alert alert-warning">
    Please review before proceeding.
</div>

<!-- Error Alert -->
<div class="alert alert-error">
    An error occurred. Please try again.
</div>

<!-- Info Alert -->
<div class="alert alert-info">
    Here's some helpful information.
</div>
```

---

### Badges

```html
<span class="badge">Default</span>
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-error">Error</span>
```

---

## 🌙 Dark Mode

Dark mode is automatically applied when the `dark-mode` class is added to the body element:

```javascript
// Enable dark mode
document.body.classList.add('dark-mode');

// Disable dark mode
document.body.classList.remove('dark-mode');

// Toggle dark mode
document.body.classList.toggle('dark-mode');
```

All CSS variables automatically switch to their dark mode equivalents when `body.dark-mode` is active.

---

## 📖 How to Use

### 1. Import the Design System
Make sure `design-system.css` is imported in your page's HTML:

```html
<link rel="stylesheet" href="../Index/design-system.css">
```

This is typically done through the main `styles.css`:

```css
@import url('design-system.css');
```

### 2. Use CSS Variables in Your Styles
```css
.my-custom-element {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    padding: var(--space-md);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-md);
    transition: all var(--transition-base);
}
```

### 3. Use Utility Classes
```html
<!-- Spacing Utilities -->
<div class="mt-lg mb-xl p-md">Content with custom spacing</div>

<!-- Flexbox Utilities -->
<div class="flex flex-center gap-md">Centered content with gap</div>

<!-- Text Utilities -->
<p class="text-center">Centered text</p>

<!-- Dimension Utilities -->
<div class="w-full h-full">Full width and height</div>

<!-- Animation Utilities -->
<div class="animate-fadeIn">Fading in element</div>
```

---

## ✅ Best Practices

### 1. **Always Use Variables**
❌ Bad:
```css
.element {
    background-color: #A5856F;
    color: #1a1a1a;
    padding: 16px;
}
```

✅ Good:
```css
.element {
    background-color: var(--primary-medium);
    color: var(--text-primary);
    padding: var(--space-md);
}
```

### 2. **Consistent Spacing**
Use spacing scale instead of arbitrary values:
```css
/* Good spacing progression */
margin-bottom: var(--space-lg);
padding: var(--space-md);
gap: var(--space-sm);
```

### 3. **Apply Consistent Border Radius**
- Cards & containers: `--radius-lg` (12px)
- Buttons & inputs: `--radius-md` (8px)
- Modals: `--radius-lg` or `--radius-xl` (12-16px)

### 4. **Use Semantic Colors**
```css
/* For success messages */
.success-message {
    color: var(--success-color);
    background-color: var(--success-light);
}
```

### 5. **Respect Dark Mode**
All components automatically adapt to dark mode. No special handling needed if you use CSS variables.

### 6. **Responsive Design**
```css
.element {
    /* Mobile first */
    font-size: var(--font-size-lg);
    padding: var(--space-md);
}

@media (min-width: 1024px) {
    .element {
        font-size: var(--font-size-2xl);
        padding: var(--space-lg);
    }
}
```

### 7. **Transitions**
Always use the transition variables for consistency:
```css
.element {
    transition: all var(--transition-base);
}

.element:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}
```

### 8. **Z-Index Management**
Use the z-index scale:
- `--z-dropdown: 100`
- `--z-sticky: 200`
- `--z-fixed: 300`
- `--z-modal-backdrop: 400`
- `--z-modal: 500`
- `--z-notification: 800`

---

## 🎯 Component Examples

### Complete Form
```html
<div class="card">
    <div class="card-header">
        <h3>Contact Form</h3>
    </div>
    <div class="card-body">
        <form>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" placeholder="Your name">
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="your@email.com">
            </div>

            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" placeholder="Your message..."></textarea>
            </div>
        </form>
    </div>
    <div class="card-footer">
        <button class="btn-primary">Submit</button>
        <button class="btn-secondary">Cancel</button>
    </div>
</div>
```

### Success Modal
```html
<div class="modal show">
    <div class="card">
        <div class="card-header text-center">
            <h2>Success! ✓</h2>
        </div>
        <div class="card-body text-center">
            <p>Your action was completed successfully</p>
        </div>
        <div class="card-footer flex flex-center gap-md">
            <button class="btn-primary">Continue</button>
        </div>
    </div>
</div>
```

---

## 📝 Files to Update

When implementing the design system across all pages:

- [ ] `Index/styles.css` - ✅ Already updated
- [ ] `Index/design-system.css` - ✅ Created
- [ ] `Settings/settings.css` - ✅ Updated
- [ ] `Activity/Activity.css` - Update to use design system
- [ ] `Home/styles.css` - Update to use design system
- [ ] `You/you.css` - Update to use design system
- [ ] `Workarounds/workarounds.css` - Update to use design system

---

## 🚀 Next Steps

1. Review and test the design system across all browsers
2. Update remaining page CSS files to use design system variables
3. Test dark mode functionality across all pages
4. Add dark mode toggle to main navigation
5. Document any custom components specific to your app
6. Create reusable component snippets for future pages

---

**Last Updated:** 2024
**Version:** 1.0
