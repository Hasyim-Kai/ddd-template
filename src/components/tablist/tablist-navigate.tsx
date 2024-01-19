import useGlobalHooks from "@hooks/global-hooks";

type TTabsProps = {
    name: string;
    link: string;
    active?: boolean;
};

export default function TablistNavigate({ tabs = [] }: { tabs: TTabsProps[] }) {
    const hook = useGlobalHooks();
    return <div className="flex bg-gray-50 p-1 gap-2 items-center rounded-md w-fit border">
        {tabs?.map((item, i) => (
            <button
                key={i}
                disabled={!!item.active}
                type="button"
                onClick={() => hook.navigate(item.link)}
                className={`h-8 px-3 rounded text-sm text-[#313030] font-semibold hover:bg-white 
                        ${item.active ? "bg-white" : ""}`}>
                {item.name}
            </button>
        ))}
    </div>
}
