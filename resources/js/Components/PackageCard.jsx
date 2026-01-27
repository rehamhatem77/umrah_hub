// import { FiMapPin, FiClock, FiUsers, FiStar } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { FaMapMarked, FaMapMarkerAlt, FaStar } from "react-icons/fa";
// import { FaMapLocation, FaMapLocationDot } from "react-icons/fa6";

// export default function PackageCard({
//   variant = "default",
//   title,
//   image,
//   price,
//   badge,
//   location,
//   offerCode,
//   days,
//   type,
//   date,
// }) {
//   const isCompact = variant === "compact";

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.7, ease: "easeOut" }}
//       className={`bg-white overflow-hidden border border-gray-200
//         ${isCompact
//           ? "rounded-2xl border-none shadow-sm hover:shadow-md"
//           : "rounded-3xl border-none shadow-sm hover:shadow-xl"
//         }`}
//     >

//       <div className="relative overflow-hidden">
//         <motion.img
//           src={image}
//           alt={title}
//           whileHover={{ scale: 1.07 }}
//           transition={{ duration: 0.7 }}
//           className={`w-full object-cover ${isCompact ? "h-40" : "h-56"}`}
//         />


//         <div className="pointer-events-none absolute inset-0 bg-gradient-to-t 
//                   from-black/20 via-black/10 to-transparent" />

//         {badge && !isCompact && (
//           <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-white text-black text-xs font-bold px-3 py-1 rounded-xl shadow">
//             <FaStar className="text-yellow-500" />
//             <span>{badge}</span>
//           </div>
//         )}
//         {offerCode && (
//           <span
//             className="absolute bottom-0 right-0 bg-black/20 text-white text-xs font-bold px-3 py-1
//                rounded-tl-xl rounded-bl-xl"
//           >
//             #{offerCode}
//           </span>
//         )}

//       </div>



//       <div className={`${isCompact ? "p-4" : "p-5"} text-right`}>


//         <div className="flex items-center justify-between mb-1">
//           <h3 className={`font-extrabold text-gray-900 ${isCompact ? "text-sm" : "text-lg"}`}>
//             {title}
//           </h3>

//           {/* {!isCompact && (
//             <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
//               عرض خاص
//             </span>
//           )} */}
//         </div>


//         {!isCompact && (
//           <>
//             <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
//               <FaMapMarkerAlt />
//               <span>{location}</span>
//             </div>


//             <div className="h-px bg-gray-200 mb-4" />

//             <div className="flex items-center justify-between text-center text-sm text-gray-600 mb-4">


//               <div className="flex-1">
//                 <p className="text-xs text-gray-400 mb-1">المدة</p>
//                 <p className="font-bold text-gray-900">{days}</p>
//               </div>


//               <div className="w-px h-10 bg-gray-200" />


//               <div className="flex-1">
//                 <p className="text-xs text-gray-400 mb-1">متبقي</p>
//                 <p className="font-bold text-gray-900">{type}</p>
//               </div>
//             </div>


//             <div className="h-px bg-gray-200 mb-4" />

//           </>
//         )}


//         {isCompact ? (
//           <>
//             <div className="flex items-center gap-1 text-xs text-gray-400 mb-2"> 
//               {/* <FiClock />  */}
//               <span> {days}</span> </div>
//             <div className="flex justify-between items-center">
//               <a href="#" className="text-xs text-green-600 font-medium">
//                 عرض التفاصيل
//               </a>
//               <span className="text-green-600 font-bold text-sm">
//                 {price.toLocaleString()} ج.م
//               </span>
//             </div>
//           </>
//         ) : (
//           <div className="flex justify-between items-center">
//             <span className="text-green-600 font-extrabold text-xl">
//               {price.toLocaleString()} ج.م
//             </span>

//             <button className="bg-green-100 text-green-700 px-5 py-2 rounded-xl text-sm font-bold hover:bg-green-200 transition">
//               تفاصيل الباقة
//             </button>
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// }
import { motion } from "framer-motion";
import { FaStar, FaCalendarAlt, FaClock, FaHotel, FaMapMarkerAlt } from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";

export default function PackageCard({
  title,
  image,
  price,
  badge,
  location,
  days,
  date,
  hotel,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group bg-white border border-[#f0f4f2] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-white/90 backdrop-blur-sm text-[#111813] text-xs font-bold px-2.5 py-1 rounded-md shadow-sm border border-[#f0f4f2]">
              {badge}
            </span>
          </div>
        )}

        {/* Location */}
        <div className="absolute bottom-3 right-3 text-white flex items-center gap-1 text-xs">
          <FaMapMarkerAlt />
          <span>{location}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Stars + Tag */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex text-amber-400 text-sm gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <span className="text-xs text-[#63886f] bg-[#f6f8f6] px-2 py-0.5 rounded">
            شامل الطيران
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#111813] mb-3 leading-snug group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Details */}
        <div className="space-y-2 mb-4">
          {date && (
            <div className="flex items-center gap-2 text-sm text-[#4b5563]">
              <FaCalendarAlt className="text-primary" />
              <span>{date}</span>
            </div>
          )}

          {days && (
            <div className="flex items-center gap-2 text-sm text-[#4b5563]">
              <FaClock className="text-primary" />
              <span>{days}</span>
            </div>
          )}

          {hotel && (
            <div className="flex items-center gap-2 text-sm text-[#4b5563]">
              <FaHotel className="text-primary" />
              <span>{hotel}</span>
            </div>
          )}
        </div>

        {/* Price + Button */}
        <div className="mt-auto pt-4 border-t border-[#f0f4f2] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-[#63886f]">يبدأ من</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-primary">
                {price.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-[#111813]">ج.م</span>
            </div>
          </div>

          <motion.button
            onClick={() => Inertia.visit("/packages")}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#111813] hover:bg-primary text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors"
          >
            احجز الآن
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
