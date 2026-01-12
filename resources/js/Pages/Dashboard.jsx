import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="لوحة التحكم" />

            <div dir="rtl" className="py-8 px-6 max-w-7xl mx-auto space-y-8">

                {/* Page Title */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">
                        نظرة عامة
                    </h1>
                </div>

                {/* Quick Actions */}
                <section>
                    <h2 className="text-sm font-bold text-gray-500 mb-4">
                        ⚡ إجراءات سريعة
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <ActionButton primary label="إضافة عرض جديد" />
                        <ActionButton label="تحديث رقم WhatsApp" />
                        <ActionButton label="تحميل التقارير" />
                        <ActionButton label="إرسال تنبيه" />
                    </div>
                </section>

                {/* Stats Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="إجمالي العروض" value="١,٢٤٠" trend="+12%" />
                    <StatCard title="العروض المميزة" value="٨٥" trend="+5%" />
                    <StatCard title="معدل التحويل" value="١٨٪" trend="-2%" negative />
                    <StatCard
                        title="نقرات WhatsApp"
                        value="٣,٥٠٠"
                        highlight
                    />
                </section>

                {/* Chart + Latest Offers */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Chart */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm">
                        <div className="p-6 border-b flex justify-between items-center">
                            <div>
                                <h3 className="font-bold">حركة المرور الشهرية</h3>
                                <p className="text-xs text-gray-500">
                                    تحليل الزيارات للعروض
                                </p>
                            </div>
                            <div className="flex bg-gray-100 rounded-lg p-1 text-xs font-bold">
                                <button className="px-3 py-1 rounded-md bg-white shadow text-emerald-700">
                                    شهري
                                </button>
                                <button className="px-3 py-1 rounded-md text-gray-500">
                                    سنوي
                                </button>
                            </div>
                        </div>

                        {/* Chart Placeholder */}
                        <div className="p-8">
                            <div className="h-56 flex items-end gap-4">
                                {[40, 60, 55, 35, 50, 25, 30].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                        <div
                                            className="w-full rounded-t-lg bg-gradient-to-t from-emerald-700 to-emerald-400"
                                            style={{ height: `${h}%` }}
                                        />
                                        <span className="text-[10px] text-gray-500">
                                            {['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو'][i]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Latest Offers */}
                    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h3 className="font-bold">أحدث العروض</h3>
                            <button className="text-xs font-bold text-emerald-700">
                                عرض الكل
                            </button>
                        </div>

                        <ul className="divide-y">
                            <OfferItem title="عمرة النصف من شعبان" status="نشط" />
                            <OfferItem title="حج بري اقتصادي" status="مراجعة" />
                            <OfferItem title="عمرة شهر رمضان" status="نشط" />
                            <OfferItem title="باقة كبار الشخصيات" status="مسودة" />
                        </ul>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}

/* ================= Components ================= */

function ActionButton({ label, primary }) {
    return (
        <button
            className={`rounded-xl py-3 text-sm font-bold transition
            ${primary
                ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                : 'bg-white border hover:bg-gray-50'
            }`}
        >
            {label}
        </button>
    );
}

function StatCard({ title, value, trend, negative, highlight }) {
    return (
        <div
            className={`rounded-2xl p-6 border shadow-sm
            ${highlight ? 'bg-emerald-700 text-white' : 'bg-white'}`}
        >
            <p className={`text-xs font-bold mb-2 ${highlight ? 'text-white/70' : 'text-gray-500'}`}>
                {title}
            </p>

            <div className="flex items-center justify-between">
                <span className="text-3xl font-black">{value}</span>

                {trend && (
                    <span
                        className={`text-xs font-bold px-2 py-1 rounded
                        ${negative
                            ? 'bg-red-50 text-red-600'
                            : 'bg-green-50 text-green-600'
                        }`}
                    >
                        {trend}
                    </span>
                )}
            </div>
        </div>
    );
}

function OfferItem({ title, status }) {
    const statusStyles = {
        'نشط': 'bg-green-50 text-green-700',
        'مراجعة': 'bg-amber-50 text-amber-700',
        'مسودة': 'bg-gray-100 text-gray-600',
    };

    return (
        <li className="p-4 hover:bg-gray-50 flex justify-between items-center">
            <span className="font-bold text-sm">{title}</span>
            <span className={`text-[10px] font-bold px-2 py-1 rounded ${statusStyles[status]}`}>
                {status}
            </span>
        </li>
    );
}
