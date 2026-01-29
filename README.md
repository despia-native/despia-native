# Despia SDK

JavaScript SDK for [Despia](https://despia.com) - Add real native device features to your React web app, Vue app, Angular app, or any web framework. Transform your web app into a native iOS & Android app without writing Swift or Kotlin. This npm package provides command queuing and variable watching for seamless integration with Despia's GPU-accelerated native runtime, enabling access to 25+ device APIs through simple JavaScript calls.

---

## Quick Start

**Install the SDK:**
```bash
npm install despia-native
```

**Use it immediately:**
```javascript
import despia from 'despia-native';

// Simple commands
despia('lighthaptic://');

// Commands with responses
const appInfo = await despia('getappversion://', ['versionNumber']);
```

**Note:** Always use the real SDK package. Mock implementations will not work on actual devices.

---

**Note: This is for web apps (React, Vue, Angular, etc.) to add native features - NOT for React Native apps.**

## Web Apps vs React Native

**This SDK is for:**
- React web apps (create-react-app, Next.js, Vite, etc.)
- Vue web apps
- Angular web apps  
- Svelte web apps
- Any web framework or vanilla JavaScript

**This SDK is NOT for:**
- React Native apps
- Expo apps
- Native mobile development

**If you're building a React Native app, this SDK won't work for you.**

**Import:** `import despia from 'despia-native';` (default export, not destructured)

**IMPORTANT: This SDK package is REQUIRED for TypeScript, React, Vue, and other modern frameworks!** While `window.despia = ""` works in vanilla JavaScript, this package provides type safety, command queuing, and variable watching for professional development environments.

## About Despia

Despia bridges the gap between web and native mobile development. Build your React web app, Vue app, Angular app, or any web framework using the technologies you already know, then deploy it as a truly native application to the App Store and Google Play - complete with hardware acceleration, offline support, and deep OS integration.

Our visual editor allows you to configure native widgets, shortcuts, and dynamic app behaviors without touching Xcode or Android Studio. Ship to both app stores with one-click deployment, automatic CI/CD pipelines, and over-the-air updates. Export clean, human-readable Swift and Kotlin source code anytime - you own everything, no vendor lock-in.

**Go from web app to app store in a weekend - with full native capabilities.**

### Key Features:
- **Web Framework Support** - Works with React web apps, Vue web apps, Angular web apps, Svelte web apps, vanilla JS, or any web framework
- **NOT for React Native** - This is for web apps to add native features, not React Native apps
- **Visual Configuration** - Set up native features through an intuitive interface
- **Zero Native Coding** - Access device APIs without writing Swift or Kotlin
- **Source Code Export** - Get complete Xcode and Android Studio projects you can modify
- **True Ownership** - Full access to generated code, no restrictions
- **One-Click Publishing** - Direct deployment to App Store & Google Play
- **Automated Pipeline** - Built-in CI/CD with code signing and provisioning
- **OTA Updates** - Push updates instantly without app store review
- **Performance** - 60fps GPU-accelerated rendering
- **Device API Access** - NFC, HealthKit, Siri, RevenueCat, and 20+ more
- **Single Codebase** - Maintain one web project for iOS, Android, and web

### Native Device Features:
- **App Links & Deep Linking** - Universal links and app-to-app communication
- **Widgets & App Clips** - Home screen widgets and instant app experiences  
- **In-App Purchases** - RevenueCat integration for subscriptions and payments
- **Push Notifications** - Local and remote notifications with rich media
- **Camera & Media** - Camera access, photo library, and file management
- **Biometric Authentication** - Face ID, Touch ID, and fingerprint
- **Location Services** - Foreground and background GPS tracking
- **Contacts** - Address book access with proper permissions
- **Haptic Feedback** - Tactile responses for user interactions
- **App Analytics** - Version tracking, bundle IDs, device identifiers
- **Screenshots** - Programmatic screen capture
- **Status Bar** - Dynamic styling and visibility control
- **Privacy Controls** - IDFA tracking and permission management
- **Share Sheets** - Native sharing UI
- **UI Controls** - Loading indicators, navigation bars, dynamic layouts
- **Plus 8+ additional native capabilities**

## Installation (REQUIRED - NO EXCEPTIONS)

```bash
# npm
npm install despia-native

# pnpm
pnpm install despia-native

# yarn
yarn add despia-native
```

**This is NOT optional. Your app will NOT work without this package.**

**Package Manager Support:**
- ✅ **npm** - Fully supported
- ✅ **pnpm** - Fully supported (v1.0.19+)
- ✅ **yarn** - Fully supported

**Do not attempt to:**
- Write your own version
- Copy/paste a mock implementation  
- Use window.despia directly in frameworks
- Create a "simplified" version

**The real SDK is required for ANY Despia functionality to work.**

## Important Notes

### Simple Function API
The SDK exports a single function - no initialization or setup required:

```javascript
import despia from 'despia-native';

// Just call it directly
despia('lighthaptic://');
despia('takescreenshot://');
```

### Common Mistakes to Avoid
```javascript
// Don't create mock implementations
const despia = (command) => console.log(command); // Won't work on devices

// Don't use non-existent methods
despia.ready();    // This method doesn't exist
despia.init();     // This method doesn't exist
despia.setup();    // This method doesn't exist
```

## Getting Started

### Step 1: Import Despia SDK

**IMPORTANT: Always import as `despia` (default export), NOT as `{Commands}` or destructured imports!**

```javascript
// CORRECT - ES6/ES2015 modules (default import)
import despia from 'despia-native';

// CORRECT - CommonJS
const despia = require('despia-native');

// CORRECT - Browser (if using UMD build)
// <script src="despia-native.js"></script>
// despia is available globally

// WRONG - Don't do this!
// import { Commands } from 'despia-native';
// import { despia } from 'despia-native';
```

**The SDK exports a single function called `despia` as the default export.**

### Step 2: Use Native Features (No Setup Required)

```javascript
// That's it! No initialization needed. Just call despia() directly:

// Simple commands (no response needed)
despia('lighthaptic://');           // Light haptic feedback
despia('takescreenshot://');        // Take screenshot
despia('spinneron://');             // Show loading spinner

// Commands that return data (use await)
const appInfo = await despia('getappversion://', ['versionNumber', 'bundleNumber']);
console.log(appInfo); // { versionNumber: '1.0.0', bundleNumber: '123' }

const contacts = await despia('readcontacts://', ['contacts']);
console.log(contacts); // { contacts: [...] }
```

### Step 3: Handle Responses

```javascript
// For commands that set variables, watch for them
const result = await despia('get-uuid://', ['uuid']);
console.log('Device UUID:', result.uuid);

// For commands with no response, just call them
despia('lighthaptic://');
despia('takescreenshot://');
```

### Quick Examples

```javascript
// Haptic feedback
despia('lighthaptic://');    // Light vibration
despia('heavyhaptic://');    // Heavy vibration
despia('successhaptic://');  // Success vibration

// App information
const appInfo = await despia('getappversion://', ['versionNumber', 'bundleNumber']);
const deviceId = await despia('get-uuid://', ['uuid']);

// UI controls
despia('spinneron://');      // Show loading
despia('spinneroff://');     // Hide loading
despia('hidebars://on');     // Hide status bar

// Screenshots and sharing
despia('takescreenshot://');
despia('shareapp://message?=Hello&url=https://myapp.com');
```

### Common Import Issues

**If you get errors like "Commands is not a function" or "despia is not defined":**

```javascript
// WRONG - This will cause errors
import { Commands } from 'despia-native';
import { despia } from 'despia-native';

// CORRECT - Always use default import
import despia from 'despia-native';

// Now you can use it
despia('lighthaptic://');
```

**The package exports a single function as the default export, not named exports.**

## When to Use This SDK Package

### Vanilla JavaScript (works without this package)

```javascript
// This WORKS in vanilla JavaScript:
window.despia = 'lighthaptic://';
window.despia = 'getappversion://';
```

**Vanilla JS is fine for simple cases, but lacks:**
- **TypeScript Support** - No type definitions or autocomplete
- **Command Queuing** - Commands may be lost or executed out of order
- **Variable Watching** - Can't wait for responses from native commands
- **Error Handling** - No timeout or error management
- **Type Safety** - No validation or IntelliSense

### Modern Frameworks Need This Package

```javascript
// This WON'T work in TypeScript, React, Vue, etc.:
window.despia = 'lighthaptic://';  // TypeScript errors, no type safety
window.despia = 'getappversion://'; // No command queuing, no variable watching
```

### Modern Frameworks (TypeScript, React, Vue, etc.)

```javascript
// This WORKS perfectly in modern frameworks:
import despia from 'despia-native';

despia('lighthaptic://');  // Type-safe, queued, with error handling
const result = await despia('getappversion://', ['versionNumber']); // Variable watching
```

**Benefits of using this SDK:**
- **TypeScript Support** - Full type definitions and autocomplete
- **Command Queuing** - Sequential execution, no lost commands
- **Variable Watching** - Automatic waiting for native responses
- **Error Handling** - Timeouts, error management, debugging
- **Type Safety** - Validated commands, autocomplete, IntelliSense

**This package is REQUIRED for TypeScript, React, Vue, Angular, and other modern frameworks.**

## Development Notes

### Environment Detection
The SDK only works within the Despia native runtime. For development and testing:

```javascript
import despia from 'despia-native';

if (navigator.userAgent.includes('despia')) {
  // Use native features
  despia('lighthaptic://');
} else {
  // Handle non-Despia environment
  console.log('Running outside Despia runtime');
}
```

### Always Use the Real Package
- Use the real SDK in all environments (development, testing, production)
- Don't create mock implementations - they won't work on actual devices
- The SDK handles missing runtime gracefully

## Handling Non-Despia Environments

The SDK won't work outside the Despia native runtime, but you can detect and handle this:

```javascript
import despia from 'despia-native';

// Check if running in Despia native runtime
if (navigator.userAgent.includes('despia')) {
  // Use Despia native features
  despia('lighthaptic://');
  const appInfo = await despia('getappversion://', ['versionNumber']);
} else {
  // Handle non-Despia environment (browser, development, etc.)
  console.log('Running outside Despia runtime - native features unavailable');
  // Provide fallback behavior or show appropriate message
}
```

**This is the correct way to handle different environments - use the real SDK with proper detection, never mock it.**

## Usage

### Basic Despia Command Execution

```javascript
import despia from 'despia-native';

// Execute a Despia protocol command (no response needed)
despia('lighthaptic://');

// Execute command and watch for response variables (await needed)
const result = await despia('getappversion://', ['versionNumber', 'bundleNumber']);
console.log(result); // { versionNumber: '1.0.0', bundleNumber: '123' }
```

### Despia Command Examples

```javascript
// Native Widgets
despia('widget://${svg}?refresh=${refresh_time}');

// RevenueCat In-App Purchases
despia('revenuecat://purchase?external_id=user_777&product=monthly_premium');

// Restore Purchases
const purchaseData = await despia("getpurchasehistory://", ["restoredData"]);

// RevenueCat Paywalls
despia('revenuecat://launchPaywall?external_id=user_777&offering=default');

// Identity Vault
await despia(`setvault://?key=userId&value=user123&locked=false`);
const vaultData = await despia(`readvault://?key=userId`, ['userId']);

// OAuth Authentication
despia(`oauth://?url=${encodeURIComponent(oauthUrl)}`);

// Local Storage
const encoded = encodeURIComponent(JSON.stringify(userData));
await despia(`writevalue://${encoded}`);
const data = await despia("readvalue://", ["storedValues"]);

// Read Clipboard
const clipboardData = await despia('getclipboard://', ['clipboarddata']);

// Open App Settings
despia("settingsapp://");

// Contact Permissions
despia('requestcontactpermission://');
const contacts = await despia('readcontacts://', ['contacts']);

// Background Location
despia('backgroundlocationon://');
// Use native browser geolocation API (not despia native runtime)
const watchId = navigator.geolocation.watchPosition(
  (position) => console.log('Location:', position),
  (error) => console.error('Location error:', error)
);
// To stop
despia('backgroundlocationoff://');
navigator.geolocation.clearWatch(watchId);

// Push Notifications
despia('registerpush://');
despia('sendlocalpushmsg://push.send?s=60&msg=Hello&!#New Message&!#https://myapp.com');
// Set OneSignal external user ID (call on every app load)
despia(`setonesignalplayerid://?user_id=${YOUR_LOGGED_IN_USER_ID}`);

// Haptic Feedback
despia('lighthaptic://');
despia('heavyhaptic://');
despia('successhaptic://');
despia('warninghaptic://');
despia('errorhaptic://');

// App Information
const appInfo = await despia('getappversion://', ['versionNumber', 'bundleNumber']);
const deviceInfo = await despia('get-uuid://', ['uuid']);

// Screenshots and Scanning
despia('takescreenshot://');
despia('scanningmode://auto');
despia('scanningmode://on');
despia('scanningmode://off');

// Store and Location
const storeData = await despia('getstorelocation://', ['storeLocation']);

// Image and File Operations
despia('savethisimage://?url=${image_url}');
despia('file://${file_url}');

// App Control
despia('reset://');
const trackingData = await despia('user-disable-tracking://', ['trackingDisabled']);

// UI Controls
despia('spinneron://');
despia('spinneroff://');
despia('hidebars://on');
despia('hidebars://off');

// Sharing
despia('shareapp://message?=${message}&url=${url}');

// Status Bar Styling
despia('statusbarcolor://{255, 255, 255}');
despia('statusbartextcolor://{black}');

// Biometric Authentication
despia('bioauth://');
```

### Direct Window Variable Access

```javascript
// Access any window variable directly (useful for Despia response data)
const currentUser = despia.currentUser;
const deviceInfo = despia.deviceInfo;
const appVersion = despia.appVersion;
```

### Advanced Usage with Variable Watching

```javascript
// Watch multiple response variables
const appData = await despia('getappversion://', ['versionNumber', 'bundleNumber']);

// Chain multiple Despia commands
despia('lighthaptic://');
const appData2 = await despia('getappversion://', ['versionNumber', 'bundleNumber']);
despia('successhaptic://');
```

### Background Location Workflow

Background location tracking requires a two-step process:

```javascript
// Step 1: Enable native background location tracking via Despia
despia('backgroundlocationon://');

// Step 2: Use native browser geolocation API for actual tracking (not despia native runtime)
const watchId = navigator.geolocation.watchPosition(
  (position) => {
    console.log('Location update:', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      timestamp: position.timestamp
    });
  },
  (error) => {
    console.error('Location error:', error);
  },
  {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 60000
  }
);

