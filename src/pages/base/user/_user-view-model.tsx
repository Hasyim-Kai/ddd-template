import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams, } from "react-router-dom";
import { useForm } from "react-hook-form";
import { NewPaginatedData } from "@domain/models/paginated-data";
import { UserRepository } from "@domain/repositories/user-repository";
import { UserApiRepository } from "@data/api/user-api-repository";
import { User } from "@domain/models/user/user";
import { UserDetail } from "@domain/models/user/user-detail";
import useGlobalHooks from "@hooks/global-hooks";

export interface InputsUser {
  name: string;
  email: string;
  role: string;
  password?: string;
  profile_pic: Array<File> | File | string | null;
}

export default function useUser(usedFor: string = "user-list") {
  const userRepository: UserRepository = new UserApiRepository();
  const { searchParams } = useGlobalHooks();
  let searchParamsValue = searchParams.get(`search`)
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();
  const [sortType, setSortType] = useState<`ASC` | `DESC`>("ASC");
  const [orderBy, setOrderBy] = useState(`name`);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [openModalChangePwd, setOpenModalChangePwd] = useState(false);
  const [openModalPic, setOpenModalPic] = useState(false);
  const [openModalFail, setOpenModalFail] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>(``);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const onPasswordToggle = () => { setIsPasswordShow(!isPasswordShow) }
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // fetching
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | number>(1)
  const [users, setUser] = useState(NewPaginatedData.create<User>({ pagination: { page: 1, limit: 5, totalRows: 0, currentRowsCount: 0, totalPages: 0, nextPage: 0, prevPage: 0 }, data: [], }));
  const [userDetail, setUserDetail] = useState(UserDetail.create({
    id: '1',
    name: '',
    isActive: false,
    email: '',
    password: '',
    avatarPath: '',
    role: '',
    roleId: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
  }));

  const { register, handleSubmit, watch, setValue, formState: { errors }, } = useForm<InputsUser>();

  async function onChangeStatus(id: string | number, isChecked: boolean) {
    if (id != undefined) {
      const response = await userRepository.changeStatus(id, isChecked)
      if (response.message.includes(`success`)) {
        setOpenModalSuccess(true)
      }
    }
  }

  async function onChangePassword(input: { newPassword: string; confirmPassword: string; }) {
    if (id != undefined) {
      const response = await userRepository.changePassword(id, input.newPassword, input.confirmPassword)
      if (response.message.includes(`success`)) {
        setOpenModalChangePwd(false)
        setOpenModalSuccess(true)
      } else {
        setOpenModalChangePwd(false)
      }
    }
  }

  async function onDelete() {
    setOpenModalDelete(true);
    const res = await userRepository.delete(selectedId)
    console.log(res)

    if (res?.response?.data?.message) {
      setErrorMessage(res?.response?.data?.message)
      setOpenModalDelete(false)
      setOpenModalFail(true)
    } else {
      setOpenModalDelete(false)
      setOpenModalSuccess(true)
      getUserList()
    }
  }

  function handleSort(columnName: string) {
    // if click on the same column, toggle sortType
    if (columnName === orderBy) {
      // toggle sortType
      setSortType(sortType === `ASC` ? `DESC` : `ASC`)
    } else {
      setSortType(`ASC`)
      setOrderBy(columnName)
    }
  }

  const getUserList = useCallback(() => {
    setIsLoading(true);
    userRepository.get({ q: searchParamsValue, sortType, orderBy, limit: users.pagination.limit, page: users.pagination.page })
      .then((result) => {
        return setUser(result)
      }).catch((err) => {
        console.log(err);
      }).finally(() => { setIsLoading(false) });
  }, [users.pagination.page, users.pagination.limit, searchParamsValue, orderBy, sortType,])

  const getUserDetail = useCallback(() => {
    setIsLoading(true);
    if (id != undefined) {
      userRepository.getDetail(id).then((result) => {
        console.log(result)
        setValue('name', result.name)
        setValue('email', result.email)
        setPreviewUrl(result.avatarPath)

        // if (result.avatarPath != null) {
        //   setPreviewUrl(result.avatarPath)
        //   convertImgUrlToFile(result.avatarPath).then((res) => {
        //     console.log(res)
        //   })
        // }

        return setUserDetail(result)
      }).catch((err) => {
        console.log(err);
      }).finally(() => { setIsLoading(false) });
    }
  }, [id])

  useEffect(() => {
    if (usedFor === "user-list") {
      getUserList()
    } else if (usedFor === "user-detail") {
      getUserDetail()
    }
  }, [searchParamsValue, orderBy, sortType, users.pagination.page, users.pagination.limit]);

  return {
    searchParamsValue,
    state,
    errors,
    openModalDelete,
    openModalConfirm,
    openModalSuccess,
    openModalChangePwd,
    openModalPic,
    openModalFail, setOpenModalFail,
    isLoading,
    errorMessage,
    users,
    userDetail,
    selectedId,
    id,
    previewUrl,
    isPasswordShow,
    navigate,
    register,
    watch,
    handleSubmit,
    setOpenModalDelete,
    setOpenModalConfirm,
    setOpenModalSuccess,
    setOpenModalChangePwd,
    setOpenModalPic,
    setUser,
    onDelete,
    onChangeStatus,
    setSelectedId,
    onPasswordToggle,
    onChangePassword,
    sortType, setSortType, handleSort,
    orderBy, setOrderBy,
  };
}
