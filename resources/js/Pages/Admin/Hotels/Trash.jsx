import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Modal from '@/Components/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiTrash2, FiAlertTriangle, FiMapPin, FiPhone, FiSearch, FiEye, FiStar } from 'react-icons/fi';
import { FaRegBuilding, FaStar, FaWhatsapp, FaWindowRestore } from 'react-icons/fa6';
import { MdOutlineHotel, MdRestore } from "react-icons/md";
import toast from 'react-hot-toast';

const pageMotion = { hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } };
const rowMotion = { hidden: { opacity: 0, y: 3 }, visible: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -3 } };

export default function Trash({ hotels, filters }) {
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [search, setSearch] = useState(filters.search || '');
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        router.get(route('hotels.trash'), { search: debouncedSearch }, { preserveState: true, replace: true });
    }, [debouncedSearch]);
    const restore = (hotel) => {
        router.post(route('hotels.restore', hotel.id), {}, {
            onSuccess: () => {router.reload(); toast.success('تم استعادة الفندق بنجاح');},
            onError: () => toast.error('حدث خطأ أثناء استعادة الفندق'),
        });
    };

    const openDelete = (hotel) => {
        setSelectedHotel(hotel);
        setDeleteModal(true);
    };

    const viewHotel = async (id) => {
        const response = await fetch(route('hotels.show', id));
        const data = await response.json();
        setSelectedHotel(data);
        setShowModal(true);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        router.get(route('hotels.trash'), { search: e.target.value }, { preserveState: true, replace: true });
    };

    const destroy = () => {
        router.delete(route('hotels.destroy', selectedHotel.id) + '?force=1', {
            onSuccess: () =>{setDeleteModal(false); toast.success('تم الحذف بنجاح') },
                onError: () => toast.error('حدث خطأ'),

        });
    };


    

    return (
        <AuthenticatedLayout>
            <motion.div variants={pageMotion} initial="hidden" animate="visible" className="space-y-4 px-2 sm:px-4">


                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <button
                        onClick={() => router.get(route('dashboard'))}
                        className="hover:underline"
                    >
                        لوحة التحكم
                    </button>
                    <FiChevronLeft />
                    <button
                        onClick={() => router.get(route('hotels.index'))}
                        className="hover:underline"
                    >
                        الفنادق
                    </button>
                    <FiChevronLeft />
                    <span className="text-[var(--app-primary)] font-medium">سلة المحذوفات</span>
                </div>

                <h1 className="text-xl font-bold flex items-center gap-2">
                    <FiTrash2 className="text-[var(--app-primary)] text-2xl" />  سلة محذوفات الفنادق
                </h1>
                <div className="relative flex items-center gap-2">
                    <FiSearch className="text-gray-400" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ابحث باسم الفندق..."
                        className="input flex-1 py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="absolute right-2 text-gray-400 hover:text-gray-600 transition"
                        >
                            ✕
                        </button>
                    )}
                </div>


                <div className="card p-0 overflow-hidden">
                    <table className="w-full text-sm table-auto border-collapse">
                        <thead className="bg-gray-50 sticky top-0 z-10 shadow">
                            <tr>
                                <th className="px-4 py-3 text-center">#</th>
                                <th className="px-4 py-3 text-left">اسم الفندق</th>
                                <th className="px-4 py-3 text-left">المدينة</th>
                                <th className="px-4 py-3 text-center">النجوم</th>
                                <th className="px-4 py-3 text-center">العمليات</th>
                            </tr>
                        </thead>

                        <tbody>
                            {hotels.data.length ? hotels.data.map((hotel, idx) => (
                                <tr
                                    key={hotel.id}
                                    className={`border-t hover:bg-gray-50 transition-colors duration-150 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                                >
                                    <td className="px-4 py-3 text-center">{hotel.id}</td>

                                    <td className="px-4 py-3 text-left font-medium">{hotel.name}</td>

                                    <td className="px-4 py-3 text-left">{hotel.city}</td>

                                    <td className="px-4 py-3 text-center flex justify-center gap-0.5">
                                        {[...Array(hotel.stars)].map((_, i) => (
                                            <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                                        ))}
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => viewHotel(hotel.id)}
                                                title=" عرض الفندق"
                                                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                                            >
                                                <FiEye size={18} />
                                            </button>
                                            <button
                                                onClick={() => restore(hotel)}
                                                title="استعادة الفندق"
                                                className="p-2 bg-[var(--app-primary)] text-white rounded-lg hover:bg-green-700 transition"
                                            >
                                                <MdRestore size={18} />
                                            </button>

                                            <button
                                                onClick={() => openDelete(hotel)}
                                                title="حذف نهائي"
                                                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                            >
                                                <FiTrash2 size={18} />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="py-6 text-center text-gray-500">
                                        لا توجد فنادق
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {hotels.links && (
                    <div className="flex justify-center gap-1 flex-wrap text-sm">
                        {hotels.links.map((link, idx) => {
                            let label = '';
                            const toArabicNumbers = (num) => {
                                const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
                                return num.toString().split('').map(d => arabicNumbers[d] || d).join('');
                            };
                            if (link.label.includes('Previous')) label = '«';
                            else if (link.label.includes('Next')) label = '»';
                            else label = toArabicNumbers(link.label.replace(/&laquo;|&raquo;/g, ''));
                            return (
                                <button
                                    key={idx}
                                    onClick={() => link.url && router.get(link.url, {}, { preserveState: true, replace: true })}
                                    className={`px-2 py-1 rounded border ${link.active
                                        ? 'bg-[var(--app-primary)] text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                                    disabled={!link.url}
                                    dangerouslySetInnerHTML={{ __html: label }}
                                />
                            );
                        })}
                    </div>
                )}


                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    title="تفاصيل الفندق"
                    className="max-w-4xl w-full"
                    contentClassName="max-h-[80vh] overflow-y-auto p-6 space-y-4"
                >
                    {selectedHotel && (
                        <div className="grid gap-4 sm:grid-cols-2 text-sm">


                            <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 shadow-sm hover:shadow transition">
                                <MdOutlineHotel className="text-[var(--app-primary)] w-6 h-6" />
                                <div>
                                    <div className="text-gray-500 text-xs">اسم الفندق</div>
                                    <div className="font-medium text-gray-800">{selectedHotel.name}</div>
                                </div>
                            </div>


                            <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 shadow-sm hover:shadow transition">
                                <FiMapPin className="text-green-500 w-5 h-5" />
                                <div>
                                    <div className="text-gray-500 text-xs">المدينة</div>
                                    <div className="font-medium text-gray-800">{selectedHotel.city}</div>
                                </div>
                            </div>


                            <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 shadow-sm hover:shadow transition">
                                <FaStar className="text-yellow-400 w-5 h-5" />
                                <div>
                                    <div className="text-gray-500 text-xs">عدد النجوم</div>
                                    <div className="font-medium text-gray-800">{selectedHotel.stars}</div>
                                </div>
                            </div>


                            {selectedHotel.city === 'مكة' && (
                                <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 shadow-sm hover:shadow transition">
                                    <FiMapPin className="text-blue-500 w-5 h-5" />
                                    <div>
                                        <div className="text-gray-500 text-xs">المسافة من الكعبة</div>
                                        <div className="font-medium text-gray-800">{selectedHotel.distance_from_kaaba} متر</div>
                                    </div>
                                </div>
                            )}
                            {selectedHotel.city === 'المدينة المنورة' && (
                                <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 shadow-sm hover:shadow transition">
                                    <FiMapPin className="text-blue-500 w-5 h-5" />
                                    <div>
                                        <div className="text-gray-500 text-xs">المسافة من النبوي</div>
                                        <div className="font-medium text-gray-800">{selectedHotel.distance_from_nabawi} متر</div>
                                    </div>
                                </div>
                            )}


                            <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 col-span-full shadow-sm hover:shadow transition">
                                <FiMapPin className="text-purple-500 w-5 h-5" />
                                <div>
                                    <div className="text-gray-500 text-xs">العنوان</div>
                                    <div className="font-medium text-gray-800">{selectedHotel.address_location}</div>
                                </div>
                            </div>


                            {selectedHotel.features && (
                                <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 col-span-full shadow-sm hover:shadow transition">
                                    <FiStar className="text-orange-500 w-5 h-5" />
                                    <div>
                                        <div className="text-gray-500 text-xs">المميزات</div>
                                        <div className="font-medium text-gray-800">{selectedHotel.features}</div>
                                    </div>
                                </div>
                            )}


                            <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 col-span-full shadow-sm hover:shadow transition">
                                <FiEye className={`w-5 h-5 ${selectedHotel.is_active ? 'text-green-500' : 'text-red-500'}`} />
                                <div>
                                    <div className="text-gray-500 text-xs">الحالة</div>
                                    <div className={`font-medium ${selectedHotel.is_active ? 'text-green-600' : 'text-red-600'}`}>
                                        {selectedHotel.is_active ? 'مفعل' : 'غير مفعل'}
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                </Modal>
                {/* DELETE MODAL */}
                <Modal show={deleteModal} title="تأكيد الحذف النهائي" onClose={() => setDeleteModal(false)}>
                    <div className="text-center space-y-3">
                        <FiAlertTriangle className="text-3xl mx-auto text-red-500" />
                        <p>هل أنت متأكد من حذف هذا الفندق نهائيًا؟</p>
                        <div className="flex gap-2">
                            <button onClick={() => setDeleteModal(false)} className="btn-secondary flex-1">إلغاء</button>
                            <button onClick={destroy} className="btn-danger flex-1">حذف نهائي</button>
                        </div>
                    </div>
                </Modal>

            </motion.div>
        </AuthenticatedLayout>
    );
}
