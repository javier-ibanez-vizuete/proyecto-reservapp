import { useContext } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import { ThemeContext } from "../contexts/ThemeContext";

export const BookingCalendar = ({ onChange }) => {
    const { theme } = useContext(ThemeContext);

    const currentDate = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        today: new Date().getDate(),

        nextYear: new Date().getFullYear() + 1,
        nextMonth: new Date().getMonth(),
        nextDate: new Date().getDate(),
    };

    const classDaysGenerator = (date) => {
        if (date.getDay() === 0) return "sunday";
        if (date.getDay() !== 0) return "regularDay";
    };

    return (
        <div className="perfect-center lg:w-[700px] ">
            <Calendar
                className={`${theme} w-full shadow-lg`}
                minDetail="month"
                minDate={new Date(currentDate.year, currentDate.month, currentDate.today)}
                maxDate={new Date(currentDate.nextYear, currentDate.nextMonth, currentDate.nextDate)}
                onChange={(date) => onChange(date)}
                tileClassName={({ date }) => {
                    if (date.getDay() === 0) return "sunday";
                    return null;
                }}
            />
        </div>
    );
};
