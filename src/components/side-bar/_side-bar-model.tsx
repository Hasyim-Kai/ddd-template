import { ChevronDownIcon, ChevronRightIcon, Layers, LayoutGrid, User2, File } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { NavLink, useMatches } from "react-router-dom";
// import { useAppContext } from "@store/AppContext";
// import { AuthenticationApiRepository } from "@data/api/authentication-api-repository";

type TLinks = {
  id: string;
  name: string;
  link: string;
  active: boolean;
  children: TLinks[];
  icon: React.ReactNode;
  // isEnabled: boolean
};

export default function useSideBarModel() {
  // const authApiReposritory = new AuthenticationApiRepository();
  // const { dispatch } = useAppContext();
  const matches = useMatches();
  const [menuData, setMenuData] = useState<TLinks[]>([
    {
      id: uuid(),
      name: "Dashboard",
      link: "dashboard/total",
      active: true,
      icon: <LayoutGrid color="black" className="w-[24px] h-[24px]" />,
      // isEnabled: sidebarAccessInput.sidebarAccess.isDashboardOk,
      children: [
        {
          id: uuid(),
          name: "Total",
          link: "dashboard/total",
          active: false,
          icon: null,
          // isEnabled: true,
          children: [],
        },
        {
          id: uuid(),
          name: "Section",
          link: "dashboard/section/total",
          active: false,
          icon: null,
          // isEnabled: true,
          children: [],
        },
        {
          id: uuid(),
          name: "Cost Total Monthly",
          link: "dashboard/cost-total-monthly",
          active: false,
          icon: null,
          // isEnabled: true,
          children: [],
        },
        {
          id: uuid(),
          name: "Noise",
          link: "dashboard/noise/cost-noise-ratio",
          active: false,
          icon: null,
          // isEnabled: true,
          children: [],
        },
      ],
    },
    {
      id: uuid(),
      name: "Report",
      link: "report/LA",
      active: false,
      icon: <File color="black" className="w-[24px] h-[24px]" />,
      // isEnabled: sidebarAccessInput.sidebarAccess.isReportOk,
      children: [
        {
          id: uuid(),
          name: "LA",
          link: "report/LA",
          active: false,
          icon: null,
          // isEnabled: true,
          children: [],
        },
        {
          id: uuid(),
          name: "HG",
          link: "report/HG",
          active: false,
          icon: null,
          // isEnabled: true,
          children: [],
        },
        {
          id: uuid(),
          name: "G2",
          link: "report/G2",
          active: false,
          icon: null,
          // isEnabled: true,
          children: [],
        },
        {
          id: uuid(),
          name: "Assy",
          link: "report/assy",
          active: false,
          icon: null,
          // isEnabled: true,
          children: [],
        },
        {
          id: uuid(),
          name: "QN",
          link: "report/QN",
          active: false,
          icon: null,
          // isEnabled: true,
          children: [],
        },
        {
          id: uuid(),
          name: "Noise",
          link: "report/noise",
          active: false,
          icon: null,
          // isEnabled: true,
          children: [],
        },
        {
          id: uuid(),
          name: "Packing",
          link: "report/packing",
          active: false,
          icon: null,
          // isEnabled: true,
          children: [],
        },
      ],
    },
    {
      id: uuid(),
      name: "Master Data",
      link: "master-data/cost/internal",
      active: false,
      icon: <Layers color="black" className="w-[24px] h-[24px]" />,
      // isEnabled: sidebarAccessInput.sidebarAccess.isMasterDataOk,
      children: [
        {
          id: uuid(),
          name: "Cost",
          link: "master-data/cost/internal",
          active: false,
          icon: null,
          // isEnabled: true,
          children: [],
        },
        {
          id: uuid(),
          name: "Target",
          link: "master-data/target/general",
          active: false,
          icon: null,
          // isEnabled: true,
          children: [],
        },
        {
          id: uuid(),
          name: "Factory",
          link: "master-data/factory",
          active: false,
          icon: null,
          // isEnabled: true,
          children: [],
        },
        {
          id: uuid(),
          name: "Packing",
          link: "master-data/packing",
          active: false,
          icon: null,
          // isEnabled: true,
          children: [],
        },
      ],
    },
    {
      id: uuid(),
      name: "User",
      link: "user",
      active: false,
      icon: <User2 color="black" />,
      // isEnabled: sidebarAccessInput.sidebarAccess.isUserOk,
      children: [],
    },
  ]);

  function MenuItemGenerator({ data }: { data: TLinks }) {
    if (!!data.children?.length) {
      return (
        <div className="flex flex-col gap-3 w-full text-sm">
          <NavLink
            to={data.link}
            className="flex items-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              updateActiveStatusById(data.id, !!!data.active);
            }}
          >
            {!!data.children?.length && !!data.icon ? (
              <div className="flex items-center justify-between gap-3 w-full">
                <div
                  className={`flex items-center gap-3 ${data.active ? "text-primary" : "text-gray-700"
                    }`}
                >
                  <span className="w-[24px] h-[24px]">{data.icon}</span>
                  <span className={`text-base font-semibold`}>{data.name}</span>
                </div>
                {data.active ? (
                  <ChevronDownIcon color="black" />
                ) : (
                  <ChevronRightIcon color="black" />
                )}
              </div>
            ) : null}
            {!!data.children?.length && !!!data.icon ? (
              <div className="flex items-center justify-between gap-3 w-full">
                <div
                  className={`flex items-center ${data.active ? "text-primary" : "text-gray-700"
                    }`}
                >
                  {/* <DotIcon color="black" /> */}
                  <span className={`text-base font-semibold`}>{data.name}</span>
                </div>
                {data.active ? (
                  <ChevronDownIcon color="black" />
                ) : (
                  <ChevronRightIcon color="black" />
                )}
              </div>
            ) : null}
          </NavLink>
          {data.active ? (
            <div
              className={`flex flex-col gap-3 overflow-hidden ${data.active ? "h-fit" : "h-0"
                } pl-9`}
            >
              {data.children.map((child) => (
                <MenuItemGenerator key={child.id} data={child} />
              ))}
            </div>
          ) : null}
        </div>
      );
    }

    return <NavLink to={data.link} className="w-fit flex items-center gap-3">
      {({ isActive }) => (
        <>
          {!!!data.children?.length && !!data.icon ? (
            <div
              className={`flex items-center gap-3 ${isActive ? "text-primary" : "text-gray-700"
                }`}
            >
              <span className="w-[24px] h-[24px]">{data.icon}</span>
              <span className={`text-base font-semibold`}>{data.name}</span>
            </div>
          ) : null}
          {!!!data.children?.length && !!!data.icon ? (
            <div
              className={`flex items-center gap-3 ${isActive ? "text-primary" : "text-gray-700"
                }`}
            >
              {/* <DotIcon color="black" /> */}
              <span className={`text-base font-semibold`}>{data.name}</span>
            </div>
          ) : null}
        </>
      )}
    </NavLink>
  }

  function SidebarMenu() {
    return (
      <div className="flex flex-col gap-4 w-full">
        {menuData.map((menuItem) => (
          <MenuItemGenerator key={menuItem.id} data={menuItem} />
        ))}
      </div>
    );
  }

  function updateActiveStatus(
    menuData: TLinks[],
    targetId: string,
    isActive: boolean
  ) {
    return menuData.map((menuItem): TLinks => {
      if (menuItem.id === targetId) {
        return { ...menuItem, active: isActive };
      } else if (menuItem.children && menuItem.children.length > 0) {
        return {
          ...menuItem,
          children: updateActiveStatus(menuItem.children, targetId, isActive),
        };
      }
      return menuItem;
    });
  }

  const updateActiveStatusById = (targetId: string, isActive: boolean) => {
    const updatedMenuData = updateActiveStatus(menuData, targetId, isActive);
    setMenuData(updatedMenuData);
  };

  const setActiveLink = (children: TLinks[]): TLinks[] => {
    return children.map((item) => {
      return {
        ...item,
        active: !!matches.find(
          (match) => match.pathname.indexOf(item.link) > -1
        ),
        children: setActiveLink(item.children),
      };
    });
  };

  useEffect(() => {
    // dispatch({ type: 'SET_USER_ACCESS', payload: sidebarAccessInput.sidebarAccess });
    setMenuData((menuData) => {
      return menuData.map((item) => {
        return {
          ...item,
          active: !!matches.find(
            (match) => match.pathname.indexOf(item.link) > -1
          ),
          children: setActiveLink(item.children),
        };
      });
    });
  }, []);

  // dispatch({ type: 'SET_USER_ACCESS', payload: sidebarAccess });
  return { SidebarMenu };
}
