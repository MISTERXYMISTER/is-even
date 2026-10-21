# Architecture & Codebase Map: is-even

## 1. Overview
- **Repository URL:** https://github.com/MISTERXYMISTER/is-even
- **Owner / Upstream:** MISTERXYMISTER
- **Detected Toolchain:** node
- **Detected License:** MIT
- **Copyleft Flag:** false
- **Tracked Source Files:** 13

## 2. Toolchain & Verification Commands
- **Install Command:** `npm install` (executed in unprivileged container with `--ignore-scripts`)
- **Verification Commands:** `["npm test"]` (executed with `--network none`)

## 3. Directory Layout
```text
./AGENTS.md
./LICENSE
./README.md
./docs/ARCHITECTURE.md
./docs/super-board/runs/token-usage.log
./docs/super-board/runs/tokens-issue-1.log
./docs/super-board/runs/worker-build-1.log
./docs/super-board/runs/worker-qa-1.log
./docs/super-board/runs/worker-triage-1.log
./factory.project.json
./index.js
./package.json
./test.js

```

## 4. Operational Invariants
- Code changes occur strictly in throwaway containers (`factory-worker`) with zero capabilities.
- Testing executes in clean containers with zero host network access.
