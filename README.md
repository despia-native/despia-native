# Despia SDK

JavaScript SDK for [Despia](https://docs.despia.com) native integrations with command queuing and variable watching capabilities.

## About Despia

Despia provides native device capabilities to web applications through a simple protocol system. Access features like:
- App Links & Deep Linking
- Native Widgets & App Clips
- In-App Purchases & Subscriptions
- Push Notifications & Local Notifications
- Camera Roll & File Downloads
- Biometric Authentication
- Background Location
- And many more native features

## Installation

```bash
npm install despia
```

## Usage

### Basic Despia Command Execution

```javascript
import despia from 'despia';

// Execute a Despia protocol command (no response)
await despia('lighthaptic://');

// Execute command and watch for response variables
const result = await despia('getappversion://', ['versionNumber', 'bundleNumber'], 5000);
console.log(result); // { versionNumber: '1.0.0', bundleNumber: '123' }
```

### Despia Command Examples

```javascript
// Native Widgets
await despia('widget://${svg}?refresh=${refresh_time}');

// RevenueCat In-App Purchases
await despia('revenuecat://purchase?external_id=user_777&product=monthly_premium');

// Contact Permissions
await despia('requestcontactpermission://');
const contacts = await despia('readcontacts://', ['contacts']);

// Background Location
await despia('backgroundlocationon://');
// Use native browser geolocation API (not despia wrapper)
const watchId = navigator.geolocation.watchPosition(
  (position) => console.log('Location:', position),
  (error) => console.error('Location error:', error)
);
// To stop
await despia('backgroundlocationoff://');
navigator.geolocation.clearWatch(watchId);

// Push Notifications
await despia('registerpush://');
await despia('sendlocalpushmsg://push.send?s=60&msg=Hello&!#New Message&!#https://myapp.com');
const oneSignalData = await despia('getonesignalplayerid://', ['onesignalplayerid']);

// Haptic Feedback
await despia('lighthaptic://');
await despia('heavyhaptic://');
await despia('successhaptic://');
await despia('warninghaptic://');
await despia('errorhaptic://');

// App Information
const appInfo = await despia('getappversion://', ['versionNumber', 'bundleNumber']);
const deviceInfo = await despia('get-uuid://', ['uuid']);

// Screenshots and Scanning
await despia('takescreenshot://');
await despia('scanningmode://auto');
await despia('scanningmode://on');
await despia('scanningmode://off');

// Store and Location
const storeData = await despia('getstorelocation://', ['storeLocation']);

// Image and File Operations
await despia('savethisimage://?url=${image_url}');
await despia('file://${file_url}');

// App Control
await despia('reset://');
const trackingData = await despia('user-disable-tracking://', ['trackingDisabled']);

// UI Controls
await despia('spinneron://');
await despia('spinneroff://');
await despia('hidebars://on');
await despia('hidebars://off');

// Sharing
await despia('shareapp://message?=${message}&url=${url}');

// Status Bar Styling
await despia('statusbarcolor://{255, 255, 255}');
await despia('statusbartextcolor://{black}');

// Biometric Authentication
await despia('bioauth://');
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
// Watch multiple response variables with custom timeout
const appData = await despia('getappversion://', ['versionNumber', 'bundleNumber'], 15000);

// Chain multiple Despia commands
await despia('lighthaptic://');
await despia('getappversion://', ['versionNumber', 'bundleNumber']);
await despia('successhaptic://');
```

### Background Location Workflow

Background location tracking requires a two-step process:

```javascript
// Step 1: Enable native background location tracking via Despia
await despia('backgroundlocationon://');

// Step 2: Use native browser geolocation API for actual tracking (not despia wrapper)
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
await despia('backgroundlocationoff://');
// Step 2: Clear browser geolocation watch (native API)
navigator.geolocation.clearWatch(watchId);
```

### Contact Access Workflow

```javascript
// Step 1: Request contact permission
await despia('requestcontactpermission://');

// Step 2: Read contacts after permission granted
const contactData = await despia('readcontacts://', ['contacts']);
console.log('Contacts:', contactData.contacts);
```

### Haptic Feedback

All haptic feedback commands have no response - they provide immediate tactile feedback:

```javascript
// Basic haptic feedback
await despia('lighthaptic://');    // Light haptic feedback - subtle vibration
await despia('heavyhaptic://');    // Heavy haptic feedback - strong vibration

// Contextual haptic feedback
await despia('successhaptic://');  // Success haptic feedback - positive confirmation
await despia('warninghaptic://');  // Warning haptic feedback - attention alert
await despia('errorhaptic://');    // Error haptic feedback - negative feedback

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
await despia('bioauth://');
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
  padding-left: var(--safe-area-left);
  padding-right: var(--safe-area-right);
}

/* Full height with safe area consideration */
.full-height {
  height: calc(100vh - var(--safe-area-top) - var(--safe-area-bottom));
}
```

These CSS variables are automatically provided by the Despia native runtime and represent the device's safe area insets (notches, home indicators, etc.).



## API Reference

### `despia(command, watch?, timeout?)`

- **command** (string): The Despia protocol command (e.g., `'applinks://open?url=...'`)
- **watch** (string[], optional): Array of variable names to watch for in the response
- **timeout** (number, optional): Timeout in milliseconds (default: 10000)

Returns a Promise that resolves when all watched variables are available or timeout is reached.

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
import despia from 'despia';

// Type-safe usage with Despia commands
const result: { versionNumber: string; bundleNumber: string } = await despia(
  'getappversion://', 
  ['versionNumber', 'bundleNumber']
);

// Direct property access
const deviceInfo: any = despia.deviceInfo;
```

## Integration with Despia

This SDK is designed to work with [Despia's native integration system](https://docs.despia.com/docs/native-integrations/getting-started). The SDK provides:

- **Command Queuing** - Sequential execution of Despia commands
- **Variable Watching** - Async monitoring of response variables
- **Timeout Handling** - Configurable timeouts for long-running operations
- **Direct Access** - Proxy-based access to window variables

## License

MIT