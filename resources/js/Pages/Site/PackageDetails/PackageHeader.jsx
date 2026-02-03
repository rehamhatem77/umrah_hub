import toArabicNumbers from "@/Components/Utils/ArabicNumbers";
import { useState, useEffect, useRef } from "react";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

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

  // Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100; // offset for sticky header

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
    handleScroll(); // call once to set initial active tab
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update underline position
  useEffect(() => {
    const index = tabs.findIndex((t) => t.id === activeTab);
    const el = tabsRef.current[index];
    if (el) {
      setUnderlineStyle({
        width: `${el.offsetWidth}px`,
        left: `${el.offsetLeft}px`,
      });
    }
  }, [activeTab]);

  const handleClick = (id, index) => {
    const section = document.getElementById(id);
    if (!section) return;

    const headerOffset = 80; // adjust if sticky header height changes
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
      {/* Header */}
      <div className="border-b border-primary pb-6 text-black">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
                {data.is_special_offer && (
              <span className="bg-accent-gold/10 text-accent-gold text-xs font-bold px-2 py-1 rounded border border-accent-gold/20">
                مميزة
              </span>
                )}
              <span className="bg-primary text-text-muted text-xs font-bold px-2 py-1 rounded">
                {toArabicNumbers( data.duration_days)} أيام / {toArabicNumbers( data.duration_days-1)} ليالي
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold font-heading text-text-dark mb-3">
              {data.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-text-muted flex-wrap">
              <div className="flex items-center gap-1">
                <FaStar className="text-accent-gold text-lg" />
                <span className="text-text-dark font-bold">{data.rating?data.rating:data.average_hotel_rating}</span>
               
                <span>({toArabicNumbers(data.number_of_rating_customers)} تقييم)</span>
              </div>

              <span className="w-1 h-1 rounded-full bg-gray-300" />

              <div className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-lg" />
                <span>{ data.locations? data.locations.join("، "): "مكة المكرمة، المدينة المنورة"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Tabs Navigation */}
      <div className="sticky top-0 z-50 bg-white  text-black">
        <div className="relative flex items-center gap-6 border-b border-primary text-sm font-bold overflow-x-auto hide-scrollbar whitespace-nowrap px-4">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(el) => (tabsRef.current[index] = el)}
              onClick={() => handleClick(tab.id, index)}
              className={`pb-3 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-accent-green"
                  : "text-text-muted hover:text-accent-gold"
              }`}
            >
              {tab.label}
            </button>
          ))}

          {/* Animated Underline */}
          <span
            className="absolute bottom-0 h-0.5 bg-accent-green transition-all duration-300"
            style={underlineStyle}
          />
        </div>
      </div>
    </>
  );
}
