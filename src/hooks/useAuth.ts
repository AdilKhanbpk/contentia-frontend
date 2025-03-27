import { Customer } from "@/types/interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<Customer>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    async function fetchUser() {
      const checkUser = localStorage.getItem("user");
      setUser(checkUser ? JSON.parse(checkUser) : null);
      setIsLoading(false);
      console.log(user?.role)
    }
    fetchUser();
  }, [router]);

  return { user, isLoading };
}
