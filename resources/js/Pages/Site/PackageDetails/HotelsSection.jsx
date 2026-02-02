import HotelCard from "@/Components/HotelCard";

export default function HotelsSection() {
const hotels = [
  {
    name: "فندق بولمان زمزم مكة",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDLJTXUgRgOQa8Dq87sA9gisbVDNXcFhOEJ3fE8vswJiaylacc3Q_Q-szp1P9Rn53hsIQwZijVrlgelauNmtrByA2KVsoC7ZOEVDMGmJDCB4IDX7mo7HcjkSsLvwcrN7v5AZcOUrk5PabfRcDlwyukHHPZI0elrF0XfM8873bNLyMsrNKFVa2i4-xV0Pcwj4zOxrUUyn-d4k7KnmOI1Z2gDN99cOu9DSX_l2852VRzfMb49TIoK4ZMOa00pNGFJtCSQb1PbtwQ0-_w",
    location: "صفر كم من الحرم (داخل وقف الملك عبد العزيز)",
    description:
      "يتميز بإطلالات مباشرة على الكعبة المشرفة والحرم، ويوفر خدمة غرف ممتازة وبوفيه إفطار عالمي.",
    features: ["إطلالة كعبة", "واي فاي مجاني"],
    rating: 5,
  },
  {
    name: "فندق أنوار المدينة موفنبيك",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC37_4jbKqGgrYUo8Auj0CY0ZE13KLN0Swmg-U7rnypA795QqpaEBjrErfc6f_q5i1gwQdVICtfg6X1XZhl-D1q33pHlcEJ4pFgZHHQEVHW_EL0FKeJD1CoaLuW0h6BO88mt7Xcc7Cka44au08MEhIGD1bxGBHib8vAfH0WIWikHmXvmdB_oSL7aIw_CjClfgiAZkjCe-leF_FmRsEQj0g315_-JIQwtzuxIRAvr9Y2y0k8kDm7DNjdzjDPjaB-IyHYzZ_yy5mWBbU",
    location: "خطوات قليلة من الحرم النبوي",
    description:
      "يُعد من أقرب الفنادق لساحات الحرم النبوي، ويضم مركز تسوق خاص ومطاعم متنوعة.",
    features: ["قريب من الروضة", "خدمة ٢٤ ساعة"],
    rating: 5,
  },
];

  return (
    <div className="flex flex-col gap-6" id="hotels">
      <h3 className="text-2xl font-bold font-heading text-text-dark">
        الفنادق والإقامة
      </h3>

      {hotels.map((hotel, index) => (
        <HotelCard
          key={index}
          name={hotel.name}
          image={hotel.image}
          location={hotel.location}
          description={hotel.description}
          features={hotel.features}
          rating={hotel.rating}
        />
      ))}
    </div>
  );
}
