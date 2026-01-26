import { motion } from "framer-motion";
import { Inertia } from "@inertiajs/inertia";
export default function CTASection() {
    return (
        <motion.section
            className="w-full bg-white py-16 md:py-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
        >
            <div className="flex justify-center">
                <div className="w-full max-w-[960px] px-4">
                    <motion.div
                   
                        className="bg-gradient-to-r from-[#17cf54]/10 to-[#17cf54]/20 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-primary/20"
                        initial={{ y: 60, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        {/* Text Content */}
                        <motion.div
                            className="flex flex-col gap-3 text-center md:text-right"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            variants={{
                                hidden: {},
                                show: { transition: { staggerChildren: 0.15 } },
                            }}
                        >
                            <motion.h2
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0 },
                                }}
                                transition={{ duration: 0.5 }}
                                className="text-[#111813] text-2xl md:text-3xl font-bold leading-tight"
                            >
                                هل أنت جاهز لأداء مناسك العمرة؟
                            </motion.h2>

                            <motion.p
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0 },
                                }}
                                transition={{ duration: 0.5 }}
                                className="text-gray-700 text-base font-medium"
                            >
                                دعنا نساعدك في التخطيط لرحلتك الروحانية بكل يسر
                                وسهولة.
                            </motion.p>
                        </motion.div>

                        <motion.button
                         style={{background:"#17cf54"}}
                            onClick={() => Inertia.visit("/packages")}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.96 }}
                            animate={{
                                boxShadow: [
                                    "0 0 0px rgba(23,207,84,0.4)",
                                    "0 0 25px rgba(23,207,84,0.6)",
                                    "0 0 0px rgba(23,207,84,0.4)",
                                ],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="flex min-w-[160px] items-center justify-center rounded-lg h-12 px-6 bg-primary text-[#111813] text-base font-bold tracking-[0.015em]"
                        >
                            احجز باقتك الآن
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
