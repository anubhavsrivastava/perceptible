# Perceptible NPM Module Sample Application

This sample application demonstrates how to consume the **`perceptible`** NPM module in a modern web application bundled with Vite.

## Features Demonstrated

- **ES Module Import**: `import Perceptor from 'perceptible';`
- **Real-time Surface Viewability Tracking**: Measures viewport intersection percentage in real-time.
- **Custom Subscribers**: Direct subscriber callbacks updating live telemetry metrics UI.
- **Threshold Configurations**: Ad viewability standard checks (e.g. 50% MRC threshold vs 100% full exposure).
- **Click Telemetry**: Event listeners dispatched by Perceptor instances.
- **Attention Mode**: Automatic focus/blur tracking when switching browser tabs or windows.

## Running the Sample App

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

3. **Build Sample App for Production**:
   ```bash
   npm run build
   ```
