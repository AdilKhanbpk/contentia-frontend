import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { logPageView, logTimeOnPage } from "./Analytics";

const RouteChangeTracker: React.FC = () => {
    const router = useRouter();
    const [startTime, setStartTime] = useState<number>(Date.now());

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            const duration = Date.now() - startTime;
            logTimeOnPage(router.pathname, duration);

            logPageView(url);
            setStartTime(Date.now());
        };

        router.events.on("routeChangeComplete", handleRouteChange);

        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router, startTime]);

    return null;
};

export default RouteChangeTracker;