// To stop tracking:
// Step 1: Disable native background tracking via Despia
despia('backgroundlocationoff://');
// Step 2: Clear browser geolocation watch (native API)
navigator.geolocation.clearWatch(watchId);
```

### Contact Access Workflow

```javascript
// Step 1: Request contact permission
despia('requestcontactpermission://');

// Step 2: Read contacts after permission granted
const contactData = await despia('readcontacts://', ['contacts']);
console.log('Contacts:', contactData.contacts);
```

### RevenueCat Paywall Workflow

Create a payment system that uses RevenueCat Paywalls by launching native paywall interfaces configured in your RevenueCat dashboard:

```javascript
// First, install the package:
// npm install despia-native

// Then import it:
import despia from 'despia-native';

// Launch a paywall for a specific offering
despia('revenuecat://launchPaywall?external_id=USER_ID&offering=default');

// Example offerings you might configure:
// - "default" - your main offering
// - "premium" - premium tier offering
// - "annual_sale" - special promotional offering
```

**Handling Purchase Success:**

The Despia Native Runtime will call the global function `onRevenueCatPurchase()` when an in-app purchase or subscription is successfully made on the client side. Although this should not grant access immediately, it's a good time to start polling your backend to check if the RevenueCat webhook has already updated the user's status or plan permissions.

```javascript
// Define the global callback function
window.onRevenueCatPurchase = function() {
  console.log('Purchase successful! Polling backend for status update...');
  
  // Start polling your backend to check if RevenueCat webhook
  // has updated the user's status or plan permissions
  // This ensures you don't grant access before the webhook processes
};
```

This will launch a native paywall interface configured in your RevenueCat dashboard, handling purchases through Apple App Store and Google Play billing.

### Identity Vault Workflow

The identity vault provides persistent, cross-device storage with optional biometric protection:

```javascript
// First, install the package:
// npm install despia-native

