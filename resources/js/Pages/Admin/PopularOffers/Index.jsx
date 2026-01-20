import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { FiAlertTriangle, FiChevronLeft, FiSearch, FiStar, FiTrendingUp } from 'react-icons/fi';
import OfferCard from '@/Components/OfferCard';
import { useState } from 'react';
import { BsStars } from 'react-icons/bs';
import Modal from '@/Components/Modal';

export default function PopularOffers({ offers, filters, counts }) {

    const [filterState, setFilterState] = useState({
        search: filters?.search || '',
    });
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [statusModal, setStatusModal] = useState(false);

    const hasActiveFilters = !!filterState.search;


    const toArabicNumbers = (num) => {
        const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return num.toString().split('').map(d => arabicNumbers[d] || d).join('');
    };


    const applyFilters = (newFilters) => {
        router.get(
            route('admin.popular-offers.index'),

            newFilters,
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const openStatusModal = (offer) => {
        setSelectedOffer(offer);
        setStatusModal(true);
    };



    const togglePopularOffer = () => {
        router.patch(
            route('admin.popular-offers.popular-flag', selectedOffer.id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setStatusModal(false);
                    setSelectedOffer(null);
                }
            }
        );
    };


    return (
        <AuthenticatedLayout>
            <div className="px-3 sm:px-6 space-y-6">


                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <button onClick={() => router.get(route('dashboard'))}>
                        لوحة التحكم
                    </button>
                    <FiChevronLeft />
                    <button onClick={() => router.get(route('admin.offers.index'))}>
                        الباقات
                    </button>
                    <FiChevronLeft />
                    <span className="text-[var(--app-primary)] font-medium">
                        العروض الأكثر طلبا
                    </span>
                </div>


                <h1 className="text-xl font-bold flex items-center gap-2">
                    <FiTrendingUp className="text-[var(--app-primary)] text-2xl" />
                    العروض الأكثر طلبا

                    <span className="text-sm text-gray-500">
                        ({toArabicNumbers(counts?.popular || 0)})
                    </span>
                </h1>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                        <FiSearch className="text-slate-500" />
                        <input
                            type="text"
                            placeholder="ابحث باسم الباقة أو كود العرض..."
                            value={filterState.search}
                            onChange={(e) => {
                                const newState = { search: e.target.value };
                                setFilterState(newState);
                                applyFilters(newState);
                            }}
                            className="input w-full focus:outline-none focus:ring-0 focus:border-[var(--app-primary)]"
                        />

                    </div>
                </div>

                {offers?.data?.length === 0 && !hasActiveFilters && (
                    <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-600">
                        <p className="text-lg font-bold mb-1">لا توجد عروض شائعة</p>
                        <p className="text-sm">
                            لم يتم إضافة أي عروض شائعة حتى الآن
                        </p>
                    </div>
                )}

                {offers?.data?.length === 0 && hasActiveFilters && (
                    <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-600">
                        <p className="text-lg font-bold mb-1">لا توجد نتائج</p>
                        <p className="text-sm">
                            لا توجد عروض شائعة مطابقة لبحثك
                        </p>
                    </div>
                )}

                {offers?.data?.length > 0 && (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {offers.data.map((offer) => (
                            <OfferCard
                                key={offer.id}
                                offer={offer}
                                onTogglePopular={openStatusModal}
                            />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {offers?.data?.length > 0 && offers.links && (
                    <div className="flex justify-center gap-1 flex-wrap text-sm">
                        {offers.links.map((link, idx) => {
                            let label = '';


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


                <Modal
                    show={statusModal}
                    title="تغيير حالة الباقة"
                    onClose={() => setStatusModal(false)}
                >
                    <div className="space-y-4 text-center">


                        <div className="flex justify-center">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100">
                                <FiTrendingUp className="text-orange-600 text-2xl" />
                            </div>
                        </div>


                        <div className="space-y-1">
                            <p className="text-base font-semibold text-gray-800">
                                هل تريد إزالة هذه الباقة من العروض الأكثر طلبًا؟
                            </p>
                            <p className="text-sm text-gray-500">
                                سيتم تحويل الباقة إلى باقة عادية ولن تظهر ضمن العروض الأكثر طلبًا.
                            </p>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => setStatusModal(false)}
                                className="btn-secondary flex-1"
                            >
                                إلغاء
                            </button>

                            <button
                                onClick={togglePopularOffer}
                                className="flex-1 rounded-lg bg-orange-500 text-white py-2 hover:bg-orange-600 transition"
                            >
                                تأكيد التغيير
                            </button>
                        </div>
                    </div>
                </Modal>

            </div>
        </AuthenticatedLayout>
    );
}
