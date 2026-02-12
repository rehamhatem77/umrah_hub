import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FiBriefcase, FiChevronLeft, FiEdit, FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { router } from "@inertiajs/react";
import SectionCard from "../HomePage/SectionCard";
import IconPicker, { umrahHajjIcons } from "@/Components/IconPicker";

const fieldLabels = {
    seo_title: "عنوان SEO",
    seo_description: "وصف SEO",
    seo_keywords: "كلمات مفتاحية SEO",

    hero_title: "عنوان الهيرو",
    hero_badge_title: "شعار الهيرو",
    hero_description: "وصف الهيرو",
    hero_image: "صورة الهيرو",

    intro_title: "عنوان المقدمة",
    intro_description: "وصف المقدمة",
    intro_description_long: "وصف طويل للمقدمة",
    intro_badge: "شعار المقدمة",
    intro_badge_sub: "ملحق شعار المقدمة",
    intro_image: "صورة المقدمة",

    vision_mission_title: "عنوان الرؤية والرسالة",
    vision_mission_description: "وصف الرؤية والرسالة",
    mission_title: "عنوان الرسالة",
    mission_description: "وصف الرسالة",
    vision_title: "عنوان الرؤية",
    vision_description: "وصف الرؤية",

    why_choose_us_title: "لماذا اخترنا",
    why_choose_us_card_one_title: "عنوان البطاقة الأولى",
    why_choose_us_card_two_title: "عنوان البطاقة الثانية",
    why_choose_us_card_three_title: "عنوان البطاقة الثالثة",
    why_choose_us_card_one_description: "وصف البطاقة الأولى",
    why_choose_us_card_two_description: "وصف البطاقة الثانية",
    why_choose_us_card_three_description: "وصف البطاقة الثالثة",
    why_choose_us_card_one_icon: "أيقونة البطاقة الأولى",
    why_choose_us_card_two_icon: "أيقونة البطاقة الثانية",
    why_choose_us_card_three_icon: "أيقونة البطاقة الثالثة",

    statistic_one_number: "رقم الإحصاء الأول",
    statistic_two_number: "رقم الإحصاء الثاني",
    statistic_three_number: "رقم الإحصاء الثالث",
    statistic_one_desc: "وصف الإحصاء الأول",
    statistic_two_desc: "وصف الإحصاء الثاني",
    statistic_three_desc: "وصف الإحصاء الثالث",
    statistic_one_prefix: "بادئة الإحصاء الأول",
    statistic_two_prefix: "بادئة الإحصاء الثاني",
    statistic_three_prefix: "بادئة الإحصاء الثالث",

    action_title: "عنوان الإجراء",
    action_desc: "وصف الإجراء",
    action_btn_txt: "نص زر الإجراء",
};

