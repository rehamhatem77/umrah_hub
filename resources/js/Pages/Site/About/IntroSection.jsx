// import { motion } from "framer-motion";
// import { IoMdInformationCircleOutline } from "react-icons/io";

// export default function IntroSection() {
//     return (
// <motion.section
//       className="w-full bg-white py-12 md:py-16"
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       viewport={{ once: true }}
//     >
//       <div className="flex justify-center">
//         <div className="w-full max-w-[960px] px-4 flex flex-col items-center text-center">

//           {/* Icon Animation */}
//           <motion.div
//             className="size-12 radius-icon rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary"
//             initial={{ scale: 0, rotate: -90 }}
//             whileInView={{ scale: 1, rotate: 0 }}
//             transition={{ type: "spring", stiffness: 120, delay: 0.1 }}
//             viewport={{ once: true }}
//           >
//             {/* <span className="material-symbols-outlined text-2xl">
//                 </span> */}
//                 <IoMdInformationCircleOutline style={{width:"30px",height:"30px",color:"#17cf54"}} className="text-[var(--app-primary)]"/>
//           </motion.div>

//           {/* Title Animation */}
//           <motion.h2
//             className="text-[#111813] text-3xl font-bold leading-tight mb-6"
//             initial={{ y: 40, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             viewport={{ once: true }}
//           >
//             نبذة عن Umrah Hub
//           </motion.h2>

//           {/* Paragraph Animation */}
//           <motion.p
//             className="text-gray-600 text-lg font-normal leading-relaxed max-w-[800px]"
//             initial={{ y: 40, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.35 }}
//             viewport={{ once: true }}
//           >
//             نحن منصة رائدة نسعى لتسهيل إجراءات العمرة للمسلمين في جميع أنحاء
//             العالم. نجمع بين أحدث التقنيات والخبرة العميقة في قطاع السياحة الدينية
//             لتوفير حلول مبتكرة وخدمات متكاملة تضمن راحة ضيوف الرحمن من لحظة
//             التخطيط وحتى العودة إلى الديار سالمين.
//           </motion.p>

//         </div>
//       </div>
//     </motion.section>
//     );
// }
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function IntroSection({data }) {
  const [expanded, setExpanded] = useState(false);
   const defaultData = {
    intro_image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28",
    intro_title: "قصتنا",
    intro_short_desc: "لطالما كان العثور على باقة العمرة المناسبة تحديًا مليئًا بالتردد وعدم اليقين. من هنا وُلدت فكرة عمرة هب، انطلاقًا من رؤية عميقة في سد الفجوة بين المعتمرين ووكالات السفر الموثوقة.",
    intro_long_desc: "نحن نؤمن بأن الرحلة إلى بيت الله الحرام يجب أن تكون صافية الذهن، خالية من تعقيدات الحجوزات واللوجستيات. لهذا قمنا بتسخير التقنية لخدمة ضيوف الرحمن، وتوفير تجربة سلسة تتيح لك التركيز الكامل على الجانب الروحي.",
    intro_badge: "شريك معتمد",
    intro_badge_sub: "وزارة الحج"
  };
  const image = data?.intro_image || defaultData.intro_image;
  const title = data?.intro_title || defaultData.intro_title;
  const shortDesc = data?.intro_description || defaultData.intro_short_desc;
  const longDesc = data?.intro_description_long || defaultData.intro_long_desc;
  const badge = data?.intro_badge || defaultData.intro_badge;
  const badgeSub = data?.intro_badge_sub || defaultData.intro_badge_sub;

  return (
    <motion.section
      className="w-full py-20 pattern-bg"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
       viewport={{ once: false}}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
             viewport={{ once: false}}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-full h-full bg-[#F6F1E8] rounded-2xl" />

            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={image.startsWith("http") ? image : `/storage/${image}`}
                alt={title}
                className="w-full h-[360px] object-cover"
              />
            </div>

            <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-md px-5 py-3 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#1B5E20] font-bold">
                ✓
              </div>
              <div className="text-right leading-tight">
                <p className="text-sm text-gray-500">{badge} </p>
                <p className="text-base font-semibold text-gray-800">
                 {badgeSub}
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
        
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <h3 className="text-[#1B5E20] font-semibold text-4xl mb-3">
             {title}
            </h3>

            <div className="w-14 h-[3px] bg-[#E2B93B] mb-8" />

            <p className="text-[#5F6F73] text-lg leading-[1.9] mb-5 max-w-[500px]">
              {shortDesc}
            </p>
            <AnimatePresence>
              {expanded && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-[#5F6F73] text-lg leading-[1.9] mb-6 max-w-[500px]"
                >
                  {longDesc}
                </motion.p>
              )}
            </AnimatePresence>
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 text-[#1B5E20] text-lg font-medium hover:opacity-80 transition"
            >
              {expanded ? "عرض أقل" : "اقرأ المزيد عن تأسيسنا"}
              <span
                className={`text-xl transition-transform ${
                  expanded ? "rotate-90" : ""
                }`}
              >
                ←
              </span>
            </button>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
