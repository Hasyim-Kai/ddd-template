import { ChevronRightIcon, HomeIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

type TBreadcrumbs = {
  name: string;
  link: string;
  active?: boolean;
};

export default function Breadcrumbs({ data = [] }: { data: TBreadcrumbs[] }) {
  return (
    <div className="flex items-center gap-2">
      <HomeIcon color="black" strokeWidth={2.5} />
      {data?.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <ChevronRightIcon color="black" strokeWidth={2.5} />
          <NavLink
            to={`../${item.link}`}
            className={`text-[16px] font-semibold ${item.active ? "text-red-500" : "text-gray-700"}`}
          >
            {item.name}
          </NavLink>
        </div>
      ))}
    </div>
  );
}
