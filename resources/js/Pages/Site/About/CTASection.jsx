import { motion } from "framer-motion";
import { Inertia } from "@inertiajs/inertia";
export default function CTASection({ data }) {

    const cta_title = data?.action_title || "هل أنت جاهز لأداء مناسك العمرة؟";
    const cta_desc = data?.action_desc || "دعنا نساعدك في التخطيط لرحلتك الروحانية بكل يسر وسهولة.";
    const cta_btn = data?.action_btn_txt || "احجز باقتك الآن";

    return (
        <motion.section
            className="pattern-bg w-full py-16 md:py-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false, amount: 0.4 }}

        >
            <div className="flex justify-center">
                <div className="w-full max-w-[960px] px-4">
                    <motion.div
                        className="bg-gradient-to-r from-[#17cf54]/10 to-[#17cf54]/20 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-primary/20"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.4 }}
                        transition={{
                            type: "spring",
                            stiffness: 90,
                            damping: 18
                        }}
                    >

                        <motion.div
                            className="flex flex-col gap-3 text-center md:text-right"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, amount: 0.4 }}

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
                                {cta_title}
                            </motion.h2>

                            <motion.p
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0 },
                                }}
                                transition={{ duration: 0.5 }}
                                className="text-gray-700 text-base font-medium"
                            >
                                {cta_desc}
                            </motion.p>
                        </motion.div>

                        <motion.button
                            style={{ background: "#17cf54" }}
                            onClick={() => Inertia.visit("/packages")}
                            animate={{
                                scale: [1, 1.06, 1],
                                y: [0, -4, 0],
                            }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            whileHover={{
                                scale: 1.08,
                                transition: { duration: 0.2, ease: "easeOut" }
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="flex min-w-[160px] items-center justify-center rounded-lg h-12 px-6 text-[#111813] text-base font-bold tracking-[0.015em]"
                        >

                            {cta_btn}

                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
