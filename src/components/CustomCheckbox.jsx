import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const CustomCheckbox = ({ checked, title = "", description = "", onChange }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`flex`}>
            <label
                className={`block cursor-pointer rounded-lg shadow-md ${
                    theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                }  p-4 transition-all duration-200`}
            >
                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => onChange(event)}
                        className="sr-only"
                    />
                    <div
                        className={`w-6 h-6 border-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                            checked ? "bg-primary-color border-primary-color" : "border-gray-500"
                        }`}
                    >
                        {checked && (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        )}
                    </div>
                    <div className="flex-1">
                        <p>{title}</p>
                        {description && <small>{description}</small>}
                    </div>
                </div>
            </label>
        </div>
    );
};
