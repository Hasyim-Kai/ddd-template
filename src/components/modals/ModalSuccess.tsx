import { CheckCircle2 } from "lucide-react";
import ModalContainer from "./modal-container";

export default function ModalSuccess({ open = false, setOpen, cb }: { open: boolean, setOpen: Function, cb?: Function }) {
  function onClickClose() {
    setOpen(false)
    if (cb != undefined) {
      cb()
    }
  }

  return (
    <ModalContainer open={open}>
      <div className="w-[430px] flex flex-col gap-5 items-center">
        <div className="flex items-center justify-center w-[150px] h-[150px] bg-green-500 rounded-full border-[8px] border-[#E9EEF5]">
          <CheckCircle2 className="w-[80px] h-[80px]" color="white" />
        </div>
        <div className="flex items-center flex-col">
          <span className="text-[#2D2A2A] text-[24px] font-semibold">
            Success
          </span>
          <span>your data has been successfully saved.</span>
        </div>

        <div className="flex w-full items-end gap-4">
          <button
            className="flex items-center justify-center flex-1 gap-2 h-[46px] px-[20px] border-2 border-green-400 rounded-xl text-green-400 text-sm font-semibold"
            onClick={onClickClose} >
            close
          </button>
        </div>
      </div>
    </ModalContainer>
  );
}
