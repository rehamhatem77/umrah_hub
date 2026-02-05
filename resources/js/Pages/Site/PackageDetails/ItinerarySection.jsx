import { motion } from "framer-motion";

export default function ItinerarySection({ program }) {

  const itinerary = Array.isArray(program)
    ? program.filter((day) => day.title || day.desc)
    : [
      {
        label: "اليوم ١",
        title: "الوصول إلى جدة والتوجه لمكة",
        desc: "الاستقبال في مطار الملك عبد العزيز بجدة بواسطة مندوبينا، ثم الانتقال عبر باصات VIP مكيفة إلى الفندق في مكة المكرمة لتسليم الغرف والاستراحة.",
      },
      {
        label: "اليوم ٢",
        title: "أداء مناسك العمرة",
        desc: "التوجه إلى الحرم المكي لأداء مناسك العمرة جماعةً بإشراف مرشد ديني متخصص لشرح المناسك والدعاء.",
      },
      {
        label: "اليوم ٣ - ٧",
        title: "التفرغ للعبادة في مكة",
        desc: "أيام حرة للصلاة في الحرم المكي والاعتكاف، مع توفر وجبات الإفطار والسحور في الفندق.",
      },
      {
        label: "اليوم ٨",
        title: "المغادرة إلى المدينة المنورة",
        desc: "السفر صباحاً بقطار الحرمين السريع إلى المدينة المنورة، والوصول للفندق القريب من المسجد النبوي.",
      },
      {
        label: "اليوم ١٠",
        title: "المغادرة",
        desc: "التوجه إلى مطار المدينة المنورة للعودة إلى الديار بسلامة الله.",
      },
    ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };


  const getDotColor = (index) => {
    if (index === 0) return "bg-accent-green";
    if (index === 1) return "bg-accent-gold";
    return "bg-gray-300";
  };

  return (
    <motion.div
      className="flex flex-col gap-6 text-black"
      id="itinerary"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.3, once: false }}
    >
      <motion.h3
        className="text-2xl font-bold font-heading text-text-dark"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        خط سير الرحلة
      </motion.h3>

      <div className="relative border-r border-dashed border-gray-300 mr-3">
        {itinerary.map((day, index) => (
          <div
            key={index}
            className={`relative pr-8 ${index !== itinerary.length - 1 ? "mb-10" : ""
              }`}
          >

            <motion.div
              className={`absolute -right-[7px] top-1 w-3.5 h-3.5 rounded-full ring-4 ring-white ${getDotColor(
                index
              )}`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />


            <motion.h4
              className="text-lg font-bold text-text-dark mb-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {day.label}: {day.title}
            </motion.h4>

            {/* Display description */}
            <motion.p
              className="text-text-muted leading-relaxed"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {day.desc}
            </motion.p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
