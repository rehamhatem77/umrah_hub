import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div dir="rtl" className="min-h-screen grid lg:grid-cols-2 bg-app-bg" style={{ gridTemplateColumns: '1.8fr 1.2fr' }}
>

             <div className="flex items-center justify-center px-6">
                       <div className="w-full max-w-md">
                   <div className="flex justify-center mb-6">
                     <Link href="/" className="flex items-center gap-2">
                       <ApplicationLogo className="h-14 w-14 text-app-primary" />
                         <span className="text-xl font-bold">عمرة هَب</span>
                        </Link>
                   </div>


                      <div className="bg-white rounded-xl shadow p-8">
                     {children}
                       </div>
                </div>
                   </div>

                   <div
                className="relative hidden lg:flex items-center justify-center"
                style={{
                    backgroundImage: "url('https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/68469e8a2e8291001d055382.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
           
                <div className="absolute inset-0 bg-black/50"></div>

           
                <div className="relative text-center text-white max-w-sm px-6">
                    <h2 className="text-3xl font-bold mb-4">منصة عمرة هَب</h2>
                    <p className="opacity-90 leading-relaxed">
                        بوابتك الذكية لإدارة رحلات العمرة باحترافية وسهولة
                    </p>
                </div>
            </div>
          </div>
    );
}