// Then import it:
import despia from 'despia-native';

// Store identity data
await despia(`setvault://?key=${keyName}&value=${value}&locked=${isLocked}`);

// Retrieve identity data
const data = await despia(`readvault://?key=${keyName}`, [keyName]);
const value = data[keyName];
```

**Parameters:**

- **key** - Name for your stored data (use simple names like "userId", "deviceId", "sessionToken")
- **value** - The data to store (text/string)
- **locked** - Set to `'true'` to require Face ID/fingerprint, `'false'` for normal storage

**Features:**

- **Persistent storage** - Data survives app restarts, updates, and even uninstall/reinstall
- **Cross-device sync** - Works across all user's devices with the same Apple ID or Google account
- **User tracking** - Identify the same user even after they uninstall and reinstall your app
- **Face ID protection** - Optional biometric lock for sensitive actions
- **Automatic timeout** - 30-second timeout prevents app freezing

**Perfect for:**

- Identifying users across sessions
- Preventing free trial abuse (track device even after uninstall)
- Storing login session tokens
- Protecting sensitive actions with Face ID/Touch ID
- Saving user preferences and app settings

**Example Usage:**

```javascript
// Store user ID (normal storage)
await despia(`setvault://?key=userId&value=user123&locked=false`);

// Store session token with biometric protection
await despia(`setvault://?key=sessionToken&value=abc123xyz&locked=true`);

