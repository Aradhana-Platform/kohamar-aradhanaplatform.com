## 1. Overview

- **Purpose**: Renders a single core value card with icon, title, and description.
- **Problem it solves**: Encapsulates value card layout and hover styling for reuse across the About page.
- **High-level responsibility**: Accept a `CoreValue` and display its content with iconography.

## 2. File Location

- Source: `Components/about/ValueCard.tsx`

## 3. Key Components

- `Icons` object
  - Maps `CoreValue.icon` keys (`Book`, `Heart`, `Users`, `Target`, `MessageCircle`, `Award`, `Logo`) to SVG components.
- `ValueCard` (exported)
  - Props: `CoreValue` (`icon`, `title`, `desc`).
  - Internal state: `hovered` for visual transitions.
  - Renders:
    - Icon inside a colored square.
    - Title and description using theme colors and fonts.

## 4. Execution Flow

- On render:
  1. Picks the correct `Icon` based on the `icon` prop.
  2. Renders a card with padding and border/shadow state.
  3. Displays the icon, title, and description.
- On hover:
  1. `hovered` is toggled.
  2. Border color, shadow, and vertical translation animate.

## 5. Data Flow

- **Inputs**:
  - A `CoreValue` object from `CORE_VALUES`.
- **Processing**:
  - Simple mapping from enum-like `icon` strings to SVG components.
- **Outputs**:
  - JSX representing a single value card.
- **Dependencies**:
  - `CoreValue` and `T` from `./CoreValue`.

## 6. Mermaid Diagrams

```mermaid
flowchart TD
    A[CORE_VALUES] --> B[ValueCard]
    B --> C[Icons[icon]]
    B --> D[Render Title/Description]
```

## 7. Error Handling & Edge Cases

- Assumes `icon` matches a key in `Icons`; a mismatch would cause a runtime error.

## 8. Example Usage

```tsx
{CORE_VALUES.map(v => <ValueCard key={v.title} {...v} />)}
```