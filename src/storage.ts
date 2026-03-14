export function isNative() {
  return typeof (window as (Window & { Capacitor?: unknown })).Capacitor !== "undefined"
}
