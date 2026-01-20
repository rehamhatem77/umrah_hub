import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import {
    FiGift,
    FiTrendingUp,
    FiStar,
    FiUsers,
    FiClock,
    FiMapPin,
    FiGrid
} from 'react-icons/fi';
import { MdOutlineHotel, MdOutlineCategory } from 'react-icons/md';

export default function Dashboard({
    kpis,
    lifecycle,
    latestOffers,
    expiringOffers,
    offersByTripType,
    offersByCompany,
    offersByGovernorate
}) {


    const toArabicNumber = (value) => {
        if (value === null || value === undefined) return '٠';
        return value.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
    };


    return (
        <AuthenticatedLayout>
            <Head title="لوحة التحكم" />

            <div className="px-3 sm:px-6 space-y-8">
                <div>
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <FiGrid className="text-[var(--app-primary)]" />
                        لوحة التحكم 
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        نظرة شاملة على أداء المنصة، الباقات، والمخاطر التشغيلية
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Kpi title="إجمالي الباقات" value={toArabicNumber(kpis.offers.total)} icon={<FiGift />} />
                    <Kpi title="نشطة" value={toArabicNumber(kpis.offers.active)} icon={<FiTrendingUp />} />
                    <Kpi danger title="منتهية" value={toArabicNumber(kpis.offers.expired)} icon={<FiClock />} />
                    <Kpi title="مميزة" value={toArabicNumber(kpis.offers.special)} icon={<FiStar />} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Kpi title="شركات سياحة" value={toArabicNumber(kpis.entities.companies)} icon={<FiUsers />} />
                    <Kpi title="فنادق" value={toArabicNumber(kpis.entities.hotels)} icon={<MdOutlineHotel />} />
                    <Kpi title="أنواع رحلات" value={toArabicNumber(kpis.entities.tripTypes)} icon={<MdOutlineCategory />} />
                    <Kpi title="محافظات" value={toArabicNumber(kpis.entities.governorates)} icon={<FiMapPin />} />
                </div>


                <div className="grid lg:grid-cols-3 gap-6">

                    <Card title="أحدث الباقات">
                        {latestOffers.map(o => (
                            <Row
                                key={o.id}
                                title={o.title}
                                status={o.is_active ? 'نشط' : 'غير نشط'}
                                onClick={() => router.get(route('admin.offers.show', o.id))}
                            />
                        ))}
                    </Card>

                    <Card title="تنتهي قريبًا" danger>
                        {expiringOffers.map(o => (
                            <Row
                                key={o.id}
                                title={o.title}
                                status={o.end_date}
                                danger
                            />
                        ))}
                    </Card>


                    <Card title="التوزيع حسب نوع الرحلة">
                        {offersByTripType.map(t => (
                            <DistributionRow
                                key={t.id}
                                label={t.name}
                                count={t.offers_count}
                            />
                        ))}
                    </Card>

                    <Card title="دورة حياة الباقات">
                        <div className="p-4 space-y-2 text-sm">
                            <p>
                                📆 متوسط مدة الباقة:
                                <span className="font-bold"> {toArabicNumber(lifecycle.avgDuration)} يوم</span>
                            </p>
                            <p>
                                ⏳ باقات قريبة الانتهاء:
                                <span className="font-bold text-red-600">
                                    {' '}{toArabicNumber(lifecycle.expiringSoon)}
                                </span>
                            </p>
                            <p className="text-slate-500">
                                هذا المؤشر يساعد على تحسين تخطيط العروض المستقبلية.
                            </p>
                        </div>
                    </Card>


                    <Card title="أكثر شركات السياحة نشاطًا">
                        {offersByCompany.map(c => (
                            <DistributionRow
                                key={c.id}
                                label={c.name}
                                count={c.offers_count}
                            />
                        ))}
                    </Card>


                    <Card title="التوزيع حسب المحافظات">
                        {offersByGovernorate.map(g => (
                            <DistributionRow
                                key={g.id}
                                label={g.name}
                                count={g.offers_count}
                            />
                        ))}
                    </Card>


                </div>
            </div>
        </AuthenticatedLayout>
    );
}


function Kpi({ title, value, icon, danger }) {
    return (
        <div className={`bg-white border rounded-xl p-4 flex justify-between items-center
      ${danger && 'border-red-200'}`}>
            <div>
                <p className="text-xs text-slate-500 font-bold">{title}</p>
                <p className="text-2xl font-black">{value}</p>
            </div>
            <div className={`text-2xl ${danger ? 'text-red-500' : 'text-[var(--app-primary)]'}`}>
                {icon}
            </div>
        </div>
    );
}

function AlertCard({ title, value, danger, action }) {
    return (
        <div className={`p-4 rounded-xl border flex justify-between items-center
      ${danger ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
            <div>
                <p className="font-bold">{title}</p>
                <p className="text-sm text-slate-600">عدد: {value}</p>
            </div>
            <button onClick={action} className="btn-primary text-sm">
                عرض
            </button>
        </div>
    );
}

function Card({ title, children, danger }) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl">
            <div className={`p-4 border-b font-bold ${danger && 'text-red-600'}`}>
                {title}
            </div>
            <div className="divide-y">{children}</div>
        </div>
    );
}

function Row({ title, status, danger, onClick }) {
    return (
        <div onClick={onClick}
            className="p-4 hover:bg-slate-50 cursor-pointer flex justify-between">
            <span>{title}</span>
            <span className={`text-xs font-bold px-2 py-1 rounded
        ${danger ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
                {status}
            </span>
        </div>
    );
}

function DistributionRow({ label, count }) {
     const toArabicNumber = (value) => {
        if (value === null || value === undefined) return '٠';
        return value.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
    };
    return (
        <div className="p-3">
            <div className="flex justify-between text-sm font-bold mb-1">
                <span>{label}</span>
                <span>{toArabicNumber(count)}</span>
            </div>
            <div className="h-2 bg-slate-100 rounded">
                <div
                    className="h-2 bg-[var(--app-primary)] rounded"
                    style={{ width: `${Math.min(count * 5, 100)}%` }}
                />
            </div>
        </div>
    );
}
