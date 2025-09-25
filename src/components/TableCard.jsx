import { Image } from "./UI/Image";
import { ImageContainer } from "./UI/ImageContainer";

import { useContext } from "react";
import iconWifi from "../assets/icons/icon-wifi.webp";
import { ThemeContext } from "../contexts/ThemeContext";
import { Button } from "./UI/Button";

export const TableCard = ({ tableData, onClick, selectedTable }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div
            className={`flex flex-col py-4 px-2 rounded-2xl gap-2 lg:gap-4 lg:justify-between ${
                tableData.tableId === selectedTable
                    ? "border-4 border-green-500"
                    : "border-4 border-transparent"
            } ${theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"}`}
        >
            <div className="perfect-center">
                <ImageContainer className={"w-20"}>
                    <Image imgSrc={tableData.icon} />
                </ImageContainer>
            </div>
            <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-col flex-1 gap-2">
                    <div className="flex flex-col flex-1">
                        <small>
                            Capacidad maxima: <span>{tableData.maxCapacity}</span>
                        </small>
                        <small>
                            tipo de mesa: <span>{tableData.tableForm}</span>
                        </small>
                    </div>
                    {tableData.hasWifi && (
                        <div className="flex items-center gap-4">
                            <small>Wifi:</small>
                            <ImageContainer className="w-8">
                                <Image imgSrc={iconWifi} />
                            </ImageContainer>
                        </div>
                    )}
                </div>
                <div className="perfect-center">
                    <Button size="sm" variant={"secondary"} onClick={onClick}>
                        Seleccionar Mesa
                    </Button>
                </div>
            </div>
        </div>
    );
};
