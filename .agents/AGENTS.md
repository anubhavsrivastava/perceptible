# Perceptible Agent Rules

When assisting with repository tasks, you must adhere to the following project-specific guidelines:

## Release Process

When a user requests to release a new version of `perceptible`, or you are tasked with executing/preparing a release, follow the official guidelines documented in [RELEASING.md](file:///Users/anubhav/Developer/perceptible/RELEASING.md):

1. **Verify Workspace**: Run `npm run test` and `npm run test:e2e` to verify the codebase is healthy.
2. **Build**: Run `npm run build` to compile the library assets.
3. **Example App Update**: Bump the dependency version of `perceptible` in [example/package.json](file:///Users/anubhav/Developer/perceptible/example/package.json) to match the new release version and run `npm install` inside the `example` directory.
4. **Docs Verification**: Ensure there are no leftover pre-v1 or preview notice warnings in the [documentation/docs](file:///Users/anubhav/Developer/perceptible/documentation/docs) folder.
5. **Release Tooling**: Use `npm run release` (or run `npx release-it` directly) in the **project root directory** to trigger `release-it`. Note that this command is interactive, so instruct the user to complete the prompts or run it themselves if it requires user selection/permissions.

## Dependency Management & Build Safety

When tasked with updating dependencies or modifying package versions, you must follow these rules to ensure the build remains stable across all internal projects (`root`, `example`, and `documentation`):

1. **TypeScript Version Constraints**: Do **NOT** bump `typescript` to `^7.0.0` or higher. Major version 7 introduces breaking changes to the Compiler API which currently breaks `vite-plugin-dts` and `ts-jest`.
2. **ESLint Version Constraints**: Keep `eslint` capped at `^8.57.0`. The project still uses the legacy `.eslintrc.js` config format, which is not supported by default in ESLint v9+.
3. **Peer Dependencies**: Due to legacy setups and conflicting plugins (e.g., `@babel/core`, `@typescript-eslint`), always use the `--legacy-peer-deps` flag when running `npm install` to avoid `ERESOLVE` errors.
4. **Workspace Completeness**: When upgrading packages (e.g. using `npm-check-updates`), apply the updates consistently across all three `package.json` files:
   - Root project (`/package.json`)
   - Example app (`/example/package.json`)
   - Documentation (`/documentation/package.json`)
4. **Mandatory Verification Phase**: Before completing your task, you MUST verify that your changes did not break the build in any of the projects:
   - In the root: Run `npm run build` and `npm run test`
   - In the `example` folder: Run `npm run build`
   - In the `documentation` folder: Run `npm run build`
5. **No Blind Commits**: Never commit package version bumps without running the verification steps listed above. If a build fails locally, fix it before proceeding.
