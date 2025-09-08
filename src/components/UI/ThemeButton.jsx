// ThemeButton.jsx
// Componente React (JSX) que reproduce el switch 'sun / moon' usando Tailwind CSS
// - Usa clases de Tailwind para la mayor parte del estilo
// - Añade un pequeño bloque <style> para definir keyframes (rotación / inclinación)
// - El input es "uncontrolled" por simplicidad; si quieres controlarlo desde React
//   exporta el estado (onChange / checked) o conéctalo a contexto.

import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export const ThemeButton = () => {
    const { theme, onToggleTheme } = useContext(ThemeContext);

    return (
        <label
            htmlFor="theme-toggle"
            className="block relative w-16 h-8 text-[17px] shadow-2xs rounded-4xl cursor-pointer"
        >
            <span className="tb-sun pointer-events-none absolute top-1 left-9 z-10 w-6 h-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
                    <g fill="#ffd43b">
                        <circle r="5" cy="12" cx="12"></circle>
                        <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path>
                    </g>
                </svg>
            </span>

            <span className="tb-moon pointer-events-none absolute top-1 left-1 z-10 w-6 h-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-full h-full">
                    <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
                </svg>
            </span>

            {/* Input checkbox (hidden) - usamos `peer` para estados basados en checked */}
            <input
                id="theme-toggle"
                type="checkbox"
                onChange={onToggleTheme}
                className="sr-only"
                checked={theme === "dark" ? true : false}
                aria-label="Button to toggle Theme"
            />

            {/* Slider */}
            <span
                className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                    theme === "dark" ? "bg-background-color" : "bg-accent-color"
                }`}
                aria-hidden
            >
                {/* Knob: usamos un span interno para poder transformar con translate */}
                <span
                    className={`absolute left-[2px] bottom-[2px] m-[2px] h-6 w-6 rounded-[20px] z-20 transform transition-transform duration-200 ${
                        theme === "dark" ? "translate-x-8 bg-background-color-dark" : "bg-background-color"
                    }`}
                />
            </span>
        </label>
    );
};
