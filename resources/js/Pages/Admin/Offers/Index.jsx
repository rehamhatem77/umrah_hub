import OfferCard from '@/Components/OfferCard';
import StatusPill from '@/Components/StatusPill';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaRegBuilding, FaWindowRestore } from 'react-icons/fa';
import {
  FiEdit2,
  FiTrash2,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiEye,
  FiChevronLeft,
  FiSearch,
  FiGift,
  FiAlertTriangle
} from 'react-icons/fi';
import Select from 'react-select';
import { TbRestore } from "react-icons/tb";
import { FaMapLocationDot } from 'react-icons/fa6';
import { MdOutlineCategory, MdOutlineHotel } from 'react-icons/md';
import Modal from '@/Components/Modal';



const cardMotion = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export default function Index({ offers, filters, governorates = [],
  tripTypes = [],
  companies = [],
  
  hotels = [], counts = {} }) {

  const [filterState, setFilterState] = useState({
    governorate_id: filters?.governorate_id || null,
    trip_type_id: filters?.trip_type_id || null,
    company_id: filters?.company_id || null,
    hotel_id: filters?.hotel_id || null,
    status: filters?.status || 'all',
    search: filters?.search || null,
  });
  const noOptionsMessage = () => 'لا توجد خيارات متاحة';
  const [deleteModal, setDeleteModal] = useState(false);
const [selectedOfferId, setSelectedOfferId] = useState(null);



  const selectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: '30px',
      borderRadius: '5px',
      // borderColor: frontendErrors.name
      //   ? '#ef4444'
      //   : state.isFocused
      //     ? 'var(--app-primary)'
      //     : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(15,61,46,.12)' : 'none',
      cursor: 'default',
      transition: 'all 0.2s ease',
      '&:hover': { borderColor: 'var(--app-primary)', cursor: 'default' },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? 'var(--app-primary)'
        : state.isFocused
          ? 'rgba(15,61,46,0.08)'
          : '#fff',
      color: state.isSelected ? '#fff' : state.isDisabled ? '#9ca3af' : '#333',
      cursor: state.isDisabled ? 'not-allowed' : 'default',
      padding: '6px 12px',
    }),
    placeholder: (base) => ({ ...base, color: '#9ca3af' }),
  };




  const governorateOptions = governorates.map(gov => ({
    value: gov.id,
    label: gov.name,
  }));

  const tripTypeOptions = tripTypes.map(type => ({
    value: type.id,
    label: type.name,
  }));

  const companyOptions = companies.map(company => ({
    value: company.id,
    label: company.name,
  }));
  const hotelOptions = hotels.map(hotel => ({
    value: hotel.id,
    label: hotel.name,
  }));

  const statusOptions = [
    { value: 'all', label: 'جميع الباقات' },
    { value: 'active', label: 'نشط' },
    { value: 'inactive', label: 'غير نشط' },
    { value: 'expired', label: 'باقات منتهية' },
  ];


  const statusCounts = {
    active: counts.active || 0,
    inactive: counts.inactive || 0,
    expired: counts.expired || 0,
    all: counts.all || 0,
  };


  const hasActiveFilters = Object.entries(filterState).some(
    ([key, value]) => value !== null && value !== 'all'
  );

  const applyFilters = (newFilters) => {
    router.get(
      route('admin.offers.index'),
      newFilters,
      {
        preserveState: true,
        replace: true,
      }
    );
  };
  const handleReset = () => {
    const resetState = {
      governorate_id: null,
      trip_type_id: null,
      company_id: null,
      hotel_id: null,
      status: 'all',
    };

    setFilterState(resetState);
    applyFilters(resetState);
  };

  const openDeleteModal = (offerId) => {
     setSelectedOfferId(offerId);
    setDeleteModal(true);
  }

