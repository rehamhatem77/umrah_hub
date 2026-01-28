import { useState } from "react";
import Select from "react-select";
import { FiCalendar, FiChevronLeft, FiSearch } from "react-icons/fi";
import { MdLocationCity, MdMoney } from "react-icons/md";

export default function Hero() {
    return (
<>
<div className="mb-6 flex items-center gap-2 text-sm">
  <a className="text-[#63886f] hover:text-primary" href="#">
    الرئيسية
  </a>
  {/* <span className="material-symbols-outlined text-base text-[#dce5df] rotate-180">
 /
  </span> */}

  <FiChevronLeft size={18} className="material-symbols-outlined text-base text-[#dce5df] " />
  <span className="text-[#111813] font-medium">جميع الباقات</span>
</div>
<div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 class="text-3xl md:text-4xl font-black text-[#111813] mb-2 font-display">
                            جميع الباقات
                        </h1>
                        <p class="text-[#63886f]">
                            استعرض أفضل باقات العمرة المتاحة المصممة لراحتك
                        </p>
                    </div>
                    <div class="hidden md:block">
        </div>
      </div>
</>

    );
}
