import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router, usePage } from '@inertiajs/react';
import { FiChevronLeft, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import OfferCard from '@/Components/OfferCard';
import { motion } from 'framer-motion';

export default function Trash({ offers }) {



    return (
        <AuthenticatedLayout>
            <div className="px-3 sm:px-6 space-y-6">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <button onClick={() => router.get(route('dashboard'))}>لوحة التحكم</button>
                    <FiChevronLeft />
                    <button onClick={() => router.get(route('admin.offers.index'))}>الباقات</button>
                    <FiChevronLeft />
                    <span className="text-[var(--app-primary)] font-medium">سلة المحذوفات</span>
                </div>

                <h1 className="text-xl font-bold flex items-center gap-2">
                    <FiTrash2 className="text-[var(--app-primary)] text-2xl" /> سلة محذوفات الباقات 
                </h1>

                {offers?.data?.length === 0 ? (
                    <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-600">
                        <p className="text-lg font-bold mb-1">لا توجد باقات محذوفة</p>
                        <p className="text-sm">يتم عرض الباقات المحذوفة هنا بعد الحذف المؤقت.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {offers.data.map((offer) => (
                            <div key={offer.id} className="relative">
                                <OfferCard offer={offer}  />
                            </div>
                        ))}
                    </div>
                )}

                
        {offers?.data?.length > 0 && offers.links && (
          <div className="flex justify-center gap-1 flex-wrap text-sm">
            {offers.links.map((link, idx) => {
              let label = '';
              const toArabicNumbers = (num) => {
                const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
                return num.toString().split('').map(d => arabicNumbers[d] || d).join('');
              };

              if (link.label.includes('Previous')) label = '«';
              else if (link.label.includes('Next')) label = '»';
              else label = toArabicNumbers(link.label.replace(/&laquo;|&raquo;/g, ''));

              return (
                <button
                  key={idx}
                  onClick={() => link.url && router.get(link.url, {}, { preserveState: true, replace: true })}
                  className={`px-2 py-1 rounded border ${link.active
                    ? 'bg-[var(--app-primary)] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  disabled={!link.url}
                  dangerouslySetInnerHTML={{ __html: label }}
                />
              );
            })}
          </div>
        )}
            </div>
        </AuthenticatedLayout>
    );
}
