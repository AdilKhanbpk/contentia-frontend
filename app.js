import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import expressSession from "express-session";
import http from "http";
import initializeSocketSetup from "./socket/socket.js";
import morgan from "morgan";
import logger from "./utils/logger/logger.js";
import passport from "passport";
import { googleSetup } from "./utils/googleAuthSetup/googleConfiguration.js";
import googleAuthRoutes from "./utils/googleAuthSetup/googleAuth.routes.js";

import { facebookSetup } from "./utils/facebookAuthSetup/facebookConfiguration.js";
import facebookAuthRoutes from "./utils/facebookAuthSetup/facebookAuth.routes.js";

import { appleSetup } from "./utils/appleAuthSetup/appleConfiguration.js";
import appleAuthRoutes from "./utils/appleAuthSetup/appleAuth.routes.js";

import userAuthRoutes from "./routes/user.routes.js";
import ordersRoute from "./routes/orders.routes.js";
import becomeCreatorRoute from "./routes/creator.routes.js";
import brandRoute from "./routes/brand.routes.js";
import revisionRoute from "./routes/revision.routes.js";
import passwordRoutes from "./routes/password.routes.js";
import appPasswordRoutes from "./routes/appPassword.routes.js";
import paymentRoute from "./routes/payment.route.js";
import parasutRoute from "./routes/parasut.routes.js";

// ADMIN ROUTES
import adminCustomerRoutes from "./routes/admin/adminCustomer.routes.js";
import adminCreatorRoutes from "./routes/admin/adminCreator.routes.js";
import adminLandingPageRoute from "./routes/admin/adminLandingPage.routes.js";
import adminCustomPackage from "./routes/admin/adminCustomPackage.routes.js";
import adminLandingPagePackage from "./routes/admin/adminPackage.routes.js";
import adminBannerRoute from "./routes/admin/adminBanner.routes.js";
import adminAboutRoute from "./routes/admin/adminAbout.routes.js";
import adminBlogRoute from "./routes/admin/adminBlog.routes.js";
import adminCouponRoute from "./routes/admin/adminCoupon.routes.js";
import adminFaqRoute from "./routes/admin/adminFaq.routes.js";
import adminHelpSupportRoute from "./routes/admin/adminHelpSupport.routes.js";
import adminHowItWorksRoute from "./routes/admin/adminHowItWorks.routes.js";
import adminOrderRoute from "./routes/admin/adminOrder.routes.js";
import adminPricingRoute from "./routes/admin/adminPricing.routes.js";
import adminAdditionalServiceRoute from "./routes/admin/adminAdditionalService.routes.js";
import adminInvoiceRoute from "./routes/admin/adminInvoice.routes.js";
import adminClaimsRoute from "./routes/admin/adminClaim.routes.js";
import adminNotificationRoute from "./routes/admin/adminNotification.routes.js";
import adminEmailNotificationRoute from "./routes/admin/adminEmailNotification.routes.js";
import adminDashboardRoute from "./routes/admin/adminDashboard.routes.js";
import adminIncomingPayments from "./routes/admin/adminIncomingPayment.routes.js";
import adminTermsAndConditionsRoute from "./routes/admin/adminT&C.route.js";
import adminFilesRoutes from "./routes/admin/adminFiles.routes.js";
import pageViewsRoute from "./routes/pageViews.route.js";
import analyticsTestRoute from "./routes/analytics-test.route.js";

// ApiError import removed as it's no longer used

const app = express();
const morganFormat =
    ":method :url :status :res[content-length] - :response-time ms :http-version - :user-agent";

app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const [
                    method,
                    url,
                    status,
                    contentLength,
                    responseTime,
                    httpVersion,
                    userAgent,
                ] = message.match(/(\S+)/g);

                const logObject = {
                    method,
                    url,
                    status,
                    contentLength: contentLength.replace(/[^0-9]/g, ""),
                    responseTime: responseTime.replace("ms", "").trim(),
                    httpVersion,
                    userAgent,
                };

                logger.info("", logObject);
            },
        },
    })
);

