import { AuthenticationApiRepository } from "@data/api/authentication-api-repository";
import useGlobalHooks from "@hooks/global-hooks";
import { useEffect, useState } from "react";

export default function useRouterControllerModel() {
  const hook = useGlobalHooks();
  const [loading, setLoading] = useState(true);

  const authenticationRepository = new AuthenticationApiRepository();

  const checkAuthentication = async () => {
    try {
      const result = await authenticationRepository.me();
      console.log(result);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } catch (error) {
      hook.navigate("/login");
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      checkAuthentication();
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return {
    loading,
  };
}
