import { Head } from "@inertiajs/react";
import '../../css/style.css';
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

export default function Home({ services, specialOffers, packages, homepage, testimonials }) {

  return (
    <SiteLayout title="Umrah Hub - الصفحة الرئيسية">
      <Hero homepage={homepage} />
      <Services services={services} title={homepage.services_title} description={homepage.services_description} />
      <SpecialPackages
        specialPackages={specialOffers}
        title={homepage.special_title}
        description={homepage.special_description}
        buttonText={homepage.special_button_text} />
      <AllPackages packages={packages}
        title={homepage.packages_title}
        description={homepage.packages_description}
        buttonText={homepage.packages_button_text}
      />
      <Testimonials testimonials={testimonials}
        title={homepage.testimonials_title}
        description={homepage.testimonials_description}
      />

    </SiteLayout>
  );
}
