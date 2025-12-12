// Input Desktop: Use for desktop
// text size: 16px; Line height: 150%
// Padding: 12px; 24px

// Input Mobile: Use for mobile
// Text size: 16px; Line height: 150%
// Padding: 12px; 20px

export const Input = ({ ...props }) => {
    return (
        <input
            {...props}
            className={`bg-white focus-visible:outline-hidden outline-hidden text-text-color placeholder:text-text-color/50 rounded-xl py-md px-md border-0 focus:outline-none transition ${props.className}`}
        />
    );
};
