// import my_logo from "@assets/img/logo-nsk.png";
import { Outlet } from "react-router-dom";
import useAdmin from "./_layout-admin-model";
import { RefreshCcw, Menu, LogOut, User2, ChevronDown, } from "lucide-react";
import ModalSignout from "@components/modals/ModalSignout";
import ErrorBoundary from "@components/error/ErrorBoundary";
import ModalLogPackAmount from "@components/modals/master-data/modal-log-amount";
import ModalConfirm from "@components/modals/ModalConfirm";
import ModalFail from "@components/modals/ModalFail";
import ModalSuccess from "@components/modals/ModalSuccess";
import { AppProvider } from "@store/index";
import SideBar from "@components/side-bar/side-bar";
// import my_logo from "@assets/img/logo-nsk.png";

export default function LayoutAdmin() {
  const admin = useAdmin();
  return admin.isLoading ? (
    <main className="w-screen h-screen flex bg-gray-200 items-center justify-center">
      <RefreshCcw color="gray" className="animate-spin w-[50px] h-[50px]" />
    </main>
  ) : <AppProvider>
    <ErrorBoundary>
      <main className="relative">
        {/* FOR LOG AMOUNT ================================================== */}
        <ModalSuccess
          open={admin.openModalSuccess}
          setOpen={admin.setOpenModalSuccess}
        />
        <ModalFail
          open={admin.openModalFail}
          setOpen={admin.setOpenModalFail}
          errMsg={admin.errorMessage}
        />
        <ModalLogPackAmount
          open={admin.openModalLogPackAmount}
          setOpen={admin.setOpenModalLogPackAmount}
          isSmallFilled={admin.isTodaySmallLogAmountFilled}
          isNormalFilled={admin.isTodayNormalLogAmountFilled}
          cb={admin.onCreate} />
        <ModalConfirm
          isLoading={admin.isModalLoading}
          open={admin.openModalConfirm}
          setOpen={admin.setOpenModalConfirm}
          cb={admin.onConfirmCreate} />
        {/* =================================================================== */}
        <ModalSignout
          open={admin.openModalSignout}
          setOpen={admin.setOpenModalSignout}
          cb={admin.onLogout} />

        <header
          className={`${admin.isOpenSidebar ? "pl-[265px]" : "pl-[25px]"
            } fixed w-full h-[70px] bg-primary shadow-lg z-40 flex items-center justify-between pr-[25px] transition-all ease-in-out delay-100`}
        >
          <div className="flex gap-6 items-center">
            <Menu color="white" className="cursor-pointer"
              onClick={() => admin.onOpenSideBar()} />
          </div>
          <div className="relative">
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => admin.onOpenAvatar()}>
              <div className="w-6 h-6 rounded-full bg-white"></div>
              <span className="text-white font-semibold">Admin</span>
              <ChevronDown color="white" />
            </div>
            <div
              className={`${admin.isOpenAvatar ? "flex" : "hidden"
                } absolute top-[35px] bg-white rounded-md overflow-hidden right-0 flex-col gap-2 min-w-[190px] border border-gray-400`}
              onMouseLeave={() => admin.onOpenAvatar()}
            >
              <section className="flex flex-col gap-3 cursor-pointer px-4 py-2"  >
                <div className="flex gap-3" onClick={() => admin.navigate(`./user/profile/detail/${admin.userId}`)}>
                  <User2 color="black" />
                  <span>Profile</span>
                </div>
                <div className="flex gap-3" onClick={() => { admin.setOpenModalSignout(true) }}>
                  <LogOut color="black" />
                  <span>Logout</span>
                </div>
              </section>
            </div>
          </div>
        </header>
        <div
          className={`${admin.isOpenSidebar ? null : "-translate-x-[240px]"
            } fixed w-[240px] h-full bg-white shadow-lg z-40 flex flex-col gap-[20px] transition-all ease-in-out delay-100`}
        >
          <div className="w-full h-[70px] shadow-sm flex items-center justify-center">
            {/* <img src={my_logo} alt="Logo" className="h-[35px]" /> */}
          </div>
          <div className="flex flex-col px-4 pb-24 gap-[12px] overflow-y-auto">
            <span className="font-semibold text-[#5C5C5C]">Menu</span>
            {/* <OldSideBar /> */}
            <SideBar />
          </div>
        </div>
        <div className={`${admin.isOpenSidebar ? "pl-[265px]" : "pl-[25px]"} relative flex-1 pt-[95px] p-[25px] transition-all ease-in-out delay-100`} >
          <Outlet />
        </div>
      </main>
    </ErrorBoundary>
  </AppProvider>
}
