import "../../css/style.css";
import { Head } from "@inertiajs/react";

import HomeHeader from "./Site/Home/HomeHeader";
import { FiAtSign, FiCalendar, FiChevronLeft, FiSearch } from "react-icons/fi";
import { FaLocationPin } from "react-icons/fa6";
import { MdLocationCity, MdMoney } from "react-icons/md";
import Hero from "./Site/PackageDetails/Hero";

import BookingCard from "./Site/PackageDetails/BookingCard";

import PackageHeader from "./Site/PackageDetails/PackageHeader";
import OverviewSection from "./Site/PackageDetails/OverviewSection";
import ItinerarySection from "./Site/PackageDetails/ItinerarySection";
import HotelsSection from "./Site/PackageDetails/HotelsSection";
import InclusionsSection from "./Site/PackageDetails/InclusionsSection";
import { Helmet } from "react-helmet";

import Footer from "@/Components/Footer";
import SiteLayout from "@/Layouts/SiteLayout";

export default function PackageDetails({ offer }) {
    const imageUrl = offer.image?.startsWith("http")
        ? offer.image
        : `${window.location.origin}${offer.image}`;
    return (
        <>

            <SiteLayout title={`Umrah Hub - ${offer.title}`}>
                <div className="pattern-bg layout-container flex flex-col min-h-screen">
                    <div className="flex-1 flex justify-center py-6 lg:py-10 px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col max-w-7xl w-full gap-8">
                            <div className="row">
                                <div className="w-full ">
                                    <div className="flex justify-center">
                                        <div className="w-full max-w-[1440px] px-4 md:px-10 lg:px-30">
                                            <div className="flex flex-wrap gap-2 py-1">
                                                <a
                                                    className="text-gray-500 hover:text-primary text-sm font-medium leading-normal"
                                                    href="/"
                                                >
                                                    الرئيسية
                                                </a>
                                                <FiChevronLeft
                                                    size={18}
                                                    className="material-symbols-outlined text-base text-[#dce5df] "
                                                />
                                                <a
                                                    className="text-gray-500 hover:text-primary text-sm font-medium leading-normal"
                                                    href="/packages"
                                                >
                                                    الباقات
                                                </a>
                                                <FiChevronLeft
                                                    size={18}
                                                    className="material-symbols-outlined text-base text-[#dce5df] "
                                                />
                                                <span className="text-[#111813] text-sm font-medium leading-normal">
                                                    {offer.title}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Hero data={offer} />
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
                                <div className="lg:col-span-8 flex flex-col gap-10">
                                    <PackageHeader data={offer} />
                                    <OverviewSection data={offer} />
                                    <ItinerarySection program={offer.program} />
                                    <HotelsSection hotels={offer.hotels} />
                                    <InclusionsSection
                                        price_contain={offer.price_contain}
                                        price_not_contain={
                                            offer.price_not_contain
                                        }
                                    />
                                </div>
                                <div className="lg:col-span-4 relative">
                                    <BookingCard data={offer} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SiteLayout>
        </>
    );
}
