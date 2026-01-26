import { useState } from "react";
import Select from "react-select";
import { FiCalendar, FiSearch } from "react-icons/fi";
import { MdLocationCity, MdMoney } from "react-icons/md";

export default function Hero() {
    return (
<>
  {/* Hero Section */}
  <div className="w-full bg-white">
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-[1440px] px-4 md:px-10 lg:px-40 py-5">
        <div className="@container">
          <div className="@[480px]:p-0">
            <div
              className="relative flex min-h-[400px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-8 overflow-hidden"
              data-alt="Pilgrims at Masjid Al Haram with soft lighting"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCJ1jqwvLTxMWfplK9VBMg_siYndFRT8sAsiXaLkFsUdUlH45LM_hhd1orhPWaNzztPtPWBG8IhWfuBsynZOLKbJhsm6e4qhwaFhcoqgEVVuBDZVoh-XamwrXRdquxN2r3hK4JrJneZ3c9SHML4RNk3TBnguRuCIYIpUciV2rxRRsF7nmwDfWbyXgkA_gPIhWBTmjb0AuDtTDK_63jWroRUJmALVs91IsByyUtpNXmnl5BUZ9V_6MbKFAJj8O4LraZ7UCMJ7_5du--5")'
              }}
            >
              <div className="relative z-10 flex flex-col gap-3 text-center max-w-[720px]">
                <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                  من نحن
                </h1>
                <h2 className="text-white/90 text-lg md:text-xl font-medium leading-normal">
                  رفيقك الموثوق في رحلة العمرة لخدمات متميزة وحجوزات ميسرة
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Breadcrumbs */}
  <div className="w-full bg-white border-b border-[#f0f4f2]">
    <div className="flex justify-center">
      <div className="w-full max-w-[1440px] px-4 md:px-10 lg:px-40">
        <div className="flex flex-wrap gap-2 py-4">
          <a
            className="text-gray-500 hover:text-primary text-sm font-medium leading-normal"
            href="#"
          >
            الرئيسية
          </a>
          <span className="text-gray-400 text-sm font-medium leading-normal">
            /
          </span>
          <span className="text-[#111813] text-sm font-medium leading-normal">
            من نحن
          </span>
        </div>
      </div>
    </div>
  </div>
</>

    );
}
