import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router, usePage } from '@inertiajs/react';
import { FiChevronLeft, FiTrash2, FiRefreshCw, FiAlertTriangle, FiSearch } from 'react-icons/fi';
import OfferCard from '@/Components/OfferCard';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Modal from '@/Components/Modal';

export default function Trash({ offers, filters }) {

    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedOfferId, setSelectedOfferId] = useState(null);
    const openForceDeleteModal = (offerId) => {
        setSelectedOfferId(offerId);
        setDeleteModal(true);
    };
    const [filterState, setFilterState] = useState({
        search: filters?.search || null,
    });

    const hasActiveFilters = Object.entries(filterState).some(
        ([key, value]) => value !== null && value !== 'all'
    );

    const applyFilters = (newFilters) => {
        router.get(
            route('admin.offers.trash'),
            newFilters,
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const handleForceDelete = () => {
        if (!selectedOfferId) return;

        router.delete(
            route('admin.offers.forceDelete', selectedOfferId),
            {
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteModal(false);
                    setSelectedOfferId(null);
                }
            }
        );
    };


    return (
        <AuthenticatedLayout>
            <div className="px-3 sm:px-6 space-y-6">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <button onClick={() => router.get(route('dashboard'))}>لوحة التحكم</button>
                    <FiChevronLeft />
                    <button onClick={() => router.get(route('admin.offers.index'))}>الباقات</button>
                    <FiChevronLeft />
                    <span className="text-[var(--app-primary)] font-medium">سلة المحذوفات</span>
                </div>

                <h1 className="text-xl font-bold flex items-center gap-2">
                    <FiTrash2 className="text-[var(--app-primary)] text-2xl" /> سلة محذوفات الباقات
                </h1>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg ">

                    <div className="flex-1 min-w-[200px] flex items-center gap-3 ">
                        <FiSearch className="inline mb-1 mr-1 text-slate-500" />
                        <input
                            type="text"
                            placeholder="ابحث عن باقة من اختيارك باستخدام اسم أو كود الباقة..."
                            value={filterState.search || ''}
                            onChange={(e) => {
                                const newState = {
                                    ...filterState,
                                    search: e.target.value || null,
                                };
                                setFilterState(newState);
                                applyFilters(newState);
                            }}
                            className="input w-full focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] "
                        />
                    </div>


                </div>

          
                {offers?.data?.length === 0 && !hasActiveFilters && (
                    <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-600">
                        <p className="text-lg font-bold mb-1">لا توجد باقات محذوفة</p>
                        <p className="text-sm">
                            يتم عرض الباقات المحذوفة هنا بعد الحذف المؤقت.
                        </p>
                    </div>
                )}

           
                {offers?.data?.length === 0 && hasActiveFilters && (
                    <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-600">
                        <p className="text-lg font-bold mb-1">لا توجد نتائج</p>
                        <p className="text-sm">
                            لا توجد باقات مطابقة لخيارات البحث الحالية
                        </p>
                    </div>
                )}

              
                {offers?.data?.length > 0 && (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {offers.data.map((offer) => (
                            <OfferCard
                                key={offer.id}
                                offer={offer}
                                handleDeleteClick={openForceDeleteModal}
                            />
                        ))}
                    </div>
                )}


                <Modal
                    show={deleteModal}
                    title="تأكيد الحذف النهائي"
                    onClose={() => setDeleteModal(false)}
                >
                    <div className="text-center space-y-3">
                        <FiAlertTriangle className="text-3xl mx-auto text-red-500" />

                        <p className="font-medium">
                            هل أنت متأكد من حذف هذه الباقة نهائيًا؟
                        </p>

                        <p className="text-sm text-gray-500">
                            لا يمكن التراجع عن هذا الإجراء
                        </p>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setDeleteModal(false)}
                                className="btn-secondary flex-1"
                            >
                                إلغاء
                            </button>

                            <button
                                onClick={handleForceDelete}
                                className="btn-danger flex-1"
                            >
                                حذف نهائي
                            </button>
                        </div>
                    </div>
                </Modal>

                {offers?.data?.length > 0 && offers.links && (
                    <div className="flex justify-center gap-1 flex-wrap text-sm">
                        {offers.links.map((link, idx) => {
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
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                        }`}
                                    disabled={!link.url}
                                    dangerouslySetInnerHTML={{ __html: label }}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
