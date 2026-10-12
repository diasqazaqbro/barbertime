import { useState } from 'react'

export type Theme = 'light' | 'dark'

// Must match the inline script in index.html that applies the theme before first paint.
const STORAGE_KEY = 'barbertime:theme'

/** The <html data-theme> attribute is the source of truth; light is the default. */
const readTheme = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Storage blocked: the theme still switches, it just won't be remembered.
  }
}

export function useTheme() {
  const [theme, setTheme] = useState(readTheme)

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
  }

  return { theme, toggle }
}
