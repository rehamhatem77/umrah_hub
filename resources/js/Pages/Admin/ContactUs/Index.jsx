import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FiBriefcase, FiChevronLeft, FiEdit, FiGlobe, FiPlus } from "react-icons/fi";
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
    hero_badge_title: "شارة الهيرو",
    hero_description: "وصف الهيرو",

    contact_title: "عنوان قسم التواصل",
    contact_address: "العنوان",
    contact_email: "البريد الإلكتروني",
    contact_phone: "رقم الهاتف",
    working_hours: "ساعات العمل",
    contact_wp:"رقم الواتساب",
    contact_location: "رابط الموقع الجغرافي",

    insta_link: "رابط إنستجرام",
    fb_link: "رابط فيسبوك",
    x_link: "رابط X",

    footer_desc: "وصف الفوتر",
};


export default function AdminContactUs({ contactPage }) {
    const sections = [
        {
            key: "seo",
            title: "قسم SEO",
            fields: ["seo_title", "seo_description", "seo_keywords"],
        },
        {
            key: "hero",
            title: "قسم الهيرو",
            fields: ["hero_title", "hero_badge_title", "hero_description"],
        },
        {
            key: "contact_info",
            title: "معلومات التواصل",
            fields: [
                "contact_title",
                "contact_address",
                "contact_email",
                "contact_phone",
                "contact_wp" ,
                "working_hours",
                "contact_location",
            ],
        },
        {
            key: "social_links",
            title: "روابط التواصل الاجتماعي",
            fields: ["insta_link", "fb_link", "x_link"],
        },
        {
            key: "footer",
            title: "وصف الفوتر",
            fields: ["footer_desc"],
        },
    ];


    const requiredFieldsMap = {
        hero: ["hero_title", "hero_description"],
        contact_info: [
            "contact_title",
            "contact_address",
            "contact_email",
            "contact_phone",
            // "contact_location",
        ],
    };




    const [openSection, setOpenSection] = useState(null);
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [iconPickerField, setIconPickerField] = useState(null);




    const handleOpen = (section) => {
        setOpenSection(section.key);
        const initialData = {};
        section.fields.forEach(f => initialData[f] = contactPage?.[f] || "");
        setFormData(initialData);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({ ...prev, [name]: files ? files[0] : value }));
    };

    const handleSubmit = (sectionKey) => {
        try {
            const urlMap = {
                seo: route("contact-us.section.update", "seo"),
                hero: route("contact-us.section.update", "hero"),
                contact_info: route("contact-us.section.update", "contact_info"),
                socials: route("contact-us.section.update", "social_links"),
                footer: route("contact-us.section.update", "footer"),
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
        <AuthenticatedLayout title="إدارة صفحة تواصل معنا">
            <div className="px-4 sm:px-6 space-y-6">

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>لوحة التحكم</span>
                    <FiChevronLeft />
                    <span className="text-[var(--app-primary)] font-semibold"> تواصل معنا </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <FiGlobe className="text-2xl text-[var(--app-primary)]" />
                        <h1 className="text-2xl font-bold text-gray-900">إدارة صفحة تواصل معنا</h1>
                    </div>
                </div>

                {sections.map((section, i) => {
                    const fieldsData = {};
                    section.fields.forEach(f => fieldsData[f] = contactPage?.[f] || "");
                    const isOpen = openSection === section.key;

                    return (
                        <div key={i} className="relative">
                            <SectionCard title={section.title} fieldsData={fieldsData} onOpen={() => handleOpen(section)} />
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="bg-gray-50 border-l-4 border-[var(--app-primary)] rounded-b-2xl p-6 mt-2 overflow-hidden shadow-inner">

                                        <form
                                            onSubmit={(e) => { e.preventDefault(); handleSubmit(section.key) }}
                                            className="space-y-4"
                                        >
                                            {generalError && <p className="text-red-500 text-center mb-2">{generalError}</p>}

                                            {section.fields.map(field => (
                                                <div key={field} className="flex flex-col">
                                                    <label className="text-sm font-medium mb-1">{fieldLabels[field]}</label>

                                                    {field.includes("image") ? (
                                                        <>
                                                            {formData[field] && (
                                                                <img
                                                                    src={typeof formData[field] === "string" ? `/storage/${formData[field]}` : URL.createObjectURL(formData[field])}
                                                                    alt={fieldLabels[field]}
                                                                    className="w-48 h-32 object-cover rounded-md mb-2 border"
                                                                />
                                                            )}
                                                            <input type="file" name={field} accept="image/*" onChange={handleChange} className="hidden" id={`file-${field}`} />
                                                            <label htmlFor={`file-${field}`} className="btn-primary inline-block cursor-pointer px-4 py-2 bg-[var(--app-primary)] text-white rounded-lg text-sm font-medium transition w-max">
                                                                اختر صورة
                                                            </label>
                                                        </>
                                                    ) : field.includes("icon") ? (
                                                        <>

                                                            <button
                                                                type="button"
                                                                onClick={() => setIconPickerField(field)}
                                                                className="px-3 py-2 border rounded-lg text-sm text-gray-700 flex items-center justify-between"
                                                            >
                                                                {formData[field] ? formData[field] : "اختر أيقونة"}
                                                                <span className="ml-2 text-[var(--app-primary)]">🔽</span>
                                                            </button>



                                                            {formData[field] && (
                                                                <span className="mt-1 flex items-center gap-2">
                                                                    {React.createElement(
                                                                        umrahHajjIcons.find(i => i.icon.name === formData[field])?.icon || null,
                                                                        { className: "text-[var(--app-primary)] text-xl" }
                                                                    )}
                                                                    <span>{formData[field]}</span>
                                                                </span>
                                                            )}



                                                            {formErrors[field] && <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>}
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

                                                    {formErrors[field] && !field.includes("icon") && (
                                                        <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>
                                                    )}
                                                </div>
                                            ))}

                                            <div className="flex justify-end gap-3 mt-2">
                                                <button type="button" onClick={() => setOpenSection(null)} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition">إلغاء</button>
                                                <button type="submit" className="px-4 py-2 rounded-lg bg-[var(--app-primary)] text-white btn-primary transition">حفظ البيانات</button>
                                            </div>

                                           

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
