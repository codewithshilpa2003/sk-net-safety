# SK Safety Nets Agent Guide

## Project Shape

- This is a hand-authored static website; there is no package manager, build step, test suite, or README.
- The seven top-level HTML pages are `index.html`, `services.html`, `about.html`, `why-choose-us.html`, `our-work.html`, `reviews.html`, and `contact.html`.
- Shared styles are in `style/style.css`; shared browser behavior is in `style/script.js`; images belong in `images/`.
- Pages use relative links and load the shared stylesheet and script directly. Keep those paths valid when moving markup.

## Editing Conventions

- Preserve the existing visual language: Plus Jakarta Sans/Outfit typography, navy/blue/cyan accents, green WhatsApp actions, compact rounded cards, and the established CSS variables.
- Shared header, footer, floating contact actions, navigation, and forms should behave consistently on every page. When changing one of these, inspect and update all affected HTML pages.
- Keep the site usable without a framework or bundler. Prefer semantic HTML, accessible labels/alt text, keyboard-friendly controls, and small vanilla JavaScript changes that tolerate pages where an element is absent.
- Reuse existing classes and variables before adding new CSS. Avoid inline styles unless the surrounding page already requires a one-off value.
- Do not replace the current blue/green palette with a new theme without an explicit request; the project history shows that this caused a requested rollback.

## Validation

- After HTML changes, check every local `href` and `src` target, confirm the active navigation item is correct on each page, and inspect all seven pages for malformed markup.
- After CSS or JavaScript changes, use the VS Code diagnostics and open the affected pages in a browser at desktop and narrow mobile widths. Check the mobile menu, floating call/WhatsApp actions, enquiry form, popup, and gallery behavior when relevant.
- With no automated test command available, report manual/browser validation clearly instead of inventing a build or test command.

## Scope

- Keep edits focused on the requested website behavior. Do not introduce a framework, dependency, or generated build output unless the user explicitly asks for a project migration.