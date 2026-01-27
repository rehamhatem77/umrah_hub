import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FiChevronLeft, FiEdit, FiHome, FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { router } from "@inertiajs/react";
import SectionCard from "./SectionCard";

const pageMotion = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};


const fieldLabels = {
    hero_title: "عنوان الهيرو",
    hero_description: "وصف الهيرو",
    hero_image: "صورة الهيرو",
    services_title: "عنوان الخدمات",
    services_description: "وصف الخدمات",
    special_title: "عنوان العرض المميز",
    special_description: "وصف العرض المميز",
    special_button_text: "نص زر العرض المميز",
    packages_title: "عنوان جميع الباقات",
    packages_description: "وصف جميع الباقات",
    packages_button_text: "نص زر الباقات",
    testimonials_title: "عنوان آراء العملاء",
    testimonials_description: "وصف آراء العملاء",
};



export default function AdminHomepage({ homepage }) {
    const sections = [
        { key: "hero", title: "قسم الهيرو", fields: ["hero_title", "hero_description", "hero_image"] },
        { key: "services", title: "قسم الخدمات", fields: ["services_title", "services_description"] },
        { key: "special", title: "قسم العروض المميزة", fields: ["special_title", "special_description", "special_button_text"] },
        { key: "packages", title: "قسم جميع الباقات", fields: ["packages_title", "packages_description", "packages_button_text"] },
        { key: "testimonials", title: "قسم آراء العملاء", fields: ["testimonials_title", "testimonials_description"] },
    ];

    const [openSection, setOpenSection] = useState(null);
    const [formData, setFormData] = useState({});

    const handleOpen = (section) => {
        setOpenSection(section.key);
        const initialData = {};
        section.fields.forEach(f => initialData[f] = homepage?.[f] || "");
        setFormData(initialData);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({ ...prev, [name]: files ? files[0] : value }));
    };

    const handleSubmit = (sectionKey) => {
        const urlMap = {
            hero: route("admin.homepage.hero.update"),
            services: route("admin.homepage.services.update"),
            special: route("admin.homepage.special.update"),
            packages: route("admin.homepage.packages.update"),
            testimonials: route("admin.homepage.testimonials.update"),
        };

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
            },
        });
    };



    return (
        <AuthenticatedLayout title="إدارة الصفحة الرئيسية">
            <motion.div variants={pageMotion} initial="hidden" animate="visible" className="px-4 sm:px-6 space-y-6">

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>لوحة التحكم</span>
                    <FiChevronLeft />
                    <span className="text-[var(--app-primary)] font-semibold">الصفحة الرئيسية</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <FiHome className="text-2xl text-[var(--app-primary)]" />
                        <h1 className="text-2xl font-bold text-gray-900">إدارة الصفحة الرئيسية</h1>
                    </div>
                </div>

                {sections.map((section, i) => {
                    const fieldsData = {};
                    section.fields.forEach(f => fieldsData[f] = homepage?.[f] || "");
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
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleSubmit(section.key);
                                            }}
                                            className="space-y-4"
                                        >
                                            {section.fields.map((field) => (
                                                <div key={field} className="flex flex-col">
                                                    <label className="text-sm font-medium mb-1">{fieldLabels[field]}</label>

                                                    {field.includes("image") ? (
                                                        <>

                                                            {formData[field] && (
                                                                <img
                                                                    src={
                                                                        typeof formData[field] === "string"
                                                                            ? `/storage/${formData[field]}`
                                                                            : URL.createObjectURL(formData[field])
                                                                    }
                                                                    alt={fieldLabels[field]}
                                                                    className="w-48 h-32 object-cover rounded-md mb-2 border"
                                                                />
                                                            )}


                                                            <input
                                                                type="file"
                                                                name={field}
                                                                accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                                                                onChange={handleChange}
                                                                className="hidden "
                                                                id={`file-${field}`}
                                                            />


                                                            <label
                                                                htmlFor={`file-${field}`}
                                                                className=" btn-primary inline-block cursor-pointer px-4 py-2 bg-[var(--app-primary)] text-white rounded-lg text-sm font-medium transition w-max"
                                                            >
                                                                اختر صورة
                                                            </label>
                                                        </>
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            name={field}
                                                            value={formData[field] || ""}
                                                            onChange={handleChange}
                                                            className="input py-2 px-3 border rounded-lg focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)]"
                                                            placeholder={`أدخل ${fieldLabels[field]}`}
                                                        />
                                                    )}

                                                </div>
                                            ))}

                                            <div className="flex justify-end gap-3 mt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setOpenSection(null)}
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
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </motion.div>
        </AuthenticatedLayout>
    );
}
