import { motion } from "framer-motion";
import { FaStar, FaCalendarAlt, FaClock, FaHotel, FaMapMarkerAlt } from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";
import { MdOutlineMessage } from "react-icons/md";
import { usePage } from "@inertiajs/react";

export default function AllPackagesCard({
    title,
    offerCode,
    image,
    price,
    slug,
    badge,
    location,
    rating,
    days,
    date,
    customers_rating,
    popularBadge,
    availablePlaces,
    hotels = [], }) {

    const formatDate = (date) => {
        if (!date) return null;

        return new Date(date).toLocaleDateString("ar-EG", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const isSoldOut = availablePlaces === 0;

      const { footer } = usePage().props;
      
          if (!footer?.contact_wp) return null;
          const whatsappNumber = footer?.contact_wp.replace(/\s+/g, "");


    const whatsappMessage = encodeURIComponent(
        "مرحباً \n" +
        "أرغب في الاستفسار عن باقة سياحية بالتفاصيل التالية:\n\n" +

        "اسم الباقة: " + title + "\n" +
        "الموقع: " + location + "\n" +
        "المدة: " + days + "\n" +
        "المتبقي: " + availablePlaces +"مقاعد "+ "\n" +
        "التاريخ: " + formatDate(date) + "\n" +
        "كود العرض: " + (offerCode ?? "لا يوجد") + "\n" +
        "التقييم: " + (badge ? badge : rating ? rating : "غير متوفر") + "\n" +
        "السعر: " + price.toLocaleString("ar-EG") + " ج.م\n\n" +

        "صورة الباقة:\n" + image + "\n\n" +
        (slug ? "رابط الباقة:\n" + route("packages.show", slug) : "")
    );
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}

            className={`group bg-white rounded-2xl overflow-hidden transition-all ${isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}
        >
            <div className="relative h-52 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent" />

                {badge && (
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-white text-black text-xs font-bold px-3 py-1 rounded-xl shadow">
                        <FaStar className="text-yellow-500" />
                        <span>{badge}</span>
                    </div>
                )}

                {popularBadge && (
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-green-600 text-white text-black text-xs font-bold px-3 py-1 rounded-xl shadow">

                        <span>{popularBadge}</span>
                    </div>
                )}


                <div className="absolute bottom-3 right-3 text-white flex items-center gap-1 text-xs">
                    <FaMapMarkerAlt />
                    <span>{location}</span>
                </div>
            </div>


            <div className="p-4 flex flex-col flex-grow">

                <div className="flex justify-between items-center mb-2">
                    <div className="flex text-amber-400 text-sm gap-1 items-center">
                        {Array.from({ length: Math.round(rating || 0) }).map((_, i) => (
                            <FaStar key={i} />
                        ))}
                        {/* Show customer rating only if it exists */}
                        {customers_rating != null && (
                            <span className="text-gray-400 ml-2">({customers_rating})</span>
                        )}
                    </div>
                    <span className="text-xs text-green-600 bg-[#f6f8f6] px-2 py-0.5 rounded">
                        شامل الطيران
                    </span>
                </div>


                <h3 className="text-lg font-bold text-[#111813] mb-3 leading-snug group-hover:text-primary transition-colors">
                    {title}
                </h3>

                <div className="space-y-2 mb-4">
                    {date && (
                        <div className="flex items-center gap-2 text-sm text-[#4b5563]">
                            <FaCalendarAlt className="text-green-600" />
                            <span>{formatDate(date)}</span>
                        </div>
                    )}

                    {days && (
                        <div className="flex items-center gap-2 text-sm text-[#4b5563]">
                            <FaClock className="text-green-600" />
                            <span>{days}</span>
                        </div>
                    )}
                    {hotels.length > 0 && (
                        <div className="flex items-start gap-2 text-sm text-[#4b5563]">
                            <FaHotel className="text-green-600 mt-0.5" />
                            {/* <div className="flex flex-col"> */}
                            <div className="flex flex-wrap gap-1">
                                <span>فندق</span>
                                {hotels.slice(0, 2).map((hotel, idx) => (
                                    <span key={idx}>
                                        {hotel.name}
                                        {idx === 0 && hotels.length > 1 ? " وفندق " : ""}
                                    </span>
                                ))}

                                {hotels.length > 2 && (
                                    <span className="text-xs text-[#63886f] mr-1">
                                        + {hotels.length - 2} فنادق أخرى
                                    </span>
                                )}
                            </div>

                        </div>
                        // </div>
                    )}



                </div>

                <div className="mt-auto pt-4 border-t border-[#f0f4f2] flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-[#63886f]">يبدأ من</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black text-green-600">
                                {price.toLocaleString()}
                            </span>
                            <span className="text-xs font-bold text-[#111813]">ج.م</span>
                        </div>
                    </div>

                    <motion.button
                        onClick={() => {
                            if (!isSoldOut) window.open(whatsappLink, "_blank");
                        }}
                        whileHover={!isSoldOut ? { scale: 1.07 } : {}}
                        whileTap={!isSoldOut ? { scale: 0.95 } : {}}
                        className={`text-sm font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${isSoldOut
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gray-800 hover:bg-gray-900 text-white"
                            }`}
                    >
                        
                        {isSoldOut ? "تم البيع" : "احجز الآن"}
                    </motion.button>

                </div>
            </div>
        </motion.div>
    );
}