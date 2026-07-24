# Lumen&Flow Website

## Command policy

- Do not run pnpm commands, shell commands, terminal commands, scripts, builds, tests, linters, formatters, type checks, or validation commands unless the user explicitly authorizes commands in the current request.
- Use direct file-editing tools for requested changes without invoking commands.
- When commands are not authorized, clearly report that validation was not run because of this policy.

## Stack and workflow

- Use pnpm only and Node.js 22.
- Retain Next.js 16, React 19, TypeScript strict mode, Tailwind CSS 4, the App Router, and the `src/` directory.
- Do not upgrade dependencies, replace the lockfile, or add a CMS, database, component library, or external state library without instruction.
- Use React Server Components by default. Add `"use client"` only for browser state, effects, or event handlers.
- Keep routes focused on composition, reusable layouts in `src/components/layout`, reusable sections in `src/components/sections`, primitives in `src/components/ui`, and typed static content in `src/content`.

## Routes

- `/`
- `/technology`
- `/marketing`
- `/creatives`
- `/case-studies`
- `/case-studies/[slug]`

## Brand

- Volt Time: `#C8FF00`
- Abyss Navy: `#081C30`
- Cool Frost: `#F0F2F5`
- Steel Grey: `#9CA3AF`
- Headings use Apfel Grotezk; expressive accents use Apfel Grotezk Regular Brukt; body, navigation, labels, buttons, and subheadings use Plus Jakarta Sans.
- Do not introduce other brand colors, generic agency gradients, or invented marketing claims.

## Validation

The standard validation commands are:

```bash
pnpm lint
pnpm typecheck
pnpm format:check
pnpm build
```

Do not run these or any other commands unless the user explicitly authorizes commands in the current request. Do not claim a command passed unless it was run.

## Deployment and safety

- Production uses the standalone Docker output on `0.0.0.0:3000` through Coolify.
- Keep `/api/health` available for container health checks.
- Never copy local environment files into the image or expose secrets through `NEXT_PUBLIC_*`.
- Never modify secrets, run destructive commands, or commit/push unless explicitly requested.
- Preserve existing assets and deliberate design work.
