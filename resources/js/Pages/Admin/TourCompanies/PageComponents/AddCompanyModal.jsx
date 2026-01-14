import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function AddCompanyModal({
    show,
    onClose,
    form,
    governorateOptions,
    selectStyles,
    onSubmit,
}) {
    const [frontendErrors, setFrontendErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};
        const phoneRegex = /^\d{11}$/;

        if (!form.data.name.trim()) {
            errors.name = 'اسم الشركة مطلوب';
        }

        if (form.data.phone && !phoneRegex.test(form.data.phone)) {
            errors.phone = 'رقم الهاتف يجب أن يكون 11 رقم';
        }

        if (form.data.whatsapp && !phoneRegex.test(form.data.whatsapp)) {
            errors.whatsapp = 'رقم الواتساب يجب أن يكون 11 رقم';
        }

        if (!form.data.governorate_id) {
            errors.governorate_id = 'المحافظة مطلوبة';
        }

        setFrontendErrors(errors);

        if (Object.keys(errors).length > 0) return;

        onSubmit(e);

        toast.success('تمت إضافة الشركة بنجاح');
    };

    return (
        <Modal show={show} title="إضافة شركة سياحة" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label className="text-xs text-gray-500 mb-1 block">اسم الشركة</label>
                    <input
                        className="input flex-1 py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm"
                        value={form.data.name}
                        onChange={e => form.setData('name', e.target.value)}
                    />
                    <InputError message={frontendErrors.name || form.errors.name} />
                </div>

                <div>
                    <label className="text-xs text-gray-500 mb-1 block">رقم الهاتف</label>
                    <input
                        className="input flex-1 py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm"
                        value={form.data.phone}
                        onChange={e => form.setData('phone', e.target.value)}
                    />
                    <InputError message={frontendErrors.phone || form.errors.phone} />
                </div>

                <div>
                    <label className="text-xs text-gray-500 mb-1 block">رقم الواتساب</label>
                    <input
                        className="input flex-1 py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm"
                        value={form.data.whatsapp}
                        onChange={e => form.setData('whatsapp', e.target.value)}
                    />
                    <InputError message={frontendErrors.whatsapp || form.errors.whatsapp} />
                </div>

                <div>
                    <label className="text-xs text-gray-500 mb-1 block">المحافظة</label>
                    <Select
                        isRtl
                        placeholder="اختر المحافظة"
                        options={governorateOptions}
                        styles={selectStyles}
                        value={governorateOptions.find(g => g.value === form.data.governorate_id) || null}
                        onChange={o => form.setData('governorate_id', o.value)}
                    />
                    <InputError message={frontendErrors.governorate_id || form.errors.governorate_id} />
                </div>

                <button type="submit" className="btn-primary w-full">حفظ</button>
            </form>
        </Modal>
    );
}
