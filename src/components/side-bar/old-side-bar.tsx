import { Layers, User2, File, LayoutGrid } from "lucide-react";
import { NavItem } from "@components/side-bar/NavItem";
// import { useAppContext } from "@store/AppContext";

export default function OldSideBar() {
  // const { state } = useAppContext();
  return <div className="flex flex-col gap-2 text-sm">
    {true && <NavItem label={`Dashboard`}
      icon={<LayoutGrid color="black" className="w-[24px] h-[24px]" />}>
      <NavItem label="Total" to={"dashboard/total"} />
      <NavItem label="Section" to={"dashboard/section/total"} />
      <NavItem label="Cost Total Monthly" to={"dashboard/cost-total-monthly"} />
      <NavItem label="Noise" to={"dashboard/noise/cost-noise-ratio"} />
    </NavItem>}

    {true && <NavItem label={`Report`}
      icon={<File color="black" className="w-[24px] h-[24px]" />}>
      <NavItem label="LA" to={"report/LA"} />
      <NavItem label="HG" to={"report/HG"} />
      <NavItem label="G2" to={"report/G2"} />
      <NavItem label="Assy" to={"report/assy"} />
      <NavItem label="QN" to={"report/QN"} />
      <NavItem label="Noise" to={"report/noise"} />
      <NavItem label="Packing" to={"report/packing"} />
    </NavItem>}
    {true && <NavItem
      label={`Master Data`}
      icon={<Layers color="black" className="w-[24px] h-[24px]" />}    >
      <NavItem label="Cost" to={"master-data/cost/internal"} />
      <NavItem label="Target" to={"master-data/target/general"} />
      <NavItem label="Factory" to={"master-data/factory"} />
      <NavItem label="Packing Amount" to={"master-data/packing"} />
    </NavItem>}
    {true && <NavItem label="User" to={"user"} icon={<User2 color="black" />} />}
    {/* {admin.menuAccess &&
admin.menuAccess.map((menu, index) => {
if (menu.children) {
return menu.status ? (
  <NavItem key={index} label={menu.name} icon={menu.icon}>
    {menu.children
      ? menu.children.map((child, index) =>
        child.status ? (
          <NavItem
            key={index}
            label={child.name}
            to={`${menu.name
              .toLowerCase()
              .split(" ")
              .join("-")}/${child.name
                .toLowerCase()
                .split(" ")
                .join("-")}`}
          />
        ) : null,
      )
      : null}
  </NavItem>
) : null;
} else {
return menu.status ? (
  <NavItem
    key={index}
    label={menu.name}
    icon={menu.icon}
    to={menu.name.toLowerCase()}
  />
) : null;
}
})} */}
  </div>
}