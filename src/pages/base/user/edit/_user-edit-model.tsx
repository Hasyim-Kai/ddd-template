import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams, } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserRepository } from "@domain/repositories/user-repository";
import { UserApiRepository } from "@data/api/user-api-repository";
import { RoleApiRepository } from "@data/api/role-api-repository";
import { RoleRepository } from "@domain/repositories/role-repository";
import { Role } from "@domain/models/role/role";
import { InputCreateUser } from "@domain/models/user/user";
import { UserDetail } from "@domain/models/user/user-detail";
import { addBaseAssetUrlBE } from "@commons/utils/config";

export default function useEditUser() {
  const { register, handleSubmit, watch, setValue, formState: { errors }, } = useForm<InputCreateUser>();
  const userRepository: UserRepository = new UserApiRepository();
  const roleRepository: RoleRepository = new RoleApiRepository();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [openModalFail, setOpenModalFail] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [openModalPic, setOpenModalPic] = useState(false);
  const onPasswordToggle = () => { setIsPasswordShow(!isPasswordShow) }
  const [inputData, setInputData] = useState<InputCreateUser>({ name: '', email: '', roleId: '', password: '', avatarPath: null });
  const [isFileLimitExceed, setIsFileLimitExceed] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePicName, setProfilePicName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // fetching
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(``);
  const [selectedId, setSelectedId] = useState<string | number>(1)
  const [userDetail, setUserDetail] = useState(UserDetail.create({ id: '1', name: '', isActive: false, email: '', password: '', avatarPath: '', role: '', roleId: '', createdAt: '', updatedAt: '', deletedAt: '', }));
  const [roleList, setRoleList] = useState([
    Role.create({
      id: '',
      name: '',
    })
  ])

  function onEdit(user: InputCreateUser) {
    setOpenModalConfirm(true)
    setInputData(user)
  }

  async function onConfirmEdit() {
    let res;
    setIsLoading(true)
    const inputFormData = new FormData()
    inputFormData.append('name', inputData.name);
    inputFormData.append('email', inputData.email);
    // inputFormData.append('isActive', userDetail.isActive);
    inputFormData.append('roleId', inputData.roleId);
    if (inputData.avatarPath.length !== 0) {
      inputFormData.append('avatarPath', inputData.avatarPath[0]);
    }

    if (id != undefined) {
      res = await userRepository.edit(id, inputFormData)
    }
    if (res?.response?.data?.message) {
      setErrorMessage(res?.response?.data?.message)
      setOpenModalFail(true)
    } else {
      setOpenModalSuccess(true)
    }
    setOpenModalConfirm(false)
    setIsLoading(false)
  }

  function onChangeFile(event: any) {
    const maxFileSize = 5242880 // 5 MB
    const file = event.target?.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file))
      setProfilePic(file)
    } else {
      setPreviewUrl(null);
    }

    if (file?.size < maxFileSize) { // if file below the limit
      setIsFileLimitExceed(false)
    } else {
      setIsFileLimitExceed(true)
      return false;
    }
  }

  const getRolesDropdownList = useCallback(async () => {
    setIsLoading(true);
    const res = await roleRepository.getRolesDropdownList()
    setRoleList(res)
    setIsLoading(false);
  }, [])

  const getUserDetail = useCallback(async () => {
    try {
      if (id != undefined) {
        setIsLoading(true);
        const res = await userRepository.getDetail(id)
        setValue('name', res.name)
        setValue('email', res.email)
        setValue('roleId', res.roleId)
        setPreviewUrl(addBaseAssetUrlBE(res.avatarPath))
        setProfilePicName(res.avatarPath)
        setUserDetail(res)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    getRolesDropdownList()
    getUserDetail()
  }, []);

  return {
    state,
    errors,
    openModalConfirm,
    openModalSuccess,
    isLoading, errorMessage,
    selectedId,
    id,
    isFileLimitExceed,
    profilePic, profilePicName, setProfilePicName,
    previewUrl,
    navigate,
    register,
    watch,
    handleSubmit,
    setOpenModalConfirm,
    setOpenModalSuccess,
    onEdit,
    setSelectedId,
    onChangeFile,
    onConfirmEdit,
    openModalFail, setOpenModalFail,
    roleList,
    isPasswordShow, setIsPasswordShow,
    onPasswordToggle,
    openModalPic, setOpenModalPic,
    userDetail,
  };
}
