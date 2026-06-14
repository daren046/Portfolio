/** Préfixe BASE_URL pour les assets locaux (GitHub Pages /Portfolio/, etc.) */
export function resolveAssetUrl(path) {
  if (!path || path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path
  }

  const base = import.meta.env.BASE_URL || '/'
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  return `${normalizedBase}${path.replace(/^\//, '')}`
}
