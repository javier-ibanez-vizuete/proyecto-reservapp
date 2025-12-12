import { memo, useContext } from "react";
import Calendar from "react-calendar";
import { ThemeContext } from "../contexts/ThemeContext";

export const BookingCalendar = memo(({ onChange, className = "", selectedDate, userConfig = true }) => {
    const { theme } = useContext(ThemeContext);

    const currentDate = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        today: new Date().getDate(),

        nextYear: new Date().getFullYear() + 1,
        nextMonth: new Date().getMonth(),
        nextDate: new Date().getDate(),
    };

    return (
        <div>
            <Calendar
                className={`${theme} ${className}`}
                minDetail="month"
                minDate={userConfig && new Date(currentDate.year, currentDate.month, currentDate.today)}
                maxDate={new Date(currentDate.nextYear, currentDate.nextMonth, currentDate.nextDate)}
                onChange={(date) => onChange(date)}
                defaultValue={selectedDate ? new Date(selectedDate) : null}
                value={selectedDate ? new Date(selectedDate) : null}
            />
        </div>
    );
});
