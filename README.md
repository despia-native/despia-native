# Despia Native

JavaScript SDK for [Despia](https://despia.com). Build with any web framework, access 50+ native device capabilities through a single JavaScript function, and publish to iOS and Android from a browser. No Swift, no Kotlin, no terminal.

[![npm](https://img.shields.io/npm/v/despia-native)](https://www.npmjs.com/package/despia-native)
[![license](https://img.shields.io/npm/l/despia-native)](LICENSE)

**[Documentation](https://setup.despia.com)** | **[AI Agent Index](https://setup.despia.com/llms.txt)** | **[iOS Deployment](https://setup.despia.com/deployment/apple-ios/automatic)** | **[Android Deployment](https://setup.despia.com/deployment/google-android/automatic)**

Despia is the next generation of web-native development. Unlike earlier hybrid frameworks that routed files through JavaScript, forced Base64 encoding, imposed storage quotas, and ran on insecure `file://` origins, Despia runs your app on a real secure origin (`http://localhost` via Local Server, or your remote URL). Standard web APIs work without restrictions. File operations bypass JavaScript entirely and go directly to the native file system. A 500MB video file uses roughly 100 bytes of JS heap rather than 1.6GB.

The runtime runs on WKWebView (iOS) and the Chromium-based WebView (Android) with hardware-accelerated compositing, JIT-compiled JavaScript, automatic DOM optimization, smart caching, and GPU-accelerated WebGL and Canvas 2D. CSS animations run on the compositor thread independently of JavaScript. The runtime has been actively maintained by the same core team since 2011, when it shipped as Advanced WebView. It has powered over 7,500 apps and became Despia in 2023. Native capabilities are implemented in Swift and Java and called from JavaScript through a single typed function. See the [changelog](https://setup.despia.com/changelog) for the full history.

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
- [Deployment Models](#deployment-models)
- [Features](#features)
  - [Haptic Feedback](#haptic-feedback)
  - [Identity Vault](#identity-vault)
  - [GPS Location](#gps-location)
  - [RevenueCat In-App Purchases](#revenuecat-in-app-purchases)
  - [AppsFlyer Attribution](#appsflyer-attribution)
  - [Push Notifications](#push-notifications)
  - [OAuth Authentication](#oauth-authentication)
  - [Clipboard](#clipboard)
  - [Contacts](#contacts)
  - [App Information and Device Data](#app-information-and-device-data)
  - [UI Controls and Styling](#ui-controls-and-styling)
  - [File and Media Operations](#file-and-media-operations)
  - [Apple Health (HealthKit)](#apple-health-healthkit)
  - [AdMob Inline Ads](#admob-inline-ads)
  - [Web Payment Request API](#web-payment-request-api)
  - [Web Storage APIs](#web-storage-apis)
  - [Local CDN](#local-cdn)
  - [Local Server](#local-server)
- [Capability Reference](#capability-reference)
- [Safe Area](#safe-area)
- [Extending the Runtime](#extending-the-runtime)
- [Web Apps vs React Native](#web-apps-vs-react-native)
- [Publishing to the App Store and Google Play](#publishing-to-the-app-store-and-google-play)
- [Open Source](#open-source)
- [Support](#support)
- [License](#license)

---

## Installation

```bash
npm install despia-native
# pnpm add despia-native
# yarn add despia-native
```

```js
import despia from 'despia-native';
```

> CDN alternative: `https://cdn.jsdelivr.net/npm/despia-native/+esm` (ESM) or `https://cdn.jsdelivr.net/npm/despia-native/index.min.js` (UMD, global)

---

## Quick Start

```js
import despia from 'despia-native'; // npm / pnpm / yarn only

despia('successhaptic://');                           // haptic feedback
const device = await despia('get-uuid://', ['uuid']); // native device ID
console.log(device.uuid);
```

No initialization. No setup. Open your app in the Despia runtime and it works.

**How it works under the hood**

Calling `despia()` sets `window.despia` to the scheme string. On iOS this is intercepted in `WebViewController.swift` via `decidePolicyFor navigationAction`. On Android it is intercepted in `MainActivity.java` via `shouldOverrideUrlLoading`. Results are written back to the WebView as named window variables, which the SDK resolves as a promise.

```js
// despia('get-uuid://', ['uuid'])
// 1. window.despia = 'get-uuid://'        set by SDK
// 2. window.location.href = 'get-uuid://' intercepted by native layer
// 3. window.uuid = '<device-uuid>'        written back to WebView
const device = await despia('get-uuid://', ['uuid']);
console.log(device.uuid);
```

The SDK handles command queuing, promise-based variable watching with a 30-second timeout, and error handling.

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


| Parameter | Type       | Description                                                    |
| --------- | ---------- | -------------------------------------------------------------- |
| `command` | `string`   | A Despia protocol URL, e.g. `'lighthaptic://'`                 |
| `watch`   | `string[]` | Optional. Array of variable names to wait for in the response. |


Returns a `Promise` that resolves when all watched variables are set by the native runtime.

**Timeout behavior**

The SDK watches for a single variable for up to 30 seconds. This window applies to the variable watch only, not to the underlying native operation. Long-running operations — file downloads, purchases, biometric prompts — complete in native and deliver their result via a global callback function (e.g. `window.onRevenueCatPurchase`, `window.contentServerChange`) rather than a watched variable, so they are never constrained by this window. If a watched variable is never set, the Promise resolves with `undefined` and logs a timeout to the console.

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

## Deployment Models

**Remote hydration (default):** The binary ships without embedded web assets. On each launch, Despia fetches the current build from your configured hosting URL. Web content updates do not require App Store or Google Play resubmission.

**Local Server:** For offline-first apps. Your web build is cached on-device and served from `http://localhost`. After initial hydration the app launches without a network request. See [Local Server](#local-server).

**OTA version gating:** Gate features by minimum runtime version using `despia-version-guard`.

```bash
npm install despia-version-guard
```

```jsx
import { VersionGuard } from 'despia-version-guard';

const MyApp = () => (
  <div>
    <StableFeature />
    <VersionGuard min_version="21.0.3">
      <NewFeature />
    </VersionGuard>
  </div>
);
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


| Parameter | Description                                                      |
| --------- | ---------------------------------------------------------------- |
| `key`     | Storage key, e.g. `"userId"` or `"sessionToken"`                 |
| `value`   | String value to store                                            |
| `locked`  | `"true"` requires biometrics on read. `"false"` for open access. |


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

Full docs: [https://setup.despia.com/native-features/gps-location](https://setup.despia.com/native-features/gps-location)

---

### RevenueCat In-App Purchases

**Launch a paywall**

```js
despia(`revenuecat://launchPaywall?external_id=${userId}&offering=default`);
```


| Parameter     | Required | Description                                                        |
| ------------- | -------- | ------------------------------------------------------------------ |
| `external_id` | Yes      | Your user ID in RevenueCat                                         |
| `offering`    | Yes      | RevenueCat offering ID. Use `"default"` for your default offering. |


**Direct purchase without paywall UI**

```js
// iOS
despia(`revenuecat://purchase?external_id=${userId}&product=monthly_premium_ios`);

// Android
despia(`revenuecat://purchase?external_id=${userId}&product=premium:monthly_premium_android`);
```

**Handle purchase success**

The Despia runtime calls `window.onRevenueCatPurchase()` immediately when the store confirms a transaction. This is a global function, not an event listener — part of how the bridge is designed to stay lightweight and offload heavy operations to the native layer.

This callback is a signal that a transaction occurred, not confirmation that access should be granted. If you have a backend, the callback fires before your server has received and processed the RevenueCat webhook. Always wait for your backend to confirm before unlocking features.

If you have no backend, use `getpurchasehistory://` inside the callback to check entitlements directly from the store:

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

**Web fallback**

Neither `launchPaywall` nor `purchase` work in a standard browser. Gate behind the environment check and fall back to a RevenueCat Web Purchase Link:

```js
if (isDespia) {
  despia(`revenuecat://launchPaywall?external_id=${userId}&offering=default`);
} else {
  window.location.href = `https://pay.rev.cat/<your_token>/${encodeURIComponent(userId)}`;
}
```

Full RevenueCat docs: [https://setup.despia.com/native-features/revenuecat/reference](https://setup.despia.com/native-features/revenuecat/reference)

---

### AppsFlyer Attribution

Attribution data is recorded at install time by the native AppsFlyer SDK, cached on-device, and injected into the web layer on every page load. No requests, no waiting. Currently available on iOS, with Android coming soon.

AppsFlyer must be enabled in **Despia > App > Settings > Integrations > AppsFlyer** with your dev key configured.

**Attribution variables (injected on every page load)**

```js
despia.appsFlyerAttribution // full attribution object (campaign, ad set, UTM params, etc.)
despia.appsFlyerReferrer    // normalized source: "tiktok_ad", "facebook_organic", "organic", etc.
despia.appsFlyerUID         // unique AppsFlyer user ID
```

**User identification (call after login)**

```js
despia('appsflyer://set_user_id?customer_user_id=' + encodeURIComponent(userId));
despia('appsflyer://set_email?email=' + encodeURIComponent(email));
despia('appsflyer://set_phone?phone=' + encodeURIComponent(phone)); // hashed with SHA256 automatically
```

**GDPR consent**

```js
// User accepted
despia('appsflyer://set_consent?is_gdpr=true&has_consent=true');

// User declined
despia('appsflyer://set_consent?is_gdpr=true&has_consent=false');
```

**Log in-app events**

Standard `af_` prefixed events map automatically to Meta and TikTok conversion events. Custom events appear in AppsFlyer for funnel and retention analysis.

```js
// af_purchase maps to Meta Purchase and TikTok CompletePayment
const purchase = { af_revenue: 9.99, af_currency: 'USD', af_content_id: 'pro_plan' };
despia('appsflyer://log_event?event_name=af_purchase&event_values=' + encodeURIComponent(JSON.stringify(purchase)));

// af_complete_registration maps to Meta CompleteRegistration
const reg = { af_registration_method: 'email' };
despia('appsflyer://log_event?event_name=af_complete_registration&event_values=' + encodeURIComponent(JSON.stringify(reg)));

// Custom event (AppsFlyer only)
const onboarding = { step: 1, name: 'select_interests' };
despia('appsflyer://log_event?event_name=onboarding_step&event_values=' + encodeURIComponent(JSON.stringify(onboarding)));
```

`event_values` must always be `JSON.stringify()`ed and `encodeURIComponent()`ed. Event names are case-sensitive, lowercase alphanumeric and underscores only, max 300 unique names per day.

Full attribution docs: [https://setup.despia.com/analytics/appsflyer/introduction](https://setup.despia.com/analytics/appsflyer/introduction)

---

### Push Notifications

Despia requests push permission and registers the device with OneSignal automatically at app launch. Call `setonesignalplayerid://` on every authenticated load to link the device to your user.

```js
// Link device to your user (call on every authenticated app load)
despia(`setonesignalplayerid://?user_id=${userId}`);

// Send a local scheduled notification (fires after 60 seconds)
despia('sendlocalpushmsg://push.send?s=60&msg=Hello&!#New Message&!#https://myapp.com');

// Check push permission status
const result = await despia('checkNativePushPermissions://', ['nativePushEnabled']);
if (!result.nativePushEnabled) {
  // Direct user to settings to enable notifications
  despia('settingsapp://');
}
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
    data: { url: 'https://yourapp.com/messages/123' } // navigate WebView on tap
  }),
});
```

When configuring OneSignal, select **Native iOS** and **Native Android** as the platforms. For critical alerts that bypass Do Not Disturb, see the full push docs: [https://setup.despia.com](https://setup.despia.com)

---

### OAuth Authentication

The flow uses two Despia URL protocols. `oauth://` opens a secure browser session (ASWebAuthenticationSession on iOS, Chrome Custom Tabs on Android). The `{scheme}://oauth/` prefix on the return deeplink tells Despia to close that session and navigate your WebView to the path that follows.

When running in Despia, use a native-specific redirect URI pointing to `/native-callback.html` rather than your regular web auth callback. This is a different redirect URI from your web flow. Register both with your OAuth provider.

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


| Deeplink                                     | Result                                                        |
| -------------------------------------------- | ------------------------------------------------------------- |
| `{yourscheme}://oauth/auth?access_token=xxx` | Browser closes, WebView navigates to `/auth?access_token=xxx` |
| `{yourscheme}://oauth/home`                  | Browser closes, WebView navigates to `/home`                  |
| `{yourscheme}://auth?access_token=xxx`       | Browser stays open, user is stuck                             |


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

Full docs: [https://setup.despia.com/native-features/o-auth-2-0](https://setup.despia.com/native-features/o-auth-2-0)

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

Despia automatically intercepts standard HTML file inputs and routes them to native UI. No Base64 blobs, no memory issues. File events are injected back into the standard HTML file input.

```html
<!-- Opens a native action sheet with camera, document scanner, and media library -->
<input type="file">

<!-- Opens native media gallery for images -->
<input type="file" accept="image/*">

<!-- Opens native media gallery for video -->
<input type="file" accept="video/*">

<!-- Opens native camera directly -->
<input type="file" accept="image/*" capture="environment">
```

Additional file and media commands:

```js
despia('takescreenshot://');
despia('savethisimage://?url=https://example.com/image.jpg');
despia('file://https://example.com/document.pdf');
despia('shareapp://message?=Check%20out%20this%20app&url=https://myapp.com');
despia('scanningmode://auto'); // auto | on | off
```

---

### Apple Health (HealthKit)

iOS only. Always gate behind `isDespiaIOS`. Despia requests permissions on the first call for each identifier.

```js
// Read historical data
const data  = await despia('readhealthkit://HKQuantityTypeIdentifierStepCount?days=7', ['healthkitResponse']);
const steps = data.healthkitResponse.HKQuantityTypeIdentifierStepCount;
// [{ date: "2025-11-17", value: 9820, unit: "count" }, ...]

// Write a value back to HealthKit
despia('writehealthkit://HKQuantityTypeIdentifierBodyMass//74.5');

// Observe changes and POST to your server whenever HealthKit updates
despia('healthkit://observe?types=HKQuantityTypeIdentifierStepCount&frequency=hourly&server=https://api.example.com/webhook?user=USER_ID');
```

Pass any valid `HKQuantityTypeIdentifier`, `HKCategoryTypeIdentifier`, `HKWorkoutTypeIdentifier`, or `HKCharacteristicTypeIdentifier` directly. Sleep, workouts, heart rate, body mass, and all other HealthKit types are supported. Full docs: [https://setup.despia.com](https://setup.despia.com)

---

### AdMob Inline Ads

Despia implements Google's WebView API for Ads on both platforms, connecting the Mobile Ads SDK directly to the WebView so AdMob ads render as real DOM elements inside your web UI, not as native overlays. Enabled from **Despia > App > Settings > AdMob**. Requires a rebuild after enabling.

Once enabled, serve ads using standard AdSense, Google Publisher Tag, or IMA for HTML5 tags. No Despia SDK calls needed on the web side.

```html
<!-- AdSense banner -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="YYYYYYYYYY"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

Because ads are real DOM elements, placements that are impossible with native overlay ads — banners between feed cards, mid-article units, rewarded content gates, pre-roll video — are straightforward CSS and JavaScript.

Google WebView API for Ads references: [iOS](https://developers.google.com/admob/ios/browser/webview/api-for-ads) | [Android](https://developers.google.com/admob/android/browser/webview/api-for-ads) | Full Despia docs: [https://setup.despia.com](https://setup.despia.com)

---

### Web Payment Request API

Despia polyfills support for the Web Payment Request API, enabling native Apple Pay on iOS and Google Pay on Android directly from your web UI. This is a known pain point with standard WebViews — Despia handles it by importing WebKit's Payment Request support on Android (`androidx.webkit:webkit:1.14.0` with `WebSettingsCompat.setPaymentRequestEnabled`) and the required Google Pay intent queries, and on iOS via WKWebView's built-in Apple Pay support.

```js
// Standard Web Payment Request API — works in Despia without any native code changes
const request = new PaymentRequest(
  [{ supportedMethods: 'https://apple.com/apple-pay' }], // or Google Pay method
  {
    total: { label: 'Total', amount: { currency: 'USD', value: '9.99' } }
  }
);

const result = await request.show();
await result.complete('success');
```

Apple Pay on iOS and Google Pay on Android both work via the standard Web Payment Request API. No Despia-specific calls required. Reference: [Google Pay in Android WebView](https://developers.google.com/pay/api/android/guides/recipes/using-android-webview)

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

> **Built-in OTA updates. True offline support. Host with your existing web hosting. No proprietary infrastructure required.**

No service workers. No workarounds. The Local Server downloads your complete web build to the device and serves it from a native on-device HTTP server at `http://localhost`. The app loads from device storage at native speed and works completely offline from the first launch after hydration.

When the user has a connection, Despia checks for updates in the background by comparing the `deployed_at` timestamp in your manifest. If a new build is available it downloads silently while the user continues using the app. The update applies on the next launch. If the connection is not stable, the locally cached version is served without interruption.

You host the manifest and assets on your own infrastructure — Netlify, Vercel, AWS, your own server, anywhere. No proprietary hosting, no per-MAU fees, no vendor lock-in on your delivery pipeline.

```bash
npm install --save-dev @despia/local
```

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

The plugin generates `despia/local.json` in your output directory alongside your assets. Deploy both to your existing web host. That is the entire setup.

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

Full docs: [https://setup.despia.com/local-server/introduction](https://setup.despia.com/local-server/introduction)

---

### Local CDN

Cache individual remote files on-device for offline playback and background downloads. Downloads use native OS transfer APIs (NSURLSession on iOS, WorkManager on Android) and continue when the app is closed, with automatic retry on network failure. On iOS a Live Activity shows real-time download progress. On Android a native notification appears in the system tray. Both require no setup.

```js
// Called by the native runtime when a download completes.
// This is a global function, not an event listener.
window.contentServerChange = (item) => {
  // item.local_cdn  - localhost URL to use for playback
  // item.cdn        - original remote URL
  // item.index      - the uniqueId you passed to the write call
  // item.size       - file size in bytes
  // item.status     - "cached" when complete
  // item.local_path - absolute path on the device

  console.log('Cached:', item.index, item.local_cdn);
  addToDownloadsList(item);
};

// Fire and forget. Do not await with a watch key; large downloads take longer than the SDK's
// 30-second variable-watch window. Use window.contentServerChange to receive the result instead.
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


| Method             | Storage Path | URL Pattern                            |
| ------------------ | ------------ | -------------------------------------- |
| `localcdn://write` | `/localcdn/` | `localhost:{PORT}/localcdn/{filepath}` |
| `/api/upload`      | `/files/`    | `localhost:{PORT}/files/{filename}`    |


Full docs: [https://setup.despia.com/local-cdn/introduction](https://setup.despia.com/local-cdn/introduction)

---

## Capability Reference

A full index of native capabilities built into Despia.

**Core runtime:** Hardware-backed Identity Vault, Face ID / Touch ID / fingerprint biometrics, background GPS (including Samsung, Huawei, Xiaomi, and OnePlus), contacts, clipboard, haptics (5 types), native file system access, image saving, background audio, local push notifications, status bar controls, safe area CSS variables, device orientation per device class, prevent zoom, prevent sleep, fullscreen mode, splash screen, iOS Home Widgets, Siri Shortcuts, native share dialog, AirPrint, screen shield, PkPass for iOS and Android mobile wallets.

**Integrated SDK bridges:** RevenueCat (purchases, subscriptions, restore, paywalls), OneSignal (remote push with external user ID mapping), AppsFlyer (attribution, deep linking, event tracking), AdMob (advertising), HealthKit (all major health identifiers).

**Infrastructure:** ATT compliance, vendor ID tracking, device ID tracking via iCloud KV and Android App Backup, store location access, jailbreak detection with configurable blocking, App Clips, Share Extensions, and Home Widget management from the Despia editor.

**Native web interception:** `<input type="file">` routes to a native action sheet. The `capture` attribute opens the native camera. `accept="image/*"` or `accept="video/*"` opens the native media gallery. Deeplinks and HTTPS deeplinks are handled natively.

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

## Extending the Runtime

A common concern when adopting any hybrid framework is lock-in: can you escape the custom protocol API later?

The bridge pattern is consistent across both platforms and fully open. You can intercept any custom scheme in `WebViewController.swift` on iOS or `MainActivity.java` on Android, run native code, and write the result back to the WebView. The SDK resolves custom bridges identically to built-in capabilities. No special registration or plugin system required.

**On the bridge architecture**

The scheme bridge is simple by design and has been running in production since 2011. A command goes in as a plain string, the native layer acts on it, and the result is written back as a named window variable. No serialization, no abstraction layers. Input is sanitized on the native side.

For file uploads, streaming, and binary data, Despia uses the on-device HTTP server at `http://localhost` rather than the scheme bridge. The two channels handle what each is suited for.

A typed plugin system for community contributions and custom native development is in progress, alongside the open source Extension system planned for mid/late 2026.

**iOS: WebViewController.swift**

```swift
if requestURL.absoluteString.hasPrefix("mycustom://") {
    let result = runMyNativeCode()
    webView.evaluateJavaScript("window.myResult = '\(result)';")
    decisionHandler(.cancel)
    return
}
```

**Android: MainActivity.java**

```java
if (url.startsWith("mycustom://")) {
    String result = runMyNativeCode();
    webView.evaluateJavascript("window.myResult = '" + result + "';", null);
    return true;
}
```

**Call it from your web app**

```js
import despia from 'despia-native';

const data = await despia('mycustom://', ['myResult']);
console.log(data.myResult);
```

Adding custom native code requires exporting the project and deploying outside of Despia's hosted CI/CD pipeline. Despia offers full Xcode and Android Studio project export for developers who need it. You own the code and can build and ship entirely independently at any point.

Each lifetime Despia license applies to one specific Despia project bound to one bundle ID, and grants export, editing, self-hosting, and custom CI/CD rights for that project only. Associated repositories must remain private. Reuse beyond that scope requires separate licensing or white-label terms.

Projects and their licensing rights can be transferred between Despia accounts. Contact [license@despia.com](mailto:license@despia.com) for transfers or licensing questions, and [whitelabel@despia.com](mailto:whitelabel@despia.com) for white-label use cases.

> **Coming mid/late 2026:** An official open source Despia Extension system is currently in active development. It will allow developers to build and distribute custom native capabilities that work directly within the Despia editor, with no Xcode or Android Studio required.

---

## Web Apps vs React Native

This SDK is for web apps running inside the Despia runtime: React, Vue, Angular, Svelte, Next.js, Vite, Nuxt, and vanilla JavaScript.

It is not for React Native, Expo, or native mobile development.

---

## Publishing to the App Store and Google Play

Despia provides fully automated iOS and Android store deployment from the web editor. No Mac required. One-click deployment spins up Mac Mini build infrastructure in the cloud, handles code signing, provisioning, and submits to both the App Store and Google Play — entirely from a browser.

Full deployment docs: [https://setup.despia.com/deployment/apple-ios/automatic](https://setup.despia.com/deployment/apple-ios/automatic)

---

## Open Source


| Package                                                                    | Description           | License |
| -------------------------------------------------------------------------- | --------------------- | ------- |
| [despia-native](https://www.npmjs.com/package/despia-native)               | JavaScript SDK        | MIT     |
| [@despia/local](https://www.npmjs.com/package/@despia/local)               | Offline asset bundler | MIT     |
| [despia-version-guard](https://www.npmjs.com/package/despia-version-guard) | OTA version gating    | MIT     |


Native capability implementations are written in Swift and Java and included in full on project export.

---

## Support

For questions or concerns regarding this package, contact the Despia team at [npm@despia.com](mailto:npm@despia.com).

---

## License

MIT