// Retrieve stored data
const userData = await despia(`readvault://?key=userId`, ['userId']);
console.log('User ID:', userData.userId);

const sessionData = await despia(`readvault://?key=sessionToken`, ['sessionToken']);
console.log('Session Token:', sessionData.sessionToken);
```

### OAuth Authentication Workflow

Launch OAuth authentication in a secure native browser session:

```javascript
// First, install the package:
// npm install despia-native

// Then import it:
import despia from 'despia-native';

// Launch OAuth flow
const oauthUrl = 'https://your-provider.com/oauth/authorize?client_id=xxx&redirect_uri=xxx';
despia(`oauth://?url=${encodeURIComponent(oauthUrl)}`);
```

**How it works:**

1. **Opens secure browser session:**
   - **iOS**: ASWebAuthenticationSession (secure Safari sheet)
   - **Android**: Chrome Custom Tabs (secure Chrome overlay)

2. **User completes OAuth** in the secure browser session

3. **Parse tokens from callback URL** - OAuth providers typically return tokens in the URL hash or query parameters:
   ```javascript
   // Example: Parse tokens from URL hash (implicit flow)
   const hash = window.location.hash.substring(1);
   const hashParams = new URLSearchParams(hash);
   const accessToken = hashParams.get('access_token');
   const refreshToken = hashParams.get('refresh_token');
   ```

4. **Close browser and return to app** - Use your app's deeplink scheme with the `oauth/` prefix:
   ```javascript
   // From your callback page (still in secure browser session)
   window.location.href = `myapp://oauth/auth?access_token=${accessToken}&refresh_token=${refreshToken}`;
   ```

5. **Handle deeplink in app** - The native app intercepts the deeplink, closes the browser session, and navigates your WebView to the specified path with query parameters.

**Deeplink format:** `{scheme}://oauth/{path}?params`

- `myapp://` - Your app's deeplink scheme
- `oauth/` - Required prefix that tells native code to close the browser session
- `{path}` - Where to navigate in your app (e.g., `auth`, `home`, `profile`)
- `?params` - Query parameters passed to that page

**Examples:**
- `myapp://oauth/auth?access_token=xxx` - Closes browser, opens `/auth?access_token=xxx`
- `myapp://oauth/home` - Closes browser, opens `/home`
- `myapp://oauth/profile?tab=settings` - Closes browser, opens `/profile?tab=settings`

**Perfect for:**
- Google, Facebook, Apple, GitHub, and other OAuth providers
- Secure authentication flows without leaving your app
- Native browser sessions with automatic cleanup

### Local Storage Workflow

Create a local storage system with cross-platform support (data is cleared on app uninstall):

```javascript
// First, install the package:
// npm install despia-native

// Then import it:
import despia from 'despia-native';

// This SDK is compatible only with the Native Despia Runtime.
// Ensure that the User Agent string includes "despia" before running this code.
// If the User Agent string doesn't include "despia" you can use Local Storage as a web fallback.

// Save data
const userData = { refresh_token: "SSBMT1ZFIERFU1BJQSBOQVRJVkUgU08gTVVDSCBJIFdBTk5BIEtJU1MgSVQh" };
const encoded = encodeURIComponent(JSON.stringify(userData));
await despia(`writevalue://${encoded}`);

