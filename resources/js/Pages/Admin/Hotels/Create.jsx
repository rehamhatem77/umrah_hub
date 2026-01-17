import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, router, usePage } from '@inertiajs/react';
import Select from 'react-select';
import InputError from '@/Components/InputError';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiChevronLeft, FiMapPin, FiSave } from 'react-icons/fi';
import { FaStar, FaHotel } from 'react-icons/fa6';
import { useEffect, useState } from 'react';

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
        name: '',
        city: null,
        distance_from_kaaba: '',
        distance_from_nabawi: '',
        stars: null,
        address_location: '',
        features: '',
        is_active: true,
    });
    const flash = usePage().props.flash;

    const [frontendErrors, setFrontendErrors] = useState({});

    const cityOptions = [
        { value: 'مكة', label: 'مكة المكرمة' },
        { value: 'المدينة المنورة', label: 'المدينة المنورة' },
    ];

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

    const handleCityChange = (option) => {
        const city = option ? option.value : null;
        form.setData({
            ...form.data,
            city,
            distance_from_kaaba: city === 'مكة' ? form.data.distance_from_kaaba : '',
            distance_from_nabawi: city === 'المدينة المنورة' ? form.data.distance_from_nabawi : '',
        });
        setFrontendErrors(prev => ({ ...prev, city: null }));
    };

    const validate = () => {
        const errors = {};

        if (!form.data.name.trim()) errors.name = 'الاسم مطلوب';
        if (!form.data.city) errors.city = 'اختر المدينة';
        if (form.data.city === 'مكة' && !form.data.distance_from_kaaba) errors.distance_from_kaaba = 'المسافة من الكعبة مطلوبة';
        if (form.data.city === 'المدينة المنورة' && !form.data.distance_from_nabawi) errors.distance_from_nabawi = 'المسافة من النبوي مطلوبة';
        if (!form.data.stars) errors.stars = 'اختر تقييم الفندق';
        if (!form.data.address_location.trim()) errors.address_location = 'العنوان مطلوب';

        setFrontendErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const submit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        const submitData = {
            ...form.data,
            distance_from_kaaba: form.data.distance_from_kaaba ? Number(form.data.distance_from_kaaba) : null,
            distance_from_nabawi: form.data.distance_from_nabawi ? Number(form.data.distance_from_nabawi) : null,
        };

        form.post(route('hotels.store'), {
            data: submitData,
            onSuccess: () => {
                toast.success('تم إضافة الفندق بنجاح');
                form.reset();
                router.get(route('hotels.create'));
            },
            onError: (e) => {
                toast.error(e.message || 'حدثت أخطاء في الإدخال. يرجى التحقق والمحاولة مرة أخرى.');

            },
        });
    };
    useEffect(() => {
        if (flash?.error) {
            toast.error(flash.error);
        }
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);


    return (
        <AuthenticatedLayout>
            <motion.div variants={pageMotion} initial="hidden" animate="visible" className="h-[calc(100vh-80px)] overflow-y-auto px-3 sm:px-6 space-y-6">

                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <button onClick={() => router.get(route('dashboard'))} className="hover:underline">لوحة التحكم</button>
                    <FiChevronLeft />
                    <button onClick={() => router.get(route('hotels.index'))} className="hover:underline">الفنادق</button>
                    <FiChevronLeft />
                    <span className="text-[var(--app-primary)] font-medium">إضافة فندق</span>
                </div>

                <div className="flex items-center gap-3">
                    <FaHotel className="text-2xl text-[var(--app-primary)]" />
                    <h1 className="text-xl font-bold">إضافة فندق جديد</h1>
                </div>
                {flash?.error && (
                    <div className="mb-4 rounded-lg bg-red-100 border border-red-300 px-4 py-3 text-red-700">
                        {flash.error}
                    </div>
                )}

                <form onSubmit={submit} className="card p-6 space-y-6 w-full">

                    <div>
                        <label className="label">اسم الفندق</label>
                        <input

                            className={`input w-full ${frontendErrors.name ? 'border-red-500  focus:border-red-500 focus:ring-red-500' : 'focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] '}`}
                            placeholder="ادخل هنا اسم الفندق"
                            value={form.data.name}
                            onChange={e => {
                                form.setData('name', e.target.value);
                                setFrontendErrors(prev => ({ ...prev, name: null }));
                            }}
                        />
                        <InputError message={frontendErrors.name || form.errors.name} />
                    </div>

                    <div>
                        <label className="label flex items-center gap-1">
                            <FiMapPin /> المدينة
                        </label>
                        <Select
                            options={cityOptions}
                            value={cityOptions.find(c => c.value === form.data.city)}
                            onChange={handleCityChange}
                            styles={selectStyles}
                            placeholder="اختر المدينة"
                            isClearable
                            isSearchable={false}
                        />
                        <InputError message={frontendErrors.city || form.errors.city} />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="label">المسافة من الكعبة (متر)</label>
                            <input
                                type="number"
                                min={0}
                                placeholder="متر"
                                readOnly={form.data.city !== 'مكة'}
                                className={`input w-full ${frontendErrors.distance_from_kaaba ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] '} ${form.data.city !== 'مكة' ? 'bg-gray-100 opacity-70 cursor-not-allowed' : ''}`}
                                value={form.data.distance_from_kaaba}
                                onChange={e => {
                                    form.setData('distance_from_kaaba', e.target.value);
                                    setFrontendErrors(prev => ({ ...prev, distance_from_kaaba: null }));
                                }}
                            />
                            <InputError message={frontendErrors.distance_from_kaaba || form.errors.distance_from_kaaba} />
                        </div>
                        <div>
                            <label className="label">المسافة من النبوي (متر)</label>
                            <input
                                type="number"
                                min={0}
                                placeholder="متر"
                                readOnly={form.data.city !== 'المدينة المنورة'}
                                className={`input w-full ${frontendErrors.distance_from_nabawi ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] '} ${form.data.city !== 'المدينة المنورة' ? 'bg-gray-100 opacity-70 cursor-not-allowed' : ''}`}
                                value={form.data.distance_from_nabawi}
                                onChange={e => {
                                    form.setData('distance_from_nabawi', e.target.value);
                                    setFrontendErrors(prev => ({ ...prev, distance_from_nabawi: null }));
                                }}
                            />

                            <InputError message={frontendErrors.distance_from_nabawi || form.errors.distance_from_nabawi} />
                        </div>
                    </div>

                    <div>
                        <label className="label flex items-center gap-1">
                            <FaStar /> التقييم
                        </label>
                        <StarRating value={form.data.stars} onChange={val => {
                            form.setData('stars', val);
                            setFrontendErrors(prev => ({ ...prev, stars: null }));
                        }} />
                        <InputError message={frontendErrors.stars || form.errors.stars} />
                    </div>

                    <div>
                        <label className="label">العنوان</label>
                        <input
                            className={`input w-full ${frontendErrors.address_location ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] '}`}
                            value={form.data.address_location}
                            placeholder="العنوان الكامل"
                            onChange={e => {
                                form.setData('address_location', e.target.value);
                                setFrontendErrors(prev => ({ ...prev, address_location: null }));
                            }}
                        />
                        <InputError message={frontendErrors.address_location || form.errors.address_location} />
                    </div>

                    <div>
                        <label className="label">المميزات</label>
                        <textarea
                            rows={3}
                            className="input w-full focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] "
                            value={form.data.features}
                            placeholder="مثل: واي فاي، مسبح، صالة رياضة"
                            onChange={e => form.setData('features', e.target.value)}
                        />
                        <InputError message={form.errors.features} />
                    </div>

                    <div>
                        <label className="label">حالة الفندق</label>
                        <ActiveSwitch checked={form.data.is_active} onChange={val => form.setData('is_active', val)} />
                        <InputError message={form.errors.is_active} />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" onClick={() => router.get(route('hotels.index'))} className="btn-secondary">
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
