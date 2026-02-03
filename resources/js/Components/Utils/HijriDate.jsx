import toArabicNumbers from "@/Components/Utils/ArabicNumbers";

export function formatHijriDate(dateStr) {
  if (!dateStr) return "غير متوفر";

  const date = new Date(dateStr);
  if (isNaN(date)) return "غير متوفر";

  const hijriString = new Intl.DateTimeFormat(
    "ar-SA-u-ca-islamic",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  ).format(date);
  const match = hijriString.match(
    /(\d+)\s+([^\d\s]+)\s+(\d+)/
  );

  if (!match) return hijriString;

  const [, day, month, year] = match;

  return `${toArabicNumbers(day)} ${month} ${toArabicNumbers(year)}`;
}
