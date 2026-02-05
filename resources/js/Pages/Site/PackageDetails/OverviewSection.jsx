import { iconsMap } from "@/Components/IconPicker";
import { motion } from "framer-motion";

export default function OverviewSection({ data }) {
  const facilities = data?.features || [
    { icon: "MdFlight", name: "تذاكر طيران" },
    { icon: "MdHotel", name: "فنادق ٥ نجوم" },
    { icon: "MdDirectionsBus", name: "نقل VIP" },
    { icon: "MdRestaurant", name: "إفطار وسحور" },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      id="overview"
      className="flex flex-col gap-6 text-gray-900"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
    >
      {/* Title */}
      <motion.h3
        className="text-2xl font-bold"
        variants={itemVariants}
      >
        نظرة عامة
      </motion.h3>

      {/* Description */}
      <motion.p
        className="text-gray-600 leading-relaxed text-lg"
        variants={itemVariants}
      >
        {data.desc
          ? data.desc
          : `استمتع بروحانية العشر الأواخر في مكة المكرمة مع باقة مصممة خصيصاً لراحتك.
          تشمل هذه الباقة إقامة فاخرة قريبة من الحرم المكي، وتنقيلات خاصة بأحدث
          الباصات، مع مرشدين ذوي خبرة لمساعدتك في أداء المناسك بكل يسر وسهولة. تجربة
          لا تُنسى تجمع بين الروحانية والرفاهية.`}
      </motion.p>

      {/* Facilities */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2"
        variants={containerVariants}
      >
        {facilities.map((facility, index) => {
          const IconComponent = iconsMap[facility.icon];
          if (!IconComponent) return null;

          return (
            <motion.div
              key={index}
              className="p-4 bg-gray-100 rounded-xl flex flex-col items-center justify-center text-center gap-2"
              variants={itemVariants}
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              <motion.div
                whileHover={{ rotate: -5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <IconComponent className="text-green-600 text-3xl" />
              </motion.div>

              <span className="font-bold text-sm text-gray-900">
                {facility.name}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
