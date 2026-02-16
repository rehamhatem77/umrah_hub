import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toArabicNumbers from "@/Components/Utils/ArabicNumbers";
import { formatHijriDate } from "@/Components/Utils/HijriDate";
import { usePage } from "@inertiajs/react";
import { FaCalendarAlt, FaArrowLeft, FaWhatsapp, FaShareAlt, FaHeart, FaHeadset, FaArrowRight } from "react-icons/fa";

export default function BookingCard({ data }) {
  const { footer } = usePage().props;
  if (!footer?.contact_wp) return null;
  const whatsappNumber = footer?.contact_wp.replace(/\s+/g, "");

  const startDateHijri = data?.start_date ? formatHijriDate(data.start_date) : "غير متوفر";
  const endDateHijri = data?.end_date ? formatHijriDate(data.end_date) : "غير متوفر";

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const ratingText = data.is_special
    ? "مميز"
    : data.rating && data.rating !== "0.00"
      ? toArabicNumbers(data.rating)
      : data.average_hotel_rating
        ? toArabicNumbers(data.average_hotel_rating)
        : "غير متوفر";

  const whatsappMessage = encodeURIComponent(
    `مرحباً
أرغب في الاستفسار عن باقة سياحية بالتفاصيل التالية:

اسم الباقة: ${data.title}
الموقع: ${data.locations}
المدة: ${toArabicNumbers(data.duration_days)} أيام
المتبقي: ${toArabicNumbers(data.available_places)} مقاعد
التاريخ: من ${startDateHijri} الي ${endDateHijri}
كود العرض: ${data.offer_code ?? "لا يوجد"}
التقييم: ${ratingText} نجوم
السعر: ${toArabicNumbers(data.price.toLocaleString("ar-EG"))} ج.م

${data.slug ? `رابط الباقة:\n${route("packages.show", data.slug)}` : ""}`
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const whatsappmsg = `https://wa.me/${whatsappNumber}`;

  // Motion variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const helpCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
  };

  return (
    <div className="sticky top-24 flex flex-col gap-4">

      {/* Booking Card */}
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg border border-primary/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={cardVariants}
      >
        {/* Price */}
        <div className="flex items-end justify-between mb-2">
          <span className="text-gray-500 text-sm">يبدأ السعر من</span>


          <div className="text-right">
            <span className="text-3xl font-bold text-gray-900">
              {toArabicNumbers(data.price)}
            </span>
            <span className="text-sm font-medium text-gray-500"> ج.م / شخص</span>
          </div>
        </div>

        {/* Date */}
        <div className="bg-green-50 p-3 rounded-lg flex gap-3 items-center mb-6 border border-green-200">
          <FaCalendarAlt className="text-green-600 text-lg" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-bold">

              تاريخ الرحلة القادمة
            </span>
            <span className="text-sm font-bold text-gray-900">
              {startDateHijri} - {endDateHijri}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            title="تواصل معنا عبر واتساب"
            className="btn--primary w-full h-12 bg-accent-green hover:bg-accent-green/90 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <span>احجز الآن</span>
            <FaArrowLeft className="text-sm rtl:rotate-180" />
          </motion.a>

          <motion.a
            href={whatsappmsg}
            target="_blank"
            rel="noopener noreferrer"
            title="تواصل معنا عبر واتساب"
            className="btn--secondary w-full h-12 bg-white border border-accent-green text-accent-green font-bold rounded-lg transition-colors flex items-center justify-center gap-2 hover:bg-green-50"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FaWhatsapp />
            <span>تواصل عبر واتساب</span>
          </motion.a>
        </div>

        {/* Share / Save */}
        <motion.div
          className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <FaShareAlt />
            مشاركة
          </button>
          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <FaHeart />
            حفظ
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="bg-primary rounded-xl p-5 border border-accent-gold/20 relative overflow-hidden"
        style={{ background: "#f5efe5" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={helpCardVariants}
      >
        <div className="relative z-10">
          <h4 className="font-bold text-lg text-gray-900 mb-1">

            هل تحتاج مساعدة؟
          </h4>
       <p className="text-sm text-gray-600 mb-3">

            فريقنا جاهز للرد على استفساراتك على مدار الساعة.
          </p>
          <a 
          className="text-green-600 font-bold text-sm flex items-center gap-1 hover:underline"

            href="/contact"
          >
            تواصل معنا
            <FaArrowRight className="text-sm rtl:rotate-180" />
          </a>
        </div>


        <FaHeadset
          style={{ opacity: ".5" }}
          className="absolute -bottom-6 -left-6 text-yellow-500/10 text-[120px]"
        />
      </motion.div>
    </div>
  );
}
