import { FiMapPin, FiClock, FiUsers } from "react-icons/fi";

export default function PackageCard({
  variant = "default", 
  title,
  image,
  price,
  badge,
  location,
  days,
  type,
  date,
}) {
  const isCompact = variant === "compact";

  return (
    <div
      className={`bg-white overflow-hidden transition
        ${isCompact
          ? "rounded-2xl border border-gray-100 shadow-sm hover:shadow-md"
          : "rounded-3xl shadow-sm hover:shadow-xl"
        }`}
    >
     
      <div className="relative">
        <img
          src={image}
          alt={title}
          className={`w-full object-cover ${
            isCompact ? "h-40" : "h-52"
          }`}
        />

        {badge && !isCompact && (
          <span className="absolute top-4 right-4 bg-white text-green-600 text-xs font-bold px-3 py-1 rounded-full shadow">
            {badge}
          </span>
        )}
      </div>

   
      <div className={`${isCompact ? "p-4" : "p-6"} text-right`}>
        <h3
          className={`font-bold text-gray-900 mb-1 ${
            isCompact ? "text-sm" : "text-lg"
          }`}
        >
          {title}
        </h3>

      
        {isCompact ? (
          <>
            <p className="text-xs text-gray-400 mb-3">{date}</p>

            <div className="flex justify-between items-center">
              <a
                href="#"
                className="text-xs text-green-600 font-medium hover:underline"
              >
                عرض التفاصيل
              </a>

              <span className="text-green-600 font-bold text-sm">
                {price.toLocaleString()} ج.م
              </span>
            </div>
          </>
        ) : (
          <>
         
            <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
              <FiMapPin />
              <span>{location}</span>
            </div>

            <div className="flex justify-between text-gray-500 text-sm mb-4">
              <div className="flex items-center gap-1">
                <FiClock />
                <span>{days} أيام</span>
              </div>
              <div className="flex items-center gap-1">
                <FiUsers />
                <span>{type}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-green-600 font-extrabold text-lg">
                {price.toLocaleString()} ج.م
              </span>
              <button className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-200 transition">
                تفاصيل الباقة
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
