import { useToggle } from "./useToggle";

export const usePasswordVisibility = (option = false) => {
    const [visible, toggleVisible] = useToggle(option);

    return { visible, toggleVisible };
};
