import React from "react";
import { Link } from "@inertiajs/react";
import {
  FiPlus,
  FiFilter,
  FiRefreshCcw,
  FiEdit,
  FiTrash,
  FiEye,
} from "react-icons/fi";

export default function OffersIndexUI() {
  return (
    <div dir="rtl" className="p-6 bg-slate-50 min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">إدارة العروض</h1>
          <p className="text-sm text-slate-500 mt-1">
            تحكم في جميع عروض الحج والعمرة المتاحة على المنصة
          </p>
        </div>

        <Link
          href="#"
          className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow"
        >
          <FiPlus />
          إضافة عرض جديد
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap gap-4 items-end mb-6">

        <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
          <FiFilter />
          تصفية متقدمة
        </div>

        <select className="border border-slate-200 rounded-lg px-4 h-10 text-sm">
          <option>جميع المحافظات</option>
        </select>

        <select className="border border-slate-200 rounded-lg px-4 h-10 text-sm">
          <option>الكل</option>
        </select>

        <button className="flex items-center gap-2 px-4 h-10 border rounded-lg text-sm font-bold">
          <FiRefreshCcw />
          إعادة تعيين
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {[
          { label: "الكل", count: 124, active: true },
          { label: "نشط", count: 98 },
          { label: "غير نشط", count: 26 },
          { label: "عروض مميزة", count: 12 },
        ].map((item, i) => (
          <span
            key={i}
            className={`px-4 py-2 rounded-full text-xs font-bold border
              ${item.active
                ? "bg-emerald-700 text-white border-emerald-700"
                : "bg-white text-slate-600 border-slate-200"
              }`}
          >
            {item.label} ({item.count})
          </span>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">

        <table className="w-full text-right">
          <thead className="bg-slate-50 border-b">
            <tr className="text-xs font-black text-slate-600">
              <th className="px-6 py-4">كود العرض</th>
              <th>نوع الرحلة</th>
              <th>المحافظة</th>
              <th>مدة الرحلة</th>
              <th>السعر</th>
              <th>الحالة</th>
              <th className="text-center">العمليات</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {[
              {
                code: "HJ-2024-01",
                type: "حج",
                city: "القاهرة",
                days: 14,
                price: "155,000",
                active: true,
              },
              {
                code: "UM-2024-44",
                type: "عمرة",
                city: "الإسكندرية",
                days: 10,
                price: "45,000",
                active: true,
              },
              {
                code: "HJ-2024-05",
                type: "حج",
                city: "المدينة",
                days: 21,
                price: "190,000",
                active: false,
              },
              {
                code: "UM-2024-12",
                type: "عمرة",
                city: "المنصورة",
                days: 15,
                price: "38,500",
                active: true,
              },
            ].map((offer, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-sm">{offer.code}</td>

                <td className="text-sm flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full
                      ${offer.type === "حج" ? "bg-orange-500" : "bg-blue-500"}`}
                  />
                  {offer.type}
                </td>

                <td className="text-sm">{offer.city}</td>
                <td className="text-sm text-slate-500">{offer.days} يوم</td>

                <td className="font-black text-emerald-700 text-sm">
                  ج.م {offer.price}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black
                      ${offer.active
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-500"
                      }`}
                  >
                    {offer.active ? "نشط" : "غير نشط"}
                  </span>
                </td>

                <td className="text-center">
                  <div className="flex justify-center gap-3 text-slate-500">
                    <FiEye className="cursor-pointer hover:text-emerald-600" />
                    <FiEdit className="cursor-pointer hover:text-blue-600" />
                    <FiTrash className="cursor-pointer hover:text-red-600" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t">
          <p className="text-xs text-slate-500">
            عرض 1 إلى 10 من إجمالي 124 عرضاً
          </p>

          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <span
                key={p}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold
                  ${p === 1
                    ? "bg-emerald-700 text-white"
                    : "bg-white border"
                  }`}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