app.use(
    expressSession({
        name: "ammari",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
// Initialize authentication strategies
try {
    googleSetup(passport);
    facebookSetup(passport);
    // appleSetup(passport);
} catch (error) {
    console.error("Error initializing authentication strategies:", error);
    // Continue without failing the app startup
}

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// const corsOptions = {
//     origin: [
//         "http://localhost:3000",
//         "https://contentia-frontend-2mobnp3rn-saudkhanbpks-projects.vercel.app/api/v1",
//         "https://contentia-frontend-2mobnp3rn-saudkhanbpks-projects.vercel.app/api/v1/",
//         "https://contentia-frontend-2mobnp3rn-saudkhanbpks-projects.vercel.app/",
//         "https://contentia-frontend-2mobnp3rn-saudkhanbpks-projects.vercel.app",
//         // Add your Render frontend URL if different from the above
//         process.env.FRONTEND_URL
//     ].filter(Boolean), // Remove any undefined/null values
//     methods: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
//     allowedHeaders: "X-Requested-With, Content-Type, Authorization",
//     credentials: true,
// };

const corsOptions = {
    origin: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
    allowedHeaders: "X-Requested-With, Content-Type, Authorization",
    credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(cookieParser());

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "")));

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Add routes for the root path and health check to confirm the server is running
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Contentia API is running",
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
});


// Health check endpoint for monitoring
app.get("/health", (_req, res) => {
    res.status(200).json({
        status: "UP",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// API documentation endpoint
app.get("/api", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Contentia API",
        version: "1.0.0",
        baseUrl: "/api/v1",
        endpoints: {
            users: "/api/v1/users",
            orders: "/api/v1/orders",
            creators: "/api/v1/creators",
            brands: "/api/v1/brands",
            admin: {
                customers: "/api/v1/admin/customers",
                creators: "/api/v1/admin/creators",
                orders: "/api/v1/admin/orders",
                // Add other admin endpoints as needed
            }
        },
        documentation: "For more information, contact the development team"
    });
});

const server = http.createServer(app);
export const io = initializeSocketSetup(server);
app.set("io", io);

// Only use authentication routes if the required environment variables are set
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_CALLBACK_URL) {
    app.use("/", googleAuthRoutes);
}

if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET && process.env.FACEBOOK_CALLBACK_URL) {
    app.use("/", facebookAuthRoutes);
}

// app.use("/", appleAuthRoutes);

app.use("/api/v1/users", userAuthRoutes);
app.use("/api/v1/users", passwordRoutes);
app.use("/api/v1/creators", appPasswordRoutes);
app.use("/api/v1/orders", ordersRoute);
app.use("/api/v1/creators", becomeCreatorRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/page-views", pageViewsRoute);
app.use("/api/v1/revisions", revisionRoute);
app.use("/api/v1/analytics-test", analyticsTestRoute); // Test route for Google Analytics

// payment route
app.use("/api/paytr", paymentRoute);

// parasut route
app.use("/api/v1/parasut", parasutRoute);


// ADMIN ROUTES
app.use("/api/v1/admin/customers", adminCustomerRoutes);
app.use("/api/v1/admin/creators", adminCreatorRoutes);
app.use("/api/v1/admin/landingPage", adminLandingPageRoute);
app.use("/api/v1/admin/custom-packages", adminCustomPackage);
app.use("/api/v1/admin/packages", adminLandingPagePackage);
app.use("/api/v1/admin/faq", adminFaqRoute);
app.use("/api/v1/admin/banner", adminBannerRoute);
app.use("/api/v1/admin/howItWorks", adminHowItWorksRoute);
app.use("/api/v1/admin/about", adminAboutRoute);

app.use("/api/v1/admin/blogs", adminBlogRoute);
app.use("/api/v1/admin/coupons", adminCouponRoute);
app.use("/api/v1/admin/helpSupport", adminHelpSupportRoute);
app.use("/api/v1/admin/orders", adminOrderRoute);
app.use("/api/v1/admin/pricing", adminPricingRoute);
app.use("/api/v1/admin/additionalServices", adminAdditionalServiceRoute);
app.use("/api/v1/admin/invoices", adminInvoiceRoute);
app.use("/api/v1/admin/claims", adminClaimsRoute);
app.use("/api/v1/admin/notifications", adminNotificationRoute);
app.use("/api/v1/admin/emailNotifications", adminEmailNotificationRoute);
app.use("/api/v1/admin/dashboard", adminDashboardRoute);
app.use("/api/v1/admin/incomingPayment", adminIncomingPayments);
app.use("/api/v1/admin/terms", adminTermsAndConditionsRoute);
app.use("/api/v1/admin/files", adminFilesRoutes);
app.all("*", (req, res) => {
    const message = `Can't find ${req.originalUrl} on this server!`;
    logger.warn(message);
    res.status(404).json({
        success: false,
        message: message
    });
});

export { app, server };
