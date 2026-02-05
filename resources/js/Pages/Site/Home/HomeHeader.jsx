import { useState, useEffect, useRef } from "react";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import NavLink from "@/Components/NavLink";
import { router } from '@inertiajs/react';

export default function HomeHeader({ onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const searchWrapperRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!searchWrapperRef.current?.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);



  useEffect(() => {
    const query = searchTerm.trim();
    if (query.length < 2) {
      setSearchResults([]);
      setDropdownOpen(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        // Call the Laravel search route (named route: packages.search)
        const response = await axios.get(route('packages.search'), {
          params: { q: query }, // query string ?q=...
        });

        // If the response is an array of offers, show them in the dropdown
        if (Array.isArray(response.data)) {
          setSearchResults(response.data);
          setDropdownOpen(true);
        } else {
          setSearchResults([]);
          setDropdownOpen(false);
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
        setDropdownOpen(false);
      }
    }, 300); // 300ms debounce


    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleSelect = (offer) => {
    router.get(route("packages.show", offer.slug));
    setDropdownOpen(false);
    setSearchTerm("");
  };


  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm">
      <div className="relative flex items-center justify-between px-6 lg:px-40 py-4">

        <div className="flex items-center gap-2 font-semibold z-50">
          <img src="/favicon.ico" alt="Umrah Hub" className="w-7 h-7" />
          <span className="text-lg text-[var(--app-primary)] font-bold">Umrah Hub</span>
        </div>


        <div className="hidden lg:flex items-center flex-1 gap-6">
          <div ref={searchWrapperRef} className="flex-1 max-w-md mr-9 relative">
            <input
              type="text"
              placeholder="ابحث عن الباقة بالاسم أو الكود..."
              className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => searchResults.length && setDropdownOpen(true)}
            />
            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />


            {dropdownOpen && (
              <div className="absolute top-full mt-2 w-full max-w-md bg-white rounded-xl shadow-xl z-50 overflow-hidden border border-gray-200">
                {searchResults.length > 0 ? (
                  <ul className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
                    {searchResults.map((offer) => (
                      <li key={offer.id}>
                        <button
                          type="button"
                          onClick={() => handleSelect(offer)}
                          className="w-full text-left px-4 py-3 hover:bg-[var(--app-primary)] hover:text-white cursor-pointer transition-colors duration-200 flex justify-between items-center text-gray-800"
                        >
                          <span>{offer.title}</span>
                          <span className="text-sm text-gray-500">{offer.offer_code}</span>
                        </button>
                      </li>
                    ))}
                  </ul>

                ) : (
                  <div className="px-4 py-3 text-gray-500 text-sm text-center">
                    لا توجد نتائج
                  </div>
                )}
              </div>
            )}

          </div>

          <nav className="flex gap-12 text-sm font-medium text-gray-700 mr-9">
            <NavLink href="/">الرئيسية</NavLink>
            <NavLink href="/packages">الباقات</NavLink>
            <NavLink href="/about">من نحن</NavLink>
            <NavLink href="/contact">تواصل معنا</NavLink>
          </nav>
        </div>


        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden z-50 flex items-center justify-center w-10 h-10 rounded-lg text-[var(--app-primary)] hover:bg-gray-100 transition"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>


      <div className={`fixed inset-0 z-40 transition-all duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div onClick={() => setMenuOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className={`absolute top-0 left-0 right-0 bg-white rounded-b-3xl shadow-xl transition-transform duration-300 ${menuOpen ? "translate-y-0" : "-translate-y-full"}`}>
          <nav className="relative flex flex-col items-center gap-6 py-8 text-lg font-medium text-gray-800">
            <div
              ref={searchWrapperRef}
              className="relative w-11/12 mx-auto mt-9"
            >
              <input
                type="text"
                placeholder="ابحث عن الباقة بالاسم أو الكود..."
                className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] shadow-sm"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => searchTerm.length >= 2 && setDropdownOpen(true)}
              />
              <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />

              {dropdownOpen && searchTerm.trim().length >= 2 && (
                <div
                  className="
        absolute
        top-full
        left-1/2
        -translate-x-1/2
        mt-2
        w-[92%]
        max-w-sm
        bg-white
        rounded-xl
        shadow-2xl
        z-50
        border
        overflow-hidden
      "
                >
                  {searchResults.length > 0 ? (
                    <ul className="max-h-60 overflow-y-auto divide-y">
                      {searchResults.map((offer) => (
                        <li key={offer.id}>
                          <button
                            onClick={() => handleSelect(offer)}
                            className="w-full px-4 py-3 text-right hover:bg-[var(--app-primary)] hover:text-white transition"
                          >
                            <div className="font-medium">{offer.title}</div>
                            <div className="text-xs opacity-70">
                              {offer.offer_code}
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500 text-center">
                      لا توجد نتائج
                    </div>
                  )}
                </div>
              )}
            </div>





            <NavLink href="/" onClick={() => setMenuOpen(false)}>الرئيسية</NavLink>
            <NavLink href="/packages" onClick={() => setMenuOpen(false)}>الباقات</NavLink>
            <NavLink href="/about" onClick={() => setMenuOpen(false)}>من نحن</NavLink>
            <NavLink href="/contact" onClick={() => setMenuOpen(false)}>تواصل معنا</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
