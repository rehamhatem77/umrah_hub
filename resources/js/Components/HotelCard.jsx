import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

export default function HotelCard({
  name,
  image,
  location,
  description,
  features = [],
  rating = 5,
}) {
  return (
    <div className="flex flex-col md:flex-row bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">

      {/* Image */}
      <div
        className="w-full md:w-1/3 h-48 md:h-auto bg-cover bg-center"
        style={{
          backgroundImage: `url(${image.startsWith('http') ? image : `/storage/${image}`})`
        }}
      />

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-center">

        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="text-xl font-bold text-text-dark">{name}</h4>
            <p className="text-sm text-text-muted flex items-center gap-1 mt-1">
              <FaMapMarkerAlt className="text-sm" />
              {location}
            </p>
          </div>

          {/* Rating */}
          <div className="flex gap-0.5 text-accent-gold">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < rating ? "text-yellow-500" : "text-yellow-500 opacity-20"}
              />
            ))}
          </div>
        </div>

        <p className="text-text-muted text-sm line-clamp-5 mb-4">
          {description}
        </p>

        <div className="flex gap-2 text-xs flex-wrap">
          {features.map((feature, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-primary rounded text-text-dark"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
