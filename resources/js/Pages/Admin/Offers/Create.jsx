import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, router, usePage } from "@inertiajs/react";
import Select from "react-select";
import InputError from "@/Components/InputError";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiChevronLeft, FiSave, FiMapPin, FiUpload } from "react-icons/fi";
import { FaPlus, FaRegBuilding, FaStar } from "react-icons/fa6";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MdOutlineHotel } from "react-icons/md";
import toArabicNumbers from "@/Components/Utils/ArabicNumbers";

const pageMotion = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0 },
};
const quillModules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link"],
        ["clean"],
    ],
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

const Switch = ({ checked, onChange, label }) => (
    <label className="flex items-center justify-between cursor-pointer select-none">
        <span className="text-sm font-medium">{label}</span>
        <div className="relative">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="sr-only"
            />
            <div
                className={`w-11 h-6 rounded-full transition ${
                    checked ? "bg-[var(--app-primary)]" : "bg-gray-300"
                }`}
            />
            <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition ${
                    checked ? "translate-x-5" : ""
                }`}
            />
        </div>
    </label>
);

export default function Create({
    governorates,
    tripTypes,
    hotels,
    companies,
    features,
}) {
    const { flash } = usePage().props;

    const form = useForm({
        offer_code: "",
        title: "",
        seo_title: "",
        seo_description: "",

        desc: "",
        rating: "",
        number_of_rating_customers: "",
        price_contain: "",
        price_not_contain: "",

        trip_type_id: null,
        company_id: null,
        governorates: [],
        hotels: [],

        duration_days: "",
        price: "",
        airline: "",
        // program_days: [],
        program: [],
        prices: [],
        start_date: "",
        end_date: "",
        available_places: "",
        whatsapp_number: "",
        tour_level: "economical",

        is_active: true,
        is_special_offer: false,
        is_featured: false,
        is_popular: false,

        features: [],
        images: [],
        is_main_image: 0,
    });

    const [previewImages, setPreviewImages] = useState([]);
    const [frontendErrors, setFrontendErrors] = useState({});
    const [selectedHotel, setSelectedHotel] = useState(null);
    const noOptionsMessage = () => "لا توجد بيانات";
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [newPrice, setNewPrice] = useState({
        title: null,
        amount: "",
    });
    const [addPriceErrors, setAddPriceErrors] = useState({
        title: null,
        amount: null,
    });

    const [priceContainItems, setPriceContainItems] = useState(
        form.data.price_contain
            ? form.data.price_contain.split(",").map((i) => i.trim())
            : [],
    );
    const [priceNotContainItems, setPriceNotContainItems] = useState(
        form.data.price_not_contain
            ? form.data.price_not_contain.split(",").map((i) => i.trim())
            : [],
    );

    const addPriceContainItem = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const value = e.target.value.trim();
            if (!value) return;

            const updated = [...priceContainItems, value];
            setPriceContainItems(updated);
            form.setData("price_contain", updated.join(", "));

            e.target.value = "";
            setFrontendErrors((p) => ({ ...p, price_contain: null }));
        }
    };
    const removePriceContainItem = (index) => {
        const updated = priceContainItems.filter((_, i) => i !== index);
        setPriceContainItems(updated);
        form.setData("price_contain", updated.join(", "));
    };

    const addPriceNotContainItem = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const value = e.target.value.trim();
            if (!value) return;

            const updated = [...priceNotContainItems, value];
            setPriceNotContainItems(updated);
            form.setData("price_not_contain", updated.join(", "));

            e.target.value = "";
            setFrontendErrors((p) => ({ ...p, price_not_contain: null }));
        }
    };

    const removePriceNotContainItem = (index) => {
        const updated = priceNotContainItems.filter((_, i) => i !== index);
        setPriceNotContainItems(updated);
        form.setData("price_not_contain", updated.join(", "));
    };

    const selectStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: "44px",
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

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleImages = (e) => {
        const newFiles = Array.from(e.target.files);

        const MAX_SIZE_KB = 2048;
        const MAX_IMAGES = 10;

        const errors = [];
        if (form.data.images.length + newFiles.length > MAX_IMAGES) {
            errors.push(`الحد الأقصى ${MAX_IMAGES} صور`);
        }
        newFiles.forEach((file, idx) => {
            const sizeInKB = file.size / 1024;
            if (sizeInKB > MAX_SIZE_KB) {
                errors.push(
                    `حجم الصورة رقم ${idx + 1} أكبر من ${MAX_SIZE_KB} كيلوبايت`,
                );
            }
        });

        if (errors.length) {
            toast.error(errors.join("\n"));

            e.target.value = null;
            return;
        }

        form.setData("images", [...form.data.images, ...newFiles]);

        setPreviewImages((prev) => [
            ...prev,
            ...newFiles.map((file) => URL.createObjectURL(file)),
        ]);

        e.target.value = null;
    };

    useEffect(() => {
        if (!form.data.duration_days) return;

        const days = Number(form.data.duration_days);

        const generatedDays = Array.from({ length: days }, (_, i) => ({
            day: i + 1,
            label: `اليوم ${toArabicNumbers(i + 1)}`,
            title: "",
            desc: "",
        }));

        form.setData("program", generatedDays);
    }, [form.data.duration_days]);
    // useEffect(() => {
    //     form.setData("program", form.data.program);
    // }, [form.data.program]);

    useEffect(() => {
        if (form.data.program && form.data.program.length > 0) {
            form.setData("program", form.data.program);
           
        }
    }, []);

    // const updateProgramDay = (index, key, value) => {
    //     const updated = [...form.data.program];
    //     updated[index][key] = value;
    //     form.setData("program", updated);
    // };

    const removeImage = (index) => {
        const imgs = [...previewImages];
        imgs.splice(index, 1);
        setPreviewImages(imgs);

        const files = [...form.data.images];
        files.splice(index, 1);
        form.setData("images", files);
    };

    const validate = () => {
        const errors = {};

        if (!form.data.title.trim()) errors.title = "عنوان الباقة مطلوب";
        if (!form.data.offer_code.trim())
            errors.offer_code = "كود الباقة مطلوب";
        if (!form.data.price) errors.price = "السعر مطلوب";
        if (!form.data.duration_days)
            errors.duration_days = "مدة الرحلة مطلوبة";
        if (!form.data.trip_type_id) errors.trip_type_id = "اختر نوع الرحلة";
        if (!form.data.company_id) errors.company_id = "اختر شركة السياحة";
        if (!form.data.airline) errors.airline = "اختر الطيران";
        if (!form.data.governorates.length)
            errors.governorates = "اختر محافظة واحدة على الأقل";
        if (!form.data.desc.trim()) errors.desc = "الوصف المختصر مطلوب";

        if (!form.data.rating || Number(form.data.rating) < 1)
            errors.rating = "التقييم يجب أن يكون رقمًا أكبر من أو يساوي 1";

        if (
            !form.data.number_of_rating_customers ||
            Number(form.data.number_of_rating_customers) < 1
        )
            errors.number_of_rating_customers =
                "عدد المقيمين يجب أن يكون 1 على الأقل";

        if (!form.data.price_contain.trim())
            errors.price_contain = "هذا الحقل مطلوب";

        if (!form.data.price_not_contain.trim())
            errors.price_not_contain = "هذا الحقل مطلوب";

        if (!form.data.hotels.length)
            errors.hotels = "اختر فندق واحد على الأقل";

        if (form.data.images.length === 0)
            errors.images = "يرجى رفع صورة واحدة على الأقل";
        if (!form.data.start_date)
            errors.start_date = "اختر تاريخ بداية الباقة";
        if (!form.data.end_date) errors.end_date = "اختر تاريخ نهاية الباقة";
        const hasAtLeastOneDayFilled = form.data.program.some(
            (day) =>
                (day.title && day.title.trim() !== "") ||
                (day.desc && day.desc.trim() !== ""),
        );
        if (!hasAtLeastOneDayFilled)
            errors.program = "يجب إدخال بيانات يوم واحد على الأقل";

        if (!form.data.tour_level) errors.tour_level = "اختر مستوى الرحلة";
        if (!form.data.available_places)
            errors.available_places = "عدد الأماكن المتاحة مطلوب";
        if (!form.data.seo_title.trim()) errors.seo_title = "  مطلوب";
        if (!form.data.seo_description.trim())
            errors.seo_description = " مطلوب";

        setFrontendErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const submit = (e) => {
        e.preventDefault();
        form.setData("program", form.data.program);
        console.log(form.data);
        if (!validate()) return;
        if (!form.data.program || form.data.program.length === 0) {
            setFrontendErrors((prev) => ({
                ...prev,
                program: "يجب إدخال بيانات يوم واحد على الأقل",
            }));
            return;
        }

        form.post(route("admin.offers.store"), {
            forceFormData: true,
            onSuccess: () => {
                router.get(route("admin.offers.index"));
            },
            onError: (error) => {
                console.log(error);
                toast.error(
                    `حدثت أخطاء في الإدخال، يرجى المراجعة والتمحيص مرة أخرى.`,
                );
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <motion.div
                variants={pageMotion}
                initial="hidden"
                animate="visible"
                className=" px-3 sm:px-6 space-y-6"
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
                        إضافة باقة جديدة
                    </span>
                </div>

                <h1 className="text-xl font-bold">إضافة باقة رحلة جديدة</h1>
                <form
                    onSubmit={submit}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
                >
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
                                        className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm ${
                                            frontendErrors.title &&
                                            "border-red-500"
                                        }`}
                                        placeholder="مثال: عمرة رمضان 2026"
                                        value={form.data.title}
                                        onChange={(e) => {
                                            form.setData(
                                                "title",
                                                e.target.value,
                                            );
                                            setFrontendErrors((p) => ({
                                                ...p,
                                                title: null,
                                            }));
                                        }}
                                    />
                                    <InputError
                                        message={
                                            frontendErrors.title ||
                                            form.errors.title
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="label">كود الباقة</label>
                                    <input
                                        className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm ${
                                            frontendErrors.offer_code &&
                                            "border-red-500"
                                        }`}
                                        placeholder="مثال: UM2026"
                                        value={form.data.offer_code}
                                        onChange={(e) => {
                                            form.setData(
                                                "offer_code",
                                                e.target.value,
                                            );
                                            setFrontendErrors((p) => ({
                                                ...p,
                                                offer_code: null,
                                            }));
                                        }}
                                    />
                                    <InputError
                                        message={
                                            frontendErrors.offer_code ||
                                            form.errors.offer_code
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    وصف مختصر للباقة
                                </label>
                                <textarea
                                    rows={3}
                                    className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm  ${frontendErrors.desc && "border-red-500"}`}
                                    placeholder="وصف مختصر لا يتجاوز 2555 حرف"
                                    value={form.data.desc}
                                    onChange={(e) => {
                                        form.setData("desc", e.target.value);
                                        setFrontendErrors((p) => ({
                                            ...p,
                                            desc: null,
                                        }));
                                    }}
                                />
                                <InputError
                                    message={
                                        frontendErrors.desc || form.errors.desc
                                    }
                                />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4 ">
                                <div>
                                    <label className="label">
                                        السعر (جنيه)
                                    </label>
                                    <input
                                        type="number"
                                        min={0}
                                        className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm ${
                                            frontendErrors.price &&
                                            "border-red-500"
                                        }`}
                                        value={form.data.price}
                                        onChange={(e) => {
                                            form.setData(
                                                "price",
                                                e.target.value,
                                            );
                                            setFrontendErrors((p) => ({
                                                ...p,
                                                price: null,
                                            }));
                                        }}
                                    />
                                    <InputError
                                        message={
                                            frontendErrors.price ||
                                            form.errors.price
                                        }
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="label">
                                        أسعار اضافية (جنيه)
                                    </label>
                                    <button
                                        type="button"
                                        className="btn btn-primary "
                                        onClick={() => setShowPriceModal(true)}
                                    >
                                        <div className="flex items-center justify-center gap-3">
                                            <FaPlus className="text-lg" />
                                            <span>اضافة سعر</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            {form.data.prices?.length > 0 && (
                                <div className="mt-6 bg-gray-50 rounded-2xl p-4 shadow-sm">
                                    <h3 className="text-sm font-semibold mb-3 text-gray-700">
                                        معاينة الأسعار الإضافية
                                    </h3>

                                    <div className="space-y-3">
                                        {form.data.prices.map(
                                            (price, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm border"
                                                >
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-800">
                                                            {price.title}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {price.amount} جنيه
                                                        </p>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="text-red-500 text-xs hover:underline"
                                                        onClick={() => {
                                                            const updated =
                                                                form.data.prices.filter(
                                                                    (_, i) =>
                                                                        i !==
                                                                        index,
                                                                );
                                                            form.setData(
                                                                "prices",
                                                                updated,
                                                            );
                                                        }}
                                                    >
                                                        حذف
                                                    </button>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">
                                        تاريخ بداية الباقة
                                    </label>
                                    <input
                                        type="date"
                                        className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm ${
                                            frontendErrors.start_date &&
                                            "border-red-500"
                                        }`}
                                        value={form.data.start_date}
                                        onChange={(e) => {
                                            form.setData(
                                                "start_date",
                                                e.target.value,
                                            );
                                            setFrontendErrors((p) => ({
                                                ...p,
                                                start_date: null,
                                            }));
                                        }}
                                    />
                                    <InputError
                                        message={
                                            frontendErrors.start_date ||
                                            form.errors.start_date
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        تاريخ نهاية الباقة
                                    </label>
                                    <input
                                        type="date"
                                        min={form.data.start_date || undefined}
                                        className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm ${frontendErrors.end_date && "border-red-500"}`}
                                        value={form.data.end_date}
                                        onChange={(e) => {
                                            form.setData(
                                                "end_date",
                                                e.target.value,
                                            );
                                            setFrontendErrors((p) => ({
                                                ...p,
                                                end_date: null,
                                            }));
                                        }}
                                    />
                                    <InputError
                                        message={
                                            frontendErrors.end_date ||
                                            form.errors.end_date
                                        }
                                    />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">
                                        عدد الأماكن المتاحة
                                    </label>
                                    <input
                                        type="number"
                                        className="input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm"
                                        value={form.data.available_places}
                                        onChange={(e) =>
                                            form.setData(
                                                "available_places",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={
                                            frontendErrors.available_places ||
                                            form.errors.available_places
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        رقم واتساب (اختياري)
                                    </label>
                                    <input
                                        className="input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm"
                                        placeholder="مثال: 201234567890"
                                        value={form.data.whatsapp_number}
                                        onChange={(e) =>
                                            form.setData(
                                                "whatsapp_number",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={form.errors.whatsapp_number}
                                    />
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">
                                        مستوى الرحلة
                                    </label>
                                    <Select
                                        styles={selectStyles}
                                        hasError={frontendErrors.tour_level}
                                        options={[
                                            {
                                                value: "economical",
                                                label: "اقتصادي",
                                            },
                                            {
                                                value: "standard",
                                                label: "متوسط",
                                            },
                                            { value: "vip", label: "VIP" },
                                            { value: "luxury", label: "فاخر" },
                                        ]}
                                        value={{
                                            value: form.data.tour_level,
                                            label:
                                                form.data.tour_level === "vip"
                                                    ? "VIP"
                                                    : form.data.tour_level ===
                                                        "standard"
                                                      ? "متوسط"
                                                      : form.data.tour_level ===
                                                          "economical"
                                                        ? "اقتصادي"
                                                        : form.data
                                                                .tour_level ===
                                                            "luxury"
                                                          ? "فاخر"
                                                          : "",
                                        }}
                                        onChange={(opt) =>
                                            form.setData(
                                                "tour_level",
                                                opt.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={
                                            frontendErrors.tour_level ||
                                            form.errors.tour_level
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="label">مدة الرحلة</label>

                                    <Select
                                        styles={selectStyles}
                                        hasError={frontendErrors.duration_days}
                                        noOptionsMessage={noOptionsMessage}
                                        placeholder="اختر مدة الرحلة"
                                        options={[
                                            { value: 7, label: "7 أيام" },
                                            { value: 10, label: "10 أيام" },
                                            { value: 14, label: "14 يوم" },
                                        ]}
                                        value={
                                            form.data.duration_days
                                                ? {
                                                      value: Number(
                                                          form.data
                                                              .duration_days,
                                                      ),
                                                      label: `${form.data.duration_days} أيام`,
                                                  }
                                                : null
                                        }
                                        onChange={(opt) => {
                                            form.setData(
                                                "duration_days",
                                                opt?.value,
                                            );
                                            setFrontendErrors((p) => ({
                                                ...p,
                                                duration_days: null,
                                            }));
                                        }}
                                    />

                                    <InputError
                                        message={
                                            frontendErrors.duration_days ||
                                            form.errors.duration_days
                                        }
                                    />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label flex gap-1">
                                        <FiMapPin /> المحافظة
                                    </label>
                                    <Select
                                        isMulti
                                        styles={selectStyles}
                                        placeholder="اختر المحافظات"
                                        options={governorates.map((g) => ({
                                            value: g.id,
                                            label: g.name,
                                        }))}
                                        onChange={(opts) => {
                                            form.setData(
                                                "governorates",
                                                opts
                                                    ? opts.map((o) => o.value)
                                                    : [],
                                            );
                                            setFrontendErrors((p) => ({
                                                ...p,
                                                governorates: null,
                                            }));
                                        }}
                                    />

                                    <InputError
                                        message={frontendErrors.governorates}
                                    />

                                    {/* <InputError
                                        message={
                                            frontendErrors.governorate_id
                                        }
                                    /> */}
                                </div>

                                <div>
                                    <label className="label">نوع الرحلة</label>
                                    <Select
                                        styles={selectStyles}
                                        noOptionsMessage={noOptionsMessage}
                                        hasError={frontendErrors.trip_type_id}
                                        placeholder="اختر نوع الرحلة"
                                        options={tripTypes.map((t) => ({
                                            value: t.id,
                                            label: t.name,
                                        }))}
                                        onChange={(opt) => {
                                            form.setData(
                                                "trip_type_id",
                                                opt?.value,
                                            );
                                            setFrontendErrors((p) => ({
                                                ...p,
                                                trip_type_id: null,
                                            }));
                                        }}
                                    />
                                    <InputError
                                        message={frontendErrors.trip_type_id}
                                    />
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label flex gap-1">
                                        <FaRegBuilding /> شركة السياحة
                                    </label>
                                    <Select
                                        styles={selectStyles}
                                        noOptionsMessage={noOptionsMessage}
                                        hasError={frontendErrors.company_id}
                                        placeholder="اختر شركة السياحة"
                                        options={companies.map((g) => ({
                                            value: g.id,
                                            label: g.name,
                                        }))}
                                        onChange={(opt) => {
                                            form.setData(
                                                "company_id",
                                                opt?.value,
                                            );
                                            setFrontendErrors((p) => ({
                                                ...p,
                                                company_id: null,
                                            }));
                                        }}
                                    />
                                    <InputError
                                        message={frontendErrors.company_id}
                                    />
                                </div>

                                <div>
                                    <label className="label">الطيران</label>
                                    <input
                                        className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm 

                                            
                                            ${
                                                frontendErrors.airline &&
                                                "border-red-500"
                                            }`}
                                        placeholder="مثال: مصر للطيران"
                                        value={form.data.airline}
                                        onChange={(e) => {
                                            form.setData(
                                                "airline",
                                                e.target.value,
                                            );
                                            setFrontendErrors((p) => ({
                                                ...p,
                                                airline: null,
                                            }));
                                        }}
                                    />
                                    <InputError
                                        message={frontendErrors.airline}
                                    />
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">التقييم</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="1"
                                        className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm  ${frontendErrors.rating && "border-red-500"}`}
                                        placeholder="مثال: 4.5"
                                        value={form.data.rating}
                                        onChange={(e) => {
                                            form.setData(
                                                "rating",
                                                e.target.value,
                                            );
                                            setFrontendErrors((p) => ({
                                                ...p,
                                                rating: null,
                                            }));
                                        }}
                                    />
                                    <InputError
                                        message={
                                            frontendErrors.rating ||
                                            form.errors.rating
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        عدد العملاء المقيمين
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm  ${frontendErrors.number_of_rating_customers && "border-red-500"}`}
                                        placeholder="مثال: 120"
                                        value={
                                            form.data.number_of_rating_customers
                                        }
                                        onChange={(e) => {
                                            form.setData(
                                                "number_of_rating_customers",
                                                e.target.value,
                                            );
                                            setFrontendErrors((p) => ({
                                                ...p,
                                                number_of_rating_customers:
                                                    null,
                                            }));
                                        }}
                                    />
                                    <InputError
                                        message={
                                            frontendErrors.number_of_rating_customers ||
                                            form.errors
                                                .number_of_rating_customers
                                        }
                                    />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">السعر يشمل</label>

                                    <div
                                        className={`input min-h-[44px] flex flex-wrap gap-2 items-center
        ${frontendErrors.price_contain ? "border-red-500" : ""}`}
                                    >
                                        {priceContainItems.map(
                                            (item, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-[#d4af37]/20  text-[var(--app-primary)]
                           px-2 py-1 rounded-full text-xs flex items-center gap-1"
                                                >
                                                    {item}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removePriceContainItem(
                                                                index,
                                                            )
                                                        }
                                                        className="text-red-500 text-xs"
                                                    >
                                                        ✕
                                                    </button>
                                                </span>
                                            ),
                                        )}

                                        <input
                                            type="text"
                                            className="input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm "
                                            placeholder="اكتب عنصر واضغط Enter أو ,"
                                            onKeyDown={addPriceContainItem}
                                        />
                                    </div>

                                    <InputError
                                        message={
                                            frontendErrors.price_contain ||
                                            form.errors.price_contain
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        السعر لا يشمل
                                    </label>

                                    <div
                                        className={`input min-h-[44px] flex flex-wrap gap-2 items-center
        ${frontendErrors.price_not_contain ? "border-red-500" : ""}`}
                                    >
                                        {priceNotContainItems.map(
                                            (item, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-red-500/10 text-red-600
                px-2 py-1 rounded-full text-xs flex items-center gap-1"
                                                >
                                                    {item}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removePriceNotContainItem(
                                                                index,
                                                            )
                                                        }
                                                        className="text-red-500 text-xs"
                                                    >
                                                        ✕
                                                    </button>
                                                </span>
                                            ),
                                        )}

                                        <input
                                            type="text"
                                            className="input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm "
                                            placeholder="اكتب عنصر واضغط Enter أو ,"
                                            onKeyDown={addPriceNotContainItem}
                                        />
                                    </div>

                                    <InputError
                                        message={
                                            frontendErrors.price_not_contain ||
                                            form.errors.price_not_contain
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="card p-6 space-y-4">
                            <h3 className="font-bold text-lg">
                                تفاصيل الاقامة
                            </h3>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label flex gap-1">
                                        <MdOutlineHotel /> الفندق
                                    </label>
                                    <Select
                                        isMulti
                                        styles={selectStyles}
                                        placeholder="اختر الفنادق"
                                        options={hotels.map((h) => ({
                                            value: h.id,
                                            label: h.name,
                                        }))}
                                        onChange={(opts) => {
                                            form.setData(
                                                "hotels",
                                                opts
                                                    ? opts.map((o) => o.value)
                                                    : [],
                                            );
                                            setFrontendErrors((p) => ({
                                                ...p,
                                                hotels: null,
                                            }));
                                        }}
                                    />

                                    <InputError
                                        message={frontendErrors.hotels}
                                    />
                                </div>

                                {/* <div>
                                    <label className="label">المسافة من</label>
                                    <input
                                        className="input w-full bg-gray-100 cursor-not-allowed"
                                        disabled
                                        value={
                                            selectedHotel?.address_location === 'مكة'
                                                ? 'المسافة من الحرم المكي (الكعبة)'
                                                : selectedHotel?.address_location === 'المدينة المنورة'
                                                    ? 'المسافة من المسجد النبوي'
                                                    : ''
                                        }
                                        placeholder="—"
                                    />
                                </div> */}
                            </div>
                        </div>

                        <div className="card p-6 space-y-4">
                            <h3 className="font-bold mb-3">برنامج الرحلة</h3>
                            <InputError message={frontendErrors.program} />

                            {!form.data.duration_days ? (
                                <div className="p-4 text-sm text-gray-500 bg-gray-50 border rounded-lg">
                                    اختر مدة الرحلة أولاً
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {form.data.program.map(
                                        (dayObj, index) => (
                                            <div
                                                key={index}
                                                className="border rounded-lg p-4 space-y-2 bg-gray-50"
                                            >
                                                <input
                                                    className="input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm  font-semibold text-[var(--app-primary)]"
                                                    value={dayObj.label}
                                                    placeholder="مثال: اليوم 3-5"
                                                    onChange={(e) => {
                                                        const updated = [
                                                            ...form.data
                                                                .program,
                                                        ];
                                                        updated[index].label =
                                                            e.target.value;
                                                        form.setData(
                                                            "program",
                                                            updated,
                                                        );
                                                    }}
                                                    // onChange={(e) =>
                                                    //     updateProgramDay(
                                                    //         index,
                                                    //         "label",
                                                    //         e.target.value,
                                                    //     )
                                                    // }
                                                />

                                                <input
                                                    className="input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm "
                                                    placeholder="عنوان اليوم"
                                                    value={dayObj.title}
                                                    onChange={(e) => {
                                                        const updated = [
                                                            ...form.data
                                                                .program,
                                                        ];
                                                        updated[index].title =
                                                            e.target.value;
                                                        form.setData(
                                                            "program",
                                                            updated,
                                                        );
                                                    }}
                                                    // onChange={(e) =>
                                                    //     updateProgramDay(
                                                    //         index,
                                                    //         "title",
                                                    //         e.target.value,
                                                    //     )
                                                    // }
                                                />

                                                <textarea
                                                    rows={3}
                                                    className="input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm "
                                                    placeholder="وصف اليوم"
                                                    value={dayObj.desc}
                                                    onChange={(e) => {
                                                        const updated = [
                                                            ...form.data
                                                                .program,
                                                        ];
                                                        updated[index].desc =
                                                            e.target.value;
                                                        form.setData(
                                                            "program",
                                                            updated,
                                                        );
                                                    }}
                                                    // onChange={(e) =>
                                                    //     updateProgramDay(
                                                    //         index,
                                                    //         "desc",
                                                    //         e.target.value,
                                                    //     )
                                                    // }
                                                />
                                            </div>
                                        ),
                                    )}
                                </div>
                            )}

                            <InputError message={frontendErrors.program} />
                        </div>

                        <div className="card p-6 space-y-4">
                            <h3 className="font-bold text-lg">
                                معلومات تحسين محركات البحث (SEO)
                            </h3>

                            <div>
                                <label className="label flex gap-1">
                                    عنوان SEO
                                </label>
                                <input
                                    className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm ${
                                        frontendErrors.seo_title &&
                                        "border-red-500"
                                    }`}
                                    placeholder="اكتب عنوان SEO..."
                                    value={form.data.seo_title}
                                    onChange={(e) =>
                                        form.setData(
                                            "seo_title",
                                            e.target.value,
                                        )
                                    }
                                />

                                <InputError
                                    message={
                                        frontendErrors.seo_title ||
                                        form.errors.seo_title
                                    }
                                />
                            </div>

                            <div>
                                <label className="label">
                                    {" "}
                                    وصف لمحركات البحث
                                </label>
                                <textarea
                                    rows={4}
                                    className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm ${
                                        frontendErrors.seo_description &&
                                        "border-red-500"
                                    }`}
                                    placeholder="اكتب وصف SEO..."
                                    value={form.data.seo_description}
                                    onChange={(e) =>
                                        form.setData(
                                            "seo_description",
                                            e.target.value,
                                        )
                                    }
                                />

                                <InputError
                                    message={
                                        frontendErrors.seo_description ||
                                        form.errors.seo_description
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 lg:sticky lg:top-6">
                        <div className="card p-6 space-y-4">
                            <h3 className="font-bold text-sm">حالة الباقة</h3>
                            <Switch
                                label="نشط"
                                checked={form.data.is_active}
                                onChange={(v) => form.setData("is_active", v)}
                            />
                            {/* <Switch
                                label="عرض مميز"
                                checked={form.data.is_featured}
                                onChange={v =>
                                    form.setData('is_featured', v)
                                }
                            /> */}
                            <Switch
                                label="عرض خاص"
                                checked={form.data.is_special_offer}
                                onChange={(v) =>
                                    form.setData("is_special_offer", v)
                                }
                            />
                            <Switch
                                label="شائع"
                                checked={form.data.is_popular}
                                onChange={(v) => form.setData("is_popular", v)}
                            />
                        </div>

                        <div className="card p-6">
                            <h3 className="font-bold mb-3">معرض الصور</h3>

                            <label className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center cursor-pointer hover:border-[var(--app-primary)] transition">
                                <FiUpload size={28} />
                                <span className="mt-2 text-xs text-gray-500">
                                    اسحب الصور أو اضغط للرفع
                                </span>
                                <input
                                    multiple
                                    accept="image/*"
                                    type="file"
                                    className="hidden"
                                    onChange={handleImages}
                                />
                            </label>

                            {previewImages.length > 0 && (
                                <div className="grid grid-cols-3 gap-2 mt-4">
                                    {previewImages.map((src, index) => (
                                        <div
                                            key={index}
                                            className="relative aspect-square rounded-lg overflow-hidden border"
                                        >
                                            <img
                                                src={src}
                                                className="w-full h-full object-cover"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    form.setData(
                                                        "is_main_image",
                                                        index,
                                                    )
                                                }
                                                className={`absolute top-1 left-1 p-1 rounded-full ${
                                                    form.data.is_main_image ===
                                                    index
                                                        ? "bg-yellow-400 text-white"
                                                        : "bg-white/80 text-gray-600"
                                                }`}
                                            >
                                                <FaStar size={12} />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeImage(index)
                                                }
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="card p-6">
                            <label className="label">المميزات</label>
                            <Select
                                isMulti
                                styles={selectStyles}
                                noOptionsMessage={noOptionsMessage}
                                placeholder="اختر المميزات"
                                options={features.map((f) => ({
                                    value: f.id,
                                    label: f.name,
                                }))}
                                onChange={(opts) =>
                                    form.setData(
                                        "features",
                                        opts.map((o) => o.value),
                                    )
                                }
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() =>
                                    router.get(route("admin.offers.index"))
                                }
                                className="btn-secondary w-full"
                            >
                                إلغاء
                            </button>
                            <button
                                type="submit"
                                className="btn-primary w-full flex items-center justify-center gap-2"
                            >
                                <FiSave /> حفظ
                            </button>
                        </div>
                    </div>
                </form>

                {showPriceModal && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                            <h2 className="text-lg font-semibold mb-4">
                                إضافة سعر حسب عدد الأشخاص
                            </h2>

                            {/* Label */}
                            <div className="mb-4">
                                <label className="label">التصنيف</label>

                                <Select
                                    styles={selectStyles}
                                    value={newPrice.title}
                                    placeholder="اختر التصنيف"
                                    onChange={(selectedOption) => {
                                        setNewPrice({
                                            ...newPrice,
                                            title: selectedOption,
                                        });
                                    }}
                                    options={[
                                        { value: "شخصين", label: "شخصين" },
                                        {
                                            value: "ثلاثة أشخاص",
                                            label: "ثلاثة أشخاص",
                                        },
                                        {
                                            value: "أربعة أشخاص",
                                            label: "أربعة أشخاص",
                                        },
                                        {
                                            value: "خمسة أشخاص",
                                            label: "خمسة أشخاص",
                                        },
                                        {
                                            value: "ستة أشخاص",
                                            label: "ستة أشخاص",
                                        },
                                        {
                                            value: "سبعة أشخاص",
                                            label: "سبعة أشخاص",
                                        },
                                        {
                                            value: "ثمانية أشخاص",
                                            label: "ثمانية أشخاص",
                                        },
                                        {
                                            value: "تسعة أشخاص",
                                            label: "تسعة أشخاص",
                                        },
                                        {
                                            value: "عشرة أشخاص",
                                            label: "عشرة أشخاص",
                                        },
                                    ]}
                                />
                            </div>
                            {addPriceErrors.title && (
                                <p className="text-red-500 text-xs mt-1">
                                    {addPriceErrors.title}
                                </p>
                            )}

                            {/* Amount */}
                            <div className="mb-6">
                                <label className="label">السعر</label>
                                <input
                                    type="number"
                                    min={0}
                                    className="input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm"
                                    value={newPrice.amount}
                                    onChange={(e) =>
                                        setNewPrice({
                                            ...newPrice,
                                            amount: e.target.value,
                                        })
                                    }
                                />
                                {addPriceErrors.amount && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {addPriceErrors.amount}
                                    </p>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-lg bg-gray-200"
                                    onClick={() => setShowPriceModal(false)}
                                >
                                    إلغاء
                                </button>

                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-lg text-white"
                                    style={{
                                        backgroundColor: "var(--app-primary)",
                                    }}
                                    onClick={() => {
                                        console.log(
                                            "Adding price:",
                                            typeof newPrice.title.label,
                                        );
                                        let errors = {
                                            title: null,
                                            amount: null,
                                        };

                                        if (
                                            !newPrice.title ||
                                            !newPrice.title.label
                                        ) {
                                            errors.title = "يجب اختيار تصنيف";
                                        }
                                        if (
                                            newPrice.amount === "" ||
                                            Number(newPrice.amount) < 0
                                        ) {
                                            errors.amount =
                                                "السعر يجب أن يكون 0 أو أكبر";
                                        }

                                        setAddPriceErrors(errors);

                                        if (errors.title || errors.amount)
                                            return;

                                        form.setData("prices", [
                                            ...form.data.prices,
                                            {
                                                title: newPrice.title.label,
                                                amount: Number(newPrice.amount),
                                            },
                                        ]);

                                        setNewPrice({
                                            title: null,
                                            amount: "",
                                        });

                                        setAddPriceErrors({
                                            title: null,
                                            amount: null,
                                        });

                                        setShowPriceModal(false);
                                    }}
                                >
                                    حفظ
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </AuthenticatedLayout>
    );
}
