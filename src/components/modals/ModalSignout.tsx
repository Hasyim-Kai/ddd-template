import { LogOut } from "lucide-react";
import ModalContainer from "./modal-container";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cb: Function;
}

export default function ModalSignout({ open = false, setOpen, cb }: Props) {
  return (
    <ModalContainer open={open}>
      <div className="w-[430px] flex flex-col gap-8 items-center">
        <div className="flex items-center justify-center w-[150px] h-[150px]">
          <LogOut color="black" size={140} />
        </div>
        <div className="flex items-center flex-col">
          <span className="text-[#2D2A2A] text-[24px] font-semibold">
            Sign Out
          </span>
          <span>Are you sure you want to Sign Out?</span>
        </div>

        <div className="flex w-full items-end gap-4">
          <button
            className="flex items-center justify-center flex-1 gap-2 h-[46px] px-[20px] border-2 border-red-400 rounded-xl text-red-400 text-sm font-semibold"
            onClick={() => setOpen(false)}
          >
            cancel
          </button>
          <button
            className="flex items-center justify-center flex-1 gap-2 h-[46px] px-[20px] bg-[#F04438] rounded-xl text-white text-sm font-semibold"
            onClick={() => cb()} >
            Yes, Confirm
          </button>
        </div>
      </div>
    </ModalContainer>
  );
}
