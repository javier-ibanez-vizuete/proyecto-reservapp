export const Toast = ({ message, type = "info", onClose }) => {
    const OPTIONS = {
        success: "border border-green-600 bg-green-500 text-text-color",
        error: "border border-red-600 bg-red-500 text-text-color",
        info: "border border-text-color bg-accent-background text-text-color",
    };

    const toastType = OPTIONS[type] || OPTIONS.info;

    return (
        <div className={`p-4 rounded-sm shadow-md ${toastType}`}>
            <div className="flex justify-between items-center">
                <span>{message}</span>
                <button onClick={onClose} className="ml-2 font-bold">
                    ✕
                </button>
            </div>
        </div>
    );
};
