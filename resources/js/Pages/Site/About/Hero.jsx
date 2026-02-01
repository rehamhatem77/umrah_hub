// import { useState } from "react";
// import Select from "react-select";
// import { FiCalendar, FiSearch } from "react-icons/fi";
// import { MdLocationCity, MdMoney } from "react-icons/md";

// export default function Hero() {
//     return (
// <>
//   {/* Hero Section */}
//   <div className="w-full bg-white">
//     <div className="flex flex-col items-center justify-center">
//       <div className="w-full max-w-[1440px] px-4 md:px-10 lg:px-40 py-5">
//         <div className="@container">
//           <div className="@[480px]:p-0">
//             <div
//               className="relative flex min-h-[400px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-8 overflow-hidden"
//               data-alt="Pilgrims at Masjid Al Haram with soft lighting"
//               style={{
//                 backgroundImage:
//                   'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCJ1jqwvLTxMWfplK9VBMg_siYndFRT8sAsiXaLkFsUdUlH45LM_hhd1orhPWaNzztPtPWBG8IhWfuBsynZOLKbJhsm6e4qhwaFhcoqgEVVuBDZVoh-XamwrXRdquxN2r3hK4JrJneZ3c9SHML4RNk3TBnguRuCIYIpUciV2rxRRsF7nmwDfWbyXgkA_gPIhWBTmjb0AuDtTDK_63jWroRUJmALVs91IsByyUtpNXmnl5BUZ9V_6MbKFAJj8O4LraZ7UCMJ7_5du--5")'
//               }}
//             >
//               <div className="relative z-10 flex flex-col gap-3 text-center max-w-[720px]">
//                 <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
//                   من نحن
//                 </h1>
//                 <h2 className="text-white/90 text-lg md:text-xl font-medium leading-normal">
//                   رفيقك الموثوق في رحلة العمرة لخدمات متميزة وحجوزات ميسرة
//                 </h2>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   {/* Breadcrumbs */}
//   <div className="w-full bg-white border-b border-[#f0f4f2]">
//     <div className="flex justify-center">
//       <div className="w-full max-w-[1440px] px-4 md:px-10 lg:px-40">
//         <div className="flex flex-wrap gap-2 py-4">
//           <a
//             className="text-gray-500 hover:text-primary text-sm font-medium leading-normal"
//             href="/"
//           >
//             الرئيسية
//           </a>
//           <span className="text-gray-400 text-sm font-medium leading-normal">
//             /
//           </span>
//           <span className="text-[#111813] text-sm font-medium leading-normal">
//             من نحن
//           </span>
//         </div>
//       </div>
//     </div>
//   </div>
// </>

//     );
// }

export default function Hero({ data }) {
  const defaultData = {
    hero_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ1jqwvLTxMWfplK9VBMg_siYndFRT8sAsiXaLkFsUdUlH45LM_hhd1orhPWaNzztPtPWBG8IhWfuBsynZOLKbJhsm6e4qhwaFhcoqgEVVuBDZVoh-XamwrXRdquxN2r3hK4JrJneZ3c9SHML4RNk3TBnguRuCIYIpUciV2rxRRsF7nmwDfWbyXgkA_gPIhWBTmjb0AuDtTDK_63jWroRUJmALVs91IsByyUtpNXmnl5BUZ9V_6MbKFAJj8O4LraZ7UCMJ7_5du--5",
    hero_title: "خدمة ضيوف الرحمن",
    hero_badge_title: "رحلتك الروحانية تبدأ هنا",
    hero_description: "منصتك الموثوقة لتجربة عمرة ميسّرة، تجمع بين التقنية والروحانية لضمان راحة البال في أطهر بقاع الأرض."
  };

  const heroImage = data?.hero_image || defaultData.hero_image;
  const heroTitle = data?.hero_title || defaultData.hero_title;
  const heroBadge = data?.hero_badge_title || defaultData.hero_badge_title;
  const heroDesc = data?.hero_description || defaultData.hero_description;

const words = heroTitle.split(" ");
  const firstPart = words.length > 2 ? words.slice(0, -2).join(" ") : heroTitle;
  const lastTwoWords = words.length > 2 ? words.slice(-2).join(" ") : "";

  return (
    <section className="relative w-full min-h-[520px] flex items-center justify-center overflow-hidden">


      <img
        src={heroImage.startsWith("http") ? heroImage : `/storage/${heroImage}`}
        alt={heroTitle}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e3b2e]/90 via-[#0e3b2e]/85 to-[#0e3b2e]/95" />
      <div className="relative z-10 text-center px-6 max-w-4xl flex flex-col items-center gap-6">
        <span className="inline-flex items-center px-5 py-2 rounded-full bg-[#d4af37]/20 text-[#f5d776] text-sm font-medium">
          {heroBadge}
        </span>
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
         {firstPart}
          <br />
          <span className="text-[#f5d776]">{lastTwoWords}</span>
        </h1>
        <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl">
         {heroDesc}
        </p>

      </div>

    </section>
  );
}
