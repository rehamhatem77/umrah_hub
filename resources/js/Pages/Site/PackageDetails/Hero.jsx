import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toArabicNumbers from "@/Components/Utils/ArabicNumbers";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Hero({ data }) {
  const mainImage = data.image;
  const secondaryImages = data.images.filter(img => !img.is_main);
  const allImages = [ ...secondaryImages.map(img => img.url)];

  const [previewIndex, setPreviewIndex] = useState(null);

  const maxVisible = 5;
  const visibleImages = allImages.slice(0, maxVisible);
  const remainingCount = allImages.length - maxVisible;


  const getColSpan = (idx) => {
    const count = visibleImages.length;
    if (count === 1) return "col-span-2 row-span-1 md:col-span-4 md:row-span-1";
    if (count === 2) return "col-span-2 row-span-1 md:col-span-2 md:row-span-1"; 
    if (count === 3 && idx === 0) return "col-span-2 row-span-1 md:col-span-2 md:row-span-1"; 
    if (count === 4 && idx === 0) return "col-span-2 row-span-2 md:col-span-2 md:row-span-2"; 
    if (count >= 5 && idx === 0) return "col-span-2 row-span-2 md:col-span-2 md:row-span-2"; 
    return "col-span-1 row-span-1 md:col-span-1 md:row-span-1"; 
  };

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[350px] md:h-[400px] text-black">
        {visibleImages.map((img, idx) => (
          <motion.div
            key={idx}
            layout
            whileHover={{ scale: 1.02 }}
            className={`relative group overflow-hidden rounded-2xl cursor-pointer ${getColSpan(idx)}`}
            onClick={() => setPreviewIndex(idx)}
          >
            <div
              className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${img})` }}
            />

            {idx === 0 && <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />}

            {idx === maxVisible - 1 && remainingCount > 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  +{toArabicNumbers(remainingCount)} صور
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Preview Modal */}
      <AnimatePresence mode="wait">
        {previewIndex !== null && (
          <motion.div
            key="modal"
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewIndex(null)}
          >
            <motion.img
              key={allImages[previewIndex]}
              src={allImages[previewIndex]}
              alt="Preview"
              className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-lg"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            />

            {allImages.length > 1 && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute left-5 bg-green-600 hover:bg-green-700 px-4 py-4 rounded-full text-white text-3xl font-bold shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewIndex((prev) =>
                      prev === 0 ? allImages.length - 1 : prev - 1
                    );
                  }}
                >
                  <FaArrowLeft />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-5 bg-green-600 hover:bg-green-700 px-4 py-4 rounded-full text-white text-3xl font-bold shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewIndex((prev) =>
                      prev === allImages.length - 1 ? 0 : prev + 1
                    );
                  }}
                >
                  <FaArrowRight />
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}