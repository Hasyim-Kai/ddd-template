import downloadImg from "@assets/img/download-img.png";
import ModalContainer from "../modal-container";

interface Props {
  open: boolean;
  setOpen: Function;
}

export default function ModalDetailReportDownload({ open = false, setOpen }: Props) {
  function onCancel() {
    setOpen(false);
  }
  function onDownload() {

  }

  return <ModalContainer open={open}>
    <div className="w-[405px] flex flex-col gap-2">
      <div className="flex gap-3">
        <img src={downloadImg} alt="recycle icon" />
        <div>
          <h1 className="font-bold text-2xl">Download</h1>
          <p className="text-gray-400 text-sm">Download report file.</p>
        </div>
      </div>

      <div className="mt-5 flex w-full items-end gap-4">
        <button
          className="flex items-center justify-center flex-1 gap-2 h-[46px] px-[20px] border-2 border-red-400 rounded-xl text-red-400 text-sm font-semibold"
          onClick={onCancel}
        >
          cancel
        </button>
        <button
          className="flex items-center justify-center flex-1 gap-2 h-[46px] px-[20px] bg-red-500 rounded-xl"
          onClick={onDownload}>
          <span className="text-white text-sm font-semibold">Download</span>
        </button>
      </div>
    </div>
  </ModalContainer>
}
