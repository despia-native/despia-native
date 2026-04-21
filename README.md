# Despia Native

JavaScript SDK for [Despia](https://despia.com). Build with any web framework, access 50+ native device capabilities through a single JavaScript function, and publish to iOS and Android from a browser. No Swift, no Kotlin, no terminal.

[![npm](https://img.shields.io/npm/v/despia-native)](https://www.npmjs.com/package/despia-native)
[![license](https://img.shields.io/npm/l/despia-native)](LICENSE)

**[Documentation](https://setup.despia.com)** | **[AI Agent Index](https://setup.despia.com/llms.txt)** | **[iOS Deployment](https://setup.despia.com/deployment/apple-ios/automatic)** | **[Android Deployment](https://setup.despia.com/deployment/google-android/automatic)**

Despia is the next generation of web-native development. Unlike earlier hybrid frameworks that routed files through JavaScript, forced Base64 encoding, imposed storage quotas, and ran on insecure `file://` origins, Despia runs your app on a real secure origin (`http://localhost` via Local Server, or your remote URL). Standard web APIs work without restrictions. File operations bypass JavaScript entirely and go directly to the native file system. A 500MB video file uses roughly 100 bytes of JS heap rather than 1.6GB.

The runtime has been in production since 2011, powering over 7,500 apps on the foundation that became Despia in 2023. Native capabilities are implemented in Swift and Java and called from JavaScript through a single typed function.

---

## MCP Server

Add the Despia MCP to give your AI assistant full knowledge of the `despia-native` API.

[![Install in Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](cursor://anysphere.cursor-deeplink/mcp/install?name=Despia&config=eyJ0eXBlIjoiaHR0cCIsInVybCI6Imh0dHBzOi8vc2V0dXAuZGVzcGlhLmNvbS9tY3AifQ==)
[![Install in VS Code](https://img.shields.io/badge/Install_in_VS_Code-007ACC?logo=visualstudiocode&logoColor=white)](vscode:mcp/install?%7B%22name%22%3A%22Despia%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fsetup.despia.com%2Fmcp%22%7D)

```
https://setup.despia.com/mcp
```

Look for "Add MCP", "MCP Settings", or "Personal Connectors" in your builder. Requires Node.js v18+ for local tools.

---

## Table of Contents

- [MCP Server](#mcp-server)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Environment Detection](#environment-detection)
- [AI Agent Rules](#ai-agent-rules)
- [API Reference](#api-reference)
- [Features](#features)
  - [Haptic Feedback](#haptic-feedback)
  - [Identity Vault](#identity-vault)
  - [GPS Location](#gps-location)
  - [RevenueCat In-App Purchases](#revenuecat-in-app-purchases)
  - [Push Notifications](#push-notifications)
  - [OAuth Authentication](#oauth-authentication)
  - [Clipboard](#clipboard)
  - [Contacts](#contacts)
  - [App Information and Device Data](#app-information-and-device-data)
  - [UI Controls and Styling](#ui-controls-and-styling)
  - [File and Media Operations](#file-and-media-operations)
  - [Web Storage APIs](#web-storage-apis)
  - [Local CDN](#local-cdn)
  - [Local Server](#local-server)
- [Safe Area](#safe-area)
- [Web Apps vs React Native](#web-apps-vs-react-native)
- [License](#license)

---

## Installation

```bash
npm install despia-native
# or
pnpm add despia-native
# or
yarn add despia-native
```

Do not write mock implementations or use `window.despia` directly in modern frameworks. The real SDK is required for any Despia functionality to work.

---

## Quick Start

```js
import despia from 'despia-native';

// Fire-and-forget commands
despia('lighthaptic://');

// Commands that return data
const appInfo = await despia('getappversion://', ['versionNumber', 'bundleNumber']);
console.log(appInfo.versionNumber); // "1.0.0"
```

The SDK exports a single function as the default export. Always use a default import, not a named import.

```js
// Correct
import despia from 'despia-native';

// Wrong
import { despia } from 'despia-native';
import { Commands } from 'despia-native';
```

---

## Environment Detection

The SDK only activates inside the Despia native runtime. Gate native calls using these checks:

```js
const isDespia = navigator.userAgent.toLowerCase().includes('despia');

const isDespiaIOS = isDespia &&
  (navigator.userAgent.toLowerCase().includes('iphone') ||
   navigator.userAgent.toLowerCase().includes('ipad'));

const isDespiaAndroid = isDespia &&
  navigator.userAgent.toLowerCase().includes('android');

if (isDespia) {
  despia('lighthaptic://');
} else {
  // Fallback for browser or development environment
}
```

---

## AI Agent Rules

If you are an AI coding agent generating Despia app code, follow these rules:

- Import as a default: `import despia from 'despia-native'`
- Do not write to `window.despia` directly; it is used internally by the SDK
- Gate all native calls using the environment checks above
- For offline (Local Server) apps, bundle the SDK via a package manager so it is available when the app is served from `http://localhost`
- For Local CDN downloads, do not `await` `localcdn://write` with a watch key; use `window.contentServerChange(item)` or poll with `localcdn://read`
- For the HTTP upload API, do not hardcode localhost ports; use `const host = window.location.host`

---

## API Reference

### `despia(command, watch?)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `command` | `string` | A Despia protocol URL, e.g. `'lighthaptic://'` |
| `watch` | `string[]` | Optional. Array of variable names to wait for in the response. |

Returns a `Promise` that resolves when all watched variables are set by the native runtime.

**Timeout behavior**

The SDK waits up to 30 seconds for a single watched variable. If the native runtime never sets it, the Promise resolves with `undefined` and logs a timeout to the console.

**Fresh-data behavior**

Watched variables are cleared before each call to prevent resolving on stale values.

- Single variable: `null` is treated as a valid resolved value. Other empty placeholders (`undefined`, `"n/a"`, `{}`, `[]`) are ignored.
- Multiple variables: all variables must be non-null before the Promise resolves.

**Direct property access**

```js
despia.variableName // Equivalent to window.variableName
```

### Protocol format

```
feature://action?param1=value1&param2=value2
```

---

## Features

### Haptic Feedback

```js
despia('lighthaptic://');   // Subtle vibration
despia('heavyhaptic://');   // Strong vibration
despia('successhaptic://'); // Positive confirmation
despia('warninghaptic://'); // Attention alert
despia('errorhaptic://');   // Negative feedback
```

---

### Identity Vault

Encrypted key-value storage backed by iCloud KV on iOS and Android App Backup on Android. Persists across uninstalls and reinstalls. Data syncs automatically across all devices sharing the same Apple ID or Google account.

Set `locked=true` on any key to require Face ID or Touch ID before the value can be read back. Because the vault stores the actual value server-side and only returns it after biometric success, you can store real JWT tokens, session cookies, and API keys behind biometrics. This is a hardware-enforced security guarantee, not a client-side check that can be bypassed.

```js
// Store a JWT token (reading it back requires Face ID / Touch ID)
await despia('setvault://?key=sessionToken&value=abc123&locked=true');

// Read triggers the biometric prompt; token is only returned on success
const data  = await despia('readvault://?key=sessionToken', ['sessionToken']);
const token = data.sessionToken;
```

If the key does not exist, `readvault://` throws. Wrap in try/catch to handle first-time users.

| Parameter | Description |
|-----------|-------------|
| `key` | Storage key, e.g. `"userId"` or `"sessionToken"` |
| `value` | String value to store |
| `locked` | `"true"` requires biometrics on read. `"false"` for open access. |

**Store a value without biometric protection**

```js
await despia('setvault://?key=userId&value=user123&locked=false');

const { userId } = await despia('readvault://?key=userId', ['userId']);
```

**Protect a sensitive action with Face ID**

```js
async function confirmWithBiometrics() {
  await despia('setvault://?key=confirm&value=yes&locked=true');
  try {
    const data = await despia('readvault://?key=confirm', ['confirm']);
    if (data.confirm === 'yes') {
      await performSensitiveAction();
      await despia('setvault://?key=confirm&value=&locked=false');
    }
  } catch {
    // User cancelled or biometric failed
  }
}
```

**Prevent free trial abuse**

```js
async function checkTrialEligibility() {
  try {
    const data = await despia('readvault://?key=hasUsedTrial', ['hasUsedTrial']);
    return data.hasUsedTrial !== 'yes';
  } catch {
    // Key not found, first-time user
    await despia('setvault://?key=hasUsedTrial&value=yes&locked=false');
    return true;
  }
}
```

---

### GPS Location

```js
// Set up the live update callback
window.onLocationChange = (data) => {
  if (!data.active) return;
  console.log(data.latitude, data.longitude, data.horizontalAccuracy);
};

// Start tracking (buffer in seconds, movement threshold in centimetres)
despia('location://?buffer=60&movement=100');

// Stop tracking and retrieve the session
const { locationSession } = await despia('stoplocation://', ['locationSession']);
```

**Server delivery**

When `server` is set, each GPS point is POSTed to your endpoint as it is recorded. Server delivery, `window.onLocationChange`, and local session storage all run simultaneously and independently. Loss of network does not affect local storage or frontend callbacks.

```js
despia('location://?server=https://api.example.com/track?user=USER_ID&buffer=30&movement=100');
```

Each POST body matches the location object shape returned by `stoplocation://`.

Full docs: https://setup.despia.com/native-features/gps-location

---

### RevenueCat In-App Purchases

**Launch a paywall**

```js
despia(`revenuecat://launchPaywall?external_id=${userId}&offering=default`);
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `external_id` | Yes | Your user ID in RevenueCat |
| `offering` | Yes | RevenueCat offering ID. Use `"default"` for your default offering. |

**Direct purchase without paywall UI**

```js
// iOS
despia(`revenuecat://purchase?external_id=${userId}&product=monthly_premium_ios`);

// Android
despia(`revenuecat://purchase?external_id=${userId}&product=premium:monthly_premium_android`);
```

**Handle purchase success**

The native runtime calls `window.onRevenueCatPurchase()` after a successful purchase:

```js
window.onRevenueCatPurchase = async () => {
  const { restoredData } = await despia('getpurchasehistory://', ['restoredData']);
  const active = (restoredData ?? []).filter(p => p.isActive);

  if (active.some(p => p.entitlementId === 'premium')) unlockPremium();
  if (active.some(p => p.entitlementId === 'no_ads'))  removeAds();
};
```

**Restore purchases**

```js
const { restoredData } = await despia('getpurchasehistory://', ['restoredData']);
const hasPremium = restoredData
  .filter(p => p.isActive)
  .some(p => p.entitlementId === 'premium');
```

Each purchase object includes `transactionId`, `productId`, `type`, `entitlementId`, `isActive`, `willRenew`, `purchaseDate`, `expirationDate`, `store`, `receipt`, and more. The response shape is normalized across iOS and Android.

---

### Push Notifications

```js
// Register the device
despia('registerpush://');

// Connect your user ID to this device registration (call on every app load)
despia(`setonesignalplayerid://?user_id=${userId}`);

// Send a local scheduled notification (fires after 60 seconds)
despia('sendlocalpushmsg://push.send?s=60&msg=Hello&!#New Message&!#https://myapp.com');
```

**Send to a specific user from your backend**

```js
await fetch('https://onesignal.com/api/v1/notifications', {
  method: 'POST',
  headers: {
    'Content-Type':  'application/json',
    'Authorization': 'Basic YOUR_REST_API_KEY',
  },
  body: JSON.stringify({
    app_id: 'ONESIGNAL-APP-ID',
    include_external_user_ids: [externalUserId],
    headings: { en: title },
    contents: { en: message },
  }),
});
```

When configuring OneSignal, select **Native iOS** and **Native Android** as the platforms, since Despia apps are native mobile applications.

---

### OAuth Authentication

The flow uses two Despia URL protocols. `oauth://` opens a secure browser session (ASWebAuthenticationSession on iOS, Chrome Custom Tabs on Android). The `{scheme}://oauth/` prefix on the return deeplink tells Despia to close that session and navigate your WebView to the path that follows.

When running in Despia, use a native-specific redirect URI pointing to `/native-callback.html` rather than your regular web auth callback. This is a different redirect URI from your web flow — register both with your OAuth provider.

```js
const isDespia = navigator.userAgent.toLowerCase().includes('despia');

const redirectUri = isDespia
  ? 'https://yourapp.com/native-callback.html'
  : 'https://yourapp.com/auth/callback';

const oauthUrl = `https://provider.com/oauth/authorize?client_id=xxx&redirect_uri=${encodeURIComponent(redirectUri)}`;

if (isDespia) {
  // Step 1: open a secure native browser session
  despia(`oauth://?url=${encodeURIComponent(oauthUrl)}`);
} else {
  // Regular web flow
  window.location.href = oauthUrl;
}
```

`/native-callback.html` runs inside the secure browser session. It receives the tokens or authorization code from the provider, handles the exchange if needed, then fires the deeplink to close the session and return to the app:

```js
// Step 2: from inside the callback page, fire the deeplink to return to your app
window.location.href = `{yourscheme}://oauth/auth?access_token=${token}`;
```

Despia intercepts the deeplink, closes the browser session, and navigates your WebView to `/auth?access_token=xxx`.

Deeplink format: `{yourscheme}://oauth/{path}?params`

Your deeplink scheme is your app name in lowercase with no spaces (e.g. `myapp://`), or a custom Despialink set in the Despia editor.

| Deeplink | Result |
|----------|--------|
| `{yourscheme}://oauth/auth?access_token=xxx` | Browser closes, WebView navigates to `/auth?access_token=xxx` |
| `{yourscheme}://oauth/home` | Browser closes, WebView navigates to `/home` |
| `{yourscheme}://auth?access_token=xxx` | Browser stays open, user is stuck |

**Callback page**

Use a plain HTML file at `public/native-callback.html` rather than a React or Vue route. React Router can strip the `#access_token` hash fragment during a route change, causing tokens to disappear before your callback logic runs. A plain HTML file bypasses the router entirely and reads the hash directly from the browser.

```html
<!-- public/native-callback.html -->
<script>
  var params      = new URLSearchParams(window.location.search);
  var hash        = new URLSearchParams(window.location.hash.substring(1));
  var code        = params.get('code');        // authorization code flow
  var accessToken = hash.get('access_token');  // implicit flow

  if (code) {
    // exchange code via your backend, then fire deeplink with tokens
  } else if (accessToken) {
    window.location.href = '{yourscheme}://oauth/auth?access_token=' + encodeURIComponent(accessToken);
  }
</script>
```

**Already-mounted `/auth` page**

When Despia navigates the WebView to `/auth`, if that route is already active your framework does not remount the component. Token-reading logic that only runs on mount will not fire again. Fix per framework:

- React: include `searchParams` in your `useEffect` dependency array
- Vue: use `watch: { '$route.query': { immediate: true, handler } }` instead of reading params in `mounted()`
- Vanilla JS: call your handler on load and add `window.addEventListener('popstate', handler)`

Full docs: https://setup.despia.com/native-features/o-auth-2-0

---

### Clipboard

```js
const { clipboarddata } = await despia('getclipboard://', ['clipboarddata']);
```

---

### Contacts

```js
const { contacts } = await despia('readcontacts://', ['contacts']);
```

---

### App Information and Device Data

```js
const { versionNumber, bundleNumber } = await despia('getappversion://', ['versionNumber', 'bundleNumber']);
const { uuid }             = await despia('get-uuid://',              ['uuid']);
const { storeLocation }    = await despia('getstorelocation://',      ['storeLocation']);
const { trackingDisabled } = await despia('user-disable-tracking://', ['trackingDisabled']);
```

---

### UI Controls and Styling

```js
despia('spinneron://');                     // Show loading spinner
despia('spinneroff://');                    // Hide loading spinner
despia('hidebars://on');                    // Hide status bar (full screen)
despia('hidebars://off');                   // Restore status bar
despia('statusbarcolor://{255, 255, 255}'); // Set status bar background (RGB)
despia('statusbartextcolor://{black}');     // Set status bar text color: black | white
despia('settingsapp://');                   // Open native app settings
despia('reset://');                         // Reset the app
```

---

### File and Media Operations

```js
despia('takescreenshot://');
despia('savethisimage://?url=https://example.com/image.jpg');
despia('file://https://example.com/document.pdf');
despia('shareapp://message?=Check%20out%20this%20app&url=https://myapp.com');
despia('scanningmode://auto'); // auto | on | off
```

---

### Web Storage APIs

Despia runs your app on a secure origin (`http://localhost` via Local Server, or your remote URL). This means all standard web storage APIs work without any restrictions or workarounds, unlike other hybrid frameworks that require hacks or fall back to `file://` origins:

```js
// localStorage works normally
localStorage.setItem('userId', 'user123');
const userId = localStorage.getItem('userId');

// IndexedDB works normally
const db = await indexedDB.open('myapp', 1);

// Web Crypto works normally
const key = await crypto.subtle.generateKey(
  { name: 'AES-GCM', length: 256 },
  true,
  ['encrypt', 'decrypt']
);
```

For data that needs to survive uninstall and reinstall, or be locked behind Face ID, use [Identity Vault](#identity-vault) instead.

---

### Local Server

Most hybrid frameworks approximate offline support with service workers. Service workers are a browser-level cache that intercepts network requests, they are fragile, complex to configure, and cannot truly boot an app without any network activity. Despia takes a different approach entirely.

The Local Server downloads your complete web build to the device and serves it from a native on-device HTTP server at `http://localhost`. There are no service workers involved. The app loads from device storage at native speed, works completely offline from the first launch after hydration, and every web API works because it is running on a real secure origin.

```bash
npm install --save-dev @despia/local
```

Add the plugin to your build tool to generate the update manifest automatically:

```js
// vite.config.js (also available for Webpack, Rollup, Nuxt, SvelteKit, Astro, Remix, esbuild)
import { defineConfig } from 'vite';
import { despiaLocalPlugin } from '@despia/local/vite';

export default defineConfig({
  plugins: [
    despiaLocalPlugin({
      outDir: 'dist',
      entryHtml: 'index.html'
    })
  ]
});
```

Or run via CLI after any build:

```bash
npx despia-local dist
```

This generates `despia/local.json` in your output directory. Despia reads this manifest on startup, compares the `deployed_at` timestamp with the cached value, and downloads a new build in the background only when something has actually changed. The running app is never interrupted. Updates apply on the next launch.

```json
{
  "entry": "/index.html",
  "deployed_at": "1737225600000",
  "assets": [
    "/index.html",
    "/assets/app.abc123.css",
    "/assets/app.def456.js"
  ]
}
```

What this means in practice: your app boots in milliseconds from local storage, works indefinitely without any connectivity, and receives UI updates silently in the background with no app store submission required for HTML, CSS, JavaScript, image, or font changes.

Full docs: https://setup.despia.com/local-server/introduction


---

### Local CDN

Cache individual remote files on-device for offline playback and background downloads. Downloads use native OS transfer APIs (NSURLSession on iOS, WorkManager on Android) and continue when the app is closed, with automatic retry on network failure. On iOS a Live Activity shows real-time download progress. On Android a native notification appears in the system tray. Both require no setup.

```js
// Set up the completion callback before triggering a download
window.contentServerChange = (item) => {
  console.log('Cached:', item.index, item.local_cdn);
  // item.local_cdn is the localhost URL to use for playback
};

// Fire and forget. Do not await with a watch key; large files outlive the 30s bridge timeout.
despia(
  `localcdn://write?url=${remoteUrl}&filename=videos/clip.mp4&index=clip_1&push=true&pushmessage="Download complete"`
);

// Read cached items by ID
const { cdnItems } = await despia(
  `localcdn://read?index=${encodeURIComponent(JSON.stringify(['clip_1']))}`,
  ['cdnItems']
);

// Or query everything in the cache
const { cdnItems: all } = await despia('localcdn://query', ['cdnItems']);
```

Use the `local_cdn` URL for playback:

```html
<video src="http://localhost:7777/localcdn/videos/clip.mp4" controls></video>
```

**HTTP upload API** (Local Server only)

```js
const host = window.location.host; // Do not hardcode the port; it rotates per session
const fd = new FormData();
fd.append('file', fileInput.files[0]);

const res  = await fetch(`http://${host}/api/upload`, { method: 'POST', body: fd });
const data = await res.json();
// { success: true, fileName: "video.mp4", url: "http://localhost:7777/files/video.mp4" }
```

| Method | Storage Path | URL Pattern |
|--------|-------------|-------------|
| `localcdn://write` | `/localcdn/` | `localhost:{PORT}/localcdn/{filepath}` |
| `/api/upload` | `/files/` | `localhost:{PORT}/files/{filename}` |

Full docs: https://setup.despia.com/local-cdn/introduction

---

## Safe Area

Despia exposes top and bottom safe area insets as CSS custom properties set by the native runtime.

```css
.header {
  padding-top: var(--safe-area-top);
}

.footer {
  padding-bottom: var(--safe-area-bottom);
}

.full-height {
  height: calc(100vh - var(--safe-area-top) - var(--safe-area-bottom));
}
```

Note: left and right safe area variables are not available.

---

## Web Apps vs React Native

This SDK is for web apps running inside the Despia runtime: React, Vue, Angular, Svelte, Next.js, Vite, Nuxt, and vanilla JavaScript.

It is not for React Native, Expo, or native mobile development.

---

## Open Source

| Package | Description | License |
|---------|-------------|---------|
| [despia-native](https://www.npmjs.com/package/despia-native) | JavaScript SDK | MIT |
| [@despia/local](https://www.npmjs.com/package/@despia/local) | Offline asset bundler | MIT |
| [despia-version-guard](https://www.npmjs.com/package/despia-version-guard) | OTA version gating | MIT |

Native capability implementations are written in Swift and Java and included in full on project export.

---

## License

MIT