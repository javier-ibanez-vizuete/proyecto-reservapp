import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { Button } from "../components/UI/Button";
import { Container } from "../components/Container";

export const HomePage = () => {
    const { getText } = useContext(LanguageContext);

    return (
        <div className="flex flex-col flex-1">
            <Container>
                <h1>{getText("h1HomePage")}</h1>
            </Container>
        </div>
    );
};
