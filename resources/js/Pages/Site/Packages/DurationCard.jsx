import toArabicNumbers from "@/Components/Utils/ArabicNumbers";

export default function DurationCard({ days, count, onClick ,imageSrc}) {
    return (
        <div
            onClick={onClick}
            className="relative cursor-pointer rounded-2xl overflow-hidden shadow-xl group h-[350px]"
        >
            <img
                src={imageSrc} 
                alt={`${days} days`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition"></div>

            <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
                <h2 className="text-4xl font-bold mb-2">
                    {toArabicNumbers(days)} أيام
                </h2>

                <p className="text-lg opacity-90">
                    {toArabicNumbers(count)} باقة متاحة
                </p>

                <div className="mt-4 bg-white text-black px-6 py-2 rounded-full font-semibold group-hover:bg-yellow-400 transition">
                    عرض الباقات
                </div>
            </div>
        </div>
    );
}
