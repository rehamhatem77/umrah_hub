import { motion } from "framer-motion";
import { IoMdInformationCircleOutline } from "react-icons/io";

export default function IntroSection() {
    return (
<motion.section
      className="w-full bg-white py-12 md:py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-center">
        <div className="w-full max-w-[960px] px-4 flex flex-col items-center text-center">

          {/* Icon Animation */}
          <motion.div
            className="size-12 radius-icon rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary"
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {/* <span className="material-symbols-outlined text-2xl">
                </span> */}
                <IoMdInformationCircleOutline style={{width:"30px",height:"30px",color:"#17cf54"}} className="text-[var(--app-primary)]"/>
          </motion.div>

          {/* Title Animation */}
          <motion.h2
            className="text-[#111813] text-3xl font-bold leading-tight mb-6"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            نبذة عن Umrah Hub
          </motion.h2>

          {/* Paragraph Animation */}
          <motion.p
            className="text-gray-600 text-lg font-normal leading-relaxed max-w-[800px]"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            viewport={{ once: true }}
          >
            نحن منصة رائدة نسعى لتسهيل إجراءات العمرة للمسلمين في جميع أنحاء
            العالم. نجمع بين أحدث التقنيات والخبرة العميقة في قطاع السياحة الدينية
            لتوفير حلول مبتكرة وخدمات متكاملة تضمن راحة ضيوف الرحمن من لحظة
            التخطيط وحتى العودة إلى الديار سالمين.
          </motion.p>

        </div>
      </div>
    </motion.section>
    );
}
