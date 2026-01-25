import PackageCard from "@/Components/PackageCard";
import { motion } from "framer-motion";

export default function AllPackages() {
    const tabs = [
        "الكل",
        "باقات العمرة",
        "المدينة المنورة",
        "باقات رمضان",
    ];

    const packages = [
        {
            title: "عمرة سريعة",
            price: 2900,
            date: "10 أيام",
            image:
                "https://images.unsplash.com/photo-1549640376-98f8c3f1c1a1",
        },
        {
            title: "باقة كبار السن",
            price: 5500,
            date: "15 يوم",
            image:
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        },
        {
            title: "عمرة شعبان",
            price: 4100,
            date: "12 يوم",
            image:
                "https://images.unsplash.com/photo-1589308078054-8326b3f6e4a8",
        },
        {
            title: "عمرة رجب",
            price: 3800,
            date: "10 أيام",
            image:
                "https://images.unsplash.com/photo-1591608516485-9c3d5e3c1c59",
        },
    ];

    return (
        <section className="py-16 px-4 bg-white">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.15 }}
                className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
                    تصفح جميع الباقات
                </h2>
            </motion.div>


            <div className="max-w-6xl mx-auto mb-10 flex gap-2 flex-wrap">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition
              ${index === 0
                                ? "bg-[var(--app-primary)] text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>


            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: false }}
                variants={{
                    show: { transition: { staggerChildren: 0.1 } },
                }}
                className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {packages.map((pkg, index) => (
                    <motion.div
                        key={index}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 },
                        }}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden"
                    >
                        <PackageCard
                            variant="compact"
                            title={pkg.title}
                            image={pkg.image}
                            price={pkg.price}
                            date={pkg.date}
                        />
                    </motion.div>
                ))}
            </motion.div>


            <div className="mt-12 flex justify-center">
                <button

                    className="px-6 py-2 rounded-full border bg-[var(--app-primary)] border-[var(--app-primary)] text-white text-sm font-semibold btn-primary transition"

                >
                    عرض جميع الباقات
                </button>
            </div>
        </section>
    );
}
