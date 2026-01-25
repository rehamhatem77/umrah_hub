import { FaBus, FaPlane, FaHotel, FaPassport } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Services() {
    const services = [
        {
            title: "استخراج التأشيرة",
            desc: "إنهاء جميع إجراءات التأشيرة بسرعة وسهولة",
            icon: <FaPassport />,
            gradient: "from-green-500 to-emerald-600",
        },
        {
            title: "حجوزات فنادق",
            desc: "فنادق مختارة بعناية بالقرب من الحرم",
            icon: <FaHotel />,
            gradient: "from-blue-500 to-indigo-600",
        },
        {
            title: "حجز طيران",
            desc: "عروض طيران مضمونة بأسعار تنافسية",
            icon: <FaPlane />,
            gradient: "from-purple-500 to-fuchsia-600",
        },
        {
            title: "نقل ومواصلات",
            desc: "تنقلات مريحة وآمنة بين المدن المقدسة",
            icon: <FaBus />,
            gradient: "from-orange-500 to-amber-600",
        },
    ];

    const containerVariants = {
        hidden: {},
        show: {
            transition: { staggerChildren: 0.15 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <section className="relative bg-gradient-to-b from-gray-50 to-white py-16 px-4 overflow-hidden">

            <div className="absolute -top-20 -left-20 w-56 h-56 bg-[var(--app-primary)]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-[var(--app-primary)]/10 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto text-center">

                <motion.h2
                    initial={{ opacity: 0, y: -15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl sm:text-3xl font-extrabold text-gray-800"
                >
                    خدماتنا المميزة
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
                    كل ما تحتاجه لرحلة عمرة مريحة ومنظمة في مكان واحد
                </motion.p>


                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 py-4"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -6 }}
                            className="group bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                        
                            <div className="relative mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                                <div
                                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${service.gradient} opacity-20 blur-md`}
                                />
                                <div
                                    className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${service.gradient} text-white flex items-center justify-center text-xl 
                  group-hover:scale-110 transition-transform duration-300 shadow-md`}
                                >
                                    {service.icon}
                                </div>
                            </div>

                            <h3 className="text-base font-bold text-gray-800 mb-1">
                                {service.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
