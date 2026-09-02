const FALLBACK_SITE_URL = "https://studiolumi.company";

/**
 * Reads NEXT_PUBLIC_SITE_URL, falling back to the real production domain
 * whenever the env var is unset OR set to something that isn't a valid URL
 * (e.g. left blank in a hosting dashboard) — an invalid value here used to
 * crash the entire build via `new URL()`.
 */
export function getSiteUrl(): string {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return FALLBACK_SITE_URL;
  try {
    new URL(value);
    return value;
  } catch {
    return FALLBACK_SITE_URL;
  }
}
