import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiMapPin,
    FiAlertTriangle,
    FiChevronLeft,
    FiSearch
} from 'react-icons/fi';
import { FaMapLocationDot } from 'react-icons/fa6';

const pageMotion = { hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };
const cardMotion = { hidden: { opacity: 0, y: 3 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };
const rowMotion = { hidden: { opacity: 0, y: 2 }, visible: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -2 } };

export default function Index({ tripTypes, filters }) {
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const form = useForm({ name: '', id: null });
    const [addSelect, setAddSelect] = useState(null);
    const [editSelect, setEditSelect] = useState(null);
    const [frontendErrors, setFrontendErrors] = useState({});
    const [search, setSearch] = useState(filters.search || '');

    const selectedTripTypes = tripTypes.data.map(t => t.name);
    const tripTypeOptions = selectedTripTypes.map(t => ({
        label: t,
        value: t,
        isDisabled: selectedTripTypes.includes(t),
    }));

    const selectStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: '40px',
            borderRadius: '10px',
            borderColor: frontendErrors.name
                ? '#ef4444'
                : state.isFocused
                    ? 'var(--app-primary)'
                    : '#d1d5db',
            boxShadow: state.isFocused ? '0 0 0 2px rgba(15,61,46,.12)' : 'none',
            cursor: 'default',
            transition: 'all 0.2s ease',
            '&:hover': { borderColor: 'var(--app-primary)', cursor: 'default' },
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? 'var(--app-primary)'
                : state.isFocused
                    ? 'rgba(15,61,46,0.08)'
                    : '#fff',
            color: state.isSelected ? '#fff' : state.isDisabled ? '#9ca3af' : '#333',
            cursor: state.isDisabled ? 'not-allowed' : 'default',
            padding: '6px 12px',
        }),
        placeholder: (base) => ({ ...base, color: '#9ca3af' }),
    };

    const submit = (e) => {
        e.preventDefault();
        if (!form.data.name) { setFrontendErrors({ name: 'اسم نوع الرحلة مطلوب' }); return; }
        if (selectedTripTypes.includes(form.data.name)) { toast.error('هذا النوع موجود مسبقًا'); return; }

        form.post(route('trip-types.store'), {
            onSuccess: () => { toast.success('تمت إضافة نوع الرحلة بنجاح'); form.reset(); setAddSelect(null); setFrontendErrors({}); },
            onError: () => toast.error('حدث خطأ أثناء الإضافة'),
        });
    };

    const openEdit = (tripType) => {
        const option = { label: tripType.name, value: tripType.name };
        form.setData({ name: tripType.name, id: tripType.id });
        setEditSelect(option);
        setEditModal(true);
    };

    const update = (e) => {
        e.preventDefault();
        if (selectedTripTypes.includes(form.data.name) && form.data.name !== editSelect?.value) {
            toast.error('هذا النوع موجود مسبقًا'); return;
        }
        form.put(route('trip-types.update', form.data.id), {
            onSuccess: () => { toast.success('تم تحديث نوع الرحلة بنجاح'); setEditModal(false); setEditSelect(null); form.reset(); },
            onError: () => toast.error('حدث خطأ أثناء التحديث'),
        });
    };

    const openDelete = (id) => { setSelectedId(id); setDeleteModal(true); };
    const destroy = () => {
        router.delete(route('trip-types.destroy', selectedId), {
            onSuccess: () => { toast.success('تم حذف نوع الرحلة بنجاح'); setDeleteModal(false); },
            onError: () => toast.error('فشل حذف نوع الرحلة'),
        });
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        router.get(route('trip-types.index'), { search: e.target.value }, { preserveState: true, replace: true });
    };

    return (
        <AuthenticatedLayout>
            <motion.div variants={pageMotion} initial="hidden" animate="visible" className="space-y-3 px-2 sm:px-4">

                {/* BREADCRUMBS */}
                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <span>لوحة التحكم</span>
                    <FiChevronLeft />
                    <span className="text-[var(--app-primary)] font-medium">أنواع الرحلات</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center  gap-3">
                    <FaMapLocationDot className="text-2xl text-[var(--app-primary)]" />

                    <h1 className="text-lg sm:text-xl font-bold">إدارة أنواع الرحلات</h1>
                </div>
                {/* ADD */}
                <motion.div variants={cardMotion} className="card p-3">
                    <h2 className="text-md font-semibold mb-2 flex items-center gap-2"><FiPlus /> إضافة نوع رحلة</h2>
                    <form onSubmit={submit} className="flex gap-2 items-start">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                                placeholder="اسم نوع الرحلة"
                                className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm ${frontendErrors.name ? 'border-red-500' : ''}`}
                            />
                            <InputError message={frontendErrors.name} className="mt-1 text-sm" />
                        </div>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary h-9 px-3 flex items-center justify-center">
                            <FiPlus size={18} />
                        </motion.button>
                    </form>
                </motion.div>

                {/* SEARCH */}
                <div className="flex items-center gap-2">
                    <FiSearch className="text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="ابحث عن نوع رحلة..."
                        className="input flex-1 py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm"
                    />
                </div>

                {/* TABLE */}
                <div className="card p-0 overflow-hidden">
                    <table className="table text-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>نوع الرحلة</th>
                                <th className="text-center w-24">العمليات</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {tripTypes.data.length ? (
                                    tripTypes.data.map(tripType => (
                                        <motion.tr key={tripType.id} variants={rowMotion} initial="hidden" animate="visible" exit="exit" whileHover={{ scale: 1.003 }} transition={{ duration: 0.15 }}>
                                            <td>{tripType.id}</td>
                                            <td className="flex items-center gap-2 font-medium"><FiMapPin className="text-[var(--app-primary)]" /> {tripType.name}</td>
                                            <td className="text-center">
                                                <div className="flex justify-center gap-3">
                                                    <motion.button whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }} onClick={() => openEdit(tripType)} className="text-[var(--app-primary)]"><FiEdit2 size={20} /></motion.button>
                                                    <motion.button whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }} onClick={() => openDelete(tripType.id)} className="text-red-600"><FiTrash2 size={20} /></motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="3" className="text-center py-4 text-gray-500">لا توجد أنواع رحلات مسجلة</td></tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                {tripTypes.links && (
                    <div className="flex justify-center gap-1 flex-wrap text-sm">
                        {tripTypes.links.map((link, idx) => {
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


                {/* EDIT MODAL */}
                <Modal show={editModal} title="تعديل نوع الرحلة" onClose={() => setEditModal(false)}>
                    <motion.form initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 180, damping: 20 }} onSubmit={update} className="space-y-2">
                        <input
                            type="text"
                            value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)}
                            placeholder="اسم نوع الرحلة"
                            className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm ${frontendErrors.name ? 'border-red-500' : ''}`}
                        />
                        <InputError message={frontendErrors.name} className="mt-1 text-sm" />
                        <button className="btn-primary w-full py-2 text-sm">حفظ</button>
                    </motion.form>
                </Modal>

                {/* DELETE MODAL */}
                <Modal show={deleteModal} title="تأكيد الحذف" onClose={() => setDeleteModal(false)}>
                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 180, damping: 20 }} className="text-center space-y-2">
                        <FiAlertTriangle className="text-3xl mx-auto text-red-500" />
                        <p className="text-gray-600 text-sm">هل أنت متأكد من حذف هذه نوع الرحلة؟</p>
                        <div className="flex gap-2">
                            <button onClick={() => setDeleteModal(false)} className="btn-secondary flex-1 py-1 text-sm">إلغاء</button>
                            <button onClick={destroy} className="btn-danger flex-1 py-1 text-sm">تأكيد</button>
                        </div>
                    </motion.div>
                </Modal>

            </motion.div>
        </AuthenticatedLayout>
    );
}
