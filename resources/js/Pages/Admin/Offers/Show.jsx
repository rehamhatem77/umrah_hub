import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, usePage } from "@inertiajs/react";
import Select from "react-select";
import { motion } from "framer-motion";
import { FiChevronLeft, FiMapPin, FiStar } from "react-icons/fi";
import { FaRegBuilding } from "react-icons/fa6";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const pageMotion = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0 },
};

const quillModules = {
    toolbar: false, // disable toolbar in read-only
};

const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "align",
    "link",
];

const Switch = ({ checked, label }) => (
    <div className="flex items-center justify-between cursor-not-allowed select-none opacity-70">
        <span className="text-sm font-medium">{label}</span>
        <div
            className={`w-11 h-6 rounded-full ${checked ? "bg-[var(--app-primary)]" : "bg-gray-300"}`}
        />
        <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow ${checked ? "translate-x-5" : ""}`}
        />
    </div>
);

export default function ShowOffer({
    offer,
    governorates,
    tripTypes,
    hotels,
    companies,
    features,
}) {
    const { flash } = usePage().props;
  const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        const d = new Date(dateString);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    return (
        <AuthenticatedLayout>
            <motion.div
                variants={pageMotion}
                initial="hidden"
                animate="visible"
                className="px-3 sm:px-6 space-y-6"
            >
                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <button onClick={() => router.get(route("dashboard"))}>
                        لوحة التحكم
                    </button>
                    <FiChevronLeft />
                    <button
                        onClick={() => router.get(route("admin.offers.index"))}
                    >
                        الباقات
                    </button>
                    <FiChevronLeft />
                    <span className="text-[var(--app-primary)] font-medium">
                        عرض بيانات الباقة
                    </span>
                </div>

                <h1 className="text-xl font-bold">عرض بيانات الباقة</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="card p-6 space-y-4">
                            <h3 className="font-bold text-lg">
                                المعلومات الأساسية
                            </h3>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">
                                        عنوان الباقة
                                    </label>
                                    <input
                                        value={offer.title}
                                        disabled
                                        className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                                    />
                                </div>

                                <div>
                                    <label className="label">كود الباقة</label>
                                    <input
                                        value={offer.offer_code}
                                        disabled
                                        className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="label">وصف مختصر</label>
                                <textarea
                                    value={offer.desc || "—"}
                                    disabled
                                    rows={3}
                                    className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">
                                        السعر (جنيه)
                                    </label>
                                    <input
                                        value={offer.price}
                                        disabled
                                        className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                                    />
                                </div>

                                <div>
                                    <label className="label">مدة الرحلة</label>
                                    <input
                                        value={`${offer.duration_days} أيام`}
                                        disabled
                                        className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div className="w-full">
                                <label className="label ">
                                    الأسعار الإضافية (جنيه)
                                </label>

                                {offer.prices && offer.prices.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                        {offer.prices.map((price, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center p-1 border rounded-lg bg-gray-50"
                                            >
                                                <span className="font-medium text-gray-800">
                                                    {price.title}:
                                                </span>
                                                <span className="text-gray-600">
                                                    {price.amount}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 mt-1">
                                        لا توجد أسعار إضافية
                                    </p>
                                )}
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">
                                        تاريخ بداية الباقة
                                    </label>
                                    <input
                                        type="date"
                                        value={formatDateForInput(offer.start_date)}
                                        disabled
                                        className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        تاريخ نهاية الباقة
                                    </label>
                                    <input
                                        type="date"
                                        value={formatDateForInput(offer.end_date)}
                                        disabled
                                        className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">
                                        عدد الأماكن المتاحة
                                    </label>
                                    <input
                                        value={offer.available_places}
                                        disabled
                                        className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                                    />
                                </div>

                                <div>
                                    <label className="label">رقم واتساب</label>
                                    <input
                                        value={
                                            offer.whatsapp_number !==
                                            "01111111111"
                                                ? offer.whatsapp_number
                                                : "لا يوجد"
                                        }
                                        disabled
                                        className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="label">مستوى الرحلة</label>
                                <input
                                    value={
                                        offer.tour_level === "vip"
                                            ? "VIP"
                                            : offer.tour_level === "standard"
                                              ? "عادي"
                                              : "اقتصادي"
                                    }
                                    disabled
                                    className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label flex gap-1">
                                        <FiMapPin /> المحافظة
                                    </label>
                                    <input
                                        value={
                                            offer.governorates
                                                ?.map((g) => g.name)
                                                .join(", ") || ""
                                        }
                                        disabled
                                        className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                                    />
                                </div>

                                <div>
                                    <label className="label flex gap-1">
                                        نوع الرحلة
                                    </label>
                                    <input
                                        value={offer.trip_type?.name}
                                        disabled
                                        className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label flex gap-1">
                                        <FaRegBuilding /> شركة السياحة
                                    </label>
                                    <input
                                        value={offer.company?.name}
                                        disabled
                                        className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                                    />
                                </div>

                                <div>
                                    <label className="label">الطيران</label>
                                    <input
                                        value={offer.airline}
                                        disabled
                                        className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label flex items-center gap-1">
                                        <FiStar /> التقييم
                                    </label>
                                    <input
                                        value={offer.rating || "—"}
                                        disabled
                                        className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        عدد المقيمين
                                    </label>
                                    <input
                                        value={
                                            offer.number_of_rating_customers ||
                                            "—"
                                        }
                                        disabled
                                        className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                            <div className="card p-6 space-y-4">
                                <h3 className="font-bold text-lg">
                                    تفاصيل السعر
                                </h3>

                                <div>
                                    <label className="label">السعر يشمل</label>
                                    <textarea
                                        value={offer.price_contain || "—"}
                                        disabled
                                        rows={3}
                                        className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        السعر لا يشمل
                                    </label>
                                    <textarea
                                        value={offer.price_not_contain || "—"}
                                        disabled
                                        rows={3}
                                        className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Hotels */}
                        <div className="card p-6 space-y-4">
                            <h3 className="font-bold text-lg">
                                تفاصيل الاقامة
                            </h3>
                            <div>
                                <label className="label flex gap-1">
                                    <FiMapPin /> الفنادق
                                </label>
                                <input
                                    value={
                                        offer.hotels
                                            ?.map((h) => h.name)
                                            .join(", ") || ""
                                    }
                                    disabled
                                    className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Program */}
                        <div className="card p-6">
                            <h3 className="font-bold mb-4">برنامج الرحلة</h3>

                            <div className="space-y-4">
                                {offer.program && offer.program.length > 0 ? (
                                    offer.program.map((day, index) => (
                                        <div
                                            key={index}
                                            className="border rounded-lg p-4 bg-gray-50"
                                        >
                                            <h4 className="font-semibold mb-2">
                                                اليوم {day.day}
                                                {day.title && ` – ${day.title}`}
                                            </h4>

                                            {day.desc && (
                                                <p className="text-gray-700 whitespace-pre-line">
                                                    {day.desc}
                                                </p>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">
                                        لا يوجد برنامج رحلة
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* SEO */}
                        <div className="card p-6 space-y-4">
                            <h3 className="font-bold text-lg">
                                معلومات تحسين محركات البحث (SEO)
                            </h3>
                            <div>
                                <label className="label">عنوان SEO</label>
                                <input
                                    value={offer.seo_title}
                                    disabled
                                    className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="label">وصف SEO</label>
                                <textarea
                                    value={offer.seo_description}
                                    disabled
                                    className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                                    rows={4}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 lg:sticky lg:top-6">
                        <div className="card p-6 space-y-4">
                            <h3 className="font-bold text-sm">حالة الباقة</h3>
                            <Switch label="نشط" checked={offer.is_active} />
                            <Switch
                                label="عرض مميز"
                                checked={offer.is_featured}
                            />
                            <Switch
                                label="عرض خاص"
                                checked={offer.is_special_offer}
                            />
                            <Switch label="شائع" checked={offer.is_popular} />
                        </div>

                        <div className="card p-6">
                            <h3 className="font-bold mb-3">معرض الصور</h3>
                            {offer.images?.length > 0 ? (
                                <div className="grid grid-cols-3 gap-2 mt-4">
                                    {(offer.images || [])
                                        .filter((img) => img?.image_path)
                                        .map((img, index) => (
                                            <div
                                                key={index}
                                                className="relative aspect-square rounded-lg overflow-hidden border"
                                            >
                                                <img
                                                    src={
                                                        img.image_path.startsWith(
                                                            "http",
                                                        )
                                                            ? img.image_path
                                                            : `/storage/${img.image_path}`
                                                    }
                                                    alt={`offer-image-${index}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                {img.is_main && (
                                                    <div className="absolute top-1 left-1 p-1 rounded-full bg-yellow-400 text-white">
                                                        <FiStar size={12} />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm">
                                    لا توجد صور
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="label">المميزات</label>
                            <input
                                value={
                                    offer.features
                                        ?.map((f) => f.name)
                                        .join(", ") || ""
                                }
                                disabled
                                className="input w-full py-2.5 px-3 text-sm rounded-lg bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </AuthenticatedLayout>
    );
}
