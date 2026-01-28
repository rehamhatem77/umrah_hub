import { FiMapPin, FiClock, FiUsers, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaMapMarked, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { FaMapLocation, FaMapLocationDot } from "react-icons/fa6";

export default function PackageCard({
  variant = "default",
  title,
  image,
  price,
  badge,
  location,
  offerCode,
  days,
  type,
  date,
}) {
  const isCompact = variant === "compact";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`bg-white overflow-hidden border border-gray-200
        ${isCompact
          ? "rounded-2xl border-none shadow-sm hover:shadow-md"
          : "rounded-3xl border-none shadow-sm hover:shadow-xl"
        }`}
    >

      <div className="relative overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.7 }}
          className={`w-full object-cover ${isCompact ? "h-40" : "h-56"}`}
        />


        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t 
                  from-black/20 via-black/10 to-transparent" />

        {badge && !isCompact && (
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-white text-black text-xs font-bold px-3 py-1 rounded-xl shadow">
            <FaStar className="text-yellow-500" />
            <span>{badge}</span>
          </div>
        )}
        {offerCode && (
          <span
            className="absolute bottom-0 right-0 bg-black/20 text-white text-xs font-bold px-3 py-1
               rounded-tl-xl rounded-bl-xl"
          >
            #{offerCode}
          </span>
        )}

      </div>



      <div className={`${isCompact ? "p-4" : "p-5"} text-right`}>


        <div className="flex items-center justify-between mb-1">
          <h3 className={`font-extrabold text-gray-900 ${isCompact ? "text-sm" : "text-lg"}`}>
            {title}
          </h3>

          {/* {!isCompact && (
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
              عرض خاص
            </span>
          )} */}
        </div>


        {!isCompact && (
          <>
            <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
              <FaMapMarkerAlt />
              <span>{location}</span>
            </div>


            <div className="h-px bg-gray-200 mb-4" />

            <div className="flex items-center justify-between text-center text-sm text-gray-600 mb-4">


              <div className="flex-1">
                <p className="text-xs text-gray-400 mb-1">المدة</p>
                <p className="font-bold text-gray-900">{days}</p>
              </div>


              <div className="w-px h-10 bg-gray-200" />


              <div className="flex-1">
                <p className="text-xs text-gray-400 mb-1">متبقي</p>
                <p className="font-bold text-gray-900">{type}</p>
              </div>
            </div>


            <div className="h-px bg-gray-200 mb-4" />

          </>
        )}


        {isCompact ? (
          <>
            <div className="flex items-center gap-1 text-xs text-gray-400 mb-2"> 
              {/* <FiClock />  */}
              <span> {days}</span> </div>
            <div className="flex justify-between items-center">
              <a href="#" className="text-xs text-green-600 font-medium">
                عرض التفاصيل
              </a>
              <span className="text-green-600 font-bold text-sm">
                {price.toLocaleString()} ج.م
              </span>
            </div>
          </>
        ) : (
          <div className="flex justify-between items-center">
            <span className="text-green-600 font-extrabold text-xl">
              {price.toLocaleString()} ج.م
            </span>

            <button className="bg-green-100 text-green-700 px-5 py-2 rounded-xl text-sm font-bold hover:bg-green-200 transition">
              تفاصيل الباقة
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

