type EventName =
  | "hero_whatsapp_click"
  | "service_selected"
  | "cta_whatsapp_click";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: EventName, payload?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, payload ?? {});
  }

  console.log(`[analytics] ${name}`, payload ?? {});
}
