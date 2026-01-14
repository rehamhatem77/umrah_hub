import { Link, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { FiSearch, FiBell, FiChevronDown, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';

export default function Header() {
    const user = usePage().props.auth.user;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const menuItems = [
        { label: 'الملف الشخصي', icon: <FiUser />, href: '#' },
        { label: 'الإعدادات', icon: <FiSettings />, href: '#' },
        { label: 'تسجيل الخروج', icon: <FiLogOut />, href: route('logout'), method: 'post', isButton: true },
    ];

    return (
        <header className="h-20 border-b border-gray-200 px-6 sm:px-8 flex items-center justify-between
                           bg-white/95 backdrop-blur-md sticky top-0 z-20 shadow-sm">

            <div className="flex items-center gap-3 w-full max-w-2xl">
                <div className="relative w-full">
                    <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                        type="text"
                        placeholder="ابحث عن كود عرض، محافظة..."
                        className="w-full pr-10 pl-4 py-3 bg-gray-100 border-none rounded-lg
                                   focus:ring-2 focus:ring-[var(--app-primary)] focus:ring-offset-1
                                   focus:bg-white text-sm transition-all outline-none shadow-sm hover:bg-white h-12"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 relative">

                <button
                    className="relative flex items-center justify-center w-12 h-12 rounded-lg
                               bg-gray-100 text-gray-600 hover:bg-gray-200 transition-transform duration-150
                               active:scale-95"
                    title="الإشعارات"
                >
                    <FiBell size={22} />
                    <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>

                <div className="h-6 w-px bg-gray-200 mx-1"></div>

                <div ref={dropdownRef} className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 group"
                        title={user.name}
                    >
                        <div className="w-12 h-12 rounded-full flex items-center justify-center
                                        bg-[var(--app-primary)] text-white font-bold text-lg shadow-md">
                            {user.name.charAt(0)}
                        </div>
                        <FiChevronDown className={`text-gray-600 transition-transform duration-200
                            ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <div
                        className={`absolute left-0 mt-2 w-48 max-w-[90vw] bg-white rounded-lg shadow-lg border border-gray-200
                                    transition-all duration-200 origin-top-right z-50
                                    ${dropdownOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'}`}
                    >
                        <div className="py-1 max-h-64 overflow-y-auto">
                            {menuItems.map((item, idx) =>
                                item.isButton ? (
                                    <Link
                                        key={idx}
                                        href={item.href}
                                        method={item.method}
                                        as="button"
                                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition rounded-lg"
                                    >
                                        {item.icon} {item.label}
                                    </Link>
                                ) : (
                                    <Link
                                        key={idx}
                                        href={item.href}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition rounded-lg"
                                    >
                                        {item.icon} {item.label}
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
