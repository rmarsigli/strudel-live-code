# Publishing @strudel-studio/visualizer to npm

## Pre-requisites

1. **npm account**: Create an account at https://www.npmjs.com
2. **npm login**: Run `npm login` and enter your credentials
3. **Package name available**: Check if `@strudel-studio/visualizer` is available on npm

## Steps to Publish

### 1. Create npm Organization (First Time Only)

```bash
npm org:create strudel-studio
```

Or publish as a scoped package under your personal account (change `@strudel-studio` to `@yourusername` in package.json).

### 2. Build the Package

```bash
cd packages/visualizer
pnpm build
```

Verify the `dist/` folder contains:
- `index.js` (CommonJS)
- `index.mjs` (ESM)
- `index.d.ts` (TypeScript types)
- `index.d.mts` (ESM types)

### 3. Test Locally (Optional but Recommended)

```bash
# In the visualizer package
pnpm pack

# This creates @strudel-studio-visualizer-1.0.0.tgz
# Test it in your main project:
cd ../..
pnpm add ./packages/visualizer/strudel-studio-visualizer-1.0.0.tgz
```

### 4. Publish to npm

```bash
cd packages/visualizer

# Dry run to see what will be published
npm publish --dry-run

# Publish for real
npm publish --access public
```

**Note**: The `--access public` flag is required for scoped packages.

### 5. Verify Publication

```bash
npm view @strudel-studio/visualizer
```

Or visit: https://www.npmjs.com/package/@strudel-studio/visualizer

## Version Management

### Patch Release (Bug Fixes)

```bash
npm version patch
npm publish --access public
git push && git push --tags
```

### Minor Release (New Features)

```bash
npm version minor
npm publish --access public
git push && git push --tags
```

### Major Release (Breaking Changes)

```bash
npm version major
npm publish --access public
git push && git push --tags
```

## What Gets Published

Files included (defined in `package.json` -> `files`):
- ✅ `dist/` - Built package
- ✅ `README.md` - Documentation
- ✅ `LICENSE` - MIT License
- ✅ `package.json` - Package metadata

Files excluded (via `.npmignore`):
- ❌ `src/` - Source code
- ❌ `node_modules/` - Dependencies
- ❌ `tsconfig.json` - TypeScript config
- ❌ `*.log` - Log files

## Usage After Publication

Users can install with:

```bash
npm install @strudel-studio/visualizer
# or
yarn add @strudel-studio/visualizer
# or
pnpm add @strudel-studio/visualizer
```

## Troubleshooting

### Error: "You do not have permission to publish"

Solution: Make sure you're logged in with `npm whoami` and have access to the `@strudel-studio` organization.

### Error: "Package name already exists"

Solution: Change the package name in `package.json` or use a different scope (e.g., `@yourusername/visualizer`).

### Error: "EPUBLISHCONFLICT"

Solution: The version already exists. Bump the version with `npm version patch/minor/major`.

## Updating the Package

1. Make changes to the source code
2. Run `pnpm build` to rebuild
3. Update version: `npm version patch` (or minor/major)
4. Publish: `npm publish --access public`
5. Push to git: `git push && git push --tags`

## Unpublishing (Emergency Only)

```bash
npm unpublish @strudel-studio/visualizer@1.0.0
```

**Warning**: Unpublishing is permanent and discouraged. Only use for severe security issues or accidental publishes.

## Registry URLs

- **Production**: https://registry.npmjs.org/
- **Package Page**: https://www.npmjs.com/package/@strudel-studio/visualizer
- **Documentation**: Same as README.md on npm

## CI/CD (Optional)

You can automate publishing with GitHub Actions. Create `.github/workflows/publish.yml`:

```yaml
name: Publish Package

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: pnpm install
      - run: pnpm build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```
