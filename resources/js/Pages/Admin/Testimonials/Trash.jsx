import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiChevronLeft,
    FiSearch,
    FiUser,
    FiTrash2,
    FiRefreshCcw,
    FiStar,
    FiAlertTriangle,
    FiEye,
    FiMessageSquare
} from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import Modal from '@/Components/Modal';
import toast from 'react-hot-toast';

const pageMotion = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const cardMotion = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95 },
};

export default function Trash({ testimonials, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [deleteModal, setDeleteModal] = useState(false);

    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        router.get(
            route('testimonials.trash'),
            { search: e.target.value },
            { preserveState: true, replace: true },
            { onError: () => { toast.error('حدث خطأ أثناء البحث') } }
        );

    };

    const viewTestimonial = async (id) => {
        const response = await fetch(route('testimonials.show', id), { onError: () => { toast.error('حدث خطأ أثناء جلب تفاصيل التقييم') } });
        const data = await response.json();
        setSelectedTestimonial(data);
        setShowModal(true);
        
    };

    const restoreTestimonial = (id) => {
        router.post(route('testimonials.restore', id), {}, {
            onSuccess: () => {
                toast.success('تم استعادة التقييم بنجاح');
            },
            onError: () => { toast.error('حدث خطأ أثناء الاستعادة') },
        });
    };
    const openDelete = (testimonial) => {

        setSelectedTestimonial(testimonial);
        setDeleteModal(true);
    };

    const forceDelete = () => {
        router.delete(route('testimonials.destroy', selectedTestimonial.id) + '?force=1', {
            onSuccess: () => {
                toast.success('تم الحذف النهائي للتقييم بنجاح');
                setDeleteModal(false);
            },
            onError: () => { toast.error('حدث خطأ أثناء الحذف النهائي') },
        });
    };

    return (
        <AuthenticatedLayout>
            <motion.div
                variants={pageMotion}
                initial="hidden"
                animate="visible"
                className="space-y-5 px-2 sm:px-4"
            >
                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <button onClick={() => router.get(route('dashboard'))} className="hover:underline">
                        لوحة التحكم
                    </button>
                    <FiChevronLeft />
                    <button
                        onClick={() => router.get(route('testimonials.index'))}
                        className="hover:underline"
                    >
                        التقييمات
                    </button>
                    <FiChevronLeft />
                    <span className="text-[var(--app-primary)] font-medium ">سلة المحذوفات</span>
                </div>

                <div className="flex items-center gap-3">
                    <FiTrash2 className="text-2xl" />
                    <h1 className="text-[var(--app-primary)] text-xl font-bold">
                        سلة محذوفات التقييمات
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <FiSearch className="text-gray-400" />
                    <input
                        value={search}
                        onChange={handleSearch}
                        placeholder="ابحث باسم العميل"
                        className="input flex-1 py-2.5 px-3 text-sm rounded-lg"
                    />
                </div>

                {/* CARDS */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence>
                        {testimonials?.data?.length ? (
                            testimonials.data.map(item => (
                                <motion.div
                                    key={item.id}
                                    variants={cardMotion}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="card p-4 space-y-3 border border-red-200"
                                >

                                    <div className="flex items-start gap-3">
                                        <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center text-white">
                                            <FiUser size={20} />
                                        </div>

                                        <div className="flex-1 space-y-1 overflow-hidden text-ellipsis whitespace-nowrap">
                                            <p className="font-semibold">
                                                {item.customer_name}
                                            </p>

                                            <div className="flex items-center gap-1 text-yellow-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar
                                                        key={i}
                                                        size={14}
                                                        className={i < item.rating ? 'opacity-100' : 'opacity-30'}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>


                                    <p
                                        title={item.comment}
                                        className="text-sm text-gray-600 leading-relaxed line-clamp-2 cursor-help"
                                    >
                                        {item.comment}
                                    </p>


                                    <div className="flex justify-end gap-2 pt-2 border-t">
                                        <button
                                            onClick={() => viewTestimonial(item.id)}
                                            title='عرض التقييم'
                                            className="p-2 rounded-full text-[var(--app-primary)] hover:bg-green-100"
                                        >
                                            <FiEye size={16} />
                                        </button>
                                        <button
                                            onClick={() => restoreTestimonial(item.id)}
                                            title="استعادة"
                                            className="p-2 rounded-full text-green-600 hover:bg-green-50"
                                        >
                                            <FiRefreshCcw size={16} />
                                        </button>


                                        <button
                                            onClick={() => openDelete(item)}
                                            title="حذف نهائي"
                                            className="p-2 rounded-full text-red-600 hover:bg-red-50"
                                        >
                                            <FiTrash2 size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 py-10">
                                لا توجد تقييمات محذوفة
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* PAGINATION */}
                {testimonials.links && (
                    <div className="flex justify-center gap-1 flex-wrap text-sm">
                        {testimonials.links.map((link, idx) => {
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
            </motion.div>

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                title="تفاصيل التقييم"
                className="max-w-4xl w-full"
                contentClassName="max-h-[80vh] overflow-y-auto p-6 space-y-4"
            >
                {selectedTestimonial && (
                    <div className="grid gap-4 sm:grid-cols-2 text-sm">


                        <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 shadow-sm hover:shadow transition">
                            <FiUser className="text-[var(--app-primary)] w-6 h-6" />
                            <div>
                                <div className="text-gray-500 text-xs">اسم العميل</div>
                                <div className="font-medium text-gray-800">{selectedTestimonial.customer_name}</div>
                            </div>
                        </div>



                        <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 shadow-sm hover:shadow transition">
                            <FaStar className="text-yellow-400 w-5 h-5" />
                            <div>
                                <div className="text-gray-500 text-xs">التقييم</div>
                                <div className="font-medium text-gray-800">{selectedTestimonial.rating}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 col-span-full shadow-sm hover:shadow transition">
                            <FiMessageSquare className="text-purple-500 w-5 h-5" />
                            <div>
                                <div className="text-gray-500 text-xs">التعليق</div>
                                <div className="font-medium text-gray-800 ">{selectedTestimonial.comment}</div>
                            </div>
                        </div>



                        <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 col-span-full shadow-sm hover:shadow transition">
                            <FiEye className={`w-5 h-5 ${selectedTestimonial.is_active ? 'text-green-500' : 'text-red-500'}`} />
                            <div>
                                <div className="text-gray-500 text-xs">الحالة</div>
                                <div className={`font-medium ${selectedTestimonial.is_active ? 'text-green-600' : 'text-red-600'}`}>
                                    {selectedTestimonial.is_active ? 'مفعل' : 'غير مفعل'}
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </Modal>
            <Modal show={deleteModal} title="تأكيد الحذف" onClose={() => setDeleteModal(false)}>
                <div className="text-center space-y-3">
                    <FiAlertTriangle className="text-3xl mx-auto text-red-500" />
                    <p> هل أنت متأكد من حذف هذا التقييم نهائياً؟</p>
                    <div className="flex gap-2">
                        <button onClick={() => setDeleteModal(false)} className="btn-secondary flex-1">إلغاء</button>
                        <button onClick={() => forceDelete()} className="btn-danger flex-1">حذف</button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
