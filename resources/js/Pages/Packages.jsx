import "../../css/style.css";
import { Head, usePage } from "@inertiajs/react";

import BreadCrumb from "./Site/Packages/Hero";
import PackagesGrid from "./Site/Packages/PackagesGrid";
import PackageFilter from "./Site/Packages/PackageFilter";

import SiteLayout from "@/Layouts/SiteLayout";



export default function Packages({offers ,priceRange ,durationCounts}) {
     const { url } = usePage();
       const params = new URLSearchParams(url.split("?")[1]);
    const filter = params.get("filter"); 
    return (
        <SiteLayout title="Umrah Hub - الباقات">
            <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <BreadCrumb />
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <PackageFilter  priceRange={priceRange} counts={durationCounts}/>
                    <PackagesGrid
                        offers={offers}
                        currentFilter={offers.currentFilter}
                        special={filter}
                    />
                </div>
            </div>
        </SiteLayout>
    );
}
