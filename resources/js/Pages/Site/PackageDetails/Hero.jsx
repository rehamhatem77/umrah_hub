import toArabicNumbers from "@/Components/Utils/ArabicNumbers";

export default function Hero({ data }) {
  const mainImage = data.image; // main image
  const secondaryImages = data.images.filter(img => !img.is_main);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[500px] text-black">
      {/* Main Image */}
      <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl">
        <div
          className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${mainImage})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-text-dark flex items-center gap-1">
          <span className="material-symbols-outlined text-sm"></span>{" "}
          مشاهدة الكل ({toArabicNumbers (data.images.length)})
        </div>
      </div>

      {/* Secondary Images */}
      {secondaryImages.map((img, idx) => (
        <div key={img.id} className="relative group overflow-hidden rounded-2xl hidden md:block">
          <div
            className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${img.url})` }}
          ></div>

          {/* Show overlay on the last image */}
          {idx === secondaryImages.length - 1 && secondaryImages.length > 1 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <span className="text-white font-bold text-lg">
                +{secondaryImages.length - 1} صور
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
