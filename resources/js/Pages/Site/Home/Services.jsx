import { FaBus, FaPlane, FaHotel, FaPassport } from "react-icons/fa";
import { motion } from "framer-motion";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import * as Fa6Icons from "react-icons/fa6";

export default function Services({ services }) {

    const getIconComponent = (iconName) => {
        return (
            FaIcons[iconName] ||
            FiIcons[iconName] ||
            Fa6Icons[iconName] ||
            null
        );
    };

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
                    className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 py-4"
                >
                    {Array.isArray(services) && services.map((service) => (


                        <motion.div
                            key={service.id}
                            variants={cardVariants}
                            whileHover={{ y: -6 }}
                            className="group bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300"
                        >

                            <div className="relative mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full bg-[var(--app-primary)]/20 blur-md" />

                                <div
                                    className="relative w-14 h-14 rounded-full bg-[var(--app-primary)] text-white
        flex items-center justify-center text-xl
        group-hover:scale-110 transition-transform duration-300 shadow-md"
                                >
                                    {(() => {
                                        const Icon = getIconComponent(service.icon);
                                        return Icon ? <Icon /> : null;
                                    })()}

                                </div>
                            </div>


                            <h3 className="text-base font-bold text-gray-800 mb-1">
                                {service.name}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
