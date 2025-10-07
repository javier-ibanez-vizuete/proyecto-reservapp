import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CTAButton = ({ text, href, onClick }) => {
    return (
        <div className="flex">
            <Link
                to={href}
                onClick={onClick}
                className="inline-flex items-center gap-2 bg-primary-color hover:bg-primary-color font-semibold px-8 py-4 rounded-lg transition-all duration-300 ease-in-out hover:gap-3 active:scale-95"
            >
                {text}
                <ArrowRight size={15} />
            </Link>
        </div>
    );
};
