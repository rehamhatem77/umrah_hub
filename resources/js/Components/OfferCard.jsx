import { motion, AnimatePresence } from 'framer-motion';
import {
    FiEdit2,
    FiTrash2,
    FiMapPin,
    FiClock,
    FiDollarSign,
    FiEye,
    FiCalendar,
    FiTag,
    FiBriefcase,
    FiHome,
    FiLayers,
    FiRefreshCw
} from 'react-icons/fi';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { FaMapLocationDot } from 'react-icons/fa6';
import { MdOutlineCategory, MdOutlineHotel } from 'react-icons/md';
import { FaPlaneDeparture, FaRegBuilding } from 'react-icons/fa';
import { TbMoneybag } from "react-icons/tb";
import { LuPackagePlus } from 'react-icons/lu';

function formatExactDateArabic(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    


    return new Intl.DateTimeFormat('ar-EG', {
        timeZone: 'Africa/Cairo',
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })
        .format(date)
        .replace('AM', 'ص')
        .replace('PM', 'م');
}

function formatRelativeDateArabic(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    const intervals = [
        { label: 'سنة', seconds: 31536000 },
        { label: 'شهر', seconds: 2592000 },
        { label: 'يوم', seconds: 86400 },
        { label: 'ساعة', seconds: 3600 },
        { label: 'دقيقة', seconds: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);

        if (count >= 1) {
            return `منذ ${toArabicNumbers(count)} ${interval.label}`;
        }
    }

    return 'الآن';
}
function toArabicNumbers(number) {
    if (number == null) return '';
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return number.toString().split('').map(d => arabicNumbers[d] ?? d).join('');
}


export default function OfferCard({ offer }) {
    const images = offer.images ?? [];
    const [current, setCurrent] = useState(0);
    const isTrash = offer.deleted_at !== null;

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl border border-gray-100"
        >

            <div className="relative h-52 overflow-hidden">
                {images.length ? (
                    <AnimatePresence mode="wait" >
                        <motion.img
                            key={current}
                            src={`/storage/${images[current].image_path}`}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                    </AnimatePresence>
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                        لا توجد صورة
                    </div>
                )}


                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />


                <span
                    className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full backdrop-blur-md ${offer.is_active
                        ? 'bg-green-600 text-white'
                        : 'bg-red-500/90 text-white'
                        }`}
                >
                    {offer.is_active ? 'نشط' : 'غير نشط'}
                </span>


                <div className="absolute top-3 left-3 flex gap-1">
                    {offer.is_special_offer && (
                        <span className="badge bg-purple-600 text-white shadow">
                            عرض خاص
                        </span>
                    )}
                    {offer.is_featured && (
                        <span className="badge bg-blue-600 text-white shadow">
                            مميز
                        </span>
                    )}
                    {offer.is_popular && (
                        <span className="badge bg-orange-600 text-white shadow">
                            شائع
                        </span>
                    )}
                </div>


                <span className="absolute bottom-3 right-3 text-xs bg-black/60 text-white px-3 py-1 rounded-lg backdrop-blur">
                    #{offer.offer_code}
                </span>


                {images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`w-2 h-2 rounded-full transition ${i === current
                                    ? 'bg-white'
                                    : 'bg-white/40'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>


            <div className="p-5 space-y-4">

                <div className="flex justify-between items-center gap-2">

                    <h3 className="font-semibold text-[var(--app-primary)] text-lg leading-snug line-clamp-2">
                        {offer.title}
                    </h3>
                    <div className="flex items-baseline gap-1 overflow-hidden">
                        <span className="text-sm font-bold text-green-700">
                            {toArabicNumbers(offer.price)} جنيه
                        </span>
                    </div>
                </div>


                <div className="flex flex-wrap gap-2 text-xs">

                    <InfoChip
                        key="governorates"
                        icon={<FaMapLocationDot />}
                        text={offer.governorates?.map(g => g.name).join('-')}
                    />

                    <InfoChip icon={<MdOutlineCategory />} text={offer.trip_type?.name} />
                    <InfoChip icon={<FaRegBuilding />} text={offer.company?.name} />

                    <InfoChip
                        key="hotels"
                        icon={<MdOutlineHotel />}
                        text={offer.hotels?.map(h => h.name).join('-')}
                    />

                    <InfoChip icon={<FaPlaneDeparture />} text={offer.airline} />

                </div>


                <div className="grid grid-cols-2 gap-2 text-xs">
                    <Stat icon={<FiClock />} value={`${toArabicNumbers(offer.duration_days)} أيام`} />
                    {offer.features?.length > 0 && (
                        <Stat
                            icon={<LuPackagePlus />}
                            value={`${toArabicNumbers(offer.features.length)} مميزات`}
                        />
                    )}

                    {offer.discount && (
                        <Stat
                            icon={<FiTag />}
                            value={`خصم ${offer.discount}%`}
                            highlight
                        />
                    )}

                </div>


                <div className="flex items-center justify-between pt-4 border-t text-xs text-gray-400">
                    <div className="space-y-0.5">
                        <div className="flex items-center gap-1 font-medium text-gray-600">
                            <FiCalendar />
                            {formatRelativeDateArabic(offer.created_at)}
                        </div>

                        <div className="text-[11px] text-gray-400">
                            {formatExactDateArabic(offer.created_at)}
                        </div>
                    </div>


                    <div className="flex gap-1 transition">
                        <IconBtn
                            icon={<FiEye />}
                            title="عرض التفاصيل"
                            onClick={() =>
                                router.get(route('admin.offers.show', offer.id))
                            }
                        />
                        {isTrash ? (
                            <IconBtn
                                icon={<FiRefreshCw />}
                                title="استعادة العرض"
                                onClick={() =>
                                    router.put(route('admin.offers.restore', offer.id))
                                }
                            />
                        ) : (
                            <IconBtn
                                icon={<FiEdit2 />}
                                title="تعديل العرض"
                                onClick={() =>
                                    router.get(route('admin.offers.edit', offer.id))
                                }
                            />
                        )}


                        {router.url !== route('admin.offers.trash') ? (
                            <IconBtn
                                icon={<FiTrash2 />}
                                danger
                                title="حذف العرض"
                                onClick={() =>
                                    router.delete(
                                        route('admin.offers.destroy', offer.id),
                                        { preserveScroll: true }
                                    )
                                }
                            />
                        ) :
                            <IconBtn
                                icon={<FiTrash2 />}
                                danger
                                title="حذف العرض نهائياً"
                                onClick={() =>
                                    router.delete(
                                        route('admin.offers.forceDelete', offer.id),
                                        { preserveScroll: true }
                                    )
                                }
                            />
                        }


                    </div>
                </div>


            </div>
        </motion.div>
    );
}



function InfoChip({ icon, text }) {
    if (!text) return null;
    return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-700">
            {icon}
            {text}
        </span>
    );
}

function Stat({ icon, value, highlight }) {
    return (
        <div
            className={`flex items-center gap-2 p-2 rounded-lg ${highlight
                ? 'bg-green-50 text-green-700'
                : 'bg-gray-50 text-gray-700'
                }`}
        >
            {icon}
            <span className="font-medium">{value}</span>
        </div>
    );
}

function IconBtn({ icon, onClick, danger }) {
    return (
        <button
            onClick={onClick}
            className={`p-2 rounded-lg transition ${danger
                ? 'text-red-600 hover:bg-red-50'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
        >
            {icon}
        </button>
    );
}
