# Release Process

This document outlines the standard release process for the `perceptible` library. Follow these steps to ensure a clean, verified, and consistent release.

## Release Checklist

Before initiating a release, verify all code is up to date, built, and thoroughly tested.

### 1. Pre-Release Verification

1. **Clean Workspace**:
   Ensure all changes are committed and your working tree is clean.
   ```bash
   git status
   ```

2. **Run Tests**:
   Ensure both unit tests and end-to-end browser tests pass successfully.
   ```bash
   npm run test
   npm run test:e2e
   ```

3. **Build the Library**:
   Ensure the production build compiles without errors.
   ```bash
   npm run build
   ```

### 2. Update Example App Dependencies

Because the example app consumes the library as an NPM package, its dependency must be updated to target the new release version.

1. Open [example/package.json](file:///Users/anubhav/Developer/perceptible/example/package.json).
2. Update the `perceptible` dependency version under `dependencies` to the target release version (e.g. `"perceptible": "^1.0.0"`).
3. Synchronize `package-lock.json` in the example directory:
   ```bash
   cd example
   npm install
   cd ..
   ```

### 3. Update Documentation (if applicable)

Verify if there are any release-specific notices or version warnings in the Docusaurus documentation.
- Check [documentation/docs/main.md](file:///Users/anubhav/Developer/perceptible/documentation/docs/main.md) and remove or update any preview notices.

---

## Executing the Release

We use `release-it` to automate our release workflow (updating root version, tagging, committing, and publishing).

1. Navigate back to the **project root directory** (if you are still inside `example/` or `documentation/`):
   ```bash
   cd ..
   ```
2. Execute the release command from the project root:
   ```bash
   npm run release
   # or run directly:
   npx release-it
   ```
3. **Interactive CLI Prompt**:
   - Select the target increment (e.g., `major` for `1.0.0`, `minor`, or `patch`).
   - Review and accept the generated changelog.
   - Confirm git commit, tagging, and push details.
   - Confirm publishing to the NPM registry.

4. **Post-Release Checklist**:
   - Verify the package is successfully published on [npmjs.com](https://www.npmjs.com/).
   - Ensure the new release tag is pushed to GitHub.
