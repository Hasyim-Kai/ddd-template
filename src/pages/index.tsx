import useGlobalHooks from "@hooks/global-hooks";
import { useEffect } from "react";

export default function LandingPage() {
  const globalHook = useGlobalHooks()

  useEffect(() => {
    globalHook.navigate(`/login`)
  }, []);
  // return <PrivateRouterContainer><div></div></PrivateRouterContainer>;
  return <div></div>;
}
