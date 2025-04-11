"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { logPageView, logTimeOnPage } from "./Analytics";

const RouteChangeTracker: React.FC = () => {
    const pathname = usePathname();
    const startTimeRef = useRef<number>(Date.now());

    useEffect(() => {
        const duration = Date.now() - startTimeRef.current;
        logTimeOnPage(pathname, duration);

        logPageView(pathname);

        startTimeRef.current = Date.now();
    }, [pathname]);

    return null;
};

export default RouteChangeTracker;
