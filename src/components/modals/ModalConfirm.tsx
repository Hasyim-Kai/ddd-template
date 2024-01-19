import { RefreshCcw } from "lucide-react";
import ModalContainer from "./modal-container";

interface Props {
  isLoading: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cb: Function;
}

export default function ModalConfirm({ isLoading = false, open = false, setOpen, cb, }: Props) {
  // const [isLoading, setIsLoading] = useState({ loading: false, exec: false, });

  function handleConfirm() {
    cb();
  }

  // useEffect(() => {
  //   setIsLoading({ loading: false, exec: false });

  //   return () => clearTimeout(timeoutId);
  // }, []);

  return (
    <ModalContainer open={open}>
      <div className="w-[430px] flex flex-col gap-8 items-center">
        <div className="flex items-center justify-center w-[150px] h-[150px] bg-orange-400 rounded-full border-[8px] border-[#E9EEF5]">
          <span className="text-[90px] font-bold text-white">!</span>
        </div>
        <div className="flex items-center flex-col">
          <span className="text-[#2D2A2A] text-[24px] font-semibold">
            Confirm the action
          </span>
          <span>Is the data you entered correct?</span>
        </div>

        <div className="flex w-full items-end gap-4">
          <button
            className="flex items-center justify-center flex-1 gap-2 h-[46px] px-[20px] border-2 border-red-600 rounded-xl text-red-600 text-sm font-semibold"
            onClick={() => {
              setOpen(false);
            }}
          >
            cancel
          </button>
          {isLoading ? (
            <button className="flex items-center justify-center flex-1 gap-2 h-[46px] px-[20px] bg-red-600 rounded-xl text-white text-sm font-semibold">
              <RefreshCcw
                color="white"
                className="w-[24px] h-[24px] animate-spin"
              />
            </button>
          ) : (
            <button
              className="flex items-center justify-center flex-1 gap-2 h-[46px] px-[20px] bg-red-600 rounded-xl text-white text-sm font-semibold"
              onClick={handleConfirm}>
              <span>Yes, Confirm</span>
            </button>
          )}
        </div>
      </div>
    </ModalContainer>
  );
}
