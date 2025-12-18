type EventName =
  | "hero_whatsapp_click"
  | "service_selected"
  | "cta_whatsapp_click";

export function trackEvent(name: EventName, payload?: Record<string, unknown>) {
    
  console.log(`[analytics] ${name}`, payload ?? {});
}
