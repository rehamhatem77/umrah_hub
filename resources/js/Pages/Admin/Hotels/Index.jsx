import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import {
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiEye,
    FiSearch,
    FiChevronLeft,
    FiMapPin,
    FiStar,
    FiAlertTriangle
} from 'react-icons/fi';
import { MdOutlineHotel } from 'react-icons/md';
import { FaStar } from 'react-icons/fa6';
import toast from 'react-hot-toast';

export default function Index({ hotels, filters }) {

    const [search, setSearch] = useState(filters.search || '');
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);


    const handleSearch = (e) => {
        setSearch(e.target.value);

        router.get(
            route('hotels.index'),
            { search: e.target.value },
            { preserveState: true, replace: true }
        );
    };

    const viewHotel = async (id) => {
        const response = await fetch(route('hotels.show', id));
        const data = await response.json();
        setSelectedHotel(data);
        setShowModal(true);
    };

    const openDelete = (hotel) => {
        // if (company.offers_count > 0) {
        //     toast.error('لا يمكن حذف شركة مرتبطة بعروض');
        //     return;
        // }
        setSelectedHotel(hotel);
        setDeleteModal(true);
    };

    const destroy = () => {
        router.delete(route('hotels.destroy', selectedHotel.id), {
            onSuccess: () => {
                toast.success('تم نقل الفندق إلى سلة المحذوفات');
                setDeleteModal(false);
            },
        });
    };
    return (
        <AuthenticatedLayout>

            <div className=" px-2 sm:px-4 space-y-4">

                {/* Breadcrumb */}
                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <button
                        onClick={() => router.get(route('dashboard'))}
                        className="hover:underline"
                    >
                        لوحة التحكم
                    </button>

                    <FiChevronLeft />

                    <span className="text-[var(--app-primary)] font-medium">
                        الفنادق
                    </span>
                </div>

                {/* Header + Add Button */}
                <div className="flex justify-between items-center">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <MdOutlineHotel className="text-2xl text-[var(--app-primary)]" />
                        <h1 className="text-xl font-bold">إدارة الفنادق</h1>
                    </div>
                    
                    <div className="flex space-x-2 justify-between flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => router.get(route('hotels.create'))}
                        className="btn-primary flex items-center gap-2"
                    >
                        <FiPlus /> إضافة فندق
                    </button>

                    <button
                        onClick={() => router.get(route('hotels.trash'))}
                        className="w-fit flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                    >
                        <FiTrash2 /> سلة المحذوفات
                    </button>
                </div>
                </div>

                {/* Search */}
                <div className="flex items-center gap-2">
                    <FiSearch className="text-gray-400" />
                    <input
                        value={search}
                        onChange={handleSearch}
                        placeholder="ابحث باسم الفندق"
                        className="input flex-1"
                    />
                </div>

                <div className="card p-0 overflow-auto max-h-[60vh] rounded-lg shadow-sm border">
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
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => viewHotel(hotel.id)}
                                                className="p-1.5 rounded text-blue-600 hover:bg-blue-50 transition"
                                            >
                                                <FiEye size={18} />
                                            </button>

                                            
                                            <button
                                                onClick={() => router.get(route('hotels.edit', hotel.id))}
                                                className="p-1.5 rounded text-[var(--app-primary)] hover:bg-[var(--app-primary)]/10 transition"
                                            >
                                                <FiEdit2 size={18} />
                                            </button>

                                           
                                            <button
                                                onClick={() => openDelete(hotel)}
                                                className="p-1.5 rounded text-red-600 hover:bg-red-50 transition"
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
                <Modal show={deleteModal} title="تأكيد الحذف" onClose={() => setDeleteModal(false)}>
                                    <div className="text-center space-y-3">
                                        <FiAlertTriangle className="text-3xl mx-auto text-red-500" />
                                        <p>هل أنت متأكد من حذف هذا الفندق؟</p>
                                        <div className="flex gap-2">
                                            <button onClick={() => setDeleteModal(false)} className="btn-secondary flex-1">إلغاء</button>
                                            <button onClick={destroy} className="btn-danger flex-1">حذف</button>
                                        </div>
                                    </div>
                                </Modal>

            </div>
        </AuthenticatedLayout>
    );
}
