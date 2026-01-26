import { motion } from "framer-motion";
import { CiFlag1 } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";

export default function VisionMissionSection() {
  return (
    <motion.section
      className="w-full bg-[#f8faf9] py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-center">
        <div className="w-full max-w-[1200px] px-4 md:px-10 lg:px-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Vision Card */}
            <motion.div
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-start gap-4"
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
            >
              <motion.div
                className="size-12 square-icon rounded-lg bg-primary/10 flex items-center justify-center text-primary"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 140, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* <span className="material-symbols-outlined text-2xl">
                  visibility
                </span> */}
                <MdOutlineRemoveRedEye style={{width:"30px",height:"30px",color:"#17cf54"}} className="text-[var(--app-primary)]"/>

              </motion.div>

              <h3 className="text-[#111813] text-2xl font-bold">رؤيتنا</h3>
              <p className="text-gray-600 leading-relaxed">
                أن نكون المنصة الرقمية الأولى عالمياً في خدمة ضيوف الرحمن، ومصدر
                الثقة الأول لكل من يرغب في أداء مناسك العمرة، من خلال تقديم تجربة
                مستخدم لا تضاهى.
              </p>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-start gap-4"
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
            >
              <motion.div
                className="size-12 square-icon rounded-lg bg-primary/10 flex items-center justify-center text-primary"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 140, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {/* <span className="material-symbols-outlined text-2xl">flag</span> */}
             <CiFlag1 style={{width:"30px",height:"30px",color:"#17cf54"}} className="text-[var(--app-primary)]"/>

              </motion.div>

              <h3 className="text-[#111813] text-2xl font-bold">رسالتنا</h3>
              <p className="text-gray-600 leading-relaxed">
                تسخير التكنولوجيا لتبسيط رحلة العمرة، وتوفير خيارات متنوعة تناسب
                كافة الفئات، مع الالتزام بأعلى معايير الجودة والشفافية في جميع
                تعاملاتنا.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.section>
  );
}
