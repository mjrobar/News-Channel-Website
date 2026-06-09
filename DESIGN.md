# Design Context: Ekhon News (এখন নিউজ)

## Color System (OKLCH)
We prioritize high-contrast, premium-feeling neutrals with a vibrant gold accent.

- **Surface-100**: `oklch(99% 0.005 260)` (Tinted White)
- **Surface-900**: `oklch(15% 0.04 260)` (Deep Navy)
- **Accent-Solid**: `oklch(75% 0.18 70)` (Vibrant Gold)
- **Accent-Muted**: `oklch(90% 0.05 70)`
- **Error**: `oklch(60% 0.25 25)`

## Typography
- **Heading**: 'Tiro Bangla', serif. High-weight, strong contrast.
- **Body**: 'Hind Siliguri', sans-serif. Cap body line length at 70ch.
- **Numbers**: Roboto or Inter for financial data.

## Layout Principles
- **Rhythm**: Varied spacing (16px, 32px, 64px) to avoid monotony.
- **Elevation**: Subtle shadows and border-less containers where possible.
- **Cards**: Minimalist, focusing on high-quality imagery and clear typography.

## Animation
- **Ease**: `cubic-bezier(0.33, 1, 0.68, 1)` (ease-out-expo) for all transitions.
- **Micro-interactions**: Hover scales (1.02) and subtle opacity shifts.
