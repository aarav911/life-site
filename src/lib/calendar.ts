export function openGoogleCalendar(title: string) {
  const now = new Date();
  const end = new Date(now.getTime() + 60 * 60 * 1000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const url = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(title)}&dates=${fmt(now)}/${fmt(end)}`;
  window.open(url, '_blank');
}
