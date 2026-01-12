import { useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [frontendErrors, setFrontendErrors] = useState({});
       const [showPassword, setShowPassword] = useState(false);

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
              
                  <div className="relative">
                    <label className="block text-sm font-medium mb-1">
                        البريد الإلكتروني
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <HiOutlineMail size={20} />
                        </span>
                        <input
                            type="email"
                            value={data.email}
                            placeholder='ادخل بريدك الإلكتروني'
                            onChange={(e) => setData('email', e.target.value)}
                            className="  w-full 
        rounded-lg 
        border 
        border-gray-300 
      
        py-2 
        focus:outline-none 
        focus:border-app-primary 
        focus:ring-2 
        focus:ring-app-primary 
        transition
        duration-200"
                            autoComplete="username"
                            autoFocus
                        />
                    </div>
                    <InputError message={frontendErrors.email || errors.email} className="mt-1" />
                </div>

             
                <div className="relative">
                    <label className="block text-sm font-medium mb-1">كلمة المرور</label>
                    <div className="relative">
                        {/* Lock icon */}
                        {/* <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <HiOutlineLockClosed size={20} />
                        </span> */}
                        <span
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <HiOutlineEye  size={20} className="text-app-primary" /> : <HiOutlineEyeOff size={20}  />}
                        </span>

                       
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={data.password}
                            placeholder='ادخل كلمة المرور'
                            onChange={(e) => setData('password', e.target.value)}
                            className="  w-full 
        rounded-lg 
        border 
        border-gray-300 
       
        py-2 
        focus:outline-none 
        focus:border-app-primary 
        focus:ring-2 
        focus:ring-app-primary 
        transition
        duration-200"
                            autoComplete="current-password"
                        />

                      
                        
                    </div>
                    <InputError message={frontendErrors.password || errors.password} className="mt-1" />
                </div>

              
                <div className="flex items-center justify-between text-sm">
   <label className="flex items-center gap-2 cursor-pointer select-none">
    <input
    type="checkbox"
    checked={data.remember}
    onChange={(e) => setData('remember', e.target.checked)}
    className="
      appearance-none
      w-5 h-5 
      border border-gray-300 
      rounded 
      bg-white 
      hover:bg-white    
      checked:bg-app-primary 
      checked:border-app-primary 
      focus:outline-none 
      focus:ring-0
      relative
      after:content-[''] 
      after:absolute 
      after:left-1 after:top-0.5 
      after:w-2 after:h-3 after:border-b-2 after:border-r-2 after:border-white 
      after:rotate-45 
      after:scale-0 
      checked:after:scale-100 
      transition-all
    "
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
