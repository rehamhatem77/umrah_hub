import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiUser, FiMail, FiPhone, FiMessageSquare,
    FiEye, FiTrash2, FiSearch, FiChevronLeft, FiAlertTriangle
} from 'react-icons/fi';
import Modal from '@/Components/Modal';
import toast from 'react-hot-toast';
import { FaRegCommentDots } from 'react-icons/fa';

export default function Index({ messages, filters }) {
    const [deleteModal, setDeleteModal] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [search, setSearch] = useState(filters.search || '');
    const [debounceTimer, setDebounceTimer] = useState(null);
    useEffect(() => {
        if (debounceTimer) clearTimeout(debounceTimer);
        const timer = setTimeout(() => {
            router.get(route('contact-messages.index'), { search }, { preserveState: true, replace: true });
        }, 500);
        setDebounceTimer(timer);
    }, [search]);

    const openDelete = (message) => {
        setSelectedMessage(message);
        setDeleteModal(true);
    };

    const destroy = () => {
        router.delete(route('contact-messages.destroy', selectedMessage.id), {
            onSuccess: () => {
                setDeleteModal(false);
            },
            onError: () => toast.error('حدث خطأ أثناء حذف الرسالة'),
        });
    };

    const viewMessage = (message) => {
        setSelectedMessage(message);
        setViewModal(true);
    };
    const toArabicNumbers = (num) =>
        num.toString().replace(/\d/g, (d) => ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'][d]);

    return (
        <AuthenticatedLayout>
            <div className="px-3 sm:px-6 space-y-6">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <button onClick={() => router.get(route('dashboard'))} className="hover:underline">لوحة التحكم</button>
                    <FiChevronLeft />
                    <span className="text-[var(--app-primary)] font-medium">رسائل العملاء</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaRegCommentDots className="text-2xl text-[var(--app-primary)]" />
                    <h1 className="text-2xl font-bold text-gray-900">إدارة رسائل العملاء</h1>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1 sm:flex-auto">
                        <FiSearch className="text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="ابحث باسم المرسل أو البريد"
                            className="input py-2 px-3 border rounded-lg focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] flex-1"
                        />
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence>
                        {messages.data.length ? messages.data.map((msg) => (
                            <motion.div
                                key={msg.id}
                                className="card p-4 space-y-3"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-[var(--app-primary)] flex items-center justify-center text-white">
                                        <FiUser size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{msg.name}</p>
                                        <p className="text-sm text-gray-500">{msg.email}</p>
                                        {msg.phone && <p className="text-sm text-gray-400">{msg.phone}</p>}
                                    </div>
                                </div>

                                {msg.subject && <p className="text-sm font-medium text-gray-700">الموضوع: {msg.subject}</p>}
                                <p className="text-sm text-gray-600 line-clamp-2">{msg.message}</p>

                                <div className="flex items-center justify-between pt-2 border-t">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => viewMessage(msg)}
                                            className="p-2 rounded-full text-[var(--app-primary)] hover:bg-green-100"
                                            title="عرض الرسالة"
                                        >
                                            <FiEye size={16} />
                                        </button>
                                        <button
                                            onClick={() => openDelete(msg)}
                                            className="p-2 rounded-full text-red-600 hover:bg-red-50"
                                            title="حذف الرسالة"
                                        >
                                            <FiTrash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="col-span-full text-center text-gray-500 py-10">لا توجد رسائل</div>
                        )}
                    </AnimatePresence>
                </div>

                {messages.links && (
                    <div className="flex justify-center gap-1 flex-wrap text-sm">
                        {messages.links.map((link, idx) => {
                            let label = link.label.replace(/&laquo;|&raquo;/g, '');
                            if (link.label.includes('Previous')) label = '«';
                            else if (link.label.includes('Next')) label = '»';
                            else label = toArabicNumbers(label);

                            return (
                                <button
                                    key={idx}
                                    onClick={() => link.url && router.get(link.url, {}, { preserveState: true, replace: true })}
                                    className={`px-2 py-1 rounded border ${link.active ? 'bg-[var(--app-primary)] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                                    disabled={!link.url}
                                    dangerouslySetInnerHTML={{ __html: label }}
                                />
                            );
                        })}
                    </div>
                )}
            </div>

            <Modal show={viewModal} onClose={() => setViewModal(false)} title="تفاصيل الرسالة" className="max-w-4xl w-full">
                {selectedMessage && (
                    <div className="grid gap-4 sm:grid-cols-2 text-sm">
                        <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50">
                            <FiUser className="text-[var(--app-primary)] w-6 h-6" />
                            <div>
                                <div className="text-gray-500 text-xs">الاسم</div>
                                <div className="font-medium text-gray-800">{selectedMessage.name}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50">
                            <FiMail className="text-[var(--app-primary)] w-6 h-6" />
                            <div>
                                <div className="text-gray-500 text-xs">البريد الإلكتروني</div>
                                <div className="font-medium text-gray-800">{selectedMessage.email}</div>
                            </div>
                        </div>

                        {selectedMessage.phone && (
                            <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50">
                                <FiPhone className="text-[var(--app-primary)] w-6 h-6" />
                                <div>
                                    <div className="text-gray-500 text-xs">رقم الهاتف</div>
                                    <div className="font-medium text-gray-800">{selectedMessage.phone}</div>
                                </div>
                            </div>
                        )}

                        {selectedMessage.subject && (
                            <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 col-span-full">
                                <FiMessageSquare className="text-purple-500 w-5 h-5" />
                                <div>
                                    <div className="text-gray-500 text-xs">الموضوع</div>
                                    <div className="font-medium text-gray-800">{selectedMessage.subject}</div>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 col-span-full">
                            <FiMessageSquare className="text-purple-500 w-5 h-5" />
                            <div>
                                <div className="text-gray-500 text-xs">الرسالة</div>
                                <div className="font-medium text-gray-800">{selectedMessage.message}</div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal show={deleteModal} title="تأكيد الحذف" onClose={() => setDeleteModal(false)}>
                <div className="text-center space-y-3">
                    <FiAlertTriangle className="text-3xl mx-auto text-red-500" />
                    <p>هل أنت متأكد من حذف هذه الرسالة؟</p>
                    <div className="flex gap-2">
                        <button onClick={() => setDeleteModal(false)} className="btn-secondary flex-1">إلغاء</button>
                        <button onClick={destroy} className="btn-danger flex-1">حذف</button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
