# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive test suite for parser/lexer/interpreter (200+ tests)
- JSDoc documentation for all core functions and hooks
- CONTRIBUTING.md with development guidelines
- CHANGELOG.md following Keep a Changelog format

## [1.0.0] - 2025-10-24

### Added
- Live coding music interface with Strudel integration
- Real-time audio visualization with intelligent code parsing
- WebSocket-based hot reload for pattern files
- Custom parser/lexer/interpreter for Strudel syntax
- Support for core Strudel features:
  - Mini-notation patterns (`s("bd sd hh cp")`)
  - Stack composition (`stack()`)
  - Modifiers (`.fast()`, `.slow()`, `.gain()`, `.room()`, etc.)
  - Sample selection (`:` notation)
  - Repetition (`*` and `!` notation)
  - Euclidean rhythms (`(3,8)` notation)
  - Silences (`~` and `_`)
  - Subgroups (`[]`)
  - Alternation (`<>`)
- Package `@strudel-studio/visualizer` for npm
  - Dual module support (CJS + ESM)
  - TypeScript declarations
  - Zero runtime dependencies
  - Build size: 29KB (CJS), 28KB (ESM)
- 96.2% test coverage across the codebase
- Complete CI/CD pipeline with GitHub Actions
  - Automated linting
  - Test execution with coverage reporting
  - Type checking
  - Build verification
  - Codecov integration
- Comprehensive documentation:
  - README.md with quick start guide
  - docs/configuration.md
  - docs/samples-guide.md
  - docs/testing.md
  - CLAUDE.md with code style guide
  - TODO.md with project roadmap
- UI components using shadcn/ui:
  - Button
  - Input
  - Dialog
  - Toast/Sonner
  - Separator
  - DropdownMenu
  - ScrollArea
  - ResizablePanelGroup
- File browser with WebSocket synchronization
- Pattern editor with CodeMirror 6
- Control panel with play/pause/stop controls
- Volume control
- Log panel for debugging
- Keyboard shortcuts:
  - `Ctrl+Enter` / `Cmd+Enter`: Play pattern
  - `Ctrl+.` / `Cmd+.`: Stop playback
  - `Ctrl+L` / `Cmd+L`: Toggle log panel

### Fixed
- Audio playback synchronization issues
- Visualizer timing alignment with Strudel patterns
- Silence handling in parser (now correctly ignores `~` and `_`)
- Sample selection with hold/repeat notation (`bd:5!2`)
- TypeScript strict mode compliance (zero errors)
- ESLint warnings (all resolved)
- WebSocket reconnection logic with exponential backoff

### Changed
- Migrated to React 19.2.0
- Upgraded to Vite 7.1.12
- Updated TypeScript to 5.9.3
- Switched to pnpm as package manager
- Refactored parser to handle mini-notation inside `s()` functions
- Improved error handling across all components
- Enhanced WebSocket connection stability

### Security
- Added MIT license with AGPL-3.0 notice for Strudel dependencies
- Implemented proper environment variable handling
- Configured strict TypeScript checks

## [0.1.0] - 2025-10-23

### Added
- Initial project setup
- Basic Strudel integration
- Simple audio playback
- File watcher server

---

## Version History

### Release Notes

#### v1.0.0 - Production Ready Release
This is the first production-ready release of Strudel Studio. The project includes:
- Complete live coding environment
- Real-time audio visualization
- Comprehensive test suite (96.2% coverage)
- Professional CI/CD pipeline
- npm package ready for publication
- Full documentation

**Breaking Changes**: None (initial release)

**Migration Guide**: N/A (initial release)

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

MIT License - See [LICENSE](./LICENSE) for details.

**Important**: While this package is MIT licensed, it depends on [@strudel/core](https://github.com/tidalcycles/strudel) which is licensed under AGPL-3.0. When distributing applications that include Strudel packages, you must comply with the AGPL-3.0 license.

---

**Note**: Versions follow [Semantic Versioning](https://semver.org/):
- MAJOR version for incompatible API changes
- MINOR version for backwards-compatible functionality additions
- PATCH version for backwards-compatible bug fixes

[Unreleased]: https://github.com/rmarsigli/strudel-studio/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/rmarsigli/strudel-studio/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/rmarsigli/strudel-studio/releases/tag/v0.1.0
