import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface Props {
  children?: any,
  label: string,
  icon?: any,
  className?: any,
  to?: any,
  active?: any,
}

export const NavItem = ({
  children = null,
  label = "Lable",
  icon = null,
  className = null,
  to = null,
  active = null,
}: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`font-semibold text-[#5C5C5C] flex flex-col gap-2 ${className}`}>
      {to ? (
        <NavLink
          to={to}
          onClick={() => setOpen(!open)}
          className={({ isActive }) =>
            `flex items-center cursor-pointer gap-3 h-[37px] rounded-md px-2 hover:text-primary
           ${(isActive && to !== null) || active === true ? "text-primary" : ""
            }`
          }
        >
          <div className="w-6 h-6">{icon}</div>
          {<div className={`whitespace`}>{label}</div>}
          {children && (
            <ChevronDown color="black" className={`ml-auto transition ${open && "-rotate-90"}`} />
          )}
        </NavLink>
      ) : (
        <button
          // to={to}
          onClick={() => setOpen(!open)}
          className={`flex items-center cursor-pointer gap-3 w-full h-[37px] rounded-md px-2 hover:bg-red-50 hover:text-primary ${open || active ? "text-primary bg-[#E9EEF5]" : ""
            }`}
        >
          <div className="w-6 h-6">{icon}</div>
          {<div className={`whitespace-nowrap`}>{label}</div>}
          {children && (
            <ChevronDown color="black" className={`ml-auto transition ${open && "-rotate-90"}`} />
          )}
        </button>
      )}
      {children && (
        <div
          className={`${open || active ? `flex` : `hidden`
            } flex flex-col gap-2`}
        >
          {children}
        </div>
      )}
    </div>
  );
};
