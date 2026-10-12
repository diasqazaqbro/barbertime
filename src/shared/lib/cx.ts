/** Joins truthy class names: cx(s.btn, isActive && s.active) */
export const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ')
