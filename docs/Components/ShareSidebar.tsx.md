## 1. Overview

- **Purpose**: Renders a sticky sidebar with a share button for articles.
- **Problem it solves**: Provides a consistent, reusable sharing UI for blog posts, leveraging native browser sharing when available.
- **High-level responsibility**: Display label and share button that triggers `navigator.share` or logs a cancellation.

## 2. File Location

- Source: `Components/ShareSidebar.tsx`

## 3. Key Components

- `ShareSidebar` (default export)
  - Props: `{ url: string; blogTitle: string }`.
  - State: `hovered` to adjust button styling on hover.
  - Defines `links` array with a single logical share action.
  - Renders:
    - A sticky container with a "Share" label.
    - A styled button that invokes the native share dialog.
- `ShareIcon`
  - Inline SVG icon representing a share arrow.
- `C`
  - Local color constants for navy and gray.

## 4. Execution Flow

- On render:
  1. A sticky column is positioned at a fixed offset from the top of the viewport.
  2. A label and share button are displayed.
- On button click:
  1. `handleNativeShare` checks for `navigator.share`.
  2. If available, it calls `navigator.share({ title: blogTitle, url })`.
  3. If the user cancels, a message is logged; otherwise, control returns silently.

## 5. Data Flow

- **Inputs**:
  - Article URL and title.
- **Processing**:
  - Passes props into the native share API.
- **Outputs**:
  - UI side effects (share sheet or no-op if unsupported).
- **Dependencies**:
  - Browser `navigator.share` API.
  - React `useState`.

## 6. Mermaid Diagrams

```mermaid
flowchart TD
    A[Share Button Click] --> B[Check navigator.share]
    B -->|Supported| C[navigator.share({ title, url })]
    B -->|Not Supported| D[No Native Share]
```

## 7. Error Handling & Edge Cases

- Catches errors from `navigator.share` by logging a cancellation message.
- If `navigator.share` is not present, clicking the button has no visible effect.

## 8. Example Usage

- Used in article detail pages to provide share functionality:

```tsx
<ShareSidebar url={blogUrl} blogTitle={blogTitle} />
```