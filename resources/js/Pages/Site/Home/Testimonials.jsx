import { motion } from "framer-motion";
import { FiUser, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Testimonials({ testimonials, title, description }) {
    const visible = 3;
    const cardWidth = 340;
    const gap = 24;
    const step = cardWidth + gap;
    const maxIndex = testimonials.length - visible;

    const [index, setIndex] = useState(0);
    const containerVariants = {
        hidden: {},
        show: {
            transition: { staggerChildren: 0.15 },
        },
    };

    return (
        <section className="py-20 bg-[#fafafa]" dir="rtl">

            <div className="max-w-6xl mx-auto text-center mb-12 px-4">
                <motion.h2
                    initial={{ opacity: 0, y: -15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl sm:text-3xl font-extrabold text-gray-800"
                >
                    {title || "آراء عملائنا"}
                </motion.h2>

                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.4 }}
                    className="w-12 h-1 bg-[var(--app-primary)] mx-auto my-3 rounded-full"
                />
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ delay: 0.15 }}
                    className="text-gray-500 text-sm sm:text-base mb-10 max-w-lg mx-auto"
                >
                    {description || "تجارب حقيقية من عملائنا الكرام"}
                </motion.p>

            </div>


            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.2 }}
                className="relative max-w-6xl mx-auto px-4">


                {testimonials.length >= 3 && (


                    <button
                        onClick={() => setIndex((i) => Math.min(i + 1, maxIndex))}
                        disabled={index === maxIndex}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20
          w-11 h-11 rounded-full bg-[var(--app-primary)] shadow-lg
          flex items-center justify-center
          disabled:opacity-30"
                    >
                        <FiChevronRight size={22} className="text-white" />
                    </button>

                )}
                {testimonials.length >= 3 && (
                    <button
                        onClick={() => setIndex((i) => Math.max(i - 1, 0))}
                        disabled={index === 0}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20
          w-11 h-11 rounded-full bg-[var(--app-primary)] shadow-lg
          flex items-center justify-center
          disabled:opacity-30"
                    >
                        <FiChevronLeft size={22} className="text-white" />
                    </button>

                )}
                <div className="overflow-hidden">
                    <motion.div
                        animate={{ x: index * step }}
                        transition={{
                            type: "spring",
                            stiffness: 90,
                            damping: 18,
                            mass: 0.9,
                        }}
                        className="flex gap-6"
                    >
                        {testimonials.map((item, i) => (
                            <div
                                key={i}
                                className="w-[340px] shrink-0
                bg-white rounded-2xl p-6
                border border-gray-100 shadow-sm"
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
                                                    className={`text-xs ${j < item.rating
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
            </motion.div>
        </section>
    );
}
