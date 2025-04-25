import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AuthCallback = () => {
    const router = useRouter();

    useEffect(() => {
        const token = router.query.token as string;

        if (token) {
            // Store token in localStorage
            localStorage.setItem("accessToken", token);

            toast.success("Login successful");

            // Redirect to appropriate page
            router.push("/orders");
        }
    }, [router.query]);

    return <div>Loading...</div>;
};

export default AuthCallback;
