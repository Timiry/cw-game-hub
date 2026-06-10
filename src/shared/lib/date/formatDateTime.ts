export const formatDateTime = (date: string): string => {
  const dateObj = new Date(date);

  const pad = (num: number) => String(num).padStart(2, "0");

  const day = pad(dateObj.getDate());
  const month = pad(dateObj.getMonth() + 1);
  const year = dateObj.getFullYear();
  const hours = pad(dateObj.getHours());
  const minutes = pad(dateObj.getMinutes());

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};
