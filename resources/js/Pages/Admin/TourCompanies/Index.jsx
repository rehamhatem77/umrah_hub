import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiBriefcase,
    FiAlertTriangle,
    FiChevronLeft,
    FiSearch,
    FiMapPin,
    FiPhone,
    FiEye,
    FiHash,
    FiMail
} from 'react-icons/fi';
import { FaMapLocationDot, FaRegBuilding, FaWhatsapp } from 'react-icons/fa6';
import AddCompanyModal from './PageComponents/AddCompanyModal';
import EditCompanyModal from './PageComponents/EditCompanyModal';
import InfoItem from '@/Components/InfoItem';

const pageMotion = { hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } };
const rowMotion = { hidden: { opacity: 0, y: 3 }, visible: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -3 } };

export default function Index({ companies, governorates, filters }) {

    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [showModal, setShowModal] = useState(false);


    const [selectedCompany, setSelectedCompany] = useState(null);
    const [search, setSearch] = useState(filters.search || '');


    const form = useForm({
        id: null,
        name: '',
        phone: '',
        whatsapp: '',
        governorate_ids: [],
        email: '',
        company_code: '',
    });

    const governorateOptions = governorates.map(g => ({
        value: g.id,
        label: g.name,
    }));

    const selectStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: '40px',
            borderRadius: '10px',
            borderColor: form.errors.governorate_id
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

    const handleSearch = (e) => {
        setSearch(e.target.value);
        router.get(route('tour-companies.index'), { search: e.target.value }, { preserveState: true, replace: true });
    };

    const openAdd = () => {
        form.reset();
        form.clearErrors();
        setAddModal(true);
    };

    const submit = (e) => {
        e.preventDefault();

        form.post(route('tour-companies.store'), {
            onSuccess: () => {
                setAddModal(false);
                form.reset();
            },
        });
    };

    // const openShow = async (id) => {
    //     const response = await fetch(route('tour-companies.show', id));
    //     const data = await response.json();
    //     setSelectedCompany(data);
    //     setShowModal(true);
    // };
    const openShow = (company) => {
        setSelectedCompany(company);
        setShowModal(true);
    };


    const openEdit = (company) => {
        form.clearErrors();
        setSelectedCompany(company);

        form.setData({
            id: company.id,
            name: company.name ?? '',
            phone: company.phone ?? '',
            whatsapp: company.whatsapp ?? '',
            governorate_ids: company.governorate_ids || [],
            email: company.email || '',
            company_code: company.company_code || '',
        });

        setEditModal(true);
    };

    const update = (e) => {
        e.preventDefault();

        form.put(route('tour-companies.update', form.data.id), {
            onSuccess: () => {
                // toast.success('تم تحديث الشركة بنجاح');
                setEditModal(false);
                form.reset();
            },
            onError: () => {
                toast.error('حدث خطأ أثناء تحديث الشركة. يرجى المحاولة مرة أخرى.');
            }
        });
    };


    const openDelete = (company) => {

        setSelectedCompany(company);
        setDeleteModal(true);
    };

    const destroy = () => {
        //  if (selectedCompany.offers_count > 0) {
        //     toast.error('لا يمكن حذف شركة مرتبطة بعروض');
        //     return;
        // }
        router.delete(route('tour-companies.destroy', selectedCompany.id), {
            onSuccess: () => {
                // toast.success('تم حذف الشركة بنجاح');
                setDeleteModal(false);
            },
            onError: () => {
                toast.error('حدث خطأ أثناء حذف الشركة. يرجى المحاولة مرة أخرى.');
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <motion.div variants={pageMotion} initial="hidden" animate="visible" className="px-3 sm:px-6 space-y-6">


                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <button onClick={() => router.get(route('dashboard'))} className="hover:underline">لوحة التحكم</button>
                    <FiChevronLeft />

                    <span className="text-[var(--app-primary)] font-medium"> شركات السياحة</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <FaRegBuilding className="text-2xl text-[var(--app-primary)]" />
                    <h1 className="text-xl font-bold">إدارة شركات السياحة</h1>
                </div>

                <div className="flex space-x-2 justify-between flex-col sm:flex-row gap-3">
                    <button onClick={openAdd} className="btn-primary w-fit flex items-center gap-2">
                        <FiPlus /> إضافة شركة
                    </button>

                    <button
                        onClick={() => router.get(route('tour-companies.trash'))}
                        className="w-fit flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                    >
                        <FiTrash2 /> سلة المحذوفات
                    </button>
                </div>


                {/* SEARCH */}
                <div className="flex items-center gap-2">
                    <FiSearch className="text-gray-400" />
                    <input
                        value={search}
                        onChange={handleSearch}
                        placeholder="ابحث باسم الشركة"
                        className="input flex-1 py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm"
                    />
                </div>

                {/* TABLE */}
                <div className="card p-0 overflow-hidden">
                    <table className="w-full text-sm border-collapse">
                        <thead className="bg-gray-50">
                            <tr className="text-gray-600">
                                <th className="px-4 py-3 text-right">الكود</th>
                                <th className="px-4 py-3 text-right">الشركة</th>
                                <th className="px-4 py-3 text-right">المحافظة</th>
                                <th className="px-4 py-3 text-right">التواصل</th>
                                <th className="px-4 py-3 text-center w-28">العمليات</th>
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
                                        <td className="px-4 py-3 text-gray-500">{company.company_code}</td>
                                        <td className="px-4 py-3 font-medium flex items-center gap-2">
                                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--app-primary)]/10 text-[var(--app-primary)]">
                                                <FaRegBuilding size={16} />
                                            </span>
                                            {company.name}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700">
                                                <FiMapPin />
                                                {company.governorate_ids.map(id => {
                                                    const gov = governorates.find(g => g.id === id);
                                                    return gov ? gov.name : '';
                                                }).join(' , ')}

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
                                            {!company.phone && !company.whatsapp && (<span className="text-gray-400">لا توجد بيانات تواصل</span>)}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex justify-center gap-3">
                                                <button
                                                    onClick={() => openShow(company)}
                                                    className="p-1.5 rounded-full text-[var(--app-primary)] hover:bg-[var(--app-primary)]/10 transition"
                                                >
                                                    <FiEye size={18} />
                                                </button>
                                                <button
                                                    onClick={() => openEdit(company)}
                                                    className="p-1.5 rounded-full text-[var(--app-primary)] hover:bg-[var(--app-primary)]/10 transition"
                                                >
                                                    <FiEdit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => openDelete(company)}
                                                    className="p-1.5 rounded-full text-red-600 hover:bg-red-50 transition"
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="py-6 text-center text-gray-500">لا توجد شركات مسجلة</td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
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

                {/* ADD MODAL */}
                <AddCompanyModal
                    show={addModal}
                    onClose={() => setAddModal(false)}
                    form={form}
                    governorateOptions={governorateOptions}
                    selectStyles={selectStyles}
                    onSubmit={submit}
                />


                {/* EDIT MODAL */}

                <EditCompanyModal
                    show={editModal}
                    onClose={() => setEditModal(false)}
                    form={form}
                    governorateOptions={governorateOptions}
                    selectStyles={selectStyles}
                    onSubmit={update}
                />

                {/* DELETE MODAL */}
                <Modal show={deleteModal} title="تأكيد الحذف" onClose={() => setDeleteModal(false)}>
                    <div className="text-center space-y-3">
                        <FiAlertTriangle className="text-3xl mx-auto text-red-500" />
                        <p>هل أنت متأكد من حذف هذه الشركة؟</p>
                        <div className="flex gap-2">
                            <button onClick={() => setDeleteModal(false)} className="btn-secondary flex-1">إلغاء</button>
                            <button onClick={destroy} className="btn-danger flex-1">حذف</button>
                        </div>
                    </div>
                </Modal>

                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    title="تفاصيل الشركة"
                    className="max-w-4xl w-full"
                    contentClassName="max-h-[80vh] overflow-y-auto p-6 space-y-6"
                >
                    {selectedCompany && (
                        <div className="grid gap-4 sm:grid-cols-2 text-sm">

                            <InfoItem
                                icon={<FiHash />}
                                label="كود الشركة"
                                value={selectedCompany.company_code}
                                iconColor="text-indigo-500"
                            />

                            <InfoItem
                                icon={<FaRegBuilding />}
                                label="اسم الشركة"
                                value={selectedCompany.name}
                                iconColor="text-[var(--app-primary)]"
                            />

                            {!governorates && (
                                <InfoItem
                                    icon={<FiAlertTriangle />}
                                    label="المحافظات"
                                    value="لا توجد بيانات"
                                    iconColor="text-red-500"
                                />

                            )}
                            <InfoItem
                                icon={<FaMapLocationDot />}
                                label="المحافظات"
                                value={governorates?.map(g => g.name).join('، ')}
                                iconColor="text-green-500"
                            />

                            {!selectedCompany.email && (
                                <InfoItem
                                    icon={<FiAlertTriangle />}
                                    label="البريد الإلكتروني"
                                    value="لا توجد بيانات"
                                    iconColor="text-red-500"
                                />
                            )}
                            <InfoItem
                                icon={<FiMail />}
                                label="البريد الإلكتروني"
                                value={selectedCompany.email}
                                iconColor="text-blue-500"
                            />


                            <InfoItem
                                icon={<FiPhone />}
                                label="رقم الهاتف"
                                value={selectedCompany.phone}
                                iconColor="text-purple-500"
                                full
                            />

                            {!selectedCompany.whatsapp && (
                                <InfoItem
                                    icon={<FiAlertTriangle />}
                                    label="رقم الواتساب"
                                    value="لا توجد بيانات"
                                    iconColor="text-red-500"
                                />
                            )}
                            <InfoItem
                                icon={<FaWhatsapp />}
                                label="رقم الواتساب"
                                value={selectedCompany.whatsapp}
                                iconColor="text-green-600"
                                full
                            />

                        </div>
                    )}
                </Modal>


            </motion.div>
        </AuthenticatedLayout>
    );
}
