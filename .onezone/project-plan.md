# Project Plan: Add Hamburger Menu for Top Header Buttons

## Overview
Add a responsive hamburger menu that collapses the `Panel` action buttons on smaller screens while keeping them visible inline on larger screens.

## Current State
- The `RegisterTable` component renders three button groups inside `Panel.actions`:
  1. `CompanyFormButton` — "Compania ta"
  2. `RegisterFormButtonWithShadow` — plus icon
  3. `DownloadButton` — download icon + "Download Filtered"
- The `Panel` component renders actions in a horizontal flex row (`flex items-center gap-2`).
- On small screens these buttons wrap or overflow, degrading UX.

## Proposed Solution
Create a new `PanelActionsMenu` component in `modules/platform/components/panel-actions-menu/` that:
- Displays buttons inline on `md` breakpoint and up.
- Collapses buttons into a hamburger dropdown on smaller screens.
- Uses existing UI primitives (`Button`, `Icon`) and Tailwind CSS for styling.
- Uses `@radix-ui/react-popover` (already in dependencies) for accessible dropdown behavior.

## Tasks

### 1. Add `menu` icon to `Icon` component
- **File**: `modules/components/ui/icon.tsx`
- Add a `menu` (hamburger) SVG icon to the `icons` record.

### 2. Create `PanelActionsMenu` component
- **Directory**: `modules/platform/components/panel-actions-menu/`
- **Files**:
  - `panel-actions-menu.component.tsx` — responsive wrapper around actions
  - `index.ts` — barrel export
- **Behavior**:
  - **Desktop (`md`+)**: render children directly inline.
  - **Mobile (`< md`)**: render a single hamburger button that opens a popover containing the children.
  - Use `Popover` from `@radix-ui/react-popover`.
  - Close popover automatically when an action is triggered.

### 3. Integrate menu into `RegisterTable`
- **File**: `modules/platform/components/register-table/register-table.component.tsx`
- Wrap existing `actions` children with `<PanelActionsMenu>`.
- Ensure modals opened by buttons still work correctly (they are already portal-based).

### 4. Update barrel exports
- **File**: `modules/platform/components/index.ts`
- Export the new `PanelActionsMenu` component.

### 5. Add unit tests
- **File**: `modules/platform/components/panel-actions-menu/panel-actions-menu.component.test.tsx`
- Test cases:
  - Renders children inline on desktop (visible by default).
  - Renders hamburger button on mobile (or when collapsed).
  - Clicking hamburger opens the popover.
  - Clicking an action inside the popover closes it.

## Project Structure Changes
```
modules/
├── components/ui/
│   └── icon.tsx                 (+ menu icon)
└── platform/components/
    ├── index.ts                 (+ PanelActionsMenu export)
    ├── panel-actions-menu/
    │   ├── index.ts
    │   ├── panel-actions-menu.component.tsx
    │   └── panel-actions-menu.component.test.tsx
    └── register-table/
        └── register-table.component.tsx  (+ PanelActionsMenu wrapper)
```

## Next Steps
1. Add the `menu` icon to `Icon`.
2. Scaffold `PanelActionsMenu` with tests first (TDD).
3. Implement responsive toggle logic using Tailwind `hidden md:flex` / `flex md:hidden`.
4. Integrate into `RegisterTable`.
5. Run the test suite to verify no regressions.
