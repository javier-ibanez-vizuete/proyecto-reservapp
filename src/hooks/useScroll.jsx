import { useEffect, useState } from "react";

export const useScroll = () => {
    const [scroll, setScroll] = useState(window.scrollY);

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ behavior: "smooth", top: 0 });
    };

    return { scroll, scrollToTop };
};
