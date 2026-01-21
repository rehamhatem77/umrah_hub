import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function EditCompanyModal({
    show,
    onClose,
    form,
    governorateOptions,
    selectStyles,
    onSubmit,
}) {
    const [frontendErrors, setFrontendErrors] = useState({});
const noOptionsMessage = ({ inputValue }) => {
        return inputValue ? 'لا توجد نتائج' : 'لا توجد خيارات متاحة';
    }
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

        if (!form.data.governorate_ids || form.data.governorate_ids.length === 0) {
            errors.governorate_ids = 'المحافظة مطلوبة';
        }
        if(!form.data.company_code.trim()){
            errors.company_code = 'كود الشركة مطلوب';
        }
        if(form.data.company_code && form.data.company_code.trim().length > 100){
            errors.company_code = 'كود الشركة يجب ألا يزيد عن 100 حرف';
        }
        if(form.data.email && !/\S+@\S+\.\S+/.test(form.data.email)){
            errors.email = 'البريد الإلكتروني غير صالح';
        }

        setFrontendErrors(errors);

        if (Object.keys(errors).length > 0) return;

        onSubmit(e);
        // toast.success('تم تعديل بيانات الشركة بنجاح');
    };

    return (
        <Modal show={show} title="تعديل بيانات الشركة" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div> 
                    <label className="text-xs text-gray-500 mb-1 block">كود الشركة</label>
                    <input
                        className="input flex-1 py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm"
                        value={form.data.company_code}
                        onChange={e => form.setData('company_code', e.target.value)}
                    />
                    <InputError message={frontendErrors.company_code || form.errors.company_code} />
                </div>
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

                <div >
                    <label className="text-xs text-gray-500 mb-1 block">البريد الإلكتروني</label>
                    <input
                        className="input flex-1 py-2.5 px-3 text-sm rounded-lg focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm"
                        value={form.data.email}
                        onChange={e => form.setData('email', e.target.value)}
                    />
                    <InputError message={frontendErrors.email || form.errors.email} />
                </div>

                 <div>
                    <label className="text-xs text-gray-500 mb-1 block">المحافظات</label>
                    {governorateOptions.length === 0 ? (
                        <div className="text-red-500 text-xs mb-1">يرجى إضافة المحافظات أولاً من خلال صفحة الإعدادات.</div>
                    ) : (
                        <Select
                            isRtl
                            noOptionsMessage={noOptionsMessage}
                        placeholder="اختر المحافظات"
                        options={governorateOptions}
                        styles={selectStyles}
                        isMulti
                        value={governorateOptions.filter(g =>
                            form.data.governorate_ids.includes(g.value)
                        )}
                        onChange={options =>
                            form.setData('governorate_ids', options.map(o => o.value))
                        }
                    />
                    )}
                    <InputError message={frontendErrors.governorate_ids || form.errors.governorate_ids} />
                   
                </div>

                <div className="flex gap-2 pt-2">
                    <button type="button" onClick={onClose} className="btn-secondary flex-1">
                        إلغاء
                    </button>
                    <button type="submit" className="btn-primary flex-1">
                        حفظ التعديلات
                    </button>
                </div>
            </form>
        </Modal>
    );
}
