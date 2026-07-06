# GRE Family App Asset Manifest

Source mockup: `00-full-homepage-reference.png`

These PNGs were extracted from the approved homepage mockup. Because the mockup is a flattened raster image, some assets include baked-in text. For production, rebuild live text, icons, and buttons in code where possible, and use the image crops as visual references or background art.

| File | Size | Suggested use |
|---|---:|---|
| `00-full-homepage-reference.png` | 853x1844 | Full visual reference for spacing, hierarchy, colors, and overall screen design. |
| `01-hero-background-with-header.png` | 853x650 | Hero section reference/background crop with branding baked in. |
| `02-gre-brand-lockup.png` | 470x350 | Brand lockup crop with GRE/FAMILY APP/tagline baked in. Best used as reference for typography. |
| `03-family-calendar-card.png` | 747x323 | Full Family Calendar card crop with rounded transparent corners. |
| `04-fourth-of-july-trip-card.png` | 747x495 | Full 4th of July Cabin trip card crop with rounded transparent corners. |
| `05-google-maps-card.png` | 360x150 | Full Google Maps direction card crop with rounded transparent corners. |
| `06-apple-maps-card.png` | 363x150 | Full Apple Maps direction card crop with rounded transparent corners. |
| `07-footer-forest-silhouette.png` | 853x220 | Bottom forest silhouette/background treatment. |
| `08-menu-icon-crop.png` | 55x55 | Hamburger menu crop. Rebuild as an icon in code if possible. |
| `09-notification-button.png` | 89x89 | Circular notification button crop with transparency. |
| `10-g-family-badge.png` | 73x73 | Circular G badge from the calendar card. |
| `11-under-construction-badge.png` | 317x61 | Under construction badge crop with rounded transparent corners. |
| `12-trip-badge.png` | 136x55 | Trip badge crop with rounded transparent corners. |
| `13-open-trip-board-button.png` | 295x79 | CTA button crop with rounded transparent corners. Rebuild in code for best quality. |
| `14-google-maps-icon.png` | 76x76 | Google Maps-style icon crop. |
| `15-apple-maps-icon.png` | 76x76 | Apple Maps-style icon crop. |
| `16-trip-photo-panel.png` | 373x495 | Right-side trip image crop for visual reference/background usage. |
| `17-calendar-photo-panel.png` | 380x323 | Right-side calendar image crop for visual reference/background usage. |

## Production Guidance

- Use `00-full-homepage-reference.png` as the source of truth for the screen layout.
- Rebuild typography in code instead of relying on text baked into image crops.
- Rebuild standard icons with a library such as Lucide, SF Symbols, or the app's existing icon system.
- Use the card crops only if the app needs to match the mockup exactly before layered assets are recreated.
- Preferred color direction: dark forest green, warm cream, muted cabin orange, soft off-white cards.