// Retrieve data
const data = await despia("readvalue://", ["storedValues"]);
const userData = JSON.parse(decodeURIComponent(data.storedValues));
console.log(userData.refresh_token);
```

**How it works:**

- **Save data**: Use `writevalue://` with a JSON-encoded string to store data on the device
- **Retrieve data**: Use `readvalue://` with `["storedValues"]` to get the stored data
- **Data format**: Data is stored as a single string and returned in the response object
- **Cross-platform**: Works on both iOS and Android
- **Lifecycle**: Data persists across app restarts but is cleared on app uninstall

**Important Notes:**

- **Runtime compatibility**: Only works with Despia Native Runtime (check User Agent for "despia")
- **Web fallback**: Use Local Storage as a fallback if not running in Despia Native Runtime
- **UI blocking**: Refrain from blocking any UI elements or adding loading screens before data is loaded, as most sessions will not have initial data yet if no data has been stored

**Perfect for:**

- Storing user preferences and settings
- Caching temporary data
- Storing session tokens (non-sensitive)
- App configuration data

### Restore Purchases Workflow

Retrieve purchase history from the native app stores to implement "Restore Purchases" functionality and verify user entitlements:

```javascript
// First, install the package:
// npm install despia-native

// Then import it:
import despia from 'despia-native';

// Retrieve purchase history
const data = await despia("getpurchasehistory://", ["restoredData"]);
const purchases = data.restoredData;
console.log(purchases);
```

**How it works:**

Despia queries the native platform's billing system to retrieve all purchases associated with the current user's App Store or Google Play account. This includes active subscriptions, expired subscriptions, consumables, and non-consumable (lifetime) purchases. The data is normalized into a consistent format across both iOS and Android platforms.

**Response Structure:**

Each purchase object in the response array includes:

- **transactionId** - Unique identifier for this specific transaction
- **originalTransactionId** - Identifier linking to the original purchase (useful for subscription renewals)
- **productId** - The product identifier configured in App Store Connect / Google Play Console
- **type** - Either `"subscription"` or `"product"` (one-time purchase)
- **entitlementId** - The entitlement/access level this purchase grants
- **externalUserId** - External user identifier if configured
- **isAnonymous** - Boolean indicating if the purchase is anonymous
- **isActive** - Boolean indicating if the purchase currently grants access
- **willRenew** - Boolean indicating if a subscription will auto-renew
- **purchaseDate** - ISO timestamp of the most recent transaction
- **originalPurchaseDate** - ISO timestamp of the initial purchase
- **expirationDate** - ISO timestamp when access expires (`null` for lifetime purchases)
- **store** - Either `"app_store"` or `"play_store"`
- **country** - User's country code
- **environment** - `"production"` or `"sandbox"`
- **receipt** - The raw receipt data for server-side validation

**Example Response (iOS):**

```javascript
[
    {
        "transactionId": "1000000987654321",
        "originalTransactionId": "1000000123456789",
        "productId": "com.app.premium.monthly",
        "type": "subscription",
        "entitlementId": "premium",
        "externalUserId": "abc123",
        "isAnonymous": false,
        "isActive": true,
        "willRenew": true,
        "purchaseDate": "2024-01-15T14:32:05Z",
        "originalPurchaseDate": "2023-06-20T09:15:33Z",
        "expirationDate": "2024-02-15T14:32:05Z",
        "store": "app_store",
        "country": "USA",
        "receipt": "MIIbngYJKoZIhvcNAQcCoIIbajCCG2YCAQExDzAN...",
        "environment": "production"
    },
    {
        "transactionId": "1000000555555555",
        "originalTransactionId": "1000000555555555",
        "productId": "com.app.removeads",
        "type": "product",
        "entitlementId": "no_ads",
        "externalUserId": "abc123",
        "isAnonymous": false,
        "isActive": true,
        "willRenew": false,
        "purchaseDate": "2023-12-01T08:00:00Z",
        "originalPurchaseDate": "2023-12-01T08:00:00Z",
        "expirationDate": null,
        "store": "app_store",
        "country": "USA",
        "receipt": "MIIbngYJKoZIhvcNAQcCoIIbajCCG2YCAQExDzAN...",
        "environment": "production"
    }
]
```

**Example Response (Android):**

```javascript
[
    {
        "transactionId": "GPA.3372-4150-9088-12345",
        "originalTransactionId": "GPA.3372-4150-9088-12345",
        "productId": "com.app.premium.monthly",
        "type": "subscription",
        "entitlementId": "premium",
        "externalUserId": "abc123",
        "isAnonymous": false,
        "isActive": true,
        "willRenew": true,
        "purchaseDate": "2024-01-15T14:32:05Z",
        "originalPurchaseDate": "2023-06-20T09:15:33Z",
        "expirationDate": "2024-02-15T14:32:05Z",
        "store": "play_store",
        "country": "US",
        "receipt": "kefhajglhaljhfajkfajk.AO-J1OxBnT3hAjkl5FjpKc9...",
        "environment": "production"
    },
    {
        "transactionId": "GPA.3372-4150-9088-67890",
        "originalTransactionId": "GPA.3372-4150-9088-67890",
        "productId": "com.app.removeads",
        "type": "product",
        "entitlementId": "no_ads",
        "externalUserId": "abc123",
        "isAnonymous": false,
        "isActive": true,
        "willRenew": false,
        "purchaseDate": "2023-12-01T08:00:00Z",
        "originalPurchaseDate": "2023-12-01T08:00:00Z",
        "expirationDate": null,
        "store": "play_store",
        "country": "US",
        "receipt": "minodkpfokbofclncmaa.AO-J1Oy2fXpTml7rKxE3vNc9...",
        "environment": "production"
    }
]
```

