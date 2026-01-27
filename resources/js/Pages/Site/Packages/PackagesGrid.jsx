import { motion } from "framer-motion";
import PackageCard from "@/Components/PackageCard";
import toArabicNumbers from "@/Components/Utils/ArabicNumbers";

export default function PackagesGrid({offers, filters, governorates = [],
  tripTypes = [], companies = [], hotels = [], counts = {} }) {
    return (
<>    
                <main className="lg:col-span-9 flex flex-col gap-6">
 {/* Sorting Bar */}
  <div className="bg-white p-4 rounded-xl border border-[#f0f4f2] shadow-sm flex flex-wrap gap-4 items-center justify-between">
    <div className="flex items-center gap-2">
      <span className="text-sm font-bold text-[#111813]">ترتيب حسب:</span>
      <div className="flex items-center gap-2">
        <button className="px-4 py-2 rounded-lg bg-[#f6f8f6] text-[#111813] text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors">
          الأكثر طلباً
        </button>
        <button className="px-4 py-2 rounded-lg bg-primary  text-sm font-bold shadow-sm ring-2 ring-primary ring-offset-2">
          الأقل سعراً
        </button>
        <button className="px-4 py-2 rounded-lg bg-[#f6f8f6] text-[#111813] text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors">
          الأقرب موعداً
        </button>
      </div>
    </div>
    {/* <div className="flex items-center gap-2 border-r border-[#f0f4f2] pr-4 mr-auto">
      <button className="p-2 rounded text-primary bg-primary/10">
        <span className="material-symbols-outlined">grid_view</span>
      </button>
      <button className="p-2 rounded text-[#9ca3af] hover:bg-[#f6f8f6]">
        <span className="material-symbols-outlined">view_list</span>
      </button>
    </div> */}
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
                <p className="text-sm">
                  لم يتم إضافة أي عروض بعد
                </p>
              </>
            )}
          </div>
        )}

        {offers?.data?.length > 0 && (
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={{
                        show: { transition: { staggerChildren: 0.15 } },
                    }}
                    className=" grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {offers.data.map((pkg) => (
                        <motion.div
                            key={pkg.id}
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                show: { opacity: 1, y: 0 },
                            }}
                            whileHover={{ y: -6 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                        >
                            <PackageCard
                                title={pkg.title}
                                offerCode={pkg.offer_code}
                                price={toArabicNumbers(pkg.price)}
                                days={
                                    toArabicNumbers(pkg.duration_days) +
                                    (pkg.duration_days !== 14? " أيام":" يوم")
                                }
                                image={
                                    pkg.images?.length
                                        ? `${pkg.images[0].image_path}`
                                        : "/images/placeholder.jpg"
                                }
                                location={
                                    pkg.hotels?.length
                                        ? pkg.hotels.map(h => h.city).join(" - ")
                                        : "مكة المكرمة"
                                }
                                badge="مميز"
                                type={
                                    toArabicNumbers(pkg.available_places) +
                                    (pkg.available_places <= 10 ? " مقاعد" : " مقعد")
                                }
                            />
                        </motion.div>
                    ))}
                </motion.div>
        )}

{/* Pagination */}
        {offers?.data?.length > 0 && offers.links && (
          <div className="flex justify-center gap-1 flex-wrap text-sm mt-4">
            {offers.links.map((link, idx) => {
              let label = '';
              const toArabicNumbers = (num) => {
                const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
                return num.toString().split('').map(d => arabicNumbers[d] || d).join('');
              };

              if (link.label.includes('Previous')) label = '«';
              else if (link.label.includes('Next')) label = '»';
              else label = toArabicNumbers(link.label.replace(/&laquo;|&raquo;/g, ''));

              return (
                <button
                  key={idx}
                  onClick={() => link.url && router.get(link.url, {}, { preserveState: true, replace: true })}
                  className={`px-2 py-1 rounded border ${link.active
                    ? 'bg-[var(--app-primary)] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  disabled={!link.url}
                  dangerouslySetInnerHTML={{ __html: label }}
                />
              );
            })}
          </div>
        )}
</main>
</>

    );
}
