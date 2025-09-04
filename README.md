# Despia SDK

JavaScript SDK for [Despia](https://despia.com) - Transform your web app into a native iOS & Android app without writing Swift or Kotlin. This npm package provides command queuing and variable watching for seamless integration with Despia's GPU-accelerated native runtime, enabling access to 25+ device APIs through simple JavaScript calls.

## About Despia

Despia bridges the gap between web and native mobile development. Build your app using the web technologies you already know, then deploy it as a truly native application to the App Store and Google Play - complete with hardware acceleration, offline support, and deep OS integration.

Our visual editor allows you to configure native widgets, shortcuts, and dynamic app behaviors without touching Xcode or Android Studio. Ship to both app stores with one-click deployment, automatic CI/CD pipelines, and over-the-air updates. Export clean, human-readable Swift and Kotlin source code anytime - you own everything, no vendor lock-in.

**Go from web app to app store in a weekend - with full native capabilities.**

### Key Features:
- **Universal Framework Support** - Works with React, Vue, Angular, Svelte, vanilla JS, or any web framework
- **Visual Configuration** - Set up native features through an intuitive interface
- **Zero Native Coding** - Access device APIs without writing Swift or Kotlin
- **Source Code Export** - Get complete Xcode and Android Studio projects you can modify
- **True Ownership** - Full access to generated code, no restrictions
- **One-Click Publishing** - Direct deployment to App Store & Google Play
- **Automated Pipeline** - Built-in CI/CD with code signing and provisioning
- **OTA Updates** - Push updates instantly without app store review
- **Performance** - 60fps GPU-accelerated rendering
- **Device API Access** - NFC, HealthKit, Siri, RevenueCat, and 20+ more
- **Single Codebase** - Maintain one project for iOS, Android, and web

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

## Installation

```bash
npm install despia-native
```

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
- **Single variable**: 5-second timeout with simple observation
- **Multiple variables**: Uses VariableTracker with 5-minute auto-cleanup

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