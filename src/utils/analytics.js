// src/utils/analytics.js

export function sendCustomEvent(eventName, params = {}) {
  // Don't run during SSR (Gatsby builds server-side first)
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV === "development") {
    console.log(`[analytics] ${eventName}`, params);
  }

  window.gtag("event", eventName, params);
}

export const trackFooterLink = (pathname, url, text) => () =>
  sendCustomEvent("footer_link_click", {
    source_path: pathname,
    link_url: url,
    link_text: text,
    link_type: url.startsWith("http") ? "external" : "internal",
  });

export const trackNavLink = (pathname, url, text, navType) => () =>
  sendCustomEvent("nav_link_click", {
    source_path: pathname,
    link_url: url,
    link_text: text,
    nav_type: navType, // "desktop" | "mobile"
  });