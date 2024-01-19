import { RefreshCcw } from "lucide-react";

export default function Loading({ className = `` }) {
    return <div className={`py-16 w-full flex items-center justify-center animate-pulse ${className}`}>
        <RefreshCcw color="black" className="animate-spin w-[30px] h-[30px]" />
    </div>
}