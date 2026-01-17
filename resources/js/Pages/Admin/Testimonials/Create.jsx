import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, router } from '@inertiajs/react';
import Select from 'react-select';
import InputError from '@/Components/InputError';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiChevronLeft, FiMapPin, FiSave } from 'react-icons/fi';
import { FaStar, FaHotel } from 'react-icons/fa6';
import { useState } from 'react';

const pageMotion = { hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } };

const ActiveSwitch = ({ checked, onChange }) => (
    <label className="flex items-center gap-3 cursor-pointer select-none">
        <div className="relative">
            <input
                type="checkbox"
                checked={checked}
                onChange={e => onChange(e.target.checked)}
                className="sr-only"
            />
            <div className={`w-11 h-6 rounded-full transition ${checked ? 'bg-[var(--app-primary)]' : 'bg-gray-300'}`} />
            <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition ${checked ? 'translate-x-5' : ''}`} />
        </div>
        <span className="text-sm font-medium">{checked ? 'نشط' : 'غير نشط'}</span>
    </label>
);

const StarRating = ({ value, onChange }) => (
    <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
            <button key={star} type="button" onClick={() => onChange(star)}>
                <FaStar className={star <= value ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'} size={24} />
            </button>
        ))}
    </div>
);

export default function Create() {
    const form = useForm({
        customer_name: '',
        rating: null,
        comment: '',
        is_active: true,
    });

    const [frontendErrors, setFrontendErrors] = useState({});


    const selectStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: '44px',
            borderRadius: '10px',

            borderColor: frontendErrors.city ? '#ef4444' : state.isFocused ? 'var(--app-primary)' : '#d1d5db',
            boxShadow: state.isFocused ? '0 0 0 2px rgba(15,61,46,.12)' : 'none',
            '&:hover': { borderColor: state.isFocused ? 'var(--app-primary)' : '#9ca3af' },

        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? 'var(--app-primary)' : state.isFocused ? 'rgba(15,61,46,0.08)' : '#fff',
            color: state.isSelected ? '#fff' : '#333',
        }),
    };


    const validate = () => {
        const errors = {};

        if (!form.data.customer_name.trim()) errors.customer_name = 'اسم العميل مطلوب';
        if (!form.data.rating) errors.rating = 'تقييم العميل مطلوب';
        if (!form.data.comment.trim()) errors.comment = ' تعليق العميل مطلوب';

        setFrontendErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const submit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        const submitData = {
            customer_name: form.data.customer_name,
            rating: form.data.rating,
            comment: form.data.comment,
            is_active: form.data.is_active,
        };

        form.post(route('testimonials.store'), {
            data: submitData,
            onSuccess: () => {
                toast.success('تم إضافة تقييم العميل بنجاح');
                form.reset();
                router.get(route('testimonials.create'));
            },
            onError: () => {
                toast.error('حدثت أخطاء في الإدخال. يرجى التحقق والمحاولة مرة أخرى.');
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <motion.div variants={pageMotion} initial="hidden" animate="visible" className="h-[calc(100vh-80px)] overflow-y-auto px-3 sm:px-6 space-y-6">

                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <button onClick={() => router.get(route('dashboard'))} className="hover:underline">لوحة التحكم</button>
                    <FiChevronLeft />
                    <button onClick={() => router.get(route('testimonials.index'))} className="hover:underline">التقييمات</button>
                    <FiChevronLeft />
                    <span className="text-[var(--app-primary)] font-medium">إضافة تقييم</span>
                </div>

                <div className="flex items-center gap-3">
                    <FaHotel className="text-2xl text-[var(--app-primary)]" />
                    <h1 className="text-xl font-bold">إضافة تقييم جديد</h1>
                </div>

                <form onSubmit={submit} className="card p-6 space-y-6 w-full">

                    <div>
                        <label className="label">اسم العميل</label>
                        <input

                            className={`input w-full ${frontendErrors.Customer_name ? 'border-red-500  focus:border-red-500 focus:ring-red-500' : 'focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] '}`}
                            placeholder="ادخل هنا اسم العميل"
                            value={form.data.customer_name}
                            onChange={e => {
                                form.setData('customer_name', e.target.value);
                                setFrontendErrors(prev => ({ ...prev, customer_name: null }));
                            }}
                        />
                        <InputError message={frontendErrors.customer_name || form.errors.customer_name} />
                    </div>
                    <div>
                        <label className="label flex items-center gap-1">
                            <FaStar /> التقييم
                        </label>
                        <StarRating value={form.data.rating} onChange={val => {
                            form.setData('rating', val);
                            setFrontendErrors(prev => ({ ...prev, rating: null }));
                        }} />
                        <InputError message={frontendErrors.rating || form.errors.rating} />
                    </div>

                    <div>
                        <label className="label">تعليق العميل</label>
                        <input
                            className={`input w-full ${frontendErrors.comment ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] '}`}
                            value={form.data.comment}
                            placeholder=" ادخل هنا تعليق العميل"
                            onChange={e => {
                                form.setData('comment', e.target.value);
                                setFrontendErrors(prev => ({ ...prev, comment: null }));
                            }}
                        />
                        <InputError message={frontendErrors.comment || form.errors.comment} />
                    </div>


                    <div>
                        <label className="label"> حالة التقييم</label>
                        <ActiveSwitch checked={form.data.is_active} onChange={val => form.setData('is_active', val)} />
                        <InputError message={form.errors.is_active} />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" onClick={() => router.get(route('testimonial.index'))} className="btn-secondary">
                            إلغاء
                        </button>
                        <button type="submit" className="btn-primary flex items-center gap-2" disabled={form.processing}>
                            <FiSave /> حفظ
                        </button>
                    </div>

                </form>
            </motion.div>
        </AuthenticatedLayout>
    );
}
