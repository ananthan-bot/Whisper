# Changelog

All notable changes to the Whisper project will be documented in this file.

## [1.1.0] - 2026-08-01

### Added
- **Date & Time Helpers**: Relative timestamp formatting and date checker utilities (`dateTimeHelpers.js`).
- **Task Urgency Tier System**: Rule-based task urgency classifier and UI styling tokens (`taskUrgencyHelpers.js`).
- **RelativeTimeBadge Component**: Visual UI badge for displaying relative time ago indicators (`RelativeTimeBadge.jsx`).
- **Storage Quota Utilities**: Storage byte formatting and quota calculation tools (`storageHelpers.js`).
- **useLocalStorage Hook**: State synchronization hook for browser localStorage persistence (`useLocalStorage.js`).
- **useDebounce Hook**: React hook for input debouncing (`useDebounce.js`).
- **Search Query Parser**: Tokenized parser for keywords, hashtags, and urgent flags (`searchQueryHelpers.js`).
- **SearchQueryChips Component**: Visual tag chips rendering search filters (`SearchQueryChips.jsx`).
- **Analytics Accumulator**: Metrics calculator for total bounties, completion rates, and averages (`analyticsHelpers.js`).
- **TaskAnalyticsWidget**: Dashboard summary widget component (`TaskAnalyticsWidget.jsx`).
- **Audio Noise Filter Helper**: MediaStream constraints toggle for background noise suppression (`audioNoiseHelpers.js`).
- **AudioNoiseFilterControl**: Component toggle button for noise suppression (`AudioNoiseFilterControl.jsx`).
- **Referral Code System**: Code generator and validator helpers (`referralHelpers.js`).
- **ReferralBanner Component**: Promotional invitation banner with copy-to-clipboard functionality (`ReferralBanner.jsx`).
- **Rate Limiter Middleware**: Backend API request throttling middleware (`rateLimiter.js`).
- **Health Diagnostic Endpoint**: Server uptime and version diagnostic router (`server/routes/health.js`).
- **CSV Exporter Helper**: User activity log formatting to CSV (`csvExportHelpers.js`).
- **QuickActionFab Component**: Floating action menu button (`QuickActionFab.jsx`).
- **Accessibility Helpers**: High contrast focus outline toggle and ARIA live region builder (`a11yHelpers.js`).
- **AccessibilityMenu Component**: User modal for contrast and typography preferences (`AccessibilityMenu.jsx`).

### Changed
- Expanded `npm test` target pattern in `package.json` to recursively discover unit test suites across all `src` and `server` directories.
