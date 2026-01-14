export default function Alert({ type = 'success', message, onClose }) {
    if (!message) return null;

    return (
        <div className={type === 'success' ? 'alert-success flex justify-between' : 'alert-error flex justify-between'}>
            <span>{message}</span>
            <button onClick={onClose} className="font-bold">×</button>
        </div>
    );
}
