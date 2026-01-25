import { Head } from "@inertiajs/react";
import HomeHeader from "./Site/Home/HomeHeader";
import { FiAtSign, FiCalendar, FiSearch } from "react-icons/fi";
import { FaLocationPin } from "react-icons/fa6";
import { MdLocationCity, MdMoney } from "react-icons/md";
import Hero from "./Site/Home/Hero";
import Services from "./Site/Home/Services";
import SpecialPackages from "./Site/Home/SpecialPackages";
import AllPackages from "./Site/Home/AllPackages";
import Testimonials from "./Site/Home/Testimonials";
import Footer from "@/Components/Footer";
import SiteLayout from "@/Layouts/SiteLayout";

export default function Home() {

    return (
    <SiteLayout title="Umrah Hub - الصفحة الرئيسية">
      <Hero/>
      <Services/>
      <SpecialPackages/>
      <AllPackages/>
      <Testimonials/>
      
    </SiteLayout>
  );
}
