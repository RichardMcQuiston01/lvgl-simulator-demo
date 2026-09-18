/**
 * Round-trips scene JSON text through a URL-safe base64 fragment
 * (`#scene=...`) so a scene can be shared by link. Uses `TextEncoder`/
 * `TextDecoder` rather than the deprecated `escape`/`unescape` trick, so
 * arbitrary UTF-8 (e.g. non-ASCII label text) survives the round trip.
 */

export function encodeSceneForUrl(sceneText: string): string {
  const bytes = new TextEncoder().encode(sceneText);
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeSceneFromUrl(encoded: string): string {
  const padded = encoded.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