const handleDeleteClick = () => {
  if (!selectedOfferId) return;

  router.delete(
    route('admin.offers.destroy', selectedOfferId),
    {
      preserveScroll: true,
      onSuccess: () => {
        setDeleteModal(false);
        setSelectedOfferId(null);
      }
    }
  );
};




  return (
    <AuthenticatedLayout>
      <div className=" px-3 sm:px-6 space-y-6">


        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
          <span>لوحة التحكم</span>
          <FiChevronLeft />
          <span className="text-[var(--app-primary)] font-medium">الباقات</span>
        </div>


        {/* <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-[var(--app-primary)]">
            إدارة العروض
          </h1>

          <button
            onClick={() => router.get(route('admin.offers.create'))}
            className="btn-primary"
          >
            إضافة عرض
          </button>
        </div> */}


        <div className=" max-w-7xl w-full flex flex-col gap-4 mb-6">


          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FiGift className="text-2xl text-[var(--app-primary)]" />
                <h1 className="text-xl font-bold">إدارة الباقات</h1>
              </div>
              <p className="text-slate-500 mt-1">
                تحكم في جميع باقات الحج والعمرة المتاحة على المنصة
              </p>
            </div>

            <div className="flex gap-2">
             
              <button
              onClick={() => router.get(route('admin.offers.create'))}
              className="btn-primary flex items-center gap-2"
            >
              <span className="text-lg">+</span>
              إضافة باقة جديدة
            </button>
            <button
                        onClick={() => router.get(route('admin.offers.trash'))}
                        className="w-fit flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                    >
                        <FiTrash2 /> سلة المحذوفات
                    </button>
            </div>
          </div>


          <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg flex flex-wrap items-end gap-4">


            <div className="flex-1 min-w-[50px]">
              <label className="block text-xs font-bold text-slate-600 mb-2 mr-1 uppercase">
                <FaMapLocationDot className="inline mb-1" /> المحافظة
              </label>
              <Select
                options={governorateOptions}
                noOptionsMessage={noOptionsMessage}
                placeholder=" الكل"
                styles={selectStyles}
                value={governorateOptions.find(o => o.value === filterState.governorate_id) || null}
                onChange={(option) => {
                  setFilterState({
                    ...filterState,
                    governorate_id: option?.value || null,
                  });
                }}
                className="text-sm"
                classNamePrefix="rs"
              />



            </div>


            <div className="flex-1 min-w-[50px]">
              <label className="block text-xs font-bold text-slate-600 mb-2 mr-1 uppercase">
                <MdOutlineCategory className="inline mb-1" /> نوع الرحلة
              </label>

              <Select
                options={tripTypeOptions}
                noOptionsMessage={noOptionsMessage}
                placeholder="الكل"
                styles={selectStyles}
                value={tripTypeOptions.find(
                  o => o.value === filterState.trip_type_id
                ) || null}
                onChange={(option) => {
                  setFilterState({
                    ...filterState,
                    trip_type_id: option?.value || null,
                  });

                }}
                className="text-sm"
                classNamePrefix="rs"
              />

            </div>
            <div className="flex-1 min-w-[50px]">
              <label className="block text-xs font-bold text-slate-600 mb-2 mr-1 uppercase">
                <FaRegBuilding className="inline mb-1" /> شركة السياحة
              </label>

              <Select
                options={companyOptions}
                noOptionsMessage={noOptionsMessage}
                placeholder="الكل"
                styles={selectStyles}
                value={companyOptions.find(
                  o => o.value === filterState.company_id
                ) || null}
                onChange={(option) => {
                  setFilterState({
                    ...filterState,
                    company_id: option?.value || null,
                  });

                }}
                className="text-sm"
                classNamePrefix="rs"
              />

            </div>
            <div className="flex-1 min-w-[50px]">
              <label className="block text-xs font-bold text-slate-600 mb-2 mr-1 uppercase">
                <MdOutlineHotel className="inline mb-1" /> الفندق
              </label>

              <Select
                options={hotelOptions}
                noOptionsMessage={noOptionsMessage}
                placeholder="الكل"
                styles={selectStyles}
                value={hotelOptions.find(
                  o => o.value === filterState.hotel_id
                ) || null}
                onChange={(option) => {
                  setFilterState({
                    ...filterState,
                    hotel_id: option?.value || null,
                  });

                }}
                className="text-sm"
                classNamePrefix="rs"
              />

            </div>

            <div className="flex gap-2">
              <button
                onClick={() => applyFilters(filterState)}
                className="h-11 px-4 bg-white border border-slate-200 text-slate-700 rounded-lg font-bold text-sm hover:bg-slate-100 flex items-center gap-2">
                تصفية
              </button>

              <button onClick={handleReset} title="إعادة تعيين الفلاتر">
                <TbRestore
                  className="btn-primary bg-[var(--app-primary)] p-2 rounded-full "
                  size={30}
                />
              </button>



            </div>


          </div>
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg ">

            <div className="flex-1 min-w-[200px] flex items-center gap-3 ">
              <FiSearch className="inline mb-1 mr-1 text-slate-500" />
              <input
                type="text"
                placeholder="ابحث عن باقة من اختيارك باستخدام اسم أو كود الباقة..."
                value={filterState.search || ''}
                onChange={(e) => {
                  const newState = {
                    ...filterState,
                    search: e.target.value || null,
                  };
                  setFilterState(newState);
                  applyFilters(newState);
                }}
                className="input w-full focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)] "
              />
            </div>


          </div>



          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {statusOptions.map(status => (
              <StatusPill
                key={status.value}
                label={status.label}
                count={statusCounts[status.value] || 0}
                active={filterState.status === status.value}
                onClick={() => {
                  const newState = { ...filterState, status: status.value };
                  setFilterState(newState);
                  applyFilters(newState);
                }}
              />
            ))}
          </div>



        </div>

        {offers?.data?.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-600">
            {hasActiveFilters ? (
              <>
                <p className="text-lg font-bold mb-1">لا توجد نتائج</p>
                <p className="text-sm">
                  لا توجد عروض مطابقة لخيارات البحث الحالية
                </p>
              </>
            ) : (
              <>
                <p className="text-lg font-bold mb-1">لا توجد عروض حالياً</p>
                <p className="text-sm">
                  لم يتم إضافة أي عروض بعد
                </p>
              </>
            )}
          </div>
        )}


        {offers?.data?.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.data.map(offer => (
              <OfferCard key={offer.id} offer={offer} handleDeleteClick={openDeleteModal} />
            ))}
          </div>
        )}



        {offers?.data?.length > 0 && offers.links && (
          <div className="flex justify-center gap-1 flex-wrap text-sm">
            {offers.links.map((link, idx) => {
              let label = '';
              const toArabicNumbers = (num) => {
                const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
                return num.toString().split('').map(d => arabicNumbers[d] || d).join('');
              };

              if (link.label.includes('Previous')) label = '«';
              else if (link.label.includes('Next')) label = '»';
              else label = toArabicNumbers(link.label.replace(/&laquo;|&raquo;/g, ''));

              return (
                <button
                  key={idx}
                  onClick={() => link.url && router.get(link.url, {}, { preserveState: true, replace: true })}
                  className={`px-2 py-1 rounded border ${link.active
                    ? 'bg-[var(--app-primary)] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  disabled={!link.url}
                  dangerouslySetInnerHTML={{ __html: label }}
                />
              );
            })}
          </div>
        )}




         <Modal show={deleteModal} title="تأكيد الحذف" onClose={() => setDeleteModal(false)}>
                            <div className="text-center space-y-3">
                                <FiAlertTriangle className="text-3xl mx-auto text-red-500" />
                                <p>هل أنت متأكد من حذف هذه الباقة؟</p>
                                <div className="flex gap-2">
                                    <button onClick={() => setDeleteModal(false)} className="btn-secondary flex-1">إلغاء</button>
                                    <button onClick={handleDeleteClick} className="btn-danger flex-1">حذف</button>
                                </div>
                            </div>
                        </Modal>
      </div>
    </AuthenticatedLayout>
  );
}
