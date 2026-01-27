// export default function toArabicNumbers(number) {
//     if (number == null) return '';
//     const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
//     return number.toString().split('').map(d => arabicNumbers[d] ?? d).join('');
// }

export default function toArabicNumbers(value) {
  if (value == null) return '';

  const integer = Math.trunc(Number(value));

  if (isNaN(integer)) return '';

  const arabicNumbers = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];

  return integer
    .toString()
    .split('')
    .map(d => arabicNumbers[d] ?? d)
    .join('');
}
