import { Loader2Icon } from "lucide-react";

export default function ModalLoading({ open = false }: { open: boolean }) {
  return (
    <dialog
      open={open}
      className="bg-white w-[100dvw] h-[100dvh] z-50 top-0 left-0 fixed p-0 m-0"
    >
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <Loader2Icon color="black" size={64} className="animate-spin" />
      </div>
    </dialog>
  );
}
