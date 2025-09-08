import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

export const HomePage = () => {
    const { getText } = useContext(LanguageContext);

    return (
        <section>
            <h1>{getText("h1HomePage")}</h1>
            <h2>Esto es un H2</h2>
            <h3>Esto es un H3</h3>
            <h4>Esto es un H4</h4>
            <h5>Esto es un H5</h5>
            <h6>Esto es un H6</h6>
        </section>
    );
};
