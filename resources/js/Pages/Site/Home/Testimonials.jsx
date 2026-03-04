import { motion } from "framer-motion";
import { FiUser, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Testimonials({ testimonials, title, description }) {

    const [visible, setVisible] = useState(3);
    const [index, setIndex] = useState(0);

    const cardWidth = 330;
    const gap = 24;
    const step = cardWidth + gap;

    
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setVisible(1);
            else if (window.innerWidth < 1024) setVisible(2);
            else setVisible(3);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const maxIndex = testimonials.length - visible;

    
    const next = () => {
        if (index >= maxIndex) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    };

    const prev = () => {
        if (index <= 0) {
            setIndex(maxIndex);
        } else {
            setIndex(index - 1);
        }
    };

  
    useEffect(() => {
        const interval = setInterval(() => {
            next();
        }, 5000);

        return () => clearInterval(interval);
    }, [index, maxIndex]);

    const handleDragEnd = (event, info) => {
        const threshold = 80;

        if (info.offset.x >threshold) {
            next();
        } else if (info.offset.x < - threshold) {
            prev();
        }
    };

    return (
        <section className="py-20 bg-[#fafafa]" dir="rtl">

            <div className="max-w-6xl mx-auto text-center mb-12 px-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
                    {title || "آراء عملائنا"}
                </h2>
                <div className="w-12 h-1 bg-[var(--app-primary)] mx-auto my-3 rounded-full" />
                <p className="text-gray-500 text-sm sm:text-base mb-10 max-w-lg mx-auto">
                    {description || "تجارب حقيقية من عملائنا الكرام"}
                </p>
            </div>

            <div className="relative max-w-6xl mx-auto px-4">

                {/* Right Button */}
                {testimonials.length > visible && (
                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20
                        w-11 h-11 rounded-full bg-[var(--app-primary)]
                        flex items-center justify-center shadow-lg"
                    >
                        <FiChevronRight size={22} className="text-white" />
                    </button>
                )}

                {/* Left Button */}
                {testimonials.length > visible && (
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20
                        w-11 h-11 rounded-full bg-[var(--app-primary)]
                        flex items-center justify-center shadow-lg"
                    >
                        <FiChevronLeft size={22} className="text-white" />
                    </button>
                )}

                <div className="overflow-hidden cursor-grab active:cursor-grabbing">
                    <motion.div
                        drag="x"
                        dragConstraints={{
                            left: 0,
                            right: maxIndex * step,
                        }}
                        dragElastic={0.15}
                        dragMomentum={true}
                        onDragEnd={handleDragEnd}
                        animate={{ x: index * step }}
                        transition={{
                            type: "spring",
                            stiffness: 120,
                            damping: 18,
                            mass: 0.8,
                        }}
                        className="flex gap-6"
                    >
                        {testimonials.map((item, i) => (
                            <div
                                key={i}
                                className="w-[340px] shrink-0 bg-white
                                rounded-2xl p-6 border border-gray-100 shadow-sm"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-[var(--app-primary)]
                                    flex items-center justify-center text-white">
                                        <FiUser size={18} />
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900">
                                            {item.customer_name}
                                        </h4>
                                        <div className="flex gap-1 mt-1">
                                            {[...Array(5)].map((_, j) => (
                                                <FaStar
                                                    key={j}
                                                    className={`text-xs ${
                                                        j < item.rating
                                                            ? "text-yellow-400"
                                                            : "text-gray-300"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {item.comment}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`w-2.5 h-2.5 rounded-full transition ${
                                i === index
                                    ? "bg-[var(--app-primary)] scale-110"
                                    : "bg-gray-300"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}