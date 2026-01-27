import { FiEdit, FiPlus } from "react-icons/fi";

export default function SectionCard ({ title, fieldsData, onOpen }) {
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
};
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


                <div className="flex-1 flex flex-col gap-2">
                    {textFields.length > 0 ? (
                        textFields.map(([key, value]) => (
                            <p key={key} className="text-gray-700 text-sm">
                                <span className="font-semibold">{fieldLabels[key]}: </span>
                                <span>{value}</span>
                            </p>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 italic">لا توجد بيانات حالياً لهذا القسم</p>
                    )}
                </div>
            </div>

        </div>
    );
}
