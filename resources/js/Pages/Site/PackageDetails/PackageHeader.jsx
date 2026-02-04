import toArabicNumbers from "@/Components/Utils/ArabicNumbers";
import { useState, useEffect, useRef } from "react";
import { BsStars } from "react-icons/bs";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const tabs = [
  { id: "overview", label: "نظرة عامة" },
  { id: "itinerary", label: "خط سير الرحلة" },
  { id: "hotels", label: "الفنادق" },
  { id: "inclusions", label: "الخدمات" },
];

export default function PackageHeaderAnimatedTabs({ data }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      for (let tab of tabs) {
        const section = document.getElementById(tab.id);
        if (!section) continue;

        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollPos >= top && scrollPos < bottom) {
          setActiveTab(tab.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const index = tabs.findIndex((t) => t.id === activeTab);
    const el = tabsRef.current[index];
    if (el) {
      setUnderlineStyle({
        width: el.offsetWidth,
        left: el.offsetLeft,
      });
    }
  }, [activeTab]);

  const handleClick = (id, index) => {
    const section = document.getElementById(id);
    if (!section) return;

    const headerOffset = 80;
    const elementPosition = section.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    setActiveTab(id);
  };

  return (
    <>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-primary pb-6 text-black"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {data.is_special_offer && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-center gap-1 bg-white-50 text-yellow-500 text-xs font-bold px-3 py-2 rounded border border-yellow-200"
                >
                  <BsStars />
                  <span>مميزة</span>
                </motion.div>
              )}

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-2 rounded"
              >
                {toArabicNumbers(data.duration_days)} أيام / {toArabicNumbers(data.duration_days - 1)} ليالي
              </motion.span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold font-heading text-text-dark mb-3"
            >
              {data.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 text-sm text-gray-500 flex-wrap"
            >
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400 text-lg" />
                <span className="text-text-dark font-bold">
                  {data.rating !== "0.00" && data.rating !== null
                    ? toArabicNumbers(data.rating)
                    : toArabicNumbers(data.average_hotel_rating)}
                </span>
                {data.number_of_rating_customers!=0 && (
                  <span>({toArabicNumbers(data.number_of_rating_customers)} تقييم)</span>
                )}
              </div>

              <span className="w-1 h-1 rounded-full bg-gray-300" />

              <div className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-lg text-green-600" />
                <span>{data.locations ? data.locations.join("، ") : "مكة المكرمة، المدينة المنورة"}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Sticky Tabs Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="sticky top-14 z-20 bg-white pt-2 text-black"
      >
        <div className="relative flex items-center gap-6 border-b border-primary text-sm font-bold overflow-x-auto hide-scrollbar whitespace-nowrap px-4 py-2">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              ref={(el) => (tabsRef.current[index] = el)}
              onClick={() => handleClick(tab.id, index)}
              transition={{ type: "spring", stiffness: 300 }}
              className={`pb-3 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "text-green-600  font-bold"
                  : "text-gray-500"
              }`}
            >
              {tab.label}
            </motion.button>
          ))}

          {/* Animated Underline */}
          <motion.span
            className="absolute bottom-0 h-0.5 bg-green-600 rounded-full"
            animate={{ left: underlineStyle.left, width: underlineStyle.width }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        </div>
      </motion.div>
    </>
  );
}
