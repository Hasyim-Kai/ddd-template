import { X } from "lucide-react";
import ModalContainer from "./modal-container";

export default function ModalFail({ open = false, setOpen, errMsg = `Something Went Wrong` }: { open: boolean, setOpen: Function, errMsg?: string }) {
  function onClickClose() {
    setOpen(false)
  }

  return (
    <ModalContainer open={open}>
      <div className="w-[430px] flex flex-col gap-5 items-center">
        <div className="flex items-center justify-center w-[150px] h-[150px] bg-red-600 rounded-full border-[8px] border-[#E9EEF5]">
          <X className="w-[80px] h-[80px]" color="white" />
        </div>
        <div className="flex items-center flex-col">
          <span className="text-[#2D2A2A] text-[24px] font-semibold">
            Failed
          </span>
          <span>{errMsg}</span>
        </div>

        <div className="flex w-full items-end gap-4">
          <button
            className="flex items-center justify-center flex-1 gap-2 h-[46px] px-[20px] border-2 border-red-500 rounded-xl text-red-500 text-sm font-semibold"
            onClick={onClickClose} >
            close
          </button>
        </div>
      </div>
    </ModalContainer>
  );
}
