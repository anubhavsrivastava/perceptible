# Perceptible Modernization Roadmap & Task Breakdown

This document serves as an actionable, step-by-step guide for modernizing the **Perceptible** codebase, build pipeline, testing framework, CI/CD, and documentation tooling to **Node 22+** and modern ecosystem standards.

Tasks are modularized so they can be picked up independently by different contributors.

---

## 📋 Task Overview & Status

| Task ID | Module | Title | Status |
| :--- | :--- | :--- | :--- |
| **TASK-1** | Core & Bundling | Vite Setup & Package Specification | 🟢 Completed |
| **TASK-2** | Cleanup | Remove Obsolete Build & CI Configs | 🟢 Completed |
| **TASK-3** | Source & Types | Linting, ESLint Upgrade & TypeScript Declarations | 🟢 Completed |
| **TASK-4** | Testing | Jest Upgrade & Test Suite Modernization | 🟢 Completed |
| **TASK-5** | CI/CD | GitHub Actions Workflow Implementation | 🟢 Completed |
| **TASK-6** | Documentation | Asset Distribution & Build Verification | 🟢 Completed |
| **TASK-7** | Verification | Sample Application & E2E Validation | 🟢 Completed |

---

## 🛠 Task Details

### TASK-1: Core & Bundling - Package & Vite Alignment
**Goal:** Transition build pipeline from Webpack 4 to Vite 5+ targeting Node 22.

* **Steps to Execute:**
  1. Verify `package.json` contains `"engines": { "node": ">=22.0.0" }`.
  2. Run `npm install` on Node 22 to generate a fresh `package-lock.json`.
  3. Verify `vite.config.js` builds UMD (`Perceptor`) and ESM bundles into `dist/`.
  4. Run `npm run build` and confirm outputs exist:
     - `dist/bundle.js`
     - `dist/bundle.mjs` (or UMD fallback)
* **Verification Command:**
  ```bash
  node -v # Ensure Node >= 22
  npm install
  npm run build
  ```

---

### TASK-2: Cleanup - Legacy Configuration Removal
**Goal:** Remove obsolete configuration files from previous tooling stack.

* **Steps to Execute:**
  1. Delete `webpack.config.js`.
  2. Delete `.babelrc` (Vite handles ES modern syntax natively; fallback Babel configs can be pruned if unused).
  3. Delete `.travis.yml` (replaced by GitHub Actions).
  4. Update `.gitignore` and `.npmignore` to ensure build artifacts (`dist/`, coverage reports) are correctly mapped.
* **Verification Command:**
  ```bash
  git status
  ```

---

### TASK-3: Source & Types - ESLint Upgrade & Type Definitions
**Goal:** Upgrade ESLint to v8/v9 standard and introduce TypeScript definition files (`.d.ts`).

* **Steps to Execute:**
  1. Update `.eslintrc.js` to align with modern ESLint parser options (`ecmaVersion: 'latest'`, `sourceType: 'module'`).
  2. Run `npm run lint` and resolve any deprecated rules or code style issues across `src/`.
  3. Create `src/index.d.ts` providing standard TypeScript typings for `Perceptor` API methods and spectator configuration options.
  4. Reference `"types": "src/index.d.ts"` in `package.json`.
* **Verification Command:**
  ```bash
  npm run lint
  npx tsc --noEmit src/index.d.ts # Verify typings syntax
  ```

---

### TASK-4: Testing - Jest Upgrade & Test Suite Modernization
**Goal:** Upgrade Jest to v29+ and ensure all unit tests pass seamlessly under Node 22.

* **Steps to Execute:**
  1. Review and update `jest.config.js` to ensure compatibility with ESM / modern JSDOM environments.
  2. Run `npm run test` and address any deprecations or mock issues.
  3. Expand test coverage for core spectators (`src/spectators/`) and DOM visibility calculations.
* **Verification Command:**
  ```bash
  npm run test
  npm run test:coverage
  ```

---

### TASK-5: CI/CD - GitHub Actions Automation
**Goal:** Set up continuous integration on GitHub to automate linting, testing, and building.

* **Steps to Execute:**
  1. Create file `.github/workflows/ci.yml`.
  2. Configure workflow matrix targeting Node 22.x on `ubuntu-latest`.
  3. Steps should include:
     - `actions/checkout@v4`
     - `actions/setup-node@v4` with Node 22 and caching.
     - `npm ci`
     - `npm run lint`
     - `npm run test`
     - `npm run build`
* **Verification Command:**
  ```bash
  git add .github/workflows/ci.yml
  # Push to GitHub feature branch to trigger pipeline execution
  ```

---

### TASK-6: Documentation - Docusaurus v1 to v3 Migration
**Goal:** Rebuild the `documentation/` workspace using Docusaurus v3.

* **Steps to Execute:**
  1. Navigate to `documentation/`.
  2. Upgrade `documentation/website/package.json` dependencies to `@docusaurus/core` v3.x.
  3. Migrate legacy Docusaurus v1 layout config (`siteConfig.js`) to Docusaurus v3 (`docusaurus.config.js`).
  4. Ensure existing Markdown docs in `documentation/docs/` map to the new sidebar schema.
  5. Update `copydist` scripts to correctly sync `dist/bundle.js` into the Docusaurus static asset directory.
* **Verification Command:**
  ```bash
  cd documentation/website
  npm install
  npm start
  ```

---

### TASK-7: Verification & Sample App Validation
**Goal:** Ensure the built library works smoothly with the sample app under `sample/`.

* **Steps to Execute:**
  1. Build latest bundle using `npm run build`.
  2. Start local static server via `npm run sample`.
  3. Open sample application in browser and test viewability events, focus changes, and scroll tracking.
* **Verification Command:**
  ```bash
  npm run sample
  ```
