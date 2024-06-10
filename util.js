export function getRemainingDividendDates(lastDividendDateStr) {
  const lastDividendDate = new Date(lastDividendDateStr);
  const currentYear = new Date().getFullYear();

  let remainingDates = [lastDividendDate];

  while (lastDividendDate.getFullYear() === currentYear) {
    lastDividendDate.setMonth(lastDividendDate.getMonth() + 3);

    if (lastDividendDate.getFullYear() === currentYear) {
      remainingDates.push(new Date(lastDividendDate));
    }
  }

  return remainingDates.length;
}
