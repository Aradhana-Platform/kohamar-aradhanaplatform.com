# SEO Optimization Reports — Kohamar (kohamar.aradhanaplatform.com)

This folder contains the long-term technical documentation for the SEO
infrastructure implemented across the project. Every meaningful change made
during the SEO overhaul is recorded here so that future engineers, SEO
specialists, and maintainers can reason about, debug, scale, and extend the
system without rediscovering context.

> **Project:** Kohamar — Thinking Scripturally
> **Domain:** https://kohamar.aradhanaplatform.com
> **Framework:** Next.js 16.1.6 (App Router) on Vercel, proxied by Cloudflare
> **Implementation window:** 2026-06-04 → 2026-06-05
> **Implementation owner:** Senior SEO Engineer + Next.js Architect (this engagement)

## Index of reports

| File | Purpose |
| --- | --- |
| [seo_audit_report.md](./seo_audit_report.md) | Phase 1 — the original audit: architecture, problems, severities. |
| [implementation_summary.md](./implementation_summary.md) | One-page executive summary of every change with SEO impact ratings. |
| [technical_changes.md](./technical_changes.md) | File-by-file diff narrative — what changed, where, and why. |
| [schema_implementation.md](./schema_implementation.md) | All JSON-LD types deployed and the routes they appear on. |
| [performance_optimization.md](./performance_optimization.md) | Phase 4 performance work, Core Web Vitals notes, caching. |
| [future_recommendations.md](./future_recommendations.md) | Roadmap, known limitations, suggested next phases. |
| [checklists.md](./checklists.md) | Google Search Console, Google Scholar, validation checklists. |
| [changes_summary.json](./changes_summary.json) | Machine-readable manifest of files and severities. |

## Reading order

1. Start with [implementation_summary.md](./implementation_summary.md) for the bird's-eye view.
2. Read [seo_audit_report.md](./seo_audit_report.md) to understand the **before** state.
3. Use [technical_changes.md](./technical_changes.md) for file-level work, [schema_implementation.md](./schema_implementation.md) for structured-data details, and [performance_optimization.md](./performance_optimization.md) for performance work.
4. Operate the site against [checklists.md](./checklists.md).
5. Plan the next sprint from [future_recommendations.md](./future_recommendations.md).

## Maintenance rules

- Update [changes_summary.json](./changes_summary.json) whenever this folder's contents
  meaningfully change so external tooling can diff it.
- Treat [lib/seo/config.ts](../lib/seo/config.ts) as the **single source of truth**
  for domain, author, organization, and default keywords. Update there once,
  every downstream metadata picks it up.
- Never modify content frontmatter solely for SEO — extend
  [lib/seo/metadata.ts](../lib/seo/metadata.ts) instead.
