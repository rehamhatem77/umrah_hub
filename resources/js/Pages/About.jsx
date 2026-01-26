import '../../css/style.css';
import { Head } from "@inertiajs/react";

import HomeHeader from "./Site/Home/HomeHeader";
import { FiAtSign, FiCalendar, FiSearch } from "react-icons/fi";
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

export default function About() {

    return (
    <SiteLayout title="Umrah Hub - عن الشركة ">
      <Hero/>
      <Introduction/>
      <VisionMissionSection/>
      <WhyChooseUs/>
      <StatisticsSection/>
      <CTASection/>

    </SiteLayout>
  );
}
