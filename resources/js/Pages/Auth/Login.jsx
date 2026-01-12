import { useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [frontendErrors, setFrontendErrors] = useState({});

    const submit = (e) => {
        e.preventDefault();

        let validationErrors = {};

       
        if (!data.email) {
            validationErrors.email = 'البريد الإلكتروني مطلوب.';
        } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
            validationErrors.email = 'الرجاء إدخال بريد إلكتروني صالح.';
        }

     
        if (!data.password) {
            validationErrors.password = 'كلمة المرور مطلوبة.';
        }

        setFrontendErrors(validationErrors);

       
        if (Object.keys(validationErrors).length > 0) return;

        // Submit to backend
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="تسجيل الدخول" />

            <h1 className="text-2xl font-bold mb-2 text-center">
                مرحبًا بعودتك
            </h1>
            <p className="text-sm text-gray-500 mb-6 text-center">
                الرجاء إدخال بياناتك للمتابعة
            </p>

            {status && (
                <div className="mb-4 text-sm font-medium text-app-primary text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4" noValidate>
              
                <div>
                    <label className="block text-sm font-medium mb-1">
                        البريد الإلكتروني
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-app-primary"
                        autoComplete="username"
                        autoFocus
                    />
                    <InputError message={frontendErrors.email || errors.email} className="mt-1" />
                </div>

             
                <div>
                    <label className="block text-sm font-medium mb-1">
                        كلمة المرور
                    </label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-app-primary"
                        autoComplete="current-password"
                    />
                    <InputError message={frontendErrors.password || errors.password} className="mt-1" />
                </div>

              
                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                        <Checkbox
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        تذكرني
                    </label>
                </div>

              
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-app-primary text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition"
                >
                    تسجيل الدخول
                </button>
            </form>
        </GuestLayout>
    );
}
