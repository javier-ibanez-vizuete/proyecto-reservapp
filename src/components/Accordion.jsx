import { useContext, useEffect, useRef, useState } from "react";

import iconArrow from "../assets/icons/icon-arrow-down.png";
import { LanguageContext } from "../contexts/LanguageContext";
import { ImageContainer } from "./ImageContainer";
import { ThemeContext } from "../contexts/ThemeContext";

export const AccordionItem = ({ title, content, defaultOpen = false }) => {
    const [open, setOpen] = useState(!!defaultOpen);
    const contentRef = useRef(null);

    const { theme } = useContext(ThemeContext);
    const { getText } = useContext(LanguageContext);

    useEffect(() => {
        const element = contentRef.current;
        if (!element) return;

        element.style.maxHeight = open ? `${element.scrollHeight}px` : "0px";
    }, [open, content]);

    return (
        <article
            className={`flex flex-col ${
                open ? "gap-xs" : ""
            } rounded-2xl cursor-pointer px-6 py-3 bg-gray-900/5`}
            onClick={() => setOpen((prevValue) => !prevValue)}
        >
            <header className="flex justify-between items-center gap-10">
                <h5 className="text-md">{getText(title)}</h5>
                <button className="flex justify-center items-center">
                    <ImageContainer
                        className={`w-6 transform transition-[rotate] duration-300 ease-in-out ${
                            open ? "rotate-180" : "rotate-0"
                        }`}
                    >
                        <img src={iconArrow} alt="Icon Arrow" />
                    </ImageContainer>
                </button>
            </header>

            <div
                ref={contentRef}
                className={"overflow-hidden max-h-0 transition-[max-height] duration-300 ease-in-out"}
            >
                <p>{getText(content)}</p>
            </div>
        </article>
    );
};

export const Accordion = ({ items = [], defaultOpen = 0 }) => {
    return (
        <div className="flex flex-col self-center gap-4 md:gap-8 max-w-[800px]">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item?.title}
                    content={item?.content}
                    defaultOpen={defaultOpen}
                />
            ))}
        </div>
    );
};
