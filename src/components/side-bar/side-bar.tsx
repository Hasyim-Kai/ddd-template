import useSideBarModel from "./_side-bar-model";

export default function SideBar() {
  const model = useSideBarModel();
  return <model.SidebarMenu />;
}
