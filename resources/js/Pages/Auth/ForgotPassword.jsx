import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="نسيت كلمة المرور" />

            <h1 className="text-2xl font-bold mb-2 text-center">
                نسيت كلمة المرور؟
            </h1>

            <p className="text-sm text-gray-500 mb-6 text-center leading-relaxed">
                لا تقلق، أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور
            </p>

            {status && (
                <div className="mb-4 text-sm font-medium text-app-primary text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        البريد الإلكتروني
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-app-primary"
                        autoFocus
                    />
                    <InputError message={errors.email} className="mt-1" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-app-primary text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition"
                >
                    إرسال رابط إعادة التعيين
                </button>
            </form>
        </GuestLayout>
    );
}
