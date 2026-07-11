# Design Taste Frontend: Senior UI/UX Engineering Framework

This is a comprehensive design system document establishing baseline configuration values and strict architectural constraints for premium frontend development.

## Core Configuration

The system operates with three adjustable parameters:
- **DESIGN_VARIANCE: 8** (asymmetric layouts favored)
- **MOTION_INTENSITY: 6** (fluid CSS animations)
- **VISUAL_DENSITY: 4** (balanced spacing)

Users can override these values through explicit requests.

## Key Architectural Requirements

**Dependency Management:** All third-party libraries must be verified in `package.json` before import, with installation commands provided when missing.

**Framework Standards:** React/Next.js with Server Components by default; Client Components required for interactive features with `"use client"` declarations.

**Styling:** Tailwind CSS (v3/v4) for 90% of styling, with strict version compatibility checks.

**Critical Mobile Fix:** The directive states, *"NEVER use `h-screen` for full-height Hero sections. ALWAYS use `min-h-[100dvh]`"* to prevent iOS Safari layout jumping.

## Design Engineering Rules

The framework prohibits several common AI biases:

- Emoji usage entirely banned; icons required instead
- "AI Purple/Blue" aesthetic strictly forbidden
- Generic centered hero sections prohibited when variance exceeds 4
- Three-column card layouts replaced with asymmetric alternatives
- Generic placeholder names and data rejected in favor of organic variation

## Advanced Motion Paradigm

The "Bento 2.0" section establishes perpetual micro-interactions using Framer Motion's spring physics (`stiffness: 100, damping: 20`) rather than linear easing, with five core animation archetypes: intelligent lists, command inputs, live status indicators, infinite carousels, and contextual UI toolbars.
