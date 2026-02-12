import Modal from '@/Components/Modal';
import {
    FiMapPin, FiCalendar, FiClock, FiUsers, FiStar,
    FiCheckCircle, FiShield, FiHeart, FiWifi, FiCoffee, FiPhone,
    FiShoppingCart,
    FiUmbrella,
    FiGift,
} from 'react-icons/fi';


import {
    FaKaaba, FaMosque, FaPlaneDeparture, FaPlaneArrival,
    FaBus, FaHotel, FaConciergeBell, FaUserFriends, FaPrayingHands,
    FaSuitcaseRolling,
    FaSwimmer,FaPlane
} from 'react-icons/fa';
import { FaCarSide, FaPassport, FaUmbrellaBeach, FaUtensils } from 'react-icons/fa6';
import { HiOutlineHeart, HiOutlineShieldCheck, HiOutlineSparkles } from 'react-icons/hi';


import * as HiIcons from 'react-icons/hi';
import * as FiIcons from 'react-icons/fi';
import * as FaIcons from 'react-icons/fa';
import * as Fa6Icons from 'react-icons/fa6';


export const iconsMap = {
  ...HiIcons,
  ...FiIcons,
  ...FaIcons,
  ...Fa6Icons,
};

export const umrahHajjIcons = [
    { icon: FaKaaba, label: 'زيارة الحرم' },
    { icon: FaMosque, label: 'قريب من المسجد' },
    { icon: FiMapPin, label: 'موقع مميز' },
    { icon: FiCalendar, label: 'برنامج منظم' },
    { icon: FiClock, label: 'التزام بالمواعيد' },
    { icon: FiUsers, label: 'مجموعات منظمة' },
    { icon: FaUserFriends, label: 'مرشد ديني' },
    { icon: FaPrayingHands, label: 'إشراف ديني' },
    { icon: FaHotel, label: 'فندق مميز' },
    { icon: FiStar, label: 'تصنيف عالي' },
    { icon: FiWifi, label: 'واي فاي مجاني' },
    { icon: FiCoffee, label: 'إفطار مجاني' },
    { icon: FaConciergeBell, label: 'خدمة فندقية' },
    { icon: FaPlaneDeparture, label: 'ذهاب مباشر' },
    { icon: FaPlaneArrival, label: 'عودة مباشرة' },
    { icon: FaSuitcaseRolling, label: 'أمتعة مشمولة' },
    { icon: FaBus, label: 'باصات مكيفة' },
    { icon: FiShield, label: 'رحلة آمنة' },
    { icon: FiCheckCircle, label: 'خدمة مضمونة' },
    { icon: FiHeart, label: 'راحة الحجاج' },
    { icon: FiPhone, label: 'دعم فني' },
    { icon: FiShoppingCart, label: 'تسوق' },
    { icon: FiUmbrella, label: 'أنشطة خارجية' },
    { icon: FiGift, label: 'هدايا تذكارية' },
    { icon: FaSwimmer, label: 'حمام سباحة' },
    { icon: FaUmbrellaBeach, label: 'شاطئ قريب' },
    { icon: FaUtensils, label: 'مطاعم' },
    { icon: FaPassport, label: 'جواز سفر' },
    { icon: FaCarSide, label: 'نقل خاص' },
    { icon: FaPlane, label: 'حجز طيران' },
    { icon: FaBus, label: 'نقل ومواصلات' },
    {icon: HiOutlineHeart ,lable:"الروحانية أولاً"},
    {icon:HiOutlineSparkles,lable:"اليسر والسهولة"},
    {icon:HiOutlineShieldCheck,lable:"النزاهة والشفافية"},


];

export default function IconPicker({ show, onClose, onSelect }) {
    return (
        <Modal show={show} title="اختر أيقونة" onClose={onClose}>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 max-h-[60vh] overflow-y-auto">
                {umrahHajjIcons.map(({ icon: Icon, label }) => (
                        <button
                            key={label}
                            onClick={() => {
                                const iconName = Object.keys(iconsMap).find(k => iconsMap[k] === Icon) || Icon.name || null;
                                onSelect({ icon: iconName, label });
                            }}
                            className="border rounded-lg p-3 hover:border-[var(--app-primary)] flex flex-col items-center gap-1 transition"
                        >
                            <Icon className="text-xl text-[var(--app-primary)]" />
                        </button>
                ))}
            </div>
        </Modal>
    );
}
