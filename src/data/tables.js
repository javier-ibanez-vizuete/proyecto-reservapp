import iconTableRound2 from "../assets/icons/icons-tables/icon-round-table-for-2.webp";
import iconTableSquare2 from "../assets/icons/icons-tables/icon-square-table-for-2.webp";

import iconTableRectangular4 from "../assets/icons/icons-tables/icon-rectangular-table-for-4.webp";
import iconTableRound4 from "../assets/icons/icons-tables/icon-round-table-for-4.webp";
import iconTableSquare4 from "../assets/icons/icons-tables/icon-square-table-for-4.webp";

import iconTableRectangular6 from "../assets/icons/icons-tables/icon-rectangular-table-for-6.webp";

import iconTableRectangular8 from "../assets/icons/icons-tables/icon-rectangular-table-for-8.webp";
import iconTableRound8 from "../assets/icons/icons-tables/icon-round-table-for-8.webp";

export const TABLES = [
    {
        tableId: "table-square-1",
        maxCapacity: 2,
        tableForm: "squareTableForm",
        hasWifi: true,
        icon: iconTableSquare2,
    },
    {
        tableId: "table-round-1",
        maxCapacity: 2,
        tableForm: "roundTableForm",
        hasWifi: false,
        icon: iconTableRound2,
    },
    {
        tableId: "table-square-2",
        maxCapacity: 4,
        tableForm: "squareTableForm",
        hasWifi: true,
        icon: iconTableSquare4,
    },
    {
        tableId: "table-round-2",
        maxCapacity: 4,
        tableForm: "roundTableForm",
        hasWifi: true,
        icon: iconTableRound4,
    },
    {
        tableId: "table-rectangular-1",
        maxCapacity: 4,
        tableForm: "rectangularTableForm",
        hasWifi: true,
        icon: iconTableRectangular4,
    },
    {
        tableId: "table-rectangular-2",
        maxCapacity: 6,
        tableForm: "rectangularTableForm",
        hasWifi: false,
        icon: iconTableRectangular6,
    },
    {
        tableId: "table-round-3",
        maxCapacity: 8,
        tableForm: "roundTableForm",
        hasWifi: true,
        icon: iconTableRound8,
    },
    {
        tableId: "table-rectangular-3",
        maxCapacity: 8,
        tableForm: "rectangularTableForm",
        hasWifi: true,
        icon: iconTableRectangular8,
    },
];
