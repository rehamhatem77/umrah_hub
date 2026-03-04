import PackageCard from "@/Components/PackageCard";
import toArabicNumbers from "@/Components/Utils/ArabicNumbers";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function AllPackages({ packages, title, buttonText }) {
    const cardWidth = 235;
    const gap = 3;
    const step = cardWidth + gap;
    // const maxIndex = Math.max(0, packages.length - visible);

    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(4);

    useEffect(() => {
        const updateVisible = () => {
            const width = window.innerWidth;
            if (width < 550) setVisible(1);
            else if (width > 790) setVisible(3);
            else if (width < 790) setVisible(2);
            else if (width < 1024) setVisible(2);
            else setVisible(4);
        };

        updateVisible();
        window.addEventListener("resize", updateVisible);
        return () => window.removeEventListener("resize", updateVisible);
    }, []);

    const maxIndex = Math.max(0, packages.length - visible);

    return (
        <section className="py-16 px-4 pattern-bg" dir="rtl">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.15 }}
                className="max-w-6xl mx-auto mb-8"
            >
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
                    {title || "تصفح جميع الباقات"}
                </h2>
            </motion.div>

            <div className="relative max-w-6xl mx-auto">
                {packages.length > visible && (
                    <button
                        onClick={() =>
                            setIndex((i) => Math.min(i + 1, maxIndex))
                        }
                        disabled={index === maxIndex}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20
              w-11 h-11 rounded-full
              bg-[var(--app-primary)]
              flex items-center justify-center
              shadow-xl
              disabled:opacity-40 disabled:cursor-not-allowed
              transition"
                    >
                        <FiChevronRight size={22} className="text-white" />
                    </button>
                )}

                {packages.length > visible && (
                    <button
                        onClick={() => setIndex((i) => Math.max(i - 1, 0))}
                        disabled={index === 0}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20
              w-11 h-11 rounded-full
              bg-[var(--app-primary)]
              flex items-center justify-center
              shadow-xl
              disabled:opacity-40 disabled:cursor-not-allowed
              transition"
                    >
                        <FiChevronLeft size={22} className="text-white" />
                    </button>
                )}

                <div className="overflow-hidden">
                    <motion.div
                        drag="x"
                        dragConstraints={{
                            left: 0,
                            right: maxIndex * step,
                        }}
                        dragElastic={0.1}
                        dragMomentum={true}
                        onDragEnd={(event, info) => {
                            const threshold = 80;

                            if (info.offset.x > threshold && index < maxIndex) {
                                setIndex((i) => Math.min(i + 1, maxIndex)); // next
                            } else if (
                                info.offset.x < -threshold &&
                                index > 0
                            ) {
                                setIndex((i) => Math.max(i - 1, 0)); // prev
                            }
                        }}
                        animate={{ x: index * step }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 20,
                            mass: 0.8,
                        }}
                        className="flex gap-3 cursor-grab active:cursor-grabbing"
                    >
                        {packages.map((pkg) => (
                            <div
                                key={pkg.id}
                                className="w-[235px] shrink-0
                  bg-white rounded-2xl
                  border border-gray-100
                  shadow-sm hover:shadow-md
                  transition overflow-hidden"
                            >
                                <PackageCard
                                    variant="compact"
                                    title={pkg.title}
                                    slug={pkg.slug}
                                    image={
                                        pkg.images?.length
                                            ? `/storage/${pkg.images[0].image_path}`
                                            : "/images/placeholder.jpg"
                                    }
                                    price={toArabicNumbers(pkg.price)}
                                    days={
                                        toArabicNumbers(pkg.duration_days) +
                                        (pkg.duration_days !== 14
                                            ? " أيام"
                                            : " يوم")
                                    }
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="mt-12 flex justify-center">
                <a
                    className="px-6 py-2 rounded-full bg-[var(--app-primary)] text-white text-sm font-semibold transition"
                    href="/packages"
                >
                    {buttonText || "عرض جميع الباقات"}
                </a>
            </div>
        </section>
    );
}
