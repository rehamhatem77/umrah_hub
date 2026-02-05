import { FiCheckCircle, FiCheck } from "react-icons/fi";
import { MdCancel, MdClose } from "react-icons/md";
import { motion } from "framer-motion";

export default function InclusionsSection({ price_not_contain, price_contain }) {
  const included = price_contain
    ? price_contain.split(",").map(item => item.trim()).filter(Boolean)
    : [
        "تذاكر الطيران (ذهاب وعودة) على الخطوط السعودية",
        "تأشيرة العمرة والتأمين الطبي",
        "الاستقبال والتوديع في المطار",
        "جميع التنقلات الداخلية بباصات حديثة",
        "وجبتي الإفطار والسحور يومياً",
      ];

  const excluded = price_not_contain
    ? price_not_contain.split(",").map(item => item.trim()).filter(Boolean)
    : [
        "المصاريف الشخصية والهدايا",
        "خدمات الغسيل والكي في الفندق",
        "أي وجبات إضافية غير مذكورة",
      ];

  const container = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const list = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      id="inclusions"
      className="grid md:grid-cols-2 gap-8 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-gray-900"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      {/* Included */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900">
          <FiCheckCircle className="text-green-600 text-xl" />
          يشمل السعر
        </h3>

        <motion.ul
          className="space-y-3"
          variants={list}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          {included.map((itemText, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-3 text-sm text-gray-800"
              variants={item}
            >
              <FiCheck className="text-green-600 mt-0.5 shrink-0" />
              <span>{itemText}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Excluded */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900">
          <MdCancel className="text-red-400 text-xl" />
          لا يشمل السعر
        </h3>

        <motion.ul
          className="space-y-3"
          variants={list}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          {excluded.map((itemText, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-3 text-sm text-gray-500"
              variants={item}
            >
              <MdClose className="text-red-400 mt-0.5 shrink-0" />
              <span>{itemText}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}
