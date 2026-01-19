export default function StatusPill({ label, count = 0, active = false, onClick }) {
  const toArabicNumbers = (num) => {
    const arabic = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    return num.toString().split('').map(d => arabic[d] ?? d).join('');
  };

  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-5 py-1 rounded-full font-bold transition 
        ${active
          ? 'bg-[var(--app-primary)] text-white shadow-sm border-[var(--app-primary)]'
          : 'bg-white border border-slate-200 text-slate-600 hover:border-[var(--app-primary)]/50'
        }`}
    >
      {label} ({toArabicNumbers(count)})
    </button>
  );
}
