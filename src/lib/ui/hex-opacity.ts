/**
 * Hex color alpha transparency utility.
 * Safely converts 3-digit (#rgb) or 6-digit (#rrggbb) hex colors into 8-digit (#rrggbbaa) hex colors
 * with boundary-clamped opacity [0.0, 1.0].
 */
export function applyHexOpacity(hexColor: string, opacity: number): string {
  if (!hexColor || typeof hexColor !== 'string') return '#00000000';

  const clean = hexColor.replace(/^#/, '').trim();
  let r: string;
  let g: string;
  let b: string;

  if (clean.length === 3) {
    r = clean[0] + clean[0];
    g = clean[1] + clean[1];
    b = clean[2] + clean[2];
  } else if (clean.length >= 6) {
    r = clean.slice(0, 2);
    g = clean.slice(2, 4);
    b = clean.slice(4, 6);
  } else {
    return '#00000000';
  }

  // Verify valid hexadecimal digits
  if (!/^[0-9a-fA-F]{6}$/.test(`${r}${g}${b}`)) {
    return '#00000000';
  }

  const clampedAlpha = Number.isFinite(opacity) ? Math.max(0, Math.min(1, opacity)) : 0;
  const alphaHex = Math.round(clampedAlpha * 255)
    .toString(16)
    .padStart(2, '0')
    .toLowerCase();

  return `#${r}${g}${b}${alphaHex}`.toLowerCase();
}
