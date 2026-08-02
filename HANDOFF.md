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
- Fixed: WhatsApp controls use the official filled WhatsApp brand mark (#i-whatsapp).
- Data: address is now "اصفهان، خیابان طالقانی، نبش بن‌بست ۱۵" everywhere (HTML + both vCards); website normalized to atlascctv.ir (old atlasctv.ir typo removed).
- Company vCard: TEL 031-5203 (WORK, special short office line, kept as-is per client) + office mobile kept as CELL, URL atlascctv.ir, distributor NOTE.
- Office number: hero primary CTA and dock "تماس" now dial the short office line 031-5203 (was the sales mobile). Mobile 0913 877 8737 lives in the directory (Beheshti, sales).
- Hero: full-screen (100dvh) centered landing with pulsing ISFAHAN·IRAN chip, white logo halo, red primary CTA, and a bouncing "بیشتر" scroll cue → #more.
- Directory palette: each contact has an `accent` (Fariborz green #1f9268, others blue/teal/violet/rose/gold/cyan/terracotta). Avatar ring + all four action buttons use the person's accent (rest = accent ring+icon, hover = accent fill). No pastel-fill clash.
- Avatars: gender person icons — male bust (#i-user-m), female A-line dress (#i-user-f). No initials.
- Action buttons per contact (4): direct call, WhatsApp, office+extension (dials tel:0315203,,<داخلی>), save vCard. Building icon = #i-building.
- WhatsApp: official brand glyph restored (#i-whatsapp, filled via inline fill=currentColor stroke=none, overrides the shared stroke rule).
- Desktop: ≥1024px widens shell to 960px (1040 at ≥1360) with a two-column directory; hero logo/headline scale up.
- Social preview: assets/atlas-contact-preview.png regenerated as a real business card (logo + fa/en name + title + phones + address + website), rendered via headless Chromium from scratchpad card.html. og/twitter image cache-bust ?v=20260803.
## NEXT AGENT — completed (0 tasks pending)

- Completed: added colored WebP brand logos for Hikvision, Dahua, and the exact user-supplied Briton logo with a transparent background.
- Completed: added a persistent EN/FA language toggle, translated all static UI copy, translated contact names/titles, and re-rendered the directory by active language.
- Verified: mobile Persian RTL and English LTR render correctly. All three brand assets load in full color.

Deploy: main is live at https://atlascctv.github.io/Contact/ . Push to BOTH `git push contact main` (atlas/Pages) and `git push origin main` (mirror). HEAD ~6c840b4.
Render/verify tooling (user rule: only render for asset gen / pre-push checks): Playwright venv `/Users/soeil/Documents/TRADE/OmegaTrader/venv/bin/python3`, Chromium at `~/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`. OG business card source + renderer live in the session scratchpad (`card.html`, `render_card.py`) → outputs assets/atlas-contact-preview.png (bump `?v=` in index.html on change). SVG→webp: render via chromium then `sips -s format webp in.png --out out.webp`.

### TASK 1 — completed: Brand logos
Replace the text chips in index.html `<ul class="brands">` (Hero/About section, ~line 73) with real logos in WEBP.
- Hikvision SVG: `curl -L "https://commons.wikimedia.org/wiki/Special:FilePath/Hikvision_logo.svg" -o assets/brands/hikvision.svg`
- Dahua SVG: `curl -L "https://commons.wikimedia.org/wiki/Special:FilePath/Dahua_Technology_logo.svg" -o assets/brands/dahua.svg`
- Brighton (Iranian CCTV brand, برایتون) is NOT on Wikimedia — find on an Iranian distributor site or recreate a clean wordmark SVG.
- Convert each to webp (render svg in chromium at ~2x on transparent bg, sips to webp), save assets/brands/*.webp.
- Markup: `<li><img src="assets/brands/hikvision.webp" alt="Hikvision" width="..." height="28"></li>` etc. CSS: uniform height ~26-30px, `filter:grayscale(1) opacity(.65)` at rest, full color on `:hover`, keep the row layout. Logos are language-neutral (fine for EN/FA).

### TASK 2 — completed: EN/FA language toggle
Add a fixed lang-toggle button (top-left corner pill w/ globe + target-lang label). `let lang = localStorage.lang || 'fa'`. `applyLang(l)`: set `document.documentElement.lang=l; .dir = l==='fa'?'rtl':'ltr'`, swap every `[data-en]` element's text (store original as fa on first run), re-render #contacts in the chosen lang, update the toggle label, save to localStorage. Layout mostly uses logical props so LTR largely auto-flips; spot-check `.tel` text-align and the About red rule.
Static strings to add `data-en` (fa is current content):
- h1 → "Contact Atlas Electronic"; lead → "Professional, reliable security & video surveillance. For advice, purchase, or support, talk directly to an Atlas specialist."
- CTA: "تماس با دفتر"→"Call the office"; "گروه واتساپ اطلس"→"Atlas WhatsApp group"; "عضویت"→"Join"; scroll "بیشتر"→"More".
- About h2 → "About Atlas Electronic"; about-text → "Atlas Electronic is a designer, consultant, supplier and integrator of security projects, protection systems and network infrastructure. We are the official representative of Hikvision, Dahua and Brighton in Isfahan province, with you at every step from consultation and design to equipment supply and installation."
- Company: address → "Taleghani St, Alley 15, Isfahan"; "ذخیره اطلاعات شرکت"→"Save company contact".
- Directory h2 "مستقیم با تیم ما"→"Reach our team directly"; hint "تماس · واتساپ · ذخیره"→"Call · WhatsApp · Save".
- Dock: تماس/Call, واتساپ/WhatsApp, لیست قیمت/Price list, اینستاگرام/Instagram, وب‌سایت/Website. (eyebrow/locus/footer already EN.)
Directory contacts (app.js `contacts[]` — add `nameEn`,`titleEn`; render "داخلی"↔"Ext.", digits via existing `toLatin()`):
- Titles: مدیر فروش=Sales Manager, کارشناس فروش=Sales Expert, مدیر حسابداری=Accounting Manager, حسابداری=Accounting, فروش سازمانی=Corporate Sales, مدیر پروژه=Project Manager, گارانتی و خدمات=Warranty & Service.
- Names: Mr. Fariborz Beheshti, Mr. Hosseini-Nejad, Ms. Nakhaei, Ms. Beheshti, Ms. Bakhtiari, Mr. Tavakoli, Mr. Manouchehri, Mr. Asadi.

Style rules to honor (global): no em dashes in client copy; humanized natural Persian. User is a dev — keep changes minimal, match existing code. Verify by rendering FA + EN before pushing.
