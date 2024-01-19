import { AuthenticationApiRepository } from "@data/api/authentication-api-repository";
import { PackingApiRepository } from "@data/api/master-data/packing-api-repository";
import { InputLogAmountType } from "@domain/models/master-data/packing";
import { IMapMenuItemProps } from "@domain/models/role/map-menu";
import { AuthenticationRepository } from "@domain/repositories/authentication-repository";
import { PackingRepository } from "@domain/repositories/master-data/packing-repository";
import { AxiosError } from "axios";
import { useState, useEffect, useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
// import { useAppContext } from "@store/AppContext";
// import { LayoutGrid, Layers, User2, File } from "lucide-react";

// type AccessActionTypes = "View" | "Create" | "Update" | "Delete" | "Import" | "Export"
// type featuresTypes = "Dashboard" | "Report" | "Master Data" | "Account" | "Access"

export default function useAdmin() {
  const authApiReposritory: AuthenticationRepository = new AuthenticationApiRepository();
  const packingRepository: PackingRepository = new PackingApiRepository();
  // const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  //navbar status
  const [isOpenNavbar, setIsOpenNavbar] = useState(false);
  //sidebar status
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  //avatar status
  const [isOpenAvatar, setIsOpenavatar] = useState(false);
  // loading state
  const [isLoading, setIsLoading] = useState(true);
  //state modal signout
  const [openModalSignout, setOpenModalSignout] = useState(false);
  const [openModalLogPackAmount, setOpenModalLogPackAmount] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [openModalFail, setOpenModalFail] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>(``);
  function handleModalSignout() { setOpenModalSignout(!openModalSignout) }
  const [userId, setUserId] = useState(``)

  //navbar status click
  const onOpenNavbar = (): void => {
    setIsOpenNavbar(!isOpenNavbar);
  };

  //click burger in header
  const onOpenSideBar = (): void => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  //click avatar dropdown in header
  const onOpenAvatar = (): void => {
    setIsOpenavatar(!isOpenAvatar);
  };

  //set navigate navbar
  const setNavigate = (url: string): void => {
    navigate(url);
  };

  //on logout
  const onLogout = async (): Promise<void> => {
    try {
      localStorage.removeItem("nsk_token");
      navigate("/login");
      setOpenModalSignout(false)
    } catch (error) {
      console.log(error);
    }
  };

  // ================================================================================
  // HANDLE USER ACCESS =============================================================
  // ================================================================================

  const [accessMenu, setAccessMenu] = useState<IMapMenuItemProps[]>([]);
  const [sidebarAccess, setSidebarAccess] = useState({ isDashboardOk: false, isReportOk: false, isMasterDataOk: false, isUserOk: false, });

  function generateMenuAccess(menu: IMapMenuItemProps[]) {
    const sidebarAccessTemporary = sidebarAccess
    // const result = []

    for (let p = 0; p < menu.length; p++) {
      const sidebarStatus = menu[p]?.permissions?.find(item => item.name === "View")?.checked
      if (sidebarStatus) {
        if (menu[p]?.name == `Dashboard`) { sidebarAccessTemporary.isDashboardOk = true }
        else if (menu[p]?.name == `Report`) { sidebarAccessTemporary.isReportOk = true }
        else if (menu[p]?.name == `Master Data`) { sidebarAccessTemporary.isMasterDataOk = true }
        else if (menu[p]?.name == `User`) { sidebarAccessTemporary.isUserOk = true }
      }
      // sidebarAccess = {
      //   name: menu[p]?.name,
      //   status: sidebarStatus,
      //   icon: menu[p]?.name === "Dashboard" ? <LayoutGrid color="black" className="w-[24px] h-[24px]" /> :
      //     menu[p]?.name === "Report" ? <File color="black" className="w-[24px] h-[24px]" /> :
      //       menu[p]?.name === "Master Data" ? <Layers color="black" className="w-[24px] h-[24px]" /> :
      //         menu[p]?.name === "User" ? <User2 color="black" /> : null
      // }
      // if (menu[p]?.children) { // FOR CHILDREN ITEM
      //   sidebarAccess.children = menu[p]?.children.map(child => {
      //     return {
      //       name: child?.name,
      //       status: child?.permissions?.find(item => item.name === "View")?.checked
      //     }
      //   })
      // }
      // result.push(sidebarAccess)
    }
    // return result
    // dispatch({ type: 'SET_USER_ACCESS', payload: sidebarAccess });
    setSidebarAccess(sidebarAccessTemporary);
  }

  const onIsMe = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const userData = await authApiReposritory.me()
      setAccessMenu(userData.access);
      generateMenuAccess(userData.access)
      localStorage.setItem("nsk_token", JSON.stringify({ token: userData.token, user_id: userData.id, access: userData.access }));
      // const localStorageData = await JSON.parse(localStorage.getItem("nsk_token") || `{'token':null}`);
      setUserId(userData?.id)
      if (!userData?.token) {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onIsMe();
  }, []);

  // ================================================================================
  // HANDLE LOG AMOUNT ==============================================================
  // ================================================================================

  const [isModalLoading, setIsModalLoading] = useState(false);
  const todayDate = new Date()
  const dateInputForBackend = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate()
  const [isTodaySmallLogAmountFilled, setIsTodaySmallLogAmountFilled] = useState<boolean>(false);
  const [isTodayNormalLogAmountFilled, setIsTodayNormalLogAmountFilled] = useState<boolean>(false);
  const [inputData, setinputData] = useState<InputLogAmountType>({ date: ``, amount: 0, type: 'small' })

  const onCreate: SubmitHandler<{ amount: number | null, type: 'small' | 'normal' }> = (input) => {
    if (Number(input.amount) === 0) {
      setOpenModalFail(true)
      setErrorMessage(`Packing Amount 0 is not Allowed`)
    } else {
      setOpenModalConfirm(true)
      setinputData({ date: dateInputForBackend, amount: Number(input.amount), type: input.type })
    }
  }

  async function onConfirmCreate() {
    try {
      setIsModalLoading(true)
      await packingRepository.post(inputData)
      setOpenModalSuccess(true)
      inputData.type === 'small' ? setIsTodaySmallLogAmountFilled(true) : setIsTodayNormalLogAmountFilled(true)
    } catch (error) {
      if (error instanceof AxiosError) {
        setOpenModalFail(true)
        setErrorMessage(error.message)
      }
    } finally {
      setIsModalLoading(false)
      setOpenModalConfirm(false)
      setOpenModalLogPackAmount(false)
    }
  }

  const getDetail = useCallback(() => {
    packingRepository.getDetailByDate(dateInputForBackend).then((result) => {
      if (result?.small?.amount) {
        setIsTodaySmallLogAmountFilled(true)
      } else {
        throw new Error(`amount not found`)
      }

      if (result?.normal?.amount) {
        setIsTodayNormalLogAmountFilled(true)
      } else {
        throw new Error(`amount not found`)
      }
    }).catch(() => {
      setOpenModalLogPackAmount(true)
    })
  }, [dateInputForBackend])

  useEffect(() => {
    // if small & normal amount not filled, get Detail
    if (!isTodaySmallLogAmountFilled || !isTodayNormalLogAmountFilled) { // if log amount not filled today
      getDetail()
    }
  }, [dateInputForBackend, pathname, isTodaySmallLogAmountFilled, isTodayNormalLogAmountFilled]);

  // ================================================================================
  // ================================================================================

  return {
    accessMenu, sidebarAccess,
    pathname,
    isOpenNavbar,
    isOpenSidebar,
    isOpenAvatar,
    isLoading, isModalLoading,
    openModalSignout,
    onOpenNavbar,
    onOpenSideBar,
    setNavigate,
    onOpenAvatar,
    onLogout,
    navigate,
    setOpenModalSignout,
    handleModalSignout,
    userId,
    openModalLogPackAmount, setOpenModalLogPackAmount,
    openModalConfirm, setOpenModalConfirm,
    openModalSuccess, setOpenModalSuccess,
    openModalFail, setOpenModalFail,
    errorMessage, setErrorMessage,
    isTodaySmallLogAmountFilled, isTodayNormalLogAmountFilled, onCreate, onConfirmCreate,
    generateMenuAccess,
  };
}
