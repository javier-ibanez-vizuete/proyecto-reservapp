import classNames from "classnames";
import { useState } from "react";

/**
 * AccordionItem - A collapsible section component with animated expansion
 * @param {Object} props - Component properties
 * @param {string} props.title - The title displayed in the accordion header
 * @param {string|React.ReactNode} props.content - Content to display when expanded (string or JSX)
 * @param {boolean} [props.defaultOpen=false] - Whether the item should be expanded by default
 * @returns {JSX.Element} Rendered accordion item
 */
const AccordionItem = ({ title, content, defaultOpen = false }) => {
    const [open, setOpen] = useState(!!defaultOpen);

    const toggleOpen = () => setOpen((prev) => !prev);

    const sectionClasses = classNames(
        "flex flex-col gap-md md:gap-md p-md md:p-lg pb-0!",
        "rounded-2xl bg-brand-bg-darker cursor-pointer"
    );

    const iconClasses = classNames(
        "relative block h-4 w-4",
        "before:absolute before:inset-x-0 before:top-1/2",
        "before:h-[2px] before:-translate-y-1/2",
        "before:rounded before:bg-white",
        "after:absolute after:left-1/2 after:top-0",
        "after:h-4 after:w-[2px] after:-translate-x-1/2",
        "after:rounded after:bg-white transition",
        {
            "after:opacity-0": open,
            "after:opacity-100": !open,
        }
    );

    const containerClasses = classNames("grid transition-[grid-template-rows] duration-200 ease-out", {
        "pb-md md:pb-lg [grid-template-rows:1fr]": open,
        "[grid-template-rows:0fr]": !open,
    });

    const renderContent = () => {
        if (typeof content === "string") return <p>{content}</p>;
        return content;
    };

    return (
        <section className={sectionClasses} onClick={toggleOpen}>
            <header className="flex w-full items-center justify-between gap-4">
                <h5 className="font-sans">{title}</h5>

                <button
                    type="button"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full transition hover:bg-white/10"
                >
                    <span aria-hidden className={iconClasses} />
                </button>
            </header>

            <div className={containerClasses}>
                <div className="min-h-0 overflow-hidden">
                    <div>{renderContent()}</div>
                </div>
            </div>
        </section>
    );
};

/**
 * Accordion - A container component that renders multiple collapsible sections
 * @param {Object} props - Component properties
 * @param {Array<{title: string, content: string|React.ReactNode}>} [props.items=[]] - Array of accordion items
 * @param {number} [props.defaultOpen=0] - Index of the item that should be open by default
 * @returns {JSX.Element} Rendered accordion container with items
 *
 * @example
 * const items = [
 *   { title: "Section 1", content: "Content for section 1" },
 *   { title: "Section 2", content: <CustomComponent /> }
 * ];
 * <Accordion items={items} defaultOpen={0} />
 */
export const Accordion = ({ items = [], defaultOpen = 0 }) => {
    const renderAccordionItem = (item, index) => (
        <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            defaultOpen={index === defaultOpen}
        />
    );

    return <div className="flex flex-col gap-lg">{items.map(renderAccordionItem)}</div>;
};
