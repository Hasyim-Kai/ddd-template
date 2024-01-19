import { RefreshCcw, TrashIcon } from "lucide-react";
import ModalContainer from "./modal-container";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cb: () => Promise<void>
}

export default function ModalDelete({ open = false, setOpen, cb }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  function handleDelete() {
    setIsLoading(true);
    cb().finally(() => {
      setIsLoading(false)
    })
  }

  // useEffect(() => {
  //   const timerId = setTimeout(()=>{
  //     setIsLoading(false)
  //   },1500)

  //   return () => clearTimeout(timerId)
  // }, [])

  return (
    <ModalContainer open={open}>
      <div className="w-[430px] flex flex-col gap-8 items-center">
        <div className="flex items-center justify-center w-[150px] h-[150px] bg-[#F04438] rounded-full">
          <TrashIcon color="white" className="w-[80px] h-[80px]" />
        </div>
        <div className="flex items-center flex-col">
          <span className="text-[#2D2A2A] text-[24px] font-semibold">
            Delete
          </span>
          <span>Are you sure you want to delete this data?</span>
        </div>

        <div className="flex w-full items-end gap-4">
          <button
            className="flex items-center justify-center flex-1 gap-2 h-[46px] px-[20px] border-2 border-red-400 rounded-xl text-red-400 text-sm font-semibold"
            onClick={() => setOpen(false)}
          >
            cancel
          </button>
          {isLoading
            ? <button className="flex items-center justify-center flex-1 gap-2 h-[46px] px-[20px] bg-[#F04438] rounded-xl text-white text-sm font-semibold">
              <RefreshCcw
                color="white"
                className="w-[24px] h-[24px] animate-spin"
              />
            </button>
            : <button
              className="flex items-center justify-center flex-1 gap-2 h-[46px] px-[20px] bg-[#F04438] rounded-xl text-white text-sm font-semibold"
              onClick={handleDelete}>
              Yes, Confirm
            </button>}
        </div>
      </div>
    </ModalContainer>
  );
}
