import { motion } from "framer-motion";
import { HiOutlineCurrencyDollar, HiOutlineSupport, HiOutlineOfficeBuilding, HiOutlineBadgeCheck } from "react-icons/hi";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const features = [
  {
    icon: HiOutlineCurrencyDollar,
    title: "أفضل الأسعار",
    text: "نضمن لك الحصول على أفضل العروض والأسعار التنافسية للفنادق والطيران.",
  },
  {
    icon: HiOutlineSupport,
    title: "دعم فني ٢٤/٧",
    text: "فريقنا متواجد على مدار الساعة للرد على استفساراتكم ومساعدتكم في أي وقت.",
  },
  {
    icon: HiOutlineOfficeBuilding,
    title: "فنادق مختارة",
    text: "شراكات مع أفضل الفنادق في مكة والمدينة لضمان إقامة مريحة وقريبة من الحرم.",
  },
  {
    icon: HiOutlineBadgeCheck,
    title: "حجوزات مؤكدة",
    text: "منصة آمنة وموثوقة تضمن تأكيد حجوزاتك بشكل فوري وبدون تعقيدات.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-white py-16">
      <div className="flex justify-center">
        <div className="w-full max-w-[1200px] px-4 md:px-10 lg:px-40 flex flex-col">

          {/* Heading */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[#111813] text-3xl font-bold leading-tight mb-3">
              لماذا تختار Umrah Hub؟
            </h2>
            <p className="text-gray-500 text-base">
              نقدم لك تجربة متكاملة تجمع بين الراحة والروحانية
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  className="flex flex-col items-center text-center gap-4 p-4"
                >
                  <motion.div
                    className="size-16 radius-icon rounded-full bg-green-50 flex items-center justify-center text-primary mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Icon style={{width:"30px",height:"30px",color:"#17cf54"}} className="text-[var(--app-primary)]"/>

                  </motion.div>

                  <h4 className="text-[#111813] text-lg font-bold">
                    {feature.title}
                  </h4>
                  <p className="text-gray-500 text-sm">{feature.text}</p>
                </motion.div>
              );
            })}
</motion.div>

        </div>
      </div>
    </section>
  );
}
