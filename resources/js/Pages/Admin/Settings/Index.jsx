import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiAlertTriangle, FiSettings } from 'react-icons/fi';

export default function Users({ users, filters }) {
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [search, setSearch] = useState(filters.search || '');
    const form = useForm({ name: '', email: '', password: '', password_confirmation: '' });
    const [frontendErrors, setFrontendErrors] = useState({});

    const submitAdd = (e) => {
        e.preventDefault();
        if (!form.data.name || !form.data.email || !form.data.password) {
            setFrontendErrors({ general: 'جميع الحقول مطلوبة' });
            return;
        }

        form.post(route('users.store'), {
            onSuccess: () => {
                // toast.success('تمت إضافة المستخدم بنجاح');
                form.reset();
                setAddModal(false);
                setFrontendErrors({});
            },
            onError: () => toast.error('حدث خطأ أثناء الإضافة'),
        });
    };


    const destroy = (id) => {
        router.delete(route('users.destroy', id), {
            // onSuccess: () => toast.success('تم حذف المستخدم'),
            onError: () => toast.error('حدث خطأ أثناء الحذف'),
        });
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        router.get(route('users.index'), { search: e.target.value }, { preserveState: true, replace: true });
    };

    return (
        <AuthenticatedLayout>
            <div className="px-3 sm:px-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <FiSettings className="text-2xl text-[var(--app-primary)]" />
                        <h1 className="text-lg sm:text-xl font-bold">إعدادات إدارة المستخدمين </h1>

                    </div>
                    <button className="btn-primary flex items-center gap-2" onClick={() => setAddModal(true)}>
                        <FiPlus /> إضافة مشرف
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <FiSearch className="text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="ابحث عن المستخدم..."
                        className="input flex-1 py-2.5 px-3 text-sm rounded-lg focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm"
                    />
                </div>

                <div className="card p-0 overflow-hidden">
                    <table className="table text-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>الاسم</th>
                                <th>البريد الإلكتروني</th>
                                <th>الدور</th>
                                <th className="text-center w-24">الخيارات</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {users.data.length ? users.data.map(user => (
                                    <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td className="text-center flex justify-center gap-2">
                                            {/* <button onClick={() => { setSelectedUser(user); setEditModal(true); }} className="text-[var(--app-primary)]"><FiEdit2 /></button> */}
                                            <button onClick={() => destroy(user.id)} className="text-red-600"><FiTrash2 /></button>
                                        </td>
                                    </motion.tr>
                                )) : (
                                    <tr><td colSpan="5" className="text-center py-4 text-gray-500">لا يوجد مستخدمين</td></tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>


                {addModal && (
                    <div className="card p-4 mt-4 border shadow rounded">
                        <h2 className="font-semibold mb-2">إضافة مشرف</h2>
                        <form onSubmit={submitAdd} className="space-y-2">
                            <input type="text" placeholder="الاسم" value={form.data.name} onChange={e => form.setData('name', e.target.value)} className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm ${frontendErrors.name ? 'border-red-500' : ''}`}
                            />
                            <InputError message={frontendErrors.general} />
                            <input type="email" placeholder="البريد الإلكتروني" value={form.data.email} onChange={e => form.setData('email', e.target.value)} className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm ${frontendErrors.name ? 'border-red-500' : ''}`}
                            />
                            <input type="password" placeholder="كلمة المرور" value={form.data.password} onChange={e => form.setData('password', e.target.value)} className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm ${frontendErrors.name ? 'border-red-500' : ''}`}
                            />
                            <input type="password" placeholder="تأكيد كلمة المرور" value={form.data.password_confirmation} onChange={e => form.setData('password_confirmation', e.target.value)} className={`input w-full py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm ${frontendErrors.name ? 'border-red-500' : ''}`}
                            />
                            <div className="flex gap-2">
                                <button type="submit" className="btn-primary flex-1">إضافة</button>
                                <button type="button" className="btn-secondary flex-1" onClick={() => setAddModal(false)}>إلغاء</button>
                            </div>
                        </form>
                    </div>
                )}


            </div>
        </AuthenticatedLayout>
    );
}
