# Playwright Automation

Short, focused UI automation suite using Playwright Test + TypeScript for Cymulate flows (login, findings export, downloads), with videos and HTML report enabled.

## Quick Start
- Install dependencies:
	- `npm install`
- Configure environment (create `.env` in project root):
	- `BASE_URL=https://app.cymulate.com`
	- `ADMIN_USERNAME=...`
	- `ADMIN_PASSWORD=...`
	- `CANDIDATE_EMAIL=...`
	- `CANDIDATE_PASSWORD=...`

## Run Tests
- Full UI suite (headed, single worker):
	- `npm run test:ui`
- Single test (findings export + CSV compare):
	- `npx playwright test tests/ui/dashboard.spec.ts`

## Reports & Artifacts
- HTML report: `npx playwright show-report`
- Videos: saved under `test-results/` (configured with `video: 'on'`).
- Traces: collected on first retry.

## What’s Covered
- Login via custom fixtures
- Findings table interactions (row select, value extraction)
- Export overlay controls (search/select columns, export)
- Download manager validations and file download
- CSV parsing and comparison (`utils/csv-helper.ts`)

## Notes
- Env loading is handled in `utils/env-setup.ts` (reads root `.env`).
- Default downloads path for CSV is your OS Downloads folder.