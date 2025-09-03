# Despia SDK

JavaScript SDK for [Despia](https://despia.com) - the #1 low-code hybrid framework that ships native apps to app stores in one click. This npm package provides command queuing and variable watching capabilities for seamless integration with Despia's 60fps GPU-accelerated native runtime and **25+ deep native device features** including NFC, Siri, HealthKit, RevenueCat, and offline support.

## About Despia

Despia is the #1 low-code hybrid framework that transforms web applications into fully native mobile apps for iOS and Android. Build your web app in any framework you like (React, Vue, Angular, vanilla JS, etc.) - just connect it with the Despia editor and it will import all your configurations. The visual editor lets you build widgets, shortcuts, and configure dynamic targets into your application without needing any native development knowledge.

Ship your app to the App Store and Google Play Store in just one click with automatic CI/CD build processes, automatic updates, and over-the-air updates. Get full source code export with complete Xcode and Android Studio projects in human-readable code - no vendor lock-in, full ownership guaranteed. Built with a fully visual editor, Despia gives you **deep access to native device features** with 60fps GPU-based rendering - all from one codebase.

**Ship a native app in a weekend to the app stores with all native features!**

### Key Features:
- **Any Framework Support** - Build with React, Vue, Angular, vanilla JS, or any framework
- **Visual Editor** - Import your web app config and build widgets/shortcuts visually
- **No Native Knowledge Required** - Configure dynamic targets without native development
- **Full Source Code Export** - Get complete Xcode and Android Studio projects in human-readable code
- **No Vendor Lock-in** - Edit the entire codebase after export, full ownership guaranteed
- **One-Click Deployment** - Ship to App Store & Google Play Store instantly
- **Automatic CI/CD** - Built-in continuous integration and deployment
- **Over-the-Air Updates** - Push updates without app store approval
- **60fps GPU Rendering** - Hardware-accelerated performance
- **Deep Native Access** - Full access to 25+ native device features (NFC, Siri, HealthKit, RevenueCat, offline support, etc.)
- **Single Codebase** - One codebase for iOS, Android, and web

### **Deep Native Device Features Include:**
- **📱 App Links & Deep Linking** - Native app-to-app communication
- **🎯 Native Widgets & App Clips** - iOS widgets and Android shortcuts
- **💳 In-App Purchases & Subscriptions** - RevenueCat integration
- **🔔 Push Notifications & Local Notifications** - Native notification system
- **📷 Camera Roll & File Downloads** - Direct file system access
- **🔐 Biometric Authentication** - Touch ID, Face ID, fingerprint
- **📍 Background Location** - GPS tracking with native permissions
- **👥 Contact Access** - Read device contacts with permissions
- **📳 Haptic Feedback** - Light, heavy, success, warning, error vibrations
- **📊 App Analytics** - Version numbers, bundle IDs, device UUIDs
- **🖼️ Screenshots** - Native screenshot capture
- **📱 Status Bar Control** - Color and text styling
- **🔄 App Reset & Tracking** - User privacy controls
- **📤 Share Functionality** - Native share sheets
- **🎨 UI Controls** - Spinners, hide bars, dynamic targets
- **And 8+ more native features**

## Installation

```bash
npm install despia-native
```

## 🚀 **Build in Any Framework → Make it Native**

**Step 1:** Build your web app in any framework you prefer (React, Vue, Angular, vanilla JS, etc.)

**Step 2:** Connect your project to Despia editor:
   - **Remote URL:** Add your project's remote URL (gets updated over-the-air automatically)
   - **Upload Project:** Upload your project files directly to the editor

**Step 3:** Use Despia to transform it into a native app with full device access

**Step 4:** This npm package gives you access to all native functionalities and native data

## 📱 **Access 25+ Native Device Features**

With Despia, your web app gets **full native device access** without any native development:

- **🔐 Biometric Check** - Touch ID, Face ID, fingerprint authentication
- **📍 Location Services** - Background GPS tracking with native permissions  
- **📷 Camera & Photos** - Direct camera access and photo library
- **👥 Contacts** - Read device contacts with proper permissions
- **📳 Haptic Feedback** - 5 types of native vibrations
- **🔔 Push Notifications** - Native notification system + OneSignal remote push
- **💳 In-App Purchases** - RevenueCat integration for subscriptions & purchases
- **🎯 Widgets & Shortcuts** - iOS widgets and Shortcuts
- **📱 App Store Features** - Version info, bundle IDs, device UUIDs
- **🎨 Native UI** - Status bar styling, spinners, fullscreen mode
- **📤 Share & Export** - Native share sheets and file downloads
- **🔄 Privacy Controls** - App reset and tracking disable
- **📡 NFC Access** - Near Field Communication for contactless interactions
- **🎤 Siri Integration** - Voice commands and shortcuts
- **❤️ HealthKit & Google Fit** - Health data integration
- **💾 Offline Support** - Offline database and data persistence
- **And many more native features!**

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

Despia operates through a streamlined protocol handler system, allowing you to invoke native features using the global `window.despia` object. This npm package is the JavaScript SDK that makes your web app communicate with Despia's native runtime. The SDK provides:es and sdks 

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