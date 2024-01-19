import { X } from "lucide-react";
import ModalContainer from "./modal-container";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imgSrc: string | null;
}

export default function ModalImage({ open = false, setOpen, imgSrc, }: Props) {

  return <ModalContainer open={open} isWithPadding={false}>
    <div className="w-[600px] h-[600px] relative overflow-hidden">
      {/* <p>{imgSrc}</p> */}
      <button className="bg-red-400 p-1 rounded absolute top-3 right-3"
        onClick={() => {
          setOpen(false);
        }}><X /></button>
      <img src={imgSrc ? imgSrc : "/src/assets/default_avatar.jpg"} className="h-full object-fill" alt="Profile" />
    </div>
  </ModalContainer>

}
