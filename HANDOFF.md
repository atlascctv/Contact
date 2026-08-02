# Handoff

- Architecture: static HTML, CSS, and vanilla JavaScript deployed with GitHub Pages.
- Shipped: Persian RTL company contact directory with supplied Atlas vector logo, team-specific vCard downloads, WhatsApp group, QR code, SEO metadata, PWA assets, and Pages workflow.
- Deployment: primary Pages target is `https://atlascctv.github.io/Contact/`; it mirrors to `soheils2/Atlas` during migration.
- Updated: direct-contact directory now has eight verified contacts, three-digit extensions, corrected phone numbers, and an Asadi warranty/service contact.
- Updated: fixed quick-contact dock includes phone, WhatsApp community, Dropbox price list, Instagram, and website.
- Redesign (2026-08-02): rebuilt as editorial warm-minimal card. Hairline-separated rows (no box-to-box), monogram avatars, staggered scroll-reveal + hero rise animations, breathing background glow. styles.css expanded from minified for maintainability.
- Added: "درباره اطلس الکترونیک" (About) section with humanized copy + brand chips (هایک‌ویژن/داهوا/برایتون), placed between hero and directory.
- Removed: SUPPORT LINE service band (Asadi warranty contact still lives in the directory).
- Fixed: per-person vCard now emits `N:` so saved contacts carry the name (app.js:44).
- Fixed: WhatsApp glyph swapped for a generic line chat-bubble (#i-whatsapp).
- Data: address is now "اصفهان، خیابان طالقانی، نبش بن‌بست ۱۵" everywhere (HTML + both vCards); website normalized to atlascctv.ir (old atlasctv.ir typo removed).
- Company vCard: TEL 0315203 (WORK) + office mobile kept as CELL, URL atlascctv.ir, distributor NOTE. NOTE: 0315203 is only 7 digits — confirm the full landline.
