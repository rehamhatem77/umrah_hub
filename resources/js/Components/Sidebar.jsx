import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { FiMenu, FiLogOut } from 'react-icons/fi';

export default function SidebarContent({
    user,
    sidebarOpen,
    setSidebarOpen,
    sidebarCollapsed,
    setSidebarCollapsed,
    renderLinks,
    dashboardLinks,
    sitePages,
    isMobile,
}) {
    return (
        <>
          
            <div className="flex items-center justify-between h-20 border-b px-3">
                {sidebarOpen && (
                    <div className="flex items-center gap-3">
                        <ApplicationLogo className="h-9 w-auto text-[var(--app-primary)]" />
                        <span className="text-base font-bold text-[var(--app-primary)]">عمرة هَب</span>
                    </div>
                )}

                <button
                    onClick={() => {
                        if (isMobile) setSidebarOpen(!sidebarOpen);
                        else setSidebarCollapsed(!sidebarCollapsed);
                    }}
                    className="text-[var(--app-primary)] p-2 rounded-md hover:bg-gray-200 transition"
                >
                    <FiMenu className="text-lg" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="space-y-1">{renderLinks(dashboardLinks, sidebarOpen)}</div>
                <div>
                    {sidebarOpen && <p className="px-4 mb-2 text-xs font-bold text-gray-500">الصفحات الثابتة</p>}
                    <div className="space-y-1">{renderLinks(sitePages, sidebarOpen)}</div>
                </div>
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
        </>
    );
}
