import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, router, usePage } from "@inertiajs/react";
import Select from "react-select";
import InputError from "@/Components/InputError";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiChevronLeft, FiSave, FiMapPin, FiUpload } from "react-icons/fi";
import { FaRegBuilding, FaStar } from "react-icons/fa6";
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
                className={`w-11 h-6 rounded-full transition ${checked ? "bg-[var(--app-primary)]" : "bg-gray-300"}`}
            />
            <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition ${checked ? "translate-x-5" : ""}`}
            />
        </div>
    </label>
);

export default function Edit({
    offer,
    governorates,
    tripTypes,
    hotels,
    companies,
    features,
}) {
    const { flash } = usePage().props;

    const form = useForm({
        offer_code: offer?.offer_code || "",
        title: offer?.title || "",
        seo_title: offer?.seo_title || "",
        seo_description: offer?.seo_description || "",

        desc: offer?.desc || "",
        rating: offer?.rating || "",
        number_of_rating_customers: offer?.number_of_rating_customers || "",
        price_contain: offer?.price_contain || "",
        price_not_contain: offer?.price_not_contain || "",

        governorates: offer?.governorates?.map((g) => g.id) || [],
        hotels: offer?.hotels?.map((h) => h.id) || [],

        trip_type_id: offer?.trip_type_id || null,
        company_id: offer?.company_id || null,
        duration_days: offer?.duration_days || "",
        price: offer?.price || "",
        airline: offer?.airline || "",
        program_days: Array.isArray(offer?.program) ? offer.program : [],
        program: [],

        start_date: offer?.start_date ? offer.start_date.slice(0, 10) : "",

        end_date: offer?.end_date ? offer.end_date.slice(0, 10) : "",

        available_places: offer?.available_places ?? "",
        whatsapp_number: offer?.whatsapp_number || "",
        tour_level: offer?.tour_level || "",

        is_active: offer?.is_active || false,
        is_special_offer: offer?.is_special_offer || false,
        is_featured: offer?.is_featured || false,
        is_popular: offer?.is_popular || false,

        features: offer?.features?.map((f) => f.id) || [],
        images: [],
        deleted_images: [],
        main_image_id: null,

        main_image: offer?.mainImage?.image_path
            ? `/storage/${offer.mainImage.image_path}`
            : null,
        is_main_image: offer?.images?.findIndex((i) => i.is_main) ?? null,
    });

    const [previewImages, setPreviewImages] = useState([]);
    const [frontendErrors, setFrontendErrors] = useState({});
    const [selectedGovernorates, setSelectedGovernorates] = useState([]);
    const [selectedHotels, setSelectedHotels] = useState([]);

    const [selectedFeatures, setSelectedFeatures] = useState([]);

    const noOptionsMessage = () => "لا توجد بيانات";
    const [priceContainItems, setPriceContainItems] = useState([]);
    const [priceNotContainItems, setPriceNotContainItems] = useState([]);
    const [newPriceContain, setNewPriceContain] = useState("");
    const [newPriceNotContain, setNewPriceNotContain] = useState("");

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
        menu: (base) => ({
            ...base,
            zIndex: 9999,
            maxHeight: "260px",
        }),
    };

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    useEffect(() => {
        if (offer?.images?.length) {
            const images = offer.images
                .filter((img) => img?.image_path)
                .map((img) => ({
                    id: img.id,
                    src: img.image_path.startsWith("http")
                        ? img.image_path
                        : `/storage/${img.image_path}`,
                    isNew: false,
                    is_main: img.is_main,
                }));

            setPreviewImages(images);

            const mainImage = images.find((img) => img.is_main);
            form.setData("main_image_id", mainImage?.id ?? null);
        }
    }, [offer]);

    useEffect(() => {
        if (offer?.governorates?.length) {
            setSelectedGovernorates(
                offer.governorates.map((g) => ({
                    value: g.id,
                    label: g.name,
                })),
            );
        }
    }, [offer]);
    useEffect(() => {
        if (offer?.hotels?.length) {
            setSelectedHotels(
                offer.hotels.map((h) => ({
                    value: h.id,
                    label: h.name,
                    address_location: h.address_location,
                })),
            );
        }
    }, [offer]);

    useEffect(() => {
        if (offer?.features?.length) {
            setSelectedFeatures(
                offer.features.map((f) => ({ value: f.id, label: f.name })),
            );
        }
    }, [offer]);

    useEffect(() => {
        if (offer?.price_contain) {
            setPriceContainItems(
                offer.price_contain
                    .split(",")
                    .map((i) => i.trim())
                    .filter(Boolean),
            );
        }

        if (offer?.price_not_contain) {
            setPriceNotContainItems(
                offer.price_not_contain
                    .split(",")
                    .map((i) => i.trim())
                    .filter(Boolean),
            );
        }
    }, [offer]);

    useEffect(() => {
        const days = Number(form.data.duration_days);
        if (!days) return;

        let updated = [...form.data.program_days];

        if (updated.length < days) {
            for (let i = updated.length + 1; i <= days; i++) {
                updated.push({
                    day: i,
                    label: `اليوم ${toArabicNumbers(i)}`,
                    title: "",
                    desc: "",
                });
            }
        }

        if (updated.length > days) {
            updated = updated.slice(0, days);
        }

        form.setData("program_days", updated);
    }, [form.data.duration_days]);
    useEffect(() => {
        form.setData("program", form.data.program_days);
    }, [form.data.program_days]);

    const addPriceContainItem = () => {
        if (
            newPriceContain.trim() &&
            !priceContainItems.includes(newPriceContain.trim())
        ) {
            const updated = [...priceContainItems, newPriceContain.trim()];
            setPriceContainItems(updated);
            form.setData("price_contain", updated.join(", "));
            setNewPriceContain("");
            setFrontendErrors((p) => ({ ...p, price_contain: null }));
        }
    };

    const removePriceContainItem = (index) => {
        const updated = priceContainItems.filter((_, i) => i !== index);
        setPriceContainItems(updated);
        form.setData("price_contain", updated.join(", "));
    };

    const addPriceNotContainItem = () => {
        if (
            newPriceNotContain.trim() &&
            !priceNotContainItems.includes(newPriceNotContain.trim())
        ) {
            const updated = [
                ...priceNotContainItems,
                newPriceNotContain.trim(),
            ];
            setPriceNotContainItems(updated);
            form.setData("price_not_contain", updated.join(", "));
            setNewPriceNotContain("");
            setFrontendErrors((p) => ({ ...p, price_not_contain: null }));
        }
    };

    const removePriceNotContainItem = (index) => {
        const updated = priceNotContainItems.filter((_, i) => i !== index);
        setPriceNotContainItems(updated);
        form.setData("price_not_contain", updated.join(", "));
    };

    // const handleImages = (e) => {
    //     const newFiles = Array.from(e.target.files);

    //     if (previewImages.length + newFiles.length > 10) {
    //         toast.error('الحد الأقصى 10 صور');
    //         return;
    //     }

    //     form.setData('images', [...form.data.images, ...newFiles]);

    //     setPreviewImages(prev => [
    //         ...prev,
    //         ...newFiles.map(file => ({
    //             id: null,
    //             file,
    //             src: URL.createObjectURL(file),
    //             isNew: true,
    //         })),
    //     ]);

    //     e.target.value = null;
    // };

    const handleImages = (e) => {
        const newFiles = Array.from(e.target.files);
        const MAX_IMAGES = 10;
        const MAX_SIZE_KB = 2048;
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

        const errors = [];

        if (previewImages.length + newFiles.length > MAX_IMAGES) {
            errors.push(`الحد الأقصى ${MAX_IMAGES} صور`);
        }

        newFiles.forEach((file, idx) => {
            if (!allowedTypes.includes(file.type)) {
                errors.push(
                    `الصورة رقم ${idx + 1} يجب أن تكون بصيغة JPG, PNG أو WEBP`,
                );
            }
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
            ...newFiles.map((file) => ({
                id: null,
                file,
                src: URL.createObjectURL(file),
                isNew: true,
            })),
        ]);

        e.target.value = null;
    };

    const removeImage = (index) => {
        const img = previewImages[index];

        if (!img.isNew && img.id) {
            form.setData("deleted_images", [
                ...(form.data.deleted_images || []),
                img.id,
            ]);
        }

        setPreviewImages((prev) => prev.filter((_, i) => i !== index));
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
        if (previewImages.length === 0)
            errors.images = "يرجى رفع صورة واحدة على الأقل";
        if (!form.data.start_date)
            errors.start_date = "اختر تاريخ بداية الباقة";
        if (!form.data.end_date) errors.end_date = "اختر تاريخ نهاية الباقة";
        // if (!form.data.program.trim()) errors.program = 'برنامج الرحلة مطلوب';
        if (!form.data.tour_level) errors.tour_level = "اختر مستوى الرحلة";
        if (!form.data.available_places)
            errors.available_places = "عدد الأماكن المتاحة مطلوب";
        // if (!form.data.whatsapp_number.trim()) errors.whatsapp_number = 'رقم الواتساب مطلوب';
        if (!form.data.seo_title.trim()) errors.seo_title = "عنوان SEO مطلوب";
        if (!form.data.seo_description.trim())
            errors.seo_description = "وصف SEO مطلوب";
        if (!form.data.governorates.length)
            errors.governorates = "اختر محافظة واحدة على الأقل";

        if (!form.data.hotels.length)
            errors.hotels = "اختر فندقًا واحدًا على الأقل";

        if (!form.data.desc.trim()) errors.desc = "الوصف المختصر مطلوب";

        if (
            !form.data.rating ||
            Number(form.data.rating) < 1 ||
            Number(form.data.rating) > 5
        )
            errors.rating = "التقييم يجب أن يكون بين 1 و 5";

        if (
            !form.data.number_of_rating_customers ||
            Number(form.data.number_of_rating_customers) < 1
        )
            errors.number_of_rating_customers =
                "عدد المقيمين يجب أن يكون 1 على الأقل";

        if (!form.data.price_contain || form.data.price_contain.trim() === "")
            errors.price_contain = "المحتويات المشمولة في السعر مطلوبة";

        if (
            !form.data.price_not_contain ||
            form.data.price_not_contain.trim() === ""
        )
            errors.price_not_contain = "المحتويات غير المشمولة في السعر مطلوبة";
        const hasAtLeastOneDayFilled = form.data.program_days.some(
            (day) =>
                (day.title && day.title.trim() !== "") ||
                (day.desc && day.desc.trim() !== ""),
        );
        if (!hasAtLeastOneDayFilled)
            errors.program_days = "يجب إدخال بيانات يوم واحد على الأقل";

        setFrontendErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const submit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        form.post(route("admin.offers.update", offer.id), {
            forceFormData: true,
            onSuccess: () => {
                // toast.success('تم تعديل الباقة بنجاح');
                router.get(route("admin.offers.index"));
            },
            onError: (errors) => {
                console.log("server Errors:", errors);

                toast.error(
                    "حدثت أخطاء في الإدخال، يرجى المراجعة والتمحيص مرة أخرى",
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
                        تعديل باقة
                    </span>
                </div>

                <h1 className="text-xl font-bold"> تعديل باقة</h1>

                <form
                    onSubmit={submit}
                    noValidate
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
                                        className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm ${frontendErrors.title && "border-red-500"}`}
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
                                        className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm ${frontendErrors.offer_code && "border-red-500"}`}
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
                                <label className="label">وصف مختصر</label>
                                <textarea
                                    rows={3}
                                    className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm ${frontendErrors.desc && "border-red-500"}`}
                                    value={form.data.desc}
                                    onChange={(e) => {
                                        form.setData("desc", e.target.value);
                                        setFrontendErrors((p) => ({
                                            ...p,
                                            desc: null,
                                        }));
                                    }}
                                    placeholder="وصف مختصر للعرض (حد أقصى 2555 حرف)"
                                />
                                <InputError
                                    message={
                                        frontendErrors.desc || form.errors.desc
                                    }
                                />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">
                                        السعر (جنيه)
                                    </label>
                                    <input
                                        type="number"
                                        className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm ${frontendErrors.price && "border-red-500"}`}
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
                                    <label className="label">
                                        تاريخ بداية الباقة
                                    </label>
                                    <input
                                        type="date"
                                        className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm ${frontendErrors.start_date && "border-red-500"}`}
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
                                        min={0}
                                        className="input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm"
                                        value={form.data.available_places}
                                        onChange={(e) => {
                                            form.setData(
                                                "available_places",
                                                e.target.value,
                                            );
                                            setFrontendErrors((p) => ({
                                                ...p,
                                                available_places: null,
                                            }));
                                        }}
                                    />
                                    <InputError
                                        message={
                                            frontendErrors.available_places ||
                                            form.errors.available_places
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="label">رقم واتساب</label>
                                    <input
                                        className="input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm"
                                        placeholder="مثال: 201234567890"
                                        value={
                                            form.data.whatsapp_number ===
                                            "01111111111"
                                                ? "لا يوجد"
                                                : form.data.whatsapp_number
                                        }
                                        onChange={(e) => {
                                            form.setData(
                                                "whatsapp_number",
                                                e.target.value,
                                            );
                                            // setFrontendErrors(p => ({ ...p, whatsapp_number: null }));
                                        }}
                                    />
                                    <InputError
                                        message={form.errors.whatsapp_number}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="label">مستوى الرحلة</label>
                                <Select
                                    styles={selectStyles}
                                    hasError={frontendErrors.tour_level}
                                    options={[
                                        {
                                            value: "economical",
                                            label: "اقتصادي",
                                        },
                                        { value: "standard", label: "عادي" },
                                        { value: "vip", label: "VIP" },
                                    ]}
                                    value={
                                        form.data.tour_level
                                            ? {
                                                  value: form.data.tour_level,
                                                  label:
                                                      form.data.tour_level ===
                                                      "vip"
                                                          ? "VIP"
                                                          : form.data
                                                                  .tour_level ===
                                                              "standard"
                                                            ? "عادي"
                                                            : "اقتصادي",
                                              }
                                            : null
                                    }
                                    onChange={(opt) => {
                                        form.setData("tour_level", opt.value);
                                        setFrontendErrors((p) => ({
                                            ...p,
                                            tour_level: null,
                                        }));
                                    }}
                                />
                                <InputError
                                    message={
                                        frontendErrors.tour_level ||
                                        form.errors.tour_level
                                    }
                                />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label flex gap-1">
                                        <FiMapPin /> المحافظة
                                    </label>
                                    <Select
                                        isMulti
                                        styles={selectStyles}
                                        noOptionsMessage={noOptionsMessage}
                                        placeholder="اختر المحافظات"
                                        options={governorates.map((g) => ({
                                            value: g.id,
                                            label: g.name,
                                        }))}
                                        value={governorates
                                            .filter((g) =>
                                                form.data.governorates.includes(
                                                    g.id,
                                                ),
                                            )
                                            .map((g) => ({
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
                                        message={
                                            frontendErrors.governorates ||
                                            form.errors.governorates
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="label">نوع الرحلة</label>
                                    <Select
                                        styles={selectStyles}
                                        noOptionsMessage={noOptionsMessage}
                                        hasError={frontendErrors.trip_type_id}
                                        placeholder="اختر نوع الرحلة"
                                        value={
                                            form.data.trip_type_id
                                                ? {
                                                      value: form.data
                                                          .trip_type_id,
                                                      label: tripTypes.find(
                                                          (t) =>
                                                              t.id ===
                                                              form.data
                                                                  .trip_type_id,
                                                      )?.name,
                                                  }
                                                : null
                                        }
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
                                        value={
                                            form.data.company_id
                                                ? {
                                                      value: form.data
                                                          .company_id,
                                                      label: companies.find(
                                                          (c) =>
                                                              c.id ===
                                                              form.data
                                                                  .company_id,
                                                      )?.name,
                                                  }
                                                : null
                                        }
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
                                        className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm ${frontendErrors.airline && "border-red-500"}`}
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
                                        min="1"
                                        max="5"
                                        step="0.1"
                                        className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm  ${frontendErrors.rating && "border-red-500"}`}
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
                                        placeholder="مثال: 4.5"
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
                                        عدد المقيمين
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm  ${
                                            frontendErrors.number_of_rating_customers &&
                                            "border-red-500"
                                        }`}
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
                                        placeholder="مثال: 120"
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
                                        className={`border rounded-lg p-2 flex flex-wrap gap-2 ${frontendErrors.price_contain ? "border-red-500" : "border-gray-300"}`}
                                    >
                                        {priceContainItems.map((item, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-1 bg-[var(--app-primary)] text-white px-2 py-1 rounded"
                                            >
                                                <span>{item}</span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removePriceContainItem(
                                                            i,
                                                        )
                                                    }
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                        <input
                                            type="text"
                                            placeholder="أضف عنصر جديد واضغط Enter"
                                            value={newPriceContain}
                                            onChange={(e) =>
                                                setNewPriceContain(
                                                    e.target.value,
                                                )
                                            }
                                            onKeyDown={(e) =>
                                                e.key === "Enter"
                                                    ? (e.preventDefault(),
                                                      addPriceContainItem())
                                                    : null
                                            }
                                            className="flex-1 border-none focus:ring-0 focus:outline-none text-sm"
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
                                        className={`border rounded-lg p-2 flex flex-wrap gap-2 ${frontendErrors.price_not_contain ? "border-red-500" : "border-gray-300"}`}
                                    >
                                        {priceNotContainItems.map((item, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-1 bg-[var(--app-primary)] text-white px-2 py-1 rounded"
                                            >
                                                <span>{item}</span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removePriceNotContainItem(
                                                            i,
                                                        )
                                                    }
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                        <input
                                            type="text"
                                            placeholder="أضف عنصر جديد واضغط Enter"
                                            value={newPriceNotContain}
                                            onChange={(e) =>
                                                setNewPriceNotContain(
                                                    e.target.value,
                                                )
                                            }
                                            onKeyDown={(e) =>
                                                e.key === "Enter"
                                                    ? (e.preventDefault(),
                                                      addPriceNotContainItem())
                                                    : null
                                            }
                                            className="flex-1 border-none focus:ring-0 focus:outline-none text-sm"
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
                                        noOptionsMessage={noOptionsMessage}
                                        placeholder="اختر الفنادق"
                                        options={hotels.map((h) => ({
                                            value: h.id,
                                            label: h.name,
                                        }))}
                                        value={hotels
                                            .filter((h) =>
                                                form.data.hotels.includes(h.id),
                                            )
                                            .map((h) => ({
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
                                        message={
                                            frontendErrors.hotels ||
                                            form.errors.hotels
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <h3 className="font-bold mb-3">برنامج الرحلة</h3>
                            <div
                                className={`rounded-lg border ${frontendErrors.program ? "border-red-500" : "border-gray-300"}`}
                            >
                                <div className="space-y-4">
                                    {form.data.program_days.map(
                                        (day, index) => (
                                            <div
                                                key={index}
                                                className="border rounded-lg p-4 space-y-2"
                                            >
                                                <input
                                                    className="input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm  font-semibold text-[var(--app-primary)]"
                                                    value={day.label}
                                                    placeholder="مثال: اليوم 3-5"
                                                    onChange={(e) => {
                                                        const updated = [
                                                            ...form.data
                                                                .program_days,
                                                        ];
                                                        updated[index].label =
                                                            e.target.value;
                                                        form.setData(
                                                            "program_days",
                                                            updated,
                                                        );
                                                    }}
                                                />

                                                <input
                                                    className="input w-full"
                                                    placeholder="عنوان اليوم"
                                                    value={day.title}
                                                    onChange={(e) => {
                                                        const updated = [
                                                            ...form.data
                                                                .program_days,
                                                        ];
                                                        updated[index].title =
                                                            e.target.value;
                                                        form.setData(
                                                            "program_days",
                                                            updated,
                                                        );
                                                    }}
                                                />

                                                <textarea
                                                    rows={3}
                                                    className="input w-full"
                                                    placeholder="وصف اليوم"
                                                    value={day.desc}
                                                    onChange={(e) => {
                                                        const updated = [
                                                            ...form.data
                                                                .program_days,
                                                        ];
                                                        updated[index].desc =
                                                            e.target.value;
                                                        form.setData(
                                                            "program_days",
                                                            updated,
                                                        );
                                                    }}
                                                />
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                            <InputError
                                message={
                                    frontendErrors.program ||
                                    form.errors.program
                                }
                            />
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
                                    className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm ${frontendErrors.seo_title && "border-red-500"}`}
                                    placeholder="اكتب عنوان SEO..."
                                    value={form.data.seo_title}
                                    onChange={(e) => {
                                        form.setData(
                                            "seo_title",
                                            e.target.value,
                                        );
                                        setFrontendErrors((p) => ({
                                            ...p,
                                            seo_title: null,
                                        }));
                                    }}
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
                                    وصف لمحركات البحث
                                </label>
                                <textarea
                                    rows={4}
                                    className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm ${frontendErrors.seo_description && "border-red-500"}`}
                                    placeholder="اكتب وصف SEO..."
                                    value={form.data.seo_description}
                                    onChange={(e) => {
                                        form.setData(
                                            "seo_description",
                                            e.target.value,
                                        );
                                        setFrontendErrors((p) => ({
                                            ...p,
                                            seo_description: null,
                                        }));
                                    }}
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
                            {/* <Switch label="عرض مميز" checked={form.data.is_featured} onChange={v => form.setData('is_featured', v)} /> */}
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
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImages}
                                />
                            </label>

                            {previewImages.length > 0 && (
                                <div className="grid grid-cols-3 gap-2 mt-4">
                                    {previewImages.map((img, index) => (
                                        <div
                                            key={index}
                                            className="relative aspect-square rounded-lg overflow-hidden border"
                                        >
                                            <img
                                                src={img.src}
                                                className="w-full h-full object-cover"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    form.setData(
                                                        "main_image_id",
                                                        img.id,
                                                    )
                                                }
                                                className={`absolute top-1 left-1 p-1 rounded-full ${
                                                    form.data.main_image_id ===
                                                    img.id
                                                        ? "bg-yellow-400 text-white"
                                                        : "bg-white/80 text-gray-600"
                                                }`}
                                                title="تعيين كصورة رئيسية"
                                            >
                                                <FaStar size={12} />
                                            </button>
                                            {previewImages.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeImage(index)
                                                    }
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Select
                            isMulti
                            styles={selectStyles}
                            noOptionsMessage={noOptionsMessage}
                            placeholder="اختر المميزات"
                            value={selectedFeatures}
                            options={features.map((f) => ({
                                value: f.id,
                                label: f.name,
                            }))}
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            onChange={(opts) => {
                                setSelectedFeatures(opts);
                                form.setData(
                                    "features",
                                    opts.map((o) => o.value),
                                );
                            }}
                        />

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
            </motion.div>
        </AuthenticatedLayout>
    );
}
