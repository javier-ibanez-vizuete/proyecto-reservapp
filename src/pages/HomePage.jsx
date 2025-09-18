import { useContext } from "react";
import { Container } from "../components/Container";
import { LanguageContext } from "../contexts/LanguageContext";

export const HomePage = () => {
    const { getText } = useContext(LanguageContext);

    return (
        <div className="flex flex-col flex-1">
            <Container className="">
                <h1>{getText("h1HomePage")}</h1>
            </Container>
        </div>
    );
};
