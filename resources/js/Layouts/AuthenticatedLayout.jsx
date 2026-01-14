import ApplicationLogo from '@/Components/ApplicationLogo';
import Header from '@/Components/Header';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { 
    FiGrid, FiGift, FiStar, FiTrendingUp, FiMenu, FiLogOut,
    FiSettings,
    FiUsers,
    FiGlobe,
    FiHome,
    FiBriefcase
} from "react-icons/fi";
import { MdOutlineHotel, MdOutlineCategory } from "react-icons/md";
import { FaRegBuilding, FaMapLocationDot } from "react-icons/fa6";
import { FaRegCommentDots } from "react-icons/fa";

import { BsStars } from "react-icons/bs";
import SidebarContent from '@/Components/Sidebar';

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;
    const { url } = usePage();

    const [sidebarOpen, setSidebarOpen] = useState(false); 
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false); 

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024);
            if (window.innerWidth > 1024) setSidebarOpen(false);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const dashboardLinks = [
        { name: 'لوحة التحكم', icon: <FiGrid />, path: '/dashboard' },
        { name: 'الباقات', icon: <FiGift />, path: '/admin/offers' },
        { name: 'العروض المميزة', icon: <BsStars />, path: '#' },
        { name: 'الرحلات الأكثر طلبا ', icon: <FiTrendingUp />, path: '#' },
        { name: 'المحافظات', icon: <FaMapLocationDot />, path: '/admin/governorates' },
        { name: 'شركات السياحة', icon: <FaRegBuilding />, path: '/admin/tour-companies' },
        { name: 'الفنادق', icon: <MdOutlineHotel />, path: '#' },
        { name: 'أنواع الرحلات ', icon: <MdOutlineCategory />, path: '#' },
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

 
    const renderLinks = (links, expanded) => (
        links.map(link => {
            const isActive = url.includes(link.path);
            return (
                <Link
                    key={link.name}
                    href={link.path}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
                        ${isActive
                            ? 'bg-[var(--app-primary)] text-white shadow'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                >
                    <span className={`text-lg ${isActive ? 'text-white' : 'text-[var(--app-primary)]'}`}>{link.icon}</span>
                    {expanded && link.name}
                </Link>
            );
        })
    );

    return (
        <div className="min-h-screen flex bg-gray-100" dir="rtl">

            {/* Sidebar overlay for mobile */}
            {sidebarOpen && isMobile && (
                <div
                    className="fixed inset-0 z-30 bg-black/30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}


            {/* Sidebar */}
            <aside
                className={`fixed lg:relative z-40 bg-[var(--app-bg)] border-r flex-shrink-0 transition-all duration-300
                    ${isMobile
                        ? sidebarOpen ? 'w-64' : 'w-20' 
                        : sidebarCollapsed ? 'w-20' : 'w-64' 
                    } h-screen flex flex-col`}
            >
                <SidebarContent
                    user={user}
                    sidebarOpen={isMobile ? sidebarOpen : !sidebarCollapsed}
                    setSidebarOpen={setSidebarOpen}
                    sidebarCollapsed={sidebarCollapsed}
                    setSidebarCollapsed={setSidebarCollapsed}
                    renderLinks={renderLinks}
                    dashboardLinks={dashboardLinks}
                    sitePages={sitePages}
                    isMobile={isMobile}
                />
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:ml-0">
                <Header
                    user={user}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    isMobile={isMobile}
                />

                <main className="p-6 flex-1 bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
}


