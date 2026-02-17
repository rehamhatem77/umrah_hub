import { FaFilter, FaSlidersH, FaCalendarAlt, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Range } from "react-range";
import { router, usePage } from "@inertiajs/react";
import toArabicNumbers from "@/Components/Utils/ArabicNumbers";
import Select from "react-select";

export default function PackageFilter({
    priceRange,
    counts = {},
    governorates,
}) {
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);

        const priceFrom = queryParams.get("price_from");
        const priceTo = queryParams.get("price_to");

        if (priceFrom && priceTo) {
            setSelectedPrice([Number(priceFrom), Number(priceTo)]);
        }

        const date = queryParams.get("date");
        if (date) {
            setSelectedDate(date);
        }

        const durations = [];

        for (const [key, value] of queryParams.entries()) {
            if (key.startsWith("durations[")) {
                durations.push(value);
            }
        }

        const mappedDurations = durations
            .map((d) => {
                if (d === "7") return "٧ أيام";
                if (d === "10") return "١٠ أيام";
                if (d === "14") return "١٤ يوم فأكثر";
                return null;
            })
            .filter(Boolean);

        setSelectedDurations(mappedDurations);

        const stars = queryParams.getAll("stars[]").map(Number);
        if (stars.length) {
            setSelectedStars(stars);
        }

        const govId = queryParams.get("governorate_id");
        if (govId) {
            setSelectedGovernment(Number(govId));
        }
    }, []);

    const [selectedGovernment, setSelectedGovernment] = useState(null);
    const [selectedDurations, setSelectedDurations] = useState([]);
    const [selectedStars, setSelectedStars] = useState([]);

    const [selectedDate, setSelectedDate] = useState("");

    const MIN = Math.floor(priceRange?.min ?? 0);
    const MAX = Math.ceil(priceRange?.max ?? 10000);
    const STEP = 500;
    const [selectedPrice, setSelectedPrice] = useState([MIN, MAX]);

    const { url } = usePage();
    const getCurrentParams = () => {
        const queryString = url.includes("?") ? url.split("?")[1] : "";
        return Object.fromEntries(new URLSearchParams(queryString));
    };

    // const governments = ["الحكومة السعودية", "الحكومة المصرية", "الحكومة الأردنية"];
    const durations = ["٧ أيام", "١٠ أيام", "١٤ يوم فأكثر"];
    const starsOptions = [5, 4];

    const toggleSelection = (value, stateArray, setState) => {
        if (stateArray.includes(value)) {
            setState(stateArray.filter((v) => v !== value));
        } else {
            setState([...stateArray, value]);
        }
    };
    const mapDurations = (durations) => {
        return durations
            .map((d) => {
                if (d === "٧ أيام") return "7";
                if (d === "١٠ أيام") return "10";
                if (d === "١٤ يوم فأكثر") return "14";
                return null;
            })
            .filter(Boolean);
    };
    const arabicToNumber = {
        "٧ أيام": "7",
        "١٠ أيام": "10",
        "١٤ يوم فأكثر": "14",
    };

    const selectStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: "22px",
            borderRadius: "10px",
            borderColor: state.selectProps.hasError
                ? "#ef4444"
                : state.isFocused
                  ? "var(--app-primary)"
                  : "#d1d5db",
            boxShadow: state.isFocused
                ? "0 0 0 2px rgba(15,61,46,.12)"
                : "none",
            cursor: "default",

            "&:hover": {
                cursor: "default",
                borderColor: state.isFocused ? "var(--app-primary)" : "#9ca3af",
            },
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? "var(--app-primary)"
                : state.isFocused
                  ? "rgba(15,61,46,0.08)"
                  : "#fff",
            color: state.isSelected ? "#fff" : "#333",
        }),
    };

    const handleMobileFilterToggle = () => {
        const filterPanel = document.getElementById("mobile-filter-panel");
        if (filterPanel) {
            filterPanel.classList.toggle("hidden");
        }
    };

    const applyFilters = () => {
        console.log("Selected government:", selectedGovernment);
        router.get(
            route("packages"),
            {
                price_from: selectedPrice[0],
                price_to: selectedPrice[1],
                date: selectedDate || null,
                durations: mapDurations(selectedDurations),
                stars: selectedStars,
                governorate_id: selectedGovernment,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <aside className="lg:col-span-3 space-y-6">
            <button
                onClick={handleMobileFilterToggle}
                className="lg:hidden w-full flex items-center justify-between text-black bg-white p-4 rounded-xl border border-[#f0f4f2] shadow-sm"
            >
                <span className="font-bold">تصفية النتائج</span>
                <FaFilter className="text-lg text-black" />
            </button>

            <div
                id="mobile-filter-panel"
                className="hidden lg:block bg-white rounded-xl border border-[#f0f4f2] shadow-sm overflow-hidden sticky top-24"
            >
                <div className="p-5 border-b border-[#f0f4f2] flex justify-between items-center bg-[#fafbfc]">
                    <h3 className="font-bold text-black text-lg flex items-center gap-2">
                        <FaSlidersH className="text-green-600" />
                        تصفية
                    </h3>
                    <button
                        className="text-xs text-green-600 hover:text-primary underline"
                        onClick={() => {
                            setSelectedDurations([]);
                            setSelectedStars([]);
                            // setActiveFilter("");
                            setSelectedPrice([MIN, MAX]);
                            setSelectedDate("");
                            setSelectedGovernment(null);
                            // router.get(
                            //     route("packages"),
                            //     {},
                            //     { preserveState: true, replace: true },
                            // );
                            const params = getCurrentParams();

                            router.get(
                                route(route().current()),
                                {
                                    ...params,
                                    filter: f.value || undefined,
                                },
                                {
                                    preserveState: true,
                                    preserveScroll: true,
                                    replace: true,
                                },
                            );
                        }}
                    >
                        إعادة تعيين
                    </button>
                </div>

                <div className="p-5 space-y-8">
                    <div className="">
                        <label className="text-sm font-bold text-[#111813]">
                            نطاق السعر (ج.م)
                        </label>

                        <Range
                            step={STEP}
                            min={MIN}
                            max={MAX}
                            rtl={true}
                            values={selectedPrice}
                            onChange={(values) =>
                                setSelectedPrice(
                                    values.map((v) => Math.round(v)),
                                )
                            }
                            renderTrack={({ props, children }) => (
                                <div
                                    {...props}
                                    className="relative h-2 bg-[#dce5df] rounded-full mt-8 mb-4"
                                    style={{ direction: "rtl" }}
                                >
                                    <div
                                        className="absolute h-2 bg-[#111813] rounded-full"
                                        style={{
                                            right: `${((selectedPrice[0] - MIN) / (MAX - MIN)) * 100}%`,
                                            width: `${((selectedPrice[1] - selectedPrice[0]) / (MAX - MIN)) * 100}%`,
                                        }}
                                    />
                                    {children}
                                </div>
                            )}
                            renderThumb={({ props }) => (
                                <div
                                    {...props}
                                    className="w-5 h-5 bg-white border-2 border-[#111813] rounded-full shadow-md"
                                >
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#111813] text-white text-[10px] py-0.5 px-1.5 rounded">
                                        {toArabicNumbers(
                                            props["aria-valuenow"],
                                        )}
                                    </span>
                                </div>
                            )}
                        />

                        <div
                            className="flex justify-between text-xs text-green-600"
                            style={{ direction: "rtl" }}
                        >
                            <span>{toArabicNumbers(MIN)} ج.م</span>
                            <span>{toArabicNumbers(MAX)} ج.م</span>
                        </div>
                    </div>

                    <hr className="border-dashed border-[#f0f4f2]" />

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-[#111813]">
                            تاريخ السفر
                        </label>
                        <div className="relative">
                            <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600" />
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) =>
                                    setSelectedDate(e.target.value)
                                }
                                className="w-full bg-[#f6f8f6] border-none rounded-lg py-2.5 pr-10 pl-3 text-sm focus:ring-2 focus:ring-primary/50 text-[#111813]"
                            />
                        </div>
                    </div>

                    <hr className="border-dashed border-[#f0f4f2]" />

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-[#111813]">
                            مدة الرحلة
                        </label>
                        <div className="space-y-2 text-sm">
                            {durations.map((label, i) => (
                                <label
                                    key={i}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedDurations.includes(
                                            label,
                                        )}
                                        onChange={() =>
                                            toggleSelection(
                                                label,
                                                selectedDurations,
                                                setSelectedDurations,
                                            )
                                        }
                                        className="size-4 rounded border-[#dce5df] text-primary focus:ring-primary/20"
                                    />
                                    <span className="text-[#4b5563] group-hover:text-primary transition-colors">
                                        {label}
                                    </span>
                                    <span className="mr-auto text-xs text-[#9ca3af]">
                                        {" "}
                                        ({counts?.[arabicToNumber[label]] ?? 0})
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <hr className="border-dashed border-[#f0f4f2]" />

                    {/* Government */}
                    {/* <div className="space-y-3">
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
          </div> */}

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-[#111813]">
                            المحافظة
                        </label>
                        <div className="space-y-2 text-sm">
                            <Select
                                styles={selectStyles}
                                placeholder="اختر المحافظة"
                                options={governorates.map((g) => ({
                                    value: g.id,
                                    label: g.name,
                                }))}
                                value={
                                    selectedGovernment
                                        ? {
                                              value: selectedGovernment,
                                              label: governorates.find(
                                                  (g) =>
                                                      g.id ===
                                                      selectedGovernment,
                                              )?.name,
                                          }
                                        : null
                                }
                                onChange={(option) => {
                                    setSelectedGovernment(
                                        option ? option.value : null,
                                    );
                                }}
                            />
                        </div>
                    </div>

                    <hr className="border-dashed border-[#f0f4f2]" />

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-[#111813]">
                            تصنيف الفندق
                        </label>
                        <div className="space-y-2">
                            {starsOptions.map((stars) => (
                                <label
                                    key={stars}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedStars.includes(stars)}
                                        onChange={() =>
                                            toggleSelection(
                                                stars,
                                                selectedStars,
                                                setSelectedStars,
                                            )
                                        }
                                        className="size-4 rounded border-[#dce5df] text-primary focus:ring-primary/20"
                                    />
                                    <div className="flex text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={
                                                    i < stars
                                                        ? ""
                                                        : "text-[#dce5df]"
                                                }
                                            />
                                        ))}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            onClick={applyFilters}
                            className="w-full btn-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                        >
                            تطبيق الفلاتر
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}
