export default function InfoItem({ icon, label, value, iconColor = '', full }) {
    if (!value) return null;

    return (
        <div
            className={`flex items-center gap-3 p-4 border rounded-xl bg-gray-50 shadow-sm hover:shadow transition
            ${full ? 'col-span-full' : ''}`}
        >
            <div className={`text-xl ${iconColor}`}>
                {icon}
            </div>
            <div>
                <div className="text-gray-500 text-xs mb-0.5">{label}</div>
                <div className="font-medium text-gray-800 leading-relaxed">
                    {value}
                </div>
            </div>
        </div>
    );
}