**Check Active Entitlements:**

```javascript
const data = await despia("getpurchasehistory://", ["restoredData"]);
const purchases = data.restoredData;

// Filter for active purchases only
const activePurchases = purchases.filter(p => p.isActive);

// Check if user has premium access
const hasPremium = activePurchases.some(p => p.entitlementId === "premium");

if (hasPremium) {
    // Grant premium features
}
```

**Perfect for:**

- Implementing "Restore Purchases" buttons required by App Store guidelines
- Verifying user entitlements on app launch
- Checking subscription status and renewal information
- Server-side receipt validation using raw receipt data
- Cross-platform purchase history retrieval

**Important Notes:**

- This feature requires native capabilities which are fully provided by the `despia-native` npm package
- No additional native libraries are needed
- Please follow the installation instructions for the `despia-native` npm package closely
- Implementation as mentioned is critical for App Store compliance

### Read Clipboard Workflow

Read clipboard data from the device:

```javascript
// First, install the package:
// npm install despia-native

// Then import it:
import despia from 'despia-native';

// Read clipboard data
const clipboardData = await despia('getclipboard://', ['clipboarddata']);

// Access the clipboard content
const content = clipboardData.clipboarddata;

// Display or process the clipboard content in your application
console.log('Clipboard content:', content);
```

**How it works:**

- **Read clipboard**: Use `getclipboard://` with `['clipboarddata']` to retrieve the current clipboard content
- **Access content**: The clipboard content is available through the `.clipboarddata` property of the returned object
- **Native support**: Works on both iOS and Android platforms

**Perfect for:**

- Reading text from the clipboard
- Processing clipboard content in your app
- Implementing paste functionality
- Clipboard content validation

### Open App Settings Workflow

Open your app's native settings page where users can manage permissions:

```javascript
// First, install the package:
// npm install despia-native

// Then import it:
import despia from 'despia-native';

// Open native app settings
despia("settingsapp://");
```

**How it works:**

- **Opens native settings**: Navigates to your app's settings page in the device's system settings
- **Permission management**: Users can manage permissions like notifications, location, camera, microphone, and more
- **One-time prompts**: Great for directing users to activate features that you can only ask once, like location or push notifications

**Perfect for:**

- Directing users to enable location services after they've denied the initial prompt
- Helping users enable push notifications if they initially declined
- Managing camera, microphone, or other permission settings
- Providing a way to access app settings when permission prompts can't be shown again

**Example Usage:**

```javascript
// Check if location permission is needed
if (!navigator.geolocation) {
  // Open settings so user can enable location
  despia("settingsapp://");
}

// After user denies push notification permission
// Provide a button to open settings
function openNotificationSettings() {
  despia("settingsapp://");
}
```

### OneSignal Push Notifications Workflow

Set up OneSignal push notifications with external user IDs to connect your database user IDs with device registrations:

```javascript
// First, install the package:
// npm install despia-native

// Then import it:
import despia from 'despia-native';

// On every app load, set the external user ID
// This connects your logged-in user ID with the device's OneSignal registration
despia(`setonesignalplayerid://?user_id=${YOUR_LOGGED_IN_USER_ID}`);
```

**Setup Requirements:**

1. **Create a OneSignal account** and configure your app
2. **Set up iOS (Apple Push Key) and Android (Firebase)** configurations in OneSignal
3. **Important**: When configuring OneSignal, select **"Native iOS"** and **"Native Android"** platforms since Despia apps are native mobile applications
4. **Add your OneSignal App ID** to your Despia project settings

**How it works:**

- **External User IDs**: External IDs (your database user IDs) are now the default and recommended approach
- **Player IDs**: Player IDs still work but are no longer suggested
- **Device Registration**: Devices are automatically registered in OneSignal when the app is installed
- **User Connection**: Calling `setonesignalplayerid://` on every app load connects your user ID with the device registration

**Backend Integration Required:**

You'll need to create a backend endpoint to send notifications using OneSignal's REST API with external user IDs:

```javascript
// Backend API endpoint - send to specific user
const sendNotification = async (externalUserId, title, message) => {
  const response = await fetch('https://onesignal.com/api/v1/notifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic YOUR_REST_API_KEY'
    },
    body: JSON.stringify({
      app_id: 'ONESIGNAL-APP-ID',
      include_external_user_ids: [externalUserId], // Array with single ID
      headings: { en: title },
      contents: { en: message }
    })
  });
  return response.json();
};
```

**Example Usage:**

```javascript
// In your app initialization or login flow
function initializeApp(userId) {
  // Set external user ID on every app load
  despia(`setonesignalplayerid://?user_id=${userId}`);
  
  // Register for push notifications
  despia('registerpush://');
}

