import PackageCard from "@/Components/PackageCard";
import toArabicNumbers from "@/Components/Utils/ArabicNumbers";
import { motion } from "framer-motion";
import { FiMapPin, FiClock, FiUsers } from "react-icons/fi";

export default function SpecialPackages({ specialPackages, title, description, buttonText  }) {

    return (
        <section className="py-20 px-4 bg-[#fafafa]">

            <div className="max-w-6xl mx-auto mb-6 flex items-start justify-between">

                <div>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ delay: 0.15 }}
                        className="text-2xl sm:text-3xl font-extrabold text-gray-800">
                       {title || "باقات مميزة ومختارة"}
                    </motion.h2>


                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ delay: 0.15 }}
                        className="text-gray-500 text-sm sm:text-base mb-10 max-w-lg mx-auto"
                    >
                        {description || "أفضل العروض الحصرية لهذا الموسم"}
                    </motion.p>

                </div>

                <a
                     href="/packages?filter=special"
                    className=" btn-primary group flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--app-primary)] bg-[var(--app-primary)] text-white text-sm font-semibold transition"
                >
                   {buttonText || "عرض كل المميز"}
                    <span className="group-hover:-translate-x-1 transition">←</span>
                </a>
            </div>

            {Array.isArray(specialPackages) && specialPackages.length > 0 ? (
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={{
                        show: { transition: { staggerChildren: 0.15 } },
                    }}
                    className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {specialPackages.map((pkg) => (
                        <motion.div
                            key={pkg.id}
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                show: { opacity: 1, y: 0 },
                            }}
                            whileHover={{ y: -6 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                        >
                            <PackageCard
                                title={pkg.title}
                                offerCode={pkg.offer_code}
                                slug={pkg.slug}
                                price={toArabicNumbers(pkg.price)}
                                rating={pkg.rating}
                                days={
                                    toArabicNumbers(pkg.duration_days) +
                                    (pkg.duration_days !== 14? " أيام":" يوم")
                                }
                                image={
                                    pkg.images?.length
                                        ? `/storage/${pkg.images[0].image_path}`
                                        : "/images/placeholder.jpg"
                                }
                                location={
                                    pkg.hotels?.length
                                        ? pkg.hotels.map(h => h.city).join(" - ")
                                        : "مكة المكرمة"
                                }
                                badge="مميز"
                                type={
                                    toArabicNumbers(pkg.available_places) +
                                    (pkg.available_places <= 10 ? " مقاعد" : " مقعد")
                                }
                                date={pkg.start_date}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-6xl mx-auto py-20 text-center"
                >
                    <p className="text-gray-400 text-lg font-semibold">
                        لا توجد عروض متاحة حالياً
                    </p>
                </motion.div>
            )}

        </section>
    );
}
