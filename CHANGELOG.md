# Manager+ Changelog

## 8.0.1 - 2026-06-24
- Added an Autosave on/off control in Settings.
- Updated Data & App Status to show whether autosave is active or off.
- Updated the PWA cache version for the autosave preference.

## 8.0.0 - 2026-06-24
- Marked the app as a stable PWA release.
- Added Data & App Status panels in Info and Settings.
- Added visible history record count, last local save and last history export status.
- Updated the PWA cache version for the stable release.

## 7.4.1 - 2026-06-24
- Improved local autosave for app fields with a visible saved status.
- Added debounced typing saves and immediate saves for select and checkbox changes.
- Updated the PWA cache version for the autosave improvement.

## 7.4.0 - 2026-06-24
- Added an English/Polish language switch in Settings.
- Added Polish translations for the main navigation, key screens, footer and Info/Privacy content.
- Updated the PWA cache version for the language feature.

## 7.3.0 - 2026-06-24
- Added a dedicated Info screen with app details, Data Storage & Privacy and latest updates.
- Added a footer link to the privacy/storage information.
- Updated the PWA cache version for the new app screen.

## 7.2.3 - 2026-06-24
- Fixed the remaining History separator text after the file split.
- Refreshed the PWA cache version so browsers load the cleaned files.

## 7.2.2 - 2026-06-24
- Normalized generated text separators and repaired ternary operators after the file split.
- Confirmed `app.js` and `service-worker.js` pass syntax checks.

## 7.2.1 - 2026-06-24
- Cleaned old mojibake text in generated messages, reports and history records after moving JavaScript into `app.js`.

## 7.2.0 - 2026-06-24
- Split the monolithic HTML into `index.html`, `styles.css` and `app.js`.
- Updated the PWA cache list to include the new CSS and JavaScript files.
- Kept the existing app behavior while moving toward a professional project structure.

## 7.1.3 - 2026-06-24
- Changed PWA navigation caching to network-first to prevent old GitHub Pages builds from being served after an update.
- Confirmed the deployed History inline handler syntax fix is present locally.

## 7.1.2 - 2026-06-24
- Fixed demo date formatting so saved history uses `dd/mm/yyyy`.
- Cleaned unsafe inline handler string generation in older modules.

## 7.1.1 - 2026-06-24
- Removed circular backgrounds from home tile arrows.
- Added a short About Manager+ section to the home screen.

## 7.1.0 - 2026-06-24
- Changed the main Manager+ heading to amber.
- Simplified the hero subtitle by removing the pill frame.
- Added a cleaner separator under Shift Management.
- Updated the creator credit directly under the separator.
- Added automatic footer version rendering from the app version metadata.
- Added this changelog.

## 7.0.1 - 2026-06-24
- Refreshed the app interface with a more polished visual style.
- Completed PWA metadata, icons, manifest and offline service worker.
- Fixed the History clock rendering.
