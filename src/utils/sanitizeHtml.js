/**
 * Utility to sanitize CMS HTML descriptions.
 * Preserves <style> blocks, standard HTML elements, tables, headings, links, etc.,
 * while stripping <script> tags, inline javascript handlers (onclick, onload, etc.),
 * and unsafe href attributes (javascript:).
 */
export function sanitizeHtml(htmlContent) {
  if (!htmlContent || typeof htmlContent !== "string") return "";

  let clean = htmlContent;

  // 1. Remove <script>...</script> tags
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

  // 2. Remove inline event handlers (e.g. onclick="...", onload='...')
  clean = clean.replace(/\s*on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");

  // 3. Remove javascript: links
  clean = clean.replace(/href\s*=\s*["']?\s*javascript:[^"'>]*["']?/gi, 'href="#"');

  // 4. Remove iframe/embed/object tags if any
  clean = clean.replace(/<(?:iframe|embed|object)\b[^<]*(?:(?!<\/(?:iframe|embed|object)>)<[^<]*)*<\/(?:iframe|embed|object)>/gi, "");

  return clean;
}
