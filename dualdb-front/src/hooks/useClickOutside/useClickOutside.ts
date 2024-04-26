import { RefObject, useEffect } from "react";

export const useClickOutside = <T extends HTMLElement>(
        target: T | null | RefObject<T | null>, 
        onClickOutside: () => void, 
        keepFocus: boolean = true
    ) => {
        
    useEffect(() => {
        const handleClickOut = (event: MouseEvent) => {
            if (!keepFocus) 
                return onClickOutside();

            if (!target) return;

            const targetElement = target instanceof HTMLElement ?
                target : target.current;
            
            if (targetElement && !targetElement.contains(event.target as Node))
                onClickOutside();
        }

        document.addEventListener('mousedown', handleClickOut);

        return () => { document.removeEventListener('mousedown', handleClickOut) };
    }, [target, onClickOutside, keepFocus]);
}