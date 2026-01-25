import { useState } from "react";
import Select from "react-select";
import { FiCalendar, FiSearch } from "react-icons/fi";
import { MdLocationCity, MdMoney } from "react-icons/md";

export default function Hero() {

    const [destination, setDestination] = useState(null);


    const destinationOptions = [
        { value: "mecca", label: "مكة" },
        { value: "madinah", label: "المدينة" },
    ];


    const selectStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: '40px',
            borderRadius: '10px',
            boxShadow: state.isFocused ? '0 0 0 2px rgba(15,61,46,.12)' : 'none',
            cursor: 'default',
            transition: 'all 0.2s ease',
            '&:hover': { borderColor: 'var(--app-primary)', cursor: 'default' },
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? 'var(--app-primary)'
                : state.isFocused
                    ? 'rgba(15,61,46,0.08)'
                    : '#fff',
            color: state.isSelected ? '#fff' : state.isDisabled ? '#9ca3af' : '#333',
            cursor: state.isDisabled ? 'not-allowed' : 'default',
            padding: '6px 12px',
        }),
        placeholder: (base) => ({ ...base, color: '#9ca3af' }),
    };

    return (
        <section className="px-4 lg:px-20 py-5 bg-gray-100">

          <div className="relative overflow-hidden rounded-[32px] min-h-[520px] flex items-center justify-center">
    <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFXzQrpUEXpe2s65VNeEgwhBiUCgmWuN10YMlBeWYRVJDa_wXpnalUUfg8iViHXeRRzEiudEFXzAtk3Yvr7v_TXwNtgXTzQcikkDr1t3R1pLuUpRj51QySe0XYxgrbrUzIBi9rQ6hE65q7EyVjgeZwx7qT7p8PgTi5s3FzeHX9fJ8IWzhKHQbV72pryb0vthAGcQl_1qJf-8v_6iMAYgSSC_HF8B_EleCYOj2bAQGosXFSSCKWRPOmpdw-OkIao7nJ_WkkHEfngUoT"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Kaaba"
    />


    <div className="absolute inset-0 bg-black/55"></div>

    <div className="relative z-10 text-center max-w-3xl px-4">
        <h1 className="text-white text-3xl sm:text-4xl lg:text-6xl font-extrabold mb-4 leading-tight">
            اعثر على باقة العمرة
            <br />
            المناسبة لك
        </h1>

        <p className="text-gray-200 text-sm sm:text-base lg:text-lg">
            قارن بين أفضل باقات العمرة واحجز بكل ثقة
        </p>
    </div>


</div>
 <div className="absolute z-20 bottom-20 left-1/2 -translate-x-1/2 translate-y-1/2 w-full px-4 sm:px-8 lg:px-12">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] px-4 sm:px-6 py-6 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end text-sm">

                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-xs text-gray-500">
                        <MdLocationCity className="text-[var(--app-primary)]" />
                        الوجهة
                    </label>

                    <Select
                        isRtl
                        placeholder="اختر الوجهة"
                        options={destinationOptions}
                        styles={selectStyles}
                        value={destination}
                        onChange={setDestination}
                        isSearchable={false}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-xs text-gray-500">
                        <FiCalendar className="text-[var(--app-primary)]" />
                        تاريخ السفر
                    </label>

                    <input
                        type="date"
                        className="input py-2.5 px-3 text-sm rounded-lg shadow-sm focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-xs text-gray-500">
                        <MdMoney className="text-[var(--app-primary)]" />
                        الميزانية
                    </label>

                    <input
                        type="number"
                        placeholder="أي سعر"
                        className="input py-2.5 px-3 text-sm rounded-lg shadow-sm focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)]"

                    />
                </div>

                <button
                    className="flex items-center justify-center gap-2 text-white py-3 rounded-xl font-semibold h-[44px] w-full hover:opacity-90 transition"
                    style={{ backgroundColor: "var(--app-primary)" }}
                >
                    <FiSearch />
                    بحث عن الباقات
                </button>

            </div>
        </div>
    </div>

        </section>

    );
}
