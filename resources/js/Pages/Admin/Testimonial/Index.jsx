
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiSave, FiPlus } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';

const pageMotion = { hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } };

const StarRating = ({ value, onChange }) => (
    <div className="flex gap-1">
        {[1,2,3,4,5].map(s => (
            <button key={s} type="button" onClick={() => onChange(s)}>
                <FaStar className={s <= value ? 'text-yellow-400' : 'text-gray-300'} />
            </button>
        ))}
    </div>
);

export default function Index({ testimonials }) {
    const [editing, setEditing] = useState(null);

    const form = useForm({
        name: '',
        content: '',
        rate: 5,
    });

    const submit = (e) => {
        e.preventDefault();

        const options = {
            onSuccess: () => {
                toast.success(editing ? 'تم التحديث' : 'تمت الإضافة');
                setEditing(null);
                form.reset();
            },
            onError: () => toast.error('حدث خطأ'),
        };

        editing
            ? form.put(route('testimonials.update', editing.id), options)
            : form.post(route('testimonials.store'), options);
    };

    const startEdit = (t) => {
        setEditing(t);
        form.setData({
            name: t.name,
            content: t.content,
            rate: t.rate,
        });
    };

    const destroy = (id) => {
        if (!confirm('هل أنت متأكد من الحذف؟')) return;

        router.delete(route('testimonials.destroy', id), {
            onSuccess: () => toast.success('تم الحذف'),
            onError: () => toast.error('فشل الحذف'),
        });
    };

    return (
        <AuthenticatedLayout>
            <motion.div
                variants={pageMotion}
                initial="hidden"
                animate="visible"
                className="space-y-6 px-4"
            >

                {/* FORM */}
                <form onSubmit={submit} className="card p-5 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <input
                            className="input"
                            placeholder="اسم العميل"
                            value={form.data.name}
                            onChange={e => form.setData('name', e.target.value)}
                        />

                        <StarRating
                            value={form.data.rate}
                            onChange={val => form.setData('rate', val)}
                        />
                    </div>

                    <textarea
                        rows={3}
                        className="input w-full"
                        placeholder="رأي العميل"
                        value={form.data.content}
                        onChange={e => form.setData('content', e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        {editing && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditing(null);
                                    form.reset();
                                }}
                                className="btn-secondary"
                            >
                                إلغاء
                            </button>
                        )}

                        <button className="btn-primary flex items-center gap-2">
                            {editing ? <FiSave /> : <FiPlus />}
                            {editing ? 'تحديث' : 'إضافة'}
                        </button>
                    </div>
                </form>

                {/* CARDS */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {testimonials.data.map(t => (
                        <div key={t.id} className="card p-4 space-y-3 hover:shadow-md transition">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-medium">{t.name}</div>
                                    <div className="flex">
                                        {[...Array(t.rate)].map((_,i) => (
                                            <FaStar key={i} className="text-yellow-400 text-sm" />
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => startEdit(t)}
                                        className="p-2 bg-blue-500 text-white rounded-lg"
                                    >
                                        <FiEdit2 />
                                    </button>

                                    <button
                                        onClick={() => destroy(t.id)}
                                        className="p-2 bg-red-500 text-white rounded-lg"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 leading-relaxed">
                                {t.content}
                            </p>
                        </div>
                    ))}
                </div>

            </motion.div>
        </AuthenticatedLayout>
    );
}
