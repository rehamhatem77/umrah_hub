import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, router } from '@inertiajs/react';
import React from 'react';

import { useState } from 'react';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiAlertTriangle,
    FiChevronLeft,
    FiSearch,
    FiStar
} from 'react-icons/fi';
import * as FiIcons from 'react-icons/fi';
import * as FaIcons from 'react-icons/fa';
import IconPicker from '@/Components/IconPicker';
import { LuPackagePlus } from 'react-icons/lu';

const pageMotion = { hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } };
const rowMotion = { hidden: { opacity: 0, y: 2 }, visible: { opacity: 1, y: 0 }, exit: { opacity: 0 } };

export default function Index({ services, filters }) {
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState(filters.search || '');
    const [iconModal, setIconModal] = useState(false);
    const[frontendErrors, setFrontendErrors]=useState({});

    const form = useForm({
        name: '',
        description:'',
        icon: '',
        id: null,
    });

    const getIconComponent = (iconName) =>
        FiIcons[iconName] || FaIcons[iconName] || null;

    const selectIcon = ({ icon }) => {
        form.setData('icon', icon);
        setIconModal(false);
    };

    const selectedServices = services.data.map(f => f.name);
    
    const submit = (e) => {
         e.preventDefault();
         if (!form.data.name) { setFrontendErrors({ name: 'اسم الخدمة مطلوب' }); return; }
          if (!form.data.description) { setFrontendErrors({ description: 'وصف الخدمة مطلوب' }); return; }
           if (!form.data.icon) { setFrontendErrors({ icon: 'أيقونة الخدمة مطلوب' }); return; }
        if (selectedServices.includes(form.data.name)) { toast.error('هذه الخدمة موجودة مسبقًا'); return; }

       
        form.post(route('services.store'), {
            onSuccess: () => {
                // toast.success('تمت إضافة الخدمة');
                form.reset();
            },
            onError: () => toast.error('فشل إضافة الخدمة'),
        });
    };


    const openEdit = (service) => {
        form.setData({
            id: service.id,
            name: service.name,
            description: service.description,

            icon: service.icon || '',
        });
        setEditModal(true);
    };

    const update = (e) => {
        e.preventDefault();
        form.put(route('services.update', form.data.id), {
            onSuccess: () => {
                // toast.success('تم تحديث الخدمة');
                setEditModal(false);
                form.reset();
            },
            onError: () => toast.error('فشل تحديث الخدمة'),
        });
    };


    const openDelete = (service) => {
        setSelected(service);
        setDeleteModal(true);
    };

    const destroy = () => {
        router.delete(route('services.destroy', selected.id), {
            onSuccess: () => {
                // toast.success('تم حذف الخدمة');
                setDeleteModal(false);
            },
            onError: () => toast.error('فشل حذف الخدمة'),
        });
    };


    const handleSearch = (e) => {
        setSearch(e.target.value);
        router.get(route('services.index'), { search: e.target.value }, {
            preserveState: true,
            replace: true
        });
    };

    return (
        <AuthenticatedLayout>
            <motion.div variants={pageMotion} initial="hidden" animate="visible" className="px-3 sm:px-6 space-y-6">

                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <span>لوحة التحكم</span>
                    <FiChevronLeft />
                    <span className="text-[var(--app-primary)] font-medium">الخدمات</span>
                </div>

                <div className="flex items-center gap-2">
                    <LuPackagePlus className="text-2xl text-[var(--app-primary)]" />
                    <h1 className="text-xl font-bold">إدارة الخدمات</h1>
                </div>

                <div className="card p-4">
                    <h2 className="font-semibold mb-2 flex items-center gap-2">
                        <FiPlus /> إضافة خدمة
                    </h2>
                    <form onSubmit={submit} className=" gap-2 items-center">
                        <input
                            className="input flex-1 py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm"
                            placeholder="اسم الخدمة"
                            value={form.data.name}
                            onChange={e => form.setData('name', e.target.value)}
                        />
                        <InputError message={frontendErrors.name} />
                         <input
                            className="input flex-1 py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm"
                            placeholder="وصف الخدمة"
                            value={form.data.description}
                            onChange={e => form.setData('description', e.target.value)}
                        />
                        <InputError message={frontendErrors.description} />

                        <div className='flex gap-2 items-center mt-3'>

                        <button
                            type="button"
                            onClick={() => setIconModal(true)}
                            className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:border-[var(--app-primary)] transition min-w-[300px]"
                        >
                            {form.data.icon
                                ? React.createElement(getIconComponent(form.data.icon), { size: 18 })
                                : <FaIcons.FaHandsHelping size={18} />}
                            <span className="text-sm text-gray-700">
                                {form.data.icon ? 'تغيير الأيقونة' : 'اختر أيقونة'}
                            </span>
                        </button>

                        <button className="btn-primary px-4" title='أضف الخدمة'>
                            <div className='flex gap-2 items-center'>

                            <FiPlus />
                            اضافة الخدمة
                            </div>
                        </button>
                        </div>
                        <InputError message={frontendErrors.icon} />
                    </form>

                    {form.data.icon && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                            {React.createElement(getIconComponent(form.data.icon), { size: 18 })}
                            <span>{form.data.icon}</span>
                        </div>
                    )}

                    <InputError message={form.errors.name} />
                </div>

                <div className="flex items-center gap-2 ">
                    <FiSearch className="text-gray-400" />
                    <input
                        value={search}
                        onChange={handleSearch}
                        placeholder="ابحث عن خدمة"
                        className="input flex-1 py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm"

                    />
                </div>

                <div className="card p-0 overflow-hidden">
                    <table className="table text-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>الاسم</th>
                                <th>الأيقونة</th>
                                <th className="text-center w-24">العمليات</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {services.data.length ? (
                                    services.data.map(service => (
                                        <motion.tr key={service.id} variants={rowMotion} initial="hidden" animate="visible" exit="exit">
                                            <td>{service.id}</td>
                                            <td className="font-medium">{service.name}</td>
                                            <td>
                                                {service.icon && getIconComponent(service.icon)
                                                    ? React.createElement(getIconComponent(service.icon), { size: 18 })
                                                    : <span className="text-gray-400">—</span>}
                                            </td>
                                            <td className="text-center">
                                                <div className="flex justify-center gap-3">
                                                    <button onClick={() => openEdit(service)} className="text-[var(--app-primary)]">
                                                        <FiEdit2 size={18} />
                                                    </button>
                                                    <button onClick={() => openDelete(service)} className="text-red-600">
                                                        <FiTrash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-4 text-gray-500">
                                            لا توجد خدمات
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>


                {services.links && (
                    <div className="flex justify-center gap-1 flex-wrap text-sm">
                        {services.links.map((link, idx) => {
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


             
                <Modal show={editModal} title="تعديل الخدمة" onClose={() => setEditModal(false)}>
                    <form onSubmit={update} className="space-y-2">
                        <input
                        className="input flex-1 py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm"
                            value={form.data.name}
                            onChange={e => form.setData('name', e.target.value)}
                        />
                        <input
                        className="input flex-1 py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm"
                            value={form.data.description}
                            onChange={e => form.setData('description', e.target.value)}
                        />

                        <button
                            type="button"
                            onClick={() => setIconModal(true)}
                            className="flex items-center gap-2 border rounded-lg px-3 py-2 w-full hover:border-[var(--app-primary)] transition"
                        >
                            {form.data.icon
                                ? React.createElement(getIconComponent(form.data.icon), { size: 18, className: 'text-[var(--app-primary)]' })
                                : <FiEdit2 size={16} />}
                            <span className="text-sm text-gray-700">
                                {form.data.icon ? form.data.icon : 'اختر أيقونة'}
                            </span>
                        </button>



                        <button className="btn-primary w-full">حفظ</button>
                    </form>
                </Modal>

          
                <Modal show={deleteModal} title="تأكيد الحذف" onClose={() => setDeleteModal(false)}>
                    <div className="text-center space-y-3">
                        <FiAlertTriangle className="text-3xl mx-auto text-red-500" />
                        <p>هل أنت متأكد من حذف هذه الخدمة؟</p>
                        <div className="flex gap-2">
                            <button onClick={() => setDeleteModal(false)} className="btn-secondary flex-1">إلغاء</button>
                            <button onClick={destroy} className="btn-danger flex-1">حذف</button>
                        </div>
                    </div>
                </Modal>

            </motion.div>


            <IconPicker show={iconModal} onClose={() => setIconModal(false)} onSelect={selectIcon} />

        </AuthenticatedLayout>
    );
}
