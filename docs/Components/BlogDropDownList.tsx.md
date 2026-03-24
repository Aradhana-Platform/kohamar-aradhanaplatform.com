## 1. Overview

- **Purpose**: Describes the BlogDropDownList component, which renders a dropdown list of blog-related options (e.g., categories or sorting) to refine article views.
- **Problem it solves**: Provides a compact UI control for switching between different blog filters or views without navigating away.
- **High-level responsibility**: Display a list of options and notify parent components when the selection changes.

## 2. File Location

- Source: `Components/BlogDropDownList.tsx`

## 3. Key Components

- `BlogDropDownList` (default export)
  - Props (inferred):
    - `options`: Array of strings or objects representing available selections.
    - `selected`: Currently active selection.
    - `onChange`: Callback invoked when user selects a new option.
  - Behavior:
    - Renders a dropdown (likely a `<select>` or custom menu).
    - Highlights the current option and updates state on user interaction.

## 4. Execution Flow

1. Parent component renders `BlogDropDownList` with options and current value.
2. User opens the dropdown and chooses a different option.
3. `onChange` is called with the new value.
4. Parent updates its state (e.g., filter or sort) and re-renders the visible posts.

## 5. Data Flow

- **Inputs**: `options`, `selected` value from parent.
- **Outputs**: New selection value emitted via `onChange`.

## 6. Mermaid Diagrams

```mermaid
flowchart TD
    P[Parent Component] -->|props: options, selected, onChange| D[BlogDropDownList]
    U[User Click] --> D
    D -->|onChange(newValue)| P
    P -->|re-renders list| UI[Filtered Articles]
```

## 7. Error Handling & Edge Cases

- Assumes `options` is non-empty; UI behavior for empty lists depends on implementation (could render disabled or placeholder state).
- Parent should ensure `selected` is always a valid value from `options`.

## 8. Example Usage

- Example (conceptual):
  - `BlogDropDownList` used on the articles page to switch between categories ("All", "Devotion", "Teaching") or sort orders ("Newest", "Oldest").