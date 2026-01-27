import { FaFilter, FaSlidersH, FaCalendarAlt, FaStar } from "react-icons/fa";
import { useState } from "react";
import { Range } from "react-range";

export default function PackageFilter() {
  const [selectedGovernments, setSelectedGovernments] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedStars, setSelectedStars] = useState([]);
 
  const [selectedDate, setSelectedDate] = useState("");

const MIN = 1000;
const MAX = 20000;
const STEP = 500;
const [selectedPrice, setSelectedPrice] = useState([MIN, MAX]);

  const governments = ["الحكومة السعودية", "الحكومة المصرية", "الحكومة الأردنية"];
  const durations = ["٥ - ٧ أيام", "١٠ أيام", "١٤ يوم فأكثر"];
  const starsOptions = [5, 4];

  const toggleSelection = (value, stateArray, setState) => {
    if (stateArray.includes(value)) {
      setState(stateArray.filter((v) => v !== value));
    } else {
      setState([...stateArray, value]);
    }
  };

  return (
    <aside className="lg:col-span-3 space-y-6">
      {/* Mobile Filter Toggle */}
      <button className="lg:hidden w-full flex items-center justify-between bg-white p-4 rounded-xl border border-[#f0f4f2] shadow-sm">
        <span className="font-bold">تصفية النتائج</span>
        <FaFilter className="text-lg text-primary" />
      </button>

      {/* Desktop Filter */}
      <div className="hidden lg:block bg-white rounded-xl border border-[#f0f4f2] shadow-sm overflow-hidden sticky top-24">
        
        {/* Header */}
        <div className="p-5 border-b border-[#f0f4f2] flex justify-between items-center bg-[#fafbfc]">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <FaSlidersH className="text-primary" />
            تصفية
          </h3>
          <button
            className="text-xs text-[#63886f] hover:text-primary underline"
            onClick={() => {
              setSelectedGovernments([]);
              setSelectedDurations([]);
              setSelectedStars([]);
              setSelectedPrice([1000, 20000]);
              setSelectedDate("");
            }}
          >
            إعادة تعيين
          </button>
        </div>

        <div className="p-5 space-y-8">

          {/* Price */}
    <div className="space-y-4">
      <label className="text-sm font-bold text-[#111813]">نطاق السعر (ر.س)</label>

      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={selectedPrice}
        onChange={(values) => setSelectedPrice(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="relative h-2 bg-[#dce5df] rounded-full mt-6 mb-4"
          >
            <div
              className="absolute h-2 bg-[#111813] rounded-full"
              style={{
                left: `${((selectedPrice[0] - MIN) / (MAX - MIN)) * 100}%`,
                width: `${((selectedPrice[1] - selectedPrice[0]) / (MAX - MIN)) * 100}%`,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="size-5 bg-white border-2 border-[#111813] rounded-full shadow-md"
          >
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#111813] text-white text-[10px] py-0.5 px-1.5 rounded">
              {props["aria-valuenow"]}
            </span>
          </div>
        )}
      />

      <div className="flex justify-between text-xs text-[#63886f]">
        <span>{MIN} ر.س</span>
        <span>{MAX} ر.س</span>
      </div>
    </div>

          <hr className="border-dashed border-[#f0f4f2]" />

          {/* Travel Date */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-[#111813]">تاريخ السفر</label>
            <div className="relative">
              <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-[#63886f]" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-[#f6f8f6] border-none rounded-lg py-2.5 pr-10 pl-3 text-sm focus:ring-2 focus:ring-primary/50 text-[#111813]"
              />
            </div>
          </div>

          <hr className="border-dashed border-[#f0f4f2]" />

          {/* Duration */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-[#111813]">مدة الرحلة</label>
            <div className="space-y-2 text-sm">
              {durations.map((label, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedDurations.includes(label)}
                    onChange={() => toggleSelection(label, selectedDurations, setSelectedDurations)}
                    className="size-4 rounded border-[#dce5df] text-primary focus:ring-primary/20"
                  />
                  <span className="text-[#4b5563] group-hover:text-primary transition-colors">{label}</span>
                  <span className="mr-auto text-xs text-[#9ca3af]">(١٢)</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-dashed border-[#f0f4f2]" />

          {/* Government */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-[#111813]">الجهة الحكومية</label>
            <div className="space-y-2 text-sm">
              {governments.map((gov, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedGovernments.includes(gov)}
                    onChange={() => toggleSelection(gov, selectedGovernments, setSelectedGovernments)}
                    className="size-4 rounded border-[#dce5df] text-primary focus:ring-primary/20"
                  />
                  <span className="text-[#4b5563] group-hover:text-primary transition-colors">{gov}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-dashed border-[#f0f4f2]" />

          {/* Hotel Rating */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-[#111813]">تصنيف الفندق</label>
            <div className="space-y-2">
              {starsOptions.map((stars) => (
                <label key={stars} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedStars.includes(stars)}
                    onChange={() => toggleSelection(stars, selectedStars, setSelectedStars)}
                    className="size-4 rounded border-[#dce5df] text-primary focus:ring-primary/20"
                  />
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < stars ? "" : "text-[#dce5df]"} />
                    ))}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <div className="pt-2">
            <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
              تطبيق الفلاتر
            </button>
          </div>

        </div>
      </div>
    </aside>
  );
}
