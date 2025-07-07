export function getTodayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function getFutureISO(months: number) {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}

export function parseDateToBrasilia(dateStr: string): Date {
  // dateStr no formato 'YYYY-MM-DD'
  const [year, month, day] = dateStr.split("-").map(Number);
  // Cria a data no horário de Brasília (UTC-3)
  return new Date(Date.UTC(year, month - 1, day, 3, 0, 0));
}
