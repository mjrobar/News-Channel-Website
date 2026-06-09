# News Channel Website project NCW

A modern, high-fidelity, and fully responsive Bengali business news channel portal built for **Ekhon News (এখন নিউজ)** — *Professional Business Television (প্রফেশনাল বিজনেস টেলিভিশন)*.

---

## 📺 Project Overview

**Ekhon News** is a premium, professional business and general news television portal designed to deliver real-time news to readers and business professionals in Bangladesh and the Bengali-speaking diaspora. 

The website is designed with a premium visual system, utilizing state-of-the-art layout principles, curated typography, and interactive components.

---

## 🚀 Key Features

*   **⚡ Live News Ticker**: An auto-scrolling breaking news ticker bar with categorized news headers and timestamps.
*   **🎥 Watch Live Broadcast**: A prominent header action button that redirects users directly to the live stream.
*   **⚽ World Cup Countdown Banner**: A custom-themed sports section containing a dynamic countdown widget, styled with stadium overlays and trophy visuals.
*   **📍 Localized News Search**: An interactive selector widget allowing users to filter latest news by **Division**, **District**, and **Upazila** dynamically.
*   **📊 Featured Grid Layouts**: A curated hierarchy of news grids displaying featured news cards, stacked list items, opinion columns ("Motamot"), and inline advertisement banners.
*   **📱 Responsive & Fluid Design**: Fully responsive across mobile, tablet, and desktop devices utilizing Bootstrap's grid and flexbox utilities.

---

## 🎨 Design System

The project incorporates a custom-designed visual system:

### Color Palette (OKLCH Color Space)
*   **Primary Surface / Text-Solid (Deep Navy)**: `oklch(15% 0.04 260)`
*   **Secondary Surface (Tinted White)**: `oklch(99% 0.005 260)`
*   **Vibrant Accent (Vibrant Gold)**: `oklch(75% 0.18 70)`
*   **Muted Accent**: `oklch(90% 0.05 70)`
*   **Errors / Badges**: `oklch(60% 0.25 25)`

### Typography
*   **Headings**: `Tiro Bangla` (Serif) — Bold, high-weight, and strong contrast.
*   **Body Text**: `Hind Siliguri` (Sans-serif) — Capped at 70ch for maximum legibility and reading comfort.
*   **Financial & Numerical Data**: `Inter` / `Roboto` (Sans-serif) — Clean, tabular layout.

---

## 🛠️ Technology Stack

*   **Structure**: Semantic HTML5 markup
*   **Styling**: Vanilla CSS3 (with custom utility classes and design tokens)
*   **Layout Helpers**: Bootstrap 5.3.2 Grid, Utilities, and Icons
*   **Interactivity**: Vanilla JavaScript (ES6+)
*   **Assets**: Curated Unsplash images and custom vector elements

---

## 📁 Project Structure

```text
NCW/
├── assets/
│   ├── css/
│   │   ├── style.css       # Core design system tokens and resets
│   │   ├── components.css  # Reusable elements (Navbar, Ticker, Cards)
│   │   └── home.css        # Page-specific layout styles
│   ├── js/
│   │   └── main.js         # Countdown, local filter widget logic
│   └── images/
│       ├── logo.jpg        # Channel brand logo
│       ├── wc_trophy.png   # World cup banner graphics
│       └── wc_ball.png
├── index.html              # Homepage
├── economy.html            # Economy-specific category page
├── news-details.html       # Individual article detail page
├── DESIGN.md               # Visual design tokens log
├── PRODUCT.md              # Brand tone and voice guidelines
└── README.md               # Project documentation
```

---

## 💻 Getting Started

### Prerequisites
To run this project locally, all you need is a modern web browser.

### Installation & Run
1. Clone the repository:
   ```bash
   git clone https://github.com/mjrobar/News-Channel-Website.git
   ```
2. Navigate to the project directory:
   ```bash
   cd News-Channel-Website
   ```
3. Open `index.html` in your favorite web browser or start a local development server (e.g., Live Server in VS Code).
