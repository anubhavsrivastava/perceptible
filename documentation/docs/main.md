Perceptible can be integrated into your web projects using modern package managers, ES module imports, or direct CDN script tags.

## Installation Options

### 1. Package Manager (npm / yarn / pnpm)

Install the package via your preferred package manager:

```bash
npm install perceptible
# or
yarn add perceptible
# or
pnpm add perceptible
```

### 2. Direct CDN Script Tag

For quick prototyping or traditional static HTML sites, include the compiled distribution bundle via CDN:

```html
<!-- Include latest Perceptible bundle -->
<script src="https://cdn.jsdelivr.net/gh/anubhavsrivastava/perceptible@master/dist/bundle.js"></script>
```

When included via script tag, `Perceptor` is registered globally on `window.Perceptor`.

## Module Usage

Import `Perceptor` into your client-side JavaScript or TypeScript application:

```javascript
import Perceptor from 'perceptible';

// Initialize on target element
const observer = new Perceptor(document.querySelector('#target-element'), {
  threshold: 50,
});

// Start tracking viewability
observer.watch();
```

:::tip Production Ready
Perceptible is stable and production-ready. Automated end-to-end and unit test suites are fully integrated to guarantee high-performance, zero-dependency viewability tracking.
:::

## Next Steps

- Explore the [Basic Usage Example](basicsample.md)
- Learn about the [Perceptor Class API](perceptor.md)
- Review full [Configuration Options](configuration.md)

