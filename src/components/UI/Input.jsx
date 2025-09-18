// Input Desktop: Use for desktop
// text size: 16px; Line height: 150%
// Padding: 12px; 24px

import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

// Input Mobile: Use for mobile
// Text size: 16px; Line height: 150%
// Padding: 12px; 20px

export const Input = ({ ...props }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <input
            {...props}
            className={`bg-white focus-visible:outline-hidden outline-hidden placeholder:text-text-color/50 rounded-xl py-md px-6 border-0 focus:outline-none transition ${props.className}`}
        />
    );
};