export default function AdminAboutUs({ aboutUs }) {
    const sections = [
        {
            key: "seo",
            title: "قسم SEO",
            fields: ["seo_title", "seo_description", "seo_keywords"],
        },
        {
            key: "hero",
            title: "قسم الهيرو",
            fields: [
                "hero_title",
                "hero_badge_title",
                "hero_description",
                "hero_image",
            ],
        },
        {
            key: "intro",
            title: "قسم المقدمة",
            fields: [
                "intro_title",
                "intro_description",
                "intro_description_long",
                "intro_badge",
                "intro_badge_sub",
                "intro_image",
            ],
        },
        {
            key: "vision_mission",
            title: "قسم الرؤية والرسالة",
            fields: [
                "vision_mission_title",
                "vision_mission_description",
                "mission_title",
                "mission_description",
                "vision_title",
                "vision_description",
            ],
        },
        {
            key: "why_choose_us",
            title: "قسم لماذا اخترنا",
            fields: [
                "why_choose_us_title",
                "why_choose_us_card_one_title",
                "why_choose_us_card_two_title",
                "why_choose_us_card_three_title",
                "why_choose_us_card_one_description",
                "why_choose_us_card_two_description",
                "why_choose_us_card_three_description",
                "why_choose_us_card_one_icon",
                "why_choose_us_card_two_icon",
                "why_choose_us_card_three_icon",
            ],
        },
        {
            key: "statistics",
            title: "قسم الإحصائيات",
            fields: [
                "statistic_one_number",
                "statistic_two_number",
                "statistic_three_number",
                "statistic_one_desc",
                "statistic_two_desc",
                "statistic_three_desc",
                "statistic_one_prefix",
                "statistic_two_prefix",
                "statistic_three_prefix",
            ],
        },
        {
            key: "action",
            title: "قسم الإجراء",
            fields: ["action_title", "action_desc", "action_btn_txt"],
        },
    ];

    const requiredFieldsMap = {
        seo: [],
        hero: ["hero_title", "hero_description", "hero_image"],
        intro: ["intro_title", "intro_description", "intro_image"],
        vision_mission: [
            "vision_mission_title",
            "vision_mission_description",
            "mission_title",
            "mission_description",
            "vision_title",
            "vision_description",
        ],
        why_choose_us: [
            "why_choose_us_title",
            "why_choose_us_card_one_title",
            "why_choose_us_card_two_title",
            "why_choose_us_card_three_title",
            "why_choose_us_card_one_description",
            "why_choose_us_card_two_description",
            "why_choose_us_card_three_description",
        ],
        statistics: [
            "statistic_one_number",
            "statistic_two_number",
            "statistic_three_number",
            "statistic_one_desc",
            "statistic_two_desc",
            "statistic_three_desc",
        ],
        action: [],
    };

    const [openSection, setOpenSection] = useState(null);
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [iconPickerField, setIconPickerField] = useState(null);

    const handleOpen = (section) => {
        setOpenSection(section.key);
        const initialData = {};
        section.fields.forEach((f) => (initialData[f] = aboutUs?.[f] || ""));
        setFormData(initialData);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
    };

    const handleSubmit = (sectionKey) => {
        try {
            const urlMap = {
                hero: route("about-us.section.update", "hero"),
                intro: route("about-us.section.update", "intro"),
                vision_mission: route(
                    "about-us.section.update",
                    "vision_mission",
                ),
                why_choose_us: route(
                    "about-us.section.update",
                    "why_choose_us",
                ),
                statistics: route("about-us.section.update", "statistics"),
                action: route("about-us.section.update", "action"),
            };

            const errors = {};
            const requiredFields = requiredFieldsMap[sectionKey] || [];

            requiredFields.forEach((key) => {
                const value = formData[key];
                if (!value || value.toString().trim() === "") {
                    errors[key] = `${fieldLabels[key]} مطلوب`;
                }
            });

            if (Object.keys(errors).length > 0) {
                setFormErrors(errors);
                return;
            }
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null && value !== "") {
                    data.append(key, value);
                }
            });

            router.post(urlMap[sectionKey], data, {
                preserveScroll: true,
                onSuccess: () => {
                    setOpenSection(null);
                    setFormErrors({});
                    setGeneralError("");
                },
                onError: (backendErrors) => {
                    if (backendErrors) {
                        setFormErrors(backendErrors);
                    } else {
                        setGeneralError("حدث خطأ أثناء حفظ البيانات");
                    }
                },
            });
        } catch (error) {
            setGeneralError("حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى");
        }
    };

    return (
        <AuthenticatedLayout title="إدارة صفحة من نحن">
            <div className="px-4 sm:px-6 space-y-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>لوحة التحكم</span>
                    <FiChevronLeft />
                    <span className="text-[var(--app-primary)] font-semibold">
                        {" "}
                        من نحن
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <FiBriefcase className="text-2xl text-[var(--app-primary)]" />
                        <h1 className="text-2xl font-bold text-gray-900">
                            إدارة صفحة من نحن
                        </h1>
                    </div>
                </div>

                {sections.map((section, i) => {
                    const fieldsData = {};
                    section.fields.forEach(
                        (f) => (fieldsData[f] = aboutUs?.[f] || ""),
                    );
                    const isOpen = openSection === section.key;

                    return (
                        <div key={i} className="relative">
                            <SectionCard
                                title={section.title}
                                fieldsData={fieldsData}
                                onOpen={() => handleOpen(section)}
                            />
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="bg-gray-50 border-l-4 border-[var(--app-primary)] rounded-b-2xl p-6 mt-2 overflow-hidden shadow-inner"
                                    >
                                        {/* <form onSubmit={(e) => { e.preventDefault(); handleSubmit(section.key) }} className="space-y-4">
                                            {generalError && <p className="text-red-500 text-center mb-2">{generalError}</p>}

                                            {section.fields.map(field => (

                                                <div key={field} className="flex flex-col">
                                                    <label className="text-sm font-medium mb-1">{fieldLabels[field]}</label>
                                                    {field.includes("image") ? (
                                                        <>
                                                            {formData[field] && (
                                                                <img src={typeof formData[field] === "string" ? `/storage/${formData[field]}` : URL.createObjectURL(formData[field])} alt={fieldLabels[field]} className="w-48 h-32 object-cover rounded-md mb-2 border" />
                                                            )}
                                                            <input type="file" name={field} accept="image/*" onChange={handleChange} className="hidden" id={`file-${field}`} />
                                                            <label htmlFor={`file-${field}`} className="btn-primary inline-block cursor-pointer px-4 py-2 bg-[var(--app-primary)] text-white rounded-lg text-sm font-medium transition w-max">اختر صورة</label>

                                                            {formErrors[field] && (
                                                                <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>
                                                            )}

                                                        </>
                                                    ) : (
                                                        <input
                                                            type={field.includes("number") ? "number" : "text"}
                                                            name={field}
                                                            value={formData[field] || ""}
                                                            onChange={handleChange}
                                                            className={`input py-2 px-3 border rounded-lg focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)]
        ${formErrors[field] ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}`}
                                                            placeholder={`أدخل ${fieldLabels[field]}`}
                                                        />

                                                    )}
                                                    {formErrors[field] && (
                                                        <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>
                                                    )}

                                                </div>
                                            ))}
                                            <div className="flex justify-end gap-3 mt-2">
                                                <button type="button" onClick={() => setOpenSection(null)} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition">إلغاء</button>
                                                <button type="submit" className="px-4 py-2 rounded-lg bg-[var(--app-primary)] text-white btn-primary transition">حفظ البيانات</button>
                                            </div>
                                        </form> */}
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleSubmit(section.key);
                                            }}
                                            className="space-y-4"
                                        >
                                            {generalError && (
                                                <p className="text-red-500 text-center mb-2">
                                                    {generalError}
                                                </p>
                                            )}

                                            {section.fields.map((field) => (
                                                <div
                                                    key={field}
                                                    className="flex flex-col"
                                                >
                                                    <label className="text-sm font-medium mb-1">
                                                        {fieldLabels[field]}
                                                    </label>

                                                    {field.includes("image") ? (
                                                        <>
                                                            {formData[
                                                                field
                                                            ] && (
                                                                <img
                                                                    src={
                                                                        typeof formData[
                                                                            field
                                                                        ] ===
                                                                        "string"
                                                                            ? `/storage/${formData[field]}`
                                                                            : URL.createObjectURL(
                                                                                  formData[
                                                                                      field
                                                                                  ],
                                                                              )
                                                                    }
                                                                    alt={
                                                                        fieldLabels[
                                                                            field
                                                                        ]
                                                                    }
                                                                    className="w-48 h-32 object-cover rounded-md mb-2 border"
                                                                />
                                                            )}
                                                            <input
                                                                type="file"
                                                                name={field}
                                                                accept="image/*"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                className="hidden"
                                                                id={`file-${field}`}
                                                            />
                                                            <label
                                                                htmlFor={`file-${field}`}
                                                                className="btn-primary inline-block cursor-pointer px-4 py-2 bg-[var(--app-primary)] text-white rounded-lg text-sm font-medium transition w-max"
                                                            >
                                                                اختر صورة
                                                            </label>
                                                        </>
                                                    ) : field.includes(
                                                          "icon",
                                                      ) ? (
                                                        <>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setIconPickerField(
                                                                        field,
                                                                    )
                                                                }
                                                                className="px-3 py-2 border rounded-lg text-sm text-gray-700 flex items-center justify-between"
                                                            >
                                                                {formData[field]
                                                                    ? formData[
                                                                          field
                                                                      ]
                                                                    : "اختر أيقونة"}
                                                                <span className="ml-2 text-[var(--app-primary)]">
                                                                    🔽
                                                                </span>
                                                            </button>

                                                            {formData[field] &&
                                                                (() => {
                                                                    const selectedIcon =
                                                                        umrahHajjIcons.find(
                                                                            (
                                                                                i,
                                                                            ) =>
                                                                                i
                                                                                    .icon
                                                                                    ?.name ===
                                                                                formData[
                                                                                    field
                                                                                ],
                                                                        )?.icon;

                                                                    return selectedIcon
                                                                        ? React.createElement(
                                                                              selectedIcon,
                                                                              {
                                                                                  className:
                                                                                      "text-[var(--app-primary)] text-xl",
                                                                              },
                                                                          )
                                                                        : null;
                                                                })()}

                                                            {formErrors[
                                                                field
                                                            ] && (
                                                                <p className="text-red-500 text-sm mt-1">
                                                                    {
                                                                        formErrors[
                                                                            field
                                                                        ]
                                                                    }
                                                                </p>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <input
                                                            type={
                                                                field.includes(
                                                                    "number",
                                                                )
                                                                    ? "number"
                                                                    : "text"
                                                            }
                                                            name={field}
                                                            value={
                                                                formData[
                                                                    field
                                                                ] || ""
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className={`input py-2 px-3 border rounded-lg focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)]
          ${formErrors[field] ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}`}
                                                            placeholder={`أدخل ${fieldLabels[field]}`}
                                                        />
                                                    )}

                                                    {formErrors[field] &&
                                                        !field.includes(
                                                            "icon",
                                                        ) && (
                                                            <p className="text-red-500 text-sm mt-1">
                                                                {
                                                                    formErrors[
                                                                        field
                                                                    ]
                                                                }
                                                            </p>
                                                        )}
                                                </div>
                                            ))}

                                            <div className="flex justify-end gap-3 mt-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenSection(null)
                                                    }
                                                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                                                >
                                                    إلغاء
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 rounded-lg bg-[var(--app-primary)] text-white btn-primary transition"
                                                >
                                                    حفظ البيانات
                                                </button>
                                            </div>

                                            {/* ICON PICKER MODAL */}
                                            <IconPicker
                                                show={!!iconPickerField}
                                                onClose={() =>
                                                    setIconPickerField(null)
                                                }
                                                onSelect={({ icon }) => {
                                                    if (iconPickerField) {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            [iconPickerField]:
                                                                icon,
                                                        }));
                                                        setIconPickerField(
                                                            null,
                                                        );
                                                    }
                                                }}
                                            />
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </AuthenticatedLayout>
    );
}
