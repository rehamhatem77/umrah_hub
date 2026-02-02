import "../../css/style.css";
import { Head } from "@inertiajs/react";

import HomeHeader from "./Site/Home/HomeHeader";
import { FiAtSign, FiCalendar, FiSearch } from "react-icons/fi";
import { FaLocationPin } from "react-icons/fa6";
import { MdLocationCity, MdMoney } from "react-icons/md";
import Hero from "./Site/PackageDetails/Hero";

import BookingCard from "./Site/PackageDetails/BookingCard";

import PackageHeader from "./Site/PackageDetails/PackageHeader";
import OverviewSection from "./Site/PackageDetails/OverviewSection";
import ItinerarySection from "./Site/PackageDetails/ItinerarySection";
import HotelsSection from "./Site/PackageDetails/HotelsSection";
import InclusionsSection from "./Site/PackageDetails/InclusionsSection";


import Footer from "@/Components/Footer";
import SiteLayout from "@/Layouts/SiteLayout";

export default function PackageDetails() {
    return (
        <SiteLayout title="Umrah Hub - عنوان الباقة">
            <div class="layout-container flex flex-col min-h-screen">
                <div class="flex-1 flex justify-center py-6 lg:py-10 px-4 sm:px-6 lg:px-8">
                    <div class="flex flex-col max-w-7xl w-full gap-8">
                        <div className="row">
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
                                            <span className="text-gray-400 text-sm font-medium leading-normal">
                                                /
                                            </span>
                                            <span className="text-gray-400 text-sm font-medium leading-normal">
                                                باقات رمضان
                                            </span>
                                            <span className="text-gray-400 text-sm font-medium leading-normal">
                                                /
                                            </span>
                                            <span className="text-[#111813] text-sm font-medium leading-normal">
                                                باقة العشر الأواخر المميزة
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Hero />
                        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
                            <div class="lg:col-span-8 flex flex-col gap-10">
                                <PackageHeader />
                                <OverviewSection />
                                <ItinerarySection />
                                <HotelsSection />
                                <InclusionsSection />
                            </div>
                            <div class="lg:col-span-4 relative">
                                <BookingCard />
                            </div>
                        </div>

                       
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}
