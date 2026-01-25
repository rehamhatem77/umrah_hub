export default function toArabicNumbers(number) {
    if (number == null) return '';
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return number.toString().split('').map(d => arabicNumbers[d] ?? d).join('');
}