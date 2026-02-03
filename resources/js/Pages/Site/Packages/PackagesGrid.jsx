import { motion, AnimatePresence } from "framer-motion";
import PackageCard from "@/Components/PackageCard";
import toArabicNumbers from "@/Components/Utils/ArabicNumbers";
import AllPackagesCard from "@/Components/AllPackagesCard";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

const filters = [
  { label: "الكل", value: "" },
  { label: "المميز", value: "special" },
  { label: "الأكثر طلباً", value: "popular" },
  { label: "الأقل سعراً", value: "cheapest" },
  { label: "الأقرب موعداً", value: "nearest" },
];

export default function PackagesGrid({ offers, special }) {
  const [activeFilter, setActiveFilter] = useState("");
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const hasActiveFilters = activeFilter !== "";
  useEffect(() => {
    if (special) {
      setActiveFilter(special);
    }
  }, []);
  useEffect(() => {
    setFilteredOffers(offers.data);
  }, [offers.data]);
  useEffect(() => {
    let newOffers = [...offers.data];

    switch (activeFilter) {
      case "special":
        newOffers = newOffers.filter((pkg) => pkg.is_special_offer);
        break;
      case "popular":
        newOffers = newOffers.filter((pkg) => pkg.is_popular);
        break;
      case "cheapest":
        newOffers = newOffers.sort((a, b) => a.price - b.price);
        break;
      case "nearest":
        newOffers = newOffers.sort(
          (a, b) => new Date(a.start_date) - new Date(b.start_date)
        );
        break;
      default:
        newOffers = offers.data;
    }

    setFilteredOffers(newOffers);
    setCurrentPage(1);
  }, [activeFilter, offers.data]);


  let paginatedOffers = filteredOffers;
  if (hasActiveFilters) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    paginatedOffers = filteredOffers.slice(startIndex, endIndex);
  }
  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);

  return (
    <main className="lg:col-span-9 flex flex-col gap-6">

      <div className="bg-white p-4 rounded-xl border border-[#f0f4f2] shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#111813]">ترتيب حسب:</span>
          <div className="flex items-center gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => {
                  setActiveFilter(f.value);
                  router.get(
                    "/packages",
                    {},
                    { preserveState: true, replace: true }
                  );
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors  ${activeFilter === f.value
                  ? "btn-primary text-white shadow-sm ring-2 ring-green-600  ring-offset-2"
                  : "bg-[#f6f8f6] text-[#111813] hover:bg-primary/10 hover:text-primary"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>


      {offers?.data?.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-600">
          {hasActiveFilters ? (
            <>
              <p className="text-lg font-bold mb-1">لا توجد نتائج</p>
              <p className="text-sm">
                لا توجد عروض مطابقة لخيارات البحث الحالية
              </p>
            </>
          ) : (
            <>
              <p className="text-lg font-bold mb-1">لا توجد عروض حالياً</p>
              <p className="text-sm">لم يتم إضافة أي عروض بعد</p>
            </>
          )}
        </div>
      )}


      {offers?.data?.length > 0 && (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="show"
          variants={{
            show: { transition: { staggerChildren: 0.05 } },
          }}
        >
          <AnimatePresence>
            {paginatedOffers.map((pkg) => (
              <motion.div
                key={pkg.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <a href={pkg.slug? route("packages.show", pkg.slug) : ""} >
                <AllPackagesCard
                  title={pkg.title}
                  offerCode={pkg.offer_code}
                  price={toArabicNumbers(pkg.price)}
                  date={pkg.start_date}
                  hotels={pkg.hotels}

                  popularBadge={pkg.is_popular ? "أكثر طلباً" : ""}
                  location={
                    pkg.locations?.length
                      ? pkg.locations.join(" - ")
                      : "مكة المكرمة"
                  }
                  days={
                    toArabicNumbers(pkg.duration_days) +
                    (pkg.duration_days !== 14 ? " أيام" : " يوم")
                  }
                  image={pkg.image}
                  badge={pkg.is_special_offer ? "مميز" : ""}
                  rating={pkg.rating ? pkg.rating : pkg.average_hotel_rating}
                  customers_rating={pkg.number_of_rating_customers ? pkg.number_of_rating_customers : null}
                  availablePlaces={pkg.available_places}
                />
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Pagination */}
      {hasActiveFilters ? (

        filteredOffers.length > itemsPerPage && (
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}

              className="px-3 py-1 rounded border bg-white hover:bg-gray-100"
            >
              «
            </button>

            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 rounded border ${currentPage === idx + 1
                  ? "bg-primary text-white"
                  : "bg-white hover:bg-gray-100"
                  }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border bg-white hover:bg-gray-100"
            >
              »
            </button>
          </div>
        )
      ) : (

        offers.links && (
          <div className="flex justify-center gap-1 flex-wrap text-sm mt-4">
            {offers.links.map((link, idx) => {
              let label = "";
              const toArabicNumbersFn = (num) => {
                const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
                return num.toString().split("").map((d) => arabicNumbers[d] || d).join("");
              };

              if (link.label.includes("Previous")) label = "«";
              else if (link.label.includes("Next")) label = "»";
              else label = toArabicNumbersFn(link.label.replace(/&laquo;|&raquo;/g, ""));

              return (
                <button
                  key={idx}
                  onClick={() =>
                    link.url &&
                    router.get(link.url, {}, { preserveState: true, replace: true })
                  }
                  className={`px-2 py-1 rounded border ${link.active
                    ? "bg-[var(--app-primary)] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  disabled={!link.url}
                  dangerouslySetInnerHTML={{ __html: label }}
                />
              );
            })}
          </div>
        )
      )}
    </main>
  );
}
