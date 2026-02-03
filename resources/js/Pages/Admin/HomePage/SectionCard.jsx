import { umrahHajjIcons } from "@/Components/IconPicker";
import React from "react";
import { FiEdit, FiPlus } from "react-icons/fi";

export default function SectionCard({ title, fieldsData, onOpen }) {
    const hasData = Object.values(fieldsData).some(value => value !== null && value !== "");
    const imageField = Object.keys(fieldsData).find(
        key => key.includes("image") && fieldsData[key]
    );
    const textFields = Object.entries(fieldsData).filter(([key, value]) => value && !key.includes("image"));
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


        seo_title: "عنوان SEO",
        seo_description: "وصف SEO",
        seo_keywords: "كلمات مفتاحية SEO",

        hero_title: "عنوان الهيرو",
        hero_badge_title: "شعار الهيرو",
        hero_description: "وصف الهيرو",
        hero_image: "صورة الهيرو",

        intro_title: "عنوان المقدمة",
        intro_description: "وصف المقدمة",
        intro_badge: "شعار المقدمة",
        intro_image: "صورة المقدمة",
        intro_description_long: "وصف طويل للمقدمة",
        intro_badge_sub: "ملحق شعار المقدمة",

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


        contact_title: "عنوان قسم التواصل",
        contact_address: "العنوان",
        contact_email: "البريد الإلكتروني",
        contact_phone: "رقم الهاتف",
        contact_location: "رابط الموقع الجغرافي",
        working_hours: "ساعات العمل",
        contact_wp:"رقم الواتساب",

        insta_link: "رابط إنستجرام",
        fb_link: "رابط فيسبوك",
        x_link: "رابط X",

        footer_desc: "وصف الفوتر",

    };
    const iconMap = {};
    umrahHajjIcons.forEach(({ icon: Icon }) => {
        iconMap[Icon.name] = Icon;
    });
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">{title}</h2>


                <button
                    onClick={onOpen}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors bg-[var(--app-primary)] text-white"
                >
                    {hasData ? <FiEdit /> : <FiPlus />}
                    {hasData ? "تعديل البيانات" : "إضافة بيانات"}
                </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center">

                {imageField && (
                    <div className="flex-shrink-0 sm:w-48">
                        <img
                            src={`/storage/${fieldsData[imageField]}`}
                            alt={fieldLabels[imageField]}
                            className="w-full h-32  object-cover rounded-lg border"
                        />
                    </div>
                )}

                <div className="flex-1 flex flex-col gap-2" >
                    {textFields.length > 0 ? (
                        textFields.map(([key, value]) => {
                            const isIcon = key.includes("icon") && value;
                            return (
                                <p key={key} className="text-gray-700 text-sm flex gap-2">
                                    <span className="font-semibold">{fieldLabels[key]}: </span>
                                    {isIcon ? (
                                        <>
                                            {React.createElement(iconMap[value] || null, { className: "text-[var(--app-primary)] text-xl" })}
                                        </>
                                    ) : (
                                        <span>{value}</span>
                                    )}
                                </p>
                            );
                        })
                    ) : (
                        <p className="text-sm text-gray-500 italic">لا توجد بيانات حالياً لهذا القسم</p>
                    )}
                </div>
            </div>

        </div>
    );
}
