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
npm install despia-native
```

**This is NOT optional. Your app will NOT work without this package.**

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
const oneSignalData = await despia('getonesignalplayerid://', ['onesignalplayerid']);

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
- **Single variable**: 30-second timeout with observation that ignores empty placeholders and requires a fresh write (Promise always resolves; on timeout it resolves with `undefined`)
- **Multiple variables**: Uses VariableTracker with 5-minute auto-cleanup

### Timeout behavior

When you call `despia(command, ['someVariable'])`, the SDK waits up to 30 seconds for
`window.someVariable` to be set by the native runtime. If it appears earlier, the
Promise resolves with that value. If it is never set, the Promise still resolves
after 30 seconds with `undefined` and a timeout is logged to the console. This
prevents hanging Promises for long-running or failing native operations.

### Fresh-data behavior

Before observing, watched variables are cleared to avoid resolving on stale values.
The observer ignores empty placeholders (`undefined`, `null`, `"n/a"`, `{}`, `[]`)
and requires the value to change from its baseline before resolving. This ensures
each call waits for a fresh write from the native side.

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
- `requestcontactpermission://`
- `savethisimage://?url=https://example.com/image.jpg`

## Available Despia Features

Your app can access these native features:

- **Native Widgets** - Create widgets with SVG and refresh time
- **In-App Purchases** - RevenueCat integration with external user IDs
- **Contact Access** - Request permissions and read contacts
- **Background Location** - Native tracking with browser geolocation API
- **Push Notifications** - OneSignal integration and local push messages
- **Haptic Feedback** - Light, heavy, success, warning, and error feedback
- **App Information** - Version numbers, bundle numbers, device UUID
- **Screenshots** - Take device screenshots
- **Scanning Mode** - Auto, on, and off scanning controls
- **Store Location** - Get store location data
- **File Operations** - Save images and download files
- **App Control** - Reset app and disable tracking
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