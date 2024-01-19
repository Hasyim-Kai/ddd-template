import { useState, useEffect } from "react";
import { Eye, EyeOff, RefreshCcw } from "lucide-react";
import ModalContainer from "./modal-container";
import recycleImg from "@assets/img/change-pwd-img.png";
import { useForm } from "react-hook-form";

interface Inputs {
  newPassword: string;
  confirmPassword: string;
}

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  changePasswordCb: Function;
}

export default function ModalChangePassword({ open = false, setOpen, changePasswordCb }: Props) {
  const { register, handleSubmit, setValue, // formState: { errors },
  } = useForm<Inputs>();

  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState({ loading: false, exec: false, });
  function onPasswordShow() { setIsPasswordShow(!isPasswordShow) }
  function onSubmit(input: Inputs) {
    if (input.newPassword !== input.confirmPassword) {
      setIsPasswordSame(false)
    } else {
      setIsLoading({ loading: true, exec: true });
      setIsPasswordSame(true)
      setValue('newPassword', '')
      setValue('confirmPassword', '')
      changePasswordCb(input)
    }
  }

  useEffect(() => {
    setIsLoading({ loading: false, exec: false });
  }, []);

  return (
    <ModalContainer open={open}>
      <div className="w-[430px] flex flex-col gap-2">
        <div className="flex gap-3">
          <img src={recycleImg} alt="recycle icon" />
          <div>
            <h1 className="font-semibold">Change Password</h1>
            <p className="text-gray-400">Update password</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <span className="mt-2 text-sm">New Password</span>
          <div className={`w-full h-[46px] px-[18px] flex items-center gap-[16px] rounded-lg border-2 bg-white`}>
            <input
              {...register("newPassword", { required: true })}
              type={`${isPasswordShow ? "text" : "password"}`}
              className=" bg-transparent w-full h-full outline-none"
            />
            {isPasswordShow ? (
              <Eye
                color="#6E7079"
                className="w-[22px] h-[22px]"
                onClick={() => onPasswordShow()}
              />
            ) : (
              <EyeOff
                color="#6E7079"
                className="w-[22px] h-[22px]"
                onClick={() => onPasswordShow()}
              />
            )}
          </div>

          <span className="text-sm mt-3">Confirm Password</span>
          <div className={`w-full h-[46px] px-[18px] flex items-center gap-[16px] rounded-lg border-2 bg-white`}>
            <input
              {...register("confirmPassword", { required: true })}
              type={`${isPasswordShow ? "text" : "password"}`}
              className=" bg-transparent w-full h-full outline-none"
            />
            {isPasswordShow ? (
              <Eye
                color="#6E7079"
                className="w-[22px] h-[22px]"
                onClick={() => onPasswordShow()}
              />
            ) : (
              <EyeOff
                color="#6E7079"
                className="w-[22px] h-[22px]"
                onClick={() => onPasswordShow()}
              />
            )}
          </div>

          {isPasswordSame ? null : <p className="text-sm text-red-500 mt-2">Password Must be Same</p>}
          <div className="mt-5 flex w-full items-end gap-4">
            <button
              className="flex items-center justify-center flex-1 gap-2 h-[46px] px-[20px] border-2 border-red-400 rounded-xl text-red-400 text-sm font-semibold"
              onClick={() => {
                setOpen(false);
                setIsLoading({ loading: false, exec: false });
              }}
            >
              cancel
            </button>
            {isLoading.loading ? (
              <button className="flex items-center justify-center flex-1 gap-2 h-[46px] px-[20px] bg-red-500 rounded-xl text-white text-sm font-semibold">
                <RefreshCcw
                  color="white"
                  className="w-[24px] h-[24px] animate-spin"
                />
              </button>
            ) : (
              <button
                className="flex items-center justify-center flex-1 gap-2 h-[46px] px-[20px] bg-red-500 rounded-xl">
                <span className="text-white text-sm font-semibold">Update</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}
