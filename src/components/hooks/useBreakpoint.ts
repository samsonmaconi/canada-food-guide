import { useState, useEffect } from "react";

export enum Breakpoints {
    sm="sm",
    md="md",
    lg="lg",
    xl="xl"
}

const useBreakpoint = () => {
    const [breakpoint, setBreakpoint] = useState(Breakpoints.sm);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width < 640) {
                setBreakpoint(Breakpoints.sm);
            } else if (width < 768) {
                setBreakpoint(Breakpoints.md);
            } else if (width < 1024) {
                setBreakpoint(Breakpoints.lg);
            } else {
                setBreakpoint(Breakpoints.xl);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return breakpoint;
};

export default useBreakpoint;