import ReactGA from "react-ga4";

export const initGA = (): void => {
    if (typeof window !== "undefined") {
        ReactGA.initialize(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "");
    }
};

export const logPageView = (path: string): void => {
    if (typeof window !== "undefined") {
        ReactGA.send({ hitType: "pageview", page: path });
    }
};

export const logTimeOnPage = (path: string, duration: number): void => {
    if (typeof window !== "undefined") {
        console.log("🚀 ~ logTimeOnPage ~ path:", path);
        console.log("🚀 ~ logTimeOnPage ~ duration:", duration);
        ReactGA.event({
            category: "Engagement",
            action: "Time Spent",
            label: path,
            value: Math.round(duration / 1000), // Convert to seconds
        });
    }
};
