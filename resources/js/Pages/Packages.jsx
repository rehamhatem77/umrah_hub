import "../../css/style.css";
import { Head } from "@inertiajs/react";

import BreadCrumb from "./Site/Packages/Hero";
import PackagesGrid from "./Site/Packages/PackagesGrid";
import PackageFilter from "./Site/Packages/PackageFilter";

import SiteLayout from "@/Layouts/SiteLayout";

export const mockOffers = {
    data: [
        {
            id: 1,
            title: "باقة عمرة اقتصادية",
            offer_code: "UMR-101",
            price: 3500,
            duration_days: 10,
            available_places: 8,
            images: [
                {
                    image_path:
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuCBprjL_C3LGucTsb2qhzhhPjXjV9f2b8m-cuZXjR8JNiH5bsqh3MmbMVv8QJzjb-jb1Sr5y_MUeqPhPP9EdcjmM6j5vqmSCyDVaHmQWDxnM7jJ1CTK5V-wiZtFpQfP3AYyGbc4q9N9FVLwDfrouuZrzPhYnkkP-Uso-zohOV-oQzny_M-27l65H4sBoOuwflDa8GmkQ7eTKSkizq_TsQhK1rpbxB0z76cpzIV05P1cnjPjT15PHzFI_qBlgBq1-rMTPqR5DgjDgff6",
                },
            ],
            hotels: [{ city: "مكة" }, { city: "المدينة" }],
        },
        {
            id: 2,
            title: "باقة عمرة VIP",
            offer_code: "UMR-202",
            price: 7200,
            duration_days: 14,
            available_places: 3,
            images: [
                {
                    image_path:
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuCBprjL_C3LGucTsb2qhzhhPjXjV9f2b8m-cuZXjR8JNiH5bsqh3MmbMVv8QJzjb-jb1Sr5y_MUeqPhPP9EdcjmM6j5vqmSCyDVaHmQWDxnM7jJ1CTK5V-wiZtFpQfP3AYyGbc4q9N9FVLwDfrouuZrzPhYnkkP-Uso-zohOV-oQzny_M-27l65H4sBoOuwflDa8GmkQ7eTKSkizq_TsQhK1rpbxB0z76cpzIV05P1cnjPjT15PHzFI_qBlgBq1-rMTPqR5DgjDgff6",
                },
            ],
            hotels: [{ city: "مكة" }, { city: "المدينة" }],
        },
        {
            id: 3,
            title: "باقة عمرة عائلية",
            offer_code: "UMR-303",
            price: 5400,
            duration_days: 12,
            available_places: 15,
            images: [
                {
                    image_path:
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuCBprjL_C3LGucTsb2qhzhhPjXjV9f2b8m-cuZXjR8JNiH5bsqh3MmbMVv8QJzjb-jb1Sr5y_MUeqPhPP9EdcjmM6j5vqmSCyDVaHmQWDxnM7jJ1CTK5V-wiZtFpQfP3AYyGbc4q9N9FVLwDfrouuZrzPhYnkkP-Uso-zohOV-oQzny_M-27l65H4sBoOuwflDa8GmkQ7eTKSkizq_TsQhK1rpbxB0z76cpzIV05P1cnjPjT15PHzFI_qBlgBq1-rMTPqR5DgjDgff6",
                },
            ],
            hotels: [{ city: "مكة" }],
        },
        {
            id: 4,
            title: "باقة عمرة سريعة",
            offer_code: "UMR-404",
            price: 2800,
            duration_days: 7,
            available_places: 20,
            images: [
                {
                    image_path:
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuCBprjL_C3LGucTsb2qhzhhPjXjV9f2b8m-cuZXjR8JNiH5bsqh3MmbMVv8QJzjb-jb1Sr5y_MUeqPhPP9EdcjmM6j5vqmSCyDVaHmQWDxnM7jJ1CTK5V-wiZtFpQfP3AYyGbc4q9N9FVLwDfrouuZrzPhYnkkP-Uso-zohOV-oQzny_M-27l65H4sBoOuwflDa8GmkQ7eTKSkizq_TsQhK1rpbxB0z76cpzIV05P1cnjPjT15PHzFI_qBlgBq1-rMTPqR5DgjDgff6",
                },
            ],
            hotels: [],
        },
        {
            id: 5,
            title: "باقة عمرة فاخرة",
            offer_code: "UMR-505",
            price: 9800,
            duration_days: 14,
            available_places: 2,
            images: [
                {
                    image_path:
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuCBprjL_C3LGucTsb2qhzhhPjXjV9f2b8m-cuZXjR8JNiH5bsqh3MmbMVv8QJzjb-jb1Sr5y_MUeqPhPP9EdcjmM6j5vqmSCyDVaHmQWDxnM7jJ1CTK5V-wiZtFpQfP3AYyGbc4q9N9FVLwDfrouuZrzPhYnkkP-Uso-zohOV-oQzny_M-27l65H4sBoOuwflDa8GmkQ7eTKSkizq_TsQhK1rpbxB0z76cpzIV05P1cnjPjT15PHzFI_qBlgBq1-rMTPqR5DgjDgff6",
                },
            ],
            hotels: [{ city: "مكة" }, { city: "المدينة" }],
        },
        {
            id: 6,
            title: "باقة عمرة للشباب",
            offer_code: "UMR-606",
            price: 3100,
            duration_days: 9,
            available_places: 12,
            images: [
                {
                    image_path:
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuCBprjL_C3LGucTsb2qhzhhPjXjV9f2b8m-cuZXjR8JNiH5bsqh3MmbMVv8QJzjb-jb1Sr5y_MUeqPhPP9EdcjmM6j5vqmSCyDVaHmQWDxnM7jJ1CTK5V-wiZtFpQfP3AYyGbc4q9N9FVLwDfrouuZrzPhYnkkP-Uso-zohOV-oQzny_M-27l65H4sBoOuwflDa8GmkQ7eTKSkizq_TsQhK1rpbxB0z76cpzIV05P1cnjPjT15PHzFI_qBlgBq1-rMTPqR5DgjDgff6",
                },
            ],
            hotels: [{ city: "مكة" }],
        },
    ],

    links: [
        { url: null, label: "&laquo; Previous", active: false },
        { url: "#", label: "1", active: true },
        { url: "#", label: "2", active: false },
        { url: "#", label: "3", active: false },
        { url: "#", label: "Next &raquo;", active: false },
    ],
};

export default function Packages() {
    return (
        <SiteLayout title="Umrah Hub - الباقات">
            <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <BreadCrumb />
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <PackageFilter />
                    <PackagesGrid
                        offers={mockOffers}
                        filters={{}}
                        governorates={[]}
                        tripTypes={[]}
                        companies={[]}
                        hotels={[]}
                        counts={{}}
                    />
                </div>
            </div>
        </SiteLayout>
    );
}
