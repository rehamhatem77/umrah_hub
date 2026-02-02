import { motion } from "framer-motion";

export default function ContactHero({ data }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const heroTitle = data?.hero_title || "تواصل معنا";
  const heroBadgeTitle = data?.hero_badge_title || "نحن هنا لخدمتكم";
  const heroDescription = data?.hero_description || `نسعد بالإجابة على استفساراتكم ومساعدتكم في تخطيط رحلتكم المباركة.
   فريقنا متاح على مدار الساعة لخدمتكم.`;
  return (
    <section className="relative w-full py-28 px-6 overflow-hidden bg-[#f5efe54d]">

      <div className="absolute inset-0 bg-gradient-to-b from-[#c5a0591a] to-transparent" />

      <motion.div
        className="relative max-w-4xl mx-auto text-center flex flex-col items-center gap-6"
        initial="hidden"
        animate="visible"
        viewport={{ once: false }}
        variants={{
          visible: { transition: { staggerChildren: 0.12 } }
        }}
      >
        <motion.span
          variants={fadeUp}
          className="inline-block rounded-full bg-[#c5a0591a] px-6 py-2 text-sm font-medium text-[#3a5f3b] border border-[#c5a05933]"
        >
          {heroBadgeTitle}
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="text-[#111813] text-5xl md:text-6xl font-medium tracking-tight"
        >
          {heroTitle}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-[#6f6a63] text-lg md:text-xl leading-relaxed max-w-2xl"
        >
         {heroDescription}
        </motion.p>
      </motion.div>
    </section>
  );
}
