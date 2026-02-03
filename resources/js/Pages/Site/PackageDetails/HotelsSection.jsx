import HotelCard from "@/Components/HotelCard";

export default function HotelsSection({ hotels }) {
  if (!hotels || hotels.length === 0) {
    return (
      <div className="text-text-muted">لا توجد فنادق متاحة لهذه الباقة.</div>
    );
  }

  return (
    <div className="flex flex-col gap-6  text-black" id="hotels">
      <h3 className="text-2xl font-bold font-heading text-text-dark">
        الفنادق والإقامة
      </h3>

      {hotels.map((hotel) => {
        // Determine location text dynamically
        let locationText = hotel.address_location || "موقع غير متوفر";
        if (hotel.city) {
          if (["مكة", "مكة المكرمة", "Mekka"].includes(hotel.city)) {
            locationText = `على بعد ${hotel.distance_from_kaaba ?? "غير متوفر"} كم من الكعبة`;
          } else if (["المدينة", "المدينة المنورة", "Madinah"].includes(hotel.city)) {
            locationText = `على بعد ${hotel.distance_from_nabawi ?? "غير متوفر"} كم من المسجد النبوي`;
          }
        }

        // Convert text features to array (comma-separated or JSON)
        let features = [];
        if (hotel.features) {
          try {
            // Try parsing as JSON first
            features = JSON.parse(hotel.features);
            if (!Array.isArray(features)) features = [];
          } catch {
            // Fallback: comma-separated string
            features = hotel.features.split(",").map(f => f.trim());
          }
        }

        return (
          <HotelCard
            key={hotel.id}
            name={hotel.name}
            image={hotel.main_image_url || ""}
            location={locationText}
            description={hotel.description || "لا يوجد وصف متاح"}
            features={features}
            rating={hotel.stars || 0}
          />
        );
      })}
    </div>
  );
}
