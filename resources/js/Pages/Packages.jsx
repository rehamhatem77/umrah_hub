import "./Site/Packages/packages.css";
import { Head, usePage, router } from "@inertiajs/react";

import BreadCrumb from "./Site/Packages/Hero";
import PackagesGrid from "./Site/Packages/PackagesGrid";
import PackageFilter from "./Site/Packages/PackageFilter";

import SiteLayout from "@/Layouts/SiteLayout";
import DurationCard from "./Site/Packages/DurationCard";

export default function Packages({
    offers,
    priceRange,
    durationCounts,
    governorates,
}) {
    const { url } = usePage();
    const queryString = url.includes("?") ? url.split("?")[1] : "";
    const params = new URLSearchParams(queryString);

    const filter = params.get("filter");
    const hasFilters = [...params.keys()].length > 0;

    const handleDurationClick = (days) => {
        router.get(
            route("packages"),
            {
                durations: [days],
            },
            {
                preserveScroll: true,
            },
        );
    };
    return (
        <SiteLayout title="الباقات">
            <div className="pattern-bg min-h-screen flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <BreadCrumb />

                {!hasFilters && (
                    <div className="flex-grow flex items-center justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8 w-full">
                            <DurationCard
                                imageSrc="storage/packages/7.jpg"
                                days={7}
                                count={durationCounts["7"]}
                                onClick={() => handleDurationClick(7)}
                            />
                            <DurationCard
                                imageSrc="storage/packages/10.jpg"
                                days={10}
                                count={durationCounts["10"]}
                                onClick={() => handleDurationClick(10)}
                            />
                            <DurationCard
                                imageSrc="storage/packages/14.jpg"
                                days={14}
                                count={durationCounts["14"]}
                                onClick={() => handleDurationClick(14)}
                            />
                        </div>
                    </div>
                )}

                {hasFilters && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <PackageFilter
                            priceRange={priceRange}
                            counts={durationCounts}
                            governorates={governorates}
                        />
                        <PackagesGrid
                            offers={offers}
                            currentFilter={offers.currentFilter}
                            special={filter}
                        />
                    </div>
                )}
            </div>
        </SiteLayout>
    );
}