// Send local push notification
despia('sendlocalpushmsg://push.send?s=60&msg=Hello&!#New Message&!#https://myapp.com');
```

**Important Notes:**

- This feature requires native capabilities which are fully provided by the `despia-native` npm package
- No additional native libraries are needed
- Please follow the installation instructions for the `despia-native` npm package closely
- Implementation as mentioned is critical for proper push notification delivery
- Call `setonesignalplayerid://` on every app load to ensure the user ID is always connected

**Perfect for:**

- Sending targeted notifications to specific users
- User-based notification management
- Cross-device notification delivery
- Personalized push notification campaigns

### Haptic Feedback

All haptic feedback commands have no response - they provide immediate tactile feedback:

```javascript
// Basic haptic feedback
despia('lighthaptic://');    // Light haptic feedback - subtle vibration
despia('heavyhaptic://');    // Heavy haptic feedback - strong vibration

// Contextual haptic feedback
despia('successhaptic://');  // Success haptic feedback - positive confirmation
despia('warninghaptic://');  // Warning haptic feedback - attention alert
despia('errorhaptic://');    // Error haptic feedback - negative feedback

// Use cases:
// - Button press feedback (light/heavy)
// - Success notifications (successhaptic)
// - Warning alerts (warninghaptic)
// - Error feedback (errorhaptic)
// - UI interaction confirmation
```

### Biometric Authentication

Biometric authentication requires setting up callback functions before running the command:

```javascript
// Step 1: Set up the biometric authentication SDK
if (!document.getElementById("bioauth-sdk")) {
    const script = document.createElement("script")
    script.id = "bioauth-sdk"
    script.type = "text/javascript"
    script.textContent = `
        function onBioAuthSuccess() {
            window.bioauthSuccess()
        }
        function onBioAuthFailure(errorCode, errorMessage) {
            window.bioauthFailure(errorCode, errorMessage)
        }
        function onBioAuthUnavailable() {
            window.bioauthUnavailable()
        }
    `
    document.head.appendChild(script)
}

// Step 2: Define your callback functions
window.bioauthSuccess = function() {
    if (navigator.userAgent.includes("despia")) {
        console.log("Biometric authentication successful");
        // Handle successful authentication
        // Redirect user, unlock features, etc.
    }
}

window.bioauthFailure = function(errorCode, errorMessage) {
    if (navigator.userAgent.includes("despia")) {
        console.log("Biometric authentication failed:", errorCode, errorMessage);
        // Handle authentication failure
        // Show error message, fallback to password, etc.
    }
}

window.bioauthUnavailable = function() {
    if (navigator.userAgent.includes("despia")) {
        console.log("Biometric authentication unavailable");
        // Handle when biometric auth is not available
        // Fallback to alternative authentication method
    }
}

// Step 3: Trigger biometric authentication
despia('bioauth://');
```

### App Information & Device Data

```javascript
// Get app version information
const appInfo = await despia('getappversion://', ['versionNumber', 'bundleNumber']);
console.log('App Version:', appInfo.versionNumber);
console.log('Bundle Number:', appInfo.bundleNumber);

// Get device UUID (native device ID)
const deviceData = await despia('get-uuid://', ['uuid']);
console.log('Device UUID:', deviceData.uuid);

// Get store location
const storeData = await despia('getstorelocation://', ['storeLocation']);
console.log('Store Location:', storeData.storeLocation);

// Check tracking permission
const trackingData = await despia('user-disable-tracking://', ['trackingDisabled']);
console.log('Tracking Disabled:', trackingData.trackingDisabled);
```

### UI Controls & Styling

```javascript
// Loading spinner controls
await despia('spinneron://');   // Show loading spinner
await despia('spinneroff://');  // Hide loading spinner

// Full screen mode
await despia('hidebars://on');  // Hide status bar (full screen)
await despia('hidebars://off'); // Show status bar

// Status bar styling
await despia('statusbarcolor://{255, 255, 255}');     // Set status bar background color (RGB)
await despia('statusbartextcolor://{black}');         // Set status bar text color (black/white)
```

### File & Media Operations

```javascript
// Take screenshot (saves to device)
await despia('takescreenshot://');

// Save image from URL
await despia('savethisimage://?url=https://example.com/image.jpg');

// Download file from URL
await despia('file://https://example.com/document.pdf');

// Share app with message and URL
await despia('shareapp://message?=Check%20out%20this%20app&url=https://myapp.com');
```

### Scanning Mode

```javascript
// Control scanning mode
await despia('scanningmode://auto');  // Auto scanning mode
await despia('scanningmode://on');    // Enable scanning
await despia('scanningmode://off');   // Disable scanning
```

### App Reset

```javascript
// Reset app (use with caution)
await despia('reset://');
```

### Native Safe Area

Access native safe area insets via CSS custom properties:

```css
/* Use native safe area insets in your CSS */
.my-element {
  padding-top: var(--safe-area-top);
  padding-bottom: var(--safe-area-bottom);
}

/* Full height with safe area consideration */
.full-height {
  height: calc(100vh - var(--safe-area-top) - var(--safe-area-bottom));
}
```

**Note:** Despia only supports top and bottom safe area insets. Left and right safe area variables are not available.

