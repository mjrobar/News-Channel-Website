# Category Section Layout Guidelines

This document outlines the standard layout, spacing, and structural formatting for creating new news category sections in the Channel One News channel website. Refer to these rules when creating or updating news sections.

---

## 1. Section Header & Spacing Rules

Each category section is separated from the preceding content by a divider and has a consistent header layout:

1. **Top Spacing (Before Divider):**
   * Keep a **`20px`** margin/padding gap from the bottom of the preceding section to the divider line.
2. **Divider Line:**
   * Style: Horizontal line of **`2px`** height, solid, with background color `#013b96` (Dark blue theme).
3. **Bottom Spacing (Below Divider):**
   * Keep a **`10px`** gap between the divider line and the category title link.
4. **Category Title Link:**
   * Text font size: **`1.6rem`**
   * Font weight: **`700`** (Bold)
   * Font family: `var(--font-heading)`
   * Hover effect: The text color transitions to theme blue (`#013b96`), and the chevron arrow (`fa-chevron-right`) glides right by `6px` (`transform: translateX(6px)`).

### HTML Structure:
```html
<!-- Category Section: [Name] -->
<section class="category-block [name]-section">
    <div class="container">
        <!-- Section Header -->
        <div class="[name]-section-header">
            <div class="[name]-divider"></div>
            <a href="[name].html" class="[name]-title-link">
                <span>[Category Bangla Name]</span>
                <i class="fas fa-chevron-right"></i>
            </a>
        </div>
        
        <!-- Layout Grid -->
        <div class="[name]-layout">
            ...
        </div>
    </div>
</section>
```

### CSS Structure:
```css
.[name]-section {
    padding-top: 20px; /* 20px gap from preceding section */
}

.[name]-section-header {
    display: flex;
    flex-direction: column;
    gap: 10px; /* 10px gap between divider and title */
    margin-bottom: var(--space-md);
}

.[name]-divider {
    width: 100%;
    height: 2px;
    background-color: #013b96;
}

.[name]-title-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--text-main);
    text-decoration: none;
    font-family: var(--font-heading);
    font-size: 1.6rem;
    font-weight: 700;
    transition: color var(--transition-fast);
    cursor: pointer;
    align-self: flex-start;
}

.[name]-title-link i {
    font-size: 1.3rem;
    color: #013b96;
    transition: transform var(--transition-fast);
}

.[name]-title-link:hover {
    color: #013b96;
}

.[name]-title-link:hover i {
    transform: translateX(6px);
}
```

---

## 2. Sports (খেলাধুলা) Grid Layout Definition

The Sports section grid consists of three main columns:

### Column 1: Left Column (2 Vertical Cards Stacked)
* **HTML Wrapper:** `.[name]-left-col` (or `.[name]-left-grid`)
* **Aspect Ratio:** Images must be styled with `aspect-ratio: 16/9` and `object-fit: cover` to ensure no distortion from backend-uploaded content.
* **Layout:** Vertical card styling where the title is placed directly below the image wrapper.

### Column 2: Middle Column (1 Large Featured Card)
* **HTML Wrapper:** `.[name]-mid-col` (or `.[name]-featured`)
* **Aspect Ratio:** Image must be styled with `aspect-ratio: 16/9` and `object-fit: cover`.
* **Layout:** Top-aligned image, with a prominent headline directly below it, and a short excerpt description paragraph underneath the headline.

### Column 3: Right Column (6 Small Horizontal Cards)
* **HTML Wrapper:** `.[name]-right-col` (or `.[name]-grid-list`)
* **Card Style:** Flex row with image on left, title on right.
* **Image dimensions:** Fixed size of **`120 x 80px`** with `object-fit: cover` and `flex: 0 0 120px;`.
* **Title Style:** Multi-line clamp of 2 lines, inline margin gap, hover transitions to theme accent.

---

## 3. General Geometry & Crop Safeguards

To prevent layout breaking due to different image aspect ratios uploaded from the backend:
1. **Always use an image wrapper:** Wrap images inside a `div` with `overflow: hidden;` and relative positioning.
2. **Apply `object-fit: cover`:** Always use `object-fit: cover; width: 100%; height: 100%;` on image tags.
3. **Lock container dimensions:** Use `aspect-ratio` or fixed dimensions (`width` and `height`) on the wrapper, rather than letting the image height dictate the card's height.
