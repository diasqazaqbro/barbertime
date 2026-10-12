import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // Features/entities map to Lab 2 UML use cases (plus the theme toggle), so a slice used
    // by a single page or widget is intentional — not premature extraction.
    rules: { 'fsd/insignificant-slice': 'off' },
  },
])