These CSS variables are automatically provided by the Despia native runtime and represent the device's safe area insets (notches, home indicators, etc.).



## API Reference

### `despia(command, watch?)`

- **command** (string): The Despia protocol command (e.g., `'lighthaptic://'`)
- **watch** (string[], optional): Array of variable names to watch for in the response

Returns a Promise that resolves when all watched variables are available:
- **Single variable**: 30-second timeout with observation. `null` values resolve immediately (useful for error/not-found signals). Other empty placeholders (`undefined`, `"n/a"`, `{}`, `[]`) are ignored. Promise always resolves; on timeout it resolves with `undefined`.
- **Multiple variables**: Uses VariableTracker with 5-minute auto-cleanup. All variables must have non-null values. Any `null` value blocks resolution until all variables have real values.

### Timeout behavior

When you call `despia(command, ['someVariable'])`, the SDK waits up to 30 seconds for
`window.someVariable` to be set by the native runtime. If it appears earlier, the
Promise resolves with that value. If it is never set, the Promise still resolves
after 30 seconds with `undefined` and a timeout is logged to the console. This
prevents hanging Promises for long-running or failing native operations.

### Fresh-data behavior

Before observing, watched variables are cleared to avoid resolving on stale values.
The observer behavior differs by variable count:

- **Single variable**: `null` is treated as a valid resolution value (useful for error/not-found signals). The observer ignores other empty placeholders (`undefined`, `"n/a"`, `{}`, `[]`) and requires the value to change from its baseline before resolving.

- **Multiple variables**: All variables must have non-null values. The observer ignores empty placeholders (`undefined`, `null`, `"n/a"`, `{}`, `[]`) and requires all values to change from their baseline before resolving.

This ensures each call waits for a fresh write from the native side.

### Direct Property Access

Access any window variable directly through the despia object:

```javascript
despia.variableName // Equivalent to window.variableName
```

## Despia Protocol Format

Despia uses a simple protocol format for all native integrations:

```
feature://action?parameters
```

Examples:
- `lighthaptic://`
- `getappversion://`
- `revenuecat://purchase?external_id=user_777&product=monthly_premium`
- `revenuecat://launchPaywall?external_id=user_777&offering=default`
- `getpurchasehistory://`
- `getclipboard://`
- `settingsapp://`
- `setonesignalplayerid://?user_id=user123`
- `registerpush://`
- `setvault://?key=userId&value=user123&locked=false`
- `readvault://?key=userId`
- `writevalue://{JSON-ENCODED-STRING}`
- `readvalue://`
- `oauth://?url=https://provider.com/oauth/authorize`
- `requestcontactpermission://`
- `savethisimage://?url=https://example.com/image.jpg`

## Available Despia Features

Your app can access these native features:

- **Native Widgets** - Create widgets with SVG and refresh time
- **In-App Purchases** - RevenueCat integration with external user IDs
- **Restore Purchases** - Retrieve purchase history from App Store and Google Play
- **Contact Access** - Request permissions and read contacts
- **Background Location** - Native tracking with browser geolocation API
- **Push Notifications** - OneSignal integration with external user IDs and local push messages
- **Haptic Feedback** - Light, heavy, success, warning, and error feedback
- **App Information** - Version numbers, bundle numbers, device UUID
- **Clipboard Access** - Read clipboard content from device
- **Screenshots** - Take device screenshots
- **Scanning Mode** - Auto, on, and off scanning controls
- **Store Location** - Get store location data
- **File Operations** - Save images and download files
- **Identity Vault** - Persistent cross-device storage with optional biometric protection
- **Local Storage** - Cross-platform device storage (cleared on uninstall)
- **OAuth Authentication** - Secure OAuth flows with native browser sessions
- **App Control** - Reset app and disable tracking
- **App Settings** - Open native app settings for permission management
- **UI Controls** - Loading spinners and full screen mode
- **Sharing** - Share app with custom messages and URLs
- **Status Bar** - Control colors and text colors
- **Biometric Authentication** - Native biometric auth with callbacks

## TypeScript Support

Full TypeScript definitions are included:

```typescript
import despia from 'despia-native';

// Type-safe usage with Despia commands
const result: { versionNumber: string; bundleNumber: string } = await despia(
  'getappversion://', 
  ['versionNumber', 'bundleNumber']
);

// Direct property access
const deviceInfo: any = despia.deviceInfo;
```

## Integration with Despia

Despia operates through a streamlined protocol handler system, allowing you to invoke native features using the global `window.despia` object. This npm package is the JavaScript SDK that makes your web app communicate with Despia's native runtime. The SDK provides:

- **Command Queuing** - Sequential execution of Despia commands via `window.despia` setter
- **Variable Watching** - Async monitoring of response variables
- **Hybrid Framework Compatible** - Works with Despia's hybrid app framework
- **Direct Access** - Proxy-based access to window variables

### How It Works
Despia's protocol handler system eliminates the need for complex libraries or dependencies, making it compatible across various frameworks and platforms. The SDK uses the setter pattern to execute commands:

```javascript
// When you call:
despia('lighthaptic://');

// It internally executes:
window.despia = 'lighthaptic://';
```

This streamlined approach triggers Despia's native runtime to handle the native command, providing seamless access to device capabilities directly from your web codebase.

## License

MIT