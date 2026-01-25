import PackageCard from "@/Components/PackageCard";
import { motion } from "framer-motion";
import { FiMapPin, FiClock, FiUsers } from "react-icons/fi";

export default function SpecialPackages() {
    const packages = [
        {
            title: "رحلة العائلة الروحانية",
            location: "مكة المكرمة والمدينة المنورة",
            type: "عائلة",
            days: 14,
            price: 12500,
            image:
                "https://images.unsplash.com/photo-1589308078054-8326b3f6e4a8",
            badge: "⭐ 5 نجوم",
        },
        {
            title: "باقة العمرة السريعة",
            location: "مكة المكرمة",
            type: "4 أشخاص",
            days: 7,
            price: 3200,
            image:
                "https://images.unsplash.com/photo-1608138278209-6e8b3c5c4e7d",
            badge: "الأكثر طلبًا",
        },
        {
            title: "باقة النخبة الشاملة",
            location: "المدينة المنورة",
            type: "شخصين",
            days: 10,
            price: 7650,
            image:
                "https://images.unsplash.com/photo-1549640376-98f8c3f1c1a1",
            badge: "خصم 10%",
        },
    ];

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
                        باقات مميزة ومختارة
                    </motion.h2>


                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ delay: 0.15 }}
                        className="text-gray-500 text-sm sm:text-base mb-10 max-w-lg mx-auto"
                    >
                        أفضل العروض الحصرية لهذا الموسم
                    </motion.p>

                </div>

                <a
                    href="/packages"
                    className=" btn-primary group flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--app-primary)] bg-[var(--app-primary)] text-white text-sm font-semibold transition"
                >
                    عرض الكل
                    <span className="group-hover:-translate-x-1 transition">←</span>
                </a>
            </div>

            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.2 }}
                variants={{
                    show: { transition: { staggerChildren: 0.15 } },
                }}
                className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {packages.map((pkg, index) => (
                    <motion.div
                        key={index}
                        variants={{
                            hidden: { opacity: 0, y: 40 },
                            show: { opacity: 1, y: 0 },
                        }}
                        whileHover={{ y: -6 }}
                        className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                    >

                        <PackageCard
                            title={pkg.title}
                            image={pkg.image}
                            price={pkg.price}
                            badge={pkg.badge}
                            location={pkg.location}
                            days={pkg.days}
                            type={pkg.type}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
