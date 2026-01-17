import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Modal from '@/Components/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiTrash2, FiAlertTriangle, FiMapPin, FiPhone, FiSearch } from 'react-icons/fi';
import { FaRegBuilding, FaWhatsapp, FaWindowRestore } from 'react-icons/fa6';
import { MdRestore } from "react-icons/md";
import toast from 'react-hot-toast';

const pageMotion = { hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } };
const rowMotion = { hidden: { opacity: 0, y: 3 }, visible: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -3 } };

export default function Trash({ companies, filters }) {
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [search, setSearch] = useState(filters.search || '');
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        router.get(route('tour-companies.trash'), { search: debouncedSearch }, { preserveState: true, replace: true });
    }, [debouncedSearch]);
    const restore = (company) => {
        router.post(route('tour-companies.restore', company.id), {}, {
            onSuccess: () => {
                toast.success('تم استعادة الشركة بنجاح');
                router.reload()},
        });
    };

    const openDelete = (company) => {
        setSelectedCompany(company);
        setDeleteModal(true);
    };

   const handleSearch = (e) => {
    setSearch(e.target.value);
    router.get(route('tour-companies.trash'), { search: e.target.value }, { preserveState: true, replace: true });
};

    const destroy = () => {
        router.delete(route('tour-companies.destroy', selectedCompany.id) + '?force=1', {
            onSuccess: () => {
                
                toast.success('تم الحذف بنجاح');
                setDeleteModal(false)},
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
                        onClick={() => router.get(route('tour-companies.index'))}
                        className="hover:underline"
                    >
                        شركات السياحة
                    </button>
                    <FiChevronLeft />
                    <span className="text-[var(--app-primary)] font-medium">سلة المحذوفات</span>
                </div>

                <h1 className="text-xl font-bold flex items-center gap-2">
                    <FiTrash2 className="text-[var(--app-primary)] text-2xl" /> سلة محذوفات شركات السياحة 
                </h1>
                <div className="relative flex items-center gap-2">
                    <FiSearch className="text-gray-400" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ابحث باسم الشركة"
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
                    <table className="w-full text-sm border-collapse">
                        <thead className="bg-gray-50">
                            <tr className="text-gray-600">
                                <th className="px-4 py-3 text-right">#</th>
                                <th className="px-4 py-3 text-right">الشركة</th>
                                <th className="px-4 py-3 text-right">المحافظة</th>
                                <th className="px-4 py-3 text-right">التواصل</th>
                                <th className="px-4 py-3 text-center w-36">العمليات</th>
                            </tr>
                        </thead>

                        <tbody>
                            <AnimatePresence>
                                {companies.data.length ? companies.data.map(company => (
                                    <motion.tr
                                        key={company.id}
                                        variants={rowMotion}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        whileHover={{ backgroundColor: '#f9fafb' }}
                                        className="border-t"
                                    >
                                        <td className="px-4 py-3 text-gray-500">{company.id}</td>
                                        <td className="px-4 py-3 font-medium flex items-center gap-2">
                                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--app-primary)]/10 text-[var(--app-primary)]">
                                                <FaRegBuilding size={16} />
                                            </span>
                                            {company.name}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700">
                                                <FiMapPin />
                                                {company.governorate.name}
                                            </span>
                                        </td>
                                        <td className="space-y-1 text-xs">
                                            {company.phone && (
                                                <div className="flex items-center gap-1 text-gray-700">
                                                    <FiPhone className="text-[var(--app-primary)]" />
                                                    <span>{company.phone}</span>
                                                </div>
                                            )}
                                            {company.whatsapp && (
                                                <div className="flex items-center gap-1 text-green-600 font-medium">
                                                    <FaWhatsapp size={14} />
                                                    <span>{company.whatsapp}</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-center flex justify-center gap-2">
                                            <button
                                                onClick={() => restore(company)}
                                                title="استعادة الشركة"
                                                className="px-3 py-1 bg-[var(--app-primary)] text-white rounded-lg hover:bg-green-700 transition flex items-center gap-1"
                                            >
                                                <MdRestore size={18} />
                                            </button>
                                            <button
                                                onClick={() => openDelete(company)}
                                                title="حذف نهائي"
                                                className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-1"
                                            >
                                                <FiTrash2 size={18} />
                                            </button>
                                        </td>

                                    </motion.tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="py-6 text-center text-gray-500">
                                            لا توجد شركات محذوفة
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {companies.links && (
                    <div className="flex justify-center gap-1 flex-wrap text-sm">
                        {companies.links.map((link, idx) => {
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

                {/* DELETE MODAL */}
                <Modal show={deleteModal} title="تأكيد الحذف النهائي" onClose={() => setDeleteModal(false)}>
                    <div className="text-center space-y-3">
                        <FiAlertTriangle className="text-3xl mx-auto text-red-500" />
                        <p>هل أنت متأكد من حذف هذه الشركة نهائيًا؟</p>
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
