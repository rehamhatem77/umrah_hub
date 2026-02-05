import { motion } from "framer-motion";
import HotelCard from "@/Components/HotelCard";

export default function HotelsSection({ hotels }) {
  if (!hotels || hotels.length === 0) {
    return (
      <div className="text-text-muted">لا توجد فنادق متاحة لهذه الباقة.</div>
    );
  }


  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="flex flex-col gap-6 text-black"
      id="hotels"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }} 
    >

      <motion.h3
        className="text-2xl font-bold font-heading text-text-dark"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
         viewport={{ amount: 0.3, once: false }}

      >
        الفنادق والإقامة
      </motion.h3>


      {hotels.map((hotel) => {
      
        let locationText = hotel.address_location || "موقع غير متوفر";
        if (hotel.city) {
          if (["مكة", "مكة المكرمة", "Mekka"].includes(hotel.city)) {
            locationText = `على بعد ${hotel.distance_from_kaaba ?? "غير متوفر"} كم من الكعبة`;
          } else if (["المدينة", "المدينة المنورة", "Madinah"].includes(hotel.city)) {
            locationText = `على بعد ${hotel.distance_from_nabawi ?? "غير متوفر"} كم من المسجد النبوي`;
          }
        }


        let features = [];
        if (hotel.features) {
          try {
            features = JSON.parse(hotel.features);
            if (!Array.isArray(features)) features = [];
          } catch {
            features = hotel.features.split(",").map((f) => f.trim());
          }
        }

        return (
          <motion.div
            key={hotel.id}
            variants={itemVariants}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <HotelCard
              name={hotel.name}
              image={hotel.image_path || ""}
              location={locationText}
              description={hotel.desc || "لا يوجد وصف متاح"}
              features={features}
              rating={hotel.stars || 0}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
