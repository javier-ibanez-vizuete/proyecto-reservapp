import { useCallback, useState } from "react";

export const useToggle = (givenOption = false) => {
    const [visible, setVisible] = useState(givenOption);

    if (typeof givenOption !== "boolean") return null;

    const toggleVisible = useCallback(() => setVisible((prev) => !prev), []);
    return [visible, toggleVisible];
};
