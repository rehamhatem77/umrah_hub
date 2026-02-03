import '../../css/style.css';
import { Head } from "@inertiajs/react";

import HomeHeader from "./Site/Home/HomeHeader";
import { FiAtSign, FiCalendar, FiChevronLeft, FiSearch } from "react-icons/fi";
import { FaLocationPin } from "react-icons/fa6";
import { MdLocationCity, MdMoney } from "react-icons/md";
import Hero from "./Site/About/Hero";
import Introduction from "./Site/About/IntroSection";
import VisionMissionSection from "./Site/About/VisionMissionSection";
import WhyChooseUs from "./Site/About/WhyChooseUs";
import StatisticsSection from "./Site/About/StatisticsSection";
import CTASection from "./Site/About/CTASection";
import Footer from "@/Components/Footer";
import SiteLayout from "@/Layouts/SiteLayout";

export default function About({aboutUs }) {

  return (
    <SiteLayout title="Umrah Hub - عن الشركة ">

      <Hero data={aboutUs} />
      <div className='row'>
        <div className="w-full bg-white">
          <div className="flex justify-center">
            <div className="w-full max-w-[1440px] px-4 md:px-10 lg:px-40">
              <div className="flex flex-wrap gap-2 py-4">
                <a
                  className="text-gray-500 hover:text-primary text-sm font-medium leading-normal"
                  href="/"
                >
                  الرئيسية
                </a>
                 <FiChevronLeft size={18} className="material-symbols-outlined text-base text-[#dce5df] " />
                <span className="text-[#111813] text-sm font-medium leading-normal">
                  من نحن
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Introduction data={aboutUs} />
      <VisionMissionSection data={aboutUs}/>
      <WhyChooseUs data={aboutUs}/>
      <StatisticsSection data={aboutUs} />
      <CTASection data={aboutUs} />

    </SiteLayout>
  );
}
