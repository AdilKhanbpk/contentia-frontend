"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; // Ensure this is imported correctly
import AdminComponent from "@/components/admin/admin/AdminComponent";

export default function Admin() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);

                if (decodedToken.role === "admin") {
                    setIsAuthorized(true);
                } else {
                    console.error(
                        "User is not authorized. Redirecting to /unauthorized..."
                    );
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                router.push("/contentiaio/authentication");
            }
        } else {
            router.push("/contentiaio/authentication");
        }
    }, [router]);

    if (!isAuthorized) {
        return null;
    }

    return (
        <>
            <AdminComponent />
        </>
    );
}
