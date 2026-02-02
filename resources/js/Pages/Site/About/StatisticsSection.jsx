import toArabicNumbers from "@/Components/Utils/ArabicNumbers";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function StatisticsSection({data}) {
     const defaultStats = [
    { number: 5000, label: "معتمر تم خدمتهم", prefix: "+" },
    { number: 150, label: "فندق شريك", prefix: "+" },
    { number: 10, label: "سنوات من الخبرة", prefix: "" },
  ];


  const stats = data?.length
    ? [
        {
          number: data[0]?.statistic_one_number,
          label: data[0]?.statistic_one_desc,
          prefix: data[0]?.statistic_one_prefix || "",
        },
        {
          number: data[0]?.statistic_two_number,
          label: data[0]?.statistic_two_desc,
          prefix: data[0]?.statistic_two_prefix || "",
        },
        {
          number: data[0]?.statistic_three_number,
          label: data[0]?.statistic_three_desc,
          prefix: data[0]?.statistic_three_prefix || "",
        },
      ]
    : defaultStats;
  return (
    <motion.section
      className="w-full bg-[#fbf8f4] text-white py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
    >
      <div className="flex justify-center">
        <div className="w-full max-w-[1200px] px-4 md:px-10 lg:px-40">
          <div className="flex flex-row flex-wrap justify-center md:justify-around items-center gap-6 text-center">

            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <h3 className="text-3xl md:text-5xl font-black text-[#1A4D2E] mb-2">
                  {stat.prefix}
                  <CountUp
                    start={0}
                    end={stat.number}
                    duration={2.5}
                    formattingFn={(number) => toArabicNumbers(number)}
                  >
                    {({ countUpRef, start, reset }) => (
                      <motion.span
                        ref={countUpRef}
                        initial={false}
                        whileInView={() => {
                          reset();
                          start();
                        }}
                        viewport={{ once: false, amount: 0.5 }}
                      />
                    )}
                  </CountUp>
                </h3>
                <p className="text-sm md:text-lg text-gray-400 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}

          </div>
        </div>
      </div>
    </motion.section>
  );
}
