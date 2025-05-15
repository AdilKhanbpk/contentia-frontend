import ReactGA from "react-ga4";

export const initGA = (): void => {
    if (typeof window !== "undefined") {
        try {
            const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
            if (!measurementId) {
                console.warn("Google Analytics Measurement ID is not defined");
                return;
            }

            ReactGA.initialize(measurementId);
            console.log("Google Analytics initialized successfully");
        } catch (error) {
            console.error("Failed to initialize Google Analytics:", error);
        }
    }
};

export const logPageView = (path: string): void => {
    if (typeof window !== "undefined") {
        try {
            ReactGA.send({ hitType: "pageview", page: path });
        } catch (error) {
            console.error("Failed to log page view:", error);
        }
    }
};

export const logTimeOnPage = (path: string, duration: number): void => {
    if (typeof window !== "undefined") {
        try {
            ReactGA.event({
                category: "Engagement",
                action: "Time Spent",
                label: path,
                value: Math.round(duration / 1000), // Convert to seconds
            });
        } catch (error) {
            console.error("Failed to log time on page:", error);
        }
    }
};
