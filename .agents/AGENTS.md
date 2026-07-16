# Perceptible Agent Rules

When assisting with repository tasks, you must adhere to the following project-specific guidelines:

## Release Process

When a user requests to release a new version of `perceptible`, or you are tasked with executing/preparing a release, follow the official guidelines documented in [RELEASING.md](file:///Users/anubhav/Developer/perceptible/RELEASING.md):

1. **Verify Workspace**: Run `npm run test` and `npm run test:e2e` to verify the codebase is healthy.
2. **Build**: Run `npm run build` to compile the library assets.
3. **Example App Update**: Bump the dependency version of `perceptible` in [example/package.json](file:///Users/anubhav/Developer/perceptible/example/package.json) to match the new release version and run `npm install` inside the `example` directory.
4. **Docs Verification**: Ensure there are no leftover pre-v1 or preview notice warnings in the [documentation/docs](file:///Users/anubhav/Developer/perceptible/documentation/docs) folder.
5. **Release Tooling**: Use `npm run release` (or run `npx release-it` directly) in the **project root directory** to trigger `release-it`. Note that this command is interactive, so instruct the user to complete the prompts or run it themselves if it requires user selection/permissions.

