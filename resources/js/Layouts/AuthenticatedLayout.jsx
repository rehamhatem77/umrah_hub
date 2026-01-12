import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FiHome, FiUsers, FiSettings, FiLogOut, FiBriefcase, FiGlobe, FiCreditCard, FiMenu, 
    FiGrid,
    FiArchive,
    FiDatabase,
    FiPackage,
    FiPhoneCall,
    FiGift,
    FiBookmark,
    FiStar
} from "react-icons/fi";
import { MdOutlineHotel } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";


export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Collected links
    const dashboardLinks = [
        { name: 'لوحة التحكم', icon: <FiGrid />, path: '/dashboard' ,bgPrimary: true},
          { name: 'الباقات', icon: <FiGift />, path: '#' },
        { name: 'العروض المميزة', icon: <BsStars   />, path: '#' },
        { name: 'شركات السياحة', icon: <FaRegBuilding   />, path: '#' },
        { name: 'الفنادق', icon: <MdOutlineHotel  />, path: '#' },
        { name: 'أنواع الرحلات ', icon: <MdOutlineCategory    />, path: '#' },
        { name: 'التقييمات', icon: <FiStar />, path: '#' },
        { name: 'المستخدمون', icon: <FiUsers />, path: '#' },
        { name: 'الإعدادات', icon: <FiSettings />, path: '#' },
    ];

    const sitePages = [
        { name: 'الصفحة الرئيسية', icon: <FiHome />, path: '#' },
        { name: 'من نحن', icon: <FiBriefcase />, path: '#' },
        { name: 'تواصل معنا', icon: <FiGlobe />, path: '#' },
        { name: 'اراء العملاء', icon: <FaRegCommentDots  />, path: '#' },
    ];

    const siteDataLinks = [
      
    ];

    // Render links helper
    const renderLinks = (links) => (
        links.map(link => (
            <Link
                key={link.name}
                href={link.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
                            ${link.bgPrimary ? 'bg-[var(--app-primary)] text-white' : 'hover:bg-gray-100'}`}
            >
                <span className={`text-lg ${link.bgPrimary ? 'text-white' : 'text-[var(--app-primary)]'}`}>
                    {link.icon}
                </span>
                {sidebarOpen && link.name}
            </Link>
        ))
    );

    return (
        <div className="min-h-screen flex bg-gray-100" dir="rtl">

            {/* Sidebar */}
            <aside
                className={`bg-[var(--app-bg)] border-r flex-shrink-0 transition-all duration-300
                            ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col h-screen`}
            >
              
                <div className="flex items-center justify-between h-20 border-b px-3">
                    {sidebarOpen && (
                        <div className="flex items-center gap-3">
                            <ApplicationLogo className="h-9 w-auto text-[var(--app-primary)]" />
                            <span className="text-base font-bold text-[var(--app-primary)]">عمرة هَب</span>
                        </div>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-[var(--app-primary)] p-2 rounded-md hover:bg-gray-200 transition"
                    >
                        <FiMenu className="text-lg" />
                    </button>
                </div>

            
                <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">

                    {/* Dashboard */}
                    <div className="space-y-1">{renderLinks(dashboardLinks)}</div>

                    <div>
                        {sidebarOpen && <p className="px-4 mb-2 text-xs font-bold text-gray-500">الصفحات الثابتة </p>}
                        <div className="space-y-1">{renderLinks(sitePages)}</div>
                    </div>

                    {/* <div>
                        {sidebarOpen && <p className="px-4 mb-2 text-xs font-bold text-gray-500">بيانات الموقع</p>}
                        <div className="space-y-1">{renderLinks(siteDataLinks)}</div>
                    </div> */}

                </div>

                <div className="border-t p-4 flex-shrink-0 bg-[var(--app-bg)]">
                    <div className={`flex items-center gap-3 p-3 rounded-lg transition-all ${sidebarOpen ? 'bg-gradient-to-r from-gray-100 to-gray-50' : 'justify-center p-0 rounded-full'}`}>
                        <div className="w-14 h-14 rounded-full flex items-center justify-center
                                        bg-[var(--app-primary)] text-white font-bold text-xl shadow-md ring-2 ring-white">
                            {user.name.charAt(0)}
                        </div>
                        {sidebarOpen && (
                            <div className="flex-1">
                                <div className="text-[var(--app-text)] font-semibold text-sm">{user.name}</div>
                                <div className="text-gray-500 text-xs truncate">{user.email}</div>
                                <span className="inline-block mt-1 text-xs text-green-600 font-medium">متصل الآن</span>
                            </div>
                        )}
                    </div>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className={`mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                                    bg-red-600 text-white hover:bg-red-700 shadow-md transition
                                    ${!sidebarOpen ? 'justify-center' : ''}`}
                    >
                        <FiLogOut className="text-lg" />
                        {sidebarOpen && 'تسجيل الخروج'}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
                    <h1 className="text-lg font-bold">{header}</h1>
                </header>

                <main className="p-6 flex-1 bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
}
