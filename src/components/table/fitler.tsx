import { SearchIcon } from "lucide-react";

export default function Filter({
  search = true,
  children,
}: {
  search?: boolean | undefined;
  children?: React.ReactNode | undefined;
}) {
  return (
    <>
      <div className="w-full bg-[#13005A] border flex items-center justify-between px-3 py-2">
        {children}
        {search ? (
          <div className="flex items-center gap-2 border bg-white w-[250px] h-[42px] px-3 text-base">
            <SearchIcon color="#D0D3D9" size={18} />
            <input
              type="search"
              className="outline-none flex-1 bg-transparent"
              placeholder="Search..."
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
